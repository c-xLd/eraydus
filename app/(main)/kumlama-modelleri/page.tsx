import { Metadata } from 'next'
import type { Database } from '@/lib/database.types'
import { createClient } from '@/services/supabase/server'
import { KumlamaClient } from './KumlamaClient'

export const metadata: Metadata = {
  title: 'Kumlama Cam Desenleri ve Modelleri | Erayduş Ankara Duşakabin',
  description: 'Ankara Erayduş güvencesiyle banyonuza özel kumlama cam desenleri, duşakabin cam modelleri ve fiyatları. Şık ve modern kumlama cam seçeneklerini keşfedin.',
  keywords: 'kumlama cam, kumlama cam desenleri, ankara kumlama cam, duşakabin cam modelleri, erayduş kumlama, desenli duşakabin camı',
  openGraph: {
    title: 'Kumlama Cam Desenleri ve Modelleri | Erayduş Ankara',
    description: 'Ankara Erayduş güvencesiyle banyonuza özel kumlama cam desenleri, duşakabin cam modelleri ve fiyatları.',
    url: '/kumlama-modelleri',
    siteName: 'Erayduş',
    locale: 'tr_TR',
    type: 'website',
  },
  alternates: {
    canonical: '/kumlama-modelleri',
  }
}

type SandblastedModel = Pick<
  Database['public']['Tables']['sandblasted_models']['Row'],
  'id' | 'title' | 'image_url'
>

export default async function KumlamaModelleriPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('sandblasted_models')
    .select('id, title, image_url')
    .eq('is_active', true)
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Kumlama modelleri yüklenemedi:', error)
  }

  const models = (data ?? []) as SandblastedModel[]

  return <KumlamaClient initialModels={models} loadError={Boolean(error)} />
}
