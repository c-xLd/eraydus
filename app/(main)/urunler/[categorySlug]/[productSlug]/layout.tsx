import type { Metadata } from 'next'
import { getProductBySlug } from '@/features/products/actions/product-detail'
import { generateProductMetadata } from '@/features/products/utils/seo'

export async function generateMetadata({ params }: { params: Promise<{ productSlug: string }> }): Promise<Metadata> {
  const { productSlug } = await params
  const result = await getProductBySlug(productSlug)
  if (!result.success || !result.data) return { title: 'Ürün Bulunamadı | Erayduş' }
  return generateProductMetadata(result.data)
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
