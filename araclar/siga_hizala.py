#!/usr/bin/env python3
"""
Râvi panelindeki sîgaları Arapça isnaddan yeniden eşler.

Sened satırındaki adlar değişmez; yalnız `info.c` içindeki sîgalar ve
(ez-Zühd, Fezâil, İmam Ahmed kitaplığında) `c[0]` müellif halkası Arapçaya göre
düzeltilir. Her râvi halkası, Arapça isnadda ondan önce gelen lafza (حدثنا /
أخبرنا / عن / …) bağlanır; bağlama ad özelliklerine göre yapılır (بن ↔ b.,
أبو ↔ Ebû, أبيه ↔ babası, و ↔ ve …). Arapçada karşılığı bulunamayan halka,
son halkaysa `kâle`, değilse `an` alır ve rapora yazılır.

Kullanım:
  python3 araclar/siga_hizala.py                 # 12 kitaplık
  python3 araclar/siga_hizala.py zuhd fezail     # seçili kitaplıklar
  python3 araclar/siga_hizala.py --rapor r.txt   # eşleşmeyen halkaları yaz

Tekrar çalıştırılabilir (aynı girdi aynı çıktıyı verir).
"""
import json, re, sys, collections
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from dogrula import onek_dus  # kitaplığa özgü nüsha/müellif öneği (tek tanım)

R = Path(__file__).resolve().parents[1]
LIBS = ['musannef', 'ibnebiseybe', 'ahmed', 'zuhd', 'fezail', 'acurri', 'hallal', 'safii', 'buhari', 'ebudavud', 'harb', 'darimi', 'ibane', 'berbehari']  # leys: paneller elle verildi, hizalama bozuyor (ONEK zinciri uzun)
DIA = re.compile(r'[ً-ْٰـ]')
B = r'(?<![ء-ي])', r'(?![ء-ي])'

SIGA_RULES = [
    ('vecedtü', r'وجدت(?:\s+\S+){0,2}?\s+(?:في|ب)\s*كتاب'),
    ('kara’tü', r'قرأت\s+على'),
    ('kurie', r'(?:قرئ\s+على|قراءة\s+عليه)'),
    ('haddesehüm', r'حدثهم'),
    ('haddesehû', r'(?:حدثه|حدثتها|حدثته)'),
    ('ahberahüm', r'أخبرهم'),
    ('ahberahû', r'(?:أخبره|أخبرته)'),
    ('haddesenâ', r'(?:حدثنا|حدثتنا|ثنا|قثنا|نا|حدثناه|حدثكم|حدثك)'),
    ('haddesenî', r'(?:حدثني|حدثتني|ثني)'),
    ('ahberanâ', r'(?:أخبرنا|أخبرتنا|أنا|أرنا)'),
    ('ahberanî', r'(?:أخبرني|أخبرتني|أرني)'),
    ('enbe’enâ', r'(?:أنبأنا|أنبأني)'),
    ('semi‘tü', r'سمعت'),
    ('semi‘a', r'سمع'),
    ('unbi’tü', r'(?:أنبئت|حدثت|أخبرت|بلغني|بلغنا)'),
    ('enne', r'(?:أنه|أنها|أن)'),
    ('an', r'عن'),
    ('kâle', r'(?:قالا|قالوا|قالت|قال|يقول|تقول)'),
]
SIGA_RE = re.compile('|'.join(f'(?P<s{i}>{B[0]}(?:و\\s*)?{p}{B[1]})' for i, (_, p) in enumerate(SIGA_RULES)))
NEBI = re.compile(r'^\s*[:،,]?\s*(?:رسول الله|النبي|نبي الله|الرسول)')
AR_BN = re.compile(B[0] + r'(?:بن|ابن|ابنة|بنت)' + B[1])
AR_ABU = re.compile(B[0] + r'(?:أبو|أبي|أبا|أبى)' + B[1])
AR_UMM = re.compile(B[0] + r'أم' + B[1])
AR_ABD = re.compile(r'عبد')
AR_VE = re.compile(r'(?:^|\s)و(?=[ء-ي])')
AR_EV = re.compile(B[0] + r'أو' + B[1])
AR_KIN = re.compile(B[0] + r'(?:أبيه|أبي|جده|جدي|عمه|عمي|أمه|أمي|أخيه|أخي|خاله|خالي|عمته|خالته|جدته|أبيها|جدها|أمها|عمها|أخيها|ابنه|ابنته)' + B[1])
TR_KIN = re.compile(r'\b(?:babası|dedesi|amcası|annesi|kardeşi|dayısı|halası|teyzesi|ninesi|oğlu|kızı)\b')
HC = re.compile(r'(?:^|[\s،,])ح(?=[\s،,]|$)')



