'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden flex items-center justify-center">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 z-0 bg-surface-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop"
          alt="Luxury Bathroom"
          className="w-full h-full object-cover object-center opacity-60"
        />
      </div>

      <div className="relative z-20 container mx-auto px-6 max-w-[1440px] flex flex-col items-center text-center mt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-tight max-w-4xl"
        >
          Hayalinizdeki Duşakabin. <br />
          <span className="font-semibold">Size Özel Üretilir.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/80 mt-8 text-lg md:text-xl max-w-2xl font-light"
        >
          Premium custom shower cabins designed specifically for your bathroom with precision engineering and timeless aesthetics.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <Link href="/configurator" className="inline-flex items-center justify-center rounded-full bg-white text-black px-10 h-16 text-lg font-medium hover:bg-white/90 transition-colors">
            Tasarla ve Başla
          </Link>
          <Link href="/collections" className="inline-flex items-center justify-center rounded-full border border-white/30 text-white px-10 h-16 text-lg font-medium hover:bg-white/10 transition-colors">
            Koleksiyonu Keşfet
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Keşfetmek İçin Kaydır</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  )
}
