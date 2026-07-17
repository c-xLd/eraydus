'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useDragControls, useReducedMotion } from 'framer-motion'
import { Menu, X, ArrowUpRight, MessageCircle, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

/* ── Navigation data ───────────────────────────────────────────── */
const COLLECTIONS = [
  { href: '/koleksiyonlar', label: 'Duşakabin Koleksiyonları', desc: 'Lüks ve modern duş sistemleri' },
  { href: '/koleksiyonlar/banyo-dolaplari', label: 'Banyo Dolapları', desc: 'Premium banyo mobilyaları' },
  { href: '/kumlama-modelleri', label: 'Kumlama Modelleri', desc: 'Özel tasarım cam desenleri' },
  { href: '/jakuzi-tekneler', label: 'Jakuzi ve Tekneler', desc: 'Konforlu ve şık banyo keyfi' },
]

const NAV_LINKS = [
  { href: '/tasarla', label: 'Tasarla' },
  { href: '/projeler', label: 'Projeler' },
  { href: '/blog', label: 'Blog' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
]

const WHATSAPP_URL = 'https://wa.me/905550000000'

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Logo ──────────────────────────────────────────────────────── */
function Logo({ solid }: { solid: boolean }) {
  return (
    <Link
      href="/"
      aria-label="ERAYDUŞ anasayfa"
      className="z-50 flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <span
        className={cn(
          'flex size-8 items-center justify-center rounded-[10px] font-black tracking-tighter transition-colors duration-500',
          solid ? 'bg-foreground text-background' : 'bg-white text-black'
        )}
      >
        E
      </span>
      <span
        className={cn(
          'text-lg font-bold tracking-tight transition-colors duration-500',
          solid ? 'text-foreground' : 'text-white'
        )}
      >
        ERAYDUŞ
      </span>
    </Link>
  )
}

/* ── Desktop nav link with underline reveal ───────────────────── */
function NavLink({ href, label, solid }: { href: string; label: string; solid: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'group/link relative rounded-full px-3.5 py-2 text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring/60',
        solid ? 'text-foreground/70 hover:text-foreground' : 'text-white/70 hover:text-white'
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
  const dragControls = useDragControls()

  // Pages with a dark, full-bleed hero where the bar sits transparent.
  const isDarkHeroPage = pathname === '/' || pathname === '/jakuzi-tekneler'
  const solid = isScrolled || !isDarkHeroPage || menuOpen

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
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
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
        className={cn(
          'fixed inset-x-0 top-[var(--admin-bar-height,0px)] z-50 transition-colors duration-500',
          solid
            ? 'border-b border-black/[0.06] bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:border-white/[0.06] dark:bg-black/70 dark:supports-[backdrop-filter]:bg-black/60'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <div className="container mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[72px] md:px-6">
          <Logo solid={solid} />

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
                  solid ? 'text-foreground/70 hover:text-foreground' : 'text-white/70 hover:text-white'
                )}
              >
                Koleksiyonlar
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
                    transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
                    className="absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-3"
                  >
                    <div className="grid grid-cols-2 gap-1 rounded-3xl border border-black/[0.06] bg-popover p-3 shadow-2xl shadow-black/10 dark:border-white/[0.08]">
                      {COLLECTIONS.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
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
              <NavLink key={l.href} {...l} solid={solid} />
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
                solid
                  ? 'text-foreground/60 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <MessageCircle className="size-5" />
            </a>
            <Link
              href="/tasarla"
              className={cn(
                'group/cta inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-sm font-semibold outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring/60 active:scale-[0.98]',
                solid
                  ? 'bg-foreground text-background hover:bg-foreground/90'
                  : 'bg-white text-black hover:bg-white/90'
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
              solid
                ? 'text-foreground hover:bg-black/5 dark:hover:bg-white/10'
                : 'text-white hover:bg-white/10'
            )}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile bottom sheet ─────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Gezinme menüsü"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={sheetTransition}
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 600) setMenuOpen(false)
              }}
              className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[90dvh] flex-col rounded-t-3xl bg-background pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl shadow-black/20 lg:hidden"
            >
              {/* Drag handle */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="flex shrink-0 cursor-grab touch-none justify-center pb-2 pt-3 active:cursor-grabbing"
              >
                <span className="h-1.5 w-10 rounded-full bg-foreground/15" />
              </div>

              <div className="flex items-center justify-between px-6 pb-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
                  Menü
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Menüyü kapat"
                  className="flex size-11 items-center justify-center rounded-full text-foreground/70 outline-none transition-colors hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-ring/60 dark:hover:bg-white/10"
                >
                  <X className="size-6" />
                </button>
              </div>

              <nav aria-label="Mobil menü" className="flex-1 overflow-y-auto overscroll-contain px-6 py-2">
                {COLLECTIONS.map((c, i) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between border-b border-border/50 py-4 outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    <span className="text-xl font-light text-foreground/90">{c.label}</span>
                    <ArrowUpRight className="size-5 shrink-0 text-foreground/30" />
                  </Link>
                ))}
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between border-b border-border/50 py-4 outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    <span className="text-xl font-light text-foreground/90">{l.label}</span>
                    <ArrowUpRight className="size-5 shrink-0 text-foreground/30" />
                  </Link>
                ))}
              </nav>

              <div className="flex shrink-0 flex-col gap-3 px-6 pt-4">
                <Link
                  href="/tasarla"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-foreground text-base font-semibold text-background outline-none transition-transform active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  Tasarla
                  <ArrowUpRight className="size-5" />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-border bg-surface/50 text-base font-semibold text-foreground outline-none transition-transform active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  <MessageCircle className="size-5" />
                  WhatsApp ile Ara
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