def clean_index(ar):
    """Harekesiz metin ve harekesiz konum → harekeli konum eşlemesi."""
    out, idx = [], []
    for i, ch in enumerate(ar):
        if not DIA.match(ch):
            out.append(ch)
            idx.append(i)
    return ''.join(out), idx


def k_clean(ar, k, idx):
    if not isinstance(k, int) or k <= 0 or k > len(ar):
        return None
    # k harekeli konum; harekesizdeki karşılığı = k'dan küçük harekesiz konum sayısı
    lo, hi = 0, len(idx)
    while lo < hi:
        mid = (lo + hi) // 2
        if idx[mid] < k:
            lo = mid + 1
        else:
            hi = mid
    return lo


KESIM = re.compile(r'[:«»"”“؟.]|،(?!\s*أو)|\s(?=(?:رضي|رحمه|رحمها|رحمهما|صلى الله)(?![ء-ي]))')
KUYRUK = re.compile(r'\s*(?:رضي الله عن(?:هما|هم|ها|ه)\s*)?[،,:]?\s*(?:(?:قال|قالت|قالا|قالوا|يقول|تقول)(?![ء-ي])\s*[:،,]?\s*)?')


def adaylar(metin, sinir=None):
    """Arapça → [(sîga, ad, ad_sonu)]; lafızsız 'قال' ara sözleri ve Nebî'ye giden halka atılır.
    `sinir` verilirse yalnız o konumdan önce başlayan lafızlar alınır."""
    ms = list(SIGA_RE.finditer(metin))
    out = []
    for i, m in enumerate(ms):
        if sinir is not None and m.start() >= sinir:
            break
        siga = SIGA_RULES[int(m.lastgroup[1:])][0]
        end = ms[i + 1].start() if i + 1 < len(ms) else len(metin)
        ham = metin[m.end():end]
        bosluk = len(ham) - len(ham.lstrip(' :،,.؛\n'))
        km = KESIM.search(ham, bosluk)
        ad = ham[bosluk:km.start()] if km else ham[bosluk:]
        ad = ad.strip(' :،,.؛\n')
        ad_sonu = m.end() + (km.start() if km else len(ham))
        if NEBI.match(ham):
            continue
        if siga == 'kâle' and (not ad or len(ad) < 2):
            continue
        out.append((siga, ad, ad_sonu))
    return out


def tr_feat(hop):
    h = hop
    return {
        'bn': len(re.findall(r'\bb\.|\bİbn\b|\bbint\b|\bİbnü’', h)),
        'abu': len(re.findall(r'\bEb(?:û|î|ü’l-|i’l-|ü’d-|i’d-|ü’s-|i’s-|ü’ş-|i’ş-|ü’z-|i’z-|ü’r-|i’r-|ü’n-|i’n-|ü’t-|i’t-)', h)) + len(re.findall(r'\bEbu\b', h)),
        'umm': len(re.findall(r'\bÜmm[üi]', h)),
        'abd': len(re.findall(r'\bAbd', h)),
        've': h.count(' ve '),
        'ev': h.count(' ya da '),
        'kin': len(TR_KIN.findall(h)),
        'w': len([w for w in re.sub(r'\([^)]*\)', '', h).split() if w not in ('b.', 've', 'ya', 'da')]),
    }


def ar_feat(ad):
    return {
        'bn': len(AR_BN.findall(ad)),
        'abu': len(AR_ABU.findall(ad)),
        'umm': len(AR_UMM.findall(ad)),
        'abd': len(AR_ABD.findall(ad)),
        've': len(AR_VE.findall(ad)),
        'ev': len(AR_EV.findall(ad)),
        'kin': len(AR_KIN.findall(ad)),
        'w': len([w for w in re.sub(r'[^؀-ۿ\s]', ' ', ad).split() if w not in ('بن', 'و', 'أو')]),
    }


def birlestir(fs):
    out = collections.Counter()
    for f in fs:
        out.update(f)
    # Arapça "أبي" hem künye hem akrabalık sayılır; Türkçe 'babası' abu'ya da eklenir (tr_feat'ta değil, burada)
    return out


