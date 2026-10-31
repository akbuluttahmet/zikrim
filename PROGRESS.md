# İlerleme ve açık işler

Her oturum: önce `SPEC.md`, sonra bu dosya. Bitince burayı güncelle (kitap, son numara, açık sorunlar). Bu dosya kısa kalır; uzun notlar `araclar/sunan/notlar.md` gibi kitaba özel dosyalara, Ahmet'in kendisinin bakacağı kararlar `GOZDEN.md`'ye gider.

## Durum

| Kitap | Standart | Durum | Not |
|---|---|---|---|
| Sünen-i Ebî Dâvûd (`sunan/`) | isnad standardı (SPEC) | **tamamlandı** — 40/40 bölüm, 5275 madde (2026-10-29) | `dogrula.py`: 0 hata, 106 uyarı (aşağıda) |
| eş-Şerîa (`seria/`) | isnad standardı (SPEC) | **tamamlandı** — 17/17 bölüm, 2169 madde (2026-10-29) | `dogrula.py`: 0 hata, 419 uyarı (265 müellif notu, 83 metin başı, 61 sîga, 10 ﷺ) |
| ez-Zühd (`zuhd/`) | isnad standardı (SPEC) | **tamamlandı** — 8/8 bölüm, 2375 madde (2026-10-29) | `dogrula.py`: 0 hata, 108 uyarı (68 metin başı, 32 ﷺ, 4 sîga, 4 k) |
| ez-Zühd ve’r-Rekāik (`mubarek/`) | isnad standardı (SPEC) | **sürüyor** — 288/1604 madde derlendi (p001–p016, 15 bab) (2026-10-31). İbnü’l-Mübârek (ö. 181). Şâmile 13028. | `dogrula.py mubarek`: 0 hata, 3 uyarı |
| Fezâilü’s-sahâbe (`fezail/`) | isnad standardı (SPEC) | **tamamlandı** — 9/9 bölüm, 1965 madde (2026-10-29) | `dogrula.py`: 0 hata, 154 uyarı (114 metin başı, 22 sîga, 16 k, 1 kısa) |
| İmam Ahmed (`ahmed/`) | isnad standardı (SPEC) | **tamamlandı** — 9/9 kitap, 2117 madde (2026-10-29) | `dogrula.py`: 0 hata, 76 uyarı (51 metin başı, 14 sîga, 9 k, 2 kısa) |
| el-Âcurrî (`acurri/`) | isnad standardı (SPEC) | **tamamlandı** — 12/12 kitap, 825 madde (2026-10-29) | `dogrula.py`: 0 hata, 62 uyarı (38 metin başı, 17 sîga, 5 k) |
| İbn Ebî Şeybe (`ibnebiseybe/`) | isnad standardı (SPEC) | **tamamlandı** — 2/2 kitap, 642 madde (2026-10-29) | `dogrula.py`: 0 hata, 26 uyarı (13 metin başı, 6 sîga, 5 ﷺ) |
| el-Hallâl (`hallal/`) | isnad standardı (SPEC) | **tamamlandı** — 7/7 kitap, 372 madde (2026-10-29) | `dogrula.py`: 0 hata, 38 uyarı (28 metin başı, 7 sîga) |
| eş-Şâfiî (`safii/`) | isnad standardı (SPEC) | **tamamlandı** — 1/1 kitap, 547 madde (2026-10-29) | `dogrula.py`: 0 hata, 5 uyarı |
| el-Buhârî (`buhari/`) | isnad standardı (SPEC) | **tamamlandı** — 3/3 kitap, 609 madde (2026-10-30): b03 Halku ef‘âli’l-ibâd, 302 madde | `dogrula.py --ravi`: 0 hata; nüshada numara yok, sırayla numaralandı; notlar `GOZDEN.md` |
| Sahîh-i Buhârî (`sahih/`) | isnad standardı (SPEC) | **sürüyor** — k01–k22, k26–k29, k31–k33 tamam (2026-10-31), 1603 madde. Açık: k23 cenâiz, k24 zekât, k25 hac, k30 savm, sonra k34. 97 kitaptan 29’u bitti | `dogrula.py sahih`: 0 hata, 193 uyarı. Şâmile 1681 |
| ed-Dârimî (`darimi/`) | isnad standardı (SPEC) | **d01 tamam** — er-Red ale’l-Cehmiyye, 397 madde (2026-10-30). Sıradaki: Nakzu’d-Dârimî (d02) | `c[0]` = ed-Dârimî; 163, 253, 388 nüshada yok; notlar `GOZDEN.md` |
| el-İbâne (`ibane/`) | isnad standardı (SPEC) | **tamam** — 22/22 bölüm (i01–i22), 3134 madde (2026-10-29) | `dogrula.py`: 0 hata, 163 uyarı |
| Şerhu usûli’l-i‘tikâd (`lalekai/`) | isnad standardı (SPEC) | **II. cüz sürüyor** — mukaddime + l01–l12, 584 madde (2026-10-31). l12: 544.1–614, 70 madde (yeni düzen: `araclar/lalekai/` kaynak_kur.py → kaynak/, ceviri/lNN.txt → derle.py; kılavuz `araclar/lalekai/kilavuz.md`). Sıradaki: l13–l38 (yarım çeviriler `araclar/lalekai/ceviri/`: l13, l24, l28, l29, l30). **l09–l11 yeniden yapılmalı**: Grok sürümünde başlık parçalarına gömülü numarasız rivayetler (İbnü’l-Mübârek, Vekî‘, Ahmed b. Hanbel başlıkları) ve ad listeleri çevrilmemiş, bazı `k` değerleri kaymış | `dogrula.py`: 0 hata. l20 ve l23 ikiye bölündü (l20b, l23b). Kerâmât anahtarları 3000+N (etiket “Kerâmât, no. N”) |
| Ebû Dâvûd (`ebudavud/`), Harb (`harb/`), el-Berbehârî (`berbehari/`) | isnad standardı (SPEC) | **tamamlandı** — 243 madde (2026-10-29) | `dogrula.py`: 0 hata, 1 uyarı (berbehari ﷺ) |
| Müsned (`musned/`) | isnad standardı (SPEC) | **sürüyor** — m001–m030 tamamlandı (1–7109): Hulefâ, Aşere, Aşere'den sonrakiler, Ehl-i beyt, Benî Hâşim, İbn Abbâs, İbn Mes‘ûd, İbn Ömer, Abdullah b. Amr, Ebû Rimse (2026-10-30). Sıradaki: Ebû Hüreyre (7110–10984; neşirde başında metinsiz numaralar var, birkaç bölüme bölünmeli) — `index.json`'a bölüm ekle, `kaynak_kur.py <OpenITI> <bölüm>` | `dogrula.py --ravi`: 0 hata; çevirmen notları `GOZDEN.md` |
| el-Musannef (`musannef/`) | isnad standardı (SPEC) | **tamamlandı** — 38/38 kitap, 37 914 madde (2026-10-30): eski 24 kitap panele geçirildi (16 352), kalan 14 kitap yeni çevrildi (21 562; OpenITI 9944 harekesiz Arapça) | `dogrula.py`: 0 hata, 1752 uyarı (1451 metin başı, 188 sîga, 104 k, 9 kısa); çevirmen notları `araclar/musannef/notlar.md` |
| Leys b. Sa‘d (`leys/`) | isnad standardı (SPEC) | **tamamlandı** — 1/1 kitap (Fevâidü'l-Leys), 8 madde (2026-10-29) | `dogrula.py --ravi`: 0 hata, 0 uyarı; paneller elle |
| ez-Zührî (`zuhri/`) | isnad standardı (SPEC) | **tamamlandı** — 2/2 kitap (en-Nâsih ve'l-mensûh 49, Tenzîlü'l-Kur’ân 118 madde) (2026-10-29) | `dogrula.py --ravi`: 0 hata, 0 uyarı; paneller elle |
| Hemmâm b. Münebbih (`hemmam/`) | isnad standardı (SPEC) | **tamamlandı** — 1/1 kitap (es-Sahîfe), 140 madde (2026-10-29) | `dogrula.py --ravi`: 0 hata, 0 uyarı; `k = 0` (Arapçada isnad yok) |
| Müsnedü Ukbe b. Âmir (`ukbe/`) | isnad standardı (SPEC) | **tamamlandı** — 1/1 kitap, 256 madde (2026-10-30). Şâmile 30774, İbn Kutluboğa cem‘i | `dogrula.py`: 0 hata, 27 uyarı (25 ﷺ isnadda, 2 kısa). Metin son râviyle başlar. `ravi_kur.py` tam ağaçta bir sonraki derlemede |
| İbn Vehb el-Câmi‘ (`ibnvehb/`) | isnad standardı (SPEC) | **tamamlandı** — 5/5 bölüm, 717 madde (2026-10-29) | `dogrula.py`: 0 hata; çeviri sözlükleri oturum dosyalarında |
| **Diğer 4 erken dönem eseri** (Zeyd b. Sâbit, Râfi‘ b. Hadîc, Müsnedü'ş-Şâfiî, Hammâd b. Zeyd; Zührî'nin hadis cüzü) | isnad standardı (SPEC) | **başlanmadı** — Ukbe bitti (2026-10-30) | `CLAUDE.md`; Şâmile numarası eksik olanlar `GOZDEN.md` |

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

Müsned dışındaki bütün kitaplıklar standarttadır (Musannef 2026-10-30'da tamamlandı). Kalan: **Müsned** — baştan çeviri, yukarıdaki kararlarla. Her kitapta: `kilavuz.md` uyarlanır → parti → `denetle.py` → derle → `dogrula.py --ravi` 0 hata → `ravi_kur.py` yenilenir → yayın. Yeni kitaplıkta müellif adı `MUELLIF`/`RAVI_MUELLIF`'e, nüsha öneği varsa `ONEK`'e eklenir.

## Eklenecek 9 erken dönem eseri — sıra önerisi

Küçükten büyüğe (OpenITI kelime sayısı): ~~Leys Fevâid~~ (bitti) → ~~Zührî Nâsih~~ (bitti) → ~~Sahîfetü Hemmâm~~ (bitti) → ~~Ukbe Müsnedi~~ (bitti, 256) → ~~İbn Vehb el-Câmi‘~~ (bitti) → Müsnedü'ş-Şâfiî (≈86 000; `safii/` s02). Şâmile numarası bulunamayanlar (Zeyd Ferâiz, Râfi‘ Hadîs, Hammâd Cüz, Zührî hadis cüzü) Ahmet bağlantıyı verince sıraya girer (`GOZDEN.md`). Her kitapta Sünen iş akışı: `kilavuz.md` uyarlanır → parti → `denetle.py` → derle → `dogrula.py --ravi` 0 hata → `ravi_kur.py` → yayın.

## 12 kitaplık — gözle bakılacak uyarılar (dogrula.py, 2026-10-29, sîga eşlemesinden sonra)

Hepsi: `python3 araclar/dogrula.py <kitaplık> --hepsi`. Sayılar yukarıdaki tabloda.

- **Sîga sayısı uyuşmuyor (78):** zuhd 813, 1658, 2320 · fezail 81, 128, 168, 253, 279, 347, 403, 619, 870, 1099, 1105, 1227, 1299, 1330, 1333, 1439, 1576, 1590 · ahmed m01 0, m04 0, 231, 249, 278, 390, 403, 435, 438, m06 10, m09 2, 3, 4, 168 · acurri a01 90.07, a02 10, 27, a04 16, a05 3, 45, a06 53, 64, a07 11, 38, 41, a10 75, 102, 118, a11 34, 60, 65 · ibnebiseybe e01 24, e02 29, 85, e03 91, 100 · hallal h02 1, 41, 54, h03 105, 170 · safii 0, 163 · buhari b02 86, 116 · ibane 12, 103, 124. Çoğu tahvîl, ortak lafız (`قالا: حدثنا`) ya da `k` sonrasına taşan zincir; gerçek kayma varsa `siga_hizala_rapor.md`'de de görünür.
- **`k` kelime ortasında (39):** zuhd 1191, 1564, 1795, 2230 · fezail 82, 490, 492, 620, 919, 996, 1274, 1282, 1364, 1429, 1436, 1509, 1529, 1625, 1722, 1839 · ahmed m03 30, 38, 39, 41, 52, 75, 105, m06 129, 182 · acurri a05 7, a09 62, a11 12, 29, 47 · ibnebiseybe e03 274, 327 · hallal h03 182, 207 · ibane 124. Son halkanın Arapçadaki yeri belirsiz; elle `k` ver.
- **Metin son râviyle başlamıyor (≈340):** çoğu anlatı rivayeti ya da sened satırında son halkanın eksik olması (ör. fezail 44: Arapça `سمعت عليا` ile Ali'ye kadar iner, sened Ebû Cuhayfe'de biter). SPEC §1'e göre sözün kaynağı zincire `kâle` ile yazılmalı; kitap kitap gözden geçirilecek.
- **Çeviri kısa olabilir (6), ﷺ eksik (41):** `GOZDEN.md`. Oran 2026-10-29'dan beri harekesiz ve önek düşülmüş Arapçaya göre hesaplanır (harekeli neşirlerde yapay uyarı veriyordu; Müsned 143 → 1).
- Sîga eşlemesinin kendi raporu: `araclar/siga_hizala_rapor.md` (195 lafzı bulunamayan halka, 83 belirsiz hizalama).

## Günlük

- 2026-10-31 — ez-Zühd ve’r-Rekāik (İbnü’l-Mübârek, mubarek/) p013–p016 derlendi (madde 220–293, 72 yeni madde, toplam 288/1604, 15 bab). dogrula.py mubarek: 0 hata, 3 uyarı.

- 2026-10-31 — ez-Zühd ve’r-Rekāik (İbnü’l-Mübârek, mubarek/) p009–p012 derlendi (madde 146–219, 72 yeni madde, toplam 216/1604, 10 bab). p010 179 cüz semâ kaydı ONEK’e işlendi. dogrula.py mubarek: 0 hata, 3 uyarı.

- 2026-10-31 — Sahîh-i Buhârî k08 salât (202), k10 ezân (309), k15–k22, k26–k29, k31–k33. Toplam 29 kitap, 1603 madde. `dogrula.py sahih`: 0 hata, 193 uyarı. Sıradaki: k23 cenâiz.

- 2026-10-31 — Sahîh-i Buhârî k02 îmân 31–58 ile tamam (68 madde). k03 ilim (90), k04 vudû (135), k05 gusül, k06 hayız, k09 mevâkît (89), k11 cum‘a, k12 havf. `dogrula.py sahih`: 0 hata. Sıradaki: k07.

- 2026-10-31 — Sahîh-i Buhârî, Kitâbü’l-Îmân 8–30 (31 madde, ara metinlerle). 13 ve 15 tahvîl. `dogrula.py sahih --ravi`: 0 hata, 26 uyarı. Kitap bitmeden yayın yok. Sıradaki: 31.

- 2026-10-31 — Sahîh-i Buhârî kitaplığı açıldı (`sahih/`). Şâmile 735 Beykûniyye şerhidir; kayıt 1681 (Züheyr, Dâru Tavki’n-Necât, Abdülbâkî numaraları). Buğâ mukaddimesi ve `[تعليق]` alınmadı; âyet parantezleri duruyor. Firebrî senedi bu nüshada yok. Kitâbü Bed’i’l-vahy (k01, 9 madde). `dogrula.py sahih --ravi`: 0 hata, 6 uyarı. Şüpheli yerler `GOZDEN.md`.

- 2026-10-30 — Lâlekâî II. cüz, l10 (Kur’ân, 131 madde, 354–520) ve l11 (tevakkuf, 21 madde, 520.1–544). l10’da 385 ve 500 senedindeki çöp adlar düzeltildi; 463, 465, 494 ve 510’un düşen zincirleri panele alındı. 520.1 Medine ehli (Hârûn el-Ferevî), 539.1 İbn Râhûye numarasız. Nüshada yok: 525, 534, 538, 539, 542. 535’in ikinci ad listesinin yüklemi nüshada yok. `dogrula.py`: 0 hata.

- 2026-10-30 — Lâlekâî II. cüz, l09 (tevhid, 27 madde). Giriş 326.1; 331 ve 346 tahvîl (`info.to`). 333’te isim bahsi 333.1. 335’e yapışık ikinci rivayet 335.1. Nüshada yok: 334, 336, 337. 327’nin 477 semâ kaydı zincire girmedi. Sözün kaynağı: 333’te cevaplayan Ömer, 353’te cevaplayan Muhammed b. Eslem `kâle` ile; 351’de Ahmed’e giden lafız `semi‘tü`, metin soruyu soran İbrâhîm’le başlar. `dogrula.py`: 0 hata.

- 2026-10-30 — Lâlekâî tahvîl maddeleri (31) metne yönlendirildi: `info.to`, “Bu senedin metni bir sonraki rivayettedir (no. N).”, “Metne git › No. N”. Art arda: 1 ve 2 → 3, 92 ve 93 → 94, 145 ve 146 → 147. Hepsi aynı babda; GOZDEN’e yeni madde yok. `dogrula.py` Lâlekâî 40 → 10 uyarı (metin başı 33 → 4, kısa 1 → 0); diğer kitaplıklar aynı (toplam 3578 → 3548, 0 hata).

- 2026-10-30 — Lâlekâî I. cüz, dört düzeltme: 61’de soruyu cevaplayan baba `kâle` ile durur (metin Mu‘temir’le başlar); 249’da kendi cevabını anlatan Abdürrezzâk’tır, İbrâhîm zincire girmez; 36’da «ولها» “ilgisini kesmesi” (metin bozuk değil); 102 ve 311 “Ebû Zur‘a”. Son halka, isnad sonundaki ada göre mekanik eklenmez: anlatıda sözün kaynağı (cevaplayan ya da kendi yaptığını anlatan) ayırt edilir.

- 2026-10-30 — el-Lâlekâî I. cüz düzeltmesi (335 madde). Sened: sözü söyleyen zincirin sonuna alındı (17, 22, 23, 24, 29, 33, 36, 158, 225, 249, 254, 286, 315); 61’den yanlış “babası” halkası çıktı; metin başı 128, 159, 196, 198, 303. 296.1 → 297, 310’dan 311 ayrıldı, 181 tahvîl. 41, 135, 277 nüshada yok. `dogrula.py`: `أنبا` = enbe’enâ; Lâlekâî uyarı 65 → 40 (sîga 25 → 1), diğer kitaplıklar aynı (0 hata).

- 2026-10-30 — el-Lâlekâî: Şerhu usûli i‘tikâdi Ehli’s-sünne (Şâmile 9200, Gâmidî, Dâru Taybe, 8. baskı; OpenITI 0418…9200) kitaplığı açıldı. Mukaddime ve I. cüz (l01–l08, 334 madde) çevrildi. l09–l38 index’te `t: 0`; Kerâmâtü’l-evliyâ numaraları 1’den yeniden başlar, bölüm adları “Kerâmât:” iledir. `ONEK` yok (her madde kendi `أخبرنا`sıyla başlar). `dogrula.py`: 0 hata, 65 uyarı (sîga uyarılarının çoğu `أنبا`nın sayılmamasından; 97 ve 158/226 tahvîlde yanlış alarm). Şüpheli yerler `GOZDEN.md`.

- 2026-10-30 — Müsnedü Ukbe b. Âmir (Şâmile 30774, İbn Kutluboğa cem‘i, `ukbe/`, 256 madde) eklendi. Metin son râvinin adıyla başlar (`dogrula.py`: 0 hata, 27 uyarı). Kütüphane, akış, günün rivayeti ve arama güncellendi. `ravi.json` tam derleme bekliyor (bütün kitaplıklar yerindeyken `ravi_kur.py`). Çevirmen notu: 36, 42, 43, 44, 50, 81, 104, 121, 139, 140, 143, 157, 170, 172, 185, 207, 215, 225, 232, 240, 246, 251 senedinde boş halka düşmüş olabilir; 239’un panel senedi bozuk, zincir metindedir (`GOZDEN.md`).

- 2026-10-30 — el-Buhârî: Halku ef‘âli’l-ibâd (Şâmile 9697, b03) eklendi. OpenITI nüshasında “N -” yok; 302 madde sırayla numaralandı. `dogrula.py buhari --ravi`: 0 hata. Çevirmen notları `araclar/buhari/gozden/`, özet `GOZDEN.md`.

- 2026-10-30 — Musannef tamamlandı: çevrilmemiş 14 kitap (Tahârât, Sıyâm, Zekât, Cenâiz, Hac, Nikâh, Talâk, Büyû‘, Akîka, Diyât, Hudûd, Ferâiz, Fezâil, Siyer; 21 562 madde) `araclar/musannef/` iş akışıyla (kaynak_kur → hazirla → 365 parça → denetle → derle) SPEC standardında çevrildi ve kitap kitap yayımlandı. Çevirmenlerin şüpheli yer notları `araclar/musannef/notlar.md`; özet `GOZDEN.md`.

- 2026-10-29 — Musannef râvi paneli standardına geçirildi: `standarda_getir.py musannef` (nüsha senedi → `n`), `siga_hizala.py musannef` (10 380 panel; 1 035 halka lafızsız, rapor oturum dosyasında), 9 sened hatası elle düzeltildi; `c[0] = İbn Ebî Şeybe` (`dogrula.py`, `ravi_kur.py` MUELLIF; ONEK `حدثنا أبو بكر قال:`). Kalan 14 kitabın kaynağı `araclar/musannef/kaynak.json` (OpenITI 9944, harekesiz).

- 2026-10-30 — Müsned: Abdullah b. Amr b. el-Âs Müsnedi (m029, 6477–7103, 627) ve Ebû Rimse Hadisi (m030, 7104–7109, 6) çevrildi. `kaynak_kur.py`: numaradan sonra gelen dipnot işareti (“6885 (1) -”) ve “آخر مسند …” bölüm sonu kayıtları. Sözlüğe 250 ad eklendi.
- 2026-10-30 — Müsned: İbn Ömer Müsnedi iki bölümde (m027 4448–5462, m028 5463–6476; 2029 madde) çevrildi. OpenITI 25794 sparse klonla alındı (raw.githubusercontent kapalı). `derle.py` → `muellif_sec`: “قرأت على أبي قرة” (İmam Ahmed'in okuması) hariç tutuldu; “قال [عبد الله بن أحمد]: قرأت على أبي” ve işaretsiz vicâde tanınıyor. `siga_hizala.py` 44 maddede çevirmenin sîgalarını bozduğu için onlar geri yüklendi (GOZDEN). Sözlüğe 497 ad eklendi.
- 2026-10-30 — Müsned: İbn Mes‘ûd Müsnedi (900) çevrildi; “قرأت على أبي” kuralı (`derle.py`, `siga_hizala.py`, kılavuz).
- 2026-10-30 — Müsned: Talha'dan Abdullah b. Ca‘fer'e 15 bölüm (1381–1762, 382 madde) çevrildi ve yayımlandı; `kaynak_kur.py` sıra hatasını ve çift ziyâde işaretini düzeltir, yeniden çalıştırınca parça adlarını korur.
- 2026-10-30 — Müsned: Ömer (208–398), Osman (399–561) ve Ali (562–1380) müsnedleri çevrildi ve yayımlandı (toplam 1380). Ali'nin Arapçası OpenITI 25794 harekesiz (`araclar/musned/kaynak_kur.py`). Yeni kurallar: vicâde sîgası `vecedtü`; “babası ve X” hoca kutusu; `dogrula.py` → `ONEK['musned']` Abdullah öneğini düşer. Sözlüğe 590 ad eklendi.
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
