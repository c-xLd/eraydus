"use client"

import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
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
  Globe,
  PanelLeftClose,
  PanelLeftOpen,
  Star,
  Mail,
  FileText,
  Image as ImageIcon
} from "lucide-react"

type NavItem = {
  icon: typeof LayoutDashboard
  label: string
  href: string
}

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Sistem",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
      { icon: Building2, label: "Proje Yönetimi", href: "/admin/projeler" },
      { icon: Globe, label: "Canlı Radar", href: "/admin/live-radar" },
      { icon: MessageSquareQuote, label: "Canlı Destek", href: "/admin/chat" },
    ],
  },
  {
    title: "Vitrin",
    items: [
      { icon: Package, label: "Ürün Yönetimi", href: "/admin/products" },
      { icon: ImageIcon, label: "Ortam Kütüphanesi", href: "/admin/media" },
      { icon: Hexagon, label: "Kumlama Modelleri", href: "/admin/kumlama-modelleri" },
      { icon: Globe, label: "Sayfa Yönetimi", href: "/admin/pages" },
      { icon: Search, label: "SEO Ayarları", href: "/admin/seo" },
      { icon: FileText, label: "Blog Yönetimi", href: "/admin/blog" },
    ],
  },
  {
    title: "Operasyon",
    items: [
      { icon: MessageSquareQuote, label: "Teklif & Sipariş", href: "/admin/quotes" },
      { icon: Mail, label: "Mesajlar", href: "/admin/messages" },
      { icon: Star, label: "Google Yorumları", href: "/admin/testimonials" },
      { icon: Star, label: "Ürün Yorumları", href: "/admin/reviews" },
      { icon: Users, label: "Müşteri Ağı", href: "/admin/customers" },
      { icon: Bell, label: "Bildirimler", href: "/admin/notifications" },
    ],
  },
  {
    title: "Yönetim",
    items: [
      { icon: BarChart3, label: "Performans Raporu", href: "/admin/reports" },
      { icon: TrendingUp, label: "Analitikler", href: "/admin/analytics" },
      { icon: Users2, label: "Yetkili Ekip", href: "/admin/team" },
      { icon: Settings, label: "Platform Ayarları", href: "/admin/settings" },
    ],
  },
]

interface AdminSidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (val: boolean) => void
}

export function AdminSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const [tooltip, setTooltip] = useState<{ text: string, top: number } | null>(null)

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
    <aside 
      className={`fixed inset-y-0 left-0 bg-[#09090b] border-r border-white/10 flex flex-col z-50 font-sans transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isCollapsed ? 'w-16 overflow-visible' : 'w-[260px] overflow-hidden'}`}
    >
      {/* Logo Area */}
      <div className={`h-16 flex items-center px-4 shrink-0 relative z-10 transition-all ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <Link href="/admin" className={`flex items-center gap-3 group ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="size-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0 shadow-sm">
            <Hexagon className="size-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-white font-semibold tracking-wide text-sm whitespace-nowrap">ERAYDUŞ</span>
              <span className="text-[9px] font-medium tracking-[0.15em] text-white/50 uppercase whitespace-nowrap">Architecture</span>
            </div>
          )}
        </Link>
      </div>

      {/* Toggle Button */}
      <div className="absolute top-5 right-[-14px] z-50 hidden sm:block">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-[#09090b] border border-white/10 rounded-full p-1.5 text-white/50 hover:text-white transition-all shadow-md hover:scale-105 active:scale-95"
        >
          {isCollapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="px-4 py-3 shrink-0 relative z-10">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/30 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ara..."
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-transparent rounded-lg text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-medium shadow-inner"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto py-2 space-y-6 relative z-10 px-3 
        [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20
      `}>
        <AnimatePresence>
          {!isCollapsed && filteredGroups.length === 0 && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-[13px] text-white/40 text-center py-6 font-medium"
            >
              Sonuç bulunamadı.
            </motion.p>
          )}

          {filteredGroups.map((group) => (
            <motion.div 
              key={group.title}
              initial={false}
              className="space-y-1"
            >
              {!isCollapsed ? (
                <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-white/40 whitespace-nowrap">
                  {group.title}
                </p>
              ) : (
                <div className="h-4" /> 
              )}
              
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href)
                  const Icon = item.icon
                  const linkContent = (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative flex items-center gap-3 rounded-xl text-[13px] transition-colors group ${
                        isCollapsed ? 'justify-center p-2.5 mx-auto w-10 h-10' : 'px-3 py-2'
                      } ${
                        active
                          ? "text-white font-medium"
                          : "text-white/60 hover:text-white hover:bg-white/5 font-medium"
                      }`}
                    >
                      {active && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white/10 rounded-xl pointer-events-none"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      
                      <Icon className={`size-4 shrink-0 transition-transform relative z-10 ${active ? 'scale-105' : 'group-hover:scale-105'} ${active ? 'text-white' : 'text-white/60 group-hover:text-white'}`} strokeWidth={active ? 2.5 : 2} />
                      
                      {!isCollapsed && (
                        <span className="relative z-10 tracking-tight whitespace-nowrap">{item.label}</span>
                      )}
                    </Link>
                  )

                  if (isCollapsed) {
                    return (
                      <TooltipProvider key={item.href} delay={0}>
                        <Tooltip>
                          <TooltipTrigger render={linkContent} />
                          <TooltipContent side="right" sideOffset={16} className="bg-[#09090b] border-white/10 text-white text-[12px] font-semibold px-3 py-1.5 shadow-xl rounded-lg">
                            {item.label}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )
                  }
                  return <div key={item.href}>{linkContent}</div>;
                })}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </nav>

      {/* Footer Return */}
      <div className="p-4 border-t border-white/10 shrink-0 relative z-10 bg-[#09090b]">
        <Link
          href="/"
          title={isCollapsed ? "Siteye Dön" : undefined}
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all ${isCollapsed ? 'px-0' : ''}`}
        >
          <LogOut className="size-4 shrink-0" strokeWidth={2.5} />
          {!isCollapsed && <span className="whitespace-nowrap tracking-wide">Vitrin'e Dön</span>}
        </Link>
      </div>
    </aside>
  )
}

