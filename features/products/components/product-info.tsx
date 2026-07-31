import { Star } from 'lucide-react'
import { GlassProfileSelector } from './glass-profile-selector'
import { Button } from '@/components/ui/button'

export function ProductInfo({ product, reviews }: { product: any, reviews: any[] }) {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length 
    : 0

  const currentPrice = Number(product.sale_price || product.base_price || product.starting_price || product.price || 0)
  const rawOriginal = Number(product.compare_at_price || product.original_price || product.regular_price || (product.sale_price && product.base_price ? product.base_price : null))
  const originalPrice = rawOriginal && rawOriginal > currentPrice ? rawOriginal : null
  const discountRate = originalPrice && currentPrice > 0 ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0

  const formatPrice = (val: number) => 
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val)

  return (
    <div className="flex flex-col space-y-8 lg:sticky lg:top-24 h-fit">
      {/* Title & Price */}
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
          {product.name}
        </h1>
        
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex text-champagne">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-4 h-4 ${star <= Math.round(averageRating) ? 'fill-current' : 'fill-transparent'}`} 
                />
              ))}
            </div>
            <span>({reviews.length} değerlendirme)</span>
          </div>
        )}

        {/* Price Section */}
        {currentPrice > 0 ? (
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-3xl lg:text-4xl font-semibold tracking-tight text-black">
              {formatPrice(currentPrice)}
            </span>
            {originalPrice && (
              <span className="text-lg lg:text-xl text-black/40 line-through font-light">
                {formatPrice(originalPrice)}
              </span>
            )}
            {discountRate > 0 && (
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200/60 px-3 py-1 rounded-full">
                %{discountRate} İNDİRİM
              </span>
            )}
          </div>
        ) : (
          <div className="text-xl font-medium text-black/50">
            Fiyat Sorunuz
          </div>
        )}
      </div>

      {/* Description */}
      {product.short_description && (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {product.short_description}
        </p>
      )}

      {/* Selectors */}
      <GlassProfileSelector 
        glassOptions={product.glass_options || []} 
        profileOptions={product.profile_options || []} 
      />

      {/* Actions */}
      <div className="flex flex-col gap-4 pt-6">
        <Button size="lg" className="w-full text-lg h-14 rounded-xl">
          Keşif İste
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Ölçüye özel üretim ve profesyonel montaj dahildir.
        </p>
      </div>

      {/* Key features quick list */}
      <div className="grid grid-cols-2 gap-4 pt-8">
        <div className="space-y-1">
          <p className="font-mono text-xs text-muted-foreground uppercase">Koleksiyon</p>
          <p className="font-medium">{product.category?.name}</p>
        </div>
        <div className="space-y-1">
          <p className="font-mono text-xs text-muted-foreground uppercase">Kurulum</p>
          <p className="font-medium">{product.technical_specs?.installation || 'Profesyonel Montaj'}</p>
        </div>
      </div>
    </div>
  )
}
