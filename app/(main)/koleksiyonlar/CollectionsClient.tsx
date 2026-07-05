'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Product } from '@/lib/data/products'

interface CollectionsClientProps {
  products: Product[]
}

export function CollectionsClient({ products }: CollectionsClientProps) {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      {/* Hero */}
      <div className="container mx-auto px-6 max-w-[1440px] mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-champagne text-sm font-medium tracking-[0.2em] uppercase block mb-6"
        >
          Koleksiyonlar
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-light tracking-tight mb-8"
        >
          Mimarinin <span className="font-semibold">Şeffaf Hali</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Her banyonun karakterine uygun, hassas mühendislikle tasarlanmış premium modelleri keşfedin.
        </motion.p>
      </div>

      {/* Bento Grid Layout for Products */}
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative flex flex-col bg-surface rounded-[2rem] overflow-hidden border border-border hover:border-champagne/30 transition-colors shadow-sm hover:shadow-xl"
            >
              {/* Image Area */}
              <div className="relative aspect-[16/9] lg:aspect-[2/1] overflow-hidden bg-muted">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                  <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                    {product.collectionName}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 lg:p-10 flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                  <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">{product.name}</h2>
                  <span className="text-sm font-medium text-champagne bg-champagne/10 px-3 py-1.5 rounded-full inline-flex w-fit">
                    {product.basePrice}'den başlayan
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-8 flex-1">
                  {product.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {product.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check className="size-4 text-champagne flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href={`/collections/${product.id}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors group-hover:bg-champagne group-hover:text-black group-hover:shadow-[0_0_20px_rgba(201,168,106,0.3)]"
                >
                  Teknik Detayları İncele
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
