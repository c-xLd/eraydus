import { cache } from 'react'
import { createPublicClient } from '@/services/supabase/server'

export interface Category {
  id: string
  name: string
  slug: string
  image_url?: string | null
  product_count?: number
  parent_category: string | null
  status: string
}

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category | null> => {
    try {
      const supabase = await createPublicClient()
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (error || !data) return null
      return data as Category
    } catch {
      return null
    }
  }
)

export const getCategories = cache(
  async (): Promise<Category[]> => {
    try {
      const supabase = await createPublicClient()
      const [categoriesRes, productsRes] = await Promise.all([
        supabase.from('categories').select('*').eq('status', 'active').order('name', { ascending: true }),
        supabase.from('products').select('id, category_id, main_image_url, images').eq('status', 'active')
      ])
      
      if (categoriesRes.error || !categoriesRes.data) return []

      const products = productsRes.data || []

      const enrichedCategories: Category[] = categoriesRes.data.map((cat: any) => {
        const catProducts = products.filter((p: any) => p.category_id === cat.id)
        let imageUrl = cat.image_url || null
        if (!imageUrl && catProducts.length > 0) {
          const p = catProducts[0]
          const rawImgs = Array.isArray(p.images) ? p.images : []
          imageUrl = p.main_image_url || (rawImgs.length > 0 ? String(rawImgs[0]) : null)
        }

        return {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          image_url: imageUrl,
          product_count: catProducts.length,
          parent_category: cat.parent_category || null,
          status: cat.status || 'active'
        }
      })

      return enrichedCategories
    } catch (e) {
      console.error('getCategories error:', e)
      return []
    }
  }
)
