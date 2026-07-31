import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { createPublicClient } from '@/services/supabase/server'

export interface Category {
  id: string
  name: string
  slug: string
  parent_category: string | null
  status: string
}

export const getCategoryBySlug = cache(
  unstable_cache(
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
    },
    ['get-category-by-slug'],
    { tags: ['categories'], revalidate: 3600 }
  )
)

export const getCategories = cache(
  unstable_cache(
    async (): Promise<Category[]> => {
      try {
        const supabase = await createPublicClient()
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('status', 'active')
          .order('name', { ascending: true })
        
        if (error || !data) return []
        return data as Category[]
      } catch {
        return []
      }
    },
    ['get-categories-v2'],
    { tags: ['categories'], revalidate: 3600 }
  )
)
