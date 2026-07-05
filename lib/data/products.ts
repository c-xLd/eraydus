export type Product = {
  id: string
  name: string
  collectionId: string
  collectionName: string
  layoutType: string
  price: number
  isNew: boolean
  description: string
  longDescription: string
  image: string
  gallery: string[]
  features: string[]
  technicalSpecs: {
    glassThickness: string[]
    height: string
    widthRange: string
    installation: string
  }
  compatibleGlass: { id: string; name: string; colorClass: string; desc: string }[]
  compatibleProfiles: { id: string; name: string; hex: string }[]
}

export const glassOptions = [
  { id: 'clear', name: 'Şeffaf Extra Clear', colorClass: 'bg-white/20 backdrop-blur-sm', desc: 'Maksimum ışık geçirgenliği' },
  { id: 'smoke', name: 'Füme (Siyah) Cam', colorClass: 'bg-black/60 backdrop-blur-md', desc: 'Gizlilik ve lüks görünüm' },
  { id: 'bronze', name: 'Bronz Cam', colorClass: 'bg-amber-900/40 backdrop-blur-md', desc: 'Sıcak tonlar ve zarif yansıma' },
  { id: 'fluted', name: 'Oluklu (Fluted) Cam', colorClass: 'bg-white/30 backdrop-blur-[2px] repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)', desc: 'Retro-modern yarı saydam yapı' },
  { id: 'frosted', name: 'Buzlu (Kumlama) Cam', colorClass: 'bg-white/40 backdrop-blur-xl', desc: 'Tam mahremiyet' },
]

export const profileOptions = [
  { id: 'black', name: 'Mat Siyah', hex: '#1A1A1A' },
  { id: 'chrome', name: 'Parlak Krom', hex: '#E8E9EB' },
  { id: 'gold', name: 'Fırçalanmış Altın', hex: '#D4AF37' },
  { id: 'bronze', name: 'Antik Bronz', hex: '#CD7F32' },
  { id: 'white', name: 'Mat Beyaz', hex: '#F9FAFB' },
]

