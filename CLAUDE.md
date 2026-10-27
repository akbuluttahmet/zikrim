# Sekîne — çalışma notu

Bu repoda çalışan her oturum (Claude Code, başka sohbetler) bu kurallara uyar. Kurallar Ahmet'indir; değiştirmeden önce ona sor.

## Uygulama

- **Sekîne**: Zikir sayacı, hadis kütüphanesi (Musannef ve İbn Ebî Şeybe’nin küçük kitapları, Müsned, Usûlü's-Sünne, ez-Zühd, Fezâilü's-sahâbe ve İmam Ahmed'in diğer risaleleri, Şerhu's-Sünne, el-Âcurrî, el-Hallâl), Sözler ve Hanbelî fıkhından oluşan, telefonun ana ekranına eklenen bir PWA. Adres: https://akbuluttahmet.github.io/zikrim/ (GitHub Pages, `main` dalı).
- Derleme adımı yok, düz HTML/CSS/JS: `index.html`, `script.js`, `style.css`, `fikih.js`, `usul.js`, `sw.js`, `manifest.webmanifest`.
- Veriler: `musannef/` ve `musned/` (her biri `index.json` + `tr/*.json`), `ibnebiseybe/`, `ahmed/`, `zuhd/`, `fezail/`, `hallal/`, `acurri/`, `seria/`, `berbehari/`, `gunun.json` (ana sayfadaki “Rivayetler” kartının havuzu, bütün kitaplıklardan), `akis.json` (Akış sekmesinin havuzu; isnad ve bab başlığıyla).
- **Yedek:** Ayarlar → Yedeği kaydet; zikir durumu (`zikrim-v2`) en üst düzeyde, adı `zikrim-` ya da `sekine-` ile başlayan diğer bütün anahtarlar `_ek` içinde. Yeni bir anahtar bu öneklerden biriyle adlandırılırsa kendiliğinden yedeğe girer. Yüklemede veriler tamamen değiştirilir, sayfa yenilenir, bildirimdeki “Geri al” önceki hâli geri getirir.
- **Adres ve `localStorage` anahtarları (`zikrim-…`) değiştirilmez.** Değişirse kullanıcının verileri (sayaçlar, seri, kayıtlar) kaybolur. Uygulamanın adı Sekîne olsa da repo/klasör adı `zikrim` kalır.
- Her yayında `sw.js` içindeki `CACHE = 'zikrim-vNN'` bir artırılır. Bunu `araclar/yayinla.sh "mesaj"` yapar; önce `git pull --rebase` ile başka oturumların değişikliklerini alır.
- Aynı anda iki oturum çalışıyorsa işi bölün (ör. biri Müsned, biri Musannef). Push reddedilirse `git pull --rebase` yapın; `sw.js` çakışmasında uzak sürümü alıp sürüm numarasını bir artırın.

## Çeviri kuralları (en önemli kısım)

1. **Tam ve aslına sadık çeviri.** Özetleme, kısaltma ya da atlama yok. Uzun rivayetler de baştan sona çevrilir.
2. **Asla yorum eklenmez.** Açıklama, şerh, değerlendirme, hüküm, "yani şu demek" türü eklemeler yok. Sadece eserin kendisinde olan çevrilir; başka eserlerden bilgi getirilmez.
3. **İzin verilen tek not, bozuk ya da eksik metin notudur.** Kalıpları:
   - `(metinde böyle)`: okunabiliyor ama anlamı bozuk ya da şüpheli.
   - `(metin bu kelimede bozuktur)`
   - `(metin bu kısımda bozuktur)` / `(metin burada bozuktur)`
   - Bozuk yer okunabildiği kadar çevrilir; okunamayan kısım `…` ile gösterilip not düşülür.
