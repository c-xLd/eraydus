'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowLeft, Check, Star, Shield, Truck, Wrench, Sparkles, ArrowRight, ChevronDown } from 'lucide-react'
import { Product } from '@/lib/data/products'
import { getSandblastedModels } from '@/features/products/actions/reviews'
import dynamic from 'next/dynamic'
import type { SandblastedModel } from './SandblastedModelsModal'
import { useProductVariants, getHexColor } from './useProductVariants'
import ProductGallery from './ProductGallery'

const ProductReviews = dynamic(() => import('./ProductReviews'), {
  loading: () => <div className="py-20 text-center opacity-50">Yorumlar yükleniyor...</div>,
  ssr: false
})

const SandblastedModelsModal = dynamic(() => import('./SandblastedModelsModal'), {
  ssr: false
})

const ProductInfoTabs = dynamic(() => import('./ProductInfoTabs'), {
  loading: () => <div className="py-20 text-center opacity-50">Yükleniyor...</div>,
  ssr: true
})

// Animated section wrapper
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [showSandblastedModal, setShowSandblastedModal] = useState(false)
  const [sandblastedModels, setSandblastedModels] = useState<SandblastedModel[]>([])
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null)
  const [hoveredGlass, setHoveredGlass] = useState<string | null>(null)

  useEffect(() => {
    getSandblastedModels().then(res => {
      if (res.success && res.data) {
        setSandblastedModels(res.data as SandblastedModel[])
      }
    })
  }, [])

  const {
    hasVariants,
    attributeGroups,
    attributeKeys,
    selectedAttributes,
    selectedVariant,
    displayPrice,
    handleSelectAttribute,
    glassAttrKey,
    profileAttrKey,
    compatibleGlassList,
    compatibleProfileList
  } = useProductVariants(product, () => setShowSandblastedModal(true))

  const averageRating = "4.9"
  const allImages = product.gallery.length > 0 ? product.gallery : [product.image]
  
  const guarantees = [
    { icon: Shield, title: '2 Yıl Garanti', desc: 'Üretici garantisi' },
    { icon: Truck, title: 'Ücretsiz Montaj', desc: 'Profesyonel ekip' },
    { icon: Wrench, title: 'Özel Üretim', desc: 'Milimetrik hassasiyet' },
    { icon: Sparkles, title: 'Sağlamlık', desc: 'Darbelere karşı sağlam' }
  ]

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">

      {/* BREADCRUMB */}
      <div className="pt-28 pb-6">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <Link href="/koleksiyonlar" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-champagne transition-colors group">
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span>Koleksiyonlar</span>
            <span className="text-border">/</span>
            <span className="text-foreground/60">{product.collectionName}</span>
          </Link>
        </div>
      </div>

      {/* HERO: GALLERY + PRODUCT INFO */}
      <section className="pb-20 lg:pb-32">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24">

            {/* Gallery */}
            <ProductGallery 
              images={allImages}
              productName={product.name}
              collectionName={product.collectionName}
              isNew={product.isNew}
            />

            {/* Product Info (Sticky) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full lg:w-[54%]"
            >
              <div className="lg:sticky lg:top-28 space-y-7">

                {/* Title Block */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-bold tracking-[0.25em] text-champagne uppercase">{product.collectionName}</span>
                    <span className="w-8 h-px bg-champagne/40" />
                    <span className="text-[11px] tracking-widest text-muted-foreground uppercase">{product.layoutType}</span>
                  </div>
                  <h1 className="text-3xl lg:text-[2.75rem] font-light tracking-tight leading-[1.1] mb-5">{product.name}</h1>

                  {/* Rating Summary */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`size-4 ${s <= Math.round(Number(averageRating)) ? 'fill-champagne text-champagne' : 'text-border'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{averageRating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    {selectedVariant?.salePrice ? (
                      <>
                        <span className="text-3xl font-semibold tracking-tight">₺{selectedVariant.salePrice.toLocaleString('tr-TR')}</span>
                        <span className="text-lg text-muted-foreground line-through">₺{selectedVariant.price.toLocaleString('tr-TR')}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl font-semibold tracking-tight">₺{displayPrice.toLocaleString('tr-TR')}</span>
                        {hasVariants && (
                          <span className="text-sm text-muted-foreground">başlangıç fiyatı</span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[15px] text-muted-foreground leading-[1.75]">{product.description}</p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent" />

                {/* Variation Selectors */}
                {hasVariants && attributeKeys.length > 0 && (
                  <div className="space-y-5">
                    {attributeKeys.map(key => {
                      const isColor = key.toLowerCase().includes('renk') || key.toLowerCase().includes('profil')
                      const isSelect = key.toLowerCase().includes('cam') || key.toLowerCase().includes('tip')

                      return (
                        <div key={key} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-[13px] font-semibold uppercase tracking-wider">{key}</h3>
                            {selectedAttributes[key] && (
                              <span className="text-xs text-champagne font-medium">{selectedAttributes[key]}</span>
                            )}
                          </div>

                          {isColor ? (
                            <div className="flex flex-wrap gap-3">
                              {attributeGroups[key].map(val => {
                                const isSelected = selectedAttributes[key] === val
                                const hexColor = getHexColor(val)
                                return (
                                  <motion.button
                                    key={val}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleSelectAttribute(key, val)}
                                    className={`size-11 rounded-full shadow-md border transition-all duration-300 relative cursor-pointer flex items-center justify-center`}
                                    style={{
                                      backgroundColor: hexColor,
                                      borderColor: isSelected ? '#c9a86a' : 'rgba(128,128,128,0.25)'
                                    }}
                                    title={val}
                                  >
                                    {isSelected && (
                                      <span className={`absolute inset-0.5 rounded-full border border-black/30 flex items-center justify-center ${val.toLowerCase().includes('beyaz') ? 'text-black' : 'text-white'}`}>
                                        <Check className="size-4" />
                                      </span>
                                    )}
                                  </motion.button>
                                )
                              })}
                            </div>
                          ) : isSelect ? (
                            <div className="relative max-w-md">
                              <select
                                value={selectedAttributes[key] || ''}
                                onChange={(e) => handleSelectAttribute(key, e.target.value)}
                                className="w-full bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-white/10 rounded-2xl px-5 py-3.5 text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:border-champagne transition-all appearance-none cursor-pointer"
                              >
                                <option value="" disabled className="text-neutral-400 dark:text-white/40">Seçiniz</option>
                                {attributeGroups[key].map(val => (
                                  <option key={val} value={val} className="bg-white dark:bg-[#121212] text-neutral-900 dark:text-white">
                                    {val}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 size-4 pointer-events-none text-neutral-400 dark:text-white/40" />
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2.5">
                              {attributeGroups[key].map(val => {
                                const isSelected = selectedAttributes[key] === val
                                return (
                                  <motion.button
                                    key={val}
                                    whileHover={{ scale: 1.02, borderColor: isSelected ? '#c9a86a' : 'rgba(128,128,128,0.3)' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelectAttribute(key, val)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium border transition-all duration-300 min-h-[46px] cursor-pointer ${isSelected
                                      ? 'bg-champagne/10 border-champagne text-champagne shadow-[0_0_20px_rgba(201,168,106,0.12)] font-semibold'
                                      : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-white/80 hover:bg-neutral-100 dark:hover:bg-white/[0.04] hover:text-neutral-950 dark:hover:text-white hover:border-neutral-300 dark:hover:border-white/20'
                                      }`}
                                  >
                                    {isSelected && <Check className="size-3.5 shrink-0" />}
                                    <span>{val}</span>
                                  </motion.button>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}

                    {!selectedVariant && (
                      <p className="text-xs text-muted-foreground">
                        Net fiyat için tüm seçenekleri belirleyin.
                      </p>
                    )}

                    <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent" />
                  </div>
                )}



                {/* CTA */}
                <div className="space-y-3 pt-2">
                  <Link
                    href={`/tasarla?model=${product.id}`}
                    className="group flex items-center justify-center gap-3 w-full py-4.5 rounded-2xl bg-champagne text-black font-semibold text-base hover:bg-champagne/90 transition-all duration-300 shadow-[0_4px_30px_rgba(201,168,106,0.25)] hover:shadow-[0_8px_40px_rgba(201,168,106,0.4)] hover:-translate-y-0.5"
                  >
                    Kendi Modelini Tasarla
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href={(() => {
                      const selectedGlass = glassAttrKey ? selectedAttributes[glassAttrKey] : null
                      const selectedProfile = profileAttrKey ? selectedAttributes[profileAttrKey] : null
                      const glassName = selectedGlass
                        ? (compatibleGlassList.find(g => g.id === selectedGlass)?.name ?? selectedGlass)
                        : null
                      const profileName = selectedProfile
                        ? (compatibleProfileList.find(p => p.id === selectedProfile)?.name ?? selectedProfile)
                        : null

                      const lines = [
                        `🚿 *Eraydus Duşakabin – Sipariş Talebi*`,
                        ``,
                        `📦 *Model:* ${product.name}`,
                        `🏷️ *Koleksiyon:* ${product.collectionName}`,
                        glassName   ? `🪟 *Cam Tipi:* ${glassName}` : null,
                        profileName ? `✨ *Profil Rengi:* ${profileName}` : null,
                        displayPrice > 0
                          ? `💰 *Fiyat:* ${displayPrice.toLocaleString('tr-TR')} ₺${!selectedVariant ? ' (başlangıç fiyatı)' : ''}`
                          : null,
                        ``,
                        `Merhaba, bu ürünü sipariş etmek istiyorum. Bilgi alabilir miyim?`,
                      ]

                      const text = lines.filter(l => l !== null).join('\n')
                      return `https://wa.me/905000000000?text=${encodeURIComponent(text)}`
                    })()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 w-full py-4.5 rounded-2xl bg-[#25D366] text-white font-semibold text-base hover:bg-[#128C7E] transition-all duration-300 shadow-[0_4px_30px_rgba(37,211,102,0.25)] hover:shadow-[0_8px_40px_rgba(37,211,102,0.4)] hover:-translate-y-0.5"
                  >
                    WhatsApp ile Sipariş Ver
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                  <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
                    Ölçü, cam, profil ve aksesuar seçerek size özel net fiyat alın veya doğrudan WhatsApp&apos;tan bize yazın.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {guarantees.map((g, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface/70 border border-border/50">
                      <g.icon className="size-5 text-champagne shrink-0" />
                      <div>
                        <p className="text-[12px] font-semibold leading-tight">{g.title}</p>
                        <p className="text-[10px] text-muted-foreground">{g.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tekne/Jakuzi Yönlendirme Banner */}
                <div className="pt-3">
                  <Link
                    href="/jakuzi-tekneler"
                    className="flex items-center justify-between p-4.5 rounded-2xl border border-champagne/20 bg-champagne/[0.03] dark:bg-champagne/[0.01] hover:bg-champagne/[0.08] dark:hover:bg-champagne/[0.03] transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 text-left">
                      <div className="p-2 rounded-xl bg-champagne/10 text-champagne shrink-0">
                        <Wrench className="size-5" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-foreground">Tekne & Jakuzi Uyumu</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Bu kabinle uyumlu tekne ve jakuzi modellerini incelemek için tıklayın.</p>
                      </div>
                    </div>
                    <ArrowRight className="size-4.5 text-champagne group-hover:translate-x-1.5 transition-transform shrink-0 ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TABS SECTION */}
      <ProductInfoTabs 
        product={product}
        hasVariants={hasVariants}
        glassAttrKey={glassAttrKey}
        profileAttrKey={profileAttrKey}
        compatibleGlassList={compatibleGlassList}
        compatibleProfileList={compatibleProfileList}
        selectedAttributes={selectedAttributes}
        onShowSandblastedModal={() => setShowSandblastedModal(true)}
      />

      {/* REVIEWS & REAL INSTALLATIONS */}
      <AnimatedSection className="py-20 lg:py-28">
        <ProductReviews productIdOrSlug={product.id || product.slug} averageRating={averageRating} />
      </AnimatedSection>

      {/* BOTTOM CTA BANNER */}
      <AnimatedSection>
        <div className="container mx-auto px-6 max-w-[1440px] pb-24">
          <div className="relative bg-surface-dark rounded-3xl overflow-hidden p-10 lg:p-16">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-light text-white tracking-tight mb-3">
                  Bu modeli <span className="text-champagne">kendi banyonuza</span> uyarlayın.
                </h3>
                <p className="text-white/50 text-[15px]">Konfigüratörümüzle ölçü, cam ve profil seçerek anında net fiyat alın.</p>
              </div>
              <Link
                href={`/tasarla?model=${product.id}`}
                className="group flex items-center gap-3 px-8 py-4.5 bg-champagne text-black font-semibold rounded-2xl hover:bg-champagne/90 transition-all shadow-[0_4px_30px_rgba(201,168,106,0.3)] shrink-0"
              >
                Konfigüratörü Başlat
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Sandblasted Glass Models Modal */}
      <SandblastedModelsModal 
        isOpen={showSandblastedModal} 
        onClose={() => setShowSandblastedModal(false)} 
        models={sandblastedModels} 
      />
    </div>
  )
}
