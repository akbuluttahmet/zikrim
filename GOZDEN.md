# Gözden geçirilecekler

Ahmet'in kendisinin bakacağı yerler: çeviri eksikleri, dinî/metin kararları ve araçların yakalayıp kendi başına karar veremediği maddeler. Oturumlar buraya **yalnız ekler**; bir maddeyi Ahmet kapatır (satırı siler ya da başına `✓` koyar). Mekanik kontrol listeleri `PROGRESS.md`'de, uzun notlar kitaba özel dosyalarda (`araclar/sunan/notlar.md`) kalır.

Biçim: `- [ ] kitaplık no — mesele. Seçenekler. (tarih)`

## 1. Karar bekleyen çeviri / isnad yerleri

- [ ] **leys 0** — Sümâme hadisinin sonundaki “sahih, müttefekun aleyh; Buhârî … Müslim …” tahric cümlesi nüshanın ana metnindedir (muhakkik dipnotu değil); çevrildi. Kitabın müellifi dışından (meclisi imlâ eden hâfızın) söz olduğu için çıkarılmasını istersen söyle. (2026-10-29)
- [ ] **leys 6** — `أن محبرا أخبره` adının harekesi nüshada yok; `Muhabber` yazıldı. Sözün kaynağı Re’sü’l-Câlût olduğu için SPEC §2'ye göre zincirin sonuna `kâle` ile yazıldı. (2026-10-29)
- [ ] **leys** — Ahmet'in gönderdiği Şâmile 1020 (İhsan Abbas, el-Arab fî Sıkılliyye) ve 367 (el-Muallimî, Kitâbü'ş-Şefâa) listedeki eserler değil; Zeyd Ferâiz / Râfi‘ / Hammâd için doğru adresler bekleniyor. (2026-10-29)
- [ ] **Yeni 9 eser — Şâmile bağlantıları** (`CLAUDE.md` “Eklenecek erken dönem eserleri”): listendeki bağlantılar metin olarak geldi, adresler ulaşmadı. Bulunanlar: Ukbe Müsnedi 30774, Sahîfetü Hemmâm 7776, Zührî Nâsih 26887, Fevâidü'l-Leys 9812, İbn Vehb el-Câmi‘ 1380, Müsnedü'ş-Şâfiî 9344 (DKİ; Sencer tertibi 9615 değil — hangisi istendiyse söyle). Bulunamayanlar: Zeyd b. Sâbit Ferâiz, Râfi‘ b. Hadîc hadis cüzü, Hammâd b. Zeyd cüzü, Zührî hadis cüzü — bu dördünün Şâmile adresini gönder. (2026-10-29)

