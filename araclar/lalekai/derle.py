#!/usr/bin/env python3
"""el-Lâlekâî: çeviri dosyasını (araclar/lalekai/ceviri/lNN.txt) kaynak parçalarıyla
(araclar/lalekai/kaynak/lNN.json) birleştirip lalekai/tr/lNN.json'u yazar ve index.json'u günceller.

Kullanım: python3 araclar/lalekai/derle.py lNN [lNN ...] [--kuru]
  --kuru  yalnız denetler, dosya yazmaz.

Çeviri dosyasının biçimi araclar/lalekai/kilavuz.md'dedir. Kısaca:
  @ Türkçe bab başlığı          (yeni bab)
  @ar *  |  @ar =< ifade  |  @ar <Arapça>   (babın Arapça başlığını kaynaktan tüketir)
  N | sened | metin
  & sîga, sîga ; sîga, …         (sened varsa zorunlu; yollar ';' ile)
  % not                          (panelin n notu; birden çok olabilir)
  ^ matnın başladığı Arapça ilk kelimeler   (^ - → k = 0)
  =< ifade                       (maddenin Arapçası bu ifadeden hemen önce biter)
  = <Arapça>                     (maddenin Arapçası tam olarak budur)
  +                              (madde bir sonraki parçayı da içine alır; birden çok + yazılabilir)
  :l Etiket   :to N   :renum (parçanın numarası madde numarasından farklı olabilir)
Hiçbir Arapça kaybolmaz: kaynaktaki her harf ya bir bab başlığına ya bir maddeye gider; artan kalırsa hata.
"""
import fcntl, json, os, re, sys

KOK = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(KOK))
MUELLIF = 'el-Lâlekâî'
SIGALAR = {'haddesenâ', 'haddesenî', 'ahberanâ', 'ahberanî', 'enbe’enâ', 'semi‘tü', 'semi‘a', 'an', 'enne', 'kâle',
           'haddesehû', 'haddesehüm', 'ahberahû', 'ahberahüm', 'kara’tü', 'kurie', 'unbi’tü', 'ketebe ileyye', 'vecedtü'}
TAHVIL_TR = 'Bu senedin metni bir sonraki rivayettedir (no. {}).'
KERAMAT = 3000


def ns(s):
    return re.sub(r'\s+', ' ', s).strip()


class Akis:
    """Kaynak parçalarını tek bir dizgi olarak tutar; imleç ilerledikçe tüketir."""

    def __init__(self, parcalar):
        self.p = parcalar
        self.S = ''
        self.bas = []  # her parçanın S içindeki başlangıcı
        for x in parcalar:
            if self.S: self.S += ' '
            self.bas.append(len(self.S))
            self.S += x['ar']
        self.son = [b + len(x['ar']) for b, x in zip(self.bas, parcalar)]
        self.i = 0

    def bosluk(self):
        while self.i < len(self.S) and self.S[self.i] == ' ': self.i += 1

    def parca_no(self, pos):
        for k in range(len(self.bas) - 1, -1, -1):
            if self.bas[k] <= pos: return k
        return 0

    def tam(self, metin):
        self.bosluk()
        metin = ns(metin)
        if self.S.startswith(metin, self.i):
            a = self.i; self.i += len(metin); return self.S[a:self.i]
        # boşluk ve virgül farklarını yok sayarak eşle (eski yayınların Arapçası “ ,” yerine “,” yazabilir)
        es = {'،': ',', '؛': ';'}
        i, j, S = self.i, 0, self.S
        while j < len(metin):
            if metin[j] == ' ': j += 1; continue
            while i < len(S) and S[i] == ' ': i += 1
            if i >= len(S) or es.get(S[i], S[i]) != es.get(metin[j], metin[j]):
                yer = self.S[self.i:self.i + 80]
                raise ValueError(f'Arapça uyuşmuyor.\n  beklenen: {metin[:80]}\n  kaynakta: {yer}')
            i += 1; j += 1
        a = self.i; self.i = i; return self.S[a:i]

    def once(self, ifade):
        self.bosluk()
        ifade = ns(ifade)
        j = self.S.find(ifade, self.i + 1)
        if j < 0: raise ValueError(f'“=<” ifadesi bulunamadı: {ifade[:60]}')
        a = self.i; self.i = j; return self.S[a:j].strip()

    def parca_sonu(self, ek=0):
        """İmleç bir parçanın içindeyse o parçanın sonuna, sınırdaysa sonraki parçanın sonuna kadar tüketir."""
        self.bosluk()
        if self.i >= len(self.S): raise ValueError('kaynak bitti, tüketilecek parça yok')
        k = self.parca_no(self.i)
        bastan = self.i == self.bas[k]
        k2 = min(k + ek, len(self.p) - 1)
        a = self.i; self.i = self.son[k2]
        return self.S[a:self.i].strip(), k, bastan

    def bitti(self):
        self.bosluk(); return self.i >= len(self.S)


