'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '../ui/button'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/70 backdrop-blur-md border-b border-white/10 shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 max-w-[1440px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight z-50 flex items-center gap-2">
          <span className={isScrolled ? 'text-foreground' : 'text-foreground'}>ERAYDUŞ</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/collections" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Koleksiyonlar
          </Link>
          <Link href="/projects" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Projeler
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Hakkımızda
          </Link>
          <Link href="/contact" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            İletişim
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2 hidden xl:flex">
            <MessageCircle className="size-4" />
            WhatsApp
          </Button>
          <Link href="/configurator" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 h-12 text-sm font-medium shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all">
            Konfigüratör <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden z-50 p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-40 lg:hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col h-full items-center justify-center gap-8 text-2xl font-medium">
            <Link href="/collections" onClick={() => setMobileMenuOpen(false)}>Koleksiyonlar</Link>
            <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>Projeler</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>Hakkımızda</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>İletişim</Link>
            <Link href="/configurator" onClick={() => setMobileMenuOpen(false)} className="text-champagne mt-4">
              Konfigüratöre Git
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
