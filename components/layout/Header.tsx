'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X, ArrowUpRight, MessageCircle, ChevronDown, Sparkles, Layers, Compass, Phone, ChevronRight, Search } from 'lucide-react'
import { SearchModal } from '@/components/search/SearchModal'

import { cn } from '@/lib/utils'

/* ── Navigation data ───────────────────────────────────────────── */
const COLLECTIONS = [
  { href: '/urunler', label: 'Tüm Ürünler', desc: 'Lüks ve modern duş sistemleri' },
  { href: '/urunler/banyo-dolabi', label: 'Banyo Dolapları', desc: 'Premium banyo mobilyaları' },
  { href: '/kumlama-modelleri', label: 'Kumlama Modelleri', desc: 'Özel tasarım cam desenleri' },
  { href: '/jakuzi-tekneler', label: 'Jakuzi ve Tekneler', desc: 'Konforlu ve şık banyo keyfi' },
]

const NAV_LINKS = [
  { href: '/projeler', label: 'Projeler', desc: 'Tamamlanan referans projelerimiz' },
  { href: '/blog', label: 'Blog & İlham', desc: 'Banyo tasarım fikirleri ve tavsiyeler' },
  { href: '/hakkimizda', label: 'Hakkımızda', desc: '15 yıllık Erayduş kalitesi' },
  { href: '/iletisim', label: 'İletişim', desc: 'Konum, telefon ve teklif al' },
]

const WHATSAPP_URL = 'https://wa.me/905548830071'
const PHONE_NUMBER = '0554 883 00 71'

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Logo ──────────────────────────────────────────────────────── */
function Logo({ lightText }: { lightText: boolean }) {
  return (
    <Link
      href="/"
      aria-label="ERAYDUŞ anasayfa"
      className="z-50 flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <span
        className={cn(
          'flex size-8 items-center justify-center rounded-[10px] font-black tracking-tighter transition-colors duration-500',
          lightText ? 'bg-white text-black' : 'bg-foreground text-background'
        )}
      >
        E
      </span>
      <span
        className={cn(
          'text-lg font-bold tracking-tight transition-colors duration-500',
          lightText ? 'text-white' : 'text-foreground'
        )}
      >
        ERAYDUŞ
      </span>
    </Link>
  )
}