- [ ] **seria 1927** — Arapça: `حدثنا أبو عبيد الله القرقساني، وقال ابن الفحام: عن غالب بن عبيد الله العقيلي`. İbnü'l-Fahhâm'ın yolunda hoca farklı adlanıyor (ya da farklı kişi). Şu an tek zincir + `n` notu. Seçenek: iki yollu tahvîl (`…; ayrıca … Gālib b. Ubeydullah el-Ukaylî → Atâ …`). (2026-10-29)
- [ ] **seria 1020** — `صاحب رسول الله ﷺ، قتيل البطحاء يوم الفتح، حزام المحدث` kaydı Hizâm'a mı, dedesi Hubeyş'e mi ait? `n`'ye "Hizâm adından sonra şu kayıt vardır" diye yorumsuz yazıldı. (2026-10-29)
- [ ] **seria 964** — `حدثت عن حليمة` → `unbi’tü`; `حدثني من سمع …` → "…’i işiten biri" halkasına `haddesenî`, Abdullah b. Ca‘fer'e `semi‘a`. Sîga seçimine bak. (2026-10-29)
- [ ] **seria 1180** — `ولم نكتبه إلا عنه، وكان أبي يسأل عنه` cümlesi Türkçede yoktu; metnin sonuna `İbn Ebî Dâvûd dedi ki: Onu ancak ondan yazdık; babam da onu sorardı.` eklendi. Yerini ve çeviriyi onayla. (2026-10-29)
- [ ] **seria 1938** — `—` tire gerçek bir notu ayırıyordu (`أخو يزيد بن جابر`): ad `Abdurrahmân (b. Yezîd) b. Câbir`, `n`: "…: Yezîd b. Câbir’in kardeşi." (2026-10-29)
- [ ] **sunan 394** — `k` erken: metin İbn Şihâb'ın sözüyle devam ediyor, matn daha sonra başlıyor; düzeltilmeli. (2026-10-29)
- [ ] **sunan 2236, 4301, 4427** — son halka eksik görünüyor (2236: son Ebû Ca‘fer, metin Âişe'den; 4301: son Yahyâ b. Câbir, metin Avf b. Mâlik; 4427: son İkrime, metin İbn Abbâs'tan). (2026-10-29)
- [ ] **sunan 2624** — zincirin Ya‘lâ → Saîd → İbn Abbâs kısmı Arapçada matn içinde; gözden geçir. (2026-10-29)
- ✓ **safii s01 163, 457, 493, 495, 505, 514, 515** — zincir sonundaki `→ Resûlullah ﷺ` halkası standarda geçişte kaldırıldı; 493 artık `İbn Uyeyne` (dogrula: hata yok). (2026-10-29)

- [ ] **12 kitaplık — sîga eşlemesi (2026-10-29)** — 14:18'deki toplu dönüştürmenin sîgaları Arapçaya göre yeniden eşlendi (`araclar/siga_hizala.py`). Arapçada lafzı bulunamayan 195 halka `an`/`kâle` aldı, 83 maddede hizalama belirsiz; liste `araclar/siga_hizala_rapor.md` (fezail 96+32, acurri 29+14, zuhd 18+9, ahmed 18+6, hallal 17+16, buhari 9+1, ibane 4+3, ibnebiseybe 3+1, ebudavud 1+1). Belirsiz olanlara bak; kalan "sîga sayısı uyuşmuyor" ve "k kelime ortasında" numaraları `PROGRESS.md`'de.
- [ ] **fezail — 614 Abdullah ziyâdesi** — Arapçası `حدثنا عبد الله` ile başlayıp `حدثني أبي` içermeyen maddelerde `c[0]` Ahmed b. Hanbel'den Abdullah b. Ahmed'e çevrildi (Müsned kararıyla aynı). Arapçası doğrudan hocayla başlayan 443 maddede (ör. f01 1: `قثنا سعد…`, nüshada Abdullah/babası öneki yok) `c[0]` Ahmed b. Hanbel bırakıldı; bu karar doğru mu? (2026-10-29)
- [ ] **ahmed m10 (Suâlâtü Ebî Dâvûd), m07–m09** — zincirler nüsha râvisiyle başlıyor (`أنا الحسين نا أبو داود نا موسى…`) ama `c[0]` Ahmed b. Hanbel yazılmış; Ahmed bu zincirde yok. Seçenek: `c[0]` kitabın derleyicisi (Ebû Dâvûd / el-Merrûzî / Sâlih / el-Meymûnî) ya da nüsha râvisi; `dogrula.py` `MUELLIF['ahmed']` buna göre genişler. (2026-10-29)
- [ ] **fezail 44 ve benzerleri ("metin son râviyle başlamıyor", ≈340)** — Arapça zincir `سمعت أبا جحيفة قال: سمعت عليا` ile Ali'ye kadar iniyor, sened Ebû Cuhayfe'de bitiyor; SPEC'e göre sözün kaynağı `kâle` ile zincire yazılmalı. Kitap kitap bakılacak (`dogrula.py <kitaplık> --hepsi`). (2026-10-29)
- [ ] **fezail f01 2** — `وكان من الثقات` (Ebû Muhammed el-Hazzâz hakkında) senedden atılmış, `n`'ye de yazılmamış; dönüştürmede düşen bu tür sened içi notlar başka maddelerde de olabilir. (2026-10-29)

