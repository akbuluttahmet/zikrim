# Sîga eşleme raporu (araclar/siga_hizala.py, 2026-10-29)

Arapçada lafzı bulunamayan halkalar `an` (son halkaysa `kâle`) aldı; "belirsiz" olanlar ad özellikleri uyuşmadığı için gözle bakılmalı.
Yeniden üretmek için: `python3 araclar/siga_hizala.py --rapor araclar/siga_hizala_rapor.md`

## Lafzı bulunamayan halkalar

- **acurri a01.json**: 90.04 (Firyâbî → an); 90.07 (Ali → an); 90.07 (Ebû Bekir → an); 90.09 (Ebü’l-Hasan el-Hammâmî → an); 90.1 (Ebü’l-Kāsım en-Nahhâs → an)
- **acurri a04.json**: 2 (İbnü’l-Mübârek → an); 17 (İbnü’l-Cevzî → an)
- **acurri a05.json**: 11 (Abdullah (b. Mes‘ûd) → kâle)
- **acurri a06.json**: 0 (Ebû Muhammed Abdullah b. Ali b. Ahmed el-Mukri → an); 8 (Muhammed b. Ka‘b → an)
- **acurri a08.json**: 30 (Leys b. Sa‘d → kâle)
- **acurri a09.json**: 1 (İbn Kudâme → an); 3 (Abdullah b. Humeyd Ebû Bekir el-Müeddib → kâle); 56 (Muhammed b. el-Kāsım b. el-Hasan es-Serrâc → an)
- **acurri a10.json**: 24 (Abdurrahmân b. Ubeydullah el-Halebî ve Ebû Nuaym Ubeyd b. Hişâm el-Kalânisî → an); 40 (Şu‘be → an); 75 (Hüşeym → an); 75 (Abdurrahmân b. İshâk → an); 76 (Zührî → an); 77 (Ebü’z-Zübeyr → an); 77 (Câbir → kâle); 102 (Abbâd b. el-Avvâm → an); 102 (Katâde → an)
- **acurri a11.json**: 24 (Abdullah b. el-Abbâs et-Tayâlisî → an); 34 (… → an); 34 (İbn Ebî Ömer el-Adenî (Muhammed) → an); 61 (Ebû Bekir b. Ayyâş ve Abdullah … → an); 65 (… → an); 65 (Leys b. Sa‘d → an)
- **ahmed m01.json**: 0 (Ebü’l-Kāsım Mahmûd b. Saâde b. Ahmed b. Yûsuf b. İmrân el-Hilâlî → an); 0 (Ebû Ya‘lâ el-Halîl b. Abdullah el-Kazvînî → an); 0 (Ali b. Ahmed b. es-Sabbâh → an); 0 (Ebû Bekir Ahmed b. Muhammed b. Hâni’ el-Esrem → kâle)
- **ahmed m03.json**: 44 (Abdullah b. Muhammed → an); 69 (Bekr b. Muhammed → an); 76 (Zekeriyyâ b. Yahyâ ve Ahmed b. Muhammed b. Matar → an); 81 (Abdullah b. Muhammed b. Abdülhamîd → an)
- **ahmed m04.json**: 0 (Ebû Tâhir Ahmed b. Muhammed b. Ahmed b. Muhammed b. İbrâhîm es-Silefî → an); 0 (Ebü’l-Hüseyn el-Abbâs b. el-Abbâs b. Muhammed b. Abdullah b. el-Mugīre el-Cevherî → an); 0 (Ebü’l-Fadl Sâlih b. Ahmed b. Muhammed b. Hanbel eş-Şeybânî → kâle); 1 (İbn Sîrîn → kâle); 2 (Medinelilerden biri → an); 143 (Babamın kitabı → an); 144 (Babamın kitabı → an); 152 (Babamın kitabı → an); 428 (Affân → an)
- **ahmed m06.json**: 1 (Ebü’l-Kāsım Abdullah b. Muhammed b. Abdülazîz el-Begavî → an)
- **buhari b01.json**: 4 (Ebû Âsım → an); 54 (İbn Uleyye → an)
- **buhari b02.json**: 14 (Kays ve Umâre b. Meymûn ve Habîb b. eş-Şehîd → an); 93 (Müsedded ve Mûsâ b. İsmâîl ve Ma‘kıl b. Mâlik → an); 142 (Amr b. el-Hâris → an); 146 (Muhammed b. Ubeydullah → an); 147 (Ebân b. Yezîd ve Hemmâm b. Yahyâ b. Şeddâd → an); 151 (Abdullah b. Muhammed → an); 172 (Muhammed b. Abdullah → an)
- **ebudavud d01.json**: 0 (Ebû Dâvûd Süleymân b. el-Eş‘as es-Sicistânî → kâle)
- **fezail f01.json**: 13 (Rebî‘ b. Sa‘leb Ebü’l-Fadl → an); 13 (Ebû İsmâîl el-Müeddib İbrâhîm b. Süleymân b. Rezîn → an); 13 (İsmâîl b. Ebî Hâlid → an); 13 (Şa‘bî → an); 13 (Abdullah b. Ebî Evfâ → kâle); 26 (Ebû Abdurrahmân Muhammed b. Abdullah b. Numeyr ve Ebû Bekir b. Ebî Şeybe → an); 81 (Saîd b. Zeyd b. Amr b. Nüfeyl → kâle); 81 (Saîd b. Zeyd b. Amr b. Nüfeyl → kâle); 81 (Saîd b. Zeyd b. Amr b. Nüfeyl → kâle); 81 (Saîd b. Zeyd b. Amr b. Nüfeyl → kâle); 127 (Ya‘kūb → an); 140 (Abdullah b. Ahmed b. Muhammed b. Hanbel → an); 140 (babası → an); 148 (Abdullah b. Ca‘fer → kâle); 162 (Sâlim (b. Ebî Hafsa) ve A‘meş ve Abdullah b. Suhbân ve Kesîr en-Nevvâ ve İbn Ebî Leylâ → an); 168 (A‘meş ve Kesîr en-Nevvâ ve Abdullah (b. Suhbân) → an); 198 (Huzeyfe → kâle); 249 (Muhammed b. es-Sabbâh el-Bezzâz ve Süleymân b. Dâvûd Ebü’r-Rebî‘ ez-Zehrânî el-Atekî → an); 298 (Hassân b. Zeyd’in bir kızı Ümmü Ömer → an)
- **fezail f02.json**: 371 (itham edilmeyen biri → an); 379 (Ömer b. Muhammed (b. Zeyd b. Abdullah b. Ömer) → an); 382 (Mus‘ab b. Abdullah b. Mus‘ab ez-Zübeyrî → an); 414 (Abdü Hayr el-Hemdânî ve Ebû Cuhayfe es-Suvâî ve Zir b. Hubeyş ve Süveyd b. Gafele ve Amr b. Ma‘dîkerib → an); 445 (A‘meş ve Hasan b. Amr ve Câmi‘ b. Ebî Râşid ve Muhammed b. Kays ve Ebû Hasîn → an)
- **fezail f03.json**: 493 (Abdullah b. Süleymân → an); 494 (Abdullah b. Süleymân → an); 495 (Abdullah b. Süleymân → an); 496 (Abdullah b. Süleymân → an); 526 (Abdullah b. es-Sakr es-Sükkerî → an); 527 (Abdullah b. es-Sakr → an); 528 (Abdullah b. es-Sakr → an); 529 (Abdullah b. es-Sakr → an); 530 (Abdullah b. es-Sakr → an); 531 (Muhammed b. İbrâhîm el-Esbehânî → an); 619 (Hüseyin → an); 619 (babası → an); 620 (Hüseyin → an); 620 (babası → an); 628 (Dâvûd b. Ebî Süleymân → an); 631 (Abdullah b. Süleymân b. el-Eş‘as → an); 632 (Ali b. Şuayb es-Simsâr ve İbrâhîm b. Râşid el-Âdemî ve İbrâhîm b. Abdurrahmân ed-Dihkān → an); 650 (Sâlim b. Ebî Hafsa ve A‘meş ve Abdullah b. Sahbân ve Kesîr en-Nevvâ ve İbn Ebî Leylâ → an); 653 (Abdullah b. el-Hasan el-Harrânî → an); 667 (A‘meş ve Abdullah b. Sahbân ve Kesîr en-Nevvâ ve İbn Ebî Leylâ ve Sâlim b. Ebî Hafsa → an); 716 (Süfyân → an)
- **fezail f04.json**: 839 (Ebû Umeyr b. en-Nehhâs ve Muhammed b. Semâa ve Îsâ b. Yûnus er-Remlî → an); 843 (Abdullah b. es-Sakr es-Sükkerî → an); 857 (Ebû Şuayb Abdullah b. el-Hasan el-Harrânî → an)
- **fezail f05.json**: 934 (Abdullah b. Muhammed el-Begavî → an); 939 (Sevvâr b. Abdullah → an); 942 (Abdullah b. Muhammed el-Begavî → an); 944 (Abdullah b. Muhammed el-Begavî → an); 945 (Abdullah b. Ömer → an)
- **fezail f06.json**: 1049 (Abdullah b. Süleymân b. el-Eş‘as → an); 1065 (Dahhâk b. Mahled Ebû Âsım en-Nebîl eş-Şeybânî ve Ebû Bekir el-Hanefî ve Ebû Ali el-Hanefî → an); 1083 (Abdullah b. Muhammed b. Abdülazîz el-Begavî → an); 1084 (İbn Zencûye ve Muhammed b. İshâk ve başkaları → an); 1088 (Abdullah b. Muhammed → an); 1093 (Abdullah b. es-Sakr → an); 1096 (Dâvûd b. Amr ed-Dabbî ve Ebü’r-Rebî‘ ez-Zehrânî → an); 1099 (Abdullah b. Muhammed → an); 1108 (Yahyâ b. Abdülhamîd el-Himmânî → an); 1108 (Şerîk → an); 1108 (A‘meş → an); 1108 (Minhâl b. Amr → an); 1110 (Ahmed b. Mansûr ve Ali b. Müslim ve başkaları → an); 1112 (Abdullah b. el-Hasan el-Harrânî → an); 1113 (Abdullah b. el-Hasan → an); 1117 (Abdullah b. Ğannâm el-Kûfî → an); 1121 (Ebû Ca‘fer el-Hadramî → an); 1128 (Abdullah b. el-Hasan → an); 1131 (Ebû Abdullah Hüseyn b. Râşid et-Tufâvî ve Bedel b. el-Muhabber’in komşusu Ebû Bişr Sabbâh b. Abdullah → an); 1136 (Abdullah b. el-Hasan el-Harrânî → an); 1139 (Abdullah b. Süleymân es-Sicistânî → an); 1142 (Muhammed b. Abdullah el-Hadramî → an); 1144 (Mâlik b. Miğvel’in kızının oğlu Ahmed b. Esed el-Becelî → an); 1149 (Abdullah b. Süleymân → an); 1150 (Abdullah b. Süleymân → an); 1220 (Ebû Avâne → an); 1235 (Ebû Hayseme Züheyr b. Harb ve Süfyân b. Vekî‘ b. el-Cerrâh → an)
- **fezail f07.json**: 1259 (Ebû Bekir b. Abdurrahmân b. el-Misver → an); 1297 (ondan → kâle); 1336 (Sa‘d b. İbrâhîm b. Sa‘d ve Ya‘kūb b. İbrâhîm → an); 1396 (İbn Abbâs → kâle); 1475 (Yahyâ b. Zekeriyyâ b. Ebî Zâide ve İbn Numeyr → an); 1490 (Eş‘as b. İshâk b. Sa‘d b. Ebî Vakkâs → kâle); 1533 (Zührî → kâle)
- **fezail f08.json**: 1545 (Muhammed b. Ca‘fer → an); 1569 (Ebû İshâk el-Ubâdî → kâle); 1583 (Hişâm → an); 1715 (Katâde → kâle)
- **fezail f09.json**: 1774 (Cerîr → an); 1822 (Ebû Abdurrahmân Muhammed b. Abdullah b. Nümeyr el-Hemdânî ve Ebû Bekir b. Ebî Şeybe → an); 1831 (Ebû Ma‘mer ve Ebû Bekir b. Ebî Şeybe → an); 1891 (Meysere b. Habîb → an); 1920 (Ebû Ma‘mer ve Osmân b. Ebî Şeybe → an)
- **hallal h01.json**: 11 (Ebû Bekir b. el-Utrûş → kâle)
- **hallal h02.json**: 1 (Mübârek b. Abdülcebbâr es-Sayrafî → an); 1 (Abdülazîz b. Ali el-Ezecî → an); 37 (İbn Mehdî → an); 46 (Bişr b. Mûsâ el-Esedî → an); 53 (Vekî‘ → an); 57 (Vekî‘ → an); 60 (Şerîk → an); 61 (Vekî‘ → an); 62 (Katâde → an); 69 (Kāsım b. Avf → an); 74 (Vekî‘ → an)
- **hallal h03.json**: 1 (babası Ebû Muhammed Abdülkādir b. Ebî Sâlih b. Abdullah el-Hanbelî → an); 6 (Yûsuf b. Abdullah el-İskâfî → an); 14 (Ebû Ali ed-Dîneverî’nin mesâili → an); 36 (Hasan → kâle); 42 (Ebû Abdullah → an)
- **ibane i01.json**: 68 (Kādî el-Mehâmilî ve Abdullah b. Muhammed b. Saîd → an); 82 (Kutbe b. Abdülazîz ve Ebû Bekir b. Ayyâş → an); 103 (Ebû Ca‘fer Muhammed b. Ubeydullah b. el-Alâ el-Kâtib → an); 128 (Ebû Avâne ve Ebû Bekir b. Ayyâş ve Hammâd b. Zeyd → an)
- **ibnebiseybe e01.json**: 34 (Saîd b. Cübeyr ve Abdullah b. el-Hâris b. Nevfel → an)
- **ibnebiseybe e02.json**: 103 (Hişâm b. Urve → an)
- **ibnebiseybe e03.json**: 249 (Mufaddal b. Fadâle → an)
- **zuhd z01.json**: 88 (Câbir b. Abdullah → kâle); 142 (Abdurrahmân → an); 149 (İbn Ebî Hâlid → an)
- **zuhd z02.json**: 432 (İbrâhîm b. Akīl b. Ma‘kıl b. Münebbih → an)
- **zuhd z04.json**: 763 (Abdurrahmân b. Cübeyr b. Nüfeyr → an); 770 (Ebü’d-Derdâ → kâle); 888 (Benî Abs’tan bir şeyh → kâle); 949 (Adî b. Hâtim’i gören biri → kâle); 985 (Dâvûd b. Amr ve Ebü’l-Cehm el-Ezrak b. Ali → an)
- **zuhd z05.json**: 1239 (Umâre b. Abdullah el-Anberî ve oğlu ve Sâbit Ebü’l-Fadl → kâle)
- **zuhd z06.json**: 1567 (Bişr b. el-Hâris → an); 1635 (bir şeyh → kâle)
- **zuhd z07.json**: 1743 (Abdullah b. Mindel → an); 1763 (Hammâd b. Seleme ve Hammâd b. Zeyd ve kardeşi Saîd b. Zeyd → an); 1810 (Ebû İmrân el-Cevnî ve Ebû Hârûn el-Abdî → an)
- **zuhd z08.json**: 2020 (babası → kâle); 2218 (Kāsım b. Mâlik → an); 2232 (Mâlik b. Miğvel → an)

