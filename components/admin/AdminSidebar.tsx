"use client"

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
  TrendingUp
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Ürün Yönetimi", href: "/admin/products" },
  { icon: MessageSquareQuote, label: "Teklif Workflow", href: "/admin/quotes" },
  { icon: Users, label: "Müşteri Yönetimi", href: "/admin/customers" },
  { icon: Search, label: "SEO Yönetimi", href: "/admin/seo" },
  { icon: Calendar, label: "İçerik Takvimi", href: "/admin/content-calendar" },
  { icon: Bell, label: "Bildirimler", href: "/admin/notifications" },
  { icon: BarChart3, label: "Raporlar", href: "/admin/reports" },
  { icon: TrendingUp, label: "Analitikler", href: "/admin/analytics" },
  { icon: Users2, label: "Takım Yönetimi", href: "/admin/team" },
  { icon: Settings, label: "Ayarlar", href: "/admin/settings" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-2 text-black font-semibold tracking-tight text-xl">
          <Hexagon className="size-6 fill-black" />
          <span>ERAYDUŞ</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-champagne bg-champagne/10 px-2 py-0.5 rounded-full ml-1">Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== "/admin")
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-200">
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
