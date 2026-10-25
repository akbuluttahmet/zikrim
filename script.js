'use strict';

/* ---------- Varsayılan zikirler ---------- */
const DEFAULTS = [
  {id:'istighfar',name:'Estağfirullah el-Azîm',category:'Tevbe ve istiğfar',arabic:'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',translit:'Estağfirullâhe’l-Azîm',meaning:'Yüce Allah’tan bağışlanma dilerim.',target:100},
  {id:'yunus',name:'Hz. Yûnus’un Duası',category:'Tevbe ve dua',arabic:'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',translit:'Lâ ilâhe illâ ente subhâneke innî küntü mine’z-zâlimîn.',meaning:'Senden başka ilah yoktur. Seni tenzih ederim. Gerçekten ben zalimlerden oldum.',target:33},
  {id:'tasbih',name:'Tesbih, Hamd ve Tekbir',category:'Allah’ı anmak',arabic:'سُبْحَانَ اللَّهِ · الْحَمْدُ لِلَّهِ · اللَّهُ أَكْبَرُ',translit:'Sübhânallah · Elhamdülillâh · Allâhu ekber',meaning:'Allah’ı noksanlıklardan tenzih ederim · Hamd Allah’adır · Allah en büyüktür.',target:99},
  {id:'salavat',name:'Salavat',category:'Peygamberimize salavat',arabic:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',translit:'Allâhümme salli alâ Muhammed.',meaning:'Allah’ım, Muhammed’e salât eyle.',target:100},
  {id:'hayy',name:'Yâ Hayy, Yâ Kayyûm',category:'Rahmet ve yardım duası',arabic:'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ',translit:'Yâ Hayyu yâ Kayyûm, bi-rahmetike esteğîs.',meaning:'Ey Hayy ve Kayyûm olan Allah, rahmetinle yardım diliyorum.',target:33},
  {id:'musa',name:'Hz. Mûsâ’nın Duası',category:'Kasas 28:24',arabic:'رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',translit:'Rabbi innî limâ enzelte ileyye min hayrin fakîr.',meaning:'Rabbim, bana indireceğin her hayra muhtacım.',target:33},
  {id:'tawhid',name:'Tevhid',category:'Allah’ın birliği',arabic:'لَا إِلَٰهَ إِلَّا اللَّهُ',translit:'Lâ ilâhe illallah.',meaning:'Allah’tan başka hak ilah yoktur.',target:100}
];

const KEY = 'zikrim-v2';
const OLD_KEY = 'zikrim-v1';
const THEMES = {night:'#0d1526', nature:'#f3f6ef', classic:'#faf4ea'};
const KEEP_DAYS = 400;

const $ = s => document.querySelector(s);
const pad = n => String(n).padStart(2, '0');
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const fmt = n => n.toLocaleString('tr-TR');
const clampTarget = v => Math.min(100000, Math.max(1, Math.floor(Number(v)) || 33));

/* ---------- Durum ve kayıt ---------- */
function sanitize(s) {
  const out = {v: 2, theme: THEMES[s && s.theme] ? s.theme : 'night', haptics: !s || s.haptics !== false, compact: !!(s && s.compact), zikirs: [], days: {}};
  const seen = new Set();
  for (const z of (s && Array.isArray(s.zikirs) ? s.zikirs : [])) {
    if (!z || typeof z.id !== 'string' || !z.id || seen.has(z.id)) continue;
    seen.add(z.id);
    out.zikirs.push({
      id: z.id, name: String(z.name || 'Zikir').slice(0, 80), category: String(z.category || '').slice(0, 80),
      arabic: String(z.arabic || ''), translit: String(z.translit || ''), meaning: String(z.meaning || ''),
      target: clampTarget(z.target), custom: !!z.custom
    });
  }
  const oldest = dayKey(addDays(new Date(), -KEEP_DAYS));
  if (s && s.days && typeof s.days === 'object') {
    for (const [d, c] of Object.entries(s.days)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || d < oldest || !c || typeof c !== 'object') continue;
      const t = {};
      for (const [k, v] of Object.entries(c)) { const n = Math.max(0, Math.floor(Number(v)) || 0); if (n) t[k] = n; }
      if (Object.keys(t).length) out.days[d] = t;
    }
  }
  return out;
}

