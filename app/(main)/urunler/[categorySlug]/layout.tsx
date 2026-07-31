import type { Metadata } from 'next'
import { getCategoryBySlug } from '@/features/products/services/categories'
import { generateCategoryMetadata } from '@/features/products/utils/seo'

interface Props {
  params: Promise<{ categorySlug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params
  const category = await getCategoryBySlug(categorySlug)
  
  if (!category) {
    return { title: 'Kategori Bulunamadı | Erayduş' }
  }
  
  return generateCategoryMetadata(category)
}

export default function CategoryLayout({ children }: Props) {
  return <>{children}</>
}
