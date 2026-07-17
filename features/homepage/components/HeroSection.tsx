'use client'

import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  const { scrollY } = useScroll()
  
  // Parallax calculations
  const y = useTransform(scrollY, [0, 800], [0, 240])
  const scale = useTransform(scrollY, [0, 800], [1.05, 1.15])
  const contentY = useTransform(scrollY, [0, 500], [0, -60])
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-black select-none">
      {/* Background (Parallax) */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/85 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop"
          alt="Lüks banyo duşakabin"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />
      </motion.div>

      {/* Ambient Light Effects (Desktop) */}
      <div className="absolute inset-0 z-[5] pointer-events-none hidden md:block">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-champagne/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 container mx-auto px-6 max-w-[1440px] flex flex-col justify-between min-h-[100dvh] pt-28 pb-8 -webkit-tap-highlight-color-transparent text-center"
      >
        {/* Center alignment helper */}
        <div className="flex-1 flex flex-col items-center justify-center my-auto">
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <span className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse shadow-[0_0_8px_#c9a86a]" />
              Premium Duşakabin Sistemleri
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] xl:text-[5.5rem] font-light tracking-tight leading-[1.05] md:leading-[0.95] max-w-5xl"
          >
            Hayalinizdeki{' '}
            <span className="relative inline-block mt-1 md:mt-0 text-champagne font-normal">
              Duşakabin
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-champagne/0 via-champagne to-champagne/0 origin-center"
              />
            </span>
            <br className="hidden sm:block" />
            {' '}
            <span className="font-semibold block sm:inline mt-2 sm:mt-0 text-white">Size Özel Üretilir.</span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-white/60 mt-6 md:mt-8 text-base md:text-xl max-w-2xl font-light leading-relaxed px-4 md:px-0"
          >
            Banyonuzun mimarisine özel tasarlanan, hassas mühendislik ve zamansız estetik ile üretilen premium duşakabin sistemleri.
          </motion.p>
          
          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8 md:mt-10 px-4 sm:px-0"
          >
            <Link 
              href="/tasarla" 
              className="group inline-flex items-center justify-center rounded-2xl bg-champagne text-black w-full sm:w-auto px-8 md:px-10 h-14 text-sm md:text-base font-semibold hover:bg-champagne/90 transition-all duration-300 shadow-[0_4px_20px_rgba(201,168,106,0.3)] hover:shadow-[0_8px_30px_rgba(201,168,106,0.5)] hover:-translate-y-0.5"
            >
              Tasarımına Başla
              <svg className="ml-2 size-4 md:size-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link 
              href="/koleksiyonlar" 
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 text-white w-full sm:w-auto px-8 md:px-10 h-14 text-sm md:text-base font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5"
            >
              Koleksiyonu Keşfet
            </Link>
          </motion.div>
        </div>

        {/* Bottom Group */}
        <div className="flex flex-col items-center gap-8 mt-12 w-full">
          {/* Trust Indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 text-white/40 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase"
          >
            <span>2 Yıl Garanti</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
            <span className="hidden sm:block">Özel Üretim</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
            <span>Profesyonel Montaj</span>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0.01 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="flex flex-col items-center gap-2 hidden md:flex"
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
        </div>
      </motion.div>
    </section>
  )
}
