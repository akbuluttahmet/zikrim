# Sekîne — Hadis çevirisi ve isnad şartnamesi

Bu dosya, uygulamadaki bütün hadis kitaplarının (Sünen-i Ebî Dâvûd ile kuruldu; Müsned ve sonrakiler buna göre) çeviri ve isnad standardıdır. **Her yeni oturum önce bu dosyayı okur**, sonra `PROGRESS.md`'ye bakar; formatı yeniden anlatmak gerekmez. Ayrıntı için `araclar/sunan/kilavuz.md` (tam çeviri kılavuzu) ve `araclar/sunan/sozluk.tsv` (isim sözlüğü) okunur; `CLAUDE.md` uygulamanın geneli içindir.

Kısaca: **tam, aslına sadık, yorumsuz** çeviri; **temiz sened** (yalnız adlar ve oklar); her râvinin bir öncekinden hangi lafızla aldığını gösteren **râvi paneli**; Arapça metin **Şâmile'den aynen**.

## 1. Değişmez kurallar

1. Tam çeviri: özetleme, kısaltma, atlama yok. Her “قال أبو داود” notu, her rivayet farkı Türkçede vardır.
2. Yorum yok: şerh, açıklama, hüküm, “yani” eklemesi yok. Başka eserden bilgi getirilmez; **râvi kimlikleri de dışarıdan tamamlanmaz** (“حماد” → `Hammâd`; metin “يعني ابن سلمة” diyorsa `Hammâd (b. Seleme)`).
3. İzin verilen tek not: `(metinde böyle)`, `(metin bu kelimede bozuktur)`, `(metin bu kısımda bozuktur)`; okunamayan kısım `…`.
4. `(?)` asla yazılmaz. Anlamı tamamlayan kelime parantezle: `(Allah’a) sığındı` — az ve yerinde.
5. Saygı ifadeleri yalnız Arapçada varsa: `ﷺ` (ek ﷺ'den önce kelimeye gelir: `Resûlullah’a ﷺ`; `ﷺ’a` yazılmaz), `(aleyhisselâm)`, `(radıyallâhu anh/anhâ)`, `(azze ve celle)`, `teâlâ`, `sübhânehû`.
6. Âyet tırnak içinde, sonuna yeri: `“…” (Mâide 5/6)`.
7. Yazım: ‘ayn `‘`, hemze `’`, uzatma `â î û`; tırnak `“ ”`, iç tırnak `‘ ’`. Adlar `sozluk.tsv` biçimiyle; sözlükte olmayan ad, sözlüğün başındaki kurallarla yazılır ve sözlüğe eklenir.
8. Numaralar neşre göredir; dijital nüshanın sıra hataları sıraya göre düzeltilir.

## 2. Sened satırı (2. alan)

- Müellifin hocasından son halkaya kadar, Türkçe adlar ve `→`: `Müsedded → Yahyâ → Şu‘be → Katâde → Enes`. Müellif sened satırına yazılmaz (panelde `c[0]` olarak vardır).
- **Temizdir:** yalnız adlar ve oklar. Parantez yalnız metnin kendi açıklaması içindir (`Abdülazîz (b. Muhammed)`). Râvi notları, lafız kayıtları, nisbe/tanıtım bilgileri sened satırına değil panelin `n` notlarına gider. Saygı ifadesi yazılmaz; tek istisna tanımlayıcı etiketin parçası olan `Nebî’nin ﷺ ashâbından biri`.
- Arapça zincirdeki her râvi aynı sırayla, düşürmeden, eklemeden. Belirsiz râvi: `bir adam`, `bir şeyh`, `Basralı bir adam`, `X ya da Y`, `arkadaşlarından biri`.
- Akrabalık üçüncü şahısla ve bir önceki halkaya göre: `babası`, `dedesi`, `amcası` (babam/dedem yazılmaz). Önceki halkanın akrabası değilse açık: `Abdülcebbâr’ın babası`.
- “و” ile bağlı hocalar tek kutu: `Osman b. Ebî Şeybe ve Muhammed b. el-Alâ`.
- Merfû hadiste zincir sahâbîyle biter (Resûlullah ﷺ zincire yazılmaz); mürselde tâbiîyle; mevkûf/maktû‘da sözü söyleyenle. Anlatı rivayetlerinde sözün KAYNAĞI olan kişi (soruyu cevaplayan, Nebî'den nakleden, kendi yaptığını anlatan) açık sîga olmasa da zincirin sonuna `kâle` ile yazılır; yalnız olayın kahramanı olan kişi yazılmaz.
- “بإسناده / بهذا الإسناد” → sened metinde adı geçen son râvide biter; `(aynı sened)` gibi sahte halka yazılmaz; bilgi metinde: `(A‘meş’ten) aynı senedle bu hadis (rivayet edildi).`
- **Tahvîl (ح):** her yol `; ayrıca ` ile ayrılmış TAM zincirdir; ortak kısım her yolda tekrar yazılır. Yollar aynı râviyi farklı adlandırıyorsa her yol kendi adıyla, fark `n` notuna.
- Sened yoksa (müellifin kendi sözü) 2. alan boş kalır, panel yazılmaz.

## 3. Râvi paneli (`info`, 5. alan)

`{"c": [...], "n": [...], "k": N}`

- `c`: müellifle başlayan `[ad, sîga, ad, sîga, …, ad]` — tek sayıda öğe. Sîga, **soldaki râvinin sağdakinden** hangi lafızla aldığıdır (`c[1]` müellifin hocasından aldığı lafız). Tahvîlde zincirler dizisi `[[…], […]]`, sened satırındaki yollarla bire bir; adlar sened satırındakiyle **harfi harfine aynı**.
- Sîgalar (yalnız bunlar; Arapçada ne yazıyorsa):

| Arapça | sîga | Arapça | sîga |
|---|---|---|---|
| حدثنا / ثنا / نا / حدثتنا | haddesenâ | سمعت | semi‘tü |
| حدثني / حدثتني | haddesenî | سمع / أنه سمع | semi‘a |
| أخبرنا / أنا | ahberanâ | عن | an |
| أخبرني / أخبرتني | ahberanî | أن / أنه | enne |
| أنبأنا | enbe’enâ | قال (ara râvi, anlatı, mektup) | kâle |
| حدثه / حدثهم / حدثتها | haddesehû / haddesehüm | أخبره / أخبرهم | ahberahû / ahberahüm |
| قرأت على | kara’tü | قرئ على / قرأ على | kurie |
| أُنبئت / حُدِّثت / بلغني | unbi’tü | kayıt yok (و ile bağlı ikinci hoca) | önceki halkayla aynı |
| كتب إليّ | ketebe ileyye | وجدت في كتاب أبي (vicâde) | vecedtü |

  `قالا: حدثنا` → haddesenâ; `حدثنا … قال: سمعت` → semi‘tü. Sahâbîden `أن النبي ﷺ` biçiminde gelen son halkanın sîgası, tâbiînin sahâbîden aldığı lafızdır. Hocalar farklı lafızla aldıysa sîgaya ilkini yaz, farkı `n`'ye.
- `n`: senedin içindeki râvi notları ve lafız kayıtları, Türkçe ve aynen: `Lafız Müsedded’indir.` · `Rivayetleri mana bakımından aynıdır.` · `İbn Hanbel, Atâ hakkında: “Onu iyi anlayamadım” dedi.` Yorum ve dışarıdan bilgi yok. Râvi farkı metnin içindeyse (`قال عثمان: … وقال مسدد: …`) metinde çevrilir.
- `k`: Arapça metinde metnin (matn) başladığı karakter konumu; uygulama senedi ince, metni kalın gösterir. `قال أبو داود` notu senedin ortasındaysa metnin sonuna `Ebû Dâvûd dedi ki: …` yazılır.
- Anlamlar `script.js` → `SIGA`; panel çizimi `rvChains`.
- Musannef 2026-10-29'da standarda getirildi (`c[0] = İbn Ebî Şeybe`; nüsha râvisinin `حدثنا أبو بكر قال:` kaydı ve kitap başındaki Bakî b. Mahled zinciri halka değildir, ikincisi `n`'de `Nüsha senedi: …`). Standarda getirilmemiş (eski biçim) kitaplarda `info` `null`dır ve sened satırı temiz değildir; `dogrula.py` bunları hata diye sayar, standarda geçiş sırası `PROGRESS.md`'dedir.

## 4. Metin (3. alan) ve bab

- Metin sözü söyleyenle başlar: `Enes dedi ki: …`; `عن X أن النبي ﷺ …` → `X’ten: Nebî ﷺ …`; `قال رسول الله` → `Resûlullah ﷺ şöyle buyurdu: “…”`. Ara râvilerin sened kayıtları metinde tekrarlanmaz; metnin içine giren râvi sözleri (`قال سفيان: …`) aynen çevrilir.
- Müellif notları metnin sonunda, eksiksiz: `Ebû Dâvûd dedi ki: …`; içindeki alternatif senedler düzyazıyla.
- Atıf rivayetleri: `بهذا الحديث` → `(Mâlik’ten) bu hadis (rivayet edildi).`; `مثله` → `bunun benzerini`; `نحوه` → `buna yakınını`; `بمعناه` → `bunun manasını`. `(rivayet edildiğine göre)`, `(şöyle rivayet etti)` kalıpları yasaktır.
- Bab: `باب …` → `… babı`; `باب في …` → `… hakkında babı`; `باب` geçmeyen başlıklara `babı` eklenmez. Maddesi olmayan üst başlık sonraki baba ` — ` ile bağlanır.

## 5. Veri biçimi

- `<kitaplık>/index.json`: `[{f, tr, n, b?, from, to, t, g?}]` — `n` toplam, `t` çevrilmiş madde; `t: 0` kitap kapalı.
- `<kitaplık>/tr/*.json`: `{"babs":[{"t":"Bab başlığı","h":[madde…]}]}`
- Madde, **6 alanlı dizi**: `[no, "sened", "Türkçe metin", ziyade, info, "Arapça metin"]`
  - `no`: tam sayı; numarasız/ara metin kesirli (`1590.1`), `info.l` varsa uygulama numara yerine etiketi gösterir.
  - `ziyade`: Müsned'de 1 `*` / 2 `•` (Abdullah b. Ahmed ziyâdesi) / 3 `°` (vicâde); diğerlerinde 0.
  - Arapça: harekeli, Şâmile'den aynen, sened dahil; `[حكم الألباني]` gibi modern satırlar çıkarılır; `ms…`/sayfa işaretleri alınmaz. **Yeniden derlemede Arapça alan kaybedilmez.**
- Çeviri çalışma dosyası (derlemeden önce): `@ bab` · `N | sened | metin` · `& sîga, sîga, …` (yollar `;` ile) · `% not` · `^ metnin Arapçada başladığı ilk kelimeler`. Ayırıcı ` | `; sened ve metinde `|` kullanılmaz; satır içi satır sonu `\n`.

## 6. Örnekler (Sünen'den, yayımlanmış veri)

**a) Düz an‘ane zinciri, “يعني” açıklaması (no. 1)**
```
@ İhtiyaç giderirken tenha bir yere çekilme babı
1 | Abdullah b. Mesleme b. Ka‘neb el-Ka‘nebî → Abdülazîz (b. Muhammed) → Muhammed (b. Amr) → Ebû Seleme → Mugîre b. Şu‘be | Mugîre b. Şu‘be’den: Nebî ﷺ ihtiyaç gidermeye gittiğinde uzaklaşırdı.
& haddesenâ, haddesenâ, an, an, an
^ أن النبي
```
→ `[1, "…sened…", "…metin…", 0, {"c": ["Ebû Dâvûd","haddesenâ","Abdullah b. Mesleme b. Ka‘neb el-Ka‘nebî","haddesenâ","Abdülazîz (b. Muhammed)","an","Muhammed (b. Amr)","an","Ebû Seleme","an","Mugîre b. Şu‘be"], "k": 128}, "حدثنا عبد الله بن مسلمة بن قعنب القعنبي، حدثنا عبد العزيز يعني ابن محمد، عن محمد يعني ابن عمرو، عن أبي سلمة، عن المغيرة بن شعبة «أن النبي صلى الله عليه وسلم كان إذا ذهب المذهب أبعد»"]`

