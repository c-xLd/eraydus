import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Tag } from 'lucide-react'
import type { BlogPost } from '@/lib/data/blog'
import { slugifyTag } from '@/lib/data/blog'

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) return null

  const formatDate = (date: string | null) =>
    date
      ? new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date))
      : ""

  return (
    <div className="mt-20 pt-16 border-t border-border/40">
      <h3 className="text-2xl font-light tracking-tight text-foreground mb-8">İlginizi Çekebilir</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-border/40 bg-card overflow-hidden hover:border-champagne/40 transition-colors"
          >
            <div className="relative aspect-[16/10] bg-muted/30 overflow-hidden">
              {post.featured_image ? (
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                  <span className="font-bold text-2xl">ERAYDUŞ</span>
                </div>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[10px] font-medium text-foreground uppercase tracking-widest border border-border/50">
                    {post.tags[0]}
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-5 flex flex-col justify-between">
              <div>
                <time className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                  {formatDate(post.published_at)}
                </time>
                <h4 className="text-lg font-medium tracking-tight text-foreground leading-snug line-clamp-2 group-hover:text-champagne transition-colors">
                  {post.title}
                </h4>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-champagne">
                <span className="flex-1">Makaleyi Oku</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
