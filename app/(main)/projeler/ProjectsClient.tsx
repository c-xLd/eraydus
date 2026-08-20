'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const ease = [0.16, 1, 0.3, 1] as const

export interface Project {
  id: string
  name: string
  location: string
  category: string
  description: string
  image_url: string
}

interface ProjectsClientProps {
  projects: Project[]
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const categories = ['Tümü', ...Array.from(new Set(projects.map((p) => p.category)))]
  const [activeFilter, setActiveFilter] = useState<string>('Tümü')
  const [selected, setSelected] = useState<Project | null>(null)

  const filteredProjects =
    activeFilter === 'Tümü'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const currentIndex = selected ? filteredProjects.findIndex((p) => p.id === selected.id) : -1

  const goTo = (dir: number) => {
    if (currentIndex === -1 || filteredProjects.length === 0) return
    const next = (currentIndex + dir + filteredProjects.length) % filteredProjects.length
    setSelected(filteredProjects[next])
  }

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowLeft') goTo(-1)
      if (e.key === 'ArrowRight') goTo(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, currentIndex, filteredProjects])

  return (
    <div className="flex flex-col w-full">
      {/* ───────────── Hero ───────────── */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <motion.p
            initial={{ y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="text-champagne text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            Referanslarımız
          </motion.p>
          <motion.h1
            initial={{ y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-3xl leading-[1.1]"
          >
            Referans{' '}
            <span className="font-semibold">Projeler</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="text-muted-foreground text-lg md:text-xl font-light mt-6 max-w-2xl"
          >
            Türkiye'nin en prestijli projelerinde ERAYDUŞ imzası. Her biri
            titizlikle tasarlanmış, özenle tamamlanmış referanslarımız.
          </motion.p>
        </div>
      </section>

      {/* ───────────── Filter Bar ───────────── */}
      <section className="pb-16 md:pb-20 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <motion.div
            initial={{ y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeFilter === category
                    ? 'bg-foreground text-background'
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
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '50px' }}
                  transition={{
                    duration: 0.4,
                    delay: (index % 4) * 0.08,
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
                      <Image
                        src={project.image_url}
                        alt={project.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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

      {/* Lightbox Modal (Split Layout) */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 lg:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              onClick={() => setSelected(null)}
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 md:top-6 md:right-6 z-50 flex size-10 md:size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
              aria-label="Kapat"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Split Container */}
            <motion.div
              key={selected.id}
              className="relative w-full h-full max-w-[1600px] flex flex-col md:flex-row overflow-hidden rounded-none md:rounded-[2rem] bg-[#0A0A0A] border-0 md:border md:border-white/5 shadow-2xl"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Section (Left) */}
              <div className="relative w-full h-[60vh] md:h-full md:flex-1 bg-black/90 flex items-center justify-center p-0 md:p-12 group">
                <Image
                  src={selected.image_url}
                  alt={selected.name}
                  fill
                  loading="eager"
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />

                {/* Prev / Next controls inside the image area */}
                <button
                  type="button"
                  onClick={() => goTo(-1)}
                  className="absolute left-2 md:left-4 z-40 flex size-10 md:size-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-105 active:scale-95 border border-white/10 md:opacity-0 md:group-hover:opacity-100"
                  aria-label="Önceki"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  className="absolute right-2 md:right-4 z-40 flex size-10 md:size-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-105 active:scale-95 border border-white/10 md:opacity-0 md:group-hover:opacity-100"
                  aria-label="Sonraki"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>

              {/* Info Section (Right) */}
              <div className="w-full h-[40vh] md:h-auto md:w-[400px] lg:w-[480px] shrink-0 flex flex-col p-6 md:p-12 lg:p-16 bg-[#0F0F0F] overflow-y-auto">
                <div className="mt-2 md:my-auto">
                  <span className="mb-2 md:mb-4 inline-block text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-champagne">
                    {selected.category}
                  </span>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight mb-4 md:mb-6">
                    {selected.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-white/80 mb-6 pb-6 border-b border-white/5">
                    <div className="flex size-6 md:size-8 rounded-full bg-white/5 items-center justify-center shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-champagne" strokeWidth={1.5} />
                    </div>
                    <span className="font-light tracking-wide">{selected.location}</span>
                  </div>
                  
                  <p className="text-sm md:text-base font-light leading-relaxed text-white/60">
                    {selected.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────── CTA ───────────── */}
      <section className="py-32 md:py-44 bg-surface-dark text-white">
        <div className="container mx-auto px-6 max-w-[1440px] text-center">
          <motion.div
            initial={{ y: 30 }}
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
              deneyimleyin. Uzman ekibimiz sizin için hazır.
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
