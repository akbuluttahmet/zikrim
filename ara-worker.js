'use strict';
/* Bütün kütüphanede arama (Arama sayfası). Ana iş parçacığını yormamak için ayrı çalışır.
   Veriler: ara.json (Türkçe metin + sened) ve ara-ar.json (harekesiz Arapça); ikisi de araclar/ara.py ile üretilir.
   Arapça dosyası yalnız ilk Arapça aramada indirilir.
   Türkçe eşleşme harf toleranslıdır: büyük/küçük harf, â/î/û, ş/ç/ğ/ö/ü/ı ve ‘ ’ ' işaretleri fark etmez.
   Birden çok kelime: hepsi (sırası fark etmeden) geçmeli; tırnak içi (“…” ya da "…") tam ifade olarak aranır. */
let D = null, TR = null, SN = null, AR = null, arWait = null;
const FOLD = {'â': 'a', 'ä': 'a', 'á': 'a', 'à': 'a', 'î': 'i', 'ı': 'i', 'í': 'i', 'û': 'u', 'ü': 'u', 'ú': 'u', 'ş': 's', 'ç': 'c', 'ğ': 'g', 'ö': 'o', 'ô': 'o', 'ê': 'e', 'é': 'e', 'ḥ': 'h', 'ṣ': 's', 'ṭ': 't', 'ẓ': 'z', 'ḍ': 'd'};
const DROP = new Set(['‘', '’', "'", 'ʿ', 'ʾ', '`', '´']);
// Hızlı katlama (bütün metinler için, yükleme sırasında)
const FOLD_RE = new RegExp('[' + Object.keys(FOLD).join('') + ']', 'g'), DROP_RE = /[‘’'ʿʾ`´]/g;
const foldFast = s => s.replace(DROP_RE, '').replace(/[İI]/g, 'i').toLowerCase().replace(FOLD_RE, c => FOLD[c]).replace(/i̇/g, 'i');
// Harf harf katlama; harita, katlanmış her harfin asıl metindeki yerini tutar (vurgulama için). foldFast ile aynı sonucu verir.
function foldTr(s, withMap) {
  if (!withMap) return foldFast(s);
  let out = '', map = withMap ? [] : null;
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (DROP.has(c)) continue;
    c = c === 'İ' || c === 'I' ? 'i' : c.toLocaleLowerCase('tr-TR');
    c = FOLD[c] || c;
    if (c.length !== 1) c = c.normalize('NFD').replace(/[̀-ͯ]/g, '') || c;
    out += c; if (map) for (let k = 0; k < c.length; k++) map.push(i);
  }
  return withMap ? [out, map] : out;
}
const foldAr = a => a.replace(/[ً-ٰٟـ]/g, '').replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/[^ء-ي0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const isAr = q => /[؀-ۿ]/.test(q);
const esc = s => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

async function load() {
  if (D) return;
  const r = await fetch('ara.json'); if (!r.ok) throw new Error('ara.json ' + r.status);
  D = await r.json();
  TR = D.h.map(h => foldTr(h[3]));
  SN = D.h.map(h => foldTr(h[4]));
}
async function loadAr() {
  if (AR) return;
  if (!arWait) arWait = fetch('ara-ar.json').then(r => { if (!r.ok) throw new Error('ara-ar.json ' + r.status); return r.json(); }).then(a => { AR = a; });
  await arWait;
}
// Sorgu → terimler: tırnak içleri tam ifade, kalanlar tek tek kelime
function terms(q, ar) {
  const out = [], f = ar ? foldAr : foldTr;
  q = q.replace(/[“”«»"]([^“”«»"]+)[“”«»"]/g, (m, p) => { const t = f(p).trim(); if (t) out.push(t); return ' '; });
  for (const w of q.split(/\s+/)) { const t = f(w).trim(); if (t.length >= (ar ? 2 : 2)) out.push(t); }
  return [...new Set(out)];
}
// Asıl metinde vurgulu kesit: ilk eşleşmenin çevresinden ~170 harf
function snippet(orig, ts, ar) {
  let folded, map;
  if (ar) { folded = orig; map = null; } else [folded, map] = foldTr(orig, true);
  const hits = [];
  for (const t of ts) { let i = folded.indexOf(t); while (i >= 0 && hits.length < 40) { if (ar || i === 0 || !LET.test(folded[i - 1])) hits.push([i, i + t.length]); i = folded.indexOf(t, i + t.length); } }
  hits.sort((a, b) => a[0] - b[0]);
  const toO = i => map ? (i < map.length ? map[i] : orig.length) : i;
  const first = hits.length ? toO(hits[0][0]) : 0;
  let s = Math.max(0, first - 60), e = Math.min(orig.length, s + 170);
  if (s > 0) { const sp = orig.indexOf(' ', s); if (sp > 0 && sp < first) s = sp + 1; }
  if (e < orig.length) { const sp = orig.lastIndexOf(' ', e); if (sp > first) e = sp; }
  let html = '', at = s;
  for (const [a, b] of hits) {
    const oa = toO(a), ob = b - 1 < (map ? map.length : orig.length) ? toO(b - 1) + 1 : orig.length;
    if (ob <= at || oa >= e) continue;
    html += esc(orig.slice(at, Math.max(at, oa))) + '<mark>' + esc(orig.slice(Math.max(at, oa), Math.min(ob, e))) + '</mark>';
    at = Math.min(ob, e);
  }
  html += esc(orig.slice(at, e));
  return (s > 0 ? '… ' : '') + html.replace(/\n/g, ' ') + (e < orig.length ? ' …' : '');
}

const MAX = 3000;
// Türkçede kelime başı eşleşmesi: “ali” “Ali’den”i bulur, “halife”yi bulmaz (ekler serbest). Arapçada (ön ekler yüzünden) metnin içinde aranır.
const LET = /[a-z0-9\u00C0-\u024F]/;
function hasWord(s, t) {
  let i = s.indexOf(t);
  while (i >= 0) { if (i === 0 || !LET.test(s[i - 1])) return true; i = s.indexOf(t, i + 1); }
  return false;
}
async function search({q, scope, lib}) {
  await load();
  const ar = isAr(q);
  if (ar) await loadAr();
  const ts = terms(q, ar);
  if (!ts.length) return {q, ar, total: 0, groups: [], libs: []};
  const libCount = {}, groups = new Map();
  let total = 0;
  for (let i = 0; i < D.h.length; i++) {
    let field;
    if (ar) { const a = AR[i]; if (!a || !ts.every(t => a.includes(t))) continue; field = 'a'; }
    else {
      const inT = scope !== 'sened' && ts.every(t => hasWord(TR[i], t));
      const inS = !inT && scope !== 'metin' && ts.every(t => hasWord(SN[i], t));
      if (!inT && !inS) continue;
      field = inT ? 'm' : 's';
    }
    const h = D.h[i], lv = D.libs[h[0]][0];
    libCount[lv] = (libCount[lv] || 0) + 1;
    total++;
    if (lib && lib !== lv) continue;
    const key = h[0] + ':' + h[1];
    if (!groups.has(key)) groups.set(key, {v: lv, b: h[1], book: D.libs[h[0]][1][h[1]] || '', items: []});
    const g = groups.get(key);
    if (g.items.length < MAX) g.items.push(i);
  }
  return {q, ar, ts, total, libs: Object.entries(libCount), groups: [...groups.values()].map(g => ({...g, count: g.items.length, items: g.items}))};
}
// Bir grubun maddeleri için kesitler (sayfa açtıkça istenir)
async function rows({ids, ts, ar}) {
  if (ar) await loadAr();
  return ids.map(i => {
    const h = D.h[i];
    let field = 'm', html;
    if (ar) { field = 'a'; html = snippet(AR[i], ts, true); }
    else if (ts.every(t => hasWord(TR[i], t))) html = snippet(h[3], ts, false);
    else { field = 's'; html = snippet(h[4], ts, false); }
    return {i, n: h[2], field, html};
  });
}

/* AI için bağımsız, salt okunur kaynak seçimi. D.h metinleri mevcut
   kütüphane arama indeksinden gelir; ağdan yeni bir dinî kaynak eklenmez. */
const AI_STOP = new Set(['ve','veya','ile','için','nasıl','nedir','ne','niçin','neden','hangi','göre','hakkında','bir','bu','şu','olan','olarak','mı','mi','mu','mü','da','de','ki','ile','bana','bunun','olur','olmalı','hükmü','hüküm','var','kaç','kim','den','dan','ise','anlat','açıkla','açıklaması','kaynak','hadis','hadisi']);
async function aiSources({q}) {
  await load();
  const words = [...new Set(foldTr(String(q || '')).replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length >= 3 && !AI_STOP.has(w)))].slice(0, 12);
  if (!words.length) return [];
  const candidates = [];
  for (let i = 0; i < D.h.length; i++) {
    const tr = TR[i] || '';
    if (!tr) continue;
    let hits = 0, first = -1, score = 0;
    for (const w of words) {
      const at = tr.indexOf(w);
      if (at !== -1) {
        hits++; score += 3 + (at < 160 ? 1 : 0);
        if (first === -1 || at < first) first = at;
      }
    }
    if (!hits) continue;
    score += hits * hits * 2;
    if (hits === words.length) score += 5;
    if (candidates.length < 32 || score > candidates[candidates.length - 1].score) {
      candidates.push({i, score, hits, first});
      candidates.sort((a,b) => b.score - a.score || a.i - b.i);
      if (candidates.length > 32) candidates.pop();
    }
  }
  const minHits = words.length >= 3 ? 2 : 1;
  let picked = candidates.filter(c => c.hits >= minHits).slice(0, 7);
  // İki anahtar kelimeyi aynı kaynakta bulamıyorsak yalnız tek kelimelik
  // zayıf eşleşmelerle uydurma cevap ürettirmeyiz.
  if (!picked.length && words.length === 1) picked = candidates.slice(0, 5);
  return picked.map(c => {
    const h = D.h[c.i], lib = D.libs[h[0]];
    const text = String(h[3] || '');
    const start = Math.max(0, c.first - 220), end = Math.min(text.length, start + 1400);
    return {id: String(c.i), v: lib[0], b: h[1], n: h[2],
      label: lib[0] === 'usul' ? 'Usûlü’s-Sünne' : lib[0],
      book: lib[1][h[1]] || '', excerpt: (start ? '… ' : '') + text.slice(start, end) + (end < text.length ? ' …' : '')};
  });
}

self.onmessage = async e => {
  const {id, type} = e.data;
  try {
    const res = type === 'q' ? await search(e.data) : type === 'rows' ? await rows(e.data) : type === 'ai' ? await aiSources(e.data) : (await load(), true);
    self.postMessage({id, ok: true, res});
  } catch (err) { self.postMessage({id, ok: false, err: String(err && err.message || err)}); }
};
