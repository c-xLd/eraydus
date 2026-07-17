import { createPublicClient } from '@/services/supabase/server'

export interface FAQ {
  id: string
  question: string
  answer: string
  sort_order: number
}

export interface Testimonial {
  id: string
  name: string
  role: string | null
  quote: string
  rating: number
  image_url: string | null
}

export async function getHomepageFaqs(): Promise<FAQ[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('homepage_faqs')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error("Error fetching faqs:", error)
      return []
    }
    return data || []
  } catch (error) {
    console.error("Exception fetching faqs:", error)
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error("Error fetching testimonials:", error)
      return []
    }
    return data || []
  } catch (error) {
    console.error("Exception fetching testimonials:", error)
    return []
  }
}

export interface FeaturedCategory {
  id: string
  slug: string
  name: string
  description: string | null
  image_url: string | null
  subtitle?: string
  badge?: string
}

export async function getFeaturedCategories(): Promise<FeaturedCategory[]> {
  try {
    const supabase = createPublicClient()

    // Üst düzey (ana) aktif kategoriler, sıralamaya göre ilk 4
    const { data: cats, error } = await supabase
      .from('categories')
      .select('id, slug, name, sort_order')
      .is('parent_category', null)
      .eq('status', 'active')
      .order('sort_order', { ascending: true })
      .limit(4)

    if (error) {
      console.error("Error fetching featured categories:", error)
      return []
    }
    if (!cats || cats.length === 0) return []

    // Bu kategorilere ait ürünleri en yeniden eskiye getir; her kategori için
    // en son ürünün ilk görselini kullanacağız.
    const categoryIds = cats.map(c => c.id)
    const { data: products } = await supabase
      .from('products')
      .select('category_id, images, name, created_at')
      .in('category_id', categoryIds)
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    // Kategori id → en son ürün (created_at desc sıralı olduğu için ilk eşleşen)
    const latestByCategory = new Map<string, { images: string[] | null; name: string }>()
    for (const p of products || []) {
      if (p.category_id && !latestByCategory.has(p.category_id)) {
        latestByCategory.set(p.category_id, { images: p.images, name: p.name })
      }
    }

    const defaultImages: Record<string, string> = {
      dusakabin: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
      edge: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800&auto=format&fit=crop',
      pure: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop',
      luxury: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=800&auto=format&fit=crop',
    }

    return cats.map(cat => {
      const latest = latestByCategory.get(cat.id)
      const firstImage = latest?.images?.[0] || defaultImages[cat.slug] || defaultImages.dusakabin
      return {
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        description: latest?.name || 'Minimalist ve yalın hatlarla banyonuza uyum sağlayan özel seri.',
        image_url: firstImage,
        badge: cat.slug === 'luxury' ? 'Premium' : cat.slug === 'pure' ? 'Yeni' : undefined,
        subtitle: cat.slug === 'dusakabin' ? 'KLASİK SERİ' : cat.slug.toUpperCase() + ' SERİSİ',
      }
    })
  } catch (error) {
    console.error("Exception fetching featured categories:", error)
    return []
  }
}
