"use client"

import { useMemo, useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CalendarDays, Search, Sparkles, Tag } from "lucide-react"

import { slugifyTag, type BlogPost } from "@/lib/data/blog"

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
                <img
                  src={featured.featured_image}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
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
              {featured.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70"
                    >
                      <Tag className="size-3 text-champagne" /> {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-champagne">
                Yazıyı keşfet <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <section className="pb-32 md:pb-44">
        <div className="container mx-auto max-w-[1440px] px-6">
          <div className="flex flex-col justify-between gap-4 border-t border-border py-8 lg:flex-row lg:items-center">
            {/* Tag chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    activeTag === tag
                      ? "bg-foreground text-background"
                      : "bg-surface text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search */}
            <label className="flex h-11 w-full max-w-sm items-center gap-3 rounded-full border border-border bg-background px-4 text-muted-foreground focus-within:border-foreground">
              <Search className="size-4" />
              <span className="sr-only">Yazılarda ara</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Yazılarda ara"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </label>
          </div>

          {/* Active tag badge + clear */}
          {activeTag !== "Tümü" && (
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-champagne/10 border border-champagne/25 px-3.5 py-1.5 text-sm font-medium text-champagne">
                <Tag className="size-3.5" /> {activeTag}
              </span>
              <button
                onClick={() => handleTagClick("Tümü")}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                × Temizle
              </button>
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
                    <div className="aspect-[4/3] overflow-hidden">
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
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
