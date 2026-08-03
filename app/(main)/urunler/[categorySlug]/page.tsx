import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCategoryBySlug, getCategories } from "@/features/products/services/categories"
import { getProductsByCollection } from "@/features/products/services/products"
import { generateBreadcrumbJsonLd, generateCollectionJsonLd } from "@/features/products/utils/seo"
import { ProductBreadcrumb } from "@/features/products/components/product-breadcrumb"
import { CategoryPageClient } from "./category-page-client"

interface Props {
  params: Promise<{ categorySlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params
  const category = await getCategoryBySlug(categorySlug)
  
  if (!category) return { title: 'Bulunamadı' }
  
  return {
    title: `${category.name} Modelleri ve Fiyatları | ERAYDUŞ`,
    description: `ERAYDUŞ ${category.name} serisi ile banyonuza modern mimari dokunuş. Lüks duşakabin fiyatları ve özel tasarım seçenekleri.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'}/urunler/${categorySlug}` },
    openGraph: {
      title: `${category.name} Modelleri | ERAYDUŞ`,
      description: `Mimari tasarım ${category.name.toLowerCase()} duşakabin modelleri.`,
    }
  }
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params
  const category = await getCategoryBySlug(categorySlug)
  
  if (!category) {
    notFound()
  }

  const products = await getProductsByCollection(category.id)
  const categories = await getCategories()

  const subCategories = categories.filter(c => c.parent_category === category.id)
  const parentCategory = category.parent_category ? categories.find(c => c.id === category.parent_category) : null

  const breadcrumbItems = [
    { name: "Anasayfa", url: "/" },
    { name: "Ürünler", url: "/urunler" },
    ...(parentCategory ? [{ name: parentCategory.name, url: `/urunler/${parentCategory.slug}` }] : []),
    { name: category.name, url: `/urunler/${category.slug}` }
  ]

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems)
  const collectionJsonLd = generateCollectionJsonLd(category, products)

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      
      {/* Category Hero Section */}
      <div className="pt-24 sm:pt-32 pb-10 sm:pb-16 bg-black/[0.02] border-b border-black/[0.03]">
        <div className="container mx-auto px-4 md:px-6">
          <ProductBreadcrumb items={breadcrumbItems} className="mb-6 sm:mb-12" />
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-6xl md:text-7xl font-light tracking-tighter mb-3 sm:mb-6 text-black leading-tight sm:leading-none">
              {category.name}
            </h1>
            <p className="text-black/50 text-sm sm:text-lg md:text-xl font-light tracking-wide mb-4 sm:mb-6">
              {products.length} MİMARİ ÇÖZÜM
            </p>

            {/* Subcategories Pills */}
            {subCategories.length > 0 && (
              <div className="flex overflow-x-auto no-scrollbar items-center gap-2 pt-3 border-t border-black/5 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                <span className="text-xs font-semibold uppercase text-black/40 mr-2 shrink-0">Alt Kategoriler:</span>
                {subCategories.map((sub) => (
                  <a
                    key={sub.id}
                    href={`/urunler/${sub.slug}`}
                    className="px-4 py-2 rounded-full bg-white border border-black/10 text-xs font-medium text-black hover:border-black/40 transition-all shadow-xs hover:shadow-sm shrink-0 active:scale-95 touch-manipulation"
                  >
                    {sub.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Filter and Grid */}
      <CategoryPageClient 
        products={products} 
        category={category} 
        categories={categories} 
      />

      {/* SEO Content Section */}
      <section className="container mx-auto px-4 md:px-6 py-32 border-t border-black/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40">
            MİMARİ VİZYON
          </span>
          <h2 className="text-3xl font-light tracking-tight text-black">{category.name} Koleksiyonu</h2>
          <p className="text-black/60 leading-relaxed font-light text-lg">
            ERAYDUŞ {category.name.toLowerCase()} serisi, modern banyolar için tasarlanmış 
            yenilikçi ve estetik çözümler sunar. Yüksek kaliteli malzemeler ve kusursuz işçilik 
            ile üretilen modellerimiz, banyonuza ağırlıksız bir görünüm ve sonsuz bir ferahlık katar.
          </p>
        </div>
      </section>
    </div>
  )
}
