'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

export function CraftsmanshipSection() {
  return (
    <section className="py-32 md:py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease }}
            className="relative aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden bg-surface"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop"
              alt="Lüks banyo mimarisi"
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Badge */}
            <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4">
              <p className="text-white text-xs font-medium uppercase tracking-widest mb-1">
                Hassasiyet
              </p>
              <p className="text-white text-2xl font-light">±0.5mm Tolerans</p>
            </div>
          </motion.div>

          {/* Right — Story */}
          <div className="flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-champagne text-sm font-medium tracking-widest uppercase mb-6"
            >
              Ustalık & Hassasiyet
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 leading-[1.1]"
            >
              Mühendislik{' '}
              <span className="font-semibold">Sanatı</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="space-y-6 mb-12"
            >
              <p className="text-muted-foreground text-lg leading-relaxed">
                Her Erayduş duşakabini, on yılların deneyimini barındıran üretim
                hattımızda hayat bulur. Hammaddeden nihai ürüne kadar her aşama,
                milimetrik hassasiyetle kontrol edilen süreçlerden geçer.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                8mm temperli güvenlik camı, 304 paslanmaz çelik aksesuarlar ve
                endüstriyel kalitede alüminyum profiller — her malzeme, yıllarca
                kusursuz performans sunmak üzere seçilir.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                CNC ile işlenen profiller, lazerle kesilen camlar ve el
                işçiliğiyle monte edilen donanımlar, bir duşakabinden çok daha
                fazlasını yaratır: banyonuz için bir mimari eser.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="grid grid-cols-3 gap-8 mb-12 border-t border-border pt-8"
            >
              <div>
                <p className="text-3xl md:text-4xl font-light tracking-tight">8mm</p>
                <p className="text-muted-foreground text-sm mt-1">Temperli Cam</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-light tracking-tight">304</p>
                <p className="text-muted-foreground text-sm mt-1">Çelik Kalite</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-light tracking-tight">CNC</p>
                <p className="text-muted-foreground text-sm mt-1">Hassas Kesim</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              <Link
                href="/hakkimizda"
                className="group inline-flex items-center gap-3 text-foreground font-medium text-lg hover:text-champagne transition-colors"
              >
                Kaliteyi Keşfet
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

