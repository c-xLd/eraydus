import { createClient } from '@/services/supabase/server'
import { Product as UIProduct } from '@/lib/data/products'


// Database row mapper helper
function mapDatabaseProduct(dbRow: any): UIProduct {
  return {
    id: dbRow.id,
    slug: dbRow.slug || dbRow.id,
    name: dbRow.name || dbRow.title,
    collectionId: dbRow.category_id || '',
    collectionName: dbRow.categories?.name || 'Genel',
    collectionSlug: dbRow.categories?.slug || 'genel',
    description: dbRow.short_description || dbRow.description || '',
    longDescription: dbRow.description || '',
    image: Array.isArray(dbRow.images) && dbRow.images.length > 0 ? dbRow.images[0] : null,
    gallery: Array.isArray(dbRow.images) ? dbRow.images : [],
    features: dbRow.features || [],
    technicalSpecs: {
      glassThickness: dbRow.technical_specs?.glassThickness || [],
      height: dbRow.technical_specs?.height || '',
      widthRange: dbRow.technical_specs?.widthRange || '',
      installation: dbRow.technical_specs?.installation || ''
    },
    compatibleGlass: dbRow.compatible_glass || [],
    compatibleProfiles: dbRow.compatible_profiles || [],
    price: Number(dbRow.sale_price || dbRow.base_price || 0),
    layoutType: dbRow.technical_specs?.layoutType || '',
    isNew: dbRow.new_product || false
  }
}

export async function getProducts(): Promise<UIProduct[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
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
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
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
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
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
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
      .eq('slug', slug)
      .single()
    
    if (error || !data) return null
    return mapDatabaseProduct(data)
  } catch {
    return null
  }
}
