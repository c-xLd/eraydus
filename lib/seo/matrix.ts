export interface ProgrammaticPageConfig {
  slug: string;
  category: 'color' | 'size' | 'mechanism' | 'location' | 'usecase';
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  badge: string;
  contentTitle: string;
  contentBody: string;
  faqs: { question: string; answer: string }[];
  filterTags: string[];
}

export const PROGRAMMATIC_MATRIX: Record<string, ProgrammaticPageConfig> = {
  // --- RENKLER ---
  'siyah': {
    slug: 'siyah',
    category: 'color',
    title: 'Siyah Profil Duşakabin Modelleri & Fiyatları 2026 | ERAYDUŞ',
    metaDescription: 'Mat siyah elektrostatik toz boyalı, paslanmaz aluminyum ve 6mm temperli camlı siyah duşakabin çözümleri. Lüks ve modern banyolar için özel ölçü üretim.',
    h1: 'Siyah Profil Duşakabin Sistemleri',
    subtitle: 'Kontrastın ve modern banyonun simgesi mat siyah profil duş kabinleri.',
    badge: 'Mat Siyah Serisi',
    contentTitle: 'Neden Siyah Profil Duşakabin Tercih Edilmeli?',
    contentBody: 'ERAYDUŞ Mat Siyah koleksiyonu, 220°C fırınlanmış elektrostatik toz boya teknolojisi sayesinde nem ve su lekelerine karşı %100 dayanıklıdır. Soyulma, çizilme veya oksitlenme yapmaz. 6mm temperli cam opsiyonlarıyla banyonuza maskülen ve lüks bir dokunuş kazandırır.',
    filterTags: ['siyah', 'mat-siyah', 'black'],
    faqs: [
      {
        question: 'Siyah duşakabin profillerinde boya dökülmesi olur mu?',
        answer: 'Hayır. ERAYDUŞ siyah profillerinde sıradan yaş boya yerine endüstriyel fırınlama teknolojili elektrostatik toz boya kullanılır. Soyulma ve dökülmeye karşı 10 yıl garantilidir.',
      },
      {
        question: 'Siyah duşakabinde su lekesi belli olur mu?',
        answer: 'Camlarımıza uygulanan su tutmayan kireç önleyici kaplama sayesinde su damlaları cam yüzeyinde tutunamaz ve kolayca temizlenir.',
      },
    ],
  },
  'altin': {
    slug: 'altin',
    category: 'color',
    title: 'Altın Gold Profil Duşakabin Modelleri | ERAYDUŞ',
    metaDescription: 'Solmayan ve kararmayan altın gold profil lüks duşakabin çeşitleri. Şıklık ve zarafet arayan banyolar için özel tasarım cam kabinler.',
    h1: 'Gold & Altın Profil Lüks Duşakabinler',
    subtitle: 'Solmaz ve kararmaz altın kaplama duş kabinleri.',
    badge: 'Gold Profil Serisi',
    contentTitle: 'Gerçek Solmaz Altın Kaplama Kalitesi',
    contentBody: 'Özel solmaz kaplama teknolojisi ile kaplanan altın profillerimiz kimyasal temizleyicilere, yüksek neme ve ısıya karşı tam koruma sağlar. Zamansız lüks banyo tasarımlarının vazgeçilmezi olan gold detaylar, şeffaf veya kumlama desenli özel camlarımızla kusursuz bir uyum yakalar.',
    filterTags: ['altin', 'gold', 'bronz'],
    faqs: [
      {
        question: 'Altın renkli duşakabin profili zamanla kararır mı?',
        answer: 'ERAYDUŞ gold serisinde gerçek solmaz titanyum kaplama teknolojisi uygulanır. Banyo nemine, deterjana ve suya maruz kaldığında kararma veya renk değişimi kesinlikle yaşanmaz.',
      },
    ],
  },
  'krom': {
    slug: 'krom',
    category: 'color',
    title: 'Krom Parlak Profil Duşakabin Fiyatları | ERAYDUŞ',
    metaDescription: 'Zamansız şıklık: Paslanmaz parlak krom ve mat eloksal profil duşakabin modelleri. Yüksek dayanıklılık ve ekonomik özel üretim çözümler.',
    h1: 'Krom & Eloksal Profil Duşakabinler',
    subtitle: 'Işıltılı ve zamansız tasarım: Aynalı krom kaplama duş kabinleri.',
    badge: 'Classic Chrome Line',
    contentTitle: 'Ayna Parlaklığında Krom Yüzeyler',
    contentBody: '6063 alüminyum alaşımından üretilen krom profillerimiz, ekstra parlatma işleminden geçirilerek korozyona karşı dirençli hale getirilir. Kolay temizlenebilir yapısı ve her dekorasyon tarzına uyum sağlayan klasisizmi ile banyoların vazgeçilmezidir.',
    filterTags: ['krom', 'parlak', 'eloksal'],
    faqs: [
      {
        question: 'Krom profiller paslanır mı?',
        answer: 'Ürünlerimizde paslanan demir veya galvaniz malzeme kullanılmaz. Saf eloksal alüminyum üzeri krom kaplama sayesinde paslanma riski sıfırdır.',
      },
    ],
  },

  // --- ÖLÇÜLER ---
  '80x80': {
    slug: '80x80',
    category: 'size',
    title: '80x80 Duşakabin Modelleri ve Fiyatları | ERAYDUŞ',
    metaDescription: 'Küçük banyolar için 80x80 kare ve oval duşakabin modelleri. Yer tasarruflu sürgülü ve katlanır kapı sistemleri ile özel üretim.',
    h1: '80x80 Ölçülü Duşakabin Çözümleri',
    subtitle: 'Kompakt alanlar için maksimum ferahlık sunan 80x80 duş kabinleri.',
    badge: 'Kompakt Boyut',
    contentTitle: 'Küçük Banyolar İçin Akıllı Tasarımlar',
    contentBody: '80x80 cm ölçülerindeki duşakabinlerimiz, dar banyo alanlarında hareket özgürlüğünü maksimuma çıkarmak için özel olarak tasarlanmıştır. İçeriye ve dışarıya katlanabilir köşe girişli veya akordiyon kapı mekanizmaları ile alan tasarrufu sağlar.',
    filterTags: ['80x80', 'kare', 'oval'],
    faqs: [
      {
        question: '80x80 duşakabin kullanımı rahat mıdır?',
        answer: 'Doğru kapı mekanizması (özellikle köşe giriş sürgülü veya katlanır kapı) tercih edildiğinde 80x80 cm banyoda oldukça ergonomik bir kullanım sunar.',
      },
    ],
  },
  '90x90': {
    slug: '90x90',
    category: 'size',
    title: '90x90 Duşakabin Fiyatları & Standart Ölçü Kabinler | ERAYDUŞ',
    metaDescription: 'En çok tercih edilen 90x90 kare, oval ve düz duşakabin çeşitleri. Şeffaf ve füme temperli cam seçenekleri ile hemen inceleyin.',
    h1: '90x90 Standart Ölçü Duşakabinler',
    subtitle: 'Ideal banyo alanının altın oranı: 90x90 ergonomik duş sistemleri.',
    badge: 'En Popüler Ölçü',
    contentTitle: 'Ergonomi ve Şıklığın Dengesi',
    contentBody: '90x90 cm standart duşakabin ölçüsü, hem ferah bir duş alanı sunar hem de banyonuzda ideal yer kaplar. 6mm temperli emniyet camı ve paslanmaz rulman tekerlekleri ile uzun yıllar sessiz kullanım vadeder.',
    filterTags: ['90x90', 'kare', 'oval', 'duz'],
    faqs: [
      {
        question: '90x90 duşakabine tekne gerekli midir?',
        answer: 'Hayır, isteğe bağlı olarak doğrudan seramik veya mermer üzerine (sıfır zemin) ya da duş teknesi üzerine montaj yapılabilir.',
      },
    ],
  },
  '100x100': {
    slug: '100x100',
    category: 'size',
    title: '100x100 Geniş Duşakabin Modelleri | ERAYDUŞ',
    metaDescription: 'Geniş ve konforlu banyolar için 100x100 duşakabin çeşitleri. Tek cam ve çift sürgülü lüks cam kabin seçenekleri.',
    h1: '100x100 Lüks Duş Kabini Sistemleri',
    subtitle: 'Maksimum duş konforu ve ferahlık sunan 100x100 ölçülü kabinler.',
    badge: 'Geniş Konfor',
    contentTitle: 'Banyonuzda SPA Konforu',
    contentBody: '100x100 cm duş alanları, SPA ve otel konforunu evinize taşır. 6mm temperli emniyet camı seçeneği ve minimalist profilsiz bağlantı elemanları ile ferahlığı hissettirir.',
    filterTags: ['100x100', 'genis', 'luks'],
    faqs: [
      {
        question: '100x100 duşakabinde hangi cam kalınlığı önerilir?',
        answer: '100x100 ve üzeri geniş ölçülerde ekstra stabilite ve güvenlik için 8 mm temperli emniyet camı öneriyoruz.',
      },
    ],
  },

  // --- MEKANİZMALAR ---
  'surgulu': {
    slug: 'surgulu',
    category: 'mechanism',
    title: 'Sürgülü Duşakabin Modelleri & Rulmanlı Kabinler | ERAYDUŞ',
    metaDescription: 'Sessiz ve pürüzsüz kayar sürgülü kapı duşakabin sistemleri. Çift tekerlekli rulman ve su sızdırmaz fitil teknolojisi.',
    h1: 'Sürgülü (Kayar Kapılı) Duşakabinler',
    subtitle: 'Sessiz çalışan çift rulmanlı mekanizma ile pratik geçiş imkanı.',
    badge: 'Sürgülü Sistem',
    contentTitle: 'Sessiz ve Pürüzsüz Çalışan Sürgülü Ray Teknolojisi',
    contentBody: 'Sürgülü duşakabinlerimiz, pirinç gövdeli rulman tekerlekleri ve paslanmaz alüminyum ray profilleri sayesinde yıllarca takılmadan ve ses çıkarmadan çalışır. Mıknatıslı fitiller su sızdırmazlığı %100 garanti eder.',
    filterTags: ['surgulu', 'kayar', 'rulman'],
    faqs: [
      {
        question: 'Sürgülü duşakabin tekerlekleri çabuk bozulur mu?',
        answer: 'ERAYDUŞ sürgülü sistemlerinde paslanmaz çelik bilyalı ve pirinç rulmanlar kullanılır. 50.000 açma-kapama testinden başarıyla geçmiştir.',
      },
    ],
  },
  'menteseli': {
    slug: 'menteseli',
    category: 'mechanism',
    title: 'Menteşeli Kapılı Lüks Duşakabin Sistemleri | ERAYDUŞ',
    metaDescription: '90 ve 180 derece açılır pirinç menteşeli lüks cam duşakabin modelleri. Minimalist profilsiz özel tasarımlar.',
    h1: 'Menteşeli (Açılır Kapılı) Cam Kabinler',
    subtitle: 'Profilsiz, şeffaf ve özel: 180° açılabilir pirinç menteşeli tasarımlar.',
    badge: 'Menteşeli Serisi',
    contentTitle: 'Profilsiz Saf Cam Şıklığı',
    contentBody: 'Menteşeli duşakabinler, profil kalabalığını ortadan kaldırarak sadece camın zarafetini ön plana çıkarır. Masif pirinç krom kaplama menteşelerimiz kendinden hidrolikli kapanma özelliğine sahiptir.',
    filterTags: ['menteseli', 'acilir', 'profilsiz'],
    faqs: [
      {
        question: 'Menteşeli duşakabinden dışarı su sızar mı?',
        answer: 'Özel şeffaf silikon fitillerimiz ve eşik profillerimiz sayesinde kapı kapandığında su dışarı sızmaz.',
      },
    ],
  },

  // --- LOKASYONLAR ---
  'ankara': {
    slug: 'ankara',
    category: 'location',
    title: 'Ankara Duşakabin İmalatı & Montaj Hizmeti | ERAYDUŞ Siteler',
    metaDescription: 'Ankara üreticisi ERAYDUŞ ile Çankaya, Yenimahalle, Çayyolu, İncek ve tüm ilçelere ücretsiz keşif, imalat ve montaj imkanı.',
    h1: 'Ankara Özel Ölçü Duşakabin İmalatçısı',
    subtitle: 'Siteler fabrikamızdan Ankara’nın tüm ilçelerine direkt teslimat ve uzman montaj.',
    badge: 'Ankara Yerli İmalat',
    contentTitle: 'Ankara’nın Her Noktasına Ücretsiz Keşif ve Montaj',
    contentBody: 'ERAYDUŞ, Siteler’deki fabrikasında ürettiği yüksek kaliteli duşakabinleri aracı olmadan doğrudan Ankara halkına ulaştırır. Çankaya, İncek, Çayyolu, Ümitköy, Yenimahalle, Keçiören, Batıkent ve Etimesgut bölgelerine aynı hafta montaj garantisi sunulur.',
    filterTags: ['ankara', 'siteler', 'cankaya', 'incek'],
    faqs: [
      {
        question: 'Ankara içi keşif ücretli midir?',
        answer: 'Hayır, Ankara merkez ilçelerinde yerinde ölçüm ve teknik keşif hizmetimiz tamamen ücretsizdir.',
      },
      {
        question: 'Özel ölçü duşakabin kaç günde teslim edilir?',
        answer: 'Ölçü alındıktan sonra temperli cam kesim ve imalat süreci ortalama 3-5 iş günü içinde tamamlanarak montaj yapılır.',
      },
    ],
  },
  'yenimahalle': {
    slug: 'yenimahalle',
    category: 'location',
    title: 'Yenimahalle & Batıkent Duşakabin İmalatı | ERAYDUŞ',
    metaDescription: 'Yenimahalle, Batıkent, Demetevler ve Şentepe bölgelerine özel ölçü imalat duşakabin çözümleri. Fabrikadan direkt satış ve ücretsiz keşif avantajı.',
    h1: 'Yenimahalle & Batıkent Duşakabin İmalatçısı',
    subtitle: 'Fabrikamızdan Yenimahalle ve Batıkent’e aynı gün yerinde ücretsiz keşif servisi.',
    badge: 'Yenimahalle / Batıkent Servisi',
    contentTitle: 'Yenimahalle ve Batıkent Bölgesinde Fabrikadan Hızlı Montaj',
    contentBody: 'ERAYDUŞ Siteler fabrikamızdan Yenimahalle ve Batıkent lokasyonlarındaki tüm konutlara özel ölçü imalat ve aynı hafta içerisinde hızlı montaj imkanı sunuyoruz.',
    filterTags: ['yenimahalle', 'batikent', 'siteler', 'sentepe'],
    faqs: [
      {
        question: 'Yenimahalle ve Batıkent için keşif ücretli mi?',
        answer: 'Hayır, Yenimahalle ve Batıkent sınırları içerisindeki tüm adreslere ücretsiz yerinde ölçüm ve keşif servisi sunuyoruz.',
      },
    ],
  },
  'kecioren': {
    slug: 'kecioren',
    category: 'location',
    title: 'Keçiören Duşakabin Modelleri & Montajı | ERAYDUŞ',
    metaDescription: 'Keçiören, Etlik, Ovacık ve Ayvalı bölgeleri için kırılmaz temperli cam duşakabin imalatı. Paslanmaz profil ve ücretsiz adrese keşif.',
    h1: 'Keçiören Özel Ölçü Duşakabin İmalat & Montajı',
    subtitle: 'Keçiören banyolarına tam oturan özel imalat temperli cam kabinler.',
    badge: 'Keçiören Bölge Servisi',
    contentTitle: 'Keçiören Konutlarına Özel İmalat Kabinler',
    contentBody: 'Keçiören, Etlik, Ovacık ve Esertepe semtlerindeki banyolara özel ölçüde 6mm temperli cam duşakabin üretimi gerçekleştiriyoruz.',
    filterTags: ['kecioren', 'etlik', 'ovacik', 'ayvali'],
    faqs: [
      {
        question: 'Keçiören için montaj ne kadar sürer?',
        answer: 'Keçiören adresinizde montaj işlemi uzman ekibimiz tarafından ortalama 1 saat içinde tamamlanır.',
      },
    ],
  },
  'etimesgut': {
    slug: 'etimesgut',
    category: 'location',
    title: 'Etimesgut & Eryaman Duşakabin Fiyatları | ERAYDUŞ',
    metaDescription: 'Eryaman, Etimesgut, Bağlıca ve Elvankent için lüks duşakabin modelleri. Siyah profil, gold kaplama ve cam duş kabini seçenekleri.',
    h1: 'Eryaman & Etimesgut Duşakabin Çözümleri',
    subtitle: 'Bağlıca ve Eryaman konut projelerine özel şık ve dayanıklı duş kabinleri.',
    badge: 'Eryaman / Etimesgut Servisi',
    contentTitle: 'Eryaman ve Bağlıca Bölgesine Özel İmalat',
    contentBody: 'Eryaman, Bağlıca, Elvankent ve Göksu bölgelerindeki yeni konut projelerine ve yenilenen banyolara özel ölçü temperli cam duşakabin imal ediyoruz.',
    filterTags: ['etimesgut', 'eryaman', 'baglica', 'elvankent'],
    faqs: [
      {
        question: 'Bağlıca ve Eryaman’a adrese keşif var mı?',
        answer: 'Evet, Etimesgut ve Eryaman bölgelerinin tamamına ücretsiz yerinde ölçüm ve keşif servisi gönderiyoruz.',
      },
    ],
  },
  'katlanir': {
    slug: 'katlanir',
    category: 'mechanism',
    title: 'Katlanır Kapılı Akordiyon Duşakabin Modelleri | ERAYDUŞ',
    metaDescription: 'Dar banyolar için akordiyon katlanır cam duşakabin sistemleri. İçeri ve dışarı katlanabilen akıllı kapı mekanizmaları.',
    h1: 'Katlanır Kapılı (Akordiyon) Duşakabinler',
    subtitle: 'Küçük alanlarda maksimum giriş genişliği sağlayan katlanır cam kapılar.',
    badge: 'Katlanır Kapı Serisi',
    contentTitle: 'Dar Alanlarda Geçiş Alanını %100 Artıran Katlanır Mekanizma',
    contentBody: 'Katlanır cam kapılı duşakabinler, kapının akordiyon şeklinde duvar kenarına katlanması sayesinde dar banyolarda maksimum giriş alanı sunar.',
    filterTags: ['katlanir', 'akordiyon', 'dar-banyo'],
    faqs: [
      {
        question: 'Katlanır cam kapı duşakabin güvenli midir?',
        answer: 'Evet, tüm katlanır sistemlerimizde 6mm rodajlı temperli emniyet camları ve paslanmayan özel pirinç menteşeler kullanılır.',
      },
    ],
  },
  'fume-cam': {
    slug: 'fume-cam',
    category: 'color',
    title: 'Füme Siyah Cam Duşakabin Modelleri & Fiyatları | ERAYDUŞ',
    metaDescription: 'Gizlilik ve lüksü birleştiren füme siyah renkli temperli cam duşakabinler. Siyah profil ve gold detaylar ile estetik görünüm.',
    h1: 'Füme Siyah Cam Lüks Duşakabinler',
    subtitle: 'Banyonuzda karizmatik ve mahrem bir atmosfer: Kendinden füme cam kabinler.',
    badge: 'Füme Cam Koleksiyonu',
    contentTitle: 'Kendinden Renkli Güvenlikli Füme Cam Teknolojisi',
    contentBody: 'ERAYDUŞ füme cam duşakabinlerde cam sonradan film ile kaplanmaz; cam hamuru imalat aşamasında kendinden renkli olarak üretilir. Çizilmez, solmaz ve leke göstermez.',
    filterTags: ['fume', 'fume-cam', 'siyah-cam'],
    faqs: [
      {
        question: 'Füme cam zamanla soyulur mu?',
        answer: 'Hayır. Camlarımız kaplama veya film değil, fabrika çıkışlı kendinden renkli harman füme temperli camdır. Soyulma veya renk atması kesinlikle imkansızdır.',
      },
    ],
  },
  'livorno-serisi': {
    slug: 'livorno-serisi',
    category: 'mechanism',
    title: 'Livorno Serisi Duşakabin Modelleri | ERAYDUŞ',
    metaDescription: 'Özel tasarım Livorno Serisi duşakabin modelleri. 6mm temperli cam, paslanmaz alüminyum profil ve Ankara içi ücretsiz keşif ve montaj.',
    h1: 'Livorno Serisi Duşakabinler',
    subtitle: 'Modern çizgiler ve estetik detaylarla Livorno serisi duş kabinleri.',
    badge: 'Livorno Serisi',
    contentTitle: 'Livorno Serisi Duşakabin Özellikleri',
    contentBody: 'ERAYDUŞ Livorno Serisi, şık tasarım anlayışı ve paslanmaz alüminyum profilleri ile banyonuza değer katmak üzere özel ölçü imal edilmektedir.',
    filterTags: ['livorno', 'livorno-serisi'],
    faqs: [
      {
        question: 'Livorno serisi özel ölçü üretilebilir mi?',
        answer: 'Evet, Livorno serisi tüm duşakabinlerimiz banyonuzun ölçüsüne özel olarak imal edilmektedir.',
      },
    ],
  },
  'askili-sistem': {
    slug: 'askili-sistem',
    category: 'mechanism',
    title: 'Askılı Sistem Duşakabin Modelleri | ERAYDUŞ',
    metaDescription: 'Üstten askılı sessiz sürgülü mekanizmaya sahip askılı sistem duşakabin modelleri. Paslanmaz rulmanlar ve 6mm temperli cam.',
    h1: 'Askılı Sistem Duşakabinler',
    subtitle: 'Üstten askılı paslanmaz rulmanlı sessiz kayar kapı mekanizmaları.',
    badge: 'Askılı Sistem',
    contentTitle: 'Üstten Askılı Kayar Kapı Teknolojisi',
    contentBody: 'Askılı sistem duşakabinler, cam kapının üst profildeki rulmanlar üzerinde sessizce hareket ettiği, alt tarafta takılma yapmayan pratik sistemlerdir.',
    filterTags: ['askili', 'askili-sistem'],
    faqs: [
      {
        question: 'Askılı sistem duşakabin rahat çalışır mı?',
        answer: 'Evet, üstten askılı paslanmaz bilyalı rulmanlar sayesinde kapı zahmetsizce ve sessizce kayar.',
      },
    ],
  },
  'katlanir-dusakabin': {
    slug: 'katlanir-dusakabin',
    category: 'mechanism',
    title: 'Katlanır Duşakabin Modelleri ve Fiyatları | ERAYDUŞ',
    metaDescription: 'Dar banyolar için akordiyon katlanır cam duşakabin modelleri. İçeri ve dışarı katlanabilen akıllı kapı sistemleri.',
    h1: 'Katlanır Duşakabin Sistemleri',
    subtitle: 'Dar alanlarda geniş giriş imkanı sunan katlanır kapılı kabinler.',
    badge: 'Katlanır Model',
    contentTitle: 'Katlanır Kapı Kolaylığı',
    contentBody: 'Katlanır duşakabinler, cam kapının içeriye veya dışarıya akordiyon şeklinde katlanması sayesinde dar banyo alanlarında maksimum kullanım ferahlığı sağlar.',
    filterTags: ['katlanir', 'katlanir-dusakabin', 'akordiyon'],
    faqs: [
      {
        question: 'Katlanır duşakabin su sızdırır mı?',
        answer: 'Mıknatıslı fitillerimiz ve alt suluk profilimiz sayesinde su dışarı sızmaz.',
      },
    ],
  },
  'boy-mentese': {
    slug: 'boy-mentese',
    category: 'mechanism',
    title: 'Boy Menteşeli Duşakabin Modelleri | ERAYDUŞ',
    metaDescription: 'Boydan boya paslanmaz menteşe profilli şık cam duşakabin modelleri. Dayanıklı ve uzun ömürlü kullanım.',
    h1: 'Boy Menteşe Duşakabin Sistemleri',
    subtitle: 'Dikey boy menteşe profili ile sağlam ve estetik açılır kapılar.',
    badge: 'Boy Menteşe',
    contentTitle: 'Boy Menteşeli Cam Kapı Dayanıklılığı',
    contentBody: 'Boy menteşe duşakabinlerde kapı yükü dikey profil boyunca eşit dağıtılır. Bu sayede sarkma yapmaz, uzun yıllar sorunsuz çalışır.',
    filterTags: ['boy-mentese', 'boydan-mentese'],
    faqs: [
      {
        question: 'Boy menteşeli duşakabin kapısı sarkma yapar mı?',
        answer: 'Hayır, menteşe boydan boya profili desteklediği için sarkma yapmaz.',
      },
    ],
  },
  'nokta-mentese': {
    slug: 'nokta-mentese',
    category: 'mechanism',
    title: 'Nokta Menteşeli Duşakabin Modelleri | ERAYDUŞ',
    metaDescription: 'Minimalist nokta menteşeli şeffaf cam duşakabinler. Profil kalabalığı olmadan saf cam şıklığı.',
    h1: 'Nokta Menteşe Duşakabinler',
    subtitle: 'Minimalist nokta bağlantılı açılır cam duş kabinleri.',
    badge: 'Nokta Menteşe',
    contentTitle: 'Profilsiz Nokta Menteşe Şıklığı',
    contentBody: 'Nokta menteşeli modeller, pirinç nokta bağlantı elemanları ile camın zarif görünümünü ön plana çıkarır.',
    filterTags: ['nokta-mentese', 'noktali-mentese'],
    faqs: [
      {
        question: 'Nokta menteşeler paslanır mı?',
        answer: 'Hayır, aksamlarımız paslanmaz alüminyum ve pirinç dökümdür.',
      },
    ],
  },
  'pivot-dusakabin': {
    slug: 'pivot-dusakabin',
    category: 'mechanism',
    title: 'Pivot Duşakabin Modelleri ve Fiyatları | ERAYDUŞ',
    metaDescription: 'Eksenli açılır pivot kapı mekanizmalı duşakabin modelleri. 180 derece çift yönlü rahat açılım.',
    h1: 'Pivot Kapılı Duşakabin Sistemleri',
    subtitle: 'Eksenli mil üzerinde 180° açılabilen estetik kapı modelleri.',
    badge: 'Pivot Sistem',
    contentTitle: 'Pivot Kapı Mekanizması',
    contentBody: 'Pivot duşakabinler, kapının üst ve alt pivot aksen noktalarından dönerek açılması sayesinde rahat ve geniş bir geçiş sağlar.',
    filterTags: ['pivot', 'pivot-dusakabin'],
    faqs: [
      {
        question: 'Pivot kapı içe mi dışa mı açılır?',
        answer: 'Pivot kapılarımız isteğe bağlı olarak hem içe hem dışa açılabilme özelliğine sahiptir.',
      },
    ],
  },
  'kare-cam-dusakabin': {
    slug: 'kare-cam-dusakabin',
    category: 'size',
    title: 'Kare Cam Duşakabin Modelleri | ERAYDUŞ',
    metaDescription: 'Kare banyo alanları için özel ölçü 80x80, 90x90, 100x100 temperli kare cam duşakabin çeşitleri.',
    h1: 'Kare Cam Duşakabin Modelleri',
    subtitle: 'Net çizgileri ve eşit ölçüleri ile banyonuza tam oturan kare cam kabinler.',
    badge: 'Kare Form',
    contentTitle: 'Kare Banyo Alanları İçin İdeal Çözümler',
    contentBody: 'Kare cam duşakabinler, 90 derecelik köşe birleşimleri ve simetrik yapısı ile hem estetik hem de ergonomik duş alanı vadeder.',
    filterTags: ['kare', 'kare-dusakabin', 'kare-cam'],
    faqs: [
      {
        question: 'Kare duşakabinde hangi kapı sistemleri kullanılır?',
        answer: 'Kare modellerimizde sürgülü, katlanır veya menteşeli kapı seçenekleri uygulanabilir.',
      },
    ],
  },
  'on-cephe-dusakabin': {
    slug: 'on-cephe-dusakabin',
    category: 'size',
    title: 'Ön Cephe (Niş) Duşakabin Modelleri | ERAYDUŞ',
    metaDescription: 'İki duvar arası niş alanlar için özel ölçü ön cephe duşakabin kapatma sistemleri.',
    h1: 'Ön Cephe Niş Duşakabinler',
    subtitle: 'İki duvar arasını şık cam kapılarla kapatan ön cephe sistemleri.',
    badge: 'Ön Cephe Niş',
    contentTitle: 'İki Duvar Arası Ön Cephe Kapatma',
    contentBody: 'Ön cephe duşakabinler, mimari niş alanlarını kapatmak için sürgülü veya açılır kapı kombinasyonları ile imal edilir.',
    filterTags: ['on-cephe', 'nis', 'iki-duvar-arasi'],
    faqs: [
      {
        question: 'Ön cephe duşakabin her ölçüye uyarlanabilir mi?',
        answer: 'Evet, niş genişliğinize göre milimetrik özel imalat yapıyoruz.',
      },
    ],
  },
  'mika-dusakabin': {
    slug: 'mika-dusakabin',
    category: 'mechanism',
    title: 'Mika Duşakabin Modelleri & Fiyatları | ERAYDUŞ',
    metaDescription: 'Ekonomik, kırılmaz ve hafif mika camlı duşakabin çeşitleri. Paslanmaz alüminyum profil ve bütçe dostu çözümler.',
    h1: 'Mika Camlı Duşakabinler',
    subtitle: 'Hafif, kırılmaz ve bütçe dostu mika duş kabini seçenekleri.',
    badge: 'Mika Serisi',
    contentTitle: 'Ekonomik ve Kırılmaz Mika Cam Özellikleri',
    contentBody: 'Mika duşakabinler, polistren desenli cam yapısı ile kırılma riski taşımayan, hafif ve uzun ömürlü ekonomik duş çözümleridir.',
    filterTags: ['mika', 'mika-dusakabin', 'ekonomik'],
    faqs: [
      {
        question: 'Mika duşakabin kırılır mı?',
        answer: 'Mika cam esnek polistren malzemeden üretildiği için cam gibi kırılma riski yoktur.',
      },
    ],
  },
  'oval-cam-dusakabin': {
    slug: 'oval-cam-dusakabin',
    category: 'size',
    title: 'Oval Cam Duşakabin Modelleri | ERAYDUŞ',
    metaDescription: 'Kavisli duş tekneleri ve oval zeminler için özel ölçü 90x90, 100x100 kavisli temperli oval cam duşakabinler.',
    h1: 'Oval Cam Duşakabin Modelleri',
    subtitle: 'Yumuşak kavisli dönüşleri ile banyonuzda alan kazandıran oval cam kabinler.',
    badge: 'Oval Form',
    contentTitle: 'Kavisli Oval Banyo Çözümleri',
    contentBody: 'Oval cam duşakabinler, banyo geçiş alanlarında sivri köşeleri ortadan kaldırarak daha rahat bir hareket alanı sağlar.',
    filterTags: ['oval', 'oval-dusakabin', 'kavisli-cam'],
    faqs: [
      {
        question: 'Oval cam duşakabinler kavisli teknelere uyar mı?',
        answer: 'Evet, standart veya özel kavisli banyo teknelerine ve zeminlere tam uyumlu olarak imal edilir.',
      },
    ],
  },
  'istanbul': {
    slug: 'istanbul',
    category: 'location',
    title: 'İstanbul Özel Proje Duşakabin Çözümleri | ERAYDUŞ',
    metaDescription: 'İstanbul rezidans, otel ve villalar için özel tasarım duşakabin imalatı ve projeli nakliye çözümleri.',
    h1: 'İstanbul Duşakabin Projeleri',
    subtitle: 'Rezidans ve villa projelerinize özel ölçü imalat ve nakliye desteği.',
    badge: 'İstanbul Proje Hattı',
    contentTitle: 'İstanbul Rezidans ve Lüks Konut Çözümleri',
    contentBody: 'İstanbul’daki projeler, tasarımcılar ve konut üreticileri için projeye özel cam kalınlığı, özel profil renkleri (Rose Gold, Mat Siyah, Antrasit) ve toplu imalat avantajı sunuyoruz.',
    filterTags: ['istanbul', 'proje', 'rezidans'],
    faqs: [
      {
        question: 'İstanbul’a kargo veya montaj var mı?',
        answer: 'Proje bazlı toplu alımlarda kendi montaj ekibimizle hizmet veriyoruz. Bireysel siparişlerde ise ahşap korumalı sandık içinde sigortalı sevkiyat sağlıyoruz.',
      },
    ],
  },

  // --- KULLANIM ALANLARI ---
  'otel': {
    slug: 'otel',
    category: 'usecase',
    title: 'Otel & Proje Tipi Dayanıklı Duşakabin Sistemleri | ERAYDUŞ',
    metaDescription: 'Oteller, pansiyonlar ve yüksek sirkülasyonlu projeler için paslanmaz, kolay temizlenen ticari duşakabin modelleri.',
    h1: 'Otel ve Ticari Proje Duşakabinleri',
    subtitle: 'Yoğun kullanıma dayanıklı, Nano camlı ve 10 yıl garantili proje çözümleri.',
    badge: 'Commercial & Hospitality',
    contentTitle: 'Yüksek Sirkülasyonlu Mekanlar İçin Ağır Hizmet Tipi Kabinler',
    contentBody: 'Otellerde temizlik kolaylığı sunan temperli cam teknolojisi, paslanmaz aksamlar ve güvenlik standartlarına uygun 6mm temperli cam kombinasyonları ile otel projelerinizin güvenilir tedarikçisiyiz.',
    filterTags: ['otel', 'proje', 'ticari', 'rezidans'],
    faqs: [
      {
        question: 'Toplu otel projelerinde indirim sağlanıyor mu?',
        answer: 'Evet, 10 adet ve üzeri proje alımlarında kurumsal toptan fiyatlandırma ve projeye özel ölçü çalışması yapmaktayız.',
      },
    ],
  },
  'villa': {
    slug: 'villa',
    category: 'usecase',
    title: 'Lüks Villa & Müstakil Ev Duşakabin Tasarımları | ERAYDUŞ',
    metaDescription: 'Geniş banyolu lüks villalar için tavan boyu cam kabinler, tek cam duşakabin panelleri ve özel gold/siyah profilli tasarımlar.',
    h1: 'Lüks Villa ve Müstakil Konut Duş Sistemleri',
    subtitle: 'Sınırsız özelleştirme: Tavan boyu camlar, LED aydınlatmalı profiller ve Tek Cam duş serisi.',
    badge: 'Luxury Villa Edition',
    contentTitle: 'Sınırları Kaldıran Özel Ölçü Villa Kabinleri',
    contentBody: 'Villa banyoları için standart ölçü kalıplarını yıkıyoruz. 240 cm tavan yüksekliğine kadar özel cam kesimleri, gizli su tahliye kanalları ve akıllı cam (Smart Glass) entegrasyonları ile hayalinizdeki duş alanını inşa ediyoruz.',
    filterTags: ['villa', 'luks', 'tek-cam', 'tavan-boyu'],
    faqs: [
      {
        question: 'Tavan boyu cam kabin üretimi yapıyor musunuz?',
        answer: 'Evet, statik ve güvenlik hesaplamaları yapılarak 270 cm yüksekliğe kadar 10mm ekstra şeffaf temperli cam imalatı yapıyoruz.',
      },
    ],
  },
};

export function getProgrammaticConfig(slugs: string[]): ProgrammaticPageConfig | null {
  const mainSlug = slugs[slugs.length - 1];
  return PROGRAMMATIC_MATRIX[mainSlug] || null;
}
