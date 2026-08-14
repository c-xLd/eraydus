import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  name: string
  url?: string
}

export function ProductBreadcrumb({ items, className }: { items: BreadcrumbItem[], className?: string }) {
  return (
    <nav className={cn("flex items-center", className)} aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 flex-wrap text-[11px] font-mono tracking-wide">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.url && !isLast ? (
                <Link
                  href={item.url}
                  className="text-black/40 hover:text-black transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ) : (
                <span className={cn(
                  isLast ? "text-black font-medium" : "text-black/40"
                )}>
                  {item.name}
                </span>
              )}
              {!isLast && (
                <span className="text-black/20 select-none" aria-hidden="true">/</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
