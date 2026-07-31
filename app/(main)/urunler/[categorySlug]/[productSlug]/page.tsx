import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/features/products/actions/product-detail'
import { getProducts } from '@/features/products/services/products'
import { getApprovedReviews } from '@/features/products/actions/reviews'
import { generateProductJsonLd, generateBreadcrumbJsonLd, generateFaqJsonLd } from '@/features/products/utils/seo'

import { ProductBreadcrumb } from '@/features/products/components/product-breadcrumb'
import { ProductGallery } from '@/features/products/components/product-gallery'
import { ProductInfo } from '@/features/products/components/product-info'
import { ProductDetailSections } from '@/features/products/components/product-detail-sections'
import { ProductRelated } from '@/features/products/components/product-related'
import { RecentlyViewed } from '@/features/products/components/recently-viewed'

interface Props {
  params: Promise<{ categorySlug: string; productSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params
  const result = await getProductBySlug(productSlug)
  
  if (!result.success || !result.data) {
    return { title: 'Ürün Bulunamadı' }
  }
  
  const product = result.data
  return {
    title: `${product.name} | ERAYDUŞ`,
    description: product.description || `ERAYDUŞ ${product.name} lüks duşakabin modeli ile banyonuza estetik katın.`,
    openGraph: {
      title: `${product.name} | ERAYDUŞ`,
      description: product.description || `Mimari tasarım ${product.name} duşakabin.`,
      images: product.main_image_url ? [{ url: product.main_image_url }] : [],
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { categorySlug, productSlug } = await params
  
  const result = await getProductBySlug(productSlug)
  if (!result.success || !result.data) {
    notFound()
  }

  const product = result.data

  // Fetch reviews
  const reviewsResult = await getApprovedReviews(product.id)
  const reviews = reviewsResult.success && reviewsResult.data ? reviewsResult.data : []

  // Fetch related products (same category)
  const allProducts = await getProducts()
  const relatedProducts = allProducts
    .filter(p => p.collectionSlug === categorySlug && p.id !== product.id)
    .slice(0, 4)

  // JSON-LD
  const breadcrumbItems = [
    { name: 'Anasayfa', url: '/' },
    { name: 'Ürünler', url: '/urunler' },
    { name: product.category?.name || 'Kategori', url: `/urunler/${categorySlug}` },
    { name: product.name }
  ]
  const productJsonLd = generateProductJsonLd(product)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems)

  // Optional FAQ JSON-LD if we add FAQs to the product later
  // const faqJsonLd = generateFaqJsonLd(...)

  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="container mx-auto">
          <ProductBreadcrumb items={breadcrumbItems} className="mb-12" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <ProductGallery 
              images={product.gallery} 
              mainImage={product.main_image_url} 
              name={product.name} 
            />
            
            <ProductInfo 
              product={product} 
              reviews={reviews} 
            />
          </div>
        </div>
      </div>

      <div className="border-t border-black/5">
        <ProductDetailSections 
          product={product} 
          reviews={reviews} 
        />
      </div>

      <div className="bg-black/[0.02] py-24">
        <div className="container mx-auto px-4 md:px-6">
          <ProductRelated 
            products={relatedProducts} 
            title="Benzer Tasarımlar"
          />
        </div>
      </div>

      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <RecentlyViewed currentProduct={product} />
        </div>
      </div>
    </div>
  )
}