**b) Tahvîl, iki hoca tek kutu, lafız kaydı, müellif notu (no. 23)**
```
23 | Hafs b. Ömer ve Müslim b. İbrâhîm → Şu‘be → Süleymân → Ebû Vâil → Huzeyfe; ayrıca Müsedded → Ebû Avâne → Süleymân → Ebû Vâil → Huzeyfe | Huzeyfe dedi ki: Resûlullah ﷺ bir topluluğun çöplüğüne geldi, ayakta küçük abdestini yaptı, sonra su istedi ve mestleri üzerine meshetti. Ebû Dâvûd dedi ki: Müsedded dedi ki: (Huzeyfe) şöyle dedi: “Uzaklaşmaya davrandım; beni çağırdı, nihayet topuğunun dibine kadar geldim.”
& haddesenâ, haddesenâ, an, an, an; haddesenâ, haddesenâ, an, an, an
% Lafız Hafs’ındır.
```
Arapça: `حدثنا حفص بن عمر، ومسلم بن إبراهيم، قالا: حدثنا شعبة، ح وحدثنا مسدد، حدثنا أبو عوانة وهذا لفظ حفص عن سليمان، عن أبي وائل، عن حذيفة، قال: …` → `info.c` iki zincir, `n: ["Lafız Hafs’ındır."]`. “وهذا لفظ حفص” sened satırına girmedi, nota gitti.

