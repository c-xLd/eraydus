import { createClient } from '@/lib/server'
import ProductEditorClient from '../components/ProductEditorClient'

export const metadata = {
  title: 'Ürün Düzenle | Erayduş Admin',
}

export default async function ProductEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams
  const supabase = await createClient()
  let product = null
  let globalAttributes: any[] = []
  let categories: any[] = []

  // Fetch product if editing
  if (id) {
    const { data } = await supabase
      .from('products')
      .select('*, variants:product_variants(*)')
      .eq('id', id)
      .single()
    
    product = data
  }

  // Fetch global attributes for variations
  try {
    const { data } = await supabase
      .from('product_attributes')
      .select(`
        *,
        terms:product_attribute_terms(*)
      `)
    if (data) globalAttributes = data
  } catch (err) {
    // Migration might not be applied yet
  }

  // Fetch categories
  try {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    if (data) categories = data
  } catch (err) {}

  return (
    <ProductEditorClient 
      initialData={product} 
      globalAttributes={globalAttributes} 
      categories={categories}
    />
  )
}