export const products: Product[] = [
  {
    id: 'edge-corner',
    name: 'Edge Köşe Kabin',
    collectionId: 'edge',
    collectionName: 'EDGE Serisi',
    layoutType: 'Köşe',
    price: 8500,
    isNew: false,
    description: 'Ultra ince profillerle tasarlanmış, banyonun köşesine mükemmel uyum sağlayan minimalist çözüm.',
    longDescription: 'Edge Köşe Kabin, 12mm ultra ince alüminyum profilleri ve net geometrik hatlarıyla modern banyoların vazgeçilmezi. Köşe yerleşimi sayesinde alan tasarrufu sağlarken, camın şeffaflığıyla mekânı olduğundan daha geniş gösterir.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop'
    ],
    features: ['12mm Ultra İnce Profil', 'Köşe Yerleşimi', 'Gizli Menteşe Sistemi', 'Nano Kaplama Cam'],
    technicalSpecs: {
      glassThickness: ['6mm', '8mm'],
      height: '190cm - 220cm',
      widthRange: '80x80cm - 120x120cm',
      installation: 'Zemin üstü veya Tekne üstü'
    },
    compatibleGlass: [glassOptions[0], glassOptions[1], glassOptions[4]],
    compatibleProfiles: [profileOptions[0], profileOptions[1], profileOptions[4]],
  },
  {
    id: 'pure-walkin',
    name: 'Pure Walk-in',
    collectionId: 'pure',
    collectionName: 'PURE Serisi',
    layoutType: 'Walk-in',
    price: 12000,
    isNew: true,
    description: 'Tamamen çerçevesiz, kapısız ve eşiksiz. Maksimum şeffaflık ve özgürlük hissi için tasarlandı.',
    longDescription: 'Pure Walk-in, duş deneyimini tamamen açık ve özgür kılan bir mimari harikadır. Yerde eşik olmaması ve kapı kullanılmaması sayesinde banyoyla bütünleşir. 10mm veya 12mm kalınlığındaki temperli camlar, sadece zeminden ve duvardan gizli kanallarla sabitlenerek havada süzülüyor hissi yaratır.',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop',
    gallery: [],
    features: ['%100 Çerçevesiz Tasarım', 'Kapısız Serbest Geçiş', 'Zemine Sıfır Montaj', 'Paslanmaz Çelik Sabitleme Kolu'],
    technicalSpecs: {
      glassThickness: ['8mm', '10mm', '12mm'],
      height: '200cm - 240cm',
      widthRange: '90cm - 160cm',
      installation: 'Sadece Zemin üstü (Eşiksiz)'
    },
    compatibleGlass: glassOptions,
    compatibleProfiles: [profileOptions[0], profileOptions[1], profileOptions[2], profileOptions[3]],
  },
  {
    id: 'luxury-sliding',
    name: 'Luxury Sürgülü',
    collectionId: 'luxury',
    collectionName: 'LUXURY Serisi',
    layoutType: 'Sürgülü',
    price: 16500,
    isNew: false,
    description: 'Soft-close teknolojisine sahip, üst düzey akustik izolasyon sunan imza niteliğindeki sürgülü sistem.',
    longDescription: 'Luxury Sürgülü, endüstriyel rulman teknolojisini lüks tasarımla buluşturuyor. Üst ray üzerinde sessizce ve zahmetsizce kayan ağır cam paneller, özel amortisör (soft-close) sistemi sayesinde yavaşça kapanır.',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop',
    gallery: [],
    features: ['Soft-Close Yavaşlatıcı', 'Ağır Yük Rulmanları', 'Akustik Fitiller', 'Özel Renk Seçenekleri'],
    technicalSpecs: {
      glassThickness: ['8mm', '10mm'],
      height: '190cm - 220cm',
      widthRange: '120cm - 200cm',
      installation: 'İki duvar arası veya Sabit camlı L yerleşim'
    },
    compatibleGlass: [glassOptions[0], glassOptions[1], glassOptions[2], glassOptions[3]],
    compatibleProfiles: profileOptions,
  },
  {
    id: 'edge-pivot',
    name: 'Edge Pivot Duş',
    collectionId: 'edge',
    collectionName: 'EDGE Serisi',
    layoutType: 'İki Duvar Arası',
    price: 9200,
    isNew: false,
    description: 'İki duvar arası niş alanlar için tasarlanmış, merkez eksenli açılan minimalist pivot kapı.',
    longDescription: 'Banyonuzdaki niş alanları mükemmel şekilde değerlendirin. Edge Pivot, dış çerçeve olmaksızın, zemine ve tavana gizlenmiş pivot menteşeler üzerinde döner.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop',
    gallery: [],
    features: ['Zemin ve Tavan Pivot Menteşe', 'Manyetik Fitil', 'Dışa ve İçe Açılım', 'Ultra Dar Profil'],
    technicalSpecs: {
      glassThickness: ['6mm', '8mm'],
      height: '190cm - 220cm',
      widthRange: '70cm - 110cm',
      installation: 'Sadece İki Duvar Arası'
    },
    compatibleGlass: [glassOptions[0], glassOptions[1], glassOptions[4]],
    compatibleProfiles: [profileOptions[0], profileOptions[1]],
  },
  {
    id: 'luxury-corner',
    name: 'Luxury Premium Köşe',
    collectionId: 'luxury',
    collectionName: 'LUXURY Serisi',
    layoutType: 'Köşe',
    price: 18000,
    isNew: true,
    description: 'Köşe duş alanları için ekstra geniş iç hacim ve çift kanatlı açılım sunan premium kabin.',
    longDescription: 'Luxury Premium Köşe, en geniş banyolar için tasarlandı. Özel menteşe mekanizmasıyla iki kanat da dışa doğru açılabilir.',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop',
    gallery: [],
    features: ['Çift Kanat Açılım', 'Titanyum Detaylar', 'Soft-Close', 'Ekstra Geniş Giriş'],
    technicalSpecs: {
      glassThickness: ['8mm', '10mm'],
      height: '200cm - 230cm',
      widthRange: '100x100cm - 140x140cm',
      installation: 'Zemin üstü veya Tekne üstü'
    },
    compatibleGlass: glassOptions,
    compatibleProfiles: profileOptions,
  },
  {
    id: 'pure-slider',
    name: 'Pure Gizli Sürgülü',
    collectionId: 'pure',
    collectionName: 'PURE Serisi',
    layoutType: 'Sürgülü',
    price: 14500,
    isNew: false,
    description: 'Ray sistemi gizlenmiş, tamamen şeffaf ve kusursuz bir sürgülü duşakabin deneyimi.',
    longDescription: 'Tekerleklerin ve rayların profiller içine tamamen gizlendiği, dışarıdan sadece hareket eden camın göründüğü eşsiz tasarım.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    gallery: [],
    features: ['Gizli Ray Sistemi', '10mm Cam', 'Görünmez Fren Mekanizması'],
    technicalSpecs: {
      glassThickness: ['10mm', '12mm'],
      height: '200cm - 240cm',
      widthRange: '140cm - 220cm',
      installation: 'İki Duvar Arası'
    },
    compatibleGlass: [glassOptions[0], glassOptions[1], glassOptions[3]],
    compatibleProfiles: [profileOptions[0], profileOptions[1], profileOptions[2]],
  }
]
