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
  Star
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
    ],
  },
  {
    title: "Vitrin",
    items: [
      { icon: Package, label: "Ürün Yönetimi", href: "/admin/products" },
      { icon: Hexagon, label: "Kumlama Modelleri", href: "/admin/kumlama-modelleri" },
      { icon: Globe, label: "Sayfa Yönetimi", href: "/admin/pages" },
      { icon: Search, label: "SEO Ayarları", href: "/admin/seo" },
      { icon: Calendar, label: "İçerik Takvimi", href: "/admin/content-calendar" },
    ],
  },
  {
    title: "Operasyon",
    items: [
      { icon: MessageSquareQuote, label: "Teklif & Sipariş", href: "/admin/quotes" },
      { icon: Star, label: "Yorumlar", href: "/admin/reviews" },
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
      className={`fixed inset-y-0 left-0 bg-[#0A0A0A] border-r border-white/5 flex flex-col z-50 font-sans transition-all duration-500 ease-in-out ${isCollapsed ? 'w-16 overflow-visible' : 'w-64 overflow-hidden'}`}
    >
      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-champagne/5 to-transparent pointer-events-none" />

      {/* Logo Area */}
      <div className={`h-16 flex items-center px-4 border-b border-white/5 shrink-0 relative z-10 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <Link href="/admin" className={`flex items-center gap-3 group ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="size-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-champagne/10 group-hover:border-champagne/30 transition-all duration-500 shrink-0">
            <Hexagon className="size-3.5 text-champagne" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-white font-medium tracking-wider text-[13px] whitespace-nowrap">ERAYDUŞ</span>
              <span className="text-[8px] font-medium tracking-[0.2em] text-white/40 uppercase whitespace-nowrap">Architecture</span>
            </div>
          )}
        </Link>
      </div>

      {/* Toggle Button */}
      <div className="absolute top-5 right-[-12px] z-50 hidden sm:block">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-[#0A0A0A] border border-white/10 rounded-full p-1 text-white/50 hover:text-white hover:border-champagne/50 transition-all hover:scale-110 shadow-xl"
        >
          {isCollapsed ? <PanelLeftOpen className="size-3.5" /> : <PanelLeftClose className="size-3.5" />}
        </button>
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="px-4 pt-4 pb-2 shrink-0 relative z-10">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-white/30 group-focus-within:text-champagne transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ara..."
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/5 hover:border-white/10 rounded-lg text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-champagne/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto py-3 space-y-5 relative z-10 px-2 
        [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20
      `}>
        <AnimatePresence>
          {!isCollapsed && filteredGroups.length === 0 && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-[13px] text-white/30 text-center py-6 font-light"
            >
              Sonuç bulunamadı.
            </motion.p>
          )}

          {filteredGroups.map((group, groupIdx) => (
            <motion.div 
              key={group.title}
              initial={false}
            >
              {!isCollapsed ? (
                <p className="px-3 mb-2 text-[9px] font-semibold uppercase tracking-widest text-white/30 whitespace-nowrap">
                  {group.title}
                </p>
              ) : (
                <div className="h-3" /> 
              )}
              
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href)
                  const Icon = item.icon
                  const linkContent = (
                    <Link
                      key={item.href}
                      href={item.href}
                          className={`relative flex items-center gap-3 rounded-lg text-[13px] transition-all duration-300 group ${
                            isCollapsed ? 'justify-center p-2.5 mx-1' : 'px-3 py-2 overflow-hidden'
                          } ${
                            active
                              ? "text-champagne font-medium"
                              : "text-white/60 hover:text-white hover:bg-white/5 font-light"
                          }`}
                        >
                          {active && (
                            <motion.div 
                              layoutId="activeTab"
                              className="absolute inset-0 bg-champagne/10 rounded-lg border border-champagne/20" 
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          
                          <Icon className={`size-4 shrink-0 transition-transform duration-300 relative z-10 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                          
                          {!isCollapsed && (
                            <span className="relative z-10 tracking-wide whitespace-nowrap">{item.label}</span>
                          )}
                        </Link>
                      )

                      if (isCollapsed) {
                        return (
                          <TooltipProvider delay={0}>
                            <Tooltip>
                              <TooltipTrigger render={linkContent} />
                              <TooltipContent side="right" sideOffset={16} className="bg-[#1A1A1A] border-white/10 text-white text-[12px] font-medium shadow-xl">
                                {item.label}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )
                      }
                      return linkContent;
                    })}
                  </div>
                </motion.div>
              ))}
        </AnimatePresence>
      </nav>

      {/* Footer Return */}
      <div className="p-4 border-t border-white/5 shrink-0 relative z-10 bg-[#0A0A0A]">
        <Link
          href="/"
          title={isCollapsed ? "Siteye Dön" : undefined}
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-medium text-white/50 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all ${isCollapsed ? 'px-0' : ''}`}
        >
          <LogOut className="size-3.5 shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Vitrin</span>}
        </Link>
      </div>
    </aside>
  )
}
