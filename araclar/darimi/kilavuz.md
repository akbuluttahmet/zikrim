# er-Red ale’l-Cehmiyye — çeviri kılavuzu

Osman b. Saîd ed-Dârimî (ö. 280). Şâmile 13023. `c[0]` = `ed-Dârimî` (sened satırına yazılmaz).
Numaralar nüshadaki “N -” başlıklarıdır. 163, 253, 388 nüshada yoktur; uydurulmaz. 0 = nüsha senedi.
`SPEC.md` geçerlidir. Adlar `araclar/sunan/sozluk.tsv` ile. Sözlükte yoksa `araclar/darimi/isim/pNNN.tsv` dosyasına `Arapça<TAB>Türkçe` satırı ekle; `sozluk.tsv`'ye dokunma.

## Çıktı

`parca/pNNN.txt` satırı `N: Arapça` ya da `B: bab`. Karşılığı `cikti/pNNN.txt`:

```
@ Arş’a iman — muattılanın inkâr ettiği şeylerden biri — babı
13 | Kâsım b. Muhammed el-Bağdâdî → Abdurrahmân b. Muhammed b. Habîb b. Ebî Habîb → babası → dedesi Habîb b. Ebî Habîb | Dedesi Habîb b. Ebî Habîb dedi ki: Hâlid b. Abdullah el-Kasrî Vâsıt’ta kurban günü bize hutbe okudu ve şöyle dedi: “Ey insanlar! Dönün, kurban kesin; Allah bizden de sizden de kabul etsin. Ben de el-Ca‘d b. Dirhem’i kurban ediyorum. O, Allah’ın İbrâhîm’i dost edinmediğini ve Mûsâ ile konuşmadığını iddia etti. Allah, el-Ca‘d b. Dirhem’in söylediğinden çok yücedir.” Sonra indi ve onu boğazladı.
& haddesenâ, haddesenâ, an, an
^ قال: خطبنا
```

- Ayırıcı ` | `. Sened ve metinde `|` yok. Madde tek satır; satır sonu gerekirse `\n`.
- Her `B:` için tam bir `@ Türkçe bab` (kaynaktaki bab sayısı ve sırası aynı). `باب …` → `… babı`.
- Sened varsa `&` ve `^` zorunlu. Sened yoksa (müellif sözü, 0 numarası) `&` ve `^` yazılmaz.
- `&` sîga sayısı = o zincirdeki ad sayısı (eşit olmalı; fazla `kâle` ekleme). Son râvinin sözü açan `قال:` ayrı halka değildir; `^` oradan başlar, son sîga o râviye gelen `عن`/`حدثنا`/`أن` neyse odur. `قال: حدثنا` / `قال: حدثني` / `قال: قرأت على` içindeki `قال` halka değildir; fiil bir önceki adın sîgasıdır (`kara’tü` = `قرأت على`).
- Tahvîl (`ح`) varsa yollar senedde `; ayrıca `, sîgada `;` ile ayrılır.
- `^` Arapçanın matnının başladığı yerden **aynen** kopyalanmış bir kesit (kaynak satırında geçmeli, kelime ortasından başlamamalı). Son râvinin `قال:`'ı varsa `^` oradan başlar.

## Sened

- İlk sîga, ed-Dârimî’nin ilk hocasından aldığı lafızdır (`حدثنا`/`ثنا`/`نا` → haddesenâ, `حدثني` → haddesenî, `أخبرنا` → ahberanâ, `أخبرني` → ahberanî, `أنبأنا`/`أنبأني` → enbe’enâ, `سمعت` → semi‘tü, `عن` → an, `أن` → enne).
- `وقال X: حدثنا Y` muallaktır: zincir X ile başlar, ilk sîga `kâle`.
- `و` ile bağlı hocalar tek kutu. Birini ötekinin hocası yapma.
- `يعني ابن سعد` → adın parçası: `Leys (b. Sa‘d)`. Dışarıdan kimlik ekleme.
- Akrabalık üçüncü şahıs: `babası`, `dedesi`. Metin dedenin adını veriyorsa `dedesi Habîb b. Ebî Habîb`.
- Zincir sözü söyleyenle biter. Nebî ﷺ zincire yazılmaz.
- Aynı maddede ikinci rivayet varsa maddeyi bölme; ikinci senedi metinde düzyazıyla yaz.
- `قال أبو سعيد` / `قال أبو سعيد رحمه الله` senede girmez: `Ebû Saîd dedi ki:` / `Ebû Saîd (rahimehullah) dedi ki:` (Arapçadaki sayı kadar).

## Metin

- Tam, aslına sadık, yorumsuz. Özet yok. Parça uzunsa da baştan sona.
- `صلى الله عليه وسلم` → `ﷺ` (ek, ﷺ’den önce: `Nebî’ye ﷺ`). Arapçada yoksa ekleme.
- `رضي الله عنه` → `(radıyallâhu anh)`, `عنها` → `(radıyallâhu anhâ)`, `عنه` ikil → `(radıyallâhu anhümâ)`. Arapçada yoksa yazma.
- `عز وجل` / `تبارك وتعالى` Arapçada varsa `(azze ve celle)` / `teâlâ`. Parantezsiz “azze ve celle” yazılmaz.
- Âyet tırnak içinde. Nüsha yeri varsa onu koru: `[سورة: فصلت، آية رقم: 42]` → `(Fussilet 41/42)`. `[الزمر: 28]` → `(Zümer 39/28)`. `[سورة:]` boşsa yeri sen bul. Nüshanın verdiği yeri değiştirme.
- `مثله` / `نحوه` / `بمعناه` / `بهذا الإسناد`: `(X’ten) bunun benzeri (rivayet edildi).` Yasak: `(şöyle rivayet etti)`, `(rivayet edildiğine göre)`.
- Yarım cümleyi parantezle tamamlama. Bozuk yerde yalnız `(metinde böyle)`, `(metin bu kısımda bozuktur)`. `(?)` yok. `...` yok; nüsha boşluğu `…`.
- Şüpheli yeri madde numarasıyla `gozden/pNNN.md` dosyasına tek satır yaz. Maddeyi “düzeltme”.
