# Sünen-i Ebî Dâvûd çeviri kılavuzu

Kaynak: Şâmile 1726 (Muhammed Muhyiddin Abdülhamîd neşri). Bu çeviri Sekîne uygulamasına girer; uygulamadaki öteki kitaplar (Müsned, Musannef, ez-Zühd …) aynı kurallarla çevrildi. Bu Sünen çevirisi daha önce kötü yapıldığı için baştan yapılıyor: **dikkat, doğruluk ve tutarlılık hızdan önemlidir.**

## Temel kurallar (değişmez)

1. **Tam ve aslına sadık çeviri.** Özetleme, kısaltma, atlama yok. Uzun hadisler baştan sona çevrilir. Arapçadaki her cümle, her rivayet farkı, her “قال أبو داود” notu Türkçede karşılığını bulur.
2. **Asla yorum eklenmez.** Açıklama, şerh, hüküm, “yani şu demek” türü ekler yok. Sadece metinde olan çevrilir.
3. İzin verilen tek not, bozuk/eksik metin notudur: `(metinde böyle)`, `(metin bu kelimede bozuktur)`, `(metin bu kısımda bozuktur)`. Okunamayan kısım `…` ile.
4. **`(?)` asla yazılmaz.** Emin olmadığın yeri Arapçasına dikkatle bakıp düzgün çevir.
5. Anlamı tamamlayan kelimeler parantezle: `(Allah’a) sığındı`. Az ve yerinde kullan; parantez yağmuru yapma.
6. Saygı ifadeleri: Nebî / Resûlullah’tan sonra `ﷺ` — ek, ﷺ’den ÖNCE kelimeye gelir: `Resûlullah ﷺ`, `Resûlullah’a ﷺ`, `Nebî’nin ﷺ`, `Resûlullah’ı ﷺ`. **Asla `ﷺ’ın`, `ﷺ’a` yazılmaz.** Arapçada salavat “صلى الله عليه وسلم” her nerede geçiyorsa ﷺ konur; geçmeyen yere eklenmez. Diğer peygamberler için `(aleyhisselâm)` (Arapçada عليه السلام varsa). Arapçada “رضي الله عنه” varsa `(radıyallâhu anh)`; yoksa eklenmez. “عز وجل” → `(azze ve celle)`, “تعالى” → `teâlâ`, “سبحانه” → `sübhânehû`.
7. Âyetler tırnak içinde çevrilir, sonuna yeri: `“Ey iman edenler…” (Mâide 5/6)`. Neşir yeri verdiyse (ör. [الزخرف: 77]) onu kullan; vermediyse sûre/âyeti kendin doğru tespit et.
8. Yazım: ‘ayn `‘`, hemze `’`, uzatma `â î û`. Tırnak `“ ”`, iç tırnak `‘ ’`. Özel adlar **isim sözlüğündeki biçimle** yazılır (sozluk.tsv). Sözlükte olmayan isimde aynı yazım mantığını izle.
9. Numaralar neşre göredir; dosyadaki numarayı aynen kullan.

## Sened (2. alan)

- Ebû Dâvûd’un hocasından başlayıp hadisin son halkasına (sahâbî, tâbiî ya da sözü söyleyen) kadar, Türkçe adlar ve okla: `Müsedded → Yahyâ → Şu‘be → Katâde → Enes`.
- Ebû Dâvûd’un kendisi sened başına yazılmaz.
- Birden çok hoca/râvi: `Osman b. Ebî Şeybe ve Muhammed b. el-Alâ → Ebû Muâviye → …`
- “يعني ابن محمد” → `Abdülazîz (b. Muhammed)`; “هو ابن …” aynı biçim. “أبيه” → `babası`, “جده” → `dedesi`, “عمه” → `amcası`; kimin babası olduğu açıksa: `babası (Ebû Hüreyre)` gibi yalnız gerektiğinde.
- **Sened satırı temizdir:** yalnız râvi adları ve oklar. Parantez yalnız metnin kendi açıklamasında (“يعني ابن محمد” → `(b. Muhammed)`) kullanılır. Senedin içindeki râvi notları (`قال ابن حنبل: لم أفهمه جيدا`, `قال ابن عبدة: ابن يعلى`) ve lafız kayıtları (`وهذا لفظه`, `واللفظ لفلان`, `المعنى`, `قال مسدد: …`) sened satırına YAZILMAZ; `%` not satırlarına yazılır (aşağıda “Râvi paneli”).
- Senedde geçmeyen bir isim senede eklenmez. Ebû Dâvûd’un “بإسناده”, “بهذا الإسناد” dediği yerde sened, metinde adı geçen son râvide biter; `→ (aynı sened)` gibi sahte halka YAZILMAZ (panelde isim gibi görünür). “Aynı senedle” bilgisi metinde yazılır: `(A‘meş’ten) aynı senedle bu hadis (rivayet edildi).`
- Sened yoksa (Ebû Dâvûd’un kendi sözü vb.) 2. alan boş bırakılır.

