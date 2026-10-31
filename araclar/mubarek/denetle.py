"""ez-Zühd ve'r-Rekāik (Abdullah b. el-Mübârek) çeviri parçasını kaynağa ve SPEC.md'ye karşı denetler.
Kullanım: python3 araclar/mubarek/denetle.py p001 [p002 ...]   (hepsi: all)
"""
import re, sys
from pathlib import Path

D = Path(__file__).parent
SIGALAR = {
    'haddesenâ', 'haddesenî', 'ahberanâ', 'ahberanî', 'enbe’enâ',
    'semi‘tü', 'semi‘a', 'an', 'enne', 'kâle',
    'haddesehû', 'haddesehüm', 'ahberahû', 'ahberahüm',
    'kara’tü', 'kurie', 'unbi’tü', 'ketebe ileyye', 'vecedtü',
}
SALAVAT = re.compile(r'صلى الله عليه وسلم|صلى الله عليه وآله وسلم|صلى عليه وسلم')
BIRINCI_SAHIS = re.compile(r'(?:^|→\s*)(?:babam|dedem|amcam|annem|kardeşim|dayım|halam|ninem)\b')
SENED_NOT = re.compile(r'\((?:[^)]*?)(?:dedi|lafz|“|”|rivayet|kitab)[^)]*\)')
SAYGI_SENED = re.compile(r'radıyallâhu|aleyhisselâm|rahmetullâhi|rahimehullah|rahimehallâh|rahimehümullah|\(رحمه الله\)|(?:^|[^’\w])(?!Nebî|Resûlullah|Muhammed)\S+\s+ﷺ')
SENED_KIRLI = re.compile(r'\((?:yine|metinde böyle|metin [^)]*bozuk|[^)]*’d[ae]\b[^)]*)\)|—\s*(?:→|$|;)|;(?!\s*ayrıca\s)')
SON_NEBI = re.compile(r'(?:^|→\s*)(?:Nebî|Resûlullah|Allah Resûlü|Peygamber)\s*ﷺ?\s*$')
MUELLIFLER = {'Abdullah b. el-Mübârek', 'İbnü’l-Mübârek', 'İbn el-Mübârek', 'İbnü’l-Mubârek'}


def num(s):
    f = float(s)
    return int(f) if f.is_integer() else round(f, 2)


def metin_basi(ar, bas):
    bas = re.sub(r'\s+', ' ', bas).strip()
    if not bas:
        return None
    i = ar.find(bas)
    return i if i >= 0 else None


def kaynak(name):
    items, babs = [], []
    for line in (D / 'parca' / f'{name}.txt').read_text(encoding='utf-8').splitlines():
        if line.startswith('B:'):
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
        if re.search(r'ﷺ[’\'][A-Za-zÂÎÛÇŞĞİÖÜâîûçşğiöü]', metin + sened):
            errs.append(f'{n}: ﷺ’den sonra ek')
        if sened:
            zincirler = [[a.strip() for a in z.split('→')] for z in sened.split('; ayrıca')]
            if any(not a for z in zincirler for a in z):
                errs.append(f'{n}: senedde boş halka')
            if zincirler and zincirler[0] and zincirler[0][0] in MUELLIFLER:
                errs.append(f'{n}: müellif sened satırında ({zincirler[0][0]})')
            if BIRINCI_SAHIS.search(sened):
                errs.append(f'{n}: senedde birinci şahıs akrabalık')
            if SENED_NOT.search(sened) or SENED_KIRLI.search(sened):
                errs.append(f'{n}: senedde not kalmış (% satırına taşınmalı)')
            if SAYGI_SENED.search(sened):
                errs.append(f'{n}: senedde saygı ifadesi')
            if any(SON_NEBI.search(y) for y in sened.split('; ayrıca ')):
                errs.append(f'{n}: zincir Nebî ile bitiyor')
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
            if bas is None:
                errs.append(f'{n}: ^ metin başı satırı yok')
        elif sig is not None:
            errs.append(f'{n}: sened yok ama sîga var')
        if bas is not None:
            k_pos = metin_basi(ar, bas)
            if k_pos is None:
                errs.append(f'{n}: ^ metin başı Arapçada bulunamadı: {bas[:40]}')
            elif k_pos > 0 and ar[k_pos - 1] not in ' «"،,:.؟)(\n':
                errs.append(f'{n}: ^ metin başı kelime ortasında: {ar[max(0, k_pos - 8):k_pos + 8]}')
        for x in notlar:
            if not x:
                errs.append(f'{n}: boş % notu')
            elif '(?)' in x:
                errs.append(f'{n}: % notunda (?) var')
        if '|' in metin or '|' in sened:
            errs.append(f'{n}: | karakteri')
        sal = len(SALAVAT.findall(ar))
        tr_sal = metin.count('ﷺ') + sened.count('ﷺ') + sum(x.count('ﷺ') for x in notlar)
        if tr_sal < sal:
            errs.append(f'{n}: ﷺ eksik ({tr_sal}/{sal})')
        tr_len = len(sened) + len(metin)
        ar_say = re.sub(r'[ً-ْٰـ]', '', ar)
        # Nüsha senedi öneğini düşerek oran hesapla
        ar_say = re.sub(r'^.*?(?:أخبرنا|أنا|حدثنا)\s+(?:عبد الله بن المبارك|ابن المبارك)(?:\s*،\s*والفضل بن موسى)?(?:\s+قالا)?\s*[،,:\s]*', '', ar_say)
        ar_say = re.sub(r'^.*?أخبركم أبو عمر.*?(?:أخبرنا|أنا|حدثنا)\s+(?:عبد الله بن المبارك|ابن المبارك|محمد بن عثمان|محمد بن عبد الله|عيسى بن يونس|الحسين(?:\s+بن\s+الحسن)?)\s*[،,:\s]*', '', ar_say)
        oran = tr_len / max(len(ar_say), 1)
        if len(ar_say) > 120 and oran < 0.70:
            errs.append(f'{n}: kısa olabilir (oran {oran:.2f})')
        if '...' in metin:
            errs.append(f'{n}: metinde ... var')
        if re.search(r'\bAzze ve Celle\b|(?<!\()azze ve celle(?!\))', metin):
            errs.append(f'{n}: azze ve celle parantezsiz/büyük harfli')
        if re.search(r'rivayet edildiğine göre\)|\(şöyle rivayet etti\)', metin):
            errs.append(f'{n}: yasak kalıp')
        if re.search(r'[؀-ۿ]{4,}', metin) and not re.search(r'[“‘(]', metin):
            errs.append(f'{n}: metinde Arapça kalmış')
    return errs


if __name__ == '__main__':
    names = sys.argv[1:]
    if names == ['all']:
        names = sorted(p.stem for p in (D / 'parca').glob('p*.txt'))
    for name in names:
        e = denetle(name)
        print(name, 'tamam' if not e else f'{len(e)} sorun')
        for x in e[:80]:
            print('  ', x)
