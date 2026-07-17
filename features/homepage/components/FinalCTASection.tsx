'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { storageUrl } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

export function FinalCTASection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={storageUrl('uploads', 'homepage/final-cta.webp')}
          alt="Modern banyo tasarımı"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-[1440px] text-center flex flex-col items-center py-20 md:py-24">
        {/* Champagne Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 1, ease }}
          className="w-16 h-[2px] bg-champagne mb-8 origin-center"
        />

        {/* Pre-heading */}
        <motion.span
          initial={{ opacity: 0.01, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease }}
          className="text-champagne text-xs font-semibold tracking-widest uppercase mb-4 block"
        >
          Bir Sonraki Adım
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0.01, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="text-white text-2xl md:text-3xl lg:text-4xl font-light tracking-tight max-w-3xl leading-[1.1] mb-6"
        >
          Hayalinizdeki Duşakabini{' '}
          <span className="font-semibold">Tasarlamaya Hazır Mısınız?</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0.01, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-white/60 text-sm md:text-base max-w-xl mb-10"
        >
          Online konfigüratörümüzle dakikalar içinde tasarlayın veya
          uzmanlarımızla hemen iletişime geçin.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0.01, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/tasarla"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-black px-8 h-14 text-base font-semibold hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Konfigüratörü Başlat
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="https://wa.me/905000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/30 text-white px-8 h-14 text-base font-semibold hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="size-4" />
            WhatsApp ile İletişime Geç
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0.01 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="text-white/30 text-sm mt-16 tracking-wide"
        >
          2 Yıl Garanti &nbsp;·&nbsp; Ücretsiz Keşif &nbsp;·&nbsp; Taksit İmkânı
        </motion.p>
      </div>
    </section>
  )
}

