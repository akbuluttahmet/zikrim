# Gözden geçirilecekler

Ahmet'in kendisinin bakacağı yerler: çeviri eksikleri, dinî/metin kararları ve araçların yakalayıp kendi başına karar veremediği maddeler. Oturumlar buraya **yalnız ekler**; bir maddeyi Ahmet kapatır (satırı siler ya da başına `✓` koyar). Mekanik kontrol listeleri `PROGRESS.md`'de, uzun notlar kitaba özel dosyalarda (`araclar/sunan/notlar.md`) kalır.

Biçim: `- [ ] kitaplık no — mesele. Seçenekler. (tarih)`

## 1. Karar bekleyen çeviri / isnad yerleri

- [ ] **seria 1927** — Arapça: `حدثنا أبو عبيد الله القرقساني، وقال ابن الفحام: عن غالب بن عبيد الله العقيلي`. İbnü'l-Fahhâm'ın yolunda hoca farklı adlanıyor (ya da farklı kişi). Şu an tek zincir + `n` notu. Seçenek: iki yollu tahvîl (`…; ayrıca … Gālib b. Ubeydullah el-Ukaylî → Atâ …`). (2026-10-29)
- [ ] **seria 1020** — `صاحب رسول الله ﷺ، قتيل البطحاء يوم الفتح، حزام المحدث` kaydı Hizâm'a mı, dedesi Hubeyş'e mi ait? `n`'ye "Hizâm adından sonra şu kayıt vardır" diye yorumsuz yazıldı. (2026-10-29)
- [ ] **seria 964** — `حدثت عن حليمة` → `unbi’tü`; `حدثني من سمع …` → "…’i işiten biri" halkasına `haddesenî`, Abdullah b. Ca‘fer'e `semi‘a`. Sîga seçimine bak. (2026-10-29)
- [ ] **seria 1180** — `ولم نكتبه إلا عنه، وكان أبي يسأل عنه` cümlesi Türkçede yoktu; metnin sonuna `İbn Ebî Dâvûd dedi ki: Onu ancak ondan yazdık; babam da onu sorardı.` eklendi. Yerini ve çeviriyi onayla. (2026-10-29)
- [ ] **seria 1938** — `—` tire gerçek bir notu ayırıyordu (`أخو يزيد بن جابر`): ad `Abdurrahmân (b. Yezîd) b. Câbir`, `n`: "…: Yezîd b. Câbir’in kardeşi." (2026-10-29)
- [ ] **sunan 394** — `k` erken: metin İbn Şihâb'ın sözüyle devam ediyor, matn daha sonra başlıyor; düzeltilmeli. (PROGRESS'ten)
- [ ] **sunan 2236, 4301, 4427** — son halka eksik görünüyor (2236: son Ebû Ca‘fer, metin Âişe'den; 4301: son Yahyâ b. Câbir, metin Avf b. Mâlik; 4427: son İkrime, metin İbn Abbâs'tan). (PROGRESS'ten)
- [ ] **sunan 2624** — zincirin Ya‘lâ → Saîd → İbn Abbâs kısmı Arapçada matn içinde; gözden geçir. (PROGRESS'ten)
- [ ] **safii s01 163, 457, 493, 495, 505, 514, 515** — zincir `→ Resûlullah ﷺ` ile bitiyor (eski biçim; standarda geçerken sahâbîyle bitirilecek). 493: `İbn Uyeyne → (isnadla) → Resûlullah ﷺ` sahte halka. (2026-10-29)

## 2. Çeviri eksik ya da kısa olabilir (oran = Türkçe/Arapça uzunluğu)

- [ ] **fezail 1038** — oran 0,18 ve Türkçede 3 ﷺ eksik: çeviri büyük ihtimalle yarım. (2026-10-29)
- [ ] **sunan 518** (0,74), **2661** (0,66), **3810** (0,69). (PROGRESS'ten)
- [ ] **ahmed m06 108** — oran 0,72. (2026-10-29)
- [ ] **musned** — 143 maddede oran < 0,75 (`python3 araclar/dogrula.py musned --hepsi`); Müsned baştan yapılacağı için orada çözülür. (2026-10-29)

## 3. Dinî / saygı ifadesi kontrolü

Arapçada `ﷺ` (صلى الله عليه وسلم) olup Türkçede eksik olanlar (dogrula.py "ﷺ eksik"); bazıları Arapça dijital nüshanın tekrarı olabilir, bazıları gerçekten düşmüş:

- [ ] **seria** 723, 888, 942.2, 997, 1059, 1098, 1133, 1182.1, 1502, 1503
- [ ] **ibnebiseybe** e01 66; e03 184, 185, 189, 385
- [ ] **acurri** a05 3
- [ ] **berbehari** 99
- [ ] **zuhd** z02 358, 360, 363 … (27 madde; `python3 araclar/dogrula.py zuhd --hepsi`)

Toplu düzeltme (2026-10-29): bütün kitaplıklarda `Resûlullah ﷺ’e` biçimindeki 427 ek, SPEC §1.5'e göre `Resûlullah’a ﷺ` biçimine çevrildi (Nebî’ye/’nin/’yi/’den, Resûlullah’a/’ın/’ı/’tan, Muhammed’e/’in/’i, Nebîsi’ne). Harf uyumunu birkaç yerde gözle doğrula (`grep -o "[^ ]* ﷺ" musannef/tr/k17.json | sort | uniq -c`).

## 4. Karar verilmiş, hatırlatma

- `index.json` `t` ve `n` artık dosyadaki **bütün** maddeleri sayar (kesirli "Numarasız rivayet / ara metin" dâhil); 6 kitaplıkta 23 kayıt buna göre düzeltildi. Neşrin hadis sayısı farklıysa (`musned` `total` gibi) `SHELVES`'e yazılır. (2026-10-29)
- Müellif adı: veri `c[0]`, `dogrula.py`/`ravi_kur.py` `MUELLIF`, `script.js` `RAVI_MUELLIF` aynı olmalı. eş-Şerîa için `el-Âcurrî` seçildi. Müsned'e başlamadan `c[0]` kararı (`PROGRESS.md`). (2026-10-29)
- `maximum-scale=1` bilinçli bırakıldı (odak modunda kazara yakınlaştırma). (2026-10-29)
- `araclar/` çalışma dosyaları (cikti, parca, kaynak.json) GitHub Pages'ten indirilebilir durumda; sonraki oturumlar bu dosyalara ihtiyaç duyduğu için `.gitignore`'a alınmadı. Gizlenmesi istenirse yayın için ayrı dal/iş akışı gerekir. (2026-10-29)
