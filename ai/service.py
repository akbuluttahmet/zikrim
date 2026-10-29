from .gemini import GeminiError, select_sources

INSUFFICIENT = 'Mevcut kütüphane kaynaklarında bu soruyu cevaplayacak yeterli bilgi bulamadım.'


def validate_selection(selection, candidates):
    if not isinstance(selection, dict) or set(selection) != {'status', 'source_ids'}:
        raise GeminiError('Kaynak seçimi doğrulanamadı')
    status, ids = selection['status'], selection['source_ids']
    if status not in ('answered', 'insufficient') or not isinstance(ids, list):
        raise GeminiError('Kaynak seçimi doğrulanamadı')
    if len(ids) > 3 or any(not isinstance(i, str) for i in ids) or len(set(ids)) != len(ids):
        raise GeminiError('Kaynak seçimi doğrulanamadı')
    allowed = {row['id']: row for row in candidates}
    if any(i not in allowed for i in ids) or (status == 'answered') != bool(ids):
        raise GeminiError('Kaynak seçimi doğrulanamadı')
    selected = []
    for ident in ids:
        row = allowed[ident]
        if not row['quote'] or row['quote'] not in row['text']:
            raise GeminiError('Alıntı kaynakla eşleşmiyor')
        selected.append(row)
    return selected


def answer(library, question, scope='', mode='gemini', selector=select_sources):
    candidates = library.search(question, scope)
    version = library.metadata()['version']
    if mode == 'search':
        return {'status': 'search_results', 'message': 'Bunlar arama sonuçlarıdır; cevap olarak doğrulanmamıştır.',
                'sources': candidates[:5], 'corpus_version': version, 'mode': mode}
    if not candidates:
        return {'status': 'insufficient', 'message': INSUFFICIENT, 'sources': [],
                'corpus_version': version, 'mode': mode}
    selected = validate_selection(selector(question, candidates), candidates)
    return {'status': 'answered' if selected else 'insufficient',
            'message': 'Soruna karşılık seçilen kaynak metinleri:' if selected else INSUFFICIENT,
            'sources': selected, 'corpus_version': version, 'mode': mode}
