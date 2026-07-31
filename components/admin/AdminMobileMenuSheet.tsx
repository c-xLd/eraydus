"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  X, Settings, FileText, BarChart, Bell, Target, Star, LogOut,
  LayoutDashboard, Building2, Package, Hexagon, Globe, Search,
  Calendar, MessageSquareQuote, Users, BarChart3, TrendingUp, Users2, Image as ImageIcon
} from "lucide-react"

interface AdminMobileMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const navGroups = [
  {
    title: "Sistem",
    items: [
      { icon: Building2, label: "Proje Yönetimi", href: "/admin/projeler" },
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
      { icon: Star, label: "Yorumlar", href: "/admin/reviews" },
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
  }
]

export function AdminMobileMenuSheet({ isOpen, onClose }: AdminMobileMenuSheetProps) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || (pathname.startsWith(`${href}/`) && href !== "/admin")

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 bg-blueprint-950/40 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-[70] bg-blueprint-950 rounded-t-3xl shadow-2xl flex flex-col pb-[env(safe-area-inset-bottom)] max-h-[85vh] overflow-hidden"
          >
            {/* Handle Bar */}
            <div className="w-full flex justify-center pt-3 pb-2 touch-none cursor-pointer" onClick={onClose}>
              <div className="w-12 h-1.5 bg-blueprint-600/20 rounded-full" />
            </div>

            <div className="px-6 pb-4 flex items-center justify-between border-b border-blueprint-800/50">
              <h2 className="text-xl font-bold text-blueprint-500 font-mono">Tüm Menüler</h2>
              <button onClick={onClose} className="p-2 -mr-2 text-blueprint-400/60 hover:text-white bg-blueprint-600/20 rounded-full transition-colors">
                <X className="size-5" strokeWidth={2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-6">
              {navGroups.map((group, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-[10px] font-bold text-blueprint-400/50 uppercase tracking-wider px-4">
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((link) => {
                      const Icon = link.icon
                      const active = isActive(link.href)
                      return (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={onClose}
                          className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                            active
                              ? "bg-blueprint-600/20 text-blueprint-500 font-bold"
                              : "text-blueprint-400/60 hover:bg-blueprint-600/10 hover:text-white font-medium"
                          }`}
                        >
                          <Icon className={`size-5 ${active ? "text-blueprint-500" : "text-blueprint-400/60 hover:text-white"}`} strokeWidth={active ? 2.5 : 2} />
                          <span className={`text-sm ${active ? "font-semibold" : ""}`}>
                            {link.label}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}

              <div className="mt-8 pt-6 border-t border-blueprint-800/50 pb-4">
                <button className="flex items-center gap-4 px-4 py-4 w-full text-red-500 font-hover:bg-red-500/10 rounded-2xl transition-colors">
                  <LogOut className="size-5" strokeWidth={2.5} />
                  <span className="text-sm">Çıkış Yap</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}