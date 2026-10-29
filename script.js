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
  ['Hamd ve Senâ', ['tawhid','aksam','kerb','mulk','bakiyat','tasbih','bihamdihi','subhanallahil_azim','adede_halkihi','melik_kuddus','masaallah','la_havle','raditu']],
  ['Salavat', ['salavat']],
  ['Tevbe ve İstiğfar', ['istighfar','istigfar_tevbe','istigfar_hayy','yunus','adem']],
  ['Ahiret İçin Dualar', ['mukallib','husnu_huluk','rabbena_atina','ecirni','kabir','ibrahim','yusuf','nuh']],
  ['Dünya ve Sıkıntı İçin Dualar', ['musa_sadr','musa','rizik1','rizik2','maide','rizik_ayet','ya_fettah','aile','zekeriya','suleyman','rahmeteke','hayy','eyyub','gam','sabir','tevekkul','hasbunallah','lokman22','suayb']],
  ['Korunma Duaları', ['ayetelkursi','felak','nas','bismillahillezi','kelimat','afini','yunus81']],
  ['Kendi Zikirlerin', null],
  ['Kapanış', ['kapanis']],
  ['Özel Durumlarda Okunanlar', ['uyanis1','uyanis2','sukur','hakaret','kader','musibet','sinanan']]
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
// v13: Başlıklar zikrin kendi lafzı oldu (“Kalbi Ferahlatan…”, “… İçin” gibi nitelemeler kalktı); başlığın altındaki
// açıklama satırı kaldırıldı, yerine kartın altında zikrin geldiği hadis ve kaynağı gösterilir (hadis.js). Yâ Fettâh çıkarıldı.
// Yama önceki son değerlerden üretilir; kullanıcının kendi değiştirdiği başlık ve açıklamalara dokunulmaz.
const NAMES_V13 = {
  tawhid: 'Lâ ilâhe illallâh', aksam: 'Lâ ilâhe illallâhu vahdehû (Günde 100)', kerb: 'Lâ ilâhe illallâhu’l-Azîmü’l-Halîm',
  mulk: 'Allâhümme Mâlike’l-mülk', bakiyat: 'Sübhânallâh, velhamdü lillâh, ve lâ ilâhe illallâh, vallâhu ekber',
  tasbih: 'Sübhânallâh · Elhamdülillâh · Allâhu ekber', rabbena_atina: 'Rabbenâ âtinâ fi’d-dünyâ haseneten',
  ecirni: 'Allâhümme ecirnî mine’n-nâr', kabir: 'Allâhümme innî e’ûzü bike min azâbi’l-kabr',
  husnu_huluk: 'Allâhümme ahsente halkî', rizik1: 'Allâhümmağfir lî verhamnî', rizik2: 'Allâhümme innî es’elüke ilmen nâfi‘an',
  maide: 'Hz. Îsâ’nın Duası', rizik_ayet: 'Allâhu latîfun bi-ibâdih', aile: 'Rabbenâ heb lenâ min ezvâcinâ',
  rahmeteke: 'Allâhümme rahmeteke ercû', gam: 'Allâhümme innî e’ûzü bike mine’l-hemmi ve’l-hazen',
  sabir: 'Rabbenâ efriğ aleynâ sabran', tevekkul: 'Hasbiyallâhu lâ ilâhe illâ hû', lokman22: 'Ve men yüslim vechehû ilallâh',
  bismillahillezi: 'Bismillâhillezî lâ yedurru', afini: 'Allâhümme âfinî fî bedenî', yunus81: 'Mâ ci’tüm bihi’s-sihr',
  kapanis: 'Sübhâne Rabbike Rabbi’l-izzeti', uyanis1: 'Elhamdü lillâhillezî ahyânâ', uyanis2: 'Elhamdü lillâhillezî âfânî fî cesedî',
  sukur: 'Lâ ilâhe illallâhu vahdehû … Rabbiğfir lî', hakaret: 'Rabbi’hkum bi’l-hakk', kader: 'Kaderullâhi ve mâ şâe fe‘al',
  musibet: 'İnnâ lillâhi ve innâ ileyhi râci‘ûn', sinanan: 'Elhamdü lillâhillezî âfânî mimmebtelâke bih',
  sb_afini: 'Allâhümme âfinî fî bedenî (Sabah)', ak_afini: 'Allâhümme âfinî fî bedenî (Akşam)',
  afv: 'Allâhümme innî es’elüke’l-afve ve’l-âfiye (Sabah)', ak_afv: 'Allâhümme innî es’elüke’l-afve ve’l-âfiye (Akşam)',
};
for (const z of DEFAULTS) {
  const from = {}, to = {};
  if (NAMES_V13[z.id] && z.name !== NAMES_V13[z.id]) { from.name = z.name; to.name = NAMES_V13[z.id]; }
  if (z.category) { from.category = z.category; to.category = ''; }
  if (Object.keys(to).length) { PATCHES_V3.push({v: 13, id: z.id, from, to}); Object.assign(z, to); }
}
const REMOVED_V13 = new Set(['ya_fettah']);
for (let i = DEFAULTS.length - 1; i >= 0; i--) if (REMOVED_V13.has(DEFAULTS[i].id)) DEFAULTS.splice(i, 1);
// v14: Dua ve âyetlerin başındaki besmele kaldırıldı (v11'in tersi; kullanıcı isteği). Sûrelerde (İhlâs, Felak, Nâs) kalır.
// Yama önceki son değerlerden üretilir; kullanıcının kendi değiştirdiği alanlara dokunulmaz.
const unBesmele = (t, b) => t && t.startsWith(b + ' ') ? t.slice(b.length + 1) : t;
for (const id of BESMELE_IDS) {
  const z = DEFAULTS.find(x => x.id === id);
  if (!z || !z.arabic || !z.arabic.startsWith(BESMELE_AR + ' ')) continue;
  const from = {arabic: z.arabic, translit: z.translit, meaning: z.meaning};
  const to = {arabic: unBesmele(z.arabic, BESMELE_AR), translit: unBesmele(z.translit, BESMELE_TR), meaning: unBesmele(z.meaning, BESMELE_ME)};
  PATCHES_V3.push({v: 14, id, from, to});
  Object.assign(z, to);
}
const CATALOG = 14;

