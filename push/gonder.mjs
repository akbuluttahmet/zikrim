// Sekîne bildirim gönderici. GitHub Actions'tan çalışır (.github/workflows/bildirim.yml).
// Kullanım: node push/gonder.mjs sabah|aksam|deneme
// Ortam değişkenleri (GitHub → Settings → Secrets and variables → Actions):
//   VAPID_PRIVATE  — VAPID özel anahtarı (gizli)
//   PUSH_SUBS      — uygulamadaki Ayarlar → Bildirimler → “Abonelik kodunu kopyala” ile alınan kod.
//                    Birden fazla cihaz için kodlar alt alta yazılır ya da bir JSON dizisi olarak verilir.
import webpush from 'web-push';
import {readFileSync} from 'node:fs';

// Ortak anahtar uygulamadaki (script.js → PUSH_KEY) ile aynı olmalı.
const VAPID_PUBLIC = 'BCI_ZYBMHdxFXymdN47D4ySZVGe6bzQWolbVRHCjHkNoa_4fWe32Mvh97pdcfWrthr58-aYyx_um8G22OB6S-S4';
const SITE = 'https://akbuluttahmet.github.io/zikrim/';

const tur = process.argv[2] || 'deneme';
const {VAPID_PRIVATE, PUSH_SUBS} = process.env;
if (!VAPID_PRIVATE) { console.error('VAPID_PRIVATE tanımlı değil.'); process.exit(1); }
if (!PUSH_SUBS || !PUSH_SUBS.trim()) { console.error('PUSH_SUBS tanımlı değil (abonelik kodu yok).'); process.exit(1); }

// Abonelikler: JSON dizisi, tek JSON nesnesi ya da alt alta yazılmış JSON nesneleri
function parseSubs(s) {
  s = s.trim();
  try { const j = JSON.parse(s); return Array.isArray(j) ? j : [j]; } catch {}
  // Alt alta yazılmış satırlar: bozuk bir satır bütün gönderimi düşürmesin, uyarıyla atlansın
  const out = [];
  for (const [i, l] of s.split(/\n+/).map(l => l.trim()).filter(Boolean).entries()) {
    try { out.push(JSON.parse(l)); } catch { console.warn(`::warning::PUSH_SUBS satır ${i + 1} JSON değil, atlandı.`); }
  }
  return out;
}
const subs = parseSubs(PUSH_SUBS).filter(x => x && x.endpoint && x.keys);
if (!subs.length) { console.error('PUSH_SUBS içinde geçerli abonelik bulunamadı.'); process.exit(1); }

// Bildirimin altına, ana sayfadaki “Rivayetler” havuzundan (gunun.json) kısa bir rivayet
const LIB_NAMES = {sunan: 'Sünen-i Ebî Dâvûd', musannef: 'el-Musannef', ibnebiseybe: 'İbn Ebî Şeybe', musned: 'el-Müsned', usul: 'Usûlü’s-Sünne', ahmed: 'İmam Ahmed', zuhd: 'ez-Zühd', fezail: 'Fezâilü’s-sahâbe', berbehari: 'Şerhu’s-Sünne', acurri: 'el-Âcurrî', seria: 'eş-Şerîa', hallal: 'el-Hallâl', safii: 'eş-Şâfiî', buhari: 'el-Buhârî', ebudavud: 'Ebû Dâvûd', harb: 'Harb el-Kirmânî', ibane: 'el-İbâne', leys: 'Leys b. Sa‘d', zuhri: 'ez-Zührî'};
function rivayet() {
  try {
    const d = JSON.parse(readFileSync(new URL('../gunun.json', import.meta.url), 'utf8'));
    const pool = [];
    for (const [v, L] of Object.entries(d)) for (const [, n, t] of L.h) if (t && t.length <= 170 && !/bozuk/.test(t)) pool.push([v, n, t]);
    if (!pool.length) return '';
    const [v, n, t] = pool[Math.floor(Math.random() * pool.length)];
    return `${t}\n— ${LIB_NAMES[v] || v}, ${n}`;
  } catch { return ''; }
}

const TURLER = {
  sabah: {title: '☀︎ Sabah zikirleri', ilk: 'Sabah zikirlerinin vakti.', v: 'sabah'},
  aksam: {title: '☾ Akşam zikirleri', ilk: 'Akşam zikirlerinin vakti.', v: 'aksam'},
  deneme: {title: 'Sekîne', ilk: 'Deneme bildirimi: bildirimler çalışıyor.', v: 'main'},
};
const T = TURLER[tur] || TURLER.deneme;
const r = rivayet();
const payload = JSON.stringify({title: T.title, body: r ? r : T.ilk, v: T.v, tag: 'sekine-' + tur});

webpush.setVapidDetails(SITE, VAPID_PUBLIC, VAPID_PRIVATE);

let ok = 0, eski = 0, hata = 0;
for (const [i, sub] of subs.entries()) {
  try {
    await webpush.sendNotification(sub, payload, {TTL: 60 * 60 * 3, urgency: 'normal'});
    ok++;
  } catch (e) {
    if (e.statusCode === 404 || e.statusCode === 410) { eski++; console.warn(`::warning::Abonelik #${i + 1} artık geçerli değil (${e.statusCode}). Uygulamadan yeni kod alıp PUSH_SUBS'u güncelle.`); }
    else { hata++; console.error(`#${i + 1}: gönderilemedi (${e.statusCode || ''}) ${e.body || e.message}`); }
  }
}
console.log(`${tur}: ${ok} gönderildi, ${eski} geçersiz, ${hata} hata.`);
if (!ok) process.exit(1);
