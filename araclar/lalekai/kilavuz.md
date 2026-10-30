# el-Lâlekâî — çeviri kılavuzu (l12 ve sonrası)

Bu kılavuz, Şerhu usûli i‘tikâdi Ehli’s-sünne’nin kalan bölümlerini çeviren her oturum içindir. Önce
`SPEC.md`'yi baştan sona oku (isnad şartnamesi, sîga tablosu, örnekler); `CLAUDE.md` → “Çeviri kuralları”
ve “Şerhu usûli i‘tikâdi … (el-Lâlekâî)” maddesi de geçerlidir. Çelişkide SPEC.md geçerlidir.
**Örnek bölüm: `araclar/lalekai/ceviri/l12.txt`** (544.1–614, bütün durumlar orada var). Önce onu oku.

## Dosyalar ve akış

- Kaynak: `araclar/lalekai/kaynak/lNN.json` — bölümün Arapçası, sırayla parçalar:
  `{"no": N, "ar": …}` nüshadaki “N -” işaretiyle başlayan parça; `{"bas": 1, "ar": …}` işaretsiz başlık
  satırı (başlık ve hemen ardından gelen müellif metni aynı parçadadır, sen ayırırsın).
  Okumak için: `python3 -c "import json;[print(p.get('no','BAŞLIK'),'|',p['ar']) for p in json.load(open('araclar/lalekai/kaynak/lNN.json'))]"`
- Çeviri: `araclar/lalekai/ceviri/lNN.txt` (sen yazarsın; biçim aşağıda).
- Denetim: `python3 araclar/lalekai/derle.py lNN --kuru` (yazmadan denetler; 0 hata olana kadar düzelt).
- Derleme: `python3 araclar/lalekai/derle.py lNN` → `lalekai/tr/lNN.json` ve `lalekai/index.json`
  (n, t, from, to, b) güncellenir. Sonra `python3 araclar/dogrula.py lalekai --ravi --hepsi` çalıştır,
  kendi bölümünün (lNN.json) uyarılarına bak, gerçek hata olanları düzelt.
