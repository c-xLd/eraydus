import { createAdminClient } from '@/services/supabase/server'
import SeoDashboardClient from '../components/SeoDashboardClient'

export const metadata = {
  title: 'Ürün SEO | Erayduş',
}

export default async function SeoProductsPage() {
  const supabase = createAdminClient()
  
  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      categories(slug)
    `)
    .eq('status', 'active')
    
  const productIds = products?.map((p: any) => p.id) || []
  
  let seoData: any[] = []
  if (productIds.length > 0) {
    const { data } = await supabase
      .from('seo_metadata')
      .select('*')
      .in('page_id', productIds)
      .eq('page_type', 'product')
    seoData = data || []
  }
  
  const seoMap = new Map(seoData.map(s => [s.page_id, s]))

  const fullProducts = products?.map((p: any) => ({
    ...p,
    seo_metadata: seoMap.get(p.id) || null
  })) || []

  return (
    <SeoDashboardClient products={fullProducts} />
  )
}
