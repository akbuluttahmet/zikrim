# Çevrilmiş tüm kitapların veri kontrolü:  python3 araclar/kontrol.py
# Sayı uyumu, tekrar/sıra/aralık dışı numara, boş metin, unutulmuş "(?)", eksik alan.
import json, re, collections, os
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..') + '/'
bad = 0
for v in ['musannef', 'ibnebiseybe', 'musned', 'ahmed', 'zuhd', 'fezail', 'berbehari', 'acurri', 'seria', 'hallal', 'safii', 'buhari', 'ebudavud', 'harb', 'ibane', 'sunan', 'leys']:
    idx = json.load(open(f'{R}{v}/index.json'))
    for b in idx:
        if not b.get('t'): continue
        d = json.load(open(f'{R}{v}/tr/' + b['f']))
        nums = [h[0] for bb in d['babs'] for h in bb['h']]
        p = []
        # t = dosyadaki bütün maddeler (kesirli "Numarasız rivayet / ara metin" dâhil); uygulama ilerlemeyi buna göre hesaplar
        if len(nums) != b['t']: p.append(f"index t={b['t']} ama dosyada {len(nums)}")
        if b['t'] > b['n']: p.append(f"index t={b['t']} > n={b['n']}")
        dup = [n for n, c in collections.Counter(nums).items() if c > 1]
        if dup: p.append(f'tekrar no: {dup[:5]}')
        out = [n for n in nums if not b['from'] <= n < b['to'] + 1]
        if out: p.append(f'aralık dışı: {out[:5]}')
        if nums != sorted(nums): p.append('sıra bozuk')
        for bb in d['babs']:
            for h in bb['h']:
                if len(h) != 6: p.append(f'{h[0]}: {len(h)} alan (6 olmalı)')
                if not (h[2] or '').strip(): p.append(f'{h[0]}: boş metin')
                if '(?)' in (h[2] or ''): p.append(f'{h[0]}: "(?)" kalmış')
        if p: bad += 1; print(v, b['f'], b['tr'], p[:8])
print('sorun yok' if not bad else f'{bad} kitapta sorun var')
