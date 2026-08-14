'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/features/products/components/product-card'

interface ProductRelatedProps {
  products: {
    id: string
    slug: string
    name: string
    price: number | null
    base_price?: number | null
    starting_price?: number | null
    image?: string
    main_image_url?: string | null
    isNew?: boolean
    new_product?: boolean
    collectionName?: string
    collectionSlug?: string
    categorySlug?: string
    collection?: { name?: string; slug?: string }
    category?: { name?: string; slug?: string }
  }[]
  title?: string
}

export function ProductRelated({ products, title = "Benzer Tasarımlar" }: ProductRelatedProps) {
  if (!products || products.length === 0) return null

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-black/30 block mb-1.5">
            KOLEKSİYON
          </span>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-black">
            {title}
          </h2>
        </div>
        <span className="text-[11px] font-mono text-black/40 hidden sm:block">
          {products.length} ürün
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
