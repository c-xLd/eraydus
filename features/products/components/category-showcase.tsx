'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { storageUrl } from '@/lib/utils'

import type { Category } from '@/features/products/services/categories'

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  // Only show active top-level categories
  const mainCategories = categories.filter(c => c.status === 'active' && !c.parent_category)

  return (
    <section id="kategoriler" className="py-8 md:py-12 bg-white">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-3xl font-light tracking-tight text-black">Duşakabin Modelleri</h2>
          </div>
          <div className="h-[1px] bg-black/10 flex-1 ml-6 sm:ml-8 hidden sm:block" />
        </div>

        <div className="flex sm:grid overflow-x-auto sm:overflow-visible no-scrollbar scroll-smooth overscroll-x-contain touch-pan-x gap-4 sm:gap-6 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mainCategories.map((category, index) => {
            const imgSrc = category.image_url ? storageUrl('products', category.image_url) : null
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.08, type: 'spring', stiffness: 120, damping: 20 }}
                className="w-[70vw] max-w-[260px] sm:w-full sm:max-w-none shrink-0 sm:shrink"
              >
                <Link
                  href={`/urunler/${category.slug}`}
                  className="group block relative aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl bg-black/[0.02] border border-black/5 hover:border-black/20 transition-all duration-500 shadow-xs hover:shadow-lg touch-manipulation select-none active:scale-[0.98]"
                >
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center transition-transform duration-1000 group-hover:scale-105 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <span className="text-black/50 font-mono text-xs tracking-[0.3em] uppercase">Erayduş Series</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10 transition-opacity duration-700 group-hover:opacity-95" />

                  <div className="absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-end">
                    <div className="transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                      {category.product_count !== undefined && category.product_count > 0 && (
                        <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest block mb-1.5 sm:mb-2">
                          {category.product_count} Model
                        </span>
                      )}
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-3 sm:mb-4 tracking-tight">
                        {category.name}
                      </h3>
                      <div className="flex items-center text-white/90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold mr-2">Koleksiyonu İncele</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
