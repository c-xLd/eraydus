import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getProductById } from '@/features/products/services/products'
import { ProductDetailClient } from './ProductDetailClient'
import { VanityDetailClient } from './VanityDetailClient'

import { getProductSchema, getBreadcrumbSchema, getGraphSchema } from '@/lib/seo/schemas'
import { getProducts } from '@/features/products/services/products'

interface Props {
  params: Promise<{ categorySlug: string; productSlug: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    categorySlug: product.collectionSlug || 'genel',
    productSlug: product.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, productSlug } = await params
  const product = (await getProductBySlug(productSlug)) || (await getProductById(productSlug))
  if (!product) return { title: 'Ürün Bulunamadı | ERAYDUŞ' }
  return {
    title: `${product.name} ${product.layoutType === 'Banyo Dolabı' ? 'Banyo Dolabı Modeli' : 'Özel Ölçü Duşakabin'}`,
    description: `${product.name} serisi ${product.collectionName} modeli. ${product.description} Ankara Erayduş kalitesiyle banyonuza özel tasarım ve ücretsiz montaj.`,
    keywords: `${product.name.toLowerCase()} ${product.layoutType === 'Banyo Dolabı' ? 'banyo dolabı' : 'duşakabin'}, ${product.collectionName.toLowerCase()} serisi, ankara ${product.name.toLowerCase()}, özel tasarım`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.net'}/koleksiyonlar/${categorySlug}/${product.slug}`,
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
  const { categorySlug, productSlug } = await params
  const product = (await getProductBySlug(productSlug)) || (await getProductById(productSlug))
  
  if (!product) notFound()

  const productSchema = getProductSchema({
    name: `${product.name} ${product.layoutType === 'Banyo Dolabı' ? 'Banyo Dolabı' : 'Duşakabin'}`,
    description: product.longDescription || product.description,
    image: product.gallery && product.gallery.length > 0 ? product.gallery : [product.image],
    sku: `ERAY-${product.slug.toUpperCase()}`,
    price: product.price,
    currency: 'TRY',
    inStock: true,
    ratingValue: 4.9,
    reviewCount: 38,
    category: product.collectionName || 'Duşakabin',
    url: `/koleksiyonlar/${categorySlug}/${product.slug}`
  });

  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Koleksiyonlar', url: '/koleksiyonlar' },
    { name: product.name, url: `/koleksiyonlar/${categorySlug}/${product.slug}` }
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const graphSchema = getGraphSchema([productSchema, breadcrumbSchema]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />
      
      {product.layoutType === 'Banyo Dolabı' ? (
        <VanityDetailClient product={product} />
      ) : (
        <ProductDetailClient product={product} />
      )}
    </>
  )
}
