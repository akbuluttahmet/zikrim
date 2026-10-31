"""ez-Zühd ve'r-Rekāik (Abdullah b. el-Mübârek, Şâmile 13028 / 6967).
Tahkik: Habîbürrahmân el-A‘zamî.
OpenITI: 0181IbnMubarak.Zuhd.Shamela0013028-ara1

Müellif: Abdullah b. el-Mübârek (ö. 181/797)
Kitabın râvisi: el-Hüseyn b. el-Hasan el-Mervezî (ONEK)

Kullanım: python3 araclar/mubarek/kaynak_kur.py
Yazar: kaynak.json, plan.json, parca/pNNN.txt
"""
import json, re
from pathlib import Path

D = Path(__file__).parent
raw = (D / 'raw.txt').read_text(encoding='utf-8')
idx_nuaym = raw.find('### | ما رواه نعيم بن حماد')
if idx_nuaym >= 0:
    raw = raw[:idx_nuaym]

header_idx = raw.find('#META#Header#End#')
if header_idx >= 0:
    raw = raw[header_idx + len('#META#Header#End#'):]

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
cur_n, buf = None, []
bab = 'باب التحضيض على طاعة الله عز وجل'
bab_of = None
pending_bab = None

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
        cand = temiz(' '.join(pending_bab))
        if cand.startswith('باب'):
            bab = cand
        pending_bab = None

for line in raw.splitlines():
    if line.startswith('# Page') or line.startswith('PageV'):
        continue
    if line.startswith('###'):
        h = line.split('|', 1)[-1].strip()
        if SAYFA.match(h):
            continue
        m = NUM.match(h)
        if m:
            bab_kaydet()
            kapat()
            cur_n = int(m.group(1))
            bab_of = bab
            buf = [m.group(2)] if m.group(2).strip() else []
            continue
        if h.startswith('باب'):
            kapat()
            pending_bab = [h]
            continue
        continue
    if line.startswith('~~'):
        if pending_bab is not None and cur_n is None:
            pending_bab.append(line[2:])
        elif cur_n is not None:
            buf.append(line[2:])
        continue
    if line.startswith('# '):
        t = line[2:].strip()
        if t.startswith('باب ') or t.startswith('باب\t'):
            kapat()
            pending_bab = [t]
            continue
        if pending_bab is not None and cur_n is None:
            bab_kaydet()
        if cur_n is not None:
            buf.append(t)

kapat()

(D / 'kaynak.json').write_text(
    json.dumps([{'f': 'z01.json', 'tr': 'ez-Zühd ve’r-rekāik', 'items': items}],
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
print(f'Tamamlandı: {len(items)} madde, {plan[0][0]}–{plan[-1][0]} ({len(plan)} parça), bab sayısı: {len({x["bab"] for x in items})}')