## 2. Çeviri eksik ya da kısa olabilir (oran = Türkçe/Arapça uzunluğu)

- [ ] **fezail 1038** — oran 0,18 ve Türkçede 3 ﷺ eksik: çeviri büyük ihtimalle yarım. (2026-10-29)
- [ ] **sunan 518** (0,74), **2661** (0,66), **3810** (0,69). (2026-10-29)
- [ ] **12 kitaplık, oran < 0,75 (5; oran harekesiz Arapçaya göre):** ahmed m06 1 (0,74), 108 (0,71) · hallal h03 189 (0,71) · buhari b01 95 (0,74) · fezail 1038 (yukarıda). Önceki listedeki öteki maddeler harekeden kaynaklanan yapay uyarıydı. (2026-10-29)
- [ ] **musned (eski çeviri)** — oran harekesiz Arapçaya göre hesaplanınca yalnız m002 287 (0,67) kalıyor; önceki 143 uyarı harekedendi. Müsned baştan yapılacağı için orada çözülür. (2026-10-29)

## 3. Dinî / saygı ifadesi kontrolü

Arapçada `ﷺ` (صلى الله عليه وسلم) olup Türkçede eksik olanlar (dogrula.py "ﷺ eksik"); bazıları Arapça dijital nüshanın tekrarı olabilir, bazıları gerçekten düşmüş:

- [ ] **seria** 723, 888, 942.2, 997, 1059, 1098, 1133, 1182.1, 1502, 1503
- [ ] **ibnebiseybe** e01 66; e03 184, 185, 189, 385
- [ ] **acurri** a05 3
- [ ] **berbehari** 99
- [ ] **zuhd** z02 358, 360, 363 … (32 madde; `python3 araclar/dogrula.py zuhd --hepsi`)

Toplu düzeltme (2026-10-29): bütün kitaplıklarda `Resûlullah ﷺ’e` biçimindeki 427 ek, SPEC §1.5'e göre `Resûlullah’a ﷺ` biçimine çevrildi (Nebî’ye/’nin/’yi/’den, Resûlullah’a/’ın/’ı/’tan, Muhammed’e/’in/’i, Nebîsi’ne). Harf uyumunu birkaç yerde gözle doğrula (`grep -o "[^ ]* ﷺ" musannef/tr/k17.json | sort | uniq -c`).

## 4. Karar verilmiş, hatırlatma

- Zikir sayfasındaki “3 / 12” sayaçları (Genel · Sabah · Akşam düğmeleri, halka metni, grup başlıkları) tamamlanan/toplam **zikir sayısı**dır, tekrar hedefi değil; “/ 100” görünümünü andırdığı için istenirse “3 tamamlandı” biçimine çevrilebilir. (2026-10-29)
- Zikir başlıkları: `Salavat`, `Hz. Yûnus’un Duası`, `Hz. Îsâ’nın Duası`, `İhlâs Sûresi (Sabah)` gibi başlıklar CLAUDE.md'deki “başlık zikrin kendi lafzıdır” kuralının dışında; Kur'ân duaları için bilinçliyse kurala istisna yazılmalı. (2026-10-29)
- Hanbelî Fıkhı görünümü gizli (`#okumaNav hidden`); açılacak mı, kaldırılacak mı? (2026-10-29)