function load() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(KEY)); } catch {}
  if (s && typeof s === 'object') return sanitize(s);
  // İlk açılış: eski sürümün (v1) verisini taşı
  s = {theme: 'night', zikirs: DEFAULTS, days: {}};
  try {
    const old = JSON.parse(localStorage.getItem(OLD_KEY));
    if (old && typeof old === 'object') {
      if (old.theme) s.theme = old.theme;
      if (old.counts) s.days[dayKey()] = old.counts;
    }
  } catch {}
  const out = sanitize(s);
  persistState(out);
  return out;
}

function persistState(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { setTimeout(() => toast('Kayıt yapılamadı (depolama dolu olabilir)'), 0); }
}

let S = load();
let today = dayKey();
const save = () => persistState(S);

const getCount = (id, d = today) => (S.days[d] && S.days[d][id]) || 0;
function setCount(id, n, d = today) {
  n = Math.max(0, Math.floor(n));
  if (!S.days[d]) S.days[d] = {};
  if (n) S.days[d][id] = n; else delete S.days[d][id];
  if (!Object.keys(S.days[d]).length) delete S.days[d];
}
const dayTotal = d => Object.values(S.days[d] || {}).reduce((a, b) => a + b, 0);
const findZ = id => S.zikirs.find(z => z.id === id);

function streak() {
  let d = new Date();
  if (!dayTotal(dayKey(d))) d = addDays(d, -1); // bugün henüz başlamadıysa seri dünden devam eder
  let n = 0;
  while (dayTotal(dayKey(d)) > 0) { n++; d = addDays(d, -1); }
  return n;
}

/* ---------- Titreşim (iOS 18+ için switch hilesi) ---------- */
const hapticEl = $('#haptic');
function haptic(strong) {
  if (!S.haptics) return;
  if (navigator.vibrate) { navigator.vibrate(strong ? [25, 60, 25] : 8); return; }
  try { hapticEl.click(); } catch {}
}

/* ---------- Bildirim (toast) ---------- */
const toastEl = $('#toast');
function toast(message, action) {
  toastEl.replaceChildren();
  const span = document.createElement('span');
  span.textContent = message;
  toastEl.append(span);
  if (action) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = action.label;
    b.addEventListener('click', () => { action.run(); toastEl.classList.remove('show'); });
    toastEl.append(b);
  }
  toastEl.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => toastEl.classList.remove('show'), action ? 5000 : 1900);
}

/* ---------- Kartlar ---------- */
const cardsEl = $('#cards');

let sorting = false;

function renderSortRows() {
  S.zikirs.forEach((z, i) => {
    const row = document.createElement('article');
    row.className = 'zikir sort-row';
    row.dataset.id = z.id;
    row.innerHTML = `
      <span class="handle" aria-hidden="true">≡</span>
      <div class="zikir-title"><h3></h3><p class="category"></p></div>
      <button class="arrow" type="button" data-act="up" aria-label="Yukarı taşı">↑</button>
      <button class="arrow" type="button" data-act="down" aria-label="Aşağı taşı">↓</button>`;
    row.querySelector('h3').textContent = z.name;
    const cat = row.querySelector('.category');
    cat.textContent = `${fmt(getCount(z.id))} / ${fmt(z.target)}${z.category ? ' · ' + z.category : ''}`;
    row.querySelector('[data-act=up]').disabled = i === 0;
    row.querySelector('[data-act=down]').disabled = i === S.zikirs.length - 1;
    cardsEl.append(row);
  });
}

