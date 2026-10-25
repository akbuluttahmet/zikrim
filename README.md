# Zikrim — iPhone PWA (sürüm 2)

Ana ekrana eklenen, çevrimdışı çalışan kişisel zikir sayacı. Veriler telefondaki tarayıcı depolamasında (localStorage) tutulur.

## Sürüm 2'deki yenilikler
- **Gün bazlı sayaçlar:** Her gece yarısı sayaçlar kendiliğinden yeni güne geçer, eski günler geçmişte saklanır (~400 gün).
- **Seri ve haftalık grafik:** Üst kartta art arda zikir çekilen gün sayısı ve son 7 günün grafiği yer alır. Çubuğa dokununca o günün toplamı görünür.
- **Odak modu (⤢):** Tam ekran sayaç açılır. Ekranın herhangi bir yerine dokunarak sayılır. Ekran kapanmaz, zikirler arasında ‹ › ile geçilir.
- **−1 geri al:** Yanlış dokunuşları düzeltmek için kullanılır.
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
