import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

// Next.js 15: Bu dosyanın ne sıklıkla yeniden oluşturulacağını belirtir (Saniye cinsinden: 3600 = 1 saat)
// Eğer verilerin çok sık değişiyorsa bu süreyi kısaltabilirsin.
export const revalidate = 3600 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ortam değişkenlerinden base URL'i güvenli bir şekilde alma
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

  // Sunucu tarafında (Server-side) sadece okuma yapacak hafif Supabase istemcisi
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // 1. Statik Rotalar (Showroom'un ana hatları)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/koleksiyonlar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  try {
    // 2. Performans (Antigravity): Ürünleri ve Koleksiyonları PARALEL olarak çek
    const [productsResponse, categoriesResponse] = await Promise.all([
      supabase
        .from('products')
        .select('slug, updated_at, categories(slug)')
        .eq('status', 'active'), // Sadece yayındaki ürünler

      supabase
        .from('categories') // Kategoriler tablosu (Örn: Minimal, Luxury vs.)
        .select('slug')
        .eq('status', 'active')
    ])

    if (productsResponse.error) throw new Error(`Products Error: ${productsResponse.error.message}`)
    if (categoriesResponse.error) throw new Error(`Categories Error: ${categoriesResponse.error.message}`)

    // 3. Verileri Sitemap formatına dönüştür (Mapping)
    const productRoutes: MetadataRoute.Sitemap = (productsResponse.data || []).map((product: any) => {
      const catSlug = product.categories?.slug || 'genel'
      return {
        url: `${baseUrl}/koleksiyonlar/${catSlug}/${product.slug}`,
        lastModified: new Date(product.updated_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      }
    })

    const categoryRoutes: MetadataRoute.Sitemap = (categoriesResponse.data || []).map((category) => ({
      url: `${baseUrl}/koleksiyonlar/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Kategoriler SEO'da genellikle tekil ürünlerden daha yüksek önceliğe sahiptir
    }))

    // Tüm rotaları birleştir ve Next.js'e teslim et
    return [...staticRoutes, ...categoryRoutes, ...productRoutes]

  } catch (error) {
    // Hata durumunda derlemenin (build) veya sitenin çökmesini engelle
    // Sadece statik sayfaları döndür ve hatayı logla
    console.error('Sitemap oluşturulurken kritik bir hata oluştu:', error)
    return staticRoutes
  }
}