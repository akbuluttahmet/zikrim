"""İsim yazımı birliği (son geçiş). Kullanım: python3 isim_birlik.py p001 ..."""
import re, sys
from pathlib import Path
D = Path(__file__).parent
KURAL = [
    (r'\bBurd\b', 'Bürd'), (r'Bürullusî', 'Bürullüsî'), (r'Ensârdan', 'Ensâr’dan'),
    (r'Eşcaî', 'Eşca‘î'), (r'Hâni(?![’\w])', 'Hâni’'), (r'Hânî(?!\w)', 'Hâni’'), (r'Hâni’’', 'Hâni’'), (r'Hidâş', 'Hıdâş'),
    (r'Hüzeyl b\. Şürahbîl', 'Huzeyl b. Şurahbîl'), (r'Hüzeyl b\. Şurahbîl', 'Huzeyl b. Şurahbîl'),
    (r'\bIclî', 'İclî'), (r'Kazaa', 'Kaz‘a'), (r'\bMuallâ', 'Mu‘allâ'), (r'Muhayyisa', 'Muhayyısa'),
    (r'Rakkâşî', 'Rakâşî'), (r'Sa‘saa', 'Sa‘sa‘a'), (r'Müslim b\. Sefine', 'Müslim b. Sefene'),
    (r'Sübeyh', 'Subeyh'), (r'Şubeyl', 'Şübeyl'), (r'Şucâ‘', 'Şücâ‘'), (r'Şürahbîl', 'Şurahbîl'),
    (r'İrbâz', 'İrbâd'), (r'Zirr b\.', 'Zir b.'), (r'et-Tilb\b', 'et-Tilibb'),
]
for name in sys.argv[1:]:
    p = D / 'cikti' / f'{name}.txt'
    s0 = s = p.read_text(encoding='utf-8')
    for a, b in KURAL:
        s = re.sub(a, b, s)
    if s != s0:
        p.write_text(s, encoding='utf-8')
        print(name, 'değişti')
