import { createClient } from '@/services/supabase/server'
import { glassOptions, profileOptions, Product as UIProduct } from '@/lib/data/products'

// Fallback mock data in the format the UI expects
const MOCK_PRODUCTS: UIProduct[] = [
  {
    id: 'edge-corner',
    name: 'Edge Köşe Kabin',
    collectionId: 'edge',
    collectionName: 'EDGE Serisi',
    description: 'Ultra ince profillerle tasarlanmış, banyonun köşesine mükemmel uyum sağlayan minimalist çözüm.',
    longDescription: 'Edge Köşe Kabin, 12mm ultra ince alüminyum profilleri ve net geometrik hatlarıyla modern banyoların vazgeçilmezi. Köşe yerleşimi sayesinde alan tasarrufu sağlarken, camın şeffaflığıyla mekânı olduğundan daha geniş gösterir. Özel gizli menteşe sistemi, dışarıdan hiçbir vida veya bağlantı elemanı görünmeyecek şekilde tasarlanmıştır.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop'
    ],
    features: ['12mm Ultra İnce Profil', 'Köşe Yerleşimi', 'Gizli Menteşe Sistemi', 'Nano Kaplama Cam', 'Çift Yönlü Açılım Opsiyonu'],
    technicalSpecs: {
      glassThickness: ['6mm', '8mm'],
      height: '190cm - 220cm',
      widthRange: '80x80cm - 120x120cm',
      installation: 'Zemin üstü veya Tekne üstü'
    },
    compatibleGlass: [glassOptions[0], glassOptions[1], glassOptions[4]],
    compatibleProfiles: [profileOptions[0], profileOptions[1], profileOptions[4]],
    basePrice: '₺8.500'
  },
  {
    id: 'pure-walkin',
    name: 'Pure Walk-in',
    collectionId: 'pure',
    collectionName: 'PURE Serisi',
    description: 'Tamamen çerçevesiz, kapısız ve eşiksiz. Maksimum şeffaflık ve özgürlük hissi için tasarlandı.',
    longDescription: 'Pure Walk-in, duş deneyimini tamamen açık ve özgür kılan bir mimari harikadır. Yerde eşik olmaması ve kapı kullanılmaması sayesinde banyoyla bütünleşir. 10mm veya 12mm kalınlığındaki temperli camlar, sadece zeminden ve duvardan gizli kanallarla sabitlenerek havada süzülüyor hissi yaratır.',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    ],
    features: ['%100 Çerçevesiz Tasarım', 'Kapısız Serbest Geçiş', 'Zemine Sıfır Montaj', 'Paslanmaz Çelik Sabitleme Kolu', 'Kolay Temizlik'],
    technicalSpecs: {
      glassThickness: ['8mm', '10mm', '12mm'],
      height: '200cm - 240cm',
      widthRange: '90cm - 160cm',
      installation: 'Sadece Zemin üstü (Eşiksiz)'
    },
    compatibleGlass: glassOptions,
    compatibleProfiles: [profileOptions[0], profileOptions[1], profileOptions[2], profileOptions[3]],
    basePrice: '₺12.000'
  },
  {
    id: 'luxury-sliding',
    name: 'Luxury Sürgülü',
    collectionId: 'luxury',
    collectionName: 'LUXURY Serisi',
    description: 'Soft-close teknolojisine sahip, üst düzey akustik izolasyon sunan imza niteliğindeki sürgülü sistem.',
    longDescription: 'Luxury Sürgülü, endüstriyel rulman teknolojisini lüks tasarımla buluşturuyor. Üst ray üzerinde sessizce ve zahmetsizce kayan ağır cam paneller, özel amortisör (soft-close) sistemi sayesinde yavaşça kapanır. Dar alanlarda maksimum giriş genişliği sağlarken akustik fitilleriyle suyu ve sesi içeride tutar.',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop'
    ],
    features: ['Soft-Close Yavaşlatıcı', 'Ağır Yük Rulmanları', 'Akustik Fitiller', 'Akıllı Kulp', 'Özel Renk Seçenekleri'],
    technicalSpecs: {
      glassThickness: ['8mm', '10mm'],
      height: '190cm - 220cm',
      widthRange: '120cm - 200cm',
      installation: 'İki duvar arası veya Sabit camlı L yerleşim'
    },
    compatibleGlass: [glassOptions[0], glassOptions[1], glassOptions[2], glassOptions[3]],
    compatibleProfiles: profileOptions,
    basePrice: '₺16.500'
  },
  {
    id: 'edge-pivot',
    name: 'Edge Pivot (İki Duvar Arası)',
    collectionId: 'edge',
    collectionName: 'EDGE Serisi',
    description: 'İki duvar arası niş alanlar için tasarlanmış, merkez eksenli açılan minimalist pivot kapı.',
    longDescription: 'Banyonuzdaki niş alanları mükemmel şekilde değerlendirin. Edge Pivot, dış çerçeve olmaksızın, zemine ve tavana gizlenmiş pivot menteşeler üzerinde döner. Geniş açılım açısı sayesinde engelsiz bir giriş sunar. Manyetik kapanma mekanizması su sızıntısını sıfıra indirir.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop'
    ],
    features: ['Zemin ve Tavan Pivot Menteşe', 'Manyetik Fitil', 'Dışa ve İçe Açılım', 'Ultra Dar Profil'],
    technicalSpecs: {
      glassThickness: ['6mm', '8mm'],
      height: '190cm - 220cm',
      widthRange: '70cm - 110cm',
      installation: 'Sadece İki Duvar Arası'
    },
    compatibleGlass: [glassOptions[0], glassOptions[1], glassOptions[4]],
    compatibleProfiles: [profileOptions[0], profileOptions[1]],
    basePrice: '₺9.200'
  }
]

