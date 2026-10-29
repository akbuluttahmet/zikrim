# İlerleme ve açık işler

Her oturum: önce `SPEC.md`, sonra bu dosya. Bitince burayı güncelle (kitap, son numara, açık sorunlar). Bu dosya kısa kalır; uzun notlar `araclar/sunan/notlar.md` gibi kitaba özel dosyalara gider.

## Durum

| Kitap | Standart | Durum | Not |
|---|---|---|---|
| Sünen-i Ebî Dâvûd (`sunan/`) | isnad standardı (SPEC) | **tamamlandı** — 40/40 bölüm, 5275 madde (2026-10-29) | `dogrula.py`: 0 hata, 106 uyarı (aşağıda) |
| Müsned (`musned/`) | eski biçim (4 bölüm, 561/1380 çevrili) | **baştan yapılacak**, Sünen standardıyla | Şuayb el-Arnaût neşri, Şâmile 25794; ziyade işaretleri (1/2/3) korunur; `c[0]` müellif kararı aşağıda |
| Diğer kitaplıklar | eski biçim (`info` yok ya da kısmi) | daha sonra standarda getirilecek | `CLAUDE.md` “Kaynaklar” |

## Araçlar (hazır)

- `SPEC.md` — şartname (format, sîga sözlüğü, şema, 5 örnek, oturum akışı).
- `araclar/ravi/ravi_kur.py` → `araclar/ravi/ravi.json` + `ravi.json` — bütün kitaplıklardan 16 226 râvi kaydı (Sünen sîgalı, ötekiler sened satırından sîgasız; 2026-10-29). Her derlemeden sonra `python3 araclar/ravi/ravi_kur.py` ile yenilenir.
- `araclar/dogrula.py <kitaplık> [--ravi] [--hepsi] [--json rapor.json]` — yayımlanmış verinin şartname denetimi. Hata = yayımlanmaz; uyarı = göz listesi.
- `araclar/sunan/` — çalışma dosyası araçları (`denetle.py`, `derle.py`), kılavuz, sözlük.

## Sünen — gözle bakılacak uyarılar (dogrula.py, 2026-10-29)

Hepsi: `python3 araclar/dogrula.py sunan --hepsi`

- **Sîga sayısı uyuşmuyor (36):** 332, 394, 433, 715, 1176, 1329, 1469, 1518, 1901, 2204, 2236, 2419, 2499, 2541, 2624, 2761, 2829, 2878, 3063, 3279, 3335, 3344, 3372, 3392, 3542, 3657, 4270, 4282, 4363, 4514, 4620, 4662, 4790, 4860, 4946, 5076. Bakılan örnekler: **394 `k` erken** (metin İbn Şihâb'ın sözüyle devam ediyor, matn daha sonra başlıyor) — düzeltilmeli; 2624 zincirin Ya‘lâ→Saîd→İbn Abbâs kısmı Arapçada matn içinde (gözden geçir); 1469, 1518, 3542, 4946 yanlış alarm (ortak lafız, `أنه حدثه`, و'lu hocalar tek kutu).
- **Metin son râviyle başlamıyor (67):** çoğu anlatı rivayeti ya da `X’ten:` kalıbı — yanlış alarm olması beklenir; 2236 (son: Ebû Ca‘fer, metin Âişe'den), 4301 (son: Yahyâ b. Câbir, metin Avf b. Mâlik dedi ki), 4427 (son: İkrime, metin İbn Abbâs'tan) son halka eksik görünüyor — bak.
- **Çeviri kısa olabilir (3):** 518, 2661, 3810.
- Önceki gözden geçirme notları: `araclar/sunan/notlar.md`.

## Müsned için kararlar (başlamadan verilecek)

- `c[0]` kimdir: Sünen'de müellif (`Ebû Dâvûd`). Müsned'in eski verisi zinciri `Abdullah b. Ahmed → babası …` ile başlatıyordu. Öneri: `c[0] = "Ahmed b. Hanbel"`; Abdullah'ın ziyâdeleri (`ziyade` 2/3) için `c[0] = "Abdullah b. Ahmed"`; nüsha senedi (Katîî, İbnü'l-Müzhib…) 0 numaralı maddede, zincirlere yazılmaz. `dogrula.py`'deki `MUELLIF['musned']` buna göre ayarlanır.
- Bölümleme: sahâbî müsnedleri (`index.json`'daki `g` grupları); parti = 15–20 hadis.
- Sözlük: `sozluk.tsv` Sünen adlarını içerir; Müsned'de yeni adlar aynı dosyaya eklenir (tek sözlük).

## Standarda getirme sırası (Sünen'deki isnad standardı bütün kitaplara)

Râvi sayfası ve `dogrula.py` yalnız `info.c` zinciri olan kitapları görür; eski biçimdeki kitaplar (sened satırında notlar, saygı ifadeleri, nüsha zinciri) standarda getirildikçe `araclar/ravi/ravi_kur.py` ve `dogrula.py` `MUELLIF` listesine eklenir. Sıra (öneri): 1) Müsned (baştan, en büyük kazanç), 2) Musannef (16 352 madde; sened var, panel yok → sened temizlenir, `&` sîga satırı Arapçadan üretilir), 3) ez-Zühd ve Fezâil (sened başındaki “(Ahmed …)” nüsha notları `n`'ye), 4) eş-Şerîa, el-İbâne, el-Âcurrî, 5) küçük kitaplar. Her kitapta: `kilavuz.md` uyarlanır → parti → `denetle.py` → derle → `dogrula.py --ravi` 0 hata → `ravi_kur.py` yenilenir → yayın.

## Günlük

- 2026-10-29 — Râvi sayfası bütün kitaplıkları kapsıyor; yeni düzen (özet kutuları, kitap pilleri, katlanır listeler).
- 2026-10-29 — Râvi sayfası: “Rivayet aldıkları/verdikleri”, sîga dökümü, rol satırı, kütüphane senedde arama; ad eşleştirme sıkılaştırıldı.
- 2026-10-29 — Râvi sayfası eklendi (`ravi.json`, panelde ada dokununca); arama → kitap hayalet tıklaması düzeltildi.
- 2026-10-29 — Sünen yeni çeviriyle tamamlandı (5275). SPEC.md, râvi veritabanı, `dogrula.py`, PROGRESS.md kuruldu; Sünen'de ilk doğrulama: 0 hata, 106 uyarı.
