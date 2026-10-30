"""araclar/sahih/cikti/kNN.txt → sahih/tr/kNN.json ve sahih/index.json

Çalışma dosyası (SPEC §5):
  @ bab
  N | sened | metin
  & sîga, sîga; sîga, sîga
  % not
  ^ metnin ilk Arapça kelimeleri

Sened yoksa (0 mukaddime, kesirli ara metin) & ve ^ yazılmaz.
Arapça kaynak.json'dan gelir; k = ar.find(^).
"""
import json, re, sys
from pathlib import Path

D = Path(__file__).parent
ROOT = D.parents[1]
MUELLIF = 'el-Buhârî'
KAYNAK = json.loads((D / 'kaynak.json').read_text(encoding='utf-8'))


def num(s):
    f = float(s)
    return int(f) if f.is_integer() else round(f, 2)


def oku(yol):
    rows, babs = [], []
    for i, line in enumerate(yol.read_text(encoding='utf-8').splitlines(), 1):
        if not line.strip():
            continue
        if line.startswith('^ '):
            rows[-1][5] = line[2:].strip()
            continue
        if line.startswith('& ') or line.startswith('% '):
            if line[0] == '&':
                rows[-1][3] = line[2:].strip()
            else:
                rows[-1][4].append(line[2:].strip())
            continue
        if line.startswith('@'):
            babs.append((len(rows), line[1:].strip()))
            continue
        p = line.split(' | ')
        if len(p) != 3:
            sys.exit(f'{yol.name}:{i} {len(p)} parça')
        rows.append([num(p[0]), p[1].strip(), p[2].strip(), None, [], None])
    return rows, babs


def ar_harita(kitap):
    m = {}
    if kitap.get('on'):
        m[0] = kitap['on']
    ek = [b['ek'] for b in kitap['babs'] if b.get('ek')]
    for b in kitap['babs']:
        for h in b['h']:
            m[h['n']] = h['ar']
    return m, ek


def k_bul(ar, bas):
    bas = re.sub(r'\s+', ' ', bas).strip()
    i = ar.find(bas)
    if i < 0:
        sys.exit(f'^ bulunamadı: {bas[:40]}')
    return i


def panel(sened, sig, notlar, k, etiket):
    info = {}
    if sened:
        zincirler = []
        sz = sig.split(';')
        yolar = sened.split('; ayrıca')
        if len(sz) != len(yolar):
            sys.exit(f'sîga yolu {len(sz)} sened yolu {len(yolar)}')
        for z, sg in zip(yolar, sz):
            adlar = [a.strip() for a in z.split('→')]
            sigalar = [s.strip() for s in sg.split(',')]
            if len(adlar) != len(sigalar):
                sys.exit(f'{len(adlar)} ad, {len(sigalar)} sîga: {z[:60]}')
            c = [MUELLIF]
            for ad, s in zip(adlar, sigalar):
                c += [s, ad]
            zincirler.append(c)
        info['c'] = zincirler[0] if len(zincirler) == 1 else zincirler
        info['k'] = k
    if notlar:
        info['n'] = notlar
    if etiket:
        info['l'] = etiket
    return info or None


def derle_dosya(ad):
    no = int(ad[1:])
    kitap = KAYNAK['books'][no - 1]
    m, ek = ar_harita(kitap)
    ekler = list(ek)
    rows, babs = oku(D / 'cikti' / f'{ad}.txt')
    if not rows:
        sys.exit(f'{ad}: boş')
    bab_at = {i: t for i, t in babs}
    babs_out, cur = [], None
    for i, (n, sened, metin, sig, notlar, bas) in enumerate(rows):
        if i in bab_at:
            cur = {'t': bab_at[i], 'h': []}
            babs_out.append(cur)
        if cur is None:
            sys.exit(f'{n}: bab yok')
        if n in m:
            ar = m[n]
        elif ekler:
            ar = ekler.pop(0)
        else:
            sys.exit(f'{n}: Arapça yok')
        etiket = None
        if not sened:
            etiket = 'Mukaddime' if n == 0 else 'Ara metin'
        k = k_bul(ar, bas) if bas else None
        if sened and k is None:
            sys.exit(f'{n}: ^ yok')
        info = panel(sened, sig or '', notlar, k, etiket)
        cur['h'].append([n, sened, metin, 0, info, ar])
    return babs_out


def index_yaz(hazir):
    idx = []
    for k in KAYNAK['books']:
        hs = [h['n'] for b in k['babs'] for h in b['h']]
        rec = {
            'f': f"k{k['no']:02d}.json",
            'tr': k['tr'],
            'n': len(hs),
            'b': len([b for b in k['babs'] if b['h'] or b.get('ar')]),
            'from': min(hs),
            'to': max(hs),
            't': 0,
        }
        if k['no'] in hazir:
            nums = [h[0] for b in hazir[k['no']] for h in b['h']]
            tam = [x for x in nums if float(x).is_integer()]
            rec['t'] = len(nums)
            rec['b'] = len(hazir[k['no']])
            if len(tam) < len(hs):
                # Kitap yarım: n, henüz çevrilmeyen hadisleri de sayar; ara metin eklenir.
                rec['n'] = len(hs) + (len(nums) - len(tam))
                rec['from'] = min(min(nums), min(hs))
                rec['to'] = max(max(nums), max(hs))
            else:
                rec['n'] = len(nums)
                rec['from'] = min(nums)
                rec['to'] = max(nums)
        idx.append(rec)
    (ROOT / 'sahih' / 'index.json').write_text(
        json.dumps(idx, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    return idx


def main():
    adlar = sys.argv[1:] or sorted(p.stem for p in (D / 'cikti').glob('k*.txt'))
    hazir = {}
    (ROOT / 'sahih' / 'tr').mkdir(parents=True, exist_ok=True)
    for ad in adlar:
        babs = derle_dosya(ad)
        no = int(ad[1:])
        yol = ROOT / 'sahih' / 'tr' / f'{ad}.json'
        yol.write_text(json.dumps({'babs': babs}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
        hazir[no] = babs
        print(ad, sum(len(b['h']) for b in babs), 'madde')
    # Daha önce derlenmiş dosyalar duruyorsa onları da index'e yaz.
    for p in sorted((ROOT / 'sahih' / 'tr').glob('k*.json')):
        no = int(p.stem[1:])
        if no not in hazir:
            hazir[no] = json.loads(p.read_text(encoding='utf-8'))['babs']
    index_yaz(hazir)


if __name__ == '__main__':
    main()
