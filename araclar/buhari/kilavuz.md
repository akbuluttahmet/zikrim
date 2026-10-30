# Halku ef‘âli’l-ibâd — çeviri kılavuzu

Şâmile 9697 (Abdurrâhman Umeyre), OpenITI `0256Bukhari.KhalqAfcal.Shamela0009697-ara1`.
Nüshada “N -” yoktur; `kaynak_kur.py` rivayetleri sırayla numaraladı. `SPEC.md` geçerlidir. `c[0]` = `el-Buhârî` (sened satırına yazılmaz).

## Çıktı

`parca/pNNN.txt` satırı `N: Arapça` ya da `B: bab`. Karşılığı `cikti/pNNN.txt`:

```
@ Muattıladan bahseden âlimlerin zikri babı
1 | Hakem b. Muhammed et-Taberî → Süfyân b. Uyeyne | Süfyân b. Uyeyne dedi ki: Yetmiş yıl öncesinden şeyhlerimize yetiştim; içlerinde Amr b. Dînâr da vardı. Şöyle diyorlardı: “Kur’ân Allah’ın kelâmıdır, mahlûk değildir.”
& haddesenî, haddesenâ
% Mekke’de ondan yazdım.
^ أدركت مشائخنا
```

- Ayırıcı ` | `. Sened ve metinde `|` yok. Madde tek satır; satır sonu gerekirse `\n`.
- `&` sîga sayısı = o zincirdeki ad sayısı. Tahvîlde yollar `;` ile, senedde `; ayrıca `.
- `^` Arapçanın matnının başladığı yerden **aynen** kopyalanmış bir kesit (kaynak satırında geçmeli, kelime ortasından başlamamalı).
- Sened yoksa (yalnız `قال أبو عبد الله` / hâtime) 2. alan boş, `&` ve `^` yazılmaz.

## Sened

- İlk sîga, Buhârî’nin ilk hocasından aldığı lafızdır (`حدثني` → haddesenî, `حدثنا` → haddesenâ).
- `وقال X: حدثنا Y` muallaktır: zincir X ile başlar, ilk sîga `kâle`.
- `و` ile bağlı hocalar tek kutu. Birini ötekinin hocası yapma.
- `كتبت عنه بمكة` gibi kayıtlar senede girmez, `%` notuna.
- `منهم عمرو` “içlerinde Amr da vardı” demektir; Amr zincire eklenmez.
- Zincir sözü söyleyenle biter. Nebî ﷺ zincire yazılmaz.
- Aynı maddede ikinci rivayet varsa maddeyi bölme; ikinci senedi metinde düzyazıyla yaz.
- Akrabalık üçüncü şahıs: `babası`, `dedesi`. `وجدت في كتاب أبي` → sened `babası → …`, sîga `vecedtü`. `قرأت على أبي` → `kara’tü`.

## Metin

- Tam, aslına sadık, yorumsuz. Özet yok. Parça uzunsa da baştan sona.
- `قال أبو عبد الله` → `Ebû Abdullah dedi ki:` (her geçtiği yerde; sayı denetlenecek).
- `صلى الله عليه وسلم` → `ﷺ` (ek, ﷺ’den önce: `Nebî’ye ﷺ`). Arapçada yoksa ekleme.
- Âyet tırnak içinde, nüsha yerini koru: `(Bakara 2/255)`. Nüsha vermediyse sen bul.
- `مثله` / `بهذا` atıfları: `(X’ten) bunun benzeri (rivayet edildi).` Yasak: `(şöyle rivayet etti)`, `(rivayet edildiğine göre)`.
- Yarım cümle Türkçede de yarım. `(?)` yok. Bozuk yer: `(metinde böyle)` / `(metin bu kısımda bozuktur)`.
- `يصلي` = kıldı, “okudu” değil. Adlar `araclar/sunan/sozluk.tsv`. Sözlükte yoksa baştaki kurallarla yaz, `gozden/pNNN.md` içine `SÖZLÜK` satırı ekle. Sözlük dosyasını değiştirme.
- Emin olamadığın yeri `gozden/pNNN.md`’ye madde numarasıyla yaz. Maddeyi kapatma.

## Bab

`باب …` → `… babı`. `باب` yoksa (`قراءة الفاتحة…`) sonuna `babı` ekleme. Başlık da tam çevrilir.
