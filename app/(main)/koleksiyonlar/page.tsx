import { Metadata } from 'next'
import { getProducts } from '@/features/products/services/products'
import { CollectionsClient } from './CollectionsClient'

export const metadata: Metadata = {
  title: 'Koleksiyonlar | ERAYDUŞ',
  description: 'Mimarinin şeffaf halini yansıtan premium duşakabin koleksiyonlarımız.',
}

export default async function CollectionsPage() {
  const products = await getProducts()

  return <CollectionsClient products={products} />
}
