"""Yerel/personal deneme sunucusu. GitHub Pages tek başına bu API'yi çalıştıramaz."""
import argparse
from collections import deque
from functools import partial
import hmac
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import threading
import time
from urllib.parse import urlsplit, unquote

from .gemini import GeminiError
from .index import DEFAULT_DB, ROOT
from .retrieval import Library
from .service import answer


class Budget:
    """Tek süreçte global sınır; birden fazla kopyada ortak sayaç gereklidir."""
    def __init__(self, minute=6, day=60):
        self.minute, self.day = minute, day
        self.events = deque()
        self.lock = threading.Lock()

    def take(self):
        now = time.monotonic()
        with self.lock:
            while self.events and self.events[0] <= now - 86400:
                self.events.popleft()
            if len(self.events) >= self.day or sum(t > now - 60 for t in self.events) >= self.minute:
                return False
            self.events.append(now)
            return True


class Handler(SimpleHTTPRequestHandler):
    def setup(self):
        super().setup()
        self.connection.settimeout(45)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *_):
        pass  # Sorular, erişim kodları ve istek gövdeleri kaydedilmez.

    def origin_allowed(self):
        origin = self.headers.get('Origin')
        return origin is None or origin in self.server.origins

    def end_headers(self):
        origin = self.headers.get('Origin')
        if origin in self.server.origins:
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Vary', 'Origin')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        if self.path.startswith('/api/'):
            self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def respond(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        if not self.origin_allowed():
            self.respond(403, {'error': 'Bu adresten erişime izin verilmedi.'})
            return
        self.send_response(204)
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Content-Length', '0')
        self.end_headers()

    def public_static(self):
        # Kaynak kod, .git, .env, SQLite ve yedekler HTTP üzerinden sunulmaz.
        route = unquote(urlsplit(self.path).path)
        parts = Path(route).parts
        if '..' in parts or any(p.startswith('.') for p in parts):
            return False
        target = (ROOT / route.lstrip('/')).resolve()
        if not target.is_relative_to(ROOT) or target.is_symlink():
            return False
        if route in ('/', '/index.html'):
            return True
        if len(parts) == 2:
            return target.suffix in {'.js', '.css', '.json', '.svg', '.png', '.webmanifest'} and target.is_file()
        return (len(parts) > 2 and parts[1] in self.server.library.config['libraries'] + ['fonts']
                and target.suffix in {'.json', '.woff2'} and target.is_file())

    def do_HEAD(self):
        if self.path.startswith('/api/') or not self.public_static():
            self.send_error(404)
            return
        super().do_HEAD()

    def do_GET(self):
        if urlsplit(self.path).path == '/api/ai/health':
            self.respond(200, {'corpus': self.server.library.metadata(),
                               'gemini_ready': bool(os.environ.get('GEMINI_API_KEY') and os.environ.get('GEMINI_MODEL'))})
            return
        if not self.public_static():
            self.send_error(404)
            return
        super().do_GET()

    def do_POST(self):
        if urlsplit(self.path).path != '/api/ai/ask':
            self.respond(404, {'error': 'Bulunamadı.'})
            return
        if not self.origin_allowed():
            self.respond(403, {'error': 'Bu adresten erişime izin verilmedi.'})
            return
        # Kodsuz localhost kullanımı da başka sitelerin POST isteklerine kapalıdır.
        if not self.server.token and self.headers.get('Host') not in self.server.local_hosts:
            self.respond(403, {'error': 'Yerel erişim gerekli.'})
            return
        expected = 'Bearer ' + self.server.token
        if self.server.token and not hmac.compare_digest(
                self.headers.get('Authorization', '').encode(), expected.encode()):
            self.respond(401, {'error': 'Deneme için erişim kodunu gir.'})
            return
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if self.headers.get('Transfer-Encoding') or not 0 < length <= 8192:
                self.respond(413, {'error': 'İstek çok büyük veya boş.'})
                return
            if self.headers.get_content_type() != 'application/json':
                self.respond(415, {'error': 'JSON bekleniyor.'})
                return
            data = json.loads(self.rfile.read(length))
            if not isinstance(data, dict):
                raise ValueError()
            question, scope, mode = data.get('question'), data.get('library', ''), data.get('mode', 'gemini')
            if (not isinstance(question, str) or not 3 <= len(question.strip()) <= 800
                    or not isinstance(scope, str) or mode not in ('search', 'gemini')):
                raise ValueError()
            if scope and scope not in self.server.library.config['libraries']:
                raise ValueError()
        except (ValueError, TypeError, UnicodeError):
            self.respond(400, {'error': '3–800 karakterlik bir soru ve geçerli kitaplık seç.'})
            return
        if not self.server.budget.take():
            self.respond(429, {'error': 'Deneme kullanım sınırına ulaştın. Daha sonra tekrar dene.'})
            return
        if not self.server.slots.acquire(blocking=False):
            self.respond(429, {'error': 'Deneme şu an meşgul. Biraz sonra tekrar dene.'})
            return
        try:
            if mode == 'gemini' and not (os.environ.get('GEMINI_API_KEY') and os.environ.get('GEMINI_MODEL')):
                self.respond(503, {'error': 'Gemini henüz etkin değil. “Kaynak ara” ile denemeye devam edebilirsin.'})
                return
            result = answer(self.server.library, question.strip(), scope, mode, self.server.selector)
            self.respond(200, result)
        except GeminiError:
            self.respond(502, {'error': 'Gemini cevabı doğrulanamadı veya servise ulaşılamadı. “Kaynak ara” ile devam edebilirsin.'})
        except Exception:
            self.respond(500, {'error': 'Kaynak araması tamamlanamadı.'})
        finally:
            self.server.slots.release()


def make_server(host='127.0.0.1', port=8787, db=DEFAULT_DB, *, token=None, origins=None, selector=None):
    from .gemini import select_sources
    token = os.environ.get('AI_ACCESS_TOKEN', '') if token is None else token
    if host not in ('127.0.0.1', 'localhost', '::1') and len(token) < 24:
        raise ValueError('Dış erişim için en az 24 karakterlik AI_ACCESS_TOKEN gerekli')
    library = Library(db)
    library.metadata()  # Eksik indeksle dinlemeye başlama.
    server = ThreadingHTTPServer((host, port), Handler)
    server.library, server.token = library, token
    actual_port = server.server_address[1]
    server.origins = set(origins or filter(None, os.environ.get('AI_ALLOWED_ORIGINS', '').split(',')))
    server.origins.update({f'http://127.0.0.1:{actual_port}', f'http://localhost:{actual_port}'})
    server.local_hosts = {f'127.0.0.1:{actual_port}', f'localhost:{actual_port}'}
    server.budget = Budget(day=int(os.environ.get('AI_DAILY_LIMIT', '60')))
    server.slots = threading.BoundedSemaphore(2)
    server.selector = selector or select_sources
    return server


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--host', default='127.0.0.1')
    parser.add_argument('--port', type=int, default=8787)
    parser.add_argument('--db', type=Path, default=DEFAULT_DB)
    args = parser.parse_args()
    server = make_server(args.host, args.port, args.db)
    print(f'Sekîne denemesi: http://{args.host}:{server.server_address[1]}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
