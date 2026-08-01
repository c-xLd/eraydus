'use client'

import { motion } from 'framer-motion'
import { ProductBreadcrumb } from '@/features/products/components/product-breadcrumb'
import { ProductGallery } from '@/features/products/components/product-gallery'
import { ProductInfo } from '@/features/products/components/product-info'
import { ProductDetailSections } from '@/features/products/components/product-detail-sections'
import { ProductRelated } from '@/features/products/components/product-related'
import { RecentlyViewed } from '@/features/products/components/recently-viewed'

interface CabinetDetailProps {
  product: any
  relatedProducts: any[]
  breadcrumbItems: any[]
  categorySlug: string
}

export function CabinetDetail({
  product,
  relatedProducts,
  breadcrumbItems,
  categorySlug,
}: CabinetDetailProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#fafafa] min-h-screen"
    >
      <div className="pt-32 pb-16 px-4 md:px-6 bg-white rounded-b-[3rem] shadow-sm">
        <div className="container mx-auto">
          <ProductBreadcrumb items={breadcrumbItems} className="mb-12" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <ProductGallery 
                images={product.gallery} 
                mainImage={product.main_image_url} 
                name={product.name} 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductInfo product={product} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-[3rem] py-12 px-4 md:px-6 shadow-sm mx-2 md:mx-6">
        <ProductDetailSections product={product} />
      </div>

      <div className="bg-[#fafafa] py-24">
        <div className="container mx-auto px-4 md:px-6">
          <ProductRelated 
            products={relatedProducts} 
            title="Benzer Tasarımlar"
          />
        </div>
      </div>

      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <RecentlyViewed currentProduct={product} />
        </div>
      </div>
    </motion.div>
  )
}
