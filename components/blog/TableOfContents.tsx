'use client'

import { useEffect, useState } from 'react'
import { TocItem } from '@/lib/blog-utils'

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto no-scrollbar hidden xl:block w-64 pr-6">
      <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">İçindekiler</h4>
      <nav className="flex flex-col gap-2.5 border-l-2 border-border/40 pl-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`text-sm transition-colors block leading-tight ${
              activeId === item.id 
                ? 'text-champagne font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            } ${item.level === 3 ? 'ml-3 text-xs' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
              window.history.pushState(null, '', `#${item.id}`)
            }}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