- `index.json` `t` ve `n` artık dosyadaki **bütün** maddeleri sayar (kesirli "Numarasız rivayet / ara metin" dâhil); 6 kitaplıkta 23 kayıt buna göre düzeltildi. Neşrin hadis sayısı farklıysa (`musned` `total` gibi) `SHELVES`'e yazılır. (2026-10-29)
- Müellif adı: veri `c[0]`, `dogrula.py`/`ravi_kur.py` `MUELLIF`, `script.js` `RAVI_MUELLIF` aynı olmalı (10 ad, `CLAUDE.md`). eş-Şerîa için `el-Âcurrî` seçildi. İmam Ahmed kitaplarında `c[0]`: Ahmed b. Hanbel, Abdullah ziyâdelerinde Abdullah b. Ahmed — Müsned de böyle yapılacak (`PROGRESS.md`). (2026-10-29)
- `maximum-scale=1` bilinçli bırakıldı (odak modunda kazara yakınlaştırma). (2026-10-29)
- `araclar/` çalışma dosyaları (cikti, parca, kaynak.json) GitHub Pages'ten indirilebilir durumda; sonraki oturumlar bu dosyalara ihtiyaç duyduğu için `.gitignore`'a alınmadı. Gizlenmesi istenirse yayın için ayrı dal/iş akışı gerekir. (2026-10-29)
- [ ] **musned 14** — Arapça seneddeki `- وسمعته من عبد الله بن أبي شيبة -` ara cümlesindeki `وسمعته` kelimesini `siga_hizala.py` ayrı bir sîga (`semi‘tü`) olarak kesiyor ve ilk halka olan `Abdullah b. Muhammed b. Ebî Şeybe`nin sîgasını `haddesenâ` yerine `an` yapıyor (`%` notuna işitme kaydı eklendi). Seçenekler: (a) `siga_hizala.py` içinde `- ... -` ara cümlelerini sîga kesiminden hariç tutmak, (b) mevcut hâliyle bırakmak. (2026-10-29)
- [ ] **musned 56** — Şâmile metninde `وَإِذَا حَدَّثَنِي غَيْرُهُ` yerine dizgi hatasıyla `غَيْرُي` yer alıyor; 2. hadisteki paralel rivayette `غَيْرُهُ` geçmektedir. Seçenekler: (a) Arapça metinde `غَيْرُهُ` olarak düzeltmek, (b) nüshaya dokunmadan bırakmak. (2026-10-29)
- [ ] **musned 69** — Şâmile metninde râvinin eksik bıraktığı cümle `أَلَسْتَ...` şeklinde üç noktayla dizilmiş; Türkçede üç nokta yasağı gereği `"Sen (şöyle olmaz mısın)?"` ile karşılandı. Seçenekler: (a) parantezli tamamlamayı korumak, (b) yalnız `"Sen…"` yazmak. (2026-10-29)
- [ ] **musned 78** — Senedde `حَدَّثَنِي فُلانٌ، وَفُلانٌ، فَعَدَّ سِتَّةً أَوْ سَبْعَةً كُلُّهُمْ مِنْ قُرَيْشٍ، فِيهِمْ عَبْدُ اللهِ بْنُ الزُّبَيْرِ` geçiyor; sened satırında son halka `filan ve filan` yazılıp açıklama `%` notuna alındı. Seçenekler: (a) mevcut hâliyle bırakmak, (b) son halkayı `Abdullah b. ez-Zübeyr` yapmak. (2026-10-29)
- [ ] **musned 120** — `حُمْرَةَ بْنِ عَبْدِ كُلالٍ` râvi adı `Humre b. Abdikülâl` olarak yazıldı. Seçenekler: (a) `Humre b. Abdikülâl`, (b) `Humre b. Abd Külâl`. (2026-10-29)
- [ ] **musned 141** — `قَالَ: أَنْبَأَنِي الْغَضْبَانُ بْنُ حَنْظَلَةَ` ibaresi 17 standart sîga içinde `enbe’enî` bulunmadığından `enbe’enâ` ile eşlendi. Seçenekler: (a) `enbe’enâ` olarak bırakmak, (b) `SPEC.md` sîga listesine `enbe’enî` eklemek. (2026-10-29)
