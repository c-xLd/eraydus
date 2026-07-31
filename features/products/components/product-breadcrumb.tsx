import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  name: string
  url?: string
}

export function ProductBreadcrumb({ items, className }: { items: BreadcrumbItem[], className?: string }) {
  return (
    <nav className={cn("flex text-sm text-muted-foreground", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center">
              {item.url ? (
                <Link href={item.url} className="hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.name}</span>
              )}
              {!isLast && <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
