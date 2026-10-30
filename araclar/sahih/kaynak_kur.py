"""OpenITI 0256Bukhari.Sahih.Shamela0001681-ara1 → araclar/sahih/kaynak.json

Şâmile 735 Beykûniyye şerhidir; bu neşrin numarası 1681'dir
(Muhammed Züheyr b. Nâsır, Dâru Tavki'n-Necât, 1422; Abdülbâkî 1–7563).
Sayfa işaretleri (PageV, ms, [ص: N]) düşer. Dosyanın başındaki
Mustafa Dîb el-Buğâ mukaddimesi alınmaz; metin «بدء الوحي» başlığından başlar.
"""
import json, re
from pathlib import Path

D = Path(__file__).parent
RAW = Path('/tmp/sahihsrc/bukhari1681.txt')
OUT = D / 'kaynak.json'

# Neşirdeki 97 kitap. Başlık Arapçası kaynaktan gelir; burası Türkçe addır.
TR = [
    "Kitâbü Bed’i’l-vahy",
    "Kitâbü’l-Îmân",
    "Kitâbü’l-İlm",
    "Kitâbü’l-Vudû",
    "Kitâbü’l-Gusl",
    "Kitâbü’l-Hayd",
    "Kitâbü’t-Teyemmüm",
    "Kitâbü’s-Salât",
    "Kitâbü Mevâkîti’s-salât",
    "Kitâbü’l-Ezân",
    "Kitâbü’l-Cumu‘a",
    "Ebvâbu salâti’l-havf",
    "Ebvâbu’l-îdeyn",
    "Ebvâbu’l-vitr",
    "Ebvâbu’l-istiskā",
    "Ebvâbu’l-küsûf",
    "Ebvâbu sücûdi’l-Kur’ân",
    "Ebvâbu taksîri’s-salât",
    "Kitâbü’t-Teheccüd",
    "Kitâbü Fadli’s-salât fî mescidi Mekke ve’l-Medîne",
    "Ebvâbu’l-amel fi’s-salât",
    "Ebvâbu mâ câe fi’s-sehv",
    "Kitâbü’l-Cenâiz",
    "Kitâbü’z-Zekât",
    "Kitâbü’l-Hac",
    "Ebvâbu’l-umre",
    "Ebvâbu’l-muhsar",
    "Kitâbü Cezâi’s-sayd",
    "Kitâbü Fezâili’l-Medîne",
    "Kitâbü’s-Savm",
    "Kitâbü Salâti’t-terâvîh",
    "Kitâbü Fadli leyleti’l-kadr",
    "Kitâbü’l-İ‘tikâf",
    "Kitâbü’l-Büyû‘",
    "Kitâbü’s-Selem",
    "Kitâbü’ş-Şüf‘a",
    "Kitâbü’l-İcâre",
    "Kitâbü’l-Havâlât",
    "Kitâbü’l-Kefâle",
    "Kitâbü’l-Vekâle",
    "Kitâbü’l-Müzâra‘a",
    "Kitâbü’l-Müsâkāt",
    "Kitâbü’l-İstikrâd ve edâi’d-düyûn ve’l-hacr ve’t-teflîs",
    "Kitâbü’l-Husûmât",
    "Kitâbü’l-Lukata",
    "Kitâbü’l-Mezâlim ve’l-gasb",
    "Kitâbü’ş-Şerike",
    "Kitâbü’r-Rehn",
    "Kitâbü’l-Itk",
    "Kitâbü’l-Mükâteb",
    "Kitâbü’l-Hibe ve fadlihâ ve’t-tahrîd aleyhâ",
    "Kitâbü’ş-Şehâdât",
    "Kitâbü’s-Sulh",
    "Kitâbü’ş-Şurût",
    "Kitâbü’l-Vesâyâ",
    "Kitâbü’l-Cihâd ve’s-siyer",
    "Kitâbü Farzi’l-hums",
    "Kitâbü’l-Cizye",
    "Kitâbü Bed’i’l-halk",
    "Kitâbü Ehâdîsi’l-enbiyâ",
    "Kitâbü’l-Menâkıb",
    "Kitâbü Ashâbi’n-Nebî",
    "Kitâbü Menâkıbi’l-ensâr",
    "Kitâbü’l-Megâzî",
    "Kitâbü Tefsîri’l-Kur’ân",
    "Kitâbü Fezâili’l-Kur’ân",
    "Kitâbü’n-Nikâh",
    "Kitâbü’t-Talâk",
    "Kitâbü’n-Nafakāt",
    "Kitâbü’l-Et‘ime",
    "Kitâbü’l-Akîka",
    "Kitâbü’z-Zebâih ve’s-sayd",
    "Kitâbü’l-Edâhî",
    "Kitâbü’l-Eşribe",
    "Kitâbü’l-Mardâ",
    "Kitâbü’t-Tıbb",
    "Kitâbü’l-Libâs",
    "Kitâbü’l-Edeb",
    "Kitâbü’l-İsti’zân",
    "Kitâbü’d-De‘avât",
    "Kitâbü’r-Rikāk",
    "Kitâbü’l-Kader",
    "Kitâbü’l-Eymân ve’n-nüzûr",
    "Kitâbü Keffârâti’l-eymân",
    "Kitâbü’l-Ferâiz",
    "Kitâbü’l-Hudûd",
    "Kitâbü’d-Diyât",
    "Kitâbü İstitâbeti’l-mürteddîn ve’l-muânidîn ve kıtâlihim",
    "Kitâbü’l-İkrâh",
    "Kitâbü’l-Hiyel",
    "Kitâbü’t-Ta‘bîr",
    "Kitâbü’l-Fiten",
    "Kitâbü’l-Ahkâm",
    "Kitâbü’t-Temennî",
    "Kitâbü Ahbâri’l-âhâd",
    "Kitâbü’l-İ‘tisâm bi’l-kitâb ve’s-sünne",
    "Kitâbü’t-Tevhîd",
]

