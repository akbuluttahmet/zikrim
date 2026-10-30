"""cikti/p*.txt çevirilerini musned/tr/mNNN.json ve musned/index.json'a derler.
Varsayılan kipte yalnız tüm parçaları tamamlanmış bölümler musned/tr/mNNN.json'a yazılır;
tamamlanmamış bölümlerin eski dosyaları (araclar/musned/eski_tr/) korunur.
--kismi kipinde ise tamamlanmış tüm parçalar doğrulama (siga_hizala.py / dogrula.py) için derlenir.

Kullanım: python3 araclar/musned/derle.py [--kismi] [--hepsi-zorunlu]
"""
import json, re, shutil, sys
from pathlib import Path
from denetle import denetle, oku, kaynak, metin_basi

D = Path(__file__).parent
ROOT = Path(__file__).resolve().parents[2]
ESKI = D / 'eski_tr'
CACHE_P = D / 'panel_cache.json'
S = json.loads((D / 'kaynak.json').read_text(encoding='utf-8'))
plan = json.loads((D / 'plan.json').read_text(encoding='utf-8'))
zorunlu = '--hepsi-zorunlu' in sys.argv
kismi = '--kismi' in sys.argv
HAREKE = re.compile(r'[ً-ْٰـ]')


def muellif_sec(ar, ziyade):
    """Müsned c[0] kuralı:
    - ziyade 2 (•) veya 3 (°, vicâde) ya da Arapçası 'حدثنا عبد الله' ile başlayıp
      'حدثني أبي' içermeyen Abdullah ziyâdelerinde: 'Abdullah b. Ahmed'
    - diğerlerinde: 'Ahmed b. Hanbel'
    """
    if ziyade in (2, 3):
        return 'Abdullah b. Ahmed'
    arc = HAREKE.sub('', ar[:160])
    # Abdullah'ın künyesiyle başlayan kendi rivayetleri (قال أبو عبد الرحمن: حدثني …)
    if re.match(r'^\s*قال\s+أبو\s+عبد\s+الرحمن', arc):
        return 'Abdullah b. Ahmed'
    # Babasıyla birlikte başka bir hocadan (حدثني أبي وأبو خيثمة): ilk kutu “babası ve X”, c[0] Abdullah
    if re.match(r'^\s*(?:حدثنا|ثنا)\s+عبد الله\s*[،,]?\s*(?:حدثني|حدثنا|ثني|ثنا)\s+أبي\s*[،,]?\s*و', arc):
        return 'Abdullah b. Ahmed'
    if re.match(r'^\s*(?:حدثنا|ثنا)\s+(?:أبو عبد الرحمن\s+)?عبد الله(?:\s+بن\s+أحمد(?:\s+بن\s+محمد\s+بن\s+حنبل)?)?\s*[،,]', arc):
        if not re.search(r'(?:حدثني|حدثنا|ثني|ثنا)\s+أبي\b', arc):
            return 'Abdullah b. Ahmed'
    return 'Ahmed b. Hanbel'


# Önce mevcut musned/tr/*.json içindeki hizalanmış panelleri önbelleğe al
panel_cache = json.loads(CACHE_P.read_text(encoding='utf-8')) if CACHE_P.exists() else {}
eski_index = json.loads((ESKI / 'index.json').read_text(encoding='utf-8'))
index = json.loads((ROOT / 'musned/index.json').read_text(encoding='utf-8'))
for idx_i, meta in enumerate(index, 1):
    if 'f' not in meta:
        meta['f'] = f'm{idx_i:03d}.json'
    f_cur = ROOT / 'musned/tr' / meta['f']
    if f_cur.exists() and meta.get('t', 0) > 0:
        try:
            d_cur = json.loads(f_cur.read_text(encoding='utf-8'))
            for bb in d_cur.get('babs', []):
                for h in bb.get('h', []):
                    if isinstance(h, list) and len(h) > 4 and isinstance(h[4], dict) and 'k' in h[4]:
                        panel_cache[str(h[0])] = h[4]
        except Exception:
            pass