def maliyet(tf, af):
    c = abs(tf['bn'] - af['bn']) * 1.0
    # Arapça أبي/أبيه akrabalık; Türkçe babası → künye sayımına girmez, akrabalık sayımına girer
    c += abs(tf['abu'] + tf['kin'] - af['abu'] - af['kin']) * 0.8 if (tf['kin'] or af['kin']) else abs(tf['abu'] - af['abu']) * 1.0
    c += abs(tf['umm'] - af['umm']) * 1.0
    c += abs(tf['abd'] - af['abd']) * 0.6
    c += abs(tf['ve'] - af['ve']) * 0.6
    c += abs(tf['ev'] - af['ev']) * 0.8
    c += min(1.0, abs(tf['w'] - af['w']) * 0.15)
    return c


SKIP_A, SKIP_A_ON, SKIP_A_SON, SKIP_T = 1.2, 0.35, 0.3, 2.6


def hizala(hops, cands):
    """hops: Türkçe halkalar; cands: [(sîga, ad)]. → [sîga ya da None] (her halka için)."""
    n, m = len(hops), len(cands)
    tf = [tr_feat(h) for h in hops]
    af = [ar_feat(a) for _, a, _ in cands]
    INF = 1e9
    # dp[i][j]: ilk i halka ve ilk j aday işlendi
    dp = [[INF] * (m + 1) for _ in range(n + 1)]
    bt = [[None] * (m + 1) for _ in range(n + 1)]
    dp[0][0] = 0.0
    for j in range(1, m + 1):
        dp[0][j] = dp[0][j - 1] + SKIP_A_ON          # önek (müellif/nüsha zinciri)
        bt[0][j] = ('a', 0, j - 1)
    for i in range(1, n + 1):
        for j in range(0, m + 1):
            best, arg = dp[i - 1][j] + SKIP_T, ('t', i - 1, j)   # halka Arapçada bulunamadı
            if j >= 1:
                # aday atla (kalan halka yoksa ucuz: zincir sonrası قال/أن رسول الله artıkları)
                sk = dp[i][j - 1] + (SKIP_A_SON if i == n else SKIP_A)
                if sk < best:
                    best, arg = sk, ('a', i, j - 1)
                # eşle: bir aday ya da (ve kutusu için) 2–3 ardışık aday
                rmax = 3 if tf[i - 1]['ve'] else 1
                for r in range(1, rmax + 1):
                    if j - r < 0:
                        break
                    f = birlestir(af[j - r:j]) if r > 1 else af[j - 1]
                    if r > 1:
                        f = dict(f)
                        f['ve'] = f.get('ve', 0) + (r - 1 if f.get('ve', 0) < r - 1 else 0)
                    c = dp[i - 1][j - r] + maliyet(tf[i - 1], f) + (0.2 * (r - 1))
                    if c < best:
                        best, arg = c, ('m', i - 1, j - r, r)
            dp[i][j] = best
            bt[i][j] = arg
    # en ucuz bitiş: bütün halkalar işlenmiş, adaylar kısmen (artıklar ucuz)
    j = m
    sig = [None] * n
    son = [None] * n
    i = n
    cost = dp[n][m]
    while i > 0 or j > 0:
        a = bt[i][j]
        if a[0] == 'm':
            _, i2, j2, r = a
            sig[i2] = cands[j2][0]
            son[i2] = j2 + r - 1
            i, j = i2, j2
        elif a[0] == 'a':
            i, j = a[1], a[2]
        else:
            i, j = a[1], a[2]
    return sig, son, cost


