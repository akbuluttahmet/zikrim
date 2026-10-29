# Sekîne — Zikir ve İlim (iPhone PWA)

Telefonun ana ekranına eklenen, çevrimdışı çalışan bir uygulama: zikir sayacı, Türkçe–Arapça hadis kütüphanesi, Selef’ten sözler ve Hanbelî fıkhı. Adres: https://akbuluttahmet.github.io/zikrim/ (repo adı `zikrim` kalır, uygulamanın adı Sekîne’dir). Sunucu yok; bütün veriler telefondaki tarayıcı depolamasında (`localStorage`) tutulur.

Derleme adımı yoktur; düz HTML/CSS/JS. Çalışma kuralları `CLAUDE.md`, hadis çeviri ve isnad şartnamesi `SPEC.md`, durum `PROGRESS.md` dosyalarındadır.

## Bölümler (alt sekme çubuğu)

- **Anasayfa** — Bütün kitaplıklardan rastgele rivayetler, zaman tüneli biçiminde; Kaydedilenler sekmesi ve koleksiyon etiketleri.
- **Akış** — Tam ekran rivayet kartları, isnad zinciriyle; kitap filtresi, ☆ kaydet, 📖 kitapta aç, 📸 görüntü paylaş.
- **Kütüphane** — Âlim → kitap düzeni: Musannef, Müsned, Sünen-i Ebî Dâvûd, ez-Zühd, Fezâilü’s-sahâbe, eş-Şerîa, el-İbâne, Şerhu’s-Sünne, İmam Ahmed’in risaleleri, el-Hallâl, el-Âcurrî, el-Buhârî, eş-Şâfiî, Ebû Dâvûd, Harb el-Kirmânî, Usûlü’s-Sünne; Kaydettiklerim ve Sözler. Rivayetlerde Arapça metin (Amiri yazı tipiyle) ve Türkçesi; isnad standardındaki kitaplarda her râvinin bir öncekinden hangi lafızla aldığını gösteren râvi paneli ve râvi sayfası.
- **Zikir** — Genel · Sabah · Akşam bölümleri. Uygulama yalnızca kaç kez okunduğunu sayar; hedef sayı göstermez, “Tamamladım”ı kullanıcı işaretler. Odak modu (ekrana dokunarak sayma), −1 geri al, günlük sayaçlar ve son 7 gün. Kendi zikrini ekleyebilirsin.
- **Profilim** — Okunan rivayet sayısı, günlük okuma hedefi, hedef zikirler, okumaya devam ettiklerin, kaydettiklerin, son 30 gün grafiği, yedek.
- **Arama (🔍)** — Bütün kütüphanede Türkçe ve Arapça arama (metin / sened).

## Ayarlar

Tema (Klasik, Doğa, Gece), hicrî takvim düzeltmesi, titreşim, Arapça metin ve sesli okuma düğmeleri, sesli okuma (telefonun kendi sesleri), sabah–akşam bildirimi (web push, GitHub Actions’tan gönderilir), son 30 gün, JSON yedek alma/yükleme, bugünü sıfırlama, varsayılan zikirleri geri getirme.

## Veri ve yedek

- Veriler yalnızca bu telefondadır. Uygulamayı silmeden ya da adresi değiştirmeden önce **Ayarlar → Yedeği kaydet**.
- Adres değişirse iOS veriyi yeni adrese aktarmaz; eski uygulamada yedek alıp yenisinde yükle.
- `localStorage` anahtarları `zikrim-…` ve `sekine-…` öneklidir; bu önekle adlandırılan her anahtar yedeğe girer.

## Yayın

`araclar/yayinla.sh "mesaj"`: `kontrol.py` denetimi, arama/havuz/râvi dosyalarının yenilenmesi (`ara.py`, `gunun.py`, `akis.py`, `ravi_kur.py`), `sw.js` içindeki `CACHE` sürümünün bir artırılması, commit ve push. Service worker eski önbelleği siler; büyük veri dosyaları (`ara.json`, `ara-ar.json`, `akis.json`, `ravi.json`) ayrı bir önbellekte tutulur ve yalnız sunucuda değiştiklerinde yeniden iner.

## Notlar

- Titreşim: iPhone’da web uygulamaları için resmî titreşim API’si yok; iOS 18+ için bilinen bir yöntem kullanılır.
- Amiri yazı tipi `fonts/` klasöründedir (SIL Open Font License, `fonts/OFL.txt`).
- Arapça metinler Şâmile’deki neşirlerden, OpenITI kopyaları aracılığıyla alınır; kaynaklar `CLAUDE.md`’de.
