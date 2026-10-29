#!/usr/bin/env python3
"""kaynak.json → çevrilmemiş kitaplar için plan.json ve parca/pNNN.txt
Numarasız madde: önceki numaradan sonraki numara nüshada eksikse o numarayı alır (dijital nüshada
numarası düşmüş madde), değilse kesirli anahtar (N.1) alır ve “Numarasız rivayet” etiketlenir.
Parça ≈ HEDEF harf; kitap sınırını aşmaz. Kullanım: python3 araclar/musannef/hazirla.py
"""
import json, re
from pathlib import Path
D = Path(__file__).parent
R = D.parents[1]
HEDEF = 9000
K = json.load(open(D / 'kaynak.json', encoding='utf-8'))
idx = json.load(open(R / 'musannef/index.json', encoding='utf-8'))
ETIKET = re.compile(r'<[^>]*>?|</?span[^>]*|\b\w*span\b')
plan, kitaplar = [], {}
(D / 'parca').mkdir(exist_ok=True)
pno = 0
for i, b in enumerate(idx):
    if b['t']:
        continue
    items = K[i]['items']
    var = {x['n'] for x in items if x['n'] is not None}
    out, prev = [], b['from'] - 1
    for j, it in enumerate(items):
        n = it['n']
        if n is None:
            nxt = next((x['n'] for x in items[j + 1:] if x['n'] is not None), b['to'] + 1)
            if int(prev) + 1 not in var and int(prev) + 1 < nxt:
                n = int(prev) + 1; var.add(n); etiket = None
            else:
                n = round(int(prev) + (round(prev - int(prev), 2) + 0.1 if prev != int(prev) else 0.1), 2); etiket = 'Numarasız rivayet'
        else:
            etiket = None
        ar = ETIKET.sub('', it['ar']).strip()
        out.append({'n': n, 'bab': it['bab'], 'ar': re.sub(r'\s+', ' ', ar), **({'l': etiket} if etiket else {})})
        prev = n
    kitaplar[b['f']] = out
    # parçalara böl
    cur, size = [], 0
    def kapat():
        global pno
        if not cur:
            return
        pno += 1
        name = f'p{pno:03d}'
        lines, onceki = [], None
        for it in cur:
            if it['bab'] != onceki:
                lines.append('B: ' + (it['bab'] or '(başlıksız)'))
                onceki = it['bab']
            lines.append(f"{it['n']}: {it['ar']}")
        (D / 'parca' / f'{name}.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
        plan.append([name, b['f'], cur[0]['n'], cur[-1]['n'], len(cur), sum(len(x['ar']) for x in cur)])
    for it in out:
        cur.append(it); size += len(it['ar'])
        if size >= HEDEF:
            kapat(); cur, size = [], 0
    kapat()
json.dump(plan, open(D / 'plan.json', 'w', encoding='utf-8'), ensure_ascii=False)
json.dump(kitaplar, open(D / 'kitaplar.json', 'w', encoding='utf-8'), ensure_ascii=False)
print(len(plan), 'parça;', sum(p[4] for p in plan), 'madde;', sum(p[5] for p in plan), 'harf')
for f in kitaplar:
    ps = [p for p in plan if p[1] == f]
    print(f, ps[0][0], '…', ps[-1][0], sum(p[4] for p in ps))
