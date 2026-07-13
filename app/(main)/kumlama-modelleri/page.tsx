import { Metadata } from 'next'
import { createClient } from '@/services/supabase/server'
import { KumlamaClient } from './KumlamaClient'

export const metadata: Metadata = {
  title: 'Kumlama Cam Modelleri | ERAYDUŞ',
  description: 'Duşakabinleriniz için özel tasarım kumlama cam desenleri ve modelleri.',
}

export default async function KumlamaModelleriPage() {
  const supabase = await createClient()
  const { data: models } = await supabase
    .from('sandblasted_models')
    .select('*')
    .order('created_at', { ascending: false })

  return <KumlamaClient initialModels={models || []} />
}
