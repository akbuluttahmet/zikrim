# Akış sekmesinin havuzunu (akis.json) üretir. Yeni kitap/bölüm çevrilince gunun.py ile birlikte çalıştır:
#   python3 araclar/akis.py
# Seçim gunun.py ile aynıdır: Nebî ﷺ'in sözünü aktaran ("buyurdu"), 80–450 karakter, bozuk metin notu ve
# "benzeri" göndermesi olmayan rivayetler. Farkı: Akış kartlarında gösterilmek üzere Türkçe sened ve bab başlığı da yazılır.
# Ana sayfadaki "Rivayetler" kartı gunun.json'u kullanır; o dosya bu betikten etkilenmez.
# Biçim: {kitaplık: {"books": [kitap adları], "babs": [bab başlıkları], "h": [[kitap sırası, no, metin, sened, bab sırası], …]}}
import json, re, os
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..') + '/'
out = {}
for v in ['musned', 'musannef', 'ibnebiseybe', 'ahmed', 'zuhd', 'fezail', 'berbehari', 'seria', 'acurri', 'hallal']:
    idx = json.load(open(f'{R}{v}/index.json', encoding='utf-8'))
    items, babs, bab_no = [], [], {}
    for bi, b in enumerate(idx):
        if not b.get('t'): continue
        d = json.load(open(f'{R}{v}/tr/' + b['f'], encoding='utf-8'))
        for bb in d['babs']:
            for h in bb['h']:
                t = h[2]
                if 'ﷺ' in t and re.search(r'buyurdu|buyururken|buyurmuştur', t) and 80 <= len(t) <= 450 and '(metin' not in t and 'benzeri' not in t and 'mislini' not in t:
                    title = (bb.get('t') or '').strip()
                    if title not in bab_no:
                        bab_no[title] = len(babs)
                        babs.append(title)
                    sened = h[1].strip() if isinstance(h[1], str) else ''
                    items.append([bi, h[0], t, sened, bab_no[title]])
    if not items: continue
    out[v] = {'books': [b['tr'] for b in idx], 'babs': babs, 'h': items}
    print(v, len(items))
open(R + 'akis.json', 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, separators=(',', ':')))
