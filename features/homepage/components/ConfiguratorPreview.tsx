'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { storageUrl } from '@/lib/utils'

export function ConfiguratorPreview() {
  return (
    <section className="py-20 md:py-24 bg-[#0A0A0A] text-white relative ">
      {/* Ambient Glow */}
      <div className="absolute inset-0 z-0  pointer-events-none">
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-champagne/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ y: 10 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            className="text-champagne text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
          >
            Banyonu Tasarla
          </motion.span>

          <motion.h2
            initial={{ y: 25 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight max-w-2xl mx-auto"
          >
            Banyonuz İçin Anında{' '}
            <span className="font-semibold text-champagne">Fiyat Hesaplayın</span>
          </motion.h2>

          <motion.p
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed"
          >
            Banyonuzun ölçülerini girin, cam modelini ve profil rengini seçin; banyonuza özel duşakabin fiyatını anında görün.
          </motion.p>
        </div>

        {/* Preview Card */}
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-5xl mx-auto aspect-[16/9] overflow-hidden bg-white/[0.03] border border-white/[0.06] rounded-3xl relative group shadow-2xl shadow-black/40"
        >
          <Image
            src={storageUrl('uploads', 'homepage/configurator.jpg')}
            alt="Duşakabin konfigüratör önizlemesi"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 1000px"
            className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-[2s]"
          />

          {/* Floating Config Bar */}
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-black/75 backdrop-blur-2xl border border-white/[0.1] rounded-2xl">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-0.5">Model Türü</p>
                  <p className="font-medium text-sm">Sürgülü Kabin Sistem</p>
                </div>
                <div className="w-[1px] h-8 bg-white/10 hidden md:block" />
                <div>
                  <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-0.5">Cam Seçimi</p>
                  <p className="font-medium text-sm">Şeffaf Temperli Cam (6mm)</p>
                </div>
                <div className="w-[1px] h-8 bg-white/10 hidden md:block" />
                <div className="hidden md:block">
                  <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-0.5">Profil Rengi</p>
                  <p className="font-medium text-sm">Siyah Mat Paslanmaz</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-0.5">Örnek Tahmini Fiyat</p>
                <p className="text-2xl font-light tracking-tight text-champagne">₺15.900</p>
              </div>
            </div>
          </div>

          {/* Play-like center icon */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500 cursor-pointer">
              <svg className="size-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link
            href="/tasarla"
            className="group inline-flex items-center justify-center rounded-full bg-champagne text-black px-10 h-14 text-base font-semibold hover:bg-champagne/90 transition-all duration-300 shadow-xl shadow-champagne/20"
          >
            Modelini Tasarla & Fiyat Al
            <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://wa.me/905550000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white px-8 h-14 text-base font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
          >
            <MessageCircle className="size-4" />
            WhatsApp'tan Ölçü Gönder
          </a>
        </motion.div>
      </div>
    </section>
  )
}

