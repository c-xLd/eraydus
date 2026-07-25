'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, ZoomIn, Search, ChevronLeft, ChevronRight, MessageCircle, Sparkles, Shield, Layers } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'

type Model = {
  id: string
  title: string
  image_url: string
}

const ease = [0.25, 0.46, 0.45, 0.94] as const

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const features = [
  { icon: Sparkles, title: 'Estetik & Mahremiyet', desc: 'Hem güzel hem fonksiyonel cam desenleri' },
  { icon: Layers,   title: 'Her Ölçüye Uygun',   desc: 'Standart ve özel ölçü camlara uygulanır' },
  { icon: Shield,   title: '2 Yıl Garanti',       desc: 'Kumlama deseni solma ve çizilmeye karşı' },
]

export function KumlamaClient({ initialModels }: { initialModels: Model[] }) {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [search, setSearch] = useState('')

  const filtered = initialModels.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase())
  )

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = selectedModel ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedModel])

  const openModel = (model: Model) => {
    const idx = filtered.findIndex(m => m.id === model.id)
    setSelectedIndex(idx)
    setSelectedModel(model)
  }

  const navigate = useCallback((dir: 1 | -1) => {
    const next = (selectedIndex + dir + filtered.length) % filtered.length
    setSelectedIndex(next)
    setSelectedModel(filtered[next])
  }, [selectedIndex, filtered])

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selectedModel) return
      if (e.key === 'Escape')      setSelectedModel(null)
      if (e.key === 'ArrowRight')  navigate(1)
      if (e.key === 'ArrowLeft')   navigate(-1)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [selectedModel, navigate])

  const whatsappText = selectedModel
    ? encodeURIComponent(`Merhaba, *${selectedModel.title}* kumlama deseni hakkında bilgi almak istiyorum.`)
    : encodeURIComponent('Merhaba, kumlama cam desenleri hakkında bilgi almak istiyorum.')

  return (
    <main className="min-h-screen bg-background pb-32 selection:bg-champagne/20">

      {/* ── Hero ── */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-champagne text-sm tracking-[0.3em] uppercase font-medium mb-5"
          >
            Kumlama Cam
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-4xl leading-[1.1] mb-6"
          >
            Banyonuza Özgün{' '}
            <span className="font-semibold">Cam Desenleri</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl leading-relaxed"
          >
            Mahremiyet ve estetiği buluşturan kumlama desenlerimizle duşakabininize kişisel bir dokunuş katın. Tüm standart ve özel ölçü camlara uygulanabilir.
          </motion.p>

          {/* Feature chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface border border-border/50"
              >
                <div className="p-1.5 rounded-lg bg-champagne/10">
                  <Icon className="size-4 text-champagne" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold leading-none">{title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Search + Count ── */}
      <AnimatedSection className="container mx-auto px-6 max-w-[1440px] mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-semibold">{filtered.length}</span> model
          </p>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Model ara…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface border border-border/60 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-champagne/60 transition-colors"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* ── Gallery Grid ── */}
      <section className="container mx-auto px-6 max-w-[1440px]" aria-label="Kumlama Modelleri Galerisi">
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground">
            <Search className="size-10 mx-auto mb-4 opacity-30" />
            <p>"{search}" için sonuç bulunamadı.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((model, index) => (
                <motion.article
                  key={model.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4), ease }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${model.title} modelini büyüt`}
                  onKeyDown={(e) => e.key === 'Enter' && openModel(model)}
                  onClick={() => openModel(model)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-surface border border-border/50 hover:border-champagne/30 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(201,168,106,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
                    <Image
                      src={model.image_url}
                      alt={model.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      priority={index < 12}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="size-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <ZoomIn className="size-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-3 border-t border-border/50">
                    <h2 className="font-medium text-xs md:text-sm text-foreground line-clamp-1 text-center">{model.title}</h2>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <AnimatedSection delay={0.1} className="container mx-auto px-6 max-w-[1440px] mt-24">
        <div className="relative rounded-3xl bg-surface-dark overflow-hidden p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* dot grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
          />
          <div className="relative z-10">
            <p className="text-champagne text-sm tracking-[0.25em] uppercase font-medium mb-3">Sipariş & Bilgi</p>
            <h2 className="text-2xl md:text-3xl font-light text-white leading-snug">
              Beğendiğiniz deseni hemen<br className="hidden md:block" />{' '}
              <span className="font-semibold">WhatsApp'tan sorun</span>
            </h2>
            <p className="text-white/50 text-sm mt-3 font-light">Tüm sorularınızı yanıtlıyor, ücretsiz numune gönderiyoruz.</p>
          </div>
          <a
            href={`https://wa.me/905548830071?text=${encodeURIComponent('Merhaba, kumlama cam desenleri hakkında bilgi almak istiyorum.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex-shrink-0 inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-[#128C7E] transition-all duration-300 shadow-[0_4px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_40px_rgba(37,211,102,0.45)] hover:-translate-y-0.5"
          >
            <MessageCircle className="size-5" />
            WhatsApp'tan Yaz
          </a>
        </div>
      </AnimatedSection>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setSelectedModel(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              aria-label="Kapat"
              onClick={(e) => { e.stopPropagation(); setSelectedModel(null) }}
            >
              <X className="size-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-medium tracking-widest select-none">
              {selectedIndex + 1} / {filtered.length}
            </div>

            {/* Main card */}
            <motion.div
              key={selectedModel.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: 'spring', damping: 28, stiffness: 340 }}
              className="relative flex flex-col md:flex-row w-full h-full md:h-auto md:max-w-5xl md:max-h-[88vh] md:rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.y) > 110) setSelectedModel(null)
              }}
            >
              {/* Left — Image */}
              <div className="relative flex-1 bg-zinc-900 min-h-[55vw] md:min-h-0 select-none touch-none">
                <Image
                  src={selectedModel.image_url}
                  alt={selectedModel.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 65vw"
                  className="object-contain pointer-events-none"
                  priority
                />

                {/* Prev / Next — over image */}
                {filtered.length > 1 && (
                  <>
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
                      aria-label="Önceki"
                      onClick={(e) => { e.stopPropagation(); navigate(-1) }}
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
                      aria-label="Sonraki"
                      onClick={(e) => { e.stopPropagation(); navigate(1) }}
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Right — Info panel */}
              <div className="flex flex-col justify-between gap-8 bg-[#111] md:w-80 p-8 md:p-10">
                <div className="flex flex-col gap-6">
                  {/* Label */}
                  <p className="text-[11px] tracking-[0.3em] uppercase text-champagne font-medium">
                    Kumlama Deseni
                  </p>

                  {/* Title */}
                  <div>
                    <h3 id="modal-title" className="text-2xl md:text-3xl font-semibold text-white leading-tight">
                      {selectedModel.title}
                    </h3>
                    <div className="h-px bg-gradient-to-r from-champagne/40 to-transparent mt-5" />
                  </div>

                  {/* Details */}
                  <ul className="flex flex-col gap-3">
                    {[
                      'Standart ve özel ölçü camlara uygulanır',
                      'UV dayanımlı, solmaz boya',
                      '2 yıl üretici garantisi',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/60 font-light">
                        <span className="mt-1.5 size-1.5 rounded-full bg-champagne shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/905548830071?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-2.5 bg-[#25D366] text-white px-6 py-3.5 rounded-2xl text-sm font-semibold hover:bg-[#128C7E] transition-colors shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
                  >
                    <MessageCircle className="size-4" />
                    Bu Deseni İstiyorum
                  </a>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedModel(null) }}
                    className="flex items-center justify-center px-6 py-3 rounded-2xl text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
