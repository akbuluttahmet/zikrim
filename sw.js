// Güncelleme yaptığında bu sürüm adını artır
const CACHE = 'zikrim-v271';
// Büyük veri dosyaları (ara, ara-ar, akis, ravi; ≈70 MB açık) sürümsüz ayrı önbellekte durur: her yayında yeniden inmez,
// yalnız sunucudaki ETag değişince (activate'te HEAD ile bakılır) hemen yeniden indirilir. Akış/Anasayfa (akis) ve râvi
// sayfası (ravi) çevrimdışı da çalışsın diye WARM listesindekiler önbellekte yoksa activate'te indirilir; arama dosyaları
// (ara, ara-ar) yalnız ilk aramada iner.
const DATA_CACHE = 'zikrim-data';
const BIG = /\/(akis|ara|ara-ar|ravi)\.json$/;
const WARM = ['./akis.json', './ravi.json'];
// Kitap dosyaları (<kitaplık>/index.json, <kitaplık>/tr/*.json) da sürümsüz ayrı önbellekte durur. Eskiden sürümlü CACHE'teydi
// ve her yayında silindiği için bir kez açılan kitap çevrimdışı açılmıyor, Akış'tan “kaydet / kitapta aç” çalışmıyordu.
const BOOKS = 'zikrim-kitap';
const BOOK = /\/[a-z]+\/(index\.json|tr\/[^/]+\.json)$/;
const ASSETS = ['./', './index.html', './style.css', './fikih.js', './usul.js', './hadis.js', './ara-worker.js', './script.js', './manifest.webmanifest', './icon.svg', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './fonts/amiri-400.woff2', './fonts/amiri-700.woff2'];

// Depolama kotası dolduğunda cache.put fırlatır; önbelleğe yazılamasa da yanıt verilmeli.
// put gövdenin tamamı inene kadar sürer; çağıran yer bunu event.waitUntil ile beklemeli, yoksa tarayıcı boşta kalan
// service worker'ı kapatınca büyük dosyalar yarım kalır ve hiç yazılmaz (akis.json çevrimdışı açılmıyordu).
const put = (cache, req, res) => cache.put(req, res).catch(() => {});

self.addEventListener('install', event => {
  // cache:'reload' → tarayıcı önbelleğindeki eski dosyalar yerine her zaman sunucudaki yeni sürümü al
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, {cache: 'reload'})))));
  self.skipWaiting();
});

// Büyük dosyayı sunucudan indirip önbelleğe yazar (tamamlanana kadar bekler); ağ yoksa ya da yazılamazsa sessizce geçer
async function dataPull(cache, url) {
  try {
    const res = await fetch(url, {cache: 'no-store'});
    if (res && res.ok) await put(cache, url, res);
  } catch {}
}

// Büyük veri dosyalarından sunucuda değişmiş olanı yeniden indir (ETag karşılaştırması; ağ yoksa dokunulmaz);
// WARM listesindekiler önbellekte yoksa indir. activate'in waitUntil'i bunu bekler, worker kapanmaz.
async function dataCheck() {
  const cache = await caches.open(DATA_CACHE);
  const seen = new Set();
  for (const req of await cache.keys()) {
    seen.add(new URL(req.url).pathname);
    try {
      const old = await cache.match(req);
      const etag = old && old.headers.get('etag');
      if (!etag) continue;
      const h = await fetch(req.url, {method: 'HEAD', cache: 'no-store'});
      if (h.ok && h.headers.get('etag') && h.headers.get('etag') !== etag) await dataPull(cache, req.url);
    } catch {}
  }
  for (const u of WARM) {
    const url = new URL(u, self.location.href).href;
    if (!seen.has(new URL(url).pathname)) await dataPull(cache, url);
  }
}

// Eski sürümlü önbelleklerde kalmış kitap dosyalarını silinmeden önce kalıcı kitap önbelleğine taşır (daha önce açılmış kitaplar kaybolmasın)
async function bookMove(keys) {
  try {
    const dst = await caches.open(BOOKS);
    for (const k of keys) {
      if (k === CACHE || k === DATA_CACHE || k === BOOKS) continue;
      const src = await caches.open(k);
      for (const req of await src.keys()) {
        if (!BOOK.test(new URL(req.url).pathname) || await dst.match(req, {ignoreSearch: true})) continue;
        const res = await src.match(req);
        if (res) await put(dst, req, res);
      }
    }
  } catch {}
  return keys;
}

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(bookMove)
      .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== DATA_CACHE && k !== BOOKS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(dataCheck)
  );
});

// Önce önbellekten hızlıca göster, arka planda yeni sürümü indir (stale-while-revalidate)
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const path = new URL(req.url).pathname;
  // Kitap dosyaları: önbellekte varsa hemen oradan (arka planda yenilenir), yoksa ağdan indirilip yazılır.
  // Kitap listesi (index.json) önce ağdan denenir ki yeni bölümler hemen görünsün; ağ yoksa önbellekten.
  if (BOOK.test(path)) {
    event.respondWith(caches.open(BOOKS).then(async cache => {
      const hit = await cache.match(req, {ignoreSearch: true});
      const network = fetch(req).then(res => { if (res && res.ok) event.waitUntil(put(cache, req, res.clone())); return res; });
      // Zayıf bağlantıda ağ yanıtı hiç gelmeyebilir; önbellekte varsa 3,5 sn sonra oradan ver (ağ yanıtı gelince yine yazılır)
      if (/\/index\.json$/.test(path)) {
        if (!hit) return network.catch(() => Response.error());
        event.waitUntil(network.catch(() => {}));
        return Promise.race([network.catch(() => hit), new Promise(r => setTimeout(() => r(hit), 3500))]);
      }
      event.waitUntil(network.catch(() => {}));
      return hit || network.catch(() => Response.error());
    }));
    return;
  }
  // Ana dizindeki index.json ve günün rivayeti: önce ağ, çevrimdışıysa önbellek — yeni eklenen kitaplar hemen görünsün
  if (/\/(index|gunun)\.json$/.test(path)) {
    event.respondWith(caches.open(CACHE).then(cache => fetch(req).then(res => { if (res && res.ok) event.waitUntil(put(cache, req, res.clone())); return res; })
      .catch(async () => (await cache.match(req, {ignoreSearch: true})) || Response.error())));
    return;
  }
  // Büyük veri havuzları: önbellekte varsa oradan, yoksa indirilir ve tamamı yazılana kadar worker açık tutulur (bkz. DATA_CACHE)
  if (BIG.test(path)) {
    event.respondWith(caches.open(DATA_CACHE).then(async cache => {
      const hit = await cache.match(req, {ignoreSearch: true});
      if (hit) return hit;
      const res = await fetch(req);
      if (res && res.ok) event.waitUntil(put(cache, req, res.clone()));
      return res;
    }));
    return;
  }
  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req, {ignoreSearch: true});
    const network = fetch(req).then(res => {
      if (res && res.ok) event.waitUntil(put(cache, req, res.clone()));
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
