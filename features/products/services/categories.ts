import { createClient } from '@/services/supabase/server'

export interface Category {
  id: string
  name: string
  slug: string
  parent_category: string | null
  status: string
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = await createClient()
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

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = await createClient()
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
}