### İsnad doğruluğu (EN ÖNEMLİ KISIM — kullanıcı özellikle istedi)

- Arapça zincirdeki **her râvi, aynı sırayla** Türkçede bulunur. Hiçbiri düşmez, hiçbiri eklenmez, yer değiştirmez. Her maddeyi yazdıktan sonra Arapça zinciri râvi râvi sayarak Türkçeyle karşılaştır.
- İsim **metinde nasıl geçiyorsa öyle** yazılır. “حماد” → `Hammâd` (kendi bilgimizle “Hammâd b. Seleme” diye tamamlanmaz). “سفيان” → `Süfyân`. Metin kendisi açıklıyorsa (“يعني ابن سلمة”) → `Hammâd (b. Seleme)`. Başka kaynaktan kimlik bilgisi getirmek yorumdur, yasaktır.
- Belirsiz râviler: `عن رجل` → `bir adam`; `عن شيخ` → `bir şeyh`; `عن رجل من أهل البصرة` → `Basralı bir adam`; `عن فلان أو فلان` → `X ya da Y`; `عن بعض أصحابه` → `arkadaşlarından biri`; `عن أبيه، عن جده` → `babası → dedesi`.
- **Tahvîl (ح):** İki (ya da daha çok) yol, `; ayrıca ` ile ayrılmış TAM zincirler hâlinde yazılır. Her yol, iki yolun birleştiği râviye kadar kendi râvileriyle, ondan sonra ortak kısımla sonuna kadar yazılır:
  `حدثنا مسدد، حدثنا يحيى، ح وحدثنا عثمان بن أبي شيبة، حدثنا وكيع، عن سفيان، عن الأعمش، عن أبي وائل، عن عبد الله`
  → `Müsedded → Yahyâ → Süfyân → A‘meş → Ebû Vâil → Abdullah; ayrıca Osman b. Ebî Şeybe → Vekî‘ → Süfyân → A‘meş → Ebû Vâil → Abdullah`
  Birleşme noktası, ح’den önceki yolun son râvisinin, ikinci yolda aynı tabakadaki râvinin hocasından rivayet etmesidir (yukarıda Yahyâ ve Vekî‘ ikisi de Süfyân’dan). Hadis usûlündeki bilinen tahvîl kuralına göre belirle; ح’den önce gelen yol eksik görünüyorsa ikinci yolun ilk ortak râvisinden devam eder.
- Senedde “المعنى” (ya da “المعنى واحد”) kaydı varsa `%` notu: `Rivayetleri mana bakımından aynıdır.`
- Lafız kayıtları `%` notu: `Lafız Müsedded’indir.` · `Hadis Müsedded’in lafzıyladır.` Ama râvi farkı metnin İÇİNDE geçiyorsa (`قال عثمان: … وقال مسدد: …` metin cümlelerinin arasında) metinde çevrilir: `Osman’ın rivayetinde: “…”; Müsedded’inkinde: “…”`.
- Senedin araya giren kayıtları (`قال: حدثني`, `أنه سمع`, `أخبره`) zincire ayrı râvi olarak eklenmez; sadece isimler zincire girer. `سمعت` ve `حدثنا` ayrımı senedde gösterilmez.
- Merfû hadiste zincir sahâbîyle biter (Resûlullah ﷺ zincire yazılmaz; metinde gelir). Mürselde tâbiîyle, mevkûf/maktû‘da sözü söyleyenle biter.
- Senedde kadın râviler: `Âişe`, `Ümmü Seleme`, `Meymûne` … ; nisbeler: `el-Ensârî`, `es-Sülemî` (isimden sonra `el-` / `es-` / `ez-` … Arapça harf uyumuyla).
- Bir isim zincirin birden fazla yerinde geçiyorsa (ör. aynı adda iki farklı râvi) her ikisi de yazılır.