4. **`(?)` işareti asla kalmaz.** Şüpheli yer ya Arapçasına bakılarak düzgün çevrilir ya da yukarıdaki notlardan biri yazılır. `python3 araclar/kontrol.py` bunu yakalar.
5. Anlamı tamamlamak için eklenen kelimeler parantez içinde yazılır: `(Allah’a) sığındı`. Bu yorum sayılmaz; sadece cümlenin Türkçede eksik kalan öğesidir.
6. Saygı ifadeleri:
   - Nebî / Resûlullah'tan sonra `ﷺ`.
   - Diğer peygamberler için `(aleyhisselâm)`.
   - İmam Ahmed'in adı geçtiği kaynak ve başlıklarda `(رحمه الله)`.
   - Müsned bölüm başlıklarında sahâbîye `(radıyallâhu anh)`, nüshadaki "رضي الله عنه"a uygun olarak.
7. Âyetler tırnak içinde çevrilir ve sonuna yeri yazılır: `(Hac 22/39)`.
8. Yazım:
   - Özel adlarda ‘ayn için `‘`, hemze için `’`, uzatmalar `â î û`: Ebû, Ebü’l-, b. (bin), Abdullah, Süfyân, İbn Abbâs.
   - Tırnaklar `“ ”`, iç tırnak `‘ ’`.
   - Kalıp ifade: وذكر أن أبا حنيفة قال → `Ebû Hanîfe’nin ise: «…» dediği zikredildi`.
9. **Sened** Türkçe ve oklarla yazılır: `Vekî‘ → A‘meş → Ebû Vâil → Abdullah`. Kitap başındaki nüsha zinciri (Bakī b. Mahled / Ebû Abdurrahmân …) senedde korunur. Metin, sözü söyleyenle başlar: `Abdullah dedi ki: …`.
10. Numaralar neşre göredir. Dijital nüshadaki açık sıra hataları (ör. 33771 ile 33774 arasında 32772) sıraya göre düzeltilir.

## Kaynaklar

- **Musannef:** İbn Ebî Şeybe, Kemâl Yûsuf el-Hût neşri (Riyad: Mektebetü’r-Rüşd, 1409); Şâmile no. 9944.
- **İbn Ebî Şeybe’nin küçük kitapları:** Veri `ibnebiseybe/` klasöründe (`index.json` + `tr/eNN.json`), OpenITI `0235IbnAbiShayba.*` kopyalarından. e01 Halku Âdem ve vilâdetü’n-Nebî ﷺ (OpenITI ShamAY0032908; dijital nüsha yer yer bozuk, 1 numaranın başı eksik), e02 Kitâbü’l-Îmân (Şâmile 7767; 0 = nüsha senedi; numarasız devam satırları önceki maddeye eklendi), e03 Kitâbü’l-Edeb (Şâmile 638; 0 = nüsha senedi; numaralar nüshaya göre). İçerikleri büyük ölçüde Musannef’teki aynı adlı kitaplarla örtüşür; yine de ayrı eser olarak eklenir.
- **Müsned:** İmam Ahmed, Şuayb el-Arnaût tahkiki, Müessesetü’r-Risâle (1421/2001); Şâmile no. 25794. Tahkik dipnotları alınmaz.
- **Şerhu’s-Sünne (el-Berbehârî):** Şâmile no. 8601, OpenITI kopyası `0329Barbahari.SharhSunna.Shamela0008601-ara1`. Veri `berbehari/` klasöründe; mukaddime (0) ve 156 madde. Köşeli parantez [ ] neşrin eklemeleridir; Türkçede de korunur.
- **el-Âcurrî kitapları:** Veri `acurri/` klasöründe (`index.json` + `tr/aNN.json`), OpenITI `0360Ajurri.*` kopyalarından.
  - a01 Ahlâku Ehli’l-Kur’ân: Şâmile no. 10531 (Dârü’l-Kütübi’l-İlmiyye neşri). Sonundaki “mülhak” kısmı ayrı bab olarak 90.01–90.11 anahtarlarıyla eklidir.
  - a02 el-Erbaûn: Şâmile no. 8204. Mukaddime (0) ve 45 hadis; her hadisin ardındaki şerh, hadisle aynı maddededir.
  - a03 Mes’eletü’t-tâifîn (Şâmile 6233), a04 Edebü’n-nüfûs (8245), a05 Fazlu kıyâmi’l-leyl ve’t-teheccüd (12746), a06 Tahrîmü’n-nerd ve’ş-şıtranc ve’l-melâhî (8222), a07 Zemmü’l-livât (9512), a08 Ahbâru Ömer b. Abdilazîz (6650; numara yok, her rivayet sırayla numaralandı), a09 el-Gurabâ (13045; nüshada düşmüş 1 ve 2 numaraları verildi, 63’ün ortasındaki sahte “1 -” işareti kaldırıldı), a10 el-Fevâidü’l-müntehabe (OpenITI ShamAY0032929; 0 = rivayet ve semâ kayıtları), a11 Farzu talebi’l-ilm (OpenITI ShamAY0033657; 0 = rivayet ve semâ kayıtları; nüshadaki okunamayan yerler “(metin … bozuktur)” ile belirtildi), a12 Ahlâku’l-ulemâ (1311; nüshada numara yok, rivayetler ve Âcurrî’nin sözleri sırayla numaralandı). Numaralar nüshadaki “N -” işaretlerine göredir; 0 = nüsha senedi ve giriş.
  - `info` alanında `{l: "…"}` varsa uygulama numara yerine bu etiketi gösterir (ör. “Numarasız rivayet”, Suâlât’taki alt numaralar “No. 29a”).
  - Kesirli numaralar (ör. 21.1) rivayetler arasındaki Âcurrî’nin kendi sözleridir; uygulamada “Ara metin” diye görünür. 0 = mukaddime.