def oku_ceviri(yol):
    babs, cur = [], None
    for sat_no, ham in enumerate(open(yol, encoding='utf-8'), 1):
        s = ham.rstrip('\n')
        if not s.strip() or s.startswith('#'): continue
        try:
            if s.startswith('@ar '):
                babs[-1]['ar'].append(s[4:].strip()); continue
            if s.startswith('@ '):
                babs.append({'t': s[2:].strip(), 'ar': [], 'h': []}); cur = None; continue
            m = re.match(r'^(\d+(?:\.\d+)?) \|\s?(.*?)\s?\|\s?(.*)$', s)
            if m:
                if not babs: raise ValueError('bab başlığından önce madde')
                no = float(m.group(1)); no = int(no) if no == int(no) and '.' not in m.group(1) else no
                cur = {'no': no, 'sened': m.group(2).strip(), 't': m.group(3).strip().replace('\\n', '\n'),
                       'g': None, 'n': [], 'k': None, 'ar': None, 'once': None, 'plus': 0, 'l': None, 'to': None,
                       'renum': False, 'satir': sat_no}
                babs[-1]['h'].append(cur); continue
            if cur is None: raise ValueError('maddeden önce alan satırı')
            if s.startswith('& '): cur['g'] = s[2:].strip()
            elif s.startswith('% '): cur['n'].append(s[2:].strip())
            elif s.startswith('^ '): cur['k'] = s[2:].strip()
            elif s.startswith('=< '): cur['once'] = s[3:].strip()
            elif s.startswith('= '): cur['ar'] = s[2:].strip()
            elif s.strip() == '+': cur['plus'] += 1
            elif s.startswith(':l '): cur['l'] = s[3:].strip()
            elif s.startswith(':to '): cur['to'] = float(s[4:]); cur['to'] = int(cur['to']) if cur['to'] == int(cur['to']) else cur['to']
            elif s.strip() == ':renum': cur['renum'] = True
            else: raise ValueError('tanınmayan satır')
        except ValueError as e:
            raise ValueError(f'{os.path.basename(yol)} satır {sat_no}: {e}\n  {s[:120]}')
    return babs


def panel(m, hatalar):
    yollar = [[a.strip() for a in y.split('→')] for y in m['sened'].split('; ayrıca ')]
    if not m['g']:
        hatalar.append(f"{m['no']}: sened var, '&' sîga satırı yok"); return None
    gy = [[g.strip() for g in y.split(',')] for y in m['g'].split(';')]
    if len(gy) != len(yollar):
        hatalar.append(f"{m['no']}: yol sayısı {len(yollar)}, sîga yolu {len(gy)}"); return None
    cs = []
    for adlar, gs in zip(yollar, gy):
        if len(adlar) != len(gs):
            hatalar.append(f"{m['no']}: {len(adlar)} ad, {len(gs)} sîga: {' → '.join(adlar)} / {', '.join(gs)}")
            return None
        for g in gs:
            if g not in SIGALAR: hatalar.append(f"{m['no']}: bilinmeyen sîga “{g}”")
        for a in adlar:
            if not a: hatalar.append(f"{m['no']}: boş ad")
        c = [MUELLIF]
        for a, g in zip(adlar, gs): c += [g, a]
        cs.append(c)
    return cs[0] if len(cs) == 1 else cs


