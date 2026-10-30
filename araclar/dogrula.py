"""İsnad standardına uyan kitaplıkların yayımlanmış verisini (tr/*.json) denetler.
Token harcamaz; her derlemeden sonra ve yayından önce çalıştırılır.

Kullanım:
  python3 araclar/dogrula.py sunan            # bir kitaplık
  python3 araclar/dogrula.py sunan musned     # birkaç kitaplık
  python3 araclar/dogrula.py sunan --dosya s03.json   # tek dosya
  python3 araclar/dogrula.py sunan --ravi     # ad ve hoca-öğrenci kenarlarını ravi.json'a karşı da denetle
  python3 araclar/dogrula.py sunan --hepsi    # her sorunu yaz (varsayılan: tür başına ilk 8)
  python3 araclar/dogrula.py sunan --json rapor.json

Çıkış kodu: hata varsa 1 (uyarılar çıkış kodunu etkilemez).
Denetimler SPEC.md'deki şartnameyi uygular; yeni kural eklenince buraya da eklenir.
"""
import json, re, sys, collections
from pathlib import Path

R = Path(__file__).resolve().parents[1]
RAVI = R / 'araclar' / 'ravi' / 'ravi.json'

# Zincirin başındaki müellif (c[0]). Yeni kitaplık eklenince buraya yazılır.
MUELLIF = {
    'sunan': 'Ebû Dâvûd',
    'musned': ('Ahmed b. Hanbel', 'Abdullah b. Ahmed'),
    'seria': 'el-Âcurrî',
    'ibnebiseybe': 'İbn Ebî Şeybe',
    'ahmed': ('Ahmed b. Hanbel', 'Abdullah b. Ahmed'),
    'zuhd': ('Ahmed b. Hanbel', 'Abdullah b. Ahmed'),
    'fezail': ('Ahmed b. Hanbel', 'Abdullah b. Ahmed'),
    'acurri': 'el-Âcurrî',
    'hallal': 'el-Hallâl',
    'safii': 'eş-Şâfiî',
    'buhari': 'el-Buhârî',
    'ebudavud': 'Ebû Dâvûd',
    'harb': 'Harb b. İsmâîl',
    'darimi': 'ed-Dârimî',
    'ibane': 'İbn Batta',
    'leys': 'Leys b. Sa‘d',
    # Zührî kitaplığı: cüzü rivayet eden İbrâhîm el-Hemedânî'nin kitap başındaki rivayetleri onun adıyla; Zührî'nin metni senedsiz
    'zuhri': ('ez-Zührî', 'İbrâhîm b. el-Hüseyin el-Hemedânî'),
    'hemmam': 'Hemmâm b. Münebbih',
    # Müsnedü Ukbe: cem‘ İbn Kutluboğa’nındır; maddenin başı alındığı eserin müellifidir
    'ukbe': ('Ahmed b. Hanbel', 'et-Taberânî', 'İbn Kutluboğa', 'İbn Mâce', 'Ebû Dâvûd', 'Müslim', 'en-Nesâî', 'Ebû Nuaym', 'et-Tahâvî', 'ed-Dârekutnî'),
    'ibnvehb': 'İbn Vehb',
    'musannef': 'İbn Ebî Şeybe',
}
# Müellifin metin içi notlarının Arapça ve Türkçe kalıbı (sayıları eşleşmeli)
MUELLIF_NOT = {'sunan': (r'قال أبو داود', r'Ebû Dâvûd (?:dedi|der|şöyle)'),
               'seria': (r'قال محمد بن الحسين', r'(?:Âcurrî|Muhammed b\. el-Hüseyn) (?:dedi|der|şöyle)'),
               'musned': (r'قال عبد الله(?!\s+بن)', r'Abdullah (?:dedi|der|şöyle)'),
               'darimi': (r'قال أبو سعيد(?!\s+يعني)', r'Ebû Saîd(?:\s*\(rahimehullah\))? dedi ki')}

