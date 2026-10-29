import io
import json
import os
from pathlib import Path
import sqlite3
import tempfile
import threading
import unittest
from unittest.mock import patch
import urllib.error
import urllib.request

from .gemini import GeminiError, select_sources
from .index import DEFAULT_DB, build, excluded, fold, parts
from .retrieval import Library, query_terms
from .server import Budget, make_server
from .service import answer, validate_selection


class ValidationTests(unittest.TestCase):
    def setUp(self):
        self.candidates = [{'id': 'musannef:k21:29148', 'quote': 'Kabir azabından Allah’a sığının.',
                            'text': 'Nebî ﷺ buyurdu: “Kabir azabından Allah’a sığının.”'}]

    def test_only_server_quotes_are_returned(self):
        result = validate_selection({'status': 'answered', 'source_ids': [self.candidates[0]['id']]}, self.candidates)
        self.assertEqual(result, self.candidates)

    def test_fabricated_id_and_extra_answer_rejected(self):
        for selection in [
            {'status': 'answered', 'source_ids': ['uydurma:1']},
            {'status': 'answered', 'source_ids': [self.candidates[0]['id']], 'answer': 'uydurma'},
            {'status': 'answered', 'source_ids': []},
            {'status': 'insufficient', 'source_ids': [self.candidates[0]['id']]},
            {'status': 'answered', 'source_ids': [self.candidates[0]['id']] * 2},
            {'status': 'answered', 'source_ids': [42]}, []
        ]:
            with self.subTest(selection=selection), self.assertRaises(GeminiError):
                validate_selection(selection, self.candidates)

    def test_changed_quote_rejected(self):
        self.candidates[0]['quote'] = 'Bu rivayet sahihtir.'
        with self.assertRaises(GeminiError):
            validate_selection({'status': 'answered', 'source_ids': [self.candidates[0]['id']]}, self.candidates)

    def test_abstention(self):
        self.assertEqual(validate_selection({'status': 'insufficient', 'source_ids': []}, self.candidates), [])

    def test_chunking_preserves_every_character(self):
        text = ('Uzun bir rivayet.\n' * 900) + 'Son.'
        chunks = list(parts(text))
        self.assertEqual(''.join(chunks), text)
        self.assertTrue(all(c in text and len(c) <= 2200 for c in chunks))

    def test_unsafe_and_dependent_records_excluded(self):
        for text in ['Eksik (metin burada bozuktur)', '(metinde böyle)', 'Onun benzerini zikretti.']:
            self.assertTrue(excluded('musannef', [1, '', text, 0, None, '']))

    def test_turkish_query_folding_and_fts_escaping(self):
        self.assertEqual(fold('İSTİĞFÂR Şükrü'), 'istigfar sukru')
        terms = query_terms('halifeden " OR * --', {'aliases': []})
        self.assertIn('halife', terms)
        self.assertTrue(all('"' not in t and '*' not in t for t in terms))


class IndexTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        (self.root / 'test/tr').mkdir(parents=True)
        (self.root / 'script.js').write_text("const LIBS = {test: {note:'Nüsha', src:n=>'Kaynak '+n, label:n=>'No. '+n}};\nfor (const [k, L] of Object.entries(LIBS)) {}")
        (self.root / 'usul.js').write_text('const USUL=[], USUL_AR={}, USUL_NOTE="", USUL_SENED="";')
        self.config = self.root / 'config.json'
        self.config.write_text(json.dumps({'libraries': ['test'], 'excluded_ids': [], 'aliases': []}))
        self.db = self.root / 'index.sqlite3'
        self.idx = [{'f': 'one.json', 'tr': 'Birinci', 't': 2}, {'f': 'two.json', 'tr': 'Kapalı', 't': 0}]
        self.write_index()
        (self.root / 'test/tr/one.json').write_text(json.dumps({'babs': [{'t': 'Bab', 'h': [
            [1, 'Sened', 'Kabir azabından Allah’a sığının.', 0, None, 'العربية'],
            [1.01, '', 'Sabır ve dua hakkında ara metin.', 0, {'l': 'Numarasız metin'}, 'عربي']]}]}))
        (self.root / 'test/tr/two.json').write_text(json.dumps({'babs': [{'t': '', 'h': [[2, '', 'Gizli metin', 0, None, '']]}]}))

    def tearDown(self):
        self.tmp.cleanup()

    def write_index(self):
        (self.root / 'test/index.json').write_text(json.dumps(self.idx))

    def build(self):
        return build(self.root, self.db, self.config)

    def test_originals_metadata_fraction_and_untranslated_filter(self):
        report = self.build()
        library = Library(self.db, self.config)
        self.assertEqual(report['records'], 2)
        rows = library.search('sabır')
        self.assertEqual(rows[0]['id'], 'test:one:1.01')
        self.assertEqual(rows[0]['label'], 'Numarasız metin')
        self.assertEqual(rows[0]['arabic'], 'عربي')
        self.assertEqual(rows[0]['edition_note'], 'Nüsha')
        self.assertEqual(library.search('Gizli'), [])

    def test_stable_id_after_book_reordering_and_changed_version(self):
        first = self.build()
        self.idx.reverse(); self.write_index()
        second = self.build()
        self.assertNotEqual(first['version'], second['version'])
        self.assertEqual(Library(self.db, self.config).search('Kabir')[0]['id'], 'test:one:1')

    def test_duplicate_id_fails_without_destroying_previous_index(self):
        before = self.build()
        path = self.root / 'test/tr/one.json'
        data = json.loads(path.read_text()); data['babs'][0]['h'].append(data['babs'][0]['h'][0]); path.write_text(json.dumps(data))
        with self.assertRaises(sqlite3.IntegrityError):
            self.build()
        self.assertEqual(Library(self.db, self.config).metadata(), before)

    def test_source_removal_clears_old_index(self):
        self.build()
        config = json.loads(self.config.read_text()); config['excluded_ids'] = ['test:one:1']; self.config.write_text(json.dumps(config))
        self.build()
        self.assertEqual(Library(self.db, self.config).search('Kabir'), [])


