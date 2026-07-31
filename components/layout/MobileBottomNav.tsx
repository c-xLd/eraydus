'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Layers, Sparkles, FolderKanban, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileBottomNavProps {
  onOpenMenu: () => void
}

export function MobileBottomNav({ onOpenMenu }: MobileBottomNavProps) {
  const pathname = usePathname()

  const tabs = [
    {
      id: 'home',
      label: 'Anasayfa',
      href: '/',
      icon: Home,
      exact: true,
    },
    {
      id: 'products',
      label: 'Ürünler',
      href: '/urunler',
      icon: Layers,
      exact: false,
    },
    {
      id: 'customizer',
      label: '3D Tasarla',
      href: '/tasarla',
      icon: Sparkles,
      exact: false,
      featured: true,
    },
    {
      id: 'projects',
      label: 'Projeler',
      href: '/projeler',
      icon: FolderKanban,
      exact: false,
    },
  ]

  const isTabActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <div className="fixed bottom-3 inset-x-3 z-50 lg:hidden pointer-events-auto">
      <nav 
        aria-label="Mobil alt gezinme çubuğu" 
        className="mx-auto max-w-md bg-black/90 backdrop-blur-2xl border border-white/15 rounded-full p-1.5 shadow-2xl shadow-black/50 flex items-center justify-between text-white"
      >
        {tabs.map((tab) => {
          const active = isTabActive(tab.href, tab.exact)
          const Icon = tab.icon

          if (tab.featured) {
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className="relative flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 group active:scale-90 transition-transform touch-manipulation"
              >
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#C9A86A] via-[#E5C88B] to-[#C9A86A] text-black shadow-lg shadow-[#C9A86A]/30">
                  <Icon className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-[9px] font-bold tracking-wider uppercase text-[#C9A86A] mt-0.5">
                  {tab.label}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 active:scale-95 transition-all touch-manipulation",
                active ? "text-white font-semibold" : "text-white/50 hover:text-white/80"
              )}
            >
              {active && (
                <motion.div
                  layoutId="activeMobileTab"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={cn("w-5 h-5 relative z-10 transition-transform", active && "scale-110")} />
              <span className="text-[9px] font-medium tracking-tight relative z-10 mt-0.5">
                {tab.label}
              </span>
            </Link>
          )
        })}

        {/* Menu Toggle Trigger */}
        <button
          onClick={onOpenMenu}
          aria-label="Tüm Menüyü Aç"
          className="relative flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 text-white/50 hover:text-white active:scale-95 transition-all touch-manipulation"
        >
          <Menu className="w-5 h-5 relative z-10" />
          <span className="text-[9px] font-medium tracking-tight relative z-10 mt-0.5">
            Menü
          </span>
        </button>
      </nav>
    </div>
  )
}