function renderCards() {
  cardsEl.replaceChildren();
  document.body.classList.toggle('sorting', sorting);
  document.body.classList.toggle('compact', S.compact);
  $('#toggleSort').textContent = sorting ? '✓ Bitti' : '⇅ Sırala';
  $('#toggleSort').classList.toggle('active', sorting);
  $('#toggleCompact').classList.toggle('active', S.compact);
  $('#toggleCompact').setAttribute('aria-pressed', String(S.compact));
  $('#sortHint').hidden = !sorting;
  $('#empty').hidden = S.zikirs.length > 0;
  if (sorting) { renderSortRows(); update(); return; }
  for (const z of S.zikirs) {
    const box = document.createElement('article');
    box.className = 'zikir';
    box.dataset.id = z.id;
    box.innerHTML = `
      <div class="zikir-top">
        <div class="zikir-title"><h3></h3><p class="category"></p></div>
        <span class="count-pill"></span>
        <button class="more" type="button" data-act="edit" aria-label="Düzenle">⋯</button>
      </div>
      <p class="arabic" lang="ar" dir="rtl"></p>
      <p class="translit"></p>
      <p class="meaning"></p>
      <div class="bar"><span></span></div>
      <div class="actions">
        <button class="minus" type="button" data-act="minus" aria-label="Bir geri al">−</button>
        <button class="tap" type="button" data-act="plus">+1 Zikir</button>
        <button class="focus-btn" type="button" data-act="focus" aria-label="Odak modunda say" title="Odak modu">⤢</button>
      </div>`;
    box.querySelector('h3').textContent = z.name;
    for (const f of ['category', 'arabic', 'translit', 'meaning']) {
      const el = box.querySelector('.' + f);
      el.textContent = z[f];
      el.hidden = !z[f];
    }
    cardsEl.append(box);
  }
  update();
}

function update() {
  let done = 0;
  for (const z of S.zikirs) {
    const c = getCount(z.id);
    const ok = c >= z.target;
    if (ok) done++;
    const box = cardsEl.querySelector(`[data-id="${CSS.escape(z.id)}"]`);
    if (!box || box.classList.contains('sort-row')) continue;
    box.classList.toggle('done', ok);
    box.querySelector('.count-pill').textContent = `${ok ? '✓ ' : ''}${fmt(c)} / ${fmt(z.target)}`;
    box.querySelector('.bar span').style.width = Math.min(100, c / z.target * 100) + '%';
    box.querySelector('.minus').disabled = c === 0;
  }
  $('#grand').textContent = fmt(dayTotal(today));
  $('#progress').textContent = `${done} / ${S.zikirs.length} tamamlandı`;
  const st = streak();
  $('#streak').textContent = st ? `🔥 ${st} günlük seri` : '🌱 Seri yok';
  $('#today').textContent = new Date().toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', weekday: 'long'}).toLocaleUpperCase('tr-TR');
  renderWeek();
  if (!focusEl.hidden) renderFocus();
}

function renderWeek() {
  const week = $('#week');
  const days = [];
  for (let i = 6; i >= 0; i--) { const d = addDays(new Date(), -i); days.push({d, k: dayKey(d), t: dayTotal(dayKey(d))}); }
  const max = Math.max(1, ...days.map(x => x.t));
  week.replaceChildren(...days.map(x => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'day' + (x.k === today ? ' is-today' : '');
    b.dataset.k = x.k;
    b.setAttribute('aria-label', `${x.d.toLocaleDateString('tr-TR', {day: 'numeric', month: 'long'})}: ${x.t} zikir`);
    b.innerHTML = '<span class="col"><span class="fill"></span></span><span class="lbl"></span>';
    b.querySelector('.fill').style.height = (x.t ? Math.max(8, x.t / max * 100) : 0) + '%';
    b.querySelector('.lbl').textContent = x.d.toLocaleDateString('tr-TR', {weekday: 'short'}).slice(0, 2);
    return b;
  }));
}
$('#week').addEventListener('click', e => {
  const b = e.target.closest('.day');
  if (b) toast(`${fromKey(b.dataset.k).toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', weekday: 'long'})}: ${fmt(dayTotal(b.dataset.k))} zikir`);
});

function increment(id, delta) {
  const z = findZ(id);
  if (!z) return;
  const before = getCount(id);
  const after = Math.max(0, before + delta);
  if (after === before) return;
  setCount(id, after);
  save();
  update();
  if (delta > 0) {
    const reached = before < z.target && after >= z.target;
    haptic(reached);
    if (reached) {
      const allDone = S.zikirs.every(x => getCount(x.id) >= x.target);
      toast(allDone ? 'Bugünkü tüm hedefler tamamlandı 🌙' : `“${z.name}” tamamlandı ✨`);
    }
  }
}

