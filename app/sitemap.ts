import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { PROGRAMMATIC_MATRIX } from '@/lib/seo/matrix'

export const revalidate = 3600 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // 1. Statik Rotalar
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
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tasarla`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projeler`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
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
      priority: 0.6,
    },
    {
      url: `${baseUrl}/garanti-sartlari`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/montaj-kilavuzu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // 2. Programmatik SEO Rotaları
  const programmaticRoutes: MetadataRoute.Sitemap = Object.keys(PROGRAMMATIC_MATRIX).map((slug) => ({
    url: `${baseUrl}/dusakabin/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.95,
  }))

  try {
    // 3. Supabase'den Canlı Ürünler, Kategoriler ve Blog Yazılarını Paralel Çek
    const [productsResponse, categoriesResponse, blogResponse] = await Promise.all([
      supabase
        .from('products')
        .select('slug, updated_at, categories(slug)')
        .eq('status', 'active'),

      supabase
        .from('categories')
        .select('slug')
        .eq('status', 'active'),

      supabase
        .from('content_calendar')
        .select('slug, updated_at, published_at')
        .eq('content_type', 'blog')
        .eq('status', 'published'),
    ])

    const productRoutes: MetadataRoute.Sitemap = (productsResponse.data || []).map((product: any) => {
      const catSlug = product.categories?.slug || 'genel'
      return {
        url: `${baseUrl}/koleksiyonlar/${catSlug}/${product.slug}`,
        lastModified: new Date(product.updated_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      }
    })

    const categoryRoutes: MetadataRoute.Sitemap = (categoriesResponse.data || []).map((category: any) => ({
      url: `${baseUrl}/koleksiyonlar/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    }))

    const blogRoutes: MetadataRoute.Sitemap = (blogResponse.data || []).map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updated_at || blog.published_at || new Date()),
      changeFrequency: 'weekly',
      priority: 0.85,
    }))

    return [...staticRoutes, ...programmaticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes]

  } catch (error) {
    console.error('Sitemap oluşturulurken hata oluştu:', error)
    return [...staticRoutes, ...programmaticRoutes]
  }
}