def madde_isle(lib, h, rapor, yer):
    no, sened, metin, ziyade, info, ar = h
    if not isinstance(info, dict) or not info.get('c') or not ar or not sened:
        return False
    c = info['c']
    coklu = isinstance(c[0], list)
    zs = c if coklu else [c]
    degisti = False
    arc, idx = clean_index(ar)
    kc = k_clean(ar, info.get('k'), idx)
    bas = kc if kc else max(60, len(arc) // 3)
    # c[0] ve önek: isnadın başındaki nüsha/müellif zinciri (dogrula.ONEK) halka değildir
    isnad0 = arc[:bas]
    isnad1, c0_yeni = onek_dus(lib, isnad0)
    kayma = len(isnad0) - len(isnad1)
    govde = arc[kayma:]
    # eski `k` erken kalmış olabilir: isnad bölgesinden sonra 220 harf içindeki lafızlar da aday olur
    sinir = (bas - kayma) + 220
    # tahvîl bölütleri (yalnız isnad bölgesinde aranır)
    hc = [m.start() for m in HC.finditer(govde) if m.start() < bas - kayma]
    if len(hc) == len(zs) - 1 and len(zs) > 1:
        sinirlar = [0] + [h + 1 for h in hc] + [None]
        bolut_c = []
        for p in range(len(zs)):
            b0, b1 = sinirlar[p], sinirlar[p + 1]
            parca = adaylar(govde[: (b1 if b1 is not None else len(govde))], sinir if b1 is None else None)
            bolut_c.append([c for c in parca if c[2] > b0])
        cand_sets = [bolut_c[p] + bolut_c[-1] if p < len(zs) - 1 else bolut_c[-1] for p in range(len(zs))]
    else:
        tum = adaylar(govde, sinir)
        cand_sets = [tum for _ in zs]

    yeni_zs, son_sonu = [], None
    for p, z in enumerate(zs):
        adlar, sigalar = z[0::2], z[1::2]
        hops = adlar[1:]
        sig, son, cost = hizala(hops, cand_sets[p])
        yeni = [c0_yeni or adlar[0]]
        for i, hop in enumerate(hops):
            s = sig[i]
            if s is None:
                s = 'kâle' if i == len(hops) - 1 else 'an'
                rapor['eslesmedi'].append(f'{yer}: {hop} → {s} (Arapçada lafız bulunamadı)')
            yeni.extend([s, hop])
        if cost > 3.0 + 0.5 * len(hops):
            rapor['pahali'].append(f'{yer}: hizalama belirsiz (maliyet {cost:.1f}) — {sened[:70]}')
        yeni_zs.append(yeni)
        if p == len(zs) - 1 and son[-1] is not None:
            son_sonu = cand_sets[p][son[-1]][2]
    # k: son halkanın adından (varsa saygı ifadesi ve "قال:" ile) sonra metin başlar
    if son_sonu is not None:
        km = KUYRUK.match(govde, son_sonu)
        kc_yeni = kayma + (km.end() if km else son_sonu)
        k_yeni = idx[kc_yeni] if kc_yeni < len(idx) else len(ar)
        if 0 < k_yeni < len(ar) and k_yeni != info.get('k'):
            info['k'] = k_yeni
            degisti = True
    yeni_c = yeni_zs if coklu else yeni_zs[0]
    if yeni_c != c:
        info['c'] = yeni_c
        degisti = True
    return degisti


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    rapor_yolu = None
    if '--rapor' in sys.argv:
        rapor_yolu = sys.argv[sys.argv.index('--rapor') + 1]
        if rapor_yolu in args:
            args.remove(rapor_yolu)
    libs = args or LIBS
    rapor = collections.defaultdict(list)
    for lib in libs:
        idx_p = R / lib / 'index.json'
        if not idx_p.exists():
            continue
        idx = json.load(open(idx_p, encoding='utf-8'))
        n_tot = n_deg = 0
        for b in idx:
            tr_p = R / lib / 'tr' / b['f']
            if not tr_p.exists():
                continue
            data = json.load(open(tr_p, encoding='utf-8'))
            dosya_degisti = False
            for bab in data.get('babs', []):
                for h in bab.get('h', []):
                    if not isinstance(h, list) or len(h) != 6:
                        continue
                    n_tot += 1
                    if madde_isle(lib, h, rapor, f'{lib} {b["f"]} {h[0]}'):
                        n_deg += 1
                        dosya_degisti = True
            if dosya_degisti:
                tr_p.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
        print(f'{lib:12s}: {n_tot:5d} madde, {n_deg:5d} panel değişti')
    print(f'eşleşmeyen halka: {len(rapor["eslesmedi"])}, belirsiz hizalama: {len(rapor["pahali"])}')
    if rapor_yolu:
        with open(rapor_yolu, 'w', encoding='utf-8') as f:
            for k in ('eslesmedi', 'pahali'):
                f.write(f'## {k} ({len(rapor[k])})\n')
                f.write('\n'.join(rapor[k]) + '\n\n')


if __name__ == '__main__':
    main()
