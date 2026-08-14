import { createClient } from '@/lib/server'
import SeoClient from './components/SeoClient'

export const metadata = {
  title: 'SEO Yönetimi | Erayduş Admin',
}

export default async function SeoAdminPage() {
  let supabase: any
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createAdminClient } = await import('@/services/supabase/server')
      supabase = createAdminClient()
    } else {
      supabase = await createClient()
    }
  } catch {
    supabase = await createClient()
  }

  // Fetch all SEO pages
  const { data: pages, error: pagesError } = await supabase
    .from('seo_metadata')
    .select('*')
    .neq('page_type', 'global')
    .order('created_at', { ascending: false })

  // Fetch global SEO
  const { data: globalSeo, error: globalError } = await supabase
    .from('seo_metadata')
    .select('*')
    .eq('page_type', 'global')
    .single()

  if (pagesError) {
    console.error('Error fetching seo metadata:', pagesError)
  }

  return (
    <SeoClient initialPages={pages || []} initialGlobal={globalSeo || null} />
  )
}
