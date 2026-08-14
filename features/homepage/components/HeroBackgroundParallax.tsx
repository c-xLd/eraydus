'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { storageUrl } from '@/lib/utils'

export function HeroBackgroundParallax() {
  const { scrollY } = useScroll()

  // Parallax calculations strictly for background image
  const y = useTransform(scrollY, [0, 800], [0, 200])
  const scale = useTransform(scrollY, [0, 800], [1, 1.1])

  return (
    <motion.div style={{ y, scale }} className="absolute inset-0 z-0 will-change-transform">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/85 z-10" />
      <Image
        src={storageUrl('uploads', 'homepage/hero.jpg')}
        alt="Lüks banyo duşakabin"
        fill
        priority
        fetchPriority="high"
        quality={75}
        sizes="(max-width: 640px) 640px, 1200px"
        className="object-cover object-center pointer-events-none"
      />
    </motion.div>
  )
}

export function HeroScrollIndicator() {
  return (
    <div className="hidden md:flex flex-col items-center gap-2">
      <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-medium">Keşfet</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
      >
        <div className="w-0.5 h-1.5 rounded-full bg-white/60" />
      </motion.div>
    </div>
  )
}