- Ahmet'in bakacağı yerler: `araclar/lalekai/notlar/lNN.md` dosyasına `- [ ] **lalekai N** — …` biçiminde yaz
  (GOZDEN.md'ye doğrudan yazma; koordinatör toplar). Bozuk metin, nüshada olmayan numaralar, bölünen/birleşen
  maddeler, emin olamadığın okuma, ad yazımı tereddüdü buraya.
- `git` kullanma, commit etme, başka bölümün dosyasına dokunma. `lalekai/index.json`'u elle düzenleme
  (derle.py yapar). Kaynak dosyalarını değiştirme.

## Çeviri dosyasının biçimi

```
# yorum
@ Türkçe bab başlığı
@ar =< Arapçada başlıktan sonraki metnin ilk kelimeleri
N | sened | metin
& sîga, sîga, …            (yollar ; ile; sened yoksa bu satır yazılmaz)
% panel notu                (n; birden çok satır olabilir)
^ matnın Arapçada başladığı ilk kelimeler     (^ - → k = 0)
=< ifade                    (bu maddenin Arapçası bu ifadeden hemen önce biter)
= Arapça                    (maddenin Arapçası tam olarak budur; nadiren gerekir)
+                           (madde bir sonraki parçayı da içine alır; birden çok olabilir)
:to N                       (tahvîl: metin N numaralı maddededir; etiket ve Türkçe metin kendiliğinden)
:l Etiket                   (ör. Ara metin, Numarasız rivayet)
:renum                      (parçanın nüsha numarası madde numarasından farklıysa, bilerek)
```

- Her Arapça harf ya bir bab başlığına ya bir maddeye gider. derle.py kaynağı baştan sona bir imleçle tüketir;
  artan ya da uyuşmayan olursa hata verir. Bir madde varsayılan olarak bulunduğu parçanın sonuna kadar
  (imleç önceki parçanın kuyruğundaysa ve aynı numaralı parça hemen ardındaysa onun da sonuna kadar) tüketir.
- `@ar` seçenekleri: `@ar *` (başlık parçasının tamamı başlıktır), `@ar =< ifade` (başlık, ifadeden önce biter;
  kalanı sonraki maddeye gider, genellikle `N.1` “Ara metin”), `@ar <Arapça>` (tam başlık metni, ör. bir maddenin
  sonuna yapışmış başlık: önceki madde `=< قول …` ile biter, bab `@ar قول أبي …` ile başlar).
- `=<` ifadesi imleçten sonra **ilk** geçtiği yerde keser; benzersiz olacak kadar uzun yaz
  (yalnız “أخبرنا” yazma; “أخبرنا أحمد بن عبيد” yaz).
- `^` ifadesi maddenin Arapçasında ilk geçtiği yer `k` olur; kelime başından başlat (“: من قال” değil “من قال”).
- Tahvîl maddesinde metin alanı boş bırakılır (`N | sened | `), `^ ح.` (ya da `^ ح`) ve `:to N` yazılır.

## Bölme, numara ve başlık kararları (kitabın kendi kuralları)

1. **Numaralar neşre göre.** Bir parçanın içinde yeni bir isnadla (أخبرنا/وأخبرنا/ذكر/وعن …) başlayan ikinci bir
   rivayet varsa ve hemen ardındaki numara nüshada **yoksa** (ör. 553'ün içindeki ikinci rivayet, 554 yok),
   ikinci rivayet o eksik numarayı alır (`=<` ile böl). Boş numara yoksa ikinci rivayet aynı maddede kalır.
   Nüshada hiç olmayan numaraları notlar dosyasına yaz.
2. **Yalnız `ح` ile biten parça ayrı maddedir** (etiketi “Tahvîl”, `:to` metnin olduğu madde). Art arda tahvîller
   aynı maddeyi gösterir (559, 560, 561 → 563). Aynı parçanın içindeki `ح` ise SPEC'teki gibi tek madde,
   sened satırında “; ayrıca” ile iki tam yol.
3. **Başlıklar** neşirdeki “سياق ما روي …”, “ذكر …”, “قول …” başlıklarının **tam** çevirisidir; kısaltma, özet,
   kendi başlığını uydurma yok. Başlık satırının içinde müellifin uzun açıklaması varsa o da başlıktadır
   (l12'nin ilk başlığı). “سياق ما روي في …” → “… hakkında rivayet edilenlerin bağlamı”; “قول فلان” → “Falanın sözü”.
   Maddesi olmayan üst başlık, sonraki başlığa “ — ” ile birleştirilir (aynı `@` satırında; iki `@ar` satırı).
4. Başlıktan sonra gelen numarasız müellif metni (âyet listesi, açıklama) ayrı maddedir: önceki numara + `.1`
   (aynı yerde birden çok varsa .1, .2 …), `:l Ara metin`, sened yok, `^ -`.
4a. Başlık parçasının içinde başlıktan hemen sonra bir isnad başlıyorsa (“قول جابر بن عبد الله أخبرنا محمد …”):
   `@ar =< أخبرنا محمد …` ile başlığı kes, ardından maddeyi yaz. Hemen ardındaki numara nüshada yoksa o numarayı
   ver; varsa önceki numara + `.1` ve `:l Numarasız rivayet`.
5. Sayfa sonuna bölünmüş ad listeleri (“ومن أهل البصرة …” gibi işaretsiz başlık sanılan satırlar) başlık değildir;
   ait oldukları maddeye `+` ile katılır (l12 585).
6. Bir maddenin sonuna yapışmış bir sonraki maddenin ilk kelimesi (ör. 576'nın sonundaki “أخبرنا”) `=<` ile
   kesilip sonraki maddeye verilir.
7. 7000 harfi aşan Türkçe metin cümle sonundan bölünür: N ve N.01 (`= …` ile Arapçayı da böl; etiketi
   `:l No. N (devamı)`). Nadiren gerekir.
8. Muhakkik dipnotları ve tahrîcleri kaynağa girmemiştir; müellifin kendi “أخرجه …” cümleleri çevrilir.

## Sened ve panel (SPEC'in kısa hâli + bu kitaba özel)

- `c[0]` her zaman `el-Lâlekâî` (derle.py ekler; sen yalnız sened ve sîgaları yazarsın). Sîga sayısı = ad sayısı.
- `أخبرنا`, `أنا`, `أنبأنا` → ahberanâ; `أنبا` → enbe’enâ; `ثنا`, `نا`, `حدثنا` → haddesenâ; `حدثني` → haddesenî;
  `أخبرني` → ahberanî; `سمعت`, **`سمعنا`** → semi‘tü; `عن` → an; `أن` → enne; `قال` (ara râvi) → kâle;
  `وجدت في كتاب` → vecedtü; `كتب إلي` → ketebe ileyye; `أُخبرت عن`, `حُدِّثت`, `بلغني` → unbi’tü.
  İcâzet (`إجازة`) ve “fîmâ ketebe ileyye” kayıtları sîgayı değiştirmez, `%` notuna gider (“Ahmed b. Kâmil’den icâzetle.”).
- Müellifin isnadsız nakilleri: `وعن فلان: …` → sened `Falan`, sîga `an`; `وقال فلان: …` / `وذكر فلان` /
  `ذكره عبد الرحمن بن أبي حاتم قال: ثنا …` → ilk sîga `kâle`; `وحكي عن` → `an`. Hiç ad yoksa (ad listesi,
  müellifin kendi sözü) sened boş, `&` yok.
- Önceki maddenin zincirine bağlanan kısa maddeler (`وسمعت فلانا`, `قال عبد الله: وسمعت فلانا`, `وسئل إسحاق مرة أخرى`):
  zincir yalnız **o maddenin Arapçasında yazan** adlardır; sözün kaynağı zincirin sonuna yazılır
  (`قال عبد الله: وسمعت عثمان يقول: …` → sened `Abdullah → Osman b. Ebî Şeybe`, sîga `kâle, semi‘tü`, metin “Osman … diyordu ki: …”).
- Anlatıda sözün KAYNAĞI (cevaplayan, Nebî'den nakleden, kendi yaptığını anlatan) `kâle` ile zincirin sonuna
  (SPEC §2). Metin anlatıcıyla başlayabilir (örnek: l12 549, 600, 610).
- Akrabalık bir önceki halkaya göre: `babası`, `kardeşi`; ad yazılıysa adı yaz, ilişkiyi `%` notuna
  (l12 572: “Amr b. Hazm, Ebû Bekir’in dedesidir.”).
- `يعني ابن فلان` → `Halef (b. Halîfe)`; `المعروف بكذا`, `نزيل كذا`, yer/zaman kayıtları sened satırına girmez → `%`
  (“Lüveyn diye bilinir.”, “Buhârâ’da.”). **“المعروف” kelimesini asla ada çevirme.**
- Mansub/mecrur adlar yalın yazılır: `سمعت بشارا` → Beşşâr; `أبا هريرة` → Ebû Hüreyre.
- “X ve Y” (و ile bağlı hocalar) tek halka; üç ve daha fazlası da “ve” ile: `Ziyâd b. Eyyûb ve Muhammed b. Abdullah ve Hasan b. Muhammed`.
- Adların yazımı: `python3 araclar/lalekai/ad_ara.py "عبد الرحمن بن مهدي"` (sözlük + kütüphanede yazılmış biçimler;
  `*` = Lâlekâî'de geçen biçim, onu kullan). Sözlük kuralları `araclar/sunan/sozluk.tsv` başında: ad tek başına ya da
  ilk öğe olarak geçince harf-i tarif yazılmaz (Hasan b. Ali, Hakem b. Mûsâ, Abbâs), ad içinde yazılır (Saîd b. el-Müseyyeb).
  Lâlekâî'nin sık hocaları: Ahmed b. Ubeyd, Ali b. Abdullah b. Mübeşşir, Ahmed b. Sinân, Hasan b. Osman, Îsâ b. Ali,
  Ubeydullah b. Ahmed, Ubeydullah b. Muhammed b. Ahmed, Hüseyin b. İsmâîl, Abdullah b. Muhammed el-Begavî,
  Abdurrahmân b. Ebî Hâtim, Muhammed b. el-Hüseyin el-Fârisî, Ali b. Muhammed b. Ömer, Ca‘fer b. Abdullah b. Ya‘kûb,
  Muhammed b. Hârûn er-Rûyânî, Ali b. Muhammed b. Ahmed b. Bekrân, Kâsım b. Ca‘fer, Ahmed b. Kâmil, Ebû Zur‘a.

## Metin

- Tam ve sadık; özet, atlama, yorum yok. Her cümle Arapçasıyla eşleşmeli; bitirince maddeyi Arapçasıyla
  cümle cümle karşılaştır. İzin verilen tek not: (metinde böyle) / (metin bu kelimede bozuktur) / (metin bu kısımda bozuktur).
  `(?)` asla. Eksik öğe parantezle: `(Allah’a) sığındı`.
- Metin sözü söyleyenle başlar: `Abdullah dedi ki: Resûlullah ﷺ şöyle buyurdu: “…”`; `عن X أن النبي ﷺ` → `X’ten: Nebî ﷺ …`;
  `كان فلان يقول` → `Falan şöyle derdi:` / `… diyordu ki:`. Ara râvilerin “dedi ki”leri metinde tekrarlanmaz.
- Saygı ifadeleri yalnız Arapçada varsa: ﷺ, (aleyhisselâm), (radıyallâhu anh/anhâ/anhüm), (azze ve celle), teâlâ,
  tebâreke ve teâlâ, (rahimehullâh).
- Âyet tırnakla ve yeriyle: `“…” (Tevbe 9/6)`; neşirdeki yer yanlış/eksikse doğrusunu yaz (birden çok âyet: 85/21-22).
- Terimler `araclar/lalekai/sozluk.tsv`; kalıplar: `أخرجه البخاري عن فلان` → “Bunu Buhârî Falan’dan tahric etti.”;
  `مثله` → “bunun benzeri”; `نحوه` → “buna yakını”; `بمعناه` → “bunun manası”; `لفظي بالقرآن مخلوق` →
  “Kur’ân’ı lafzım mahlûktur”; `القرآن بلفظي` → “Kur’ân benim lafzımla”; `اللفظية` → Lafzıyye; `الجهمية` → Cehmiyye,
  `جهمي` → Cehmî; `القدرية` → Kaderiyye; `المرجئة` → Mürcie; `الرافضة` → Râfıza.
- Tırnak “ ”, iç tırnak ‘ ’; özel adlarda ‘ ’ â î û.

## Bitirince

1. `derle.py lNN --kuru` 0 hata → `derle.py lNN`.
2. `python3 araclar/dogrula.py lalekai --ravi --hepsi` → kendi dosyanın HATA'sı 0 olmalı; “k kelime ortasında”,
   “sîga sayısı uyuşmuyor”, “metin son râviyle başlamıyor” uyarılarını tek tek kontrol et (gerçek hata ise düzelt).
3. Rastgele 5 maddeyi Arapçasıyla yeniden karşılaştır (atlanan cümle, yanlış ad, yanlış sîga).
4. Koordinatöre kısa rapor: madde sayısı, nüshada olmayan numaralar, verdiğin bölme kararları, notlar dosyası.
