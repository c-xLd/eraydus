import { createPublicClient } from '@/services/supabase/server'
import { Product as UIProduct, glassOptions, profileOptions } from '@/lib/data/products'

// Database row mapper helper
function mapDatabaseProduct(dbRow: any): UIProduct {
  const variants = Array.isArray(dbRow.variants) ? dbRow.variants.map((v: any) => ({
    id: v.id,
    name: v.name,
    sku: v.sku || '',
    price: Number(v.price || 0),
    salePrice: v.sale_price ? Number(v.sale_price) : null,
    stockQuantity: Number(v.stock_quantity || 0),
    attributes: v.attributes || {}
  })) : []

  // Extract profiles and glasses from variations if not explicitly set
  const profileSlugs = new Set<string>()
  const glassSlugs = new Set<string>()
  
  variants.forEach((v: any) => {
    Object.entries(v.attributes).forEach(([key, val]) => {
      const k = key.toLowerCase()
      const slugVal = String(val).toLowerCase()
      if (k.includes('profil') || k.includes('renk')) profileSlugs.add(slugVal)
      if (k.includes('cam')) glassSlugs.add(slugVal)
    })
  })

  let compatibleProfiles = Array.isArray(dbRow.compatible_profiles) && dbRow.compatible_profiles.length > 0 
    ? dbRow.compatible_profiles 
    : profileOptions.filter(p => profileSlugs.has(p.id) || profileSlugs.has(p.name.toLowerCase().replace(/ /g, '-')))

  let compatibleGlass = Array.isArray(dbRow.compatible_glass) && dbRow.compatible_glass.length > 0
    ? dbRow.compatible_glass
    : glassOptions.filter(g => glassSlugs.has(g.id) || glassSlugs.has(g.name.toLowerCase().replace(/ /g, '-')))

  // Provide high-end fallbacks if still empty (so the UI doesn't look broken for newly added basic products)
  if (compatibleProfiles.length === 0) compatibleProfiles = [profileOptions[0], profileOptions[1], profileOptions[2]]
  if (compatibleGlass.length === 0) compatibleGlass = [glassOptions[0], glassOptions[1]]

  return {
    id: dbRow.id,
    slug: dbRow.slug || dbRow.id,
    name: dbRow.name || dbRow.title || 'İsimsiz Ürün',
    collectionId: dbRow.category_id || '',
    collectionName: dbRow.categories?.name || 'Özel Seri',
    collectionSlug: dbRow.categories?.slug || 'ozel-seri',
    description: dbRow.short_description || dbRow.description || 'Lüks ve modern tasarımıyla banyonuza değer katar.',
    longDescription: dbRow.description || 'Erayduş kalitesiyle üretilmiş, milimetrik hassasiyete sahip özel tasarım. Uzun ömürlü kullanım ve estetik görünüm sunar.',
    image: Array.isArray(dbRow.images) && dbRow.images.length > 0 ? dbRow.images[0] : 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80',
    gallery: Array.isArray(dbRow.images) ? dbRow.images : [],
    features: Array.isArray(dbRow.features) && dbRow.features.length > 0 ? dbRow.features : ['2 Yıl Üretici Garantisi', 'Ücretsiz Profesyonel Montaj', 'Kişiye Özel Üretim', 'Paslanmaz Malzeme'],
    technicalSpecs: {
      glassThickness: dbRow.technical_specs?.glassThickness || ['6mm Temperli Şişecam'],
      height: dbRow.technical_specs?.height || 'Standart veya Tavana Kadar Özel',
      widthRange: dbRow.technical_specs?.widthRange || 'Mekana Özel Milimetrik',
      installation: dbRow.technical_specs?.installation || 'Zemin Üstü / Tekne Üstü'
    },
    compatibleGlass,
    compatibleProfiles,
    price: (() => {
      const base = Number(dbRow.sale_price || dbRow.base_price || dbRow.price || 0)
      if (base > 0) return base
      if (variants.length > 0) {
        const prices = variants.map((v: any) => v.salePrice ?? v.price).filter((p: number) => p > 0)
        if (prices.length > 0) return Math.min(...prices)
      }
      return 0
    })(),
    layoutType: dbRow.technical_specs?.layoutType || 'Standart',
    cabinShape: dbRow.technical_specs?.cabinShape || '',
    isNew: dbRow.new_product || true,
    variants
  }
}

export async function getProducts(): Promise<UIProduct[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug), variants:product_variants(*)')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error("Get products error:", error)
      return []
    }
    
    return data ? data.map(mapDatabaseProduct) : []
  } catch (error) {
    console.error("Get products exception:", error)
    return []
  }
}

export async function getProductsByCollection(categoryId: string): Promise<UIProduct[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug), variants:product_variants(*)')
      .eq('category_id', categoryId)
      .eq('status', 'active')
    
    if (error) {
      console.error("Get products by category error:", error)
      return []
    }
    
    return data ? data.map(mapDatabaseProduct) : []
  } catch (error) {
    console.error("Get products by category exception:", error)
    return []
  }
}

export async function getProductById(id: string): Promise<UIProduct | null> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug), variants:product_variants(*)')
      .eq('id', id)
      .single()
    
    if (error || !data) return null
    return mapDatabaseProduct(data)
  } catch {
    return null
  }
}

export async function getProductBySlug(slug: string): Promise<UIProduct | null> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug), variants:product_variants(*)')
      .eq('slug', slug)
      .single()
    
    if (error || !data) return null
    return mapDatabaseProduct(data)
  } catch {
    return null
  }
}
