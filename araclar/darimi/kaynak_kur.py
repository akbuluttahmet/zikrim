"""er-Red ale'l-Cehmiyye (Osman b. Saîd ed-Dârimî, Şâmile 13023).

OpenITI: 0280CuthmanIbnSacidDarimi.RaddCalaJahmiyya.Shamela0013023-ara1
Numaralar nüshadaki «### | N -» başlıklarıdır (1–399; 163, 253, 388 yok).
0 = kitabın nüsha senedi (1 numarasından önceki giriş).
«### | مقدمة …» bloğu 1–12'nin aynı metninin tekrarıdır; alınmaz.
Sayfa işaretleri (PageV, [ص:], msNN) ve dipnot rakamları «(1)» atılır.
«# باب …» ve «### | باب …» sonraki maddelerin bab başlığıdır.

Kullanım: python3 araclar/darimi/kaynak_kur.py OPENITI_DOSYASI
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

NUM = re.compile(r'^(\d+)\s*(?:ms\d+\s*)?-\s*(.*)$')
SAYFA = re.compile(r'^\[ص:')


def temiz(t):
    t = t.replace('\u200d', '').replace('\u200c', '')
    t = re.sub(r'PageV\d+P\d+', ' ', t)
    t = re.sub(r'\bms\d+\b', ' ', t)
    t = re.sub(r'\s*\(\d{1,2}\)', '', t)
    t = re.sub(r'\s+([،,:.؟»])', r'\1', t)
    t = re.sub(r'«\s+', '«', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t


items = []
cur_n = None
buf = []
bab = 'الرد على الجهمية'
bab_of = None
pending_bab = None
skip = False


def kapat():
    global cur_n, buf, bab_of
    if cur_n is None:
        return
    t = temiz(' '.join(buf))
    items.append({'n': cur_n, 'bab': bab_of if bab_of is not None else bab, 'ar': t or '…'})
    cur_n, buf = None, []


def bab_kaydet():
    global pending_bab, bab
    if pending_bab is not None:
        bab = temiz(' '.join(pending_bab)) or bab
        pending_bab = None


for line in raw.splitlines():
    if line.startswith('# Page') or line.startswith('PageV'):
        continue
    if line.startswith('###'):
        h = line.split('|', 1)[-1].strip()
        if SAYFA.match(h):
            continue
        if h.startswith('مقدمة'):
            kapat()
            skip = True
            pending_bab = None
            continue
        m = NUM.match(h)
        if m:
            skip = False
            bab_kaydet()
            kapat()
            cur_n = int(m.group(1))
            bab_of = bab
            buf = [m.group(2)] if m.group(2).strip() else []
            continue
        if h.startswith('باب'):
            skip = False
            kapat()
            pending_bab = [h]
            continue
        continue
    if skip:
        continue
    if line.startswith('~~'):
        if pending_bab is not None and cur_n is None:
            pending_bab.append(line[2:])
        elif cur_n is not None:
            buf.append(line[2:])
        elif pending_bab is None and not items:
            buf.append(line[2:])
        continue
    if line.startswith('# '):
        t = line[2:]
        if t.startswith('باب ') or t.startswith('باب\t'):
            kapat()
            pending_bab = [t]
            continue
        if pending_bab is not None and cur_n is None:
            bab_kaydet()
        if cur_n is None and not items:
            cur_n = 0
            bab_of = bab
            buf = [t]
            continue
        if cur_n is not None:
            buf.append(t)

kapat()

# sıra
nums = [x['n'] for x in items]
if nums[0] != 0 or nums != sorted(nums) or len(nums) != len(set(nums)):
    sys.exit(f'sıra bozuk: {nums[:8]} … {nums[-4:]}')

(D / 'kaynak.json').write_text(
    json.dumps([{'f': 'd01.json', 'tr': 'er-Red ale’l-Cehmiyye', 'items': items}],
               ensure_ascii=False, separators=(',', ':')), encoding='utf-8')

plan = []
(D / 'parca').mkdir(exist_ok=True)
for k in range(0, len(items), 18):
    part = items[k:k + 18]
    name = f'p{k // 18 + 1:03d}'
    lines = []
    for j, x in enumerate(part):
        g = k + j
        if g == 0 or x['bab'] != items[g - 1]['bab']:
            lines.append(f"B: {x['bab']}")
        lines.append(f"{x['n']}: {x['ar']}")
    (D / 'parca' / f'{name}.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    plan.append([name, 1, part[0]['n'], part[-1]['n'], len(part), sum(len(x['ar']) for x in part)])
(D / 'plan.json').write_text(json.dumps(plan, ensure_ascii=False), encoding='utf-8')
print(f'{len(items)} madde, {plan[0][0]}–{plan[-1][0]}, bab {len({x["bab"] for x in items})}')
print('eksik numara', sorted(set(range(1, 400)) - set(nums)))
