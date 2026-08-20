import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CalendarDays, Share2, ShieldCheck, Tag, Clock } from "lucide-react"
import { notFound } from "next/navigation"

import { getPublishedPostBySlug, getPublishedPosts, slugifyTag, getRelatedPosts } from "@/lib/data/blog"
import { getArticleSchema, getBreadcrumbSchema, getHowToSchema, getGraphSchema, serializeJsonLd } from "@/lib/seo/schemas"
import { parseHtmlForToc, calculateReadingTime } from "@/lib/blog-utils"
import TableOfContents from "@/components/blog/TableOfContents"
import ShareButtons from "@/components/blog/ShareButtons"
import RichTextRenderer from "@/components/blog/RichTextRenderer"
import RelatedPosts from "@/components/blog/RelatedPosts"

type Props = { params: Promise<{ slug: string }> }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

const formatDate = (date: string | null) =>
  date
    ? new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date))
    : ""

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) return {}

  const canonicalUrl = `${SITE_URL}/blog/${slug}`

  return {
    title: post.seo_title || `${post.title} | Erayduş Uzman Rehberi`,
    description: post.seo_description || post.description || undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.description || undefined,
      url: canonicalUrl,
      images: post.featured_image ? [{ url: post.featured_image, width: 1200, height: 630, alt: post.title }] : [],
      type: 'article',
      publishedTime: post.published_at || undefined,
      siteName: 'ERAYDUŞ',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo_title || post.title,
      description: post.seo_description || post.description || undefined,
    },
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

  // Process HTML for TOC and Reading Time
  const rawHtml = post.body || post.description || ""
  const { htmlWithIds, toc } = parseHtmlForToc(rawHtml)
  const readingTime = calculateReadingTime(rawHtml)
  const relatedPosts = await getRelatedPosts(post.slug, post.tags, 3)

  const breadcrumbs = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs)
  const articleSchema = getArticleSchema({
    title: post.title,
    description: post.description || post.title,
    image: post.featured_image || `${SITE_URL}/images/og-default.jpg`,
    publishedAt: post.published_at || new Date().toISOString(),
    modifiedAt: post.updated_at || post.published_at || undefined,
    url: `/blog/${post.slug}`,
  })

  let howToSchema = null
  if (post.slug === 'dusakabin-olculeri-nasil-alinir') {
    howToSchema = getHowToSchema(
      "Duşakabin Ölçüsü Nasıl Alınır?",
      "Hatasız duşakabin siparişi için duvar genişliği, yükseklik ve şakül eğimi ölçüm adımları.",
      [
        { name: "1. Duvardan Duvara Genişlik Ölçümü", text: "Seramik kaplı duvardan karşı duvara taban, orta ve tavan hizasında 3 ölçü alın. En küçük ölçüyü kaydedin." },
        { name: "2. Yükseklik Belirleme", text: "Zeminden veya duş teknesinden yukarı doğru standart 190 cm - 200 cm yükseklik mesafesini ölçün." },
        { name: "3. Duvar Eğimi Kontrolü", text: "Su terazisi ile duvarların dikliğini kontrol ederek kaçıklık miktarını not edin." }
      ]
    )
  }

  const graphSchema = getGraphSchema([breadcrumbSchema, articleSchema, howToSchema])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graphSchema) }} />

      <article className="bg-background pb-32 pt-32 md:pb-44 md:pt-40 min-h-screen">
        <div className="container mx-auto max-w-6xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Tüm Rehberlere Dön
          </Link>

          <header className="mt-10 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
              <span className="inline-flex items-center gap-1.5 text-champagne font-semibold">
                <ShieldCheck className="size-4" />
                ERAYDUŞ Rehberi
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3.5" />
                {formatDate(post.published_at)}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {readingTime} Dk Okuma
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-light tracking-tight md:text-5xl lg:text-6xl text-foreground leading-[1.15]">
              {post.title}
            </h1>

            {post.description && (
              <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground md:text-xl border-l-2 border-champagne pl-4">
                {post.description}
              </p>
            )}

            {post.tags?.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${slugifyTag(tag)}`}
                    className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-3.5 py-1 text-xs font-medium text-muted-foreground border border-border/50 hover:border-champagne/40 hover:text-champagne transition-colors"
                  >
                    <Tag className="w-3 h-3 text-champagne" />
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}
          </header>

          {post.featured_image && (
            <div className="relative mt-10 max-w-5xl mx-auto aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/30">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-12 flex flex-col xl:flex-row gap-12 max-w-6xl mx-auto relative items-start">
            
            {/* Table of Contents - Left Sidebar */}
            <div className="hidden xl:block w-64 shrink-0">
              <TableOfContents items={toc} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 max-w-3xl min-w-0">
              {/* Mobile TOC */}
              <div className="xl:hidden mb-10 p-6 rounded-2xl border border-border/60 bg-muted/10">
                <TableOfContents items={toc} />
              </div>

              <div className="prose prose-neutral dark:prose-invert prose-headings:font-light prose-headings:tracking-tight prose-a:text-champagne hover:prose-a:text-champagne/80 prose-img:rounded-2xl prose-img:border prose-img:border-border/40 max-w-none text-base md:text-lg font-light leading-relaxed text-foreground/90">
                <RichTextRenderer html={htmlWithIds} />
              </div>

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t border-border/40">
                <ShareButtons title={post.title} />
              </div>

              {/* AUTHOR & EEAT BOX */}
              <div className="mt-16 rounded-2xl border border-border/60 bg-muted/20 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne/20 text-champagne font-bold text-lg flex items-center justify-center border border-champagne/40">
                    E
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">ERAYDUŞ Editoryal İçeriği</h4>
                    <p className="text-xs text-muted-foreground">Ürün ve uygulama bilgileri temel alınarak hazırlanmıştır.</p>
                  </div>
                </div>

                <Link
                  href="/tasarla"
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium text-xs rounded-lg hover:bg-foreground/90 transition-colors shrink-0"
                >
                  Özel Ölçü Danışmanlığı Alın
                </Link>
              </div>

              {/* Related Posts */}
              <RelatedPosts posts={relatedPosts} />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

