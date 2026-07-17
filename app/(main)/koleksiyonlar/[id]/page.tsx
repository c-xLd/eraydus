import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getProductById } from '@/features/products/services/products'
import { ProductDetailClient } from './ProductDetailClient'
import { VanityDetailClient } from './VanityDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = (await getProductBySlug(id)) || (await getProductById(id))
  if (!product) return { title: 'Ürün Bulunamadı | ERAYDUŞ' }
  return {
    title: `${product.name} ${product.layoutType === 'Banyo Dolabı' ? 'Banyo Dolabı Modeli' : 'Özel Ölçü Duşakabin'}`,
    description: `${product.name} serisi ${product.collectionName} modeli. ${product.description} Ankara Erayduş kalitesiyle banyonuza özel tasarım ve ücretsiz montaj.`,
    keywords: `${product.name.toLowerCase()} ${product.layoutType === 'Banyo Dolabı' ? 'banyo dolabı' : 'duşakabin'}, ${product.collectionName.toLowerCase()} serisi, ankara ${product.name.toLowerCase()}, özel tasarım`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar/${product.id}`,
    },
    openGraph: {
      title: `${product.name} Serisi | ERAYDUŞ`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: `${product.name} Model`,
        },
      ],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = (await getProductBySlug(id)) || (await getProductById(id))
  
  if (!product) notFound()

  // Google için yapısal veri şemaları (Product, AggregateRating ve Breadcrumbs)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.name} ${product.layoutType === 'Banyo Dolabı' ? 'Banyo Dolabı' : 'Duşakabin'}`,
    "image": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}${product.image}`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Erayduş"
    },
    "offers": {
      "@type": "Offer",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar/${product.id}`,
      "priceCurrency": "TRY",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Erayduş"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "24"
    }
  };

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
        "name": "Koleksiyonlar",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/koleksiyonlar/${product.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {product.layoutType === 'Banyo Dolabı' ? (
        <VanityDetailClient product={product} />
      ) : (
        <ProductDetailClient product={product} />
      )}
    </>
  )
}
