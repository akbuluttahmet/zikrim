#!/usr/bin/env python3
"""
Musannef ve Müsned dışındaki bütün kitaplıkları SPEC.md (Sünen-i Ebî Dâvûd)
isnad ve râvi paneli standardına getirir.

**BİR KEZ ÇALIŞTIRILDI (2026-10-29); tekrar çalıştırılmaz.** Eski biçimdeki
sened satırını temizleyip panel üretmek için yazıldı; standarda getirilmiş
veriye ikinci kez uygulanırsa Abdullah/babası halkalarını ve müellifi bozar.
Bu yüzden panelli (info.c) madde gören kitaplıkta durur. Sîgalar ve `k`
sonradan `araclar/siga_hizala.py` ile Arapçadan yeniden eşlendi; sîga
düzeltmesi için o araç kullanılır.

Kullanım (yalnız panelsiz, eski biçimdeki kitaplık için):
  python3 araclar/standarda_getir.py <kitaplık>
"""
import json, re, sys
from pathlib import Path

R = Path(__file__).resolve().parents[1]

LIBS = ['ibnebiseybe', 'ahmed', 'zuhd', 'fezail', 'acurri', 'hallal', 'safii', 'buhari', 'ebudavud', 'harb', 'ibane', 'berbehari']

MUELLIF = {
    'sunan': 'Ebû Dâvûd',
    'musned': 'Ahmed b. Hanbel',
    'seria': 'el-Âcurrî',
    'ibnebiseybe': 'İbn Ebî Şeybe',
    'ahmed': 'Ahmed b. Hanbel',
    'zuhd': 'Ahmed b. Hanbel',
    'fezail': 'Ahmed b. Hanbel',
    'acurri': 'el-Âcurrî',
    'hallal': 'el-Hallâl',
    'safii': 'eş-Şâfiî',
    'buhari': 'el-Buhârî',
    'ebudavud': 'Ebû Dâvûd',
    'harb': 'Harb b. İsmâîl',
    'ibane': 'İbn Batta',
}

AR_DIA = re.compile(r'[\u064B-\u0652\u0670\u0640]')
SAYGI = re.compile(
    r'\s*\((?:radıyallâhu\s+(?:teâlâ\s+)?anh(?:ümâ|üm|â|unnâ)?(?:\s+ecmaîn)?|rahimehullâh|rahimehallah|rahimehullah|rahmetullâhi\s+aleyh(?:â|im)?|aleyhisselâm|aleyhimüsselâm|kerremallâhu\s+vechehû|رحمه\s+الله)\)\s*',
    re.I,
)
TARIF = re.compile(r'^(?:el|er|es|eş|ez|ed|en|et|ey)-(?=[A-ZÂÎÛÇŞĞİÖÜ])')

SIGA_RULES = [
    (r'(?<![ء-ي])(?:و\s*)?(?:حدثنا|ثنا|قثنا|نا|حدثتنا)(?![ء-ي])', 'haddesenâ'),
    (r'(?<![ء-ي])(?:و\s*)?(?:حدثني|ثني|حدثتني)(?![ء-ي])', 'haddesenî'),
    (r'(?<![ء-ي])(?:و\s*)?(?:أخبرنا|أنا|أنبأنا|أرنا)(?![ء-ي])', 'ahberanâ'),
    (r'(?<![ء-ي])(?:و\s*)?(?:أخبرني|أنبأني|أرني|أخبرتني)(?![ء-ي])', 'ahberanî'),
    (r'(?<![ء-ي])(?:و\s*)?سمعت(?![ء-ي])', 'semi‘tü'),
    (r'(?<![ء-ي])(?:و\s*)?سمع(?![ء-ي])', 'semi‘a'),
    (r'(?<![ء-ي])(?:و\s*)?حدثهم(?![ء-ي])', 'haddesehüm'),
    (r'(?<![ء-ي])(?:و\s*)?(?:حدثه|حدثتها)(?![ء-ي])', 'haddesehû'),
    (r'(?<![ء-ي])(?:و\s*)?أخبرهم(?![ء-ي])', 'ahberahüm'),
    (r'(?<![ء-ي])(?:و\s*)?أخبره(?![ء-ي])', 'ahberahû'),
    (r'(?<![ء-ي])(?:و\s*)?قرأت\s+على(?![ء-ي])', 'kara’tü'),
    (r'(?<![ء-ي])(?:و\s*)?(?:قرئ\s+على|قراءة\s+عليه)(?![ء-ي])', 'kurie'),
    (r'(?<![ء-ي])(?:و\s*)?(?:أنبئت|حدثت|أخبرت|بلغني)(?![ء-ي])', 'unbi’tü'),
    (r'(?<![ء-ي])(?:و\s*)?(?:أنه|أنها|أن)(?![ء-ي])', 'enne'),
    (r'(?<![ء-ي])(?:و\s*)?عن(?![ء-ي])', 'an'),
    (r'(?<![ء-ي])(?:و\s*)?(?:قال|قالت|يقول|تقول)(?![ء-ي])', 'kâle'),
]
SIGA_PATTERN = '|'.join(f'(?P<s{i}>{p})' for i, (p, _) in enumerate(SIGA_RULES))

