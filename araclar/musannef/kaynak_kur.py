#!/usr/bin/env python3
"""OpenITI Shamela0009944 (Musannef, el-Hût neşri) → araclar/musannef/kaynak.json

Kullanım: python3 araclar/musannef/kaynak_kur.py OPENITI_DOSYASI
Çıktı: [{"k": kitap_no, "ad": "كتاب …", "items": [{"n": no, "bab": "…", "ar": "…"}]}]
Bab, maddenin önündeki en son "### |" başlığıdır. Sayfa/ms işaretleri silinir.
"""
import json, re, sys
from pathlib import Path

OUT = Path(__file__).with_name('kaynak.json')
MS = re.compile(r'\s*\bms\d+\b\s*')
SAYFA = re.compile(r'^\[ص:\s*\d+\]$')


def temiz(s):
    s = MS.sub(' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def main(src):
    books, cur, bab, item = [], None, '', None
    for raw in open(src, encoding='utf-8'):
        line = raw.rstrip('\n')
        if line.startswith('# Page') or line.startswith('# <div') or line.startswith('######'):
            continue
        m = re.match(r'^### \$ (\d+) - (.*)$', line)
        if m:
            no, t = int(m.group(1)), temiz(m.group(2))
            if t.startswith('كتاب') and (not books or no == books[-1]['k'] + 1):
                cur = {'k': no, 'ad': t, 'items': []}
                books.append(cur); bab = ''; item = None
            else:  # bab başlığına yapışmış madde numarası
                bab = t
                item = {'n': no, 'bab': bab, 'ar': ''}
                cur['items'].append(item)
            continue
        m = re.match(r'^### \| (\d+) - ?(.*)$', line)
        if m:
            on = ''
            if item is not None and item['n'] is None and len(item['ar']) < 15:
                on = item['ar']; cur['items'].remove(item)  # numaradan önce kalan "حدثنا"
            item = {'n': int(m.group(1)), 'bab': bab, 'ar': (on + ' ' + temiz(m.group(2))).strip()}
            cur['items'].append(item)
            continue
        if line.startswith('### |'):
            t = temiz(line[5:])
            if not t or SAYFA.match(t):
                continue
            bab = t; item = None
            continue
        if line.startswith('# ') or line.startswith('~~'):
            t = temiz(line[2:])
            if not t:
                continue
            if item is None:
                if cur is None:
                    continue
                item = {'n': None, 'bab': bab, 'ar': ''}
                cur['items'].append(item)
            item['ar'] = (item['ar'] + ' ' + t).strip()
    # numarasız parçalar: isnadla başlayan uzun parça ayrı madde (kesirli anahtar), değilse önceki maddenin devamı
    for b in books:
        out = []
        for it in b['items']:
            if it['n'] is None and out:
                if re.match(r'^(?:و?حدثنا|حدثني|ثنا|نا|أخبرنا)\s', it['ar']) and len(it['ar']) > 40:
                    it['ayri'] = True
                else:
                    out[-1]['ar'] += ' ' + it['ar']; continue
            out.append(it)
        b['items'] = out
    json.dump(books, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False)
    for b in books:
        ns = [i['n'] for i in b['items']]
        print(b['k'], b['ad'], len(ns), ns[0], ns[-1], 'numarasız:', sum(1 for x in ns if x is None))


if __name__ == '__main__':
    main(sys.argv[1])
