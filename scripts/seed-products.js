const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const glassOptions = [
  { id: 'seffaf', name: 'Şeffaf Extra Clear', colorClass: 'bg-white/20 backdrop-blur-sm', desc: 'Maksimum ışık geçirgenliği' },
  { id: 'fume', name: 'Füme (Siyah) Cam', colorClass: 'bg-black/60 backdrop-blur-md', desc: 'Gizlilik ve lüks görünüm' },
  { id: 'bronz', name: 'Bronz Cam', colorClass: 'bg-amber-900/40 backdrop-blur-md', desc: 'Sıcak tonlar ve zarif yansıma' },
  { id: 'aynali', name: 'Aynalı Cam', colorClass: 'bg-slate-300/60 backdrop-blur-lg', desc: 'Genişlik hissi ve tam mahremiyet' },
  { id: 'kumlama', name: 'Kumlama (Buzlu)', colorClass: 'bg-white/40 backdrop-blur-xl', desc: 'Özel desenler ve modern doku' },
  { id: 'buz-mat', name: 'Buz Mat Cam', colorClass: 'bg-white/60 backdrop-blur-2xl', desc: 'Pürüzsüz mat yüzey ve tam gizlilik' },
]

const profileOptions = [
  { id: 'siyah', name: 'Mat Siyah', hex: '#1A1A1A' },
  { id: 'firca-parlak', name: 'Parlak Krom', hex: '#E8E9EB' },
  { id: 'gold', name: 'Fırçalanmış Altın', hex: '#D4AF37' },
  { id: 'beyaz', name: 'Mat Beyaz', hex: '#F9FAFB' },
]

