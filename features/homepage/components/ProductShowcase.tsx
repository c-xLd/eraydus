'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { FeaturedCategory } from '../services/homepage'

interface ProductShowcaseProps {
  categories: FeaturedCategory[]
}

export function ProductShowcase({ categories }: ProductShowcaseProps) {
  return (
    <section className="py-32 bg-background text-foreground ">
      <div className="container mx-auto px-6 max-w-[1440px] mb-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0.01, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              className="text-champagne text-sm font-medium tracking-[0.2em] uppercase block mb-4"
            >
              Koleksiyonlar
            </motion.span>
            <motion.h2
              initial={{ opacity: 0.01, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl font-light tracking-tight"
            >
              Mimari Koleksiyon
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0.01 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/koleksiyonlar" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
              Tüm Koleksiyonu İncele
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0.01, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/koleksiyonlar?kategori=${model.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-surface">
                  {model.image_url ? (
                    <Image
                      src={model.image_url}
                      alt={model.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface flex items-center justify-center">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">Görsel Yok</span>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Badge */}
                  {model.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-black tracking-wide">
                        {model.badge}
                      </span>
                    </div>
                  )}

                  {/* Bottom CTA on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                      Koleksiyonu Keşfet <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold tracking-tight">{model.name}</h3>
                    {model.subtitle && <span className="text-xs text-muted-foreground font-medium">{model.subtitle}</span>}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{model.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
