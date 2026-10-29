// Güncelleme yaptığında bu sürüm adını artır
const CACHE = 'zikrim-v209';
// Büyük veri dosyaları (ara, ara-ar, akis, ravi; ≈45 MB) sürümsüz ayrı önbellekte durur: her yayında yeniden inmez,
// yalnız sunucudaki ETag değişince (activate'te HEAD ile bakılır) silinir ve ilk kullanımda yeniden indirilir.
const DATA_CACHE = 'zikrim-data';
const BIG = /\/(akis|ara|ara-ar|ravi)\.json$/;
const ASSETS = ['./', './index.html', './style.css', './fikih.js', './usul.js', './hadis.js', './ara-worker.js', './script.js', './manifest.webmanifest', './icon.svg', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './fonts/amiri-400.woff2', './fonts/amiri-700.woff2'];

// Depolama kotası dolduğunda cache.put fırlatır; önbelleğe yazılamasa da yanıt verilmeli
const put = (cache, req, res) => cache.put(req, res).catch(() => {});

self.addEventListener('install', event => {
  // cache:'reload' → tarayıcı önbelleğindeki eski dosyalar yerine her zaman sunucudaki yeni sürümü al
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, {cache: 'reload'})))));
  self.skipWaiting();
});

// Büyük veri dosyalarından sunucuda değişmiş olanı önbellekten düşür (ETag karşılaştırması; ağ yoksa dokunulmaz)
async function dataCheck() {
  const cache = await caches.open(DATA_CACHE);
  for (const req of await cache.keys()) {
    try {
      const old = await cache.match(req);
      const etag = old && old.headers.get('etag');
      if (!etag) continue;
      const h = await fetch(req.url, {method: 'HEAD', cache: 'no-store'});
      if (h.ok && h.headers.get('etag') && h.headers.get('etag') !== etag) await cache.delete(req);
    } catch {}
  }
}

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== DATA_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(dataCheck)
  );
});

// Önce önbellekten hızlıca göster, arka planda yeni sürümü indir (stale-while-revalidate)
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const path = new URL(req.url).pathname;
  // Kitap listeleri (index.json) ve günün rivayeti: önce ağ, çevrimdışıysa önbellek — yeni eklenen kitaplar hemen görünsün
  if (/\/(index|gunun)\.json$/.test(path)) {
    event.respondWith(caches.open(CACHE).then(cache => fetch(req).then(res => { if (res && res.ok) put(cache, req, res.clone()); return res; })
      .catch(async () => (await cache.match(req, {ignoreSearch: true})) || Response.error())));
    return;
  }
  // Büyük veri havuzları: önbellekte varsa oradan, yoksa bir kez indirilir (bkz. DATA_CACHE)
  if (BIG.test(path)) {
    event.respondWith(caches.open(DATA_CACHE).then(async cache => (await cache.match(req, {ignoreSearch: true}))
      || fetch(req).then(res => { if (res && res.ok) put(cache, req, res.clone()); return res; })));
    return;
  }
  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req, {ignoreSearch: true});
    const network = fetch(req).then(res => {
      if (res && res.ok) put(cache, req, res.clone());
      return res;
    }).catch(async () => {
      if (cached) return cached;
      // Çevrimdışı ve önbellekte yok: sayfa isteğiyse ana sayfayı ver (bildirimden gelen ?v= gibi), değilse düzgün bir hata yanıtı
      if (req.mode === 'navigate') return (await cache.match('./index.html')) || Response.error();
      return Response.error();
    });
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

// Bildirime dokununca: uygulama açıksa (görünür pencere öncelikli) öne getir ve ilgili zikir görünümünü aç; kapalıysa o görünümle başlat.
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const v = (event.notification.data && event.notification.data.v) || 'main';
  event.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(list => {
    const c = list.find(x => x.visibilityState === 'visible') || list[0];
    if (c) { c.postMessage({type: 'open', v}); return c.focus(); }
    return self.clients.openWindow('./index.html' + (v !== 'main' ? '?v=' + v : ''));
  }));
});
