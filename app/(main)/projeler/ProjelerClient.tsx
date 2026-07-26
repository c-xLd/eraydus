'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

type Category = 'Tümü' | 'Otel' | 'Rezidans' | 'Villa' | 'Ticari'

interface Project {
  id: number
  name: string
  location: string
  category: Category
  description: string
  image: string
}

const categories: Category[] = ['Tümü', 'Otel', 'Rezidans', 'Villa', 'Ticari']

const projects: Project[] = [
  {
    id: 1,
    name: 'The Bosphorus Palace Hotel',
    location: 'İstanbul',
    category: 'Otel',
    description: '150 odalı lüks butik otel projesi. Özel tasarım altın sarısı profiller ve ekstra şeffaf temperli cam uygulamaları.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    name: 'Marina Vista Suites',
    location: 'Bodrum',
    category: 'Rezidans',
    description: '80 daireli premium rezidans projesi. Minimalist çerçevesiz sürme sistemler ve bronz cam tasarımları.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 3,
    name: 'Göl Evleri Villaları',
    location: 'Sapanca',
    category: 'Villa',
    description: '45 adet müstakil villa projesi. Siyah mat profil detaylı, endüstriyel tasarımlı grid duşakabin çözümleri.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 4,
    name: 'Plaza 360 Gym & Spa',
    location: 'Ankara',
    category: 'Ticari',
    description: 'VIP spor ve spa merkezi. Toplu kullanım alanları için özel kumlama desenli, mahremiyet odaklı sistemler.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 5,
    name: 'Azure Resort & Spa',
    location: 'Antalya',
    category: 'Otel',
    description: '5 yıldızlı tatil köyü projesi. 400 adet standart ve süit oda için uzun ömürlü, kolay temizlenebilir nano-glass çözümler.',
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 6,
    name: 'Skyline Towers',
    location: 'İzmir',
    category: 'Rezidans',
    description: 'Yüksek katlı rezidans kulesi. Dar alanlar için özel ölçülendirilmiş, katlanır kapılı kompakt duş sistemleri.',
    image: 'https://images.unsplash.com/photo-1559841644-08984562005a?auto=format&fit=crop&q=80&w=1200',
  },
]

export function ProjelerClient() {
  const [activeFilter, setActiveFilter] = useState<Category>('Tümü')
  const [selected, setSelected] = useState<Project | null>(null)

  const filteredProjects = projects.filter(
    (p) => activeFilter === 'Tümü' || p.category === activeFilter
  )

  const currentIndex = selected ? projects.findIndex((p) => p.id === selected.id) : -1

  const goTo = (dir: number) => {
    if (!selected) return
    let nextIndex = currentIndex + dir
    if (nextIndex < 0) nextIndex = projects.length - 1
    if (nextIndex >= projects.length) nextIndex = 0
    setSelected(projects[nextIndex])
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selected) return
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowLeft') goTo(-1)
      if (e.key === 'ArrowRight') goTo(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selected, currentIndex])

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selected])

  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <div className="flex w-full flex-col">
      {/* ───────────── Hero ───────────── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0.01, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            <p className="text-champagne text-sm tracking-[0.3em] uppercase font-medium mb-6">
              Referanslarımız
            </p>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] max-w-4xl">
              İmza Attığımız <span className="font-semibold">Projeler</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-light mt-6 max-w-2xl">
              Türkiye'nin ve dünyanın önde gelen konut, otel ve ticari
              projelerinde ERAYDUŞ kalitesi tercih ediliyor.
            </p>
          </motion.div>

          {/* ───────────── Filters ───────────── */}
          <motion.div
            initial={{ opacity: 0.01, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex flex-wrap items-center gap-3 mt-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 h-12 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-foreground text-background shadow-lg'
                    : 'bg-surface text-foreground hover:bg-surface-dark hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────────── Projects Grid ───────────── */}
      <section className="pb-32 md:pb-44 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0.01 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.01 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0.01, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    className="group block w-full text-left cursor-pointer"
                    aria-label={`${project.name} görselini büyüt`}
                  >
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface">
                      {/* Image */}
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <ZoomIn className="w-6 h-6 text-white" />
                          <span className="text-white text-sm font-medium tracking-wide">
                            Görseli Büyüt
                          </span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-5 left-5 z-10">
                        <span className="inline-block bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium tracking-wider uppercase px-4 py-2 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Info */}
                    <div className="mt-5">
                      <h3 className="text-xl font-semibold tracking-tight group-hover:text-champagne transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-sm font-light mt-2 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-3">
                        <MapPin
                          className="w-3.5 h-3.5 text-muted-foreground"
                          strokeWidth={1.5}
                        />
                        <span className="text-muted-foreground text-sm font-light">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0.01 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <p className="text-muted-foreground text-lg font-light">
                Bu kategoride henüz proje bulunmamaktadır.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0.01 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.01 }}
            transition={{ duration: 0.3, ease }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />

            {/* Close */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev / Next */}
            <button
              type="button"
              onClick={() => goTo(-1)}
              className="absolute left-3 md:left-6 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Önceki"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(1)}
              className="absolute right-3 md:right-6 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Sonraki"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.div
              key={selected.id}
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.96, opacity: 0.01, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0.01, y: 12 }}
              transition={{ duration: 0.35, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden rounded-3xl bg-surface shadow-2xl ring-1 ring-white/10">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
                {/* Caption overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-6 md:p-8">
                  <span className="mb-2 inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-champagne">
                    {selected.category}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {selected.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-white/70">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {selected.location}
                  </div>
                </div>
              </div>

              <p className="mx-auto mt-4 max-w-2xl text-center text-sm font-light leading-relaxed text-white/80 md:text-base">
                {selected.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────── CTA ───────────── */}
      <section className="py-32 md:py-44 bg-surface-dark text-white">
        <div className="container mx-auto px-6 max-w-[1440px] text-center">
          <motion.div
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
          >
            <span className="text-champagne text-sm tracking-[0.3em] uppercase font-medium">
              Projenizi Gerçekleştirelim
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mt-6">
              Sıradaki Proje{' '}
              <span className="font-semibold">Sizinki Olsun</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-light mt-6 max-w-2xl mx-auto">
              Otel, rezidans, villa veya ticari projeniz için ERAYDUŞ kalitesini
              deneyimleyin. Mimari ekibimiz sizin için hazır.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-10 h-14 text-base font-medium hover:bg-white/90 transition-colors"
              >
                Teklif Alın
              </Link>
              <Link
                href="/tasarla"
                className="inline-flex items-center justify-center rounded-full border border-white/20 text-white px-10 h-14 text-base font-medium hover:bg-white/10 transition-colors"
              >
                Konfigüratörü Deneyin
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
