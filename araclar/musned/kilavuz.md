# Müsned (İmam Ahmed b. Hanbel) çeviri kılavuzu

Kaynak: Şuayb el-Arnaût tahkiki, Müessesetü’r-Risâle (1421/2001), Şâmile no. 25794.
Bu kılavuz `SPEC.md` ve `araclar/sunan/kilavuz.md` kurallarını Müsned’e uyarlar; çelişki olursa `SPEC.md` geçerlidir.

## Müsned’e özel kurallar

1. **Müellif (`c[0]`):**
   - Standart maddelerde (`ziyade` 0 veya 1): `c[0] = "Ahmed b. Hanbel"`.
   - Arapçası `"حدثنا عبد الله"` ile başlayıp `"حدثني أبي"` içermeyen maddelerde (Abdullah b. Ahmed’in ziyâdeleri, `ziyade` 2) ve Abdullah’ın babasının kitabında bulduklarında (`ziyade` 3, vicâde): `c[0] = "Abdullah b. Ahmed"`.
   - `"حدثنا عبد الله، حدثني أبي"` öneği sened satırına yazılmaz; panelde yalnız `c[0]` olarak durur.
   - Nüsha senedi (el-Katîî, İbnü’l-Müzhib, İbnü’l-Husayn) 0 numaralı maddededir; hadis zincirlerine ve panel notlarına girmez.
2. **Ziyâde alanı (4. alan):**
   - Neşirdeki işarete göre korunur: `0` (işaretsiz), `1` (`*`), `2` (`•`, Abdullah ziyâdesi), `3` (`°`, vicâde).
3. **Dipnot ve hüküm:**
   - Muhakkiklerin (Şuayb el-Arnaût vb.) tahkik dipnotları ve sıhhat hükümleri alınmaz.
   - İmam Ahmed’in ve Abdullah b. Ahmed’in metin/sened içindeki kendi sözleri ve lafız kayıtları eksiksiz çevrilir (`قال عبد الله: …` → `Abdullah dedi ki: …`).
4. **Başlıklar:**
   - Bölüm başlıklarında sahâbîye `(radıyallâhu anh)` / `(radıyallâhu anhâ)` nüshadaki `"رضي الله عنه"` ifadesine uygun olarak yazılır.

## Sened, panel ve metin kuralları (`SPEC.md`)

- **Sened satırı (2. alan):** Yalnız râvi adları ve `→`. Parantez yalnız metnin kendi açıklaması içindir (`- يعني ابن أبي خالد -` → `İsmâîl (b. Ebî Hâlid)`). Râvi tanıtımları, lafız kayıtları ve sened içi açıklamalar `%` not satırlarına gider.
- **Akrabalık:** Sened satırında hep üçüncü şahısla (`babası`, `dedesi`, `amcası`).
- **Son halka:** Merfû hadiste sahâbîyle biter (`Nebî ﷺ` / `Resûlullah ﷺ` zincire yazılmaz). Anlatı biçimindeki rivayetlerde sözün ya da olayın kaynağı olan kişi (soruyu cevaplayan, Resûlullah’tan ﷺ nakleden, kendi başından geçeni anlatan) açık sîga olmasa da zincirin sonuna `kâle` ile yazılır.
- **Sîgalar (`&` satırı):** Yalnız `SPEC.md` §3’teki 17 sîga (`haddesenâ`, `haddesenî`, `ahberanâ`, `ahberanî`, `enbe’enâ`, `semi‘tü`, `semi‘a`, `an`, `enne`, `kâle`, `haddesehû`, `haddesehüm`, `ahberahû`, `ahberahüm`, `kara’tü`, `kurie`, `unbi’tü`). Her râvinin sîgası Arapçada kendi adından **önce** gelen lafızdır (`أن أبا بكر حدثه` kalıbında `أبا بكر`in önündeki lafız `أن` olduğu için `siga_hizala.py` bunu `enne` olarak eşler ve `حدثه قال:` kısmını `k` sonrasına bırakır).
- **Metin başı (`^` satırı):** Arapça metinde son râvi adından hemen sonra (varsa `رضي الله عنه، قال:` / `حدثه، قال:` dâhil) matnın başladığı yer; `siga_hizala.py` ile uyumlu seçilir.
- **Metnin sözü söyleyenle başlaması:** Her maddede Türkçe metin, Arapçadaki son râvinin sözüyle açılır (`عن أبي بكر الصديق قال: قال رسول الله` → `Ebû Bekir es-Sıddîk dedi ki: Resûlullah ﷺ buyurdu:`; `عن أبي بكر الصديق: أن النبي ﷺ قال` → `Ebû Bekir es-Sıddîk’tan: Nebî ﷺ buyurdu:`). Son râvinin `قال:` cümlesi asla düşürülmez.
- **Arapçada olmayan kelime ve açıklama yasağı:**
  - Arapçada karşılığı olmayan tamlama/kelime (`فيما بينهم وبين الله` için `"kulluk vazifelerini"` gibi) eklenmez; `"kendileriyle Allah azze ve celle arasındakini"` şeklinde birebir çevrilir. Cümle yapısı için zorunlu kelime eklemesi yalnız parantez içinde yapılır.
  - Râvi lakaplarına veya kelimelere dışarıdan sözlük/ansiklopedi açıklaması (`صاحب الدقيق` yanına `(un satıcısı)` gibi) eklenmez. Lakap ya senedde adın parçası olarak (`Sadaka b. Mûsâ Sâhibü’d-Dakîk`) ya da `%` notunda aynen (`Sadaka b. Mûsâ, Sâhibü’d-Dakîk’tir.`) yazılır.
- **`%` notlarının kapsamı:**
  - `%` satırı **yalnız senedin içindeki** notlar içindir. Metin içinde veya metin sonunda geçen lafız/vecih farkları (ör. 2. maddede Mis‘ar/Süfyân, 8. maddede Yûnus/Hasan el-Eşyeb) yalnız metinde çevrilir, `%` notuna kopyalanmaz.
  - `%` notlarında `"belirtti"`, `"kaydetti"`, `"Abdullah b. Ahmed dedi ki:"` gibi Arapçada olmayan anlatım/atıf eklenmez; Arapça ibare doğrudan çevrilir (ör. `حدثني أبي أحمد بن محمد بن حنبل بن هلال بن أسد من كتابه` → `Babam Ahmed b. Muhammed b. Hanbel b. Hilâl b. Esed, kitabından.`; `وسمعته من عبد الله بن أبي شيبة` → `Onu Abdullah b. Ebî Şeybe’den (de) işittim.`).
- **Üç nokta (`...` / `…`) yasağı:** Arapçada olmayan `...` konulmaz; yarım kalan cümle Türkçede de yarım kalır (ör. `"Resûlullah’ı ﷺ buyururken işittim"`). `…` yalnız nüshada okunamayan/boşluk olan metin içindir.
- **Tazim ifadeleri:** `"Allah Azze ve Celle"` değil `"Allah (azze ve celle)"`; `"Rabbine (Azze ve Celle)"` değil `"Rabbine (azze ve celle)"` (küçük harfle ve parantez içinde) yazılır.
- **Âyetler:** Âyet tercümeleri tırnak içine alınır ve sûre/âyet numarası parantezle verilir: `“…” (Âl-i İmrân 3/33)`.
- **Kelime karşılıkları:** `استعبر` fiili `"hıçkırık tuttu"` değil `"gözleri yaşardı"` olarak çevrilir.
