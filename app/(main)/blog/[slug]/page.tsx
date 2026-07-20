import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CalendarDays, Share2, ShieldCheck, Tag } from "lucide-react"
import { notFound } from "next/navigation"

import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/data/blog"
import { getArticleSchema, getBreadcrumbSchema, getHowToSchema, getGraphSchema } from "@/lib/seo/schemas"

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

  const paragraphs = (post.body || post.description || "").split(/\n\s*\n/).filter(Boolean)

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
    url: `/blog/${post.slug}`,
    authorName: 'Erayduş Uzman Ekibi',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />

      <article className="bg-background pb-32 pt-32 md:pb-44 md:pt-40 min-h-screen">
        <div className="container mx-auto max-w-4xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Tüm Rehberlere Dön
          </Link>

          <header className="mt-10">
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
              <span className="inline-flex items-center gap-1.5 text-champagne font-semibold">
                <ShieldCheck className="size-4" />
                ERAYDUŞ Uzman Makalesi
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3.5" />
                {formatDate(post.published_at)}
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
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-3.5 py-1 text-xs font-medium text-muted-foreground border border-border/50"
                  >
                    <Tag className="w-3 h-3 text-champagne" />
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          {post.featured_image && (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/30">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-12 max-w-3xl space-y-6 text-base md:text-lg font-light leading-relaxed text-foreground/90">
            {paragraphs.map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl md:text-2xl font-medium tracking-tight text-foreground pt-6 border-t border-border/40">
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n- ')
                return (
                  <ul key={index} className="list-disc pl-6 space-y-2 text-muted-foreground">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                )
              }
              return <p key={index}>{paragraph}</p>
            })}
          </div>

          {/* AUTHOR & EEAT BOX */}
          <div className="mt-16 rounded-2xl border border-border/60 bg-muted/20 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-champagne/20 text-champagne font-bold text-lg flex items-center justify-center border border-champagne/40">
                E
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground">ERAYDUŞ Mimarlık & Mühendislik Ekibi</h4>
                <p className="text-xs text-muted-foreground">Ankara Ostim OSB Fabrika Teknik Kadrosu</p>
              </div>
            </div>

            <Link
              href="/tasarla"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium text-xs rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Özel Ölçü Danışmanlığı Alın
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
