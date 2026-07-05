'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

interface Testimonial {
  id: number
  name: string
  role: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Elif Karaca',
    role: 'İç Mimar, İstanbul',
    quote:
      'Projelerimde yıllardır Erayduş ile çalışıyorum. Özel ölçü üretim kapasiteleri ve malzeme kalitesi, müşterilerime her zaman en iyisini sunmamı sağlıyor. Detaylara gösterdikleri özen gerçekten takdire şayan.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mehmet Aydın',
    role: 'Villa Sahibi, Bodrum',
    quote:
      'Bodrum\'daki villamız için EDGE serisini tercih ettik. Montaj ekibi son derece profesyoneldi ve sonuç beklentilerimizin çok ötesinde oldu. Üç yıldır ilk günkü gibi kusursuz duruyor.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ayşe Demir',
    role: 'Otel İşletmecisi, Antalya',
    quote:
      'Otelimizin 48 odasının tamamı için Erayduş duşakabinleri kullanıyoruz. Toplu siparişlerdeki profesyonellikleri, zamanında teslimatları ve garanti sonrası destekleri ile sektördeki en güvenilir iş ortağımız oldular.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="py-32 md:py-40 bg-surface-dark text-white overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-champagne/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="text-champagne text-sm font-medium tracking-widest uppercase mb-6 block"
          >
            Müşteri Deneyimleri
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight"
          >
            Güven, <span className="font-semibold">Söze Değil İşe Bakar</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col items-center"
            >
              {/* Quote Mark */}
              <span className="text-champagne/30 text-[120px] md:text-[160px] font-serif leading-none select-none -mb-12 md:-mb-16">
                &ldquo;
              </span>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white/90 max-w-3xl mb-10">
                {testimonials[currentIndex].quote}
              </blockquote>

              {/* Stars */}
              <div className="flex gap-1.5 mb-6">
                {Array.from({ length: testimonials[currentIndex].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="size-5 text-champagne fill-champagne"
                    />
                  )
                )}
              </div>

              {/* Author */}
              <p className="text-lg font-medium text-white">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-white/50 text-sm mt-1">
                {testimonials[currentIndex].role}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-3 mt-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="relative h-1 rounded-full transition-all duration-500 overflow-hidden"
                style={{ width: i === currentIndex ? 48 : 16 }}
                aria-label={`Testimonial ${i + 1}`}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full" />
                {i === currentIndex && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: 'linear' }}
                    className="absolute inset-0 bg-champagne rounded-full origin-left"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
