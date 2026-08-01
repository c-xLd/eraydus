import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug } from "@/features/products/actions/product-detail"
import { getProductsByCollection } from "@/features/products/services/products"
import { getCategoryBySlug } from "@/features/products/services/categories"
import { generateProductJsonLd, generateBreadcrumbJsonLd } from "@/features/products/utils/seo"
import { ProductGallery } from "@/features/products/components/product-gallery"
import { ProductInfo } from "@/features/products/components/product-info"
import { ProductDetailSections } from "@/features/products/components/product-detail-sections"
import { ProductRelated } from "@/features/products/components/product-related"
import { ProductBreadcrumb } from "@/features/products/components/product-breadcrumb"

interface Props {
  params: Promise<{ categorySlug: string; productSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params
  const result = await getProductBySlug(productSlug)
  if (!result.success || !result.data) return { title: 'Bulunamadı' }
  const product = result.data
  return {
    title: product.meta_title || `${product.name} | ERAYDUŞ`,
    description: product.meta_description || product.short_description || `${product.name} - ERAYDUŞ mimari cam çözümleri`,
    openGraph: {
      title: product.meta_title || `${product.name} | ERAYDUŞ`,
      description: product.meta_description || product.short_description || '',
      images: product.main_image_url ? [{ url: product.main_image_url }] : [],
    }
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { categorySlug, productSlug } = await params
  const [result, category] = await Promise.all([
    getProductBySlug(productSlug),
    getCategoryBySlug(categorySlug),
  ])
  
  if (!result.success || !result.data || !category) { notFound() }
  
  const product = result.data
  const allCategoryProducts = await getProductsByCollection(category.id)
  const relatedProducts = allCategoryProducts.filter(p => p.slug !== productSlug).slice(0, 8)

  const breadcrumbItems = [
    { name: "Anasayfa", url: "/" },
    { name: "Ürünler", url: "/urunler" },
    { name: category.name, url: `/urunler/${categorySlug}` },
    { name: product.name, url: `/urunler/${categorySlug}/${product.slug}` }
  ]
  const productJsonLd = generateProductJsonLd(product)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems)

  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="container mx-auto">
          <ProductBreadcrumb items={breadcrumbItems} className="mb-12" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <ProductGallery images={product.gallery} mainImage={product.main_image_url} name={product.name} />
            </div>
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      
      <div className="border-t border-black/5">
        <ProductDetailSections product={product} />
      </div>
      
      <div className="bg-black/[0.02] py-24">
        <div className="container mx-auto px-4 md:px-6">
          <ProductRelated products={relatedProducts} title="Benzer Tasarımlar" />
        </div>
      </div>
    </div>
  )
}
