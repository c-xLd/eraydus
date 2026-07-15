export const dynamic = 'force-dynamic'
import type { Metadata } from "next"
import { BlogIndex } from "@/components/blog/BlogIndex"
import { getPublishedPosts } from "@/lib/data/blog"

export const metadata: Metadata = { 
  title: "Banyo Dekorasyonu ve Duşakabin Trendleri | Erayduş Blog", 
  description: "Banyo dekorasyon trendleri, şık duşakabin seçimi, nano teknoloji cam özellikleri ve uzun ömürlü kullanım için pratik temizlik rehberleri.",
  keywords: "banyo dekorasyonu, duşakabin trendleri, duşakabin seçimi, nano cam nedir, ankara duşakabin, banyo yenileme",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/blog`,
  }
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Erayduş Blog - Banyo Dekorasyonu ve Duşakabin",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/blog`,
    "description": "Tasarım kararlarını kolaylaştıran uzman rehberleri, bakım önerileri ve mekanınıza ilham verecek hikâyeler.",
    "publisher": {
      "@type": "Organization",
      "name": "Erayduş",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/images/logo.png`
      }
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <div className="bg-background">
        <section className="pt-40 pb-12 md:pt-48 md:pb-16">
          <div className="container mx-auto max-w-[1440px] px-6">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">İlham & Rehber</p>
            <h1 className="max-w-4xl text-4xl font-light tracking-tight md:text-6xl lg:text-7xl">Banyonuz için <span className="font-semibold">iyi fikirler.</span></h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">Tasarım kararlarını kolaylaştıran uzman rehberleri, bakım önerileri ve mekanınıza ilham verecek hikâyeler.</p>
          </div>
        </section>
        <BlogIndex posts={posts} />
      </div>
    </>
  )
}
