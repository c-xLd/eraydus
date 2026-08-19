import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug } from "@/features/products/actions/product-detail"
import { getApprovedReviews } from "@/features/products/actions/reviews"
import { getProductsByCollection } from "@/features/products/services/products"
import { getCategoryBySlug } from "@/features/products/services/categories"
import { generateProductJsonLd, generateBreadcrumbJsonLd } from "@/features/products/utils/seo"
import { ProductLuxuryDetailView } from "@/features/products/components/product-luxury-detail-view"
import { ProductCabinetDetailView } from "@/features/products/components/product-cabinet-detail-view"
import { ProductRelated } from "@/features/products/components/product-related"
import { ProductTracker } from "@/components/analytics/ProductTracker"

interface Props {
  params: Promise<{ categorySlug: string; productSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, productSlug } = await params
  const [result, category] = await Promise.all([
    getProductBySlug(productSlug),
    getCategoryBySlug(categorySlug),
  ])
  if (!result.success || !result.data) return { title: 'Bulunamadı | ERAYDUŞ' }
  const product = result.data
  const isCabinet = categorySlug === 'banyo-dolabi' || categorySlug.includes('dolabi')
  const categoryName = category?.name || (isCabinet ? 'Lüks Banyo Dolabı' : 'Lüks Duşakabin')
  const title = `${product.name} | ${categoryName} - ERAYDUŞ`
  const defaultDesc = isCabinet 
    ? `${product.name} özel tasarım banyo dolabı modeli. Neme dayanıklı gövde ve şık detaylarıyla banyonuza değer katar.`
    : `${product.name} özel tasarım duşakabin modeli. 6mm Şişecam temperli güvenlik camı, paslanmaz profil seçenekleri ve Ankara içi ücretsiz keşif & montaj avantajıyla.`
  const desc = product.meta_description || product.short_description || defaultDesc

  const rawImages = (product as unknown as { images?: string[] }).images
  const imgUrl = product.main_image_url || (Array.isArray(rawImages) && rawImages.length > 0 ? String(rawImages[0]) : '')

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: imgUrl ? [{ url: imgUrl }] : [],
    }
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { categorySlug, productSlug } = await params
  const [result, category] = await Promise.all([
    getProductBySlug(productSlug),
    getCategoryBySlug(categorySlug),
  ])

  if (!result.success || !result.data) {
    notFound()
  }

  const product = result.data

  // Robust category resolution to prevent broken breadcrumb slugs or 404s
  const activeCategory = category || (product as unknown as { category?: { id: string; name: string; slug: string } }).category || (product as unknown as { collection?: { id: string; name: string; slug: string } }).collection || {
    id: 'dusakabin',
    name: 'Duşakabin Modelleri',
    slug: categorySlug || 'dusakabin'
  }

  const [reviewsResult, allCategoryProducts] = await Promise.all([
    getApprovedReviews(product.id),
    getProductsByCollection(activeCategory.id),
  ])

  const reviews = reviewsResult.success && reviewsResult.data ? reviewsResult.data : []
  const relatedProducts = allCategoryProducts.filter(p => p.slug !== productSlug).slice(0, 4)

  const breadcrumbItems = [
    { name: "Anasayfa", url: "/" },
    { name: "Ürünler", url: "/urunler" },
    { name: activeCategory.name, url: `/urunler/${activeCategory.slug}` },
    { name: product.name }
  ]

  const productJsonLd = generateProductJsonLd(product)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems)

  const isCabinet = activeCategory.slug === 'banyo-dolabi' || activeCategory.slug.includes('dolabi') || activeCategory.slug.includes('banyo-mobilyasi')

  return (
    <article className="min-h-screen bg-[#FBFBFA]">
      <ProductTracker productId={product.id} categoryId={activeCategory.id} title={product.name} />
      {/* ─── SEO JSON-LD ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ─── DETAIL VIEW SWITCHER ─── */}
      {isCabinet ? (
        <ProductCabinetDetailView
          product={product}
          category={activeCategory}
          initialReviews={reviews}
        />
      ) : (
        <ProductLuxuryDetailView
          product={product}
          category={activeCategory}
          initialReviews={reviews}
        />
      )}

      {/* ─── BENZER TASARIMLAR ─── */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-black/[0.06] bg-white relative z-10">
          <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-16 md:py-24">
            <ProductRelated products={relatedProducts} title="Benzer Tasarımlar" />
          </div>
        </section>
      )}
    </article>
  )
}


