# Sekîne — Gemini ile kaynak seçme denemesi

Bu ilk sürüm, mevcut Türkçe kütüphane metinlerini arar; Gemini bulunan sekiz
aday arasından soruyu doğrudan karşılayan en fazla üç kaydı seçer. Ekrandaki
alıntı, Arapça, sened, kaynak adı ve numara asıl JSON dosyalarından gelir.
Modelin serbest metni kullanıcıya gösterilmez. Kaynak bulunamazsa yetersiz
dayanak mesajı gösterilir; servis hatası bu durumdan ayrı bildirilir.

Bu bir model eğitimi değildir. Kaynakları, sorgu eşlemelerini ve onaylı örnek
soruları yöneterek sistemi geliştirebilirsin. İlk arama sürümü SQLite FTS5/BM25,
Türkçe harf normalleştirme, sınırlı ek temizleme ve açık sorgu eşlemeleri kullanır.
Vektör tabanlı anlamsal arama henüz yoktur. Model adaylara gelmeyen bir kaynağı
bulamaz; kaynak seçimi soruyu doğru anlama veya dinî değerlendirme garantisi vermez.

## Anahtarsız yerel deneme

Python 3.12+ (SQLite FTS5 desteği) ve Node.js 20+ gerekir. Ek Python/npm paketi yoktur.
Komutları depo kökünden çalıştır:

```sh
python3 araclar/ai_indeks.py
python3 -m unittest ai.test_ai -v
python3 -m ai.server
```

`http://127.0.0.1:8787` adresini aç. Kütüphane → Kaynaklara sor → Kaynak ara.
Anahtarsız sonuçlar açıkça **arama sonucu** olarak gösterilir; Gemini cevabı sayılmaz.
Kaynağı, tam Türkçe metni, senedi, Arapçayı ve nüsha notunu okuyabilirsin.
“Kitapta aç” mevcut kitap okuyucusunu açar.

## Gemini'yi etkinleştirme

1. Google AI Studio'da bir API anahtarı oluştur. `generateContent` ve yapılandırılmış
   JSON çıktısını destekleyen, hesabında erişilebilir bir modelin kimliğini seç.
   Ücretsiz kota ve model erişimi güncel Google koşullarına bağlıdır; sabit bir
   ücretsiz kullanım miktarı varsayılmamıştır.
2. `ai/.env.example` dosyasını `ai/.env` olarak kopyala. `GEMINI_API_KEY` ve
   `GEMINI_MODEL` alanlarını doldur. Anahtarı sohbete, HTML'e veya GitHub'a koyma.
3. Bu değerleri sunucunun ortam değişkenlerine yükleyip sunucuyu başlat. Yerelde
   POSIX kabuk kullanıyorsan:

```sh
set -a
. ./ai/.env
set +a
python3 -m ai.server
```

“Gemini ile seç” soruyu ve bulunan Türkçe alıntıları Google'a gönderir. Tarayıcı
isteği kendi sunucuna yapar; Gemini anahtarı yalnız sunucuda kalır. Web arama
veya dış kaynak aracı verilmez. Anahtar ve model olmadan gerçek Gemini testi
yapılmış sayılmaz. `health` ucu yalnız yapılandırmanın varlığını bildirir,
anahtarın geçerliliğini veya kullanılabilir kotayı kanıtlamaz.

## Kendi örneklerinle geliştirme

`ai/examples.jsonl` başlangıç için **12 onaysız taslak** içerir. Beşi kaynak bulma,
yedisi kapsam dışı soru, kaynak uydurma ve yanlış isnat senaryosudur.

- `question`: sorunun metni.
- `library`: kitaplık filtresi; boşsa tüm izinli kaynaklar.
- `expected_ids`: kabul ettiğin kaynak kimlikleri (`musannef:k21:29148` gibi).
- `should_abstain`: mevcut kaynaklarla cevap verilmemesi gerekiyorsa `true`.
- `reviewed`: kaynakları kendin kontrol edip onayladığında `true`.

Taslakları Gemini çağırmadan dene:

```sh
python3 -m ai.evaluate --include-drafts --report ai/reports/retrieval.json
```

Onayladığın soruları gerçek modelle dene (API kotası kullanır):

```sh
python3 -m ai.evaluate --gemini --report ai/reports/gemini.json
```

Onaylı soru yoksa ikinci komut durur; onay varmış gibi başarı raporu vermez.
Gerçek modelle taslakları da denemek için açıkça `--include-drafts` ekleyebilirsin.
`retrieval_hit_at_8`, olumlu soruda beklenen kaynaklardan en az birinin ilk sekizde
bulunma oranıdır. Yedi olumsuz senaryo bu arama oranına katılmaz; gerçek Gemini
çağrısıyla `answer_pass_rate` ölçülür. Olumlu cevapların seçtiği bütün kimliklerin
onaylı beklenenler listesinde bulunması istenir. Bu küçük ve yönlendirilmiş set
üzerindeki oranlar genel kalite veya sıhhat doğruluğu iddiası değildir. Sonraki
aşamada farklı kitaplardan 100–200 soru eklemek gerekir.

