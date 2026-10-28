# Bütün kütüphanede arama için iki dosya üretir (Arama sayfası, ara-worker.js):
#   ara.json     — Türkçe metin ve sened: {"libs": [[kitaplık, [kitap adları]], …], "h": [[kitaplık sırası, kitap sırası, no, metin, sened], …]}
#   ara-ar.json  — Arapça metin (harekesiz; أ/إ/آ → ا, ى → ي, ة → ه, ؤ → و, ئ → ي), ara.json'daki maddelerle aynı sırada: [metin, …]
# Arapça dosyası yalnız Arapça arama yapılınca iner. Yeni kitap/bölüm çevrilince çalıştır (yayinla.sh kendiliğinden çalıştırır):
#   python3 araclar/ara.py
import json, os, re, subprocess
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..') + '/'
LIBS = ['musned', 'musannef', 'ibnebiseybe', 'ahmed', 'zuhd', 'fezail', 'usul', 'berbehari', 'seria', 'acurri', 'hallal', 'safii', 'buhari', 'ebudavud', 'harb', 'ibane', 'sunan']

def ar_norm(a):
    a = re.sub(r'[ً-ٰٟـ]', '', a or '')
    a = re.sub('[أإآٱ]', 'ا', a).replace('ى', 'ي').replace('ة', 'ه').replace('ؤ', 'و').replace('ئ', 'ي')
    a = re.sub(r'[^ء-ي0-9 ]', ' ', a)
    return re.sub(r'\s+', ' ', a).strip()

libs, H, AR = [], [], []
for li, v in enumerate(LIBS):
    if v == 'usul':
        u = json.loads(subprocess.check_output(['node', '-e', "const s=require('fs').readFileSync(process.argv[1],'utf8');eval(s.replace(/const /g,'var '));console.log(JSON.stringify({t:USUL,a:USUL_AR}))", R + 'usul.js']))
        libs.append([v, ['Usûlü’s-Sünne']])
        for n, baslik, t in u['t']:
            H.append([li, 0, n, t, '']); AR.append(ar_norm(u['a'].get(str(n), '')))
        continue
    idx = json.load(open(R + v + '/index.json', encoding='utf8'))
    libs.append([v, [m.get('tr', '') for m in idx]])
    for bi, m in enumerate(idx):
        if not m.get('t') or 'f' not in m: continue
        p = R + v + '/tr/' + m['f']
        if not os.path.exists(p): continue
        for b in json.load(open(p, encoding='utf8'))['babs']:
            for h in b['h']:
                if not isinstance(h[2], str) or not h[2].strip(): continue
                H.append([li, bi, h[0], h[2], h[1] or '']); AR.append(ar_norm(h[5] if len(h) > 5 else ''))
json.dump({'libs': libs, 'h': H}, open(R + 'ara.json', 'w', encoding='utf8'), ensure_ascii=False, separators=(',', ':'))
json.dump(AR, open(R + 'ara-ar.json', 'w', encoding='utf8'), ensure_ascii=False, separators=(',', ':'))
print(f'ara.json: {len(H)} madde, {os.path.getsize(R + "ara.json") // 1024} KB; ara-ar.json: {os.path.getsize(R + "ara-ar.json") // 1024} KB')
