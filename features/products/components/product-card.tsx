'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface ProductCardProps {
  viewMode?: 'grid' | 'list'
  product: {
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
  }
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const rawImages = (product as any).images
  const imageUrl = product.main_image_url || product.image || (Array.isArray(rawImages) && rawImages.length > 0 ? String(rawImages[0]) : '')
  const isNew = product.isNew || product.new_product
  const collectionName = product.collection?.name || product.collectionName
  const categorySlug = product.category?.slug || product.collection?.slug || product.collectionSlug || product.categorySlug || 'genel'

  const currentPrice = Number(product.price ?? product.base_price ?? product.starting_price ?? 0)
  const rawOriginal = Number((product as any).original_price ?? (product as any).originalPrice ?? (product as any).compare_at_price ?? (product as any).regular_price ?? ((product as any).sale_price && (product as any).base_price ? (product as any).base_price : null))
  const originalPrice = rawOriginal && rawOriginal > currentPrice ? rawOriginal : null
  const discountRate = originalPrice && currentPrice > 0 ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0

  const formatPrice = (val: number) => 
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val)

  if (viewMode === 'list') {
    return (
      <Link 
        href={`/urunler/${categorySlug}/${product.slug}`}
        className="group flex flex-row items-center justify-between gap-3.5 sm:gap-6 w-full bg-white border border-black/5 hover:border-black/20 p-3 sm:p-4 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 touch-manipulation select-none active:scale-[0.99]"
      >
        {/* Image Thumbnail */}
        <div className="relative w-24 h-24 sm:w-36 sm:h-36 shrink-0 rounded-xl overflow-hidden bg-black/[0.02] border border-black/5">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="150px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/[0.02]">
              <span className="text-black/20 font-mono text-[9px] uppercase tracking-widest">Erayduş</span>
            </div>
          )}
          
          {isNew && (
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-xs">
              <span className="w-1 h-1 rounded-full bg-black animate-pulse" />
              <span className="text-black text-[8px] font-bold tracking-widest uppercase">YENİ</span>
            </div>
          )}

          {discountRate > 0 && (
            <div className="absolute bottom-2 left-2 z-10 bg-red-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              %{discountRate} İNDİRİM
            </div>
          )}
        </div>

        {/* Info Middle */}
        <div className="flex-1 min-w-0 space-y-1">
          {collectionName && (
            <span className="text-[9px] sm:text-[10px] text-black/40 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] block truncate">
              {collectionName}
            </span>
          )}
          <h3 className="text-sm sm:text-base md:text-lg font-medium text-black group-hover:text-black/70 transition-colors truncate">
            {product.name}
          </h3>
          
          {/* Architectural Specs Badges */}
          <div className="hidden sm:flex flex-wrap items-center gap-1.5 pt-1.5 text-[10px] text-black/60 font-light">
            <span className="px-2 py-0.5 rounded-md bg-black/[0.03] border border-black/5">6mm Temperli Cam</span>
            <span className="px-2 py-0.5 rounded-md bg-black/[0.03] border border-black/5">Paslanmaz Profil</span>
            <span className="px-2 py-0.5 rounded-md bg-black/[0.03] border border-black/5">Özel Ölçü</span>
          </div>
        </div>

        {/* Right Side: Price & CTA Action */}
        <div className="flex flex-col items-end justify-center shrink-0 space-y-2 pl-2">
          <div className="text-xs sm:text-base md:text-lg text-right">
            {currentPrice > 0 ? (
              <div className="flex flex-col items-end">
                <span className="font-semibold text-black">
                  {formatPrice(currentPrice)}
                </span>
                {originalPrice && (
                  <span className="text-[10px] sm:text-xs text-black/40 line-through font-light">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-black/40 font-normal">Fiyat Sorunuz</span>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-black bg-black/5 group-hover:bg-black group-hover:text-white px-3 py-1.5 rounded-full transition-colors">
            <span>İncele</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link 
      href={`/urunler/${categorySlug}/${product.slug}`} 
      className="group block w-full h-full touch-manipulation select-none active:scale-[0.97] transition-all duration-200"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl bg-black/[0.02] border border-black/5 mb-3 sm:mb-5 shadow-xs hover:shadow-lg transition-all">
        {/* Placeholder / Image */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/[0.02]">
            <span className="text-black/20 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">Erayduş</span>
          </div>
        )}
        
        {/* New Badge */}
        {isNew && (
          <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 flex items-center gap-1 sm:gap-1.5 bg-white/90 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs">
            <span className="w-1 h-1 rounded-full bg-black animate-pulse" />
            <span className="text-black text-[8px] sm:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase">
              YENİ
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {discountRate > 0 && (
          <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-10 bg-red-600 text-white font-bold text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full shadow-xs tracking-wider uppercase">
            %{discountRate} İNDİRİM
          </div>
        )}

        {/* Hover Overlay & Action */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors duration-500 flex items-end justify-end p-4 sm:p-6">
          <div className="overflow-hidden">
            <div className="hidden sm:flex items-center gap-2.5 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/5 hover:scale-105">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-black">
                İNCELE
              </span>
              <ArrowRight className="size-3.5 text-black" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1 px-0.5">
        {collectionName && (
          <div className="text-[9px] sm:text-[10px] text-black/40 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] truncate">
            {collectionName}
          </div>
        )}
        <h3 className="text-xs sm:text-[13px] font-medium tracking-tight text-black line-clamp-1 group-hover:text-black/60 transition-colors">
          {product.name}
        </h3>
        
        {/* Price & Discount Display */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          {currentPrice > 0 ? (
            <>
              <span className="text-xs sm:text-[13px] font-semibold text-black">
                {formatPrice(currentPrice)}
              </span>
              {originalPrice && (
                <span className="text-[10px] sm:text-[11px] text-black/40 line-through font-light">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </>
          ) : (
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-black/40 font-normal">Fiyat Sorunuz</span>
          )}
        </div>
      </div>
    </Link>
  )
}
