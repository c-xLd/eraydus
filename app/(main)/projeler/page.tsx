'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as const

const categories = ['Tümü', 'Otel', 'Rezidans', 'Villa', 'Ticari'] as const

type Category = (typeof categories)[number]

interface Project {
  id: number
  name: string
  location: string
  category: Exclude<Category, 'Tümü'>
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    name: 'The Bosphorus Palace Hotel',
    location: 'İstanbul, Beşiktaş',
    category: 'Otel',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Alaçatı Beyaz Rezidans',
    location: 'İzmir, Çeşme',
    category: 'Rezidans',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Bodrum Kıyı Villa',
    location: 'Muğla, Bodrum',
    category: 'Villa',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Zorlu Center Premium Spa',
    location: 'İstanbul, Beşiktaş',
    category: 'Ticari',
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Cappadocia Cave Suites',
    location: 'Nevşehir, Göreme',
    category: 'Otel',
    image:
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Nişantaşı Terrace Rezidans',
    location: 'İstanbul, Şişli',
    category: 'Rezidans',
    image:
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop',
  },
]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('Tümü')

  const filteredProjects =
    activeFilter === 'Tümü'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="flex flex-col w-full">
      {/* ───────────── Hero ───────────── */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="text-champagne text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            Referanslarımız
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-3xl leading-[1.1]"
          >
            Mimari{' '}
            <span className="font-semibold">Projeler</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
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
      <section className="pb-16 md:pb-20 bg-background sticky top-20 z-30">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease,
                  }}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface">
                      {/* Image */}
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center">
                        <motion.div
                          className="flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        >
                          <span className="text-white text-lg font-medium tracking-wide">
                            Detayı İncele
                          </span>
                          <ArrowRight className="w-5 h-5 text-champagne" />
                        </motion.div>
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
                      <div className="flex items-center gap-1.5 mt-2">
                        <MapPin
                          className="w-3.5 h-3.5 text-muted-foreground"
                          strokeWidth={1.5}
                        />
                        <span className="text-muted-foreground text-sm font-light">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
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

      {/* ───────────── CTA ───────────── */}
      <section className="py-32 md:py-44 bg-surface-dark text-white">
        <div className="container mx-auto px-6 max-w-[1440px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
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

