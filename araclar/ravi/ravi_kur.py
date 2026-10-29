"""Râvi veritabanını kurar / günceller.

Kaynak: isnad standardına uyan kitaplıkların `tr/*.json` verisi (varsayılan: sunan).
Çıktı: araclar/ravi/ravi.json (araç veritabanı) ve ravi.json (uygulamanın râvi sayfası)

Veritabanı yalnız metinden türetilir: her râvi, zincirlerde yazıldığı adla
(sened satırındaki biçimle) bir kayıttır. Dışarıdan kimlik bilgisi eklenmez
(SPEC.md, isnad standardı). Arapça biçimler isim sözlüğünden (sozluk.tsv) gelir.

Kullanım:
  python3 araclar/ravi/ravi_kur.py              # sunan'dan kurar
  python3 araclar/ravi/ravi_kur.py sunan musned # birden çok kitaplık
"""
import json, re, sys, collections
from pathlib import Path

R = Path(__file__).resolve().parents[2]          # repo kökü
OUT = Path(__file__).parent / 'ravi.json'
SOZLUK = R / 'araclar' / 'sunan' / 'sozluk.tsv'

# Kitaplık → zincirin başındaki müellif adı (c[0]).
MUELLIF = {'sunan': 'Ebû Dâvûd', 'musned': 'Ahmed b. Hanbel'}

BELIRSIZ = re.compile(r'^(bir |Basralı |Kûfeli |Medineli |Şamlı |.*ashâbından|.*arkadaşlarından|.*den bir |.*dan bir )|ya da|yahut', re.I)
AKRABA = {'babası', 'dedesi', 'annesi', 'amcası', 'kardeşi', 'ninesi', 'dayısı', 'halası', 'teyzesi', 'oğlu', 'kızı', 'mevlâsı'}


def temel(ad):
    """Parantezli açıklamayı atar: 'Abdülazîz (b. Muhammed)' → 'Abdülazîz'."""
    return re.sub(r'\s*\(.*?\)', '', ad).strip()


def parcala(ad):
    """'Hafs b. Ömer ve Müslim b. İbrâhîm' → iki râvi. Parantez içindeki 've' bölünmez."""
    if ' ve ' not in ad:
        return [ad]
    parts, depth, cur = [], 0, ''
    i = 0
    while i < len(ad):
        ch = ad[i]
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
        if depth == 0 and ad.startswith(' ve ', i):
            parts.append(cur.strip()); cur = ''; i += 4; continue
        cur += ch; i += 1
    parts.append(cur.strip())
    return [p for p in parts if p]


def tur(ad):
    t = temel(ad)
    if t in AKRABA or t.split()[0] in AKRABA:
        return 'akrabalık'
    if BELIRSIZ.search(t):
        return 'belirsiz'
    return 'ad'


def sozluk_ters():
    ters = collections.defaultdict(list)
    if not SOZLUK.exists():
        return ters
    for line in SOZLUK.read_text(encoding='utf-8').splitlines():
        if not line or line.startswith('#') or '\t' not in line:
            continue
        ar, tr = line.split('\t', 1)
        ar, tr = ar.strip(), tr.strip()
        if ar and tr and ar not in ters[tr]:
            ters[tr].append(ar)
    return ters


def zincirler(info):
    if not info or not isinstance(info, dict) or not info.get('c'):
        return []
    c = info['c']
    return c if isinstance(c[0], list) else [c]


