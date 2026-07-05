'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ConfiguratorPreview() {
  return (
    <section className="py-32 bg-surface-dark text-white relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-champagne/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10 flex flex-col items-center text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-champagne text-sm font-medium tracking-widest uppercase mb-6"
        >
          Erayduş Studio
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-light tracking-tight max-w-3xl mb-8"
        >
          Hayalinizdeki Tasarımı 3 Boyutlu Olarak Yapılandırın
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/60 text-lg max-w-2xl mb-12"
        >
          Ölçüleri girin, cam rengini seçin, donanım özelliklerini belirleyin ve anında 3D olarak görüntüleyip fiyat alın.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-5xl aspect-video bg-surface-black/50 border border-white/10 rounded-[32px] mb-12 overflow-hidden relative group backdrop-blur-sm flex items-center justify-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop" 
            alt="Configurator Preview" 
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2s]"
          />
          <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="flex gap-4 text-left">
              <div>
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Model</p>
                <p className="font-medium">EDGE Serisi</p>
              </div>
              <div className="w-[1px] h-full bg-white/10" />
              <div>
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Cam</p>
                <p className="font-medium">Füme Bronz</p>
              </div>
              <div className="w-[1px] h-full bg-white/10 hidden md:block" />
              <div className="hidden md:block">
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Profil</p>
                <p className="font-medium">Mat Siyah</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Tahmini Fiyat</p>
              <p className="text-2xl font-light">₺ 14,500</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/configurator" className="inline-flex items-center justify-center rounded-full bg-white text-black px-10 h-16 text-lg font-medium hover:bg-white/90 transition-colors">
            Stüdyoyu Başlat
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