cardsEl.addEventListener('click', e => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const id = btn.closest('.zikir').dataset.id;
  const act = btn.dataset.act;
  if (act === 'plus') increment(id, 1);
  else if (act === 'minus') increment(id, -1);
  else if (act === 'focus') openFocus(id);
  else if (act === 'edit') openEditor(id);
  else if (act === 'up' || act === 'down') moveById(id, act === 'up' ? -1 : 1);
});

/* ---------- Sıralama ---------- */
function moveById(id, dir) {
  const i = S.zikirs.findIndex(z => z.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= S.zikirs.length) return;
  [S.zikirs[i], S.zikirs[j]] = [S.zikirs[j], S.zikirs[i]];
  save();
  renderCards();
  const row = cardsEl.querySelector(`[data-id="${CSS.escape(id)}"]`);
  if (row) { row.classList.add('moved'); row.scrollIntoView({block: 'nearest'}); }
  haptic(false);
}

$('#toggleSort').addEventListener('click', () => { sorting = !sorting; renderCards(); });
$('#toggleCompact').addEventListener('click', () => { S.compact = !S.compact; save(); renderCards(); });

// Tutamaçtan sürükle-bırak (dokunmatik + fare)
let drag = null;
cardsEl.addEventListener('pointerdown', e => {
  const handle = e.target.closest('.handle');
  if (!handle || !sorting) return;
  const row = handle.closest('.sort-row');
  e.preventDefault();
  handle.setPointerCapture(e.pointerId);
  const rect = row.getBoundingClientRect();
  drag = {row, handle, id: row.dataset.id, startY: e.clientY, offset: 0, pointerId: e.pointerId, height: rect.height};
  row.classList.add('dragging');
  haptic(false);
});
window.addEventListener('pointermove', e => {
  if (!drag || e.pointerId !== drag.pointerId) return;
  e.preventDefault();
  const {row} = drag;
  // Kenara yaklaşınca sayfayı kaydır
  if (e.clientY < 90) window.scrollBy(0, -12);
  else if (e.clientY > window.innerHeight - 90) window.scrollBy(0, 12);
  // Komşularla yer değiştir
  const prev = row.previousElementSibling, next = row.nextElementSibling;
  if (prev && e.clientY < prev.getBoundingClientRect().top + prev.offsetHeight / 2) {
    cardsEl.insertBefore(prev, row.nextSibling); // satırı değil komşuyu taşı (dokunma takibi kopmasın)
    haptic(false);
  } else if (next && e.clientY > next.getBoundingClientRect().top + next.offsetHeight / 2) {
    cardsEl.insertBefore(next, row);
    haptic(false);
  }
  const r = row.getBoundingClientRect();
  const shift = e.clientY - (r.top - (parseFloat(row.style.getPropertyValue('--dy')) || 0) + r.height / 2);
  row.style.setProperty('--dy', shift + 'px');
});
function endDrag() {
  if (!drag) return;
  const ids = [...cardsEl.querySelectorAll('.sort-row')].map(r => r.dataset.id);
  const byId = new Map(S.zikirs.map(z => [z.id, z]));
  const changed = ids.join() !== S.zikirs.map(z => z.id).join();
  S.zikirs = ids.map(id => byId.get(id)).filter(Boolean);
  const id = drag.id;
  drag = null;
  if (changed) save();
  renderCards();
  const row = cardsEl.querySelector(`[data-id="${CSS.escape(id)}"]`);
  if (row && changed) row.classList.add('moved');
}
window.addEventListener('pointerup', endDrag);
window.addEventListener('pointercancel', endDrag);
cardsEl.addEventListener('touchmove', e => { if (drag) e.preventDefault(); }, {passive: false});