PAGE = re.compile(r'PageV\d+P\d+|ms\d+')
HADIS = re.compile(r'^(\d+)\s*-?\s*$')
SAYFA = re.compile(r'^\[ص:\s*\d+\]$')


def temiz(s):
    s = PAGE.sub(' ', s)
    s = s.replace('~~', '')
    s = re.sub(r'\s+', ' ', s)
    s = re.sub(r' +([:،.؟!])', r'\1', s)
    return s.strip()


def satirlar(yol):
    t = yol.read_text(encoding='utf-8')
    i = t.find('### | بدء الوحي')
    if i < 0:
        raise SystemExit('بدء الوحي bulunamadı')
    out = []
    for line in t[i:].splitlines():
        if line.startswith('~~'):
            parca = line[2:].lstrip()
            if out:
                out[-1] = out[-1].rstrip() + ' ' + parca
            else:
                out.append(parca)
        else:
            out.append(line)
    return out


def ayir(lines):
    """(tür, yük) blokları. tür: kitap | bab | hadis | sayfa | metin"""
    blok, buf = [], []

    def flush_metin():
        if buf:
            blok.append(('metin', temiz(' '.join(buf))))
            buf.clear()

    for line in lines:
        if line.startswith('### '):
            flush_metin()
            govde = line[4:].strip()
            if govde.startswith('$'):
                m = re.match(r'^\$\s*(\d+)\s*-\s*(.*)$', govde)
                if not m:
                    raise SystemExit(f'kitap başlığı okunamadı: {line[:80]}')
                blok.append(('kitap', (int(m.group(1)), temiz(m.group(2)))))
            elif govde.startswith('|'):
                govde = temiz(govde[1:])
                if govde.startswith('[تعليق'):
                    blok.append(('atla', govde))
                elif SAYFA.match(govde) or govde.startswith('[ص:'):
                    blok.append(('sayfa', govde))
                elif HADIS.match(govde):
                    blok.append(('hadis', int(HADIS.match(govde).group(1))))
                elif govde:
                    blok.append(('bab', govde))
            continue
        if line.startswith('#'):
            buf.append(line[1:].strip())
    flush_metin()
    return blok


