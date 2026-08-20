import { createClient } from '@/lib/server'
import type { Database } from '@/lib/database.types'
import KumlamaModelleriClient from './client'

export const metadata = {
  title: 'Kumlama Modelleri Yönetimi | Erayduş Admin',
}

export default async function AdminKumlamaPage() {
  const supabase = await createClient()

  // Fetch all models, order by order_index (if exists) then created_at
  // If order_index doesn't exist yet, it might throw an error if not careful, 
  // but since we're using a single query, let's just order by created_at desc for now
  // to avoid crashes before migration is run.
  const { data, error } = await supabase
    .from('sandblasted_models')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching models:', error)
  }

  type SandblastedModelRow = Database['public']['Tables']['sandblasted_models']['Row']
  type AdminModel = {
    id: string
    title: string
    image_url: string
    created_at: string
    is_active?: boolean
    order_index?: number
  }

  const models: AdminModel[] = ((data as SandblastedModelRow[]) || [])
    .map((row) => ({
      id: row.id,
      title: row.title.trim() || 'Başlıksız Model',
      image_url: row.image_url,
      created_at: row.created_at,
      is_active: row.is_active ?? undefined,
      order_index: row.order_index,
    }))
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))

  return <KumlamaModelleriClient initialModels={models} />
}
