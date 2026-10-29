// Güncelleme yaptığında bu sürüm adını artır
const CACHE = 'zikrim-v191';
const ASSETS = ['./', './index.html', './style.css', './fikih.js', './usul.js', './hadis.js', './ara-worker.js', './script.js', './manifest.webmanifest', './icon.svg', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './gunun.json', './fonts/amiri-400.woff2', './fonts/amiri-700.woff2'];

self.addEventListener('install', event => {
  // cache:'reload' → tarayıcı önbelleğindeki eski dosyalar yerine her zaman sunucudaki yeni sürümü al
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, {cache: 'reload'})))));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Önce önbellekten hızlıca göster, arka planda yeni sürümü indir (stale-while-revalidate)
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  // Kitap listeleri (index.json) ve günün rivayeti: önce ağ, çevrimdışıysa önbellek — yeni eklenen kitaplar hemen görünsün
  if (/\/(index|gunun)\.json$/.test(new URL(req.url).pathname)) {
    event.respondWith(caches.open(CACHE).then(cache => fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })
      .catch(() => cache.match(req, {ignoreSearch: true}))));
    return;
  }
  // Akış havuzu büyük (≈2 MB sıkıştırılmış): önbellekte varsa oradan, yoksa bir kez indirilir. Her yayında CACHE adı
  // değiştiği için eski önbellek silinir ve yeni sürüm ilk açılışta indirilir.
  if (/\/(akis|ara|ara-ar|ravi)\.json$/.test(new URL(req.url).pathname)) {
    event.respondWith(caches.open(CACHE).then(async cache => (await cache.match(req, {ignoreSearch: true})) || fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })));
    return;
  }
  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req, {ignoreSearch: true});
    const network = fetch(req).then(res => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    }).catch(() => cached);
    event.waitUntil(network.catch(() => {}));
    return cached || network;
  }));
});

// Bildirimler (web push): GitHub Actions'taki zamanlanmış iş gönderir (.github/workflows/bildirim.yml, push/gonder.mjs).
// iOS her push'ta mutlaka bir bildirim gösterilmesini ister; gösterilmezse abonelik iptal edilir.
self.addEventListener('push', event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = {body: event.data ? event.data.text() : ''}; }
  event.waitUntil(self.registration.showNotification(d.title || 'Sekîne', {
    body: d.body || '',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: d.tag || 'sekine',
    lang: 'tr',
    data: {v: d.v || 'main'},
  }));
});

// Bildirime dokununca: uygulama açıksa öne getir ve ilgili zikir görünümünü aç; kapalıysa o görünümle başlat.
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const v = (event.notification.data && event.notification.data.v) || 'main';
  event.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(list => {
    const c = list[0];
    if (c) { c.postMessage({type: 'open', v}); return c.focus(); }
    return self.clients.openWindow('./index.html' + (v !== 'main' ? '?v=' + v : ''));
  }));
});
