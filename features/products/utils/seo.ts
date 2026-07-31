import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.net'
const SITE_NAME = 'Erayduş'

// Format price for structured data
function formatPriceForSchema(price: number): string {
  return price.toFixed(2)
}

// Generate metadata for the main /urunler page
export function generateShowroomMetadata(): Metadata {
  return {
    title: 'Ürünlerimiz | Modeller ve Fiyatlar',
    description: "Erayduş'un en seçkin ve lüks duşakabin modelleri. Özel ölçü üretim, milimetrik hassasiyet ve profesyonel kurulum avantajıyla.",
    keywords: 'duşakabin, lüks duşakabin, ankara duşakabin, duşakabin modelleri, özel ölçü duşakabin',
    openGraph: {
      title: `Lüks Duşakabin Modelleri | ${SITE_NAME}`,
      description: 'Her banyoya özel tasarlanmış, birinci sınıf malzeme ve kusursuz işçilik ile üretilen duşakabinler.',
      url: `${SITE_URL}/urunler`,
      type: 'website',
    },
    alternates: { canonical: `${SITE_URL}/urunler` },
  }
}

// Generate metadata for a category page
export function generateCategoryMetadata(category: { name: string; slug: string; description?: string | null }): Metadata {
  return {
    title: `${category.name} Modelleri ve Fiyatları`,
    description: category.description || `En şık ve modern ${category.name} modelleri Erayduş'ta. Özel ölçü üretim, ücretsiz keşif ve profesyonel montaj.`,
    keywords: `${category.name.toLowerCase()}, ${category.name.toLowerCase()} fiyatları, ankara ${category.name.toLowerCase()}, özel ölçü ${category.name.toLowerCase()}`,
    openGraph: {
      title: `${category.name} Modelleri | ${SITE_NAME}`,
      description: category.description || `${category.name} serisi ürünleri. Milimetrik hassasiyetle özel üretim.`,
      url: `${SITE_URL}/urunler/${category.slug}`,
      type: 'website',
    },
    alternates: { canonical: `${SITE_URL}/urunler/${category.slug}` },
  }
}

// Generate metadata for a product page
export function generateProductMetadata(product: {
  name: string; slug: string; short_description?: string | null;
  meta_title?: string | null; meta_description?: string | null;
  main_image_url?: string | null; canonical_url?: string | null;
  category?: { slug: string; name: string } | null;
}): Metadata {
  const title = product.meta_title || `${product.name} | ${product.category?.name || 'Duşakabin'} Modelleri`;
  const description = product.meta_description || product.short_description || `${product.name} modeli. Lüks ve modern duşakabin tasarımı. Erayduş kalitesi ile özel ölçü üretim.`;
  const url = product.canonical_url || `${SITE_URL}/urunler/${product.category?.slug || 'genel'}/${product.slug}`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: product.main_image_url ? [{ url: product.main_image_url, alt: product.name }] : undefined,
    },
    alternates: { canonical: url },
  }
}

// Generate Product JSON-LD structured data
export function generateProductJsonLd(product: {
  name: string; slug: string; description?: string | null;
  base_price?: number | null; starting_price?: number | null;
  main_image_url?: string | null; sku?: string | null;
  category?: { name: string; slug: string } | null;
  gallery?: { image_url: string }[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `${product.name} - Erayduş lüks duşakabin`,
    sku: product.sku || undefined,
    brand: { '@type': 'Brand', name: SITE_NAME },
    manufacturer: { '@type': 'Organization', name: SITE_NAME },
    image: product.gallery?.map(g => g.image_url) || (product.main_image_url ? [product.main_image_url] : []),
    url: `${SITE_URL}/urunler/${product.category?.slug || 'genel'}/${product.slug}`,
    offers: product.base_price && product.base_price > 0 ? {
      '@type': 'Offer',
      price: formatPriceForSchema(product.base_price),
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: SITE_NAME },
    } : {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: SITE_NAME },
    },
    category: product.category?.name || 'Duşakabin',
  }
}

// Generate BreadcrumbList JSON-LD
export function generateBreadcrumbJsonLd(items: { name: string; url?: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  }
}

// Generate FAQ JSON-LD
export function generateFaqJsonLd(faqs: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

// Generate CollectionPage JSON-LD
export function generateCollectionJsonLd(category: { name: string; slug: string }, products: { name: string; slug: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    url: `${SITE_URL}/urunler/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/urunler/${category.slug}/${product.slug}`,
      })),
    }
  }
}
