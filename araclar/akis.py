# Akış sekmesinin havuzunu (akis.json) üretir. Yeni kitap/bölüm çevrilince gunun.py ile birlikte çalıştır:
#   python3 araclar/akis.py
# Ana sayfadaki "Rivayetler" kartı gunun.json'u kullanır; o dosya bu betikten etkilenmez.
#
# Seçim: kütüphanedeki BÜTÜN çevrilmiş rivayetler (merfû, mevkûf, maktû, âlim sözleri), şunlar hariç:
#   - bozuk/eksik metin notu olanlar ("(metin … bozuktur)", "(metinde böyle)")
#   - tek başına okununca anlamsız kalan göndermeler ("benzeri", "mislini", "aynısını", "bu hadisi zikretti", "bunu söylerdi") ve 40 karakterden kısa parçalar
#   - nüsha senedi / giriş maddeleri (no. 0; ez-Zühd'de no. 1)
#   - standart bir telefon ekranına (390×844, Akış kartı, isnad zinciriyle birlikte) sığmayanlar: sigar() aşağıda.
#     Hesap, uygulamadaki kartın tarayıcıda ölçülen yüksekliklerine göre ayarlanmıştır. Uygulama ayrıca her kartı
#     ekranda ölçer; daha küçük ekranlarda sığmayanı yine atlar.
# Biçim: {kitaplık: {"books": [kitap adları], "babs": [bab başlıkları], "h": [[kitap sırası, no, metin, sened, bab sırası], …]}}
import json, re, os, sys, math
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..') + '/'
LIBS = ['musned', 'musannef', 'ibnebiseybe', 'ahmed', 'zuhd', 'fezail', 'berbehari', 'seria', 'acurri', 'hallal', 'safii', 'buhari', 'ebudavud', 'harb', 'ibane', 'sunan']
GONDERME = re.compile(r'benzer|mislini|aynısın|bu hadis(i|in)? (zikretti|devam)|bunu söyle', re.I)

def aday(v, h):
    n, t = h[0], h[2]
    if not isinstance(t, str) or len(t) < 40: return False
    if '(metin' in t or GONDERME.search(t): return False
    if n == 0 or (v == 'zuhd' and n == 1): return False
    return True

# ---- Ekrana sığma hesabı (390×844 ekranda Akış kartı) ----
# Kartın tarayıcıda ölçülen düzeni: iç yükseklik 710 px (dolgu 24+22), parçalar arası 14 px. Satır başına karakter sayıları
# 25.665 adayın tarayıcıda tek tek ölçülmesiyle ayarlandı; bu hesap ölçümle %98 oranında aynı sonucu verir (yanılınca kartı uygulama yine ölçüp atlar).
ALAN = 712
KAR = {'ad': 40, 's': 18, 'm': 33, 'l': 35, 'kaynak': 37, 'bab': 41}       # satır başına karakter
SATIR = {'ad': 17.55, 's': 29.45, 'm': 27.2, 'l': 25.28, 'kaynak': 18.125}  # satır yüksekliği (px)
# Kaynak satırının (ör. “İbn Ebî Şeybe, el-Musannef, no. 123 · Kitâbü’l-…”) numara ve kitap adı dışındaki uzunluğu
KAYNAK_EK = {'musned': 44, 'musannef': 35, 'ibnebiseybe': 39, 'ahmed': 73, 'zuhd': 48, 'fezail': 57, 'berbehari': 22, 'seria': 34, 'acurri': 42, 'hallal': 17, 'safii': 16, 'buhari': 17, 'ebudavud': 17, 'harb': 23, 'ibane': 44, 'sunan': 28}
def satir(n, kar): return max(1, math.ceil(n / kar))
def yukseklik(v, n, t, sened, kitap, bab):
    h, parca = 46, 2                                           # dolgu; metin + kaynak
    adlar = [a for a in re.split(r'\s*→\s*', sened) if a] if sened else []
    if adlar:                                                  # “İSNAD” başlığı + zincir
        h += 13 + 14 - 6 + sum(satir(len(a), KAR['ad']) * SATIR['ad'] + 6 for a in adlar) - 6
        parca += 2
    boy = 's' if len(t) < 140 else 'l' if len(t) > 300 else 'm'
    h += satir(len(t), KAR[boy]) * SATIR[boy]
    h += satir(KAYNAK_EK.get(v, 50) + len(str(n)) + len(kitap), KAR['kaynak']) * SATIR['kaynak']
    if bab and bab != kitap:                                   # “Bab: …” satırı (Müsned'de bab adı kitabın adıdır, gösterilmez)
        h += satir(len(bab) + 5, KAR['bab']) * SATIR['kaynak'] + 6
    return h + 14 * (parca - 1)
def sigar(v, n, t, sened, kitap, bab): return yukseklik(v, n, t, sened, kitap, bab) <= ALAN

def uret(sigma=True):
    out = {}
    for v in LIBS:
        idx = json.load(open(f'{R}{v}/index.json', encoding='utf-8'))
        items, babs, bab_no = [], [], {}
        for bi, b in enumerate(idx):
            if not b.get('t'): continue
            d = json.load(open(f'{R}{v}/tr/' + b['f'], encoding='utf-8'))
            for bb in d['babs']:
                for h in bb['h']:
                    if not aday(v, h): continue
                    title = (bb.get('t') or '').strip()
                    sened = h[1].strip() if isinstance(h[1], str) else ''
                    if sigma and not sigar(v, h[0], h[2], sened, b['tr'], title): continue
                    if title not in bab_no:
                        bab_no[title] = len(babs)
                        babs.append(title)
                    items.append([bi, h[0], h[2], sened, bab_no[title]])
        if items: out[v] = {'books': [b['tr'] for b in idx], 'babs': babs, 'h': items}
    return out

if __name__ == '__main__':
    sigma = '--hepsi' not in sys.argv  # --hepsi: ölçüm için sığma süzgeci olmadan bütün adaylar
    out = uret(sigma)
    for v, d in out.items(): print(v, len(d['h']))
    print('toplam', sum(len(d['h']) for d in out.values()))
    open(R + 'akis.json', 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, separators=(',', ':')))
