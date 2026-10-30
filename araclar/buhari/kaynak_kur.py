"""Halku ef‘âli’l-ibâd (el-Buhârî, Şâmile 9697) — OpenITI → kaynak + 18'lik parçalar.

Kaynak: 0256Bukhari.KhalqAfcal.Shamela0009697-ara1 (Abdurrâhman Umeyre neşri).
Bu nüshada “N -” işareti yoktur; rivayetler metindeki sırayla 1'den numaralanır.
Sayfa işaretleri (PageV, ### | [ص: …]) ve yazma varakları (msNN) atılır.
Sayfa sonunda bölünen paragraf, şiirin mısraları ve kesilen âyet yeri önceki maddeye eklenir.

Kullanım: python3 araclar/buhari/kaynak_kur.py OPENITI_DOSYASI
Yazar: kaynak.json, plan.json, parca/pNNN.txt
"""
import json, re, sys
from pathlib import Path

D = Path(__file__).parent
src = Path(sys.argv[1])
raw = src.read_text(encoding='utf-8')
i = raw.find('#META#Header#End#')
if i >= 0:
    raw = raw[i + len('#META#Header#End#'):]

ISNAD = re.compile(r'^(?:و\s*)?(?:حدثني|حدثنا|ثنا|نا|أخبرنا|أخبرني|أنبأنا|سمعت)\b')
BAB_SATIR = re.compile(r'^باب\b')


def temiz(t):
    t = re.sub(r'PageV\d+P\d+', ' ', t)
    t = re.sub(r'\bms\d+\b', ' ', t)
    t = re.sub(r'\s+([،,:.؟»])', r'\1', t)
    t = re.sub(r'«\s+', '«', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t


def devam(prev, t):
    """Sayfa sonunda kesilen cümle, şiir mısrası, tek başına kalan âyet yeri.
    Yeni “وقال / حدثنا” paragrafı, tırnak kapanmamış diye önceki maddeye katılmaz."""
    if not prev:
        return False
    if t[:1] in '،.»':
        return True
    if t.startswith('[البحر') or re.fullmatch(r'\[[^\]]{1,40}:\s*\d+\]', t):
        return True
    yeni = ISNAD.match(t) or re.match(r'^(?:و?قال|وقال)\b', t)
    if ' ... ' in t and len(t) < 180 and not yeni:
        return True
    if prev.count('{') > prev.count('}') and not yeni and len(t) < 220:
        return True
    if prev.count('«') > prev.count('»') and not yeni and len(t) < 100:
        return True
    return False


# --- satırları olaylara çevir
olay, buf = [], None

def flush():
    global buf
    if buf is not None:
        t = temiz(buf)
        if t:
            olay.append(('p', t))
        buf = None

for line in raw.splitlines():
    if line.startswith('# Page') or line.startswith('PageV'):
        continue
    if line.startswith('###'):
        flush()
        h = temiz(line.split('|', 1)[-1])
        if re.match(r'^\[ص:', h):
            olay.append(('sayfa', h))
        elif h:
            olay.append(('bab', h))
        continue
    if line.startswith('~~'):
        buf = (buf or '') + ' ' + line[2:]
        continue
    if line.startswith('# '):
        flush()
        buf = line[2:]
        continue
    if line.startswith('#'):
        continue
    if line.strip():
        buf = (buf or '') + ' ' + line
flush()

# sayfa bölünmelerini ve kesik cümleleri birleştir; "# باب …" satırı başlıktır.
# Sayfa işareti tek başına birleştirme sebebi değildir: yoksa iki rivayet yapışır.
birlesik, sayfa = [], False
for k, t in olay:
    if k == 'sayfa':
        sayfa = True
        continue
    if k == 'bab':
        sayfa = False
        birlesik.append(('bab', t))
        continue
    # “# باب” satırı, ertesi satırda tamamlanan başlık
    if t == 'باب' or (t.startswith('باب ') and len(t) < 90 and 'حدث' not in t and 'صلى' not in t):
        sayfa = False
        birlesik.append(('bab', t))
        continue
    if sayfa and birlesik and birlesik[-1][0] == 'bab' and len(birlesik[-1][1]) < 50 and not ISNAD.match(t) and not t.startswith('قال'):
        birlesik[-1] = ('bab', temiz(birlesik[-1][1] + ' ' + t))
        sayfa = False
        continue
    if birlesik and birlesik[-1][0] == 'p' and devam(birlesik[-1][1], t):
        birlesik[-1] = ('p', temiz(birlesik[-1][1] + ' ' + t))
        sayfa = False
        continue
    if birlesik and birlesik[-1][0] == 'bab' and devam(birlesik[-1][1], t):
        birlesik[-1] = ('bab', temiz(birlesik[-1][1] + ' ' + t))
        sayfa = False
        continue
    sayfa = False
    birlesik.append(('p', t))

# Uzun başlıktan müellif sözünü ayır: başlık "باب …" kalır, "قال أبو عبد الله" sonrası madde olur.
# Başlık zaten âyet/hadis alıntısıyla bitiyorsa (kapanmışsa) bölünmez.
son = []
for k, t in birlesik:
    if k == 'bab' and len(t) > 180:
        m = re.search(r'\s(قال الإمام أبو عبد الله|قال أبو عبد الله)\b', t)
        if m and 12 < m.start() < 90:
            son.append(('bab', temiz(t[:m.start()])))
            son.append(('p', temiz(t[m.start():])))
            continue
    son.append((k, t))

items, bab = [], 'Kitabın başı'
for k, t in son:
    if k == 'bab':
        bab = t
        continue
    items.append({'n': len(items) + 1, 'bab': bab, 'ar': t})

if not items:
    sys.exit('madde çıkmadı')

(D / 'kaynak.json').write_text(
    json.dumps([{'f': 'b03.json', 'tr': 'Halku ef‘âli’l-ibâd', 'items': items}],
               ensure_ascii=False, separators=(',', ':')),
    encoding='utf-8')

(D / 'parca').mkdir(exist_ok=True)
for eski in (D / 'parca').glob('p*.txt'):
    eski.unlink()
plan = []
for k in range(0, len(items), 18):
    part = items[k:k + 18]
    name = f'p{k // 18 + 1:03d}'
    lines = []
    for j, x in enumerate(part):
        g = k + j
        if g == 0 or x['bab'] != items[g - 1]['bab']:
            lines.append('B: ' + x['bab'])
        lines.append(f"{x['n']}: {x['ar']}")
    (D / 'parca' / f'{name}.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    plan.append([name, 1, part[0]['n'], part[-1]['n'], len(part), sum(len(x['ar']) for x in part)])
(D / 'plan.json').write_text(json.dumps(plan, ensure_ascii=False), encoding='utf-8')
print(f'{len(items)} madde, {len(plan)} parça (p001–p{len(plan):03d})')
print('bablar:')
gor = []
for x in items:
    if not gor or gor[-1][0] != x['bab']:
        gor.append([x['bab'], x['n']])
for b, n in gor:
    print(f'  {n}: {b[:110]}')