SIGALAR = {'haddesenâ', 'haddesenî', 'ahberanâ', 'ahberanî', 'enbe’enâ', 'semi‘tü', 'semi‘a', 'an', 'enne', 'kâle',
           'haddesehû', 'haddesehüm', 'ahberahû', 'ahberahüm', 'kara’tü', 'kurie', 'unbi’tü', 'ketebe ileyye', 'vecedtü'}
HAREKE = re.compile(r'[ً-ْٰـ]')
SALAVAT = re.compile(r'صلى الله عليه وسلم|صلى الله عليه وآله وسلم|صلى عليه وسلم')
ARAPCA = re.compile(r'[؀-ۿ]{3,}')
BIRINCI_SAHIS = re.compile(r'(?:^|→\s*)(?:babam|dedem|amcam|annem|kardeşim|dayım|halam|ninem)\b')
SENED_NOT = re.compile(r'\((?:[^)]*?)(?:dedi|lafz|“|”|rivayet)[^)]*\)')
YASAK = re.compile(r'rivayet edildiğine göre\)|\(şöyle rivayet etti\)')
# Sened satırında saygı ifadesi yazılmaz; yalnız tanımlayıcı râvi etiketinin içindeki
# “Nebî’nin ﷺ ashâbından biri” / “Resûlullah ﷺ ile …” kalıbı serbesttir.
SAYGI_SENED = re.compile(r'radıyallâhu|aleyhisselâm|rahmetullâhi|rahimehullah|rahimehallâh|rahimehümullah|\(رحمه الله\)|(?:^|[^’\w])(?!Nebî|Resûlullah|Muhammed)\S+\s+ﷺ')
# Sened satırı yalnız ad ve ok: “(yine)”, “(metinde böyle)”, yer/zaman notu, ad sonunda “—”, yol ayracından sonra ok dışı metin
SENED_KIRLI = re.compile(r'\((?:yine|metinde böyle|metin [^)]*bozuk|[^)]*’d[ae]\b[^)]*)\)|—\s*(?:→|$|;)|;(?!\s*ayrıca\s)')
# Merfû hadiste zincir sahâbîyle biter; Nebî/Resûlullah zincire yazılmaz (tanımlayıcı etiket hariç: “Nebî’nin ﷺ ashâbından biri”)
SON_NEBI = re.compile(r'(?:^|→\s*)(?:Nebî|Resûlullah|Allah Resûlü|Peygamber)\s*ﷺ?\s*$')
# Arapça isnadın başındaki nüsha/müellif öneği: panelde halka değildir (c[0] müellif), sîga sayımından
# ve siga_hizala.py'deki eşlemeden düşülür. Eşleşme sonucu `c[0]` kararıdır (None = mevcut c[0] korunur).
_AY = r'\s*[،,:]?\s*(?:قال\s*[:،,]?\s*)?'
_ABD = r'عبد الله(?:\s+بن\s+أحمد(?:\s+بن\s+(?:محمد\s+بن\s+)?حنبل)?)?'
_LAFIZ = r'(?:و?(?:حدثني|حدثنا|ثني|ثنا|نا|أخبرني|أخبرنا|قال)\s+)'
_AHMED = [
    (re.compile(r'^\s*(?:قال\s*[:،,]?\s*)?' + _LAFIZ + '?' + _ABD + _AY + _LAFIZ + r'أبي(?![ء-ي])' + _AY), 'Ahmed b. Hanbel'),
    (re.compile(r'^\s*(?:قال\s*[:،,]?\s*)?' + _LAFIZ + r'أبي(?![ء-ي])' + _AY), 'Ahmed b. Hanbel'),
    (re.compile(r'^\s*(?:قال\s*[:،,]?\s*)?' + _LAFIZ + r'أحمد\s+بن\s+(?:محمد\s+بن\s+)?حنبل' + _AY), 'Ahmed b. Hanbel'),
    (re.compile(r'^\s*(?:قال\s*[:،,]?\s*)?' + _LAFIZ + _ABD + _AY), 'Abdullah b. Ahmed'),
]
ONEK = {
    # Musannef: nüsha râvisinin (… Bakî b. Mahled →) “حدثنا أبو بكر قال:” kaydı; c[0] = İbn Ebî Şeybe
    'musannef': [(re.compile(r'^\s*(?:(?:و?(?:حدثنا|أخبرنا|ثنا|نا)\s+)?[^:؛]{0,90}?بقي\s+بن\s+مخلد[^:؛]{0,30}?(?:قال)?\s*[:،,]?\s*)?(?:و?(?:حدثنا|ثنا|نا|أخبرنا)\s+)?(?:قال\s+)?أبو\s+بكر(?:\s+عبد\s+الله)?(?:\s+بن\s+محمد)?(?:\s+بن\s+أبي\s+شيبة)?(?:\s+العبسي)?(?:\s+رحمه\s+الله)?' + _AY + r'(?=(?:و?(?:حدثنا|ثنا|نا|أخبرنا|حدثني|أخبرني|سمعت|عن|بلغني)(?![ء-ي])))'), None)],
    'zuhd': _AHMED, 'fezail': _AHMED, 'ahmed': _AHMED,
    # Müsned: Abdullah'ın kendi öneği “حدثنا عبد الله، (قال:)” halka değildir (c[0] derle.py'de seçilir);
    # “حدثني أبي …” ve “وجدت في كتاب أبي” kalır, babası halkasının sîgası olur.
    'musned': [(re.compile(r'^\s*(?:قال\s*[:،,]?\s*)?(?:حدثنا|ثنا)\s+عبد الله\s*[،,]\s*(?:قال\s*[:،,]?\s*)?(?=\S)'), None),
               (re.compile(r'^\s*قال\s+أبو\s+عبد\s+الرحمن\s*[:،,]?\s*'), None)],
    'buhari': [(re.compile(r'^\s*(?:و?(?:حدثنا|ثنا|أخبرنا)\s+)محمود(?:\s+بن\s+إسحاق)?' + _AY + r'(?:و?(?:حدثنا|ثنا|أخبرنا|حدثني)\s+)?(?:أبو عبد الله\s+)?(?:محمد\s+بن\s+إسماعيل\s+)?البخاري' + _AY), None)],
    'safii': [(re.compile(r'^\s*(?:و?(?:حدثنا|ثنا|أخبرنا)\s+)الربيع(?:\s+بن\s+سليمان)?' + _AY + r'(?:و?(?:حدثنا|ثنا|أخبرنا)\s+)الشافعي' + _AY), None)],
    # Fevâidü'l-Leys: kitabı rivayet eden nüsha zinciri (… → İbn Bükeyr / Îsâ b. Hammâd → الليث) düşülür, c[0] = Leys b. Sa‘d
    'leys': [(re.compile(r'^.*?(?:حدثني|حدثنا|ثنا|أخبرنا)\s+الليث(?:\s+بن\s+سعد)?' + _AY), None)],
    'zuhri': [(re.compile(r'^\s*وبه\s*[،,]?\s*'), None)],
    # İbn Vehb: maddeler nüsha râvisinin “قال:” / “قال ابن وهب:” kaydıyla başlar
    'ibnvehb': [(re.compile(r'^\s*(?:بسم الله الرحمن الرحيم\s*[،,]?\s*)?(?:حرملة بن يحيى\s*[،,]?\s*قال\s*[:،,]?\s*أخبرنا عبد الله بن وهب\s*[،,]?\s*)?(?:قال\s+ابن\s+وهب|قال)?\s*[:،,]?\s*'), None)],
    'acurri': [(re.compile(r'^\s*(?:و?(?:حدثنا|ثنا|أخبرنا|أنا)\s+)(?:أبو بكر|محمد(?:\s+بن\s+الحسين)?)(?:\s+(?:بن\s+الحسين\s+)?الآجري)?' + _AY + r'(?=(?:و?(?:حدثنا|ثنا|أخبرنا|أنا|حدثني|أخبرني|قال)' + r'(?![ء-ي])))'), None)],
}