def kur(blok):
    kitaplar = []

    def yeni(no, ar):
        kitaplar.append({'no': no, 'ar': ar, 'on': '', 'babs': []})

    def bab_ac(ar):
        kitaplar[-1]['babs'].append({'ar': ar, 'ek': '', 'h': []})

    def ekle_metin(metin, hedef):
        if not metin:
            return
        if hedef == 'hadis':
            h = kitaplar[-1]['babs'][-1]['h'][-1]
            h['ar'] = (h['ar'] + ' ' + metin).strip()
        elif hedef == 'bab':
            b = kitaplar[-1]['babs'][-1]
            b['ek'] = (b['ek'] + ' ' + metin).strip()
        elif hedef == 'on':
            k = kitaplar[-1]
            k['on'] = (k['on'] + ' ' + metin).strip()

    yeni(1, 'بدء الوحي')
    hedef = 'on'  # ilk başlık kitabın adıdır; altındaki metin önsöz
    boslar = []
    for tur, yuk in blok:
        if tur == 'kitap':
            no, ar = yuk
            if not ar:
                ar = ''
            yeni(no, ar)
            hedef = 'on'
        elif tur == 'atla':
            hedef = 'atla'
        elif tur == 'bab':
            # İlk kitabın ilk «بدء الوحي» satırı kitap adıdır, bab değil.
            if kitaplar[-1]['no'] == 1 and yuk == 'بدء الوحي' and not kitaplar[-1]['babs']:
                hedef = 'on'
                continue
            bab_ac(yuk)
            hedef = 'bab'
        elif tur == 'hadis':
            if not kitaplar[-1]['babs']:
                bab_ac('')
            kitaplar[-1]['babs'][-1]['h'].append({'n': yuk, 'ar': ''})
            hedef = 'hadis'
        elif tur == 'sayfa':
            pass
        elif tur == 'metin':
            if hedef == 'atla':
                continue
            if hedef == 'on' and not kitaplar[-1]['ar']:
                # «### $ 19 -» boşsa ilk satır kitap adıdır (كتاب التهجد).
                if yuk.startswith('كتاب') or yuk.startswith('أبواب') or yuk.startswith('ابواب'):
                    kitaplar[-1]['ar'] = yuk
                    continue
            ekle_metin(yuk, hedef)
    # Gövdesi düşmüş numaralar (3382: yalnız sayfa işareti) madde yapılmaz.
    for k in kitaplar:
        for b in k['babs']:
            kalan = []
            for h in b['h']:
                if h['ar']:
                    kalan.append(h)
                else:
                    boslar.append(h['n'])
            b['h'] = kalan
        k['babs'] = [b for b in k['babs'] if b['ar'] or b['h'] or b['ek']]
    return kitaplar, boslar


def main():
    kitaplar, boslar = kur(ayir(satirlar(RAW)))
    if len(kitaplar) != 97:
        raise SystemExit(f'{len(kitaplar)} kitap (97 olmalı)')
    if len(TR) != 97:
        raise SystemExit('Türkçe ad listesi 97 değil')
    nolar = [k['no'] for k in kitaplar]
    if nolar != list(range(1, 98)):
        raise SystemExit(f'kitap numaraları: {nolar[:5]}…{nolar[-3:]}')
    toplam = 0
    for i, k in enumerate(kitaplar):
        k['tr'] = TR[i]
        hs = [h['n'] for b in k['babs'] for h in b['h']]
        if not hs:
            raise SystemExit(f'{k["no"]} {k["ar"]}: hadis yok')
        if not k['ar']:
            raise SystemExit(f'{k["no"]}: Arapça ad yok')
        bos = [h['n'] for b in k['babs'] for h in b['h'] if not h['ar']]
        if bos:
            raise SystemExit(f'{k["no"]}: boş Arapça {bos[:8]}')
        k['from'] = min(hs)
        k['to'] = max(hs)
        k['n'] = len(hs)
        toplam += len(hs)
        print(f'{k["no"]:3} {k["tr"][:42]:42} {k["from"]}-{k["to"]}  {len(hs)} hadis  {len(k["babs"])} bab')
    print('gövdesi yok', boslar)
    print('toplam hadis', toplam)
    OUT.write_text(json.dumps({'shamela': 1681, 'hadis': toplam, 'bos': boslar, 'books': kitaplar},
                              ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print('yazıldı', OUT, OUT.stat().st_size)


if __name__ == '__main__':
    main()