const products = [
  {
    sku: 'edge-corner',
    slug: 'edge-corner',
    name: 'Edge Köşe Kabin',
    collectionName: 'EDGE Serisi',
    base_price: 8500,
    new_product: false,
    short_description: 'Ultra ince minimalist profiller ve 6mm temperli cam ile köşe alanlar için üretilmiş lüks çözüm.',
    description: `Edge Köşe Kabin, 12mm ultra ince eloksal kaplama alüminyum profilleri ve net geometrik hatlarıyla modern banyo mimarisinin en şık örneklerinden biridir. Banyonun köşe alanına mükemmel uyum sağlayan L tipi veya kare yapısı, mekan içerisinde maksimum hareket alanı kazandırırken görsellerde ferahlık algısını üst seviyeye çıkarır.

### Mimari Tasarım ve Malzeme Standartları
Tasarımında kullanılan 6 mm yüksek mukavemetli temperli güvenlik camları, darbe ve yüksek ısıl farklara karşı dayanıklıdır. Profil aksamları ise korozyona, neme ve kimyasal temizleyicilere dirençli fırınlanmış elektrostatik boya ile kaplanmıştır.

### Teknik Donanım ve Donatılar
- **Profil Yapısı:** 1.8mm et kalınlığında alüminyum gövde, gizli vidalama kanalları.
- **Sızdırmazlık:** Şeffaf manyetik kapı fitilleri ve silikon bazlı alt su kesici damlalıklar.
- **Menteşe & Bağlantı:** Paslanmaz çelik 316 kalite aksamlar ile sessiz ve pürüzsüz çalışma mekanizması.

### Montaj ve Kurulum Talimatları
Edge Köşe Kabin montajı öncesinde zemin seramiklerinin terazi kontrolü ve duvarların şakül ayarı yapılmalıdır. Duvar dikme profilleri paslanmaz dübel ve vidalarla sabitlendikten sonra, cam paneller profil kanallarına sızdırmaz fitiller eşliğinde oturtulur. Montaj tamamlandıktan sonra dış birleşim noktalarına antibakteriyel, sararma yapmayan nötr silikon çekilmelidir. Silikonun tam kürleşmesi için ürün 24 saat boyunca kullanılmamalı ve su ile temas ettirilmemelidir.`,
    images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop'],
    features: ['12mm Ultra İnce Profil', 'Köşe L-Tipi Yapı', 'Gizli Menteşe Sistemleri', '6mm Temperli Cam'],
    technical_specs: {
      glassThickness: ['6mm'],
      height: '190cm - 220cm',
      widthRange: '80x80cm - 120x120cm',
      installation: 'Zemin üstü (Eşiksiz) veya Tekne üstü',
      layoutType: 'Köşe'
    },
    compatible_glass: [glassOptions[0], glassOptions[1], glassOptions[4]],
    compatible_profiles: [profileOptions[0], profileOptions[1], profileOptions[4]],
    status: 'active'
  },
  {
    sku: 'pure-tek-cam',
    slug: 'pure-tek-cam',
    name: 'Pure Tek Cam Duşakabin',
    collectionName: 'PURE Serisi',
    base_price: 12000,
    new_product: true,
    short_description: 'Tamamen çerçevesiz, kapısız ve eşiksiz. Maksimum şeffaflık ve kesintisiz banyo alanı için tasarlandı.',
    description: `Pure Tek Cam Duşakabin, geleneksel duşakabin kalıplarını yıkarak duş alanını banyonun doğal bir uzantısı haline getiren mimari bir masterwork'tür. Çerçevesiz, kapısız ve zemine sıfır yerleşimi sayesinde engelsiz geçiş (barrier-free) imkanı tanır. Rezidans, villa ve lüks otel banyolarında alan derinliğini görsel olarak iki katına çıkaran bu sistem, kesintisiz bir ferahlık duygusu yaratır.

### Malzeme Mühendisliği ve Güvenlik
Pure Tek Cam panelinde 10 mm veya isteğe bağlı 12 mm ekstra rodajlı Şişecam temperli emniyet camı kullanılır. Kalın ve masif yapısı sayesinde panellerde en ufak bir esneme veya sallantı meydana gelmez. Üst sabitleme kolu (gergi çubuğu), 304 kalite paslanmaz çelikten imal edilmiş olup tavana veya karşı duvara milimetrik olarak ankraj edilir. PVD kaplama teknolojisiyle renklendirilen metal aksamlar, banyodaki buhar ve sudan etkilenmeden onlarca yıl parlaklığını ve dokusunu muhafaza eder.

### Özel Detaylar ve Avantajlar
- **Engelsiz Erişim:** Yaşlılar, çocuklar ve tekerlekli sandalye erişimi için %100 uyumluluk.
- **Yüksek Isıl Dayanım:** Ani sıcaklık değişimlerine ve termal şoklara dirençli yapı.
- **Kolay Temizlik:** Kapı menteşesi, girinti ve tekerlek mekanizması bulunmadığı için silinmesi saniyeler alır.

### Profesyonel Kurulum ve Zemin Hazırlığı
Tek cam duşakabin paneli montajından önce duş alanında eğim giderinin (lineer süzgeç) doğru hesaplanması gerekmektedir. Zemin seramik altına uygulanan su yalıtım mebranı kontrol edilmelidir. Cam alt U-profili zemine gömülü veya yüzeye monte edilebilir. Sabitleme gergi kolu 45 derece veya 90 derece açıyla duvara vidalandıktan sonra, şeffaf nötr izolasyon jeli ile birleşim yerleri mühürlenir. İzolasyonun tam mukavemet kazanması için 24 saat kuruma süresi beklenmelidir.`,
    images: ['https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop'],
    features: ['%100 Çerçevesiz Tasarım', 'Kapısız Serbest Geçiş', 'Zemine Sıfır Montaj', '304 Paslanmaz Çelik Gergi Kolu', '6mm Temperli Cam'],
    technical_specs: {
      glassThickness: ['6mm'],
      height: '200cm - 240cm',
      widthRange: '90cm - 160cm',
      installation: 'Sadece Zemin Üstü (Eşiksiz)',
      layoutType: 'Tek Cam'
    },
    compatible_glass: glassOptions,
    compatible_profiles: [profileOptions[0], profileOptions[1], profileOptions[2], profileOptions[3]],
    status: 'active'
  },
  {
    sku: 'luxury-sliding',
    slug: 'luxury-sliding',
    name: 'Luxury Sürgülü',
    collectionName: 'LUXURY Serisi',
    base_price: 16500,
    new_product: false,
    short_description: 'Soft-close yavaşlatıcı amortisör teknolojisine sahip, üst düzey akustik izolasyon sunan lüks sürgülü kabin.',
    description: `Luxury Sürgülü, endüstriyel rulman mühendisliğini yüksek lüks tasarımla buluşturan amiral gemisi duşakabin modelimizdir. Üst taşımalı masif alüminyum ray üzerinde sessizce ve zahmetsizce kayan ağır cam paneller, özel sıvı amortisörlü soft-close (yavaşlatıcı fren) mekanizması sayesinde kapanma noktasına ulaştığında darbesiz ve gürültüsüz şekilde kendiliğinden çekilerek kapanır.

### Premium Malzeme Yapısı
Sistemde kullanılan 6 mm rodajlı temperli emniyet camları, ağır yük kapasiteli paslanmaz çelik rulman tekerlekler tarafından taşınır. Tekerlek rulmanları çift bilyalı ve Teflon kaplamalı olduğu için su ve kireçten etkilenmez, yıllar geçse de ilk günkü akıcı hareketini korur. Ray ve dikme profillerinde uygulanan fırçalanmış titanyum ve PVD altın/krom kaplama seçenekleri, banyonuza konut projelerinde aranan büyüleyici dokuyu katar.

### Teknik Üstünlükler
- **Soft-Close Amortisör:** Çarpmaları ve cam kırılma riskini sıfıra indiren hidrolik frenleme.
- **Akustik Su Fitilleri:** Ses iletimini yutan ve su sızıntısını engelleyen şeffaf PVC fitil grubu.
- **Kolay Çıkarılabilir Alt Kılavuz:** Alt ray temizliğini zahmetsiz kılan klipsli kılavuz sistemi.

### Kurulum ve Ayar Esasları
Luxury Sürgülü montajında üst taşıyıcı rayın hassas su terazisinde olması şarttır. Rayın teraziden kaçması durumunda cam kapı kendi kendine kayabilir. Duvar dikmeleri monte edildikten sonra rulman eksen ayarları üst makaralar üzerindeki eksantrik cıvatalar yardımıyla milimetrik olarak dengelenir. Alt su engelleyici çıta montajı yapıldıktan sonra tüm kenarlar yüksek tutuculuklu hijyenik silikon ile izolasyon altına alınır.`,
    images: ['https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop'],
    features: ['Soft-Close Fren Amortisörü', '316 Çelik Çift Bilyalı Rulman', 'Akustik Sızdırmazlık Fitilleri', '6mm Güvenlik Camı', 'PVD Kaplama Profil'],
    technical_specs: {
      glassThickness: ['6mm'],
      height: '190cm - 220cm',
      widthRange: '120cm - 200cm',
      installation: 'İki Duvar Arası (Niş) veya L-Tipi Dönüşlü',
      layoutType: 'Sürgülü'
    },
    compatible_glass: [glassOptions[0], glassOptions[1], glassOptions[2], glassOptions[3]],
    compatible_profiles: profileOptions,
    status: 'active'
  },
  {
    sku: 'edge-pivot',
    slug: 'edge-pivot',
    name: 'Edge Pivot Duş',
    collectionName: 'EDGE Serisi',
    base_price: 9200,
    new_product: false,
    short_description: 'İki duvar arası niş alanlar için tasarlanmış, tavan ve zemin eksenli dönen minimalist pivot kapı.',
    description: `Edge Pivot Duşakabin, banyonuzdaki iki duvar arası niş alanları en verimli ve estetik biçimde değerlendirmek için geliştirilmiş minimalist bir tasarım harikasıdır. Dış çerçeve profili olmadan, sadece alt ve üst pivot dönme noktaları üzerinden çalışan kapı mekanizması, hem içe hem dışa 180 derece geniş açılım sağlayarak kullanım kolaylığı sunar.

### Malzeme ve Tasarım Detayları
6 mm Şişecam temperli cam paneller, pirinç döküm üzerine krom veya mat siyah elektrostatik fırın boya kaplanmış pivot menteşeler ile sabitlenir. Menteşelerin içinde yer alan kendinden yükselen (lift-up) mekanizma, kapı açılırken camı 3 mm yukarı kaldırarak alt contanın zemine sürtünmesini ve yıpranmasını önler; kapı kapandığında ise tekrar zemine oturarak tam sızdırmazlık sağlar.

### Öne Çıkan Özellikler
- **Lift-Up Pivot Menteşe:** Açılışta yükselen, kapanışta tam mühürleme yapan akıllı conta koruma sistemi.
- **Manyetik Kapı Kapanış:** Güçlü neodyum mıknatıslı şeffaf kenar fitilleri.
- **Geniş Geçiş Ölçüsü:** Ray veya sabit cam engeli olmadan tam genişlikte duş girişi.

### Montaj Rehberi ve İpuçları
Pivot kabin montajında kapı ekseninin düşey şakülü kusursuz olmalıdır. Duvar tırnakları dikeyde teraziye alındıktan sonra pivot alt pirinç yatak zemine paslanmaz cıvatalarla çakılır. Kapı kanadı takıldıktan sonra lift-up yükselme mesafesi alt ayar vidasından sabitlenir. Duvar ve seramik birleşim yerlerine uygulanan antibakteriyel silikon çekildikten sonra 24 saat boyunca kapı hareket ettirilmemeli ve kurumaya bırakılmalıdır.`,
    images: ['https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop'],
    features: ['Lift-Up Yükselen Pivot Menteşe', '180 Derece Çift Yönlü Açılım', 'Neodyum Mıknatıslı Fitil', '6mm Temperli Cam', 'Niş İki Duvar Arası Uyum'],
    technical_specs: {
      glassThickness: ['6mm'],
      height: '190cm - 220cm',
      widthRange: '70cm - 110cm',
      installation: 'Sadece İki Duvar Arası (Niş)',
      layoutType: 'İki Duvar Arası'
    },
    compatible_glass: [glassOptions[0], glassOptions[1], glassOptions[4]],
    compatible_profiles: [profileOptions[0], profileOptions[1]],
    status: 'active'
  },
  {
    sku: 'luxury-corner',
    slug: 'luxury-corner',
    name: 'Luxury Premium Köşe',
    collectionName: 'LUXURY Serisi',
    base_price: 18000,
    new_product: true,
    short_description: 'Geniş köşe duş alanları için tasarlanan, çift kanatlı dışa açılır menteşe sistemli premium kabin.',
    description: `Luxury Premium Köşe, ferah ve geniş köşe banyo alanları için tasarlanmış lüks bir duşakabin modelidir. Çift kanatlı dışa doğru açılabilen pirinç döküm menteşeleri, banyoya girip çıkarken maksimum açıklık ve konfor sunar. Altın, antik bronz ve mat siyah renk seçenekleriyle mimari projelerin aranan yıldızıdır.

### Kalite ve Yapısal Özellikler
Üründe 6 mm kalınlığında rodajlı temperli emniyet camları kullanılmıştır. Yüksek mukavemetli pirinç menteşe gövdeleri 100.000 açma-kapama testinden başarıyla geçmiştir. Cam panellerin dış yüzeyi standart olarak kireç tutmaz Nano-Shield kaplamalıdır. Profillerde kullanılan PVD titanyum kaplama teknolojisi, kireçli suya, banyo nemine ve deterjanlara karşı ürünü 10 yıl boyunca renk solmasına ve kararmaya karşı korur.

### Donanım Özellikleri
- **Çift Kanat Menteşe:** Geniş açı ile dışa açılan esnek kapı sistemi.
- **Köşe İzolasyonu:** 90 derece birleşim noktasında özel açılı manyetik contalar.
- **Masif Tutamaklar:** Özel tasarım ergonomik paslanmaz çelik kapı kolları.

### Montaj ve İzolasyon Kuralları
Kurulum öncesi 90 derecelik köşe açısının gönye kontrolü yapılmalıdır. Menteşe sabitleme plakaları duvara paslanmaz çelik çelik dübeller ile tutturulur. Cam paneller menteşe yuvalarına tork anahtarı ile eşit sıkılıkta sabitlenir. Alt eşik çıtası zemine şeffaf nötr silikon ile yapıştırıldıktan sonra kabin 24 saat boyunca kurumaya bırakılmalıdır.`,
    images: ['https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop'],
    features: ['Çift Kanat Menteşeli Açılım', 'PVD Titanyum Kaplama', '6mm Cam Seçeneği', 'Nano Kireç Koruma', 'Masif Çelik Tutamaklar'],
    technical_specs: {
      glassThickness: ['6mm'],
      height: '200cm - 230cm',
      widthRange: '100x100cm - 140x140cm',
      installation: 'Zemin Üstü veya Tekne Üstü',
      layoutType: 'Köşe'
    },
    compatible_glass: glassOptions,
    compatible_profiles: profileOptions,
    status: 'active'
  },
  {
    sku: 'pure-slider',
    slug: 'pure-slider',
    name: 'Pure Gizli Sürgülü',
    collectionName: 'PURE Serisi',
    base_price: 14500,
    new_product: false,
    short_description: 'Ray ve tekerlek sistemi profiller içine tamamen gizlenmiş, görünmez fren mekanizmalı cam kabin.',
    description: `Pure Gizli Sürgülü, makaraların, tekerleklerin ve hareket mekanizmalarının profiller içerisine tamamen entegre edildiği, dışarıdan bakıldığında sadece camın pürüzsüz akışının göründüğü yüksek teknoloji ürünü bir duş sistemidir. Minimalist mimaride karmaşayı reddedenler için tasarlanmıştır.

### Mimari Detaylar ve Teknoloji
6 mm kalınlığında temperli emniyet camları, üst kapalı profil kanalı içerisinde gizlenen paslanmaz bilyalı rulmanlar üzerinde hareket eder. İçerisindeki dahili frenleme mekanizması, kapı açılırken veya kapanırken son 5 santimetrede devreye girerek yumuşak ve sessiz duruş sağlar. Profiller mat antrasit, siyah veya parlak krom boyalı alüminyumdan üretilmiştir.

### Avantajlar
- **Gizli Mekanizma:** Tekerlek kirlenmesini ve su lekelerini engelleyen kapalı ray tasarımı.
- **6mm Masif Cam:** Yüksek ses ve ısı izolasyonu sağlayan temperli cam panel.
- **Sıfır Yalpalama:** Çift yönlü dengelenmiş alt yönlendirici kılavuz.

### Kurulum Talimatı
Sistem montajında gizli üst ray profili terazide duvara ankraj edildikten sonra cam paneller özel askı aparatları ile raya takılır. Gizli fren tamponlarının mesafe ayarları alyen anahtar ile yapıldıktan sonra kapak profilleri kapatılır. Seramik ile profil birleşim hattına silikon uygulanır ve 24 saatlik kürleşme süresi beklenir.`,
    images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop'],
    features: ['Tam Gizli Ray ve Rulman', 'Görünmez Fren Amortisörü', '6mm Temperli Cam', 'Ses İzolasyonlu Ray', 'Kolay Temizlenebilir Kapalı Profil'],
    technical_specs: {
      glassThickness: ['6mm'],
      height: '200cm - 240cm',
      widthRange: '140cm - 220cm',
      installation: 'İki Duvar Arası (Niş)',
      layoutType: 'Sürgülü'
    },
    compatible_glass: [glassOptions[0], glassOptions[1], glassOptions[3]],
    compatible_profiles: [profileOptions[0], profileOptions[1], profileOptions[2]],
    status: 'active'
  }
];

async function seed() {
  console.log('Starting seed...');

  for (const product of products) {
    const { collectionName, ...rest } = product;

    // Ensure category exists
    const categorySlug = collectionName.toLowerCase().replace(/ serisi/g, '').trim();
    let { data: category } = await supabase.from('categories').select('id').eq('slug', categorySlug).single();
    
    if (!category) {
      console.log('Creating category:', collectionName);
      const { data: newCat, error: catErr } = await supabase.from('categories').insert({
        name: collectionName,
        slug: categorySlug,
        status: 'active'
      }).select('id').single();
      
      if (catErr) {
        console.error('Error creating category:', catErr);
        continue;
      }
      category = newCat;
    }

    // Insert or update product
    const { error: prodErr } = await supabase.from('products').upsert({
      ...rest,
      category_id: category.id
    }, { onConflict: 'slug' });

    if (prodErr) {
      console.error('Error inserting product:', product.name, prodErr);
    } else {
      console.log('Upserted product:', product.name);
    }
  }

  console.log('Seed completed!');
}

seed();
