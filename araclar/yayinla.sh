#!/bin/bash
# Kullanım: araclar/yayinla.sh "commit mesajı"
# Veri denetimi, havuzları (ara, gunun, akis, ravi) yeniler, sw.js'deki önbellek sürümünü bir artırır, commit eder ve GitHub Pages'e gönderir.
cd "$(dirname "$0")/.." || exit 1
git pull -q --rebase || { echo "Önce çakışmayı çöz (git status)"; exit 1; }
python3 araclar/kontrol.py | grep -q "sorun yok" || { python3 araclar/kontrol.py; echo "kontrol.py sorun buldu; yayın durduruldu"; exit 1; }
python3 araclar/ara.py >/dev/null || { echo "ara.py çalışmadı"; exit 1; }
python3 araclar/gunun.py >/dev/null || { echo "gunun.py çalışmadı"; exit 1; }
python3 araclar/akis.py >/dev/null || { echo "akis.py çalışmadı"; exit 1; }
python3 araclar/ravi/ravi_kur.py >/dev/null || { echo "ravi_kur.py çalışmadı"; exit 1; }
v=$(grep -o "CACHE = 'zikrim-v[0-9]*" sw.js | grep -o "[0-9]*$")
sed -i "s/CACHE = 'zikrim-v$v'/CACHE = 'zikrim-v$((v+1))'/" sw.js
git add -A && git commit -qm "$1" && git push -q && git log --oneline -1 && echo "önbellek: v$((v+1))"