// Database row mapper helper
function mapDatabaseProduct(dbRow: any): UIProduct {
  return {
    id: dbRow.id,
    name: dbRow.name,
    collectionId: dbRow.collection_id || '',
    collectionName: dbRow.collections?.name || 'Genel',
    description: dbRow.short_description || dbRow.description || '',
    longDescription: dbRow.description || '',
    image: dbRow.image_url || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600',
    gallery: dbRow.gallery || [],
    features: dbRow.features || [],
    technicalSpecs: {
      glassThickness: dbRow.technical_specs?.glassThickness || ['8mm'],
      height: dbRow.technical_specs?.height || '190cm - 220cm',
      widthRange: dbRow.technical_specs?.widthRange || '80cm - 160cm',
      installation: dbRow.technical_specs?.installation || 'Standart Kurulum'
    },
    compatibleGlass: dbRow.compatible_glass || [glassOptions[0]],
    compatibleProfiles: dbRow.compatible_profiles || [profileOptions[0]],
    basePrice: `₺${Number(dbRow.base_price || 0).toLocaleString('tr-TR')}`
  }
}

export async function getProducts(): Promise<UIProduct[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, collections(name)')
      .eq('status', 'active')
    
    if (error) {
      console.warn('Supabase products fetch error, using fallback:', error.message)
      return MOCK_PRODUCTS
    }
    
    if (!data || data.length === 0) {
      return MOCK_PRODUCTS
    }
    
    return data.map(mapDatabaseProduct)
  } catch (err) {
    console.warn('Failed to fetch products, using fallback:', err)
    return MOCK_PRODUCTS
  }
}

export async function getProductsByCollection(collectionId: string): Promise<UIProduct[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, collections(name)')
      .eq('collection_id', collectionId)
      .eq('status', 'active')
    
    if (error) {
      return MOCK_PRODUCTS.filter(p => p.collectionId === collectionId)
    }
    
    if (!data || data.length === 0) {
      return MOCK_PRODUCTS.filter(p => p.collectionId === collectionId)
    }
    
    return data.map(mapDatabaseProduct)
  } catch {
    return MOCK_PRODUCTS.filter(p => p.collectionId === collectionId)
  }
}

export async function getProductById(id: string): Promise<UIProduct | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, collections(name)')
      .eq('id', id)
      .single()
    
    if (error) {
      return MOCK_PRODUCTS.find(p => p.id === id) || null
    }
    
    return mapDatabaseProduct(data)
  } catch {
    return MOCK_PRODUCTS.find(p => p.id === id) || null
  }
}
