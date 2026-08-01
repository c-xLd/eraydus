import { getProducts } from '@/features/products/services/products'
import { getCategories } from '@/features/products/services/categories'
import { ShowroomHero } from '@/features/products/components/showroom-hero'
import { CategoryShowcase } from '@/features/products/components/category-showcase'
import { InspirationSection } from '@/features/products/components/inspiration-section'
import { MaterialShowcase } from '@/features/products/components/material-showcase'
import { ConfiguratorBanner } from '@/features/products/components/configurator-banner'
import { NewsletterSection } from '@/features/products/components/newsletter-section'
import { ReviewCarousel } from '@/features/products/components/review-carousel'
import { ProductGrid } from '@/features/products/components/product-grid'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

  return (
    <main className="flex min-h-screen flex-col w-full">
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
