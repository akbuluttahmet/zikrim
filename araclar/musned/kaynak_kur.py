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
ITEM = re.compile(r'^# ([*•°](?:\s*[*•°])*)?\s*(\d+)\s*(?:ms\d+\s*)?(?:-|(?=حدثنا|حدثني|قال))\s*(.*)$')


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
        # dijital nüshada düşen hane (22999'dan sonra '2300' = 23000)
        if items and abs(n - items[-1]['n']) > 500 and n * 10 == items[-1]['n'] + 1:
            n *= 10
        cur = {'n': n, 'bab_ar': bab, 'ziyade': max([ZIY[c] for c in (m.group(1) or '') if c in ZIY] or [0]), 'ar': m.group(3)}
        items.append(cur)
        continue
    if cur is not None and line.startswith('~~'):
        cur['ar'] += ' ' + line[2:]
    elif cur is not None and line.startswith('# ') and not line.startswith('# |'):
        cur['ar'] += ' ' + line[2:]

sec = [x for x in items if lo <= x['n'] <= hi]
# Dijital nüshanın sıra hataları: aynı numara iki kez geldiyse ve bir sonraki numara yoksa ikincisi o numaradır
gorulen = {x['n'] for x in sec}
for i in range(1, len(sec)):
    a, b = sec[i - 1], sec[i]
    if b['n'] == a['n'] and (a['n'] + 1) not in gorulen:
        b['n'] = a['n'] + 1
        gorulen.add(b['n'])
        print(f"sıra düzeltmesi: ikinci {a['n']} → {b['n']}")
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
    # neşirde yalnız numara ve noktalar olan (metni bulunmayan) maddeler: Arapça '…'
    out.append({'n': x['n'], 'bab': b, 'ziyade': x['ziyade'], 'ar': temizle(x['ar']) or '…'})

S = json.loads((D / 'kaynak.json').read_text(encoding='utf-8'))
while len(S) < si:
    S.append(None)
S[si - 1] = {'f': meta['f'], 'tr': meta['tr'], 'items': out}
(D / 'kaynak.json').write_text(json.dumps(S, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')

plan_eski = json.loads((D / 'plan.json').read_text(encoding='utf-8'))
mevcut = sorted(int(p[0][1:]) for p in plan_eski if p[1] == si)
plan = [p for p in plan_eski if p[1] != si]
# Bölüm daha önce parçalandıysa aynı parça adları korunur (çeviri dosyaları cikti/pNNN.txt bunlara bağlı)
start = mevcut[0] if mevcut else max(int(p[0][1:]) for p in plan) + 1
if mevcut and (len(out) + 17) // 18 != len(mevcut):
    sys.exit(f'bölüm {si}: parça sayısı değişti ({len(mevcut)} → {(len(out) + 17) // 18}); elle bakılmalı')
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
