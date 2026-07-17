'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full  flex flex-col justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop"
          alt="Lüks banyo duşakabin"
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
      </div>

      {/* Ambient Light Effects — desktop only */}
      <div className="absolute inset-0 z-[5] pointer-events-none hidden md:block">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-champagne/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 max-w-[1440px] flex flex-col items-center text-center mt-20 md:mt-0 py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0.01, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            Premium Duşakabin Sistemleri
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0.01, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-light tracking-tight leading-[1.05] md:leading-[0.95] max-w-5xl"
        >
          Hayalinizdeki{' '}
          <span className="relative inline-block mt-1 md:mt-0">
            Duşakabin
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-champagne/0 via-champagne to-champagne/0 origin-left"
            />
          </span>
          <br className="hidden sm:block" />
          {' '}
          <span className="font-semibold block sm:inline mt-2 sm:mt-0">Size Özel Üretilir.</span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0.01, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 mt-6 md:mt-8 text-base md:text-xl max-w-2xl font-light leading-relaxed px-4 md:px-0"
        >
          Banyonuzun mimarisine özel tasarlanan, hassas mühendislik ve zamansız estetik ile üretilen premium duşakabin sistemleri.
        </motion.p>
        
        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0.01, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-10 md:mt-12 px-4 sm:px-0"
        >
          <Link 
            href="/tasarla" 
            className="group inline-flex items-center justify-center rounded-full bg-white text-black w-full sm:w-auto px-8 md:px-10 h-14 text-sm md:text-base font-semibold hover:bg-white/95 transition-all duration-300 shadow-2xl shadow-black/20 hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Tasarımına Başla
            <svg className="ml-2 size-4 md:size-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link 
            href="/koleksiyonlar" 
            className="inline-flex items-center justify-center rounded-full border border-white/20 text-white w-full sm:w-auto px-8 md:px-10 h-14 text-sm md:text-base font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
          >
            Koleksiyonu Keşfet
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0.01 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 mt-12 md:mt-16 text-white/50 text-[10px] sm:text-xs font-medium tracking-widest uppercase"
        >
          <span>10 Yıl Garanti</span>
          <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <span className="hidden sm:block">Özel Üretim</span>
          <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <span>Profesyonel Montaj</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0.01 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 hidden md:flex"
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
