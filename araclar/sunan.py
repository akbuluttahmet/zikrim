"""Şâmile 1726'nın OpenITI kopyasını mevcut çevirilerle derler.

Kullanım: python3 araclar/sunan.py kaynak.txt [--ceviri yeni-ceviri.txt]
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
    sections, section, item, bab = [], None, None, ''
    for line in source.splitlines():
        if line.startswith('### $ '):
            section = {'ar': clean(line[6:]), 'items': []}
            sections.append(section)
            item, bab = None, ''
        elif line.startswith('### | '):
            heading = clean(line[6:])
            if re.fullmatch(r'\[ص:\s*\d+\]', heading):
                continue
            match = re.fullmatch(r'(\d+)\s*-', heading)
            if match:
                number = int(match[1])
                # OpenITI bazen sayfa devamında aynı numarayı tekrarlar.
                if section['items'] and section['items'][-1]['n'] == number:
                    item = section['items'][-1]
                    if item['bab'] != bab:
                        raise ValueError(f'{number}: devam maddesinin babı farklı')
                else:
                    item = {'n': number, 'bab': bab, 'ar': ''}
                    section['items'].append(item)
            else:
                bab, item = heading, None
        elif item is not None:
            item['ar'] += '\n' + line
    for section in sections:
        for item in section['items']:
            item['ar'] = clean(item['ar'])
            if not item['ar']:
                raise ValueError(f"{item['n']}: boş Arapça metin")
    numbers = [i['n'] for s in sections for i in s['items']]
    if len(sections) != 40 or numbers != list(range(1, 5275)):
        raise ValueError('Kaynakta 40 bölüm ve sıralı 1–5274 numaraları bulunmalı')
    return sections


def build(source, translation=None):
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
    index = []
    for pos, section in enumerate(sections):
        filename = f's{pos + 1:02}.json'
        babs, current, last_bab = [], None, None
        for item in section['items']:
            if item['n'] not in old:
                continue
            row = old[item['n']]
            row[5] = item['ar']
            title = BABS.get(item['bab']) or old_babs.get(item['n'])
            if not title:
                raise ValueError(f"{item['n']}: Türkçe bab başlığı eksik")
            if last_bab != item['bab']:
                current = {'t': title, 'h': []}
                babs.append(current)
                last_bab = item['bab']
            current['h'].append(row)
        count = sum(len(b['h']) for b in babs)
        if count:
            (base / 'tr' / filename).write_text(json.dumps({'babs': babs}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
        index.append({'f': filename, 'tr': TITLES[pos], 'n': len(section['items']),
                      'b': len(dict.fromkeys(i['bab'] for i in section['items'])),
                      'from': section['items'][0]['n'], 'to': section['items'][-1]['n'], 't': count})
    (base / 'index.json').write_text(json.dumps(index, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print(f'Sünen: {sum(b["t"] for b in index)}/5274 hadis, 40 bölüm')


if __name__ == '__main__':
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument('kaynak')
    cli.add_argument('--ceviri')
    args = cli.parse_args()
    build(args.kaynak, args.ceviri)