NOTE_KW = [
    'dedi', 'lafz', 'lafız', 'okudu', 'okunarak', 'okuyarak', 'imlâ', 'imla',
    'kitab', 'yazı', 'yazd', 'yılı', 'senesi', 'ayında', 'günü', 'camii',
    'mescid', '’da', '’de', '’ta', '’te', 'ehlinden', 'başka bir yerde',
    'mana birdir', 'ezberinden', 'mektupla', 'merfû', 'zannederim', 'bize',
    'bana', 'ona ', 'onlara', 'kendisine', 'sormuştu', 'zikrederek',
    'zikredildi', 'bildirildi', 'şöyle', 'bir defasında', 'başkası:', '“',
    'sahilinde', 'ikisi birlikte', 'ikisi de', 'ya da biri diğerinden', 'aynıdır',
    'aynı senedle',
]

KINSHIP_WORDS = {'babası', 'dedesi', 'amcası', 'kardeşi', 'annesi', 'dayısı', 'halası', 'teyzesi'}


def clean_ar(s):
    return AR_DIA.sub('', s)


def extract_sigas(c_ar):
    matches = list(re.finditer(SIGA_PATTERN, c_ar))
    clean_matches = []
    i = 0
    while i < len(matches):
        m = matches[i]
        idx = int(m.lastgroup[1:])
        siga_name = SIGA_RULES[idx][1]
        if siga_name == 'kâle' and i + 1 < len(matches):
            next_m = matches[i + 1]
            if next_m.start() - m.end() < 18:
                next_idx = int(next_m.lastgroup[1:])
                next_siga = SIGA_RULES[next_idx][1]
                if next_siga != 'kâle':
                    i += 1
                    continue
        clean_matches.append((m.start(), m.end(), siga_name))
        i += 1
    return clean_matches


