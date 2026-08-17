import { createAdminClient } from '@/services/supabase/server'
import CategorySeoClient from './CategorySeoClient'

export const metadata = {
  title: 'Kategori SEO | Erayduş',
}

export default async function CategorySeoPage() {
  const supabase = createAdminClient()
  
  const { data: categories } = await supabase
    .from('categories')
    .select(`
      id,
      name,
      slug,
      status
    `)
    .order('created_at', { ascending: false })
    
  const catIds = categories?.map((c: any) => c.id) || []
  
  let seoData: any[] = []
  if (catIds.length > 0) {
    const { data } = await supabase
      .from('seo_metadata')
      .select('*')
      .in('page_id', catIds)
      .eq('page_type', 'category')
    seoData = data || []
  }
  
  const seoMap = new Map(seoData.map(s => [s.page_id, s]))

  const fullCategories = categories?.map((c: any) => ({
    ...c,
    seo_metadata: seoMap.get(c.id) || null
  })) || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900 tracking-tight">Kategori SEO Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">Duşakabin kategorilerinin URL ve arama motoru ayarları.</p>
        </div>
      </div>
      <CategorySeoClient categories={fullCategories} />
    </div>
  )
}
