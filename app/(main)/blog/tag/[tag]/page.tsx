import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, CalendarDays, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getAllTags, getPostsByTag, slugifyTag } from '@/lib/data/blog'

type Props = { params: Promise<{ tag: string }> }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

const formatDate = (date: string | null) =>
  date ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date)) : ''

export async function generateStaticParams() {
  const tags = await getAllTags()
  const slugified = tags.map(tag => ({ tag: slugifyTag(tag) }))
  const raw = tags.map(tag => ({ tag: encodeURIComponent(tag) }))
  return [...slugified, ...raw]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = await getPostsByTag(decoded)
  const matchedTag = posts[0]?.tags?.find(t => slugifyTag(t) === slugifyTag(decoded) || t === decoded) || decoded

  return {
    title: `"${matchedTag}" Yazıları | Erayduş Blog`,
    description: `Erayduş blog'unda "${matchedTag}" etiketiyle yayınlanmış tüm uzman yazıları ve rehberler.`,
    alternates: { canonical: `${SITE_URL}/blog/tag/${slugifyTag(matchedTag)}` },
  }
}

export default async function BlogTagPage({ params }: Props) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = await getPostsByTag(decoded)
  const allTags = await getAllTags()

  if (posts.length === 0) notFound()

  const activeTag = posts[0]?.tags?.find(t => slugifyTag(t) === slugifyTag(decoded) || t === decoded) || decoded

  return (
    <div className="bg-background min-h-screen pb-32 pt-32 md:pt-40">
      <div className="container mx-auto max-w-[1440px] px-6">

        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="size-4" /> Tüm Yazılar
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <p className="text-champagne text-sm tracking-[0.3em] uppercase font-medium mb-3">Etiket</p>
          <div className="flex items-center gap-3 mb-4">
            <Tag className="size-7 text-champagne" />
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              <span className="font-semibold">{activeTag}</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg font-light">
            Bu etiketle <span className="text-foreground font-medium">{posts.length}</span> yazı bulundu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Posts */}
          <div className="lg:col-span-3">
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
              {posts.map(post => (
                <article key={post.id} className="group flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl bg-surface">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {post.featured_image
                        ? <Image src={post.featured_image} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        : <div className="h-full w-full bg-surface flex items-center justify-center"><span className="text-xs text-muted-foreground uppercase tracking-widest opacity-50">Görsel Yok</span></div>
                      }
                    </div>
                  </Link>
                  <div className="pt-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="size-4" />
                      {formatDate(post.published_at)}
                    </div>
                    <h2 className="mt-3 text-xl font-semibold tracking-tight transition-colors group-hover:text-champagne">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-muted-foreground flex-1">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags?.map(t => {
                        const isMatch = slugifyTag(t) === slugifyTag(activeTag)
                        return (
                          <Link
                            key={t}
                            href={`/blog/tag/${slugifyTag(t)}`}
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium border transition-colors ${
                              isMatch
                                ? 'bg-champagne/20 text-champagne border-champagne/30'
                                : 'bg-surface text-muted-foreground border-border/50 hover:border-champagne/30 hover:text-champagne'
                            }`}
                          >
                            <Tag className="size-3" />{t}
                          </Link>
                        )
                      })}
                    </div>
                    <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                      Devamını oku <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar: tüm etiketler */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">Tüm Etiketler</h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map(t => {
                  const isMatch = slugifyTag(t) === slugifyTag(activeTag)
                  return (
                    <Link
                      key={t}
                      href={`/blog/tag/${slugifyTag(t)}`}
                      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
                        isMatch
                          ? 'bg-foreground text-background border-foreground'
                          : 'bg-surface text-foreground border-border/50 hover:bg-foreground hover:text-background hover:border-foreground'
                      }`}
                    >
                      {t}
                    </Link>
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
