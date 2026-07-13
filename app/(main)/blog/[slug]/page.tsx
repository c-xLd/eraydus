import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"
import { notFound } from "next/navigation"

import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/data/blog"

type Props = { params: Promise<{ slug: string }> }
const formatDate = (date: string | null) => date ? new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date)) : ""

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) return {}
  return { 
    title: post.seo_title || `${post.title} | Erayduş Blog`, 
    description: post.seo_description || post.description || undefined, 
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/blog/${slug}`,
    },
    openGraph: post.featured_image ? { 
      title: post.seo_title || post.title,
      description: post.seo_description || post.description || undefined,
      images: [{ url: post.featured_image, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: post.published_at || undefined
    } : undefined 
  }
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) notFound()
  const paragraphs = (post.body || post.description || "").split(/\n\s*\n/).filter(Boolean)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.featured_image ? [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}${post.featured_image}`] : [],
    "datePublished": post.published_at,
    "dateModified": post.published_at,
    "author": {
      "@type": "Organization",
      "name": "Erayduş"
    },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className="bg-background pb-32 pt-32 md:pb-44 md:pt-40">
        <div className="container mx-auto max-w-4xl px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="size-4" />Blog&apos;a dön</Link>
          <header className="mt-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4" />{formatDate(post.published_at)}</div>
            <h1 className="mt-6 text-4xl font-light tracking-tight md:text-6xl lg:text-7xl">{post.title}</h1>
            {post.description && <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">{post.description}</p>}
            {post.tags?.length ? <div className="mt-8 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-surface px-3 py-1 text-sm text-muted-foreground">{tag}</span>)}</div> : null}
          </header>
          {post.featured_image && <img src={post.featured_image} alt={post.title} className="mt-12 aspect-[16/9] w-full rounded-2xl object-cover" />}
          <div className="mt-12 max-w-3xl space-y-6 text-lg font-light leading-8 text-foreground/80">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        </div>
      </article>
    </>
  )
}