## Râvi paneli (`&` sîga satırı ve `%` not satırları)

Uygulamada her hadisin altında açılan “Râviler ve isnad” paneli vardır: her râvinin bir sonrakinden hangi lafızla aldığı gösterilir. Bunun için her madde satırının hemen ardından:

- **`& ` sîga satırı** (senedi olan her maddede ZORUNLU): Sened satırındaki her isim için, o ismin ÖNCEKİ halkadan hangi lafızla geldiğini gösteren bir sîga — sırayla, virgülle. İlk sîga, Ebû Dâvûd’un ilk hocasından aldığı lafızdır. Sîga sayısı = o zincirdeki isim sayısı. Tahvîlde zincirler `;` ile ayrılır, sened satırındaki `; ayrıca` sırasıyla bire bir.
- **`% ` not satırları** (isteğe bağlı, sıfır ya da daha çok): senedin içindeki râvi notları ve lafız kayıtları, Türkçe ve aynen: `% İbn Hanbel, Atâ hakkında: “Onu iyi anlayamadım” dedi.` · `% İbn Abde, Safvân için “İbn Ya‘lâ” dedi.` · `% Lafız Müsedded’indir.` Yorum değil, yalnız metindeki kayıt.

Sîga sözlüğü (yalnız bunlar; Arapçada ne yazıyorsa o):
| Arapça | sîga |
|---|---|
| حدثنا / ثنا / نا | haddesenâ |
| حدثني | haddesenî |
| أخبرنا / أنا | ahberanâ |
| أخبرني | ahberanî |
| أنبأنا | enbe’enâ |
| سمعت | semi‘tü |
| سمع / أنه سمع | semi‘a |
| عن | an |
| أن / أنه | enne |
| قال (ara râvi “dedi ki”) | kâle |
| حدثه / حدثهم | haddesehû / haddesehüm |
| أخبره / أخبرهم | ahberahû / ahberahüm |
| قرأت على (kıraat: râvi hocasına okudu) | kara’tü |
| قرئ على / قرأ على (hocaya okundu) | kurie |
| أُنبئت / بلغني (kendisine bildirildi, vasıtasız) | unbi’tü |
| kayıt yok, isim doğrudan geçiyor (ör. “و” ile bağlı ikinci hoca) | önceki halkayla aynı sîga |

- “و” ile bağlı iki hoca tek isim kutusudur (`Osman b. Ebî Şeybe ve Muhammed b. el-Alâ`) ve tek sîga alır. Hocalar farklı lafızla aldıysa (`قال عثمان: حدثنا، وقال محمد: أخبرنا`) sîgaya ilkini yaz, farkı `%` notuna yaz.
- `قالا: حدثنا` → haddesenâ. `حدثنا … قال: سمعت` → semi‘tü. Sahâbîden “أن النبي ﷺ …” şeklinde gelen son halkanın sîgası, tâbiînin sahâbîden aldığı lafızdır (genelde an / enne / semi‘tü).
- Örnek: `حدثنا مسدد، حدثنا يحيى، عن شعبة، قال: حدثني قتادة، قال: سمعت أنسا` → sened `Müsedded → Yahyâ → Şu‘be → Katâde → Enes`, sîga `& haddesenâ, haddesenâ, an, haddesenî, semi‘tü`.
- Tahvîl örneği: sened `Müsedded → Yahyâ → Süfyân → A‘meş → Ebû Vâil → Abdullah; ayrıca Osman b. Ebî Şeybe → Vekî‘ → Süfyân → A‘meş → Ebû Vâil → Abdullah` → `& haddesenâ, haddesenâ, an, an, an, an; haddesenâ, haddesenâ, an, an, an, an`. (Ortak kısımdaki sîgalar iki zincirde aynıdır.)
- Senedi olmayan maddede `&` satırı yazılmaz.