def kur(kitapliklar):
    ters = sozluk_ters()
    ravi = {}
    kenar = collections.Counter()          # (ogrenci, siga, hoca) → sayı
    for lib in kitapliklar:
        idx = json.load(open(R / lib / 'index.json', encoding='utf-8'))
        for bi, b in enumerate(idx):
            if not b.get('t'):
                continue
            d = json.load(open(R / lib / 'tr' / b['f'], encoding='utf-8'))
            for bb in d['babs']:
                for h in bb['h']:
                    no, info = h[0], h[4] if len(h) > 4 else None
                    zs = zincirler(info)
                    if not zs:
                        continue
                    gorulen = set()
                    for z in zs:
                        adlar = z[0::2]
                        sigalar = z[1::2]
                        for i, kutu in enumerate(adlar):
                            if i == 0:
                                continue           # müellif
                            for ad in parcala(kutu):
                                r = ravi.setdefault(ad, {
                                    'ad': ad, 'temel': temel(ad), 'tur': tur(ad),
                                    'ar': ters.get(temel(ad), [])[:4],
                                    'sayi': 0, 'kitaplik': {},
                                    'rol': {'hoca': 0, 'ara': 0, 'son': 0},
                                    'hocalari': {}, 'ogrencileri': {}, 'sigalar': {},
                                    'hadisler': {},
                                })
                                key = (ad, no)
                                if key not in gorulen:
                                    gorulen.add(key)
                                    r['sayi'] += 1
                                    r['kitaplik'][lib] = r['kitaplik'].get(lib, 0) + 1
                                    r['hadisler'].setdefault(lib, []).append([bi, no])
                                    rolu = 'hoca' if i == 1 else ('son' if i == len(adlar) - 1 else 'ara')
                                    r['rol'][rolu] += 1
                                siga = sigalar[i - 1]
                                r['sigalar'][siga] = r['sigalar'].get(siga, 0) + 1
                                # hocası: zincirde bir sonraki kutu
                                if i + 1 < len(adlar):
                                    for hoca in parcala(adlar[i + 1]):
                                        r['hocalari'][hoca] = r['hocalari'].get(hoca, 0) + 1
                                        kenar[(ad, sigalar[i], hoca)] += 1
                                # öğrencisi: bir önceki kutu (müellif dahil)
                                for ogr in parcala(adlar[i - 1]):
                                    r['ogrencileri'][ogr] = r['ogrencileri'].get(ogr, 0) + 1
    # ad eşleşmesi için temel → kayıtlar (araç veritabanı; aynı kişi anlamına gelmez)
    temeller = collections.defaultdict(list)
    for ad, r in ravi.items():
        temeller[r['temel']].append(ad)
        r['hocalari'] = dict(sorted(r['hocalari'].items(), key=lambda x: (-x[1], x[0])))
        r['ogrencileri'] = dict(sorted(r['ogrencileri'].items(), key=lambda x: (-x[1], x[0])))
        r['sigalar'] = dict(sorted(r['sigalar'].items(), key=lambda x: -x[1]))
    # İlişki başına sîga dökümü: aldığı[ad][hoca] = {sîga: n}, verdiği[ad][öğrenci] = {sîga: n}
    aldigi, verdigi = collections.defaultdict(dict), collections.defaultdict(dict)
    for (o, sg, h), n in kenar.items():
        aldigi[o].setdefault(h, {})[sg] = aldigi[o].get(h, {}).get(sg, 0) + n
        verdigi[h].setdefault(o, {})[sg] = verdigi[h].get(o, {}).get(sg, 0) + n
    # Aynı adın kısa/tam yazımları: parantez açıldığında biri ötekinin başlangıcıysa ve kısa olan zaten
    # kimliği belirleyen bir öğe (b./bt./İbn/künye devamı) taşıyorsa. “Muhammed” ile “Muhammed (b. Amr)”,
    # “Muhammed (b. Amr)” ile “Muhammed (b. Seleme)” bağlanmaz: farklı kişiler olabilir.
    def acik(ad):
        return re.sub(r'\s+', ' ', ad.replace('(', '').replace(')', '')).strip()
    def kimlikli(ad):
        return bool(re.search(r'\bb\.|\bbt\.|^İbn |^Ebû |^Ebü’|^Ümmü ', ad)) and len(ad.split()) >= 3
    ayni = {}
    for t, grup in temeller.items():
        if len(grup) < 2:
            continue
        ac = {ad: acik(ad) for ad in grup}
        for a in grup:
            es = [b for b in grup if b != a and (
                (ac[b].startswith(ac[a] + ' ') and kimlikli(ac[a])) or (ac[a].startswith(ac[b] + ' ') and kimlikli(ac[b])))]
            if es:
                ayni[a] = sorted(es, key=lambda x: -ravi[x]['sayi'])
    kenarlar = [[o, s, h, n] for (o, s, h), n in sorted(kenar.items(), key=lambda x: -x[1])]
    out = {
        'aciklama': 'Râvi veritabanı: isnad standardına uyan kitaplıkların zincirlerinden (info.c) türetilmiştir. '
                    'Yalnız metinde yazılan adlar; dışarıdan kimlik bilgisi yoktur. araclar/ravi/ravi_kur.py yeniden üretir.',
        'kitapliklar': kitapliklar,
        'muellif': {k: MUELLIF.get(k) for k in kitapliklar},
        'ravi_sayisi': len(ravi),
        'kenar_sayisi': len(kenarlar),
        'ravi': dict(sorted(ravi.items(), key=lambda x: (-x[1]['sayi'], x[0]))),
        'temel': {t: v for t, v in sorted(temeller.items()) if len(v) > 1},
        'ayni': ayni,
        'kenar': kenarlar,
    }
    OUT.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    # Uygulama dosyası (repo kökü ravi.json): râvi sayfası için sıkı biçim
    # t[ad] = aynı adın kısa/tam yazımları (yalnız kimliği belirli olanlar); r[ad] = [arapça biçimler, hadis sayısı, {rivayet aldığı: [n, {sîga: n}]}, {rivayet verdiği: [n, {sîga: n}]}, {kitaplık: [[kitap sırası, no], …]}, {hoca, ara, son}]
    def iliski(ad, d, kaynak):
        # {ad: [n, {sîga: n}]} — sayıya göre sıralı
        return {k: [n, dict(sorted(kaynak[ad].get(k, {}).items(), key=lambda x: -x[1]))] for k, n in d.items()}
    app = {'r': {ad: [r['ar'], r['sayi'], iliski(ad, r['hocalari'], aldigi), iliski(ad, r['ogrencileri'], verdigi), r['hadisler'], r['rol']]
                 for ad, r in out['ravi'].items()},
           't': out['ayni'], 'm': out['muellif'],
           'x': sorted(ad for ad, r in out['ravi'].items() if r['tur'] != 'ad')}  # akrabalık/belirsiz: râvi sayfası açılmaz
    (R / 'ravi.json').write_text(json.dumps(app, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    return out


if __name__ == '__main__':
    libs = sys.argv[1:] or ['sunan']
    o = kur(libs)
    turler = collections.Counter(r['tur'] for r in o['ravi'].values())
    arli = sum(1 for r in o['ravi'].values() if r['ar'])
    print(f"{o['ravi_sayisi']} râvi kaydı ({dict(turler)}), {o['kenar_sayisi']} hoca-öğrenci kenarı; "
          f"{arli} kaydın Arapça biçimi sözlükten; {len(o['temel'])} temel ad birden çok biçimde.")
    print('En sık 10:', ', '.join(f"{r['ad']} ({r['sayi']})" for r in list(o['ravi'].values())[:10]))
    print('yazıldı:', OUT.relative_to(R), f'{OUT.stat().st_size//1024} KB')
