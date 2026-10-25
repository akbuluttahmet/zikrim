'use strict';
/* Hanbelî fıkhı özeti — Zâdü'l-Müstakni' (Haccâvî) ve şerhi er-Ravzu'l-Mürbi' (Behûtî) bab sırasıyla,
   mezhebin mu'temed (fetvaya esas) görüşüne göre. Kısa özettir; uygulamada bir hocaya danışılmalıdır. */
const FIQH = [
  {cat: '1 · Tahâret (Temizlik)', topics: [
    {t: 'Sular', items: [
      'Sular üç kısımdır: tahûr (hem temiz hem temizleyici), tâhir (temiz ama hadesi gidermez) ve necis.',
      'Tahûr su, yaratıldığı hâlde kalan sudur. Temiz bir madde karışıp rengi, tadı veya kokusu ona “su” denmeyecek kadar değişirse tâhir olur.',
      'İki kulleden az su, necasete değince değişmese de necis olur. İki kulle ve fazlası ancak necasetle rengi, tadı veya kokusu değişirse necis olur.',
      'Altın ve gümüş kaplardan yiyip içmek ve onlarla abdest almak haramdır.'
    ]},
    {t: 'Tuvalet Âdabı ve İstincâ', items: [
      'Helaya sol ayakla girilir ve “Bismillâh, Allâhümme innî e‘ûzü bike mine’l-hubsi ve’l-habâis” denir; sağ ayakla çıkılır ve “Ğufrâneke” denir.',
      'Açık arazide def-i hacet sırasında kıbleye önü ya da arkası dönük olmak haramdır.',
      'Taşla temizlik (isticmâr) için temizlenmenin yanında en az üç sürüş şarttır. Su ile temizlik daha faziletli, ikisini birleştirmek en faziletlisidir.'
    ]},
    {t: 'Abdest', items: [
      'Niyet şarttır. Besmele hatırlayınca vaciptir, unutulursa düşer.',
      'Farzları altıdır: yüzü yıkamak (ağız ve buruna su vermek dahil), kolları dirseklerle yıkamak, başın tamamını meshetmek (kulaklar başa dahildir), ayakları topuklarla yıkamak, tertip ve muvâlât (azaları kurumadan ardı ardına yıkamak).',
      'Sünnetlerinden bazıları: misvak, elleri üç kez yıkamak, sakal ve parmak aralarını hilallemek, sağdan başlamak, ikinci ve üçüncü kez yıkamak.'
    ]},
    {t: 'Mest ve Sargı Üzerine Mesh', items: [
      'Mukim bir gün bir gece, yolcu üç gün üç gece mesheder. Süre, mestleri giydikten sonraki ilk hadesten başlar.',
      'Mestlerin tam bir abdestle giyilmesi ve farz bölgeyi örtmesi şarttır.',
      'Sarık (imâme) ve kadının boyun altından dolanan başörtüsü üzerine mesh caizdir. Sargı (cebîre) üzerine ihtiyaç süresince mesh edilir.'
    ]},
    {t: 'Abdesti Bozanlar', items: [
      'Sekiz şeydir: iki yoldan çıkan her şey; bedenin başka bir yerinden çıkan çok miktarda necaset; uyku ya da başka sebeple aklın gitmesi (oturan ya da ayaktakinin hafif uykusu hariç); ön veya arka avret yerine elle doğrudan dokunmak; şehvetle kadına dokunmak; ölü yıkamak; deve eti yemek; dinden dönmek.',
      'Abdestsiz kişiye namaz, tavaf ve Mushaf’a dokunmak haramdır.'
    ]},
    {t: 'Gusül', items: [
      'Gerektiren şeyler: meninin lezzetle çıkması, cinsel birleşme (meni çıkmasa da), kâfirin Müslüman olması, ölüm, hayız ve nifasın sona ermesi.',
      'Farzı niyet ve bütün bedeni (ağız ve burun dahil) yıkamaktır.',
      'Cünüp kişiye Kur’an okumak haramdır. Abdest almadan mescitte oturamaz.'
    ]},
    {t: 'Teyemmüm', items: [
      'Su bulunamazsa ya da kullanmak zarar verirse, tozu olan temiz toprakla yapılır.',
      'Niyet şarttır. Farzları yüzü ve elleri bileklere kadar meshetmektir; küçük hadeste tertip ve muvâlât da farzdır.',
      'Vaktin çıkması, suyun bulunması ve abdesti bozan şeylerle bozulur.'
    ]},
    {t: 'Necasetin Giderilmesi', items: [
      'Yerdeki necaset, onu gideren bir yıkamayla temizlenir. Başka yerlerdeki necaset yedi kez yıkanır; köpek ve domuz necasetinde bu yedi yıkamadan biri toprakla olur.',
      'Yemek yemeyen erkek bebeğin idrarına su serpmek yeterlidir.',
      'Eti yenen hayvanların idrarı ve dışkısı temizdir.'
    ]},
    {t: 'Hayız ve Nifas', items: [
      'Hayız en az bir gün bir gece, en çok on beş gündür. İki hayız arasındaki temizlik en az on üç gündür.',
      'Nifasın en uzun süresi kırk gündür.',
      'Hayızlı ve lohusa kadın namaz kılmaz, oruç tutmaz. Orucunu kaza eder, namazını kaza etmez.'
    ]}
  ]},

  {cat: '2 · Namaz', topics: [
    {t: 'Hükmü ve Vakitleri', items: [
      'Beş vakit namaz, ergenlik çağına gelmiş akıllı her Müslümana farzdır. Çocuğa yedi yaşında emredilir, on yaşında terk ederse hafifçe dövülür.',
      'Namazın farz olduğunu inkâr eden kâfir olur. Mu‘temed görüşe göre inkâr etmeden tembellikle bırakıp yetkilinin çağrısına rağmen ısrar eden de kâfir sayılır.',
      'Öğle: zevalden gölgenin kendi boyu kadar olmasına. İkindi: ondan gölgenin iki misline kadar (ihtiyar vakti), zaruret vakti güneş batana kadar. Akşam: kızıllığın kaybolmasına. Yatsı: gecenin üçte birine (ihtiyar vakti), zaruret vakti fecre kadar. Sabah: fecirden güneşin doğuşuna.',
      'Namazı ilk vaktinde kılmak efdaldir. Yatsıyı (zorluk yoksa) ve şiddetli sıcakta öğleyi geciktirmek müstehaptır.'
    ]},
    {t: 'Ezan ve Kamet', items: [
      'Yerleşik yerlerde erkekler için farz-ı kifâyedir.',
      'Ezan on beş cümle, kamet on bir cümledir.'
    ]},
    {t: 'Namazın Şartları', items: [
      'Dokuzdur: İslam, akıl, temyiz, hadesten tahâret, vaktin girmesi, avret yerini örtmek, beden, elbise ve yerde necasetten kaçınmak, kıbleye yönelmek, niyet.',
      'Erkeğin avreti göbekle diz arasıdır; farz namazda bir omuzun da örtülmesi gerekir. Hür kadının namazda yüzü dışında bütün bedeni avrettir.'
    ]},
    {t: 'Namazın Rükünleri', items: [
      'On dörttür: gücü yetene kıyam, iftitah tekbiri, Fatiha, rükû, rükûdan doğrulmak, itidal, yedi aza üzerine secde, secdeden doğrulmak, iki secde arasında oturmak, bütün rükünlerde tuma’nîne, son teşehhüd, son teşehhüd için oturmak, son teşehhüdde Peygamber’e salavat, tertip ve selam (farzda iki selam).',
      'Rükün unutulursa namaz içinde yerine getirilir; kasten terk edilirse namaz bozulur.'
    ]},
    {t: 'Namazın Vacipleri', items: [
      'Sekizdir: iftitah dışındaki tekbirler; imam ve tek kılan için “Semi‘allâhu li-men hamideh”; “Rabbenâ ve leke’l-hamd”; rükûda bir kez “Sübhâne Rabbiye’l-Azîm”; secdede bir kez “Sübhâne Rabbiye’l-A‘lâ”; iki secde arasında bir kez “Rabbiğfir lî”; ilk teşehhüd ve ilk teşehhüd için oturuş.',
      'Kasten terk edilen vacip namazı bozar; unutarak terk edilirse sehiv secdesi yapılır.'
    ]},
    {t: 'Namazın Sünnetleri', items: [
      'Sözlü sünnetlerden: Sübhâneke duası, gizli euzü-besmele, “âmîn” demek, Fatiha’dan sonra sûre okumak, tesbihleri birden fazla söylemek.',
      'Fiilî sünnetlerden: iftitahta, rükûya giderken ve rükûdan kalkarken elleri kaldırmak; sağ eli sol elin üzerine koymak; secde yerine bakmak; üç ve dört rekâtlı namazların son teşehhüdünde teverrük oturuşu.'
    ]},
    {t: 'Namazı Bozanlar', items: [
      'Konuşmak, kahkaha ile gülmek, kasten rükün ya da vacip terk etmek, abdestin bozulması, kıbleden dönmek, zaruret olmadan çok ve ardışık hareket etmek.',
      'Sütresi olmayan kişinin önünden simsiyah köpek geçmesi namazı bozar; kadın ve eşeğin geçmesi bozmaz.'
    ]},
    {t: 'Sehiv Secdesi', items: [
      'Namazda unutarak fazlalık, eksiklik ya da şüphe olduğunda yapılır.',
      'Selamdan önce yapılır. Namazı eksik kılıp selam verdikten sonra hatırlayan ise eksiği tamamlar ve selamdan sonra secde eder.'
    ]},
    {t: 'Nafile Namazlar', items: [
      'Revâtib on rekâttır: öğleden önce iki, sonra iki; akşamdan sonra iki; yatsıdan sonra iki; sabahtan önce iki. En kuvvetlisi sabahın sünnetidir.',
      'Vitir sünnet-i müekkededir; en azı bir, en çoğu on bir rekâttır. Kunut rükûdan sonra okunur. Sabah namazında kunut yoktur.',
      'Teravih cemaatle yirmi rekâttır.',
      'Kerahat vakitleri: sabah namazından güneş bir mızrak boyu yükselene kadar, zeval anında ve ikindiden güneş batana kadar. Bu vakitlerde nafile kılınmaz; kaza namazları ve tavaf namazı kılınabilir.'
    ]},
    {t: 'Cemaatle Namaz ve İmamlık', items: [
      'Beş vakit namazda cemaat, gücü yeten erkeklere farz-ı ayndır; ancak namazın sıhhat şartı değildir.',
      'İmamlığa en layık olan Kur’an’ı en iyi okuyandır, sonra fıkhı en iyi bilen gelir.',
      'Fâsıkın arkasında kılınan namaz, cuma ve bayram hariç sahih değildir. Kadın erkeğe imam olamaz.'
    ]},
    {t: 'Mazeret Sahiplerinin Namazı', items: [
      'Hasta gücü yettiği kadar ayakta, değilse oturarak, değilse yan yatarak kılar.',
      'Seferîlik mesafesi on altı fersahtır (yaklaşık 80 km). Dört rekâtlı farzlar iki kılınır. Dört günden fazla kalmaya niyet eden tam kılar.',
      'Seferde ve hastalıkta öğle ile ikindi, akşam ile yatsı birleştirilebilir. Yağmur, çamur ve şiddetli soğuk rüzgârda akşam ile yatsı birleştirilebilir.'
    ]},
    {t: 'Cuma Namazı', items: [
      'Hür, mukim, mükellef erkeğe farzdır.',
      'Şartları: vakit, imam dahil kırk kişi, yerleşim yeri ve namazdan önce iki hutbe.',
      'Vakti bayram namazı vaktiyle başlar, öğle vaktinin sonuna kadar sürer. İki rekâttır.'
    ]},
    {t: 'Bayram, Küsûf ve İstiskâ Namazları', items: [
      'Bayram namazı farz-ı kifâyedir. İki rekâttır: ilk rekâtta iftitahtan sonra altı, ikincide kalkış tekbirinden sonra beş zâid tekbir alınır. Hutbe namazdan sonra okunur.',
      'Küsûf (güneş/ay tutulması) namazı sünnettir; iki rekâttır ve her rekâtta iki rükû vardır.',
      'İstiskâ (yağmur duası) namazı kıtlık zamanında sünnettir; bayram namazı gibi kılınır.'
    ]}
  ]},

  {cat: '3 · Cenâze', topics: [
    {t: 'Hükümler', items: [
      'Ölmek üzere olana “lâ ilâhe illallâh” telkin edilir. Ölünce gözleri kapatılır.',
      'Yıkamak, kefenlemek, namazını kılmak, taşımak ve defnetmek farz-ı kifâyedir.',
      'Erkek üç beyaz sargı bezle, kadın beş parça ile kefenlenir.',
      'Cenaze namazı dört tekbirdir: birinciden sonra Fatiha, ikinciden sonra salavat, üçüncüden sonra ölüye dua okunur; dördüncüden sonra kısa beklenip sağa tek selam verilir. Ayakta kılmak rükündür.',
      'Kabir yerden bir karış kadar yükseltilir. Üzerine bina yapmak ve sıvamak mekruh, kabirleri mescit edinmek haramdır.',
      'Feryat ederek ağıt yakmak ve yaka yırtmak haramdır; sessizce ağlamak caizdir. Taziye sünnettir.'
    ]}
  ]},

  {cat: '4 · Zekât', topics: [
    {t: 'Şartları ve Zekâta Tabi Mallar', items: [
      'Vacip olmasının şartları: İslam, hürriyet, nisaba tam mülkiyetle sahip olmak ve üzerinden bir yıl geçmesi. Toprak ürünlerinde yıl şartı yoktur. Çocuğun ve delinin malına da zekât düşer.',
      'Zekâta tabi mallar: yılın çoğunda merada otlayan deve, sığır ve koyun; altın, gümüş ve nakit; ticaret malları; ölçülen ve saklanabilen tahıl ve meyveler; madenler.'
    ]},
    {t: 'Altın, Gümüş ve Ticaret Malı', items: [
      'Altının nisabı yirmi miskal, gümüşün nisabı iki yüz dirhemdir. Zekâtı kırkta birdir.',
      'Kullanılan mubah ziynet eşyasına zekât yoktur.',
      'Ticaret malları yıl dolunca değerleri üzerinden hesaplanır.'
    ]},
    {t: 'Toprak Ürünleri', items: [
      'Nisabı beş vesktir.',
      'Zahmetsiz sulananda onda bir, zahmetle (aletle) sulananda yirmide bir verilir.'
    ]},
    {t: 'Fıtır Sadakası', items: [
      'Bayram gecesi güneş batınca vacip olur. Kişi kendisi ve bakmakla yükümlü olduğu kimseler için verir.',
      'Kişi başı bir sâ‘ hurma, buğday, arpa, kuru üzüm veya keş verilir; bunlar yoksa başka bir azık. Değerini (para olarak) vermek yeterli olmaz.',
      'Bayram namazından önce vermek efdaldir; bayramdan bir iki gün önce vermek caizdir.'
    ]},
    {t: 'Zekâtın Verileceği Yerler', items: [
      'Tevbe sûresi 60. ayette sayılan sekiz sınıfa verilir.',
      'Usûle (anne, baba, dedeler), fürû‘a (çocuklar, torunlar) ve eşe verilmez. Hâşimoğullarına da verilmez.'
    ]}
  ]},

  {cat: '5 · Oruç ve İ‘tikâf', topics: [
    {t: 'Ramazan’ın Başlaması ve Niyet', items: [
      'Ramazan hilalin görülmesi ya da Şaban’ın otuza tamamlanmasıyla başlar. Mu‘temed görüşe göre Şaban’ın 29. gecesi bulut veya toz hilali gizlerse, ertesi gün ihtiyaten Ramazan niyetiyle oruç tutulur.',
      'Farz oruçta her gün için geceden niyet şarttır. Nafile oruçta, oruç bozan bir şey yapılmamışsa gündüz de niyet edilebilir.'
    ]},
    {t: 'Orucu Bozanlar', items: [
      'Yemek ve içmek; boğaza veya mideye bir şey ulaştırmak; kasten kusmak; hacamat yaptırmak ve yapmak; öpme, dokunma veya tekrar tekrar bakmayla meni çıkarmak.',
      'Unutarak yiyen ve içenin orucu bozulmaz.',
      'Ramazan gündüzü cinsel birleşmede (mu‘temed görüşe göre unutarak da olsa) kaza ile birlikte kefaret gerekir: bir köle azat etmek; bulamayan iki ay peş peşe oruç tutar; ona da gücü yetmeyen altmış fakiri doyurur.'
    ]},
    {t: 'Ruhsatlar', items: [
      'Yolcu ve hasta oruç tutmayabilir, sonra kaza eder.',
      'İyileşme ümidi olmayan hasta ve oruca dayanamayan yaşlı, her gün için bir fakiri doyurur.'
    ]},
    {t: 'Nafile Oruçlar ve Yasak Günler', items: [
      'Sünnet oruçlar: Şevval’den altı gün, hacı olmayan için Arefe günü, Muharrem’in dokuzu ve onu, her aydan üç gün (13, 14, 15), pazartesi ve perşembe.',
      'Bayram günlerinde oruç haramdır. Teşrik günlerinde de haramdır; yalnızca hedy bulamayan temettu ve kıran hacısı tutabilir.'
    ]},
    {t: 'İ‘tikâf', items: [
      'Sünnettir. İ‘tikâf süresince namaz vakti girecekse, cemaatle namaz kılınan bir mescitte yapılır.'
    ]}
  ]},

  {cat: '6 · Hac ve Umre', topics: [
    {t: 'Farziyeti ve Mîkatlar', items: [
      'Müslüman, akıllı, ergen, hür ve gücü yeten kişiye ömründe bir kez hac ve umre farzdır. Kadın için mahremin bulunması vücûb şartıdır.',
      'Mîkatlar: Medineliler için Zülhuleyfe, Şamlılar ve Mısırlılar için Cuhfe, Yemenliler için Yelemlem, Necidliler için Karnülmenâzil, Iraklılar için Zâtüırk.',
      'Üç türü vardır: temettu, ifrad ve kıran. En faziletlisi temettudur.'
    ]},
    {t: 'İhram Yasakları', items: [
      'Saç ve tırnak kesmek; erkeğin başını örtmesi ve dikişli giymesi; güzel koku sürünmek; kara hayvanı avlamak; nikâh kıymak; cinsel birleşme ve şehvetle temas.',
      'Kadın yüzünü peçe ile, ellerini eldivenle örtmez.'
    ]},
    {t: 'Haccın Rükün ve Vacipleri', items: [
      'Rükünleri dörttür: ihram, Arafat vakfesi, ziyaret tavafı ve sa‘y.',
      'Vacipleri yedidir: mîkattan ihrama girmek; gündüz Arafat’ta duran için güneş batana kadar kalmak; Müzdelife’de gece yarısından sonraya kadar kalmak; teşrik gecelerini Mina’da geçirmek; cemreleri sırasıyla atmak; tıraş olmak veya saç kısaltmak; veda tavafı.',
      'Rükün terk edilirse hac tamam olmaz. Vacip terk edilirse kurban (dem) gerekir. Sünnetin terkinde bir şey gerekmez.'
    ]},
    {t: 'Umre', items: [
      'Rükünleri: ihram, tavaf ve sa‘y. Vacipleri: mîkattan ihram ve tıraş ya da saç kısaltma.'
    ]}
  ]},

  {cat: '7 · Kurban ve Akîka', topics: [
    {t: 'Kurban', items: [
      'Gücü yetene sünnet-i müekkededir.',
      'Deve en az beş, sığır iki, keçi bir yaşında, koyun altı aylık olmalıdır. Gözü belirgin şekilde kör, açıkça topal, belirgin hasta ve aşırı zayıf hayvan kurban olmaz.',
      'Bir koyun bir kişi ve ev halkı adına, deve ve sığır yedi kişi adına kesilir.',
      'Vakti bayram namazından sonra başlar, bayramın üçüncü gününün sonuna kadar sürer.',
      'Etinin üçte birini yemek, üçte birini hediye etmek, üçte birini sadaka vermek sünnettir.',
      'Kurban kesecek kişi Zilhicce girince, kurbanı kesilene kadar saçından, tırnağından ve derisinden bir şey almaz.'
    ]},
    {t: 'Akîka', items: [
      'Sünnettir: erkek çocuk için iki, kız çocuk için bir koyun, doğumun yedinci günü kesilir.',
      'O gün çocuğa isim konur; erkek çocuğun başı tıraş edilir.'
    ]}
  ]},

  {cat: '8 · Yiyecekler, Av ve Kesim', topics: [
    {t: 'Yiyecekler', items: [
      'Yiyeceklerde asıl olan helalliktir.',
      'Haram olanlar: evcil eşek; azı dişiyle avlanan yırtıcılar (aslan, kurt gibi); pençesiyle avlanan kuşlar; leş yiyenler ve pis sayılan hayvanlar.',
      'Deniz hayvanlarının hepsi helaldir; kurbağa, timsah ve yılan hariç.'
    ]},
    {t: 'Kesim (Zekât)', items: [
      'Şartları: kesenin akıllı bir Müslüman ya da Ehl-i kitap olması; keskin bir aletle kesmek; boğaz ve yemek borusunu kesmek; kesim sırasında besmele çekmek.',
      'Besmele unutulursa hayvan yenir; kasten bırakılırsa yenmez.'
    ]},
    {t: 'Av', items: [
      'Avcının kesim ehli olması, aletin keskin olması ya da hayvanın eğitimli olması gerekir.',
      'Aleti ya da hayvanı gönderirken besmele şarttır. Avda besmele unutularak bırakılsa da av helal olmaz.'
    ]}
  ]},

  {cat: '9 · Yemin ve Adak', topics: [
    {t: 'Hükümler', items: [
      'Yemin Allah’ın adı veya sıfatlarıyla edilir. Allah’tan başkası adına yemin haramdır.',
      'Yemin kefareti: on fakiri doyurmak ya da giydirmek veya bir köle azat etmek. Bunlara gücü yetmeyen peş peşe üç gün oruç tutar.',
      'Taat adağını yerine getirmek vaciptir. Günah olan bir şeyi adayan onu yapmaz ve yemin kefareti öder.'
    ]}
  ]},

  {cat: '10 · Alışveriş ve Muameleler', topics: [
    {t: 'Satış', items: [
      'Satış, icab ve kabul ile ya da karşılıklı alıp vermekle (muâtât) gerçekleşir.',
      'Şartları yedidir: tarafların rızası; tasarruf ehliyeti; satılanın mubah bir mal olması; satıcının mülkü veya vekâleti olması; teslim edilebilir olması; satılanın ve fiyatın bilinmesi.',
      'Cuma namazıyla yükümlü kişinin, ikinci ezandan sonraki alışverişi sahih değildir.',
      'Îne satışı (veresiye satıp daha ucuza peşin geri almak) haramdır.'
    ]},
    {t: 'Ribâ (Faiz)', items: [
      'Altın, gümüş ve ölçü ya da tartıyla satılan mallar aynı cinsten değiştirilirse eşitlik ve peşinlik şarttır.',
      'Farklı cinsten olup aynı sınıftan ise (ör. altın-gümüş) yalnızca peşinlik şarttır.',
      'Menfaat şartıyla verilen borç faizdir.'
    ]},
    {t: 'Muhayyerlik (Hıyâr)', items: [
      'Sekiz türdür: meclis, şart, aldanma (gabn), kusur gizleme (tedlîs), ayıp, fiyatı yanlış bildirme, tarafların anlaşmazlığı ve görülen ya da tarif edilen vasfın farklı çıkması.'
    ]},
    {t: 'Diğer Akitler', items: [
      'Rehin, borçlunun teslim etmesiyle bağlayıcı olur.',
      'Kira (icâre) akdinde menfaatin ve ücretin bilinmesi şarttır.',
      'Vakfın aslı satılmaz, hibe edilmez ve miras bırakılmaz. Geliri, vakfedenin şartına göre harcanır.',
      'Hibe, teslim alınmakla kesinleşir. Babanın dışında kimse verdiği hibeden dönemez; çocuklar arasında hibede adaletli olmak vaciptir.'
    ]}
  ]},

  {cat: '11 · Vasiyet ve Miras', topics: [
    {t: 'Vasiyet', items: [
      'Çok mal bırakan için malının beşte birini vasiyet etmesi müstehaptır.',
      'Mirasçıya vasiyet ile malın üçte birinden fazlasını vasiyet etmek, mirasçıların onayına bağlıdır.'
    ]},
    {t: 'Miras (Ferâiz)', items: [
      'Mirastan önce cenaze masrafları, borçlar ve vasiyet ödenir.',
      'Kur’an’da belirlenen paylar altıdır: yarım, dörtte bir, sekizde bir, üçte iki, üçte bir, altıda bir.',
      'Asabe, paylar verildikten sonra kalanı alır. Erkek, aynı derecedeki kadının iki katını alır.',
      'Paylar dağıtıldıktan sonra artan mal, karı-koca hariç pay sahiplerine geri verilir (redd). Pay sahibi ve asabe yoksa zevi’l-erham mirasçı olur.',
      'Haksız öldürmek ve din farkı mirasa engeldir.'
    ]}
  ]},

  {cat: '12 · Nikâh', topics: [
    {t: 'Hükmü, Rükünleri ve Şartları', items: [
      'Şehveti olan için sünnettir. Zinaya düşmekten korkana vaciptir.',
      'Rükünleri: eşler, icab ve kabul.',
      'Şartları: eşlerin belirlenmesi, rızaları, veli ve iki adil Müslüman erkek şahit. Velisiz nikâh sahih değildir.',
      'Velilik sırası: baba, babanın vasisi, dede, oğul, öz kardeş, baba bir kardeş, sonra en yakın asabe.'
    ]},
    {t: 'Mehir ve Nikâhtaki Şartlar', items: [
      'Mehir az ya da çok olabilir. Belirlenmezse mehr-i misil gerekir.',
      'Kadının lehine konulan meşru şartlar (ör. kendi şehrinden çıkarılmamak) geçerlidir. Uyulmazsa kadın nikâhı feshedebilir.',
      'Mut‘a ve hülle nikâhı batıldır.'
    ]},
    {t: 'Süt Akrabalığı', items: [
      'İki yaşından önce beş doyurucu emme, nesebin haram kıldığı kimseleri haram kılar.'
    ]}
  ]},

  {cat: '13 · Talâk, İddet ve Nafaka', topics: [
    {t: 'Talâk', items: [
      'İhtiyaç olmadan boşamak mekruhtur.',
      'Sünnete uygun talak, içinde birleşme olmayan bir temizlik döneminde tek talaktır.',
      'Mu‘temed görüşe göre tek sözle verilen üç talak üç sayılır.',
      'Ric‘î talakta koca, iddet bitmeden nikâhsız ve mehirsiz geri dönebilir. Üçüncü talaktan sonra kadın, başka biriyle sahih nikâh ve birleşme olmadan önceki kocasına helal olmaz.',
      'Hul‘ (kadının bedel vererek ayrılması), talak lafzı ya da niyeti yoksa fesih sayılır ve talak sayısından düşmez.'
    ]},
    {t: 'İddet', items: [
      'Hamile kadının iddeti doğumla, hayız görenin üç hayızla, hayız görmeyenin üç ayla biter.',
      'Kocası ölen (hamile olmayan) kadının iddeti dört ay on gündür. Bu sürede süslenmez (ihdâd) ve evinde kalır.'
    ]},
    {t: 'Nafaka', items: [
      'Koca, durumuna göre eşinin yiyecek, giyecek ve meskeninden sorumludur.',
      'Baba, malı olmayan çocuklarına; zengin çocuk da muhtaç anne babasına bakmakla yükümlüdür.'
    ]}
  ]},

  {cat: '14 · Cinayetler ve Diyetler', topics: [
    {t: 'Hükümler', items: [
      'Öldürme üç türlüdür: kasıt, kasıt benzeri (şibh-i amd) ve hata. Kısas yalnızca kasıtta vardır. Maktulün velisi kısas, diyet ya da af arasında seçim yapar.',
      'Hür Müslüman erkeğin diyeti yüz devedir. Kadının diyeti erkeğinkinin yarısıdır.',
      'Hata ve kasıt benzeri öldürmede diyeti katilin âkilesi (erkek akrabaları) öder. Katile ayrıca kefaret gerekir: bir köle azat etmek; bulamazsa iki ay peş peşe oruç.'
    ]}
  ]},

  {cat: '15 · Hadler', topics: [
    {t: 'Genel Hükümler', items: [
      'Had cezaları, ancak akıllı, ergen ve haramlığı bilen kişiye; ikrar ya da yeterli şahitle sabit olunca; devlet başkanı veya vekili tarafından uygulanır. Fertler uygulayamaz.',
      'Hadler şüphe ile düşer.',
      'Kazf (zina iftirası) haddi seksen sopadır. İçki haddi de seksen sopadır.',
      'Hırsızlık haddi için çalınan malın değeri en az çeyrek dinar ya da üç dirhem olmalı ve korunan bir yerden alınmış olmalıdır.'
    ]}
  ]},

  {cat: '16 · Yargı ve Şahitlik', topics: [
    {t: 'Hükümler', items: [
      'Kadılık farz-ı kifâyedir. Kadının akıllı, ergen, hür, Müslüman, adil, erkek ve ictihad ehli olması şarttır.',
      'Delil getirmek davacıya, yemin etmek inkâr edene düşer.',
      'Zina dört erkek şahitle sabit olur. Diğer had ve kısaslar iki erkek şahitle sabit olur. Mal davaları iki erkek, bir erkek ve iki kadın ya da bir şahit ve davacının yeminiyle sabit olur.'
    ]}
  ]}
];

