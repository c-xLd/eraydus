const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const glassOptions = [
  { id: 'clear', name: 'Şeffaf Extra Clear', colorClass: 'bg-white/20 backdrop-blur-sm', desc: 'Maksimum ışık geçirgenliği' },
  { id: 'smoke', name: 'Füme (Siyah) Cam', colorClass: 'bg-black/60 backdrop-blur-md', desc: 'Gizlilik ve lüks görünüm' },
  { id: 'bronze', name: 'Bronz Cam', colorClass: 'bg-amber-900/40 backdrop-blur-md', desc: 'Sıcak tonlar ve zarif yansıma' },
  { id: 'fluted', name: 'Oluklu (Fluted) Cam', colorClass: 'bg-white/30 backdrop-blur-[2px] repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)', desc: 'Retro-modern yarı saydam yapı' },
  { id: 'frosted', name: 'Buzlu (Kumlama) Cam', colorClass: 'bg-white/40 backdrop-blur-xl', desc: 'Tam mahremiyet' },
]

const profileOptions = [
  { id: 'black', name: 'Mat Siyah', hex: '#1A1A1A' },
  { id: 'chrome', name: 'Parlak Krom', hex: '#E8E9EB' },
  { id: 'gold', name: 'Fırçalanmış Altın', hex: '#D4AF37' },
  { id: 'bronze', name: 'Antik Bronz', hex: '#CD7F32' },
  { id: 'white', name: 'Mat Beyaz', hex: '#F9FAFB' },
]

const products = [
  {
    sku: 'edge-corner',
    slug: 'edge-corner',
    name: 'Edge Köşe Kabin',
    collectionName: 'EDGE Serisi',
    base_price: 8500,
    new_product: false,
    short_description: 'Ultra ince profillerle tasarlanmış, banyonun köşesine mükemmel uyum sağlayan minimalist çözüm.',
    description: 'Edge Köşe Kabin, 12mm ultra ince alüminyum profilleri ve net geometrik hatlarıyla modern banyoların vazgeçilmezi. Köşe yerleşimi sayesinde alan tasarrufu sağlarken, camın şeffaflığıyla mekânı olduğundan daha geniş gösterir.',
    images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop'],
    features: ['12mm Ultra İnce Profil', 'Köşe Yerleşimi', 'Gizli Menteşe Sistemi', 'Nano Kaplama Cam'],
    technical_specs: {
      glassThickness: ['4mm', '6mm'],
      height: '190cm - 220cm',
      widthRange: '80x80cm - 120x120cm',
      installation: 'Zemin üstü veya Tekne üstü',
      layoutType: 'Köşe'
    },
    compatible_glass: [glassOptions[0], glassOptions[1], glassOptions[4]],
    compatible_profiles: [profileOptions[0], profileOptions[1], profileOptions[4]],
    status: 'active'
  },
  {
    sku: 'pure-walkin',
    slug: 'pure-walkin',
    name: 'Pure Walk-in',
    collectionName: 'PURE Serisi',
    base_price: 12000,
    new_product: true,
    short_description: 'Tamamen çerçevesiz, kapısız ve eşiksiz. Maksimum şeffaflık ve özgürlük hissi için tasarlandı.',
    description: 'Pure Walk-in, duş deneyimini tamamen açık ve özgür kılan bir mimari harikadır. Yerde eşik olmaması ve kapı kullanılmaması sayesinde banyoyla bütünleşir. 10mm veya 12mm kalınlığındaki temperli camlar, sadece zeminden ve duvardan gizli kanallarla sabitlenerek havada süzülüyor hissi yaratır.',
    images: ['https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop'],
    features: ['%100 Çerçevesiz Tasarım', 'Kapısız Serbest Geçiş', 'Zemine Sıfır Montaj', 'Paslanmaz Çelik Sabitleme Kolu'],
    technical_specs: {
      glassThickness: ['4mm', '6mm'],
      height: '200cm - 240cm',
      widthRange: '90cm - 160cm',
      installation: 'Sadece Zemin üstü (Eşiksiz)',
      layoutType: 'Walk-in'
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
    short_description: 'Soft-close teknolojisine sahip, üst düzey akustik izolasyon sunan imza niteliğindeki sürgülü sistem.',
    description: 'Luxury Sürgülü, endüstriyel rulman teknolojisini lüks tasarımla buluşturuyor. Üst ray üzerinde sessizce ve zahmetsizce kayan ağır cam paneller, özel amortisör (soft-close) sistemi sayesinde yavaşça kapanır.',
    images: ['https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop'],
    features: ['Soft-Close Yavaşlatıcı', 'Ağır Yük Rulmanları', 'Akustik Fitiller', 'Özel Renk Seçenekleri'],
    technical_specs: {
      glassThickness: ['4mm', '6mm'],
      height: '190cm - 220cm',
      widthRange: '120cm - 200cm',
      installation: 'İki duvar arası veya Sabit camlı L yerleşim',
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
    short_description: 'İki duvar arası niş alanlar için tasarlanmış, merkez eksenli açılan minimalist pivot kapı.',
    description: 'Banyonuzdaki niş alanları mükemmel şekilde değerlendirin. Edge Pivot, dış çerçeve olmaksızın, zemine ve tavana gizlenmiş pivot menteşeler üzerinde döner.',
    images: ['https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop'],
    features: ['Zemin ve Tavan Pivot Menteşe', 'Manyetik Fitil', 'Dışa ve İçe Açılım', 'Ultra Dar Profil'],
    technical_specs: {
      glassThickness: ['4mm', '6mm'],
      height: '190cm - 220cm',
      widthRange: '70cm - 110cm',
      installation: 'Sadece İki Duvar Arası',
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
    short_description: 'Köşe duş alanları için ekstra geniş iç hacim ve çift kanatlı açılım sunan premium kabin.',
    description: 'Luxury Premium Köşe, en geniş banyolar için tasarlandı. Özel menteşe mekanizmasıyla iki kanat da dışa doğru açılabilir.',
    images: ['https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop'],
    features: ['Çift Kanat Açılım', 'Titanyum Detaylar', 'Soft-Close', 'Ekstra Geniş Giriş'],
    technical_specs: {
      glassThickness: ['4mm', '6mm'],
      height: '200cm - 230cm',
      widthRange: '100x100cm - 140x140cm',
      installation: 'Zemin üstü veya Tekne üstü',
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
    short_description: 'Ray sistemi gizlenmiş, tamamen şeffaf ve kusursuz bir sürgülü duşakabin deneyimi.',
    description: 'Tekerleklerin ve rayların profiller içine tamamen gizlendiği, dışarıdan sadece hareket eden camın göründüğü eşsiz tasarım.',
    images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop'],
    features: ['Gizli Ray Sistemi', '10mm Cam', 'Görünmez Fren Mekanizması'],
    technical_specs: {
      glassThickness: ['4mm', '6mm'],
      height: '200cm - 240cm',
      widthRange: '140cm - 220cm',
      installation: 'İki Duvar Arası',
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
