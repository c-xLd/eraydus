'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { storageUrl } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

interface Hotspot {
  id: number
  x: string
  y: string
  title: string
  description: string
  align: 'left' | 'right'
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    x: '55%',
    y: '38%',
    title: 'Temperli Güvenlik Camı',
    description: '6mm darbelere dayanıklı temperli camlar. İsteğe bağlı kolay temizlenen leke tutmaz kaplama seçeneği.',
    align: 'left',
  },
  {
    id: 2,
    x: '28%',
    y: '68%',
    title: 'Paslanmaz Çelik Aksam',
    description: 'Paslanmayan özel metal menteşe ve profiller, su ve nemden etkilenmeden yıllarca ilk günkü gibi kalır.',
    align: 'right',
  },
  {
    id: 3,
    x: '72%',
    y: '18%',
    title: '%100 Su Sızdırmazlık',
    description: 'Mıknatıslı fitil sistemi ve hassas silikon çekimi ile banyonuzda su kaçırma sorununa kesin çözüm.',
    align: 'left',
  },
]

export function CraftsmanshipSection() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)

  return (
    <section className="relative py-16 md:py-24 bg-[#0A0A0B] text-zinc-100 overflow-hidden border-y border-zinc-900">
      {/* Blueprint Grid Pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative Technical Axis Lines */}
      <div className="pointer-events-none absolute left-8 top-0 bottom-0 w-[1px] bg-zinc-900/50 hidden md:block" />
      <div className="pointer-events-none absolute right-8 top-0 bottom-0 w-[1px] bg-zinc-900/50 hidden md:block" />

      {/* Ambient Champagne Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full bg-champagne/5 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-zinc-800/10 blur-[100px]"
      />

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column — Interactive Blueprint Image Showcase */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <motion.div
              initial={{ x: -30 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease }}
              className="group relative aspect-[4/5] lg:aspect-[3/4] w-full max-w-md bg-zinc-900/30 border border-zinc-800/60 p-3 rounded-[2.5rem] shadow-3xl hover:border-zinc-700/50 transition-all duration-700"
            >
              {/* Corner Brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-800 pointer-events-none group-hover:border-zinc-700 transition-colors" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-800 pointer-events-none group-hover:border-zinc-700 transition-colors" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-800 pointer-events-none group-hover:border-zinc-700 transition-colors" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-800 pointer-events-none group-hover:border-zinc-700 transition-colors" />

              {/* Technical Data Labels */}
              <div className="absolute top-5 left-5 text-champagne/80 font-mono text-[9px] tracking-widest select-none z-10 pointer-events-none uppercase">
                DETAYLI ÜRÜN İNCELEMESİ
              </div>

              {/* Image Container */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-zinc-950/60 ring-1 ring-white/5">
                <Image
                  src={storageUrl('uploads', 'homepage/craftsmanship.jpg')}
                  alt="Erayduş Lüks Duşakabin Detayı"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 540px"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 opacity-90" />

                {/* Hotspot Dots overlay */}
                {hotspots.map((hotspot) => {
                  const isActive = activeHotspot === hotspot.id
                  return (
                    <div
                      key={hotspot.id}
                      className="absolute z-20"
                      style={{ top: hotspot.y, left: hotspot.x }}
                    >
                      {/* Pulse Circle with 48x48 minimum touch area */}
                      <button
                        type="button"
                        aria-label={`Özellik: ${hotspot.title}`}
                        onMouseEnter={() => setActiveHotspot(hotspot.id)}
                        onMouseLeave={() => setActiveHotspot(null)}
                        onClick={() => setActiveHotspot(isActive ? null : hotspot.id)}
                        className="relative flex items-center justify-center min-w-[48px] min-h-[48px] -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                      >
                        {/* Glow ring */}
                        <span className="absolute inline-flex h-6 w-6 rounded-full bg-champagne/30 animate-ping" />
                        {/* Outer ring */}
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-zinc-950 border border-champagne flex-shrink-0 items-center justify-center transition-all duration-300 hover:scale-110">
                          {/* Inner center dot */}
                          <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                        </span>
                      </button>

                      {/* Tooltip Card */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 8 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className={`absolute z-30 w-64 bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-4 shadow-2xl text-left pointer-events-none -translate-y-1/2
                              ${hotspot.align === 'left' ? 'right-6 mr-2' : 'left-6 ml-2'}
                            `}
                            style={{ top: '0%' }}
                          >
                            <p className="text-sm font-semibold text-champagne mb-1.5 flex items-center gap-2">
                              <span className="h-1 w-1 rounded-full bg-champagne" />
                              {hotspot.title}
                            </p>
                            <p className="text-xs text-zinc-300 leading-relaxed font-light">
                              {hotspot.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column — Narrative & Specifications */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.span
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.8, ease }}
              className="text-champagne text-xs font-semibold tracking-[0.2em] font-mono uppercase mb-3 block"
            >
              [ KALİTE VE MALZEME ]
            </motion.span>

            <motion.h2
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-white mb-4 leading-tight"
            >
              Kaliteli Malzeme ve <span className="font-semibold text-champagne">Uzman İşçilik</span>
            </motion.h2>

            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="space-y-4 mb-8 text-zinc-400 font-light text-sm md:text-base leading-relaxed"
            >
              <p>
                Erayduş olarak banyonuzda yıllarca sorunsuz kullanabileceğiniz duşakabinler üretiyoruz.
                Standart ölçülere bağlı kalmadan banyonuzun girinti, çıkıntı ve yükseklik ölçülerine %100 uyumlu özel imalat yapıyoruz.
              </p>
              <p>
                Kırılmaya karşı 5 kat daha dirençli 6mm temperli cam panellerimiz, pürüzsüz yapısı sayesinde su damlalarını leke bırakmadan kaydırır. Paslanmayan çelik ve alüminyum aksamlarımız ile banyonuzda uzun yıllar güvenle kullanırsınız.
              </p>
              <p>
                Kendi bünyemizdeki uzman montaj ekibimiz, banyonuzda temiz ve titiz bir kurulum gerçekleştirerek duşakabininizi kullanıma hazır teslim eder.
              </p>
            </motion.div>

            {/* Technical Specifications Grid */}
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="grid grid-cols-3 border border-zinc-800/80 rounded-2xl overflow-hidden divide-x divide-zinc-800/80 bg-zinc-900/10 backdrop-blur-sm mb-8"
            >
              <div className="p-4 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">GÜVENLİK</span>
                <div>
                  <p className="text-xl md:text-2xl font-light tracking-tight text-white">6 <span className="text-xs text-zinc-400 font-mono">mm</span></p>
                  <p className="text-zinc-400 text-xs mt-1 font-medium">Temperli Cam</p>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">DAYANIKLILIK</span>
                <div>
                  <p className="text-xl md:text-2xl font-light tracking-tight text-white">%100</p>
                  <p className="text-zinc-400 text-xs mt-1 font-medium">Paslanmaz Metal</p>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">YALITIM</span>
                <div>
                  <p className="text-xl md:text-2xl font-light tracking-tight text-white">%100</p>
                  <p className="text-zinc-400 text-xs mt-1 font-medium">Su Sızdırmazlık</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              <Link
                href="/hakkimizda"
                className="group relative inline-flex items-center justify-between gap-5 border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm hover:bg-zinc-900/60 transition-all duration-300 rounded-full pl-5 pr-2 py-2 hover:border-champagne/30 text-zinc-100 text-xs font-medium tracking-wide"
              >
                <span>Hakkımızda ve Hizmet Detayları</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-champagne text-zinc-950 group-hover:scale-105 transition-transform duration-300">
                  <ArrowRight className="size-3.5" />
                </span>
              </Link>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