**c) Anlatı rivayeti: sözün kaynağı zincire `kâle` ile (no. 11)**
```
11 | Muhammed b. Yahyâ b. Fâris → Safvân b. Îsâ → Hasan b. Zekvân → Mervân el-Asfar → İbn Ömer | Mervân el-Asfar dedi ki: İbn Ömer’i, devesini kıbleye doğru çöktürmüş, sonra oturup ona doğru küçük abdestini yaparken gördüm. “Ey Ebû Abdurrahmân! Bu yasaklanmadı mı?” dedim. Dedi ki: “Evet, ancak bu, açık arazide yasaklandı. …”
& haddesenâ, haddesenâ, an, an, kâle
```
Arapçada `عن مروان الأصفر، قال: رأيت ابن عمر …`: İbn Ömer soruyu cevaplayan kaynaktır, zincire `kâle` ile girer; metin anlatıcı Mervân'la başlar.

**d) Mana kaydı, yalnız bir hocanın sîgası, müellif notu (no. 165)**
```
165 | Mûsâ b. Mervân ve Mahmûd b. Hâlid ed-Dımaşkî → Velîd → Sevr b. Yezîd → Recâ b. Hayve → Mugîre b. Şu‘be’nin kâtibi → Mugîre b. Şu‘be | Mugîre b. Şu‘be dedi ki: Tebük gazvesinde Nebî’ye ﷺ abdest aldırdım; mestlerin üstüne ve altına meshetti. Ebû Dâvûd dedi ki: Bana ulaştığına göre Sevr bu hadisi Recâ’dan işitmemiştir.
& haddesenâ, haddesenâ, ahberanâ, an, an, an
% Rivayetleri mana bakımından aynıdır.
% “Bize Sevr b. Yezîd haber verdi” kaydı Mahmûd’un rivayetindedir.
```
Arapça: `… ومحمود بن خالد الدمشقي المعنى، قالا: حدثنا الوليد قال محمود: أخبرنا ثور بن يزيد …` — “المعنى” ve “قال محمود: أخبرنا” nota gitti; `كاتب المغيرة` ad gibi zincirde kaldı.

