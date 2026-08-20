import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { getAllTags, slugifyTag } from '@/lib/data/blog'

export const revalidate = 3600 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xzxutzjzjdyjheivdxdl.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_g0itJI2YsAytCSuPGT18xw_Rl-VxHbY'
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // 1. Statik Rotalar (Tüm Önemli Sayfalar)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dusakabin-modelleri`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/dusakabin/80x80`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${baseUrl}/dusakabin/90x90`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${baseUrl}/banyo-trendleri-2026`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tasarla`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kumlama-modelleri`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ankara-cankaya-dusakabin`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cayyolu-dusakabin`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/batikent-dusakabin`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kecioren-dusakabin`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/urunler`,
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
      url: `${baseUrl}/projeler`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/jakuzi-tekneler`,
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
      url: `${baseUrl}/bayi-basvurusu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sss`,
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
    {
      url: `${baseUrl}/kvkk`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cerez-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  try {
    // 3. Supabase'den Canlı Ürünler, Kategoriler ve Blog Yazılarını Paralel Çek
    const [productsResponse, categoriesResponse, blogResponse, seoResponse] = await Promise.all([
      supabase
        .from('products')
        .select('id, slug, updated_at, categories(slug)')
        .eq('status', 'active'),

      supabase
        .from('categories')
        .select('slug')
        .eq('status', 'active'),

      supabase
        .from('blog')
        .select('slug, tags, updated_at, published_at')
        .eq('status', 'published'),
        
      supabase
        .from('seo_metadata')
        .select('page_id, robots_index')
    ])

    const seoMap = new Map((seoResponse.data || []).map(s => [s.page_id, s.robots_index]))

    const productRoutes: MetadataRoute.Sitemap = (productsResponse.data || [])
      .filter((product: any) => {
        // Exclude products that are explicitly marked as noindex
        const isIndexed = seoMap.get(product.id)
        if (isIndexed === false) return false
        return true
      })
      .map((product: any) => {
        const catSlug = product.categories?.slug || 'genel'
        return {
          url: `${baseUrl}/urunler/${catSlug}/${product.slug}`,
          lastModified: new Date(product.updated_at || new Date()),
          changeFrequency: 'weekly',
          priority: 0.85,
        }
      })

    const categoryRoutes: MetadataRoute.Sitemap = (categoriesResponse.data || []).map((category: any) => ({
      url: `${baseUrl}/urunler/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.88,
    }))

    const blogPosts = blogResponse.data || []

    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updated_at || blog.published_at || new Date()),
      changeFrequency: 'weekly',
      priority: 0.85,
    }))

    // 4. Blog Etiket (Tag) Dinamik Rotaları
    const dbTags: string[] = blogPosts.flatMap((post: any) => post.tags || [])
    const fallbackTags: string[] = await getAllTags()
    const allUniqueTags = Array.from(new Set([...dbTags, ...fallbackTags]))

    const tagRoutes: MetadataRoute.Sitemap = allUniqueTags
      .map((tag) => slugifyTag(tag))
      .filter(Boolean)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((tagSlug) => ({
        url: `${baseUrl}/blog/tag/${tagSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.70,
      }))

    return [
      ...staticRoutes,
      ...categoryRoutes,
      ...productRoutes,
      ...blogRoutes,
      ...tagRoutes,
    ]

  } catch (error) {
    console.error('Sitemap oluşturulurken hata oluştu:', error)
    
    // Güvenlik Ağı (Fallback): DB erişimi zaman aşımına uğrarsa statik + tag rotalarını döndür
    try {
      const fallbackTags = await getAllTags()
      const tagRoutes: MetadataRoute.Sitemap = fallbackTags
        .map((tag) => slugifyTag(tag))
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map((tagSlug) => ({
          url: `${baseUrl}/blog/tag/${tagSlug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.70,
        }))
      return [...staticRoutes, ...tagRoutes]
    } catch {
      return [...staticRoutes]
    }
  }
}