### Deneme parçasından çıkan kararlar (uygula)

1. Tâbiî sahâbîden anlatı yoluyla alıyorsa (`رأيت ابن عمر … قال`, `لقيت رجلا … قال`), sahâbî zincire yazılır, sîgası `kâle`. Mektupla aktarımda (`كتب إليه`) da `kâle`; mektup olduğu metinde zaten anlaşılır.
2. Dişil sîgalar: حدثتني → `haddesenî`, حدثتنا → `haddesenâ`, حدثتها/حدثها → `haddesehû`, أخبرتني → `ahberanî`.
3. Tahvîlde yollar aynı râviyi farklı adlandırıyorsa (`عن أبيه` / `عن عمار بن ياسر`; `غطيف` / `أبي غطيف الهذلي`), her yol kendi adıyla yazılır, fark `%` notuna: `% Mûsâ “babasından” dedi; Dâvûd ise “Ammâr b. Yâsir’den” dedi.`
4. Senedin ortasına giren `قال أبو داود` notu metnin sonuna `Ebû Dâvûd dedi ki: …` diye yazılır (panel notuna değil).
5. Lafız kaydı tahvîlin yalnız bir yolundaysa: `% Lafız, Esved b. Âmir’in Şerîk’ten rivayetinindir.`
6. Senedde geçen tanıtım ve nisbe bilgileri (`من آل ابن الأزرق`, `وهو من بني عبد الدار`, `في حديث هشام`) ad değilse sened satırına değil `%` notuna yazılır.
7. Doğrudan `ح` ile başlayan madde bağımsız bir tahvîl olarak, kendi yollarıyla yazılır.
8. Sözlükte olmayan adlar sözlüğün yazım kurallarıyla (başındaki # notlar) yazılır.
9. Örnek alınacak çıktı: /home/claude/is/cikti/p001.txt (deneme parçası, onaylı). Üslup ve biçimde ona uy.

## Metin (3. alan)

- Metin, sözü söyleyenle başlar: `Enes dedi ki: …`. Arapça “عن X أن النبي ﷺ …” biçimindeyse: `X’ten: Nebî ﷺ …` (Müsned’deki gibi). “عن X قال: قال رسول الله ﷺ” → `X dedi ki: Resûlullah ﷺ şöyle buyurdu: “…”`.
- Ara râvilerin “قال” ve “حدثني” kayıtları senedde gösterildiği için metinde tekrar edilmez; ama metnin İÇİNDE bir râvinin araya girdiği yerler (“قال سفيان: …”, “قال: فقلت لعطاء…”) aynen çevrilir: `Süfyân dedi ki: …`.
- Ebû Dâvûd’un notları: `Ebû Dâvûd dedi ki: …` diye metnin sonunda, eksiksiz. İçlerindeki alternatif senedler düzyazıyla verilir: `Bunu Ma‘mer, Zührî’den, o da Sâlim’den rivayet etti.`
- Kısa atıf rivayetleri (مثله / نحوه / بمعناه / بهذا الحديث / فذكر الحديث) Müsned üslubuyla, doğal Türkçe:
  - `عن مالك بهذا الحديث، لم يذكر السواري، قال: …` → `(Mâlik’ten) bu hadis (rivayet edildi). Direkleri zikretmedi; şöyle dedi: “…”`
  - `… عن عثمان، أن رسول الله ﷺ ذكر مثله، زاد «ولا يخطب»` → `Osman’dan: Resûlullah ﷺ bunun benzerini zikretti; “Evlenme teklifinde de bulunmaz” sözünü ekledi.`
  - `بإسناده مثله` → `Aynı senedle bunun benzeri (rivayet edildi).`
  - `بمعناه` → `… bunun manasını (rivayet etti).` · `نحوه` → `… buna yakınını (rivayet etti).` · `مثله` → `… bunun benzerini …`
- “(şöyle rivayet etti)”, “(rivayet edildiğine göre)” gibi yapay kalıplar KULLANILMAZ.
- Türkçe akıcı ve doğal olsun ama anlamdan sapmasın. Kelime kelime ağır cümle kurma; anlamı serbestleştirip değiştirme de yok. Fıkhî terimleri bilinen Türkçe karşılıklarıyla ver (abdest, gusül, teyemmüm, rekât, kıble, kerâhet …).
- Arapçadaki tekrarları, “أو قال” şüphelerini (`… ya da: “…” dedi`), rivayet farklarını koru.
- Satır sonu gerekirse `\n` yaz (nadiren).

## Bab başlıkları

- “باب …” → Türkçe başlık + ` babı`: `باب التخلي عند قضاء الحاجة` → `İhtiyaç giderirken tenha bir yere çekilme babı`.
- “باب في …” → `… hakkında babı` ya da doğal Türkçesi + `babı`.
- “باب” sözcüğü geçmeyen başlıkları (ör. “جماع أبواب …”, “تفريع أبواب …”) doğal karşılığıyla çevir, sonuna `babı` ekleme: `Vitir bablarının tafsîli`.
- Başlıkta “—” ile birleştirilmiş iki başlık varsa ikisini de çevirip “ — ” ile birleştir.
- Başlıklar da yorumsuzdur.

## Çıktı biçimi

Her satır ya bab satırı ya madde satırıdır. Bab satırı, girdi dosyasında `B:` ile gösterilen her yeni babın ilk maddesinin hemen önüne yazılır:

```
@ İhtiyaç giderirken tenha bir yere çekilme babı
1 | Abdullah b. Mesleme b. Ka‘neb el-Ka‘nebî → Abdülazîz (b. Muhammed) → Muhammed (b. Amr) → Ebû Seleme → Mugîre b. Şu‘be | Mugîre b. Şu‘be’den: Nebî ﷺ ihtiyaç gidermeye gittiğinde uzaklaşırdı.
& haddesenâ, haddesenâ, an, an, an
2 | Müsedded b. Müserhed → Îsâ b. Yûnus → İsmâîl b. Abdülmelik → Ebü’z-Zübeyr → Câbir b. Abdullah | Câbir b. Abdullah’tan: Nebî ﷺ dışarıda ihtiyaç gidermek istediğinde kimsenin kendisini göremeyeceği yere kadar uzaklaşırdı.
& haddesenâ, haddesenâ, ahberanâ, an, an
```

- Her madde satırının hemen ardından (senedi varsa) `& ` sîga satırı, sonra varsa `% ` not satırları gelir. Bunlar bir sonraki `@` ya da madde satırından önce biter.
- Ayırıcı ` | ` (boşluk-dikey çizgi-boşluk). Sened ve metinde `|` karakteri KULLANILMAZ.
- Her madde tek satır; içte satır sonu gerekirse `\n` (iki karakter) yazılır.
- Girdi dosyasındaki BÜTÜN maddeler, aynı sırayla, eksiksiz. Kesirli numaralar (ör. 1590.1) aynen yazılır.
- Başka hiçbir şey yazma (açıklama, yorum, başlık satırı).

### Kaynaktaki bilinen bozukluk
Dijital kopyada bazı yerlerde “الله” kelimesi düşmüştür (ﷲ bitişik harfi kaybolmuş): `صلى عليه وسلم`, `رضي عنه`, `يا رسول،`, `عبد بن فلان`, `عبيد بن معاذ`. Bunlar asıl neşirde tamdır; Türkçede doğrusuyla (Resûlullah ﷺ, (radıyallâhu anh), Ey Allah’ın Resûlü, Abdullah b. …, Ubeydullah b. Muâz) çevir, not koyma. Arapça alan sonradan betikle düzeltilecek.
- Sened satırında akrabalık her zaman üçüncü şahısla yazılır: “حدثني أبي” → `babası`, “عن جدي” → `dedesi`, “عمي” → `amcası` (babam/dedem/amcam yazılmaz).
