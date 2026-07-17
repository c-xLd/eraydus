import { Suspense } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductsByCollection } from '@/features/products/services/products'
import { getCategoryBySlug, getCategories } from '@/features/products/services/categories'
import { CollectionsClient } from '../CollectionsClient'

interface Props {
  params: Promise<{ categorySlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params
  const category = await getCategoryBySlug(categorySlug)
  
  if (!category) return { title: 'Kategori Bulunamadı | Erayduş' }
  
  return {
    title: `${category.name} Modelleri ve Fiyatları | Erayduş`,
    description: `En şık ve modern ${category.name} modelleri Erayduş'ta. Özel ölçü üretim, ücretsiz keşif ve montaj avantajıyla lüks banyo deneyimi.`,
    keywords: `${category.name.toLowerCase()}, ${category.name.toLowerCase()} fiyatları, özel ölçü ${category.name.toLowerCase()}, ankara ${category.name.toLowerCase()}`,
    openGraph: {
      title: `${category.name} Modelleri | Erayduş`,
      description: `Banyonuzun mimarisine uyum sağlayan üstün İtalyan tasarımı ${category.name} serisi.`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar/${category.slug}`,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar/${category.slug}`,
    }
  }
}

// export const revalidate = 3600

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params
  
  const category = await getCategoryBySlug(categorySlug)
  if (!category) notFound()

  const products = await getProductsByCollection(category.id)
  const allCategories = await getCategories()

  // Google SEO Schema (CollectionPage)
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} Modelleri`,
    "description": `Erayduş ${category.name} serisi ürünleri.`,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar/${category.slug}`,
    "hasPart": products.map((product) => ({
      "@type": "Product",
      "name": product.name,
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar/${category.slug}/${product.slug}`
    }))
  };

  // Breadcrumbs Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Anasayfa",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Kategoriler",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar/${category.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* 
        CollectionsClient will still act as a UI component for listing.
        We pass the filtered products. We also tell it what the active category is 
        so it can maybe highlight it or just not rely on its internal selectedLayouts state.
      */}
      <CollectionsClient 
        products={products} 
        categories={allCategories}
        activeCategorySlug={category.slug} 
        title={category.name}
      />
    </>
  )
}