const FIQH_INTRO = 'Bu bölüm, Hanbelî mezhebinin mu‘temed (fetvaya esas) görüşünün kısa bir özetidir. Bab sırası ve hükümler, mezhepte en çok okutulan Zâdü’l-Müstakni‘ (Haccâvî, ö. 968) ve şerhi er-Ravzu’l-Mürbi‘ (Behûtî, ö. 1051) esas alınarak hazırlanmıştır. Ayrıntı ve özel durumlar için bir hocaya danışın.';

const FIQH_BOOKS = [
  ['Muhtasaru’l-Hırakî', 'el-Hırakî (ö. 334)', 'Mezhebin ilk muhtasar metni; birçok şerhin temeli.'],
  ['Umdetü’l-Fıkh', 'İbn Kudâme (ö. 620)', 'Başlangıç seviyesi; tek görüşle, delilleriyle kısa metin.'],
  ['el-Mukni‘', 'İbn Kudâme (ö. 620)', 'Orta seviye; mezhep içindeki görüşleri verir.'],
  ['el-Kâfî', 'İbn Kudâme (ö. 620)', 'Orta-ileri seviye; delilleriyle.'],
  ['el-Muğnî', 'İbn Kudâme (ö. 620)', 'İleri seviye; mezhepler arası karşılaştırmalı büyük ansiklopedi.'],
  ['el-Furû‘', 'İbn Müflih (ö. 763)', 'Mezhep içi görüşleri en geniş toplayan eserlerden.'],
  ['el-İnsâf', 'el-Merdâvî (ö. 885)', 'Mezhepteki râcih görüşü belirleyen temel eser.'],
  ['el-İknâ‘', 'el-Haccâvî (ö. 968)', 'Mu‘temed görüşün iki ana kaynağından biri.'],
  ['Müntehe’l-İrâdât', 'İbnü’n-Neccâr (ö. 972)', 'Mu‘temed görüşün iki ana kaynağından biri; fetvada esas.'],
  ['Zâdü’l-Müstakni‘', 'el-Haccâvî (ö. 968)', 'En yaygın okutulan muhtasar; bu bölümün temeli.'],
  ['Delîlü’t-Tâlib', 'Mer‘î el-Kermî (ö. 1033)', 'Kısa ve açık muhtasar; başlangıç için uygun.'],
  ['er-Ravzu’l-Mürbi‘', 'el-Behûtî (ö. 1051)', 'Zâdü’l-Müstakni‘ şerhi; orta seviye.'],
  ['Keşşâfü’l-Kınâ‘', 'el-Behûtî (ö. 1051)', 'el-İknâ‘ şerhi; ileri seviye.'],
  ['Ahsarü’l-Muhtasarât', 'İbn Belbân (ö. 1083)', 'En kısa muhtasarlardan; ezber için.']
];
