'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop"
          alt="Luxury Bathroom"
          className="w-full h-full object-cover object-center scale-105"
        />
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 max-w-[1440px] flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-xs font-medium tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            Premium Duşakabin Sistemleri
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-[clamp(2.5rem,7vw,7rem)] font-light tracking-[-0.03em] leading-[0.95] max-w-5xl"
        >
          Hayalinizdeki{' '}
          <span className="relative inline-block">
            Duşakabin
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-champagne/0 via-champagne to-champagne/0 origin-left"
            />
          </span>
          <br />
          <span className="font-semibold">Size Özel Üretilir.</span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 mt-8 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
        >
          Banyonuzun mimarisine özel tasarlanan, hassas mühendislik ve zamansız estetik ile üretilen premium duşakabin sistemleri.
        </motion.p>
        
        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <Link 
            href="/configurator" 
            className="group inline-flex items-center justify-center rounded-full bg-white text-black px-10 h-14 text-base font-semibold hover:bg-white/95 transition-all duration-300 shadow-2xl shadow-black/20 hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Tasarımına Başla
            <svg className="ml-2 size-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link 
            href="/collections" 
            className="inline-flex items-center justify-center rounded-full border border-white/20 text-white px-10 h-14 text-base font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
          >
            Koleksiyonu Keşfet
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex items-center gap-8 mt-16 text-white/40 text-xs font-medium tracking-wider uppercase"
        >
          <span>10 Yıl Garanti</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Özel Üretim</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Profesyonel Montaj</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-medium">Keşfet</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-0.5 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