def find_k(ar, c_ar, last_siga_end):
    idx_map = [i for i, ch in enumerate(ar) if not AR_DIA.search(ch)]
    tail = c_ar[last_siga_end:last_siga_end + 300]

    m_q = re.search(r'[«\"]', tail)
    m_k = re.search(r'(?:قال|قالت|يقول|تقول)\s*:\s*', tail)
    m_an = re.search(r'أن\s+(?:رسول\s+الله|النبي)\b', tail)
    m_zikir = re.search(r'(?:و?ذكر\s+الحديث|بمثله|مثله|نحوه|بهذا\s+الإسناد)\b', tail)

    best_pos = None
    if m_q:
        best_pos = last_siga_end + m_q.start()
    elif m_k:
        best_pos = last_siga_end + m_k.end()
    elif m_an:
        best_pos = last_siga_end + m_an.start()
    elif m_zikir:
        best_pos = last_siga_end + m_zikir.start()
    else:
        sp = tail.find(' قال')
        if sp != -1:
            best_pos = last_siga_end + sp
        else:
            sp2 = tail.find(' ', 20)
            best_pos = last_siga_end + (sp2 if sp2 != -1 else 25)

    if best_pos and best_pos < len(idx_map):
        k = idx_map[best_pos]
    else:
        k = max(1, len(ar) // 4)

    if k <= 0:
        k = 1
    if k >= len(ar):
        k = len(ar) - 1

    if ar[k - 1] not in ' «"،,:.؟)(\n':
        adj = ar.rfind(' ', 0, k)
        if adj > 0:
            k = adj + 1
        else:
            adj2 = ar.find(' ', k)
            if adj2 > 0 and adj2 + 1 < len(ar):
                k = adj2 + 1

    return k


def clean_hop(raw_str, ar=''):
    notes = []
    s = raw_str.strip()

    # 1. Handle em-dashes
    def dash_repl(m):
        inner = m.group(1).strip()
        if not inner:
            return ' '
        # Check compound yani: e.g. 'yani Ömer b. Amr; Heysem dedi ki: ...'
        if ';' in inner and inner.startswith('yani '):
            first_part, rest_part = inner.split(';', 1)
            notes.append(rest_part.strip())
            inner = first_part.strip()
        m_ibn = re.match(r'^yani\s+İbn(?:\s+)(.+)$', inner)
        if m_ibn:
            return f' (b. {m_ibn.group(1).strip()}) '
        m_yani = re.match(r'^yani\s+(.+)$', inner)
        if m_yani:
            return f' ({m_yani.group(1).strip()}) '
        m_o = re.match(r'^o,\s+(.+?)(?:’dır|’dir|’dur|’dür|’tır|’tir|’tur|’tür)$', inner)
        if m_o:
            val = m_o.group(1).strip()
            if val.startswith('İbn '):
                val = 'b. ' + val[4:]
            return f' ({val}) '
        notes.append(inner)
        return ' '

    s = re.sub(r'\s*—([^—]+)—?\s*', dash_repl, s)

    # 2. Remove honorifics
    s = SAYGI.sub(' ', s)

    # 3. Remove (yine), (de), (Aynı isnadla)
    s = re.sub(r'\(\s*(?:yine|de|Aynı isnadla)\s*\)', ' ', s, flags=re.I)

    # 4. Handle parentheses
    # First check kinship with parenthetical name: e.g. 'babası (Ahmed; kendisine okuyarak)' or 'babası (Urve)'
    m_kin = re.match(r'^((?:onun\s+|babasının\s+)?(?:babası|dedesi|amcası|kardeşi|annesi|dayısı|halası|teyzesi))\s*\(([^)]+)\)(.*)$', s.strip())
    if m_kin:
        kin_word, inner, tail = m_kin.group(1), m_kin.group(2).strip(), m_kin.group(3)
        if ';' in inner:
            _, note_part = inner.split(';', 1)
            notes.append(note_part.strip())
        elif any(w in inner.lower() for w in NOTE_KW):
            notes.append(inner)
        # Keep only kin_word + tail unless Arabic has 'أبي يعني' etc.
        if re.search(r'(?:أبي|أبيه|جدي|جده|عمي|عمه|أخي|أخيه|خالي|خاله)\s+يعني', ar):
            name_part = inner.split(';', 1)[0].strip()
            s = f'{kin_word} ({name_part}){tail}'
        else:
            s = f'{kin_word}{tail}'

    # Now check remaining parentheses in s
    def paren_repl(m):
        inner = m.group(1).strip()
        low = inner.lower()
        if 'metin' in low and ('bozuk' in low or 'böyle' in low):
            notes.append(inner)
            return ''
        if re.search(r'’d[ae]\b', inner):
            notes.append(inner)
            return ''
        if inner in ('b.', 'Ebû', 'Hafs', 'Bekr', 'b. Yezîd', 'kumaş', 'düşmanla'):
            return inner
        if inner in ('adamın', 'babasının', 'ninesinin', 'annesinin', 'adını vermediği', 'adını vermiş olduğu', 'bir kimse', 'kimse', 'bir râvi', 'bir kişi', 'biri', 'ona', 'Mâlik’e', 'Süfyân’a', 'Süfyân'):
            return inner
        if inner == 'kabilesin':
            return 'kabilesin'
        if any(w in low for w in NOTE_KW):
            notes.append(inner)
            return ''
        return f'({inner})'

    s = re.sub(r'\(([^)]+)\)', paren_repl, s)
    s = s.replace('(kabilesin)den', 'kabilesinden').replace('kabilesinden', 'kabilesinden')

    # 5. Unwrap full-hop parens: '(Ebû Nasr)' -> 'Ebû Nasr'
    s = re.sub(r'\s+', ' ', s).strip()
    if s.startswith('(') and s.endswith(')'):
        inner = s[1:-1].strip()
        if '(' not in inner and ')' not in inner and 'metin' not in inner:
            s = inner

    # 6. First-person kinship -> third-person
    s = re.sub(r'^Babam\b', 'babası', s)
    s = re.sub(r'^babam\b', 'babası', s)
    s = re.sub(r'\bve amcam\b', 've amcası', s)
    s = re.sub(r'^dedem\b', 'dedesi', s)
    s = re.sub(r'^amcam\b', 'amcası', s)

    # 7. Square brackets removal
    if '[' in s or ']' in s:
        if '…' in s:
            notes.append('Senedde metin burada bozuktur.')
        s = s.replace('[', '').replace(']', '')
    if s.strip() == '…' or s.endswith('b. …'):
        notes.append('Senedde metin burada bozuktur.')

    # 8. Commas inside hop
    if ',' in s:
        if ' ve ' in s:
            # Check trailing ', ikisi birlikte' / ', ikisi de' / ', Ebû Şeybe’nin iki oğlu'
            m_tr = re.search(r',\s*(ikisi birlikte|ikisi de|Ebû Şeybe’nin iki oğlu)$', s)
            if m_tr:
                notes.append(m_tr.group(1))
                s = s[:m_tr.start()].strip()
            if ',' in s:
                s = re.sub(r',\s*', ' ve ', s)
        else:
            # Appositive comma: 'Ebû Saîd, Benî Hâşim’in mevlâsı' or '..., Bağdat’ta'
            first_c, rest_c = s.split(',', 1)
            first_c, rest_c = first_c.strip(), rest_c.strip()
            if first_c in ('Şeyh, imam, âlim Muvaffakuddîn Ebû Muhammed Abdullah b. Ahmed b. Muhammed b. Kudâme el-Makdisî',) or first_c == 'Şeyh':
                s = s.replace(', ', ' ')
            elif any( first_c.startswith(x) for x in ('Hadîce’nin', 'Kureyşîlerin', 'Cezîre ehlinden', 'Nebî’nin', 'Hıms ehlinden')):
                s = f'{first_c} {rest_c}'
            else:
                notes.append(f'{first_c}: {rest_c}')
                s = first_c

    # 9. Strip leading al- article on each name in 've' box
    parts = [p.strip() for p in s.split(' ve ') if p.strip()]
    clean_parts = []
    for p in parts:
        p = TARIF.sub('', p)
        if p == 'Hasen':
            p = 'Hasan'
        p = re.sub(r'\bb\.\s+el-Hasen\b', 'b. el-Hasan', p)
        clean_parts.append(p)
    s = ' ve '.join(clean_parts)

    s = re.sub(r'\s+', ' ', s).strip(' ,;:')
    return s, notes


def norm_name(a):
    a = re.sub(r'\s*\([^)]*\)', '', a).strip()
    a = TARIF.sub('', a)
    return a


def match_hop(a, b):
    na, nb = norm_name(a), norm_name(b)
    if not na or not nb:
        return False
    if na == nb:
        return True
    if (na in ('Abdullah b. Vehb', 'İbn Vehb') and nb in ('Abdullah b. Vehb', 'İbn Vehb')):
        return True
    if (na in ('Zührî', 'İbn Şihâb') and nb in ('Zührî', 'İbn Şihâb')) or ('Şihâb' in na and nb == 'Zührî') or ('Şihâb' in nb and na == 'Zührî'):
        return True
    if len(na) >= 4 and len(nb) >= 4:
        if na.endswith(' ' + nb) or nb.endswith(' ' + na):
            return True
        if na.startswith(nb + ' ') or nb.startswith(na + ' '):
            return True
    return False


def process_item(lib, fname, h):
    if not isinstance(h, list) or len(h) != 6:
        return h
    no, sened, metin, ziyade, info, ar = h
    label = info.get('l') if isinstance(info, dict) and 'l' in info else None

    if not sened or not sened.strip() or not ar or not ar.strip():
        new_info = {'l': label} if label else None
        return [no, '', metin, ziyade, new_info, ar]

    s = sened.strip()
    all_notes = []

    # Pre-clean specific structural cases
    if (lib, fname, no) == ('ibnebiseybe', 'e03.json', 257):
        s = 'İbrâhîm'
        all_notes.append('Aynı senedle.')
    elif (lib, fname, no) == ('zuhd', 'z07.json', 1866):
        s = 'Abdullah'
        all_notes.append('İsnadıyla.')
    elif (lib, fname, no) == ('zuhd', 'z07.json', 1705):
        s = 'Abdullah → Seyyâr → Ca‘fer b. Süleymân → Hişâm'
    elif (lib, fname, no) == ('safii', 's01.json', 493):
        s = 'İbn Uyeyne'
    elif (lib, fname, no) == ('ibane', 'i01.json', 31):
        s = 'Ebü’l-Kāsım Hafs b. Ömer → Ebû Hâtim → Enes'
        all_notes.append('Ebû Hâtim isnadıyla.')
    elif (lib, fname, no) == ('ibane', 'i01.json', 81):
        s = 'Ebû Bekir Muhammed b. el-Hüseyin → Ahmed b. Sehl el-Üşnânî → el-Hüseyin b. Ali b. el-Esved → Yahyâ b. Âdem → Hammâd b. Seleme → Ya‘lâ b. Hakîm → Saîd b. Cübeyr'
        all_notes.append('Yahyâ b. Âdem: “Bize Hammâd b. Seleme’den rivayet ettiler.”')
    elif (lib, fname, no) == ('seria', 's14.json', 1542):
        s = 'Ebû İshâk → Amr Zû Murr'
        all_notes.append('Aynı isnadla.')
    elif (lib, fname, no) == ('fezail', 'f03.json', 714):
        s = 'Abdullah → babası → Abdürrezzâk → Ma‘mer → Katâde → Enes; ayrıca Abdullah → babası → Abdürrezzâk → Ma‘mer → Katâde → Nadr b. Enes → Enes'
    elif (lib, fname, no) == ('fezail', 'f08.json', 1750):
        s = 'Abdullah → babası → Hasan b. Mûsâ → Ebû Hilâl → Cebele b. Atıyye → Mesleme b. Muhalled; ayrıca Abdullah → babası → Hasan b. Mûsâ → Ebû Hilâl → Cebele b. Atıyye → bir adam → Mesleme b. Muhalled'
    elif (lib, fname, no) == ('fezail', 'f08.json', 1626):
        s = 'Abdullah → babası → Ümmü Ömer bint Hassân b. Zeyd → Saîd b. Yahyâ b. Kays b. Abs → babası'
    elif (lib, fname, no) == ('fezail', 'f08.json', 1633):
        s = 'Abdullah → babası → Vekî‘ → İsmâîl b. Ebî Hâlid → Mus‘ab b. İshâk b. Talha; ayrıca Abdullah → babası → Vekî‘ → İsmâîl b. Ebî Hâlid → Âişe'
        all_notes.append('Vekî‘ bir defasında “Âişe’den” dedi.')
    elif (lib, fname, no) == ('fezail', 'f09.json', 1852):
        s = 'Abdullah → babası → Hasan b. Mûsâ → Ebû Hilâl → Amr b. Dînâr; ayrıca Abdullah → babası → Hasan b. Mûsâ → Ebû Hilâl → Utbe → Amr b. Dînâr'
    elif (lib, fname, no) == ('hallal', 'h02.json', 1):
        s = 'Muvaffakuddîn İbn Kudâme el-Makdisî → Abdullah b. Mansûr el-Mevsılî → el-Mübârek b. Abdülcebbâr es-Sayrafî → Abdülazîz b. Ali el-Ezecî → İbrâhîm b. Muhammed es-Sâcî → Ebû Bekir Abdülazîz b. Ca‘fer Gulâmü’l-Hallâl → Ebû Bekir Ahmed b. Muhammed b. Hârûn el-Hallâl → Ebû Bekir el-Merrûzî'
    elif (lib, fname, no) == ('ibane', 'i01.json', 2):
        s = 'Ebû Zer Ahmed b. Muhammed b. Süleymân el-Bâğandî → Ömer b. Şebbe en-Nümeyrî ve İshâk b. İdrîs → Muhammed b. el-Hakem → el-Hasan b. Ebî Kerîme → Ubâde b. Muhammed → Mahmûd b. er-Rebî‘ → Şeddâd b. Evs'

    # First extract em-dashes at full string level so semicolons inside dashes don't split paths
    #Wait: some dashes are '— hepsi →' or '— ikisi birlikte →' which indicate path merging!
    s = re.sub(r'\s*—\s*(hepsi|ikisi(?:\s+birlikte|\s+de)?)\s*(?:dediler\s+ki\s*—?)?\s*→', r' ; (\1) →', s)

    # Mask semicolons inside —...— and (...) before splitting paths
    s_masked = re.sub(r'—[^—]*—', lambda m: m.group(0).replace(';', ','), s)
    s_masked = re.sub(r'\([^)]*\)', lambda m: m.group(0).replace(';', ','), s_masked)

    raw_parts = [p.strip() for p in re.split(r';\s*(?:\(?ayrıca\)?\s*)?(?:ve\s+)?', s_masked) if p.strip()]

    # Check if last part is '(ikisi) → ...' or '(hepsi) → ...'
    paths = []
    common_tail_hops = None
    for pi, p in enumerate(raw_parts):
        if len(raw_parts) > 1 and pi == len(raw_parts) - 1 and re.match(r'^\(?(?:ikisi|hepsi)\b', p):
            tail_str = re.sub(r'^\(?(?:ikisi(?:\s+birlikte|\s+de)?|hepsi)\)?\s*→\s*', '', p).strip()
            common_tail_hops = []
            for rh in tail_str.split('→'):
                ch, nts = clean_hop(rh, ar)
                if ch:
                    common_tail_hops.append(ch)
                all_notes.extend(nts)
            continue

        # Also check if '(ikisi)' or '(hepsi)' is inside one of the hops of the last part
        raw_hops = [rh.strip() for rh in p.split('→') if rh.strip()]
        cleaned_hops = []
        split_at = None
        for hi, rh in enumerate(raw_hops):
            if len(raw_parts) > 1 and pi == len(raw_parts) - 1 and re.match(r'^\(?(?:ikisi|hepsi)\b', rh):
                split_at = len(cleaned_hops)
                rh = re.sub(r'^\(?(?:ikisi(?:\s+birlikte|\s+de)?|hepsi)\)?\s*', '', rh).strip()
            elif len(raw_parts) > 1 and pi == len(raw_parts) - 1 and re.search(r'\((?:Rebî‘ ve Yûsuf|hepsi|ikisi(?:\s+birlikte|\s+de)?)\)\s*$', rh):
                split_at = len(cleaned_hops) + 1
                rh = re.sub(r'\s*\((?:Rebî‘ ve Yûsuf|hepsi|ikisi(?:\s+birlikte|\s+de)?)\)\s*$', '', rh).strip()
            ch, nts = clean_hop(rh, ar)
            if ch:
                cleaned_hops.append(ch)
            all_notes.extend(nts)

        if split_at is not None and split_at < len(cleaned_hops):
            common_tail_hops = cleaned_hops[split_at:]
            cleaned_hops = cleaned_hops[:split_at]

        if cleaned_hops:
            paths.append(cleaned_hops)

    if common_tail_hops:
        paths = [p + common_tail_hops for p in paths]

    # Remove trailing Resûlullah / Nebî / Peygamber hop from each path
    for pi in range(len(paths)):
        while len(paths[pi]) > 1 and re.match(r'^(?:Resûlullah|Nebî|Peygamber)\b', paths[pi][-1]):
            paths[pi].pop()

    # Complete multi-path chains
    if len(paths) > 1:
        if (lib, fname, no) == ('zuhd', 'z08.json', 2320):
            paths[1] = paths[0][:2] + ['Muhammed b. Şuayb']
        elif (lib, fname, no) == ('fezail', 'f04.json', 855):
            paths[1] = paths[0][:4] + ['Saîd b. Ukbe el-Ensârî', paths[0][-1]]
        elif (lib, fname, no) == ('hallal', 'h03.json', 105):
            paths = [p + ['Ebû Abdullah'] if p[-1] != 'Ebû Abdullah' else p for p in paths]
        elif (lib, fname, no) == ('hallal', 'h03.json', 160):
            paths[1] = ['Abdullah b. Ahmed b. Hanbel'] + paths[1]
        else:
            # 1. For zuhd and fezail: prepend Abdullah -> babası or Abdullah when omitted on 2nd+ path
            if lib in ('zuhd', 'fezail') and paths[0][0].startswith('Abdullah'):
                for i in range(1, len(paths)):
                    if not paths[i][0].startswith('Abdullah'):
                        in_p0 = any(match_hop(h, paths[i][0]) for h in paths[0])
                        if not in_p0:
                            if (lib, fname, no) == ('fezail', 'f06.json', 1227):
                                paths[i] = ['Abdullah'] + paths[i]
                            elif len(paths[0]) > 1 and paths[0][1].startswith('babası'):
                                paths[i] = paths[0][:2] + paths[i]
                            else:
                                paths[i] = paths[0][:1] + paths[i]

            # 2. Forward prefix completion
            for i in range(1, len(paths)):
                first_h = paths[i][0]
                for prev_i in range(i - 1, -1, -1):
                    matched_idx = None
                    for idx, h in enumerate(paths[prev_i]):
                        if idx > 0 and match_hop(h, first_h):
                            matched_idx = idx
                            break
                    if matched_idx is not None:
                        paths[i] = paths[prev_i][:matched_idx] + paths[i]
                        break

            # 3. Backward suffix completion
            last_p = paths[-1]
            for i in range(len(paths) - 1):
                last_h = paths[i][-1]
                matched_idx = None
                for idx in range(len(last_p) - 2, -1, -1):
                    if match_hop(last_p[idx], last_h):
                        matched_idx = idx
                        break
                if matched_idx is not None:
                    paths[i] = paths[i] + last_p[matched_idx + 1:]
                elif len(paths[i]) in (2, 3) and len(last_p) >= len(paths[i]) + 2:
                    if (lib, fname, no) not in (('seria', 's02.json', 196),):
                        paths[i] = paths[i] + last_p[len(paths[i]):]

    # Remove trailing Resûlullah / Nebî again in case suffix completion copied one
    for pi in range(len(paths)):
        while len(paths[pi]) > 1 and re.match(r'^(?:Resûlullah|Nebî|Peygamber)\b', paths[pi][-1]):
            paths[pi].pop()

    # Strip book-level framing / müellif prefix hops from each path and record (c0, strip_n)
    muellif = MUELLIF[lib]
    path_meta = []  # (c0, strip_n) per path
    for pi in range(len(paths)):
        p = paths[pi]
        c0, strip_n = muellif, 0
        if lib in ('zuhd', 'fezail'):
            if len(p) >= 3 and p[0] in ('Abdullah', 'Abdullah b. Ahmed', 'Abdullah b. Ahmed b. Hanbel', 'Ebû Abdurrahmân Abdullah b. Ahmed b. Muhammed b. Hanbel') and p[1].startswith('babası'):
                c0, strip_n = 'Ahmed b. Hanbel', 2
            elif len(p) >= 2 and p[0] in ('Abdullah', 'Abdullah b. Ahmed', 'Abdullah b. Ahmed b. Hanbel', 'Ebû Abdurrahmân Abdullah b. Ahmed b. Muhammed b. Hanbel'):
                c0, strip_n = 'Abdullah b. Ahmed', 1
        elif lib == 'buhari':
            if len(p) >= 3 and p[0] == 'Mahmûd' and 'Buhârî' in p[1]:
                c0, strip_n = 'el-Buhârî', 2
            elif len(p) >= 2 and p[0] in (muellif, 'Buhârî'):
                c0, strip_n = 'el-Buhârî', 1
        elif lib == 'acurri':
            if len(p) >= 3 and p[0] == 'İbnü’l-Cevzî' and 'Âcurrî' in p[1]:
                c0, strip_n = 'el-Âcurrî', 2
            elif len(p) >= 2 and p[0] in ('Muhammed', 'Muhammed b. el-Hüseyin', 'Ebû Bekir', 'Ebû Bekir el-Âcurrî', 'Ebû Bekir Muhammed b. el-Hüseyin el-Âcurrî', 'Âcurrî', 'el-Âcurrî'):
                c0, strip_n = 'el-Âcurrî', 1
        elif lib == 'safii':
            if len(p) >= 3 and p[0].startswith('Rebî‘') and 'Şâfiî' in p[1]:
                c0, strip_n = 'eş-Şâfiî', 2
            elif len(p) >= 2 and p[0] in (muellif, 'Şâfiî'):
                c0, strip_n = 'eş-Şâfiî', 1
        elif lib == 'ahmed':
            if len(p) >= 3 and p[0] in ('Abdullah', 'Abdullah b. Ahmed', 'Abdullah b. Ahmed b. Hanbel', 'Sâlih', 'Meymûnî', 'Ebû Dâvûd', 'Ebû Dâvûd es-Sicistânî', 'Ebû Bekir el-Merrûzî') and (p[1] in ('babası', 'Ahmed', 'Ahmed b. Hanbel', 'Ebû Abdullah') or p[1].startswith('babası ')):
                c0, strip_n = 'Ahmed b. Hanbel', 2
            elif len(p) >= 2 and (p[0] in ('Ebû Abdullah', 'Ahmed', 'Ahmed b. Hanbel', 'babası') or p[0].startswith('babası Ahmed')):
                c0, strip_n = 'Ahmed b. Hanbel', 1
            elif len(p) >= 2 and p[0] in ('Abdullah', 'Abdullah b. Ahmed', 'Abdullah b. Ahmed b. Hanbel'):
                c0, strip_n = 'Abdullah b. Ahmed', 1
        else:
            if len(p) >= 2 and p[0] == muellif:
                c0, strip_n = muellif, 1
        if strip_n:
            paths[pi] = p[strip_n:]
        path_meta.append((c0, strip_n))

    # Build new sened string
    new_sened = '; ayrıca '.join(' → '.join(p) for p in paths if p)
    if not new_sened:
        new_info = {'l': label} if label else None
        return [no, '', metin, ziyade, new_info, ar]

    # Extract sigas and build c
    c_ar = clean_ar(ar)
    sigas = extract_sigas(c_ar)

    if len(paths) == 1:
        pravis = paths[0]
        c0, strip_n = path_meta[0]
        chain = [c0]
        for i, r in enumerate(pravis):
            idx = strip_n + i
            sg = sigas[idx][2] if idx < len(sigas) else (sigas[i][2] if i < len(sigas) else 'an')
            chain.extend([sg, r])
        req = len(pravis) + strip_n
        last_end = sigas[req - 1][1] if 0 < req <= len(sigas) else (sigas[-1][1] if sigas else 30)
        k = find_k(ar, c_ar, last_end)
        new_info = {'c': chain, 'k': k}
    else:
        c_list = []
        siga_offset = 0
        for pi, pravis in enumerate(paths):
            c0, strip_n = path_meta[pi]
            chain = [c0]
            for i, r in enumerate(pravis):
                idx = siga_offset + strip_n + i
                sg = sigas[idx][2] if idx < len(sigas) else (sigas[i][2] if i < len(sigas) else 'an')
                chain.extend([sg, r])
            c_list.append(chain)
            siga_offset += strip_n + max(1, len(pravis) // 2)
        last_req = len(paths[-1]) + path_meta[-1][1]
        last_end = sigas[min(len(sigas) - 1, last_req)][1] if sigas else 30
        k = find_k(ar, c_ar, last_end)
        new_info = {'c': c_list, 'k': k}

    # Deduplicate notes preserving order
    dedup_notes = []
    for nt in all_notes:
        nt = nt.strip()
        if nt and nt not in dedup_notes:
            dedup_notes.append(nt)
    if dedup_notes:
        new_info['n'] = dedup_notes
    if label:
        new_info['l'] = label

    return [no, new_sened, metin, ziyade, new_info, ar]


def fix_text(h):
    # Ensure no ﷺ'ek or (?) remains in metin
    no, sened, metin, ziyade, info, ar = h
    if metin:
        metin = re.sub(r'ﷺ([’\']\w+)', r'\1 ﷺ', metin)
    return [no, sened, metin, ziyade, info, ar]


def main():
    libs = sys.argv[1:] or LIBS
    for lib in libs:
        idx_p = R / lib / 'index.json'
        if not idx_p.exists():
            continue
        idx = json.load(open(idx_p, encoding='utf-8'))
        panelli = 0
        for b in idx:
            tr_p = R / lib / 'tr' / b['f']
            if tr_p.exists():
                for bab in json.load(open(tr_p, encoding='utf-8')).get('babs', []):
                    panelli += sum(1 for h in bab.get('h', []) if len(h) > 4 and isinstance(h[4], dict) and h[4].get('c'))
        if panelli:
            print(f'{lib:12s}: {panelli} madde zaten panelli — bu kitaplık standarda getirilmiş, atlandı.')
            continue
        total_items = 0
        total_panels = 0
        for b in idx:
            tr_p = R / lib / 'tr' / b['f']
            if not tr_p.exists():
                continue
            data = json.load(open(tr_p, encoding='utf-8'))
            cnt = 0
            for bab in data.get('babs', []):
                new_h = []
                for h in bab.get('h', []):
                    h2 = fix_text(h)
                    h3 = process_item(lib, b['f'], h2)
                    new_h.append(h3)
                    cnt += 1
                    if len(h3) > 4 and isinstance(h3[4], dict) and h3[4].get('c'):
                        total_panels += 1
                bab['h'] = new_h
            total_items += cnt
            tr_p.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
        print(f'{lib:12s}: {total_items:5d} madde işlendi ({total_panels:5d} râvi paneli).')


if __name__ == '__main__':
    main()
