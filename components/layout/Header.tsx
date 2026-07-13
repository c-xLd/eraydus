'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isDarkHeroPage = pathname === '/' || pathname === '/jakuzi-tekneler'

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
            {
              label: 'Koleksiyonlar',
              subItems: [
                { href: '/koleksiyonlar', label: 'Duşakabin Koleksiyonları', desc: 'Lüks ve modern duş sistemleri' },
                { href: '/koleksiyonlar?kategori=Banyo+Dolabı', label: 'Banyo Dolapları', desc: 'Premium banyo mobilyaları' },
                { href: '/kumlama-modelleri', label: 'Kumlama Modelleri', desc: 'Özel tasarım cam desenleri' },
                { href: '/jakuzi-tekneler', label: 'Jakuzi ve Tekneler', desc: 'Konforlu ve şık banyo keyfi' },
              ]
            },
            { href: '/tasarla', label: 'Tasarla' },
            { href: '/projeler', label: 'Projeler' },
            { href: '/blog', label: 'Blog' },
            { href: '/hakkimizda', label: 'Hakkımızda' },
            { href: '/iletisim', label: 'İletişim' },
          ].map((item) => (
            item.subItems ? (
              <div key={item.label} className="relative group px-1">
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-black/5 dark:hover:bg-white/5 ${
                    isScrolled || !isDarkHeroPage
                      ? 'text-foreground/70 hover:text-foreground'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  <svg className="w-4 h-4 ml-0.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="w-72 bg-white dark:bg-zinc-950 border border-black/5 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden py-2">
                    {item.subItems.map(sub => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-5 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <div className="text-sm font-medium text-foreground">{sub.label}</div>
                        <div className="text-xs text-foreground/50 mt-0.5">{sub.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-black/5 dark:hover:bg-white/5 ${
                  isScrolled || !isDarkHeroPage
                    ? 'text-foreground/70 hover:text-foreground'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
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
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              isScrolled || !isDarkHeroPage
                ? 'bg-foreground text-background hover:bg-foreground/90'
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            Tasarla
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden relative z-50 p-2 rounded-full transition-colors ${
            mobileMenuOpen || isScrolled || !isDarkHeroPage
              ? 'text-foreground hover:bg-black/5 dark:hover:bg-white/5'
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
          <div className="flex flex-col h-full pt-28 pb-12 px-8 overflow-y-auto">
            <nav className="flex flex-col gap-1 flex-1">
              {[
                { label: 'Duşakabin Koleksiyonları', href: '/koleksiyonlar' },
                { label: 'Banyo Dolapları', href: '/koleksiyonlar?kategori=Banyo+Dolabı' },
                { label: 'Kumlama Modelleri', href: '/kumlama-modelleri' },
                { label: 'Jakuzi ve Tekneler', href: '/jakuzi-tekneler' },
                { href: '/tasarla', label: 'Tasarla' },
                { href: '/projeler', label: 'Projeler' },
                { href: '/blog', label: 'Blog' },
                { href: '/hakkimizda', label: 'Hakkımızda' },
                { href: '/iletisim', label: 'İletişim' },
              ].map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-light py-3 text-foreground hover:text-champagne transition-colors border-b border-border/50"
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${i * 30}ms` : '0ms',
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
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

