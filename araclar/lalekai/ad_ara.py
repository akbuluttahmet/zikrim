#!/usr/bin/env python3
"""Ad yazımı arama: Arapça (harekesiz) ya da Türkçe bir parça verilir; isim sözlüğünden ve râvi
veritabanından (araclar/ravi/ravi.json, kütüphanede gerçekten yazılmış biçimler) eşleşmeleri listeler.
Kullanım: python3 araclar/lalekai/ad_ara.py "عبد الرحمن بن مهدي" ["Ebû Üsâme" …]
Lâlekâî kitaplığında geçen biçim (*) önceliklidir; yoksa en çok kullanılan biçim seçilir.
Veritabanı sened satırını doldurmak için değil, YAZIMI denetlemek içindir: zincirde metin ne diyorsa o yazılır."""
import json, os, re, sys
KOK = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(os.path.dirname(KOK))
H = re.compile(r'[ً-ْٰـ]')
def norm(s):
    s = re.sub(r'\s+', ' ', H.sub('', s)).replace('أ', 'ا').replace('إ', 'ا').replace('آ', 'ا').replace('ة', 'ه').strip()
    return re.sub(r'(^| )اب[ويا](?= )', r'\1ابو', ' ' + s + ' ').strip()
soz = []
for f in ('araclar/sunan/sozluk.tsv',):
    for s in open(os.path.join(REPO, f), encoding='utf-8'):
        if s.startswith('#') or '\t' not in s: continue
        a, t = s.rstrip('\n').split('\t')[:2]; soz.append((a, t))
R = json.load(open(os.path.join(REPO, 'araclar/ravi/ravi.json'), encoding='utf-8'))['ravi']
for q in sys.argv[1:]:
    print(f'== {q}')
    ar = bool(re.search(r'[؀-ۿ]', q)); nq = norm(q) if ar else q.lower()
    hits = []
    for ad, r in R.items():
        if ar:
            if any(nq in norm(x) for x in r.get('ar', [])): hits.append((('lalekai' in r.get('kitaplik', {})), r.get('sayi', 0), ad, '/'.join(r.get('ar', [])[:3])))
        elif nq in ad.lower(): hits.append((('lalekai' in r.get('kitaplik', {})), r.get('sayi', 0), ad, '/'.join(r.get('ar', [])[:3])))
    for l, n, ad, a in sorted(hits, key=lambda x: (-x[0], -x[1]))[:12]:
        print(f"  {'*' if l else ' '} {ad}  ({n})  {a}")
    for a, t in soz:
        if (ar and nq in norm(a)) or (not ar and nq in t.lower()): print(f'  sözlük: {a} → {t}')