def onek_dus(lib, isnad):
    """Isnadın başındaki nüsha/müellif öneğini düşürür → (kalan isnad, c[0] kararı ya da None)."""
    for pat, c0 in ONEK.get(lib, []):
        m = pat.match(isnad)
        if m:
            return isnad[m.end():], c0
    return isnad, None


SIGA_AR = {
    'an': r'(?<![ء-ي])عن(?![ء-ي])',
    'haddesenâ': r'(?<![ء-ي])(?:و?حدثنا|و?ثنا|قثنا|و?حدثكم|و?حدثك|(?<=[\s،,:])نا)(?![ء-ي])',
    'haddesenî': r'(?<![ء-ي])و?حدثت?ني(?![ء-ي])',
    'ahberanâ': r'(?<![ء-ي])(?:و?أخبرنا|و?أنا|و?أنبأنا)(?![ء-ي])',
    'ahberanî': r'(?<![ء-ي])و?أخبرت?ني(?![ء-ي])',
    'semi‘tü': r'(?<![ء-ي])سمعت(?![ء-ي])',
    'ketebe ileyye': r'(?<![ء-ي])و?كتب\s+إلي(?![ء-ي])',
    'vecedtü': r'(?<![ء-ي])وجدت(?![ء-ي])',
}


def num(x):
    return x if isinstance(x, (int, float)) else float(x)


