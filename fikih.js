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

/* Deliller: her konu için ayet veya hadis (Türkçe anlamı) ve kaynağı.
   Anahtar: "bölüm no:konu başlığı". Hadis numaraları yaygın baskılara göredir
   (Buhârî ve Müslim: M. F. Abdülbâkî numaralandırması). */
const DELIL = {
  '1:Sular': [
    'Su temizdir, onu hiçbir şey necis kılmaz. — Ebû Dâvûd 66; Tirmizî 66',
    'Su iki kulle olunca necaset taşımaz. — Ebû Dâvûd 63; Tirmizî 67',
    'Altın ve gümüş kaplardan içmeyin, onların tabaklarından yemeyin; bunlar dünyada onlar için, ahirette sizin içindir. — Buhârî 5426; Müslim 2067'
  ],
  '1:Tuvalet Âdabı ve İstincâ': [
    'Enes: Peygamber helaya girerken “Allâhümme innî e‘ûzü bike mine’l-hubsi ve’l-habâis” derdi. — Buhârî 142; Müslim 375',
    'Def-i hacette kıbleye yönelmeyin, ona arkanızı da dönmeyin. — Buhârî 144; Müslim 264',
    'Biriniz def-i hacete gittiğinde yanında üç taş götürsün; bunlar ona yeter. — Ebû Dâvûd 40; Nesâî 44'
  ],
  '1:Abdest': [
    '“Ey iman edenler! Namaza kalkacağınız zaman yüzlerinizi, dirseklere kadar ellerinizi yıkayın, başlarınızı meshedin ve topuklara kadar ayaklarınızı yıkayın.” — Mâide 5/6',
    'Ameller ancak niyetlere göredir. — Buhârî 1; Müslim 1907',
    'Allah’ın adını anmayanın abdesti yoktur. — Ebû Dâvûd 101; İbn Mâce 399',
    'Peygamber, ayağında kuru bir yer kalan adama abdestini yeniden almasını emretti (muvâlâtın delili). — Ebû Dâvûd 175'
  ],
  '1:Mest ve Sargı Üzerine Mesh': [
    'Ali: Resûlullah yolcu için üç gün üç gece, mukim için bir gün bir gece süre belirledi. — Müslim 276',
    'Muğîre: Mestlerini çıkarmak istedim; “Bırak, ben onları temiz olarak giydim” dedi ve üzerlerine meshetti. — Buhârî 206; Müslim 274',
    'Peygamber alnına, sarığına ve mestlerine meshetti. — Müslim 274'
  ],
  '1:Abdesti Bozanlar': [
    'Câbir b. Semüre: “Deve etinden abdest alalım mı?” denildi; “Evet” buyurdu. — Müslim 360',
    'Zekerine dokunan abdest alsın. — Ebû Dâvûd 181; Tirmizî 82',
    '“…ya da kadınlara dokunduysanız…” — Nisâ 4/43',
    'Gözler makadın bağıdır; uyuyan abdest alsın. — Ebû Dâvûd 203'
  ],
  '1:Gusül': [
    'Kadının dört uzvu arasına oturup zorladığında gusül vacip olur. — Buhârî 291; Müslim 348',
    'Su (gusül), sudan (meniden) dolayıdır. — Müslim 343',
    'Kays b. Âsım Müslüman olunca Peygamber ona gusletmesini emretti. — Ebû Dâvûd 355; Tirmizî 605'
  ],
  '1:Teyemmüm': [
    '“…su bulamazsanız temiz bir toprakla teyemmüm edin; yüzlerinize ve ellerinize meshedin.” — Mâide 5/6',
    'Yeryüzü bana mescit ve temizleyici kılındı. — Buhârî 335; Müslim 521',
    'Ammâr hadisi: Peygamber ellerini yere bir kez vurup yüzüne ve ellerine meshetti. — Buhârî 347; Müslim 368'
  ],
  '1:Necasetin Giderilmesi': [
    'Köpek birinizin kabını yaladığında temizliği, ilki toprakla olmak üzere yedi kez yıkamaktır. — Müslim 279',
    'Kız çocuğunun idrarı yıkanır, erkek çocuğun idrarına su serpilir. — Ebû Dâvûd 376; Nesâî 304',
    'Ureyneliler kıssası: Peygamber onlara develerin sütünden ve sidiğinden içmelerini emretti. — Buhârî 233; Müslim 1671'
  ],
  '1:Hayız ve Nifas': [
    'Hayız geldiğinde namazı bırak; gidince kanı yıka ve namaz kıl. — Buhârî 306; Müslim 333',
    'Âişe: Orucu kaza etmekle emrolunurduk, namazı kaza etmekle emrolunmazdık. — Müslim 335',
    'Ümmü Seleme: Lohusalar Peygamber zamanında kırk gün beklerdi. — Ebû Dâvûd 311; Tirmizî 139'
  ],

  '2:Hükmü ve Vakitleri': [
    'Çocuklarınıza yedi yaşında namazı emredin, on yaşında (kılmazlarsa) dövün. — Ebû Dâvûd 495',
    'Kişi ile şirk ve küfür arasında namazın terki vardır. — Müslim 82',
    'Öğlenin vakti güneş zevale erdiğinde başlar… sabahın vakti fecirden güneş doğana kadardır. — Müslim 612',
    'Cibrîl’in iki gün imamlık ederek vakitlerin başını ve sonunu göstermesi. — Ebû Dâvûd 393; Tirmizî 149'
  ],
  '2:Ezan ve Kamet': [
    'Namaz vakti girince biriniz size ezan okusun, en büyüğünüz imam olsun. — Buhârî 628; Müslim 674',
    'Abdullah b. Zeyd’in rüyasında ezan ve kametin öğretilmesi. — Ebû Dâvûd 499'
  ],
  '2:Namazın Şartları': [
    '“Her namaz yerinde ziynetinizi (elbisenizi) alın.” — A‘râf 7/31',
    'Allah ergenlik çağına girmiş kadının namazını başörtüsü olmadan kabul etmez. — Ebû Dâvûd 641; Tirmizî 377',
    'Biriniz omzunda bir şey olmadan tek elbiseyle namaz kılmasın. — Buhârî 359; Müslim 516',
    '“Yüzünü Mescid-i Haram tarafına çevir.” — Bakara 2/144'
  ],
  '2:Namazın Rükünleri': [
    'Namazını yanlış kılan adam hadisi: “Kalk, namaz kıl; sen namaz kılmadın” ve rükünlerin öğretilmesi. — Buhârî 757; Müslim 397',
    'Fatiha’yı okumayanın namazı yoktur. — Buhârî 756; Müslim 394',
    'Namazın anahtarı temizlik, girişi tekbir, çıkışı selamdır. — Ebû Dâvûd 61; Tirmizî 3'
  ],
  '2:Namazın Vacipleri': [
    'Beni nasıl namaz kılarken gördüyseniz öyle kılın. — Buhârî 631',
    'Huzeyfe: Peygamber rükûda “Sübhâne Rabbiye’l-Azîm”, secdede “Sübhâne Rabbiye’l-A‘lâ” derdi. — Müslim 772',
    'İbn Buhayne: Peygamber ilk teşehhüdü unutup kalktı, selamdan önce iki secde yaptı. — Buhârî 829; Müslim 570'
  ],
  '2:Namazın Sünnetleri': [
    'İbn Ömer: Peygamber namaza başlarken, rükûya giderken ve rükûdan kalkarken ellerini omuz hizasına kaldırırdı. — Buhârî 735; Müslim 390',
    'Vâil b. Hucr: Peygamber sağ elini sol elinin üzerine koyardı. — Müslim 401',
    'Ebû Humeyd: Son teşehhüdde sol ayağını öne çıkarıp kalçası üzerine otururdu (teverrük). — Buhârî 828'
  ],
  '2:Namazı Bozanlar': [
    'Bu namazda insan sözünden hiçbir şey uygun düşmez; o ancak tesbih, tekbir ve Kur’an okumaktır. — Müslim 537',
    'Önünde sütre olmayanın namazını kadın, eşek ve siyah köpek keser… Siyah köpek şeytandır. — Müslim 510 (Mezhep, Âişe’nin itirazı sebebiyle yalnızca siyah köpekle amel eder.)'
  ],
  '2:Sehiv Secdesi': [
    'Biriniz namazında şüphe ederse şüpheyi atsın, kesin olana göre devam etsin, sonra selamdan önce iki secde yapsın. — Müslim 571',
    'Zü’l-Yedeyn hadisi: Peygamber iki rekâtta selam verdi, sonra tamamlayıp selamdan sonra iki secde yaptı. — Buhârî 1229; Müslim 573'
  ],
  '2:Nafile Namazlar': [
    'İbn Ömer: Peygamber’den on rekât ezberledim… — Buhârî 1180',
    'Âişe: Peygamber hiçbir nafileye sabahın iki rekâtına gösterdiği kadar özen göstermezdi. — Buhârî 1169; Müslim 724',
    'Vitir her Müslümanın üzerine bir haktır. — Ebû Dâvûd 1422',
    'Ukbe b. Âmir: Peygamber bizi üç vakitte namaz kılmaktan ve ölülerimizi gömmekten nehyederdi… — Müslim 831',
    'Kim bir namazı unutursa hatırlayınca kılsın. — Buhârî 597; Müslim 684'
  ],
  '2:Cemaatle Namaz ve İmamlık': [
    'Namaza çıkmayanların evlerini yakmayı düşündüm. — Buhârî 644; Müslim 651',
    'Âmâ adama: “Ezanı işitiyor musun? Öyleyse icabet et.” — Müslim 653',
    'Topluluğa Allah’ın Kitabını en iyi okuyan imam olur. — Müslim 673'
  ],
  '2:Mazeret Sahiplerinin Namazı': [
    'Ayakta kıl; gücün yetmezse oturarak, yine yetmezse yan üstü. — Buhârî 1117',
    '“Yeryüzünde yolculuğa çıktığınızda namazı kısaltmanızda size bir günah yoktur.” — Nisâ 4/101',
    'Muâz: Peygamber Tebük seferinde öğle ile ikindiyi, akşam ile yatsıyı birleştirdi. — Müslim 706'
  ],
  '2:Cuma Namazı': [
    '“Ey iman edenler! Cuma günü namaz için çağrı yapıldığında Allah’ı anmaya koşun ve alışverişi bırakın.” — Cum‘a 62/9',
    'Cuma, köle, kadın, çocuk ve hasta dışında her Müslümana cemaatle vacip bir haktır. — Ebû Dâvûd 1067',
    'Câbir b. Semüre: Peygamber’in iki hutbesi vardı, aralarında otururdu. — Müslim 862'
  ],
  '2:Bayram, Küsûf ve İstiskâ Namazları': [
    '“Rabbin için namaz kıl ve kurban kes.” — Kevser 108/2',
    'Bayram namazında tekbir, birinci rekâtta yedi, ikincide beştir. — Ebû Dâvûd 1151',
    'Âişe: Güneş tutulduğunda Peygamber iki rekâtta dört rükû ve dört secde ile namaz kıldı. — Buhârî 1044; Müslim 901',
    'Abdullah b. Zeyd: Peygamber yağmur duasına çıktı, kıbleye döndü, ridâsını çevirdi ve iki rekât kıldı. — Buhârî 1024; Müslim 894'
  ],

  '3:Hükümler': [
    'Ölmek üzere olanlarınıza “lâ ilâhe illallâh”ı telkin edin. — Müslim 916',
    'Âişe: Resûlullah üç beyaz Yemen bezine kefenlendi. — Buhârî 1264; Müslim 941',
    'Peygamber Necâşî için dört tekbirle cenaze namazı kıldı. — Buhârî 1245; Müslim 951',
    'İbn Abbas cenaze namazında Fatiha okudu ve “Sünnet olduğunu bilesiniz diye” dedi. — Buhârî 1335',
    'Câbir: Peygamber kabrin sıvanmasını, üzerine oturulmasını ve bina yapılmasını yasakladı. — Müslim 970',
    'Yanaklarına vuran, yakasını yırtan ve cahiliye çağrısıyla çağıran bizden değildir. — Buhârî 1294; Müslim 103'
  ],

  '4:Şartları ve Zekâta Tabi Mallar': [
    '“Onların mallarından sadaka al; onunla onları temizler ve arındırırsın.” — Tevbe 9/103',
    'Üzerinden yıl geçmedikçe malda zekât yoktur. — Ebû Dâvûd 1573; İbn Mâce 1792'
  ],
  '4:Altın, Gümüş ve Ticaret Malı': [
    'Beş ukiyyeden (200 dirhem) az gümüşte zekât yoktur. — Buhârî 1447; Müslim 979',
    'Ali: Yirmi dinarda yarım dinar zekât vardır. — Ebû Dâvûd 1573',
    'Semüre: Peygamber, satış için hazırladığımız şeylerden zekât vermemizi emrederdi. — Ebû Dâvûd 1562',
    'Âişe, himayesindeki yetimlerin ziynet eşyasının zekâtını vermezdi. — Muvatta’, Kitâbü’z-Zekât'
  ],
  '4:Toprak Ürünleri': [
    'Beş vesk’ten az (hurma ve tahılda) zekât yoktur. — Buhârî 1447; Müslim 979',
    'Yağmurun ve pınarların suladığında onda bir, sulamayla (hayvanla) sulananda yirmide bir vardır. — Buhârî 1483'
  ],
  '4:Fıtır Sadakası': [
    'İbn Ömer: Peygamber fıtır sadakasını bir sâ‘ hurma veya bir sâ‘ arpa olarak farz kıldı ve namaza çıkmadan önce verilmesini emretti. — Buhârî 1503; Müslim 984',
    'Ebû Saîd: Onu bir sâ‘ yiyecek, bir sâ‘ arpa, bir sâ‘ hurma, bir sâ‘ keş veya bir sâ‘ kuru üzüm olarak verirdik. — Buhârî 1506; Müslim 985',
    'İbn Ömer bayramdan bir iki gün önce verirdi. — Buhârî 1511'
  ],
  '4:Zekâtın Verileceği Yerler': [
    '“Sadakalar ancak fakirler, düşkünler, zekât memurları, kalpleri ısındırılacaklar, köleler, borçlular, Allah yolundakiler ve yolcular içindir.” — Tevbe 9/60',
    'Sadaka Muhammed ailesine helal değildir; o insanların kirleridir. — Müslim 1072'
  ],

  '5:Ramazan’ın Başlaması ve Niyet': [
    'Onu (hilali) görünce oruç tutun, görünce bayram yapın; hava kapalı olursa onun için takdir edin. — Buhârî 1900; Müslim 1080 (Mezhebin delili, ravi İbn Ömer’in bulutlu gecede oruç tutmasıdır.)',
    'Fecirden önce orucu niyet etmeyenin orucu yoktur. — Ebû Dâvûd 2454; Tirmizî 730',
    'Âişe: Peygamber “Yanınızda bir şey var mı?” dedi; “Yok” dedik; “Öyleyse ben oruçluyum” buyurdu. — Müslim 1154'
  ],
  '5:Orucu Bozanlar': [
    'Hacamat yapanın da yaptıranın da orucu bozuldu. — Ebû Dâvûd 2367; Tirmizî 774',
    'Kusmaya mağlup olana kaza yoktur; kasten kusan kaza etsin. — Ebû Dâvûd 2380; Tirmizî 720',
    'Unutarak yiyen ya da içen orucunu tamamlasın; onu Allah yedirmiş ve içirmiştir. — Buhârî 1933; Müslim 1155',
    'Ramazan’da eşiyle birleşen adama kefaret emredilmesi. — Buhârî 1936; Müslim 1111'
  ],
  '5:Ruhsatlar': [
    '“Sizden kim hasta veya yolculukta olursa, tutamadığı günler kadar başka günlerde tutar. Ona güç yetiremeyenlere bir fakir doyurmak fidyedir.” — Bakara 2/184'
  ],
  '5:Nafile Oruçlar ve Yasak Günler': [
    'Ramazan’ı tutup ardından Şevval’den altı gün tutan, bütün yılı oruçlu geçirmiş gibidir. — Müslim 1164',
    'Arefe orucu, önceki ve sonraki yılın günahlarına kefaret olur. — Müslim 1162',
    'Peygamber Ramazan Bayramı ve Kurban Bayramı günlerinde oruç tutmayı yasakladı. — Buhârî 1991; Müslim 1138',
    'Teşrik günlerinde oruç tutmaya, hedy bulamayan dışında ruhsat verilmedi. — Buhârî 1997'
  ],
  '5:İ‘tikâf': [
    '“Mescitlerde i‘tikâfta iken eşlerinize yaklaşmayın.” — Bakara 2/187',
    'Âişe: Peygamber vefat edene kadar Ramazan’ın son on gününde i‘tikâfa girerdi. — Buhârî 2026; Müslim 1172'
  ],

  '6:Farziyeti ve Mîkatlar': [
    '“Yoluna gücü yetenlerin Beyt’i haccetmesi, Allah’ın insanlar üzerindeki hakkıdır.” — Âl-i İmrân 3/97',
    'Âişe: “Kadınlara cihad var mı?” dedim; “Onlara savaşsız bir cihad vardır: hac ve umre” buyurdu. — İbn Mâce 2901',
    'Kadın mahremi olmadan yolculuk yapmaz. — Buhârî 1862; Müslim 1341',
    'İbn Abbas: Peygamber Medineliler için Zülhuleyfe’yi, Şamlılar için Cuhfe’yi, Necidliler için Karnülmenâzil’i, Yemenliler için Yelemlem’i mîkat belirledi. — Buhârî 1524; Müslim 1181',
    'Şimdi bildiğimi önceden bilseydim kurban getirmez, (haccımı) umreye çevirirdim. — Buhârî 1651; Müslim 1216'
  ],
  '6:İhram Yasakları': [
    'İhramlı gömlek, sarık, şalvar, başlık ve mest giymez; zafran veya vers değmiş elbise giymez. — Buhârî 1542; Müslim 1177',
    'İhramlı kadın peçe takmaz, eldiven giymez. — Buhârî 1838',
    'İhramlı nikâh kıymaz, kıydırmaz, nişanlanmaz. — Müslim 1409',
    '“Hacda cinsel ilişki, fısk ve kavga yoktur.” — Bakara 2/197'
  ],
  '6:Haccın Rükün ve Vacipleri': [
    'Hac Arafat’tır. — Ebû Dâvûd 1949; Tirmizî 889',
    '“…Beyt-i Atîk’i tavaf etsinler.” — Hac 22/29',
    'Hac ibadetlerinizi benden alın. — Müslim 1297',
    'İnsanlara son işlerinin Beyt’te olması emredildi; ancak hayızlı kadına hafifletildi. — Buhârî 1755; Müslim 1328',
    'İbn Abbas: Haccın bir ibadetini terk eden veya unutan kan akıtsın (kurban kessin). — Muvatta’ (mevkûf)'
  ],
  '6:Umre': [
    '“Haccı ve umreyi Allah için tamamlayın.” — Bakara 2/196'
  ],

  '7:Kurban': [
    'Enes: Peygamber alaca iki koç kurban etti; besmele çekip tekbir getirdi. — Buhârî 5565; Müslim 1966',
    'Müsinne dışında kesmeyin; zorlanırsanız koyundan cez‘a kesin. — Müslim 1963',
    'Kurbanda dört kusur caiz olmaz: körlüğü belli kör, hastalığı belli hasta, topallığı belli topal ve iliği kalmamış zayıf. — Ebû Dâvûd 2802; Tirmizî 1497',
    'Câbir: Hudeybiye’de deveyi yedi kişi, sığırı yedi kişi adına kestik. — Müslim 1318',
    'Namazdan önce kesen kendisi için kesmiştir; namazdan sonra kesen kurbanını tamamlamıştır. — Buhârî 5546; Müslim 1961',
    'Zilhicce’nin onu girince kurban kesmek isteyen, saçından ve derisinden bir şey almasın. — Müslim 1977'
  ],
  '7:Akîka': [
    'Her çocuk akîkasına rehindir; yedinci günü onun adına kesilir, başı tıraş edilir ve adı konur. — Ebû Dâvûd 2838; Tirmizî 1522',
    'Erkek çocuk için birbirine denk iki koyun, kız için bir koyun. — Ebû Dâvûd 2834; Tirmizî 1513'
  ],

  '8:Yiyecekler': [
    '“…Onlara temiz şeyleri helal, pis şeyleri haram kılar.” — A‘râf 7/157',
    'Peygamber azı dişi olan her yırtıcıyı ve pençesi olan her kuşu yemeyi yasakladı. — Müslim 1934',
    'Peygamber Hayber günü evcil eşek etini yasakladı. — Buhârî 4219; Müslim 1941',
    'Denizin suyu temiz, ölüsü helaldir. — Ebû Dâvûd 83; Tirmizî 69'
  ],
  '8:Kesim (Zekât)': [
    'Kanı akıtan ve üzerine Allah’ın adı anılanı yiyin; diş ve tırnak hariç. — Buhârî 2488; Müslim 1968',
    '“Üzerine Allah’ın adı anılmayanlardan yemeyin.” — En‘âm 6/121',
    '“Kitap verilenlerin yiyeceği size helaldir.” — Mâide 5/5'
  ],
  '8:Av': [
    '“…Allah’ın size öğrettiği şekilde eğittiğiniz avcı hayvanların sizin için tuttuklarını yiyin ve üzerine Allah’ın adını anın.” — Mâide 5/4',
    'Adî b. Hâtim: Eğitilmiş köpeğini gönderip Allah’ın adını andıysan (yakaladığını) ye. — Buhârî 5475; Müslim 1929'
  ],

  '9:Hükümler': [
    'Kim yemin edecekse Allah adına yemin etsin ya da sussun. — Buhârî 2679; Müslim 1646',
    '“…Kefareti on fakiri doyurmak, ya giydirmek ya da bir köle azat etmektir. Bulamayan üç gün oruç tutar.” — Mâide 5/89 (İbn Mes‘ûd’un kıraatinde “peş peşe” kaydı vardır.)',
    'Allah’a itaat etmeyi adayan itaat etsin; isyanı adayan isyan etmesin. — Buhârî 6696',
    'Günahta adak yoktur; kefareti yemin kefaretidir. — Ebû Dâvûd 3290; Tirmizî 1524'
  ],

  '10:Satış': [
    '“…Ancak karşılıklı rızaya dayalı ticaret olursa başka.” — Nisâ 4/29',
    'Yanında olmayan şeyi satma. — Ebû Dâvûd 3503; Tirmizî 1232',
    'Peygamber garar satışını yasakladı. — Müslim 1513',
    'Îne ile alışveriş ederseniz… Allah üzerinize bir zillet musallat eder. — Ebû Dâvûd 3462'
  ],
  '10:Ribâ (Faiz)': [
    'Altın altınla, gümüş gümüşle, buğday buğdayla, arpa arpayla, hurma hurmayla, tuz tuzla; misli misline, eşit ve peşin. Cinsler farklı olursa peşin olmak şartıyla dilediğiniz gibi satın. — Müslim 1587',
    'Menfaat sağlayan her borç ribâdır. — Fudâle b. Ubeyd’den mevkûf, Beyhakî'
  ],
  '10:Muhayyerlik (Hıyâr)': [
    'Alışveriş yapan iki taraf ayrılmadıkça muhayyerdir. — Buhârî 2079; Müslim 1532',
    'Sütü bekletilmiş (musarrât) hayvanı alan, sağdıktan sonra muhayyerdir: ya tutar ya da bir sâ‘ hurma ile geri verir. — Buhârî 2148; Müslim 1515'
  ],
  '10:Diğer Akitler': [
    '“…teslim alınmış bir rehin…” — Bakara 2/283',
    'Ömer’e Hayber arazisi hakkında: “Aslını alıkoy, gelirini tasadduk et; satılmaz, hibe edilmez, miras bırakılmaz.” — Buhârî 2737; Müslim 1632',
    'Babanın çocuğuna verdiği hariç, hibe eden kişinin hibesinden dönmesi helal değildir. — Ebû Dâvûd 3539; Tirmizî 2132',
    'Allah’tan korkun ve çocuklarınız arasında adaletli olun. — Buhârî 2587; Müslim 1623'
  ],

  '11:Vasiyet': [
    'Sa‘d’a: “Üçte bir; üçte bir de çoktur.” — Buhârî 2742; Müslim 1628',
    'Mirasçıya vasiyet yoktur. — Ebû Dâvûd 2870; Tirmizî 2120',
    'Ebû Bekir malının beşte birini vasiyet etti. — Abdürrezzâk, Musannef'
  ],
  '11:Miras (Ferâiz)': [
    '“Allah size çocuklarınız hakkında erkeğe iki kadın payı kadarını emreder… yapılan vasiyetten ve borçtan sonra.” — Nisâ 4/11',
    'Payları sahiplerine verin; kalan en yakın erkeğe aittir. — Buhârî 6732; Müslim 1615',
    'Dayı, mirasçısı olmayanın mirasçısıdır. — Ebû Dâvûd 2899',
    'Müslüman kâfire, kâfir de Müslümana mirasçı olmaz. — Buhârî 6764; Müslim 1614',
    'Katil mirasçı olmaz. — Tirmizî 2109; İbn Mâce 2645'
  ],

  '12:Hükmü, Rükünleri ve Şartları': [
    'Ey gençler! Evlenmeye gücü yeten evlensin. — Buhârî 5066; Müslim 1400',
    'Velisiz nikâh olmaz. — Ebû Dâvûd 2085; Tirmizî 1101',
    'Dul kadın istişare edilmeden, bakire de izni alınmadan evlendirilmez. — Buhârî 5136; Müslim 1419'
  ],
  '12:Mehir ve Nikâhtaki Şartlar': [
    '“Kadınlara mehirlerini gönül hoşluğuyla verin.” — Nisâ 4/4',
    'Demirden bir yüzük de olsa (mehir olarak) ara. — Buhârî 5135; Müslim 1425',
    'Yerine getirilmeye en layık şartlar, onlarla fercleri helal kıldığınız şartlardır. — Buhârî 2721; Müslim 1418',
    'Peygamber mut‘a nikâhını kıyamete kadar haram kıldı. — Müslim 1406',
    'Allah hülle yapana ve yaptırana lanet etsin. — Ebû Dâvûd 2076; Tirmizî 1120'
  ],
  '12:Süt Akrabalığı': [
    'Nesebin haram kıldığını süt de haram kılar. — Buhârî 2645; Müslim 1447',
    'Âişe: Kur’an’da on bilinen emme indirilmişti, sonra beş bilinen emme ile neshedildi. — Müslim 1452',
    '“Anneler, emzirmeyi tamamlamak isteyenler için çocuklarını tam iki yıl emzirir.” — Bakara 2/233'
  ],

  '13:Talâk': [
    '“Ey Peygamber! Kadınları boşadığınızda iddetleri içinde boşayın.” — Talâk 65/1',
    'İbn Ömer hayızlı hanımını boşayınca Peygamber ona dönmesini, temizlenince dilerse boşamasını emretti. — Buhârî 5251; Müslim 1471',
    'Ömer, tek sözle verilen üç talakı üç olarak geçerli saydı. — Müslim 1472',
    '“Talak iki defadır… Eğer onu (üçüncü kez) boşarsa, başka bir kocayla evlenmedikçe ona helal olmaz.” — Bakara 2/229-230',
    'Sâbit b. Kays’ın hanımına: “Bahçesini geri verir misin?” — Buhârî 5273'
  ],
  '13:İddet': [
    '“Hamile olanların iddeti, doğum yapmalarıyla biter.” — Talâk 65/4',
    '“Boşanmış kadınlar kendi kendilerine üç kur’ (hayız) beklerler.” — Bakara 2/228',
    '“Sizden ölenlerin geride bıraktığı eşler dört ay on gün beklerler.” — Bakara 2/234',
    'Kadın ölü için üç günden fazla yas tutmaz; kocası hariç, ona dört ay on gün yas tutar. — Buhârî 5334; Müslim 1486',
    'Furey‘a’ya: “İddet süresi dolana kadar evinde kal.” — Ebû Dâvûd 2300; Tirmizî 1204'
  ],
  '13:Nafaka': [
    '“Onların yiyeceği ve giyeceği, örfe uygun şekilde çocuğun babasına aittir.” — Bakara 2/233',
    'Hind’e: “Sana ve çocuğuna yetecek kadarını örfe uygun şekilde al.” — Buhârî 5364; Müslim 1714'
  ],

  '14:Hükümler': [
    '“Ey iman edenler! Öldürülenler hakkında size kısas yazıldı…” — Bakara 2/178',
    'Bir yakını öldürülen iki şeyden en hayırlısını seçer: ya diyet alır ya da kısas yapar. — Buhârî 112; Müslim 1355',
    'Amr b. Hazm’ın mektubu: Canın diyeti yüz devedir. — Nesâî 4853',
    'Hüzeylli iki kadın kıssası: Peygamber diyeti öldüren kadının âkilesine yükledi. — Buhârî 6910; Müslim 1681',
    '“Kim bir mümini yanlışlıkla öldürürse bir mümin köle azat etmesi ve ailesine diyet ödemesi gerekir… Bulamayan peş peşe iki ay oruç tutar.” — Nisâ 4/92'
  ],

  '15:Genel Hükümler': [
    'Kalem üç kişiden kaldırılmıştır: uyuyan uyanıncaya, çocuk ergenliğe erinceye, deli akıllanıncaya kadar. — Ebû Dâvûd 4403',
    'Hadleri gücünüz yettiğince düşürün. — Tirmizî 1424 (senedinde zayıflık vardır; İbn Mes‘ûd’dan mevkûf olarak da gelmiştir)',
    '“İffetli kadınlara zina iftirasında bulunup sonra dört şahit getiremeyenlere seksen değnek vurun.” — Nûr 24/4',
    'Ali: Peygamber (içki için) kırk, Ebû Bekir kırk vurdu; Ömer seksen tamamladı, hepsi sünnettir. — Müslim 1707',
    'Çeyrek dinar ve üzerinde el kesilir. — Buhârî 6789; Müslim 1684'
  ],

  '16:Hükümler': [
    '“Allah size emanetleri ehline vermenizi ve insanlar arasında hükmettiğinizde adaletle hükmetmenizi emreder.” — Nisâ 4/58',
    'Hâkim ictihad eder de isabet ederse iki ecir, hata ederse bir ecir alır. — Buhârî 7352; Müslim 1716',
    'Yemin, davalıya düşer. — Müslim 1711',
    'Peygamber bir şahit ve (davacının) yeminiyle hüküm verdi. — Müslim 1712',
    '“…İki erkek yoksa razı olduğunuz şahitlerden bir erkek ve iki kadın…” — Bakara 2/282'
  ]
};
