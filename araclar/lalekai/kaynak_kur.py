#!/usr/bin/env python3
"""el-Lâlekâî: OpenITI kopyasından bölüm başına kaynak parçaları üretir.

Kullanım: python3 araclar/lalekai/kaynak_kur.py SERH_DOSYASI KERAMAT_DOSYASI [lNN ...]
  SERH_DOSYASI    0418HibatAllahLalikai.SharhUsulIctiqad.Shamela0009200-ara1 (I–VIII. cüz)
  KERAMAT_DOSYASI 0418HibatAllahLalikai.KaramatAwliya.Shamela0013150-ara1 (IX. cüz; 9200'de yoktur)
Çıktı: araclar/lalekai/kaynak/lNN.json = [{"no": N}|{"bas": 1}, "ar": "..."] sırayla.
  {"no": N, "ar"}  nüshada “N -” işaretiyle başlayan parça (sonraki işarete kadar)
  {"bas": 1, "ar"} işaretsiz “### |” başlık satırı ve devamı (başlığın ardından gelen ara metin de
                   aynı parçadadır; başlık ile metni çeviren ayırır, bkz. kilavuz.md)
Sayfa işaretleri (PageV…, [ص: N]) ve ms… işaretleri atılır, satırlar birleştirilir.
Bir başlık, ardından gelen ilk numaranın bölümüne girer. Bölüm sınırları lalekai/index.json'daki `from`
değerleridir (Kerâmât için l36–l38).
"""
import json, re, sys, os
KOK = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(KOK))

def parcala(yol):
    L = open(yol, encoding='utf-8').read().split('\n')
    i = next(k for k, s in enumerate(L) if s.startswith('#META#Header#End#'))
    out, cur = [], None
    for s in L[i + 1:]:
        if s.startswith('#META#'): continue
        s = re.sub(r'PageV\d+P\d+', ' ', s)
        if re.fullmatch(r'#\s*', s.strip()) or not s.strip(): continue
        m = re.match(r'### \| (\d+) ?(?:ms\d+ )?- ?(.*)$', s)
        if m:
            cur = {'no': int(m.group(1)), 'ar': m.group(2)}; out.append(cur); continue
        if re.match(r'### \| \[ص: \d+\]\s*$', s): continue
        if s.startswith('### | '):
            cur = {'bas': 1, 'ar': s[6:]}; out.append(cur); continue
        t = re.sub(r'^(# |~~|#)', '', s)
        if cur is None: cur = {'bas': 1, 'ar': ''}; out.append(cur)
        cur['ar'] += ' ' + t
    for o in out:
        o['ar'] = re.sub(r'\s+', ' ', re.sub(r'\bms\d+\b', ' ', o['ar'])).strip()
    return [o for o in out if o['ar'] or 'no' in o]

def main():
    serh, ker = sys.argv[1], sys.argv[2]
    istenen = set(sys.argv[3:])
    idx = json.load(open(os.path.join(REPO, 'lalekai', 'index.json')))
    def dagit(parcalar, bolumler):
        # bolumler: [(f, from)] artan; numara sıra dışıysa (200'den fazla sıçrama) bölüm değiştirmez
        res = {f: [] for f, _ in bolumler}
        bi = 0; bekleyen = []; son = None
        for p in parcalar:
            if 'no' not in p: bekleyen.append(p); continue
            n = p['no']
            while bi + 1 < len(bolumler) and n >= bolumler[bi + 1][1] and (son is None or n - son < 200):
                bi += 1
            if son is None or abs(n - son) < 200: son = n
            res[bolumler[bi][0]] += bekleyen + [p]; bekleyen = []
        res[bolumler[bi][0]] += bekleyen
        return res
    s_bol = [(x['f'], x['from']) for x in idx if x['g'][0] != 'Kerâmâtü’l-evliyâ']
    k_bol = [(x['f'], x['from']) for x in idx if x['g'][0] == 'Kerâmâtü’l-evliyâ']
    res = dagit(parcalar=parcala(serh), bolumler=s_bol)
    kp = parcala(ker)
    res.update(dagit(kp, k_bol))
    for f, ps in res.items():
        ad = f.replace('.json', '')
        if istenen and ad not in istenen: continue
        json.dump(ps, open(os.path.join(KOK, 'kaynak', ad + '.json'), 'w'), ensure_ascii=False, indent=0)
        nums = [p['no'] for p in ps if 'no' in p]
        print(ad, len(ps), 'parça,', len(nums), 'numara', (min(nums), max(nums)) if nums else '')

if __name__ == '__main__':
    main()
