# Sekîne / Zikrim — yalnız kütüphane kaynaklı AI

Bu entegrasyon, uygulamanın **mevcut** `ara.json` indeksini kullanarak kaynak destekli kısa açıklama üretir. Model kütüphanenin dışında kaynak aramaz; ağ üzerinden başka dinî metin indirilmez. Başarısız olduğunda cevap uydurmak yerine "yeterli kaynak yok" der.

## Dosyalar

- `../ai.js`, `../ai.css`: Tam ekran, tema uyumlu mobil soru-cevap arayüzü.
- `../ara-worker.js`: Mevcut yerel arama işçisine salt okunur `type:'ai'` eklentisi; en çok 7 ilgili rivayet seçer.
- `src/index.js`: Sunucu tarafında asıl `ara.json` ile seçili referansları tekrar doğrular, ardından Gemini'den yapılandırılmış cevap ister. Modelin önerdiği kaynak kimlikleri gerçek seçili kaynaklarla eşleştirilir.
- `wrangler.toml`: Cloudflare Workers ücretsiz planı için yapılandırma.

## İlk kurulum (uygulama sahibi)

1. [Google AI Studio](https://aistudio.google.com/apikey) üzerinde bir API anahtarı oluştur. **Ücretsiz kota sınırlarını ve hesabının ücretlendirme ayarlarını kontrol et.** Anahtarı hiçbir zaman GitHub'a, `ai.js` dosyasına veya uygulamadaki "AI sunucusu" alanına yazma.
2. [Cloudflare](https://dash.cloudflare.com/) hesabını aç; bilgisayarın terminalinde `cd ai-worker`, ardından `npx wrangler login` komutunu çalıştır.
3. `npx wrangler secret put GEMINI_API_KEY` komutuyla Gemini anahtarını sunucuya gizli değişken olarak gir.
4. `npx wrangler deploy` komutuyla Worker'ı yayımla. Çıkan `https://...workers.dev` adresini kaydet.
5. Zikrim AI ekranını aç → "AI sunucusu bağlantısı" → **Worker adresini** yaz → Kaydet. Böylece sadece o tarayıcıdaki test açılır. Tüm ziyaretçiler için kullanıma sunarken `../ai.js` dosyasındaki `DEFAULT_ENDPOINT` değerini bu HTTPS adresine değiştir.
6. Önce yapay zekâ sorularını test et, ardından pull request'i `main` dalına birleştir. GitHub Pages yayımlandığında iPhone uygulamasını kapatıp aç.

**Kod tek başına API anahtarı oluşturmaz, Cloudflare Worker yayımlamaz ve ücretsiz kullanım kotasını artırmaz.** Bunlar için hesap sahibi işlem yapmalıdır.

## Test senaryoları

- "İman artar ve eksilir mi?" → mümkünse İmam Ahmed / ilgili rivayet, kaynak numarasıyla.
- "Sabır hakkında hangi rivayetler var?" → yalnız kütüphaneden alıntı; atıf düğmesi metnin kendisini açmalı.
- "Mars'ta kaç cami var?" → kütüphanede yeterli kaynak bulunamadı.
- Doğru API adresi ama anahtar yok → "Gemini API anahtarı henüz tanımlanmadı".
- Kota 429 → kullanıcıya ücretsiz kota sınırı mesajı; ücretli modele otomatik geçiş olmaz.
- İnternet kesikken sayaç çalışmaya devam etmeli; AI ise internet gerektirir.
- Karanlık / doğa / klasik temalarda, uzun Arapça metinde ve iPhone klavyesiyle arayüz kontrolü.

## Güvenilirlik ve sınırlamalar

- **Kaynak doğrulaması:** İstemciden sadece `question` ve `ids` alınır; alıntı kaynağı sunucunun yayımlanmış `ara.json` indeksinden tekrar okunur. İstemcinin sahte metin göndermesi mümkün değildir.
- **Özet sınırı:** Girdi başına 7 rivayet, rivayet başına 1700 karakter, çıktı başına 2800 karakter. Çok uzun rivayetlerin gerekli kısmı kesilebilir. Yanıtın mutlak doğruluğu garanti edilemez.
- **Arama:** Basit anahtar kelime puanlamasıdır; anlamsal bir vektör/embedding indeksi henüz yoktur. Bu nedenle ilgili kaynak bazen gözden kaçabilir. Yanıt yok denildiğinde kütüphanede kesinlikle hiçbir bilgi olmadığı sonucuna varılmamalıdır.
- **Fetva:** Bu sistem bir âlimin yerine geçmez; rivayet veya mezhep hükümlerinin doğruluğu kaynak metinden ayrıca kontrol edilmelidir.
- **Kota:** Cloudflare Free günlük istek ve CPU sınırları, Gemini ücretsiz model kullanım sınırları vardır. Büyük `ara.json` dosyasını sunucuda yükleyip ayrıştırma işlemi Worker Free 10ms CPU/128 MB bellek limitini aşarsa indeksi daha küçük dosyalara bölmek gerekecektir.
- **Kötüye kullanım:** CORS/Origin kontrolü bir kimlik doğrulama veya hız sınırı değildir. Herkese açık dağıtımdan önce Cloudflare WAF/rate limiting veya Turnstile ve sunucu tarafı limitleri eklenmeli. Aksi hâlde otomatik botlar ücretsiz kotayı tüketebilir.
- **Gizlilik:** API'ye soru metni ve mevcut kütüphane alıntıları gönderilir; model sağlayıcısının ücretsiz katman veri kullanım koşulları geçerlidir. Özel kişisel verileri içeren sorulara teşvik etme.
- **Yayın:** `main` korunur; yeni kod önce ayrı branch/PR üzerinde gözden geçirilir.

## API şekli

`POST /ask`:

```json
{"question":"İman artar ve eksilir mi?","ids":["12","345"]}
```

Yanıt:

```json
{"answer":"...","sources":[{"id":"12","v":"usul","b":0,"n":13,"book":"...","excerpt":"..."}],"insufficient":false}
```

Yalnız doğrulanmış kaynak kimlikleri geri döner. Verilen örnek numaralar gösterim amaçlıdır.