## Belirsiz hizalama (maliyet yüksek)

- **acurri a01.json**: 90.1
- **acurri a02.json**: 10, 10
- **acurri a03.json**: 0
- **acurri a05.json**: 0
- **acurri a06.json**: 64
- **acurri a07.json**: 11, 11, 11
- **acurri a09.json**: 1
- **acurri a10.json**: 1, 75, 77, 102
- **ahmed m01.json**: 0
- **ahmed m03.json**: 14, 76, 94
- **ahmed m04.json**: 0, 261
- **buhari b02.json**: 147
- **ebudavud d01.json**: 0
- **fezail f01.json**: 13, 22, 34, 81, 81, 81, 81, 81, 81, 81, 82, 140, 168, 182, 250
- **fezail f02.json**: 379, 419, 445
- **fezail f03.json**: 528, 628
- **fezail f05.json**: 956
- **fezail f06.json**: 1084, 1108, 1117, 1142, 1144, 1188
- **fezail f07.json**: 1336, 1436, 1439
- **fezail f09.json**: 1822, 1881
- **hallal h02.json**: 1
- **hallal h03.json**: 1, 14, 54, 105, 105, 105, 106, 113, 115, 122, 170, 170, 177, 199, 227
- **ibane i01.json**: 103, 124, 128
- **ibnebiseybe e02.json**: 103
- **zuhd z02.json**: 432
- **zuhd z03.json**: 623
- **zuhd z04.json**: 841, 881
- **zuhd z05.json**: 1211, 1234
- **zuhd z07.json**: 1713, 1763
- **zuhd z08.json**: 2317