- **eş-Şerîa (el-Âcurrî):** Şâmile no. 13035 (5 cilt), OpenITI `0360AbuBakrAjurri.Sharica.Shamela0013035-ara1`. Veri `seria/` klasöründe, 17 konu bölümüne ayrılmış (`s01.json`…`s17.json`); kitap tamamlandı. Numaralar dijital nüshadaki “N -” işaretlerine göredir; nüshada numarasız birleşmiş rivayetler eksik numaralara bölünmüş, bulunmayan numaralar atlanmıştır. Kesirli anahtarlar (ör. 35.1) bab başındaki Âcurrî’nin sözleri ya da numarasız kısımlardır; aynı numaradan sonra 9’dan fazla kesirli madde varsa iki hane kullanılır (ör. 2033.01–2033.29). Maddesi olmayan kitap başlıkları bir sonraki babın başlığına “—” ile eklenmiştir. s01'in derleme betiği oturum dosyalarındadır (pre_sh.py → sh2.json, build_sh.py); s02–s17 Node betikleriyle (pre.js → items.json, chunk.js, build.js) derlenmiştir.
- **İmam Ahmed’in risaleleri ve mesâili:** Veri `ahmed/` klasöründe (`index.json` + `tr/mNN.json`), OpenITI `0241IbnHanbal.*` kopyalarından. m01 el-Esrem’in Sorularından (Şâmile 25873; nüshadaki “889” sıra hatası 88 yapıldı), m02 el-Akîde, Hallâl rivayeti (6498) uygulamadan çıkarıldı (veri dosyası ve `index.json` kaydı silindi). Bu kitaplıkta kaydedilenlerin anahtarı `ahmed:<sıra>:<no>` olduğundan sonraki kitapların sırası bir kaydı; `script.js`'teki bir kerelik geçiş (`zikrim-ahmed-akide`) eski kayıtları, kaldığın yeri ve açık kitabı yeni sıraya çevirir, el-Akîde kayıtlarını siler. Bundan sonra da kitaplıktan kitap çıkarılırsa aynı geçiş yazılmalıdır. Dosya adları değişmedi (m03…m10). m03 Ahkâmü’n-nisâ (95563), m04 el-Esâmî ve’l-künâ, Sâlih rivayeti (5780; 156 numara nüshada yok), m05 er-Red ale’l-Cehmiyye ve’z-zenâdıka (7623; nüshada numara yok, her başlık altı bir madde; neşrin metne karışmış dipnot rakamları Arapçadan silindi), m06 el-Eşribe (12995; numaralar nüshaya göre); m07–m09 İlel ve ricâl hakkındaki sözlerinden (6044): nüsha üç rivayetten oluşur ve her biri kendi numarasıyla başlar, bu yüzden üç ayrı kitap olarak eklendi — m07 el-Merrûzî rivayeti (nüshadaki “24 - 9” işareti 249 yapıldı), m08 Sâlih’in mesâilinden (nüshada 2–5 yok; 16’nın ortasındaki “149 - 151” işareti metnin devamıdır), m09 el-Meymûnî rivayeti; m10 Suâlâtü Ebî Dâvûd (5945; numaralar nüshadaki “[N]” işaretlerine göre; “[29 أ]” gibi alt numaralar 29.1… anahtarlarıyla ayrı madde, uygulamada “No. 29a”; numarasız paragraflar iki haneli kesirli anahtarla “Numarasız rivayet”; yazma nüshanın varak işaretleri “[1 ب]” silindi; ikinci [79] 89, [504 أ] 405a yapıldı; satır ortasında kalan [326], [346], [487] ayrı madde yapıldı; kitabın sonundaki muhakkik giriş yazısı alınmadı, neşrin Târîhu Bağdâd’dan derlediği 571–595 “Ek” bablarında). Kaynak satırında `İmam Ahmed (رحمه الله)`.
- **ez-Zühd (İmam Ahmed):** Şâmile no. 8494 (Dârü’l-Kütübi’l-İlmiyye neşri), OpenITI `0241IbnHanbal.Zuhd.Shamela0008494-ara1`. Veri `zuhd/` klasöründe, bablarına göre 8 bölüme ayrılmış (`z01.json`…`z08.json`). Numaralar nüshadaki “N -” işaretlerine göredir (1–2368); 1 = nüsha senedi. Nüshada aynı numaranın ikinci kez yazıldığı yerler (43, 75, 86, 181, 183, 221, 463, 509, 514, 545, 573) aynı rivayetin devamıdır, tek maddede birleştirildi. Nüshada numarası olmayan ayrı rivayetler kesirli anahtarla (ör. 849.1) “Numarasız rivayet”; sayfa sonunda bölünmüş sened/metin parçaları önceki maddeye eklendi. İlk babın başlığı nüshada yoktur (“Kitabın başı”).
- **Fezâilü’s-sahâbe (İmam Ahmed):** Şâmile no. 13136 (Vasiyyullah Abbas tahkiki, Müessesetü’r-Risâle), OpenITI `0241IbnHanbal.FadailSahaba.Shamela0013136-ara1`. Veri `fezail/` klasöründe, bablarına göre 9 bölüme ayrılmış (`f01.json`…`f09.json`). 0 = nüsha senedi; numaralar nüshaya göredir (1–1962). 128’in yanındaki “bu hadisler Ebû Bekir b. Mâlik’in…” notu 128’in metnindedir; numarasız rivayetler (372.1, 1279.1) kesirli anahtarla. Başlıktaki “فضائل 0 أهل اليمن” sıfırı silindi.
- Bu iki kitabın derleme betikleri oturum dosyalarındadır (pre33.js → z/f.items.json, chunk33.js, build33.js; bölümler sec.json’da).
- **el-Hallâl:** Veri `hallal/` klasöründe. h01 el-Kırâe inde’l-kubûr (Şâmile 8271); nüshada numara yok, rivayetler sırayla numaralandı. h02 el-Hass ale’t-ticâre ve’s-sınâa ve’l-amel (8213; numaralar nüshaya göre). h02 el-Hass ale’t-ticâre ve’s-sınâa ve’l-amel (8213; numaralar nüshaya göre), h03 el-Emr bi’l-ma‘rûf ve’n-nehy ani’l-münker (8248; nüshada numara yok, rivayetler sırayla numaralandı).
- Arapça metinler Şâmile'deki aynı neşirden aynen alınır. Toplu metin için OpenITI GitHub kopyaları kullanılabilir (`raw.githubusercontent.com/OpenITI/...`).

