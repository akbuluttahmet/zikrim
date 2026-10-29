"""Çeviri parçasını kaynağa karşı denetler.
Kullanım: python3 denetle.py p001 [p002 ...]   (hepsi için: all)
Çıkış: sorun listesi; sorun yoksa 'tamam'.
"""
import json, re, sys
from pathlib import Path

D = Path(__file__).parent
SIGALAR = {'haddesenâ', 'haddesenî', 'ahberanâ', 'ahberanî', 'enbe’enâ', 'semi‘tü', 'semi‘a', 'an', 'enne', 'kâle', 'haddesehû', 'haddesehüm', 'ahberahû', 'ahberahüm', 'kara’tü', 'kurie', 'unbi’tü'}
SALAVAT = re.compile(r'صلى الله عليه وسلم|صلى الله عليه وآله وسلم')


def num(s):
    f = float(s)
    return int(f) if f.is_integer() else round(f, 2)


def metin_basi(ar, bas):
    """^ satırındaki kelimelerin Arapça metinde başladığı karakter konumu (yoksa None)."""
    bas = re.sub(r'\s+', ' ', bas).strip()
    if not bas:
        return None
    i = ar.find(bas)
    return i if i >= 0 else None


def kaynak(name):
    items, babs = [], []
    for line in (D / 'parca' / f'{name}.txt').read_text(encoding='utf-8').splitlines():
        if line.startswith('B'):
            babs.append(len(items))
        else:
            n, ar = line.split(': ', 1)
            items.append((num(n), ar))
    return items, babs


def oku(name):
    rows, babs, errs = [], [], []
    p = D / 'cikti' / f'{name}.txt'
    if not p.exists():
        return None, None, ['çıktı dosyası yok']
    for i, line in enumerate(p.read_text(encoding='utf-8').splitlines(), 1):
        if not line.strip():
            continue
        if line.startswith('^ '):
            if not rows:
                errs.append(f'satır {i}: madde satırından önce ^ satırı')
            else:
                rows[-1][5] = line[2:].strip()
            continue
        if line.startswith('& ') or line.startswith('% '):
            if not rows:
                errs.append(f'satır {i}: madde satırından önce {line[0]} satırı')
            elif line[0] == '&':
                if rows[-1][3] is not None:
                    errs.append(f'{rows[-1][0]}: iki sîga satırı')
                rows[-1][3] = line[2:].strip()
            else:
                rows[-1][4].append(line[2:].strip())
            continue
        if line.startswith('@'):
            t = line[1:].strip()
            if not t:
                errs.append(f'satır {i}: boş bab başlığı')
            babs.append((len(rows), t))
            continue
        parts = line.split(' | ')
        if len(parts) != 3:
            errs.append(f'satır {i}: {len(parts)} parça (3 olmalı): {line[:80]}')
            continue
        try:
            n = num(parts[0].strip())
        except ValueError:
            errs.append(f'satır {i}: numara okunamadı: {parts[0][:20]}')
            continue
        rows.append([n, parts[1].strip(), parts[2].strip(), None, [], None])
    return rows, babs, errs


