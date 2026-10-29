// Yalnız veri tanımlarını okur; uygulama, DOM ve localStorage çalıştırılmaz.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.argv[2];
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const start = script.indexOf('const LIBS = {');
const end = script.indexOf('for (const [k, L] of Object.entries(LIBS))', start);
if (start < 0 || end < 0) throw new Error('LIBS veri tanımı bulunamadı');
const definitions = vm.runInNewContext(script.slice(start, end) + '; LIBS;', {}, {timeout: 3000});
const usul = vm.runInNewContext(fs.readFileSync(path.join(root, 'usul.js'), 'utf8') +
  '; ({items: USUL, ar: USUL_AR, note: USUL_NOTE, sened: USUL_SENED});', {}, {timeout: 3000});
const metadata = {};
for (const [v, L] of Object.entries(definitions)) {
  const idx = JSON.parse(fs.readFileSync(path.join(root, v, 'index.json'), 'utf8'));
  metadata[v] = {note: L.note, books: {}};
  for (const meta of idx) {
    if (!meta.t) continue;
    const data = JSON.parse(fs.readFileSync(path.join(root, v, 'tr', meta.f), 'utf8'));
    const labels = {};
    for (const bb of data.babs) for (const h of bb.h) {
      const n = h[0];
      labels[String(n)] = {
        source: L.src(n, meta) + (!L.bookKey && !L.single ? ' · ' + meta.tr : ''),
        label: L.label ? L.label(n, h) : 'No. ' + n
      };
    }
    metadata[v].books[meta.f] = labels;
  }
}
console.log(JSON.stringify({metadata, usul}));