/* ---------- Tema ---------- */
function setTheme(t) {
  S.theme = THEMES[t] ? t : 'night';
  document.body.dataset.theme = S.theme;
  document.querySelectorAll('[data-set-theme]').forEach(b => {
    const on = b.dataset.setTheme === S.theme;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  document.querySelector('meta[name="theme-color"]').content = THEMES[S.theme];
  save();
}
document.querySelectorAll('[data-set-theme]').forEach(b => b.addEventListener('click', () => setTheme(b.dataset.setTheme)));

/* ---------- Odak modu ---------- */
const focusEl = $('#focus');
const RING = 2 * Math.PI * 96;
let focusId = null;
let wakeLock = null;

async function lockScreen() {
  try { if ('wakeLock' in navigator && !focusEl.hidden) wakeLock = await navigator.wakeLock.request('screen'); } catch {}
}
function unlockScreen() { try { wakeLock && wakeLock.release(); } catch {} wakeLock = null; }

function openFocus(id) {
  focusId = id;
  focusEl.hidden = false;
  document.body.classList.add('no-scroll');
  renderFocus();
  lockScreen();
}
function closeFocus() {
  focusEl.hidden = true;
  document.body.classList.remove('no-scroll');
  unlockScreen();
  const card = cardsEl.querySelector(`[data-id="${CSS.escape(focusId || '')}"]`);
  if (card) card.scrollIntoView({block: 'center'});
}
function renderFocus() {
  const z = findZ(focusId);
  if (!z) { closeFocus(); return; }
  const c = getCount(z.id);
  $('#fName').textContent = z.name;
  $('#fArabic').textContent = z.arabic;
  $('#fArabic').hidden = !z.arabic;
  $('#fCount').textContent = fmt(c);
  $('#fTarget').textContent = '/ ' + fmt(z.target);
  const rounds = Math.floor(c / z.target);
  $('#fDone').textContent = rounds >= 2 ? `✓ ${rounds}. tur tamam` : rounds === 1 ? '✓ Tamamlandı' : '';
  const frac = c === 0 ? 0 : (c % z.target === 0 ? 1 : (c % z.target) / z.target);
  const ring = $('#fRing');
  ring.style.strokeDasharray = RING;
  ring.style.strokeDashoffset = RING * (1 - frac);
  focusEl.classList.toggle('done', c >= z.target);
  $('#focusMinus').disabled = c === 0;
}
function stepFocus(dir) {
  const i = S.zikirs.findIndex(z => z.id === focusId);
  const n = S.zikirs.length;
  if (n) { focusId = S.zikirs[(i + dir + n) % n].id; renderFocus(); }
}
$('#focusTap').addEventListener('click', () => increment(focusId, 1));
$('#focusMinus').addEventListener('click', () => increment(focusId, -1));
$('#focusClose').addEventListener('click', closeFocus);
$('#focusPrev').addEventListener('click', () => stepFocus(-1));
$('#focusNext').addEventListener('click', () => stepFocus(1));

/* ---------- Ekle / düzenle ---------- */
const editor = $('#editor');
const form = $('#editorForm');
let editingId = null;

function openEditor(id) {
  editingId = id || null;
  const z = id ? findZ(id) : {name: '', category: '', arabic: '', translit: '', meaning: '', target: 33};
  $('#editorTitle').textContent = id ? 'Zikri düzenle' : 'Yeni zikir';
  for (const f of ['name', 'category', 'arabic', 'translit', 'meaning', 'target']) form.elements[f].value = z[f];
  editor.classList.toggle('editing', !!id);
  editor.showModal();
}
form.querySelector('.quick-targets').addEventListener('click', e => {
  const b = e.target.closest('[data-t]');
  if (b) form.elements.target.value = b.dataset.t;
});
$('#editorCancel').addEventListener('click', () => editor.close());
form.addEventListener('submit', () => {
  const data = {};
  for (const f of ['name', 'category', 'arabic', 'translit', 'meaning']) data[f] = form.elements[f].value.trim();
  data.target = clampTarget(form.elements.target.value);
  if (!data.name) return;
  if (editingId) Object.assign(findZ(editingId), data);
  else S.zikirs.push({id: 'z' + Date.now().toString(36), custom: true, ...data});
  save();
  renderCards();
  toast(editingId ? 'Kaydedildi' : 'Zikir eklendi');
});
function move(dir) {
  const i = S.zikirs.findIndex(z => z.id === editingId);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= S.zikirs.length) return;
  [S.zikirs[i], S.zikirs[j]] = [S.zikirs[j], S.zikirs[i]];
  save();
  renderCards();
}
$('#moveUp').addEventListener('click', () => move(-1));
$('#moveDown').addEventListener('click', () => move(1));
$('#resetOne').addEventListener('click', () => {
  const id = editingId, prev = getCount(id);
  editor.close();
  if (!prev) return;
  setCount(id, 0); save(); update();
  toast('Sayaç sıfırlandı', {label: 'Geri al', run: () => { setCount(id, prev); save(); update(); }});
});
$('#deleteOne').addEventListener('click', () => {
  const i = S.zikirs.findIndex(z => z.id === editingId);
  if (i < 0) return;
  const [removed] = S.zikirs.splice(i, 1);
  editor.close();
  save(); renderCards();
  toast(`“${removed.name}” silindi`, {label: 'Geri al', run: () => { S.zikirs.splice(i, 0, removed); save(); renderCards(); }});
});
$('#addZikir').addEventListener('click', () => openEditor(null));

/* ---------- Ayarlar ---------- */
const settings = $('#settings');
function renderHistory() {
  const rows = [];
  let max = 1;
  for (let i = 0; i < 30; i++) { const d = addDays(new Date(), -i); const t = dayTotal(dayKey(d)); max = Math.max(max, t); rows.push({d, t}); }
  const total = rows.reduce((a, r) => a + r.t, 0);
  const active = rows.filter(r => r.t).length;
  const h = $('#history');
  h.replaceChildren();
  const sum = document.createElement('p');
  sum.className = 'note';
  sum.textContent = `${fmt(total)} zikir · ${active} aktif gün`;
  h.append(sum);
  for (const r of rows) {
    if (!r.t && r.d < addDays(new Date(), -6)) continue; // eski boş günleri gizle
    const row = document.createElement('div');
    row.className = 'h-row';
    row.innerHTML = '<span class="h-date"></span><span class="h-bar"><span></span></span><span class="h-num"></span>';
    row.querySelector('.h-date').textContent = r.d.toLocaleDateString('tr-TR', {day: 'numeric', month: 'short', weekday: 'short'});
    row.querySelector('.h-bar span').style.width = (r.t / max * 100) + '%';
    row.querySelector('.h-num').textContent = fmt(r.t);
    h.append(row);
  }
}
$('#openSettings').addEventListener('click', () => {
  $('#hapticsToggle').checked = S.haptics;
  renderHistory();
  settings.showModal();
});
$('#closeSettings').addEventListener('click', () => settings.close());
$('#hapticsToggle').addEventListener('change', e => { S.haptics = e.target.checked; save(); });

$('#resetToday').addEventListener('click', () => {
  const prev = S.days[today];
  settings.close();
  if (!prev) return;
  delete S.days[today]; save(); update();
  toast('Bugünkü sayaçlar sıfırlandı', {label: 'Geri al', run: () => { S.days[today] = prev; save(); update(); }});
});
$('#restoreDefaults').addEventListener('click', () => {
  const ids = new Set(S.zikirs.map(z => z.id));
  const missing = DEFAULTS.filter(z => !ids.has(z.id));
  settings.close();
  if (!missing.length) { toast('Tüm varsayılan zikirler zaten listede'); return; }
  S.zikirs.push(...missing.map(z => ({...z})));
  save(); renderCards();
  toast(`${missing.length} zikir geri eklendi`);
});

$('#exportData').addEventListener('click', async () => {
  const name = `zikrim-yedek-${today}.json`;
  const blob = new Blob([JSON.stringify(S, null, 2)], {type: 'application/json'});
  try {
    const file = new File([blob], name, {type: 'application/json'});
    if (navigator.canShare && navigator.canShare({files: [file]})) {
      await navigator.share({files: [file], title: 'Zikrim yedeği'});
      return;
    }
  } catch (err) { if (err && err.name === 'AbortError') return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
});
$('#importData').addEventListener('change', async e => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!data || !Array.isArray(data.zikirs)) throw new Error();
    const prev = S;
    S = sanitize(data);
    save(); setTheme(S.theme); renderCards();
    settings.close();
    toast('Yedek yüklendi', {label: 'Geri al', run: () => { S = prev; save(); setTheme(S.theme); renderCards(); }});
  } catch { toast('Bu dosya geçerli bir Zikrim yedeği değil'); }
});

/* ---------- Gün değişimi ve uyku ---------- */
function checkDay() {
  const k = dayKey();
  if (k !== today) { today = k; update(); }
}
setInterval(checkDay, 30000);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') { checkDay(); lockScreen(); }
});
window.addEventListener('pageshow', checkDay);

/* ---------- Başlat ---------- */
setTheme(S.theme);
renderCards();
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
