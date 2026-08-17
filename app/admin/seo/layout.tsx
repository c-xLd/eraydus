'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Settings, FileText, ShoppingBag, FolderTree, 
  Wrench, Code2, LineChart, Zap, Activity, Bot
} from 'lucide-react'

const SEO_TABS = [
  { id: 'settings', label: 'Genel SEO', icon: Settings, href: '/admin/seo/settings' },
  { id: 'pages', label: 'Sayfa SEO', icon: FileText, href: '/admin/seo/pages' },
  { id: 'products', label: 'Ürün SEO', icon: ShoppingBag, href: '/admin/seo/products' },
  { id: 'categories', label: 'Kategori SEO', icon: FolderTree, href: '/admin/seo/categories' },
  { id: 'technical', label: 'Teknik SEO', icon: Wrench, href: '/admin/seo/technical' },
  { id: 'schema', label: 'Schema', icon: Code2, href: '/admin/seo/schema' },
  { id: 'search-console', label: 'Google', icon: LineChart, href: '/admin/seo/search-console' },
  { id: 'performance', label: 'Performance', icon: Zap, href: '/admin/seo/performance' },
  { id: 'audit', label: 'SEO Audit', icon: Activity, href: '/admin/seo/audit' },
  { id: 'ai', label: 'SEO AI', icon: Bot, href: '/admin/seo/ai' },
]

export default function SeoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-gray-900 tracking-tight">SEO Control Center</h1>
        <p className="text-sm text-gray-500 mt-1">Erayduş Enterprise SEO Yönetim Merkezi</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6 overflow-x-auto pb-1 hide-scrollbar">
          {SEO_TABS.map(tab => {
            const Icon = tab.icon
            const isActive = pathname.startsWith(tab.href)
            
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`
                  flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors
                  ${isActive 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <Icon className={`size-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="pt-2">
        {children}
      </div>
    </div>
  )
}
