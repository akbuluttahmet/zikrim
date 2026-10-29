"""Asıl kitap dosyalarından atomik, sürümlenmiş bir SQLite arama indeksi üretir."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import sqlite3
import subprocess
import tempfile
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DB = ROOT / 'ai' / '.data' / 'library.sqlite3'
CONFIG = ROOT / 'ai' / 'sources.json'


def fold(text):
    text = text.replace('İ', 'i').replace('I', 'ı').lower()
    text = text.translate(str.maketrans('ıışçğöü', 'iiscgou'))
    text = ''.join(c for c in unicodedata.normalize('NFKD', text)
                   if not unicodedata.combining(c))
    return re.sub(r"[‘’'ʿʾ`´]", '', text)


def parts(text, size=2200):
    """Alıntılar değişmeden kalır; uzun metinler yalnız arama için bölünür."""
    start = 0
    while start < len(text):
        end = min(len(text), start + size)
        if end < len(text):
            boundary = max(text.rfind('\n', start + size // 2, end),
                           text.rfind('. ', start + size // 2, end),
                           text.rfind(' ', start + size // 2, end))
            if boundary > start:
                end = boundary + 1
        yield text[start:end]
        start = end


def excluded(v, h):
    text = h[2]
    if not isinstance(text, str) or not text.strip():
        return 'empty'
    if h[0] == 0 or (v == 'zuhd' and h[0] == 1):
        return 'introduction'
    if re.search(r'\(metin[^)]*(?:bozuk|böyle)|\(\?\)', text, re.I):
        return 'damaged'
    if len(text) < 100 and re.search(r'benzer|mislini|aynısını|bu hadisi zikretti', text, re.I):
        return 'dependent'
    return None


def build(root=ROOT, output=DEFAULT_DB, config_path=CONFIG):
    root, output = Path(root), Path(output)
    config = json.loads(Path(config_path).read_text())
    extracted = json.loads(subprocess.check_output(
        ['node', str(ROOT / 'ai/extract.mjs'), str(root)], text=True))
    digest = hashlib.sha256()
    counts, skipped, records = {}, {}, []
    # Sürüm, sıralamaya bağlı dosya eşlemesini ve cevap kurallarını da kapsar.
    def include(path):
        data = path.read_bytes()
        digest.update(str(path.relative_to(root)).encode() + b'\0' + data)
        return json.loads(data)

    digest.update(Path(config_path).read_bytes())
    for name in ('script.js', 'usul.js'):
        digest.update((root / name).read_bytes())
    for v in config['libraries']:
        if v == 'usul':
            u = extracted['usul']
            books = [(0, {'f': 'usul.js', 'tr': 'Usûlü’s-Sünne', 't': len(u['items'])},
                      {'babs': [{'t': title, 'h': [[n, u['sened'], text, 0, None, u['ar'].get(str(n), '')]]}
                                for n, title, text in u['items']]})]
        else:
            idx = include(root / v / 'index.json')
            books = [(i, meta, include(root / v / 'tr' / meta['f']))
                     for i, meta in enumerate(idx) if meta.get('t') and meta.get('f')]
        counts[v] = 0
        for bi, meta, data in books:
            for bb in data['babs']:
                for h in bb['h']:
                    if len(h) != 6:
                        raise ValueError(f'{v}/{meta["f"]}: altı alan bekleniyor')
                    n = str(h[0])
                    ident = f'{v}:{Path(meta["f"]).stem}:{n}'
                    reason = 'disabled' if ident in config.get('excluded_ids', []) else excluded(v, h)
                    if reason:
                        skipped[reason] = skipped.get(reason, 0) + 1
                        continue
                    if v == 'usul':
                        labels = {'source': f'İmam Ahmed (رحمه الله), Usûlü’s-Sünne, madde {n}',
                                  'label': f'Madde {n}'}
                        note = extracted['usul']['note']
                    else:
                        labels = dict(extracted['metadata'][v]['books'][meta['f']][n])
                        note = extracted['metadata'][v]['note']
                    if isinstance(h[4], dict) and h[4].get('l'):
                        labels['label'] = h[4]['l']
                    record = dict(id=ident, library=v, file=meta['f'], book=meta['tr'],
                                  bab=bb.get('t') or 'Kitabın başı', number=h[0],
                                  text=h[2], isnad=h[1] or '', arabic=h[5] or '',
                                  info=h[4], edition_note=note, **labels)
                    records.append(record)
                    counts[v] += 1
    output.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary = tempfile.mkstemp(dir=output.parent, suffix='.sqlite3')
    os.close(fd)
    try:
        with sqlite3.connect(temporary) as db:
            db.executescript('''
                CREATE TABLE records (id TEXT PRIMARY KEY, library TEXT, payload TEXT);
                CREATE VIRTUAL TABLE passages USING fts5(
                    source_id UNINDEXED, passage UNINDEXED, body, title,
                    tokenize='unicode61 remove_diacritics 2');
                CREATE TABLE metadata (key TEXT PRIMARY KEY, value TEXT);
            ''')
            for record in records:
                db.execute('INSERT INTO records VALUES (?, ?, ?)',
                           (record['id'], record['library'], json.dumps(record, ensure_ascii=False)))
                for passage in parts(record['text']):
                    db.execute('INSERT INTO passages VALUES (?, ?, ?, ?)',
                               (record['id'], passage, fold(passage),
                                fold(record['book'] + ' ' + record['bab'])))
            report = {'version': digest.hexdigest()[:20], 'records': len(records),
                      'libraries': counts, 'skipped': skipped, 'schema': 1}
            db.execute('INSERT INTO metadata VALUES (?, ?)', ('corpus', json.dumps(report)))
        os.replace(temporary, output)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=DEFAULT_DB)
    args = parser.parse_args()
    print(json.dumps(build(output=args.output), ensure_ascii=False, indent=2))
