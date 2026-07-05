'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

export function FinalCTASection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
          alt="Modern banyo tasarımı"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-[1440px] text-center flex flex-col items-center py-32">
        {/* Champagne Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="w-16 h-[2px] bg-champagne mb-12 origin-center"
        />

        {/* Pre-heading */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-champagne text-sm font-medium tracking-widest uppercase mb-8 block"
        >
          Bir Sonraki Adım
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-5xl leading-[1.1] mb-8"
        >
          Hayalinizdeki Duşakabini{' '}
          <span className="font-semibold">Tasarlamaya Hazır Mısınız?</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mb-14"
        >
          Online konfigüratörümüzle dakikalar içinde tasarlayın veya
          uzmanlarımızla hemen iletişime geçin.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/configurator"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-white text-black px-10 h-16 text-lg font-medium hover:bg-white/90 transition-colors"
          >
            Konfigüratörü Başlat
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/30 text-white px-10 h-16 text-lg font-medium hover:bg-white/10 transition-colors"
          >
            <MessageCircle className="size-5" />
            WhatsApp ile İletişime Geç
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="text-white/30 text-sm mt-16 tracking-wide"
        >
          10 Yıl Garanti &nbsp;·&nbsp; Ücretsiz Keşif &nbsp;·&nbsp; Taksit İmkânı
        </motion.p>
      </div>
    </section>
  )
}