def zincir_adlari(sened):
    """Sened satırı → yolların ad listeleri."""
    return [[a.strip() for a in yol.split('→')] for yol in sened.split('; ayrıca')]


def info_zincirleri(info):
    c = info.get('c') if isinstance(info, dict) else None
    if not c:
        return []
    return c if isinstance(c[0], list) else [c]


class Rapor:
    def __init__(self):
        self.hata = collections.defaultdict(list)
        self.uyari = collections.defaultdict(list)

    def h(self, tur, yer, ayr=''):
        self.hata[tur].append(f'{yer}{": " + ayr if ayr else ""}')

    def u(self, tur, yer, ayr=''):
        self.uyari[tur].append(f'{yer}{": " + ayr if ayr else ""}')


def madde_denetle(rp, lib, dosya, h, ravi, bab_i):
    yer = f'{dosya} {h[0] if h else "?"}'
    if not isinstance(h, list) or len(h) != 6:
        rp.h('alan sayısı', yer, f'{len(h) if isinstance(h, list) else type(h).__name__} alan (6 olmalı)')
        return
    no, sened, metin, ziyade, info, ar = h
    sened, metin, ar = sened or '', metin or '', ar or ''
    if not metin.strip():
        rp.h('boş metin', yer)
    if not ar.strip():
        rp.h('boş Arapça', yer)
    if '(?)' in metin or '(?)' in sened:
        rp.h('(?) kalmış', yer)
    if '|' in metin or '|' in sened:
        rp.h('| karakteri', yer)
    if re.search(r'ﷺ[’\'][A-Za-zÂÎÛÇŞĞİÖÜâîûçşğiöü]', metin + sened):
        rp.h('ﷺ’den sonra ek', yer)
    if YASAK.search(metin):
        rp.h('yasak kalıp', yer)
    if ARAPCA.search(metin) and not re.search(r'[“‘(]', metin):
        rp.u('metinde Arapça kalmış', yer)
    if ziyade not in (0, 1, 2, 3):
        rp.h('ziyade alanı', yer, repr(ziyade))
    muellif = MUELLIF.get(lib)
    muellifler = (muellif,) if isinstance(muellif, str) else tuple(muellif or ())

    # --- sened satırı ---
    if sened:
        yollar = zincir_adlari(sened)
        if any(not a for y in yollar for a in y):
            rp.h('senedde boş halka', yer)
        if BIRINCI_SAHIS.search(sened):
            rp.h('senedde birinci şahıs akrabalık', yer, sened[:80])
        if SENED_NOT.search(sened):
            rp.h('senedde not kalmış', yer, sened[:80])
        if SAYGI_SENED.search(sened):
            rp.h('senedde saygı ifadesi', yer, sened[:80])
        if SENED_KIRLI.search(sened):
            rp.h('senedde not kalmış', yer, sened[:80])
        if any(SON_NEBI.search(y) for y in sened.split('; ayrıca ')):
            rp.h('zincir Nebî ile bitiyor', yer, sened[:80])
        if '(aynı sened)' in sened or 'aynı sened' in sened:
            rp.h('senedde sahte halka', yer, sened[:80])
        if muellifler and yollar and yollar[0] and yollar[0][0] in muellifler:
            rp.h('müellif sened satırında', yer)
    # --- info / râvi paneli ---
    zs = info_zincirleri(info)
    if sened and not zs:
        rp.h('râvi paneli yok', yer)
    if not sened and zs:
        rp.h('sened boş ama panel var', yer)
    if info is not None and not isinstance(info, dict):
        rp.h('info türü', yer, type(info).__name__)
    if isinstance(info, dict):
        for k in info:
            if k not in ('c', 'n', 'k', 'l'):
                rp.u('info bilinmeyen anahtar', yer, k)
        for x in info.get('n') or []:
            if not isinstance(x, str) or not x.strip():
                rp.h('boş panel notu', yer)
            elif '(?)' in x:
                rp.h('(?) kalmış', yer, 'panel notu')
    if sened and zs:
        yollar = zincir_adlari(sened)
        if len(zs) != len(yollar):
            rp.h('yol sayısı', yer, f'sened {len(yollar)}, panel {len(zs)}')
        for i, z in enumerate(zs):
            if len(z) < 3 or len(z) % 2 == 0:
                rp.h('panel zinciri biçimi', yer, f'{i + 1}. yol {len(z)} öğe')
                continue
            if muellifler and z[0] not in muellifler:
                rp.h('panel müellifle başlamıyor', yer, z[0])
            kotu = [s for s in z[1::2] if s not in SIGALAR]
            if kotu:
                rp.h('bilinmeyen sîga', yer, ', '.join(kotu))
            if i < len(yollar) and z[2::2] != yollar[i]:
                rp.h('sened ile panel adları farklı', yer, f'{i + 1}. yol: sened {yollar[i]} ≠ panel {z[2::2]}')
            if any(not isinstance(a, str) or not a.strip() for a in z[0::2]):
                rp.h('panelde boş ad', yer)
        # k: metnin Arapçada başladığı konum
        k = info.get('k')
        if k is None:
            rp.u('k yok', yer)
        elif not isinstance(k, int) or not 0 <= k < len(ar):
            rp.h('k aralık dışı', yer, f'k={k}, uzunluk {len(ar)}')
        else:
            # k = 0: Arapçada isnad metni yok (Sahîfetü Hemmâm gibi; zincir nüsha senedinden gelir)
            if k and ar[k - 1] not in ' «"،,:.؟)(\n':
                rp.u('k kelime ortasında', yer, repr(ar[max(0, k - 8):k + 8]))
            isnad, _ = onek_dus(lib, HAREKE.sub('', ar[:k]))
            # tahvîl
            if re.search(r'(?:^|[\s،,])ح(?:[\s،,]|$)', isnad) and len(zs) == 1:
                rp.u('tahvîl (ح) var, tek yol', yer)
            # sîga sayımı: tekrarsız kenarlardaki sîgalar ↔ isnaddaki Arapça işaretler
            kenar = set()
            for z in zs:
                adlar, sigalar = z[0::2], z[1::2]
                for j, s in enumerate(sigalar):
                    kenar.add((adlar[j], s, adlar[j + 1]))
            # “قالا: حدثنا” gibi ortak lafızlar için (sîga, hoca) çifti bir kez sayılır
            say = collections.Counter(s for s, _ in {(s, hc) for _, s, hc in kenar})
            for s, pat in SIGA_AR.items():
                a = len(re.findall(pat, isnad))
                t = say.get(s, 0)
                if s == 'ahberanâ':
                    t += say.get('enbe’enâ', 0)
                if abs(a - t) >= 2 and max(a, t) >= 2:
                    rp.u('sîga sayısı uyuşmuyor', yer, f'{s}: Arapça {a}, panel {t}')
        # son halka ↔ metnin başı (merfû/mevkûf için yumuşak denetim)
        # Anlatı rivayetlerinde (son sîga kâle) metin anlatıcıyla başlar; o durumda denetlenmez.
        son = zs[0][-1]
        son_siga = zs[0][-2] if len(zs[0]) >= 3 else ''
        son_temel = re.sub(r'\s*\(.*?\)', '', son).split(' ve ')[0].strip()
        ilk = metin[:80]
        anahtar = [w for w in re.split(r'[\s’]', son_temel) if len(w) > 2 and w not in ('Ebû', 'Ebü’l-', 'İbn', 'Ümmü', 'bir', 'adam')]
        if son_siga != 'kâle' and anahtar and not any(w in ilk for w in anahtar) \
                and not re.match(r'^(Aynı|Bu |Bunun|Buna|Onun|\(|Resûlullah|Nebî|Ebû Dâvûd)', metin):
            rp.u('metin son râviyle başlamıyor', yer, f'son: {son} · metin: {ilk[:50]}')
    # --- Arapça ↔ Türkçe sayımlar ---
    sal = len(SALAVAT.findall(ar))
    tr_sal = (metin + sened).count('ﷺ') + sum(x.count('ﷺ') for x in (info or {}).get('n', []) if isinstance(info, dict))
    if tr_sal < sal:
        rp.u('ﷺ eksik', yer, f'Türkçe {tr_sal}, Arapça {sal}')
    if lib in MUELLIF_NOT:
        a_pat, t_pat = MUELLIF_NOT[lib]
        a, t = len(re.findall(a_pat, ar)), len(re.findall(t_pat, metin))
        if t < a:
            rp.u('müellif notu eksik', yer, f'Türkçe {t}, Arapça {a}')
    # Oran harekesiz Arapçaya ve nüsha/müellif öneği düşülmüş metne göre: harekeli neşirlerde (Müsned vb.)
    # harekeler oranı yapay olarak düşürüyordu. Eşik Sünen'de (harekesiz) ayarlandı; sadık çevirilerde medyan ≈1,3.
    ar_say, _ = onek_dus(lib, HAREKE.sub('', ar))
    if len(ar_say) > 120 and (len(sened) + len(metin)) / len(ar_say) < 0.75:
        rp.u('çeviri kısa olabilir', yer, f'oran {(len(sened) + len(metin)) / len(ar_say):.2f}')
    # --- râvi veritabanı ---
    if ravi and zs:
        rdb, kenarlar = ravi['ravi'], ravi['_kenar']
        for z in zs:
            adlar, sigalar = z[0::2], z[1::2]
            for j, kutu in enumerate(adlar):
                if j == 0:
                    continue
                for ad in parcala(kutu):
                    if ad not in rdb:
                        rp.u('râvi veritabanında yok', yer, ad)
                if j + 1 < len(adlar):
                    for o in parcala(kutu):
                        for hc in parcala(adlar[j + 1]):
                            if (o, hc) not in kenarlar:
                                rp.u('yeni hoca-öğrenci kenarı', yer, f'{o} ← {hc}')


