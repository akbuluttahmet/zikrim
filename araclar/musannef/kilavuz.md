# el-Musannef (İbn Ebî Şeybe) çeviri kılavuzu

Kaynak: Kemâl Yûsuf el-Hût neşri (Riyad: Mektebetü’r-Rüşd, 1409), Şâmile no. 9944. Çevrilmemiş 14 kitabın Arapçası aynı neşrin harekesiz OpenITI kopyasındandır (`kaynak.json` → `hazirla.py` → `parca/pNNN.txt`).
Bu kılavuz `SPEC.md`'yi Musannef'e uyarlar; çelişirse `SPEC.md` geçerlidir. Çeviri kuralları `CLAUDE.md` “Çeviri kuralları”dır: **tam, aslına sadık, yorumsuz**.

## Dosyalar ve akış

- Girdi `parca/pNNN.txt`: `B: <Arapça bab başlığı>` ve `N: <Arapça metin>` satırları (N kesirli olabilir: `456.1`).
- Çıktı `cikti/pNNN.txt` (aynı ad). Her `B:` satırı için bir `@` satırı, her `N:` satırı için bir madde, **aynı sırayla, hiçbiri atlanmadan**:

```
@ Türkçe bab başlığı

N | sened | metin
& sîga, sîga, …
% not (varsa, her not ayrı satır)
^ metnin Arapçada başladığı ilk kelimeler (parçadaki Arapçadan harfi harfine kopya)
```
- Bitince: `python3 araclar/musannef/denetle.py pNNN` → “tamam” olana kadar düzelt. Uyarılar (“kısa olabilir”) Arapçaya bakılıp ya giderilir ya da çevirinin tam olduğundan emin olunur.
- Adlar: önce `araclar/musannef/isimler.tsv` (mevcut Musannef yazımları), sonra `araclar/sunan/sozluk.tsv`. Listede olmayan adı sözlüğün başındaki kurallarla yaz (‘ayn `‘`, hemze `’`, uzatma `â î û`; `b.`; `Ebû`, `Ebü’l-`).

## Musannef'e özel

1. **Müellif ve nüsha öneği:** Maddeler çoğunlukla `حدثنا أبو بكر قال: نا X …` diye başlar. `حدثنا أبو بكر قال:` nüsha râvisinin kaydıdır; **sened satırına yazılmaz**, sened `X` ile başlar ve X'in sîgası `نا` → `haddesenâ`. Önek yoksa (`حدثنا X`) yine `haddesenâ`. Kitap başındaki `حدثنا بقي بن مخلد … حدثنا أبو بكر عبد الله بن محمد بن أبي شيبة قال:` zinciri de senede girmez; `%` satırına `Nüsha senedi: Bakî b. Mahled → Ebû Bekir Abdullah b. Muhammed b. Ebî Şeybe.` (Arapçadaki adlarla) yazılır. Panelde `c[0] = İbn Ebî Şeybe`yi derleme betiği koyar; sen yazmazsın.
2. **İbn Ebî Şeybe'nin kendi sözleri** metnin içinde `قال أبو بكر: …` → `Ebû Bekir dedi ki: …` aynen çevrilir.
3. **Maktû‘/mevkûf sözler** (kitabın büyük kısmı): zincir sözü söyleyenle biter. `عن إبراهيم قال: …` → `İbrâhîm dedi ki: …`; `عن إبراهيم أنه كان يكره …` → `İbrâhîm’den: O, … hoş görmezdi.`; `عن الحسن وابن سيرين قالا` → sened `… → Hasan ve İbn Sîrîn`, metin `Hasan ve İbn Sîrîn dediler ki: …`. Sözün kaynağı açık sîgasız ise `kâle` (SPEC §2).
4. **Atıf kalıpları:** `مثله` → `(X’ten) bunun benzeri (rivayet edildi).`; `نحوه` → `buna yakını`; `بمثله`/`بنحوه` aynı; `بإسناده` / `بهذا الإسناد` sened satırına sahte halka olarak girmez, metinde: `(X’ten) aynı senedle bunun benzeri (rivayet edildi).`
5. **Bab başlıkları** (`ما قالوا في …`, `في …`, `من كان …`, `من رخص …`, `من كره …`): Türkçe, tam ve yorumsuz. Kalıplar: `ما قالوا في X` → `X hakkında söyledikleri`; `في X` → `X hakkında`; `من رخص في X` → `X’e ruhsat verenler`; `من كره X` → `X’i hoş görmeyenler`; `من كان يفعل X` → `X yapanlar`. `باب` kelimesi geçmiyorsa `babı` eklenmez. Âyet içeren başlıkta âyet tırnakla ve yeriyle. `B: (başlıksız)` → `@ (başlıksız)`.
6. **Arapça harekesizdir;** anlam için okuma Arapçanın bağlamına göre yapılır. Metinde açık bozukluk varsa yalnız izinli notlar: `(metinde böyle)`, `(metin bu kelimede bozuktur)`, `(metin bu kısımda bozuktur)`. `(?)` asla.
7. Bir maddenin Arapçasında iki ayrı rivayet birleşmiş görünüyorsa (sonunda yeni bir `حدثنا …` başlıyorsa) ikisi de aynı maddede eksiksiz çevrilir; ikinci rivayetin senedi metnin içinde düzyazıyla verilir (`Vekî‘ → …` değil: `Vekî‘ bize Muhill’den, o İbrâhîm’den bunun benzerini rivayet etti.`) ve `%` satırına `Maddede ikinci bir rivayet birleşik.` yazılır.