yazilan_bolum = 0
toplam_madde = 0
UYARI = ('râvi eksik olabilir', 'kısa olabilir')

for si, sec in enumerate(S, 1):
    parts = [p[0] for p in plan if p[1] == si]
    tamam_parts = []
    for p in parts:
        if not (D / 'cikti' / f'{p}.txt').exists():
            if zorunlu:
                sys.exit(f'bölüm {si}: {p} çıktı dosyası yok')
            break
        errs = [e for e in denetle(p) if not any(u in e for u in UYARI)]
        if errs:
            sys.exit(f'bölüm {si} ({p}): denetim hatası: {errs[:5]}')
        tamam_parts.append(p)

    dosya = index[si - 1]['f']
    f_out = ROOT / 'musned/tr' / dosya
    bolum_tam = (len(tamam_parts) == len(parts))

    if not tamam_parts or (not bolum_tam and not kismi):
        eski_f = ESKI / dosya
        if not kismi and eski_f.exists():
            shutil.copyfile(eski_f, f_out)
            index[si - 1]['t'] = eski_index[si - 1].get('t', 0)
        else:
            index[si - 1]['t'] = 0
            if f_out.exists():
                f_out.unlink()
        continue

    tr = {}
    for p in tamam_parts:
        rows, babs, _ = oku(p)
        src, _ = kaynak(p)
        for n, sened, metin, sig, notlar, bas in rows:
            tr[n] = (sened, metin.replace('\\n', '\n'), sig, notlar, bas)
        for pos, title in babs:
            tr[('bab', src[pos][0])] = title

    babs_out, cur = [], None
    for j, it in enumerate(sec['items']):
        n = it['n']
        n = int(n) if float(n).is_integer() else round(n, 2)
        if n not in tr:
            break
        if j == 0 or it['bab'] != sec['items'][j - 1]['bab']:
            title = tr.get(('bab', n), it['bab'])
            if title.startswith('(başlıksız') or not it['bab']:
                title = ''
            cur = {'t': title, 'h': []}
            babs_out.append(cur)
        sened, metin, sig, notlar, bas = tr[n]
        ar = it['ar']
        ziyade = it.get('ziyade', 0)
        c0 = muellif_sec(ar, ziyade)
        info = None
        if sened:
            zincirler = []
            for z, sz in zip(sened.split('; ayrıca'), sig.split(';')):
                c = [c0]
                for ad, sg in zip(z.split('→'), sz.split(',')):
                    c += [sg.strip(), ad.strip()]
                zincirler.append(c)
            info = {'c': zincirler[0] if len(zincirler) == 1 else zincirler}
        if notlar:
            info = dict(info or {}, n=notlar)
        if bas is not None:
            k = metin_basi(ar, bas)
            if k:
                info = dict(info or {}, k=k)
        cached = panel_cache.get(str(n))
        if cached and info and cached.get('c', [])[::2] == info.get('c', [])[::2]:
            info['c'] = cached['c']
            ck = cached.get('k')
            if ck and (ck == 0 or ar[ck - 1] in ' «"،,:.؟)(\n'):
                info['k'] = ck
        cur['h'].append([n, sened, metin, ziyade, info, ar])

    f_out.parent.mkdir(parents=True, exist_ok=True)
    f_out.write_text(json.dumps({'babs': babs_out}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    cnt = sum(len(b['h']) for b in babs_out)
    index[si - 1]['t'] = cnt
    toplam_madde += cnt
    yazilan_bolum += 1

CACHE_P.write_text(json.dumps(panel_cache, ensure_ascii=False, indent=1), encoding='utf-8')
(ROOT / 'musned/index.json').write_text(json.dumps(index, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(f'{yazilan_bolum}/{len(index)} bölüm derlendi; {toplam_madde}/{sum(x["n"] for x in index)} yeni madde')