Ekrandaki “Sonucu değerlendir / düzelt” ile doğru kaynağı işaretleyip açıklama
yazabilir, JSON dosyası indirebilirsin. Kaynak eksikse notta eser ve numarasını
belirt. İndirilen kayıt `reviewed:false` olur; onu kontrol edip uygun alanlarını
örnek dosyasına ekle. Düzeltmeler otomatik öğrenmeye veya kaynak metinlerine
yazılmaz. `ai/sources.json` içindeki `aliases` kelime eşlemelerini yönetir;
örnek dosyası değerlendirme içindir, modele cevap anahtarı olarak gönderilmez.

## Kaynak kapsamı ve güncellemeler

- `ai/sources.json` içindeki izinli kitaplıklar, kendi `index.json` ve `tr/*.json`
  dosyalarından okunur; `t:0` bölümler alınmaz. `usul.js` ayrıca okunur.
- Kaynak/nüsha adları uygulamanın mevcut `LIBS` tanımlarından çıkarılır. Eser
  bazında ayrıntı mevcut değilse ayrıca uydurulmaz.
- `gunun.json`, `akis.json`, fıkıh özetleri, kullanıcı zikirleri, GitHub'daki
  çalışma notları ve internet içerikleri cevap kaynağı olarak kullanılmaz.
- Mukaddime/no.0 (ez-Zühd'de no.1), bozuk metin notu içeren kayıtlar ve 100
  karakterden kısa bağımlı “benzerini” türü parçalar bu denemede dışarıdadır.
  Uzun kayıtlar atılmaz; özgün metin bozulmadan arama parçalarına ayrılır. Ekran
  seçilen parçayla beraber tam metni açma olanağı sunar.
- Kimlikler kitaplığın listedeki sırasından değil dosya adından ve numaradan
  üretilir. Kesirli numaralar ve `info.l` etiketleri korunur. Dosya adı değişirse
  örnek sorulardaki kimlikler de gözden geçirilmelidir.
- `excluded_ids` ile kaynak kaldırabilirsin. Her içerik, izin veya eşleme
  değişikliğinde indeksi yeniden üretip API'yi yeniden başlat. Önce bütün yeni
  indeks hazırlanır; hata olursa eski indeks korunur. Silinen kayıt başarılı
  yeniden derlemeden sonra eski indekste kalmaz.
- Her cevapta kaynak sürümü vardır. Kitapta açarken dosya, numara ve tam metin
  mevcut PWA ile karşılaştırılır; sürümler uyuşmuyorsa yanlış rivayete gidilmez.
- Kaynak metninde geçen hüküm bir alıntıdır. Modelin kendi sıhhat, râvi, fetva
  veya kişiye uygulanacak hüküm üretmesi bu sürümde desteklenmez.

## GitHub Pages ve sunucu

GitHub Pages Python API çalıştırmaz. Mevcut PWA adresini ve `localStorage`
anahtarlarını koruyarak API'yi ayrı bir HTTPS sunucuda çalıştırabilirsin.

1. Aynı kaynak sürümünü sunucuya al, indeksi üret, ortam değişkenlerini tanımla.
2. Dış erişim için `AI_ACCESS_TOKEN` en az 24 karakter olmalı.
   `AI_ALLOWED_ORIGINS=https://akbuluttahmet.github.io` ayarı yalnız bu tarayıcı
   kökenine CORS izni verir; CORS erişim kodunun yerine geçmez.
3. HTTPS yönlendirmesinin arkasında `python3 -m ai.server --host 0.0.0.0 --port 8787`
   çalıştır. Erişim kodunu arayüzün istediği zaman gir; yalnız pencere belleğinde
   tutulur, localStorage'a veya yedeklere yazılmaz.
4. `index.html` içindeki `sekine-ai-api` meta alanını
   `https://sunucu-adresin/api/ai` yap. Bu alan herkese açık API adresidir;
   Gemini anahtarı veya erişim kodu buraya yazılmaz.
5. Arayüzü yayımlarken normal `sw.js` önbellek sürümünü artır. Kitaplar ve zikir
   işlevleri çevrimdışı kullanılmaya devam eder; AI API yanıtları önbelleğe alınmaz.

Alternatif olarak aşağıdaki Docker dosyası aynı PWA ve API'yi tek sunucuda sunar:

```sh
docker build -f ai/Dockerfile -t sekine-ai .
docker run --rm --env-file ai/.env -p 8787:8787 sekine-ai
```

Docker komutu tek başına HTTPS sağlamaz. Bu kişisel deneme içindir; ortak erişim
kodu halka açık uygulama için kullanıcı oturumu yerine geçmez. Sunucu tek
süreçte dakikada 6, kayan 24 saatte varsayılan 60 istek ve aynı anda 2 işlemle
sınırlıdır. Sayaç süreç yeniden başlayınca sıfırlanır. Çok kullanıcılı yayın
için ortak/kalıcı kota, kullanıcı oturumları ve sunucu barındırma ayrıca gerekir.
Günlük sınır `AI_DAILY_LIMIT` ile ayarlanabilir. Hatalı sağlayıcı yanıtları ve
sınır aşımı otomatik yeniden denenmez.

## Kontroller

```sh
python3 -m unittest ai.test_ai -v
python3 -m ai.evaluate --include-drafts
node --check ai.js
node --check script.js
node --check sw.js
python3 araclar/kontrol.py
```

Testlerde Gemini'nin HTTP yanıtı sahte sağlayıcıyla sınanır; canlı API'ye çağrı
yapılmaz. Asıl kaynak dosyaları değiştirilmez. `ai/.data`, `.env`, raporlar ve
Python önbellekleri Git'e girmez.