const KEY = 'zikrim-v2';
const OLD_KEY = 'zikrim-v1';
const THEMES = {night:'#0d1526', nature:'#f3f6ef', classic:'#faf4ea'};
const UI_V = 2; // v2: klasik tema varsayılan, sabit sıralama
const HIJRI_MONTHS = ['Muharrem', 'Safer', 'Rebîülevvel', 'Rebîülâhir', 'Cemâziyelevvel', 'Cemâziyelâhir', 'Receb', 'Şâban', 'Ramazan', 'Şevvâl', 'Zilkade', 'Zilhicce'];
// Hicrî tarih düzeltmesi: Ayarlar'dan −2 … +2 gün (ay başlangıcı ülkeye göre farklı olabildiği için). Anahtar `sekine-hicri-fark`.
const hijriOffset = () => { try { const v = Math.round(Number(JSON.parse(localStorage.getItem('sekine-hicri-fark')))); return v >= -2 && v <= 2 ? v : 0; } catch { return 0; } };
function hijriText(d = new Date()) {
  try {
    d = new Date(d.getTime() + hijriOffset() * 86400000);
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
  const out = {v: 2, ui: Number(s && s.ui) || 0, theme: THEMES[s && s.theme] ? s.theme : 'classic', haptics: !s || s.haptics !== false, compact: !!(s && s.compact), catalog: Number(s && s.catalog) || 1, zikirs: [], days: {}, done: {}};
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
  // Tamamlananlar kullanıcının işaretidir: {gün: [zikir kimlikleri]}. Bu alan yoksa (eski kayıt ya da yedek)
  // geçmiş günler bir kereye mahsus eski kurala göre (sayı ≥ hedef) türetilir; haftalık görünüm boş kalmaz.
  if (s && s.done && typeof s.done === 'object') {
    for (const [d, ids] of Object.entries(s.done)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || d < oldest || !Array.isArray(ids)) continue;
      const t = [...new Set(ids.filter(x => typeof x === 'string' && x))];
      if (t.length) out.done[d] = t;
    }
  } else {
    const tgt = new Map(out.zikirs.map(z => [z.id, z.target]));
    for (const [d, c] of Object.entries(out.days)) {
      const t = Object.keys(c).filter(id => tgt.has(id) && c[id] >= tgt.get(id));
      if (t.length) out.done[d] = t;
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
      const add = list => { for (const z of list) if (!have.has(z.id) && !REMOVED_V6.has(z.id) && !REMOVED_V13.has(z.id)) { out.zikirs.push({...z}); have.add(z.id); added++; } };
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
      if (out.catalog < 13) out.zikirs = out.zikirs.filter(z => !REMOVED_V13.has(z.id) || z.custom);
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
// Hedef sayısı yoktur; zikir, kullanıcı “Tamamladım” deyince o gün için tamamlanmış sayılır
const isDone = (id, d = today) => !!(S.done[d] && S.done[d].includes(id));
function setDone(id, on, d = today) {
  const t = new Set(S.done[d] || []);
  if (on) t.add(id); else t.delete(id);
  if (t.size) S.done[d] = [...t]; else delete S.done[d];
}
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


/* ---------- Selef'ten Sözler (âlimler doğum sırasına göre; okuma kartları). Kütüphanedeki eserlerden alınanlar uygulamadaki
   çeviriyle aynıdır ve `go: [kitaplık, kitap, no]` ile kitapta açılır; diğerleri asıl kaynaklarından. Sözü söyleyen kim ise `who` odur. ---------- */
const QUOTES = [
  {who:"Abdullah b. Mes‘ûd (ö. 32)", ar:"اتبعوا ولا تبتدعوا فقد كفيتم، كل بدعة ضلالة", tr:"Uyun, bidat çıkarmayın; zira size yetecek olan verilmiştir. Her bidat dalâlettir.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 896", go:["zuhd", 3, 896]},
  {who:"Abdullah b. Mes‘ûd (ö. 32)", ar:"بِحَسْبِ الْمَرْءِ مِنَ الْعِلْمِ أَنْ يَخَافَ اللَّهَ, وَبِحَسْبِهِ مِنَ الْجَهْلِ أَنْ يُعْجَبَ بِعَمَلِهِ", tr:"Kişiye ilim olarak Allah’tan korkması yeter; cehalet olarak da ameline hayran olması yeter.", src:"İbn Ebî Şeybe, el-Musannef, 34518", go:["musannef", 32, 34518]},
  {who:"Abdullah b. Mes‘ûd (ö. 32)", ar:"إِنَّمَا هَذِهِ الْقُلُوبُ أَوْعِيَةٌ, فَاشْغَلُوهَا بِالْقُرْآنِ وَلَا تَشْغَلُوهَا بِغَيْرِهِ", tr:"Bu kalpler ancak kaplardır; onları Kur’an ile meşgul edin, başka bir şeyle meşgul etmeyin.", src:"İbn Ebî Şeybe, el-Musannef, 34551", go:["musannef", 32, 34551]},
  {who:"Abdullah b. Mes‘ûd (ö. 32)", ar:"خَالِطُوا النَّاسَ وَزَايِلُوهُمْ وَصَافِحُوهُمْ وَدِينُكُمْ لَا تَكْلِمُونَهُ", tr:"İnsanlarla iç içe olun ve (kötülüklerinden) ayrışın; onlarla musafaha edin; ama dininizi yaralamayın.", src:"İbn Ebî Şeybe, el-Musannef, 26221", go:["musannef", 16, 26221]},
  {who:"Abdullah b. Mes‘ûd (ö. 32)", ar:"يَجِيءُ الْقُرْآنُ يَوْمَ الْقِيَامَةِ فَيَشْفَعُ لِصَاحِبِهِ فَيَكُونُ قَائِدًا إِلَى الْجَنَّةِ، وَيَشْهَدُ عَلَيْهِ فَيَكُونُ سَائِقًا لَهُ إِلَى النَّارِ", tr:"Kur’an kıyamet günü gelir; (kimine) şefaat eder ve onu cennete götüren bir rehber olur; (kiminin) aleyhine şahitlik eder ve onu ateşe sürükleyen bir sürücü olur.", src:"İbn Ebî Şeybe, el-Musannef, 30053", go:["musannef", 21, 30053]},
  {who:"Abdullah b. Mes‘ûd (ö. 32)", ar:"يا أيها الناس، عليكم بالطاعة والجماعة، فإنها حبل الله الذي أمر به، وما تكرهون في الجماعة خير مما تحبون في الفرقة", tr:"Ey insanlar! İtaate ve cemaate sarılın; zira o, Allah’ın emrettiği ipidir. Cemaatte hoşlanmadığınız şeyler, ayrılıkta sevdiğiniz şeylerden daha hayırlıdır.", src:"el-Âcurrî, eş-Şerîa, 17", go:["seria", 0, 17]},
  {who:"Abdullah b. Mes‘ûd (ö. 32)", ar:"من أكثر الناس خطايا وقال وكيع: ذنوبا يوم القيامة أكثرهم خوضا في الباطل", tr:"Kıyamet günü insanların hatası —Vekî‘: ‘günahı’ dedi— en çok olanı, bâtıla en çok dalanlarıdır.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 877", go:["zuhd", 3, 877]},
  {who:"Abdullah b. Mes‘ûd (ö. 32)", ar:"ذهب صفو الدنيا، فلم يبق إلا الكدر، فالموت اليوم تحفة لكل مسلم", tr:"Dünyanın safı gitti; bulanıklıktan başkası kalmadı. Ölüm bugün her Müslüman için bir armağandır.", src:"İbn Batta, el-İbânetü’l-kübrâ, 22", go:["ibane", 0, 22]},
  {who:"Abdullah b. Mes‘ûd (ö. 32)", ar:"لا يذوق عبد طعم الإيمان حتى يؤمن بالقدر كله، وبأنه مبعوث من بعد الموت", tr:"Bir kul, kaderin tamamına ve ölümden sonra diriltileceğine iman etmedikçe imanın tadını tadamaz.", src:"el-Âcurrî, eş-Şerîa, 425", go:["seria", 4, 425]},
  {who:"Saîd b. el-Müseyyeb (d. 15 – ö. 94)", ar:"لو كنت شاهدا لأحد حي أنه من أهل الجنة، لشهدت لعبد الله بن عمر", tr:"Eğer yaşayan biri için cennet ehlinden olduğuna şahitlik edecek olsaydım, Abdullah b. Ömer için şahitlik ederdim.", src:"İmam Ahmed (رحمه الله), Fezâilü’s-sahâbe, 1703", go:["fezail", 7, 1703]},
  {who:"Saîd b. el-Müseyyeb (d. 15 – ö. 94)", ar:"إن من أفضل العبادة التفقه في دين الله، والتفكر في خلق الله", tr:"Şüphesiz ibadetin en faziletlilerinden biri, Allah’ın dininde fıkıh sahibi olmak ve Allah’ın yaratması hakkında tefekkür etmektir.", src:"el-Âcurrî, Farzu talebi’l-ilm, 4", go:["acurri", 10, 4]},
  {who:"Saîd b. el-Müseyyeb (d. 15 – ö. 94)", ar:"لأن أنام عن العشاء الآخرة، أحب إلي من أن ألغو بعدها", tr:"Yatsı namazını uyuyup kaçırmam, ondan sonra boş söz konuşmamdan bana daha sevimlidir.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 774", go:["zuhd", 3, 774]},
  {who:"Saîd b. el-Müseyyeb (d. 15 – ö. 94)", ar:"ما أذن المؤذن منذ ثلاثين سنة إلا وأنا في المسجد", tr:"Otuz yıldır müezzin ezan okuduğunda ben mutlaka mescitte bulunmuşumdur.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 2256", go:["zuhd", 7, 2256]},
  {who:"Saîd b. el-Müseyyeb (d. 15 – ö. 94)", ar:"لَقَدْ بَلَغْتُ ثَمَانِينَ سَنَةً وَأَنَا أَخْوَفُ مَا أَخَافُ عَلَيَّ النِّسَاءُ", tr:"Seksen yaşına ulaştım; (hâlâ) en çok korktuğum şey kadınlar (fitnesi)dir.", src:"İbn Ebî Şeybe, el-Musannef, 33912", go:["musannef", 28, 33912]},
  {who:"Saîd b. el-Müseyyeb (d. 15 – ö. 94)", ar:"لا خير في من لا يطلب المال يقضي به دينه، ويصون به عرضه، ويقضي به ذمامه، وإن مات تركه ميراثا لمن بعده", tr:"Onunla borcunu ödeyeceği, onunla ırzını koruyacağı ve onunla (üzerindeki) ahit haklarını yerine getireceği; ölürse de kendisinden sonrakilere miras olarak bırakacağı malı talep etmeyen kimsede hayır yoktur.", src:"el-Hallâl, el-Hass ale’t-ticâre ve’s-sınâa ve’l-amel, 50", go:["hallal", 1, 50]},
  {who:"Mücâhid b. Cebr (d. 21 – ö. 104)", ar:"إن العبد إذا أقبل على الله عز وجل أقبل الله بقلوب المؤمنين إليه", tr:"Kul Allah’a azze ve celle yöneldiğinde Allah mü’minlerin kalplerini ona yöneltir.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 2218", go:["zuhd", 7, 2218]},
  {who:"Mücâhid b. Cebr (d. 21 – ö. 104)", ar:"من لم يستح من الحلال خفت مؤنته وأراح نفسه وقل كبره", tr:"Helalden utanmayanın yükü hafifler, kendini rahatlatır ve kibri azalır.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 2219", go:["zuhd", 7, 2219]},
  {who:"Mücâhid b. Cebr (d. 21 – ö. 104)", ar:"من أعز نفسه أذل دينه ومن أذل نفسه أعز دينه", tr:"Nefsini aziz tutan dinini zelil eder; nefsini zelil eden dinini aziz eder.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 2223", go:["zuhd", 7, 2223]},
  {who:"Mücâhid b. Cebr (d. 21 – ö. 104)", ar:"لو أن رجلا أنفق مثل أحد في طاعة الله لم يكن من المسرفين", tr:"Bir adam Allah’a itaat yolunda Uhud (dağı) kadar infak etse israf edenlerden olmaz.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 2230", go:["zuhd", 7, 2230]},
  {who:"Mücâhid b. Cebr (d. 21 – ö. 104)", ar:"أوثق عرى الإيمان الحب في الله، والبغض في الله", tr:"İmanın en sağlam kulpu Allah için sevmek ve Allah için buğzetmektir.", src:"İbn Ebî Şeybe, Kitâbü’l-Îmân, 111", go:["ibnebiseybe", 1, 111]},
  {who:"Mücâhid b. Cebr (d. 21 – ö. 104)", ar:"مَنْ صَنَعَ مَعْرُوفًا إِلَى غَنِيٍّ وَفَقِيرٍ فَهُوَ صَدَقَةٌ", tr:"Kim zengine de fakire de bir iyilik yaparsa, bu bir sadakadır.", src:"İbn Ebî Şeybe, el-Musannef, 25430", go:["musannef", 16, 25430]},
  {who:"Mücâhid b. Cebr (d. 21 – ö. 104)", ar:"إِذَا لَقِيتَ أَخَاكَ فَلَا تَسْأَلْهُ مِنْ أَيْنَ جِئْتَ؟ وَلَا أَيْنَ تَذْهَبُ؟ وَلَا تُحِدَّ النَّظَرَ إِلَى أَخِيكَ", tr:"Kardeşinle karşılaştığında ona nereden geldiğini ve nereye gittiğini sorma; kardeşine de gözünü dikerek bakma.", src:"İbn Ebî Şeybe, el-Musannef, 26640", go:["musannef", 16, 26640]},
  {who:"Mücâhid b. Cebr (d. 21 – ö. 104)", ar:"أَفْضَلُ السَّاعَاتِ مَوَاقِيتُ الصَّلَاةِ فَادْعُ فِيهَا", tr:"Vakitlerin en faziletlisi namaz vakitleridir; onlarda dua et.", src:"İbn Ebî Şeybe, el-Musannef, 29245", go:["musannef", 20, 29245]},
  {who:"Mücâhid b. Cebr (d. 21 – ö. 104)", ar:"لا يتعلم مستحي ولا مستكبر", tr:"Utangaç da kibirli de ilim öğrenemez.", src:"el-Âcurrî, Farzu talebi’l-ilm, 45", go:["acurri", 10, 45]},
  {who:"el-Hasan el-Basrî (d. 21 – ö. 110)", ar:"أَطْلُبُ الْعِلْمَ طَلَبًا لَا يَضُرُّ بِالْعِبَادَةِ، وَأَطْلُبُ الْعِبَادَةَ طَلَبًا لَا يَضُرُّ بِالْعِلْمِ، فَإِنَّ مَنْ عَمِلَ بِغَيْرِ عِلْمٍ كَانَ مَا يُفْسِدُ أَكْثَرَ مِمَّا يُصْلِحُ", tr:"İlmi, ibadete zarar vermeyecek şekilde ara; ibadeti de ilme zarar vermeyecek şekilde ara. Çünkü ilimsiz amel eden, düzelttiğinden çok bozar.", src:"İbn Ebî Şeybe, el-Musannef, 35192", go:["musannef", 32, 35192]},
  {who:"el-Hasan el-Basrî (d. 21 – ö. 110)", ar:"إِنَّ الرَّجُلَ لَيَعْمَلُ الْحَسَنَةَ فَتَكُونُ نُورًا فِي قَلْبِهِ وَقُوَّةً فِي بَدَنِهِ، وَإِنَّ الرَّجُلَ لَيَعْمَلُ السَّيِّئَةَ فَتَكُونُ ظُلْمَةً فِي قَلْبِهِ وَوَهْنًا فِي بَدَنِهِ", tr:"Adam bir iyilik işler de o, kalbinde bir nur, bedeninde bir kuvvet olur. Adam bir kötülük işler de o, kalbinde bir karanlık, bedeninde bir gevşeklik olur.", src:"İbn Ebî Şeybe, el-Musannef, 35195", go:["musannef", 32, 35195]},
  {who:"el-Hasan el-Basrî (d. 21 – ö. 110)", ar:"إِنَّ الْمُؤْمِنِينَ عَجَّلُوا الْخَوْفَ فِي الدُّنْيَا فَأَمَّنَهُمُ اللَّهُ يَوْمَ الْقِيَامَةِ, وَإِنَّ الْمُنَافِقِينَ أَخَّرُوا الْخَوْفَ فِي الدُّنْيَا فَأَخَافَهُمُ اللَّهُ يَوْمَ الْقِيَامَةِ", tr:"Müminler korkuyu dünyada öne aldılar; Allah da onları kıyamet günü emin kıldı. Münafıklar ise korkuyu dünyada ertelediler; Allah da onları kıyamet günü korkuttu.", src:"İbn Ebî Şeybe, el-Musannef, 35213", go:["musannef", 32, 35213]},
  {who:"el-Hasan el-Basrî (d. 21 – ö. 110)", ar:"عَمِلَ الْقَوْمُ وَلَمْ يَتَمَنَّوْا", tr:"O topluluk (selef) amel etti, temenni etmedi.", src:"İbn Ebî Şeybe, el-Musannef, 35214", go:["musannef", 32, 35214]},
  {who:"el-Hasan el-Basrî (d. 21 – ö. 110)", ar:"تَفَكُّرُ سَاعَةٍ خَيْرٌ مِنْ قِيَامِ لَيْلَةٍ", tr:"Bir saat tefekkür, bir gece namazından hayırlıdır.", src:"İbn Ebî Şeybe, el-Musannef, 35223", go:["musannef", 32, 35223]},
  {who:"el-Hasan el-Basrî (d. 21 – ö. 110)", ar:"لَا يَزَالُ الْعَبْدُ بِخَيْرٍ إِذَا قَالَ لِلَّهِ وَإِذَا عَمِلَ لِلَّهِ", tr:"Kul, söylediğinde Allah için söylediği ve amel ettiğinde Allah için amel ettiği sürece hayır üzere olmaya devam eder.", src:"İbn Ebî Şeybe, el-Musannef, 35288", go:["musannef", 32, 35288]},
  {who:"el-Hasan el-Basrî (d. 21 – ö. 110)", ar:"مَنْ قَالَ قَوْلًا حَسَنًا وَعَمِلَ عَمَلًا حَسَنًا فَخُذُوا عَنْهُ, وَمَنْ قَالَ قَوْلًا حَسَنًا وَعَمِلَ عَمَلًا سَيِّئًا فَلَا تَأْخُذُوا عَنْهُ", tr:"Kim güzel söz söyler ve güzel amel işlerse ondan (ilim) alın. Kim güzel söz söyler de kötü amel işlerse ondan almayın.", src:"İbn Ebî Şeybe, el-Musannef, 35641", go:["musannef", 32, 35641]},
  {who:"el-Hasan el-Basrî (d. 21 – ö. 110)", ar:"إِنَّ مِنَ النِّفَاقِ اخْتِلَافَ اللِّسَانِ وَالْقَلْبِ, وَاخْتِلَافَ السِّرِّ وَالْعَلَانِيَةِ, وَاخْتِلَافَ الدُّخُولِ وَالْخُرُوجِ", tr:"Dil ile kalbin, gizli ile açığın, giriş ile çıkışın farklı olması nifaktandır.", src:"İbn Ebî Şeybe, el-Musannef, 35642", go:["musannef", 32, 35642]},
  {who:"el-Hasan el-Basrî (d. 21 – ö. 110)", ar:"مَا شَاوَرَ قَوْمٌ إِلَّا هُدُوا لِأَرْشَدِ أَمْرِهِمْ", tr:"İstişare eden hiçbir topluluk yoktur ki işlerinin en doğrusuna iletilmesin.", src:"İbn Ebî Şeybe, el-Musannef, 26275", go:["musannef", 16, 26275]},
  {who:"el-Hasan el-Basrî (d. 21 – ö. 110)", ar:"قد كان الرجل يطلب العلم فلا يلبث أن يرى ذلك في تخشعه وهديه وفي لسانه وبصره وبره", tr:"Adam ilim talep ederdi; çok geçmeden bu, onun huşûunda, gidişatında, dilinde, gözünde ve iyiliğinde görülürdü.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 1463", go:["zuhd", 5, 1463]},
  {who:"el-Hasan el-Basrî (d. 21 – ö. 110)", ar:"ابن آدم كيف يرق قلبك وهمك في آخر", tr:"Âdemoğlu! Senin derdin başka (bir şey)deyken kalbin nasıl yumuşar?", src:"İmam Ahmed (رحمه الله), ez-Zühd, 1450", go:["zuhd", 5, 1450]},
  {who:"Muhammed b. Sîrîn (d. 33 – ö. 110)", ar:"إذا أراد الله بعبد خيرا جعل له واعظا من قلبه يأمره وينهاه", tr:"Allah bir kula hayır dilediğinde, ona kalbinden kendisine emreden ve nehyeden bir vâiz kılar.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 1768", go:["zuhd", 6, 1768]},
  {who:"Muhammed b. Sîrîn (d. 33 – ö. 110)", ar:"اتق الله في اليقظة ولا تبال بما رأيت في المنام", tr:"Uyanıklıkta Allah’tan kork; rüyada gördüğün şeye aldırma.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 1781", go:["zuhd", 6, 1781]},
  {who:"Muhammed b. Sîrîn (d. 33 – ö. 110)", ar:"الْبَيْتُ الَّذِي يُقْرَأُ فِيهِ الْقُرْآنُ تَحْضُرُهُ الْمَلَائِكَةُ، وَتَخْرُجُ مِنْهُ الشَّيَاطِينُ، وَيَتَّسِعُ بِأَهْلِهِ، وَيَكْثُرُ خَيْرُهُ، وَالْبَيْتُ الَّذِي لَا يُقْرَأُ فِيهِ الْقُرْآنُ تَحْضُرُهُ الشَّيَاطِينُ، وَتَخْرُجُ مِنْهُ الْمَلَائِكَةُ، وَيَضِيقُ بِأَهْلِهِ، وَيَقِلُّ خَيْرُهُ", tr:"İçinde Kur’an okunan eve melekler gelir, şeytanlar ondan çıkar; ev, ehline genişler ve hayrı çoğalır. İçinde Kur’an okunmayan eve ise şeytanlar gelir, melekler ondan çıkar; ev, ehline daralır ve hayrı azalır.", src:"İbn Ebî Şeybe, el-Musannef, 30023", go:["musannef", 21, 30023]},
  {who:"Muhammed b. Sîrîn (d. 33 – ö. 110)", ar:"إِنَّمَا ضَلَّتْ بَنُو إِسْرَائِيلَ بِكُتُبٍ وَرِثُوهَا عَنْ آبَائِهِمْ", tr:"İsrâiloğulları ancak atalarından miras aldıkları kitaplar yüzünden saptılar.", src:"İbn Ebî Şeybe, el-Musannef, 26445", go:["musannef", 16, 26445]},
  {who:"Muhammed b. Sîrîn (d. 33 – ö. 110)", ar:"كَانُوا يَقُولُونَ: الْقِتَالُ فِي سَبِيلِ اللَّهِ خَيْرٌ مِنَ الْجُلُوسِ, وَالْجُلُوسُ خَيْرٌ مِنَ الْقِتَالِ عَلَى الضَّلَالِ وَمَنْ رَابَهُ شَيْءٌ فَلِيَتَعَدَّهُ إِلَى مَا لَا يَرِيبُهُ.", tr:"(Selef) şöyle derlerdi: Allah yolunda savaşmak oturmaktan hayırlıdır; oturmak da sapıklık üzere savaşmaktan hayırlıdır. Kime bir şey şüphe verirse, onu bırakıp şüphe vermeyene geçsin.", src:"İbn Ebî Şeybe, el-Musannef, 19517", go:["musannef", 10, 19517]},
  {who:"ez-Zührî (d. 50 – ö. 124)", ar:"الزُّهْدُ فِي الدُّنْيَا مَا لَمْ يَغْلِبِ الْحَرَامُ صَبْرَكَ, وَمَا لَمْ يَغْلِبِ الْحَلَالُ شُكْرَكَ", tr:"Dünyaya karşı zühd, haramın sabrına, helalin şükrüne galip gelmemesidir.", src:"İbn Ebî Şeybe, el-Musannef, 35683", go:["musannef", 32, 35683]},
  {who:"ez-Zührî (d. 50 – ö. 124)", ar:"ما ابتدعت في الإسلام بدعة أضر على الملة من هذه يعني: أهل الإرجاء", tr:"İslâm’da millete bundan —yani irca ehlinden— daha zararlı bir bidat çıkarılmadı.", src:"el-Âcurrî, eş-Şerîa, 295", go:["seria", 2, 295]},
  {who:"ez-Zührî (d. 50 – ö. 124)", ar:"تَسْبِيحَةٌ فِي رَمَضَانَ أَفْضَلُ مِنْ أَلْفٍ فِي غَيْرِهِ", tr:"Ramazan’da bir tesbih, başka zamanlardaki binden daha faziletlidir.", src:"İbn Ebî Şeybe, el-Musannef, 29840", go:["musannef", 20, 29840]},
  {who:"el-Evzâî (d. 88 – ö. 157)", ar:"الإيمان قول وعمل، يزيد وينقص فمن زعم أن الإيمان يزيد ولا ينقص فاحذروه، فإنه مبتدع", tr:"İman söz ve ameldir; artar ve eksilir. Kim imanın artıp eksilmediğini iddia ederse ondan sakının; zira o bidatçidir.", src:"el-Âcurrî, eş-Şerîa, 245", go:["seria", 2, 245]},
  {who:"el-Evzâî (d. 88 – ö. 157)", ar:"عليك بآثار من سلف، وإن رفضك الناس، وإياك وآراء الرجال، وإن زخرفوا لك بالقول", tr:"Geçmişlerin eserlerine sarıl; insanlar seni reddetse de. Adamların görüşlerinden sakın; sana sözü süsleseler de.", src:"el-Âcurrî, eş-Şerîa, 127", go:["seria", 0, 127]},
  {who:"el-Evzâî (d. 88 – ö. 157)", ar:"اصبر نفسك على السنة، وقف حيث وقف القوم، وقل فيما قالوا، وكف عما كفوا عنه، واسلك سبيل سلفك الصالح، فإنه يسعك ما وسعهم", tr:"Kendini sünnet üzere sabret; kavmin durduğu yerde dur, onların söylediğini söyle, onların kaçındığından kaçın ve salih selefinin yolunu tut; zira onlara yeten sana da yeter.", src:"el-Âcurrî, eş-Şerîa, 294", go:["seria", 2, 294]},
  {who:"el-Evzâî (d. 88 – ö. 157)", ar:"الزُّهْدُ فِي الدُّنْيَا تَرْكُ الْمَحْمَدَةِ, يَقُولُ: تَعْمَلُ الْعَمَلَ لَا تُرِيدُ أَنْ يَحْمَدَكَ النَّاسُ عَلَيْهِ", tr:"Dünyaya karşı zühd, övülmeyi terk etmektir. Yani bir amel işlersin ve insanların seni onun için övmesini istemezsin.", src:"İbn Ebî Şeybe, el-Musannef, 35683", go:["musannef", 32, 35683]},
  {who:"el-Evzâî (d. 88 – ö. 157)", ar:"كان يقال: ويل للمتفقهين لغير العبادة, والمستحلين الحرمات بالشبهات", tr:"Şöyle denirdi: İbadetten başka (bir amaç) için fıkıh öğrenenlere ve haramları şüphelerle helâl sayanlara yazıklar olsun!", src:"el-Âcurrî, Ahlâku’l-ulemâ, 76", go:["acurri", 11, 76]},
  {who:"el-Evzâî (d. 88 – ö. 157)", ar:"يأتي على الناس زمان أقل شيء في ذلك الزمان أخ مؤنس، أو درهم من حلال، أو عمل في سنة", tr:"Şöyle denirdi: İnsanlara öyle bir zaman gelecek ki o zamanda en az bulunan şey, (insana) ünsiyet veren bir kardeş ya da helalden bir dirhem ya da sünnete uygun bir amel olacaktır.", src:"İmam Ahmed (رحمه الله), ez-Zühd, 964", go:["zuhd", 3, 964]},
  {who:"Süfyân es-Sevrî (d. 97 – ö. 161)", ar:"الإيمان قول وعمل، يزيد وينقص", tr:"İman söz ve ameldir; artar ve eksilir.", src:"el-Âcurrî, eş-Şerîa, 242", go:["seria", 2, 242]},
  {who:"Süfyân es-Sevrî (d. 97 – ö. 161)", ar:"تعوذوا بالله من فتنة العابد الجاهل, وفتنة العالم الفاجر, فإن فتنتهما فتنة لكل مفتون", tr:"Şöyle denilir: Câhil âbidin fitnesinden ve fâcir âlimin fitnesinden Allah’a sığının; zira onların fitnesi, her fitneye düşen için bir fitnedir.", src:"el-Âcurrî, Ahlâku’l-ulemâ, 74", go:["acurri", 11, 74]},
  {who:"Süfyân es-Sevrî (d. 97 – ö. 161)", ar:"ما حاج عليا رضي الله عنه أحد إلا حجه علي رضي الله عنه", tr:"Ali (radıyallâhu anh) ile hiç kimse delil tartışmasına girmedi ki Ali (radıyallâhu anh) onu delille yenmiş olmasın.", src:"el-Âcurrî, eş-Şerîa, 1589", go:["seria", 13, 1589]},
  {who:"eş-Şâfiî (d. 150 – ö. 204)", ar:"ليس لي ولا لعالم أن يقول في إباحة شيء ولا حظره ولا أخذ شيء من أحد ولا إعطائه إلا أن يجد ذلك نصا في كتاب الله أو سنة أو إجماع أو خبر يلزم.", tr:"Ne benim ne de bir âlimin, bir şeyin mubahlığı ya da yasaklığı, birinden bir şey almak ya da ona vermek hakkında söz söylemesi caiz değildir; ancak bunu Allah’ın Kitabı’nda ya da sünnette nas olarak, ya da icmâ veya bağlayıcı bir haber olarak bulması müstesna.", src:"Cimâu’l-ilm, 107", go:["safii", 0, 107]},
  {who:"eş-Şâfiî (d. 150 – ö. 204)", ar:"فما لم يكن داخلا في واحد من هذه الأخبار فلا يجوز لنا أن نقوله بما استحسنا ولا بما خطر على قلوبنا ولا نقوله إلا قياسا على اجتهاد به على طلب الأخبار اللازمة.", tr:"Bu haberlerden birine girmeyen şeyi, güzel gördüğümüz şeyle ya da kalplerimize gelen şeyle söylememiz caiz değildir. Onu ancak, bağlayıcı haberleri aramak üzere yapılan bir içtihada dayanan kıyasla söyleriz.", src:"Cimâu’l-ilm, 108", go:["safii", 0, 108]},
  {who:"eş-Şâfiî (d. 150 – ö. 204)", ar:"فأما من لا آلة فيه فلا يحل له أن يقول في العلم شيئا.", tr:"Âleti (ilim vasıtası) olmayan kimseye gelince, onun ilimde bir şey söylemesi helâl değildir.", src:"Cimâu’l-ilm, 136", go:["safii", 0, 136]},
  {who:"eş-Şâfiî (d. 150 – ö. 204)", ar:"ولو جاز لعالم أن يدع الاستدلال بالقياس والاجتهاد فيه جاز للجاهلين أن يقولوا ثم لعلهم أعذر بالقول فيه لأنه يأتي الخطأ عامدا بغير اجتهاد ويأتونه جاهلين.", tr:"Bir âlimin kıyasla istidlal etmeyi ve onda içtihad etmeyi bırakması caiz olsaydı, cahillerin (de) söz söylemesi caiz olurdu. Sonra belki de onlar o hususta söz söylemekte daha mazurdurlar; çünkü o (âlim) içtihad etmeksizin hatayı kasten işler, onlar ise onu cahil olarak işlerler.", src:"Cimâu’l-ilm, 157", go:["safii", 0, 157]},
  {who:"İmam Ahmed b. Hanbel (d. 164 – ö. 241)", ar:"أصول السنة عندنا التمسك بما كان عليه أصحاب رسول الله صلى الله عليه وسلم والاقتداء بهم وترك البدع وكل بدعة فهي ضلالة وترك الخصومات في الدين", tr:"Bize göre sünnetin esasları şunlardır: Resûlullah’ın ﷺ ashâbının üzerinde bulunduğu yola sımsıkı sarılmak ve onlara uymak; bid‘atleri terk etmek, zira her bid‘at dalâlettir; din konusunda husûmeti, yani çekişip tartışmayı bırakmak.", src:"Usûlü’s-Sünne, giriş", go:["usul", null, 0]},
  {who:"İmam Ahmed b. Hanbel (d. 164 – ö. 241)", ar:"والسنة تفسر القرآن وهي دلائل القرآن وليس في السنة قياس ولا تضرب لها الأمثال ولا تدرك بالعقول ولا الأهواء إنما هو الإتباع وترك الهوى", tr:"Sünnet Kur’ân’ı tefsir eder; o, Kur’ân’ın delilleridir (Kur’ân’ın neyi kastettiğini gösterir). Sünnette kıyas yoktur, ona misaller getirilmez; akıllarla da hevâlarla da kavranmaz. O ancak ittibâdır (uymaktır) ve hevâyı terk etmektir.", src:"Usûlü’s-Sünne, giriş", go:["usul", null, 0]},
  {who:"İmam Ahmed b. Hanbel (d. 164 – ö. 241)", ar:"والإيمان قول وعمل يزيد وينقص كما جاء في الخبر (أكمل المؤمنين إيمانا أحسنهم خلقا) (ومن ترك الصلاة فقد كفر) (وليس من الأعمال شيء تركه كفر إلا الصلاة) من تركها فهو كافر وقد أحل الله قتله", tr:"İman söz ve ameldir; artar ve eksilir. Nitekim haberde şöyle gelmiştir: “Mü’minlerin iman bakımından en kâmili, ahlâkı en güzel olanıdır.” Yine: “Kim namazı terk ederse küfre girmiştir.” Ve: “Amellerden, terki küfür olan namazdan başka bir şey yoktur.” Kim namazı terk ederse kâfirdir ve Allah onun öldürülmesini helâl kılmıştır.", src:"Usûlü’s-Sünne, 13", go:["usul", null, 13]},
  {who:"İmam Ahmed b. Hanbel (d. 164 – ö. 241)", ar:"ولا نشهد على أهل القبلة بعمل يعمله بجنة ولا نار نرجو للصالح ونخاف عليه ونخاف على المسيء المذنب ونرجو له رحمة الله", tr:"Kıble ehlinden (müslümanlardan) hiç kimse için, yaptığı bir amel sebebiyle cennetlik ya da cehennemlik olduğuna şahitlik etmeyiz. Sâlih kimse için umarız, onun hakkında korkarız da. Kötülük işleyen günahkâr hakkında korkarız, onun için de Allah’ın rahmetini umarız.", src:"Usûlü’s-Sünne, 23", go:["usul", null, 23]},
  {who:"İmam Ahmed b. Hanbel (d. 164 – ö. 241)", ar:"ومن انتقص أحدا من أصحاب رسول الله صلى الله عليه وسلم أو بغضه بحدث منه أو ذكر مساويه كان مبتدعا حتى يترحم عليهم جميعا ويكون قلبه لهم سليما", tr:"Kim Resûlullah’ın ﷺ ashâbından birini küçümser, ondan sâdır olan bir şey sebebiyle ona buğzeder ya da kusurlarını anarsa, onların hepsine rahmet dileyip kalbi onlara karşı tertemiz oluncaya kadar bid‘atçidir.", src:"Usûlü’s-Sünne, 29", go:["usul", null, 29]},
  {who:"İmam Ahmed b. Hanbel (d. 164 – ö. 241)", ar:"من رد حديث النبي صلى الله عليه وسلم، فهو على شفا هلكة", tr:"Kim Nebî’nin ﷺ hadisini reddederse helâkin kenarındadır.", src:"İbn Batta, el-İbânetü’l-kübrâ, 97", go:["ibane", 0, 97]},
  {who:"İmam Ahmed b. Hanbel (d. 164 – ö. 241)", ar:"قال لأبي عبد الله: متى يجب علي الأمر؟ قال: «إذا لم تخف سيفا ولا عصى", tr:"İshâk b. İbrâhîm’in onlara anlattığına göre, Ebû Abdullah’a dedi ki: “Emir (ma‘rûfu emretmek) bana ne zaman vâcip olur?” Dedi ki: “Ne kılıçtan ne de sopadan korkmadığın zaman.”", src:"el-Hallâl, el-Emr bi’l-ma‘rûf ve’n-nehy ani’l-münker, 4", go:["hallal", 2, 4]},
  {who:"İmam Ahmed b. Hanbel (d. 164 – ö. 241)", ar:"سمعت أبا عبد الله، يأمر بالسوق ويقول: «ما أحسن الاستغناء عن الناس", tr:"el-Fazl b. Ziyâd dedi ki: Ebû Abdullah’ı çarşıya (devam etmeyi) emrederken işittim; diyordu ki: “İnsanlara muhtaç olmamak ne güzeldir!”", src:"el-Hallâl, el-Hass ale’t-ticâre ve’s-sınâa ve’l-amel, 4", go:["hallal", 1, 4]},
  {who:"İmam Ahmed b. Hanbel (d. 164 – ö. 241)", ar:"قيل لأبي عبد الله رحمه الله: قال طاوس: اللهم امنعني المال والولد، قال: قد روي هذا عن طاوس، من كان مثل طاوس؟ ثم قال: الغنى من العافية", tr:"Yûsuf b. Mûsâ’dan: Ebû Abdullah’a (rahimehullah): “Tâvûs: ‘Allah’ım! Benden malı ve çocuğu esirge’ dedi” denildi. (Ebû Abdullah) dedi ki: “Bu, Tâvûs’tan rivayet edildi; Tâvûs gibi kim var ki?” Sonra dedi ki: “Zenginlik âfiyettendir.”", src:"el-Hallâl, el-Hass ale’t-ticâre ve’s-sınâa ve’l-amel, 8", go:["hallal", 1, 8]},
  {who:"Ebû Dâvûd es-Sicistânî (d. 202 – ö. 275)", ar:"ولا أعلم شيئا بعد القرآن ألزم للناس أن يتعلموه من هذا الكتاب ولا يضر رجلا أن لا يكتب من العلم بعد ما يكتب هذه الكتب شيئا وإذا نظر فيه وتدبره وتفهمه حينئذ يعلم مقداره", tr:"Kur’ân’dan sonra insanların öğrenmesi bu kitaptan daha gerekli olan bir şey bilmiyorum. Bir adam bu kitapları yazdıktan sonra ilimden hiçbir şey yazmasa da ona zarar vermez. Ona bakar, üzerinde düşünür ve onu anlarsa, işte o zaman onun değerini bilir.", src:"Risâle ilâ ehli Mekke, 14", go:["ebudavud", 0, 14]},
  {who:"Ebû Dâvûd es-Sicistânî (d. 202 – ö. 275)", ar:"ويعجبني أن يكتب الرجل مع هذه الكتب من رأي أصحاب النبي صلى الله عليه وسلم", tr:"Adamın bu kitaplarla birlikte Nebî’nin ﷺ ashâbının görüşlerinden de yazması hoşuma gider.", src:"Risâle ilâ ehli Mekke, 16", go:["ebudavud", 0, 16]},
  {who:"Harb el-Kirmânî (ö. 280)", ar:"وإن أمرك السلطان بأمر هو لله معصية فليس لك إن تطيعه البتة، وليس لك أن تخرج عليه ولا تمنعه حقه.", tr:"Sultan sana Allah’a isyan olan bir şey emrederse ona asla itaat etmen caiz değildir; ona karşı ayaklanman ve hakkını ondan esirgemen de caiz değildir.", src:"İcmâu’s-selef fi’l-i‘tikâd, 12", go:["harb", 0, 12]},
  {who:"Harb el-Kirmânî (ö. 280)", ar:"والإمساك في الفتنة سنة ماضية واجب لزومها، فإن ابتليت فقدم نفسك ومالك دون دينك، ولا تعين على الفتنة بيد ولا لسان ولكن اكفف يدك ولسانك وهواك والله المفتن.", tr:"Fitnede (elini) çekmek, geçmişten gelen bir sünnettir, ona bağlı kalmak vaciptir. Eğer (fitneye) uğrarsan, dinin uğrunda canını ve malını öne sür. Fitneye ne elinle ne dilinle yardım et; bilakis elini, dilini ve hevânı çek. Allah, imtihan edendir.", src:"İcmâu’s-selef fi’l-i‘tikâd, 13", go:["harb", 0, 13]},
  {who:"Harb el-Kirmânî (ö. 280)", ar:"والولاية بدعة: والبراءة بدعة، وهم يقولون: نتولى فلان ونتبرأ من فلان. وهذا القول بدعة فاحذروه.", tr:"Velâyet bid‘attir, berâet de bid‘attir. Onlar: “Falanı veli ediniriz, falandan teberrî ederiz” derler. Bu söz bid‘attir; ondan sakının.", src:"İcmâu’s-selef fi’l-i‘tikâd, 50", go:["harb", 0, 50]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"اعلموا أن الإسلام هو السنة، والسنة هي الإسلام، ولا يقوم أحدهما إلا بالآخر.", tr:"Bilin ki İslâm sünnettir, sünnet de İslâm’dır. Biri ancak diğeriyle ayakta durur.", src:"Şerhu’s-Sünne, 1", go:["berbehari", 0, 1]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"فمن السنة لزوم الجماعة، فمن رغب عن الجماعة وفارقها فقد خلع ربقة الإسلام من عنقه، وكان ضالا مضلا.", tr:"Cemaate bağlı kalmak sünnettendir. Kim cemaatten yüz çevirip ondan ayrılırsa İslâm’ın ipini boynundan çıkarmış olur; sapmış ve saptırıcı olur.", src:"Şerhu’s-Sünne, 2", go:["berbehari", 0, 2]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"واعلم أن الناس لم يبتدعوا بدعة قط حتى تركوا من السنة مثلها، فاحذر المحدثات من الأمور، فإن كل محدثة بدعة، وكل بدعة ضلالة، والضلالة وأهلها في النار.", tr:"Bil ki insanlar, sünnetten benzerini terk etmedikçe hiçbir bid‘at çıkarmamışlardır. Sonradan çıkarılmış işlerden sakın; zira sonradan çıkarılan her şey bid‘attir, her bid‘at sapıklıktır; sapıklık ve ehli ateştedir.", src:"Şerhu’s-Sünne, 5", go:["berbehari", 0, 5]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"واعلم رحمك الله أنه ليس في السنة قياس، ولا يضرب لها الأمثال، ولا تتبع فيها الأهواء، وهو التصديق بآثار رسول الله صلى الله عليه وسلم بلا كيف ولا شرح، ولا يقال: لم ولا كيف؟.", tr:"Bil, Allah sana rahmet etsin ki sünnette kıyas yoktur; ona misaller getirilmez, onda hevâlara uyulmaz. O, Resûlullah’ın ﷺ eserlerini keyfiyetsiz ve şerhsiz tasdik etmektir. (Onun için) “Niçin?” ve “Nasıl?” denmez.", src:"Şerhu’s-Sünne, 9", go:["berbehari", 0, 9]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"والكلام والخصومة والجدال والمراء محدث يقدح الشك في القلب، وإن أصاب صاحبه الحق والسنة.", tr:"Kelâm, husûmet, cedel ve mirâ (münakaşa) sonradan çıkarılmıştır; sahibi hakka ve sünnete isabet etse bile kalpte şüphe uyandırır.", src:"Şerhu’s-Sünne, 10", go:["berbehari", 0, 10]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"ولا يحل أن تكتم النصيحة للمسلمين، برهم وفاجرهم في أمر الدين، فمن كتم فقد غش المسلمين، ومن غش المسلمين فقد غش الدين، ومن غش الدين فقد خان الله ورسوله والمؤمنين.", tr:"Din işinde müslümanlara —iyilerine ve fâcirlerine— nasihati gizlemek helal değildir. Kim gizlerse müslümanları aldatmıştır; kim müslümanları aldatırsa dini aldatmıştır; kim dini aldatırsa Allah’a, Resûlü’ne ve mü’minlere hıyanet etmiştir.", src:"Şerhu’s-Sünne, 76", go:["berbehari", 0, 76]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"واعلم – رحمك الله - أن العلم ليس بكثرة الرواية [والكتب]، إنما العالم من اتبع العلم والسنن، وإن كان قليل العلم [والكتب] ومن خالف الكتاب والسنة فهو صاحب بدعة، وإن كان كثير العلم [والكتب].", tr:"Bil —Allah sana rahmet etsin— ki ilim, rivayetin [ve kitapların] çokluğuyla değildir. Âlim, ancak ilme ve sünnetlere uyandır; ilmi [ve kitapları] az olsa bile. Kim Kitab’a ve sünnete muhalefet ederse, ilmi [ve kitapları] çok olsa bile, bid‘at sahibidir.", src:"Şerhu’s-Sünne, 98", go:["berbehari", 0, 98]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"واعلم – رحمك الله – لو أن الناس وقفوا عند محدثات الأمور ولم يتجاوزوها بشيء [ولم] يولدوا كلاما مما لم يجئ فيه أثر عن رسول الله صلى الله عليه وسلم ولا عن أصحابه لم تكن بدعة.", tr:"Bil —Allah sana rahmet etsin— eğer insanlar sonradan çıkarılmış işler karşısında durup onları hiçbir şeyle aşmasalardı ve Resûlullah’tan ﷺ ve ashâbından hakkında bir eser gelmemiş bir söz [türetmeselerdi] bid‘at olmazdı.", src:"Şerhu’s-Sünne, 102", go:["berbehari", 0, 102]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"وإياك والنظر في الكلام والجلوس إلى أصحاب الكلام، وعليك بالآثار، وأهل الآثار، وإياهم فاسأل، ومعهم فاجلس، ومنهم فاقتبس.", tr:"Kelâma bakmaktan ve kelâm ehliyle oturmaktan sakın. Eserlere ve eser ehline sarıl; onlara sor, onlarla otur, onlardan (ilim) al.", src:"Şerhu’s-Sünne, 107", go:["berbehari", 0, 107]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"وكل علم ادعاه العباد من علم الباطن لم يوجد في الكتاب والسنة فهو بدعة وضلالة، ولا ينبغي لأحد [أن] يعمل به، ولا يدعو إليه.", tr:"Kulların iddia ettiği, Kitap ve sünnette bulunmayan bâtın ilminden her ilim bid‘at ve sapıklıktır. Hiç kimsenin onunla amel etmesi ve ona çağırması uygun değildir.", src:"Şerhu’s-Sünne, 122", go:["berbehari", 0, 122]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"والحلال ما شهدت عليه وحلفت عليه أنه حلال، وكذلك الحرام، وما حاك في صدرك فهو شبهة.", tr:"Helal, helal olduğuna şahitlik edip üzerine yemin edebileceğin şeydir; haram da böyledir. Göğsünde tereddüt uyandıran ise şüphedir.", src:"Şerhu’s-Sünne, 130", go:["berbehari", 0, 130]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"وإذا ظهر لك من إنسان شيء من البدع، فاحذره؛ فإن الذي أخفى [عنك] أكثر مما أظهر.", tr:"Bir insandan bid‘atlerden bir şey sana görünürse ondan sakın; zira [senden] gizlediği, açığa vurduğundan daha çoktur.", src:"Şerhu’s-Sünne, 138", go:["berbehari", 0, 138]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"واحذر ثم احذر [أهل] زمانك خاصة، وانظر من تجالس، وممن تسمع، ومن تصحب، فإن الخلق كأنهم في ردة، إلا من عصمه الله منهم.", tr:"Sakın, sonra yine sakın; özellikle zamanının [ehlinden]. Kiminle oturduğuna, kimden dinlediğine ve kiminle arkadaşlık ettiğine bak. Zira insanlar sanki irtidat içindedir; ancak Allah’ın onlardan koruduğu müstesna.", src:"Şerhu’s-Sünne, 140", go:["berbehari", 0, 140]},
  {who:"el-Berbehârî (d. 233 – ö. 329)", ar:"ومن السنة أن لا تطيع أحدا على معصية الله، ولا أولي الخير ولا الخلق أجمعين، لا طاعة لبشر في معصية الله، ولا تحب عليه [أحدا]، واكره ذلك كله لله تبارك وتعالى.", tr:"Allah’a isyan hususunda hiç kimseye —ne hayır ehline ne de bütün yaratılmışlara— itaat etmemen sünnettendir. Allah’a isyanda hiçbir beşere itaat yoktur. Bunun için [hiç kimseyi] sevme; bunun hepsini Allah Tebâreke ve Teâlâ için kerih gör.", src:"Şerhu’s-Sünne, 154", go:["berbehari", 0, 154]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"يَنْبَغِي لَهُ أَنْ يَجْعَلَ الْقُرْآنَ رَبِيعًا لِقَلْبِهِ، يُعَمِّرَ بِهِ مَا خَرِبَ مِنْ قَلْبِهِ", tr:"(Kur’ân ehli için) gereken şudur: Kur’ân’ı kalbinin baharı kılar; onunla kalbinden harap olanı imar eder.", src:"Ahlâku Ehli’l-Kur’ân", go:["acurri", 0, 21.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"إِنْ تَكَلَّمَ تَكَلَّمَ بِعِلْمٍ، إِذَا رَأَى الْكَلَامَ صَوَابًا", tr:"Konuşursa —sözün doğru olduğunu gördüğünde— ilimle konuşur.", src:"Ahlâku Ehli’l-Kur’ân", go:["acurri", 0, 21.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"لَا يَمْدَحُ نَفْسَهُ بِمَا فِيهِ، فَكَيْفَ بِمَا لَيْسَ فِيهِ", tr:"Kendisinde olan bir şeyle bile kendini övmez; ya olmayanla nasıl över!", src:"Ahlâku Ehli’l-Kur’ân", go:["acurri", 0, 21.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"يَكْظِمُ غَيْظَهُ لِيُرْضِيَ رَبَّهُ، وَيَغِيظَ عَدُوَّهُ", tr:"Rabbini razı etmek ve düşmanını öfkelendirmek için öfkesini yutar.", src:"Ahlâku Ehli’l-Kur’ân", go:["acurri", 0, 21.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"يَتَصَفَّحُ الْقُرْآنَ لِيُؤَدِّبَ بِهِ نَفْسَهُ", tr:"Nefsini onunla edeplendirmek için Kur’ân’ı inceler.", src:"Ahlâku Ehli’l-Kur’ân", go:["acurri", 0, 21.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"لَا يَتَأَكَّلُ بِالْقُرْآنِ، وَلَا يُحِبُّ أَنْ تُقْضَى لَهُ بِهِ الْحَوَائِجُ", tr:"Kur’ân’ı geçim aracı yapmaz; onunla ihtiyaçlarının görülmesini sevmez.", src:"Ahlâku Ehli’l-Kur’ân", go:["acurri", 0, 21.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"إِذَا دَرَسَ الْقُرْآنَ فَبِحُضُورِ فَهْمٍ وَعَقْلٍ", tr:"Kur’ân’ı okuduğunda anlayışını ve aklını hazır ederek okur.", src:"Ahlâku Ehli’l-Kur’ân", go:["acurri", 0, 21.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"لَا يَغْتَابُ أَحَدًا، وَلَا يَحْقِرُ أَحَدًا، وَلَا يَسُبُّ أَحَدًا", tr:"Kimseyi gıybet etmez, kimseyi küçümsemez, kimseye sövmez.", src:"Ahlâku Ehli’l-Kur’ân", go:["acurri", 0, 21.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"فالعلماء, في كل حال, لهم فضل عظيم في خروجهم لطلب العلم, وفي مجالستهم لهم فيه فضل, وفي مذاكرة بعضهم لبعض لهم فيه فضل, وفيمن تعلموا منه العلم لهم فيه فضل, وفيمن علموه العلم لهم فيه فضل, فقد جمع الله للعلماء الخير من جهات كثيرة, نفعنا الله وإياهم بالعلم", tr:"Âlimlerin, her hâlde, ilim talebi için çıkmalarında büyük bir fazileti vardır; meclislerinde onlar için bir fazilet vardır; birbirleriyle müzakere etmelerinde onlar için bir fazilet vardır; ilmi kendilerinden öğrendikleri kimselerde onlar için bir fazilet vardır; ilmi öğrettikleri kimselerde onlar için bir fazilet vardır. Allah, âlimler için hayrı birçok yönden bir araya getirmiştir. Allah bize ve onlara ilimle fayda versin.", src:"Ahlâku’l-ulemâ", go:["acurri", 11, 33]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"فمن تدبر ما رسمته له من أول الكتاب إلى هاهنا علم أنه لا ينفك أبدا من طلبه العلم، لينتفي عنه الجهل بما أوجب الله عز وجل عليه من فرض عبادته في نفسه، وفي أهله، وفي ولده، وفي جميع سعيه فرضا لازما، سعى إلى العلماء، بإتعاب نفسه، وإنفاق ماله، وتغريبه عن وطنه، ولو إلى الصين، إذا كان لا يوجد العلم إلا بالصين.", tr:"Kitabın başından buraya kadar kendisi için çizdiğim şeyi düşünen kimse bilir ki, Allah’ın (azze ve celle) kendisine; nefsinde, ailesinde, çocuğunda ve bütün çabasında lâzım bir farz olarak vacip kıldığı ibadet farzını bilmemek kendisinden kalksın diye ilim talebinden asla ayrılamaz; nefsini yorarak, malını harcayarak ve vatanından gurbete çıkarak âlimlere koşar; ilim ancak Çin’de bulunuyorsa, Çin’e kadar da olsa.", src:"Farzu talebi’l-ilm", go:["acurri", 10, 17.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"فالعاقل لا يستحسن لنفسه أن يكون جاهلا بعلم يزيده شرفا به عند الله عز وجل وعند من عقل، ولكنه مشغول بالواجب كيف يعبد الله عز وجل فيما ألزمه وتزايد في طلب كل علم ينفع لا يشبع.", tr:"Akıllı kimse, kendisini Allah (azze ve celle) katında ve akleden kimse katında daha şerefli kılacak bir ilmi bilmemeyi kendisi için güzel görmez; fakat o, Allah’ın (azze ve celle) kendisine lâzım kıldığı şeyde O’na nasıl ibadet edeceği vacibiyle meşguldür ve faydalı her ilmin talebinde artış gösterir, doymaz.", src:"Farzu talebi’l-ilm", go:["acurri", 10, 19.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"جميع ما ذكرت في هذا الكتاب: يدل على أنه لا ينبغي أن تجالس إلا من يعود نفعه عليك ممن إذا فارقته أراك فهما وعلما، وأدبا، وإلا فانبذ عنك مجالسته، واحذره على دينك.", tr:"Bu kitapta zikrettiğim her şey, ancak faydası sana dönen —kendisinden ayrıldığında sana anlayış, ilim ve edep kazandırmış olan— kimseyle oturman gerektiğine delâlet eder; aksi takdirde onunla oturmayı kendinden at ve dinin hususunda ondan sakın.", src:"Farzu talebi’l-ilm", go:["acurri", 10, 44.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"من اعتبر هذه الأمثال لم يؤثر على طلب العلم شيئا إلا ما لا بد منه، وصبر على ما يلحقه فيه من المشقة، وإنما يفعل ذلك، من هو مشفق على دينه يخاف عليه أشد من خوفه على نفسه وماله، إن كان ذا بصيرة وعقل.", tr:"Bu misallerden ibret alan kimse, zorunlu olan dışında hiçbir şeyi ilim talebine tercih etmez ve bu hususta kendisine ulaşan meşakkate sabreder. Bunu ancak dini hususunda titreyen, onun için canı ve malı için korktuğundan daha şiddetli korkan kimse yapar; eğer basiret ve akıl sahibi ise.", src:"Farzu talebi’l-ilm", go:["acurri", 10, 63.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"ينبغي لمن كان له حظ من الليل أن يدوم عليه ويراعيه قل ذلك أو كثر ويتحذر من فتور النفس فإن النفس ربما فترت واستلذت النوم في وقت القيام فزين لها الشيطان النوم لينام عن القيام حسدا منه للمؤمن فينبغي لمن أحس بذلك من نفسه أن يكثر الذكر لله عز وجل عند استيقاظه وينضح الماء عل وجهه فإنه ينطرد عنه ما أمله الشيطان من الفتور عن القيام والله أعلم.", tr:"Geceden bir nasibi olan kimsenin —az olsun çok olsun— ona devam etmesi, onu gözetmesi ve nefsin gevşemesinden sakınması gerekir. Zira nefis bazen gevşer ve kıyam vaktinde uykudan lezzet alır; şeytan da mü’mine olan hasedinden dolayı, kıyamdan (geri kalıp) uyusun diye ona uykuyu süsler. Kendinde bunu hisseden kimsenin uyandığında Allah azze ve celle’yi çokça zikretmesi ve yüzüne su serpmesi gerekir; zira (böylece) şeytanın umduğu kıyamdan gevşeme ondan uzaklaşır. Allah en iyisini bilir.", src:"Fazlu kıyâmi’l-leyl ve’t-teheccüd", go:["acurri", 4, 16.1]},
  {who:"el-Âcurrî (d. ~280 – ö. 360)", ar:"ومذهبنا أنا نقول في الخلافة والتفضيل بأبي بكر وعمر وعثمان وعلي رضي الله عنهم هذا طريق أهل العلم", tr:"Mezhebimiz şudur: Hilâfette ve üstünlükte Ebû Bekir, Ömer, Osman ve Ali (radıyallâhu anhüm) (sırasıyla) deriz. Bu, ilim ehlinin yoludur.", src:"eş-Şerîa, 1222", go:["seria", 10, 1222.1]},
  {who:"İbn Batta el-Ukberî (d. 304 – ö. 387)", ar:"فانظروا رحمكم الله من تصحبون، وإلى من تجلسون، واعرفوا كل إنسان بخدنه، وكل أحد بصاحبه، أعاذنا الله وإياكم من صحبة المفتونين، ولا جعلنا وإياكم من إخوان العابثين، ولا من أقران الشياطين، وأستوهب الله لي ولكم عصمة من الضلال، وعافية من قبيح الفعال", tr:"Allah size rahmet etsin, kiminle arkadaşlık ettiğinize ve kimin yanına oturduğunuza bakın. Her insanı dostuyla, herkesi arkadaşıyla tanıyın. Allah bizi de sizi de fitneye düşmüşlerin arkadaşlığından korusun; bizi de sizi de boş işlerle uğraşanların kardeşlerinden ve şeytanların yoldaşlarından kılmasın. Kendim ve sizin için Allah’tan sapıklıktan korunmayı ve çirkin fiillerden âfiyeti dilerim.", src:"el-İbânetü’l-kübrâ, 45", go:["ibane", 0, 45]},
  {who:"İbn Batta el-Ukberî (d. 304 – ö. 387)", ar:"هو ما أمر به رسول الله صلى الله عليه وسلم، ونهى عنه، وقاله أو فعله، وكل ذلك فواجب عليك قبوله، والعمل به فاتباعه هدى والترك له على سبيل العناد كفر وضلال", tr:"(Sünnet,) Resûlullah’ın ﷺ emrettiği, nehyettiği, söylediği ya da yaptığı şeydir. Bunların hepsini kabul etmen ve onunla amel etmen sana vaciptir. Ona uymak hidayettir; inat yoluyla onu terk etmek küfür ve sapıklıktır.", src:"el-İbânetü’l-kübrâ, 59 (ara metin)", go:["ibane", 0, 59.1]}
];

/* ---------- Kartlar ---------- */
const cardsEl = $('#cards');
const MSET = new Set(MORNING), ESET = new Set(EVENING);
const VIEWS = {main: 'Sekîne', anasayfa: 'Anasayfa', akis: 'Akış', sabah: '☀︎ Sabah Zikirleri', aksam: '☾ Akşam Zikirleri', genel: '📿 Genel Zikirler', selef: '📜 Sözler', profil: 'Profilim', fikih: '⚖️ Hanbelî Fıkhı', musannef: '📚 Musannef', ibnebiseybe: '📚 İbn Ebî Şeybe', musned: '📗 Müsned', usul: '📘 Usûlü’s-Sünne', ahmed: '📘 İmam Ahmed', zuhd: '📘 ez-Zühd', fezail: '📘 Fezâilü’s-sahâbe', berbehari: '📕 Şerhu’s-Sünne', acurri: '📙 el-Âcurrî', seria: '📙 eş-Şerîa', hallal: '📗 el-Hallâl', safii: '📘 eş-Şâfiî', buhari: '📗 el-Buhârî', ebudavud: '📙 Ebû Dâvûd', harb: '📕 Harb el-Kirmânî', ibane: '📕 el-İbâne', sunan: '📗 Sünen-i Ebî Dâvûd', kutuphane: '📚 Kütüphane', alim: '📚 Âlim', kaydedilen: '☆ Kaydettiklerim'};
const LIB_CHILD = new Set(['musannef', 'ibnebiseybe', 'musned', 'usul', 'ahmed', 'zuhd', 'fezail', 'berbehari', 'acurri', 'seria', 'hallal', 'safii', 'buhari', 'ebudavud', 'harb', 'ibane', 'sunan', 'kaydedilen', 'alim', 'selef']);
const READ_VIEWS = new Set(['anasayfa', 'akis', 'selef', 'profil', 'fikih', 'musannef', 'ibnebiseybe', 'musned', 'usul', 'ahmed', 'zuhd', 'fezail', 'berbehari', 'acurri', 'seria', 'hallal', 'safii', 'buhari', 'ebudavud', 'harb', 'ibane', 'sunan', 'kutuphane', 'kaydedilen', 'alim']);
let view = 'main';
/* Alt sekmeler: her görünüm bir sekmeye aittir. Kökler: Zikir = ana sayfa, Kütüphane = âlimler (Sözler de Kütüphane'nin altındadır), Profilim = profil. */
const TAB_ROOT = {zikir: 'main', anasayfa: 'anasayfa', akis: 'akis', kutuphane: 'kutuphane', profil: 'profil'};
const TAB_ROOTS = new Set(Object.values(TAB_ROOT));
const tabOf = v => v === 'anasayfa' ? 'anasayfa' : v === 'akis' ? 'akis' : v === 'profil' ? 'profil' : (v === 'kutuphane' || v === 'fikih' || LIB_CHILD.has(v)) ? 'kutuphane' : 'zikir';
const isGenel = z => !MSET.has(z.id) && !ESET.has(z.id);
/* Zikir sayfası (main) üç bölümü kendi içinde gösterir: Genel · Sabah · Akşam. Açılışta Genel açıktır.
   Eski 'sabah' / 'aksam' / 'genel' görünüm adları (halkalar, bildirim bağlantısı, geçmiş) bu bölümlere yönlendirilir. */
const ZSEC = new Set(['genel', 'sabah', 'aksam']);
let zsec = 'genel';
const curSec = () => view === 'main' ? zsec : ZSEC.has(view) ? view : null;
const inView = z => { const s = curSec(); return s === 'sabah' ? MSET.has(z.id) : s === 'aksam' ? ESET.has(z.id) : s === 'genel' ? isGenel(z) : false; };
const visible = () => { const l = S.zikirs.filter(inView); return curSec() === 'genel' ? sortByDuaOrder(l) : l; }; // odak modunda ileri/geri de ekrandaki sırayla

function setView(v, instant = false) {
  ttsStop();
  readExt = false; RET = null;
  const toSec = ZSEC.has(v);
  if (toSec) { zsec = v; v = 'main'; }
  view = VIEWS[v] ? v : 'main';
  searchEl.value = '';
  renderCards();
  const behavior = instant ? 'auto' : 'smooth';
  // Sekme kökleri sayfanın en üstünden açılır; bir zikir bölümüne gidilirse bölüm düğmelerine; diğer görünümler liste başından.
  if (toSec) $('.home-nav').scrollIntoView({block: 'start', behavior});
  else if (TAB_ROOTS.has(view)) window.scrollTo({top: 0, behavior});
  else $('.list').scrollIntoView({block: 'start', behavior});
}
document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => {
  const v = b.dataset.view;
  if (!ZSEC.has(v)) { setView(view === v ? 'main' : v); return; }
  // Bölüm düğmeleri: sayfa yerinde kalır, altındaki liste değişir
  if (view !== 'main') { setView(v, true); return; }
  if (zsec === v) return;
  ttsStop(); zsec = v; searchEl.value = ''; renderCards();
}));
$('#backAll').addEventListener('click', () => setView(alimBack() ? 'alim' : LIB_CHILD.has(view) ? 'kutuphane' : 'main'));

function renderCards() {
  cardsEl.replaceChildren();
  if (view === 'main') { renderHeroZikr(); renderResume(); renderDaily(); }
  document.body.classList.toggle('compact', S.compact);
  $('#toggleCompact').classList.toggle('active', S.compact);
  $('#toggleCompact').setAttribute('aria-pressed', String(S.compact));
  const list = visible();
  $('#listTitle').textContent = LIBS[view] || view === 'usul' ? VIEWS[view].replace(/^\S+\s/, '') : VIEWS[view]; // kitaplarda başlık emojisiz
  $('.list').hidden = view === 'akis' || view === 'anasayfa';
  feedShow(view === 'akis');
  homeShow(view === 'anasayfa');
  document.body.classList.toggle('at-main', view === 'main');
  $('#backAll').hidden = TAB_ROOTS.has(view);
  const tab = tabOf(view);
  document.body.dataset.tab = tab;
  document.querySelectorAll('.tab').forEach(b => { if (b.dataset.tab === tab) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  $('#backAll').textContent = alimBack() ? '← ' + alimCur : LIB_CHILD.has(view) ? '← Kütüphane' : '← Geri';
  $('#addZikir').hidden = curSec() !== 'genel';
  if (view === 'main') $('#listTitle').textContent = VIEWS[zsec];
  document.querySelectorAll('[data-view]').forEach(b => { const on = (view === 'main' ? b.dataset.view === zsec : b.dataset.view === view) || (b.dataset.view === 'kutuphane' && LIB_CHILD.has(view)); b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
  $('#empty').hidden = list.length > 0 || READ_VIEWS.has(view);
  document.body.classList.toggle('view-selef', READ_VIEWS.has(view));
  document.body.classList.toggle('view-profil', view === 'profil');
  $('#araAll').hidden = true;
  searchEl.placeholder = view === 'kutuphane' ? 'Bütün kütüphanede ara…' : view === 'alim' ? 'Kitaplarında ara…' : view === 'kaydedilen' ? 'Kaydettiklerinde ara…' : view === 'selef' ? 'Söz ara (âlim, anlam, kaynak)…' : view === 'fikih' ? 'Fıkıhta ara (ör. mesh, cuma, zekât)…' : view === 'usul' ? 'Risalede ara (ör. kader, havz, cuma)…' : LIBS[view] ? (LIBS[view].book == null && LIBS[view].nogo ? 'Kitap ara…' : LIBS[view].book == null && !LIBS[view].single ? `${LIBS[view].unit === 'kitap' ? 'Kitap' : 'Bölüm'} ara ya da ${LIBS[view].item} no. yaz (ör. ${LIBS[view].ex})…` : `Bu ${LIBS[view].unit === 'kitap' ? 'kitapta' : 'bölümde'} ara ya da ${LIBS[view].item} no. yaz…`) : 'Zikir ara (ad, anlam, okunuş)…';
  navRecord();
  retPaint();
  if (view === 'akis' || view === 'anasayfa') { update(); return; }
  if (view === 'selef') { renderQuotes(); applyFilter(); update(); return; }
  if (view === 'profil') { renderProfile(); update(); return; }
  if (view === 'fikih') { renderFiqh(); applyFilter(); update(); return; }
  if (LIBS[view]) { renderLib(LIBS[view]); update(); return; }
  if (view === 'usul') { renderUsul(); applyFilter(); update(); return; }
  if (view === 'kutuphane') { renderLibrary(); applyFilter(); update(); return; }
  if (view === 'alim') { renderAlim(); applyFilter(); update(); return; }
  if (view === 'kaydedilen') { renderSaved(); applyFilter(); update(); return; }
  // Genel bölümü dua sırasına göre gruplanır; her grubun açılıp kapanan bir başlığı vardır (numaralar sırayla verilir)
  const grouped = curSec() === 'genel';
  const items = list;
  let lastGroup = null, gNo = 0;
  for (const z of items) {
    const box = document.createElement('article');
    box.className = 'zikir';
    box.dataset.id = z.id;
    const g = grouped ? (groupOf(z) || 'Kendi Zikirlerin') : null;
    if (g && g !== lastGroup) {
      const h = el('button', 'zg-head');
      h.type = 'button';
      h.dataset.zg = g;
      h.append(el('span', 'zg-no', String(++gNo)), el('span', 'zg-t', g), el('span', 'zg-c'), el('span', 'zg-ch'));
      cardsEl.append(h);
    }
    lastGroup = g;
    if (g) { box.dataset.zg = g; if (!zgOpen(g)) box.classList.add('zg-off'); }
    box.innerHTML = `
      <div class="zikir-top">
        <div class="zikir-title"><h3></h3><p class="category"></p></div>
        <button class="count-pill" type="button" data-act="done" aria-pressed="false"></button>
        <button class="more" type="button" data-act="edit" aria-label="Düzenle">⋯</button>
      </div>
      <p class="arabic" lang="ar" dir="rtl"></p>
      <p class="translit"></p>
      <p class="meaning"></p>
      <p class="z-hadis"></p>
      <p class="z-say"></p>
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
    // Zikrin geldiği hadis ve kaynağı (hadis.js); kendi eklenen zikirlerde yok
    const hd = z.custom ? null : zikirHadis(z.id), he = box.querySelector('.z-hadis');
    if (hd) {
      if (hd[0]) he.append(el('span', 'zh-t', hd[0]));
      he.append(el('span', 'zh-s', hd[1]));
    } else he.hidden = true;
    cardsEl.append(box);
  }
  applyFilter();
  update();
}

/* ---------- Arama ---------- */
const searchEl = $('#search');
const norm = t => String(t).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f’'`]/g, '').replace(/ı/g, 'i');
/* Sözler sayfası: üstte günün sözü ve âlim düğmeleri; “Hepsi”nde her âlim açılıp kapanan bir grup (açıklar `zikrim-soz-acik`'ta),
   bir âlim seçilince yalnız onun sözleri açık görünür (seçim `zikrim-soz-alim`'de). Aramada bütün eşleşenler görünür. */
const QW_SHORT = w => w.replace(/ \(.*\)$/, '');
let QSEL = null, QOPEN = null; // ilk çizimde yüklenir (store aşağıda tanımlı)
function quoteStar(q) {
  const [v, b, n] = q.go, k = v === 'usul' ? 'usul:' + n : pickKey({v, b, n});
  const s = el('button', 'star q-star');
  s.type = 'button';
  const paint = () => { const on = isSaved(k); s.innerHTML = STAR_SVG; s.classList.toggle('on', on); s.setAttribute('aria-pressed', String(on)); s.setAttribute('aria-label', on ? 'Kaydettiklerimden çıkar' : 'Kaydet'); };
  paint();
  s.addEventListener('click', async e => {
    e.stopPropagation();
    if (v === 'usul') {
      if (isSaved(k)) RD.saved = RD.saved.filter(x => x.k !== k);
      else { const u = USUL.find(x => x[0] === n); if (u) RD.saved.unshift({k, at: Date.now(), v: 'usul', u, title: 'Usûlü’s-Sünne'}); }
      store.set('zikrim-saved', RD.saved);
    } else await toggleSavePick({v, b, n});
    cardsEl.querySelectorAll('.q-star').forEach(x => x.dispatchEvent(new Event('repaint')));
  });
  s.addEventListener('repaint', paint);
  return s;
}
function quoteCard(q, cls) {
  const box = document.createElement('article');
  box.className = 'quote' + (cls ? ' ' + cls : '');
  box.innerHTML = '<p class="arabic" lang="ar" dir="rtl"></p><p class="q-tr"></p><p class="q-src"></p>';
  box.querySelector('.arabic').textContent = q.ar;
  box.querySelector('.q-tr').textContent = q.tr;
  const src = box.querySelector('.q-src');
  src.textContent = QW_SHORT(q.who) + ' · ' + q.src;
  if (q.go) {
    // Kaynak kütüphanede: dokununca kitapta o madde açılır; ☆ o rivayeti Kaydettiklerim'e ekler
    const b = el('button', 'q-go', 'Kitapta aç ›');
    b.type = 'button';
    b.addEventListener('click', () => goTo(q.go[0], q.go[1], q.go[2], true, {label: 'Sözler', back: () => setView('selef', true)}));
    src.append(' ', b);
    box.append(quoteStar(q));
  }
  box.insertBefore(ttsRow([['ar', '▶ Arapça', () => [{el: box.querySelector('.arabic'), text: prepAr(q.ar)}]], ['tr', '▶ Türkçe', () => [{el: box.querySelector('.q-tr'), text: prepTr(q.tr)}]]]), box.querySelector('.q-src'));
  box.dataset.search = [q.who, q.tr, q.src].join(' ');
  return box;
}
function renderQuotes() {
  if (QSEL === null) { QSEL = store.get('zikrim-soz-alim', ''); QOPEN = new Set(store.get('zikrim-soz-acik', [])); }
  const whos = [...new Set(QUOTES.map(q => q.who))];
  if (QSEL && !whos.includes(QSEL)) QSEL = '';
  // Günün sözü: her gün sırayla bir söz (bütün kullanıcılarda aynı gün aynı söz)
  const day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
  const today = QUOTES[day % QUOTES.length];
  const head = el('div', 'q-day-h', 'GÜNÜN SÖZÜ');
  const tq = quoteCard(today, 'q-day');
  tq.prepend(head);
  tq.dataset.search = '';
  cardsEl.append(tq);
  // Âlim düğmeleri
  const row = el('div', 'fd-chips q-chips');
  const chip = (w, label, cnt) => {
    const b = el('button', 'fd-chip', label);
    if (cnt) b.append(el('small', null, ' ' + cnt));
    b.type = 'button';
    b.setAttribute('aria-pressed', String(QSEL === w));
    b.addEventListener('click', () => {
      if (QSEL === w) return;
      QSEL = w; store.set('zikrim-soz-alim', w);
      searchEl.value = '';
      const y = scrollY; cardsEl.replaceChildren(); renderQuotes(); applyFilter(); window.scrollTo(0, y);
    });
    return b;
  };
  row.append(chip('', 'Hepsi', QUOTES.length));
  for (const w of whos) row.append(chip(w, QW_SHORT(w), QUOTES.filter(q => q.who === w).length));
  row.dataset.search = '';
  cardsEl.append(row);
  requestAnimationFrame(() => { const on = row.querySelector('[aria-pressed="true"]'); if (on) row.scrollLeft = on.offsetLeft - (row.clientWidth - on.offsetWidth) / 2; });
  for (const w of whos) {
    const qs = QUOTES.filter(q => q.who === w);
    if (QSEL && QSEL !== w) { for (const q of qs) { const c = quoteCard(q, 'qa-off'); cardsEl.append(c); } continue; }
    const open = QSEL === w || QOPEN.has(w);
    if (!QSEL) {
      const h = el('button', 'zg-head qg-head');
      h.type = 'button';
      h.dataset.qg = w;
      h.setAttribute('aria-expanded', String(open));
      const t = el('span', 'zg-t', QW_SHORT(w));
      const d = (w.match(/\((.*)\)$/) || [])[1];
      if (d) t.append(el('small', 'qg-d', ' ' + d));
      h.append(el('span', 'zg-no', String(qs.length)), t, el('span', 'zg-ch'));
      cardsEl.append(h);
    }
    for (const q of qs) { const c = quoteCard(q, open ? '' : 'zg-off'); c.dataset.qg = w; cardsEl.append(c); }
  }
}
cardsEl.addEventListener('click', e => {
  const h = e.target.closest('.qg-head');
  if (!h) return;
  const w = h.dataset.qg, open = !QOPEN.has(w);
  if (open) QOPEN.add(w); else QOPEN.delete(w);
  store.set('zikrim-soz-acik', [...QOPEN]);
  h.setAttribute('aria-expanded', String(open));
  for (const c of cardsEl.querySelectorAll('.quote')) if (c.dataset.qg === w) c.classList.toggle('zg-off', !open);
  if (!open && h.getBoundingClientRect().top < 0) h.scrollIntoView({block: 'start'});
});

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
  // Diğer kitaplarla aynı başlık: kapak, ad, âlim, madde sayısı, Okumaya devam et; nüsha notu katlanır
  const bk = SHELVES.flatMap(s => s.books).find(x => x.v === 'usul');
  const card = el('section', 'bk-head');
  const cv = el('span', 'bk-cover', bk.ar); cv.style.setProperty('--cv', bk.col); cv.lang = 'ar'; cv.dir = 'rtl'; cv.setAttribute('aria-hidden', 'true');
  const txt = el('div', 'bk-txt');
  const who = el('span', 'bk-who', 'Ahmed b. Hanbel ');
  const ar = el('bdi', 'rah', RAH); ar.lang = 'ar'; ar.dir = 'rtl';
  const rw = el('span', 'nowrap', '('); rw.append(ar, ')'); who.append(rw);
  txt.append(el('b', null, bk.t), who, el('small', 'bk-meta', (USUL.length - 1) + ' madde'));
  card.append(cv, txt);
  const last = RD.last.usul;
  if (last) {
    const go = el('button', 'alim-go bk-go');
    go.type = 'button';
    go.append(el('span', null, 'Okumaya devam et'), el('small', null, last.label));
    go.addEventListener('click', () => goTo('usul', null, last.n));
    card.append(go);
  }
  head.append(card, fsBar());
  const note = el('details', 'mus-note-d');
  note.append(el('summary', null, 'Nüsha ve numaralar hakkında'), el('article', 'quote fq-note mus-note', USUL_NOTE));
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
LIBS.safii = {base: 'safii/', key: 'zikrim-safii', unit: 'kitap', item: 'madde', ex: 5, err: 'eş-Şâfiî', nogo: true, bookKey: true,
  label: (n, h) => (h && h[4] && h[4].l) || (n === 0 ? 'Mukaddime' : Number.isInteger(n) ? `No. ${n}` : 'Ara metin'),
  src: (n, m) => `eş-Şâfiî, ${m ? m.tr : ''}${n === 0 ? ', mukaddime' : Number.isInteger(n) ? ', no. ' + n : ''}`,
  note: 'Ebû Abdullah Muhammed b. İdrîs eş-Şâfiî (ö. 204) — kitapları, Türkçe çeviri ve Arapça metniyle. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshalardan alınmıştır; numaralar bu nüshalara göredir, nüshasında numara bulunmayanlarda maddeler sırayla numaralanmıştır. Kitaplar çevrildikçe sırayla eklenecek.'};
LIBS.buhari = {base: 'buhari/', key: 'zikrim-buhari', unit: 'kitap', item: 'rivayet', ex: 5, err: 'el-Buhârî', nogo: true, bookKey: true,
  label: (n, h) => (h && h[4] && h[4].l) || (n === 0 ? 'Mukaddime' : Number.isInteger(n) ? `No. ${n}` : 'Ara metin'),
  src: (n, m) => `el-Buhârî, ${m ? m.tr : ''}${n === 0 ? ', mukaddime' : Number.isInteger(n) ? ', no. ' + n : ''}`,
  note: 'Ebû Abdullah Muhammed b. İsmâîl el-Buhârî (ö. 256) — Sahîh dışındaki kitapları, Türkçe çeviri ve Arapça metniyle. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshalardan alınmıştır; numaralar bu nüshalara göredir. “Ara metin” diye gösterilen kısımlar, rivayetlerin arasındaki Buhârî’nin kendi sözleridir. Kitaplar çevrildikçe sırayla eklenecek.'};
LIBS.ebudavud = {base: 'ebudavud/', key: 'zikrim-ebudavud', unit: 'kitap', item: 'rivayet', ex: 5, err: 'Ebû Dâvûd', nogo: true, bookKey: true,
  label: (n, h) => (h && h[4] && h[4].l) || (n === 0 ? 'Mukaddime' : Number.isInteger(n) ? `No. ${n}` : 'Ara metin'),
  src: (n, m) => `Ebû Dâvûd, ${m ? m.tr : ''}${n === 0 ? ', mukaddime' : Number.isInteger(n) ? ', no. ' + n : ''}`,
  note: 'Ebû Dâvûd Süleymân b. el-Eş‘as es-Sicistânî (ö. 275) — Sünen dışındaki kitapları, Türkçe çeviri ve Arapça metniyle. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshalardan alınmıştır; numaralar bu nüshalara göredir, nüshasında numara bulunmayanlarda maddeler sırayla numaralanmıştır. Kitaplar çevrildikçe sırayla eklenecek.'};
LIBS.harb = {base: 'harb/', key: 'zikrim-harb', unit: 'kitap', item: 'madde', ex: 5, err: 'Harb el-Kirmânî', nogo: true, bookKey: true,
  label: (n, h) => (h && h[4] && h[4].l) || (n === 0 ? 'Mukaddime' : Number.isInteger(n) ? `No. ${n}` : 'Ara metin'),
  src: (n, m) => `Harb el-Kirmânî, ${m ? m.tr : ''}${n === 0 ? ', mukaddime' : Number.isInteger(n) ? ', no. ' + n : ''}`,
  note: 'Ebû Muhammed Harb b. İsmâîl el-Kirmânî (ö. 280) — İmam Ahmed’in ashâbından; kitapları, Türkçe çeviri ve Arapça metniyle. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshalardan alınmıştır. İcmâu’s-selef fi’l-i‘tikâd, Mesâilü Harb’in (Fâyiz b. Ahmed Hâbis neşri) “Bâbu’l-kavl bi’l-mezheb” kısmıdır; nüshada numara yoktur, paragraflar sırayla numaralanmıştır.'};
LIBS.sunan = {base: 'sunan/', key: 'zikrim-sunan', unit: 'bölüm', item: 'hadis', ex: 3641, err: 'Sünen-i Ebî Dâvûd',
  label: n => Number.isInteger(n) ? `No. ${n}` : 'Numarasız müellif metni',
  src: n => `Ebû Dâvûd, es-Sünen, ${Number.isInteger(n) ? 'no. ' + n : 'no. ' + Math.floor(n) + ' sonrası'}`,
  note: 'Ebû Dâvûd Süleymân b. el-Eş‘as es-Sicistânî (ö. 275), es-Sünen — Türkçe çeviri ve Arapça metin. Kaynak, Muhammed Muhyiddin Abdülhamîd tahkikiyle el-Mektebetü’l-Asriyye (Sayda–Beyrut) tarafından yayımlanan dört ciltlik neşrin el-Mektebetü’ş-Şâmile’deki nüshasıdır (no. 1726). Hadis numaraları bu neşre göredir; eserdeki Ebû Dâvûd’un sözleri ve rivayet farkları korunmuştur. Kitap 40 bölümdür. Çevirisi tamamlanan kısımlar açılabilir.'};
LIBS.ibane = {base: 'ibane/', key: 'zikrim-ibane', unit: 'bölüm', item: 'rivayet', ex: 120, err: 'el-İbâne',
  label: (n, h) => (h && h[4] && h[4].l) || (n === 0 ? 'Mukaddime' : Number.isInteger(n) ? `No. ${n}` : 'Ara metin'),
  src: n => `İbn Batta, el-İbânetü’l-kübrâ, ${n === 0 ? 'mukaddime' : Number.isInteger(n) ? 'no. ' + n : 'no. ' + Math.floor(n) + ' sonrası'}`,
  note: 'Ebû Abdullah Ubeydullah b. Muhammed İbn Batta el-Ukberî (ö. 387), el-İbâne an şerîati’l-fırkati’n-nâciye (el-İbânetü’l-kübrâ) — Türkçe çeviri ve Arapça metin. Çeviri ve Arapça metin el-Mektebetü’ş-Şâmile’deki nüshadan (no. 8206, Dârü’r-Râye neşri, 9 cilt) alınmıştır; rivayet numaraları bu nüshaya göredir. Neşir beş kitaptır ve numaralar üç yerde yeniden başlar: Sünnet, Îmân ve Kader (1–2014); Kur’ân (1–501); Sıfatlar (1–273); Hilâfet (1–265). Bu yüzden bölüm adı numarayla birlikte okunmalıdır. Muhakkiklerin girişleri ve notları alınmamıştır. “Ara metin” diye gösterilen kısımlar, rivayetlerin arasındaki İbn Batta’nın kendi sözleridir. Bölümler çevrildikçe sırayla eklenecek.'};
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

// Kitabın (ya da kitaplığın) başlığı: raf renginde küçük kapak (ya da âlim simgesi), ad, âlim, bölüm ve rivayet sayısı, Okumaya devam et
// Kitap sayfasında (book verilince) o kitabın kapağı, adı, “N madde · N bab” sayısı ve o kitapta kaldığın yer gösterilir.
function libHead(L, book = null) {
  const shelf = SHELVES.flatMap(s => s.books);
  const bk = shelf.find(x => x.v === L.view && (x.b == null || (book && x.b === book.i))), al = alimList().find(a => a.books.some(x => x.v === L.view));
  const head = el('section', 'bk-head');
  if (bk) {
    const cv = el('span', 'bk-cover', bk.ar); cv.style.setProperty('--cv', bk.col); cv.lang = 'ar'; cv.dir = 'rtl'; cv.setAttribute('aria-hidden', 'true');
    head.append(cv);
  } else if (al) head.append(alimAv(al, 'alim-av'));
  const txt = el('div', 'bk-txt');
  txt.append(el('b', null, book ? book.meta.tr : bk ? bk.t : LIB_NAMES[L.view] || L.err));
  if (al) { const w = el('span', 'bk-who', al.who + ' '); const r = el('bdi', 'rah', RAH); r.lang = 'ar'; r.dir = 'rtl'; const rw = el('span', 'nowrap', '('); rw.append(r, ')'); w.append(rw); txt.append(w); }
  const t = L.idx.reduce((s, b) => s + (b.t || 0), 0);
  txt.append(el('small', 'bk-meta', book ? `${book.cnt.toLocaleString('tr-TR')} ${L.item}` + (book.babs > 1 ? ` · ${book.babs} bab` : '') : `${L.idx.length} ${L.unit} · ${t.toLocaleString('tr-TR')} ${L.item}`));
  head.append(txt);
  const last = RD.last[L.view];
  if (last && L.idx[last.b] && L.idx[last.b].t && (!book || last.b === book.i)) {
    const go = el('button', 'alim-go bk-go');
    go.type = 'button';
    go.append(el('span', null, 'Okumaya devam et'), el('small', null, `${!book && L.idx.length > 1 && last.title ? last.title.replace(/ \(.*\)$/, '') + ' · ' : ''}${last.label}`));
    go.addEventListener('click', () => goTo(last.v, last.b, last.n));
    head.append(go);
  }
  head.dataset.search = '';
  return head;
}
function libRenderBooks(L, wrap) {
  wrap.replaceChildren();
  // Nüsha notu katlanır: tek satır görünür, dokununca açılır
  const note = el('details', 'mus-note-d');
  note.append(el('summary', null, 'Nüsha ve numaralar hakkında'), el('article', 'quote fq-note mus-note', L.note));
  wrap.append(libHead(L), note, el('div', 'mus-go'));
  const last = RD.last[L.view];
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
    // Sıra numarası, ad, “N rivayet · N bab” (no. aralığı soluk); tamamlanmış bölümde “✓ Türkçe” yazılmaz; okunan bölümde kaldığın yer
    const txt = el('span', 'mus-book-txt');
    const meta = el('small', 'mus-book-n', `${b.n.toLocaleString('tr-TR')} ${L.item}` + (b.b ? ` · ${b.b} bab` : '') + (b.t >= b.n ? '' : b.t ? ` · ${b.t.toLocaleString('tr-TR')}/${b.n.toLocaleString('tr-TR')} çevrildi` : ' · henüz çevrilmedi'));
    meta.append(el('span', 'mus-book-no', ` · no. ${b.from}–${b.to}`));
    txt.append(el('span', 'mus-book-tr', b.tr), meta);
    if (last && last.b === i) { txt.append(el('small', 'mus-book-here', '▸ Kaldığın yer: ' + last.label)); card.classList.add('mus-here'); }
    card.append(el('span', 'mus-book-i', String(i + 1)), txt);
    if (b.t) card.classList.add('mus-done'); else card.disabled = true;
    card.dataset.search = b.tr;
    card.addEventListener('click', () => libOpen(L, i));
    wrap.append(card);
  });
}

function libOpen(L, i, target = null) {
  L.book = i; L.target = target; libSave(L); readExt = false; RET = null;
  searchEl.value = '';
  renderCards();
  $('.list').scrollIntoView({block: 'start'});
}

/* Râvi paneli: yalnızca eserin kendi metnindeki bilgiler. h[4] = {c: [isim, sîga, isim, ...], n: [metindeki notlar]} */
const SIGA = {'haddesenâ': 'bize anlattı', 'haddesenî': 'bana anlattı', 'ahberanâ': 'bize haber verdi', 'ahberanî': 'bana haber verdi', 'enbe’enâ': 'bize bildirdi', 'semi‘tü': 'işittim', 'semi‘a': 'işitti', 'an': '“-den” (an‘ane)', 'enne': '“ki…” diye', 'kâle': 'dedi', 'haddesehû': 'ona anlattı', 'haddesehüm': 'onlara anlattı', 'ahberahû': 'ona haber verdi', 'ahberahüm': 'onlara haber verdi', 'kara’tü': 'ona okudum (kıraat)', 'kurie': 'ona okundu (kıraat)', 'unbi’tü': 'bana bildirildi'};
/* İsnad zinciri: info.c tek zincir [isim, sîga, isim, …] ya da tahvîlde zincirler dizisi [[…], […]].
   Dikey çizilir: râvi, altında bir sonrakinden aldığı sîga, sonra o râvi. Tahvîlde her yol ayrı,
   bütün yollarda ortak olan son kısım “Yollar burada birleşir” başlığıyla bir kez gösterilir. */
// Zincirdeki ad: dokununca râvi sayfası (ravi.json) açılır; “babası”, “bir adam” gibi tanımlar ve müellif düğme değildir
function rvNode(name, last) {
  const li = el('li', 'rv-node' + (last ? ' last' : ''));
  if (RAVI.skip.has(name) || RAVI_AKRABA.test(name) || RAVI_MUELLIF.has(name)) { li.textContent = name; return li; }
  // “X ve Y” ortak hoca kutusu: her ad ayrı düğme
  const parts = raviSplit(name);
  parts.forEach((nm, i) => {
    if (i) li.append(' ve ');
    const b = el('button', 'rv-nb', nm); b.type = 'button'; b.title = 'Râvi sayfası';
    b.addEventListener('click', () => raviOpen(nm));
    li.append(b);
  });
  return li;
}
// “Hafs b. Ömer ve Müslim b. İbrâhîm” → iki ad (parantez içindeki “ve” bölünmez); ravi_kur.py ile aynı kural
function raviSplit(name) {
  if (!name.includes(' ve ')) return [name];
  const out = []; let depth = 0, cur = '';
  for (let i = 0; i < name.length; i++) {
    const ch = name[i];
    if (ch === '(') depth++; else if (ch === ')') depth--;
    if (!depth && name.startsWith(' ve ', i)) { out.push(cur.trim()); cur = ''; i += 3; continue; }
    cur += ch;
  }
  out.push(cur.trim());
  return out.filter(Boolean);
}
function rvChains(d, c) {
  const chains = (Array.isArray(c[0]) ? c : [c]).map(z => ({names: z.filter((_, i) => i % 2 === 0), sigs: z.filter((_, i) => i % 2 === 1)}));
  const sigEl = s => {
    const li = el('li', 'rv-link');
    li.append(el('span', 'rv-s', s));
    const g = SIGA[String(s).split(' ')[0]];
    if (g && !String(s).includes('(')) li.append(el('small', 'rv-g', g));
    return li;
  };
  // tl: names[a..b] ve aralarındaki sîgalar; lead: ilk isimden önce gelen sîga (ortak kısmın girişi)
  const tl = (z, a, b, opt = {}) => {
    const ol = el('ol', 'rv-tl');
    for (let i = a; i <= b; i++) {
      if (i > a) ol.append(sigEl(z.sigs[i - 1]));
      ol.append(rvNode(z.names[i], opt.last && i === b));
    }
    if (opt.tail) ol.append(sigEl(opt.tail), el('li', 'rv-node rv-join', '↓ birleşme'));
    return ol;
  };
  // Bütün yollarda isim ve sîgasıyla aynı olan son kısım
  let k = 0;
  if (chains.length > 1) {
    const min = Math.min(...chains.map(z => z.names.length));
    while (k < min - 1) {
      const j = z => z.names.length - 1 - k;
      const ref = chains[0];
      if (!chains.every(z => z.names[j(z)] === ref.names[j(ref)] && (k === 0 || z.sigs[j(z)] === ref.sigs[j(ref)]))) break;
      k++;
    }
  }
  d.append(el('p', 'rv-h', 'Her râvi, kendisinden sonraki râviden hadisi hangi lafızla aldığını söylüyor:'));
  if (chains.length === 1) { d.append(tl(chains[0], 0, chains[0].names.length - 1, {last: true})); return; }
  const wrap = el('div', 'rv-yollar');
  chains.forEach((z, i) => {
    const box = el('div', 'rv-yol');
    box.append(el('p', 'rv-yol-h', `${i + 1}. yol`));
    const end = z.names.length - 1 - k;
    box.append(k ? tl(z, 0, end, {tail: z.sigs[end]}) : tl(z, 0, z.names.length - 1, {last: true}));
    wrap.append(box);
  });
  d.append(wrap);
  if (k) {
    const z = chains[0], s = z.names.length - k;
    d.append(el('p', 'rv-yol-h rv-ortak-h', 'Yollar burada birleşir'));
    d.append(tl(z, s, z.names.length - 1, {last: true}));
  }
}
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
    // Sened/metin ayrımı: veride işaretliyse (info.k, metnin Arapçadaki başlangıcı) o, yoksa sezgi
    const k = info && Number.isInteger(info.k) && info.k > 0 && info.k < ar.length ? info.k : arSplit(ar);
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
      if (info.c && info.c.length > 1) rvChains(d, info.c);
      if (info.n && info.n.length) {
        d.append(el('p', 'rv-h', 'Metindeki kayıtlar:'));
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
  back.addEventListener('click', () => { L.book = null; libSave(L); readExt = false; RET = null; searchEl.value = ''; renderCards(); });
  const cnt = L.data.babs.reduce((s, b) => s + b.h.length, 0);
  // Kitap dizinindeki gibi: kapaklı başlık + Okumaya devam et, katlanan nüsha notu, numaralı bab kartları
  head.append(back, libHead(L, {meta, i: L.book, cnt, babs: L.data.babs.length}), fsBar());
  wrap.append(head);
  if (L.single && L.note) {
    const note = el('details', 'mus-note-d');
    note.append(el('summary', null, 'Nüsha ve numaralar hakkında'), el('article', 'quote fq-note mus-note', L.note));
    wrap.append(note);
  }
  const lastR = RD.last[L.view] && RD.last[L.view].b === L.book ? RD.last[L.view] : null;
  wrap.append(el('div', 'mus-go'), el('div', 'mus-results'));
  const list = el('div', 'mus-babs');
  const single = L.data.babs.length === 1;
  L.data.babs.forEach((b, i) => {
    const d = el('details', 'fq-cat mus-bab');
    const sum = el('summary');
    const txt = el('span', 'mus-bab-txt');
    txt.append(el('span', 'mus-bab-tr', b.t || 'Kitabın başı'), el('small', 'mus-bab-n', `${b.h.length} ${L.item}`));
    if (lastR && b.h.some(x => x[0] === lastR.n)) { txt.append(el('small', 'mus-book-here', '▸ Kaldığın yer: ' + lastR.label)); d.classList.add('mus-here'); }
    sum.append(el('span', 'mus-book-i', String(i + 1)), txt);
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
const RD = {last: store.get('zikrim-last', {}), saved: store.get('zikrim-saved', []), fs: store.get('zikrim-fs', 16), cols: store.get('zikrim-koleksiyonlar', []), colFilter: ''};
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
/* Okunan rivayetler (`sekine-okunan`: {kitaplık: ["kitap:no", …]}): ekranın okuma bandında (kaldığın yer bandı) 1,5 sn duran madde
   okunmuş sayılır; hızlı kaydırırken geçilenler sayılmaz. Sayım bu özellik eklendiğinden (v167) beri tutulur. */
const OKU = store.get('sekine-okunan', {}), OKU_SET = {}, OKU_DIRTY = new Set();
// Günlük okuma: `sekine-okuma-gun` {gün: yeni okunan rivayet sayısı}; günlük hedef `sekine-okuma-hedef` (varsayılan 10, 0 = kapalı)
const OKU_GUN = store.get('sekine-okuma-gun', {});
const okuGoal = () => { const g = Number(store.get('sekine-okuma-hedef', 10)); return g >= 0 ? g : 10; };
let okuTimer = 0;
const okuSet = v => OKU_SET[v] || (OKU_SET[v] = new Set(Array.isArray(OKU[v]) ? OKU[v] : []));
const okuKey = (b, n) => (b == null ? '' : b) + ':' + n;
function okuMark(x) {
  const s = okuSet(x.v), k = okuKey(x.b, x.n);
  if (s.has(k)) return;
  s.add(k); OKU_DIRTY.add(x.v);
  const d = dayKey(), g = okuGoal();
  OKU_GUN[d] = (OKU_GUN[d] || 0) + 1;
  if (g && OKU_GUN[d] === g) toast('Bugünkü okuma hedefi tamamlandı 📖');
  clearTimeout(okuTimer);
  okuTimer = setTimeout(() => { for (const v of OKU_DIRTY) OKU[v] = [...okuSet(v)]; OKU_DIRTY.clear(); store.set('sekine-okunan', OKU); store.set('sekine-okuma-gun', OKU_GUN); }, 800);
}
const okuCount = () => Object.keys(OKU).reduce((a, v) => a + okuSet(v).size, 0);
const okuBook = (v, b) => { const p = (b == null ? '' : b) + ':'; let c = 0; for (const k of okuSet(v)) if (k.startsWith(p)) c++; return c; };
let readObs = null, readTimer = 0;
const readDwell = new Map();
function trackRead(root, info) {
  if (readObs) readObs.disconnect();
  for (const t of readDwell.values()) clearTimeout(t);
  readDwell.clear();
  if (!('IntersectionObserver' in window)) return;
  readObs = new IntersectionObserver(es => {
    for (const e of es) {
      const t = e.target;
      if (e.isIntersecting && t.dataset.n != null) {
        if (!readExt) {
          const x = info(t); x.at = Date.now();
          RD.last[x.v] = x;
          clearTimeout(readTimer); readTimer = setTimeout(() => store.set('zikrim-last', RD.last), 600);
        }
        if (!readDwell.has(t)) readDwell.set(t, setTimeout(() => { readDwell.delete(t); if (t.isConnected) okuMark(info(t)); }, 1500));
      } else if (readDwell.has(t)) { clearTimeout(readDwell.get(t)); readDwell.delete(t); }
    }
  }, {rootMargin: '-35% 0px -55% 0px'});
  const watch = () => root.querySelectorAll('.mus-h').forEach(a => { if (!a.dataset.obs) { a.dataset.obs = 1; readObs.observe(a); } });
  watch();
  new MutationObserver(watch).observe(root, {childList: true, subtree: true});
}
const isSaved = k => RD.saved.some(x => x.k === k);
// Rivayetlerdeki kaydet yıldızı: çizgi (boş) ya da dolu yıldız simgesi, numara satırıyla aynı hizada yuvarlak düğme
const STAR_SVG = '<svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true"><path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
function starBtn(k, make) {
  const b = el('button', 'star');
  b.type = 'button';
  const paint = () => { const on = isSaved(k); b.innerHTML = STAR_SVG; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? 'Kaydettiklerimden çıkar' : 'Kaydet'); };
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
// Havuzdaki bir rivayetin kayıt anahtarı ve kaydet/çıkar işlemi (ana sayfa kartı ve akış ortak kullanır)
const pickKey = ({v, b, n}) => v + ':' + (LIBS[v].bookKey ? b + ':' : '') + n;
async function toggleSavePick({v, b, n}) {
  const k = pickKey({v, b, n});
  if (isSaved(k)) RD.saved = RD.saved.filter(x => x.k !== k);
  else {
    try {
      const L = LIBS[v]; L.idx = L.idx || await libFetch(L, 'index.json');
      const meta = L.idx[b]; const data = await libFetch(L, 'tr/' + meta.f);
      let h = null; for (const bb of data.babs) { h = bb.h.find(x => x[0] === n); if (h) break; }
      if (!h) return false;
      RD.saved.unshift({k, at: Date.now(), v, b, h, title: meta.tr});
    } catch (e) { toast('Kaydedilemedi; internet bağlantını kontrol et'); return false; }
    toast('Kaydettiklerime eklendi', {label: 'Koleksiyona ekle', run: () => colOpen(k)});
  }
  store.set('zikrim-saved', RD.saved);
  const c = $('#cntSaved'); if (c) c.textContent = RD.saved.length;
  return true;
}

/* ---------- Koleksiyonlar: kaydedilenler klasörlere ayrılır (Sabır, Anne-baba…) ----------
   Adlar `zikrim-koleksiyonlar` anahtarında; bir kaydın koleksiyonları kaydın kendisinde (`c` dizisi). */
const colSheet = $('#colSheet');
let colKey = null;
const colSave = () => { store.set('zikrim-koleksiyonlar', RD.cols); store.set('zikrim-saved', RD.saved); };
const colCount = name => RD.saved.filter(x => (x.c || []).includes(name)).length;
function colOpen(k) {
  const x = RD.saved.find(y => y.k === k);
  if (!x) return;
  colKey = k;
  colPaint();
  $('#colNew').value = '';
  colSheet.showModal();
}
function colPaint() {
  const x = RD.saved.find(y => y.k === colKey);
  const list = $('#colList');
  list.replaceChildren();
  if (!RD.cols.length) list.append(el('p', 'col-empty', 'Henüz koleksiyon yok. Aşağıdan bir ad yazıp ekle.'));
  for (const name of RD.cols) {
    const row = el('label', 'col-row');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!(x && (x.c || []).includes(name));
    cb.addEventListener('change', () => {
      if (!x) return;
      const set = new Set(x.c || []);
      if (cb.checked) set.add(name); else set.delete(name);
      x.c = RD.cols.filter(n => set.has(n));
      colSave();
      row.querySelector('small').textContent = colCount(name);
    });
    row.append(cb, el('span', null, name), el('small', null, String(colCount(name))));
    list.append(row);
  }
}
function colAdd() {
  const inp = $('#colNew');
  const name = inp.value.trim().replace(/\s+/g, ' ');
  if (!name) return;
  if (!RD.cols.some(n => n.toLocaleLowerCase('tr') === name.toLocaleLowerCase('tr'))) RD.cols.push(name);
  const x = RD.saved.find(y => y.k === colKey);
  const real = RD.cols.find(n => n.toLocaleLowerCase('tr') === name.toLocaleLowerCase('tr'));
  if (x) { const set = new Set(x.c || []); set.add(real); x.c = RD.cols.filter(n => set.has(n)); }
  colSave();
  inp.value = '';
  colPaint();
}
$('#colAdd').addEventListener('click', colAdd);
$('#colNew').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); colAdd(); } });
$('#colDone').addEventListener('click', () => colSheet.close());
colSheet.addEventListener('close', () => { colKey = null; if (view === 'kaydedilen') renderCards(); });

/* ---------- Akış: bütün kitaplıklardan rastgele rivayetler, tam ekran kartlarla ---------- */
// Havuz (seçili kitaplığa göre süzülür) oturum başında bir kez karıştırılır, aynı rivayet tekrar çıkmaz. Kartlar sona yaklaştıkça eklenir.
// Ekrana sığmayan rivayet, kart çizildikten sonra ölçülerek atlanır (küçük ekran ve büyük yazıda da doğru çalışır).
const feedEl = $('#feed'), feedBarEl = $('#feedBar');
// Havuz: akis.json (araclar/akis.py üretir; ana sayfa kartının gunun.json'undan ayrıdır, isnad ve bab başlığı da içerir).
let AKIS = null, akisP = null;
// akis.json bir kez indirilir; Akış ve Anasayfa aynı havuzu kullanır (her biri kendi karışık sırasıyla).
const akisLoad = () => akisP || (akisP = fetch('akis.json').then(r => { if (!r.ok) throw new Error('akis.json'); return r.json(); }).then(D => { AKIS = D; return D; }).catch(e => { akisP = null; throw e; }));
function akisShuffled(D) {
  const all = [];
  for (const v of Object.keys(D)) if (LIBS[v] && D[v].h) for (const it of D[v].h) all.push({v, b: it[0], n: it[1], t: it[2], s: it[3] || '', bab: D[v].babs[it[4]] || ''});
  for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
  return all;
}
const FEED = {all: null, pool: null, i: 0, y: 0, busy: false, filter: store.get('zikrim-akis-filtre', ''), tapCard: null, tapAt: 0};
// Filtre etiketleri bu sırayla gösterilir (havuzda olmayan kitaplık atlanır)
const FD_LIBS = [['musned', 'Müsned'], ['musannef', 'Musannef'], ['zuhd', 'Zühd'], ['fezail', 'Fezâil'], ['seria', 'eş-Şerîa'], ['acurri', 'el-Âcurrî'], ['ibnebiseybe', 'İbn Ebî Şeybe'], ['ahmed', 'İmam Ahmed'], ['hallal', 'el-Hallâl'], ['berbehari', 'Berbehârî'], ['safii', 'eş-Şâfiî'], ['buhari', 'el-Buhârî'], ['ebudavud', 'Ebû Dâvûd'], ['harb', 'Harb'], ['ibane', 'el-İbâne'], ['sunan', 'Sünen-i Ebî Dâvûd']];
function feedShow(on) {
  if (!on) { if (!feedEl.hidden) { FEED.y = feedEl.scrollTop; feedEl.hidden = true; feedBarEl.hidden = true; } return; }
  feedEl.hidden = false; feedBarEl.hidden = false;
  if (FEED.all) { feedEl.scrollTop = FEED.y; return; }
  feedEl.replaceChildren(el('div', 'fd-msg', 'Yükleniyor…'));
  akisLoad().then(D => {
    if (FEED.all) return;
    FEED.all = akisShuffled(D);
    if (FEED.filter && !D[FEED.filter]) FEED.filter = '';
    feedBar();
    feedReset();
  }).catch(() => feedEl.replaceChildren(el('div', 'fd-msg', 'Rivayetler yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.')));
}
// Üstteki kitap filtresi: Hepsi · Müsned · Musannef · …
function feedBar() {
  const row = el('div', 'fd-chips');
  const chip = (v, label) => {
    const b = el('button', 'fd-chip', label);
    b.type = 'button';
    b.setAttribute('aria-pressed', String(FEED.filter === v));
    b.addEventListener('click', () => {
      if (FEED.filter === v) return;
      FEED.filter = v; store.set('zikrim-akis-filtre', v);
      row.querySelectorAll('.fd-chip').forEach(c => c.setAttribute('aria-pressed', String(c === b)));
      b.scrollIntoView({inline: 'center', block: 'nearest', behavior: 'smooth'});
      feedReset();
    });
    return b;
  };
  row.append(chip('', 'Hepsi'));
  for (const [v, label] of FD_LIBS) if (AKIS[v]) row.append(chip(v, label));
  feedBarEl.replaceChildren(row);
  const on = row.querySelector('[aria-pressed="true"]'); if (on) requestAnimationFrame(() => on.scrollIntoView({inline: 'center', block: 'nearest'}));
}
function feedReset() {
  FEED.pool = FEED.filter ? FEED.all.filter(p => p.v === FEED.filter) : FEED.all;
  FEED.i = 0; FEED.y = 0; FEED.cur = null;
  feedEl.replaceChildren();
  feedEl.scrollTop = 0;
  feedMore(6);
}
const feedSrc = p => { if (p.src) return p.src; const L = LIBS[p.v], book = AKIS[p.v].books[p.b]; return L.bookKey ? L.src(p.n, {tr: book}) : L.single ? L.src(p.n) : L.src(p.n) + ' · ' + book; };
// Kart (D şablonu): üstte isnad zinciri (râviler yukarıdan aşağı, son halka vurgulu), altında metin, en altta kaynak ve bab
function feedCard(p, first) {
  const a = el('article', 'fd-card');
  a._p = p;
  const box = el('div', 'fd-in');
  const yollar = p.s ? p.s.split(/\s*;\s*ayrıca\s*/) : [];
  const names = yollar.length ? yollar[0].split(/\s*→\s*/).filter(Boolean) : [];
  if (names.length) {
    const ol = el('ol', 'fd-chain');
    ol.setAttribute('aria-label', 'İsnad');
    names.forEach((nm, i) => { const li = el('li', i === names.length - 1 ? 'last' : null, nm); li.style.setProperty('--i', i); ol.append(li); });
    box.append(el('span', 'fd-isn-h', 'İsnad'), ol);
    if (yollar.length > 1) box.append(el('span', 'fd-isn-ek', yollar.length === 2 ? '+ bir yoldan daha' : `+ ${yollar.length - 1} yoldan daha`));
  }
  const t = el('p', 'fd-t' + (p.t.length < 140 ? ' s' : p.t.length > 300 ? ' l' : ''), p.t);
  const src = feedSrc(p);
  box.append(t, el('p', 'fd-src', src));
  if (p.bab && !src.includes(p.bab)) box.append(el('p', 'fd-bab', 'Bab: ' + p.bab)); // Müsned'de bab adı müsnedin adıdır, tekrar yazılmaz
  const side = el('div', 'fd-side');
  const star = el('button', null);
  star.type = 'button';
  const paint = () => { const on = isSaved(pickKey(p)); star.textContent = on ? '★' : '☆'; star.classList.toggle('on', on); star.setAttribute('aria-pressed', String(on)); star.setAttribute('aria-label', on ? 'Kaydettiklerimden çıkar' : 'Kaydet'); };
  paint();
  a._paint = paint;
  star.addEventListener('click', async () => { await toggleSavePick(p); paint(); });
  const open = el('button', null, '📖');
  open.type = 'button'; open.setAttribute('aria-label', 'Kitapta aç'); open.title = 'Kitapta aç';
  open.addEventListener('click', () => { ttsStop(); goTo(p.v, p.b, p.n, true, {label: 'Akış', back: () => setView('akis', true)}); });
  const shot = el('button', null, '📸');
  shot.type = 'button'; shot.setAttribute('aria-label', 'Görüntü olarak kaydet ya da paylaş'); shot.title = 'Görüntü olarak kaydet';
  shot.addEventListener('click', () => shotOpen(p));
  side.append(star, open, shot);
  a.append(box, side);
  if (first) box.append(el('span', 'fd-hint', '↑ Kaydır · çift dokununca kaydet'));
  return a;
}
function feedMore(count) {
  if (!FEED.pool || FEED.busy) return;
  FEED.busy = true;
  let added = 0, tries = 0;
  while (added < count && FEED.i < FEED.pool.length && tries < count * 8) {
    tries++;
    const p = FEED.pool[FEED.i++];
    const card = feedCard(p, !feedEl.children.length);
    feedEl.append(card);
    const box = card.firstChild;
    if (box.scrollHeight > box.clientHeight + 2) { card.remove(); continue; } // ekrana sığmıyor: atla
    if (FEED.obs) FEED.obs.observe(card); else card.classList.add('in');
    added++;
  }
  if (FEED.i >= FEED.pool.length && !feedEl.querySelector('.fd-end')) feedEl.append(el('div', 'fd-card fd-msg fd-end', feedEl.querySelector('.fd-card') ? 'Bu seçimdeki bütün rivayetleri gördün. Akış yeniden açıldığında yeniden karışır.' : 'Bu kitapta ekrana sığan rivayet bulunamadı.'));
  FEED.busy = false;
}
// Görüntü: kart 1080 px genişliğinde bir görsele çizilir (isnad zinciri, metin, kaynak, bab, altta “Sekîne”).
// Boyut: Gönderi 4:5 (en az 1350 px) ya da Story 9:16 (en az 1920 px). Zemin: o anki tema, Kâğıt, Lacivert ya da kitabın raftaki kapak rengi.
const SHOT_PAL = {
  kagit: {bg: '#faf4ea', card: '#fffdf8', border: '#e9dbc8', text: '#4a3526', muted: '#94795b', accent: '#a97743'},
  lacivert: {bg: '#0d1526', card: '#172339', border: '#2a3a52', text: '#f3f5fc', muted: '#a8b5c9', accent: '#d8bb81'}
};
const bookColor = p => { for (const sh of SHELVES) for (const bk of sh.books) if (bk.v === p.v && (bk.b == null || bk.b === p.b)) return bk.col; return '#4d8062'; };
function shotPalette(p, bg) {
  if (SHOT_PAL[bg]) return SHOT_PAL[bg];
  if (bg === 'kitap') return {bg: bookColor(p), card: 'rgba(255,255,255,0.09)', border: 'rgba(255,255,255,0.24)', text: '#ffffff', muted: 'rgba(255,255,255,0.74)', accent: '#ffffff'};
  const css = getComputedStyle(document.body), col = n => css.getPropertyValue(n).trim() || '#000';
  return {bg: col('--bg'), card: col('--card'), border: col('--border'), text: col('--text'), muted: col('--muted'), accent: col('--accent')};
}
function shotCanvas(p, size = 'post', bg = 'tema') {
  const C = shotPalette(p, bg);
  const FAM = getComputedStyle(document.documentElement).fontFamily || 'sans-serif';
  const W = 1080, PAD = 64, IN = 72, TX = PAD + IN, TW = W - 2 * TX, FOOT = 130;
  const cv = document.createElement('canvas'), ctx = cv.getContext('2d');
  const font = (w, sz, style = '') => `${style} ${w} ${sz}px ${FAM}`.trim();
  const wrap = (txt, f, maxW) => {
    ctx.font = f;
    const lines = [];
    for (const para of String(txt).split('\n')) {
      let line = '';
      for (const word of para.split(/\s+/).filter(Boolean)) {
        const t = line ? line + ' ' + word : word;
        if (ctx.measureText(t).width <= maxW || !line) line = t; else { lines.push(line); line = word; }
      }
      lines.push(line);
    }
    return lines;
  };
  // Önce yerleşim, sonra çizim
  const names = p.s ? p.s.split(/\s*;\s*ayrıca\s*/)[0].split(/\s*→\s*/).filter(Boolean) : [];
  const NAME = font(400, 32), NAME_B = font(700, 32), SRC = font(400, 28), BAB = font(400, 28, 'italic');
  const big = size === 'story' ? 4 : 0;
  const TXT = font(400, (p.t.length < 140 ? 48 : p.t.length > 300 ? 40 : 44) + big);
  const txtLH = (p.t.length < 140 ? 72 : p.t.length > 300 ? 62 : 67) + big * 1.5;
  const chain = names.map((nm, i) => wrap(nm, i === names.length - 1 ? NAME_B : NAME, TW - 44));
  const body = wrap(p.t, TXT, TW);
  const srcTxt = feedSrc(p), src = wrap(srcTxt, SRC, TW);
  const bab = p.bab && !srcTxt.includes(p.bab) ? wrap('Bab: ' + p.bab, BAB, TW) : [];
  const cardH = IN + (names.length ? 40 + chain.reduce((t, l) => t + l.length * 42 + 10, 0) + 34 : 0) + body.length * txtLH + 34 + src.length * 40 + (bab.length ? 12 + bab.length * 40 : 0) + IN;
  const H = Math.max(size === 'story' ? 1920 : 1350, PAD + cardH + FOOT);
  cv.width = W; cv.height = H;
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  const top = Math.round((H - FOOT - cardH) / 2 + (size === 'story' ? 10 : 0));
  ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(PAD, top, W - 2 * PAD, cardH, 48); else ctx.rect(PAD, top, W - 2 * PAD, cardH); // roundRect: iOS 16+
  ctx.fillStyle = C.card; ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = C.border; ctx.stroke();
  ctx.textBaseline = 'alphabetic';
  let y = top + IN;
  if (names.length) {
    ctx.font = font(700, 22); ctx.fillStyle = C.muted; ctx.fillText('İ S N A D', TX, y + 22); y += 52;
    chain.forEach((lines, i) => {
      const last = i === names.length - 1, dotY = y + 12;
      if (!last) { ctx.fillStyle = C.border; ctx.fillRect(TX + 10, dotY + 12, 3, lines.length * 42 + 10 - 12); }
      ctx.beginPath(); ctx.arc(TX + 11.5, dotY, 9, 0, Math.PI * 2);
      if (last) { ctx.fillStyle = C.accent; ctx.fill(); } else { ctx.fillStyle = C.bg; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.muted; ctx.stroke(); }
      ctx.font = last ? NAME_B : NAME; ctx.fillStyle = last ? C.accent : C.muted;
      lines.forEach((ln, k) => ctx.fillText(ln, TX + 44, y + 24 + k * 42));
      y += lines.length * 42 + 10;
    });
    y += 22;
  }
  ctx.font = TXT; ctx.fillStyle = C.text;
  body.forEach((ln, k) => ctx.fillText(ln, TX, y + txtLH * 0.75 + k * txtLH));
  y += body.length * txtLH + 34;
  ctx.font = SRC; ctx.fillStyle = C.muted;
  src.forEach((ln, k) => ctx.fillText(ln, TX, y + 28 + k * 40));
  y += src.length * 40;
  if (bab.length) { ctx.font = BAB; y += 12; bab.forEach((ln, k) => ctx.fillText(ln, TX, y + 28 + k * 40)); }
  ctx.textAlign = 'center';
  ctx.font = font(700, 36); ctx.fillStyle = C.accent; ctx.fillText('Sekîne ✦', W / 2, H - 70);
  return cv;
}
// Paylaşım menüsü aynı dokunuşun içinde açılsın diye görsel eşzamanlı dosyaya çevrilir (toDataURL)
function shareCanvas(cv, name) {
  const url = cv.toDataURL('image/png');
  const bin = atob(url.split(',')[1]), buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  const file = new File([buf], name, {type: 'image/png'});
  if (navigator.canShare && navigator.canShare({files: [file]})) {
    navigator.share({files: [file]}).catch(e => { if (e && e.name !== 'AbortError') toast('Paylaşılamadı'); });
  } else {
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
    toast('Görüntü indirildi');
  }
}
// 📸 sayfası: boyut ve zemin seçilir, önizleme anında güncellenir; seçim `zikrim-akis-gorsel`'de hatırlanır
const shotSheet = $('#shotSheet');
const SHOT = Object.assign({size: 'post', bg: 'tema'}, store.get('zikrim-akis-gorsel', {}), {p: null, cv: null});
function shotPaint() {
  for (const [id, key] of [['#shotSize', 'size'], ['#shotBg', 'bg']]) $(id).querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === SHOT[key])));
  SHOT.cv = shotCanvas(SHOT.p, SHOT.size, SHOT.bg);
  $('#shotImg').src = SHOT.cv.toDataURL('image/jpeg', 0.7);
}
function shotOpen(p) { SHOT.p = p; shotPaint(); shotSheet.showModal(); }
for (const [id, key] of [['#shotSize', 'size'], ['#shotBg', 'bg']]) $(id).addEventListener('click', e => {
  const b = e.target.closest('button[data-v]'); if (!b) return;
  SHOT[key] = b.dataset.v; store.set('zikrim-akis-gorsel', {size: SHOT.size, bg: SHOT.bg}); shotPaint();
});
$('#shotGo').addEventListener('click', () => {
  if (!SHOT.cv) return;
  haptic(false);
  shareCanvas(SHOT.cv, `sekine-${SHOT.p.v}-${String(SHOT.p.n).replace('.', '_')}-${SHOT.size}.png`);
  shotSheet.close();
});
$('#shotCancel').addEventListener('click', () => shotSheet.close());
// Kart ekrana oturunca: zincir halka halka belirir ve (kullanıcı kaydırdıysa) hafif titreşim
if ('IntersectionObserver' in window) {
  FEED.obs = new IntersectionObserver(es => {
    for (const e of es) {
      const t = e.target;
      // Okunan rivayet sayısına katılır: kart 2 sn ekranda kalırsa (kütüphanedeki gibi; hızlı geçilenler sayılmaz)
      if (!e.isIntersecting || e.intersectionRatio < 0.6) { if (t._rd) { clearTimeout(t._rd); t._rd = 0; } continue; }
      if (!t._p) continue;
      if (!t._rd && !t._okundu) t._rd = setTimeout(() => { t._rd = 0; t._okundu = 1; if (t.isConnected && !feedEl.hidden) okuMark({v: t._p.v, b: t._p.v === 'usul' ? null : t._p.b, n: t._p.n}); }, 2000);
      e.target.classList.add('in');
      if (FEED.cur && FEED.cur !== e.target && performance.now() - FEED.touchAt < 1500) haptic(false);
      FEED.cur = e.target;
    }
  }, {root: feedEl, threshold: [0.6]});
}
FEED.touchAt = 0;
for (const ev of ['touchend', 'pointerup', 'wheel']) feedEl.addEventListener(ev, () => { FEED.touchAt = performance.now(); }, {passive: true});
// Çift dokunuş: kaydeder (zaten kayıtlıysa çıkarmaz), dokunulan yerde yıldız belirir, hafif titreşir
async function feedLike(card, x, y) {
  const r = card.getBoundingClientRect();
  const burst = el('span', 'fd-burst', '★');
  burst.style.left = (x - r.left) + 'px'; burst.style.top = (y - r.top) + 'px';
  card.append(burst);
  setTimeout(() => burst.remove(), 900);
  haptic(false);
  if (!isSaved(pickKey(card._p))) { await toggleSavePick(card._p); card._paint(); }
}
feedEl.addEventListener('click', e => {
  if (e.target.closest('button')) return;
  const card = e.target.closest('.fd-card');
  if (!card || !card._p) return;
  const now = performance.now();
  if (FEED.tapCard === card && now - FEED.tapAt < 350) { FEED.tapAt = 0; feedLike(card, e.clientX, e.clientY); }
  else { FEED.tapCard = card; FEED.tapAt = now; }
});
let feedRaf = 0;
feedEl.addEventListener('scroll', () => {
  if (feedRaf) return;
  feedRaf = requestAnimationFrame(() => {
    feedRaf = 0;
    if (feedEl.scrollTop + feedEl.clientHeight * 4 > feedEl.scrollHeight) feedMore(5);
    const h = feedEl.querySelector('.fd-hint'); if (h && feedEl.scrollTop > 40) h.remove();
  });
}, {passive: true});

/* ---------- Anasayfa: X tarzı zaman tüneli ---------- */
// Üstte iki sekme: Rivayetler · Kaydedilenler. Rivayetler'in havuzu akis.json'dur (Akış'la aynı, ayrı karışık sırayla); alt alta gönderiler, sona yaklaştıkça 10'ar 10'ar eklenir, oturumda tekrar çıkmaz.
// Kaydedilenler, Kaydettiklerim'deki kayıtları (`zikrim-saved`) aynı gönderi biçiminde gösterir; koleksiyon etiketleriyle süzülür.
// İsnad gösterilmez (yalnızca Akış'ta). Gönderide ☆ kaydet, 📖 kitapta aç, 📸 paylaş; çift dokunuş kaydeder. Yorum, beğeni ya da sayaç yoktur.
const homeEl = $('#home'), homeBarEl = $('#homeBar'), homeListEl = $('#homeList'), homeSavedEl = $('#homeSaved');
const HOME = {pool: null, i: 0, tab: 'rivayet', ys: {rivayet: 0, kayit: 0}, sv: [], si: 0, col: '', tapPost: null, tapAt: 0};
const HOME_STEP = 10;
function homeShow(on) {
  if (!on) { if (!homeEl.hidden) { HOME.ys[HOME.tab] = homeEl.scrollTop; homeEl.hidden = true; homeBarEl.hidden = true; } document.body.classList.remove('hm-hide'); return; }
  homeEl.hidden = false; homeBarEl.hidden = false;
  if (HOME.tab === 'kayit') { homeSavedRender(); homeEl.scrollTop = HOME.ys.kayit; }
  if (HOME.pool) { if (HOME.tab === 'rivayet') homeEl.scrollTop = HOME.ys.rivayet; return; }
  homeListEl.replaceChildren(el('div', 'hm-msg', 'Yükleniyor…'));
  akisLoad().then(D => { if (!HOME.pool) homeReset(D); })
    .catch(() => homeListEl.replaceChildren(el('div', 'hm-msg', 'Rivayetler yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.')));
}
function homeReset(D = AKIS) {
  if (!D) return;
  HOME.pool = akisShuffled(D); HOME.i = 0; HOME.ys.rivayet = 0;
  homeListEl.replaceChildren();
  if (HOME.tab === 'rivayet') homeEl.scrollTop = 0;
  homeMore();
}
// Üstteki sekmeler: açık sekmeye dokununca en üste gider; her sekmenin kaydırma yeri ayrı hatırlanır
function homeSetTab(t) {
  if (t === HOME.tab) { homeEl.scrollTo({top: 0, behavior: 'smooth'}); return; }
  HOME.ys[HOME.tab] = homeEl.scrollTop;
  HOME.tab = t;
  homeBarEl.querySelectorAll('[data-ht]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.ht === t)));
  homeListEl.hidden = t !== 'rivayet';
  homeSavedEl.hidden = t !== 'kayit';
  $('#homeRefresh').hidden = t !== 'rivayet';
  if (t === 'kayit') homeSavedRender();
  homeEl.scrollTop = HOME.ys[t];
  document.body.classList.remove('hm-hide');
}
homeBarEl.querySelectorAll('[data-ht]').forEach(b => b.addEventListener('click', () => homeSetTab(b.dataset.ht)));
// Gönderi. p: {v, b, n, t, bab}; kayıttan gelen gönderide ayrıca name, src ve rec (kaydın kendisi) bulunur.
function homePost(p) {
  const a = el('article', 'hm-post');
  a._p = p;
  // Ad: birden çok eserli kitaplıklarda (İmam Ahmed, el-Hallâl, el-Âcurrî, İbn Ebî Şeybe) eserin adı, diğerlerinde kitabın adı
  const L = LIBS[p.v], name = p.name || (L.bookKey ? AKIS[p.v].books[p.b] : L.err);
  const av = el('div', 'hm-av', name.replace(/^(el|eş|ez|es|et|er|en|ed)[-‑]/i, '').charAt(0).toLocaleUpperCase('tr'));
  av.style.background = bookColor(p);
  av.setAttribute('aria-hidden', 'true');
  const body = el('div', 'hm-body');
  const head = el('div', 'hm-head');
  const src = feedSrc(p);
  head.append(el('b', null, name), el('span', 'hm-src', L && L.bookKey ? src.replace(name + ', ', '') : src));
  body.append(head, el('p', 'hm-t', p.t));
  if (p.bab && !src.includes(p.bab)) {
    const bab = el('button', 'hm-bab', 'Bab: ' + p.bab + ' ›');
    bab.type = 'button';
    bab.setAttribute('aria-label', 'Babı kitapta aç: ' + p.bab);
    bab.addEventListener('click', () => { ttsStop(); goToBab(p); });
    body.append(bab);
  }
  const act = el('div', 'hm-act');
  const star = el('button');
  star.type = 'button';
  const key = p.rec ? p.rec.k : pickKey(p);
  const paint = () => { const on = isSaved(key); star.textContent = on ? '★ Kaydedildi' : '☆ Kaydet'; star.classList.toggle('on', on); star.setAttribute('aria-pressed', String(on)); star.setAttribute('aria-label', on ? 'Kaydettiklerimden çıkar' : 'Kaydet'); };
  paint();
  a._paint = paint;
  star.addEventListener('click', async () => {
    if (p.rec) { // Kaydedilenler'de: kayıt çıkarılır, gönderi yerinde kalır; tekrar dokununca aynı kayıt (koleksiyonlarıyla) geri gelir
      if (isSaved(key)) RD.saved = RD.saved.filter(x => x.k !== key); else RD.saved.unshift(p.rec);
      store.set('zikrim-saved', RD.saved);
      const c = $('#cntSaved'); if (c) c.textContent = RD.saved.length;
    } else await toggleSavePick(p);
    paint();
  });
  const open = el('button', null, '📖 Kitapta aç');
  open.type = 'button';
  open.addEventListener('click', () => { ttsStop(); goTo(p.v, p.b, p.n, true, RET_HOME()); });
  const shot = el('button', null, '📸 Paylaş');
  shot.type = 'button'; shot.setAttribute('aria-label', 'Görüntü olarak paylaş ya da kaydet');
  shot.addEventListener('click', () => shotOpen(p));
  act.append(star, open, shot);
  body.append(act);
  a.append(av, body);
  return a;
}
// Bab başlığına dokununca kitap o babın ilk rivayetinden açılır
async function goToBab(p) {
  if (p.v === 'usul') { goTo('usul', p.b, p.n, true, RET_HOME()); return; }
  const L = LIBS[p.v];
  try {
    L.idx = L.idx || await libFetch(L, 'index.json');
    const data = await libFetch(L, 'tr/' + L.idx[p.b].f);
    const bab = data.babs.find(bb => bb.h.some(x => x[0] === p.n));
    goTo(p.v, p.b, bab && bab.h.length ? bab.h[0][0] : p.n, true, RET_HOME());
  } catch (e) { goTo(p.v, p.b, p.n, true, RET_HOME()); }
}
function homeMore() {
  if (!HOME.pool || HOME.i >= HOME.pool.length) return;
  const end = Math.min(HOME.i + HOME_STEP, HOME.pool.length), frag = document.createDocumentFragment();
  for (; HOME.i < end; HOME.i++) frag.append(homePost(HOME.pool[HOME.i]));
  homeListEl.append(frag);
  if (HOME.i >= HOME.pool.length) homeListEl.append(el('div', 'hm-msg', 'Bütün rivayetleri gördün.'));
}
// Kaydedilenler: kayıt gönderiye çevrilir (Usûlü’s-Sünne kayıtları `u` alanındadır)
function savedPost(x) {
  if (x.v === 'usul') { const [n, t, metin] = x.u; return {v: 'usul', b: x.b, n, t: metin, bab: t, name: 'Usûlü’s-Sünne', src: `İmam Ahmed (⁨رحمه الله⁩), Usûlü’s-Sünne, ${n ? 'madde ' + n : 'giriş'}`, rec: x}; }
  const L = LIBS[x.v], n = x.h[0];
  return {v: x.v, b: x.b, n, t: x.h[2], bab: '', name: L.bookKey ? x.title : L.err, src: L.bookKey ? L.src(n, {tr: x.title}) : L.single ? L.src(n) : L.src(n) + ' · ' + x.title, rec: x};
}
function homeSavedRender() {
  if (HOME.col && !RD.cols.includes(HOME.col)) HOME.col = '';
  HOME.sv = (HOME.col ? RD.saved.filter(x => (x.c || []).includes(HOME.col)) : RD.saved).filter(x => x.v === 'usul' ? x.u : LIBS[x.v] && x.h);
  HOME.si = 0;
  homeSavedEl.replaceChildren();
  if (RD.cols.length) {
    const row = el('div', 'fd-chips hm-cols');
    const chip = (name, label) => {
      const b = el('button', 'fd-chip', label);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(HOME.col === name));
      b.addEventListener('click', () => { if (HOME.col === name) return; HOME.col = name; homeSavedRender(); homeEl.scrollTop = 0; });
      return b;
    };
    row.append(chip('', 'Tümü'));
    for (const name of RD.cols) row.append(chip(name, '📁 ' + name));
    homeSavedEl.append(row);
  }
  if (!HOME.sv.length) { homeSavedEl.append(el('div', 'hm-msg', HOME.col ? 'Bu koleksiyonda kayıt yok.' : 'Henüz kayıt yok. Bir rivayetin altındaki ☆ Kaydet ile buraya ekleyebilirsin.')); return; }
  savedMore();
}
function savedMore() {
  if (HOME.si >= HOME.sv.length) return;
  const end = Math.min(HOME.si + HOME_STEP, HOME.sv.length), frag = document.createDocumentFragment();
  for (; HOME.si < end; HOME.si++) frag.append(homePost(savedPost(HOME.sv[HOME.si])));
  homeSavedEl.append(frag);
}
const homeNear = () => homeEl.scrollTop + homeEl.clientHeight * 2.5 > homeEl.scrollHeight;
// X gibi kaydırma: aşağı inerken başlık gizlenir ve alt çubuk saydamlaşır, yukarı çıkınca geri gelir (en üstte hep görünür)
let homeRaf = 0, homeLastY = 0;
homeEl.addEventListener('scroll', () => {
  if (homeRaf) return;
  homeRaf = requestAnimationFrame(() => {
    homeRaf = 0;
    const y = homeEl.scrollTop, dy = y - homeLastY;
    if (y < 60) document.body.classList.remove('hm-hide');
    else if (dy > 6) document.body.classList.add('hm-hide');
    else if (dy < -6) document.body.classList.remove('hm-hide');
    if (Math.abs(dy) > 6 || y < 60) homeLastY = y;
    if (homeNear()) { if (HOME.tab === 'kayit') savedMore(); else homeMore(); }
  });
}, {passive: true});
// Çekip yenile: en üstteyken aşağı çekilip bırakılınca Rivayetler'e 10 yeni rivayet eklenir, Kaydedilenler yenilenir
const homePtr = $('#homePtr'), PTR_AT = 70;
let ptrY0 = null, ptrPull = 0;
homeEl.addEventListener('touchstart', e => { ptrY0 = homeEl.scrollTop <= 0 && e.touches.length === 1 ? e.touches[0].clientY : null; ptrPull = 0; }, {passive: true});
homeEl.addEventListener('touchmove', e => {
  if (ptrY0 == null || homePtr.classList.contains('spin')) return;
  if (homeEl.scrollTop > 0) { ptrY0 = null; ptrPull = 0; homePtr.style.cssText = ''; return; }
  ptrPull = Math.max(0, (e.touches[0].clientY - ptrY0) * 0.5);
  const k = Math.min(1, ptrPull / PTR_AT);
  homePtr.style.opacity = k;
  homePtr.style.transform = `translateY(${Math.min(ptrPull, PTR_AT) - 20}px) rotate(${k * 270}deg)`;
}, {passive: true});
homeEl.addEventListener('touchend', () => {
  if (ptrY0 == null) return;
  ptrY0 = null;
  if (ptrPull >= PTR_AT) {
    haptic(false);
    homePtr.style.cssText = ''; homePtr.classList.add('spin');
    setTimeout(() => { if (HOME.tab === 'kayit') homeSavedRender(); else homeNew(); homePtr.classList.remove('spin'); }, 550);
  } else homePtr.style.cssText = '';
  ptrPull = 0;
}, {passive: true});
// Yeni rivayetler: havuzdaki sıradaki 10 rivayet listenin en üstüne eklenir (X'teki gibi), görülenler tekrar çıkmaz
function homeNew() {
  if (!HOME.pool) return;
  const end = Math.min(HOME.i + HOME_STEP, HOME.pool.length), n = end - HOME.i;
  if (!n) { toast('Yeni rivayet kalmadı'); return; }
  const frag = document.createDocumentFragment();
  for (; HOME.i < end; HOME.i++) { const a = homePost(HOME.pool[HOME.i]); a.classList.add('hm-new'); frag.append(a); }
  homeListEl.prepend(frag);
  homeEl.scrollTo({top: 0});
  document.body.classList.remove('hm-hide');
  toast(n + ' yeni rivayet');
}
$('#homeRefresh').addEventListener('click', () => { haptic(false); homeNew(); });
homeListEl.addEventListener('click', e => {
  if (e.target.closest('button')) return;
  const post = e.target.closest('.hm-post');
  if (!post) return;
  const now = performance.now();
  if (HOME.tapPost === post && now - HOME.tapAt < 350) { HOME.tapAt = 0; feedLike(post, e.clientX, e.clientY); }
  else { HOME.tapPost = post; HOME.tapAt = now; }
});

async function renderDaily(next = false) {
  try { if (!DAILY) { const r = await fetch('gunun.json'); if (!r.ok) return; DAILY = await r.json(); } } catch { return; }
  if (!dailyPick || next) { const p = dailyRandom(); if (p) dailyPick = p; }
  if (!dailyPick) return;
  const {v, b, n, t} = dailyPick;
  const L = LIBS[v], book = DAILY[v].books[b];
  $('#dailyT').textContent = t;
  $('#dailySrc').textContent = (L.bookKey ? L.src(n, {tr: book}) : L.single ? L.src(n) : L.src(n) + ' · ' + book) + ' ›';
  $('#dailySrc').onclick = () => goTo(v, b, n, true, {label: 'Zikir', back: () => setView('main', true)});
  const nx = $('#dailyNext'); if (nx) nx.onclick = () => renderDaily(true);
  const k = v + ':' + (L.bookKey ? b + ':' : '') + n, st = $('#dailyStar');
  const paint = () => { const on = isSaved(k); st.textContent = on ? '★' : '☆'; st.setAttribute('aria-pressed', String(on)); st.setAttribute('aria-label', on ? 'Kaydettiklerimden çıkar' : 'Kaydet'); };
  paint();
  st.onclick = async () => { await toggleSavePick(dailyPick); paint(); };
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
/* Kitaba kütüphanenin dışından (Akış, Anasayfa, Rivayetler kartı, arama, Sözler, Kaydettiklerim) gidilince readExt açılır:
   o okumada kaldığın yer (RD.last) yazılmaz, kitap Okumaya devam ettiklerim'e girmez ve eski kaldığın yer bozulmaz; okunan rivayet sayısı yine tutulur.
   Kütüphanede gezinince (setView, kitap/bab seçimi, kitap listesine dönüş) kapanır. */
let readExt = false;
/* Geri dönüş çubuğu: kitaba dışarıdan (Akış, Anasayfa, Sözler, Kaydettiklerim, arama, râvi sayfası) gelince listenin
   üstünde “‹ Râvi: Ebû Seleme” gibi bir çubuk çıkar; dokununca geldiği yere döner. iOS'ta tarayıcı geri tuşu olmadığı için gerekli.
   Kütüphanede gezinince (setView, kitap/bab seçimi, sekme değişimi) kaybolur. */
let RET = null;
const retBar = $('#retBar');
function retPaint() {
  const on = !!(RET && readExt && (LIBS[view] || view === 'usul'));
  retBar.hidden = !on;
  if (on) retBar.textContent = '‹ ' + RET.label;
}
retBar.addEventListener('click', () => { const r = RET; RET = null; retBar.hidden = true; if (r) r.back(); });
const RET_HOME = () => ({label: 'Anasayfa', back: () => setView('anasayfa', true)});
function goTo(v, b, n, ext = false, from = null) {
  readExt = ext;
  RET = ext && from ? from : null;
  if (v === 'usul') { USUL_TARGET = n; view = 'usul'; }
  else { const L = LIBS[v]; L.book = b; L.target = n; libSave(L); view = v; }
  searchEl.value = '';
  renderCards();
  $('.list').scrollIntoView({block: 'start'});
}
const LIB_NAMES = {musannef: 'el-Musannef', ibnebiseybe: 'İbn Ebî Şeybe', musned: 'el-Müsned', usul: 'Usûlü’s-Sünne', ahmed: 'İmam Ahmed', zuhd: 'ez-Zühd', fezail: 'Fezâilü’s-sahâbe', berbehari: 'Şerhu’s-Sünne', acurri: 'el-Âcurrî', seria: 'eş-Şerîa', hallal: 'el-Hallâl', safii: 'eş-Şâfiî', buhari: 'el-Buhârî', ebudavud: 'Ebû Dâvûd', harb: 'Harb el-Kirmânî', ibane: 'el-İbâne', sunan: 'Sünen-i Ebî Dâvûd'};
const SHELVES = [
  {c: 'II. ASIR', books: [
    {v: 'safii', b: 0, ar: 'جماع العلم', t: 'Cimâu’l-ilm', who: 'eş-Şâfiî', bo: '150', d: 204, col: '#5e4a6b', done: true},
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
    {v: 'fezail', ar: 'فضائل الصحابة', t: 'Fezâilü’s-sahâbe', who: 'Ahmed b. Hanbel', bo: '164', d: 241, col: '#7a5530', done: true},
    {v: 'buhari', b: 0, ar: 'رفع اليدين في الصلاة', t: 'Ref‘u’l-yedeyn', who: 'el-Buhârî', bo: '194', d: 256, col: '#3f6b5e', done: true},
    {v: 'buhari', b: 1, ar: 'القراءة خلف الإمام', t: 'el-Kırâe halfe’l-imâm', who: 'el-Buhârî', bo: '194', d: 256, col: '#6b5a3a', done: true}]},
  {c: 'III. ASIR', books: [
    {v: 'sunan', ar: 'سنن أبي داود', t: 'Sünen-i Ebî Dâvûd', who: 'Ebû Dâvûd', bo: '202', d: 275, col: '#39645b', done: true},
    {v: 'harb', b: 0, ar: 'إجماع السلف في الاعتقاد', t: 'İcmâu’s-selef fi’l-i‘tikâd', who: 'Harb el-Kirmânî', d: 280, col: '#5e3f3a', done: true},
    {v: 'ebudavud', b: 0, ar: 'رسالة أبي داود إلى أهل مكة', t: 'Risâle ilâ ehli Mekke', who: 'Ebû Dâvûd', bo: '202', d: 275, col: '#5a6b7a', done: true},
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
    {v: 'acurri', b: 11, ar: 'أخلاق العلماء', t: 'Ahlâku’l-ulemâ', who: 'el-Âcurrî', bo: '~280', d: 360, col: '#2f5a6b', done: true}]},
  {c: 'IV. ASIR', books: [
    {v: 'ibane', ar: 'الإبانة الكبرى', t: 'el-İbânetü’l-kübrâ', who: 'İbn Batta', bo: '304', d: 387, col: '#4a5e7a'}]}
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
// Okumaya devam ettiklerim Profilim'dedir; Kütüphane kökü Kaydettiklerim, Sözler ve âlimlerden oluşur
function renderLibrary() {
  const sv = el('button', 'lib-saved');
  sv.type = 'button';
  const c = el('small', null); c.id = 'cntSaved'; c.textContent = RD.saved.length;
  sv.append(el('span', null, '☆ Kaydettiklerim'), c);
  sv.addEventListener('click', () => setView('kaydedilen'));
  sv.dataset.search = 'kaydettiklerim kaydedilen yer imi';
  cardsEl.append(sv);
  const sz = el('button', 'lib-saved');
  sz.type = 'button';
  sz.append(el('span', null, '📜 Sözler'), el('small', null, QUOTES.length + ' söz'));
  sz.addEventListener('click', () => setView('selef'));
  sz.dataset.search = 'sözler söz âlimler selef';
  cardsEl.append(sz);
  const h = el('p', 'lib-h', 'ÂLİMLER');
  h.dataset.search = '';
  cardsEl.append(h);
  for (const al of alimList()) cardsEl.append(alimRow(al));
}
// Kitap kapağı (raf rengi, Arapça ad, Türkçe ad, ilerleme); dokununca kitap açılır
function coverBtn(bk) {
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
  b.dataset.search = [bk.t, bk.ar].join(' ');
  return b;
}
/* ---------- Âlimler: Kütüphane'nin kökü âlim listesidir (vefat sırasıyla); âlime dokununca âlim sayfası ve kitapları açılır ----------
   Âlimler ve kitapları SHELVES'ten derlenir; yeni kitap SHELVES'e eklenince kendiliğinden görünür. Yeni âlim gelirse ALIM_AR ve ALIM_INI'ye de yazılır.
   Son açılan âlim `zikrim-alim`'de; o âlimin kitabından geri dönülünce âlim sayfasına gelinir. */
const ALIM_AR = {'İbn Ebî Şeybe': 'ابن أبي شيبة', 'Ahmed b. Hanbel': 'أحمد بن حنبل', 'el-Hallâl': 'الخلال', 'el-Berbehârî': 'البربهاري', 'el-Âcurrî': 'الآجري', 'eş-Şâfiî': 'الشافعي', 'el-Buhârî': 'البخاري', 'Ebû Dâvûd': 'أبو داود', 'Harb el-Kirmânî': 'حرب الكرماني', 'İbn Batta': 'ابن بطة'};
const ALIM_INI = {'İbn Ebî Şeybe': 'ش', 'Ahmed b. Hanbel': 'أحمد', 'el-Hallâl': 'خ', 'el-Berbehârî': 'ب', 'el-Âcurrî': 'آ', 'eş-Şâfiî': 'شا', 'el-Buhârî': 'بخ', 'Ebû Dâvûd': 'د', 'Harb el-Kirmânî': 'حر', 'İbn Batta': 'بط'};
let alimCur = store.get('zikrim-alim', '');
let ALIMS = null;
function alimList() {
  if (ALIMS) return ALIMS;
  const m = new Map();
  for (const sh of SHELVES) for (const bk of sh.books) {
    if (!m.has(bk.who)) m.set(bk.who, {who: bk.who, ar: ALIM_AR[bk.who] || '', ini: ALIM_INI[bk.who] || bk.who.replace(/^(el|eş|ez)-/, '').charAt(0), bo: bk.bo, d: bk.d, c: sh.c.replace('ASIR', 'asır'), col: bk.col, books: []});
    m.get(bk.who).books.push(bk);
  }
  return (ALIMS = [...m.values()].sort((a, b) => a.d - b.d));
}
const alimOwns = (who, v) => { const al = alimList().find(x => x.who === who); return !!al && al.books.some(bk => bk.v === v); };
const alimBack = () => view !== 'alim' && view !== 'kaydedilen' && LIB_CHILD.has(view) && !!alimCur && alimOwns(alimCur, view);
const alimDates = al => (al.bo ? 'd. ' + al.bo + ' – ' : '') + 'ö. ' + al.d;
function alimAv(al, cls) { const s = el('span', cls, al.ini); s.style.setProperty('--cv', al.col); s.lang = 'ar'; s.setAttribute('aria-hidden', 'true'); return s; }
function alimName(al) {
  const b = el('b', null, al.who + ' ');
  const r = el('bdi', 'rah', RAH); r.lang = 'ar'; r.dir = 'rtl';
  const rw = el('span', 'nowrap rah-s', '('); rw.append(r, ')');
  b.append(rw);
  return b;
}
function alimRow(al) {
  const b = el('button', 'alim-row');
  b.type = 'button';
  const txt = el('span', 'alim-txt');
  txt.append(alimName(al), el('small', null, `${alimDates(al)} · ${al.books.length} kitap`));
  const ar = el('span', 'alim-ar', al.ar); ar.lang = 'ar'; ar.dir = 'rtl';
  b.append(alimAv(al, 'alim-av'), txt, ar, el('span', 'alim-chev', '›'));
  b.addEventListener('click', () => { alimCur = al.who; store.set('zikrim-alim', al.who); setView('alim'); });
  b.dataset.search = [al.who, al.ar, ...al.books.map(bk => bk.t + ' ' + bk.ar)].join(' ');
  return b;
}
function renderAlim() {
  const list = alimList();
  const al = list.find(x => x.who === alimCur) || list[0];
  alimCur = al.who;
  $('#listTitle').textContent = al.who;
  const head = el('section', 'alim-head');
  const ar = el('span', 'alim-head-ar', al.ar); ar.lang = 'ar'; ar.dir = 'rtl';
  head.append(alimAv(al, 'alim-av'), ar, alimName(al), el('small', null, `${alimDates(al)} · ${al.c} · ${al.books.length} kitap`));
  // Okumaya devam et: bu âlimin kitaplarında en son okunan yer
  const owns = x => al.books.some(bk => bk.v === x.v && (bk.b == null || bk.b === x.b));
  const last = Object.values(RD.last).filter(x => x && x.v && owns(x)).sort((a, b) => b.at - a.at)[0];
  if (last) {
    const go = el('button', 'alim-go');
    go.type = 'button';
    go.append(el('span', null, 'Okumaya devam et'), el('small', null, `${last.v !== 'usul' && last.title ? last.title.replace(/ \(.*\)$/, '') + ' · ' : ''}${last.label}`));
    go.addEventListener('click', () => goTo(last.v, last.b, last.n));
    head.append(go);
  }
  head.dataset.search = '';
  const h = el('p', 'lib-h', 'KİTAPLARI');
  h.dataset.search = '';
  const grid = el('div', 'alim-grid');
  for (const bk of al.books) grid.append(coverBtn(bk));
  cardsEl.append(head, h, grid);
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
  if (RD.colFilter && !RD.cols.includes(RD.colFilter)) RD.colFilter = '';
  const items = RD.colFilter ? RD.saved.filter(x => (x.c || []).includes(RD.colFilter)) : RD.saved;
  if (RD.cols.length) {
    const chips = el('div', 'col-chips');
    const chip = (name, label, n) => {
      const b = el('button', 'fd-chip', label);
      b.type = 'button';
      b.append(el('small', null, String(n)));
      b.setAttribute('aria-pressed', String(RD.colFilter === name));
      b.addEventListener('click', () => { RD.colFilter = name; renderCards(); });
      return b;
    };
    chips.append(chip('', 'Tümü', RD.saved.length));
    for (const name of RD.cols) chips.append(chip(name, '📁 ' + name, colCount(name)));
    head.append(chips);
    if (RD.colFilter) {
      const del = el('button', 'col-del', `“${RD.colFilter}” koleksiyonunu sil`);
      del.type = 'button';
      del.addEventListener('click', () => {
        const name = RD.colFilter;
        if (!confirm(`“${name}” koleksiyonu silinsin mi? Kayıtlar Kaydettiklerim'de kalır.`)) return;
        RD.cols = RD.cols.filter(n => n !== name);
        for (const x of RD.saved) if (x.c) x.c = x.c.filter(n => n !== name);
        RD.colFilter = '';
        colSave(); renderCards();
      });
      head.append(del);
    }
  }
  head.append(el('small', 'mus-book-n', RD.saved.length ? (RD.colFilter ? `${items.length} kayıt · “${RD.colFilter}”` : `${RD.saved.length} kayıt · yıldıza dokununca listeden çıkar · 📁 ile koleksiyona ekle`) : 'Henüz kayıt yok. Bir hadisin köşesindeki ☆ işaretine dokunarak buraya ekleyebilirsin.'), fsBar());
  head.dataset.search = '';
  cardsEl.append(head);
  for (const x of items) {
    let a;
    if (x.v === 'usul') a = usulItem(x.u);
    else { const L = LIBS[x.v]; const keep = L.book; L.book = x.b; a = libItem(L, x.h); L.book = keep; }
    a.classList.add('saved-item');
    a.id = '';
    const go = el('button', 'chip-button saved-go', `${LIB_NAMES[x.v]}${x.title && x.v !== 'usul' ? ' · ' + x.title.replace(/ \(.*\)$/, '') : ''} → Bağlamında aç`);
    go.type = 'button';
    const n = x.v === 'usul' ? x.u[0] : x.h[0];
    go.addEventListener('click', () => goTo(x.v, x.b, n, true, {label: 'Kaydettiklerim', back: () => setView('kaydedilen', true)}));
    const cb = el('button', 'chip-button saved-col', x.c && x.c.length ? '📁 ' + x.c.join(' · ') : '📁 Koleksiyona ekle');
    cb.type = 'button';
    cb.addEventListener('click', () => colOpen(x.k));
    a.append(go, cb);
    a.dataset.search = [LIB_NAMES[x.v], x.title, ...(x.c || []), ...(x.h || x.u).filter(v => typeof v === 'string')].join(' ');
    cardsEl.append(a);
  }
}

function applyFilter() {
  if (view === 'alim') {
    const q = norm(searchEl.value.trim());
    document.body.classList.toggle('filtering', !!q);
    let shown = 0;
    for (const c of cardsEl.querySelectorAll('.alim-grid .cover')) { const hit = !q || norm(c.dataset.search).includes(q); c.hidden = !hit; if (hit) shown++; }
    $('#noResult').hidden = !q || shown > 0;
    return;
  }
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
    const ok = isDone(z.id);
    const box = cardsEl.querySelector(`[data-id="${CSS.escape(z.id)}"]`);
    if (!box) continue;
    box.classList.toggle('done', ok);
    // Hedef sayısı yazılmaz: yalnız bugün kaç kez çekildiği; “Tamamladım” kullanıcının işaretidir
    const pill = box.querySelector('.count-pill');
    pill.textContent = ok ? '✓ Tamamladım' : '○ Tamamladım';
    pill.setAttribute('aria-pressed', String(ok));
    pill.setAttribute('aria-label', ok ? `${z.name}: tamamlandı, geri almak için dokun` : `${z.name}: tamamladım olarak işaretle`);
    box.querySelector('.z-say').textContent = c ? `Bugün ${fmt(c)} kez` : '';
    box.querySelector('.minus').disabled = c === 0;
  }
  for (const [id, ids] of [['#cntSabah', MORNING], ['#cntAksam', EVENING]]) {
    const zs = ids.map(findZ).filter(Boolean);
    const d = zs.filter(z => isDone(z.id)).length;
    const el = $(id);
    el.textContent = `${d} / ${zs.length}`;
    el.parentElement.classList.toggle('complete', zs.length > 0 && d === zs.length);
  }
  renderRings();
  zgPaint();
  $('#today').textContent = new Date().toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'}).toLocaleUpperCase('tr-TR');
  $('#hijri').textContent = hijriText();
  {
    const zs = S.zikirs.filter(isGenel);
    const d = zs.filter(z => isDone(z.id)).length;
    $('#cntGenel').textContent = `${d} / ${zs.length}`;
    $('#cntGenel').parentElement.classList.toggle('complete', zs.length > 0 && d === zs.length);
  }
  renderWeek();
  if (view === 'profil') profPaint();
  if (!focusEl.hidden) renderFocus();
}

/* Üç halka: Sabah · Akşam · Genel (dokununca o liste açılır) */
const RINGS = [['genel', '📿 Genel', isGenel], ['sabah', '☀︎ Sabah', z => MSET.has(z.id)], ['aksam', '☾ Akşam', z => ESET.has(z.id)]];
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
    const zs = S.zikirs.filter(f), d = zs.filter(z => isDone(z.id)).length, p = zs.length ? d / zs.length : 0;
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
const groupDone = (ids, k) => { const zs = ids.map(findZ).filter(Boolean); return zs.length > 0 && zs.every(z => isDone(z.id, k)); };
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
  if (delta > 0) haptic(false);
}
function toggleDone(id) {
  checkDay();
  const z = findZ(id);
  if (!z) return;
  const on = !isDone(id);
  setDone(id, on);
  save();
  update();
  haptic(on);
  if (on) toast(S.zikirs.every(x => isDone(x.id)) ? 'Bugünkü bütün zikirler tamamlandı 🌙' : `“${z.name}” tamamlandı ✨`,
    {label: 'Geri al', run: () => { setDone(id, false); save(); update(); }});
}

/* Genel bölümündeki grupların açık/kapalı hâli (açık olanların adları) */
const ZG_KEY = 'zikrim-gruplar-acik';
let ZG_OPEN = new Set(store.get(ZG_KEY, []));
const zgOpen = g => ZG_OPEN.has(g);
function zgPaint() {
  for (const h of cardsEl.querySelectorAll('.zg-head:not(.qg-head)')) {
    const g = h.dataset.zg, open = zgOpen(g);
    h.setAttribute('aria-expanded', String(open));
    const zs = [...cardsEl.querySelectorAll('.zikir')].filter(b => b.dataset.zg === g).map(b => findZ(b.dataset.id)).filter(Boolean);
    const d = zs.filter(z => isDone(z.id)).length;
    h.querySelector('.zg-c').textContent = `${d} / ${zs.length}`;
    h.classList.toggle('complete', zs.length > 0 && d === zs.length);
  }
}
cardsEl.addEventListener('click', e => {
  const h = e.target.closest('.zg-head');
  if (!h || h.classList.contains('qg-head')) return;
  const g = h.dataset.zg, open = !zgOpen(g);
  if (open) ZG_OPEN.add(g); else ZG_OPEN.delete(g);
  store.set(ZG_KEY, [...ZG_OPEN]);
  for (const b of cardsEl.querySelectorAll('.zikir')) if (b.dataset.zg === g) b.classList.toggle('zg-off', !open);
  zgPaint();
  if (!open && h.getBoundingClientRect().top < 0) h.scrollIntoView({block: 'start'});
});
cardsEl.addEventListener('click', e => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const id = btn.closest('.zikir').dataset.id;
  const act = btn.dataset.act;
  if (act === 'plus') increment(id, 1);
  else if (act === 'minus') increment(id, -1);
  else if (act === 'focus') openFocus(id);
  else if (act === 'edit') openEditor(id);
  else if (act === 'done') toggleDone(id);
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
  if (focusEl.hidden) try { history.pushState(Object.assign({}, history.state, {focus: 1}), ''); } catch {} // geri tuşu odak modunu kapatsın
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
  // Hedef sayısı yoktur: ortada yalnız çekilen sayı; halka “Tamamladım” işaretlenince dolar
  const ok = isDone(z.id);
  $('#fDone').textContent = ok ? '✓ Tamamladım' : '';
  const ring = $('#fRing');
  ring.style.strokeDasharray = RING;
  ring.style.strokeDashoffset = ok ? 0 : RING;
  focusEl.classList.toggle('done', ok);
  const fb = $('#focusDone');
  fb.setAttribute('aria-pressed', String(ok));
  fb.setAttribute('aria-label', ok ? 'Tamamlandı — geri almak için dokun' : 'Tamamladım olarak işaretle');
  $('#focusMinus').disabled = c === 0;
}
function stepFocus(dir) {
  const list = visible().some(z => z.id === focusId) ? visible() : S.zikirs;
  const i = list.findIndex(z => z.id === focusId);
  const n = list.length;
  if (n) { focusId = list[(i + dir + n) % n].id; renderFocus(); }
}
$('#focusTap').addEventListener('click', () => increment(focusId, 1));
$('#focusDone').addEventListener('click', () => toggleDone(focusId));
$('#focusMinus').addEventListener('click', () => increment(focusId, -1));
$('#focusClose').addEventListener('click', () => { if (history.state && history.state.focus) history.back(); else closeFocus(); }); // geri tuşuyla aynı yoldan kapanır
$('#focusPrev').addEventListener('click', () => stepFocus(-1));
$('#focusNext').addEventListener('click', () => stepFocus(1));

/* ---------- Ekle / düzenle ---------- */
const editor = $('#editor');
const form = $('#editorForm');
let editingId = null;

function openEditor(id) {
  editingId = id || null;
  const z = id ? findZ(id) : {name: '', category: '', arabic: '', translit: '', meaning: ''};
  $('#editorTitle').textContent = id ? 'Zikri düzenle' : 'Yeni zikir';
  for (const f of ['name', 'category', 'arabic', 'translit', 'meaning']) form.elements[f].value = z[f];
  editor.classList.toggle('editing', !!id);
  editor.showModal();
  editor.scrollTop = 0;
  $('#editorTitle').focus({preventScroll: true});
}
$('#editorCancel').addEventListener('click', () => editor.close());
form.addEventListener('submit', () => {
  const data = {};
  for (const f of ['name', 'category', 'arabic', 'translit', 'meaning']) data[f] = form.elements[f].value.trim();
  if (!data.name) return;
  if (editingId) Object.assign(findZ(editingId), data);
  else S.zikirs.push({id: 'z' + Date.now().toString(36), custom: true, target: 33, ...data}); // target eski kayıt biçimi için; gösterilmez
  save();
  renderCards();
  toast(editingId ? 'Kaydedildi' : 'Zikir eklendi');
});
$('#resetOne').addEventListener('click', () => {
  const id = editingId, prev = getCount(id);
  editor.close();
  const wasDone = isDone(id);
  if (!prev && !wasDone) return;
  setCount(id, 0); setDone(id, false); save(); update();
  toast('Bugünkü sayaç sıfırlandı', {label: 'Geri al', run: () => { setCount(id, prev); setDone(id, wasDone); save(); update(); }});
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

/* ---------- Profilim (alt çubuğun beşinci sekmesi) ----------
   Ad `sekine-ad`, hedef zikirler `sekine-hedefler` (zikir kimlikleri, seçim sırasıyla), son yedek tarihi `sekine-son-yedek`; hepsi yedeğe girer.
   İstatistikler zikir durumundan (S.days) hesaplanır; ayrıca bir sayaç tutulmaz. */
const PF = {pick: false, more: false};
const pfName = () => String(store.get('sekine-ad', '') || '').trim();
const pfGoals = () => store.get('sekine-hedefler', []).filter(id => findZ(id));
const pfIni = n => n ? n.charAt(0).toLocaleUpperCase('tr-TR') : '☾';
const pfDate = k => fromKey(k).toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', year: 'numeric'});
function pfAgo(t) {
  const d = Math.round((fromKey(dayKey()) - fromKey(dayKey(new Date(t)))) / 864e5);
  return d <= 0 ? 'bugün' : d === 1 ? 'dün' : d < 30 ? d + ' gün önce' : new Date(t).toLocaleDateString('tr-TR', {day: 'numeric', month: 'long'});
}
function pfSec(title, extra) {
  const h = el('div', 'pf-h');
  h.append(el('p', 'lib-h', title));
  if (extra) h.append(extra);
  return h;
}
/* Okuma ilerlemesi: SHELVES'teki bir kitapta okunan madde / çevrilmiş madde (index.json'daki t). Kitaplığın index.json'ı inmemişse null. */
const shelfOf = (v, b) => { for (const sh of SHELVES) for (const bk of sh.books) if (bk.v === v && (bk.b == null || bk.b === b)) return bk; return null; };
function bookProg(bk) {
  if (bk.v === 'usul') { const t = USUL.length; return {r: Math.min(t, okuSet('usul').size), t}; }
  const L = LIBS[bk.v]; if (!L || !L.idx) return null;
  const list = bk.b != null ? [L.idx[bk.b]].filter(Boolean) : L.idx;
  const t = list.reduce((a, x) => a + (x.t || 0), 0);
  if (!t) return null;
  return {r: Math.min(t, bk.b != null ? okuBook(bk.v, bk.b) : okuSet(bk.v).size), t};
}
const pctOf = p => p.r >= p.t ? 100 : Math.min(99, Math.floor(p.r / p.t * 100));
// Profilde gereken kitaplık dizinleri (okunan ya da devam edilen kitaplıklar) bir kez indirilir, sonra profil yeniden çizilir
let pfIdxWait = false;
function pfNeedIdx() {
  const need = [...new Set([...Object.keys(OKU), ...Object.values(RD.last).map(x => x && x.v)])].filter(v => v && LIBS[v] && !LIBS[v].idx);
  if (!need.length || pfIdxWait) return;
  pfIdxWait = true;
  Promise.all(need.map(v => libFetch(LIBS[v], 'index.json').then(x => { LIBS[v].idx = x; }).catch(() => {}))).then(() => {
    pfIdxWait = false;
    if (view === 'profil' && need.some(v => LIBS[v].idx)) { const y = scrollY; renderCards(); scrollTo(0, y); }
  });
}
function openShelfBook(bk) { if (bk.b == null) openLib(bk.v); else { const L = LIBS[bk.v]; L.book = bk.b; libSave(L); setView(bk.v); } }
function renderProfile() {
  pfNeedIdx();
  const name = pfName();
  const box = el('section', 'pf');
  // Başlık: baş harf, ad (yazılabilir), ilk zikir tarihi
  const head = el('div', 'pf-head');
  const av = el('span', 'pf-av', pfIni(name));
  const id = el('div', 'pf-id');
  const inp = el('input', 'pf-name');
  inp.type = 'text'; inp.maxLength = 40; inp.placeholder = 'Adını yaz'; inp.value = name; inp.autocomplete = 'off'; inp.enterKeyHint = 'done';
  inp.setAttribute('aria-label', 'Kullanıcı adı');
  inp.addEventListener('input', () => { store.set('sekine-ad', inp.value.trim()); av.textContent = pfIni(inp.value.trim()); });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') inp.blur(); });
  inp.addEventListener('change', () => { if (inp.value.trim()) toast('Ad kaydedildi'); });
  const ok = okuCount();
  id.append(inp, el('small', null, ok ? `${fmt(ok)} rivayet okudun` : 'Okuduğun rivayetler burada sayılır'));
  head.append(av, id);
  box.append(head);
  // Bugünkü okuma: halka ve günlük hedef
  {
    const n = OKU_GUN[dayKey()] || 0, g = okuGoal(), p = g ? Math.min(1, n / g) : 0;
    const c = el('div', 'pf-day' + (g && n >= g ? ' done' : ''));
    const ring = el('div', 'pf-ring');
    const C = 2 * Math.PI * 34;
    ring.innerHTML = `<svg viewBox="0 0 84 84" aria-hidden="true"><circle class="rg-track" cx="42" cy="42" r="34"/><circle class="rg-bar" cx="42" cy="42" r="34" transform="rotate(-90 42 42)" style="stroke-dasharray:${C * p} ${C};opacity:${n && g ? 1 : 0}"/><text x="42" y="47" text-anchor="middle"></text></svg>`;
    ring.querySelector('text').textContent = g ? `${n}/${g}` : String(n);
    const tx = el('div', 'pf-day-t');
    tx.append(el('b', null, g ? (n >= g ? 'Bugünkü okuma hedefi tamam ✓' : `Bugün ${n} rivayet okudun`) : `Bugün ${n} rivayet okudun`));
    const lab = el('label', 'pf-goal-sel');
    const sel = el('select');
    for (const v of [0, 5, 10, 20, 30, 50, 100]) { const o = el('option', null, v ? v + ' rivayet' : 'Kapalı'); o.value = v; if (v === g) o.selected = true; sel.append(o); }
    sel.setAttribute('aria-label', 'Günlük okuma hedefi');
    sel.addEventListener('change', () => { store.set('sekine-okuma-hedef', Number(sel.value)); const y = scrollY; renderCards(); scrollTo(0, y); });
    lab.append(el('span', null, 'Günlük hedef'), sel);
    tx.append(lab);
    c.append(ring, tx);
    box.append(c);
  }
  // Hedef zikirlerim
  const goals = pfGoals();
  const ed = el('button', 'chip-button pf-edit', PF.pick ? 'Bitti' : goals.length ? 'Düzenle' : '＋ Seç');
  ed.type = 'button';
  ed.addEventListener('click', () => { PF.pick = !PF.pick; renderCards(); });
  box.append(pfSec('HEDEF ZİKİRLERİM', ed));
  const gl = el('div', 'pf-goals'); gl.id = 'pfGoals';
  if (!goals.length && !PF.pick) gl.append(el('p', 'pf-empty', 'Her gün takip etmek istediğin zikirleri seç; bugünkü sayıları burada görünür, buradan da sayabilirsin.'));
  for (const zid of goals) {
    const z = findZ(zid);
    const r = el('div', 'pf-goal'); r.dataset.goal = zid;
    const t = el('button', 'pf-goal-t'); t.type = 'button';
    t.append(el('span', null, z.name), el('small', 'pf-goal-c'));
    t.addEventListener('click', () => openFocus(zid));
    const p = el('button', 'pf-plus', '+1'); p.type = 'button'; p.setAttribute('aria-label', z.name + ': bir artır');
    p.addEventListener('click', () => increment(zid, 1));
    r.append(t, p);
    gl.append(r);
  }
  box.append(gl);
  if (PF.pick) box.append(pfPicker());
  // Okumaya devam ettiklerim
  const last = Object.values(RD.last).filter(x => x && x.v && LIB_NAMES[x.v]).sort((a, b) => b.at - a.at);
  box.append(pfSec('OKUMAYA DEVAM ETTİKLERİM', last.length ? el('small', 'pf-n', String(last.length)) : null));
  if (!last.length) box.append(el('p', 'pf-empty', 'Kütüphanede okuduğun kitaplar, kaldığın yerle birlikte burada sıralanır.'));
  last.forEach((x, i) => {
    const r = el('div', 'pf-read');
    if (i >= 3 && !PF.more) r.hidden = true;
    const b = el('button', 'lib-resume'); b.type = 'button';
    b.append(el('span', 'lib-resume-t', `${LIB_NAMES[x.v]}${x.v !== 'usul' && x.title ? ' · ' + x.title.replace(/ \(.*\)$/, '') : ''}`), el('small', null, `Kaldığın yer: ${x.label} · ${pfAgo(x.at)}`));
    const bk = shelfOf(x.v, x.b), pr = bk && bookProg(bk);
    if (pr) {
      const bar = el('span', 'pf-pbar'), f = el('i'); f.style.width = Math.max(pr.r ? 2 : 0, pctOf(pr)) + '%'; bar.append(f);
      b.append(bar, el('small', 'pf-rd-n', `%${pctOf(pr)} okundu · ${fmt(pr.r)} / ${fmt(pr.t)} rivayet`));
    }
    b.addEventListener('click', () => goTo(x.v, x.b, x.n));
    const del = el('button', 'pf-x'); del.type = 'button';
    del.setAttribute('aria-label', `${LIB_NAMES[x.v]}${x.title ? ' · ' + x.title : ''}: listeden çıkar`);
    del.title = 'Listeden çıkar';
    del.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="m7 7 10 10M17 7 7 17"/></svg>';
    del.addEventListener('click', () => {
      const prev = RD.last[x.v];
      delete RD.last[x.v]; store.set('zikrim-last', RD.last); renderCards();
      toast('Listeden çıkarıldı', {label: 'Geri al', run: () => { RD.last[x.v] = prev; store.set('zikrim-last', RD.last); renderCards(); }});
    });
    r.append(b, del);
    box.append(r);
  });
  if (last.length > 3) {
    const mo = el('button', 'chip-button pf-more', PF.more ? 'Daha az göster' : `Daha fazla göster (${last.length - 3})`); mo.type = 'button';
    mo.addEventListener('click', () => { PF.more = !PF.more; const y = scrollY; renderCards(); scrollTo(0, y); });
    box.append(mo);
  }
  // Okuduğun kitaplar: bütün (çevrilmiş) rivayetleri okunan kitaplar
  const fin = [];
  for (const sh of SHELVES) for (const bk of sh.books) { const pr = bookProg(bk); if (pr && pr.r >= pr.t) fin.push(bk); }
  box.append(pfSec('OKUDUĞUN KİTAPLAR', fin.length ? el('small', 'pf-n', String(fin.length)) : null));
  if (!fin.length) box.append(el('p', 'pf-empty', 'Bir kitabın bütün rivayetlerini okuyunca kitap bu rafa gelir.'));
  else {
    const shelf = el('div', 'pf-shelf');
    for (const bk of fin) {
      const c = el('button', 'pf-bk'); c.type = 'button'; c.style.setProperty('--cv', bk.col);
      const ar = el('span', 'pf-bk-ar', bk.ar); ar.lang = 'ar'; ar.dir = 'rtl';
      c.append(ar, el('small', null, bk.t), el('span', 'pf-bk-ok', '✓'));
      c.addEventListener('click', () => openShelfBook(bk));
      shelf.append(c);
    }
    box.append(shelf);
  }
  // Kaydettiklerim ve koleksiyonlar
  box.append(pfSec('KAYDETTİKLERİM'));
  const sv = el('button', 'lib-saved'); sv.type = 'button';
  sv.append(el('span', null, '☆ Kaydettiklerim'), el('small', null, fmt(RD.saved.length)));
  sv.addEventListener('click', () => { RD.colFilter = ''; setView('kaydedilen'); });
  box.append(sv);
  if (RD.cols.length) {
    const cs = el('div', 'fd-chips pf-cols');
    for (const c of RD.cols) {
      const b = el('button', 'fd-chip', `📁 ${c} · ${RD.saved.filter(x => (x.c || []).includes(c)).length}`); b.type = 'button';
      b.addEventListener('click', () => { RD.colFilter = c; setView('kaydedilen'); });
      cs.append(b);
    }
    box.append(cs);
  }
  // Son 30 gün
  const mode = store.get('sekine-pf-grafik', 'okuma') === 'zikir' ? 'zikir' : 'okuma';
  const seg = el('div', 'seg pf-seg');
  for (const [v, t] of [['okuma', 'Okuma'], ['zikir', 'Zikir']]) {
    const b = el('button', null, t); b.type = 'button'; b.setAttribute('aria-pressed', String(v === mode));
    b.addEventListener('click', () => { store.set('sekine-pf-grafik', v); const y = scrollY; renderCards(); scrollTo(0, y); });
    seg.append(b);
  }
  box.append(pfSec('SON 30 GÜN', seg));
  const ch = el('div', 'pf-chart');
  const days = []; for (let i = 29; i >= 0; i--) { const d = addDays(new Date(), -i), k = dayKey(d); days.push({d, t: mode === 'okuma' ? (OKU_GUN[k] || 0) : dayTotal(k)}); }
  const max = Math.max(1, ...days.map(x => x.t));
  for (const x of days) {
    const c = el('span', 'pf-col' + (x.t ? '' : ' z'));
    c.style.setProperty('--h', Math.max(4, Math.round(x.t / max * 100)) + '%');
    c.title = `${x.d.toLocaleDateString('tr-TR', {day: 'numeric', month: 'short'})}: ${fmt(x.t)}`;
    ch.append(c);
  }
  box.append(ch);
  const m = days.reduce((a, x) => a + x.t, 0), ad = days.filter(x => x.t).length;
  box.append(el('p', 'pf-cap', `${fmt(m)} ${mode === 'okuma' ? 'rivayet okundu' : 'zikir'} · ${ad} aktif gün`));
  // Ayarlar ve yedek
  box.append(pfSec('UYGULAMA'));
  const yd = store.get('sekine-son-yedek', '');
  const rows = el('div', 'pf-rows');
  const row = (ic, t, sub, fn) => { const b = el('button', 'pf-row'); b.type = 'button'; const tx = el('span', 'pf-row-t', t); if (sub) tx.append(el('small', null, sub)); b.append(el('span', 'pf-row-ic', ic), tx, el('span', 'set-chev', '›')); b.addEventListener('click', fn); return b; };
  rows.append(
    row('⇪', 'Yedeği kaydet', yd ? 'Son yedek: ' + pfDate(yd) : 'Henüz yedek alınmadı', () => $('#exportData').click()),
    row('⚙', 'Ayarlar', 'Tema, yazı, sesli okuma, bildirimler', () => $('#openSettings').click()));
  box.append(rows);
  cardsEl.append(box);
  profPaint();
}
// Hedef seçimi: bütün zikirler bölümlerine göre; işaretlenen seçim sırasıyla eklenir
function pfPicker() {
  const sel = new Set(pfGoals());
  const box = el('div', 'pf-pick');
  for (const [title, f] of [['Genel', isGenel], ['Sabah', z => MSET.has(z.id)], ['Akşam', z => ESET.has(z.id)]]) {
    let zs = S.zikirs.filter(f); if (f === isGenel) zs = sortByDuaOrder(zs);
    if (!zs.length) continue;
    box.append(el('p', 'pf-pick-h', title));
    for (const z of zs) {
      const l = el('label', 'pf-pick-r');
      const c = el('input'); c.type = 'checkbox'; c.checked = sel.has(z.id);
      c.addEventListener('change', () => {
        const g = pfGoals().filter(x => x !== z.id);
        if (c.checked) g.push(z.id);
        store.set('sekine-hedefler', g);
        const gl = $('#pfGoals'); if (gl) { const y = scrollY; PF.pick = true; renderCards(); scrollTo(0, y); }
      });
      l.append(c, el('span', null, z.name));
      box.append(l);
    }
  }
  return box;
}
function profPaint() {
  for (const r of cardsEl.querySelectorAll('.pf-goal')) {
    const z = findZ(r.dataset.goal); if (!z) continue;
    const c = getCount(z.id), ok = isDone(z.id);
    r.classList.toggle('done', ok);
    r.querySelector('.pf-goal-c').textContent = `${ok ? '✓ Tamamladım · ' : ''}Bugün ${fmt(c)}`;
  }
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
  pushRefresh();
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

/* Hicrî takvim düzeltmesi (−2 … +2 gün) */
{
  const sel = $('#hijriFix'), out = $('#hijriFixOut');
  const paint = () => { sel.value = String(hijriOffset()); out.textContent = 'Bugün: ' + hijriText().toLocaleLowerCase('tr-TR').replace(/(^|\s)\S/g, c => c.toLocaleUpperCase('tr-TR')); };
  sel.addEventListener('change', () => { store.set('sekine-hicri-fark', Number(sel.value)); paint(); $('#hijri').textContent = hijriText(); });
  $('#openSettings').addEventListener('click', paint);
  paint();
}

/* ---------- Bildirimler (web push) ----------
   Gönderen GitHub Actions'taki zamanlanmış iştir (.github/workflows/bildirim.yml → push/gonder.mjs).
   Sunucu olmadığı için abonelik kodu elle GitHub'daki PUSH_SUBS gizli değişkenine yapıştırılır.
   PUSH_KEY, push/gonder.mjs'teki VAPID_PUBLIC ile aynı olmalı. */
const PUSH_KEY = 'BCI_ZYBMHdxFXymdN47D4ySZVGe6bzQWolbVRHCjHkNoa_4fWe32Mvh97pdcfWrthr58-aYyx_um8G22OB6S-S4';
const PUSH_OK = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
const STANDALONE = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
let pushCode = '';
const b64u = s => { const b = atob((s + '='.repeat((4 - s.length % 4) % 4)).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(b, c => c.charCodeAt(0)); };
async function pushSub() {
  if (!PUSH_OK) return null;
  const r = await navigator.serviceWorker.getRegistration();
  return r ? r.pushManager.getSubscription() : null;
}
async function pushRefresh() {
  const t = $('#pushToggle'), info = $('#pushInfo');
  const sub = await pushSub().catch(() => null);
  const on = !!sub && Notification.permission === 'granted';
  pushCode = on ? JSON.stringify(sub) : '';
  t.checked = on;
  t.disabled = !PUSH_OK;
  $('#pushCopy').hidden = $('#pushTest').hidden = !on;
  info.textContent = !PUSH_OK ? (STANDALONE ? 'Bu telefon web bildirimlerini desteklemiyor (iOS 16.4 ya da sonrası gerekir).' : 'Bildirimler için uygulamayı ana ekrandaki simgesinden aç.')
    : Notification.permission === 'denied' ? 'Bildirim izni kapalı. Telefonun Ayarlar → Bildirimler → Sekîne bölümünden açabilirsin.'
    : on ? 'Açık. Abonelik kodu GitHub’daki PUSH_SUBS’a yapıştırılmadıysa bildirim gelmez. Kapatıp açarsan kod değişir, yenisini yapıştırman gerekir.'
    : 'Bildirimler uygulama ana ekrandan açıldığında çalışır.';
}
$('#pushToggle').addEventListener('change', async e => {
  try {
    if (e.target.checked) {
      // iOS izni yalnızca bir dokunuşla isteyebilir: ilk await bu olmalı
      if (await Notification.requestPermission() !== 'granted') throw new Error('izin');
      const r = await navigator.serviceWorker.ready;
      if (!(await r.pushManager.getSubscription())) await r.pushManager.subscribe({userVisibleOnly: true, applicationServerKey: b64u(PUSH_KEY)});
      toast('Bildirimler açıldı. Şimdi abonelik kodunu kopyala.');
    } else {
      const sub = await pushSub();
      if (sub) await sub.unsubscribe();
      toast('Bildirimler kapatıldı');
    }
  } catch (err) { toast(err.message === 'izin' ? 'Bildirim izni verilmedi' : 'Bildirimler açılamadı'); }
  pushRefresh();
});
$('#pushCopy').addEventListener('click', () => {
  if (!pushCode) { pushRefresh(); return; }
  // Panoya yazma dokunuşun içinde hemen yapılmalı (iOS); kod önceden hazırlandı
  navigator.clipboard.writeText(pushCode).then(() => toast('Abonelik kodu kopyalandı'), () => prompt('Abonelik kodu (tamamını kopyala):', pushCode));
});
$('#pushTest').addEventListener('click', async () => {
  try { const r = await navigator.serviceWorker.ready; await r.showNotification('Sekîne', {body: 'Bildirimler bu telefonda görünüyor.', icon: './icon-192.png', tag: 'sekine-deneme', lang: 'tr', data: {v: 'main'}}); }
  catch { toast('Bildirim gösterilemedi'); }
});

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
/* ---------- Geri tuşu (Android) ve tarayıcı geri hareketi ----------
   Her görünüm değişimi (sekme, Sabah/Akşam/Genel, kitap listesi, açık kitap) tarayıcı geçmişine yazılır; geri tuşu bir önceki
   görünüme döner, ana sayfadaysa uygulamadan çıkar. Odak modu da geri tuşuyla kapanır. Açık pencereler (ayarlar vb.) Android'de
   tarayıcının kendisince kapatılır. */
let navKey = null, navSkip = false;
/* ---------- Bütün kütüphanede arama (tam ekran sayfa) ----------
   Arama ara-worker.js'te yapılır (veriler ara.json / ara-ar.json, araclar/ara.py üretir). Sayfa geçmişe bir adım olarak eklenir;
   geri hareketi sayfayı kapatır. Sonuca dokununca sayfa kapanır ve kitapta o madde açılır. Son aramalar `zikrim-son-aramalar`'da. */
const ARA = {el: $('#araPage'), q: $('#araQ'), res: $('#araRes'), info: $('#araInfo'), libs: $('#araLibs'), open: false, pushed: false, after: null,
  w: null, seq: 0, wait: new Map(), run: 0, timer: 0, loaded: false, scope: 'hepsi', lib: '', last: null};
function araAsk(msg) {
  if (!ARA.w) {
    ARA.w = new Worker('ara-worker.js');
    ARA.w.onmessage = e => { const p = ARA.wait.get(e.data.id); if (!p) return; ARA.wait.delete(e.data.id); if (e.data.ok) p.res(e.data.res); else p.rej(new Error(e.data.err)); };
    ARA.w.onerror = () => { for (const p of ARA.wait.values()) p.rej(new Error('worker')); ARA.wait.clear(); ARA.w = null; };
  }
  const id = ++ARA.seq;
  return new Promise((res, rej) => { ARA.wait.set(id, {res, rej}); ARA.w.postMessage({...msg, id}); });
}
const araRecent = () => store.get('zikrim-son-aramalar', []);
function araRemember(q) { q = q.trim(); if (q.length < 2) return; store.set('zikrim-son-aramalar', [q, ...araRecent().filter(x => x !== q)].slice(0, 8)); }
function araOpen(text = '') {
  if (ARA.open) return;
  ttsStop();
  ARA.open = true;
  ARA.scope = store.get('zikrim-ara-kapsam', 'hepsi'); ARA.lib = '';
  ARA.el.hidden = false;
  document.body.classList.add('ara-open');
  try { history.pushState(Object.assign({}, history.state, {ara: 1}), ''); ARA.pushed = true; } catch { ARA.pushed = false; }
  ARA.q.value = text;
  ARA.q.focus();
  if (text.trim()) araRun(); else araIdle();
  araAsk({type: 'load'}).then(() => { ARA.loaded = true; }).catch(() => {});
}
function araHide(after) {
  ARA.open = false;
  ARA.el.hidden = true;
  document.body.classList.remove('ara-open');
  ARA.q.blur();
  ARA.hidAt = performance.now();
  if (after) setTimeout(after, 0);
}
// Arama sayfası kapanırken dokunuşun gecikmiş “click”i altındaki sayfaya düşmesin (iOS): kitap anında açılınca
// bu hayalet dokunuş hedef babın başlığına gelip babı kapatıyor ve sayfa aşağıda boş kalıyordu.
document.addEventListener('click', e => {
  if (ARA.open || !(performance.now() - (ARA.hidAt || -1e9) < 600)) return;
  if (ARA.el.contains(e.target)) return;
  e.stopPropagation(); e.preventDefault();
}, true);
function araClose(after) {
  if (!ARA.open) return;
  if (ARA.pushed) { ARA.after = after || null; history.back(); } else araHide(after);
}
function araScopePaint() {
  const ar = /[؀-ۿ]/.test(ARA.q.value);
  document.querySelectorAll('#araScope button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === ARA.scope)));
  $('#araScope').classList.toggle('off', ar);
}
function araIdle() {
  ARA.run++;
  araScopePaint();
  ARA.libs.replaceChildren();
  ARA.res.replaceChildren();
  ARA.info.innerHTML = 'Türkçe ya da Arapça yazabilirsin. Kelimenin başını yazman yeter (“sabr” → sabır, sabrı, sabredin); harf işaretleri (â, ‘, ş) fark etmez. Birden çok kelime yazarsan hepsinin geçtiği maddeler gelir; tırnak içindeki ifade (“sünnete sarıl”) aynen aranır. <b>Sened</b> seçilirse râvi adlarında aranır (ör. A‘meş Ebû Vâil).';
  const rec = araRecent();
  if (rec.length) {
    const box = el('div', 'ara-rec');
    for (const q of rec) { const b = el('button', null, q); b.type = 'button'; b.addEventListener('click', () => { ARA.q.value = q; araRun(); }); box.append(b); }
    ARA.res.append(el('p', 'ara-info', 'Son aramalar'), box);
  }
}
const araLabel = (v, book) => { const name = v === 'usul' ? 'Usûlü’s-Sünne' : LIB_NAMES[v] || v; return book && book !== name ? name + ' · ' + book : name; };
async function araRun() {
  const q = ARA.q.value.trim();
  araScopePaint();
  if (q.replace(/["“”«»]/g, '').trim().length < 2) { araIdle(); return; }
  const my = ++ARA.run;
  ARA.info.textContent = ARA.loaded && !/[؀-ۿ]/.test(q) ? 'Aranıyor…' : 'Arama dosyası hazırlanıyor…';
  let r;
  try { r = await araAsk({type: 'q', q, scope: ARA.scope, lib: ARA.lib}); }
  catch (e) { if (my === ARA.run) ARA.info.textContent = 'Arama yapılamadı; internet bağlantını kontrol et.'; return; }
  if (my !== ARA.run) return;
  ARA.loaded = true; ARA.last = r;
  // Kitaplık düğmeleri
  ARA.libs.replaceChildren();
  if (r.total) {
    const chip = (v, label, cnt) => {
      const b = el('button', 'fd-chip', label); b.append(el('small', null, ' ' + cnt)); b.type = 'button';
      b.setAttribute('aria-pressed', String(ARA.lib === v));
      b.addEventListener('click', () => { if (ARA.lib === v) return; ARA.lib = v; araRun(); });
      return b;
    };
    ARA.libs.append(chip('', 'Hepsi', r.total));
    for (const [v, c] of r.libs) ARA.libs.append(chip(v, v === 'usul' ? 'Usûlü’s-Sünne' : LIB_NAMES[v] || v, c));
  }
  const shown = r.groups.reduce((a, g) => a + g.count, 0);
  ARA.info.innerHTML = r.total ? `<b>${fmt(shown)}</b> sonuç` + (ARA.lib ? '' : ` · ${fmt(r.groups.length)} kitapta`) + (r.ar ? ' · Arapça metinde' : ARA.scope === 'metin' ? ' · yalnız metinde' : ARA.scope === 'sened' ? ' · yalnız senedde' : '')
    : 'Sonuç yok.' + (!r.ar && ARA.scope !== 'hepsi' ? ' “Hepsi”yi seçip yeniden dene.' : '') + ' Kelimeyi kısaltmayı ya da yazımını değiştirmeyi deneyebilirsin.';
  // Gruplar: her kitaptan ilk 3 madde, “Daha fazla” ile 20'şer
  ARA.res.replaceChildren();
  const first = [];
  const boxes = r.groups.map(g => {
    const box = el('section', 'ara-g');
    const gh = el('div', 'ara-gh', araLabel(g.v, g.book)); gh.append(el('small', null, fmt(g.count)));
    const list = el('div');
    box.append(gh, list);
    box._g = g; box._list = list; box._at = 0;
    ARA.res.append(box);
    first.push(...g.items.slice(0, 3));
    return box;
  });
  const rows = await araAsk({type: 'rows', ids: first, ts: r.ts, ar: r.ar}).catch(() => []);
  if (my !== ARA.run) return;
  const byId = new Map(rows.map(x => [x.i, x]));
  for (const box of boxes) araFill(box, box._g.items.slice(0, 3).map(i => byId.get(i)).filter(Boolean), r);
}
function araFill(box, rows, r) {
  const g = box._g, L = LIBS[g.v];
  box.querySelector('.ara-more')?.remove();
  for (const x of rows) {
    const b = el('button', 'ara-r'); b.type = 'button';
    const n = el('span', 'ar-n', (g.v === 'usul' ? 'Madde ' : 'No. ') + x.n);
    if (x.field === 's') n.append(' · ', el('i', null, 'senedde'));
    const t = el('span', 'ar-t' + (x.field === 'a' ? ' rtl' : '')); t.innerHTML = x.html;
    if (x.field === 'a') t.lang = 'ar';
    b.append(n, t);
    b.addEventListener('click', () => { const q = ARA.q.value; araRemember(q); araClose(() => goTo(g.v, g.v === 'usul' ? null : g.b, x.n, true, {label: 'Arama: ' + q.trim(), back: () => araOpen(q)})); });
    box._list.append(b);
  }
  box._at += rows.length;
  const left = g.items.length - box._at;
  if (left > 0) {
    const m = el('button', 'ara-more', `Daha fazla göster (${fmt(left)})`); m.type = 'button';
    m.addEventListener('click', async () => {
      m.disabled = true;
      const more = await araAsk({type: 'rows', ids: g.items.slice(box._at, box._at + 20), ts: r.ts, ar: r.ar}).catch(() => []);
      araFill(box, more, r);
    });
    box.append(m);
  }
}
ARA.q.addEventListener('input', () => { araScopePaint(); clearTimeout(ARA.timer); ARA.timer = setTimeout(araRun, 280); });
ARA.q.addEventListener('keydown', e => { if (e.key === 'Enter') { clearTimeout(ARA.timer); araRemember(ARA.q.value); araRun(); ARA.q.blur(); } });
$('#araBack').addEventListener('click', () => araClose());
document.querySelectorAll('#araScope button').forEach(b => b.addEventListener('click', () => { ARA.scope = b.dataset.v; store.set('zikrim-ara-kapsam', ARA.scope); araRun(); }));
$('#openSearch').addEventListener('click', () => araOpen());
$('#homeSearch').addEventListener('click', () => araOpen());
$('#araAll').addEventListener('click', () => araOpen(searchEl.value.trim()));
// Kütüphane ana sayfasındaki kutu bütün kütüphanede arar; bir kitabın içinde arayıp bulamayan için “Bütün kütüphanede ara ›”
searchEl.addEventListener('pointerdown', e => { if (view === 'kutuphane') { e.preventDefault(); araOpen(searchEl.value.trim()); } });
searchEl.addEventListener('focus', () => { if (view === 'kutuphane') { searchEl.blur(); araOpen(searchEl.value.trim()); } });
searchEl.addEventListener('input', () => { $('#araAll').hidden = !(searchEl.value.trim().length > 1 && !/^\d+$/.test(searchEl.value.trim()) && (LIBS[view] || view === 'usul' || view === 'alim' || view === 'kaydedilen')); });

/* ---------- Râvi sayfası ----------
   ravi.json (araclar/ravi/ravi_kur.py üretir): r[ad] = [Arapça biçimler, hadis sayısı, {hocası: n}, {öğrencisi: n}, {kitaplık: [[kitap, no], …]}];
   t = aynı adın kısa/tam yazımları (biri ötekinin başlangıcı, kimliği belirli olanlar); x = râvi sayfası açılmayan tanımlar (akrabalık, belirsiz). Yalnız metindeki zincirlerden türetilir;
   râviler hakkında dışarıdan bilgi yoktur. Arama sayfası gibi tam ekran açılır, geri tuşuyla kapanır. */
const RAVI = {el: $('#raviPage'), title: $('#raviTitle'), body: $('#raviBody'), open: false, pushed: false, data: null, p: null, skip: new Set(), after: null, stack: []};
const RAVI_AKRABA = /^(babası|dedesi|annesi|amcası|kardeşi|ninesi|dayısı|halası|teyzesi)(\b|$)/;
const RAVI_MUELLIF = new Set(['Ebû Dâvûd', 'Ahmed b. Hanbel', 'Abdullah b. Ahmed', 'el-Âcurrî']);
const raviLoad = () => RAVI.p || (RAVI.p = fetch('ravi.json').then(r => { if (!r.ok) throw new Error('ravi.json'); return r.json(); }).then(D => { RAVI.data = D; RAVI.skip = new Set(D.x || []); return D; }).catch(e => { RAVI.p = null; throw e; }));
raviLoad().catch(() => {});
function raviOpen(name) {
  ttsStop();
  if (!RAVI.open) {
    RAVI.open = true; RAVI.stack = [];
    RAVI.el.hidden = false;
    document.body.classList.add('ara-open');
    try { history.pushState(Object.assign({}, history.state, {ravi: 1}), ''); RAVI.pushed = true; } catch { RAVI.pushed = false; }
  } else RAVI.stack.push(RAVI.cur);
  RAVI.cur = name;
  RAVI.el.scrollTop = 0;
  raviRender(name);
}
function raviHide(after) {
  RAVI.open = false;
  RAVI.el.hidden = true;
  if (!ARA.open) document.body.classList.remove('ara-open');
  ARA.hidAt = performance.now();
  if (after) setTimeout(after, 0);
}
function raviClose(after) {
  if (!RAVI.open) return;
  if (RAVI.pushed) { RAVI.after = after || null; history.back(); } else raviHide(after);
}
$('#raviBack').addEventListener('click', () => { if (RAVI.stack.length) { RAVI.cur = RAVI.stack.pop(); RAVI.el.scrollTop = 0; raviRender(RAVI.cur); } else raviClose(); });
// Çip: ad · sayı (yalnız aynı adın kısa/tam yazımlarında)
const raviChip = (name, v) => {
  const b = el('button', 'ravi-chip'); b.type = 'button';
  const n = Array.isArray(v) ? v[0] : v;
  const top = el('span', 'ravi-chip-n', name);
  if (n) top.append(el('small', null, ' ' + n));
  b.append(top);
  if (RAVI.skip.has(name) || RAVI_AKRABA.test(name) || RAVI_MUELLIF.has(name)) { b.classList.add('plain'); b.disabled = true; }
  else b.addEventListener('click', () => raviOpen(name));
  return b;
};
// Satır listesi: ad, altında sîga dökümü (hangi lafızla kaç kez), sağda sayı; zincirdeki komşuluk (hoca/öğrenci hükmü değil)
function raviRows(obj) {
  const keys = Object.keys(obj || {});
  const wrap = el('div');
  if (!keys.length) { wrap.append(el('p', 'empty', 'Senedlerde kayıt yok.')); return wrap; }
  const box = el('div', 'ravi-rows');
  const row = (name, v) => {
    const n = Array.isArray(v) ? v[0] : v;
    const b = el('button', 'ravi-row'); b.type = 'button';
    const t = el('span', 'ravi-row-t'); t.append(el('b', null, name));
    if (Array.isArray(v) && v[1] && Object.keys(v[1]).length) t.append(el('small', null, Object.entries(v[1]).map(([sg, k]) => k > 1 ? `${sg} ×${k}` : sg).join(' · ')));
    b.append(t, el('span', 'ravi-row-n', fmt(n || 0)));
    if (RAVI.skip.has(name) || RAVI_AKRABA.test(name) || RAVI_MUELLIF.has(name)) { b.classList.add('plain'); b.disabled = true; }
    else b.addEventListener('click', () => raviOpen(name));
    return b;
  };
  const show = k => { for (const nm of keys.slice(box._n || 0, k)) box.append(row(nm, obj[nm])); box._n = k; };
  show(30);
  wrap.append(box);
  if (keys.length > 30) { const m = el('button', 'chip-button ravi-more', `Hepsini göster (${keys.length})`); m.type = 'button'; m.addEventListener('click', () => { show(keys.length); m.remove(); }); wrap.append(m); }
  return wrap;
}
async function raviRender(name) {
  RAVI.title.textContent = name;
  RAVI.body.replaceChildren(el('p', 'empty', 'Yükleniyor…'));
  let D;
  try { D = await raviLoad(); } catch { RAVI.body.replaceChildren(el('p', 'empty', 'Râvi bilgisi yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.')); return; }
  if (RAVI.cur !== name) return;
  const r = D.r[name];
  RAVI.body.replaceChildren();
  if (!r) { RAVI.body.append(el('p', 'empty', 'Bu ad için zincir kaydı yok.')); return; }
  const [ar, sayi, aldigi, verdigi, hadisler, rol] = r;
  const libs = Object.keys(hadisler).filter(v => LIBS[v]);
  const libCount = v => hadisler[v].reduce((t, [, nos]) => t + nos.length, 0);
  // Profil kartı: Arapça ad, sayılar, kitap pilleri, senedde yeri, aynı adın yazımları
  const head = el('div', 'ravi-card');
  if (ar && ar.length) { const p = el('p', 'ravi-ar', ar.join(' · ')); p.lang = 'ar'; p.dir = 'rtl'; head.append(p); }
  const stats = el('div', 'ravi-stats');
  const stat = (n, l) => { const d = el('div', 'ravi-stat'); d.append(el('b', null, fmt(n)), el('span', null, l)); return d; };
  stats.append(stat(sayi, 'rivayet'), stat(libs.length, 'kitap'), stat(Object.keys(aldigi).length + Object.keys(verdigi).length, 'komşu râvi'));
  head.append(stats);
  if (rol) {
    const parts = [];
    if (rol.hoca) parts.push(`${fmt(rol.hoca)} senedde müellifin doğrudan rivayet aldığı kişi`);
    if (rol.ara) parts.push(`${fmt(rol.ara)} senedde ara halka`);
    if (rol.son) parts.push(`${fmt(rol.son)} senedde son halka`);
    if (parts.length) head.append(el('p', 'ravi-n', parts.join(' · ')));
  }
  if (libs.length) {
    const row = el('div', 'ravi-libs');
    for (const v of libs) {
      const c = el('button', 'ravi-lib'); c.type = 'button';
      c.append(el('span', null, LIB_NAMES[v] || v), el('small', null, String(libCount(v))));
      c.addEventListener('click', () => { tab('riv'); const t = RAVI.body.querySelector(`[data-lib="${v}"]`); if (t) { t.open = true; t.scrollIntoView({block: 'start', behavior: 'smooth'}); } });
      row.append(c);
    }
    head.append(row);
  }
  const fam = (D.t[name] || []).filter(x => x !== name && D.r[x]);
  if (fam.length) { const p = el('div', 'ravi-fam'); p.append(el('span', 'ravi-fam-h', 'Bu adın kısa ya da tam yazımları (aynı kişi olmayabilir): ')); for (const x of fam) p.append(raviChip(x, D.r[x][1])); head.append(p); }
  RAVI.body.append(head);
  // Sekmeler: Aldıkları · Verdikleri · Rivayetleri (seçim râviler arasında gezerken korunur)
  const TABS = [['al', 'Aldıkları', Object.keys(aldigi).length], ['ver', 'Verdikleri', Object.keys(verdigi).length], ['riv', 'Rivayetleri', sayi]];
  const seg = el('div', 'ravi-seg'), pane = el('div', 'ravi-pane');
  const btns = {};
  for (const [k, l, n] of TABS) { const b = el('button', null, l + ' '); b.type = 'button'; b.append(el('small', null, k === 'riv' ? fmt(n) : `${fmt(n)} kişi`)); b.addEventListener('click', () => tab(k)); btns[k] = b; seg.append(b); }
  RAVI.body.append(seg, pane);
  const panes = {};
  const build = k => {
    if (k === 'al') { const w = el('div'); w.append(el('p', 'ravi-hint', 'Senedlerde bu râvinin rivayet aldığı kişiler (zincirde ondan sonraki halka).'), raviRows(aldigi)); return w; }
    if (k === 'ver') { const w = el('div'); w.append(el('p', 'ravi-hint', 'Senedlerde bu râviden rivayet eden kişiler (zincirde ondan önceki halka).'), raviRows(verdigi)); return w; }
    const sec = el('div');
    for (const [i, v] of libs.entries()) {
      const L = LIBS[v];
      const d = el('details', 'ravi-lib-d'); d.dataset.lib = v;
      const sum = el('summary'); sum.append(el('span', 'ravi-lib-t', LIB_NAMES[v] || v), el('small', null, `${libCount(v)} rivayet`));
      d.append(sum); sec.append(d);
      if (i === 0) d.open = true;
      const fill = async () => {
        if (d.dataset.done) return; d.dataset.done = 1;
        let idx = L.idx;
        if (!idx) { try { idx = L.idx = await libFetch(L, 'index.json'); } catch { idx = null; } }
        if (RAVI.cur !== name) return;
        for (const [bi, nos] of hadisler[v]) {
          const g = el('div', 'ravi-book');
          const bt = idx && idx[bi] ? idx[bi].tr : '';
          if (bt && !L.single) g.append(el('p', 'ravi-book-t', bt));
          const nums = el('div', 'ravi-nums');
          const show = k => { for (const no of nos.slice(nums._n || 0, k)) { const b = el('button', 'ravi-no', String(no)); b.type = 'button'; b.addEventListener('click', () => raviClose(() => goTo(v, L.single ? 0 : bi, no, true, {label: 'Râvi: ' + name, back: () => raviOpen(name)}))); nums.append(b); } nums._n = k; };
          show(60);
          g.append(nums);
          if (nos.length > 60) { const m = el('button', 'ravi-more-n', `+${nos.length - 60}`); m.type = 'button'; m.addEventListener('click', () => { show(nos.length); m.remove(); }); nums.append(m); }
          d.append(g);
        }
      };
      d.addEventListener('toggle', () => { if (d.open) fill(); });
      if (d.open) fill();
    }
    const temelAd = name.replace(/\s*\(.*?\)/g, '').trim();
    if (!RAVI.skip.has(name)) {
      const sb = el('button', 'chip-button ravi-ara', `🔍 Bütün kütüphanede senedde ara: ${temelAd}`); sb.type = 'button';
      sb.addEventListener('click', () => { ARA.scope = 'sened'; store.set('zikrim-ara-kapsam', 'sened'); raviClose(() => araOpen(temelAd)); });
      sec.append(sb);
    }
    return sec;
  };
  function tab(k) {
    RAVI.tab = k;
    for (const [kk] of TABS) btns[kk].classList.toggle('on', kk === k);
    if (!panes[k]) panes[k] = build(k);
    pane.replaceChildren(panes[k]);
  }
  tab(RAVI.tab && TABS.some(([k, , n]) => k === RAVI.tab && n) ? RAVI.tab : (TABS.find(([, , n]) => n) || TABS[2])[0]);
  RAVI.body.append(el('p', 'ravi-by', 'Yalnızca kütüphanedeki eserlerin kendi senedlerinden; râvi hakkında dışarıdan bilgi ya da hüküm eklenmemiştir. Aynı ad farklı kişilere ait olabilir; sîga dökümü yalnız isnad standardına getirilmiş kitaplarda (şimdilik Sünen-i Ebî Dâvûd) vardır.'));
}

function navRecord() {
  if (navSkip) return;
  const st = {v: view, b: LIBS[view] ? LIBS[view].book : null}, key = st.v + '|' + st.b;
  if (key === navKey) return;
  try { if (navKey === null) history.replaceState(st, ''); else history.pushState(st, ''); } catch {}
  navKey = key;
}
addEventListener('popstate', e => {
  if (RAVI.open) { const f = RAVI.after; RAVI.after = null; raviHide(f); return; }
  if (ARA.open) { const f = ARA.after; ARA.after = null; araHide(f); return; }
  if (!focusEl.hidden) { closeFocus(); return; }
  const st = e.state;
  if (!st || !st.v || st.focus) return;
  const key = st.v + '|' + st.b;
  if (key === navKey) return;
  ttsStop();
  if (LIBS[st.v]) { LIBS[st.v].book = st.b; libSave(LIBS[st.v]); }
  view = VIEWS[st.v] ? st.v : 'main';
  searchEl.value = '';
  navSkip = true;
  try { renderCards(); } finally { navSkip = false; }
  navKey = key;
  if (TAB_ROOTS.has(view)) window.scrollTo(0, 0); else $('.list').scrollIntoView({block: 'start'});
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
    else if (view === 'anasayfa') homeEl.scrollTo({top: 0, behavior: 'smooth'});
    else window.scrollTo({top: 0, behavior: 'smooth'});
    return;
  }
  tabMem[cur] = {view, y: scrollY, ext: readExt};
  const m = tabMem[t];
  if (!m) { setView(TAB_ROOT[t], true); return; }
  const last = RD.last[m.view], L = LIBS[m.view];
  if (!m.ext && last && (m.view === 'usul' || (L && L.book != null && last.b === L.book))) {
    ttsStop();
    flashQuiet = true;
    goTo(last.v, last.b, last.n);
    setTimeout(() => { flashQuiet = false; }, 2000);
    return;
  }
  ttsStop();
  readExt = !!m.ext;
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
// Android'de klavye geri tuşuyla kapatılınca kutu odakta kalır: görünür alan yüksekliği klavyesiz yüksekliğe dönünce çubuk geri gelir
if (window.visualViewport) {
  let kbBase = visualViewport.height;
  visualViewport.addEventListener('resize', () => {
    if (!KB_INPUT(document.activeElement)) { kbBase = visualViewport.height; return; }
    if (visualViewport.height > kbBase) kbBase = visualViewport.height;
    document.body.classList.toggle('kb', visualViewport.height < kbBase * 0.8);
  });
}
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
  const prev = S.days[today], prevDone = S.done[today];
  settings.close();
  if (!prev && !prevDone) return;
  delete S.days[today]; delete S.done[today]; save(); update();
  toast('Bugünkü sayaçlar sıfırlandı', {label: 'Geri al', run: () => { if (prev) S.days[today] = prev; if (prevDone) S.done[today] = prevDone; save(); update(); }});
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

/* ---------- Yedek ----------
   Zikir durumu (S) eskisi gibi en üst düzeyde durur (eski sürümler bu yedeği yine okuyabilsin); `_ek` içinde telefonda tutulan diğer
   her şey vardır: adı zikrim- ya da sekine- ile başlayan bütün anahtarlar (Kaydettiklerim, koleksiyonlar, kaldığın yerler, açık kitaplar,
   Akış filtresi ve görüntü seçimi, yazı boyutu, sesli okuma ayarları…). Yeni bir anahtar eklenirse kendiliğinden yedeğe girer. */
const BACKUP_SKIP = new Set([KEY, OLD_KEY]);
function backupExtras() {
  const ek = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (/^(zikrim|sekine)-/.test(k) && !BACKUP_SKIP.has(k)) ek[k] = localStorage.getItem(k);
  }
  return ek;
}
$('#exportData').addEventListener('click', async () => {
  const name = `sekine-yedek-${today}.json`;
  const blob = new Blob([JSON.stringify(Object.assign({}, S, {_yedek: 2, _tarih: new Date().toISOString(), _ek: backupExtras()}), null, 2)], {type: 'application/json'});
  try {
    const file = new File([blob], name, {type: 'application/json'});
    if (navigator.canShare && navigator.canShare({files: [file]})) {
      await navigator.share({files: [file], title: 'Sekîne yedeği'});
      store.set('sekine-son-yedek', today); if (view === 'profil') renderCards();
      return;
    }
  } catch (err) { if (err && err.name === 'AbortError') return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  store.set('sekine-son-yedek', today); if (view === 'profil') renderCards();
});
$('#importData').addEventListener('change', async e => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  let data;
  try { data = JSON.parse(await file.text()); if (!data || !Array.isArray(data.zikirs)) throw new Error(); }
  catch { settings.close(); toast('Bu dosya geçerli bir Sekîne yedeği değil'); return; }
  const ek = data._ek && typeof data._ek === 'object' ? Object.entries(data._ek).filter(([k, v]) => /^(zikrim|sekine)-/.test(k) && !BACKUP_SKIP.has(k) && typeof v === 'string') : [];
  // Geri alabilmek için şimdiki hâl saklanır; sayfa yenilendikten sonra bildirimdeki “Geri al” bunu geri yükler
  try { sessionStorage.setItem('sekine-geri', JSON.stringify({s: localStorage.getItem(KEY), ek: backupExtras()})); } catch {}
  const s = sanitize(data);
  s.ui = UI_V; // yedekteki tema ve sıra korunsun, açılışta tekrar değiştirilmesin
  try {
    if (ek.length) for (const k of Object.keys(backupExtras())) localStorage.removeItem(k); // yedek tam geri yüklenir: yedekte olmayan kayıtlar kalmaz
    for (const [k, v] of ek) localStorage.setItem(k, v);
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch { settings.close(); toast('Yedek yüklenemedi (depolama dolu olabilir)'); return; }
  try { sessionStorage.setItem('sekine-yuklendi', ek.length ? 'tam' : 'eski'); } catch {}
  location.reload(); // Kaydettiklerim, koleksiyonlar, kitaplar ve ayarlar en temiz biçimde yeniden okunsun
});
// Yedek yüklendikten sonraki açılış: bildirim ve “Geri al”
{
  let how = null; try { how = sessionStorage.getItem('sekine-yuklendi'); sessionStorage.removeItem('sekine-yuklendi'); } catch {}
  if (how) setTimeout(() => toast(how === 'tam' ? 'Yedek yüklendi' : 'Yedek yüklendi (eski yedek: yalnızca zikirler)', {label: 'Geri al', run: () => {
    try {
      const g = JSON.parse(sessionStorage.getItem('sekine-geri'));
      for (const k of Object.keys(backupExtras())) localStorage.removeItem(k);
      for (const [k, v] of Object.entries(g.ek || {})) localStorage.setItem(k, v);
      if (g.s != null) localStorage.setItem(KEY, g.s);
      sessionStorage.removeItem('sekine-geri');
      location.reload();
    } catch { toast('Geri alınamadı'); }
  }}), 400);
}

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
if (!('switch' in HTMLInputElement.prototype)) document.documentElement.classList.add('no-switch'); // iOS 17.4+ dışında anahtar görünümü CSS'ten
setTheme(S.theme);
renderCards();
// Bildirimden açılış: ?v=sabah / ?v=aksam ilgili zikir görünümünü açar
{
  const q = new URLSearchParams(location.search).get('v');
  if (q) { try { history.replaceState(history.state, '', location.pathname); } catch {} if (VIEWS[q] && q !== 'main') setView(q, true); }
}
if ('serviceWorker' in navigator) {
  // Uygulama açıkken bildirime dokunulursa service worker buraya haber verir
  navigator.serviceWorker.addEventListener('message', e => {
    const d = e.data;
    if (!d || d.type !== 'open' || !VIEWS[d.v] || !focusEl.hidden || editor.open) return;
    if (settings.open) settings.close();
    setView(d.v, true);
  });
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
