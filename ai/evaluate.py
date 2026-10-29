"""Örnek soruları arama ve isteğe bağlı gerçek Gemini çağrılarıyla değerlendirir."""
import argparse
import json
import os
from pathlib import Path
from .gemini import GeminiError
from .index import DEFAULT_DB, ROOT
from .retrieval import Library
from .service import answer


def evaluate(library, examples, live=False):
    rows = []
    for example in examples:
        candidates = library.search(example['question'], example.get('library', ''))
        expected = set(example['expected_ids'])
        found = {r['id'] for r in candidates}
        row = {'id': example.get('id', ''), 'question': example['question'],
               'reviewed': example['reviewed'], 'retrieved_ids': list(r['id'] for r in candidates),
               'retrieval_hit_at_8': bool(expected & found) if expected else None}
        if live:
            try:
                response = answer(library, example['question'], example.get('library', ''))
                chosen = {r['id'] for r in response['sources']}
                row['selected_ids'] = sorted(chosen)
                row['answer_ok'] = (response['status'] == 'insufficient') if example['should_abstain'] else (
                    response['status'] == 'answered' and bool(chosen & expected) and chosen <= expected)
            except GeminiError:
                row['answer_ok'] = False
                row['error'] = 'Gemini çağrısı veya kaynak doğrulaması başarısız'
        rows.append(row)
    positives = [r for r in rows if r['retrieval_hit_at_8'] is not None]
    return {'corpus': library.metadata(), 'live_gemini': live,
            'model': os.environ.get('GEMINI_MODEL') if live else None,
            'examples': len(rows), 'reviewed_examples': sum(r['reviewed'] for r in rows),
            'retrieval_hit_at_8': sum(r['retrieval_hit_at_8'] for r in positives) / len(positives) if positives else None,
            'answer_pass_rate': sum(r['answer_ok'] for r in rows) / len(rows) if live and rows else None,
            'results': rows}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--db', type=Path, default=DEFAULT_DB)
    parser.add_argument('--examples', type=Path, default=ROOT / 'ai/examples.jsonl')
    parser.add_argument('--include-drafts', action='store_true', help='Onaysız taslakları da dene')
    parser.add_argument('--gemini', action='store_true', help='Gerçek API çağrıları yapar; kota kullanır')
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    examples = [json.loads(line) for line in args.examples.read_text().splitlines() if line.strip()]
    examples = [e for e in examples if e.get('reviewed') is True or args.include_drafts]
    if not examples:
        parser.exit(2, 'Henüz onaylı örnek yok. Örnekleri incele veya taslak denemesi için --include-drafts kullan.\n')
    if args.gemini and not (os.environ.get('GEMINI_API_KEY') and os.environ.get('GEMINI_MODEL')):
        parser.exit(2, 'Gerçek değerlendirme için sunucuda GEMINI_API_KEY ve GEMINI_MODEL gerekli.\n')
    result = evaluate(Library(args.db), examples, args.gemini)
    rendered = json.dumps(result, ensure_ascii=False, indent=2) + '\n'
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(rendered)
    print(rendered)
    if any(row.get('answer_ok') is False or row.get('retrieval_hit_at_8') is False for row in result['results']):
        raise SystemExit(1)
