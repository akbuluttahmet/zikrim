# Sened gözden geçirme görevi

Sünen-i Ebî Dâvûd çevirisinin bir parçasını İSNAD bakımından gözden geçireceksin. Çeviri başka bir çevirmen tarafından yapıldı; sen ayrı bir göz olarak kontrol ediyorsun. Metnin (matn) Türkçesi bu görevin konusu değil; ama gözüne açık bir anlam hatası çarparsa düzelt.

Önce oku:
1. /home/claude/is/kilavuz.md — özellikle “Sened”, “İsnad doğruluğu”, “Râvi paneli”, “Deneme parçasından çıkan kararlar”, “Kaynaktaki bilinen bozukluk” bölümleri.
2. /home/claude/is/sozluk_parca/<PARCA>.tsv — isim yazımları.
3. Girdi (Arapça): /home/claude/is/parca/<PARCA>.txt
4. Çeviri: /home/claude/is/cikti/<PARCA>.txt (bunu düzelteceksin)
5. Bu parça için çevirmenin bıraktığı notlar: /home/claude/is/notlar.md içinde “## <PARCA>” başlığı (varsa).

Her madde için:
1. **Zincir:** Arapça senedi râvi râvi say. Türkçe sened satırında aynı râviler aynı sırada mı? Eksik, fazla, yer değiştirmiş râvi var mı? Tahvîlde (ح) her yol `; ayrıca ` ile ayrılmış TAM zincir mi, birleşme noktası doğru mu? İsim sözlükteki yazımla mı?
2. **Sîga satırı (`& `):** her halkanın sîgası Arapçadaki lafızla (حدثنا→haddesenâ, عن→an, أخبرنا→ahberanâ, سمعت→semi‘tü, أن→enne, قال→kâle …) uyuşuyor mu? Sayı isim sayısına eşit mi?
3. **Notlar (`% `):** senedin içindeki râvi notları, lafız kayıtları, “المعنى” kayıtları % satırlarında mı? Sened satırında not/parantezli açıklama kalmış mı (yalnız “يعني” açıklamaları parantezle kalabilir)?
4. **Anlatıdan zincire eklenen kişiler:** Çevirmen bazı yerlerde sözü anlatan sahâbîyi (ya da başka birini) Arapçada açık bir sîga olmadan zincire `kâle` ile eklemiş. Karar: Bu kişi, aktarılan sözün/olayın KAYNAĞIYSA (tâbiî onun sözünü, Resûlullah’tan naklini ya da yaptığını aktarıyor) zincirde kalır. Yalnızca anlatının bir KAHRAMANIYSA (soru soran, kendisine soru sorulan ama hadisi nakletmeyen, olayda adı geçen) zincirden çıkar, sîgası da silinir.
5. **Metin başı (`^ `):** Senedi olan her maddeye, & ve % satırlarından sonra, Arapça metnin (matn) başladığı yeri gösteren bir satır ekle: `^ <Arapçadan aynen 3–6 kelime>`. Bu kelimeler Arapça metinde AYNEN (harf harf, noktalama dahil) geçmeli ve senedin bittiği yerden hemen sonra başlamalı: son râvinin adı ve onun “قال:”, “أنه”, “يقول:” gibi lafzından sonra, sözün/olayın ilk kelimesinden. Örnek: `… عن المغيرة بن شعبة «أن النبي صلى الله عليه وسلم كان` → `^ «أن النبي صلى الله عليه`. `… عن أنس بن مالك، قال: كان رسول الله صلى الله عليه وسلم إذا` → `^ كان رسول الله صلى الله`. Senedi olmayan maddeye ^ yazılmaz. Seçtiğin kelimeler metinde birden çok kez geçiyorsa daha uzun bir parça al.
6. Çevirmen notlarındaki (notlar.md) bu parçaya ait “GÖZDEN GEÇİR” ve “emin değilim” maddelerine bak, Arapçasına göre karar ver ve gerekirse düzelt.

Düzeltmeleri doğrudan /home/claude/is/cikti/<PARCA>.txt üzerinde Edit ile yap. Sonunda `python3 /home/claude/is/denetle.py <PARCA>` çalıştır; yalnız sezgisel “senedde râvi eksik olabilir / kısa olabilir” uyarıları kalabilir, diğer her sorunu düzelt (özellikle `^ metin başı Arapçada bulunamadı`).

Rapor (kısa): parça, kaç maddede zincir/sîga/not düzeltildi (her biri için numara + bir cümle), anlatıdan zincire eklenenler için kararların, notlardaki maddeler için kararların, eklenen ^ satırı sayısı.

## Deneme gözden geçirmesinden çıkan kararlar
1. Çevirmenin hiç eklemediği ama 4. kurala göre sözün KAYNAĞI olan kişi (ör. soruyu cevaplayan Âişe) varsa sen de zincire ekle (sîgası `kâle`).
2. “عن النبي ﷺ / عن رسول الله ﷺ / أن النبي ﷺ” ile biten senedlerde ^ bu ifadeden başlar (Resûlullah zincire yazılmaz). “بهذا الحديث / بمعناه / مثله” atıflarında ^ o atıf ifadesinden başlar.
3. Açık sîgası olmayan halkalarda çevirmenin seçimini koru.
4. Tahvîl isim farkı notunda yalnız Arapçada açıkça söyleneni yaz.
5. p001 dahil bütün parçalar aynı kurallarla gözden geçirilir.
6. Denetim artık % notlarındaki ﷺ’yi de sayıyor: ﷺ içeren isnad notlarını (ör. senedin içindeki “iki kıbleye namaz kılmıştı” türü tanıtımlar) % satırına taşıyabilirsin.
7. Sened satırında akrabalık her zaman üçüncü şahıs: babası, dedesi, amcası, annesi, ninesi, halası, dayısı (babam/dedem yazılmışsa düzelt; sonda betikle de düzeltilecek).
