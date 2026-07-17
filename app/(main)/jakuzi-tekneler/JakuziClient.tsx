'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Droplets, Wind, Sparkles, ShieldCheck,
  Waves, Ruler, ThermometerSun, Layers,
  ChevronRight, Phone, ArrowDown
} from 'lucide-react'

/* ══════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════ */

interface JakuziClientProps {
  content: any
}

// Map string icon names to Lucide icons
const iconMap: Record<string, any> = {
  'Hidromasaj Sistemi': Droplets,
  'Sessiz Motor': Wind,
  'Kromoterapi LED': Sparkles,
  'Antibakteriyel Akrilik': ShieldCheck,
  'Su Yalıtımı': Waves,
  'Özel Ölçü Üretim': Ruler,
  'Isı Yalıtımı': ThermometerSun,
  'Kaymaz Taban': Layers,
}

export function JakuziClient({ content }: JakuziClientProps) {
  const [activeTab, setActiveTab] = useState<'jakuzi' | 'tekne'>('jakuzi')
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!content || !content.jakuzi || !content.tekne) return null

  const isJakuzi = activeTab === 'jakuzi'
  const activeData = isJakuzi ? content.jakuzi : content.tekne
  
  const features = activeData.features.map((f: any) => ({ ...f, icon: iconMap[f.title] || Sparkles }))
  const models = activeData.models
  const stats = activeData.stats

  return (
    <main className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════
          CINEMATIC HERO
          ═══════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex flex-col items-center justify-center ">
        {/* Background image with parallax */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ scale: 1.1, opacity: 0.01 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0.01 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={isJakuzi
                  ? content.hero?.jakuzi_bg || 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80'
                  : content.hero?.tekne_bg || 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80'
                }
                alt={isJakuzi ? 'Jakuzi' : 'Duş Teknesi'}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          {/* Cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />
          {/* Animated grain texture */}
          <div className="absolute inset-0 z-20 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
        </div>

        {/* Content */}
        <div className="relative z-30 text-center px-6 max-w-5xl mx-auto">
          {/* Champagne accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent mx-auto mb-10"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0.01, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.01, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-6 leading-[0.95]">
                {isJakuzi ? (
                  <>{content.hero?.jakuzi_title_normal}<br /><span className="font-medium bg-gradient-to-r from-champagne via-amber-200 to-champagne bg-clip-text text-transparent">{content.hero?.jakuzi_title_bold}</span></>
                ) : (
                  <>{content.hero?.tekne_title_normal}<br /><span className="font-medium bg-gradient-to-r from-champagne via-amber-200 to-champagne bg-clip-text text-transparent">{content.hero?.tekne_title_bold}</span></>
                )}
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                {isJakuzi
                  ? content.hero?.jakuzi_desc
                  : content.hero?.tekne_desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Tab Switcher — Glassmorphic Pill */}
          <div className="mt-14 inline-flex bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-full p-1.5 shadow-2xl">
            {(['jakuzi', 'tekne'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-8 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full z-10"
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="hero-pill"
                    className="absolute inset-0 bg-gradient-to-r from-champagne/90 to-amber-400/90 rounded-full shadow-lg shadow-champagne/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeTab === tab ? 'text-black' : 'text-white/60 hover:text-white'}`}>
                  {tab === 'jakuzi' ? 'Jakuziler' : 'Duş Tekneleri'}
                </span>
              </button>
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            key={`stats-${activeTab}`}
            initial={{ opacity: 0.01, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((s: any, i: number) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-light text-white mb-1">{s.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <button onClick={scrollToContent} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 group">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] group-hover:text-white/60 transition-colors">Keşfet</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="w-4 h-4 text-white/30 group-hover:text-champagne transition-colors" />
          </motion.div>
        </button>
      </section>

      {/* ═══════════════════════════════════════
          CONTENT AREA
          ═══════════════════════════════════════ */}
      <div ref={contentRef}>
        <AnimatePresence mode="wait">

          <motion.div
            key={activeTab}
            initial={{ opacity: 0.01 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.01 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Info Section ── */}
            <section className="py-28 px-6 bg-surface">
              <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-[1.1]">
                      {activeData.info_title_normal} <br className="hidden md:block" />
                      <span className="font-semibold">{activeData.info_title_bold}</span>
                    </h2>
                    <div className="space-y-6 mt-8 text-lg font-light text-muted-foreground leading-relaxed">
                      <p>{activeData.info_p1}</p>
                      <p>{activeData.info_p2}</p>
                      <p>{activeData.info_p3}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 border-t border-border pt-12">
                      {stats.map((stat: any) => (
                        <div key={stat.label}>
                          <div className="text-3xl font-semibold text-foreground mb-1">{stat.value}</div>
                          <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden">
                      <Image
                        src={activeData.info_image}
                        alt={isJakuzi ? 'Jakuzi Detay' : 'Tekne Detay'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Floating badge */}
                    <div className="absolute -bottom-8 -left-8 bg-surface border border-border p-8 rounded-[2rem] shadow-2xl max-w-[280px]">
                      <div className="text-champagne text-4xl font-semibold mb-2">{activeData.info_badge_value}</div>
                      <div className="text-sm font-medium text-foreground">{activeData.info_badge_label}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Features ── */}
            <section className="py-28 bg-background px-6">
              <div className="container mx-auto max-w-[1200px]">
                <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">Öne Çıkan <span className="font-semibold">Özellikler</span></h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Ürünlerimizde standart olarak sunduğumuz ayrıcalıklar.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature: any, index: number) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group p-8 rounded-[2rem] bg-surface hover:bg-white border border-border hover:border-champagne/30 transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-xl bg-background flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-champagne transition-all duration-300">
                        <feature.icon className="w-6 h-6 text-foreground group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Models ── */}
            <section className="py-28 bg-surface px-6">
              <div className="container mx-auto max-w-[1200px]">
                <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">Popüler <span className="font-semibold">Modeller</span></h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {activeData.models_desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {models.map((m: any, i: number) => (
                    <motion.div
                      key={m.name}
                      initial={{ opacity: 0.01, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "200px" }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      className="group bg-background rounded-3xl overflow-hidden border border-border hover:border-champagne/30 transition-all duration-500 hover:shadow-2xl hover:shadow-champagne/5 flex flex-col"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image src={m.image} alt={m.name} fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="p-8 flex flex-col flex-1">
                        <h3 className="text-xl font-medium mb-1 tracking-tight">{m.name}</h3>
                        <p className="text-xs text-champagne font-medium mb-6 tracking-wide">{m.dims}</p>
                        <ul className="space-y-3 mb-8 flex-1">
                          {m.specs.map((s: string) => (
                            <li key={s} className="flex items-center gap-3 text-sm text-muted-foreground">
                              <div className="w-1 h-1 rounded-full bg-champagne shrink-0" />{s}
                            </li>
                          ))}
                        </ul>
                        <Link href="/iletisim" className="w-full py-3.5 border border-border rounded-xl text-center text-sm font-medium hover:border-champagne hover:bg-champagne hover:text-black transition-all duration-300">
                          Fiyat Bilgisi Al
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════
          CTA
          ═══════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto px-6 max-w-[1440px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
              {content.cta?.title_normal} <span className="font-semibold">{content.cta?.title_bold}</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light mb-12">
              {content.cta?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/tasarla" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all">
                Tasarımına Başla
              </Link>
              <Link href="/koleksiyonlar" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-border text-foreground text-sm font-medium hover:bg-surface transition-all">
                Koleksiyonları İncele
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
