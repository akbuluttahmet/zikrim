# Sahîh-i Buhârî çeviri talimatı (SPEC kısaltması)

Çıktın yalnız çalışma dosyasıdır. Sohbet, açıklama, markdown yok. Dosyayı verilen yola yaz.

Kaynak paketi sırayı verir. Her `BAB` bir `@` satırı, her `EK` senedsiz ara metin, her `H` bir hadis, `ON` varsa `0` numaralı mukaddimedir. Paketteki bütün BAB, EK, H, ON satırları çıktıda vardır; hiçbiri atlanmaz, yenisi uydurulmaz.

## Biçim

```
@ Türkçe bab başlığı
30.1 |  | Ara metnin tam Türkçesi.
31 | Ad → Ad → Ad | Türkçe metin.
& haddesenâ, an, an
^ أعطى رهطا
```

- Ayırıcı ` | ` (boşluk-pipe-boşluk). Sened ve metinde `|` kullanma.
- Tek satır. Satır sonu gerekiyorsa metnin içinde `\n` yaz.
- Sened yoksa (ON, EK): `N |  | metin` — `&` ve `^` yazılmaz.
- Hadiste `&` ve `^` zorunlu.

## Bab

- `باب X` → `X babı`. `باب: X` aynı. `باب في X` → `X hakkında babı`.
- Pakette ` — ` ile birleşmiş başlıklar Türkçede de ` — ` ile birleşir; her parça kendi babıdır.
- Âyet tırnak içinde, sonuna yeri: `“…” (Hucurât 49/9)`. Sure adları Türkçe (Mâide, Bakara, Nisâ, Âl-i İmrân…).

## Sened

- Yalnız adlar ve `→`. el-Buhârî satıra yazılmaz. İlk `&` sîgası onun hocasından aldığı lafızdır (metnin başındaki حدثنا / أخبرنا).
- Ad sayısı = sîga sayısı. Her yol kendi sîgalarıyla.
- Tahvîl (ح): yollar senedde `; ayrıca `, sîgada `; ` ile ayrılır. Ortak kısım her yolda tekrarlanır.
- «و» ile bağlı hocalar tek kutu: `Ahmed b. Yûnus ve Mûsâ b. İsmâîl`.
- Akrabalık üçüncü şahıs: `babası`, `dedesi`, `amcası` (babam/dedem yazılmaz).
- Senedde saygı ifadesi, not, «(yine)» yok. Notlar ayrı satır: `% Türkçe not`.
- Belirsiz: `bir adam`, `bir şeyh`. Metinde olmayan baba adı eklenmez.
- Merfûda zincir sahâbîde biter. Sözün kaynağı (cevaplayan, kendi yaptığını anlatan) `kâle` ile zincirin sonuna yazılır; yalnız olayın kahramanı yazılmaz.
- Adlar `araclar/sunan/sozluk.tsv` ile (Arapça sütun). Yoksa dosyanın başındaki yazım kuralları. Sözlüğe yeni satır EKLEME; sadece çıktıya yaz.

Sîgalar (başka yazılmaz): haddesenâ, haddesenî, ahberanâ, ahberanî, enbe’enâ, semi‘tü, semi‘a, an, enne, kâle, haddesehû, haddesehüm, ahberahû, ahberahüm, kara’tü, kurie, unbi’tü, ketebe ileyye, vecedtü.

حدثنا/ثنا/نا = haddesenâ. حدثني = haddesenî. أخبرنا/أنا = ahberanâ. أخبرني = ahberanî. أنبأنا = enbe’enâ. سمعت = semi‘tü. سمع = semi‘a. عن = an. أن / أنه = enne. قال (anlatı, ara râvi) = kâle. حدثه = haddesehû. أخبره = ahberahû.

## Metin

- Tam, aslına sadık, yorumsuz. Özet yok, atlama yok, “yani” yok, `(?)` yok.
- `عن X أن النبي` → `X’ten: Nebî ﷺ …` veya `X’ten (radıyallâhu anh), Nebî’den ﷺ:`.
- `قال رسول الله` → `Resûlullah ﷺ şöyle buyurdu: “…”`.
- Söz tırnak `“ ”`. Saygı yalnız Arapçada varsa: `ﷺ`, `(radıyallâhu anh)`, `(radıyallâhu anhâ)`, `(aleyhisselâm)`, `teâlâ`. `ﷺ’e` yazılmaz; ek kelimeden önce: `Resûlullah’a ﷺ`.
- `قال أبو عبد الله` → metnin sonunda aynen `Ebû Abdullah (el-Buhârî) dedi ki: …`.
- `مثله` → `bunun benzerini`. `نحوه` → `buna yakınını`. `بمعناه` → `bunun manasını`. `بهذا الحديث` → `(X’ten) bu hadis (rivayet edildi).`
- `^` : metnin (matn) Arapçada başladığı ilk 2–5 kelime, paketteki Arapçadan harfi harfine kopya. `kontrol` bunu `ar.find` ile arar; uydurma hareke ekleme.

Bitince: `python3 araclar/sahih/kontrol_cikti.py PAKET_DOSYASI CIKTI_DOSYASI` — hata kalmayacak. Uyarıyı da düzelt.
