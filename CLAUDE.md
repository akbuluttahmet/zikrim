# Sekîne — çalışma notu

Bu repoda çalışan her oturum (Claude Code, başka sohbetler) bu kurallara uyar. Kurallar Ahmet'indir; değiştirmeden önce ona sor.

## Uygulama

- **Sekîne**: Zikir sayacı, hadis kütüphanesi (Musannef ve İbn Ebî Şeybe’nin küçük kitapları, Müsned, Usûlü's-Sünne ve İmam Ahmed'in diğer risaleleri, Şerhu's-Sünne, el-Âcurrî, el-Hallâl), Sözler ve Hanbelî fıkhından oluşan, telefonun ana ekranına eklenen bir PWA. Adres: https://akbuluttahmet.github.io/zikrim/ (GitHub Pages, `main` dalı).
- Derleme adımı yok, düz HTML/CSS/JS: `index.html`, `script.js`, `style.css`, `fikih.js`, `usul.js`, `sw.js`, `manifest.webmanifest`.
- Veriler: `musannef/` ve `musned/` (her biri `index.json` + `tr/*.json`), `ibnebiseybe/`, `ahmed/`, `hallal/`, `acurri/`, `seria/`, `berbehari/`, `gunun.json` (ana sayfadaki “Rivayetler” kartının havuzu, bütün kitaplıklardan).
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
- **İbn Ebî Şeybe’nin küçük kitapları:** Veri `ibnebiseybe/` klasöründe (`index.json` + `tr/eNN.json`), OpenITI `0235IbnAbiShayba.*` kopyalarından. e01 Halku Âdem ve vilâdetü’n-Nebî ﷺ (OpenITI ShamAY0032908; dijital nüsha yer yer bozuk, 1 numaranın başı eksik), e02 Kitâbü’l-Îmân (Şâmile 7767; 0 = nüsha senedi; numarasız devam satırları önceki maddeye eklendi). İçerikleri büyük ölçüde Musannef’teki aynı adlı kitaplarla örtüşür; yine de ayrı eser olarak eklenir.
- **İbn Ebî Şeybe’nin küçük kitapları:** Veri `ibnebiseybe/` klasöründe (`index.json` + `tr/eNN.json`), OpenITI `0235IbnAbiShayba.*` kopyalarından. e01 Halku Âdem ve vilâdetü’n-Nebî ﷺ (OpenITI ShamAY0032908; dijital nüsha yer yer bozuk, 1 numaranın başı eksik), e02 Kitâbü’l-Îmân (Şâmile 7767; 0 = nüsha senedi; numarasız devam satırları önceki maddeye eklendi). İçerikleri büyük ölçüde Musannef’teki aynı adlı kitaplarla örtüşür; yine de ayrı eser olarak eklenir.
- **İbn Ebî Şeybe’nin küçük kitapları:** Veri `ibnebiseybe/` klasöründe (`index.json` + `tr/eNN.json`), OpenITI `0235IbnAbiShayba.*` kopyalarından. e01 Halku Âdem ve vilâdetü’n-Nebî ﷺ (OpenITI ShamAY0032908; dijital nüsha yer yer bozuk, 1 numaranın başı eksik), e02 Kitâbü’l-Îmân (Şâmile 7767; 0 = nüsha senedi; numarasız devam satırları önceki maddeye eklendi). İçerikleri büyük ölçüde Musannef’teki aynı adlı kitaplarla örtüşür; yine de ayrı eser olarak eklenir.
- **Müsned:** İmam Ahmed, Şuayb el-Arnaût tahkiki, Müessesetü’r-Risâle (1421/2001); Şâmile no. 25794. Tahkik dipnotları alınmaz.
- **Şerhu’s-Sünne (el-Berbehârî):** Şâmile no. 8601, OpenITI kopyası `0329Barbahari.SharhSunna.Shamela0008601-ara1`. Veri `berbehari/` klasöründe; mukaddime (0) ve 156 madde. Köşeli parantez [ ] neşrin eklemeleridir; Türkçede de korunur.
- **el-Âcurrî kitapları:** Veri `acurri/` klasöründe (`index.json` + `tr/aNN.json`), OpenITI `0360Ajurri.*` kopyalarından.
  - a01 Ahlâku Ehli’l-Kur’ân: Şâmile no. 10531 (Dârü’l-Kütübi’l-İlmiyye neşri). Sonundaki “mülhak” kısmı ayrı bab olarak 90.01–90.11 anahtarlarıyla eklidir.
  - a02 el-Erbaûn: Şâmile no. 8204. Mukaddime (0) ve 45 hadis; her hadisin ardındaki şerh, hadisle aynı maddededir.
  - a03 Mes’eletü’t-tâifîn (Şâmile 6233), a04 Edebü’n-nüfûs (8245), a05 Fazlu kıyâmi’l-leyl ve’t-teheccüd (12746), a06 Tahrîmü’n-nerd ve’ş-şıtranc ve’l-melâhî (8222), a07 Zemmü’l-livât (9512), a08 Ahbâru Ömer b. Abdilazîz (6650; numara yok, her rivayet sırayla numaralandı), a09 el-Gurabâ (13045; nüshada düşmüş 1 ve 2 numaraları verildi, 63’ün ortasındaki sahte “1 -” işareti kaldırıldı), a10 el-Fevâidü’l-müntehabe (OpenITI ShamAY0032929; 0 = rivayet ve semâ kayıtları). Numaralar nüshadaki “N -” işaretlerine göredir; 0 = nüsha senedi ve giriş.
  - `info` alanında `{l: "…"}` varsa uygulama numara yerine bu etiketi gösterir (ör. “Numarasız rivayet”, Suâlât’taki alt numaralar “No. 29a”).
  - `info` alanında `{l: "…"}` varsa uygulama numara yerine bu etiketi gösterir (ör. “Numarasız rivayet”, Suâlât’taki alt numaralar “No. 29a”).
  - Kesirli numaralar (ör. 21.1) rivayetler arasındaki Âcurrî’nin kendi sözleridir; uygulamada “Ara metin” diye görünür. 0 = mukaddime.
- **eş-Şerîa (el-Âcurrî):** Şâmile no. 13035 (5 cilt), OpenITI `0360AbuBakrAjurri.Sharica.Shamela0013035-ara1`. Veri `seria/` klasöründe, 17 konu bölümüne ayrılmış (`s01.json`…`s17.json`); kitap tamamlandı. Numaralar dijital nüshadaki “N -” işaretlerine göredir; nüshada numarasız birleşmiş rivayetler eksik numaralara bölünmüş, bulunmayan numaralar atlanmıştır. Kesirli anahtarlar (ör. 35.1) bab başındaki Âcurrî’nin sözleri ya da numarasız kısımlardır; aynı numaradan sonra 9’dan fazla kesirli madde varsa iki hane kullanılır (ör. 2033.01–2033.29). Maddesi olmayan kitap başlıkları bir sonraki babın başlığına “—” ile eklenmiştir. s01'in derleme betiği oturum dosyalarındadır (pre_sh.py → sh2.json, build_sh.py); s02–s17 Node betikleriyle (pre.js → items.json, chunk.js, build.js) derlenmiştir.
- **İmam Ahmed’in risaleleri ve mesâili:** Veri `ahmed/` klasöründe (`index.json` + `tr/mNN.json`), OpenITI `0241IbnHanbal.*` kopyalarından. m01 el-Esrem’in Sorularından (Şâmile 25873; nüshadaki “889” sıra hatası 88 yapıldı), m02 el-Akîde, Hallâl rivayeti (6498; nüshada numara yok, her başlık altı bir madde, 0 = nüsha senedi), m03 Ahkâmü’n-nisâ (95563), m04 el-Esâmî ve’l-künâ, Sâlih rivayeti (5780; 156 numara nüshada yok), m05 er-Red ale’l-Cehmiyye ve’z-zenâdıka (7623; nüshada numara yok, her başlık altı bir madde; neşrin metne karışmış dipnot rakamları Arapçadan silindi), m06 el-Eşribe (12995; numaralar nüshaya göre). Kaynak satırında `İmam Ahmed (رحمه الله)`.
- **el-Hallâl:** Veri `hallal/` klasöründe. h01 el-Kırâe inde’l-kubûr (Şâmile 8271); nüshada numara yok, rivayetler sırayla numaralandı. h02 el-Hass ale’t-ticâre ve’s-sınâa ve’l-amel (8213; numaralar nüshaya göre), h03 el-Emr bi’l-ma‘rûf ve’n-nehy ani’l-münker (8248; nüshada numara yok, rivayetler sırayla numaralandı).
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
3. Yeni kitaptan sonra `python3 araclar/gunun.py` ile “Rivayetler” havuzunu yenile.
4. `araclar/yayinla.sh "Musannef: Kitâbü’l-… tamamlandı (N/N)"`
5. Commit mesajları Türkçe ve kısa olur; ne eklendiği ve kaç rivayet olduğu yazılır.

## Arayüz notları

- Varsayılan tema Klasik; ana sayfa kartı en üstte her açılışta farklı bir zikir (kullanıcının listesinden; “Zikret” sayacı açar, “↻” değiştirir; son gösterilen `zikrim-hz` anahtarında), üç halka (Sabah · Akşam · Genel), “Rivayetler” kartı (açılışta bütün kitaplıklardan önce kitaplık, sonra rivayet rastgele seçilir; “↻ Başka rivayet” ile değiştirilir, ☆ ile kaydedilir) ve kaldığın yerden oluşur.
- Zikirlerin sırası kullanıcı tarafından değiştirilemez.
- Kütüphane “raf” düzenindedir: asırlara göre raflar, kitaplar renkli kapak (Arapça adı + ilerleme çubuğu). Yeni kitap `SHELVES` dizisine eklenir.
- Rivayetlerde Arapça metin önce, kâğıt renkli kutuda Amiri yazı tipiyle gösterilir (sened ince, metin kalın); altında Türkçe sened ve metin. Ses düğmeleri küçük ▶ simgeleridir. Ayarlardan Arapça metin ve ▶ düğmeleri gizlenebilir. Amiri `fonts/` klasöründedir (OFL).
- Sesli okuma telefonun kendi sesleriyle yapılır (Web Speech API).
  - Erkek ve yüksek kaliteli sesler önceliklidir: Arapça Majed, Türkçe Cem. Yelda listede gösterilmez.
  - Telefonun gösterdiği ses listesinde ses yoksa, okuma telefonun ayarlarında o dil için seçili sesle yapılır.