/* ── Desktop nav link with underline reveal ───────────────────── */
function NavLink({ href, label, lightText }: { href: string; label: string; lightText: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'group/link relative rounded-full px-3.5 py-2 text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring/60',
        lightText ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-foreground'
      )}
    >
      {label}
      <span className="absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
    </Link>
  )
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  // Pages with a dark, full-bleed hero where the bar sits transparent with white text when at top.
  const isDarkHeroPage = !pathname || pathname === '/' || pathname === '' || pathname === '/jakuzi-tekneler' || pathname.startsWith('/jakuzi-tekneler')

  // Header background is frosted glass only when scrolled or mobile menu is open.
  const hasBackdrop = isScrolled || menuOpen

  const [searchOpen, setSearchOpen] = useState(false)

  // Text color is white only at the top of dark hero pages.
  // Everywhere else (when scrolled, or on light background pages), theme foreground colors are used.
  const lightText = isDarkHeroPage && !hasBackdrop

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on route change.
  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
  }, [pathname])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const sheetTransition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 40 }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-[var(--admin-bar-height,0px)] z-50 transition-colors duration-500',
          hasBackdrop
            ? 'border-b border-black/[0.06] bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:border-white/[0.06] dark:bg-black/70 dark:supports-[backdrop-filter]:bg-black/60'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <div className="container mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[72px] md:px-6">
          <Logo lightText={lightText} />

          {/* Desktop navigation */}
          <nav aria-label="Ana menü" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              onFocus={() => setMegaOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaOpen(false)
              }}
            >
              <button
                aria-expanded={megaOpen}
                aria-haspopup="true"
                onClick={() => setMegaOpen((v) => !v)}
                className={cn(
                  'flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring/60',
                  lightText ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-foreground'
                )}
              >
                Ürünler
                <ChevronDown
                  className={cn(
                    'size-4 opacity-60 transition-transform duration-300',
                    megaOpen && 'rotate-180'
                  )}
                />
              </button>

              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-3"
                  >
                    <div className="grid grid-cols-2 gap-1 rounded-[28px] border border-black/[0.06] bg-popover p-3 shadow-2xl shadow-black/10 dark:border-white/[0.08]">
                      {COLLECTIONS.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setMegaOpen(false)}
                          className="group/item rounded-2xl p-4 outline-none transition-colors hover:bg-black/[0.03] focus-visible:ring-2 focus-visible:ring-ring/60 dark:hover:bg-white/[0.04]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-foreground">{c.label}</span>
                            <ArrowUpRight className="size-4 -translate-x-1 text-foreground/0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:text-foreground/60" />
                          </div>
                          <p className="mt-1 text-xs text-foreground/50">{c.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.map((l) => (
              <NavLink key={l.href} {...l} lightText={lightText} />
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp ile iletişim"
              className={cn(
                'flex size-11 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/60',
                lightText
                  ? 'text-white/70 hover:bg-white/10 hover:text-white'
                  : 'text-foreground/60 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10'
              )}
            >
              <MessageCircle className="size-5" />
            </a>
            <Link
              href="/tasarla"
              className={cn(
                'group/cta inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-sm font-semibold outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring/60 active:scale-[0.98]',
                lightText
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-foreground text-background hover:bg-foreground/90'
              )}
            >
              Tasarla
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menüyü aç"
            aria-expanded={menuOpen}
            className={cn(
              'flex size-11 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/60 lg:hidden',
              lightText
                ? 'text-white hover:bg-white/10'
                : 'text-foreground hover:bg-black/5 dark:hover:bg-white/10'
            )}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* Instant Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Ultra-Luxury Mobile Side Navigation Drawer ───────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md lg:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.div
              key="side-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobil Gezinme Menüsü"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: 'spring' as const, stiffness: 360, damping: 36 }
              }
              className="fixed inset-y-0 right-0 z-[100] flex w-[88vw] max-w-[400px] flex-col bg-[#09090b] text-white shadow-2xl border-l border-white/10 lg:hidden overflow-hidden"
            >
              {/* Drawer Top Header Bar */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-[9px] bg-white text-black font-black tracking-tighter text-sm shadow-md">
                    E
                  </span>
                  <span className="text-base font-bold tracking-tight text-white">
                    ERAYDUŞ
                  </span>
                  <span className="flex h-2 w-2 relative ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A86A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A86A]"></span>
                  </span>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Menüyü kapat"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white outline-none transition-all active:scale-90"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 space-y-6">
                {/* 3D Configurator Featured Banner */}
                <Link
                  href="/tasarla"
                  onClick={() => setMenuOpen(false)}
                  className="group relative block rounded-2xl bg-gradient-to-r from-[#C9A86A] via-[#E5C88B] to-[#C9A86A] p-4 text-black shadow-lg shadow-[#C9A86A]/20 active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-black/70">
                        <Sparkles className="size-3.5 text-black animate-pulse" />
                        <span>3D Konfigüratör</span>
                      </div>
                      <h4 className="text-base font-bold tracking-tight">Kendi Banyonu Tasarla</h4>
                    </div>
                    <div className="flex size-9 items-center justify-center rounded-full bg-black text-white group-hover:scale-105 transition-transform">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                </Link>

                {/* Collections Section */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40 font-mono block mb-3">
                    KOLEKSİYONLAR
                  </span>
                  <div className="space-y-1">
                    {COLLECTIONS.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all active:scale-[0.98]"
                      >
                        <div className="space-y-0.5">
                          <span className="text-sm font-medium text-white group-hover:text-[#C9A86A] transition-colors">
                            {c.label}
                          </span>
                          <p className="text-[11px] text-white/40 font-light truncate max-w-[220px]">
                            {c.desc}
                          </p>
                        </div>
                        <ChevronRight className="size-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Pages Section */}
                <div className="space-y-2 pt-2">
                  <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40 font-mono block mb-3">
                    MİMARİ & SAYFALAR
                  </span>
                  <div className="space-y-1">
                    {NAV_LINKS.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all active:scale-[0.98]"
                      >
                        <div className="space-y-0.5">
                          <span className="text-sm font-medium text-white group-hover:text-[#C9A86A] transition-colors">
                            {l.label}
                          </span>
                          <p className="text-[11px] text-white/40 font-light truncate max-w-[220px]">
                            {l.desc}
                          </p>
                        </div>
                        <ChevronRight className="size-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Contact Footer */}
              <div className="p-6 border-t border-white/10 bg-[#09090b] space-y-3 shrink-0">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2.5 h-12 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-transform active:scale-[0.98] shadow-lg shadow-emerald-900/30"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <MessageCircle className="size-4" />
                  <span>WhatsApp Canlı Destek</span>
                </a>

                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 h-11 w-full rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors"
                >
                  <Phone className="size-3.5 text-white/70" />
                  <span>{PHONE_NUMBER}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
