'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const ease = [0.16, 1, 0.3, 1] as const

interface GlassType {
  id: string
  name: string
  description: string
  backdropClass: string
  overlayClass: string
}

const glassTypes: GlassType[] = [
  {
    id: 'seffaf',
    name: 'Şeffaf Extra Clear',
    description: 'Kristal berraklığında, yüksek ışık geçirgenliği ve ferahlık sunan klasik tercih.',
    backdropClass: 'backdrop-blur-[1px] backdrop-brightness-[1.03] backdrop-contrast-[0.98]',
    overlayClass: 'bg-white/[0.02] border border-white/10',
  },
  {
    id: 'fume',
    name: 'Füme (Siyah) Cam',
    description: 'Sofistike koyu tonuyla banyonuza asil bir mahremiyet ve lüks kazandırır.',
    backdropClass: 'backdrop-blur-[4px] backdrop-brightness-[0.45] backdrop-contrast-[1.15]',
    overlayClass: 'bg-black/35 border border-white/5',
  },
  {
    id: 'bronz',
    name: 'Bronz Cam',
    description: 'Sıcak altın tonlarıyla banyo mimarisine seçkin ve zengin bir atmosfer katar.',
    backdropClass: 'backdrop-blur-[3px] backdrop-brightness-[0.7] backdrop-contrast-[1.1]',
    overlayClass: 'bg-amber-950/15 border border-amber-500/10',
  },
  {
    id: 'oluklu',
    name: 'Oluklu (Fluted) Cam',
    description: 'Dikey çizgisel refraksiyonu ile modern ve yarı geçirgen sanatsal bir derinlik sağlar.',
    backdropClass: 'backdrop-blur-[2px] backdrop-brightness-[0.95] backdrop-contrast-[1.05]',
    overlayClass: 'bg-white/[0.03] bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_50%,rgba(0,0,0,0.04)_50%)] bg-[size:14px_100%] border border-white/10',
  },
  {
    id: 'kumlama',
    name: 'Buzlu (Kumlama) Cam',
    description: 'Işığı mükemmel şekilde dağıtarak tam mahremiyet ve ipeksi bir doku sunar.',
    backdropClass: 'backdrop-blur-[22px] backdrop-brightness-[0.9] backdrop-contrast-[1.05]',
    overlayClass: 'bg-white/10 border border-white/20',
  },
]

export function GlassCollectionSection() {
  const [selected, setSelected] = useState(glassTypes[0])

  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-champagne/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0.01, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="text-champagne text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Seçkin Malzemeler
          </motion.span>
          <motion.h2
            initial={{ opacity: 0.01, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight"
          >
            Cam <span className="font-semibold text-white">Koleksiyonu</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0.01, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch"
        >
          {/* Preview Panel — 3 columns */}
          <div className="lg:col-span-3 relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface border border-white/5 flex items-center justify-center p-6 sm:p-10 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop"
              alt="Duşakabin cam önizlemesi"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover pointer-events-none"
            />
            
            {/* Real Physical Glass Sheet Mockup */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 flex flex-col justify-end p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className={`absolute inset-0 ${selected.backdropClass} ${selected.overlayClass}`}
                />
              </AnimatePresence>

              {/* Text label overlay inside the glass container to get beautiful color/blur overlay under the text */}
              <div className="relative z-30 text-white select-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0.01, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0.01, y: -15 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <p className="text-xl md:text-2xl font-light mb-2 tracking-tight text-white/95">
                      {selected.name}
                    </p>
                    <p className="text-white/60 text-xs md:text-sm font-light max-w-md leading-relaxed">
                      {selected.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Selector Panel — 2 columns */}
          <div className="lg:col-span-2 flex flex-col justify-center gap-3">
            <p className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-4 pl-1">
              Cam Tipini Seçin
            </p>
            
            {glassTypes.map((glass) => {
              const isSelected = selected.id === glass.id
              return (
                <button
                  key={glass.id}
                  onClick={() => setSelected(glass)}
                  className="group relative w-full text-left rounded-2xl p-5 md:p-6 border border-white/5 hover:border-champagne/40 transition-all duration-300 min-h-[92px] -webkit-tap-highlight-color-transparent bg-surface-dark/40 overflow-hidden flex items-center justify-between cursor-pointer"
                >
                  {/* Sliding active background highlight */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeGlassBg"
                      className="absolute inset-0 bg-gradient-to-r from-champagne/10 to-transparent border-l-2 border-champagne"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                    />
                  )}

                  <div className="relative z-10 flex-1 pr-4">
                    <p className={`text-base md:text-lg font-medium mb-1 transition-colors duration-300 ${isSelected ? 'text-champagne font-semibold' : 'text-white/80 group-hover:text-white'}`}>
                      {glass.name}
                    </p>
                    <p className={`text-xs md:text-sm leading-relaxed transition-colors duration-300 ${isSelected ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {glass.description}
                    </p>
                  </div>

                  {/* Selection indicator */}
                  <div className={`size-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-300 relative z-10 ${isSelected ? 'border-champagne bg-champagne' : 'border-white/10 group-hover:border-champagne/40'}`}>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="size-2 rounded-full bg-black"
                      />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
