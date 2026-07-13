"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MessageSquareQuote,
  Package,
  Settings,
  LogOut,
  Hexagon,
  Search,
  Users,
  BarChart3,
  Calendar,
  Bell,
  Users2,
  TrendingUp,
  Building2,
} from "lucide-react"

type NavItem = {
  icon: typeof LayoutDashboard
  label: string
  href: string
}

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Genel",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
      { icon: Building2, label: "Proje Yönetimi", href: "/admin/projeler" },
    ],
  },
  {
    title: "Ürün & İçerik",
    items: [
      { icon: Package, label: "Ürün Yönetimi", href: "/admin/products" },
      { icon: Hexagon, label: "Kumlama Modelleri", href: "/admin/kumlama-modelleri" },
      { icon: Search, label: "SEO Yönetimi", href: "/admin/seo" },
      { icon: Calendar, label: "İçerik Takvimi", href: "/admin/content-calendar" },
    ],
  },
  {
    title: "Satış & CRM",
    items: [
      { icon: MessageSquareQuote, label: "Teklif Workflow", href: "/admin/quotes" },
      { icon: Users, label: "Müşteri Yönetimi", href: "/admin/customers" },
      { icon: Bell, label: "Bildirimler", href: "/admin/notifications" },
    ],
  },
  {
    title: "Analiz & Yönetim",
    items: [
      { icon: BarChart3, label: "Raporlar", href: "/admin/reports" },
      { icon: TrendingUp, label: "Analitikler", href: "/admin/analytics" },
      { icon: Users2, label: "Takım Yönetimi", href: "/admin/team" },
      { icon: Settings, label: "Ayarlar", href: "/admin/settings" },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [query, setQuery] = useState("")

  const q = query.trim().toLowerCase()
  const filteredGroups = q
    ? navGroups
        .map((g) => ({
          ...g,
          items: g.items.filter((i) => i.label.toLowerCase().includes(q)),
        }))
        .filter((g) => g.items.length > 0)
    : navGroups

  const isActive = (href: string) =>
    pathname === href || (pathname.startsWith(`${href}/`) && href !== "/admin")

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
        <Link href="/admin" className="flex items-center gap-2 text-black font-semibold tracking-tight text-xl">
          <Hexagon className="size-6 fill-black" />
          <span>ERAYDUŞ</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-champagne bg-champagne/10 px-2 py-0.5 rounded-full ml-1">Admin</span>
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Menüde ara..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-5">
        {filteredGroups.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">&ldquo;{query}&rdquo; için sonuç yok.</p>
        )}

        {filteredGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r bg-champagne" />
                    )}
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / User + Logout */}
      <div className="p-4 border-t border-gray-200 shrink-0">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="size-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
            A
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-sm font-medium text-gray-900 truncate">Admin</span>
            <span className="text-[11px] text-gray-500 truncate">Yönetici</span>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="size-4" />
          Siteye Dön
        </Link>
      </div>
    </aside>
  )
}
