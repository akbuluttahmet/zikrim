"""cikti/p*.txt çevirilerini sunan/tr/sNN.json ve sunan/index.json'a derler.
Yalnız bütün parçaları denetimden geçmiş bölümler yazılır.
Kullanım: python3 derle.py [--hepsi-zorunlu]
"""
import json, sys
from pathlib import Path
from denetle import denetle, oku, kaynak, metin_basi

D = Path(__file__).parent
ROOT = Path(__file__).resolve().parents[2]
S = json.loads((D / 'kaynak.json').read_text(encoding='utf-8'))
plan = json.loads((D / 'plan.json').read_text(encoding='utf-8'))
zorunlu = '--hepsi-zorunlu' in sys.argv

import re
# Kaynaktaki (OpenITI 1726) “الله” düşmesi: ﷲ bitişik harfi dönüşümde kaybolmuş; asıl neşirde tamdır.
AR_GENEL = [(r'صلى عليه وسلم', 'صلى الله عليه وسلم'), (r'(?<!ال)رسول صلى', 'رسول الله صلى'),
            (r'رضي عن(ه|ها|هما|هم)\b', r'رضي الله عن\1'), (r'يا رسول([،؟!,])', r'يا رسول الله\1')]
AR_OZEL = {1509: [('عبيد بن معاذ', 'عبيد الله بن معاذ')], 1512: [('عبد بن الحارث', 'عبد الله بن الحارث')],
           1522: [('عبد بن يزيد', 'عبد الله بن يزيد'), ('عبيد بن عمر', 'عبيد الله بن عمر')],
           1545: [('عبد بن دينار', 'عبد الله بن دينار')], 1546: [('عبد بن أبي', 'عبد الله بن أبي')],
           1551: [('عبد بن الزبير', 'عبد الله بن الزبير')], 1552: [('عبيد بن عمر', 'عبيد الله بن عمر')],
           1555: [('أحمد بن عبيد الغداني', 'أحمد بن عبيد الله الغداني'), ('أذهب عز وجل', 'أذهب الله عز وجل')],
           1478: [('فقال: عز وجل يأمرك', 'فقال: الله عز وجل يأمرك')],
           # “عارية” dönüşümde “عور” olmuş
           1657: [('عور الدلو', 'عارية الدلو')], 3041: [('وعور ثلاثين', 'وعارية ثلاثين')],
           3563: [('قال: عور أم غصبا', 'قال: عارية أم غصبا'), ('«لا، بل عور»', '«لا، بل عارية»')],
           3562: [('«لا، بل عمق مضمونة»', '«لا، بل عارية مضمونة»')], 3565: [('«العور مؤداة', '«العارية مؤداة')],
           3566: [('أعور مضمونة، أو عور مؤداة', 'أعارية مضمونة، أو عارية مؤداة')]}
def ar_duzelt(n, ar):
    for a_, b_ in AR_GENEL:
        ar = re.sub(a_, b_, ar)
    for a_, b_ in AR_OZEL.get(n, []):
        ar = ar.replace(a_, b_)
    return ar

index = json.loads((ROOT / 'sunan/index.json').read_text(encoding='utf-8'))
yazilan = 0
for si, sec in enumerate(S, 1):
    parts = [p[0] for p in plan if p[1] == si]
    UYARI = ('râvi eksik olabilir', 'kısa olabilir')  # sezgisel; sened gözden geçirmesinde ayrıca bakılır
    sorunlu = [p for p in parts if any(not any(u in e for u in UYARI) for e in denetle(p))]
    if sorunlu:
        if zorunlu:
            sys.exit(f'bölüm {si}: denetimden geçmeyen parçalar {sorunlu}')
        index[si - 1]['t'] = 0
        f = ROOT / 'sunan/tr' / index[si - 1]['f']
        if f.exists():
            f.unlink()
        continue
    tr, basliklar = {}, {}
    for p in parts:
        rows, babs, _ = oku(p)
        src, sbabs = kaynak(p)
        for n, sened, metin, sig, notlar, bas in rows:
            info = None
            if sened:
                zincirler = []
                for z, sz in zip(sened.split('; ayrıca'), sig.split(';')):
                    c = ['Ebû Dâvûd']
                    for ad, sg in zip(z.split('→'), sz.split(',')):
                        c += [sg.strip(), ad.strip()]
                    zincirler.append(c)
                info = {'c': zincirler[0] if len(zincirler) == 1 else zincirler}
            if notlar:
                info = dict(info or {}, n=notlar)
            if bas is not None:
                k = metin_basi(dict(src)[n], bas)
                if k:
                    info = dict(info or {}, k=k)
            tr[n] = (sened, metin.replace('\\n', '\n'), info)
        # bab başlığı, önüne yazıldığı maddenin numarasına bağlanır; parça başındaki
        # "devam eden bab" satırı bab değişimi olmadığından hiç sorulmaz.
        for pos, title in babs:
            tr[('bab', src[pos][0])] = title
    babs_out, cur, last = [], None, object()
    for j, it in enumerate(sec['items']):
        n = it['n']
        n = int(n) if float(n).is_integer() else round(n, 2)
        if j == 0 or it['bab'] != sec['items'][j - 1]['bab']:
            title = tr.get(('bab', n))
            if title is None:
                sys.exit(f'{n}: bab başlığı yok')
            if title.startswith('(başlıksız') or not it['bab']:
                title = ''
            cur = {'t': title, 'h': []}
            babs_out.append(cur)
        sened, metin, info = tr[n]
        ar = ar_duzelt(n, it['ar'])
        if info and 'k' in info and ar != it['ar']:
            # metin başı konumu düzeltilmiş Arapçaya göre yeniden bulunur
            on = ar_duzelt(n, it['ar'][:info['k']])
            k = len(on) if ar.startswith(on) else ar.find(ar_duzelt(n, it['ar'][info['k']:])[:25])
            info = dict(info, k=k) if k > 0 else {x: y for x, y in info.items() if x != 'k'}
        cur['h'].append([n, sened, metin, 0, info, ar])
    out = ROOT / 'sunan/tr' / index[si - 1]['f']
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({'babs': babs_out}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    index[si - 1]['t'] = sum(len(b['h']) for b in babs_out)
    assert index[si - 1]['t'] == index[si - 1]['n'], si
    yazilan += 1
(ROOT / 'sunan/index.json').write_text(json.dumps(index, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(f'{yazilan}/40 bölüm yazıldı; {sum(x["t"] for x in index)}/{sum(x["n"] for x in index)} madde')
