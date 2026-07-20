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
    metaDescription: 'Mat siyah elektrostatik toz boyalı, paslanmaz aluminyum ve 8mm temperli camlı siyah duşakabin çözümleri. Lüks ve modern banyolar için özel ölçü üretim.',
    h1: 'Siyah Profil Duşakabin Sistemleri',
    subtitle: 'Kontrastın ve modern mimarinin simgesi mat siyah profil duş kabinleri.',
    badge: 'Mat Siyah Serisi',
    contentTitle: 'Neden Siyah Profil Duşakabin Tercih Edilmeli?',
    contentBody: 'ERAYDUŞ Mat Siyah koleksiyonu, 220°C fırınlanmış elektrostatik toz boya teknolojisi sayesinde nem ve su lekelerine karşı %100 dayanıklıdır. Soyulma, çizilme veya oksitlenme yapmaz. Nano kaplamalı 6mm ve 8mm temperli cam opsiyonlarıyla banyonuza maskülen ve lüks bir dokunuş kazandırır.',
    filterTags: ['siyah', 'mat-siyah', 'black'],
    faqs: [
      {
        question: 'Siyah duşakabin profillerinde boya dökülmesi olur mu?',
        answer: 'Hayır. ERAYDUŞ siyah profillerinde sıradan yaş boya yerine endüstriyel fırınlama teknolojili elektrostatik toz boya kullanılır. Soyulma ve dökülmeye karşı 10 yıl garantilidir.',
      },
      {
        question: 'Siyah duşakabinde su lekesi belli olur mu?',
        answer: 'Camlarımıza uygulanan anti-kireç Nano-Shield kaplama sayesinde su damlaları cam yüzeyinde tutunamaz ve süzülür. Bu sayede kireç ve su lekesi oluşumu %90 oranında engellenir.',
      },
    ],
  },
  'altin': {
    slug: 'altin',
    category: 'color',
    title: 'Altın Gold Profil Duşakabin Modelleri | ERAYDUŞ',
    metaDescription: 'PVD kaplama kararmaz altın gold profil lüks duşakabin çeşitleri. Şıklık ve zarafet arayan banyolar için özel tasarım cam kabinler.',
    h1: 'Gold & Altın Profil Lüks Duşakabinler',
    subtitle: 'Banyonuzda saray ihtişamı: Kararmaz PVD altın kaplama duş kabinleri.',
    badge: 'Gold Prestige Collection',
    contentTitle: 'Gerçek PVD Altın Kaplama Kalitesi',
    contentBody: 'PVD (Physical Vapor Deposition) teknolojisi ile kaplanan altın profillerimiz kimyasal temizleyicilere, yüksek neme ve ısıya karşı tam koruma sağlar. Zamansız lüks banyo tasarımlarının vazgeçilmezi olan gold detaylar, şeffaf veya kumlama desenli mimari camlarımızla kusursuz bir uyum yakalar.',
    filterTags: ['altin', 'gold', 'bronz'],
    faqs: [
      {
        question: 'Altın renkli duşakabin profili zamanla kararır mı?',
        answer: 'ERAYDUŞ gold serisinde gerçek PVD titanyum kaplama teknolojisi uygulanır. Banyo nemine, deterjana ve suya maruz kaldığında kararma veya renk değişimi kesinlikle yaşanmaz.',
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
    metaDescription: 'Geniş ve konforlu banyolar için 100x100 duşakabin çeşitleri. Walk-in ve çift sürgülü lüks cam kabin seçenekleri.',
    h1: '100x100 Lüks Duş Kabini Sistemleri',
    subtitle: 'Maksimum duş konforu ve ferahlık sunan 100x100 ölçülü kabinler.',
    badge: 'Geniş Konfor',
    contentTitle: 'Banyonuzda SPA Konforu',
    contentBody: '100x100 cm duş alanları, SPA ve otel konforunu evinize taşır. 8mm temperli kalın cam seçeneği ve minimalist profilsiz bağlantı elemanları ile ferahlığı hissettirir.',
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
    metaDescription: '90 ve 180 derece açılır pirinç menteşeli lüks cam duşakabin modelleri. Minimalist profilsiz mimari tasarımlar.',
    h1: 'Menteşeli (Açılır Kapılı) Cam Kabinler',
    subtitle: 'Profilsiz, şeffaf ve mimari: 180° açılabilir pirinç menteşeli tasarımlar.',
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
    title: 'Ankara Duşakabin İmalatı & Montaj Hizmeti | ERAYDUŞ Ostim',
    metaDescription: 'Ankara üreticisi ERAYDUŞ ile Çankaya, Yenimahalle, Çayyolu, İncek ve tüm ilçelere ücretsiz keşif, imalat ve montaj imkanı.',
    h1: 'Ankara Özel Ölçü Duşakabin İmalatçısı',
    subtitle: 'Ostim OSB fabrikamızdan Ankara’nın tüm ilçelerine direkt teslimat ve uzman montaj.',
    badge: 'Ankara Yerli İmalat',
    contentTitle: 'Ankara’nın Her Noktasına Ücretsiz Keşif ve Montaj',
    contentBody: 'ERAYDUŞ, Ostim OSB’deki fabrikasında ürettiği yüksek kaliteli duşakabinleri aracı olmadan doğrudan Ankara halkına ulaştırır. Çankaya, İncek, Çayyolu, Ümitköy, Yenimahalle, Keçiören, Batıkent ve Etimesgut bölgelerine aynı hafta montaj garantisi sunulur.',
    filterTags: ['ankara', 'ostim', 'cankaya', 'incek'],
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
  'istanbul': {
    slug: 'istanbul',
    category: 'location',
    title: 'İstanbul Özel Proje Duşakabin Çözümleri | ERAYDUŞ',
    metaDescription: 'İstanbul rezidans, otel ve villalar için özel tasarım mimari duşakabin imalatı ve projeli nakliye çözümleri.',
    h1: 'İstanbul Mimari Duşakabin Projeleri',
    subtitle: 'Rezidans ve villa projelerinize özel ölçü imalat ve nakliye desteği.',
    badge: 'İstanbul Proje Hattı',
    contentTitle: 'İstanbul Rezidans ve Lüks Konut Çözümleri',
    contentBody: 'İstanbul’daki mimari projeler, iç mimarlar ve müteahhitler için projeye özel cam kalınlığı, özel profil renkleri (Rose Gold, Mat Siyah, Antrasit) ve toplu imalat avantajı sunuyoruz.',
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
    contentBody: 'Otellerde temizlik sürelerini yarı yarıya indiren anti-bakteriyel Nano cam teknolojisi, paslanmaz pirinç aksamlar ve yangın/güvenlik standartlarına uygun 8mm temperli cam kombinasyonları ile otel projelerinizin güvenilir tedarikçisiyiz.',
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
    metaDescription: 'Geniş banyolu lüks villalar için tavan boyu cam kabinler, walk-in paneller ve özel gold/siyah profilli tasarımlar.',
    h1: 'Lüks Villa ve Müstakil Konut Duş Sistemleri',
    subtitle: 'Sınırsız özelleştirme: Tavan boyu camlar, LED aydınlatmalı profiller ve Walk-In serisi.',
    badge: 'Luxury Villa Edition',
    contentTitle: 'Sınırları Kaldıran Özel Ölçü Villa Kabinleri',
    contentBody: 'Villa banyoları için standart ölçü kalıplarını yıkıyoruz. 240 cm tavan yüksekliğine kadar özel cam kesimleri, gizli su tahliye kanalları ve akıllı cam (Smart Glass) entegrasyonları ile hayalinizdeki duş alanını inşa ediyoruz.',
    filterTags: ['villa', 'luks', 'walk-in', 'tavan-boyu'],
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
