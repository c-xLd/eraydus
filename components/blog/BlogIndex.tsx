"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, CalendarDays, Search, Sparkles } from "lucide-react"
import Image from "next/image"

import type { BlogPost } from "@/lib/data/blog"

const formatDate = (date: string | null) => date ? new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date)) : ""

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [activeTag, setActiveTag] = useState("Tümü")
  const [query, setQuery] = useState("")
  const tags = ["Tümü", ...Array.from(new Set(posts.flatMap((post) => post.tags ?? [])))]
  const featured = posts[0]
  const filteredPosts = useMemo(() => posts.slice(1).filter((post) => {
    const matchesTag = activeTag === "Tümü" || post.tags?.includes(activeTag)
    const searchable = `${post.title} ${post.description ?? ""} ${(post.tags ?? []).join(" ")}`.toLocaleLowerCase("tr-TR")
    return matchesTag && searchable.includes(query.toLocaleLowerCase("tr-TR"))
  }), [activeTag, posts, query])

  if (!featured) return null

  return <>
    <section className="pb-14 md:pb-20"><div className="container mx-auto max-w-[1440px] px-6">
      <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[2rem] bg-surface-dark text-white lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative min-h-[360px] overflow-hidden lg:min-h-[520px]">
          {featured.featured_image ? (
            <Image src={featured.featured_image} alt={featured.title} fill sizes="100vw" priority className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          ) : (
            <div className="absolute inset-0 h-full w-full bg-surface-dark flex items-center justify-center">
              <span className="text-xs text-white/30 uppercase tracking-widest">Görsel Yok</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent lg:hidden" />
          <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-medium backdrop-blur-md"><Sparkles className="size-3.5 text-champagne" /> Öne çıkan yazı</div>
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <div className="flex items-center gap-2 text-sm text-white/55"><CalendarDays className="size-4" /> {formatDate(featured.published_at)}</div>
          <h2 className="mt-7 text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">{featured.title}</h2>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/65 sm:text-lg">{featured.description}</p>
          <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-champagne">Yazıyı keşfet <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
        </div>
      </Link>
    </div></section>

    <section className="pb-32 md:pb-44"><div className="container mx-auto max-w-[1440px] px-6">
      <div className="flex flex-col justify-between gap-6 border-t border-border py-8 lg:flex-row lg:items-center">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">{tags.map((tag) => <button key={tag} onClick={() => setActiveTag(tag)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${activeTag === tag ? "bg-foreground text-background" : "bg-surface text-foreground hover:bg-foreground hover:text-background"}`}>{tag}</button>)}</div>
        <label className="flex h-11 w-full max-w-sm items-center gap-3 rounded-full border border-border bg-background px-4 text-muted-foreground focus-within:border-foreground"><Search className="size-4" /><span className="sr-only">Yazılarda ara</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Yazılarda ara" className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" /></label>
      </div>
      {filteredPosts.length ? <div className="grid gap-x-8 gap-y-14 pt-10 md:grid-cols-2 lg:grid-cols-3">{filteredPosts.map((post) => <article key={post.id} className="group flex flex-col"><Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl bg-surface"><div className="relative aspect-[4/3] overflow-hidden">{post.featured_image ? <Image src={post.featured_image} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /> : <div className="h-full w-full bg-surface flex items-center justify-center"><span className="text-xs text-muted-foreground uppercase tracking-widest opacity-50">Görsel Yok</span></div>}</div></Link><div className="pt-5"><div className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4" />{formatDate(post.published_at)}</div><h2 className="mt-4 text-2xl font-semibold tracking-tight transition-colors group-hover:text-champagne"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p className="mt-3 line-clamp-3 font-light leading-relaxed text-muted-foreground">{post.description}</p><Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Devamını oku <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link></div></article>)}</div> : <div className="py-24 text-center"><p className="text-xl font-light">Aramanızla eşleşen bir yazı bulunamadı.</p><button onClick={() => { setActiveTag("Tümü"); setQuery("") }} className="mt-4 text-sm font-medium text-champagne">Filtreleri temizle</button></div>}
    </div></section>
  </>
}