def parcala(ad):
    if ' ve ' not in ad:
        return [ad]
    parts, depth, cur, i = [], 0, '', 0
    while i < len(ad):
        ch = ad[i]
        depth += (ch == '(') - (ch == ')')
        if depth == 0 and ad.startswith(' ve ', i):
            parts.append(cur.strip()); cur = ''; i += 4; continue
        cur += ch; i += 1
    parts.append(cur.strip())
    return [p for p in parts if p]


def kitaplik_denetle(lib, rp, dosyalar=None, ravi=None):
    idx_p = R / lib / 'index.json'
    if not idx_p.exists():
        rp.h('kitaplık yok', lib)
        return 0
    idx = json.load(open(idx_p, encoding='utf-8'))
    toplam = 0
    for b in idx:
        if not b.get('t') or (dosyalar and b['f'] not in dosyalar):
            continue
        p = R / lib / 'tr' / b['f']
        try:
            d = json.load(open(p, encoding='utf-8'))
        except Exception as e:
            rp.h('JSON okunamadı', b['f'], str(e)[:80]); continue
        nums = []
        for bi, bb in enumerate(d.get('babs', [])):
            if not isinstance(bb.get('t'), str):
                rp.h('bab başlığı türü', f'{b["f"]} bab {bi + 1}')
            if not bb.get('h'):
                rp.u('boş bab', f'{b["f"]} bab {bi + 1}', bb.get('t', '')[:40])
            for h in bb.get('h', []):
                if isinstance(h, list) and h:
                    nums.append(h[0])
                madde_denetle(rp, lib, b['f'], h, ravi, bi)
        toplam += len(nums)
        if len(nums) != b['t']:
            rp.h('index t uyuşmuyor', b['f'], f"t={b['t']}, dosyada {len(nums)}")
        dup = [n for n, c in collections.Counter(nums).items() if c > 1]
        if dup:
            rp.h('tekrar numara', b['f'], str(dup[:6]))
        try:
            if [num(n) for n in nums] != sorted(num(n) for n in nums):
                rp.h('sıra bozuk', b['f'])
            disari = [n for n in nums if not b['from'] <= num(n) < b['to'] + 1]
            if disari:
                rp.h('aralık dışı numara', b['f'], str(disari[:6]))
        except (TypeError, ValueError):
            rp.h('numara türü', b['f'])
    return toplam


