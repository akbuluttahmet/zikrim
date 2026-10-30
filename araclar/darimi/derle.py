"""cikti/p*.txt çevirilerini darimi/tr/d01.json ve darimi/index.json'a derler.
Kullanım: python3 araclar/darimi/derle.py
Bütün parçalar denetle.py'den geçmeden yazmaz.
"""
import json, sys
from pathlib import Path
from denetle import denetle, oku, metin_basi

D = Path(__file__).parent
ROOT = D.parents[1]
MUELLIF = 'ed-Dârimî'
S = json.loads((D / 'kaynak.json').read_text(encoding='utf-8'))[0]
plan = json.loads((D / 'plan.json').read_text(encoding='utf-8'))
src = {x['n']: x for x in S['items']}

rows_all = []
bab_of = {}
for name, _si, _a, _b, _n, _c in plan:
    errs = denetle(name)
    if errs:
        sys.exit(f'{name}: denetim hatası:\n' + '\n'.join(errs[:12]))
    rows, babs, _ = oku(name)
    base = len(rows_all)
    for i, b in babs:
        bab_of[base + i] = b
    rows_all.extend(rows)

if [r[0] for r in rows_all] != [x['n'] for x in S['items']]:
    sys.exit('çeviri numaraları kaynakla aynı değil')


def panel(sened, sig, notlar, k):
    if not sened:
        return None
    yollar = [[a.strip() for a in z.split('→')] for z in sened.split('; ayrıca')]
    sigs = [[x.strip() for x in z.split(',')] for z in sig.split(';')]
    zincir = []
    for ads, ss in zip(yollar, sigs):
        c = [MUELLIF]
        for a, s in zip(ads, ss):
            c.extend([s, a])
        zincir.append(c)
    info = {'c': zincir[0] if len(zincir) == 1 else zincir, 'k': k}
    if notlar:
        info['n'] = notlar
    return info


babs_out, cur = [], None
for i, (n, sened, metin, sig, notlar, bas) in enumerate(rows_all):
    if i in bab_of:
        cur = {'t': bab_of[i], 'h': []}
        babs_out.append(cur)
    if cur is None:
        cur = {'t': '', 'h': []}
        babs_out.append(cur)
    ar = src[n]['ar']
    k = metin_basi(ar, bas) if bas else 0
    if k is None:
        sys.exit(f'{n}: ^ Arapçada yok')
    cur['h'].append([n, sened, metin.replace('\\n', '\n'), 0, panel(sened, sig, notlar, k), ar])

tr = ROOT / 'darimi' / 'tr'
tr.mkdir(parents=True, exist_ok=True)
(tr / 'd01.json').write_text(json.dumps({'babs': babs_out}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
idx_p = ROOT / 'darimi' / 'index.json'
n = len(rows_all)
son = rows_all[-1][0]
rec = [{'f': 'd01.json', 'tr': 'er-Red ale’l-Cehmiyye', 'n': n, 'from': 0, 'to': son, 't': n}]
idx_p.write_text(json.dumps(rec, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print(f'd01: {n} madde, {len(babs_out)} bab')
