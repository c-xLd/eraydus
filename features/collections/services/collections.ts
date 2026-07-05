import { createClient } from '@/services/supabase/server'

export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  created_at: string
}

// Fallback data if table doesn't exist or database is empty
const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'edge',
    name: 'EDGE Serisi',
    slug: 'edge-serisi',
    description: 'Minimal profil yapıları ve keskin hatlarla modern banyo mimarisi.',
    image_url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=600&auto=format&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: 'pure',
    name: 'PURE Serisi',
    slug: 'pure-serisi',
    description: 'Tamamen profilsiz, yalın şeffaflık sunan benzersiz duş sistemleri.',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: 'luxury',
    name: 'LUXURY Serisi',
    slug: 'luxury-serisi',
    description: 'Fırçalanmış pirinç ve altın detaylarla donatılmış lüks segment duş kabinleri.',
    image_url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop',
    created_at: new Date().toISOString()
  }
]

export async function getCollections(): Promise<Collection[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('name')
    
    if (error) {
      console.warn('Supabase error, using fallback collections:', error.message)
      return MOCK_COLLECTIONS
    }
    
    if (!data || data.length === 0) {
      return MOCK_COLLECTIONS
    }
    
    return data as Collection[]
  } catch (err) {
    console.warn('Failed to fetch from Supabase, using fallback collections:', err)
    return MOCK_COLLECTIONS
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
      const fallback = MOCK_COLLECTIONS.find(c => c.slug === slug)
      return fallback || null
    }
    
    return data as Collection
  } catch {
    const fallback = MOCK_COLLECTIONS.find(c => c.slug === slug)
    return fallback || null
  }
}