class GeminiTests(unittest.TestCase):
    def test_request_keeps_key_out_of_url_and_returns_json_selection(self):
        captured = []
        selection = {'status': 'insufficient', 'source_ids': []}
        def opener(req, timeout):
            captured.append(req)
            return io.BytesIO(json.dumps({'candidates': [{'finishReason': 'STOP', 'content': {'parts': [{'text': json.dumps(selection)}]}}]}).encode())
        self.assertEqual(select_sources('Soruyu seç', [], api_key='test-secret', model='test-model', opener=opener), selection)
        self.assertNotIn('test-secret', captured[0].full_url)
        self.assertEqual(captured[0].get_header('X-goog-api-key'), 'test-secret')
        self.assertNotIn('tools', json.loads(captured[0].data))

    def test_truncated_response_is_not_accepted(self):
        def opener(*args, **kwargs):
            return io.BytesIO(b'{"candidates":[{"finishReason":"MAX_TOKENS"}]}')
        with self.assertRaises(GeminiError):
            select_sources('Soru', [], api_key='test', model='model', opener=opener)

    def test_missing_credentials_and_model_rejected(self):
        with patch.dict(os.environ, {}, clear=True), self.assertRaises(GeminiError):
            select_sources('Soru', [])


@unittest.skipUnless(DEFAULT_DB.exists(), 'Önce python3 araclar/ai_indeks.py çalıştır')
class CorpusAndHTTPTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = make_server(port=0, token='test-personal-access', selector=lambda q, c: {'status': 'answered', 'source_ids': [c[0]['id']]})
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True); cls.thread.start()
        cls.url = f'http://127.0.0.1:{cls.server.server_address[1]}'

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown(); cls.server.server_close(); cls.thread.join()

    def request(self, path, body=None, token='test-personal-access', origin=None):
        headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
        if origin:
            headers['Origin'] = origin
        req = urllib.request.Request(self.url + path, data=json.dumps(body).encode() if body is not None else None, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=5) as response:
                return response.status, response.read(), response.headers
        except urllib.error.HTTPError as response:
            return response.code, response.read(), response.headers

    def test_real_corpus_retrieves_quote(self):
        rows = Library().search('Kabir azabından Allah’a sığınmak', 'musannef')
        self.assertIn('musannef:k21:29148', {r['id'] for r in rows})
        self.assertTrue(all(r['quote'] in r['text'] for r in rows))

    def test_search_does_not_call_gemini(self):
        selector = lambda *_: self.fail('Anahtarsız arama Gemini çağırmamalı')
        response = answer(Library(), 'Kabir azabı', 'musannef', 'search', selector)
        self.assertEqual(response['status'], 'search_results')

    def test_auth_and_origin_blocked_before_work(self):
        body = {'question': 'Kabir azabı', 'mode': 'search'}
        self.assertEqual(self.request('/api/ai/ask', body, token='wrong')[0], 401)
        self.assertEqual(self.request('/api/ai/ask', body, origin='https://untrusted.example')[0], 403)

    def test_static_secrets_and_index_are_not_served(self):
        for path in ('/.git/config', '/ai/.data/library.sqlite3', '/ai/.env.example', '/ai/server.py', '/%2e%2e/etc/passwd'):
            with self.subTest(path=path):
                self.assertEqual(self.request(path)[0], 404)

    def test_invalid_request_rejected(self):
        for body in ({'question': 'ab'}, {'question': 'soru', 'library': '../'}, {'question': 'soru', 'mode': 'bad'}, []):
            self.assertEqual(self.request('/api/ai/ask', body)[0], 400)

    def test_search_endpoint_and_no_store(self):
        code, raw, headers = self.request('/api/ai/ask', {'question': 'Kabir azabı', 'mode': 'search', 'library': 'musannef'})
        self.assertEqual(code, 200)
        self.assertEqual(json.loads(raw)['status'], 'search_results')
        self.assertEqual(headers['Cache-Control'], 'no-store')

    def test_missing_key_has_explicit_error(self):
        with patch.dict(os.environ, {'GEMINI_API_KEY': '', 'GEMINI_MODEL': ''}):
            code, raw, _ = self.request('/api/ai/ask', {'question': 'Kabir azabı'})
        self.assertEqual(code, 503)
        self.assertIn('Gemini henüz etkin değil', json.loads(raw)['error'])

    def test_gemini_path_with_injected_provider_returns_canonical_source(self):
        with patch.dict(os.environ, {'GEMINI_API_KEY': 'mock-key', 'GEMINI_MODEL': 'mock-model'}):
            code, raw, _ = self.request('/api/ai/ask', {'question': 'Allah’a sığınma', 'library': 'musannef'})
        self.assertEqual(code, 200)
        response = json.loads(raw)
        self.assertEqual(response['status'], 'answered')
        self.assertIn(response['sources'][0]['quote'], response['sources'][0]['text'])


class BudgetTests(unittest.TestCase):
    def test_limit_blocks_additional_calls(self):
        budget = Budget(minute=1, day=2)
        self.assertTrue(budget.take())
        self.assertFalse(budget.take())


if __name__ == '__main__':
    unittest.main()