## Veri biçimi

- `musannef/index.json`, `musned/index.json`: kitap/bölüm listesi `{f, tr, n, b?, from, to, t, g?}`. `n` toplam, `t` çevrilmiş rivayet sayısıdır; `t` 0 ise kitap kapalı görünür.
- `tr/kNN.json` / `tr/mNNN.json`: `{"babs":[{"t":"Bab başlığı","h":[ … ]}]}`
- Her rivayet **6 alanlı** bir dizidir: `[no, "sened (oklu)", "Türkçe metin", ziyade, info, "Arapça metin"]`.
  - `ziyade`: Müsned'de neşirdeki işarete göre 1 (`*`), 2 (`•`; Abdullah b. Ahmed ziyâdesi) ya da 3 (`°`; Abdullah'ın babasının kitabında bulduğu, vicâde); diğerlerinde 0.
  - `info`: Müsned râvi paneli `{c:[isim, sîga, isim, …], n:[metindeki notlar]}`; Musannef'te `null`.
  - Arapça metin harekelidir, Şâmile'den aynen alınır; sened dahil tam metindir.
  - **Bir kitabı yeniden derlerken Arapça (6.) alan kaybedilmez.** Eski derleme betikleri 3 alan yazıyordu; kullanılırsa Arapça mevcut dosyadan geri eklenmelidir.
