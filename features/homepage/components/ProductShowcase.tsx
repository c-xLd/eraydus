'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const models = [
  {
    id: 'edge',
    name: 'EDGE Serisi',
    description: 'Minimalist profiller, maksimum zarafet.',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'pure',
    name: 'PURE Serisi',
    description: 'Çerçevesiz mimari tasarım.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'industrial',
    name: 'LINE Serisi',
    description: 'Mat siyah detaylarla endüstriyel lüks.',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop',
  }
]

export function ProductShowcase() {
  return (
    <section className="py-24 bg-surface text-foreground overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1440px] mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">
              Mimari Koleksiyon
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Banyonuzun ölçülerine ve tarzınıza göre özel olarak üretilen, ödüllü tasarımlara sahip duşakabin serilerimizi keşfedin.
            </p>
          </div>
          <Link href="/collections" className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary hover:text-champagne transition-colors">
            Tüm Koleksiyonu İncele
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6 bg-surface-elevated">
                <img 
                  src={model.image} 
                  alt={model.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-2xl font-medium mb-2">{model.name}</h3>
              <p className="text-muted-foreground">{model.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
