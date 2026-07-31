'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowRight, ShieldCheck, Layers, Ruler } from 'lucide-react'

export function ShowroomHero() {
  const highlights = [
    { icon: ShieldCheck, text: '2 Yıl Garanti & Yerli Üretim' },
    { icon: Layers, text: '6mm Temperli Cam' },
    { icon: Ruler, text: 'Özel Ölçü Üretimi' },
  ]

  return (
    <section className="pt-24 sm:pt-32 pb-6 sm:pb-10 bg-white text-black">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Main Horizontal Layout */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
            {/* Left Content */}
            <div className="max-w-2xl space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-black/40 uppercase font-mono">
                  ERAYDUŞ SHOWROOM 2026
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tighter text-black leading-tight">
                Banyonuzun <span className="font-semibold">Mimarisi</span>
              </h1>

              <p className="text-black/60 text-xs sm:text-base font-light leading-relaxed max-w-xl pt-1">
                Milimetrik hassasiyetle üretilen mimari tasarım duşakabin sistemleri.
              </p>
            </div>

            {/* Right Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                href="#kategoriler"
                onClick={(e) => {
                  const el = document.getElementById('kategoriler')
                  if (el) {
                    e.preventDefault()
                    el.scrollIntoView({ behavior: 'smooth' })
                    window.history.pushState(null, '', '#kategoriler')
                  }
                }}
                className="group relative h-11 sm:h-12 px-6 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 hover:bg-black/90 active:scale-[0.98] transition-all shadow-sm touch-manipulation"
              >
                <span>Modelleri Keşfet</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/tasarla"
                className="group relative h-11 sm:h-12 px-6 bg-[#C9A86A] text-black text-xs font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 hover:bg-[#b89759] active:scale-[0.98] transition-all shadow-xs touch-manipulation"
              >
                <Sparkles className="w-4 h-4 text-black animate-pulse" />
                <span>Kendi Modelini Tasarla</span>
              </Link>
            </div>
          </div>

          {/* Highlights & Bottom Divider */}
          <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-xs text-black/60 font-light">
            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
              {highlights.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-center gap-2 text-black/70 text-[11px] sm:text-xs">
                    <Icon className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
                    <span>{item.text}</span>
                  </div>
                )
              })}
            </div>

            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase text-black/40 tracking-widest">
              <span>%100 Yerli Üretim</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
