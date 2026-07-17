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
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .limit(3)

    if (error) {
      console.error("Error fetching featured categories:", error)
      return []
    }
    
    return (data || []).map(cat => ({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      description: cat.description,
      image_url: cat.image_url || null,
      badge: cat.badge,
      subtitle: cat.subtitle
    }))
  } catch (error) {
    console.error("Exception fetching featured categories:", error)
    return []
  }
}