- Bab başlığı boşsa uygulama "Kitabın başı" yazar.

## İş akışı

1. Arapça kaynağı al. Çeviriyi `N | sened | metin` satırları ve `@ Bab başlığı` satırlarıyla yaz; metin içinde satır sonu için `\n` kullan. JSON'a dönüştür (6 alan), `index.json`'da `t`'yi güncelle.
2. `python3 araclar/kontrol.py`: sayı, tekrar, sıra, `(?)`, boş metin ve alan sayısını denetler.
3. Yeni kitaptan sonra `python3 araclar/gunun.py` ile “Rivayetler” havuzunu, `python3 araclar/akis.py` ile Akış havuzunu yenile.
4. `araclar/yayinla.sh "Musannef: Kitâbü’l-… tamamlandı (N/N)"`
5. Commit mesajları Türkçe ve kısa olur; ne eklendiği ve kaç rivayet olduğu yazılır.

## Arayüz notları

- Varsayılan tema Klasik; ana sayfa kartı en üstte her açılışta farklı bir zikir (kullanıcının listesinden; “Zikret” sayacı açar, “↻” değiştirir; son gösterilen `zikrim-hz` anahtarında), üç halka (Sabah · Akşam · Genel), “Rivayetler” kartı (açılışta bütün kitaplıklardan önce kitaplık, sonra rivayet rastgele seçilir; “↻ Başka rivayet” ile değiştirilir, ☆ ile kaydedilir) ve kaldığın yerden oluşur.
- Zikirlerin sırası kullanıcı tarafından değiştirilemez.
- Alt sekme çubuğu: Zikir (ana sayfa; Sabah · Akşam · Genel) · Akış · Kütüphane (raf, bütün kitaplar, Kaydettiklerim) · Sözler. Görünümün sekmesi `tabOf()` ile bulunur; yeni bir görünüm eklenirse oraya da yazılır. Sekmeler arası geçişte her sekmenin görünümü ve kaydırma yeri hatırlanır, kitaplarda en son okunan rivayete dönülür; açık sekmeye dokununca köke, köktaysa en üste gidilir. Klavye açıkken (`body.kb`) ve odak modunda çubuk gizlenir. Alttaki sabit öğeler (bildirim, sesli okuma çubuğu, başa dön) `--tabb` tabanına göre konumlanır.
- Akış (`#feed`): kendi havuzu `akis.json`'dır (`araclar/akis.py` üretir; ≈23.000 rivayet, ≈2 MB sıkıştırılmış; service worker önbellekten okur, her yayında bir kez indirir). Seçim: bütün çevrilmiş rivayetler (merfû, mevkûf, maktû, âlim sözleri); bozuk metin notu olanlar, “benzeri / aynısını / bu hadisi zikretti” gibi tek başına anlamsız göndermeler, 40 karakterden kısa parçalar, nüsha senedi maddeleri ve standart ekrana (390×844) sığmayanlar girmez. Sığma hesabı tarayıcıda ölçülen kart düzeninden ayarlıdır; kart tasarımı değişirse `akis.py`'deki `KAR`/`SATIR` sabitleri yeniden ayarlanmalıdır. **İsnad yalnızca Akış'ta gösterilir; `gunun.json` ve ana sayfa kartı isnadsız kalır.** Rivayetler oturum başında karıştırılır, tam ekran kartlarla yukarı kaydırılarak (scroll-snap) okunur; aynı rivayet tekrar çıkmaz. Kart düzeni (D şablonu): üstte isnad zinciri (râviler yukarıdan aşağı, son halka vurgulu), altında metin, en altta kaynak ve bab. Üstte kitap filtresi (Hepsi · Müsned · Musannef · …; seçim `zikrim-akis-filtre`'de). Çift dokunuş kaydeder (çıkarmaz), yıldız belirir ve hafif titreşir. Ekrana sığmayan kart (isnadıyla birlikte) çizildikten sonra ölçülüp atlanır. Kartta ☆ kaydet, 📖 kitapta aç ve 📸 görüntü vardır; akışta sesli okuma yoktur. 📸 önizlemeli bir sayfa açar: boyut Gönderi 4:5 / Story 9:16, zemin Tema / Kâğıt / Lacivert / Kitap rengi (raftaki kapak rengi); seçim `zikrim-akis-gorsel`'de (`shotCanvas`, `shareCanvas`). Kart ekrana oturunca isnad halkaları sırayla belirir (hareket azaltma ayarında animasyonsuz) ve kullanıcı kaydırdıysa hafif titreşir. Kartlara yorum, beğeni ya da sayaç eklenmez.
- Kaydettiklerim'de koleksiyonlar: adlar `zikrim-koleksiyonlar`'da, bir kaydın koleksiyonları kaydın kendisinde (`c` dizisi). Üstte etiketlerle süzülür, her kayıtta 📁 düğmesi; kaydedince çıkan bildirimde “Koleksiyona ekle”. Koleksiyon silinince kayıtlar kalır.
- Geri tuşu (Android) ve tarayıcı geri hareketi: her görünüm değişimi `navRecord()` ile geçmişe yazılır (`renderCards` içinde), `popstate` bir önceki görünüme döner; odak modu da geri tuşuyla kapanır. Android'de klavye geri tuşuyla kapatılınca `visualViewport` yüksekliğinden anlaşılır ve alt çubuk geri gelir. Ayarlardaki anahtarlar (`input[switch]`) desteklemeyen tarayıcılarda `.no-switch` ile CSS'ten çizilir.
- Kütüphane “raf” düzenindedir: asırlara göre raflar, kitaplar renkli kapak (Arapça adı + ilerleme çubuğu). Yeni kitap `SHELVES` dizisine eklenir.
- Rivayetlerde Arapça metin önce, kâğıt renkli kutuda Amiri yazı tipiyle gösterilir (sened ince, metin kalın); altında Türkçe sened ve metin. Ses düğmeleri küçük ▶ simgeleridir. Ayarlardan Arapça metin ve ▶ düğmeleri gizlenebilir. Amiri `fonts/` klasöründedir (OFL).
- Sesli okuma telefonun kendi sesleriyle yapılır (Web Speech API).
  - Erkek ve yüksek kaliteli sesler önceliklidir: Arapça Majed, Türkçe Cem. Yelda listede gösterilmez.
  - Telefonun gösterdiği ses listesinde ses yoksa, okuma telefonun ayarlarında o dil için seçili sesle yapılır.
