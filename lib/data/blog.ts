import { cache } from "react"
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export type BlogPost = {
  id: string
  title: string
  slug: string
  description: string | null
  body: string | null
  featured_image: string | null
  published_at: string | null
  seo_title: string | null
  seo_description: string | null
  tags: string[] | null
}

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "dusakabin-rehberi",
    title: "Duşakabin Seçerken Dikkat Edilmesi Gerekenler",
    slug: "dusakabin-secerken-dikkat-edilmesi-gerekenler",
    description: "Banyonuz için doğru duşakabini seçerken ölçü, cam kalınlığı ve kullanım alışkanlıklarını birlikte değerlendirin.",
    body: "Doğru duşakabin, banyonun hem konforunu hem de mekânsal algısını belirler. İlk adım, net ölçüleri ve kapının açılım alanını değerlendirmektir.\n\nCam kalınlığı, profil yapısı ve menteşe kalitesi uzun ömürlü bir kullanım için önemlidir. Günlük temizlik alışkanlığınıza uygun cam koruma seçenekleri de karar sürecini kolaylaştırır.\n\nERAYDUŞ uzmanları, banyonuzun ölçülerine ve yaşam tarzınıza göre en uygun sistemi belirlemenize yardımcı olur.",
    featured_image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop",
    published_at: "2026-07-01T09:00:00+03:00",
    seo_title: "Duşakabin Seçim Rehberi | ERAYDUŞ",
    seo_description: "Duşakabin seçerken ölçü, cam ve kullanım detaylarını keşfedin.",
    tags: ["Rehber", "Duşakabin"],
  },
  {
    id: "kucuk-banyo",
    title: "Küçük Banyolar İçin Ferah Tasarım Önerileri",
    slug: "kucuk-banyolar-icin-ferah-tasarim-onerileri",
    description: "Şeffaf cam yüzeyler, doğru aydınlatma ve yalın detaylarla küçük banyolarda daha geniş bir his yaratın.",
    body: "Küçük banyolarda tasarımın ana hedefi, gereksiz görsel sınırları azaltmaktır. Çerçevesiz cam yüzeyler alanın kesintisiz algılanmasına yardımcı olur.\n\nAçık tonlar, katmanlı aydınlatma ve duvar içine yerleşen depolama çözümleri günlük kullanımda büyük fark yaratır.\n\nWalk-in duş sistemleri, eşiksiz geçişleri sayesinde hem çağdaş hem de ferah bir görünüm sunar.",
    featured_image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
    published_at: "2026-06-24T09:00:00+03:00",
    seo_title: "Küçük Banyo Tasarımı | ERAYDUŞ",
    seo_description: "Küçük banyoları ferah ve işlevsel kılan tasarım önerileri.",
    tags: ["Tasarım", "Küçük Banyo"],
  },
  {
    id: "walk-in",
    title: "Walk-in Duş Sistemleri Kimler İçin Uygun?",
    slug: "walk-in-dus-sistemleri-kimler-icin-uygun",
    description: "Eşiksiz geçiş ve minimalist görünüm sunan walk-in sistemlerin avantajlarını keşfedin.",
    body: "Walk-in duş sistemleri, açık plan banyolarda kesintisiz bir görünüm oluşturur. Kapı ve eşik olmaması, hem estetik hem de erişilebilirlik açısından avantaj sağlar.\n\nDoğru eğim, cam konumu ve sabitleme detayları suyun kontrollü şekilde akmasını sağlar. Her banyo için ölçüye özel planlama önemlidir.",
    featured_image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
    published_at: "2026-06-12T09:00:00+03:00",
    seo_title: "Walk-in Duş Sistemleri | ERAYDUŞ",
    seo_description: "Walk-in duş sistemlerinin kullanım ve tasarım avantajları.",
    tags: ["Rehber", "Walk-in"],
  },
  {
    id: "cam-bakim",
    title: "Duşakabin Camını Uzun Süre Parlak Tutmanın Yolları",
    slug: "dusakabin-camini-parlak-tutmanin-yollari",
    description: "Basit günlük adımlarla cam yüzeylerde su lekesi ve kireç oluşumunu azaltın.",
    body: "Cam yüzeylerin parlaklığını korumak için duş sonrası kısa bir rutin yeterlidir. Yüzeyde kalan suyu yumuşak bir çekçekle almak, mineral birikimini önemli ölçüde azaltır.\n\nAşındırıcı olmayan temizlik ürünleri ve düzenli bakım, camın ilk günkü görünümünü korumasına yardımcı olur.",
    featured_image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop",
    published_at: "2026-05-28T09:00:00+03:00",
    seo_title: "Duşakabin Cam Bakımı | ERAYDUŞ",
    seo_description: "Duşakabin camının parlaklığını korumak için bakım önerileri.",
    tags: ["Bakım", "Duşakabin"],
  },
]

const postFields = "id, title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags"

function getSupabase() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  )
}

export const getPublishedPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("content_calendar").select(postFields).eq("content_type", "blog").eq("status", "published").not("slug", "is", null).order("published_at", { ascending: false })
    if (error) throw error
    return data?.length ? (data as BlogPost[]) : fallbackBlogPosts
  } catch (error) {
    console.error("Published blog posts could not be loaded:", error)
    return fallbackBlogPosts
  }
})

export const getPublishedPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("content_calendar").select(postFields).eq("content_type", "blog").eq("status", "published").eq("slug", slug).maybeSingle()
    if (error) throw error
    return (data as BlogPost | null) || fallbackBlogPosts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error("Blog post could not be loaded:", error)
    return fallbackBlogPosts.find((post) => post.slug === slug) || null
  }
})