**e) Atıf rivayeti ve metnin içine giren râvi sözü (no. 5)**
```
5 | Hasan b. Amr (es-Sedûsî) → Vekî‘ → Şu‘be → Abdülazîz (b. Suheyb) → Enes | (Enes’ten) bu hadis (rivayet edildi). Şöyle dedi: “Allah’ım! Sana sığınırım.” Şu‘be dedi ki: Bir defasında da “Allah’a sığınırım” dedi.
& haddesenâ, haddesenâ, an, an, an
```
`عن أنس بهذا الحديث` kısa atıf kalıbıyla; `وقال شعبة` metnin içinde, aynen.

## 7. Râvi veritabanı ve doğrulama

- `araclar/ravi/ravi.json`: yayımlanmış zincirlerden türetilen râvi kayıtları (ad, temel ad, Arapça biçimler, sayı, rol, hocaları/öğrencileri, sîgaları, geçtiği hadisler) ve hoca-öğrenci kenarları. `python3 araclar/ravi/ravi_kur.py sunan musned …` yeniden üretir. Yalnız metinde yazılan adlar; dışarıdan bilgi yoktur. Yeni bir kitapta bir râvinin hangi hocadan hangi lafızla geldiğini, adının yazımını ve `temel` altındaki biçim ailesini (`Abdülazîz`, `Abdülazîz (b. Muhammed)` …) buradan kontrol et; **veritabanı sened satırını doldurmak için kullanılmaz**, metinde ne yazıyorsa o yazılır.
- `python3 araclar/dogrula.py <kitaplık> [--ravi] [--hepsi]`: yayımlanmış veriyi şartnameye karşı denetler (alan sayısı, numaralar, sened↔panel adları ve yol sayısı, sîga sözlüğü, `k`, birinci şahıs akrabalık, senedde not/saygı, ﷺ ve müellif notu sayıları, Arapça sîga sayımı, son râvi↔metin başı, çeviri oranı; `--ravi` ile bilinmeyen ad ve yeni kenar uyarısı). Hata varsa yayımlanmaz; uyarılar insan/Fable gözüyle bakılacak listedir.
- Çalışma dosyası için `araclar/sunan/denetle.py`, derleme için `araclar/sunan/derle.py`; `python3 araclar/kontrol.py` bütün kitaplıkların genel denetimidir.

## 8. Oturum akışı (token tasarrufu)

1. Oku: `SPEC.md` → `PROGRESS.md` → (gerekirse) `kilavuz.md`, `sozluk.tsv`. Repoyu gezme.
2. Parti al: 15–20 madde, Arapçası dosyadan; sohbete yapıştırma. Çıktı çalışma dosyasına (`N | sened | metin`, `&`, `%`, `^`).
3. `denetle.py` → düzelt → `derle.py` → `dogrula.py --ravi` (0 hata) → `kontrol.py`.
4. `PROGRESS.md`'yi güncelle (hangi kitap, hangi numaraya kadar, açık sorunlar). Sohbeti uzatma; yeni partide yeni sohbet.
5. Kalite kontrol: her partiden 3–5 rastgele madde + `dogrula.py` uyarıları Şâmile ile karşılaştırılır (güçlü model). Kalıp hatası çıkarsa parti değil, bu şartname/kılavuz düzeltilir.
