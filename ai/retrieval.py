"""BM25 araması ve açıkça yönetilen Türkçe sorgu eşlemeleri. Vektör araması değildir."""
import json
import re
import sqlite3
from .index import CONFIG, DEFAULT_DB, fold

STOP = set('bir bu şu ne nasıl hangi için ile ve veya da de bana benim ben sen onun hakkında '
           'bilgi verir misin mısın söyler nelerdir nedir dair olan olarak var mı mi mu mü '
           'kütüphanede kaynak kaynaklar göster geçen ilgili okuyabileceğim okumalıyım '
           'hadis hadisler rivayet rivayetler söz sözler anlat'.split())
STOP = {fold(w) for w in STOP}
STOP.update({'ediyor', 'diyor', 'buyuruyor', 'resulullah', 'peygamber', 'peygamberimiz'})
SUFFIXES = ('larindan', 'lerinden', 'larinda', 'lerinde', 'larina', 'lerine',
            'larin', 'lerin', 'lardan', 'lerden', 'indan', 'inden', 'undan', 'unden',
            'daki', 'deki', 'dan', 'den', 'lar', 'ler')


def query_terms(question, config):
    normalized = fold(question)
    terms = []
    for word in re.findall(r'[^\W_]+', normalized):
        if len(word) < 3 or word in STOP:
            continue
        # Sadece sorguya uygulanır. Özgün metni veya alıntıyı değiştirmez.
        for suffix in SUFFIXES:
            if word.endswith(suffix) and len(word) - len(suffix) >= 4:
                word = word[:-len(suffix)]
                break
        terms.append(word)
    for alias in config.get('aliases', []):
        if any(fold(t) in normalized for t in alias['triggers']):
            terms.extend(fold(t) for t in alias['terms'])
    # Parametreli SQL'in içinde dahi FTS sözdizimini kullanıcı belirleyemez.
    return list(dict.fromkeys(terms))[:16]


class Library:
    def __init__(self, path=DEFAULT_DB, config_path=CONFIG):
        self.path = path
        self.config = json.loads(config_path.read_text())

    def connect(self):
        return sqlite3.connect(f'{self.path.resolve().as_uri()}?mode=ro', uri=True)

    def metadata(self):
        with self.connect() as db:
            return json.loads(db.execute("SELECT value FROM metadata WHERE key='corpus'").fetchone()[0])

    def search(self, question, library='', limit=8):
        if library and library not in self.config['libraries']:
            raise ValueError('Bilinmeyen kitaplık')
        terms = query_terms(question, self.config)
        if not terms:
            return []
        expression = ' OR '.join('"' + w.replace('"', '""') + '"*' for w in terms)
        with self.connect() as db:
            rows = db.execute('''SELECT r.payload, p.passage, bm25(passages, 0, 0, 1, 0.3)
                FROM passages p JOIN records r ON r.id=p.source_id
                WHERE passages MATCH ? AND (?='' OR r.library=?)
                ORDER BY bm25(passages, 0, 0, 1, 0.3), p.rowid LIMIT 100''',
                              (expression, library, library)).fetchall()
        seen, out = set(), []
        for payload, passage, score in rows:
            record = json.loads(payload)
            if record['id'] in seen:
                continue
            seen.add(record['id'])
            out.append({**record, 'quote': passage, 'score': score})
            if len(out) >= limit:
                break
        return out
