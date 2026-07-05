'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isDarkHeroPage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-black/[0.04] dark:border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 max-w-[1440px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="z-50 flex items-center gap-3 group">
          <div className="relative">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${
              isScrolled || !isDarkHeroPage ? 'bg-foreground' : 'bg-white'
            }`}>
              <span className={`text-xs font-black tracking-tighter transition-colors duration-500 ${
                isScrolled || !isDarkHeroPage ? 'text-background' : 'text-black'
              }`}>E</span>
            </div>
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors duration-500 ${
            isScrolled || !isDarkHeroPage ? 'text-foreground' : 'text-white'
          }`}>
            ERAYDUŞ
          </span>
        </Link>

        {/* Desktop Nav — Center */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {[
            { href: '/koleksiyonlar', label: 'Koleksiyonlar' },
            { href: '/tasarla', label: 'Tasarla' },
            { href: '/projeler', label: 'Projeler' },
            { href: '/hakkimizda', label: 'Hakkımızda' },
            { href: '/iletisim', label: 'İletişim' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-black/5 dark:hover:bg-white/5 ${
                isScrolled || !isDarkHeroPage
                  ? 'text-foreground/70 hover:text-foreground'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions — Right */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://wa.me/905550000000"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              isScrolled || !isDarkHeroPage
                ? 'text-foreground/60 hover:text-foreground hover:bg-black/5'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <MessageCircle className="size-3.5" />
            WhatsApp
          </a>
          <Link
            href="/tasarla"
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 group ${
              isScrolled || !isDarkHeroPage
                ? 'bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-black/10'
                : 'bg-white text-black hover:bg-white/90 shadow-lg shadow-black/20'
            }`}
          >
            Tasarla
            <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden z-50 p-2.5 rounded-full transition-colors duration-300 ${
            mobileMenuOpen
              ? 'text-foreground'
              : isScrolled || !isDarkHeroPage
                ? 'text-foreground hover:bg-black/5'
                : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-background z-40 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col h-full pt-28 pb-12 px-8">
            <nav className="flex flex-col gap-1 flex-1">
              {[
                { href: '/koleksiyonlar', label: 'Koleksiyonlar' },
                { href: '/tasarla', label: 'Tasarla' },
                { href: '/projeler', label: 'Projeler' },
                { href: '/hakkimizda', label: 'Hakkımızda' },
                { href: '/iletisim', label: 'İletişim' },
              ].map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-light py-3 text-foreground hover:text-champagne transition-colors border-b border-border/50"
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${i * 50}ms` : '0ms',
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-4 mt-8">
              <Link
                href="/tasarla"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 h-14 text-base font-semibold"
              >
                Tasarla ve Başla
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <a
                href="https://wa.me/905550000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 h-14 text-base font-medium text-foreground"
              >
                <MessageCircle className="size-4" />
                WhatsApp ile Ara
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