def denetle(name):
    src, sbabs = kaynak(name)
    rows, babs, errs = oku(name)
    if rows is None:
        return errs
    sn = [n for n, _ in src]
    rn = [r[0] for r in rows]
    if sn != rn:
        eksik = [n for n in sn if n not in rn]
        fazla = [n for n in rn if n not in sn]
        errs.append(f'numaralar farklı; eksik {eksik[:15]}{"…" if len(eksik) > 15 else ""} fazla {fazla[:10]}'
                    + ('' if eksik or fazla else ' (sıra bozuk)'))
    if [b[0] for b in babs] != sbabs:
        errs.append(f'bab satırları: kaynakta {len(sbabs)} ({sbabs[:8]}…), çıktıda {len(babs)} ({[b[0] for b in babs][:8]}…)')
    srcd = dict(src)
    for n, sened, metin, sig, notlar, bas in rows:
        ar = srcd.get(n)
        if ar is None:
            continue
        if not metin:
            errs.append(f'{n}: boş metin')
        if '(?)' in metin or '(?)' in sened:
            errs.append(f'{n}: (?) var')
        if re.search(r'ﷺ[’\']', metin + sened):
            errs.append(f'{n}: ﷺ’den sonra ek')
        if sened:
            zincirler = [[a.strip() for a in z.split('→')] for z in sened.split('; ayrıca')]
            if any(not a for z in zincirler for a in z):
                errs.append(f'{n}: senedde boş halka')
            if sig is None:
                errs.append(f'{n}: & sîga satırı yok')
            else:
                sz = [[x.strip() for x in z.split(',')] for z in sig.split(';')]
                if len(sz) != len(zincirler):
                    errs.append(f'{n}: sîga zinciri {len(sz)}, sened zinciri {len(zincirler)}')
                else:
                    for k, (a, b) in enumerate(zip(zincirler, sz), 1):
                        if len(a) != len(b):
                            errs.append(f'{n}: {k}. zincirde {len(a)} isim, {len(b)} sîga')
                bad = {x for z in sz for x in z if x not in SIGALAR}
                if bad:
                    errs.append(f'{n}: bilinmeyen sîga {sorted(bad)}')
        elif sig is not None:
            errs.append(f'{n}: sened yok ama sîga var')
        if bas is not None and metin_basi(ar, bas) is None:
            errs.append(f'{n}: ^ metin başı Arapçada bulunamadı: {bas[:30]}')
        for x in notlar:
            if not x:
                errs.append(f'{n}: boş % notu')
        if re.search(r'\((?:[^)]*?)(?:dedi|lafz|“)[^)]*\)', sened):
            errs.append(f'{n}: senedde not kalmış (% satırına taşınmalı)')
        if '|' in metin or '|' in sened:
            errs.append(f'{n}: | karakteri')
        sal = len(SALAVAT.findall(ar))
        if metin.count('ﷺ') + sened.count('ﷺ') + sum(x.count('ﷺ') for x in notlar) < sal:
            errs.append(f'{n}: ﷺ eksik ({metin.count("ﷺ")}/{sal})')
        ad = len(re.findall(r'قال أبو داود', ar))
        td = len(re.findall(r'Ebû Dâvûd (?:dedi|der|şöyle)', metin))
        if td < ad:
            errs.append(f'{n}: “Ebû Dâvûd dedi ki” sayısı {td}, Arapçada {ad}')
        tr_len = len(sened) + len(metin)
        oran = tr_len / max(len(ar), 1)
        if len(ar) > 120 and oran < 0.8:
            errs.append(f'{n}: kısa olabilir (oran {oran:.2f})')
        if re.search(r'rivayet edildiğine göre\)|\(şöyle rivayet etti\)', metin):
            errs.append(f'{n}: yasak kalıp')
        # İsnad: Arapça senedin râvi işaretleri ile Türkçe zincirdeki farklı isim sayısı
        isnad = re.split(r'«|"|أن رسول الله|أن النبي|قال رسول الله|عن النبي|عن رسول الله|سمعت رسول الله|سمعت النبي', ar)[0]
        isaret = len(re.findall(r'(?:^|[\s،,])(?:و?حدثنا|و?حدثني|و?أخبرنا|و?أخبرني|أنبأنا|عن|سمعت|حدثه|حدثهم|أخبره|أخبرهم)\s', isnad))
        isaret += len(re.findall(r'[،,]\s*و(?!حدث|أخبر)[ء-ي]{2,}', isnad[:isnad.find('عن') if 'عن' in isnad else len(isnad)]))
        adlar = {a.strip() for zincir in sened.split('; ayrıca') for a in zincir.split('→') if a.strip()}
        adlar = {x for a in adlar for x in re.split(r'\s+ve\s+', re.sub(r'\(.*?\)', '', a)) if x.strip()}
        if sened and isaret - len(adlar) >= 2:
            errs.append(f'{n}: senedde râvi eksik olabilir (Arapça ~{isaret} işaret, Türkçe {len(adlar)} isim)')
        if ' ح ' in ar.replace('،', ' ').replace(',', ' ')[:len(isnad) + 5] and sened and '; ayrıca' not in sened:
            errs.append(f'{n}: tahvîl (ح) var ama sened tek zincir')
        if re.search(r'[؀-ۿ]{4,}', metin) and not re.search(r'[“‘(]', metin):
            errs.append(f'{n}: metinde Arapça kalmış')
    return errs


if __name__ == '__main__':
    names = sys.argv[1:]
    if names == ['all']:
        names = sorted(p.stem for p in (D / 'cikti').glob('p*.txt'))
    for name in names:
        e = denetle(name)
        print(name, 'tamam' if not e else f'{len(e)} sorun')
        for x in e[:60]:
            print('  ', x)
