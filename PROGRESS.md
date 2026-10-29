# İlerleme ve açık işler

Her oturum: önce `SPEC.md`, sonra bu dosya. Bitince burayı güncelle (kitap, son numara, açık sorunlar). Bu dosya kısa kalır; uzun notlar `araclar/sunan/notlar.md` gibi kitaba özel dosyalara, Ahmet'in kendisinin bakacağı kararlar `GOZDEN.md`'ye gider.

## Durum

| Kitap | Standart | Durum | Not |
|---|---|---|---|
| Sünen-i Ebî Dâvûd (`sunan/`) | isnad standardı (SPEC) | **tamamlandı** — 40/40 bölüm, 5275 madde (2026-10-29) | `dogrula.py`: 0 hata, 106 uyarı (aşağıda) |
| eş-Şerîa (`seria/`) | isnad standardı (SPEC) | **tamamlandı** — 17/17 bölüm, 2169 madde (2026-10-29) | `dogrula.py`: 0 hata, 419 uyarı (265 müellif notu, 83 metin başı, 61 sîga, 10 ﷺ) |
| ez-Zühd (`zuhd/`) | isnad standardı (SPEC) | **tamamlandı** — 8/8 bölüm, 2375 madde (2026-10-29) | `dogrula.py`: 0 hata, 108 uyarı (68 metin başı, 32 ﷺ, 4 sîga, 4 k) |
| Fezâilü’s-sahâbe (`fezail/`) | isnad standardı (SPEC) | **tamamlandı** — 9/9 bölüm, 1965 madde (2026-10-29) | `dogrula.py`: 0 hata, 154 uyarı (114 metin başı, 22 sîga, 16 k, 1 kısa) |
| İmam Ahmed (`ahmed/`) | isnad standardı (SPEC) | **tamamlandı** — 9/9 kitap, 2117 madde (2026-10-29) | `dogrula.py`: 0 hata, 76 uyarı (51 metin başı, 14 sîga, 9 k, 2 kısa) |
| el-Âcurrî (`acurri/`) | isnad standardı (SPEC) | **tamamlandı** — 12/12 kitap, 825 madde (2026-10-29) | `dogrula.py`: 0 hata, 62 uyarı (38 metin başı, 17 sîga, 5 k) |
| İbn Ebî Şeybe (`ibnebiseybe/`) | isnad standardı (SPEC) | **tamamlandı** — 2/2 kitap, 642 madde (2026-10-29) | `dogrula.py`: 0 hata, 26 uyarı (13 metin başı, 6 sîga, 5 ﷺ) |
| el-Hallâl (`hallal/`) | isnad standardı (SPEC) | **tamamlandı** — 7/7 kitap, 372 madde (2026-10-29) | `dogrula.py`: 0 hata, 38 uyarı (28 metin başı, 7 sîga) |
| eş-Şâfiî (`safii/`) | isnad standardı (SPEC) | **tamamlandı** — 1/1 kitap, 547 madde (2026-10-29) | `dogrula.py`: 0 hata, 5 uyarı |
| el-Buhârî (`buhari/`) | isnad standardı (SPEC) | **tamamlandı** — 2/2 kitap, 307 madde (2026-10-29) | `dogrula.py`: 0 hata, 25 uyarı (22 metin başı, 1 kısa) |
| el-İbâne (`ibane/`) | isnad standardı (SPEC) | **sürüyor** — 12/22 bölüm (i01–i12), 1699 madde (2026-10-29) | `dogrula.py`: 0 hata, 54 uyarı |
| Ebû Dâvûd (`ebudavud/`), Harb (`harb/`), el-Berbehârî (`berbehari/`) | isnad standardı (SPEC) | **tamamlandı** — 243 madde (2026-10-29) | `dogrula.py`: 0 hata, 1 uyarı (berbehari ﷺ) |
| Müsned (`musned/`) | isnad standardı (SPEC) | **sürüyor** — m001 tamamlandı (1–81, 81/81), m002 p006–p012 (82–207) çevrildi; toplam 207/1380 madde (2026-10-29) | `dogrula.py` (1–207): 0 hata, 0 kısa, 0 sîga; m002–m003 bölüm bitene kadar korundu |
| el-Musannef (`musannef/`) | eski biçim (17/40 kitap, 16 352 madde; sened var, panel yok) | daha sonra standarda getirilecek | `CLAUDE.md` “Kaynaklar” |
| Leys b. Sa‘d (`leys/`) | isnad standardı (SPEC) | **tamamlandı** — 1/1 kitap (Fevâidü'l-Leys), 8 madde (2026-10-29) | `dogrula.py --ravi`: 0 hata, 0 uyarı; paneller elle |
| ez-Zührî (`zuhri/`) | isnad standardı (SPEC) | **tamamlandı** — 2/2 kitap (en-Nâsih ve'l-mensûh 49, Tenzîlü'l-Kur’ân 118 madde) (2026-10-29) | `dogrula.py --ravi`: 0 hata, 0 uyarı; paneller elle |
| Hemmâm b. Münebbih (`hemmam/`) | isnad standardı (SPEC) | **tamamlandı** — 1/1 kitap (es-Sahîfe), 140 madde (2026-10-29) | `dogrula.py --ravi`: 0 hata, 0 uyarı; `k = 0` (Arapçada isnad yok) |
| İbn Vehb el-Câmi‘ (`ibnvehb/`) | isnad standardı (SPEC) | **tamamlandı** — 5/5 bölüm, 717 madde (2026-10-29) | `dogrula.py`: 0 hata; çeviri sözlükleri oturum dosyalarında |
| **Diğer 5 erken dönem eseri** (Zeyd b. Sâbit, Ukbe b. Âmir, Râfi‘ b. Hadîc, Müsnedü'ş-Şâfiî, Hammâd b. Zeyd; Zührî'nin hadis cüzü) | isnad standardı (SPEC) | **başlanmadı** — kaynaklar kaydedildi (2026-10-29) | `CLAUDE.md` “Eklenecek erken dönem eserleri”; 3 eserin Şâmile numarası eksik (aşağıda) |

## Araçlar (hazır)

- `SPEC.md` — şartname (format, sîga sözlüğü, şema, 5 örnek, oturum akışı).
- `araclar/ravi/ravi_kur.py` → `araclar/ravi/ravi.json` + `ravi.json` — bütün kitaplıklardan 16 151 râvi kaydı, 36 795 hoca-öğrenci kenarı (Musannef dışındaki tüm kitaplıklar panelli ve sîgalı; 2026-10-29). Her derlemeden sonra `python3 araclar/ravi/ravi_kur.py` ile yenilenir.
- `araclar/dogrula.py <kitaplık> [--ravi] [--hepsi] [--json rapor.json]` — yayımlanmış verinin şartname denetimi. Hata = yayımlanmaz; uyarı = göz listesi. Sened satırında `(yine)`, `(metinde böyle)`, yer/zaman notu, ad sonunda `—`, `; ayrıca` dışı `;`, `rahimehullah` ve zincir sonunda Nebî/Resûlullah da hatadır (2026-10-29).
- `araclar/siga_hizala.py [kitaplık…] [--rapor dosya]` — panelli maddelerde sîgaları ve `k`'yi Arapça isnaddan yeniden eşler (halka ↔ ondan önceki lafız; ad özellikleriyle hizalama: بن↔b., أبو↔Ebû, أبيه↔babası, و↔ve). Müellif/nüsha öneği `dogrula.py` → `ONEK` tablosundan düşülür (Zühd/Fezâil/İmam Ahmed'de `حدثنا عبد الله … حدثني أبي` → `c[0]` Ahmed b. Hanbel, yalnız `حدثنا عبد الله` → Abdullah b. Ahmed; Buhârî'de Mahmûd → Buhârî; Şâfiî'de Rebî‘ → Şâfiî; Âcurrî'de Ebû Bekir/Muhammed → Âcurrî). Adlar değişmez; bulunamayan halka `an`/`kâle` alır ve rapora yazılır (`araclar/siga_hizala_rapor.md`). Tekrar çalıştırılabilir.
- `araclar/standarda_getir.py` — eski biçimden panele geçiş betiği; **bir kez çalıştırıldı**, panelli kitaplıkta kendini durdurur (tekrar uygulanırsa Abdullah/babası halkalarını bozar).
- `araclar/sunan/` — çalışma dosyası araçları (`denetle.py`, `derle.py`), kılavuz, sözlük.

## Sünen — gözle bakılacak uyarılar (dogrula.py, 2026-10-29)

Hepsi: `python3 araclar/dogrula.py sunan --hepsi`. Bakılacak tek tek maddeler (394, 2236, 2624, 4301, 4427, 518, 2661, 3810) `GOZDEN.md`'de; burada yalnız sayım.

- **Sîga sayısı uyuşmuyor (36):** 332, 394, 433, 715, 1176, 1329, 1469, 1518, 1901, 2204, 2236, 2419, 2499, 2541, 2624, 2761, 2829, 2878, 3063, 3279, 3335, 3344, 3372, 3392, 3542, 3657, 4270, 4282, 4363, 4514, 4620, 4662, 4790, 4860, 4946, 5076. 1469, 1518, 3542, 4946 yanlış alarm (ortak lafız, `أنه حدثه`, و'lu hocalar tek kutu).
- **Metin son râviyle başlamıyor (67):** çoğu anlatı rivayeti ya da `X’ten:` kalıbı — yanlış alarm olması beklenir.
- **Çeviri kısa olabilir (3).**
- Önceki gözden geçirme notları: `araclar/sunan/notlar.md`.

## Müsned için kararlar

- `c[0]` kararı (verildi, Zühd/Fezâil/İmam Ahmed'de uygulandı): `c[0] = "Ahmed b. Hanbel"`; Abdullah'ın ziyâdeleri (`ziyade` 2/3; Arapçası `حدثنا عبد الله` ile başlayıp `حدثني أبي` içermeyenler) için `c[0] = "Abdullah b. Ahmed"`; nüsha senedi (Katîî, İbnü'l-Müzhib…) 0 numaralı maddede, zincirlere yazılmaz. `dogrula.py` `MUELLIF['musned']` ve `ONEK` tablosu buna hazır.
- Bölümleme: sahâbî müsnedleri (`index.json`'daki `g` grupları); parti = 15–20 hadis.
- Sözlük: `sozluk.tsv` Sünen adlarını içerir; Müsned'de yeni adlar aynı dosyaya eklenir (tek sözlük).

## Standarda getirme — kalanlar

Musannef ve Müsned dışındaki bütün kitaplıklar standarttadır (2026-10-29). Kalanlar: 1) **Müsned** — baştan çeviri (en büyük kazanç), yukarıdaki kararlarla; 2) **Musannef** (16 352 madde; sened var, panel yok) — sened temizlenir, `&` sîga satırı Arapçadan üretilir (`siga_hizala.py` uyarlanabilir). Her kitapta: `kilavuz.md` uyarlanır → parti → `denetle.py` → derle → `dogrula.py --ravi` 0 hata → `ravi_kur.py` yenilenir → yayın. Yeni kitaplıkta müellif adı `MUELLIF`/`RAVI_MUELLIF`'e, nüsha öneği varsa `ONEK`'e eklenir.

## Eklenecek 9 erken dönem eseri — sıra önerisi

Küçükten büyüğe (OpenITI kelime sayısı): ~~Leys Fevâid~~ (bitti) → ~~Zührî Nâsih~~ (bitti) → ~~Sahîfetü Hemmâm~~ (bitti) → Ukbe Müsnedi (Şâmile 30774, boyut bilinmiyor) → ~~İbn Vehb el-Câmi‘~~ (bitti) → Müsnedü'ş-Şâfiî (≈86 000; `safii/` s02). Şâmile numarası bulunamayanlar (Zeyd Ferâiz, Râfi‘ Hadîs, Hammâd Cüz, Zührî hadis cüzü; Ahmet'in gönderdiği 1020 ve 367 başka kitaplar çıktı) Ahmet bağlantıyı verince sıraya girer (`GOZDEN.md`). Her kitapta Sünen iş akışı: `kilavuz.md` uyarlanır → parti → `denetle.py` → derle → `dogrula.py --ravi` 0 hata → `ravi_kur.py` → yayın.

## 12 kitaplık — gözle bakılacak uyarılar (dogrula.py, 2026-10-29, sîga eşlemesinden sonra)

Hepsi: `python3 araclar/dogrula.py <kitaplık> --hepsi`. Sayılar yukarıdaki tabloda.

- **Sîga sayısı uyuşmuyor (78):** zuhd 813, 1658, 2320 · fezail 81, 128, 168, 253, 279, 347, 403, 619, 870, 1099, 1105, 1227, 1299, 1330, 1333, 1439, 1576, 1590 · ahmed m01 0, m04 0, 231, 249, 278, 390, 403, 435, 438, m06 10, m09 2, 3, 4, 168 · acurri a01 90.07, a02 10, 27, a04 16, a05 3, 45, a06 53, 64, a07 11, 38, 41, a10 75, 102, 118, a11 34, 60, 65 · ibnebiseybe e01 24, e02 29, 85, e03 91, 100 · hallal h02 1, 41, 54, h03 105, 170 · safii 0, 163 · buhari b02 86, 116 · ibane 12, 103, 124. Çoğu tahvîl, ortak lafız (`قالا: حدثنا`) ya da `k` sonrasına taşan zincir; gerçek kayma varsa `siga_hizala_rapor.md`'de de görünür.
- **`k` kelime ortasında (39):** zuhd 1191, 1564, 1795, 2230 · fezail 82, 490, 492, 620, 919, 996, 1274, 1282, 1364, 1429, 1436, 1509, 1529, 1625, 1722, 1839 · ahmed m03 30, 38, 39, 41, 52, 75, 105, m06 129, 182 · acurri a05 7, a09 62, a11 12, 29, 47 · ibnebiseybe e03 274, 327 · hallal h03 182, 207 · ibane 124. Son halkanın Arapçadaki yeri belirsiz; elle `k` ver.
- **Metin son râviyle başlamıyor (≈340):** çoğu anlatı rivayeti ya da sened satırında son halkanın eksik olması (ör. fezail 44: Arapça `سمعت عليا` ile Ali'ye kadar iner, sened Ebû Cuhayfe'de biter). SPEC §1'e göre sözün kaynağı zincire `kâle` ile yazılmalı; kitap kitap gözden geçirilecek.
- **Çeviri kısa olabilir (6), ﷺ eksik (41):** `GOZDEN.md`. Oran 2026-10-29'dan beri harekesiz ve önek düşülmüş Arapçaya göre hesaplanır (harekeli neşirlerde yapay uyarı veriyordu; Müsned 143 → 1).
- Sîga eşlemesinin kendi raporu: `araclar/siga_hizala_rapor.md` (195 lafzı bulunamayan halka, 83 belirsiz hizalama).

## Günlük

- 2026-10-29 — Müsned (`musned/`): `araclar/musned/` kuruldu; Ebû Bekir Müsnedi (`m001.json`, 1–81) tamamen derlendi ve Ömer Müsnedi (`m002`, `p006–p012`, 82–207) çevrilerek toplam 207 madde `dogrula.py` (0 hata) ile doğrulandı.
- 2026-10-29 — `dogrula.py` “çeviri kısa olabilir” oranı harekesiz ve nüsha/müellif öneği düşülmüş Arapçaya göre (eşik 0,75 aynı; sadık çevirilerde medyan ≈1,3). Müsned 143 → 1, 12 kitaplık 17 → 6 uyarı.
- 2026-10-29 — Sîga düzeltmesi: 14:18'deki toplu dönüştürmede (`standarda_getir.py`) sîgalar Türkçe zincire sırayla sayılarak verilmişti; Türkçe sened Abdullah → babası önekini atmış maddelerde (Fezâil'in tamamına yakını, Zühd ve Buhârî'nin bir kısmı) sîgalar bir-iki halka kaymış, Fezâil'de 614 Abdullah ziyâdesi `c[0]` = Ahmed b. Hanbel yazılmış, `k` birçok yerde erken kalmıştı. `araclar/siga_hizala.py` yazıldı: sîgalar ve `k` Arapça isnaddan yeniden eşlendi (12 kitaplıkta 5 550 panel değişti; dogrula "sîga sayısı uyuşmuyor" 2 037 → 78). `dogrula.py`: `ONEK` tablosu (sayımdan düşülür), harekesiz sayım, `قثنا` haddesenâ sayılır. Tablodaki satırlara uyarı sayıları yazıldı; `standarda_getir.py` tek kullanımlık olarak işaretlendi.
- 2026-10-29 — Musannef ve Müsned dışındaki tüm kitaplıklar (`ibnebiseybe`, `ahmed`, `zuhd`, `fezail`, `acurri`, `hallal`, `safii`, `buhari`, `ebudavud`, `harb`, `ibane`, `berbehari` — `sunan` ve `seria` ile birlikte 14 kitaplık, 16 983 madde) `SPEC.md` isnad ve râvi paneli standardına getirildi (`dogrula.py --ravi`: 0 hata); `ravi.json` ve râvi sayfası güncellendi (16 151 râvi, 37 496 sîgalı kenar).
- 2026-10-29 — Genel denetim: sw.js çevrimdışı hatası ve ayrı veri önbelleği, bildirimde Sünen adı, Âcurrî ad birliği, `index.json` `t/n` kesirli maddeleri sayar (6 kitaplık), `dogrula.py` yeni sened denetimleri + eş-Şerîa sened temizliği, 427 “ﷺ’e” ek düzeltmesi (Musannef), README yeniden yazıldı, ölü CSS silindi, manifest kısayolları.

- 2026-10-29 — Geri dönüş çubuğu: kitaba dışarıdan gelince üstte “‹ geldiği yer” çubuğu.
- 2026-10-29 — Râvi sayfası bütün kitaplıkları kapsıyor; yeni düzen (özet kutuları, kitap pilleri, katlanır listeler).
- 2026-10-29 — Râvi sayfası: “Rivayet aldıkları/verdikleri”, sîga dökümü, rol satırı, kütüphane senedde arama; ad eşleştirme sıkılaştırıldı.
- 2026-10-29 — Râvi sayfası eklendi (`ravi.json`, panelde ada dokununca); arama → kitap hayalet tıklaması düzeltildi.
- 2026-10-29 — Sünen yeni çeviriyle tamamlandı (5275). SPEC.md, râvi veritabanı, `dogrula.py`, PROGRESS.md kuruldu; Sünen'de ilk doğrulama: 0 hata, 106 uyarı.
