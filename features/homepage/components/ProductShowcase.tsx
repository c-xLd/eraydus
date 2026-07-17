'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { FeaturedCategory } from '../services/homepage'

interface ProductShowcaseProps {
  categories: FeaturedCategory[]
}

const ease = [0.16, 1, 0.3, 1] as const

export function ProductShowcase({ categories }: ProductShowcaseProps) {
  return (
    <section className="py-24 md:py-32 bg-background text-foreground relative overflow-hidden border-b border-border/20">
      
      {/* Blueprint coordinates background accent */}
      <div className="pointer-events-none absolute right-12 top-10 font-mono text-[9px] text-muted-foreground/30 tracking-widest hidden md:block select-none">
        INDEX // SEC-02 // COLLECTIONS
      </div>

      <div className="container mx-auto px-6 max-w-[1440px]">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-border/40 pb-8 relative z-10">
          <div>
            <motion.span
              initial={{ opacity: 0.01, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.6, ease }}
              className="text-champagne text-xs font-semibold tracking-[0.25em] font-mono uppercase block mb-3"
            >
              [ SEÇKİN SERİLER ]
            </motion.span>
            <motion.h2
              initial={{ opacity: 0.01, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="text-3xl md:text-4xl font-light tracking-tight text-foreground leading-none"
            >
              Mimari <span className="font-semibold text-champagne">Koleksiyonlar</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0.01, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <Link
              href="/koleksiyonlar"
              className="group relative inline-flex items-center gap-3 text-foreground/75 hover:text-foreground text-sm font-medium tracking-wide transition-colors pb-1.5"
            >
              <span>Tüm Koleksiyonu İncele</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              {/* Underline animation */}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-border transition-colors group-hover:bg-champagne/30" />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne transition-all duration-400 ease-out group-hover:w-full" />
            </Link>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0.01, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
            >
              <Link
                href={`/koleksiyonlar?kategori=${model.slug}`}
                className="group relative block aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-surface ring-1 ring-border/50 shadow-sm hover:shadow-2xl hover:shadow-champagne/5 transition-all duration-700"
              >
                
                {/* Tech specifications label overlay */}
                <div className="absolute top-6 left-6 text-white/50 font-mono text-[9px] tracking-widest z-10 pointer-events-none uppercase">
                  [ COMP-0{i + 1} // ERD ]
                </div>

                {/* Badge Overlay */}
                {model.badge && (
                  <div className="absolute top-6 right-6 z-10">
                    <span className="px-3 py-1.5 rounded-full bg-zinc-950/60 backdrop-blur-md border border-white/10 text-[9px] font-semibold text-white tracking-widest uppercase font-mono">
                      {model.badge}
                    </span>
                  </div>
                )}

                {/* Image Component */}
                {model.image_url ? (
                  <Image
                    src={model.image_url}
                    alt={model.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">Görsel Bulunmuyor</span>
                  </div>
                )}

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 opacity-80 group-hover:opacity-90" />

                {/* Card Details Overlay */}
                <div className="absolute bottom-8 left-8 right-8 text-left z-10">
                  <span className="text-champagne/90 text-[10px] font-mono tracking-[0.2em] uppercase mb-1.5 block">
                    {model.subtitle || 'MİMARİ KOLEKSİYON'}
                  </span>
                  <h3 className="text-2xl font-light text-white tracking-tight group-hover:text-champagne transition-colors duration-500">
                    {model.name}
                  </h3>
                  
                  {/* Grid expanding drawer for description & CTA */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 group-hover:opacity-100 pt-2">
                    <div className="overflow-hidden">
                      <p className="text-zinc-300/90 text-xs font-light leading-relaxed mb-4 line-clamp-2">
                        {model.description || 'Kusursuz sızdırmazlık teknolojisi ve yalın hatlarla banyonuza uyum sağlayan özel seri.'}
                      </p>
                      <span className="inline-flex items-center gap-2 text-white text-xs font-medium uppercase tracking-wider group/btn">
                        Koleksiyonu Keşfet
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-champagne text-zinc-950 scale-90 group-hover/btn:scale-100 transition-transform duration-300">
                          <ArrowRight className="size-3" />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
