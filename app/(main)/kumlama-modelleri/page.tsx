import { Metadata } from 'next'
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

const DEFAULT_SANDBLASTED_MODELS = [
  {
    id: 'kumlama-1',
    title: 'Çizgili Modern Desen',
    image_url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'kumlama-2',
    title: 'Dalgalı Klasik',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'kumlama-3',
    title: 'Buzlu Geometrik',
    image_url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'kumlama-4',
    title: 'Minimalist Mat',
    image_url: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'kumlama-5',
    title: 'Puslu Çizgi Desen',
    image_url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'kumlama-6',
    title: 'Oluklu Fluted Cam',
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  },
]

export default async function KumlamaModelleriPage() {
  const supabase = await createClient()
  let modelsData: any[] | null = null

  try {
    const { data } = await supabase
      .from('sandblasted_models')
      .select('*')
    
    if (data && data.length > 0) {
      modelsData = data
    }
  } catch (err) {
    console.error('Error fetching sandblasted_models:', err)
  }

  const mappedModels = (modelsData || []).map((m: any) => ({
    id: String(m.id),
    title: m.title || m.name || 'Kumlama Deseni',
    image_url: m.image_url || DEFAULT_SANDBLASTED_MODELS[0].image_url,
  }))

  const finalModels = mappedModels.length > 0 ? mappedModels : DEFAULT_SANDBLASTED_MODELS

  return <KumlamaClient initialModels={finalModels} />
}
