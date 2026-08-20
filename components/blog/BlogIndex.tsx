"use client"

import { useMemo, useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CalendarDays, Search, Sparkles, Tag } from "lucide-react"

import type { BlogPost } from "@/lib/data/blog"
import { generateSlug as slugifyTag } from "@/lib/utils"

const formatDate = (date: string | null) =>
  date
    ? new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date))
    : ""

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const urlTag = searchParams.get("tag") ?? "Tümü"
  const [activeTag, setActiveTag] = useState(urlTag)
  const [query, setQuery] = useState("")

  // URL'deki tag değişirse state'i güncelle
  useEffect(() => {
    setActiveTag(searchParams.get("tag") ?? "Tümü")
  }, [searchParams])

  const tags = ["Tümü", ...Array.from(new Set(posts.flatMap((p) => p.tags ?? [])))]
  const featured = posts[0]

  const filteredPosts = useMemo(
    () =>
      posts.slice(1).filter((post) => {
        const matchesTag = activeTag === "Tümü" || post.tags?.includes(activeTag)
        const searchable = `${post.title} ${post.description ?? ""} ${(post.tags ?? []).join(" ")}`.toLocaleLowerCase("tr-TR")
        return matchesTag && searchable.includes(query.toLocaleLowerCase("tr-TR"))
      }),
    [activeTag, posts, query]
  )

  function handleTagClick(tag: string) {
    setActiveTag(tag)
    const params = new URLSearchParams(searchParams.toString())
    if (tag === "Tümü") {
      params.delete("tag")
    } else {
      params.set("tag", tag)
    }
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false })
  }

  if (!featured) return null

  return (
    <>
      {/* ── Featured ── */}
      <section className="pb-14 md:pb-20">
        <div className="container mx-auto max-w-[1440px] px-6">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-[2rem] bg-surface-dark text-white lg:grid-cols-[1.05fr_.95fr]"
          >
            <div className="relative min-h-[360px] overflow-hidden lg:min-h-[520px]">
              {featured.featured_image ? (
                <Image
                  src={featured.featured_image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-dark">
                  <span className="text-xs uppercase tracking-widest text-white/30">Görsel Yok</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent lg:hidden" />
              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-medium backdrop-blur-md">
                <Sparkles className="size-3.5 text-champagne" /> Öne çıkan yazı
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <div className="flex items-center gap-2 text-sm text-white/55">
                <CalendarDays className="size-4" /> {formatDate(featured.published_at)}
              </div>
              <h2 className="mt-7 text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/65 sm:text-lg">
                {featured.description}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-champagne">
                Devamını Oku <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Filter Bar & Search ── */}
      <section className="sticky top-20 z-30 border-y border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
          {/* Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none md:pb-0">
            {allTags.map((tag) => {
              const active = activeTag === tag
              return (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition ${
                    active
                      ? "bg-foreground text-background shadow-sm"
                      : "bg-surface text-muted-foreground hover:bg-surface/80 hover:text-foreground"
                  }`}
                >
                  <Tag className="size-3 opacity-60" /> {tag}
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Yazılarda ara..."
              className="h-10 w-full rounded-full border border-border/60 bg-surface/50 pl-9 pr-4 text-xs font-light text-foreground placeholder:text-muted-foreground focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
            />
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1440px] px-6">
          {activeTag !== "Tümü" && (
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">“{activeTag}”</span> etiketine ait yazılar ({filteredPosts.length})
              </p>
              <Link
                href={`/blog/tag/${slugifyTag(activeTag)}`}
                className="text-xs text-champagne hover:underline ml-1"
              >
                Etiket sayfasını aç →
              </Link>
            </div>
          )}

          {filteredPosts.length ? (
            <div className="grid gap-x-8 gap-y-14 pt-2 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article key={post.id} className="group flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl bg-surface">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {post.featured_image ? (
                        <Image
                          src={post.featured_image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-surface">
                          <span className="text-xs uppercase tracking-widest text-muted-foreground opacity-50">Görsel Yok</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="pt-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="size-4" />
                      {formatDate(post.published_at)}
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight transition-colors group-hover:text-champagne">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-3 line-clamp-3 font-light leading-relaxed text-muted-foreground flex-1">
                      {post.description}
                    </p>
                    {/* Tag links */}
                    {post.tags?.length ? (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium border transition-colors ${
                              activeTag === tag
                                ? "bg-champagne/15 text-champagne border-champagne/30"
                                : "bg-surface text-muted-foreground border-border/50 hover:border-champagne/30 hover:text-champagne"
                            }`}
                          >
                            <Tag className="size-3" /> {tag}
                          </button>
                        ))}
                      </div>
                    ) : null}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium"
                    >
                      Devamını oku <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-xl font-light">Aramanızla eşleşen bir yazı bulunamadı.</p>
              <button
                onClick={() => { handleTagClick("Tümü"); setQuery("") }}
                className="mt-4 text-sm font-medium text-champagne"
              >
                Filtreleri temizle
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
