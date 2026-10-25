# Zikrim — iPhone PWA (sürüm 2)

Ana ekrana eklenen, çevrimdışı çalışan kişisel zikir sayacı. Veriler telefondaki tarayıcı depolamasında (localStorage) tutulur.

## Sürüm 2'deki yenilikler
- **Gün bazlı sayaçlar:** Her gece yarısı sayaçlar kendiliğinden yeni güne geçer, eski günler geçmişte saklanır (~400 gün).
- **Seri ve haftalık grafik:** Üst kartta art arda zikir çekilen gün sayısı ve son 7 günün grafiği yer alır. Çubuğa dokununca o günün toplamı görünür.
- **Odak modu (⤢):** Tam ekran sayaç açılır. Ekranın herhangi bir yerine dokunarak sayılır. Ekran kapanmaz, zikirler arasında ‹ › ile geçilir.
- **−1 geri al:** Yanlış dokunuşları düzeltmek için kullanılır.
- **Sıralama:** Ana ekranda kartın solundaki ⋮⋮ tutamacını basılı tutup sürükleyerek sıra değiştirilir.
- **Yeni zikirler (2.3):** 30 dua ve zikir eklendi (peygamber duaları, uyanış, rızık, sabır, tevekkül vb.); mevcut listeye bir kez otomatik eklenir.
- **Yeni zikirler (2.4):** 27 zikir daha (koruyucu dualar, Esmâü’l-Hüsnâ, istiğfar, tesbih, sıkıntı duaları); aynı olanlar mevcut kartlarla birleştirildi.
- **Sabah ve Akşam Zikirleri (3.0):** Tema seçiminin altındaki iki butonla açılan ayrı bölümler; sahih sabah-akşam zikirleri ayrı sayaçlarla. Butonlarda o günün ilerlemesi görünür.
- **Hanbelî Fıkhı (3.2):** Zâdü’l-Müstakni‘ ve er-Ravzu’l-Mürbi‘ bab sırasıyla, mezhebin mu‘temed görüşüne göre 16 bölümlük Türkçe özet (tahâretten yargıya), aranabilir; mezhebin temel eserleri rehberi.
- **Selef’ten Sözler (3.1):** Mücâhid, Âcurrî, Berbehârî, İbn Batta ve Hallâl’in eserlerinden kaynaklarıyla doğrulanmış sözler (Arapça + Türkçe), âlime göre gruplu okuma kartları.
- **Dua sırası (2.6):** Zikirler Hanbelî dua edebine göre bölümlere ayrıldı: Hamd ve Senâ → Salavat → Tevbe ve İstiğfar → Dua (ahiret, dünya, korunma) → Kapanış; özel durum duaları en sonda.
- **Arama:** Ad, anlam veya okunuşa göre zikir arama.
- **Sade görünüm (☰ Sade):** Kartlarda yalnızca ad, sayaç ve düğmeler gösterilir.
- **Kendi zikrini ekle / düzenle (⋯):** Ad, Arapça metin, okunuş, anlam ve hedef girilebilir. Sıralama değiştirilebilir, zikir silinebilir (geri alınabilir).
- **Geri alınabilir sıfırlama:** Onay penceresi yerine "Geri al" düğmesi çıkar.
- **Ayarlar (⚙︎):** Titreşim açma/kapama, son 30 günün geçmişi, JSON yedek alma/yükleme ve silinen varsayılan zikirleri geri getirme.
- **iOS ikonu:** `apple-touch-icon.png` eklendi, çünkü iOS ana ekranda SVG ikonu göstermiyor.
- **Güncellemeler:** Service worker eski önbellekleri temizliyor ve yeni dosyaları arka planda indiriyor.
- **Veri taşıma:** Sürüm 1'deki sayaçlar ve tema ilk açılışta otomatik olarak taşınır.

## Güncelleme
Dosyaları önceki sürümün yayımlandığı yerde değiştirin. Adres aynı kalırsa veriler korunur. Değişiklikten sonra uygulamayı bir kez kapatıp açın. Sonraki güncellemelerde `sw.js` içindeki `CACHE` adını artırın (`zikrim-v3` gibi).

> Adres değişirse (ör. yeni bir siteye taşıma) iOS veriyi yeni adrese aktarmaz. Taşımadan önce eski uygulamada yedek alıp yenisinde yükleyin.

## Notlar
- Titreşim: iPhone'da web uygulamaları için resmî titreşim API'si yok. iOS 18 ve sonrası için bilinen bir yöntem kullanıldı, daha eski sürümlerde titreşim olmayabilir.
- Sayaç hedefleri kullanışlı örnek değerlerdir, dinî bakımdan zorunlu sayı iddiası taşımaz.
