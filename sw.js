// Güncelleme yaptığında bu sürüm adını artır (zikrim-v3, v4...)
const CACHE = 'zikrim-v23';
const ASSETS = ['./', './index.html', './style.css', './fikih.js', './script.js', './manifest.webmanifest', './icon.svg', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];

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
