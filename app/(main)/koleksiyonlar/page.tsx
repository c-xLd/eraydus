import { Suspense } from 'react'
import { Metadata } from 'next'
import { getProducts } from '@/features/products/services/products'
import { getCategories } from '@/features/products/services/categories'
import { CollectionsClient } from './CollectionsClient'
import { globalSeoData } from '@/lib/data/seo'

export const metadata: Metadata = {
  title: 'Özel Ölçü Lüks Duşakabin Modelleri ve Fiyatları | Erayduş',
  description: 'Erayduş premium duşakabin koleksiyonları. Şeffaf, füme, bronz cam seçenekleri ve antrasit, altın, siyah profil renkleriyle banyonuza özel lüks tasarımlar.',
  keywords: 'duşakabin, lüks duşakabin, özel ölçü duşakabin, füme cam duşakabin, siyah profil duşakabin, ankara duşakabin',
  openGraph: {
    title: 'Özel Ölçü Lüks Duşakabin Modelleri',
    description: 'Banyonuzun mimarisine uyum sağlayan üstün İtalyan tasarımı.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar`,
    images: [{ url: '/og-collections.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar`,
  }
}

// Performans: Instant TTFB için ISR (Incremental Static Regeneration) kullanıyoruz.
export const revalidate = 3600

function CollectionsSkeleton() {
  return (
    <div className="pt-28 pb-32 lg:pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-[1600px]">
        {/* Minimal Header Skeleton */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6">
          <div className="h-9 w-48 bg-muted rounded animate-pulse"></div>
          <div className="flex items-center gap-6">
            <div className="h-4 w-16 bg-muted rounded animate-pulse hidden md:block"></div>
            <div className="h-8 w-32 bg-muted rounded-md animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Desktop Sidebar Skeleton */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="space-y-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-4 w-24 bg-muted rounded animate-pulse mb-6"></div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="size-4 rounded-full bg-muted animate-pulse"></div>
                        <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content Grid Skeleton */}
          <main className="flex-1 w-full">
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-12 sm:gap-y-16">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col">
                  {/* Image Aspect Ratio Placeholder */}
                  <div className="relative aspect-[4/5] bg-surface rounded-sm mb-6 overflow-hidden">
                    <div className="absolute inset-0 bg-muted/50 animate-pulse"></div>
                  </div>
                  
                  {/* Card Content Skeleton */}
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-4">
                      <div className="h-5 w-1/2 bg-muted rounded animate-pulse"></div>
                      <div className="h-5 w-20 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div className="h-3 w-3/4 bg-muted rounded animate-pulse"></div>
                    <div className="flex gap-1.5 mt-2">
                      {[1, 2, 3].map((dot) => (
                        <div key={dot} className="size-3 rounded-full bg-muted animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default async function CollectionsPage() {
  const products = await getProducts()
  const categories = await getCategories()

  // ItemList Schema (Google'a burada bir ürün listesi olduğunu belirtir)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar/${product.collectionSlug || 'genel'}/${product.slug}`,
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
      <Suspense fallback={<CollectionsSkeleton />}>
        <CollectionsClient products={products} categories={categories} />
      </Suspense>
    </>
  )
}
