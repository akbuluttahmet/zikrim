"""Bitmiş çıktılarda biçim düzeltmeleri (tekrar çalıştırılabilir).
- Sened sonundaki sahte “→ (aynı sened)” halkası kaldırılır; o zincirde sîga sayısı isim sayısına eşitse son sîga da düşer.
Kullanım: python3 duzelt.py p001 p003 ...
"""
import re, sys
from pathlib import Path

D = Path(__file__).parent
for name in sys.argv[1:]:
    p = D / 'cikti' / f'{name}.txt'
    lines = p.read_text(encoding='utf-8').splitlines()
    out, degisen = [], 0
    i = 0
    while i < len(lines):
        line = lines[i]
        parts = line.split(' | ')
        if len(parts) == 3 and re.match(r'^\d', line) and 'aynı sened' in parts[1]:
            zincirler = parts[1].split('; ayrıca')
            sig_i = i + 1 if i + 1 < len(lines) and lines[i + 1].startswith('& ') else None
            sigs = lines[sig_i][2:].split(';') if sig_i else None
            yeni_z, yeni_s = [], []
            for k, z in enumerate(zincirler):
                adlar = [a.strip() for a in z.split('→')]
                s = [x.strip() for x in sigs[k].split(',')] if sigs and k < len(sigs) else None
                if adlar and 'aynı sened' in adlar[-1]:
                    if s is not None and len(s) == len(adlar):
                        s = s[:-1]
                    adlar = adlar[:-1]
                yeni_z.append(' → '.join(adlar))
                if s is not None:
                    yeni_s.append(', '.join(s))
            parts[1] = '; ayrıca '.join(z.strip() for z in yeni_z)
            out.append(' | '.join(parts))
            if sig_i:
                out.append('& ' + '; '.join(yeni_s))
                i += 2
            else:
                i += 1
            degisen += 1
            continue
        # Sened satırı zincir listesidir: akrabalık her zaman üçüncü şahısla (babam → babası …)
        if len(parts) == 3 and re.match(r'^\d', line):
            AKRABA = {'babam': 'babası', 'dedem': 'dedesi', 'amcam': 'amcası', 'ninem': 'ninesi', 'annem': 'annesi',
                      'halam': 'halası', 'dayım': 'dayısı', 'kardeşim': 'kardeşi'}
            yeni = re.sub(r'(?<![\w’])(' + '|'.join(AKRABA) + r')(?![\w’])', lambda m: AKRABA[m.group(1)], parts[1])
            if yeni != parts[1]:
                parts[1] = yeni
                line = ' | '.join(parts)
                degisen += 1
        out.append(line)
        i += 1
    p.write_text('\n'.join(out) + '\n', encoding='utf-8')
    print(name, f'{degisen} madde düzeltildi')