## Sened, sîga, metin (SPEC özeti — mutlaka uy)

- **Sened satırı** yalnız adlar ve ` → `. Parantez yalnız Arapçadaki `يعني`/`هو` açıklaması için: `عن أبي معشر هو نجيح` → `Ebû Ma‘şer (Necîh)`. Râvi notu, lafız kaydı, `قالا`, “ikisi de”, yer/zaman bilgisi sened satırına değil `%` satırına.
- Arapçadaki her râvi aynı sırayla, eksiksiz; `عن رجل` → `bir adam`; `عن أبيه` → `babası`; `عن جده` → `dedesi` (her zaman üçüncü şahıs). `و` ile bağlı hocalar tek kutu: `Vekî‘ ve Ebû Muâviye`.
- Merfû hadiste zincir sahâbîde biter (Nebî/Resûlullah zincire yazılmaz). Senedde saygı ifadesi yok.
- **Tahvîl (`ح`):** yollar `; ayrıca ` ile, her yol tam zincir; `&` satırında yollar `;` ile.
- **`&` sîga satırı:** sened satırındaki her ad için, **o adın Arapçada önündeki lafız**: `حدثنا/ثنا/نا` haddesenâ · `حدثني` haddesenî · `أخبرنا/أنا` ahberanâ · `أخبرني` ahberanî · `أنبأنا` enbe’enâ · `سمعت` semi‘tü · `سمع/أنه سمع` semi‘a · `عن` an · `أن/أنه` enne · `قال` (anlatı/kaynak) kâle · `حدثه` haddesehû · `حدثهم` haddesehüm · `أخبره` ahberahû · `أخبرهم` ahberahüm · `قرأت على` kara’tü · `قرئ على` kurie · `بلغني/حدثت/أنبئت` unbi’tü · `كتب إلي` ketebe ileyye. Sîga sayısı = ad sayısı.
- **`^` satırı:** son râvinin adından (ve varsa `قال:` / `أنه` / `رضي الله عنه` vb.) sonra metnin başladığı yerdeki ilk 2–4 kelime, parçadaki Arapçadan **harfi harfine** (noktalama ve tırnak dâhil kopyala ki bulunabilsin; kelime ortasından başlama).
- **Metin** sözü söyleyenle başlar: `X dedi ki: …`, `X’ten: …`; `قال رسول الله صلى الله عليه وسلم` → `Resûlullah ﷺ buyurdu: “…”`. Arapçadaki her `صلى الله عليه وسلم` için Türkçede bir `ﷺ` (ek önce kelimeye: `Nebî’ye ﷺ`, asla `ﷺ’e`). Âyet tırnakta + yeri `(Bakara 2/183)`. Tazim: `Allah (azze ve celle)`, `(radıyallâhu anh)` yalnız Arapçada varsa.
- Yasak: özetleme, atlama, “yani” açıklaması, dışarıdan bilgi, `(rivayet edildiğine göre)`, Arapçada olmayan `...`, `(?)`, `|` karakteri.

## Örnek

```
B: من كان يكره أن يتوضأ بفضل المرأة
12: حدثنا أبو بكر قال: نا وكيع، عن سفيان، عن منصور، عن إبراهيم، قال: «كانوا يكرهون أن يتوضأ الرجل بفضل وضوء المرأة»
13: حدثنا هشيم، عن أبي معشر هو نجيح، عن عبد الله بن أبي طلحة، عن أنس، أن النبي صلى الله عليه وسلم، كان إذا دخل الكنيف قال: «بسم الله»
```
```
@ Kadının abdestinden artan su ile abdest almayı hoş görmeyenler

12 | Vekî‘ → Süfyân → Mansûr → İbrâhîm | İbrâhîm dedi ki: “Erkeğin, kadının abdestinden artan su ile abdest almasını hoş görmezlerdi.”
& haddesenâ, an, an, an
^ قال: «كانوا يكرهون

13 | Hüşeym → Ebû Ma‘şer (Necîh) → Abdullah b. Ebî Talha → Enes | Enes’ten: Nebî ﷺ helâya girdiğinde “Bismillâh” derdi.
& haddesenâ, an, an, an
^ أن النبي صلى الله عليه وسلم، كان
```
