"""Paket ile çalışma dosyasını SPEC biçimine göre karşılaştırır. Hata varsa çıkar."""
import re, sys
from pathlib import Path

SIG = {'haddesenâ','haddesenî','ahberanâ','ahberanî','enbe’enâ','semi‘tü','semi‘a','an','enne','kâle',
       'haddesehû','haddesehüm','ahberahû','ahberahüm','kara’tü','kurie','unbi’tü','ketebe ileyye','vecedtü'}

def paket(yol):
    bek = []  # (tur, no|None, ar)
    cur_bab = None
    lines = Path(yol).read_text(encoding='utf-8').splitlines()
    i = 0
    while i < len(lines):
        s = lines[i]
        if s.startswith('KITAP'):
            i += 1
            continue
        if s in ('BAB', 'BAB_SON', 'ON 0') or s.startswith('EK ') or s.startswith('H '):
            tur = 'ON' if s == 'ON 0' else s.split()[0]
            no = None
            if tur == 'ON':
                no = '0'
            elif tur in ('EK', 'H'):
                no = s.split()[1]
            i += 1
            buf = []
            while i < len(lines) and not (
                lines[i].startswith(('KITAP', 'BAB', 'EK ', 'H ', 'ON ', 'BAB_SON'))
            ):
                if lines[i] != '':
                    buf.append(lines[i])
                i += 1
            ar = '\n'.join(buf).strip()
            bek.append((tur, no, ar))
            continue
        i += 1
    return bek

def cikti(yol):
    rows = []
    babs = 0
    lines = Path(yol).read_text(encoding='utf-8').splitlines()
    i = 0
    while i < len(lines):
        s = lines[i]
        if not s.strip():
            i += 1
            continue
        if s.startswith('@'):
            babs += 1
            i += 1
            continue
        if s.startswith('& ') or s.startswith('% ') or s.startswith('^ '):
            if not rows:
                return None, [f'{i+1}: başı olmayan işaret']
            k = {'&': 'sig', '%': 'not', '^': 'bas'}[s[0]]
            if k == 'not':
                rows[-1].setdefault('not', []).append(s[2:].strip())
            else:
                rows[-1][k] = s[2:].strip()
            i += 1
            continue
        p = s.split(' | ')
        if len(p) != 3:
            return None, [f'{i+1}: {len(p)} parça (3 olmalı)']
        rows.append({'n': p[0].strip(), 'sened': p[1].strip(), 'metin': p[2].strip(), 'line': i+1})
        i += 1
    return rows, []

def main():
    bek = paket(sys.argv[1])
    rows, err = cikti(sys.argv[2])
    if err:
        print('\n'.join(err)); sys.exit(1)
    hatalar = []
    by = {}
    for r in rows:
        if r['n'] in by:
            hatalar.append(f"çift numara {r['n']}")
        by[r['n']] = r
    for tur, no, ar in bek:
        if tur == 'BAB':
            continue
        if tur == 'BAB_SON':
            continue
        r = by.get(no)
        if not r:
            hatalar.append(f'eksik {tur} {no}')
            continue
        if tur in ('H',):
            if not r['sened']:
                hatalar.append(f'{no}: sened boş')
            if not r.get('sig'):
                hatalar.append(f'{no}: & yok')
            else:
                yolar_s = r['sened'].split('; ayrıca')
                yolar_g = r['sig'].split(';')
                if len(yolar_s) != len(yolar_g):
                    hatalar.append(f'{no}: yol {len(yolar_s)} sîga-yol {len(yolar_g)}')
                else:
                    for ys, yg in zip(yolar_s, yolar_g):
                        ad = [a for a in ys.split('→')]
                        sg = [x.strip() for x in yg.split(',') if x.strip()]
                        if len(ad) != len(sg):
                            hatalar.append(f'{no}: {len(ad)} ad {len(sg)} sîga')
                        for s in sg:
                            if s not in SIG:
                                hatalar.append(f'{no}: sîga değil: {s}')
            bas = r.get('bas') or ''
            if not bas:
                hatalar.append(f'{no}: ^ yok')
            elif bas not in ar and re.sub(r'\s+', ' ', bas) not in re.sub(r'\s+', ' ', ar):
                hatalar.append(f'{no}: ^ Arapçada yok: {bas[:40]}')
        else:
            if r['sened']:
                hatalar.append(f'{no}: ara metinde sened olmamalı')
        if '|' in r['metin'] or '|' in r['sened']:
            hatalar.append(f'{no}: fazla |')
    ekstra = set(by) - {no for tur, no, ar in bek if tur in ('H', 'EK', 'ON')}
    for n in sorted(ekstra):
        hatalar.append(f'pakette yok: {n}')
    print(f'{len(rows)} madde, {len(hatalar)} hata')
    for h in hatalar[:40]:
        print(' -', h)
    sys.exit(1 if hatalar else 0)

if __name__ == '__main__':
    main()
