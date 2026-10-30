"""Müsned kaynağına yeni bölüm ekler (OpenITI 0241IbnHanbal.Musnad.Shamela0025794-ara1, harekesiz).

m001–m003'ün Arapçası eski verideki harekeli metindir; m004'ten (Ali Müsnedi) itibaren Arapça
aynı neşrin (Arnaût, Risâle; Şâmile 25794) harekesiz OpenITI kopyasındandır (Musannef'te olduğu gibi).

Kullanım: python3 araclar/musned/kaynak_kur.py OPENITI_DOSYASI BOLUM_NO
  BOLUM_NO = musned/index.json'daki sıra (1'den). Bölüm `from`–`to` aralığı index.json'dan alınır.
Yazar: kaynak.json (bölümü ekler/değiştirir), plan.json (18'lik parçalar), parca/pNNN.txt.
Tahkik dipnot işaretleri “(2)”, sayfa işaretleri (PageV…, ms…) atılır; ziyâde işaretleri * • ° → 1 2 3.
"""
import json, re, sys
from pathlib import Path

D = Path(__file__).parent
ROOT = D.parents[1]
src, si = Path(sys.argv[1]), int(sys.argv[2])
index = json.loads((ROOT / 'musned/index.json').read_text(encoding='utf-8'))
meta = index[si - 1]
lo, hi = meta['from'], meta['to']

ZIY = {'*': 1, '•': 2, '°': 3}
HEAD = re.compile(r'^### \|+ (.*)$')
ITEM = re.compile(r'^# ([*•°])?\s*(\d+)\s*(?:ms\d+\s*)?-\s*(.*)$')


def temizle(t):
    t = re.sub(r'PageV\d+P\d+', ' ', t)
    t = re.sub(r'\bms\d+\b', ' ', t)
    t = re.sub(r'\s*\(\d{1,2}\)', '', t)          # tahkik dipnot işareti
    t = re.sub(r'\s*\.{4,}', '', t)                # neşrin noktalı ayırıcı satırı
    t = re.sub(r'\s+([،,:.؟])', r'\1', t)
    t = re.sub(r'\s*\.{4,}', '', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t


items, cur, bab = [], None, None
for line in src.read_text(encoding='utf-8').splitlines():
    h = HEAD.match(line)
    if h:
        bab = temizle(h.group(1))
        cur = None
        continue
    m = ITEM.match(line)
    if m:
        n = int(m.group(2))
        cur = {'n': n, 'bab_ar': bab, 'ziyade': ZIY.get(m.group(1), 0), 'ar': m.group(3)}
        items.append(cur)
        continue
    if cur is not None and line.startswith('~~'):
        cur['ar'] += ' ' + line[2:]
    elif cur is not None and line.startswith('# ') and not line.startswith('# |'):
        cur['ar'] += ' ' + line[2:]

sec = [x for x in items if lo <= x['n'] <= hi]
nums = [x['n'] for x in sec]
eksik = sorted(set(range(lo, hi + 1)) - set(nums))
tekrar = sorted({n for n in nums if nums.count(n) > 1})
if eksik or tekrar:
    sys.exit(f'numara sorunu: eksik {eksik[:20]}, tekrar {tekrar[:20]}')

# Bab: bölüm başlığı (Türkçe, index.json'dan); bölüm içindeki alt başlıklar Arapçasıyla kalır,
# çevirmen @ satırında Türkçesini yazar.
ilk_bab = sec[0]['bab_ar']
out = []
for x in sec:
    b = meta['tr'] if x['bab_ar'] == ilk_bab else x['bab_ar']
    out.append({'n': x['n'], 'bab': b, 'ziyade': x['ziyade'], 'ar': temizle(x['ar'])})

S = json.loads((D / 'kaynak.json').read_text(encoding='utf-8'))
while len(S) < si:
    S.append(None)
S[si - 1] = {'f': meta['f'], 'tr': meta['tr'], 'items': out}
(D / 'kaynak.json').write_text(json.dumps(S, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')

plan = [p for p in json.loads((D / 'plan.json').read_text(encoding='utf-8')) if p[1] != si]
start = max(int(p[0][1:]) for p in plan) + 1
for k in range(0, len(out), 18):
    part = out[k:k + 18]
    name = f'p{start + k // 18:03d}'
    lines = []
    for j, x in enumerate(part):
        g = k + j
        if g == 0 or x['bab'] != out[g - 1]['bab']:
            lines.append(f"B: {x['bab']}")
        lines.append(f"{x['n']}: {x['ar']}")
    (D / 'parca' / f'{name}.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    plan.append([name, si, part[0]['n'], part[-1]['n'], len(part), sum(len(x['ar']) for x in part)])
plan.sort(key=lambda p: p[0])
(D / 'plan.json').write_text(json.dumps(plan, ensure_ascii=False), encoding='utf-8')
print(f'bölüm {si}: {len(out)} madde, parçalar p{start:03d}–p{start + (len(out) - 1) // 18:03d}')
