'use strict';

/* ---------- Varsayılan zikirler ---------- */
const BASE = [
  {id:'istighfar',name:'Estağfirullah el-Azîm',category:'Tevbe ve istiğfar',arabic:'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',translit:'Estağfirullâhe’l-Azîm',meaning:'Yüce Allah’tan bağışlanma dilerim.',target:100},
  {id:'yunus',name:'Hz. Yûnus’un Duası',category:'Tevbe ve dua',arabic:'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',translit:'Lâ ilâhe illâ ente subhâneke innî küntü mine’z-zâlimîn.',meaning:'Senden başka ilah yoktur. Seni tenzih ederim. Gerçekten ben zalimlerden oldum.',target:33},
  {id:'tasbih',name:'Tesbih, Hamd ve Tekbir',category:'Allah’ı anmak',arabic:'سُبْحَانَ اللَّهِ · الْحَمْدُ لِلَّهِ · اللَّهُ أَكْبَرُ',translit:'Sübhânallah · Elhamdülillâh · Allâhu ekber',meaning:'Allah’ı noksanlıklardan tenzih ederim · Hamd Allah’adır · Allah en büyüktür.',target:99},
  {id:'salavat',name:'Salavat',category:'Peygamberimize salavat',arabic:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',translit:'Allâhümme salli alâ Muhammed.',meaning:'Allah’ım, Muhammed’e salât eyle.',target:100},
  {id:'hayy',name:'Yâ Hayy, Yâ Kayyûm',category:'Rahmet ve yardım duası',arabic:'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ',translit:'Yâ Hayyu yâ Kayyûm, bi-rahmetike esteğîs.',meaning:'Ey Hayy ve Kayyûm olan Allah, rahmetinle yardım diliyorum.',target:33},
  {id:'musa',name:'Hz. Mûsâ’nın Duası',category:'Kasas 28:24',arabic:'رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',translit:'Rabbi innî limâ enzelte ileyye min hayrin fakîr.',meaning:'Rabbim, bana indireceğin her hayra muhtacım.',target:33},
  {id:'tawhid',name:'Tevhid',category:'Allah’ın birliği',arabic:'لَا إِلَٰهَ إِلَّا اللَّهُ',translit:'Lâ ilâhe illallah.',meaning:'Allah’tan başka hak ilah yoktur.',target:100}
];

// Sürüm 2.3 ile eklenen zikir ve dualar (fotoğraflardan; tekrar edenler birleştirildi)
const ADDED_V2 = [
  // Peygamberlerin duaları
  {id:'adem',name:'Hz. Âdem’in Duası',category:'A’râf 7:23 · Bağışlanma ve rahmet',arabic:'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',translit:'Rabbenâ zalemnâ enfusenâ ve in lem tağfir lenâ ve terhamnâ lenekûnenne mine’l-hâsirîn.',meaning:'Rabbimiz! Biz kendimize zulmettik. Eğer bizi bağışlamaz ve bize merhamet etmezsen, muhakkak ziyana uğrayanlardan oluruz.',target:7},
  {id:'eyyub',name:'Hz. Eyyûb’un Duası',category:'Enbiyâ 21:83 · Sıkıntı anında',arabic:'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ',translit:'Ennî messeniye’d-durru ve ente erhamü’r-râhimîn.',meaning:'Rabbim! Bana gerçekten sıkıntı dokundu; Sen merhametlilerin en merhametlisisin.',target:7},
  {id:'nuh',name:'Hz. Nûh’un Duası',category:'Nûh 71:28 · Aile ve müminler için',arabic:'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ',translit:'Rabbiğfir lî ve li-vâlideyye ve li-men dehale beytiye mü’minen ve li’l-mü’minîne ve’l-mü’minât.',meaning:'Rabbim! Beni, anne babamı, evime mümin olarak girenleri, bütün mümin erkek ve kadınları bağışla.',target:7},
  {id:'yusuf',name:'Hz. Yûsuf’un Duası',category:'Yûsuf 12:101 · Güzel son',arabic:'أَنْتَ وَلِيِّي فِي الدُّنْيَا وَالْآخِرَةِ تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ',translit:'Ente veliyyî fi’d-dünyâ ve’l-âhira, teveffenî müslimen ve elhıknî bi’s-sâlihîn.',meaning:'Dünyada da ahirette de benim velim Sensin. Beni Müslüman olarak öldür ve beni salih kullarına kat.',target:7},
  {id:'ibrahim',name:'Hz. İbrâhim’in Duası',category:'İbrâhim 14:40 · Namaz ve nesil',arabic:'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ',translit:'Rabbi’c’alnî mukîme’s-salâti ve min zürriyyetî, Rabbenâ ve tekabbel duâ.',meaning:'Rabbim! Beni ve soyumdan gelenleri namazı dosdoğru kılanlardan eyle. Rabbimiz! Duamı kabul buyur.',target:7},
  {id:'suayb',name:'Hz. Şuayb’ın Duası',category:'A’râf 7:89 · Adalete erişmek için',arabic:'رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ وَأَنْتَ خَيْرُ الْفَاتِحِينَ',translit:'Rabbenâ’ftah beynenâ ve beyne kavminâ bi’l-hakkı ve ente hayru’l-fâtihîn.',meaning:'Ey Rabbimiz! Bizimle kavmimiz arasında hak ile hükmet. Sen hükmedenlerin en hayırlısısın.',target:7},
  {id:'rabbena_atina',name:'Hz. Muhammed’in Duası',category:'Bakara 2:201 · Dünya ve ahiret iyiliği',arabic:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',translit:'Rabbenâ âtinâ fi’d-dünyâ haseneten ve fi’l-âhireti haseneten ve kınâ azâbe’n-nâr.',meaning:'Ey Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver; bizi cehennem azabından koru.',target:7},
  {id:'musa_sadr',name:'Hz. Mûsâ’nın Duası (Rabbişrah)',category:'Tâhâ 20:25-28 · Kolaylık için',arabic:'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي',translit:'Rabbişrah lî sadrî, ve yessir lî emrî, vahlul ukdeten min lisânî, yefkahû kavlî.',meaning:'Rabbim! Gönlümü genişlet, işimi bana kolaylaştır, dilimden düğümü çöz ki sözümü iyi anlasınlar.',target:7},
  {id:'suleyman',name:'Hz. Süleyman’ın Duası',category:'Sâd 38:35',arabic:'رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَا يَنْبَغِي لِأَحَدٍ مِنْ بَعْدِي إِنَّكَ أَنْتَ الْوَهَّابُ',translit:'Rabbiğfir lî ve heb lî mülken lâ yenbeğî li-ehadin min ba’dî, inneke ente’l-Vehhâb.',meaning:'Ey Rabbim! Beni bağışla; bana, benden sonra kimsenin ulaşamayacağı bir hükümranlık ver. Şüphesiz Sen, daima bağışta bulunansın.',target:7},

  // Günlük
  {id:'uyanis1',name:'Uyanınca (1)',category:'Buhârî 6312',arabic:'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',translit:'Elhamdü lillâhillezî ahyânâ ba’de mâ emâtenâ ve ileyhi’n-nüşûr.',meaning:'Bizi öldürdükten sonra yeniden dirilten Allah’a hamdolsun. Dönüş yalnız O’nadır.',target:1},
  {id:'uyanis2',name:'Uyanınca (2)',category:'Uyanış duası',arabic:'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي وَرَدَّ عَلَيَّ رُوحِي وَأَذِنَ لِي بِذِكْرِهِ',translit:'Elhamdü lillâhillezî âfânî fî cesedî, ve redde aleyye rûhî, ve ezine lî bi-zikrih.',meaning:'Vücuduma sıhhat veren, ruhumu bana geri veren ve kendisini zikretmeme izin veren Allah’a hamdolsun.',target:1},
  {id:'sukur',name:'Uyanınca (3) · Allah’a Şükür',category:'İbn Mâce 3878',arabic:'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَٰهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ، رَبِّ اغْفِرْ لِي',translit:'Lâ ilâhe illallâhu vahdehû lâ şerîke leh, lehü’l-mülkü ve lehü’l-hamd, ve hüve alâ külli şey’in kadîr. Sübhânallâh, velhamdü lillâh, ve lâ ilâhe illallâh, vallâhu ekber, ve lâ havle ve lâ kuvvete illâ billâhi’l-aliyyi’l-azîm. Rabbiğfir lî.',meaning:'Allah’tan başka ilah yoktur. O tektir, ortağı yoktur. Mülk O’nundur, hamd O’nadır. O, her şeye kadirdir. Allah’ı tesbih ederim, hamd Allah’a mahsustur, Allah’tan başka ilah yoktur, Allah en büyüktür. Kuvvet ve kudret ancak yüce ve azîm olan Allah’ın yardımıyladır. Rabbim, beni bağışla.',target:1},
  {id:'aksam',name:'Akşam Zikri',category:'Tevhid',arabic:'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',translit:'Lâ ilâhe illallâhu vahdehû lâ şerîke leh, lehü’l-mülkü ve lehü’l-hamdü ve hüve alâ külli şey’in kadîr.',meaning:'Allah’tan başka ilah yoktur. O tektir, ortağı yoktur. Mülk O’nundur, hamd O’nadır. O, her şeye gücü yetendir.',target:10},
  {id:'kabir',name:'Kabir Azabından Sığınma',category:'Müslim 589 · Günlük zikir',arabic:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْمَأْثَمِ وَالْمَغْرَمِ',translit:'Allâhümme innî e’ûzü bike min azâbi’l-kabr, ve e’ûzü bike min fitneti’l-mesîhi’d-deccâl, ve e’ûzü bike min fitneti’l-mahyâ ve’l-memât. Allâhümme innî e’ûzü bike mine’l-me’semi ve’l-mağram.',meaning:'Allah’ım! Kabir azabından Sana sığınırım. Deccal’in fitnesinden Sana sığınırım. Hayatın ve ölümün fitnesinden Sana sığınırım. Allah’ım! Günah ve borçtan Sana sığınırım.',target:1},

  // Allah’ı yüceltmek
  {id:'bakiyat',name:'Allah’ı Yüceltmek (Bâkiyât-ı Sâlihât)',category:'Tesbih, hamd, tevhid, tekbir',arabic:'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ',translit:'Sübhânallâh, velhamdü lillâh, ve lâ ilâhe illallâh, vallâhu ekber.',meaning:'Allah’ı tesbih ederim, O’na hamdolsun, O’ndan başka ilah yoktur, Allah en büyüktür.',target:33},
  {id:'masaallah',name:'Mâşâallah lâ kuvvete illâ billâh',category:'Allah’ı yüceltmek',arabic:'مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ',translit:'Mâ şâallâhu lâ kuvvete illâ billâh.',meaning:'Allah’ın dilediği olur; güç ve kuvvet yalnız Allah’tandır.',target:33},
  {id:'mulk',name:'Allah’a Övgü (Mülk Duası)',category:'Âl-i İmrân 3:26-27',arabic:'اللَّهُمَّ مَالِكَ الْمُلْكِ تُؤْتِي الْمُلْكَ مَنْ تَشَاءُ وَتَنْزِعُ الْمُلْكَ مِمَّنْ تَشَاءُ وَتُعِزُّ مَنْ تَشَاءُ وَتُذِلُّ مَنْ تَشَاءُ بِيَدِكَ الْخَيْرُ إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ · تُولِجُ اللَّيْلَ فِي النَّهَارِ وَتُولِجُ النَّهَارَ فِي اللَّيْلِ وَتُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَتُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ وَتَرْزُقُ مَنْ تَشَاءُ بِغَيْرِ حِسَابٍ',translit:'Allâhümme mâlike’l-mülki tü’ti’l-mülke men teşâ’ ve tenzi’u’l-mülke mimmen teşâ’, ve tu’izzu men teşâ’ ve tüzillü men teşâ’, bi-yedike’l-hayr, inneke alâ külli şey’in kadîr. Tûlicu’l-leyle fi’n-nehâri ve tûlicu’n-nehâra fi’l-leyl, ve tuhricu’l-hayye mine’l-meyyiti ve tuhricu’l-meyyite mine’l-hayy, ve terzuku men teşâ’ü bi-ğayri hisâb.',meaning:'Ey mülkün sahibi Allah’ım! Mülkü dilediğine verirsin, dilediğinden çekip alırsın. Dilediğini aziz, dilediğini zelil kılarsın. Hayır yalnız Senin elindedir. Şüphesiz Sen her şeye kadirsin. Geceyi gündüze, gündüzü geceye katarsın. Diriyi ölüden, ölüyü diriden çıkarırsın. Dilediğine hesapsız rızık verirsin.',target:1},

  // Korunma
  {id:'ecirni',name:'Cehennemden Korunmak İçin',category:'Korunma duası',arabic:'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',translit:'Allâhümme ecirnî mine’n-nâr.',meaning:'Allah’ım! Beni cehennem ateşinden koru.',target:7},
  {id:'gam',name:'Üzüntü ve Gam Zamanlarında',category:'Buhârî 6369',arabic:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',translit:'Allâhümme innî e’ûzü bike mine’l-hemmi ve’l-hazen, ve’l-aczi ve’l-kesel, ve’l-buhli ve’l-cübn, ve dala’i’d-deyni ve ğalebeti’r-ricâl.',meaning:'Allah’ım! Keder ve üzüntüden, acizlik ve tembellikten, cimrilik ve korkaklıktan, borç altında ezilmekten ve insanların baskısı altında kalmaktan Sana sığınırım.',target:3},

  // Zor zamanlar
  {id:'sabir',name:'Zor Zamanlarda Sabır',category:'A’râf 7:126',arabic:'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ',translit:'Rabbenâ efriğ aleynâ sabran ve teveffenâ müslimîn.',meaning:'Ey Rabbimiz! Üzerimize sabır yağdır ve bizi Müslümanlar olarak vefat ettir.',target:7},
  {id:'tevekkul',name:'Allah’a Tevekkül ve Teslimiyet',category:'Tevbe 9:129 · Mü’min 40:44',arabic:'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ · وَأُفَوِّضُ أَمْرِي إِلَى اللَّهِ إِنَّ اللَّهَ بَصِيرٌ بِالْعِبَادِ',translit:'Hasbiyallâhu lâ ilâhe illâ hû, aleyhi tevekkeltü ve hüve rabbü’l-arşi’l-azîm. Ve ufavvidu emrî ilallâh, innallâhe basîrun bi’l-ibâd.',meaning:'Allah bana yeter, O’ndan başka ilah yoktur. O’na tevekkül ettim; O, yüce Arş’ın Rabbidir. İşimi Allah’a havale ediyorum; şüphesiz Allah kullarını görür, gözetir.',target:7},
  {id:'hakaret',name:'Biri Size Hakaret Ettiğinde',category:'Enbiyâ 21:112',arabic:'رَبِّ احْكُمْ بِالْحَقِّ وَرَبُّنَا الرَّحْمَٰنُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ',translit:'Rabbi’hkum bi’l-hakk, ve Rabbüne’r-Rahmânü’l-müste’ânu alâ mâ tasifûn.',meaning:'Rabbim! Hak ile hükmet. Bizim Rabbimiz Rahmân’dır. Sizin nitelendirmelerinize karşı O’ndan yardım dileriz.',target:1},
  {id:'kader',name:'Başarısızlıkta veya Bir Şeyi Kaybedince',category:'İbn Mâce 4168',arabic:'قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ',translit:'Kaderullâhi ve mâ şâe fe’al.',meaning:'Bu, Allah’ın takdiridir; O dilediğini yapar.',target:1},
  {id:'musibet',name:'Bir Badire Yaşandığında',category:'Müslim 918',arabic:'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا',translit:'İnnâ lillâhi ve innâ ileyhi râci’ûn. Allâhümme’curnî fî musîbetî ve ahlif lî hayran minhâ.',meaning:'Şüphesiz biz Allah’a aidiz ve yine O’na döneceğiz. Allah’ım! Musibetimden dolayı bana ecir ver ve bana ondan daha hayırlısını nasip et.',target:1},
  {id:'sinanan',name:'Musibete Uğramış Birini Görünce',category:'İbn Mâce 3892',arabic:'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي مِمَّا ابْتَلَاكَ بِهِ وَفَضَّلَنِي عَلَىٰ كَثِيرٍ مِمَّنْ خَلَقَ تَفْضِيلًا',translit:'Elhamdü lillâhillezî âfânî mimmebtelâke bihî ve faddalenî alâ kesîrin mimmen haleka tafdîlâ.',meaning:'Beni senin uğradığın beladan koruyan ve beni yarattıklarının birçoğuna üstün kılan Allah’a hamdolsun.',target:1},

  // Aile ve rızık
  {id:'aile',name:'Huzurlu Bir Aile İçin',category:'Furkân 25:74',arabic:'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',translit:'Rabbenâ heb lenâ min ezvâcinâ ve zürriyyâtinâ kurrete a’yünin vec’alnâ li’l-müttekîne imâmâ.',meaning:'Ey Rabbimiz! Bize eşlerimizden ve çocuklarımızdan göz aydınlığı olacak kimseler lütfet ve bizi takva sahiplerine önder kıl.',target:7},
  {id:'rizik_ayet',name:'Rızık Ayeti (Latîf)',category:'Şûrâ 42:19',arabic:'اللَّهُ لَطِيفٌ بِعِبَادِهِ يَرْزُقُ مَنْ يَشَاءُ وَهُوَ الْقَوِيُّ الْعَزِيزُ',translit:'Allâhu latîfun bi-ibâdihî yerzuku men yeşâ’, ve hüve’l-kaviyyü’l-azîz.',meaning:'Allah kullarına karşı lütuf sahibidir. Dilediğine rızık verir. O, kuvvetli ve yücedir.',target:7},
  {id:'maide',name:'Rızık Ayeti (Mâide)',category:'Mâide 5:114',arabic:'رَبَّنَا أَنْزِلْ عَلَيْنَا مَائِدَةً مِنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِأَوَّلِنَا وَآخِرِنَا وَآيَةً مِنْكَ وَارْزُقْنَا وَأَنْتَ خَيْرُ الرَّازِقِينَ',translit:'Rabbenâ enzil aleynâ mâideten mine’s-semâi tekûnü lenâ îden li-evvelinâ ve âhirinâ ve âyeten minke, verzuknâ ve ente hayru’r-râzikîn.',meaning:'Rabbimiz! Bize gökten bir sofra indir ki hem öncekilerimiz hem sonrakilerimiz için bir bayram ve Senden bir mucize olsun. Bizi rızıklandır; çünkü Sen rızık verenlerin en hayırlısısın.',target:7},
  {id:'rizik1',name:'Rızık (Geçim) İçin Dua 1',category:'Ebû Dâvûd 850',arabic:'اللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَعَافِنِي، وَاهْدِنِي، وَارْزُقْنِي',translit:'Allâhümmağfir lî, verhamnî, ve âfinî, vehdinî, verzuknî.',meaning:'Allah’ım! Beni bağışla, bana merhamet et, bana afiyet ver, bana hidayet et ve bana rızık ver.',target:7},
  {id:'rizik2',name:'Rızık (Geçim) İçin Dua 2',category:'Faydalı ilim, helal rızık',arabic:'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',translit:'Allâhümme innî es’elüke ilmen nâfi’an, ve rızkan tayyiben, ve amelen mütekabbelen.',meaning:'Allah’ım! Senden faydalı ilim, helal ve güzel rızık, makbul amel isterim.',target:7}
];

// Sürüm 2.4 ile eklenenler (2. fotoğraf grubu; tekrarlar mevcut kartlarla birleştirildi)
// v10: Âyetü’l-Kürsî, İhlâs, Felak ve Nâs kartlarına Kur’ân metni (Tanzil, quran-simple; vakıf işaretleri olmadan)
const _KURSI_AR = 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ';
const _KURSI_TR = 'Allâhü lâ ilâhe illâ hüve’l-Hayyü’l-Kayyûm, lâ te’huzühû sinetün ve lâ nevm, lehû mâ fi’s-semâvâti ve mâ fi’l-ard, men ze’llezî yeşfeu indehû illâ bi-iznih, ya’lemü mâ beyne eydîhim ve mâ halfehüm, ve lâ yuhîtûne bi-şey’in min ilmihî illâ bimâ şâ’, vesia kürsiyyühü’s-semâvâti ve’l-ard, ve lâ yeûdühû hıfzuhümâ, ve hüve’l-Aliyyü’l-Azîm.';
const _KURSI_ME = 'Allah, O’ndan başka ilah yoktur; O diridir, kayyûmdur. O’nu ne uyuklama tutar ne uyku. Göklerde ve yerde ne varsa O’nundur. O’nun izni olmadan katında kim şefaat edebilir? Onların önlerindekini ve arkalarındakini bilir. O’nun ilminden, dilediği kadarı dışında hiçbir şeyi kavrayamazlar. Kürsîsi gökleri ve yeri kaplamıştır; onları korumak O’na ağır gelmez. O yücedir, büyüktür.';
const _IHLAS_AR = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ';
const _IHLAS_TR = 'Bismillâhirrahmânirrahîm. Kul hüvallâhü ehad. Allâhü’s-samed. Lem yelid ve lem yûled. Ve lem yekün lehû küfüven ehad.';
const _IHLAS_ME = 'Rahmân ve Rahîm olan Allah’ın adıyla. De ki: O Allah’tır, birdir. Allah Samed’dir. Doğurmamış ve doğurulmamıştır. Hiçbir şey O’na denk değildir.';
const _FELAK_AR = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِنْ شَرِّ مَا خَلَقَ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ';
const _FELAK_TR = 'Bismillâhirrahmânirrahîm. Kul e’ûzü bi-rabbi’l-felak. Min şerri mâ halak. Ve min şerri ğâsikın izâ vekab. Ve min şerri’n-neffâsâti fi’l-ukad. Ve min şerri hâsidin izâ hased.';
const _FELAK_ME = 'Rahmân ve Rahîm olan Allah’ın adıyla. De ki: Sabahın Rabbine sığınırım; yarattığı şeylerin şerrinden, karanlığı çöktüğünde gecenin şerrinden, düğümlere üfleyenlerin şerrinden ve haset ettiğinde hasetçinin şerrinden.';
const _NAS_AR = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ';
const _NAS_TR = 'Bismillâhirrahmânirrahîm. Kul e’ûzü bi-rabbi’n-nâs. Meliki’n-nâs. İlâhi’n-nâs. Min şerri’l-vesvâsi’l-hannâs. Ellezî yüvesvisü fî sudûri’n-nâs. Mine’l-cinneti ve’n-nâs.';
const _NAS_ME = 'Rahmân ve Rahîm olan Allah’ın adıyla. De ki: İnsanların Rabbine, insanların Melik’ine, insanların İlâh’ına sığınırım; sinsi vesvesecinin şerrinden; o ki insanların göğüslerine vesvese verir; cinlerden ve insanlardan.';

const ADDED_V3 = [
  // Sabah-akşam ve koruma
  {id:'bismillahillezi',name:'Koruyucu Dua (Bismillâhillezî)',category:'Sabah-akşam 3 defa · Ebû Dâvûd, Tirmizî',arabic:'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',translit:'Bismillâhillezî lâ yedurru mea’smihî şey’ün fi’l-ardı ve lâ fi’s-semâi ve hüve’s-semî’u’l-alîm.',meaning:'O Allah’ın adıyla ki, O’nun adı anıldığında yerde ve gökte hiçbir şey zarar veremez. O, hakkıyla işiten ve her şeyi bilendir.',target:3},
  {id:'kelimat',name:'Eûzü bi-kelimâtillâhi’t-tâmmât',category:'Akşam · Müslim, Zikir 2709',arabic:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',translit:'Eûzü bi-kelimâtillâhi’t-tâmmâti min şerri mâ halak.',meaning:'Allah’ın eksiksiz kelimelerine, yarattıklarının şerrinden sığınırım.',target:3},
  {id:'yunus81',name:'Sihre Karşı (Yûnus 81)',category:'Yûnus 10:81 · Koruyucu',arabic:'مَا جِئْتُمْ بِهِ السِّحْرُ إِنَّ اللَّهَ سَيُبْطِلُهُ إِنَّ اللَّهَ لَا يُصْلِحُ عَمَلَ الْمُفْسِدِينَ',translit:'Mâ ci’tüm bihi’s-sihr, innallâhe se-yübtıluh, innallâhe lâ yuslihu amele’l-müfsidîn.',meaning:'Mûsâ dedi ki: “Sizin getirdiğiniz sihirdir. Şüphesiz Allah onu boşa çıkaracaktır. Çünkü Allah bozguncuların işini düzeltmez.”',target:3},
  {id:'ayetelkursi',name:'Âyetü’l-Kürsî',category:'Bakara 2:255 · Sabah-akşam koruma',arabic:'',translit:'',meaning:'Sabah ve akşam okunan koruyucu ayet. Metni mushaftan okuyabilirsin.',target:1},
  {id:'felak',name:'Felak Sûresi',category:'Sabah-akşam 3 defa · Koruma',arabic:'',translit:'',meaning:'Sabahın Rabbine, yarattıklarının şerrinden sığınma sûresi.',target:3},
  {id:'nas',name:'Nâs Sûresi',category:'Sabah-akşam 3 defa · Koruma',arabic:'',translit:'',meaning:'İnsanların Rabbine, vesvese verenin şerrinden sığınma sûresi.',target:3},
  {id:'afini',name:'Âfiyet Duası (Allâhümme âfinî)',category:'Sabah-akşam 3 defa · Ebû Dâvûd',arabic:'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَٰهَ إِلَّا أَنْتَ',translit:'Allâhümme âfinî fî bedenî, Allâhümme âfinî fî sem’î, Allâhümme âfinî fî basarî, lâ ilâhe illâ ente. Allâhümme innî e’ûzü bike mine’l-küfri ve’l-fakr, Allâhümme innî e’ûzü bike min azâbi’l-kabr, lâ ilâhe illâ ente.',meaning:'Allah’ım! Bedenimi sıhhatli kıl. Allah’ım! İşitmemi sıhhatli kıl. Allah’ım! Gözümü sıhhatli kıl. Senden başka ilah yoktur. Allah’ım! Küfürden ve fakirlikten Sana sığınırım. Allah’ım! Kabir azabından Sana sığınırım. Senden başka ilah yoktur.',target:3},
  {id:'raditu',name:'Radîtü billâhi Rabben',category:'İman tazeleme · Sabah-akşam 3 defa',arabic:'رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا',translit:'Radîtü billâhi Rabben ve bi’l-İslâmi dînen ve bi-Muhammedin nebiyyen.',meaning:'Allah’tan Rab, İslam’dan din, Muhammed’den peygamber olarak razı oldum.',target:3},

  // Tesbih ve övgü
  {id:'bihamdihi',name:'Sübhânallâhi ve bihamdihî',category:'Günde 100 defa · Buhârî, Müslim',arabic:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',translit:'Sübhânallâhi ve bihamdihî.',meaning:'Allah’ı hamdiyle birlikte tesbih ederim.',target:100},
  {id:'subhanallahil_azim',name:'Sübhânallâhi ve bihamdihî, Sübhânallâhi’l-Azîm',category:'Mizanda ağır gelen iki kelime · Buhârî',arabic:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',translit:'Sübhânallâhi ve bihamdihî, sübhânallâhi’l-azîm.',meaning:'Allah’ı hamdiyle tesbih ederim; yüce Allah’ı tesbih ederim.',target:33},
  {id:'adede_halkihi',name:'Sübhânallâhi ve bihamdihî adede halkıhî',category:'Sabah 3 defa · Müslim',arabic:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ',translit:'Sübhânallâhi ve bihamdihî adede halkıhî ve rıdâ nefsihî ve zinete arşihî ve midâde kelimâtih.',meaning:'Yaratılmışların sayısınca, zatının rızası miktarınca, Arş’ının ağırlığınca ve kelimelerinin mürekkebi kadar Allah’ı hamdiyle tesbih ederim.',target:3},
  {id:'melik_kuddus',name:'Sübhâne’l-Meliki’l-Kuddûs',category:'Vitirden sonra 3 defa',arabic:'سُبْحَانَ الْمَلِكِ الْقُدُّوسِ',translit:'Sübhâne’l-Meliki’l-Kuddûs.',meaning:'Mülkün sahibi ve her türlü noksandan münezzeh olan Allah’ı tesbih ederim.',target:3},
  {id:'la_havle',name:'Lâ havle ve lâ kuvvete illâ billâh',category:'Sıkıntı ve çaresizlik anında',arabic:'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',translit:'Lâ havle ve lâ kuvvete illâ billâh.',meaning:'Güç ve kuvvet ancak Allah’ın yardımı iledir.',target:33},

  // İstiğfar
  {id:'istigfar_tevbe',name:'Estağfirullâhe ve etûbü ileyh',category:'İstiğfar · Günde 70-100 defa',arabic:'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',translit:'Estağfirullâhe ve etûbü ileyh.',meaning:'Allah’tan bağışlanma diler ve O’na tövbe ederim.',target:100},
  {id:'istigfar_hayy',name:'Estağfirullâhe’llezî lâ ilâhe illâ hüve’l-Hayye’l-Kayyûm',category:'3 defa · Tirmizî, Daavât 3397',arabic:'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',translit:'Estağfirullâhellezî lâ ilâhe illâ hüve’l-Hayyü’l-Kayyûmü ve etûbü ileyh.',meaning:'Kendisinden başka ilah olmayan, diri ve her şeyin varlık sebebi olan Allah’tan bağışlanma diler ve O’na tövbe ederim.',target:3},

  // Sıkıntı ve kalp huzuru
  {id:'rahmeteke',name:'Kalp Sükûneti (Rahmeteke ercû)',category:'Sıkıntı anında · Ebû Dâvûd, Edeb 100',arabic:'اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ وَأَصْلِحْ لِي شَأْنِي كُلَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ',translit:'Allâhümme rahmeteke ercû, felâ tekilnî ilâ nefsî tarfete aynin, ve aslih lî şe’nî küllehû, lâ ilâhe illâ ente.',meaning:'Allah’ım! Rahmetini umuyorum. Beni göz açıp kapayıncaya kadar bile nefsimle baş başa bırakma. İşlerimin tümünü ıslah et. Senden başka ilah yoktur.',target:3},
  {id:'kerb',name:'Kalbi Ferahlatan Tevhid (Sıkıntı Duası)',category:'Sıkıntı anında · Buhârî, Müslim',arabic:'لَا إِلَٰهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَٰهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَٰهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',translit:'Lâ ilâhe illallâhu’l-Azîmü’l-Halîm, lâ ilâhe illallâhu Rabbü’l-arşi’l-azîm, lâ ilâhe illallâhu Rabbü’s-semâvâti ve Rabbü’l-ardı ve Rabbü’l-arşi’l-kerîm.',meaning:'Azîm ve Halîm olan Allah’tan başka ilah yoktur. Büyük Arş’ın Rabbi olan Allah’tan başka ilah yoktur. Göklerin, yerin ve kerim Arş’ın Rabbi olan Allah’tan başka ilah yoktur.',target:3},
  {id:'hasbunallah',name:'Hasbünallâhu ve ni’me’l-vekîl',category:'Âl-i İmrân 3:173 · Tevekkül',arabic:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',translit:'Hasbünallâhu ve ni’me’l-vekîl.',meaning:'Allah bize yeter, O ne güzel vekildir.',target:33},
  {id:'lokman22',name:'Sağlam Kulpa Tutunmak',category:'Lokmân 31:22 · Teslimiyet',arabic:'وَمَنْ يُسْلِمْ وَجْهَهُ إِلَى اللَّهِ وَهُوَ مُحْسِنٌ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقَىٰ وَإِلَى اللَّهِ عَاقِبَةُ الْأُمُورِ',translit:'Ve men yüslim vechehû ilallâhi ve hüve muhsinün fe-kadi’stemseke bi’l-urveti’l-vüskâ, ve ilallâhi âkıbetü’l-umûr.',meaning:'Kim yüzünü (tam bir teslimiyetle) Allah’a döner, iyi ve güzel davranışlarda bulunursa, o kopmayan sağlam kulpa tutunmuştur. Bütün işlerin sonu Allah’a varır.',target:3},
  {id:'zekeriya',name:'Hz. Zekeriyyâ’nın Duası',category:'Enbiyâ 21:89',arabic:'رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنْتَ خَيْرُ الْوَارِثِينَ',translit:'Rabbi lâ tezernî ferden ve ente hayru’l-vârisîn.',meaning:'Rabbim! Beni yalnız bırakma. Sen varislerin en hayırlısısın.',target:7},

  // Kalp ve ahlak
  {id:'mukallib',name:'Yâ Mukallibe’l-Kulûb',category:'Kalp sebatı · Tirmizî',arabic:'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَىٰ دِينِكَ',translit:'Yâ Mukallibe’l-kulûb, sebbit kalbî alâ dînik.',meaning:'Ey kalpleri evirip çeviren Allah’ım! Kalbimi dinin üzere sabit kıl.',target:7},
  {id:'husnu_huluk',name:'Güzel Ahlak Duası',category:'Güzel ahlak istemek',arabic:'اللَّهُمَّ آتِنِي حُسْنَ الْخُلُقِ',translit:'Allâhümme âtinî hüsne’l-huluk.',meaning:'Allah’ım! Bana güzel ahlak nasip et.',target:7},

  // Esmâ-i Hüsnâ
  {id:'ya_sabur',name:'Yâ Sabûr',category:'Esmâü’l-Hüsnâ · Sabır ve dayanıklılık',arabic:'يَا صَبُورُ',translit:'Yâ Sabûr.',meaning:'Ey sabrı sonsuz olan Allah.',target:33},
  {id:'ya_latif',name:'Yâ Latîf',category:'Esmâü’l-Hüsnâ · Huzur ve incelik',arabic:'يَا لَطِيفُ',translit:'Yâ Latîf.',meaning:'Ey lütfu sonsuz, her şeyin inceliğini bilen Allah.',target:33},
  {id:'ya_fettah',name:'Yâ Fettâh',category:'Esmâü’l-Hüsnâ · Kapalı yolları açar',arabic:'يَا فَتَّاحُ',translit:'Yâ Fettâh.',meaning:'Ey her türlü hayır kapısını açan Allah.',target:33},
  {id:'ya_selam',name:'Yâ Selâm',category:'Esmâü’l-Hüsnâ · Güven ve sükûnet',arabic:'يَا سَلَامُ',translit:'Yâ Selâm.',meaning:'Ey selamet ve esenlik veren Allah.',target:33},
  {id:'ya_vedud',name:'Yâ Vedûd',category:'Esmâü’l-Hüsnâ · Sevgi ve merhamet',arabic:'يَا وَدُودُ',translit:'Yâ Vedûd.',meaning:'Ey kullarını çok seven ve sevilmeye layık olan Allah.',target:33}
];

// v7: Sahih sabah ve akşam zikirleri (sabah ve akşam sayaçları ayrı kartlarda)
const _SEYYID_AR_OLD = 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ';
const _SEYYID_AR = 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ';
const _SEYYID_TR_OLD = 'Allâhümme ente Rabbî lâ ilâhe illâ ente, halaktenî ve ene abdük, ve ene alâ ahdike ve va’dike mesteta’tü, e’ûzü bike min şerri mâ sana’tü, ebû’ü leke bi-ni’metike aleyye, ve ebû’ü bi-zenbî, fağfir lî, fe-innehû lâ yağfiru’z-zünûbe illâ ente.';
const _SEYYID_TR = 'Allâhümme ente Rabbî lâ ilâhe illâ ente, halaktenî ve ene abdük, ve ene alâ ahdike ve va’dike mesteta’tü, e’ûzü bike min şerri mâ sana’tü, ebû’ü leke bi-ni’metike aleyye, ve ebû’ü leke bi-zenbî, fağfir lî, fe-innehû lâ yağfiru’z-zünûbe illâ ente.';
const _SEYYID_ME = 'Allah’ım! Sen benim Rabbimsin, Senden başka ilah yoktur. Beni Sen yarattın, ben Senin kulunum. Gücüm yettiğince Sana verdiğim söz ve ahid üzereyim. Yaptıklarımın şerrinden Sana sığınırım. Bana verdiğin nimetleri ikrar eder, günahımı itiraf ederim. Beni bağışla; çünkü günahları ancak Sen bağışlarsın.';
const _AFV_AR = 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي';
const _AFV_TR = 'Allâhümme innî es’elüke’l-afve ve’l-âfiyete fi’d-dünyâ ve’l-âhira. Allâhümme innî es’elüke’l-afve ve’l-âfiyete fî dînî ve dünyâye ve ehlî ve mâlî. Allâhümmestur avrâtî ve âmin rev’âtî. Allâhümmahfaznî min beyni yedeyye ve min halfî ve an yemînî ve an şimâlî ve min fevkî, ve e’ûzü bi-azametike en uğtâle min tahtî.';
const _AFV_ME = 'Allah’ım! Senden dünyada ve ahirette af ve afiyet isterim. Allah’ım! Dinimde, dünyamda, ailemde ve malımda af ve afiyet isterim. Allah’ım! Ayıplarımı ört, korkularımdan emin kıl. Allah’ım! Beni önümden, arkamdan, sağımdan, solumdan ve üstümden koru. Altımdan helak edilmekten azametine sığınırım.';
const _GAYB_AR = 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَىٰ نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَىٰ مُسْلِمٍ';
const _GAYB_TR = 'Allâhümme âlime’l-ğaybi ve’ş-şehâdeti, fâtıra’s-semâvâti ve’l-ard, Rabbe külli şey’in ve melîkeh, eşhedü en lâ ilâhe illâ ente, e’ûzü bike min şerri nefsî ve min şerri’ş-şeytâni ve şirkih, ve en akterife alâ nefsî sû’en ev ecürrahû ilâ müslim.';
const _GAYB_ME = 'Allah’ım! Ey gizliyi ve açığı bilen, gökleri ve yeri yaratan, her şeyin Rabbi ve sahibi! Senden başka ilah olmadığına şahitlik ederim. Nefsimin şerrinden, şeytanın şerrinden ve şirkinden, kendime bir kötülük yapmaktan ya da onu bir Müslümana bulaştırmaktan Sana sığınırım.';
const _HAYY_AR = 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ';
const _HAYY_TR = 'Yâ Hayyu yâ Kayyûm, bi-rahmetike esteğîs, aslih lî şe’nî küllehû ve lâ tekilnî ilâ nefsî tarfete ayn.';
const _HAYY_ME = 'Ey Hayy, ey Kayyûm! Rahmetinle yardım dilerim. Bütün işlerimi düzelt, beni göz açıp kapayıncaya kadar bile nefsime bırakma.';
const _TEVHID_AR = 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ';
const _TEVHID_TR = 'Lâ ilâhe illallâhu vahdehû lâ şerîke leh, lehü’l-mülkü ve lehü’l-hamdü ve hüve alâ külli şey’in kadîr.';
const _TEVHID_ME = 'Allah’tan başka ilah yoktur. O tektir, ortağı yoktur. Mülk O’nundur, hamd O’nadır. O, her şeye gücü yetendir.';

const ADDED_V7 = [
  // Sabah
  {id:'ihlas',name:'İhlâs Sûresi (Sabah)',category:'İhlâs, Felak, Nâs 3’er defa · Ebû Dâvûd 5082, Tirmizî 3575',arabic:'',translit:'',meaning:'Allah’ın birliğini anlatan sûre. Felak ve Nâs ile birlikte sabah-akşam üçer kez okuyana “her şeye karşı yeter” buyrulmuştur.',target:3},
  {id:'asbahna',name:'Asbahnâ ve asbaha’l-mülkü lillâh',category:'Sabah · Müslim 2723',arabic:'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',translit:'Asbahnâ ve asbaha’l-mülkü lillâh, ve’l-hamdü lillâh, lâ ilâhe illallâhu vahdehû lâ şerîke leh, lehü’l-mülkü ve lehü’l-hamdü ve hüve alâ külli şey’in kadîr. Rabbi es’elüke hayra mâ fî hâze’l-yevmi ve hayra mâ ba’deh, ve e’ûzü bike min şerri mâ fî hâze’l-yevmi ve şerri mâ ba’deh. Rabbi e’ûzü bike mine’l-keseli ve sû’i’l-kiber. Rabbi e’ûzü bike min azâbin fi’n-nâri ve azâbin fi’l-kabr.',meaning:'Sabaha erdik, mülk de Allah’ın olarak sabaha erdi. Hamd Allah’adır. Allah’tan başka ilah yoktur, tektir, ortağı yoktur. Mülk O’nundur, hamd O’nadır, O her şeye kadirdir. Rabbim! Bu günün ve sonrasının hayrını Senden isterim; bu günün ve sonrasının şerrinden Sana sığınırım. Rabbim! Tembellikten ve ihtiyarlığın kötülüğünden Sana sığınırım. Rabbim! Cehennem azabından ve kabir azabından Sana sığınırım.',target:1},
  {id:'bike_asbahna',name:'Allâhümme bike asbahnâ',category:'Sabah · Tirmizî 3391, Ebû Dâvûd 5068',arabic:'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',translit:'Allâhümme bike asbahnâ, ve bike emseynâ, ve bike nahyâ, ve bike nemûtü, ve ileyke’n-nüşûr.',meaning:'Allah’ım! Seninle sabaha erdik, Seninle akşama erdik. Seninle yaşar, Seninle ölürüz. Dönüş Sanadır.',target:1},
  {id:'seyyid',name:'Seyyidü’l-İstiğfâr (Sabah)',category:'Buhârî 6306 · En faziletli istiğfar',arabic:_SEYYID_AR,translit:_SEYYID_TR,meaning:_SEYYID_ME,target:1},
  {id:'afv',name:'Af ve Âfiyet Duası (Sabah)',category:'Ebû Dâvûd 5074 · İbn Mâce 3871',arabic:_AFV_AR,translit:_AFV_TR,meaning:_AFV_ME,target:1},
  {id:'gayb',name:'Allâhümme Âlime’l-ğayb (Sabah)',category:'Tirmizî 3392 · Ebû Dâvûd 5067',arabic:_GAYB_AR,translit:_GAYB_TR,meaning:_GAYB_ME,target:1},
  {id:'sb_hayy',name:'Yâ Hayyu yâ Kayyûm (Sabah)',category:'Nesâî, Kübrâ · Hâkim',arabic:_HAYY_AR,translit:_HAYY_TR,meaning:_HAYY_ME,target:1},
  {id:'fitrat',name:'Asbahnâ alâ fıtrati’l-İslâm',category:'Sabah · Ahmed, Müsned',arabic:'أَصْبَحْنَا عَلَىٰ فِطْرَةِ الْإِسْلَامِ، وَعَلَىٰ كَلِمَةِ الْإِخْلَاصِ، وَعَلَىٰ دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَىٰ مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ',translit:'Asbahnâ alâ fıtrati’l-İslâm, ve alâ kelimeti’l-ihlâs, ve alâ dîni nebiyyinâ Muhammedin sallallâhu aleyhi ve sellem, ve alâ milleti ebînâ İbrâhîme hanîfen müslimen ve mâ kâne mine’l-müşrikîn.',meaning:'İslam fıtratı, ihlas kelimesi, Peygamberimiz Muhammed’in (s.a.v.) dini ve hanif bir Müslüman olan, müşriklerden olmayan atamız İbrahim’in milleti üzere sabaha erdik.',target:1},
  {id:'sb_tevhid',name:'Lâ ilâhe illallâhu vahdehû (Sabah)',category:'10 defa · Ahmed, Müsned',arabic:_TEVHID_AR,translit:_TEVHID_TR,meaning:_TEVHID_ME,target:10},

  // Akşam
  {id:'ak_kursi',name:'Âyetü’l-Kürsî (Akşam)',category:'Bakara 2:255 · Nesâî, Kübrâ',arabic:'',translit:'',meaning:'Akşam okuyan sabaha kadar korunur. Metni mushaftan okuyabilirsin.',target:1},
  {id:'ak_ihlas',name:'İhlâs Sûresi (Akşam)',category:'3 defa · Ebû Dâvûd 5082, Tirmizî 3575',arabic:'',translit:'',meaning:'Allah’ın birliğini anlatan sûre.',target:3},
  {id:'ak_felak',name:'Felak Sûresi (Akşam)',category:'3 defa · Ebû Dâvûd 5082, Tirmizî 3575',arabic:'',translit:'',meaning:'Sabahın Rabbine, yarattıklarının şerrinden sığınma sûresi.',target:3},
  {id:'ak_nas',name:'Nâs Sûresi (Akşam)',category:'3 defa · Ebû Dâvûd 5082, Tirmizî 3575',arabic:'',translit:'',meaning:'İnsanların Rabbine, vesvese verenin şerrinden sığınma sûresi.',target:3},
  {id:'emseyna',name:'Emseynâ ve emse’l-mülkü lillâh',category:'Akşam · Müslim 2723',arabic:'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',translit:'Emseynâ ve emse’l-mülkü lillâh, ve’l-hamdü lillâh, lâ ilâhe illallâhu vahdehû lâ şerîke leh, lehü’l-mülkü ve lehü’l-hamdü ve hüve alâ külli şey’in kadîr. Rabbi es’elüke hayra mâ fî hâzihi’l-leyleti ve hayra mâ ba’dehâ, ve e’ûzü bike min şerri mâ fî hâzihi’l-leyleti ve şerri mâ ba’dehâ. Rabbi e’ûzü bike mine’l-keseli ve sû’i’l-kiber. Rabbi e’ûzü bike min azâbin fi’n-nâri ve azâbin fi’l-kabr.',meaning:'Akşama erdik, mülk de Allah’ın olarak akşama erdi. Hamd Allah’adır. Allah’tan başka ilah yoktur, tektir, ortağı yoktur. Mülk O’nundur, hamd O’nadır, O her şeye kadirdir. Rabbim! Bu gecenin ve sonrasının hayrını Senden isterim; bu gecenin ve sonrasının şerrinden Sana sığınırım. Rabbim! Tembellikten ve ihtiyarlığın kötülüğünden Sana sığınırım. Rabbim! Cehennem azabından ve kabir azabından Sana sığınırım.',target:1},
  {id:'bike_emseyna',name:'Allâhümme bike emseynâ',category:'Akşam · Tirmizî 3391, Ebû Dâvûd 5068',arabic:'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',translit:'Allâhümme bike emseynâ, ve bike asbahnâ, ve bike nahyâ, ve bike nemûtü, ve ileyke’l-masîr.',meaning:'Allah’ım! Seninle akşama erdik, Seninle sabaha erdik. Seninle yaşar, Seninle ölürüz. Varış Sanadır.',target:1},
  {id:'ak_seyyid',name:'Seyyidü’l-İstiğfâr (Akşam)',category:'Buhârî 6306 · En faziletli istiğfar',arabic:_SEYYID_AR,translit:_SEYYID_TR,meaning:_SEYYID_ME,target:1},
  {id:'ak_afini',name:'Âfiyet Duası (Akşam)',category:'3 defa · Ebû Dâvûd 5090',arabic:'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَٰهَ إِلَّا أَنْتَ',translit:'Allâhümme âfinî fî bedenî, Allâhümme âfinî fî sem’î, Allâhümme âfinî fî basarî, lâ ilâhe illâ ente. Allâhümme innî e’ûzü bike mine’l-küfri ve’l-fakr, Allâhümme innî e’ûzü bike min azâbi’l-kabr, lâ ilâhe illâ ente.',meaning:'Allah’ım! Bedenimi sıhhatli kıl. Allah’ım! İşitmemi sıhhatli kıl. Allah’ım! Gözümü sıhhatli kıl. Senden başka ilah yoktur. Allah’ım! Küfürden ve fakirlikten Sana sığınırım. Allah’ım! Kabir azabından Sana sığınırım. Senden başka ilah yoktur.',target:3},
  {id:'ak_afv',name:'Af ve Âfiyet Duası (Akşam)',category:'Ebû Dâvûd 5074 · İbn Mâce 3871',arabic:_AFV_AR,translit:_AFV_TR,meaning:_AFV_ME,target:1},
  {id:'ak_gayb',name:'Allâhümme Âlime’l-ğayb (Akşam)',category:'Tirmizî 3392 · Ebû Dâvûd 5067',arabic:_GAYB_AR,translit:_GAYB_TR,meaning:_GAYB_ME,target:1},
  {id:'ak_bismillah',name:'Bismillâhillezî (Akşam)',category:'3 defa · Ebû Dâvûd 5088, Tirmizî 3388',arabic:'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',translit:'Bismillâhillezî lâ yedurru mea’smihî şey’ün fi’l-ardı ve lâ fi’s-semâi ve hüve’s-semî’u’l-alîm.',meaning:'O Allah’ın adıyla ki, O’nun adı anıldığında yerde ve gökte hiçbir şey zarar veremez. O, hakkıyla işiten ve her şeyi bilendir.',target:3},
  {id:'ak_hayy',name:'Yâ Hayyu yâ Kayyûm (Akşam)',category:'Nesâî, Kübrâ · Hâkim',arabic:_HAYY_AR,translit:_HAYY_TR,meaning:_HAYY_ME,target:1},
  {id:'ak_fitrat',name:'Emseynâ alâ fıtrati’l-İslâm',category:'Akşam · Ahmed, Müsned',arabic:'أَمْسَيْنَا عَلَىٰ فِطْرَةِ الْإِسْلَامِ، وَعَلَىٰ كَلِمَةِ الْإِخْلَاصِ، وَعَلَىٰ دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَىٰ مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ',translit:'Emseynâ alâ fıtrati’l-İslâm, ve alâ kelimeti’l-ihlâs, ve alâ dîni nebiyyinâ Muhammedin sallallâhu aleyhi ve sellem, ve alâ milleti ebînâ İbrâhîme hanîfen müslimen ve mâ kâne mine’l-müşrikîn.',meaning:'İslam fıtratı, ihlas kelimesi, Peygamberimiz Muhammed’in (s.a.v.) dini ve hanif bir Müslüman olan, müşriklerden olmayan atamız İbrahim’in milleti üzere akşama erdik.',target:1},
  {id:'ak_tevhid',name:'Lâ ilâhe illallâhu vahdehû (Akşam)',category:'10 defa · Ahmed, Müsned',arabic:_TEVHID_AR,translit:_TEVHID_TR,meaning:_TEVHID_ME,target:10},
  {id:'ak_bihamdihi',name:'Sübhânallâhi ve bihamdihî (Akşam)',category:'100 defa · Müslim 2692',arabic:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',translit:'Sübhânallâhi ve bihamdihî.',meaning:'Allah’ı hamdiyle birlikte tesbih ederim.',target:100}
];

const MORNING = ['sb_kursi','ihlas','sb_felak','sb_nas','asbahna','bike_asbahna','seyyid','sb_afini','afv','gayb','sb_bismillah','sb_hayy','fitrat','sb_tevhid','sb_adede','sb_bihamdihi'];
const EVENING = ['ak_kursi','ak_ihlas','ak_felak','ak_nas','emseyna','bike_emseyna','ak_seyyid','ak_afini','ak_afv','ak_gayb','ak_bismillah','ak_kelimat','ak_hayy','ak_fitrat','ak_tevhid','ak_bihamdihi'];

// Mevcut kartlarla birleştirilenler: yalnızca kullanıcı değiştirmediyse güncellenir
const PATCHES_V3 = [
  {id:'aksam', from:{name:'Akşam Zikri', category:'Tevhid', target:10}, to:{name:'Tevhid Zikri (Sabah-Akşam)', category:'Sabah-akşam 100 defa · Müsned', target:100}},
  {id:'hayy', from:{arabic:'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ', translit:'Yâ Hayyu yâ Kayyûm, bi-rahmetike esteğîs.', meaning:'Ey Hayy ve Kayyûm olan Allah, rahmetinle yardım diliyorum.'},
    to:{arabic:'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، يَا ذَا الْجَلَالِ وَالْإِكْرَامِ', translit:'Yâ Hayyu yâ Kayyûm, bi-rahmetike esteğîs, yâ ze’l-celâli ve’l-ikrâm.', meaning:'Ey diri ve kâinatı ayakta tutan Allah! Rahmetinle yardımını dilerim, ey celâl ve ikram sahibi!'}},
  {id:'salavat', from:{arabic:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', translit:'Allâhümme salli alâ Muhammed.', meaning:'Allah’ım, Muhammed’e salât eyle.'},
    to:{arabic:'اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ وَعَلَىٰ آلِ سَيِّدِنَا مُحَمَّدٍ', translit:'Allâhümme salli alâ seyyidinâ Muhammedin ve alâ âli seyyidinâ Muhammed.', meaning:'Allah’ım, efendimiz Muhammed’e ve efendimiz Muhammed’in ailesine salât eyle.'}},
  {id:'aile', from:{name:'Huzurlu Bir Aile İçin', category:'Furkân 25:74'}, to:{name:'Huzurlu Aile ve Hayırlı Kısmet İçin', category:'Furkân 25:74'}},
  {id:'bakiyat', from:{category:'Tesbih, hamd, tevhid, tekbir'}, to:{category:'Müslim 2695 · Tesbih, hamd, tevhid, tekbir'}},
  {id:'musibet', from:{name:'Bir Badire Yaşandığında', category:'Müslim 918'}, to:{name:'İstircâ · Bir Badire Yaşandığında', category:'Bakara 2:156 · Müslim 918'}},
  // v4: metin düzeltmeleri ve kaynaklar
  {v:4, id:'eyyub', from:{arabic:'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ', translit:'Ennî messeniye’d-durru ve ente erhamü’r-râhimîn.'},
    to:{arabic:'رَبِّ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ', translit:'Rabbi ennî messeniye’d-durru ve ente erhamü’r-râhimîn.'}},
  {v:4, id:'istigfar_hayy', from:{name:'Estağfirullâhe’llezî lâ ilâhe illâ hüve’l-Hayye’l-Kayyûm', arabic:'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ', translit:'Estağfirullâhellezî lâ ilâhe illâ hüve’l-Hayyü’l-Kayyûmü ve etûbü ileyh.'},
    to:{name:'Estağfirullâhellezî lâ ilâhe illâ hüve’l-Hayye’l-Kayyûm', arabic:'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ', translit:'Estağfirullâhellezî lâ ilâhe illâ hüve’l-Hayye’l-Kayyûme ve etûbü ileyh.'}},
  {v:4, id:'maide', from:{arabic:'رَبَّنَا أَنْزِلْ عَلَيْنَا مَائِدَةً مِنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِأَوَّلِنَا وَآخِرِنَا وَآيَةً مِنْكَ وَارْزُقْنَا وَأَنْتَ خَيْرُ الرَّازِقِينَ', translit:'Rabbenâ enzil aleynâ mâideten mine’s-semâi tekûnü lenâ îden li-evvelinâ ve âhirinâ ve âyeten minke, verzuknâ ve ente hayru’r-râzikîn.', meaning:'Rabbimiz! Bize gökten bir sofra indir ki hem öncekilerimiz hem sonrakilerimiz için bir bayram ve Senden bir mucize olsun. Bizi rızıklandır; çünkü Sen rızık verenlerin en hayırlısısın.'},
    to:{arabic:'اللَّهُمَّ رَبَّنَا أَنْزِلْ عَلَيْنَا مَائِدَةً مِنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِأَوَّلِنَا وَآخِرِنَا وَآيَةً مِنْكَ وَارْزُقْنَا وَأَنْتَ خَيْرُ الرَّازِقِينَ', translit:'Allâhümme Rabbenâ enzil aleynâ mâideten mine’s-semâi tekûnü lenâ îden li-evvelinâ ve âhirinâ ve âyeten minke, verzuknâ ve ente hayru’r-râzikîn.', meaning:'Allah’ım, ey Rabbimiz! Bize gökten bir sofra indir ki hem öncekilerimiz hem sonrakilerimiz için bir bayram ve Senden bir mucize olsun. Bizi rızıklandır; çünkü Sen rızık verenlerin en hayırlısısın.'}},
  {v:4, id:'husnu_huluk', from:{category:'Güzel ahlak istemek', arabic:'اللَّهُمَّ آتِنِي حُسْنَ الْخُلُقِ', translit:'Allâhümme âtinî hüsne’l-huluk.', meaning:'Allah’ım! Bana güzel ahlak nasip et.'},
    to:{category:'Güzel ahlak istemek · Ahmed, Müsned', arabic:'اللَّهُمَّ أَحْسَنْتَ خَلْقِي فَأَحْسِنْ خُلُقِي', translit:'Allâhümme ahsente halkî fe-ahsin hulukî.', meaning:'Allah’ım! Yaratılışımı güzel yaptığın gibi ahlakımı da güzelleştir.'}},
  {v:4, id:'yunus', from:{category:'Tevbe ve dua'}, to:{category:'Enbiyâ 21:87 · Tevbe ve dua'}},
  {v:4, id:'masaallah', from:{category:'Allah’ı yüceltmek'}, to:{category:'Kehf 18:39 · Allah’ı yüceltmek'}},
  {v:4, id:'uyanis2', from:{category:'Uyanış duası'}, to:{category:'Tirmizî 3401'}},
  {v:4, id:'rizik2', from:{category:'Faydalı ilim, helal rızık'}, to:{category:'İbn Mâce 925 · Faydalı ilim, helal rızık'}},
  // v6: Yâ Fettâh rızık bölümüne taşındı
  // v8: Arapça ve kaynak düzeltmeleri
  {v:8, id:'eyyub', from:{arabic:'رَبِّ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ', translit:'Rabbi ennî messeniye’d-durru ve ente erhamü’r-râhimîn.'},
    to:{arabic:'رَبِّ إِنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ', translit:'Rabbi innî messeniye’d-durru ve ente erhamü’r-râhimîn.'}},
  {v:8, id:'seyyid', from:{arabic:_SEYYID_AR_OLD, translit:_SEYYID_TR_OLD}, to:{arabic:_SEYYID_AR, translit:_SEYYID_TR}},
  {v:8, id:'ak_seyyid', from:{arabic:_SEYYID_AR_OLD, translit:_SEYYID_TR_OLD}, to:{arabic:_SEYYID_AR, translit:_SEYYID_TR}},
  {v:8, id:'kabir', from:{category:'Müslim 589 · Günlük zikir'}, to:{category:'Namazda selamdan önce · Buhârî 832, Müslim 589'}},
  {v:8, id:'aksam', from:{name:'Tevhid Zikri (Sabah-Akşam)', category:'Sabah-akşam 100 defa · Müsned'}, to:{name:'Tevhid Zikri (Günde 100)', category:'Günde 100 defa · Buhârî 3293, Müslim 2691'}},
  {v:8, id:'raditu', from:{category:'İman tazeleme · Sabah-akşam 3 defa'}, to:{category:'İman tazeleme · Ebû Dâvûd 5072 (rivayeti tartışmalı)'}},
  {v:8, id:'rahmeteke', from:{category:'Sıkıntı anında · Ebû Dâvûd, Edeb 100'}, to:{category:'Sıkıntı anında · Ebû Dâvûd, Ahmed'}},
  {v:8, id:'kader', from:{category:'İbn Mâce 4168'}, to:{category:'Müslim 2664 · İbn Mâce 4168'}},
  {v:8, id:'tasbih', from:{category:'Allah’ı anmak'}, to:{category:'Namazdan sonra 33’er defa · Müslim 597'}},
  {v:8, id:'rizik1', from:{category:'Ebû Dâvûd 850'}, to:{category:'İki secde arası · Ebû Dâvûd 850'}},
  {v:8, id:'rizik2', from:{category:'İbn Mâce 925 · Faydalı ilim, helal rızık'}, to:{category:'Sabah namazından sonra · İbn Mâce 925'}},
  // v7: sabah bölümüne taşınan kartlar
  {v:7, id:'ayetelkursi', from:{name:'Âyetü’l-Kürsî', category:'Bakara 2:255 · Sabah-akşam koruma', meaning:'Sabah ve akşam okunan koruyucu ayet. Metni mushaftan okuyabilirsin.'}, to:{name:'Âyetü’l-Kürsî (Sabah)', category:'Bakara 2:255 · Nesâî, Kübrâ', meaning:'Sabah okuyan akşama kadar korunur. Metni mushaftan okuyabilirsin.'}},
  {v:7, id:'felak', from:{name:'Felak Sûresi', category:'Sabah-akşam 3 defa · Koruma'}, to:{name:'Felak Sûresi (Sabah)', category:'3 defa · Ebû Dâvûd 5082, Tirmizî 3575'}},
  {v:7, id:'nas', from:{name:'Nâs Sûresi', category:'Sabah-akşam 3 defa · Koruma'}, to:{name:'Nâs Sûresi (Sabah)', category:'3 defa · Ebû Dâvûd 5082, Tirmizî 3575'}},
  {v:7, id:'bismillahillezi', from:{name:'Koruyucu Dua (Bismillâhillezî)', category:'Sabah-akşam 3 defa · Ebû Dâvûd, Tirmizî'}, to:{name:'Bismillâhillezî (Sabah)', category:'3 defa · Ebû Dâvûd 5088, Tirmizî 3388'}},
  {v:7, id:'afini', from:{name:'Âfiyet Duası (Allâhümme âfinî)', category:'Sabah-akşam 3 defa · Ebû Dâvûd'}, to:{name:'Âfiyet Duası (Sabah)', category:'3 defa · Ebû Dâvûd 5090'}},
  {v:7, id:'bihamdihi', from:{name:'Sübhânallâhi ve bihamdihî', category:'Günde 100 defa · Buhârî, Müslim'}, to:{name:'Sübhânallâhi ve bihamdihî (Sabah)', category:'100 defa · Müslim 2692'}},
  {v:7, id:'adede_halkihi', from:{category:'Sabah 3 defa · Müslim'}, to:{category:'Sabah 3 defa · Müslim 2726'}},
  {v:7, id:'kelimat', from:{name:'Eûzü bi-kelimâtillâhi’t-tâmmât', category:'Akşam · Müslim, Zikir 2709'}, to:{name:'Eûzü bi-kelimâtillâhi’t-tâmmât (Akşam)', category:'Akşam 3 defa · Müslim 2709'}},
  {v:6, id:'ya_fettah', from:{category:'Esmâü’l-Hüsnâ · Kapalı yolları açar'}, to:{category:'Esmâü’l-Hüsnâ · Rızık ve hayır kapılarını açar'}},
  // v9: sabaha taşınan asıl kartlar kendi bölümlerine döndü
  {v:9, id:'ayetelkursi', from:{name:'Âyetü’l-Kürsî (Sabah)', category:'Bakara 2:255 · Nesâî, Kübrâ', meaning:'Sabah okuyan akşama kadar korunur. Metni mushaftan okuyabilirsin.'}, to:{name:'Âyetü’l-Kürsî', category:'Bakara 2:255 · Koruma', meaning:'Koruyucu ayet; sabah, akşam ve yatarken okunur. Metni mushaftan okuyabilirsin.'}},
  {v:9, id:'felak', from:{name:'Felak Sûresi (Sabah)', category:'3 defa · Ebû Dâvûd 5082, Tirmizî 3575'}, to:{name:'Felak Sûresi', category:'Koruma · Ebû Dâvûd 5082, Tirmizî 3575'}},
  {v:9, id:'nas', from:{name:'Nâs Sûresi (Sabah)', category:'3 defa · Ebû Dâvûd 5082, Tirmizî 3575'}, to:{name:'Nâs Sûresi', category:'Koruma · Ebû Dâvûd 5082, Tirmizî 3575'}},
  {v:9, id:'bismillahillezi', from:{name:'Bismillâhillezî (Sabah)'}, to:{name:'Koruyucu Dua (Bismillâhillezî)'}},
  {v:9, id:'afini', from:{name:'Âfiyet Duası (Sabah)'}, to:{name:'Âfiyet Duası (Allâhümme âfinî)'}},
  {v:9, id:'bihamdihi', from:{name:'Sübhânallâhi ve bihamdihî (Sabah)'}, to:{name:'Sübhânallâhi ve bihamdihî'}},
  {v:9, id:'kelimat', from:{name:'Eûzü bi-kelimâtillâhi’t-tâmmât (Akşam)'}, to:{name:'Eûzü bi-kelimâtillâhi’t-tâmmât'}},
  // v10: Kur’ân metni, okunuşu ve meali eklendi (kullanıcının değiştirdiği alanlara dokunulmaz)
  {v:10, id:'ayetelkursi', from:{arabic:'', translit:'', meaning:'Koruyucu ayet; sabah, akşam ve yatarken okunur. Metni mushaftan okuyabilirsin.'}, to:{arabic:_KURSI_AR, translit:_KURSI_TR, meaning:_KURSI_ME + ' — Sabah, akşam ve yatarken okunur.'}},
  {v:10, id:'sb_kursi', from:{arabic:'', translit:'', meaning:'Sabah okuyan akşama kadar korunur. Metni mushaftan okuyabilirsin.'}, to:{arabic:_KURSI_AR, translit:_KURSI_TR, meaning:_KURSI_ME + ' — Sabah okuyan akşama kadar korunur.'}},
  {v:10, id:'ak_kursi', from:{arabic:'', translit:'', meaning:'Akşam okuyan sabaha kadar korunur. Metni mushaftan okuyabilirsin.'}, to:{arabic:_KURSI_AR, translit:_KURSI_TR, meaning:_KURSI_ME + ' — Akşam okuyan sabaha kadar korunur.'}},
  {v:10, id:'ihlas', from:{arabic:'', translit:'', meaning:'Allah’ın birliğini anlatan sûre. Felak ve Nâs ile birlikte sabah-akşam üçer kez okuyana “her şeye karşı yeter” buyrulmuştur.'}, to:{arabic:_IHLAS_AR, translit:_IHLAS_TR, meaning:_IHLAS_ME + ' — Felak ve Nâs ile birlikte sabah-akşam üçer kez okuyana “her şeye karşı yeter” buyrulmuştur.'}},
  {v:10, id:'ak_ihlas', from:{arabic:'', translit:'', meaning:'Allah’ın birliğini anlatan sûre.'}, to:{arabic:_IHLAS_AR, translit:_IHLAS_TR, meaning:_IHLAS_ME}},
  {v:10, id:'felak', from:{arabic:'', translit:'', meaning:'Sabahın Rabbine, yarattıklarının şerrinden sığınma sûresi.'}, to:{arabic:_FELAK_AR, translit:_FELAK_TR, meaning:_FELAK_ME}},
  {v:10, id:'sb_felak', from:{arabic:'', translit:'', meaning:'Sabahın Rabbine, yarattıklarının şerrinden sığınma sûresi.'}, to:{arabic:_FELAK_AR, translit:_FELAK_TR, meaning:_FELAK_ME}},
  {v:10, id:'ak_felak', from:{arabic:'', translit:'', meaning:'Sabahın Rabbine, yarattıklarının şerrinden sığınma sûresi.'}, to:{arabic:_FELAK_AR, translit:_FELAK_TR, meaning:_FELAK_ME}},
  {v:10, id:'nas', from:{arabic:'', translit:'', meaning:'İnsanların Rabbine, vesvese verenin şerrinden sığınma sûresi.'}, to:{arabic:_NAS_AR, translit:_NAS_TR, meaning:_NAS_ME}},
  {v:10, id:'sb_nas', from:{arabic:'', translit:'', meaning:'İnsanların Rabbine, vesvese verenin şerrinden sığınma sûresi.'}, to:{arabic:_NAS_AR, translit:_NAS_TR, meaning:_NAS_ME}},
  {v:10, id:'ak_nas', from:{arabic:'', translit:'', meaning:'İnsanların Rabbine, vesvese verenin şerrinden sığınma sûresi.'}, to:{arabic:_NAS_AR, translit:_NAS_TR, meaning:_NAS_ME}},
  // v12: salavattan “seyyidinâ” ve Radîtü kartından “İman tazeleme” kaldırıldı
  {v:12, id:'salavat', from:{arabic:'اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ وَعَلَىٰ آلِ سَيِّدِنَا مُحَمَّدٍ', translit:'Allâhümme salli alâ seyyidinâ Muhammedin ve alâ âli seyyidinâ Muhammed.', meaning:'Allah’ım, efendimiz Muhammed’e ve efendimiz Muhammed’in ailesine salât eyle.'},
    to:{arabic:'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ', translit:'Allâhümme salli alâ Muhammedin ve alâ âli Muhammed.', meaning:'Allah’ım, Muhammed’e ve Muhammed’in ailesine salât eyle.'}},
  {v:12, id:'raditu', from:{category:'İman tazeleme · Ebû Dâvûd 5072 (rivayeti tartışmalı)'}, to:{category:'Ebû Dâvûd 5072 (rivayeti tartışmalı)'}}
];
function applyPatches(list, since = 0) {
  for (const p of PATCHES_V3) {
    if ((p.v || 3) <= since) continue;
    const z = list.find(x => x.id === p.id);
    if (!z) continue;
    for (const k of Object.keys(p.to)) if (z[k] === p.from[k]) z[k] = p.to[k];
  }
}

// v5: dua kapanışı
const ADDED_V5 = [
  {id:'kapanis',name:'Kapanış: Sübhâne Rabbike',category:'Sâffât 37:180-182 · Duayı hamd ile bitirmek',arabic:'سُبْحَانَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُونَ وَسَلَامٌ عَلَى الْمُرْسَلِينَ وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',translit:'Sübhâne Rabbike Rabbi’l-izzeti ammâ yesifûn, ve selâmün ale’l-mürselîn, ve’l-hamdü lillâhi Rabbi’l-âlemîn.',meaning:'Senin Rabbin, kudret sahibi Rab, onların nitelendirmelerinden yücedir. Peygamberlere selam olsun. Hamd, âlemlerin Rabbi Allah’a mahsustur.',target:1}
];


/* ---------- Dua sırası (Hanbelî: hamd-senâ → salavat → tevbe-istiğfar → istek → kapanış) ---------- */
const DUA_GROUPS = [
  ['☀︎ Sabah Zikirleri', MORNING],
  ['☾ Akşam Zikirleri', EVENING],
  ['1 · Hamd ve Senâ', ['tawhid','aksam','kerb','mulk','bakiyat','tasbih','bihamdihi','subhanallahil_azim','adede_halkihi','melik_kuddus','masaallah','la_havle','raditu']],
  ['2 · Salavat', ['salavat']],
  ['3 · Tevbe ve İstiğfar', ['istighfar','istigfar_tevbe','istigfar_hayy','yunus','adem']],
  ['4 · Dua: Ahiret İçin', ['mukallib','husnu_huluk','rabbena_atina','ecirni','kabir','ibrahim','yusuf','nuh']],
  ['4 · Dua: Dünya ve Sıkıntı', ['musa_sadr','musa','rizik1','rizik2','maide','rizik_ayet','ya_fettah','aile','zekeriya','suleyman','rahmeteke','hayy','eyyub','gam','sabir','tevekkul','hasbunallah','lokman22','suayb']],
  ['4 · Dua: Korunma', ['ayetelkursi','felak','nas','bismillahillezi','kelimat','afini','yunus81']],
  ['Kendi Zikirlerin', null],
  ['5 · Kapanış', ['kapanis']],
  ['Özel Durumlarda', ['uyanis1','uyanis2','sukur','hakaret','kader','musibet','sinanan']]
];
const GROUP_OF = {};
const RANK = {};
DUA_GROUPS.forEach(([label, ids], gi) => (ids || []).forEach((id, i) => { GROUP_OF[id] = label; RANK[id] = gi * 1000 + i; }));
const CUSTOM_GROUP = DUA_GROUPS.findIndex(g => g[1] === null);
const groupOf = z => GROUP_OF[z.id] || (z.custom ? 'Kendi Zikirlerin' : null);
// Bilinmeyen/kendi zikirler kendi bölümünde, eklendikleri sırayla kalır
function sortByDuaOrder(list) {
  return list.map((z, i) => ({z, r: (z.id in RANK ? RANK[z.id] : CUSTOM_GROUP * 1000 + 500) + i / 1000}))
    .sort((a, b) => a.r - b.r).map(x => x.z);
}

// v9: sabah/akşam bölümleri için ayrı kopyalar (asılları kendi bölümlerinde kalır)
const _from = id => ({...[...ADDED_V2, ...ADDED_V3].find(z => z.id === id)});
const ADDED_V9 = [
  {..._from('ayetelkursi'), id:'sb_kursi', name:'Âyetü’l-Kürsî (Sabah)', category:'Bakara 2:255 · Nesâî, Kübrâ', meaning:'Sabah okuyan akşama kadar korunur. Metni mushaftan okuyabilirsin.'},
  {..._from('felak'), id:'sb_felak', name:'Felak Sûresi (Sabah)', category:'3 defa · Ebû Dâvûd 5082, Tirmizî 3575'},
  {..._from('nas'), id:'sb_nas', name:'Nâs Sûresi (Sabah)', category:'3 defa · Ebû Dâvûd 5082, Tirmizî 3575'},
  {..._from('afini'), id:'sb_afini', name:'Âfiyet Duası (Sabah)', category:'3 defa · Ebû Dâvûd 5090'},
  {..._from('bismillahillezi'), id:'sb_bismillah', name:'Bismillâhillezî (Sabah)', category:'3 defa · Ebû Dâvûd 5088, Tirmizî 3388'},
  {..._from('adede_halkihi'), id:'sb_adede', category:'Sabah 3 defa · Müslim 2726'},
  {..._from('bihamdihi'), id:'sb_bihamdihi', name:'Sübhânallâhi ve bihamdihî (Sabah)', category:'100 defa · Müslim 2692'},
  {..._from('kelimat'), id:'ak_kelimat', name:'Eûzü bi-kelimâtillâhi’t-tâmmât (Akşam)', category:'Akşam 3 defa · Müslim 2709'}
];

// v6: kullanıcı isteğiyle kaldırılan Esmâ kartları
const REMOVED_V6 = new Set(['ya_sabur', 'ya_latif', 'ya_selam', 'ya_vedud']);
const DEFAULTS = sortByDuaOrder([...BASE, ...ADDED_V2, ...ADDED_V3, ...ADDED_V5, ...ADDED_V7, ...ADDED_V9].filter(z => !REMOVED_V6.has(z.id)));
applyPatches(DEFAULTS);
// v11: Kur’ân’dan alınan bütün zikir ve duaların başına besmele (sûrelerde zaten var). Yama, önceki son değerlerden üretilir;
// kullanıcının kendi değiştirdiği alanlara dokunulmaz.
const BESMELE_AR = _IHLAS_AR.slice(0, _IHLAS_AR.indexOf(' قُلْ')), BESMELE_TR = 'Bismillâhirrahmânirrahîm.', BESMELE_ME = 'Rahmân ve Rahîm olan Allah’ın adıyla.';
const BESMELE_IDS = ['ayetelkursi', 'sb_kursi', 'ak_kursi', 'mulk', 'masaallah', 'yunus', 'adem', 'rabbena_atina', 'ibrahim', 'yusuf', 'nuh', 'musa_sadr', 'musa', 'maide', 'rizik_ayet', 'aile', 'zekeriya', 'suleyman', 'eyyub', 'sabir', 'tevekkul', 'hasbunallah', 'lokman22', 'suayb', 'yunus81', 'kapanis', 'hakaret', 'musibet'];
for (const id of BESMELE_IDS) {
  const z = DEFAULTS.find(x => x.id === id);
  if (!z || !z.arabic || z.arabic.startsWith(BESMELE_AR)) continue;
  const from = {arabic: z.arabic, translit: z.translit, meaning: z.meaning};
  const to = {arabic: BESMELE_AR + ' ' + z.arabic, translit: z.translit ? BESMELE_TR + ' ' + z.translit : '', meaning: z.meaning ? BESMELE_ME + ' ' + z.meaning : ''};
  PATCHES_V3.push({v: 11, id, from, to});
  Object.assign(z, to);
}
const CATALOG = 12;

const KEY = 'zikrim-v2';
const OLD_KEY = 'zikrim-v1';
const THEMES = {night:'#0d1526', nature:'#f3f6ef', classic:'#faf4ea'};
const UI_V = 2; // v2: klasik tema varsayılan, sabit sıralama
const HIJRI_MONTHS = ['Muharrem', 'Safer', 'Rebîülevvel', 'Rebîülâhir', 'Cemâziyelevvel', 'Cemâziyelâhir', 'Receb', 'Şâban', 'Ramazan', 'Şevvâl', 'Zilkade', 'Zilhicce'];
function hijriText(d = new Date()) {
  try {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {day: 'numeric', month: 'numeric', year: 'numeric'}).formatToParts(d).map(x => [x.type, x.value]));
    const m = HIJRI_MONTHS[Number(p.month) - 1];
    if (!m || !p.day || !p.year) return '';
    return `${Number(p.day)} ${m} ${parseInt(p.year, 10)}`.toLocaleUpperCase('tr-TR');
  } catch { return ''; }
}
const KEEP_DAYS = 400;

const $ = s => document.querySelector(s);
const pad = n => String(n).padStart(2, '0');
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const fmt = n => n.toLocaleString('tr-TR');
const clampTarget = v => Math.min(100000, Math.max(1, Math.floor(Number(v)) || 33));

/* ---------- Durum ve kayıt ---------- */
function sanitize(s) {
  const out = {v: 2, ui: Number(s && s.ui) || 0, theme: THEMES[s && s.theme] ? s.theme : 'classic', haptics: !s || s.haptics !== false, compact: !!(s && s.compact), catalog: Number(s && s.catalog) || 1, zikirs: [], days: {}};
  const seen = new Set();
  for (const z of (s && Array.isArray(s.zikirs) ? s.zikirs : [])) {
    if (!z || typeof z.id !== 'string' || !z.id || seen.has(z.id)) continue;
    seen.add(z.id);
    out.zikirs.push({
      id: z.id, name: String(z.name || 'Zikir').slice(0, 80), category: String(z.category || '').slice(0, 80),
      arabic: String(z.arabic || ''), translit: String(z.translit || ''), meaning: String(z.meaning || ''),
      target: clampTarget(z.target), custom: !!z.custom
    });
  }
  const oldest = dayKey(addDays(new Date(), -KEEP_DAYS));
  if (s && s.days && typeof s.days === 'object') {
    for (const [d, c] of Object.entries(s.days)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || d < oldest || !c || typeof c !== 'object') continue;
      const t = {};
      for (const [k, v] of Object.entries(c)) { const n = Math.max(0, Math.floor(Number(v)) || 0); if (n) t[k] = n; }
      if (Object.keys(t).length) out.days[d] = t;
    }
  }
  return out;
}

function load() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(KEY)); } catch {}
  if (s && typeof s === 'object') {
    const out = sanitize(s);
    // Yeni sürümde eklenen zikirleri mevcut listeye bir kez ekle
    if (out.catalog < CATALOG) {
      const have = new Set(out.zikirs.map(z => z.id));
      let added = 0;
      const add = list => { for (const z of list) if (!have.has(z.id) && !REMOVED_V6.has(z.id)) { out.zikirs.push({...z}); have.add(z.id); added++; } };
      if (out.catalog < 2) add(ADDED_V2);
      if (out.catalog < 3) add(ADDED_V3);
      applyPatches(out.zikirs, out.catalog);
      if (out.catalog < 5) {
        add(ADDED_V5);
        // Bir kereye mahsus: listeyi dua sırasına diz (geri alınabilir)
        const prevOrder = out.zikirs.map(z => z.id);
        out.zikirs = sortByDuaOrder(out.zikirs);
        setTimeout(() => toast('Zikirler dua sırasına göre dizildi', {label: 'Geri al', run: () => {
          const pos = new Map(prevOrder.map((id, i) => [id, i]));
          S.zikirs.sort((a, b) => (pos.has(a.id) ? pos.get(a.id) : 1e9) - (pos.has(b.id) ? pos.get(b.id) : 1e9));
          save(); renderCards();
        }}), 700);
        added = 0;
      }
      if (out.catalog < 6) {
        // 4 Esmâ kartını kaldır; rızıkla ilgili iki kartı rızık dualarının yanına taşı
        out.zikirs = out.zikirs.filter(z => !REMOVED_V6.has(z.id));
        const moving = ['rizik_ayet', 'ya_fettah'].map(id => out.zikirs.find(z => z.id === id)).filter(Boolean);
        const rest = out.zikirs.filter(z => !moving.includes(z));
        const anchor = ['maide', 'rizik2', 'rizik1'].map(id => rest.findIndex(z => z.id === id)).find(i => i >= 0);
        if (moving.length && anchor !== undefined) { rest.splice(anchor + 1, 0, ...moving); out.zikirs = rest; }
      }
      if (out.catalog < 7) {
        add(ADDED_V7);
        // Sabah ve akşam zikirlerini en üste, kendi bölümlerine al
        const block = [...MORNING, ...EVENING].map(id => out.zikirs.find(z => z.id === id)).filter(Boolean);
        out.zikirs = [...block, ...out.zikirs.filter(z => !block.includes(z))];
        setTimeout(() => toast('Sabah ve Akşam zikirleri eklendi ☀️🌙'), 800);
        added = 0;
      }
      if (out.catalog < 9) {
        add(ADDED_V9);
        const L = out.zikirs;
        const take = ids => ids.map(id => { const i = L.findIndex(z => z.id === id); return i < 0 ? null : L.splice(i, 1)[0]; }).filter(Boolean);
        const put = (items, afterIds, beforeIds) => {
          if (!items.length) return;
          let at = -1;
          for (const id of beforeIds || []) { const i = L.findIndex(z => z.id === id); if (i >= 0) { at = i; break; } }
          if (at < 0) for (const id of afterIds || []) { const i = L.findIndex(z => z.id === id); if (i >= 0) { at = i + 1; break; } }
          if (at < 0) at = L.length;
          L.splice(at, 0, ...items);
        };
        // Asıl kartlar eski bölümlerine
        put(take(['bihamdihi', 'adede_halkihi']), ['subhanallahil_azim', 'tasbih', 'bakiyat']);
        put(take(['ayetelkursi', 'felak', 'nas', 'bismillahillezi', 'kelimat', 'afini']), ['ecirni', 'kabir'], ['yunus81']);
        // Sabah/akşam kartları kendi sırasıyla (ana listede görünmezler)
        L.push(...take([...MORNING, ...EVENING]));
        added = 0;
      }
      out.catalog = CATALOG;
      persistState(out);
      if (added) setTimeout(() => toast(`${added} yeni zikir eklendi ✨`), 600);
    }
    if (out.ui < UI_V) {
      // Bir kereye mahsus: klasik temaya geç ve zikirleri sabit (dua) sırasına diz
      out.theme = 'classic';
      out.zikirs = sortByDuaOrder(out.zikirs);
      out.ui = UI_V;
      persistState(out);
    }
    return out;
  }
  // İlk açılış: eski sürümün (v1) verisini taşı
  s = {theme: 'classic', ui: UI_V, catalog: CATALOG, zikirs: DEFAULTS, days: {}};
  try {
    const old = JSON.parse(localStorage.getItem(OLD_KEY));
    if (old && typeof old === 'object') {
      if (old.theme) s.theme = old.theme;
      if (old.counts) s.days[dayKey()] = old.counts;
    }
  } catch {}
  const out = sanitize(s);
  persistState(out);
  return out;
}

function persistState(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { setTimeout(() => toast('Kayıt yapılamadı (depolama dolu olabilir)'), 0); }
}

let S = load();
let today = dayKey();
const save = () => persistState(S);

const getCount = (id, d = today) => (S.days[d] && S.days[d][id]) || 0;
function setCount(id, n, d = today) {
  n = Math.max(0, Math.floor(n));
  if (!S.days[d]) S.days[d] = {};
  if (n) S.days[d][id] = n; else delete S.days[d][id];
  if (!Object.keys(S.days[d]).length) delete S.days[d];
}
const dayTotal = d => Object.values(S.days[d] || {}).reduce((a, b) => a + b, 0);
const findZ = id => S.zikirs.find(z => z.id === id);

/* ---------- Ana sayfa: üstte her açılışta farklı bir zikir ---------- */
let hzPick = null;
// Sabah/akşam kopyaları aynı metni tekrarlamasın diye Arapçaya göre tekilleştirilir; çok uzun metinler (Âyetü’l-Kürsî gibi) kartı taşırmasın diye alınmaz.
function hzPool() {
  const seen = new Set();
  return S.zikirs.filter(z => z.arabic && z.arabic.length <= 220 && !seen.has(z.arabic) && seen.add(z.arabic));
}
function renderHeroZikr(next = false) {
  const pool = hzPool();
  if (!pool.length) { $('#hz').hidden = true; return; }
  if (!hzPick || next || !findZ(hzPick)) {
    const last = next ? hzPick : store.get('zikrim-hz', null);
    const rest = pool.length > 1 ? pool.filter(z => z.id !== last) : pool;
    hzPick = rest[Math.floor(Math.random() * rest.length)].id;
    store.set('zikrim-hz', hzPick);
  }
  const z = findZ(hzPick);
  $('#hzAr').textContent = z.arabic;
  $('#hzName').textContent = z.name;
  $('#hzMe').textContent = z.meaning;
  $('#hzMe').hidden = !z.meaning;
  $('#hzGo').onclick = () => openFocus(z.id);
  $('#hzNext').onclick = () => renderHeroZikr(true);
  $('#hz').hidden = false;
}

/* ---------- Titreşim (iOS 18+ için switch hilesi) ---------- */
const hapticEl = $('#haptic');
function haptic(strong) {
  if (!S.haptics) return;
  if (navigator.vibrate) { navigator.vibrate(strong ? [25, 60, 25] : 8); return; }
  try { hapticEl.click(); } catch {}
}

/* ---------- Bildirim (toast) ---------- */
const toastEl = $('#toast');
function toast(message, action) {
  toastEl.replaceChildren();
  const span = document.createElement('span');
  span.textContent = message;
  toastEl.append(span);
  if (action) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = action.label;
    b.addEventListener('click', () => { action.run(); toastEl.classList.remove('show'); });
    toastEl.append(b);
  }
  toastEl.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => toastEl.classList.remove('show'), action ? 5000 : 1900);
}


/* ---------- Selef'ten Sözler (âlimler doğum sırasına göre; okuma kartları; kaynakları çevrimiçi metinlerle karşılaştırıldı) ---------- */
const QUOTES = [
  {who:'Mücâhid b. Cebr (d. 21 – ö. 104)', ar:'لَا يَتَعَلَّمُ الْعِلْمَ مُسْتَحْيٍ وَلَا مُسْتَكْبِرٌ', tr:'Utangaç olan da kibirli olan da ilim öğrenemez.', src:'Buhârî, Kitâbü’l-İlm, “İlimde hayâ” babı (ta‘lîkan)'},
  {who:'Mücâhid b. Cebr (d. 21 – ö. 104)', ar:'مَا أَدْرِي أَيُّ النِّعْمَتَيْنِ عَلَيَّ أَعْظَمُ: أَنْ هَدَانِي لِلْإِسْلَامِ، أَوْ عَافَانِي مِنْ هَذِهِ الْأَهْوَاءِ', tr:'Hangi nimetin benim için daha büyük olduğunu bilemiyorum: Beni İslam’a hidayet etmesi mi, yoksa beni bu bid‘at fırkalarından koruması mı?', src:'Dârimî, Sünen, 317'},
  {who:'Mücâhid b. Cebr (d. 21 – ö. 104)', ar:'لَا يَكُونُ مِنَ الذَّاكِرِينَ اللَّهَ كَثِيرًا وَالذَّاكِرَاتِ حَتَّى يَذْكُرَ اللَّهَ قَائِمًا وَقَاعِدًا وَمُضْطَجِعًا', tr:'Ayaktayken, otururken ve yatarken Allah’ı anmadıkça kişi “Allah’ı çok zikreden”lerden olmaz.', src:'Nevevî, el-Ezkâr’da naklen'},
  {who:'Mücâhid b. Cebr (d. 21 – ö. 104)', ar:'طَلَبْنَا هَذَا الْعِلْمَ وَمَا لَنَا فِيهِ نِيَّةٌ، ثُمَّ رَزَقَ اللَّهُ النِّيَّةَ بَعْدُ', tr:'Bu ilmi talep ettik, (başta) onda bir niyetimiz yoktu; sonra Allah niyeti nasip etti.', src:'Zehebî, Târîhu’l-İslâm'},
  {who:'Mücâhid b. Cebr (d. 21 – ö. 104)', ar:'لَا تُنَوِّهُوا بِي فِي الْخَلْقِ', tr:'Beni insanlar arasında öne çıkarıp övmeyin.', src:'Zehebî, Târîhu’l-İslâm'},
  {who:'el-Evzâî (d. 88 – ö. 157)', ar:'عَلَيْكَ بِآثَارِ مَنْ سَلَفَ وَإِنْ رَفَضَكَ النَّاسُ، وَإِيَّاكَ وَآرَاءَ الرِّجَالِ وَإِنْ زَخْرَفُوهُ لَكَ بِالْقَوْلِ', tr:'İnsanlar seni dışlasa da selefin eserlerine sarıl. İnsanların görüşlerinden ise, sözü süsleyip sana sunsalar da sakın.', src:'Zehebî, Tezkiretü’l-Huffâz, c. 1, s. 180'},
  {who:'el-Evzâî (d. 88 – ö. 157)', ar:'اصْبِرْ نَفْسَكَ عَلَى السُّنَّةِ، وَقِفْ حَيْثُ وَقَفَ الْقَوْمُ، وَقُلْ بِمَا قَالُوا، وَكُفَّ عَمَّا كَفُّوا عَنْهُ', tr:'Nefsini sünnet üzere sabırla tut. O topluluğun (sahabenin) durduğu yerde dur, onların söylediğini söyle, sustuklarından sus.', src:'Lâlekâî, Şerhu Usûli’l-İ‘tikâd (Ebû İshâk el-Fezârî rivayeti)'},
  {who:'el-Evzâî (d. 88 – ö. 157)', ar:'إِذَا أَرَادَ اللَّهُ بِقَوْمٍ شَرًّا فَتَحَ عَلَيْهِمْ بَابَ الْجَدَلِ، وَمَنَعَهُمُ الْعَمَلَ', tr:'Allah bir topluluk için kötülük dilediğinde onlara tartışma kapısını açar ve onları amelden alıkoyar.', src:'el-Velîd b. Mezyed rivayeti · Ahmed Ferîd, Min A‘lâmi’s-Selef, c. 4, s. 11 (naklen)'},
  {who:'el-Evzâî (d. 88 – ö. 157)', ar:'إِنَّ الْمُؤْمِنَ يَقُولُ قَلِيلًا وَيَعْمَلُ كَثِيرًا، وَإِنَّ الْمُنَافِقَ يَقُولُ كَثِيرًا وَيَعْمَلُ قَلِيلًا', tr:'Mümin az konuşur, çok amel eder; münafık ise çok konuşur, az amel eder.', src:'Ahmed Ferîd, Min A‘lâmi’s-Selef, c. 4, s. 11 (naklen)'},
  {who:'el-Evzâî (d. 88 – ö. 157)', ar:'مَنْ أَكْثَرَ ذِكْرَ الْمَوْتِ كَفَاهُ الْيَسِيرُ، وَمَنْ عَلِمَ أَنَّ مَنْطِقَهُ مِنْ عَمَلِهِ قَلَّ كَلَامُهُ', tr:'Ölümü çok anana az (dünyalık) yeter. Sözünün de amelinden sayıldığını bilenin konuşması azalır.', src:'Amr b. Ebî Seleme rivayeti · Ahmed Ferîd, Min A‘lâmi’s-Selef, c. 4, s. 11 (naklen)'},
  {who:'el-Evzâî (d. 88 – ö. 157)', ar:'كُنَّا نَمْزَحُ وَنَضْحَكُ، فَأَمَّا إِذْ صِرْنَا يُقْتَدَى بِنَا مَا أَرَى يَسَعُنَا إِلَّا التَّبَسُّمُ', tr:'Eskiden şakalaşır, gülerdik. Ama artık bize uyulur hâle geldiğimize göre, bize ancak tebessüm yakışır.', src:'Mûsâ b. A‘yen’e · Ahmed Ferîd, Min A‘lâmi’s-Selef, c. 4, s. 11 (naklen)'},
  {who:'Süfyân es-Sevrî (d. 97 – ö. 161)', ar:'الْبِدْعَةُ أَحَبُّ إِلَى إِبْلِيسَ مِنَ الْمَعْصِيَةِ، الْمَعْصِيَةُ يُتَابُ مِنْهَا، وَالْبِدْعَةُ لَا يُتَابُ مِنْهَا', tr:'Bid‘at İblis’e günahtan daha sevimlidir. Çünkü günahtan tövbe edilir, bid‘attan ise (doğru sanıldığı için) tövbe edilmez.', src:'Lâlekâî, Şerhu Usûli’l-İ‘tikâd, c. 1, s. 149, no. 238'},
  {who:'Süfyân es-Sevrî (d. 97 – ö. 161)', ar:'مَا عَالَجْتُ شَيْئًا قَطُّ أَشَدَّ عَلَيَّ مِنْ نَفْسِي', tr:'Nefsimden daha çetin hiçbir şeyle uğraşmadım.', src:'Ebû Nuaym, Hilyetü’l-Evliyâ, c. 7, s. 5 (Vekî‘ yoluyla) · el-Hatîb’in el-Câmi‘indeki rivayette «nefsim» yerine «niyetim, o bana karşı dönüp durur»'},
  {who:'Süfyân es-Sevrî (d. 97 – ö. 161)', ar:'مَا بَلَغَنِي عَنْ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ حَدِيثٌ قَطُّ إِلَّا عَمِلْتُ بِهِ وَلَوْ مَرَّةً', tr:'Resûlullah’tan bana ulaşan her hadisle, bir kere de olsa mutlaka amel ettim.', src:'Zehebî, Siyeru A‘lâmi’n-Nübelâ, c. 7 (Sevrî tercümesi)'},
  {who:'Süfyân es-Sevrî (d. 97 – ö. 161)', ar:'تَعَلَّمُوا هَذَا الْعِلْمَ، فَإِذَا تَعَلَّمْتُمُوهُ فَاحْفَظُوهُ، فَإِذَا حَفِظْتُمُوهُ فَاعْمَلُوا بِهِ، فَإِذَا عَمِلْتُمْ بِهِ فَانْشُرُوهُ', tr:'Bu ilmi öğrenin. Öğrenince onu ezberleyin, ezberleyince onunla amel edin, amel edince de onu yayın.', src:'İbn Sa‘d, et-Tabakâtü’l-Kübrâ, c. 6 (Sevrî tercümesi)'},
  {who:'Süfyân es-Sevrî (d. 97 – ö. 161)', ar:'مَا اسْتَوْدَعْتُ قَلْبِي شَيْئًا قَطُّ فَخَانَنِي', tr:'Kalbime emanet ettiğim (ezberlediğim) hiçbir şey bana ihanet etmedi.', src:'İbn Ebî Hâtim, Takdimetü’l-Cerh ve’t-Ta‘dîl · Zehebî, Siyer, c. 7'},
  {who:'Süfyân es-Sevrî (d. 97 – ö. 161)', ar:'وَدِدْتُ أَنِّي نَجَوْتُ مِنْ هَذَا الْعِلْمِ كَفَافًا، لَا لِي وَلَا عَلَيَّ', tr:'Bu ilimden başa baş kurtulmayı isterdim: ne lehime olsun ne aleyhime.', src:'İbn Ebî Hâtim, Takdimetü’l-Cerh ve’t-Ta‘dîl'},
  {who:'İmam Ahmed b. Hanbel (d. 164 – ö. 241)', ar:'أُصُولُ السُّنَّةِ عِنْدَنَا: التَّمَسُّكُ بِمَا كَانَ عَلَيْهِ أَصْحَابُ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَالِاقْتِدَاءُ بِهِمْ، وَتَرْكُ الْبِدَعِ', tr:'Bize göre sünnetin esasları: Resûlullah’ın ashabının üzerinde olduğu yola sımsıkı sarılmak, onlara uymak ve bid‘atleri terk etmektir.', src:'Usûlü’s-Sünne · Lâlekâî, Şerhu Usûli’l-İ‘tikâd; İbn Ebû Ya‘lâ, Tabakâtü’l-Hanâbile'},
  {who:'İmam Ahmed b. Hanbel (d. 164 – ö. 241)', ar:'وَالسُّنَّةُ عِنْدَنَا آثَارُ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ', tr:'Bize göre sünnet, Resûlullah’tan gelen rivayetlerdir.', src:'Usûlü’s-Sünne'},
  {who:'İmam Ahmed b. Hanbel (d. 164 – ö. 241)', ar:'مَنْ رَدَّ حَدِيثَ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَهُوَ عَلَى شَفَا هَلَكَةٍ', tr:'Resûlullah’ın hadisini reddeden helakın eşiğindedir.', src:'İbn Batta, el-İbâne; İbnü’l-Cevzî, Menâkıbü’l-İmâm Ahmed (naklen)'},
  {who:'İmam Ahmed b. Hanbel (d. 164 – ö. 241)', ar:'لَا تُقَلِّدْنِي وَلَا تُقَلِّدْ مَالِكًا وَلَا الشَّافِعِيَّ وَلَا الْأَوْزَاعِيَّ وَلَا الثَّوْرِيَّ، وَخُذْ مِنْ حَيْثُ أَخَذُوا', tr:'Beni taklit etme; Mâlik’i, Şâfiî’yi, Evzâî’yi ve Sevrî’yi de taklit etme. Onların aldığı yerden (Kitap ve Sünnet’ten) al.', src:'İbnü’l-Kayyim, İ‘lâmü’l-Muvakkıîn; Fullânî, Îkâzü’l-Himem, s. 113 (naklen)'},
  {who:'İmam Ahmed b. Hanbel (d. 164 – ö. 241)', ar:'النَّاسُ أَحْوَجُ إِلَى الْعِلْمِ مِنْهُمْ إِلَى الطَّعَامِ وَالشَّرَابِ، لِأَنَّ الطَّعَامَ وَالشَّرَابَ يُحْتَاجُ إِلَيْهِ فِي الْيَوْمِ مَرَّتَيْنِ أَوْ ثَلَاثًا، وَالْعِلْمُ يُحْتَاجُ إِلَيْهِ بِعَدَدِ الْأَنْفَاسِ', tr:'İnsanlar ilme, yiyecek ve içecekten daha muhtaçtır. Çünkü yiyecek ve içeceğe günde iki üç kez ihtiyaç duyulur; ilme ise nefes sayısınca ihtiyaç duyulur.', src:'İbnü’l-Kayyim, Medâricü’s-Sâlikîn (naklen)'},
  {who:'İmam Ahmed b. Hanbel (d. 164 – ö. 241)', ar:'الزُّهْدُ: قِصَرُ الْأَمَلِ، وَالْإِيَاسُ مِمَّا فِي أَيْدِي النَّاسِ', tr:'Zühd; emeli kısa tutmak ve insanların elindekinden ümidi kesmektir.', src:'İbn Müflih, el-Âdâbü’ş-Şer‘iyye'},
  {who:'el-Berbehârî (d. 233 – ö. 329)', ar:'اعْلَمُوا أَنَّ الْإِسْلَامَ هُوَ السُّنَّةُ، وَالسُّنَّةَ هِيَ الْإِسْلَامُ، وَلَا يَقُومُ أَحَدُهُمَا إِلَّا بِالْآخَرِ', tr:'Bilin ki İslam sünnettir, sünnet de İslam’dır. Biri diğeri olmadan ayakta duramaz.', src:'Şerhu’s-Sünne, 1. paragraf'},
  {who:'el-Berbehârî (d. 233 – ö. 329)', ar:'وَاعْلَمْ رَحِمَكَ اللَّهُ أَنَّ الْعِلْمَ لَيْسَ بِكَثْرَةِ الرِّوَايَةِ وَالْكُتُبِ، وَلَكِنَّ الْعَالِمَ مَنِ اتَّبَعَ الْعِلْمَ وَالسُّنَنَ', tr:'Bil, Allah sana rahmet etsin, ilim çok rivayet ve çok kitapla olmaz. Âlim, ilme ve sünnetlere uyandır.', src:'Şerhu’s-Sünne'},
  {who:'el-Berbehârî (d. 233 – ö. 329)', ar:'وَاحْذَرْ صِغَارَ الْمُحْدَثَاتِ مِنَ الْأُمُورِ', tr:'Dinde sonradan çıkarılan küçük şeylerden sakın.', src:'Şerhu’s-Sünne'},
  {who:'el-Berbehârî (d. 233 – ö. 329)', ar:'وَاعْلَمْ أَنَّ النَّاسَ لَمْ يَبْتَدِعُوا بِدْعَةً قَطُّ حَتَّى تَرَكُوا مِنَ السُّنَّةِ مِثْلَهَا', tr:'Bil ki insanlar, sünnetten benzerini terk etmedikçe hiçbir bid‘at çıkarmamışlardır.', src:'Şerhu’s-Sünne'},
  {who:'el-Berbehârî (d. 233 – ö. 329)', ar:'لَا عُذْرَ لِأَحَدٍ فِي ضَلَالَةٍ رَكِبَهَا حَسِبَهَا هُدًى', tr:'Hidayet sanarak saplandığı bir sapkınlıkta kimsenin mazereti yoktur.', src:'Şerhu’s-Sünne'},
  {who:'el-Berbehârî (d. 233 – ö. 329)', ar:'وَالْقُرْآنُ كَلَامُ اللَّهِ وَتَنْزِيلُهُ وَنُورُهُ', tr:'Kur’an, Allah’ın kelamı, indirdiği ve nurudur.', src:'Şerhu’s-Sünne'},
  {who:'el-Hallâl (d. 234 – ö. 311)', ar:'كَفَّ رَجُلٌ يَدَهُ، وَمَلَكَ لِسَانَهُ، وَعَالَجَ قَلْبَهُ', tr:'Kişi (fitne zamanında) elini çeksin, diline hâkim olsun ve kalbini ıslah etsin.', src:'es-Sünne, 91 · Kûfeli Süleyman’ın sözü; İmam Ahmed beğenmiştir (92)'},
  {who:'el-Hallâl (d. 234 – ö. 311)', ar:'الصَّبْرُ عَلَى مَا نَحْنُ فِيهِ خَيْرٌ مِنَ الْفِتْنَةِ يُسْفَكُ فِيهَا الدِّمَاءُ', tr:'(İmam Ahmed:) İçinde bulunduğumuz duruma sabretmek, kanların döküldüğü fitneden daha hayırlıdır.', src:'es-Sünne, 89'},
  {who:'el-Hallâl (d. 234 – ö. 311)', ar:'مَا يُعْجِبُنِي أَنْ يَرْوِيَ الرَّجُلُ حَدِيثًا فِيهِ عَلَى أَصْحَابِ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ شَيْءٌ', tr:'(İmam Ahmed:) Bir kimsenin, Resûlullah’ın ashabı aleyhine bir şey içeren bir hadisi rivayet etmesini hoş görmem.', src:'es-Sünne, 800 (c. 3, s. 501)'},
  {who:'el-Hallâl (d. 234 – ö. 311)', ar:'الرُّجُوعُ إِلَى الْحَقِّ خَيْرٌ مِنَ الْإِقَامَةِ عَلَى الْبَاطِلِ', tr:'Hakka dönmek, batılda ısrar etmekten hayırlıdır.', src:'es-Sünne (Hallâl’in kendi sözü), c. 2, s. 208'},
  {who:'el-Hallâl (d. 234 – ö. 311)', ar:'لَوْ تَدَبَّرَ إِنْسَانٌ الْقُرْآنَ كَانَ فِيهِ مَا يَرُدُّ عَلَى كُلِّ مُبْتَدِعٍ بِبِدْعَتِهِ', tr:'(İmam Ahmed:) İnsan Kur’an’ı tefekkür etse, onda her bid‘atçinin bid‘atini reddedecek şeyi bulur.', src:'es-Sünne, c. 1, s. 461'},
  {who:'el-Hallâl (d. 234 – ö. 311)', ar:'مِنَ اللَّهِ عَزَّ وَجَلَّ الْعِلْمُ، وَعَلَى الرَّسُولِ الْبَلَاغُ، وَعَلَيْنَا التَّسْلِيمُ', tr:'(ez-Zührî:) İlim Allah’tandır; tebliğ Resûl’e, teslimiyet bize düşer.', src:'es-Sünne, c. 1, s. 504'},
  {who:'el-Hallâl (d. 234 – ö. 311)', ar:'لَا تَزَالُ عَلَى الطَّرِيقِ مَا زِلْتَ تَطْلُبُ الْأَثَرَ', tr:'(İbn Sîrîn:) Eseri (sünneti) aradığın sürece doğru yoldasın.', src:'es-Sünne, c. 1, s. 197'},
  {who:'el-Hallâl (d. 234 – ö. 311)', ar:'لَوْ شَهِدْتُ لِأَحَدٍ حَيٍّ أَنَّهُ مِنْ أَهْلِ الْجَنَّةِ لَشَهِدْتُ لِعَبْدِ اللَّهِ بْنِ عُمَرَ', tr:'(Saîd b. el-Müseyyeb:) Yaşayan birinin cennetlik olduğuna şahitlik edecek olsaydım, Abdullah b. Ömer için ederdim.', src:'es-Sünne, c. 1, s. 292'},
  {who:'el-Âcurrî (d. ~280 – ö. 360)', ar:'يَنْبَغِي لَهُ أَنْ يَجْعَلَ الْقُرْآنَ رَبِيعًا لِقَلْبِهِ، يُعَمِّرَ بِهِ مَا خَرِبَ مِنْ قَلْبِهِ', tr:'(Kur’an ehli) Kur’an’ı kalbinin baharı kılmalı, kalbinde harap olanı onunla imar etmelidir.', src:'Ahlâku Hameleti’l-Kur’ân'},
  {who:'el-Âcurrî (d. ~280 – ö. 360)', ar:'إِنْ تَكَلَّمَ تَكَلَّمَ بِعِلْمٍ، إِذَا رَأَى الْكَلَامَ صَوَابًا', tr:'Konuşursa, sözün doğru olduğunu gördüğünde ilimle konuşur.', src:'Ahlâku Hameleti’l-Kur’ân'},
  {who:'el-Âcurrî (d. ~280 – ö. 360)', ar:'لَا يَمْدَحُ نَفْسَهُ بِمَا فِيهِ، فَكَيْفَ بِمَا لَيْسَ فِيهِ', tr:'Kendinde olan bir özellikle bile kendini övmez; ya olmayanla nasıl över!', src:'Ahlâku Hameleti’l-Kur’ân'},
  {who:'el-Âcurrî (d. ~280 – ö. 360)', ar:'يَكْظِمُ غَيْظَهُ لِيُرْضِيَ رَبَّهُ، وَيَغِيظَ عَدُوَّهُ', tr:'Rabbini razı etmek ve düşmanını öfkelendirmek için öfkesini yutar.', src:'Ahlâku Hameleti’l-Kur’ân'},
  {who:'el-Âcurrî (d. ~280 – ö. 360)', ar:'يَتَصَفَّحُ الْقُرْآنَ لِيُؤَدِّبَ بِهِ نَفْسَهُ', tr:'(Kur’an ehli) Nefsini onunla terbiye etmek için Kur’an’ı inceler.', src:'Ahlâku Hameleti’l-Kur’ân'},
  {who:'el-Âcurrî (d. ~280 – ö. 360)', ar:'لَا يَتَأَكَّلُ بِالْقُرْآنِ، وَلَا يُحِبُّ أَنْ تُقْضَى لَهُ بِهِ الْحَوَائِجُ', tr:'Kur’an’ı geçim aracı yapmaz; onun sayesinde ihtiyaçlarının görülmesini istemez.', src:'Ahlâku Hameleti’l-Kur’ân'},
  {who:'el-Âcurrî (d. ~280 – ö. 360)', ar:'إِذَا دَرَسَ الْقُرْآنَ فَبِحُضُورِ فَهْمٍ وَعَقْلٍ', tr:'Kur’an’ı okuduğunda, anlayışını ve aklını hazır ederek okur.', src:'Ahlâku Hameleti’l-Kur’ân'},
  {who:'el-Âcurrî (d. ~280 – ö. 360)', ar:'لَا يَغْتَابُ أَحَدًا، وَلَا يَحْقِرُ أَحَدًا، وَلَا يَسُبُّ أَحَدًا', tr:'Kimseyi gıybet etmez, kimseyi küçümsemez, kimseye sövmez.', src:'Ahlâku Hameleti’l-Kur’ân'},
  {who:'İbn Batta el-Ukberî (d. 304 – ö. 387)', ar:'اتَّبِعُوا وَلَا تَبْتَدِعُوا، فَقَدْ كُفِيتُمْ', tr:'(İbn Mes‘ûd:) Uyun, bid‘at çıkarmayın; size yetecek olan verildi.', src:'el-İbânetü’l-Kübrâ, 174 · senedi sahih'},
  {who:'İbn Batta el-Ukberî (d. 304 – ö. 387)', ar:'نَسْتَوْفِقُ اللَّهَ لِصَوَابِ الْقَوْلِ وَصَالِحِ الْعَمَلِ', tr:'Allah’tan sözde isabet ve amelde salâh için muvaffakiyet dileriz.', src:'el-İbânetü’s-Suğrâ, mukaddime'},
  {who:'İbn Batta el-Ukberî (d. 304 – ö. 387)', ar:'وَنَسْأَلُهُ أَنْ يَجْعَلَ غَرَضَنَا فِيمَا نَتَكَلَّفُهُ مِنْ ذَلِكَ ابْتِغَاءَ وَجْهِهِ وَإِيثَارَ رِضَاهُ وَمَحَبَّتِهِ', tr:'Bu işte üstlendiğimiz her şeyde gayemizi yalnızca O’nun rızasını aramak, O’nun hoşnutluğunu ve sevgisini her şeye tercih etmek kılmasını O’ndan dileriz.', src:'el-İbânetü’s-Suğrâ, mukaddime'}
];

/* ---------- Kartlar ---------- */
const cardsEl = $('#cards');
const MSET = new Set(MORNING), ESET = new Set(EVENING);
const VIEWS = {main: 'Sekîne', sabah: '☀︎ Sabah Zikirleri', aksam: '☾ Akşam Zikirleri', genel: '📿 Genel Zikirler', selef: '📜 Sözler', fikih: '⚖️ Hanbelî Fıkhı', musannef: '📚 Musannef', ibnebiseybe: '📚 İbn Ebî Şeybe', musned: '📗 Müsned', usul: '📘 Usûlü’s-Sünne', ahmed: '📘 İmam Ahmed', zuhd: '📘 ez-Zühd', fezail: '📘 Fezâilü’s-sahâbe', berbehari: '📕 Şerhu’s-Sünne', acurri: '📙 el-Âcurrî', seria: '📙 eş-Şerîa', hallal: '📗 el-Hallâl', kutuphane: '📚 Kütüphane', kaydedilen: '☆ Kaydettiklerim'};
const LIB_CHILD = new Set(['musannef', 'ibnebiseybe', 'musned', 'usul', 'ahmed', 'zuhd', 'fezail', 'berbehari', 'acurri', 'seria', 'hallal', 'kaydedilen']);
const READ_VIEWS = new Set(['selef', 'fikih', 'musannef', 'ibnebiseybe', 'musned', 'usul', 'ahmed', 'zuhd', 'fezail', 'berbehari', 'acurri', 'seria', 'hallal', 'kutuphane', 'kaydedilen']);
let view = 'main';
/* Alt sekmeler: her görünüm bir sekmeye aittir. Kökler: Zikir = ana sayfa, Kütüphane = raf, Sözler = sözler listesi. */
const TAB_ROOT = {zikir: 'main', kutuphane: 'kutuphane', selef: 'selef'};
const TAB_ROOTS = new Set(Object.values(TAB_ROOT));
const tabOf = v => v === 'selef' ? 'selef' : (v === 'kutuphane' || v === 'fikih' || LIB_CHILD.has(v)) ? 'kutuphane' : 'zikir';
const isGenel = z => !MSET.has(z.id) && !ESET.has(z.id);
const inView = z => view === 'sabah' ? MSET.has(z.id) : view === 'aksam' ? ESET.has(z.id) : view === 'genel' ? isGenel(z) : false;
const visible = () => S.zikirs.filter(inView);

function setView(v, instant = false) {
  ttsStop();
  view = VIEWS[v] ? v : 'main';
  searchEl.value = '';
  renderCards();
  const behavior = instant ? 'auto' : 'smooth';
  // Sekme kökleri sayfanın en üstünden açılır; diğer görünümler liste başından.
  if (TAB_ROOTS.has(view)) window.scrollTo({top: 0, behavior});
  else $('.list').scrollIntoView({block: 'start', behavior});
}
document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => setView(view === b.dataset.view ? 'main' : b.dataset.view)));
$('#backAll').addEventListener('click', () => setView(LIB_CHILD.has(view) ? 'kutuphane' : 'main'));

function renderCards() {
  cardsEl.replaceChildren();
  if (view === 'main') { renderHeroZikr(); renderResume(); renderDaily(); }
  document.body.classList.toggle('compact', S.compact);
  $('#toggleCompact').classList.toggle('active', S.compact);
  $('#toggleCompact').setAttribute('aria-pressed', String(S.compact));
  const list = visible();
  $('#listTitle').textContent = VIEWS[view];
  $('.list').hidden = view === 'main';
  document.body.classList.toggle('at-main', view === 'main');
  $('#backAll').hidden = TAB_ROOTS.has(view);
  const tab = tabOf(view);
  document.body.dataset.tab = tab;
  document.querySelectorAll('.tab').forEach(b => { if (b.dataset.tab === tab) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  $('#backAll').textContent = LIB_CHILD.has(view) ? '← Kütüphane' : '← Geri';
  $('#addZikir').hidden = view !== 'genel';
  document.querySelectorAll('[data-view]').forEach(b => { const on = b.dataset.view === view || (b.dataset.view === 'kutuphane' && LIB_CHILD.has(view)); b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
  $('#empty').hidden = list.length > 0 || READ_VIEWS.has(view);
  document.body.classList.toggle('view-selef', READ_VIEWS.has(view));
  searchEl.placeholder = view === 'kutuphane' ? 'Kitap ya da âlim ara…' : view === 'kaydedilen' ? 'Kaydettiklerinde ara…' : view === 'selef' ? 'Söz ara (âlim, anlam, kaynak)…' : view === 'fikih' ? 'Fıkıhta ara (ör. mesh, cuma, zekât)…' : view === 'usul' ? 'Risalede ara (ör. kader, havz, cuma)…' : LIBS[view] ? (LIBS[view].book == null && LIBS[view].nogo ? 'Kitap ara…' : LIBS[view].book == null && !LIBS[view].single ? `${LIBS[view].unit === 'kitap' ? 'Kitap' : 'Bölüm'} ara ya da ${LIBS[view].item} no. yaz (ör. ${LIBS[view].ex})…` : `Bu ${LIBS[view].unit === 'kitap' ? 'kitapta' : 'bölümde'} ara ya da ${LIBS[view].item} no. yaz…`) : 'Zikir ara (ad, anlam, okunuş)…';
  if (view === 'selef') { renderQuotes(); applyFilter(); update(); return; }
  if (view === 'fikih') { renderFiqh(); applyFilter(); update(); return; }
  if (LIBS[view]) { renderLib(LIBS[view]); update(); return; }
  if (view === 'usul') { renderUsul(); applyFilter(); update(); return; }
  if (view === 'kutuphane') { renderLibrary(); applyFilter(); update(); return; }
  if (view === 'kaydedilen') { renderSaved(); applyFilter(); update(); return; }
  let lastGroup = null;
  for (const z of list) {
    const box = document.createElement('article');
    box.className = 'zikir';
    box.dataset.id = z.id;
    const g = view === 'genel' ? groupOf(z) : null;
    if (g && g !== lastGroup) box.dataset.group = g;
    lastGroup = g;
    box.innerHTML = `
      <div class="zikir-top">
        <div class="zikir-title"><h3></h3><p class="category"></p></div>
        <span class="count-pill"></span>
        <button class="more" type="button" data-act="edit" aria-label="Düzenle">⋯</button>
      </div>
      <p class="arabic" lang="ar" dir="rtl"></p>
      <p class="translit"></p>
      <p class="meaning"></p>
      <div class="bar"><span></span></div>
      <div class="actions">
        <button class="minus" type="button" data-act="minus" aria-label="Bir geri al">−</button>
        <button class="tap" type="button" data-act="plus">+1 Zikir</button>
        <button class="focus-btn" type="button" data-act="focus" aria-label="Odak modunda say" title="Odak modu">⤢</button>
      </div>`;
    box.querySelector('h3').textContent = z.name;
    for (const f of ['category', 'arabic', 'translit', 'meaning']) {
      const el = box.querySelector('.' + f);
      el.textContent = z[f];
      el.hidden = !z[f];
    }
    cardsEl.append(box);
  }
  applyFilter();
  update();
}

/* ---------- Arama ---------- */
const searchEl = $('#search');
const norm = t => String(t).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f’'`]/g, '').replace(/ı/g, 'i');
function renderQuotes() {
  let last = null;
  for (const q of QUOTES) {
    const box = document.createElement('article');
    box.className = 'quote';
    if (q.who !== last) box.dataset.group = q.who;
    last = q.who;
    box.innerHTML = '<p class="arabic" lang="ar" dir="rtl"></p><p class="q-tr"></p><p class="q-src"></p>';
    box.querySelector('.arabic').textContent = q.ar;
    box.querySelector('.q-tr').textContent = q.tr;
    box.querySelector('.q-src').textContent = q.who.replace(/ \(.*\)$/, '') + ' · ' + q.src;
    box.insertBefore(ttsRow([['ar', '▶ Arapça', () => [{el: box.querySelector('.arabic'), text: prepAr(q.ar)}]], ['tr', '▶ Türkçe', () => [{el: box.querySelector('.q-tr'), text: prepTr(q.tr)}]]]), box.querySelector('.q-src'));
    box.dataset.search = [q.who, q.tr, q.src].join(' ');
    cardsEl.append(box);
  }
}

function renderFiqh() {
  const intro = document.createElement('article');
  intro.className = 'quote fq-note';
  intro.textContent = FIQH_INTRO;
  cardsEl.append(intro);
  for (const c of FIQH) {
    const d = document.createElement('details');
    d.className = 'fq-cat';
    const sum = document.createElement('summary');
    sum.innerHTML = '<span></span><small></small>';
    sum.querySelector('span').textContent = c.cat;
    sum.querySelector('small').textContent = c.topics.length + ' konu';
    d.append(sum);
    for (const tp of c.topics) {
      const a = document.createElement('article');
      a.className = 'fq-topic';
      const h = document.createElement('h3');
      h.textContent = tp.t;
      const ul = document.createElement('ul');
      for (const it of tp.items) { const li = document.createElement('li'); li.textContent = it; ul.append(li); }
      a.append(h, ul);
      const dl = DELIL[c.cat.split(' ')[0] + ':' + tp.t] || [];
      if (dl.length) {
        const box = document.createElement('div');
        box.className = 'fq-delil';
        const lab = document.createElement('p');
        lab.className = 'fq-delil-h';
        lab.textContent = '📖 Delil';
        box.append(lab);
        for (const d of dl) {
          const i = d.lastIndexOf(' — ');
          const p = document.createElement('p');
          const txt = document.createElement('span');
          txt.textContent = i > 0 ? d.slice(0, i) : d;
          p.append(txt);
          if (i > 0) { const src = document.createElement('small'); src.textContent = d.slice(i + 3); p.append(src); }
          box.append(p);
        }
        a.append(box);
      }
      a.dataset.search = [c.cat, tp.t, ...tp.items, ...dl].join(' ');
      d.append(a);
    }
    cardsEl.append(d);
  }
  const books = document.createElement('details');
  books.className = 'fq-cat fq-books';
  books.innerHTML = '<summary><span>📚 Mezhebin Temel Eserleri</span><small></small></summary>';
  books.querySelector('small').textContent = FIQH_BOOKS.length + ' eser';
  for (const [n, a, d] of FIQH_BOOKS) {
    const el = document.createElement('article');
    el.className = 'fq-topic';
    el.innerHTML = '<h3></h3><p class="q-src"></p><p class="fq-desc"></p>';
    el.querySelector('h3').textContent = n;
    el.querySelector('.q-src').textContent = a;
    el.querySelector('.fq-desc').textContent = d;
    el.dataset.search = [n, a, d].join(' ');
    books.append(el);
  }
  cardsEl.append(books);
}

/* ---------- Usûlü's-Sünne (İmam Ahmed) — Türkçe çeviri ve Arapça metin ---------- */
const RAH = 'رحمه الله';
function usulItem(u) {
  const [n, t, metin] = u;
  const a = el('article', 'mus-h');
  a.id = 'u' + n;
  a.dataset.n = n;
  a.append(el('p', 'mus-no', n ? `Madde ${n} · ${t}` : t));
  const ar = typeof USUL_AR !== 'undefined' ? USUL_AR[n] : '';
  if (ar) {
    const box = el('div', 'ar-box'); box.lang = 'ar'; box.dir = 'rtl';
    const k = arSplit(ar);
    if (k > 0) box.append(el('p', 'ar-isn', ar.slice(0, k).trim()));
    box.append(el('p', 'ar-mtn', ar.slice(k).trim()));
    box.append(ttsBtn('ar', '▶', () => [{el: box, text: prepAr(TTS.arSened ? ar : ar.slice(k))}], 'tts-i', 'Arapçasını sesli oku'));
    a.append(box);
  }
  const sp = !n ? el('p', 'mus-sened', USUL_SENED) : null;
  if (sp) a.append(sp);
  const tp = el('p', 'mus-tr usul-tr', metin);
  const row = el('div', 'tr-row');
  row.append(tp, ttsBtn('tr', '▶', () => [TTS.trSened && sp ? {el: sp, text: prepTr(USUL_SENED)} : null, {el: tp, text: prepTr(metin)}], 'tts-i', 'Türkçesini sesli oku'));
  a.append(row);
  const src = el('p', 'q-src', 'İmam Ahmed (');
  const r = el('bdi', null, RAH); r.lang = 'ar'; r.dir = 'rtl';
  src.append(r, '), Usûlü’s-Sünne' + (n ? `, madde ${n}` : ''));
  a.append(src);
  a.append(starBtn('usul:' + n, () => ({v: 'usul', u, title: 'Usûlü’s-Sünne'})));
  a.dataset.search = [n ? 'madde ' + n : '', t, metin].join(' ');
  return a;
}
let USUL_TARGET = null;
function renderUsul() {
  const wrap = el('div', 'mus');
  const head = el('div', 'mus-head');
  const by = el('small', 'mus-book-n', 'İmam Ahmed b. Hanbel (');
  const ar = el('bdi', 'rah', RAH); ar.lang = 'ar'; ar.dir = 'rtl';
  by.append(ar, ') · ö. 241 · ' + (USUL.length - 1) + ' madde');
  head.append(by, fsBar());
  const note = el('article', 'quote fq-note mus-note', USUL_NOTE);
  wrap.append(head, note);
  const list = el('div', 'fq-cat usul-list');
  for (const u of USUL) list.append(usulItem(u));
  wrap.append(list);
  cardsEl.append(wrap);
  trackRead(list, a => ({v: 'usul', n: +a.dataset.n, title: 'Usûlü’s-Sünne', label: +a.dataset.n ? 'madde ' + a.dataset.n : 'giriş'}));
  if (USUL_TARGET != null) { const n = USUL_TARGET; USUL_TARGET = null; flashTo('u' + n); }
}

/* ---------- Hadis kitaplığı (Musannef, Müsned) — Türkçe çeviri ve Arapça metin; kitaplar açılınca yüklenir ---------- */
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const musQ = t => norm(t);
const LIBS = {
  musannef: {base: 'musannef/', key: 'zikrim-mus', unit: 'kitap', item: 'rivayet', ex: 29121, err: 'Musannef',
    src: n => `İbn Ebî Şeybe, el-Musannef, no. ${n}`,
    note: 'Ebû Bekir İbn Ebî Şeybe (ö. 235), el-Musannef — Türkçe çeviri. Çeviri, Kemâl Yûsuf el-Hût neşrindeki (Riyad: Mektebetü’r-Rüşd, 1409) metinden yapılmıştır; rivayet numaraları bu neşre göredir. Arapça metin, el-Mektebetü’ş-Şâmile’deki aynı neşirden (no. 9944) aynen alınmıştır. Çevirisi tamamlanan kitaplar açılabilir, diğerleri sırayla eklenecek.'},
  musned: {base: 'musned/', key: 'zikrim-musned', unit: 'bölüm', item: 'hadis', ex: 45, err: 'Müsned',
    src: n => `İmam Ahmed (\u2068رحمه الله\u2069), el-Müsned, no. ${n}`,
    note: 'İmam Ahmed b. Hanbel (ö. 241), el-Müsned — Türkçe çeviri. Çeviri, Şuayb el-Arnaût ve arkadaşlarının tahkikiyle yayımlanan Müessesetü’r-Risâle neşrindeki (Beyrut, 1421/2001) metinden yapılmıştır; hadis numaraları bu neşre göredir. Numaranın önündeki * ve • işaretleri, neşirde Abdullah b. Ahmed’in ziyâdelerini; ° işareti ise Abdullah’ın babasının kitabında bulduklarını (vicâde) gösterir. Arapça metin, el-Mektebetü’ş-Şâmile’deki aynı neşirden (no. 25794) aynen alınmıştır; tahkik dipnotları alınmamıştır. Müsned, sahâbîlere göre bölümlenmiştir; çevrilen bölümler sırayla eklenecek.'}
};
LIBS.ibnebiseybe = {base: 'ibnebiseybe/', key: 'zikrim-ibnebiseybe', unit: 'kitap', item: 'rivayet', ex: 5, err: 'İbn Ebî Şeybe', nogo: true, bookKey: true,
  label: (n, h) => (h && h[4] && h[4].l) || (n === 0 ? 'Mukaddime' : Number.isInteger(n) ? `No. ${n}` : 'Ara metin'),
  src: (n, m) => `İbn Ebî Şeybe, ${m ? m.tr : ''}${n === 0 ? ', mukaddime' : Number.isInteger(n) ? ', no. ' + n : ''}`,
  note: 'Ebû Bekir İbn Ebî Şeybe (ö. 235) — el-Musannef dışındaki küçük kitapları, Türkçe çeviri ve Arapça metniyle. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshalardan alınmıştır; numaralar bu nüshalara göredir. Kitâbü’l-Îmân ve Kitâbü’l-Edeb’in içeriği büyük ölçüde Musannef’teki aynı adlı kitaplarla örtüşür. Halku Âdem’in dijital nüshası yer yer bozuktur; bozuk yerler çeviride belirtilmiştir.'};
LIBS.berbehari = {base: 'berbehari/', key: 'zikrim-berb', unit: 'kitap', item: 'madde', ex: 25, err: 'Şerhu’s-Sünne', single: true,
  label: n => n ? `Madde ${n}` : 'Mukaddime',
  src: n => `el-Berbehârî, Şerhu’s-Sünne, ${n ? 'madde ' + n : 'mukaddime'}`,
  note: 'Ebû Muhammed el-Hasan b. Ali b. Halef el-Berbehârî (ö. 329), Şerhu’s-Sünne — Türkçe çeviri. Çeviri ve Arapça metin, el-Mektebetü’ş-Şâmile’deki nüshadan (no. 8601) alınmıştır; madde numaraları bu nüshaya göredir. Köşeli parantez [ ] içindeki kısımlar neşirde eklenen yerlerdir. Kitabın Berbehârî’ye nisbeti bazı araştırmacılarca tartışılmıştır.'};
LIBS.acurri = {base: 'acurri/', key: 'zikrim-acurri', unit: 'kitap', item: 'rivayet', ex: 12, err: 'Âcurrî', nogo: true, bookKey: true,
  label: (n, h) => (h && h[4] && h[4].l) || (n === 0 ? 'Mukaddime' : Number.isInteger(n) ? `No. ${n}` : 'Ara metin'),
  src: (n, m) => `el-Âcurrî, ${m ? m.tr : ''}${n === 0 ? ', mukaddime' : Number.isInteger(n) ? ', no. ' + n : ''}`,
  note: 'Ebû Bekir Muhammed b. el-Hüseyin el-Âcurrî (ö. 360) — kitapları, Türkçe çeviri ve Arapça metniyle. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshalardan alınmıştır; numaralar bu nüshalara göredir. “Ara metin” diye gösterilen kısımlar, rivayetlerin arasındaki Âcurrî’nin kendi sözleridir. Kitaplar çevrildikçe sırayla eklenecek.'};
LIBS.seria = {base: 'seria/', key: 'zikrim-seria', unit: 'bölüm', item: 'rivayet', ex: 120, err: 'eş-Şerîa',
  label: (n, h) => n === 0 ? 'Mukaddime' : Number.isInteger(n) ? `No. ${n}` : (h && !h[1] && /^Muhammed b\. el-Hüseyin/.test(h[2]) ? 'Âcurrî’nin sözü' : 'Numarasız kısım'),
  src: n => `el-Âcurrî, eş-Şerîa, ${n === 0 ? 'mukaddime' : Number.isInteger(n) ? 'no. ' + n : 'no. ' + Math.floor(n) + ' sonrası'}`,
  note: 'Ebû Bekir Muhammed b. el-Hüseyin el-Âcurrî (ö. 360), eş-Şerîa — Türkçe çeviri ve Arapça metin. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshadan (no. 13035, 5 cilt) alınmıştır; rivayet numaraları bu nüshaya göredir. Dijital nüshada bulunmayan numaralar atlanmıştır. “Âcurrî’nin sözü” diye gösterilen kısımlar rivayetlerin arasındaki yazarın kendi açıklamalarıdır; “Numarasız kısım”lar nüshada numarası olmayan rivayetlerdir. Kitap, konularına göre 17 bölüme ayrılmıştır.'};
LIBS.ahmed = {base: 'ahmed/', key: 'zikrim-ahmed', unit: 'kitap', item: 'madde', ex: 12, err: 'İmam Ahmed', nogo: true, bookKey: true,
  label: (n, h) => (h && h[4] && h[4].l) || (n === 0 ? 'Mukaddime' : Number.isInteger(n) ? `No. ${n}` : 'Ara metin'),
  src: (n, m) => `İmam Ahmed (\u2068رحمه الله\u2069), ${m ? m.tr : ''}${n === 0 ? ', mukaddime' : Number.isInteger(n) ? ', no. ' + n : ''}`,
  note: 'İmam Ahmed b. Hanbel (\u2068رحمه الله\u2069) (ö. 241) — risaleleri ve ondan nakledilen mesâil, Türkçe çeviri ve Arapça metniyle. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshalardan alınmıştır; numaralar bu nüshalara göredir. Bazı risalelerin İmam Ahmed’e nisbeti bazı araştırmacılarca tartışılmıştır. Müsned ve Usûlü’s-Sünne kütüphanede ayrı kitap olarak yer alır.'};
LIBS.zuhd = {base: 'zuhd/', key: 'zikrim-zuhd', unit: 'bölüm', item: 'rivayet', ex: 1200, err: 'ez-Zühd',
  label: (n, h) => (h && h[4] && h[4].l) || (Number.isInteger(n) ? `No. ${n}` : 'Numarasız rivayet'),
  src: n => `İmam Ahmed (\u2068رحمه الله\u2069), ez-Zühd, ${Number.isInteger(n) ? 'no. ' + n : 'no. ' + Math.floor(n) + ' sonrası'}`,
  note: 'İmam Ahmed b. Hanbel (\u2068رحمه الله\u2069) (ö. 241), ez-Zühd — Türkçe çeviri ve Arapça metin. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshadan (no. 8494, Dârü’l-Kütübi’l-İlmiyye neşri) alınmıştır; rivayet numaraları bu nüshaya göredir. 1 numara, kitabın nüsha senedidir. “Numarasız rivayet” diye gösterilenler nüshada numarası olmayan rivayetlerdir. Kitap, bablarına göre 8 bölüme ayrılmıştır.'};
LIBS.fezail = {base: 'fezail/', key: 'zikrim-fezail', unit: 'bölüm', item: 'rivayet', ex: 1000, err: 'Fezâilü’s-sahâbe',
  label: (n, h) => (h && h[4] && h[4].l) || (n === 0 ? 'Mukaddime' : Number.isInteger(n) ? `No. ${n}` : 'Numarasız rivayet'),
  src: n => `İmam Ahmed (\u2068رحمه الله\u2069), Fezâilü’s-sahâbe, ${n === 0 ? 'mukaddime' : Number.isInteger(n) ? 'no. ' + n : 'no. ' + Math.floor(n) + ' sonrası'}`,
  note: 'İmam Ahmed b. Hanbel (\u2068رحمه الله\u2069) (ö. 241), Fezâilü’s-sahâbe — Türkçe çeviri ve Arapça metin. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshadan (no. 13136, Vasiyyullah Abbas tahkiki, Müessesetü’r-Risâle) alınmıştır; rivayet numaraları bu nüshaya göredir. Mukaddime, kitabın nüsha senedidir. “Numarasız rivayet” diye gösterilenler nüshada numarası olmayan rivayetlerdir. Kitap, bablarına göre 9 bölüme ayrılmıştır.'};
LIBS.hallal = {base: 'hallal/', key: 'zikrim-hallal', unit: 'kitap', item: 'rivayet', ex: 5, err: 'el-Hallâl', nogo: true, bookKey: true,
  label: (n, h) => (h && h[4] && h[4].l) || (n === 0 ? 'Mukaddime' : Number.isInteger(n) ? `No. ${n}` : 'Ara metin'),
  src: (n, m) => `el-Hallâl, ${m ? m.tr : ''}${n === 0 ? ', mukaddime' : Number.isInteger(n) ? ', no. ' + n : ''}`,
  note: 'Ebû Bekir Ahmed b. Muhammed el-Hallâl (ö. 311) — kitapları, Türkçe çeviri ve Arapça metniyle. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshalardan alınmıştır. Nüshasında numara bulunmayan kitaplarda rivayetler sırayla numaralanmıştır. Kitaplar çevrildikçe sırayla eklenecek.'};
for (const [k, L] of Object.entries(LIBS)) {
  Object.assign(L, {view: k, idx: null, book: null, data: null, token: 0, target: null, cache: {}});
  try { const b = JSON.parse(localStorage.getItem(L.key) || 'null'); if (Number.isInteger(b)) L.book = b; } catch (e) {}
}
const MUS = LIBS.musannef;
const libOf = () => LIBS[view];
const libSave = L => { try { localStorage.setItem(L.key, JSON.stringify(L.book)); } catch (e) {} };
async function libFetch(L, p) {
  if (L.cache[p]) return L.cache[p];
  const r = await fetch(L.base + p);
  if (!r.ok) throw new Error(p + ' ' + r.status);
  return (L.cache[p] = await r.json());
}
const libPick = (L, n) => { const c = L.idx && L.book != null && L.idx[L.book]; return c && n >= c.from && n <= c.to ? L.book : L.nogo ? -1 : libBookOf(L, n); };
const libBookOf = (L, n) => L.idx ? L.idx.findIndex(b => n >= b.from && n <= b.to) : -1;

async function renderLib(L) {
  const token = ++L.token;
  const wrap = el('div', 'mus');
  wrap.append(el('p', 'empty', 'Yükleniyor…'));
  cardsEl.append(wrap);
  try {
    L.idx = L.idx || await libFetch(L, 'index.json');
    if (L.book != null && !(L.idx[L.book] && L.idx[L.book].t)) L.book = null;
    if (L.book == null && L.single) L.book = 0;
    if (L.book == null) { if (token === L.token) libRenderBooks(L, wrap); }
    else {
      const meta = L.idx[L.book];
      const data = await libFetch(L, 'tr/' + meta.f);
      if (token !== L.token || view !== L.view) return;
      L.data = data;
      libRenderBook(L, wrap, meta);
    }
  } catch (e) {
    if (token !== L.token) return;
    wrap.replaceChildren(el('p', 'empty', `${L.err} yüklenemedi. İnternet bağlantını kontrol edip tekrar dene (bir kez açılan bölümler sonra çevrimdışı da açılır).`));
  }
  if (token === L.token && view === L.view) applyFilter();
}

function libRenderBooks(L, wrap) {
  wrap.replaceChildren();
  wrap.append(el('article', 'quote fq-note mus-note', L.note), el('div', 'mus-go'));
  let lastG = [];
  L.idx.forEach((b, i) => {
    (b.g || []).forEach((g, d) => {
      if (lastG[d] === g) return;
      lastG = lastG.slice(0, d);
      wrap.append(el('p', 'mus-grp mus-grp' + d, g));
      lastG[d] = g;
    });
    const card = el('button', 'mus-book');
    card.type = 'button';
    card.append(el('span', 'mus-book-tr', b.tr),
      el('small', 'mus-book-n', `${b.n.toLocaleString('tr-TR')} ${L.item}` + (b.b ? ` · ${b.b} bab` : '') + ` · no. ${b.from}–${b.to}` + (b.t >= b.n ? ' · ✓ Türkçe' : b.t ? ` · ${b.t.toLocaleString('tr-TR')}/${b.n.toLocaleString('tr-TR')} çevrildi` : ' · henüz çevrilmedi')));
    if (b.t) card.classList.add('mus-done'); else card.disabled = true;
    card.dataset.search = b.tr;
    card.addEventListener('click', () => libOpen(L, i));
    wrap.append(card);
  });
}

function libOpen(L, i, target = null) {
  L.book = i; L.target = target; libSave(L);
  searchEl.value = '';
  renderCards();
  $('.list').scrollIntoView({block: 'start'});
}

/* Râvi paneli: yalnızca eserin kendi metnindeki bilgiler. h[4] = {c: [isim, sîga, isim, ...], n: [metindeki notlar]} */
const SIGA = {'haddesenâ': 'bize anlattı', 'haddesenî': 'bana anlattı', 'ahberanâ': 'bize haber verdi', 'ahberanî': 'bana haber verdi', 'semi‘tü': 'işittim', 'semi‘a': 'işitti', 'an': '“-den” (an‘ane)', 'enne': '“ki…” diye', 'kâle': 'dedi'};
function libItem(L, h) {
  const [n, sened, metin, ziyade, info, ar] = h;
  const a = el('article', 'mus-h');
  a.id = 'h' + n;
  a.dataset.n = n;
  const lb = L.label ? L.label(n, h) : (ziyade === 3 ? '°' : ziyade === 2 ? '•' : ziyade ? '*' : '#') + n;
  if (L.label) a.dataset.lb = lb;
  a.append(el('p', 'mus-no', lb));
  let box = null;
  if (ar) {
    box = el('div', 'ar-box'); box.lang = 'ar'; box.dir = 'rtl';
    const k = arSplit(ar);
    if (k > 0) box.append(el('p', 'ar-isn', ar.slice(0, k).trim()));
    box.append(el('p', 'ar-mtn', ar.slice(k).trim()));
    box.append(ttsBtn('ar', '▶', () => [{el: box, text: prepAr(TTS.arSened ? ar : ar.slice(k))}], 'tts-i', 'Arapçasını sesli oku'));
    a.append(box);
  }
  const sp = sened ? el('p', 'mus-sened', sened) : null;
  if (sp) a.append(sp);
  const tp = el('p', 'mus-tr', metin);
  const row = el('div', 'tr-row');
  row.append(tp, ttsBtn('tr', '▶', () => [TTS.trSened && sp ? {el: sp, text: prepTr('Sened: ' + sened)} : null, {el: tp, text: prepTr(metin)}], 'tts-i', 'Türkçesini sesli oku'));
  a.append(row);
  if (info && ((info.c && info.c.length > 1) || (info.n && info.n.length))) {
    const d = el('details', 'rv');
    d.append(el('summary', null, 'Râviler ve isnad'));
    d.fill = () => {
      if (d.dataset.done) return; d.dataset.done = 1;
      if (info.c && info.c.length > 1) {
        d.append(el('p', 'rv-h', 'Rivayet sîgaları — her râvi, bir sonrakinden hangi lafızla aldığını söylüyor:'));
        const ol = el('ol', 'rv-chain');
        for (let i = 0; i + 2 < info.c.length + 1 && i + 1 < info.c.length; i += 2) {
          const from = info.c[i], sig = info.c[i + 1], to = info.c[i + 2];
          const li = el('li');
          li.append(el('span', 'rv-n', from), el('span', 'rv-s', sig));
          const g = SIGA[sig.split(' ')[0]];
          if (g && !sig.includes('(')) li.append(el('small', 'rv-g', g));
          if (to && to !== '—') li.append(el('span', 'rv-n', to));
          ol.append(li);
        }
        d.append(ol);
      }
      if (info.n && info.n.length) {
        d.append(el('p', 'rv-h', 'Müsned metnindeki kayıtlar:'));
        const ul = el('ul', 'rv-list');
        for (const x of info.n) ul.append(el('li', null, x));
        d.append(ul);
      }
      d.append(el('p', 'rv-by', 'Yalnızca eserin kendi metninden; râviler hakkında dışarıdan hüküm eklenmemiştir.'));
    };
    d.addEventListener('toggle', () => { if (d.open) d.fill(); });
    a.append(d);
  }
  const meta = L.idx && L.book != null ? L.idx[L.book] : null;
  a.append(el('p', 'q-src', L.src(n, meta)));
  a.append(starBtn(L.view + ':' + (L.bookKey ? L.book + ':' : '') + n, () => ({v: L.view, b: L.book, h, title: meta ? meta.tr : ''})));
  return a;
}

function libRenderBook(L, wrap, meta) {
  wrap.replaceChildren();
  const head = el('div', 'mus-head');
  const back = el('button', 'chip-button', L.unit === 'bölüm' ? '← Bölümler' : '← Kitaplar');
  back.type = 'button';
  if (L.single) back.hidden = true;
  back.addEventListener('click', () => { L.book = null; libSave(L); searchEl.value = ''; renderCards(); });
  const cnt = L.data.babs.reduce((s, b) => s + b.h.length, 0);
  head.append(back, el('h3', null, meta.tr), el('small', 'mus-book-n', `${cnt.toLocaleString('tr-TR')} ${L.item}` + (L.data.babs.length > 1 ? ` · ${L.data.babs.length} bab` : '')), fsBar());
  wrap.append(head);
  if (L.single && L.note) wrap.append(el('article', 'quote fq-note mus-note', L.note));
  wrap.append(el('div', 'mus-go'), el('div', 'mus-results'));
  const list = el('div', 'mus-babs');
  const single = L.data.babs.length === 1;
  L.data.babs.forEach(b => {
    const d = el('details', 'fq-cat mus-bab');
    const sum = el('summary');
    sum.append(el('span', 'mus-bab-tr', b.t || 'Kitabın başı'), el('small', null, `${b.h.length}`));
    d.append(sum);
    d.fill = () => { if (!d.dataset.done) { d.dataset.done = 1; for (const h of b.h) d.append(libItem(L, h)); } };
    d.addEventListener('toggle', () => { if (d.open) d.fill(); });
    list.append(d);
    if (single) { d.fill(); d.open = true; }
  });
  wrap.append(list);
  const book = L.book;
  trackRead(list, a => ({v: L.view, b: book, n: +a.dataset.n, title: meta.tr, label: a.dataset.lb || 'no. ' + a.dataset.n}));
  if (L.target != null) {
    const n = L.target; L.target = null;
    const bi = L.data.babs.findIndex(b => b.h.some(x => x[0] === n));
    if (bi >= 0) {
      list.children[bi].fill();
      list.children[bi].open = true;
      flashTo('h' + n);
    }
  }
}

function libGoHint(L, box, n) {
  box.replaceChildren();
  if (!n) return;
  const bi = libPick(L, n);
  if (bi < 0 && L.nogo) return;
  if (bi < 0) { box.append(el('p', 'empty', `No. ${n} henüz eklenmedi.`)); return; }
  if (!L.idx[bi].t) { box.append(el('p', 'mus-count', `#${n} · ${L.idx[bi].tr} — bu bölüm henüz çevrilmedi.`)); return; }
  const b = el('button', 'chip-button mus-go-btn', `#${n} · ${L.idx[bi].tr} → Git`);
  b.type = 'button';
  b.addEventListener('click', () => libOpen(L, bi, n));
  box.append(b);
}

function libFilter(L) {
  const raw = searchEl.value.trim();
  const num = /^\d+$/.test(raw) ? +raw : 0;
  const q = num ? '' : musQ(raw);
  document.body.classList.toggle('filtering', !!raw);
  const go = cardsEl.querySelector('.mus-go');
  if (go) libGoHint(L, go, num);
  $('#noResult').hidden = true;
  if (!cardsEl.querySelector('.mus-babs')) {
    let shown = 0;
    for (const c of cardsEl.querySelectorAll('.mus-book')) { const hit = !q || musQ(c.dataset.search).includes(q); c.hidden = !hit; if (hit) shown++; }
    for (const g of cardsEl.querySelectorAll('.mus-grp')) g.hidden = !!raw;
    const note = cardsEl.querySelector('.mus-note');
    if (note) note.hidden = !!raw;
    $('#noResult').hidden = !q || shown > 0;
    return;
  }
  const babs = cardsEl.querySelector('.mus-babs');
  const res = cardsEl.querySelector('.mus-results');
  if (!L.data) return;
  res.replaceChildren();
  babs.hidden = !!q;
  if (!q) return;
  const hits = [];
  for (const b of L.data.babs) {
    const bt = musQ(b.t);
    for (const h of b.h) if (bt.includes(q) || musQ(h[1] + ' ' + h[2]).includes(q)) hits.push(h);
  }
  res.append(el('p', 'mus-count', hits.length ? `${hits.length} ${L.item} bulundu` + (hits.length > 150 ? ' (ilk 150 gösteriliyor)' : '') : 'Bu bölümde sonuç yok.'));
  for (const h of hits.slice(0, 150)) res.append(libItem(L, h));
}

/* ---------- Kütüphane: okumaya devam et, kaydettiklerim, yazı boyutu ---------- */
const store = {get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }};
const RD = {last: store.get('zikrim-last', {}), saved: store.get('zikrim-saved', []), fs: store.get('zikrim-fs', 16)};
// Bir kereye mahsus: el-Akîde (İmam Ahmed kitaplığında 1. sıra) kaldırıldı; sonraki kitapların sıra numarası bir azalır
if (!store.get('zikrim-ahmed-akide', false)) {
  const sh = b => b === 1 ? null : b > 1 ? b - 1 : b;
  if (RD.last.ahmed && Number.isInteger(RD.last.ahmed.b)) { const b = sh(RD.last.ahmed.b); if (b == null) delete RD.last.ahmed; else RD.last.ahmed.b = b; }
  RD.saved = RD.saved.filter(x => !(x && x.v === 'ahmed' && x.b === 1)).map(x => {
    if (!x || x.v !== 'ahmed' || !(x.b > 1)) return x;
    const b = x.b - 1; return {...x, b, k: `ahmed:${b}:${x.h ? x.h[0] : x.k.split(':').pop()}`};
  });
  if (Number.isInteger(LIBS.ahmed.book)) { LIBS.ahmed.book = sh(LIBS.ahmed.book); libSave(LIBS.ahmed); }
  store.set('zikrim-last', RD.last); store.set('zikrim-saved', RD.saved); store.set('zikrim-ahmed-akide', true);
}
/* ---------- Sesli okuma (telefonun kendi sesleri; Arapça ve Türkçe) ---------- */
const TTS = Object.assign({ar: '', tr: '', rate: 0.9, arSened: true, trSened: false, show: true}, store.get('sekine-tts', {}));
document.body.classList.toggle('no-tts', !TTS.show);
let AR_SHOW = store.get('sekine-ar-show', true);
document.body.classList.toggle('no-ar', !AR_SHOW);
const ttsSave = () => store.set('sekine-tts', TTS);
const SYN = window.speechSynthesis || null;
let VOICES = [];
const vLang = (v, l) => v.lang.toLowerCase().replace('_', '-').startsWith(l);
const vRank = v => /premium/i.test(v.voiceURI + v.name) ? 0 : /enhanced|gelişmiş|geliştirilmiş/i.test(v.voiceURI + v.name) ? 1 : 2;
const vLabel = v => v.name.replace(/\s*\((enhanced|premium|gelişmiş|geliştirilmiş)\)/i, '') + (vRank(v) === 0 ? ' (Premium)' : vRank(v) === 1 ? ' (Gelişmiş)' : '') + ` · ${v.lang}`;
// Tercih: yüksek kaliteli (Premium > Gelişmiş) erkek sesler; Türkçede Yelda listeden çıkarıldı
const TTS_MALE = {ar: /maged|majed|tarik|tariq/i, tr: /\bcem\b/i};
const TTS_HIDE = {ar: null, tr: /yelda/i};
const TTS_WANT = {ar: 'Majed', tr: 'Cem'};
const vMale = (v, l) => TTS_MALE[l].test(v.name + ' ' + v.voiceURI) ? 0 : 1;
function ttsVoices(l) { return VOICES.filter(v => vLang(v, l) && !(TTS_HIDE[l] && TTS_HIDE[l].test(v.name + ' ' + v.voiceURI))).sort((a, b) => vRank(a) - vRank(b) || vMale(a, l) - vMale(b, l) || a.name.localeCompare(b.name)); }
const IS_ANDROID = /android/i.test(navigator.userAgent);
function ttsInfo(l) {
  const best = ttsVoices(l)[0], lang = l === 'ar' ? 'Arapça' : 'Türkçe', want = TTS_WANT[l];
  if (!SYN) return 'Bu cihaz sesli okumayı desteklemiyor.';
  const seen = VOICES.filter(v => vLang(v, l)).map(v => v.name);
  const seenTxt = ` (Uygulamanın gördüğü ${lang} sesler: ${seen.length ? seen.join(', ') : 'yok'})`;
  if (ttsVoice(l) === 'system') {
    return IS_ANDROID ? `Telefonun varsayılan ${lang} sesi kullanılıyor.${seenTxt}`
      : `Telefonun varsayılan ${lang} sesi kullanılıyor. ${want} sesinin çalması için iPhone Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler → ${lang} bölümünde ${want}’i seç (yanında ✓ olsun).${seenTxt}`;
  }
  if (IS_ANDROID) {
    const how = `Android’de: Ayarlar → Erişilebilirlik → Metin okuma (yazıdan konuşmaya) çıkışı → Tercih edilen motor: Google → ⚙ → Ses verilerini yükle → ${lang} → bir erkek ses seç ve indir. (Samsung’da: Ayarlar → Genel yönetim → Metin okuma.) Seçtiğin ses burada otomatik kullanılır.`;
    return best ? `Kullanılan: ${vLabel(best).split(' · ')[0]}. ${how}` : `Yüklü ${lang} ses yok. ${how}`;
  }
  const how = `iPhone Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler → ${lang} → ${want} → “Premium” ya da “Gelişmiş” sürümü indir.`;
  if (!best) return `Yüklü ${lang} erkek ses yok. ${how}`;
  if (vRank(best) < 2 && vMale(best, l) === 0) return `✓ Yüksek kaliteli ses hazır: ${vLabel(best).split(' · ')[0]}`;
  return `Daha doğal ses için: ${how}`;
}
// 'system': ses adı verilmeden yalnızca dil ile okunur; telefon ayarlarında o dil için seçili ses (ör. Cem) kullanılır
function ttsVoice(l) {
  if (SYN) { const v = SYN.getVoices(); if (v.length) VOICES = v; }
  if (TTS[l] === 'system') return 'system';
  const list = ttsVoices(l);
  const chosen = TTS[l] && list.find(v => v.voiceURI === TTS[l]);
  if (chosen) return chosen;
  return list.find(v => vMale(v, l) === 0) || (l === 'ar' && list[0]) || 'system';
}
const ttsLangCode = l => { const v = VOICES.find(x => vLang(x, l)); return v ? v.lang : (l === 'ar' ? 'ar-SA' : 'tr-TR'); };
function ttsLoadVoices() { VOICES = SYN ? SYN.getVoices() : []; ttsFillSettings(); }
if (SYN) { ttsLoadVoices(); SYN.addEventListener ? SYN.addEventListener('voiceschanged', ttsLoadVoices) : (SYN.onvoiceschanged = ttsLoadVoices); }

// Arapça metinde senedin bittiği yer: baştaki rivayet zinciri (haddesenâ/an…) ve ardından gelen "kâle/enne"
const AR_DIA = /[ً-ْٰـ]/;
function arSplit(ar) {
  let t = '';
  const idx = [];
  for (let i = 0; i < ar.length; i++) if (!AR_DIA.test(ar[i])) { t += ar[i]; idx.push(i); }
  const ms = [...t.matchAll(/(?:^|[\s،,:])(عن|حدثنا|حدثني|أخبرنا|أخبرني|أنبأنا|سمعت|سمع|ثنا|نا)\s/g)];
  if (!ms.length || ms[0].index > 40) return 0;
  const endOf = m => m.index + m[0].length;
  let last = ms[0];
  for (const m of ms.slice(1)) {
    if (m.index - endOf(last) > 70) break;
    if (m[1] === 'عن' && /(?:قال|قالت|يقول|تقول)\s*:/.test(t.slice(endOf(last), m.index))) break;
    last = m;
  }
  const END = /(?:^|[\s،,])(?:قال|قالت|يقول|تقول|يحدث|يخبر|أنه|أنها|أن)\s*:?\s/g;
  END.lastIndex = endOf(last);
  const e = END.exec(t);
  if (!e || e.index - endOf(last) > 90) return 0;
  const k = e.index + e[0].length;
  return k < idx.length ? idx[k] : 0;
}
const prepTr = t => String(t).replace(/ﷺ/g, ' sallallâhu aleyhi ve sellem ').replace(/\s*→\s*/g, ', ondan, ').replace(/\bb\.\s/g, 'bin ').replace(/[“”«»"⁨⁩]/g, '').replace(/\\n/g, ' ');
const prepAr = t => String(t).replace(/\[[^\]]*\]/g, ' ').replace(/[«»"{}()﴿﴾]/g, ' ').replace(/\s+/g, ' ').trim();
// iOS uzun cümleleri yarıda kesebildiği için metni noktalama yerlerinden parçalara böl
function chunks(t, max = 180) {
  const out = [];
  const pieces = [];
  for (const s of t.replace(/([.!?؟;؛:،,])\s+/g, '$1\u0001').split('\u0001')) {
    if (s.length <= max) { pieces.push(s); continue; }
    let cur = '';
    for (const w of s.split(/\s+/)) { if (cur && (cur + ' ' + w).length > max) { pieces.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; }
    if (cur) pieces.push(cur);
  }
  for (const s of pieces) {
    if (out.length && (out[out.length - 1] + ' ' + s).length <= max) out[out.length - 1] += ' ' + s; else out.push(s);
  }
  return out.filter(x => x.trim());
}
// Bir parçanın en az ne kadar sürmesi gerektiği (hareke sayılmadan); bundan çok önce biten okuma "okunamadı" sayılır
const minSpeakMs = (c, rate) => { const n = c.replace(/[\u064B-\u0652\u0670\u0640\s]/g, '').length; return n < 8 ? 0 : n * 30 / rate; };
const TTSP = {run: null};
function ttsStop() {
  if (SYN && (SYN.speaking || SYN.pending)) { SYN.cancel(); TTSP.cancelledAt = Date.now(); }
  if (TTSP.run) TTSP.run.cancelled = true;
  TTSP.run = null;
  document.querySelectorAll('.tts-on').forEach(e => e.classList.remove('tts-on'));
  document.querySelectorAll('.tts-b.playing').forEach(b => { b.classList.remove('playing'); b.textContent = b.dataset.label; });
  $('#ttsBar').hidden = true;
  try { TTSP.wake && TTSP.wake.release(); } catch {}
  TTSP.wake = null;
}
// Sıradaki okuma kartı (aynı dilde düğmesi olan); bab bitince sonraki babı açar
function ttsNext(btn, lang) {
  const sel = `.tts-b[data-lang="${lang}"]`;
  const art = btn.closest('article');
  if (!art) return null;
  for (let n = art.nextElementSibling; n; n = n.nextElementSibling) { const b = n.querySelector && n.querySelector(sel); if (b) return b; }
  const d = art.parentElement && art.parentElement.closest('details');
  for (let nd = d && d.nextElementSibling; nd; nd = nd.nextElementSibling) {
    if (nd.fill) nd.fill();
    const b = nd.querySelector && nd.querySelector(sel);
    if (b) { nd.open = true; return b; }
  }
  return null;
}
function ttsPlay(btn, lang, parts) {
  const again = btn.classList.contains('playing');
  ttsStop();
  if (again) return;
  if (!SYN) { toast('Bu cihaz sesli okumayı desteklemiyor'); return; }
  const voice = ttsVoice(lang);
  const queue = [];
  for (const p of parts) if (p && p.text && p.text.trim()) for (const c of chunks(p.text)) queue.push({el: p.el, c});
  if (!queue.length) return;
  const run = {cancelled: false, sys: !!(TTSP.forceSys && TTSP.forceSys[lang])};
  TTSP.run = run;
  btn.classList.add('playing'); btn.textContent = btn.classList.contains('tts-i') ? '■' : '■ Durdur';
  const art = btn.closest('article'), no = art && art.querySelector('.mus-no');
  $('#ttsBarT').textContent = `${lang === 'ar' ? 'Arapça' : 'Türkçe'} okunuyor${no ? ' · ' + no.textContent.split(' · ')[0] : ''} — bitince sıradakine geçer`;
  $('#ttsBar').hidden = false;
  if (!TTSP.wake && navigator.wakeLock) navigator.wakeLock.request('screen').then(w => { if (TTSP.run) TTSP.wake = w; else w.release(); }).catch(() => {});
  let i = 0;
  const next = () => {
    if (run.cancelled) return;
    document.querySelectorAll('.tts-on').forEach(e => e.classList.remove('tts-on'));
    if (i >= queue.length) {
      // Bu kart bitti: aynı dilde sıradaki rivayete geç (Durdur'a basılana kadar)
      const nb = ttsNext(btn, lang);
      if (!nb) { ttsStop(); toast('Sesli okuma bitti'); return; }
      setTimeout(() => {
        if (run.cancelled || TTSP.run !== run) return;
        const w = TTSP.wake; TTSP.wake = null; // ekran kilidi açık kalsın
        nb.closest('article').scrollIntoView({block: 'center', behavior: 'smooth'});
        nb.click();
        if (w) { if (TTSP.run) TTSP.wake = w; else try { w.release(); } catch {} }
      }, 600);
      return;
    }
    const q = queue[i++];
    if (q.el) { q.el.classList.add('tts-on'); const d = q.el.closest('details'); if (d && !d.open) d.open = true; }
    say(q, 0);
  };
  // Bir parçayı oku; ses parçayı okumadan hemen bitirirse önce telefonun varsayılan sesiyle bir kez daha dene, olmazsa dur
  const say = (q, tries) => {
    const u = new SpeechSynthesisUtterance(q.c);
    if (run.sys || voice === 'system') u.lang = ttsLangCode(lang); else { u.voice = voice; u.lang = voice.lang; }
    u.rate = TTS.rate;
    const t0 = Date.now();
    u.onend = () => {
      if (run.cancelled) return;
      if (Date.now() - t0 < minSpeakMs(q.c, TTS.rate)) {
        if (tries === 0 && !run.sys && voice !== 'system') { run.sys = true; TTSP.forceSys = Object.assign(TTSP.forceSys || {}, {[lang]: true}); say(q, 1); return; }
        if (tries < 2) { setTimeout(() => !run.cancelled && say(q, tries + 1), 300); return; }
        ttsStop();
        toast(`${lang === 'ar' ? 'Arapça' : 'Türkçe'} ses bu metni okuyamadı — Ayarlar → Sesli okuma'dan başka bir ses seç`);
        return;
      }
      next();
    };
    u.onerror = e => { if (!run.cancelled && e.error !== 'interrupted' && e.error !== 'canceled') { ttsStop(); toast('Sesli okuma durdu: ' + e.error); } };
    SYN.speak(u);
  };
  // iOS: cancel() hemen ardından speak() yeni okumayı da kesebiliyor; kısa bir ara ver
  const wait = TTSP.cancelledAt && Date.now() - TTSP.cancelledAt < 250 ? 250 : 0;
  setTimeout(() => { if (!run.cancelled) next(); }, wait);
}
// Bir okuma kartına "▶ Arapça" / "▶ Türkçe" düğmeleri: parts() o anki ayarlara göre okunacakları verir
function ttsBtn(lang, label, parts, cls, aria) {
  const b = el('button', 'tts-b' + (cls ? ' ' + cls : ''), label);
  b.type = 'button'; b.dataset.label = label; b.dataset.lang = lang;
  if (aria) b.setAttribute('aria-label', aria);
  b.addEventListener('click', () => ttsPlay(b, lang, parts()));
  return b;
}
function ttsRow(map) {
  const row = el('div', 'tts-row');
  for (const [lang, label, parts] of map) row.append(ttsBtn(lang, label, parts));
  return row;
}
function ttsFillSettings() {
  for (const [id, l] of [['#ttsAr', 'ar'], ['#ttsTr', 'tr']]) {
    const s = $(id);
    if (!s) continue;
    const list = ttsVoices(l);
    const sys = el('option', null, IS_ANDROID ? 'Telefonun varsayılan sesi' : 'iPhone ayarlarında seçili ses');
    sys.value = 'system';
    s.replaceChildren(sys, ...list.map(v => { const o = el('option', null, vLabel(v)); o.value = v.voiceURI; return o; }));
    const cur = ttsVoice(l);
    s.value = cur === 'system' ? 'system' : cur.voiceURI;
  }
  const r = $('#ttsRate');
  if (r) { r.value = TTS.rate; $('#ttsRateOut').textContent = Number(TTS.rate).toFixed(2).replace('.', ',') + '×'; }
  if ($('#ttsShow')) $('#ttsShow').checked = TTS.show;
  if ($('#ttsArSened')) { $('#ttsArSened').checked = TTS.arSened; $('#ttsTrSened').checked = TTS.trSened; }
  if ($('#ttsArInfo')) { $('#ttsArInfo').textContent = ttsInfo('ar'); $('#ttsTrInfo').textContent = ttsInfo('tr'); }
}

const applyFs = () => document.documentElement.style.setProperty('--rd', RD.fs + 'px');
applyFs();
function fsBar() {
  const bar = el('div', 'rd-tools');
  const lab = el('span', 'rd-fs', RD.fs + ' px');
  const mk = (t, d, aria) => { const b = el('button', 'chip-button', t); b.type = 'button'; b.setAttribute('aria-label', aria); b.addEventListener('click', () => { RD.fs = Math.max(13, Math.min(26, RD.fs + d)); store.set('zikrim-fs', RD.fs); applyFs(); lab.textContent = RD.fs + ' px'; }); return b; };
  bar.append(mk('A−', -1, 'Yazıyı küçült'), lab, mk('A+', 1, 'Yazıyı büyüt'));
  return bar;
}
let flashQuiet = false; // sekmeye geri dönerken okunan yere vurgusuz gidilir
function flashTo(id) {
  const quiet = flashQuiet; flashQuiet = false;
  requestAnimationFrame(() => { const it = document.getElementById(id); if (it) { it.scrollIntoView({block: 'center'}); if (quiet) return; it.classList.add('flash'); setTimeout(() => it.classList.remove('flash'), 1800); } });
}
let readObs = null, readTimer = 0;
function trackRead(root, info) {
  if (readObs) readObs.disconnect();
  if (!('IntersectionObserver' in window)) return;
  readObs = new IntersectionObserver(es => {
    for (const e of es) if (e.isIntersecting && e.target.dataset.n != null) {
      const x = info(e.target); x.at = Date.now();
      RD.last[x.v] = x;
      clearTimeout(readTimer); readTimer = setTimeout(() => store.set('zikrim-last', RD.last), 600);
    }
  }, {rootMargin: '-35% 0px -55% 0px'});
  const watch = () => root.querySelectorAll('.mus-h').forEach(a => { if (!a.dataset.obs) { a.dataset.obs = 1; readObs.observe(a); } });
  watch();
  new MutationObserver(watch).observe(root, {childList: true, subtree: true});
}
const isSaved = k => RD.saved.some(x => x.k === k);
function starBtn(k, make) {
  const b = el('button', 'star');
  b.type = 'button';
  const paint = () => { const on = isSaved(k); b.textContent = on ? '★' : '☆'; b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? 'Kaydettiklerimden çıkar' : 'Kaydet'); };
  paint();
  b.addEventListener('click', e => {
    e.stopPropagation();
    if (isSaved(k)) RD.saved = RD.saved.filter(x => x.k !== k);
    else RD.saved.unshift(Object.assign({k, at: Date.now()}, make()));
    store.set('zikrim-saved', RD.saved);
    paint();
    const c = $('#cntSaved'); if (c) c.textContent = RD.saved.length;
  });
  return b;
}
/* ---------- Ana sayfa: rivayetler (bütün kitaplardan rastgele) ve kaldığın yer ---------- */
const fnv = t => { let h = 2166136261; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
let DAILY = null, dailyPick = null;
// Ana sayfadaki rivayet: önce kitaplık, sonra rivayet rastgele seçilir (büyük kitaplar küçükleri gölgelemesin); ↻ ile değiştirilir, ☆ ile kaydedilir
function dailyRandom() {
  const libs = Object.keys(DAILY).filter(v => LIBS[v] && DAILY[v].h && DAILY[v].h.length);
  if (!libs.length) return null;
  for (let i = 0; i < 6; i++) {
    const v = libs[Math.floor(Math.random() * libs.length)];
    const it = DAILY[v].h[Math.floor(Math.random() * DAILY[v].h.length)];
    const p = {v, b: it[0], n: it[1], t: it[2]};
    if (!dailyPick || p.v !== dailyPick.v || p.b !== dailyPick.b || p.n !== dailyPick.n) return p;
  }
  return null;
}
async function renderDaily(next = false) {
  try { if (!DAILY) { const r = await fetch('gunun.json'); if (!r.ok) return; DAILY = await r.json(); } } catch { return; }
  if (!dailyPick || next) { const p = dailyRandom(); if (p) dailyPick = p; }
  if (!dailyPick) return;
  const {v, b, n, t} = dailyPick;
  const L = LIBS[v], book = DAILY[v].books[b];
  $('#dailyT').textContent = t;
  $('#dailySrc').textContent = (L.bookKey ? L.src(n, {tr: book}) : L.single ? L.src(n) : L.src(n) + ' · ' + book) + ' ›';
  $('#dailySrc').onclick = () => goTo(v, b, n);
  const nx = $('#dailyNext'); if (nx) nx.onclick = () => renderDaily(true);
  const k = v + ':' + (L.bookKey ? b + ':' : '') + n, st = $('#dailyStar');
  const paint = () => { const on = isSaved(k); st.textContent = on ? '★' : '☆'; st.setAttribute('aria-pressed', String(on)); st.setAttribute('aria-label', on ? 'Kaydettiklerimden çıkar' : 'Kaydet'); };
  paint();
  st.onclick = async () => {
    if (isSaved(k)) RD.saved = RD.saved.filter(x => x.k !== k);
    else {
      try {
        const L = LIBS[v]; L.idx = L.idx || await libFetch(L, 'index.json');
        const meta = L.idx[b]; const data = await libFetch(L, 'tr/' + meta.f);
        let h = null; for (const bb of data.babs) { h = bb.h.find(x => x[0] === n); if (h) break; }
        if (!h) return;
        RD.saved.unshift({k, at: Date.now(), v, b, h, title: meta.tr});
      } catch (e) { toast('Kaydedilemedi; internet bağlantını kontrol et'); return; }
      toast('Kaydettiklerime eklendi');
    }
    store.set('zikrim-saved', RD.saved); paint();
  };
  $('#daily').hidden = false;
}
function renderResume() {
  const x = Object.values(RD.last).filter(x => x && x.v).sort((a, b) => b.at - a.at)[0];
  const btn = $('#resume');
  if (!x) { btn.hidden = true; return; }
  btn.replaceChildren(el('span', 'resume-h', '📚 KALDIĞIN YER'), el('span', 'resume-t', `${LIB_NAMES[x.v]}${x.v !== 'usul' && x.title ? ' · ' + x.title.replace(/ \(.*\)$/, '') : ''}`), el('small', null, x.label + ' · Devam et ›'));
  btn.onclick = () => goTo(x.v, x.b, x.n);
  btn.hidden = false;
}
function goTo(v, b, n) {
  if (v === 'usul') { USUL_TARGET = n; view = 'usul'; }
  else { const L = LIBS[v]; L.book = b; L.target = n; libSave(L); view = v; }
  searchEl.value = '';
  renderCards();
  $('.list').scrollIntoView({block: 'start'});
}
const LIB_NAMES = {musannef: 'el-Musannef', ibnebiseybe: 'İbn Ebî Şeybe', musned: 'el-Müsned', usul: 'Usûlü’s-Sünne', ahmed: 'İmam Ahmed', zuhd: 'ez-Zühd', fezail: 'Fezâilü’s-sahâbe', berbehari: 'Şerhu’s-Sünne', acurri: 'el-Âcurrî', seria: 'eş-Şerîa', hallal: 'el-Hallâl'};
const SHELVES = [
  {c: 'II. ASIR', books: [
    {v: 'musannef', ar: 'المصنف', t: 'el-Musannef', who: 'İbn Ebî Şeybe', bo: '159', d: 235, col: '#4d8062'},
    {v: 'ibnebiseybe', b: 0, ar: 'خلق آدم وولادة النبي', t: 'Halku Âdem ve vilâdetü’n-Nebî', who: 'İbn Ebî Şeybe', bo: '159', d: 235, col: '#6e5a3a', done: true},
    {v: 'ibnebiseybe', b: 1, ar: 'كتاب الإيمان', t: 'Kitâbü’l-Îmân', who: 'İbn Ebî Şeybe', bo: '159', d: 235, col: '#3e6a55', done: true},
    {v: 'ibnebiseybe', b: 2, ar: 'كتاب الأدب', t: 'Kitâbü’l-Edeb', who: 'İbn Ebî Şeybe', bo: '159', d: 235, col: '#7a4f3a', done: true},
    {v: 'musned', ar: 'المسند', t: 'el-Müsned', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#8a5a3c', total: 27647},
    {v: 'usul', ar: 'أصول السنة', t: 'Usûlü’s-Sünne', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#3f5f7f', done: true},
    {v: 'ahmed', b: 0, ar: 'من سؤالات الأثرم', t: 'el-Esrem’in Sorularından', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#5b6e3a', done: true},
    {v: 'ahmed', b: 1, ar: 'أحكام النساء', t: 'Ahkâmü’n-nisâ', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#7a4f5e', done: true},
    {v: 'ahmed', b: 2, ar: 'الأسامي والكنى', t: 'el-Esâmî ve’l-künâ', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#6a5a3a', done: true},
    {v: 'ahmed', b: 3, ar: 'الرد على الجهمية والزنادقة', t: 'er-Red ale’l-Cehmiyye', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#4f4a6e', done: true},
    {v: 'ahmed', b: 4, ar: 'الأشربة', t: 'el-Eşribe', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#6e3f4a', done: true},
    {v: 'ahmed', b: 5, ar: 'من كلامه في العلل والرجال — رواية المروذي', t: 'İlel ve ricâl (el-Merrûzî)', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#5a6e3f', done: true},
    {v: 'ahmed', b: 6, ar: 'من كلامه في العلل والرجال — رواية صالح', t: 'İlel ve ricâl (Sâlih)', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#6e573f', done: true},
    {v: 'ahmed', b: 7, ar: 'من كلامه في العلل والرجال — رواية الميموني', t: 'İlel ve ricâl (el-Meymûnî)', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#3f5a6e', done: true},
    {v: 'ahmed', b: 8, ar: 'سؤالات أبي داود', t: 'Suâlâtü Ebî Dâvûd', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#6b4a5e', done: true},
    {v: 'zuhd', ar: 'الزهد', t: 'ez-Zühd', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#4f6a3c', done: true},
    {v: 'fezail', ar: 'فضائل الصحابة', t: 'Fezâilü’s-sahâbe', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#7a5530', done: true}]},
  {c: 'III. ASIR', books: [
    {v: 'berbehari', ar: 'شرح السنة', t: 'Şerhu’s-Sünne', who: 'el-Berbehârî', bo: '233?', d: 329, col: '#6b4f7a', done: true},
    {v: 'hallal', b: 0, ar: 'القراءة عند القبور', t: 'el-Kırâe inde’l-kubûr', who: 'el-Hallâl', bo: '234', d: 311, col: '#3d6f6a', done: true},
    {v: 'hallal', b: 1, ar: 'الحث على التجارة والصناعة والعمل', t: 'el-Hass ale’t-ticâre', who: 'el-Hallâl', bo: '234', d: 311, col: '#7a6236', done: true},
    {v: 'hallal', b: 2, ar: 'الأمر بالمعروف والنهي عن المنكر', t: 'el-Emr bi’l-ma‘rûf', who: 'el-Hallâl', bo: '234', d: 311, col: '#3f6b4f', done: true},
    {v: 'seria', ar: 'الشريعة', t: 'eş-Şerîa', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#2f6b66', done: true},
    {v: 'acurri', b: 0, ar: 'أخلاق أهل القرآن', t: 'Ahlâku Ehli’l-Kur’ân', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#9a7b34', done: true},
    {v: 'acurri', b: 1, ar: 'الأربعون حديثا', t: 'el-Erbaûn', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#7a4a52', done: true},
    {v: 'acurri', b: 2, ar: 'مسألة الطائفين', t: 'Mes’eletü’t-tâifîn', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#4a6b8a', done: true},
    {v: 'acurri', b: 3, ar: 'أدب النفوس', t: 'Edebü’n-nüfûs', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#7d6a3a', done: true},
    {v: 'acurri', b: 4, ar: 'فضل قيام الليل والتهجد', t: 'Fazlu kıyâmi’l-leyl', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#33496b', done: true},
    {v: 'acurri', b: 5, ar: 'تحريم النرد والشطرنج والملاهي', t: 'Tahrîmü’n-nerd ve’ş-şıtranc', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#6b3f3f', done: true},
    {v: 'acurri', b: 6, ar: 'ذم اللواط', t: 'Zemmü’l-livât', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#5a4a6e', done: true},
    {v: 'acurri', b: 7, ar: 'أخبار عمر بن عبد العزيز', t: 'Ahbâru Ömer b. Abdilazîz', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#476b4a', done: true},
    {v: 'acurri', b: 8, ar: 'الغرباء', t: 'el-Gurabâ', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#5e4b3c', done: true},
    {v: 'acurri', b: 9, ar: 'الفوائد المنتخبة', t: 'el-Fevâidü’l-müntehabe', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#3f5e6e', done: true},
    {v: 'acurri', b: 10, ar: 'فرض طلب العلم', t: 'Farzu talebi’l-ilm', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#6e5d3f', done: true},
    {v: 'acurri', b: 11, ar: 'أخلاق العلماء', t: 'Ahlâku’l-ulemâ', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#2f5a6b', done: true}]}
];
function libSub(v, span) {
  const L = LIBS[v];
  const fill = () => {
    const done = L.idx.filter(b => b.t);
    const t = L.idx.reduce((s, b) => s + (b.t || 0), 0);
    span.textContent = `${t.toLocaleString('tr-TR')} ${L.item} Türkçe · ` + (v === 'musannef' ? `${done.length} / ${L.idx.length} kitap` : done.map(b => b.tr.replace(/ Müsnedi$/, '').replace(/ (b\.|es-).*$/, '') + (b.t >= b.n ? ' ✓' : '')).join(' · '));
  };
  if (L.idx) fill(); else libFetch(L, 'index.json').then(x => { L.idx = x; fill(); }).catch(() => {});
}
function openLib(v) { if (LIBS[v]) LIBS[v].book = null; setView(v); }
function renderLibrary() {
  const last = Object.values(RD.last).filter(x => x && x.v).sort((a, b) => b.at - a.at).slice(0, 3);
  if (last.length) {
    const sec = el('section', 'lib-cont');
    sec.append(el('p', 'lib-h', 'OKUMAYA DEVAM ET'));
    for (const x of last) {
      const b = el('button', 'lib-resume');
      b.type = 'button';
      b.append(el('span', 'lib-resume-t', `${LIB_NAMES[x.v]}${x.v !== 'usul' && x.title ? ' · ' + x.title.replace(/ \(.*\)$/, '') : ''}`), el('small', null, 'Kaldığın yer: ' + x.label));
      b.addEventListener('click', () => goTo(x.v, x.b, x.n));
      sec.append(b);
    }
    sec.dataset.search = '';
    cardsEl.append(sec);
  }
  const sv = el('button', 'lib-saved');
  sv.type = 'button';
  const c = el('small', null); c.id = 'cntSaved'; c.textContent = RD.saved.length;
  sv.append(el('span', null, '☆ Kaydettiklerim'), c);
  sv.addEventListener('click', () => setView('kaydedilen'));
  sv.dataset.search = 'kaydettiklerim kaydedilen yer imi';
  cardsEl.append(sv);
  for (const sh of SHELVES) {
    const sec = el('section', 'lib-shelf');
    const hd = el('div', 'shelf-h');
    hd.append(el('span', null, sh.c), el('small', null, 'doğum asrı (hicrî) · ' + sh.books.length + ' kitap'));
    const row = el('div', 'shelf-row');
    for (const bk of sh.books) {
      const b = el('button', 'cover');
      b.type = 'button';
      b.style.setProperty('--cv', bk.col);
      const ar = el('span', 'cover-ar', bk.ar); ar.lang = 'ar'; ar.dir = 'rtl';
      const who = el('small', 'cover-who', bk.who + ' ');
      const r = el('bdi', 'rah', RAH); r.lang = 'ar'; r.dir = 'rtl';
      const rw = el('span', 'nowrap', '('); rw.append(r, ')');
      who.append(rw, el('span', 'cover-d', (bk.bo ? 'd. ' + bk.bo + ' · ' : '') + (bk.d ? 'ö. ' + bk.d : '')));
      const bar = el('span', 'cover-bar'), fill = el('i'); bar.append(fill);
      const pct = el('small', 'cover-pct', bk.done ? '✓ tamam' : '…');
      if (bk.done) fill.style.width = '100%'; else coverProgress(bk, fill, pct);
      const foot = el('span', 'cover-foot');
      foot.append(el('b', null, bk.t), who, bar, pct);
      b.append(ar, foot);
      b.addEventListener('click', () => { if (bk.b == null) openLib(bk.v); else { const L = LIBS[bk.v]; L.book = bk.b; libSave(L); setView(bk.v); } });
      row.append(b);
    }
    sec.append(hd, row);
    sec.dataset.search = [sh.c, ...sh.books.map(b => [b.t, b.who, b.ar].join(' '))].join(' ');
    cardsEl.append(sec);
  }
}
function coverProgress(bk, fill, pct) {
  const L = LIBS[bk.v];
  const go = idx => {
    const list = bk.b != null ? [idx[bk.b]].filter(Boolean) : idx;
    const t = list.reduce((s, x) => s + (x.t || 0), 0), n = bk.total || list.reduce((s, x) => s + (x.n || 0), 0);
    const f = n ? Math.min(1, t / n) : 0;
    fill.style.width = Math.max(2, Math.round(f * 100)) + '%';
    pct.textContent = f >= 1 ? '✓ tamam' : bk.v === 'musannef' ? `${list.filter(x => x.t).length} / ${list.length} kitap` : bk.v === 'seria' ? `${list.length} / 17 bölüm` : `%${Math.max(1, Math.round(f * 100))}`;
  };
  if (L.idx) go(L.idx); else libFetch(L, 'index.json').then(x => { L.idx = x; go(x); }).catch(() => { pct.textContent = ''; });
}
function renderSaved() {
  const head = el('div', 'mus-head');
  head.append(el('small', 'mus-book-n', RD.saved.length ? `${RD.saved.length} kayıt · yıldıza dokununca listeden çıkar` : 'Henüz kayıt yok. Bir hadisin köşesindeki ☆ işaretine dokunarak buraya ekleyebilirsin.'), fsBar());
  head.dataset.search = '';
  cardsEl.append(head);
  for (const x of RD.saved) {
    let a;
    if (x.v === 'usul') a = usulItem(x.u);
    else { const L = LIBS[x.v]; const keep = L.book; L.book = x.b; a = libItem(L, x.h); L.book = keep; }
    a.classList.add('saved-item');
    a.id = '';
    const go = el('button', 'chip-button saved-go', `${LIB_NAMES[x.v]}${x.title && x.v !== 'usul' ? ' · ' + x.title.replace(/ \(.*\)$/, '') : ''} → Bağlamında aç`);
    go.type = 'button';
    const n = x.v === 'usul' ? x.u[0] : x.h[0];
    go.addEventListener('click', () => goTo(x.v, x.b, n));
    a.append(go);
    a.dataset.search = [LIB_NAMES[x.v], x.title, ...(x.h || x.u).filter(v => typeof v === 'string')].join(' ');
    cardsEl.append(a);
  }
}

function applyFilter() {
  if (LIBS[view]) { libFilter(LIBS[view]); return; }
  if (view === 'usul') {
    const q = norm(searchEl.value.trim());
    document.body.classList.toggle('filtering', !!q);
    let shown = 0;
    for (const a of cardsEl.querySelectorAll('.usul-list .mus-h')) { const hit = !q || norm(a.dataset.search).includes(q); a.hidden = !hit; if (hit) shown++; }
    const note = cardsEl.querySelector('.mus-note');
    if (note) note.hidden = !!q;
    const list = cardsEl.querySelector('.usul-list');
    if (list) list.hidden = !shown;
    $('#noResult').hidden = !q || shown > 0;
    return;
  }
  if (view === 'fikih') {
    const q = norm(searchEl.value.trim());
    document.body.classList.toggle('filtering', !!q);
    let shown = 0;
    for (const d of cardsEl.querySelectorAll('details.fq-cat')) {
      let any = 0;
      for (const t of d.querySelectorAll('.fq-topic')) { const hit = !q || norm(t.dataset.search).includes(q); t.hidden = !hit; if (hit) any++; }
      d.hidden = !any;
      if (q) d.open = any > 0;
      shown += any;
    }
    const note = cardsEl.querySelector('.fq-note');
    if (note) note.hidden = !!q;
    $('#noResult').hidden = !q || shown > 0;
    return;
  }
  const q = norm(searchEl.value.trim());
  document.body.classList.toggle('filtering', !!q);
  let shown = 0;
  for (const box of cardsEl.children) {
    const z = box.dataset.id && findZ(box.dataset.id);
    const text = z ? [z.name, z.category, z.translit, z.meaning].join(' ') : (box.dataset.search || '');
    const hit = !q || norm(text).includes(q);
    box.hidden = !hit;
    if (hit) shown++;
  }
  $('#noResult').hidden = !q || shown > 0;
}
searchEl.addEventListener('input', applyFilter);
searchEl.addEventListener('keydown', e => { const L = LIBS[view]; if (e.key !== 'Enter' || !L) return; const v = searchEl.value.trim(); if (/^\d+$/.test(v) && L.idx) { const bi = libPick(L, +v); if (bi >= 0 && L.idx[bi].t) { e.preventDefault(); searchEl.blur(); libOpen(L, bi, +v); } } });

function update() {
  for (const z of S.zikirs) {
    const c = getCount(z.id);
    const ok = c >= z.target;
    const box = cardsEl.querySelector(`[data-id="${CSS.escape(z.id)}"]`);
    if (!box) continue;
    box.classList.toggle('done', ok);
    box.querySelector('.count-pill').textContent = `${ok ? '✓ ' : ''}${fmt(c)} / ${fmt(z.target)}`;
    box.querySelector('.bar span').style.width = Math.min(100, c / z.target * 100) + '%';
    box.querySelector('.minus').disabled = c === 0;
  }
  for (const [id, ids] of [['#cntSabah', MORNING], ['#cntAksam', EVENING]]) {
    const zs = ids.map(findZ).filter(Boolean);
    const d = zs.filter(z => getCount(z.id) >= z.target).length;
    const el = $(id);
    el.textContent = `${d} / ${zs.length}`;
    el.parentElement.classList.toggle('complete', zs.length > 0 && d === zs.length);
  }
  renderRings();
  $('#today').textContent = new Date().toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'}).toLocaleUpperCase('tr-TR');
  $('#hijri').textContent = hijriText();
  {
    const zs = S.zikirs.filter(isGenel);
    const d = zs.filter(z => getCount(z.id) >= z.target).length;
    $('#cntGenel').textContent = `${d} / ${zs.length}`;
    $('#cntGenel').parentElement.classList.toggle('complete', zs.length > 0 && d === zs.length);
  }
  renderWeek();
  if (!focusEl.hidden) renderFocus();
}

/* Üç halka: Sabah · Akşam · Genel (dokununca o liste açılır) */
const RINGS = [['sabah', '☀︎ Sabah', z => MSET.has(z.id)], ['aksam', '☾ Akşam', z => ESET.has(z.id)], ['genel', '📿 Genel', isGenel]];
const RING_C = 2 * Math.PI * 34;
function renderRings() {
  const box = $('#rings');
  if (!box.children.length) {
    for (const [v, label] of RINGS) {
      const b = el('button', 'hring');
      b.type = 'button';
      b.dataset.ring = v;
      b.innerHTML = `<svg viewBox="0 0 84 84" aria-hidden="true"><circle class="rg-track" cx="42" cy="42" r="34"/><circle class="rg-bar" cx="42" cy="42" r="34" transform="rotate(-90 42 42)"/><text x="42" y="47" text-anchor="middle"></text></svg><span class="rg-l"></span>`;
      b.querySelector('.rg-l').textContent = label;
      b.addEventListener('click', () => setView(v));
      box.append(b);
    }
  }
  RINGS.forEach(([v, label, f], i) => {
    const zs = S.zikirs.filter(f), d = zs.filter(z => getCount(z.id) >= z.target).length, p = zs.length ? d / zs.length : 0;
    const b = box.children[i];
    const bar = b.querySelector('.rg-bar');
    bar.style.strokeDasharray = `${RING_C * p} ${RING_C}`;
    bar.style.opacity = d ? 1 : 0;
    b.querySelector('text').textContent = `${d}/${zs.length}`;
    b.classList.toggle('complete', zs.length > 0 && d === zs.length);
    b.setAttribute('aria-label', `${label.slice(2)}: ${d} / ${zs.length} tamamlandı`);
  });
}
/* Son 7 gün: her gün için sabah ve akşam zikirleri tamamlandı mı */
const groupDone = (ids, k) => { const zs = ids.map(findZ).filter(Boolean); return zs.length > 0 && zs.every(z => getCount(z.id, k) >= z.target); };
function renderWeek() {
  const week = $('#week');
  const days = [];
  for (let i = 6; i >= 0; i--) { const d = addDays(new Date(), -i); const k = dayKey(d); days.push({d, k, m: groupDone(MORNING, k), e: groupDone(EVENING, k)}); }
  week.replaceChildren(...days.map(x => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'day' + (x.k === today ? ' is-today' : '');
    b.dataset.k = x.k;
    b.setAttribute('aria-label', `${x.d.toLocaleDateString('tr-TR', {day: 'numeric', month: 'long'})}: sabah ${x.m ? 'tamam' : 'eksik'}, akşam ${x.e ? 'tamam' : 'eksik'}`);
    b.innerHTML = `<i class="wk${x.m ? ' on' : ''}">☀︎</i><i class="wk${x.e ? ' on' : ''}">☾</i><span class="lbl"></span>`;
    b.querySelector('.lbl').textContent = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'][x.d.getDay()];
    return b;
  }));
}
$('#week').addEventListener('click', e => {
  const b = e.target.closest('.day');
  if (!b) return;
  const k = b.dataset.k;
  toast(`${fromKey(k).toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', weekday: 'long'})}: ${fmt(dayTotal(k))} zikir · Sabah ${groupDone(MORNING, k) ? '✓' : '—'} · Akşam ${groupDone(EVENING, k) ? '✓' : '—'}`);
});

function increment(id, delta) {
  checkDay(); // gece yarısını geçtiysek bugüne say
  const z = findZ(id);
  if (!z) return;
  const before = getCount(id);
  const after = Math.max(0, before + delta);
  if (after === before) return;
  setCount(id, after);
  save();
  update();
  if (delta > 0) {
    const reached = before < z.target && after >= z.target;
    haptic(reached);
    if (reached) {
      const allDone = S.zikirs.every(x => getCount(x.id) >= x.target);
      toast(allDone ? 'Bugünkü tüm hedefler tamamlandı 🌙' : `“${z.name}” tamamlandı ✨`);
    }
  }
}

cardsEl.addEventListener('click', e => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const id = btn.closest('.zikir').dataset.id;
  const act = btn.dataset.act;
  if (act === 'plus') increment(id, 1);
  else if (act === 'minus') increment(id, -1);
  else if (act === 'focus') openFocus(id);
  else if (act === 'edit') openEditor(id);
});

/* ---------- Sade görünüm ---------- */
$('#toggleCompact').addEventListener('click', () => { S.compact = !S.compact; save(); renderCards(); });

/* ---------- Tema ---------- */
function setTheme(t) {
  S.theme = THEMES[t] ? t : 'classic';
  document.body.dataset.theme = S.theme;
  document.querySelectorAll('[data-set-theme]').forEach(b => {
    const on = b.dataset.setTheme === S.theme;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  document.querySelector('meta[name="theme-color"]').content = THEMES[S.theme];
  save();
}
document.querySelectorAll('[data-set-theme]').forEach(b => b.addEventListener('click', () => setTheme(b.dataset.setTheme)));

/* ---------- Odak modu ---------- */
const focusEl = $('#focus');
const RING = 2 * Math.PI * 96;
let focusId = null;
let wakeLock = null;

async function lockScreen() {
  try { if ('wakeLock' in navigator && !focusEl.hidden) wakeLock = await navigator.wakeLock.request('screen'); } catch {}
}
function unlockScreen() { try { wakeLock && wakeLock.release(); } catch {} wakeLock = null; }

function openFocus(id) {
  focusId = id;
  focusEl.hidden = false;
  document.body.classList.add('no-scroll');
  renderFocus();
  lockScreen();
}
function closeFocus() {
  focusEl.hidden = true;
  document.body.classList.remove('no-scroll');
  unlockScreen();
  const card = cardsEl.querySelector(`[data-id="${CSS.escape(focusId || '')}"]`);
  if (card) card.scrollIntoView({block: 'center'});
}
function renderFocus() {
  const z = findZ(focusId);
  if (!z) { closeFocus(); return; }
  const c = getCount(z.id);
  $('#fName').textContent = z.name;
  $('#fArabic').textContent = z.arabic;
  $('#fArabic').hidden = !z.arabic;
  $('#fCount').textContent = fmt(c);
  $('#fTarget').textContent = '/ ' + fmt(z.target);
  const rounds = Math.floor(c / z.target);
  $('#fDone').textContent = rounds >= 2 ? `✓ ${rounds}. tur tamam` : rounds === 1 ? '✓ Tamamlandı' : '';
  const frac = c === 0 ? 0 : (c % z.target === 0 ? 1 : (c % z.target) / z.target);
  const ring = $('#fRing');
  ring.style.strokeDasharray = RING;
  ring.style.strokeDashoffset = RING * (1 - frac);
  focusEl.classList.toggle('done', c >= z.target);
  $('#focusMinus').disabled = c === 0;
}
function stepFocus(dir) {
  const list = visible().some(z => z.id === focusId) ? visible() : S.zikirs;
  const i = list.findIndex(z => z.id === focusId);
  const n = list.length;
  if (n) { focusId = list[(i + dir + n) % n].id; renderFocus(); }
}
$('#focusTap').addEventListener('click', () => increment(focusId, 1));
$('#focusMinus').addEventListener('click', () => increment(focusId, -1));
$('#focusClose').addEventListener('click', closeFocus);
$('#focusPrev').addEventListener('click', () => stepFocus(-1));
$('#focusNext').addEventListener('click', () => stepFocus(1));

/* ---------- Ekle / düzenle ---------- */
const editor = $('#editor');
const form = $('#editorForm');
let editingId = null;

function openEditor(id) {
  editingId = id || null;
  const z = id ? findZ(id) : {name: '', category: '', arabic: '', translit: '', meaning: '', target: 33};
  $('#editorTitle').textContent = id ? 'Zikri düzenle' : 'Yeni zikir';
  for (const f of ['name', 'category', 'arabic', 'translit', 'meaning', 'target']) form.elements[f].value = z[f];
  editor.classList.toggle('editing', !!id);
  editor.showModal();
  editor.scrollTop = 0;
  $('#editorTitle').focus({preventScroll: true});
}
form.querySelector('.quick-targets').addEventListener('click', e => {
  const b = e.target.closest('[data-t]');
  if (b) form.elements.target.value = b.dataset.t;
});
$('#editorCancel').addEventListener('click', () => editor.close());
form.addEventListener('submit', () => {
  const data = {};
  for (const f of ['name', 'category', 'arabic', 'translit', 'meaning']) data[f] = form.elements[f].value.trim();
  data.target = clampTarget(form.elements.target.value);
  if (!data.name) return;
  if (editingId) Object.assign(findZ(editingId), data);
  else S.zikirs.push({id: 'z' + Date.now().toString(36), custom: true, ...data});
  save();
  renderCards();
  toast(editingId ? 'Kaydedildi' : 'Zikir eklendi');
});
$('#resetOne').addEventListener('click', () => {
  const id = editingId, prev = getCount(id);
  editor.close();
  if (!prev) return;
  setCount(id, 0); save(); update();
  toast('Sayaç sıfırlandı', {label: 'Geri al', run: () => { setCount(id, prev); save(); update(); }});
});
$('#deleteOne').addEventListener('click', () => {
  const i = S.zikirs.findIndex(z => z.id === editingId);
  if (i < 0) return;
  const [removed] = S.zikirs.splice(i, 1);
  editor.close();
  save(); renderCards();
  toast(`“${removed.name}” silindi`, {label: 'Geri al', run: () => { S.zikirs.splice(i, 0, removed); save(); renderCards(); }});
});
$('#addZikir').addEventListener('click', () => openEditor(null));
for (const d of document.querySelectorAll('dialog')) {
  d.addEventListener('click', e => {
    if (e.target !== d) return;
    const r = d.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
  });
}

/* ---------- Ayarlar ---------- */
const settings = $('#settings');
function renderHistory() {
  const rows = [];
  let max = 1;
  for (let i = 0; i < 30; i++) { const d = addDays(new Date(), -i); const t = dayTotal(dayKey(d)); max = Math.max(max, t); rows.push({d, t}); }
  const total = rows.reduce((a, r) => a + r.t, 0);
  const active = rows.filter(r => r.t).length;
  const h = $('#history');
  h.replaceChildren();
  const sum = document.createElement('p');
  sum.className = 'note';
  sum.textContent = `${fmt(total)} zikir · ${active} aktif gün`;
  h.append(sum);
  for (const r of rows) {
    if (!r.t && r.d < addDays(new Date(), -6)) continue; // eski boş günleri gizle
    const row = document.createElement('div');
    row.className = 'h-row';
    row.innerHTML = '<span class="h-date"></span><span class="h-bar"><span></span></span><span class="h-num"></span>';
    row.querySelector('.h-date').textContent = r.d.toLocaleDateString('tr-TR', {day: 'numeric', month: 'short', weekday: 'short'});
    row.querySelector('.h-bar span').style.width = (r.t / max * 100) + '%';
    row.querySelector('.h-num').textContent = fmt(r.t);
    h.append(row);
  }
}
$('#openSettings').addEventListener('click', () => {
  $('#hapticsToggle').checked = S.haptics;
  if (SYN) ttsLoadVoices(); else ttsFillSettings();
  renderHistory();
  settings.showModal();
});
$('#closeSettings').addEventListener('click', () => settings.close());
$('#hapticsToggle').addEventListener('change', e => { S.haptics = e.target.checked; save(); });
$('#ttsAr').addEventListener('change', e => { TTS.ar = e.target.value; ttsSave(); });
$('#ttsTr').addEventListener('change', e => { TTS.tr = e.target.value; ttsSave(); });
$('#ttsRate').addEventListener('input', e => { TTS.rate = Number(e.target.value); $('#ttsRateOut').textContent = TTS.rate.toFixed(2).replace('.', ',') + '×'; ttsSave(); });
$('#arShow').checked = AR_SHOW;
$('#arShow').addEventListener('change', e => { AR_SHOW = e.target.checked; store.set('sekine-ar-show', AR_SHOW); document.body.classList.toggle('no-ar', !AR_SHOW); });
$('#ttsShow').addEventListener('change', e => { TTS.show = e.target.checked; document.body.classList.toggle('no-tts', !TTS.show); if (!TTS.show) ttsStop(); ttsSave(); });
$('#ttsArSened').addEventListener('change', e => { TTS.arSened = e.target.checked; ttsSave(); });
$('#ttsTrSened').addEventListener('change', e => { TTS.trSened = e.target.checked; ttsSave(); });
$('#ttsBarStop').addEventListener('click', ttsStop);

/* ---------- Uzun sayfalarda gezinme ---------- */
// Başa dön: bir buçuk ekrandan fazla aşağı inilince görünür; ana sayfada en üste, diğer görünümlerde liste başına (arama ve Geri) döner.
const toTopEl = $('#toTop');
let toTopRaf = 0;
addEventListener('scroll', () => {
  if (toTopRaf) return;
  toTopRaf = requestAnimationFrame(() => { toTopRaf = 0; toTopEl.classList.toggle('show', scrollY > innerHeight * 1.5); });
}, {passive: true});
toTopEl.addEventListener('click', () => {
  if (view === 'main') window.scrollTo({top: 0, behavior: 'smooth'});
  else $('.list').scrollIntoView({block: 'start', behavior: 'smooth'});
});
// Alt sekmeler: başka sekmeye geçerken bulunulan görünüm ve kaydırma yeri hatırlanır; dönünce aynı yere gelinir
// (kitaplarda kapanan bablar yeniden açılarak en son okunan rivayete gidilir). Açık sekmeye dokununca köke, köktaysa en üste dönülür.
const tabMem = {};
function restoreY(y) {
  const t0 = performance.now();
  const step = () => {
    if (document.documentElement.scrollHeight >= y + innerHeight || performance.now() - t0 > 1500) window.scrollTo(0, y);
    else requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
function goTab(t) {
  const cur = tabOf(view);
  if (t === cur) {
    if (view !== TAB_ROOT[t]) setView(TAB_ROOT[t], true);
    else window.scrollTo({top: 0, behavior: 'smooth'});
    return;
  }
  tabMem[cur] = {view, y: scrollY};
  const m = tabMem[t];
  if (!m) { setView(TAB_ROOT[t], true); return; }
  const last = RD.last[m.view], L = LIBS[m.view];
  if (last && (m.view === 'usul' || (L && L.book != null && last.b === L.book))) {
    ttsStop();
    flashQuiet = true;
    goTo(last.v, last.b, last.n);
    setTimeout(() => { flashQuiet = false; }, 2000);
    return;
  }
  ttsStop();
  view = m.view;
  searchEl.value = '';
  renderCards();
  restoreY(m.y);
}
document.querySelectorAll('.tab').forEach(b => b.addEventListener('click', () => goTab(b.dataset.tab)));
// Klavye açıkken alt çubuk gizlenir (yoksa klavyenin üstüne biner).
const KB_INPUT = el => el && el.matches && (el.matches('textarea') || (el.matches('input') && /^(text|search|email|number|tel|url|password)$/.test(el.type)));
document.addEventListener('focusin', e => { if (KB_INPUT(e.target)) document.body.classList.add('kb'); });
document.addEventListener('focusout', () => setTimeout(() => { if (!KB_INPUT(document.activeElement)) document.body.classList.remove('kb'); }, 60));
// Yapışık bab başlığına dokunulduğunda bab kapanmaz, babın başına dönülür; zaten baştaysa her zamanki gibi kapanır.
cardsEl.addEventListener('click', e => {
  const sum = e.target.closest('details.fq-cat > summary');
  if (!sum) return;
  const d = sum.parentElement;
  if (d.open && d.getBoundingClientRect().top < -4) { e.preventDefault(); d.scrollIntoView({block: 'start', behavior: 'smooth'}); }
});
$('#ttsTest').addEventListener('click', e => ttsPlay(e.currentTarget, 'ar', [{text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'}, {text: ''}]));
$('#ttsTestTr').addEventListener('click', e => ttsPlay(e.currentTarget, 'tr', [{text: 'Kalpler ancak Allah’ı anmakla huzur bulur.'}]));

$('#resetToday').addEventListener('click', () => {
  const prev = S.days[today];
  settings.close();
  if (!prev) return;
  delete S.days[today]; save(); update();
  toast('Bugünkü sayaçlar sıfırlandı', {label: 'Geri al', run: () => { S.days[today] = prev; save(); update(); }});
});
$('#restoreDefaults').addEventListener('click', () => {
  const ids = new Set(S.zikirs.map(z => z.id));
  const missing = DEFAULTS.filter(z => !ids.has(z.id));
  settings.close();
  if (!missing.length) { toast('Tüm varsayılan zikirler zaten listede'); return; }
  S.zikirs.push(...missing.map(z => ({...z})));
  save(); renderCards();
  toast(`${missing.length} zikir geri eklendi`);
});

$('#exportData').addEventListener('click', async () => {
  const name = `sekine-yedek-${today}.json`;
  const blob = new Blob([JSON.stringify(S, null, 2)], {type: 'application/json'});
  try {
    const file = new File([blob], name, {type: 'application/json'});
    if (navigator.canShare && navigator.canShare({files: [file]})) {
      await navigator.share({files: [file], title: 'Sekîne yedeği'});
      return;
    }
  } catch (err) { if (err && err.name === 'AbortError') return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
});
$('#importData').addEventListener('change', async e => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!data || !Array.isArray(data.zikirs)) throw new Error();
    const prev = S;
    S = sanitize(data);
    S.ui = UI_V; // yedekteki tema ve sıra korunsun, açılışta tekrar değiştirilmesin
    save(); setTheme(S.theme); renderCards();
    settings.close();
    toast('Yedek yüklendi', {label: 'Geri al', run: () => { S = prev; save(); setTheme(S.theme); renderCards(); }});
  } catch { settings.close(); toast('Bu dosya geçerli bir Sekîne yedeği değil'); }
});

/* ---------- Gün değişimi ve uyku ---------- */
function checkDay() {
  const k = dayKey();
  if (k !== today) { today = k; update(); }
}
setInterval(checkDay, 30000);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') { checkDay(); lockScreen(); }
});
window.addEventListener('pageshow', checkDay);

/* ---------- Başlat ---------- */
{ const cs = $('#cntSelef'); if (cs) cs.textContent = QUOTES.length + ' söz'; }
setTheme(S.theme);
renderCards();
if ('serviceWorker' in navigator) {
  const hadController = !!navigator.serviceWorker.controller;
  let reloaded = false;
  // Yeni sürüm etkinleşince sayfayı bir kez yenile (iki kez kapatıp açmaya gerek kalmasın)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloaded || !focusEl.hidden || editor.open) return;
    reloaded = true;
    location.reload();
  });
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js', {updateViaCache: 'none'}).catch(() => {}));
}
