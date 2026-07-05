'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

export function ConfiguratorPreview() {
  return (
    <section className="py-32 lg:py-40 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-champagne/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-champagne text-sm font-medium tracking-[0.2em] uppercase block mb-4"
          >
            Erayduş Studio
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-4xl mx-auto leading-[1.05]"
          >
            Hayalinizdeki Tasarımı{' '}
            <span className="font-semibold">Yapılandırın</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mt-6"
          >
            Ölçüleri girin, cam rengini seçin, donanım özelliklerini belirleyin. Anında görüntüleyip fiyat alın.
          </motion.p>
        </div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-5xl mx-auto aspect-[16/9] bg-white/[0.03] border border-white/[0.06] rounded-3xl overflow-hidden relative group shadow-2xl shadow-black/40"
        >
          <img 
            src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop" 
            alt="Configurator Preview" 
            className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-[2s]"
          />
          
          {/* Floating Config Bar */}
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-black/60 backdrop-blur-2xl border border-white/[0.08] rounded-2xl">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-0.5">Model</p>
                  <p className="font-medium text-sm">EDGE Serisi</p>
                </div>
                <div className="w-[1px] h-8 bg-white/10 hidden md:block" />
                <div>
                  <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-0.5">Cam</p>
                  <p className="font-medium text-sm">Füme Bronz</p>
                </div>
                <div className="w-[1px] h-8 bg-white/10 hidden md:block" />
                <div className="hidden md:block">
                  <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-0.5">Profil</p>
                  <p className="font-medium text-sm">Mat Siyah</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-0.5">Tahmini</p>
                <p className="text-2xl font-light tracking-tight">₺14.500</p>
              </div>
            </div>
          </div>

          {/* Play-like center icon */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500 cursor-pointer">
              <svg className="size-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link 
            href="/configurator" 
            className="group inline-flex items-center justify-center rounded-full bg-white text-black px-10 h-14 text-base font-semibold hover:bg-white/95 transition-all duration-300 shadow-xl shadow-white/10"
          >
            Stüdyoyu Başlat
            <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://wa.me/905550000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 text-white px-8 h-14 text-base font-medium hover:bg-white/5 hover:border-white/25 transition-all duration-300"
          >
            <MessageCircle className="size-4" />
            Uzmanla Konuş
          </a>
        </motion.div>
      </div>
    </section>
  )
}
