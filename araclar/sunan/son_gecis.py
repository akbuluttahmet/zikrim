"""Son geçiş: bütün çıktılarda biçim birliği (tekrar çalıştırılabilir).
- Sened satırındaki saygı ifadeleri kaldırılır (sened yalnız ad ve ok); metin ve notlarda kalır.
- Saygı ifadesi yazımları tek biçime getirilir.
Kullanım: python3 son_gecis.py p001 p002 ...  (hepsi: all)
"""
import re, sys
from pathlib import Path

D = Path(__file__).parent
SENED_SAYGI = re.compile(r'\s*\((?:aleyhisselâm|aleyhesselâm|aleyhâsselâm|aleyhimesselâm|radıyallâhu an(?:h|hâ|hümâ|hüm)|rıdvânullâhi aleyh|rahimehullâh|rahimehullah|rahimehallâh|rahimehallah)\)')
YAZIM = [('(aleyhâsselâm)', '(aleyhesselâm)'), ('(rahimehullah)', '(rahimehullâh)'), ('(rahimehallah)', '(rahimehallâh)'), ('(radıyallâhu anhumâ)', '(radıyallâhu anhümâ)')]

names = sys.argv[1:]
if names == ['all']:
    names = sorted(p.stem for p in (D / 'cikti').glob('p*.txt'))
for name in names:
    p = D / 'cikti' / f'{name}.txt'
    s0 = p.read_text(encoding='utf-8')
    out, n_sened = [], 0
    for line in s0.splitlines():
        parts = line.split(' | ')
        if len(parts) == 3 and re.match(r'^\d', line):
            yeni = SENED_SAYGI.sub('', parts[1])
            if yeni != parts[1]:
                n_sened += 1
                parts[1] = yeni
                line = ' | '.join(parts)
        for a, b in YAZIM:
            line = line.replace(a, b)
        out.append(line)
    s = '\n'.join(out) + '\n'
    if s != s0:
        p.write_text(s, encoding='utf-8')
    print(name, f'sened saygı {n_sened}', 'değişti' if s != s0 else '')
