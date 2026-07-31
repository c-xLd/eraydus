'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/features/products/components/product-card'

export function RecentlyViewed({ currentProduct }: { currentProduct: any }) {
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('eraydus-recently-viewed')
      let parsed = stored ? JSON.parse(stored) : []
      
      // Filter out the current product from display
      const displayHistory = parsed.filter((p: any) => p.id !== currentProduct.id).slice(0, 4)
      setHistory(displayHistory)

      // Add current product to top of history
      const currentMinimal = {
        id: currentProduct.id,
        slug: currentProduct.slug,
        name: currentProduct.name,
        collectionSlug: currentProduct.collection?.slug || currentProduct.category?.slug,
        collectionName: currentProduct.collection?.name || currentProduct.category?.name,
        price: currentProduct.base_price,
        isNew: currentProduct.new_product || false,
        image: currentProduct.main_image_url
      }
      
      // Remove it if it already exists, then add to front
      parsed = parsed.filter((p: any) => p.id !== currentProduct.id)
      parsed.unshift(currentMinimal)
      
      // Keep only last 10
      parsed = parsed.slice(0, 10)
      
      localStorage.setItem('eraydus-recently-viewed', JSON.stringify(parsed))
    } catch (e) {
      console.error('Failed to parse recently viewed', e)
    }
  }, [currentProduct])

  if (history.length === 0) return null

  return (
    <div className="space-y-10 pt-12 lg:pt-24 border-t border-border mt-12">
      <h2 className="text-3xl font-medium tracking-tight">Son Görüntüledikleriniz</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {history.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
