import { createClient } from '@/lib/server'
import ProductsClient from './components/ProductsClient'

export const metadata = {
  title: 'Ürün Yönetimi | Erayduş Admin',
}

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*, category:categories(slug)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
  }

  return (
    <ProductsClient initialProducts={products || []} />
  )
}
