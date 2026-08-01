'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WhatsappButton } from './whatsapp-button'
import { WishlistButton } from './wishlist-button'
import { ShareButton } from './share-button'
import { getGlassImageUrl, getProfileImageUrl } from '@/features/products/utils/option-images'
import type { ProductWithOptions, GlassOption, ProfileOption } from '@/features/products/types/product'

interface ProductInfoProps {
  product: ProductWithOptions
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(price)

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedGlass, setSelectedGlass] = useState<string | null>(
    product.glass_options?.[0]?.id || null
  )
  const [selectedProfile, setSelectedProfile] = useState<string | null>(
    product.profile_options?.[0]?.id || null
  )

  const currentPrice = product.sale_price || product.base_price || product.starting_price || 0
  const originalPrice = product.base_price && product.sale_price && product.base_price > product.sale_price
    ? product.base_price
    : null
  const discountPercent = originalPrice && currentPrice > 0
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0

  const categorySlug = product.category?.slug || product.collection?.slug || 'genel'

  const activeGlass = product.glass_options?.find((g) => g.id === selectedGlass)
  const activeProfile = product.profile_options?.find((p) => p.id === selectedProfile)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col gap-8"
    >
      {/* Category Label */}
      {product.category?.name && (
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40">
          {product.category.name}
        </p>
      )}

      {/* Product Name */}
      <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-black leading-none">
        {product.name}
      </h1>

      {/* Short Description */}
      {product.short_description && (
        <p className="text-black/60 leading-relaxed font-light text-lg">
          {product.short_description}
        </p>
      )}

      {/* Price */}
      <div className="pb-8 border-b border-black/5">
        {currentPrice > 0 ? (
          <div className="flex items-baseline gap-3 flex-wrap">
            {originalPrice && (
              <span className="text-lg text-black/40 line-through font-light">
                {formatPrice(originalPrice)}
              </span>
            )}
            <span className="text-3xl md:text-4xl font-semibold tracking-tight text-black">
              {formatPrice(currentPrice)}
            </span>
            {discountPercent > 0 && (
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200/60 px-3 py-1 rounded-full">
                %{discountPercent} İNDİRİM
              </span>
            )}
          </div>
        ) : (
          <span className="text-2xl font-medium text-black/50">Fiyat Sorunuz</span>
        )}
        <p className="text-[11px] text-black/40 mt-2 tracking-wider uppercase">
          KDV Dahil · Ücretsiz Kargo
        </p>
      </div>

      {/* VISUAL-FIRST GLASS SELECTION GALLERY */}
      {product.glass_options && product.glass_options.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-black/60">
              CAM SEÇENEKLERİ
            </span>
            {activeGlass && (
              <span className="text-xs font-medium text-black bg-black/5 px-3 py-1 rounded-full border border-black/10">
                {activeGlass.name}
              </span>
            )}
          </div>

          {/* Visual Glass Texture Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
            {product.glass_options.map((glass: GlassOption) => {
              const imageUrl = getGlassImageUrl(glass.id, glass.name)
              const isSelected = selectedGlass === glass.id

              return (
                <button
                  key={glass.id}
                  type="button"
                  onClick={() => setSelectedGlass(glass.id)}
                  className={cn(
                    "group relative flex flex-col rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left bg-neutral-100",
                    isSelected
                      ? "border-black ring-2 ring-black/20 shadow-md scale-[1.02]"
                      : "border-black/10 hover:border-black/40 opacity-85 hover:opacity-100"
                  )}
                >
                  {/* Large Texture Image Box */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-200">
                    <Image
                      src={imageUrl}
                      alt={glass.name}
                      fill
                      sizes="(max-width: 640px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Active Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shadow-md">
                        <Check className="w-3 h-3" />
                      </div>
                    )}

                    {/* Glass Name Overlay */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white font-semibold text-[11px] leading-tight drop-shadow-sm truncate">
                        {glass.name}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* VISUAL-FIRST PROFILE COLOR SELECTION GALLERY */}
      {product.profile_options && product.profile_options.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-black/60">
              PROFİL RENKLERİ
            </span>
            {activeProfile && (
              <span className="text-xs font-medium text-black bg-black/5 px-3 py-1 rounded-full border border-black/10">
                {activeProfile.name}
              </span>
            )}
          </div>

          {/* Large Metallic Finish Swatch Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {product.profile_options.map((profile: ProfileOption) => {
              const imageUrl = getProfileImageUrl(profile.id, profile.name)
              const isSelected = selectedProfile === profile.id

              return (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => setSelectedProfile(profile.id)}
                  className={cn(
                    "group relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 bg-white text-center",
                    isSelected
                      ? "border-black ring-2 ring-black/20 shadow-md scale-[1.02]"
                      : "border-black/10 hover:border-black/40 opacity-85 hover:opacity-100"
                  )}
                >
                  {/* Large Metallic Texture Thumbnail */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-black/15 shadow-sm mb-2">
                    <Image
                      src={imageUrl}
                      alt={profile.name}
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-500 group-hover:scale-115"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <span className="text-xs font-semibold text-black leading-tight">
                    {profile.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 pt-4">
        <WhatsappButton
          productName={product.name}
          productSlug={product.slug}
          categorySlug={categorySlug}
          variant="default"
        />
        <div className="flex gap-3">
          <WishlistButton productId={product.id} />
          <ShareButton url={`/urunler/${categorySlug}/${product.slug}`} title={product.name} />
        </div>
      </div>

      {/* Features from DB */}
      {product.features && product.features.length > 0 && (
        <div className="pt-6 border-t border-black/5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4">
            Öne Çıkan Özellikler
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.features.map((feature: string, i: number) => (
              <div key={i} className="flex items-center gap-3 text-sm text-black/70">
                <div className="w-1.5 h-1.5 rounded-full bg-champagne flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SKU */}
      <div className="text-[11px] text-black/30 font-mono tracking-wider">
        SKU: {product.sku}
      </div>
    </motion.div>
  )
}
