import { Suspense } from 'react'
import { Metadata } from 'next'
import { getProducts } from '@/features/products/services/products'
import { CollectionsClient } from './CollectionsClient'
import { globalSeoData } from '@/lib/data/seo'

export const metadata: Metadata = {
  title: 'Özel Ölçü Lüks Duşakabin Modelleri ve Fiyatları',
  description: 'Erayduş premium duşakabin koleksiyonları. Şeffaf, füme, bronz cam seçenekleri ve antrasit, altın, siyah profil renkleriyle banyonuza özel tasarım.',
  keywords: 'duşakabin, lüks duşakabin, özel ölçü duşakabin, füme cam duşakabin, siyah profil duşakabin, ankara duşakabin',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar`,
  }
}

export const dynamic = 'force-dynamic'

export default async function CollectionsPage() {
  const products = await getProducts()

  // ItemList Schema (Google'a burada bir ürün listesi olduğunu belirtir)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar/${product.id}`,
      "name": product.name,
      "image": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}${product.image}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Suspense fallback={<div className="min-h-screen pt-32 pb-24 bg-background">Yükleniyor...</div>}>
        <CollectionsClient products={products} />
      </Suspense>
    </>
  )
}
