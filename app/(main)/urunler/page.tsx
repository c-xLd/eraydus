import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getProducts } from '@/features/products/services/products'
import { getCategories } from '@/features/products/services/categories'
import { ShowroomHero } from '@/features/products/components/showroom-hero'
import { CategoryShowcase } from '@/features/products/components/category-showcase'
import { ProductGrid } from '@/features/products/components/product-grid'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { pagesSeoData } from '@/lib/data/seo'

const InspirationSection = dynamic(() => import('@/features/products/components/inspiration-section').then(mod => mod.InspirationSection))
const MaterialShowcase = dynamic(() => import('@/features/products/components/material-showcase').then(mod => mod.MaterialShowcase))
const ConfiguratorBanner = dynamic(() => import('@/features/products/components/configurator-banner').then(mod => mod.ConfiguratorBanner))
const ReviewCarousel = dynamic(() => import('@/features/products/components/review-carousel').then(mod => mod.ReviewCarousel))
const NewsletterSection = dynamic(() => import('@/features/products/components/newsletter-section').then(mod => mod.NewsletterSection))

export async function generateMetadata(): Promise<Metadata> {
  const seo = pagesSeoData.find(p => p.id === 'urunler')
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

  return {
    title: seo?.title || 'Duşakabin Modelleri ve Banyo Koleksiyonları',
    description: seo?.description || 'Özel ölçü imalat sürgülü, pivot, katlanır ve askılı duşakabin modellerini inceleyin. Ankara içi ücretsiz keşif ve montaj imkanı.',
    keywords: seo?.keywords || 'duşakabin modelleri, cam duşakabin, ankara duşakabin, lüks banyo kabinleri',
    alternates: {
      canonical: `${baseUrl}/urunler`,
    },
    openGraph: {
      title: seo?.title || 'Duşakabin Modelleri - ERAYDUŞ',
      description: seo?.description || 'Özel ölçü imalat duşakabin modelleri.',
      url: `${baseUrl}/urunler`,
      type: 'website',
    },
  }
}

// Generic grid section component for the page
function ProductGridSection({ title, products, linkUrl, linkText }: { title: string, products: any[], linkUrl?: string, linkText?: string }) {
  if (!products || products.length === 0) return null
  
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="flex flex-row items-end justify-between mb-4 sm:mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight mb-2 text-black">{title}</h2>
            <div className="w-8 sm:w-10 h-0.5 bg-black" />
          </div>
          {linkUrl && linkText && (
            <Link 
              href={linkUrl}
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold flex items-center text-black/40 hover:text-black transition-colors shrink-0"
            >
              {linkText} <ArrowRight className="ml-1.5 size-3" />
            </Link>
          )}
        </div>
        
        <ProductGrid products={products} columns={4} />
      </div>
    </section>
  )
}

export default async function UrunlerPage() {
  const [productsResponse, categoriesResponse] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  // Depending on how getProducts wraps response, we extract data
  const products = Array.isArray(productsResponse) ? productsResponse : 
                  (productsResponse as any).data || []
                  
  const categories = Array.isArray(categoriesResponse) ? categoriesResponse : 
                    (categoriesResponse as any).data || []

  // Derived product lists for sections
  // Using first 8 for featured since we don't have a direct 'featured' flag in simple product type
  // If the DB has featured flag it will be mapped, else fallback to slice
  const featuredProducts = products.filter((p: any) => p.featured).length > 0 
    ? products.filter((p: any) => p.featured).slice(0, 8)
    : products.slice(0, 8)
    
  const newProducts = products.filter((p: any) => p.isNew || p.new_product).slice(0, 8)
  
  // Best sellers - mock logic using some other slice
  const bestSellerProducts = products.length > 8 ? products.slice(8, 16) : products.slice(0, 8)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Koleksiyonlar', item: `${baseUrl}/urunler` },
    ],
  }

  return (
    <main className="flex min-h-screen flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ShowroomHero />
      
      {categories && categories.length > 0 && (
        <CategoryShowcase categories={categories} />
      )}
      
      <ProductGridSection 
        title="Öne Çıkan Ürünler" 
        products={featuredProducts} 
      />
      
      {newProducts.length > 0 && (
        <ProductGridSection 
          title="Yeni Ürünler" 
          products={newProducts} 
        />
      )}
      
      <InspirationSection 
        productCount={products.length}
        mainImage={products[0]?.image || undefined}
        secondaryImage={products[1]?.image || undefined}
      />
      
      <ProductGridSection 
        title="Çok Satan Ürünler" 
        products={bestSellerProducts} 
      />
      
      <MaterialShowcase />
      
      <ConfiguratorBanner />
      
      <ReviewCarousel />
      
      <NewsletterSection />
    </main>
  )
}
