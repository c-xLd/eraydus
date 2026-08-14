'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, X, ChevronRight, Sparkles, Package, Layers, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROGRAMMATIC_MATRIX } from '@/lib/seo/matrix'
import { fallbackBlogPosts } from '@/lib/data/blog'

interface SearchResultItem {
  id: string
  title: string
  subtitle: string
  href: string
  category: 'kategori' | 'urun' | 'rehber'
  badge?: string
}

const STATIC_PRODUCTS: SearchResultItem[] = [
  {
    id: 'edge-corner',
    title: 'Edge Köşe Kabin',
    subtitle: '12mm ultra ince alüminyum profil ve 6mm temperli camlı köşe duş kabini.',
    href: '/urunler',
    category: 'urun',
    badge: 'Köşe Kabin',
  },
  {
    id: 'pure-walkin',
    title: 'Pure Tek Cam Duşakabin',
    subtitle: 'Çerçevesiz, kapısız ve zemine sıfır açık tek cam duş bölmesi.',
    href: '/urunler',
    category: 'urun',
    badge: 'Tek Cam',
  },
  {
    id: 'luxury-sliding',
    title: 'Luxury Sürgülü',
    subtitle: 'Soft-close yavaşlatıcı fren mekanizmalı lüks kayar kapılı kabin.',
    href: '/urunler',
    category: 'urun',
    badge: 'Soft-Close',
  },
  {
    id: 'edge-pivot',
    title: 'Edge Pivot Duş',
    subtitle: 'İki duvar arası niş alanlar için 180° açılır pivot kapı duş sistemi.',
    href: '/urunler',
    category: 'urun',
    badge: 'Pivot Kapı',
  },
  {
    id: 'luxury-corner',
    title: 'Luxury Premium Köşe',
    subtitle: 'Çift kanatlı dışa açılır menteşeli premium köşe duş kabini.',
    href: '/urunler',
    category: 'urun',
    badge: 'Çift Menteşe',
  },
  {
    id: 'pure-slider',
    title: 'Pure Gizli Sürgülü',
    subtitle: 'Görünmez gizli ray ve rulman sistemli minimalist sürgülü kabin.',
    href: '/urunler',
    category: 'urun',
    badge: 'Gizli Ray',
  },
]

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // Open trigger
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const trimmed = query.trim().toLowerCase()

  // Generate matrix items for search
  const matrixResults: SearchResultItem[] = Object.values(PROGRAMMATIC_MATRIX).map((item) => ({
    id: item.slug,
    title: item.h1.replace(' Duşakabin Sistemleri', '').replace(' Duşakabinler', ''),
    subtitle: item.subtitle,
    href: `/urunler`,
    category: 'kategori',
    badge: item.badge,
  }))

  // Generate blog items for search
  const blogResults: SearchResultItem[] = fallbackBlogPosts.map((post) => ({
    id: post.id,
    title: post.title,
    subtitle: post.description || '',
    href: `/blog/${post.slug}`,
    category: 'rehber',
    badge: 'Rehber',
  }))

  const allItems: SearchResultItem[] = [...matrixResults, ...STATIC_PRODUCTS, ...blogResults]

  const filteredResults = trimmed
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmed) ||
          item.subtitle.toLowerCase().includes(trimmed) ||
          (item.badge && item.badge.toLowerCase().includes(trimmed))
      )
    : allItems.slice(0, 8) // Show top 8 default recommendations when search input is empty

  const categories = filteredResults.filter((r) => r.category === 'kategori')
  const products = filteredResults.filter((r) => r.category === 'urun')
  const guides = filteredResults.filter((r) => r.category === 'rehber')

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 md:pt-24 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#121212] p-4 sm:p-6 shadow-2xl text-white overflow-hidden z-10"
        >
          {/* Search Header Input */}
          <div className="relative flex items-center border-b border-white/10 pb-4">
            <Search className="size-5 text-white/50 absolute left-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Model, kategori, cam tipi veya ölçü ara (örn: Livorno, Pivot, Siyah)..."
              className="w-full bg-transparent pl-11 pr-10 text-base md:text-lg font-light text-white placeholder-white/40 focus:outline-none"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="size-4" />
              </button>
            ) : (
              <span className="absolute right-3 text-[10px] font-mono uppercase tracking-wider text-white/30 border border-white/15 rounded px-1.5 py-0.5 hidden sm:inline-block">
                ESC
              </span>
            )}
          </div>

          {/* Search Results Area */}
          <div className="max-h-[60vh] overflow-y-auto pt-4 space-y-6 pr-1 custom-scrollbar">
            {filteredResults.length === 0 ? (
              <div className="py-12 text-center text-white/40 space-y-2">
                <Sparkles className="size-8 mx-auto opacity-50 mb-3 text-[#C9A86A]" />
                <p className="text-sm font-medium">"{query}" ile eşleşen sonuç bulunamadı.</p>
                <p className="text-xs font-light">"Siyah", "Pivot", "Askılı" veya "Livorno" kelimelerini aramayı deneyin.</p>
              </div>
            ) : (
              <>
                {/* Categories Group */}
                {categories.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A] mb-3 px-2">
                      <Layers className="size-3.5" />
                      <span>Kategoriler ve Seriler ({categories.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {categories.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white group-hover:text-[#C9A86A] transition-colors">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/40 font-light truncate max-w-[200px]">
                              {item.subtitle}
                            </p>
                          </div>
                          <ChevronRight className="size-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products Group */}
                {products.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A] mb-3 px-2">
                      <Package className="size-3.5" />
                      <span>Ürün Modelleri ({products.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {products.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white group-hover:text-[#C9A86A] transition-colors">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#C9A86A]/20 text-[#C9A86A]">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/40 font-light truncate max-w-[200px]">
                              {item.subtitle}
                            </p>
                          </div>
                          <ChevronRight className="size-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guides Group */}
                {guides.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A] mb-3 px-2">
                      <BookOpen className="size-3.5" />
                      <span>Rehber ve Banyo Fikirleri ({guides.length})</span>
                    </div>
                    <div className="space-y-2">
                      {guides.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all"
                        >
                          <div className="space-y-0.5">
                            <span className="text-sm font-medium text-white group-hover:text-[#C9A86A] transition-colors">
                              {item.title}
                            </span>
                            <p className="text-xs text-white/40 font-light truncate max-w-[400px]">
                              {item.subtitle}
                            </p>
                          </div>
                          <ChevronRight className="size-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Modal Footer Bar */}
          <div className="border-t border-white/10 pt-3 mt-4 flex items-center justify-between text-xs text-white/40 font-light">
            <span>Anında canlı arama</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] border border-white/10">⌘K</kbd> / <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] border border-white/10">Ctrl+K</kbd>
              </span>
              <button
                onClick={onClose}
                className="hover:text-white transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
