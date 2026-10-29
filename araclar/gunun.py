# Ana sayfadaki "Rivayetler" kartının havuzunu (gunun.json) yeniden üretir. Yeni kitap/bölüm çevrilince çalıştır:
#   python3 araclar/gunun.py
# Kaynak: kütüphanedeki bütün kitaplıklar (LIBS). Seçim: Nebî ﷺ'in sözünü aktaran ("buyurdu"), 80–450 karakter,
# bozuk metin notu ve "benzeri" göndermesi olmayan rivayetler. Uygulama önce kitaplığı, sonra rivayeti rastgele seçer.
import json, re, os
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..') + '/'
out = {}
for v in ['musned', 'musannef', 'ibnebiseybe', 'ahmed', 'zuhd', 'fezail', 'berbehari', 'seria', 'acurri', 'hallal', 'safii', 'buhari', 'ebudavud', 'harb', 'ibane', 'sunan', 'leys']:
    idx = json.load(open(f'{R}{v}/index.json', encoding='utf-8'))
    items = []
    for bi, b in enumerate(idx):
        if not b.get('t'): continue
        d = json.load(open(f'{R}{v}/tr/' + b['f'], encoding='utf-8'))
        for bb in d['babs']:
            for h in bb['h']:
                t = h[2]
                if 'ﷺ' in t and re.search(r'buyurdu|buyururken|buyurmuştur', t) and 80 <= len(t) <= 450 and '(metin' not in t and 'benzeri' not in t and 'mislini' not in t:
                    items.append([bi, h[0], t])
    if not items: continue
    out[v] = {'books': [b['tr'] for b in idx], 'h': items}
    print(v, len(items))
open(R + 'gunun.json', 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, separators=(',', ':')))
