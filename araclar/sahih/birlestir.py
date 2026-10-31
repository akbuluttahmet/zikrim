"""parca dosyalarını kitap sırasıyla cikti/kNN.txt yapar. k02 mevcut metnin devamıdır."""
from pathlib import Path

D = Path(__file__).parent
PAR = D / 'cikti' / 'parca'
CIK = D / 'cikti'

def birlestir(no):
    if no == 2:
        base = (CIK / 'k02.txt').read_text(encoding='utf-8').rstrip() + '\n'
        ek = (PAR / 'k02-devam.txt').read_text(encoding='utf-8').rstrip() + '\n'
        (CIK / 'k02.txt').write_text(base + ek, encoding='utf-8')
        return 'k02 appended'
    parcalar = sorted(PAR.glob(f'k{no:02d}-p*.txt'))
    tek = PAR / f'k{no:02d}.txt'
    if parcalar:
        text = '\n'.join(p.read_text(encoding='utf-8').rstrip() for p in parcalar) + '\n'
        (CIK / f'k{no:02d}.txt').write_text(text, encoding='utf-8')
        return f'k{no:02d} {len(parcalar)} parça'
    if tek.exists():
        (CIK / f'k{no:02d}.txt').write_text(tek.read_text(encoding='utf-8'), encoding='utf-8')
        return f'k{no:02d} tek'
    return None

if __name__ == '__main__':
    import sys
    nos = [int(x) for x in sys.argv[1:]] or range(2, 98)
    for n in nos:
        r = birlestir(n)
        if r:
            print(r)
