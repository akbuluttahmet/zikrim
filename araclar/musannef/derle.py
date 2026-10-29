"""cikti/p*.txt çevirilerini musannef/tr/kNN.json ve musannef/index.json'a derler.
Yalnız bütün parçaları bitmiş (ve denetle.py hatası olmayan) kitaplar yazılır; mevcut (önceden
çevrilmiş) kitaplara dokunulmaz. Kullanım: python3 araclar/musannef/derle.py [kNN.json …]
"""
import json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from denetle import denetle, oku, kaynak, metin_basi

D = Path(__file__).parent
ROOT = D.parents[1]
plan = json.loads((D / 'plan.json').read_text(encoding='utf-8'))
kitaplar = json.loads((D / 'kitaplar.json').read_text(encoding='utf-8'))
index = json.loads((ROOT / 'musannef/index.json').read_text(encoding='utf-8'))
UYARI = ('kısa olabilir',)
secili = [a for a in sys.argv[1:] if a.endswith('.json')]
C0 = 'İbn Ebî Şeybe'
yazilan = []
for meta in index:
    f = meta['f']
    if f not in kitaplar or (secili and f not in secili):
        continue
    parts = [p[0] for p in plan if p[1] == f]
    eksik = [p for p in parts if not (D / 'cikti' / f'{p}.txt').exists()]
    if eksik:
        print(f'{f}: {len(parts) - len(eksik)}/{len(parts)} parça hazır — derlenmedi')
        continue
    hata = {p: e for p in parts if (e := [x for x in denetle(p) if not any(u in x for u in UYARI)])}
    if hata:
        p0 = next(iter(hata))
        print(f'{f}: denetim hatası ({len(hata)} parça), ilk {p0}: {hata[p0][:3]}')
        continue
    tr, babtr = {}, {}
    for p in parts:
        rows, babs, _ = oku(p)
        src, sbabs = kaynak(p)
        for n, sened, metin, sig, notlar, bas in rows:
            tr[n] = (sened, metin.replace('\\n', '\n'), sig, notlar, bas)
        for (pos, title), spos in zip(babs, sbabs):
            babtr[src[spos][0]] = title
    babs_out, cur = [], None
    items = kitaplar[f]
    for j, it in enumerate(items):
        n = it['n']
        if j == 0 or it['bab'] != items[j - 1]['bab'] or n in babtr:
            title = babtr.get(n, it['bab'])
            if title.startswith('(başlıksız'):
                title = ''
            cur = {'t': title, 'h': []}
            babs_out.append(cur)
        sened, metin, sig, notlar, bas = tr[n]
        ar = it['ar']
        info = None
        if sened:
            zs = []
            for z, sz in zip(sened.split('; ayrıca'), sig.split(';')):
                c = [C0]
                for ad, sg in zip(z.split('→'), sz.split(',')):
                    c += [sg.strip(), ad.strip()]
                zs.append(c)
            info = {'c': zs[0] if len(zs) == 1 else zs}
        if notlar:
            info = dict(info or {}, n=notlar)
        if bas is not None:
            k = metin_basi(ar, bas)
            if k is not None:
                info = dict(info or {}, k=k)
        if it.get('l'):
            info = dict(info or {}, l=it['l'])
        cur['h'].append([n, sened, metin, 0, info, ar])
    (ROOT / 'musannef/tr' / f).write_text(json.dumps({'babs': babs_out}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    cnt = sum(len(b['h']) for b in babs_out)
    meta['t'] = meta['n'] = cnt
    meta['b'] = len(babs_out)
    ns = [h[0] for b in babs_out for h in b['h']]
    meta['from'], meta['to'] = int(min(ns)), int(max(ns))
    yazilan.append(f'{f} ({cnt})')
(ROOT / 'musannef/index.json').write_text(json.dumps(index, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print('derlendi:', ', '.join(yazilan) or 'yok')
