import { createClient } from '@/lib/server'
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
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching models:', error)
  }

  // To support order_index gracefully if it exists:
  const models = (data || []).sort((a: any, b: any) => {
    if (a.order_index !== undefined && b.order_index !== undefined) {
      return a.order_index - b.order_index
    }
    return 0
  })

  return <KumlamaModelleriClient initialModels={models} />
}