def ravi_yukle():
    if not RAVI.exists():
        return None
    d = json.load(open(RAVI, encoding='utf-8'))
    d['_kenar'] = {(o, hc) for o, _, hc, _ in d['kenar']}
    return d


def main(argv):
    libs = [a for a in argv if not a.startswith('--') and not argv[max(0, argv.index(a) - 1)] in ('--dosya', '--json')]
    dosyalar = set()
    json_out = None
    for i, a in enumerate(argv):
        if a == '--dosya' and i + 1 < len(argv):
            dosyalar.add(argv[i + 1])
        if a == '--json' and i + 1 < len(argv):
            json_out = argv[i + 1]
    hepsi = '--hepsi' in argv
    ravi = ravi_yukle() if '--ravi' in argv else None
    if '--ravi' in argv and ravi is None:
        print('ravi.json yok; önce python3 araclar/ravi/ravi_kur.py')
    if not libs:
        print(__doc__); return 2
    rp = Rapor()
    toplam = 0
    for lib in libs:
        toplam += kitaplik_denetle(lib, rp, dosyalar or None, ravi)
    limit = None if hepsi else 8
    nh = sum(len(v) for v in rp.hata.values())
    nu = sum(len(v) for v in rp.uyari.values())
    print(f'{", ".join(libs)}: {toplam} madde denetlendi — {nh} hata, {nu} uyarı')
    for baslik, grup in (('HATA', rp.hata), ('UYARI', rp.uyari)):
        for tur, liste in sorted(grup.items(), key=lambda x: -len(x[1])):
            print(f'\n[{baslik}] {tur} ({len(liste)})')
            for x in liste[:limit]:
                print('  ', x)
            if limit and len(liste) > limit:
                print(f'   … {len(liste) - limit} tane daha (--hepsi)')
    if json_out:
        Path(json_out).write_text(json.dumps({'hata': rp.hata, 'uyari': rp.uyari}, ensure_ascii=False, indent=1), encoding='utf-8')
        print('\nrapor:', json_out)
    return 1 if nh else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