def derle(ad, kuru=False):
    kay = json.load(open(os.path.join(KOK, 'kaynak', ad + '.json'), encoding='utf-8'))
    babs = oku_ceviri(os.path.join(KOK, 'ceviri', ad + '.txt'))
    ak = Akis(kay)
    hatalar, uyarilar, out, nolar = [], [], [], []
    for b in babs:
        for a in b['ar']:
            try:
                if a == '*': ak.parca_sonu()
                elif a.startswith('=< '): ak.once(a[3:])
                else: ak.tam(a)
            except ValueError as e:
                hatalar.append(f"bab “{b['t'][:40]}”: {e}"); return hatalar, uyarilar, None
        h = []
        for m in b['h']:
            no = m['no']
            try:
                if m['ar'] is not None: ar = ak.tam(m['ar'])
                elif m['once'] is not None: ar = ak.once(m['once'])
                else:
                    ek = m['plus']
                    if isinstance(no, int) and not m['renum']:
                        # imleç önceki parçanın kuyruğundaysa, aynı numaralı parça hemen ardındaysa onu da al
                        ak.bosluk(); k0 = ak.parca_no(ak.i)
                        for d in (1, 2):
                            if k0 + d < len(kay) and kay[k0 + d].get('no') == no and ak.i != ak.bas[k0]:
                                ek = max(ek, d); break
                    ar, k, bastan = ak.parca_sonu(ek)
                    p = kay[k]
                    if bastan and 'no' in p and isinstance(no, int) and p['no'] != no and not m['renum']:
                        hatalar.append(f"{no}: kaynak parçasının numarası {p['no']} (bilerek ise :renum)")
                if m['plus'] and (m['ar'] is not None or m['once'] is not None):
                    # = / =< ile + birlikte: önce verilen kısım, sonra parçaların kalanı
                    for _ in range(m['plus']):
                        ek, _k, _b = ak.parca_sonu(); ar = ar + ' ' + ek
            except ValueError as e:
                hatalar.append(f"{no} (satır {m['satir']}): {e}"); return hatalar, uyarilar, None
            ar = ns(ar)
            info = {}
            if m['sened']:
                c = panel(m, hatalar)
                if c is not None: info['c'] = c
            elif m['g']:
                hatalar.append(f'{no}: sened boş ama sîga var')
            if m['n']: info['n'] = m['n']
            if m['k'] is None: hatalar.append(f'{no}: ^ (matn başı) yok'); kk = 0
            elif m['k'] == '-': kk = 0
            else:
                kk = ar.find(ns(m['k']))
                if kk < 0: hatalar.append(f"{no}: ^ ifadesi Arapçada yok: {m['k'][:50]}"); kk = 0
            info['k'] = kk
            if m['l']: info['l'] = m['l']
            if m['to'] is not None:
                info['to'] = m['to']
                if not m['l']: info['l'] = 'Tahvîl'
                if not m['t']: m['t'] = TAHVIL_TR.format(m['to'])
            t = m['t']
            if '(?)' in t: hatalar.append(f'{no}: (?) var')
            if not t: hatalar.append(f'{no}: Türkçe metin boş')
            if re.search(r'[؀-ۿ]{3,}', t) and '«' not in t: uyarilar.append(f'{no}: Türkçede Arapça harf var')
            if re.search(r'[؀-ۿ]', m['sened']): hatalar.append(f'{no}: senedde Arapça harf var')
            if no in nolar: hatalar.append(f'{no}: tekrar eden numara')
            if nolar and no <= nolar[-1]: hatalar.append(f'{no}: sıra bozuk (önceki {nolar[-1]})')
            nolar.append(no)
            h.append([no, m['sened'], t, 0, info, ar])
        out.append({'t': b['t'], 'h': h})
    if not ak.bitti():
        hatalar.append('kaynakta tüketilmemiş Arapça kaldı: ' + ak.S[ak.i:ak.i + 100])
    for b in out:
        for x in b['h']:
            to = x[4].get('to')
            if to is not None and to not in nolar: hatalar.append(f'{x[0]}: :to {to} bu dosyada yok')
    # Kerâmâtü’l-evliyâ (IX. cüz) numaraları 1'den yeniden başlar; Şerh'in numaralarıyla çakışmasın diye
    # anahtar 3000 + N olur, uygulamada etiket “Kerâmât, no. N” (ara metinde “Ara metin”) görünür.
    idx0 = json.load(open(os.path.join(REPO, 'lalekai', 'index.json'), encoding='utf-8'))
    if any(x['f'] == ad + '.json' and x['g'][0] == 'Kerâmâtü’l-evliyâ' for x in idx0):
        def kno(v):
            w = round(v + KERAMAT, 4); return int(w) if w == int(w) else w
        for b in out:
            for x in b['h']:
                n0 = x[0]
                x[0] = kno(n0)
                if 'l' not in x[4]: x[4]['l'] = f'Kerâmât, no. {n0}' if isinstance(n0, int) else 'Ara metin'
                if 'to' in x[4]: x[4]['to'] = kno(x[4]['to'])
                if x[4].get('l') == 'Tahvîl' and x[2].startswith('Bu senedin metni'):
                    x[2] = TAHVIL_TR.format(f"Kerâmât {x[4]['to'] - KERAMAT}")
        nolar = [kno(v) for v in nolar]
    if hatalar or kuru: return hatalar, uyarilar, out
    json.dump({'babs': out}, open(os.path.join(REPO, 'lalekai', 'tr', ad + '.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=1)
    yol = os.path.join(REPO, 'lalekai', 'index.json')
    kilit = open(os.path.join(KOK, '.index.lock'), 'w'); fcntl.flock(kilit, fcntl.LOCK_EX)  # aynı anda çalışan oturumlar
    idx = json.load(open(yol, encoding='utf-8'))
    for x in idx:
        if x['f'] == ad + '.json':
            x.update(n=len(nolar), t=len(nolar), b=len(out), **{'from': nolar[0], 'to': nolar[-1]})
    json.dump(idx, open(yol, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    fcntl.flock(kilit, fcntl.LOCK_UN); kilit.close()
    return hatalar, uyarilar, out


if __name__ == '__main__':
    kuru = '--kuru' in sys.argv
    kod = 0
    for ad in [a for a in sys.argv[1:] if not a.startswith('--')]:
        try:
            h, u, out = derle(ad, kuru)
        except ValueError as e:
            h, u, out = [str(e)], [], None
        for x in u: print(f'[UYARI] {ad} {x}')
        for x in h: print(f'[HATA] {ad} {x}')
        if h: kod = 1
        else:
            n = sum(len(b['h']) for b in out)
            print(f"{ad}: {n} madde, {len(out)} bab — {'denetlendi' if kuru else 'yazıldı'}")
    sys.exit(kod)
