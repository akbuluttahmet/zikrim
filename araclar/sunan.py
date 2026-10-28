"""Şâmile 1726'nın OpenITI kopyasını mevcut çevirilerle derler.

Kullanım: python3 araclar/sunan.py kaynak.txt [--ceviri yeni-ceviri.txt]
          [--ceviri-jsonl dosya.jsonl ...] [--sirali]
Çeviri satırı: numara | Türkçe sened | Türkçe metin (satır sonu: \\n).
Mevcut çeviriler ve kitap sıraları korunur; yalnız çevrilmiş maddeler açılır.
"""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TITLES = [
    'Tahâret', 'Namaz', 'İstiskā namazı', 'Yolculuk namazı',
    'Nâfile namazlar ve sünnet rekâtları', 'Ramazan', 'Tilâvet secdeleri',
    'Vitir', 'Zekât', 'Buluntu mal', 'Hac menâsiki', 'Nikâh', 'Talâk',
    'Oruç', 'Cihad', 'Kurbanlar ve av', 'Vasiyetler', 'Ferâiz',
    'Harâc, emirlik ve fey', 'Cenazeler', 'Yeminler ve adaklar',
    'Alışverişler ve icâre', 'Yargı', 'İlim', 'İçecekler', 'Yiyecekler',
    'Tıp', 'Köle âzadı', 'Harfler ve kıraatler', 'Hamam', 'Giyim',
    'Saç bakımı', 'Yüzük', 'Fitneler ve melhameler', 'Mehdî',
    'Melhameler', 'Hadler', 'Diyetler', 'Sünnet', 'Edeb ve uyku',
]
BABS = {
    'باب الحث على طلب العلم': 'İlim talebine teşvik babı',
    'باب رواية حديث أهل الكتاب': 'Ehl-i kitabın sözlerini rivayet etme babı',
    'باب في كتاب العلم': 'İlmi yazma babı',
    'باب في التشديد في الكذب على رسول الله صلى الله عليه وسلم': 'Resûlullah’a ﷺ yalan isnat etme hakkındaki ağır uyarı babı',
    'باب الكلام في كتاب الله بغير علم': 'Allah’ın Kitabı hakkında ilimsiz konuşma babı',
    'باب تكرير الحديث': 'Hadisi tekrarlama babı',
    'باب في سرد الحديث': 'Hadisi peş peşe anlatma babı',
    'باب التوقي في الفتيا': 'Fetvada sakınma babı',
    'باب كراهية منع العلم': 'İlmi esirgemenin kerâheti babı',
    'باب فضل نشر العلم': 'İlmi yaymanın fazileti babı',
    'باب الحديث عن بني إسرائيل': 'İsrâiloğullarından rivayet etme babı',
    'باب في طلب العلم لغير الله تعالى': 'Allah teâlâdan başkası için ilim talep etme babı',
    'باب في القصص': 'Kıssa anlatma babı',
}


def clean(text):
    text = re.sub(r'PageV\d+P\d+|ms\d+', '', text)
    text = re.sub(r'^(?:# |~~)', '', text, flags=re.M)
    return re.sub(r'\s+', ' ', text).strip()


def parse(source):
    source = source.split('#META#Header#End#', 1)[1]
    events, skip_grade = [], False
    for line in source.splitlines():
        if line.startswith('### $ '):
            events.append(['section', clean(line[6:]), ''])
        elif line.startswith('### | '):
            heading = clean(line[6:])
            if re.fullmatch(r'\[ص:\s*\d+\]', heading):
                continue
            if 'حكم الألباني' in heading:
                # Modern tahkik hükmü eserin kendi metni değildir. Yalnız
                # hüküm satırı çıkarılır; ardından gelen müellif notu korunur.
                skip_grade = True
                continue
            skip_grade = False
            events.append(['heading', heading, ''])
        elif events:
            text = clean(line)
            if not text:
                continue
            if skip_grade:
                skip_grade = False
                continue
            events[-1][2] += ' ' + text
    sections, section, item, bab, pending, used = [], None, None, '', '', False

    def orphan():
        if not pending or used:
            return ''
        if 'قال أبو داود:' in pending:
            title, text = pending.split('قال أبو داود:', 1)
            previous = section['items'][-1]['n']
            section['items'].append({'n': previous + 0.1, 'bab': title.strip(),
                                     'ar': 'قال أبو داود:' + text})
            return ''
        return pending

    for kind, heading, continuation in events:
        if kind == 'section':
            orphan()
            section = {'ar': heading, 'items': []}
            sections.append(section)
            item, bab, pending, used = None, '', '', False
        else:
            match = re.fullmatch(r'(\d+)\s*-', heading)
            if match:
                number = int(match[1])
                used = True
                # OpenITI bazen sayfa devamında aynı numarayı tekrarlar.
                if section['items'] and section['items'][-1]['n'] == number:
                    item = section['items'][-1]
                    if item['bab'] != bab:
                        raise ValueError(f'{number}: devam maddesinin babı farklı')
                else:
                    item = {'n': number, 'bab': bab, 'ar': ''}
                    section['items'].append(item)
                item['ar'] += ' ' + continuation
            else:
                prefix = orphan()
                bab = clean((prefix + ' — ' if prefix else '') + heading + continuation)
                pending, used, item = bab, False, None
    orphan()
    for section in sections:
        for item in section['items']:
            item['ar'] = clean(item['ar'])
            if not item['ar']:
                raise ValueError(f"{item['n']}: boş Arapça metin")
    numbers = [i['n'] for s in sections for i in s['items'] if isinstance(i['n'], int)]
    if len(sections) != 40 or numbers != list(range(1, 5275)):
        raise ValueError('Kaynakta 40 bölüm ve sıralı 1–5274 numaraları bulunmalı')
    return sections


