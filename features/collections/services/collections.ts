import { createClient } from '@/services/supabase/server'

export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  created_at: string
}



export async function getCollections(): Promise<Collection[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('name')
    
    if (error) {
      console.error('Supabase error fetching collections:', error.message)
      return []
    }
    
    return (data as Collection[]) || []
  } catch (err) {
    console.error('Failed to fetch from Supabase:', err)
    return []
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) {
      return null
    }
    
    return data as Collection
  } catch {
    return null
  }
}
