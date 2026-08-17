import { createAdminClient } from '@/services/supabase/server'
import RedirectsClient from './RedirectsClient'

export const metadata = {
  title: 'Redirect & 404 Manager | Erayduş SEO',
}

export default async function RedirectsPage() {
  const supabase = createAdminClient()
  
  const [{ data: redirects }, { data: logs404 }] = await Promise.all([
    supabase.from('seo_redirects').select('*').order('created_at', { ascending: false }),
    supabase.from('seo_404_logs').select('*').eq('resolved', false).order('hit_count', { ascending: false }).limit(20)
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900 tracking-tight">Redirect Manager (301)</h1>
          <p className="text-sm text-gray-500 mt-1">Kırık linkleri (404) izleyin ve kalıcı yönlendirmeler (301) oluşturun.</p>
        </div>
      </div>

      <RedirectsClient 
        initialRedirects={redirects || []} 
        initial404={logs404 || []} 
      />
    </div>
  )
}