def build(source, translation=None, jsonl_files=(), sequential=False):
    sections = parse(Path(source).read_text(encoding='utf-8'))
    base = ROOT / 'sunan'
    (base / 'tr').mkdir(parents=True, exist_ok=True)
    old, old_babs = {}, {}
    for path in sorted((base / 'tr').glob('s*.json')):
        for bab in json.loads(path.read_text(encoding='utf-8'))['babs']:
            for row in bab['h']:
                if row[0] in old:
                    raise ValueError(f'{row[0]}: mevcut dosyalarda tekrar')
                old[row[0]], old_babs[row[0]] = row, bab['t']
    incoming, titles = {}, dict(BABS)
    title_path = base / 'basliklar.json'
    if title_path.exists():
        titles.update(json.loads(title_path.read_text(encoding='utf-8')))
    source_by_number = {i['n']: i for s in sections for i in s['items']}
    for path in jsonl_files:
        for line_no, line in enumerate(Path(path).read_text(encoding='utf-8').splitlines(), 1):
            if not line.strip():
                continue
            record = json.loads(line)
            num = record['n']
            if type(num) not in (int, float) or num not in source_by_number:
                raise ValueError(f'{path}:{line_no}: geçersiz numara')
            if record['bab_ar'] != source_by_number[num]['bab']:
                raise ValueError(f'{path}:{line_no}: kaynak bab başlığı farklı')
            if not isinstance(record['sened'], str):
                raise ValueError(f'{path}:{line_no}: sened yazı olmalı')
            for field in ('metin', 'bab_tr'):
                if field == 'bab_tr' and not record['bab_ar'] and record[field] == '':
                    continue
                if not isinstance(record[field], str) or not record[field].strip():
                    raise ValueError(f'{path}:{line_no}: {field} boş')
            if '(?)' in record['metin']:
                raise ValueError(f'{num}: çözümlenmemiş soru işareti')
            if num in incoming and incoming[num] != record:
                raise ValueError(f'{num}: çelişen iki çeviri')
            incoming[num] = record
    if sequential:
        # Önceden yayımlanmış kısımlar korunur. Yeni maddeler yalnızca
        # baştan itibaren kesintisiz tamamlanan aralıkta yayına alınır.
        allowed = set()
        for num in source_by_number:
            if num not in old and num not in incoming:
                break
            allowed.add(num)
        incoming = {n: row for n, row in incoming.items() if n in allowed}
    for num, record in sorted(incoming.items()):
        old[num] = [num, record['sened'].strip(), record['metin'].strip(), 0, None, '']
        titles.setdefault(record['bab_ar'], record['bab_tr'].strip())
    if translation:
        seen = set()
        for line in Path(translation).read_text(encoding='utf-8').splitlines():
            if not line.strip():
                continue
            num, chain, text = [s.strip() for s in line.split('|', 2)]
            num = int(num)
            if num in seen or not 1 <= num <= 5274 or not text or '(?)' in text:
                raise ValueError(f'{num}: geçersiz çeviri satırı')
            seen.add(num)
            old[num] = [num, chain, text.replace('\\n', '\n'), 0, None, '']
    index, outputs = [], {}
    for pos, section in enumerate(sections):
        filename = f's{pos + 1:02}.json'
        babs, current, last_bab = [], None, None
        for item in section['items']:
            if item['n'] not in old:
                continue
            row = old[item['n']]
            row[5] = item['ar']
            title = titles[item['bab']] if item['bab'] in titles else old_babs.get(item['n'])
            if title is None or (not title and item['bab']):
                raise ValueError(f"{item['n']}: Türkçe bab başlığı eksik")
            if last_bab != item['bab']:
                current = {'t': title, 'h': []}
                babs.append(current)
                last_bab = item['bab']
            current['h'].append(row)
        count = sum(len(b['h']) for b in babs)
        if count:
            outputs[base / 'tr' / filename] = {'babs': babs}
        index.append({'f': filename, 'tr': TITLES[pos], 'n': len(section['items']),
                      'b': sum(j == 0 or i['bab'] != section['items'][j - 1]['bab']
                               for j, i in enumerate(section['items'])),
                      'from': section['items'][0]['n'], 'to': section['items'][-1]['n'], 't': count})
    outputs[base / 'index.json'] = index
    if jsonl_files:
        outputs[title_path] = titles
    # Bütün girdiler doğrulanmadan mevcut veri dosyalarına dokunulmaz.
    for path, data in outputs.items():
        path.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print(f'Sünen: {sum(b["t"] for b in index)}/{sum(b["n"] for b in index)} madde (5274 hadis ve numarasız müellif metni), 40 bölüm')


if __name__ == '__main__':
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument('kaynak')
    cli.add_argument('--ceviri')
    cli.add_argument('--ceviri-jsonl', nargs='*', default=[])
    cli.add_argument('--sirali', action='store_true', help='Yeni çevirileri yalnız kesintisiz sırayla ekle')
    args = cli.parse_args()
    build(args.kaynak, args.ceviri, args.ceviri_jsonl, args.sirali)
