'use client'

import { useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion'
import {
  ArrowLeft, Check, Star, ChevronDown, Camera, User,
  Shield, Truck, Wrench, Sparkles, ArrowRight, Quote,
  Maximize2, Layers, Droplets, ChevronLeft, ChevronRight, X
} from 'lucide-react'
import { Product, glassOptions, profileOptions } from '@/lib/data/products'
import { getApprovedReviews, submitProductReview, getSandblastedModels } from '@/features/products/actions/reviews'
import { toast } from 'sonner'
import { useEffect } from 'react'

/* ─── Animation Variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

/* ─── Animated Section Wrapper ─── */
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

const getHexColor = (val: string) => {
  const v = val.toLowerCase()
  if (v.includes('siyah') || v.includes('black')) return '#1A1A1A'
  if (v.includes('gold') || v.includes('altın') || v.includes('altin')) return '#D4AF37'
  if (v.includes('krom') || v.includes('silver') || v.includes('gümüş') || v.includes('gumus') || v.includes('parlak') || v.includes('metal')) return '#E5E5E5'
  if (v.includes('bronz') || v.includes('bronze')) return '#CD7F32'
  if (v.includes('beyaz') || v.includes('white')) return '#FFFFFF'
  if (v.includes('antrasit') || v.includes('gri') || v.includes('gray')) return '#3A3F47'
  return '#666666'
}

/* ─── Component ─── */
interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter()
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'ozellikler' | 'teknik' | 'sss'>('ozellikler')
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null)
  const [hoveredGlass, setHoveredGlass] = useState<string | null>(null)
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})

  // Magnifying Glass Effect & Swipe Gestures
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
  const [isZoomed, setIsZoomed] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPos({ x, y })
  }

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold) {
      // Swipe Left -> Next
      setActiveImage(prev => (prev + 1) % allImages.length)
    } else if (info.offset.x > swipeThreshold) {
      // Swipe Right -> Prev
      setActiveImage(prev => (prev - 1 + allImages.length) % allImages.length)
    }
  }

  const [reviews, setReviews] = useState<any[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(true)
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', website_url: '', math_answer: '' })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [showSandblastedModal, setShowSandblastedModal] = useState(false)
  const [sandblastedModels, setSandblastedModels] = useState<{ id: string; title: string; image_url: string }[]>([])

  useEffect(() => {
    getSandblastedModels().then(res => {
      if (res.success && res.data) {
        setSandblastedModels(res.data as any[])
      }
    })
  }, [])

  const isKumlamaValue = (val: string) => {
    const v = val.toLowerCase()
    return v.includes('kumlama') || v.includes('buzlu')
  }

  const isTekneJakuziValue = (val: string) => {
    const v = val.toLowerCase()
    return v.includes('tekne') || v.includes('jakuzi')
  }

  const handleSelectAttribute = (key: string, val: string) => {
    // Tekne / Jakuzi selections are configured on a dedicated page.
    if (isTekneJakuziValue(val) || isTekneJakuziValue(key)) {
      router.push('/jakuzi-tekneler')
      return
    }
    setSelectedAttributes(prev => ({ ...prev, [key]: val }))
    // Sandblasted (kumlama) glass → open the pattern gallery modal.
    if (isKumlamaValue(val)) {
      setShowSandblastedModal(true)
    }
  }

  // Fetch approved reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      // product.id must exist if it's from DB. If it's a static mock product without ID, we can fallback to slug
      const identifier = product.id || product.slug
      if (!identifier) {
        setIsLoadingReviews(false)
        return
      }
      const res = await getApprovedReviews(identifier)
      if (res.success && res.data) {
        setReviews(res.data)
      }
      setIsLoadingReviews(false)
    }
    fetchReviews()
  }, [product.id, product.slug])

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReview.name.trim() || !newReview.comment.trim()) return

    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('product_id', product.id || product.slug)
    formData.append('author_name', newReview.name)
    formData.append('content', newReview.comment)
    formData.append('rating', newReview.rating.toString())
    formData.append('website_url', newReview.website_url) // Honeypot
    formData.append('math_answer', newReview.math_answer) // Math Captcha

    const result = await submitProductReview(formData)
    setIsSubmitting(false)

    if (result.success) {
      toast.success(result.message)
      setNewReview({ name: '', rating: 5, comment: '', website_url: '', math_answer: '' })
      setShowReviewForm(false)
    } else {
      toast.error(result.error || 'Gönderim başarısız.')
    }
  }

  const averageRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0'

  // gallery already contains all images including the main one
  const allImages = product.gallery.length > 0 ? product.gallery : [product.image]

  // ─── Variation Logic ───
  const variants = product.variants ?? []
  const hasVariants = variants.length > 0

  // Build attribute groups: { "profil-rengi": ["mat-siyah", "krom"], ... }
  const attributeGroups = useMemo(() => {
    const groups: Record<string, string[]> = {}
    variants.forEach(v => {
      Object.entries(v.attributes || {}).forEach(([key, val]) => {
        if (!groups[key]) groups[key] = []
        if (!groups[key].includes(val)) groups[key].push(val)
      })
    })
    return groups
  }, [variants])

  const attributeKeys = Object.keys(attributeGroups)

  // Find the variant matching all currently selected attributes
  const selectedVariant = useMemo(() => {
    if (!hasVariants) return null
    // Only match when every attribute group has a selection
    const allSelected = attributeKeys.every(k => selectedAttributes[k])
    if (!allSelected) return null
    return variants.find(v =>
      attributeKeys.every(k => (v.attributes || {})[k] === selectedAttributes[k])
    ) || null
  }, [hasVariants, attributeKeys, selectedAttributes, variants])

  // Displayed price: selected variant price (with sale) → cheapest variant → base product price
  const displayPrice = useMemo(() => {
    if (selectedVariant) {
      return selectedVariant.salePrice ?? selectedVariant.price
    }
    if (hasVariants) {
      const prices = variants.map(v => v.salePrice ?? v.price).filter(p => p > 0)
      return prices.length > 0 ? Math.min(...prices) : product.price
    }
    return product.price
  }, [selectedVariant, hasVariants, variants, product.price])

  const humanizeValue = (val: string) =>
    val.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  const humanizeKey = (key: string) =>
    key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  // ─── Variant-aware compatibility lists ───
  // When the product has variants, the "compatible" glass/profiles shown in the
  // technical section must reflect the actual variant options — not the static
  // product-level lists. We derive them from the variant attribute groups and
  // enrich each value with a canonical swatch (colorClass / hex).
  const glassAttrKey = useMemo(
    () => attributeKeys.find(k => k.toLowerCase().includes('cam') || k.toLowerCase().includes('tip')),
    [attributeKeys]
  )
  const profileAttrKey = useMemo(
    () => attributeKeys.find(k => k.toLowerCase().includes('profil') || k.toLowerCase().includes('renk')),
    [attributeKeys]
  )

  const compatibleGlassList = useMemo(() => {
    if (hasVariants && glassAttrKey) {
      return attributeGroups[glassAttrKey].map(val => {
        const low = val.toLowerCase()
        const match = glassOptions.find(g => {
          const gl = g.name.toLowerCase()
          return gl === low || gl.includes(low) || low.includes(g.id)
            || (low.includes('kumlama') && g.id === 'frosted')
            || (low.includes('buzlu') && g.id === 'frosted')
            || ((low.includes('şeffaf') || low.includes('seffaf')) && g.id === 'clear')
            || ((low.includes('füme') || low.includes('fume')) && g.id === 'smoke')
            || (low.includes('bronz') && g.id === 'bronze')
            || ((low.includes('oluklu') || low.includes('fluted')) && g.id === 'fluted')
        })
        return {
          id: val,
          name: match ? match.name : humanizeValue(val),
          colorClass: match ? match.colorClass : 'bg-white/20 backdrop-blur-sm',
          isKumlama: isKumlamaValue(val),
        }
      })
    }
    return product.compatibleGlass.map(g => ({ ...g, isKumlama: isKumlamaValue(g.name) }))
  }, [hasVariants, glassAttrKey, attributeGroups, product.compatibleGlass])

  const compatibleProfileList = useMemo(() => {
    if (hasVariants && profileAttrKey) {
      return attributeGroups[profileAttrKey].map(val => {
        const low = val.toLowerCase()
        const match = profileOptions.find(p => {
          const pl = p.name.toLowerCase()
          return pl === low || pl.includes(low) || low.includes(p.id)
        })
        return {
          id: val,
          name: match ? match.name : humanizeValue(val),
          hex: match ? match.hex : getHexColor(val),
        }
      })
    }
    return product.compatibleProfiles
  }, [hasVariants, profileAttrKey, attributeGroups, product.compatibleProfiles])

  const faqs = [
    { q: 'Teslimat süresi ne kadar?', a: 'Siparişiniz onaylandıktan sonra özel ölçü üretimimiz 5-7 iş günü sürmektedir. Montaj, ürün tesliminden sonra 1 iş günü içinde profesyonel ekibimiz tarafından tamamlanır.' },
    { q: 'Garanti koşulları nelerdir?', a: 'Tüm Erayduş ürünleri profil, mekanizma ve fitil sararmalarına karşı 2 yıl üretici garantisi altındadır. Temperli cam kırılmaları kapsam dışıdır.' },
    { q: 'Özel ölçü üretim yapıyor musunuz?', a: 'Evet, tüm ürünlerimiz banyonuzun lazer ve metre ölçümlerine göre hassasiyetle özel üretilmektedir. Standart ölçü satışımız yoktur.' },
    { q: 'Montaj hizmeti dahil mi?', a: 'Evet, tüm siparişlerimize ücretsiz profesyonel montaj hizmeti dahildir. Uzman ekibimiz, ürünü banyonuza kusursuz bir şekilde monte eder.' },
    { q: 'Hangi cam seçenekleri mevcut?', a: 'Şeffaf, füme, bronz, buzlu (kumlama) cam seçeneklerimiz mevcuttur. Tüm camlarımız 4mm-6mm kalınlıklarında, DIN EN 12150 sertifikalı temperli camdır.' }
  ]

  const guarantees = [
    { icon: Shield, title: '2 Yıl Garanti', desc: 'Üretici garantisi' },
    { icon: Truck, title: 'Ücretsiz Montaj', desc: 'Profesyonel ekip' },
    { icon: Wrench, title: 'Özel Üretim', desc: 'Milimetrik hassasiyet' },
    { icon: Sparkles, title: 'Sağlamlık', desc: 'Darbelere karşı sağlam' }
  ]

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">

      {/* ═══════════════════════════════════════════════════════════════
          BREADCRUMB & NAVIGATION
      ═══════════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════════
          HERO: GALLERY + PRODUCT INFO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="pb-20 lg:pb-32">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24">

            {/* ── Gallery ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full lg:w-[46%] space-y-4"
            >
              {/* Main Image */}
              <div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-surface border border-border/50 group touch-pan-y cursor-zoom-in"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 select-none"
                  >
                    {/* Blurred background image for mixed aspect ratios */}
                    <Image
                      src={allImages[activeImage]}
                      alt=""
                      fill
                      className="object-cover blur-3xl opacity-35 scale-110 pointer-events-none"
                    />

                    {/* Main containment image (always 100% visible) */}
                    <Image
                      src={allImages[activeImage]}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-100 ease-out pointer-events-none"
                      style={{
                        transformOrigin: isZoomed ? `${zoomPos.x}% ${zoomPos.y}%` : 'center',
                        transform: isZoomed ? 'scale(1.4)' : 'scale(1)',
                      }}
                      priority
                      sizes="(max-width: 1024px) 100vw, 46vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Collection Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-black/60 backdrop-blur-xl text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/10">
                    {product.collectionName}
                  </span>
                </div>

                {/* New Badge */}
                {product.isNew && (
                  <div className="absolute top-6 right-6 z-10">
                    <span className="bg-champagne text-black text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
                      Yeni
                    </span>
                  </div>
                )}

                {/* Image Counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-6 right-6 z-10 bg-black/50 backdrop-blur-xl text-white text-xs px-4 py-2 rounded-full border border-white/10 font-medium">
                    {activeImage + 1} / {allImages.length}
                  </div>
                )}

                {/* Arrow Controls (Desktop Overlay on Hover) */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveImage(prev => (prev - 1 + allImages.length) % allImages.length)
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 size-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex cursor-pointer"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveImage(prev => (prev + 1) % allImages.length)
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 size-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex cursor-pointer"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-20 h-20 lg:w-24 lg:h-24 shrink-0 rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer ${activeImage === i
                        ? 'border-champagne bg-surface shadow-lg'
                        : 'opacity-50 border-white/5 hover:opacity-100 hover:border-white/20'
                        }`}
                    >
                      <Image src={img} alt={`Görsel ${i + 1}`} fill className="object-cover" sizes="96px" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ── Product Info (Sticky) ── */}
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
                    <span className="text-sm text-muted-foreground">({reviews.length} değerlendirme)</span>
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
                          <span className="text-sm text-muted-foreground">
                            başlangıç fiyatı
                          </span>
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
                            /* ── Color Swatches Selector ── */
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
                            /* ── Select Dropdown Selector ── */
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
                            /* ── Button Tiles Selector ── */
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

                    {/* Selection hint */}
                    {!selectedVariant && (
                      <p className="text-xs text-muted-foreground">
                        Net fiyat için tüm seçenekleri belirleyin.
                      </p>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent" />
                  </div>
                )}

                {/* Profile Swatches (Show only if no dynamic variants exist) */}
                {!hasVariants && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[13px] font-semibold uppercase tracking-wider">Profil Renkleri</h3>
                        <AnimatePresence mode="wait">
                          {hoveredProfile && (
                            <motion.span
                              key={hoveredProfile}
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-xs text-champagne font-medium"
                            >
                              {hoveredProfile}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex gap-3">
                        {product.compatibleProfiles.map(profile => (
                          <button
                            key={profile.id}
                            onMouseEnter={() => setHoveredProfile(profile.name)}
                            onMouseLeave={() => setHoveredProfile(null)}
                            className="size-11 rounded-full shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg ring-2 ring-transparent hover:ring-champagne/50 ring-offset-2 ring-offset-background"
                            style={{ backgroundColor: profile.hex }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Glass Swatches */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[13px] font-semibold uppercase tracking-wider">Cam Seçenekleri</h3>
                        <AnimatePresence mode="wait">
                          {hoveredGlass && (
                            <motion.span
                              key={hoveredGlass}
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-xs text-champagne font-medium"
                            >
                              {hoveredGlass}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex gap-3">
                        {product.compatibleGlass.map(glass => (
                          <button
                            key={glass.id}
                            onMouseEnter={() => setHoveredGlass(glass.name)}
                            onMouseLeave={() => setHoveredGlass(null)}
                            className={`size-11 rounded-full shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg ring-2 ring-transparent hover:ring-champagne/50 ring-offset-2 ring-offset-background border border-border/30 ${glass.colorClass}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent" />
                  </>
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
                    href={`https://wa.me/905000000000?text=${encodeURIComponent(`Merhaba, ${product.name} modeli hakkında bilgi almak ve sipariş vermek istiyorum.`)}`}
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
                    Ölçü, cam, profil ve aksesuar seçerek size özel net fiyat alın veya doğrudan WhatsApp'tan bize yazın.
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

      {/* ═══════════════════════════════════════════════════════════════
          TABS SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="bg-background-secondary py-20 lg:py-28">
        <div className="container mx-auto px-6 max-w-[1200px]">

          {/* Tab Buttons */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-surface rounded-2xl p-1.5 border border-border/50">
              {[
                { id: 'ozellikler', label: 'Özellikler', icon: Sparkles },
                { id: 'teknik', label: 'Teknik Detay', icon: Layers },
                { id: 'sss', label: 'S.S.S', icon: Droplets }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`relative flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${activeTab === tab.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-background rounded-xl shadow-sm border border-border/50"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <tab.icon className={`size-4 relative z-10 ${activeTab === tab.id ? 'text-champagne' : ''}`} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[320px]">
            <AnimatePresence mode="wait">

              {/* ─ Özellikler ─ */}
              {activeTab === 'ozellikler' && (
                <motion.div key="ozellikler" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-3">
                      <h3 className="text-2xl font-light tracking-tight mb-6">Ürün Hakkında</h3>
                      <p className="text-muted-foreground text-[15px] leading-[1.85] mb-8">{product.longDescription}</p>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center p-4 rounded-2xl bg-surface border border-border/50">
                          <Maximize2 className="size-5 text-champagne mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">Yükseklik</p>
                          <p className="text-sm font-semibold mt-1">{product.technicalSpecs.height}</p>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-surface border border-border/50">
                          <Layers className="size-5 text-champagne mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">Cam</p>
                          <p className="text-sm font-semibold mt-1">{product.technicalSpecs.glassThickness[0]}</p>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-surface border border-border/50">
                          <Wrench className="size-5 text-champagne mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">Yerleşim</p>
                          <p className="text-sm font-semibold mt-1">{product.layoutType}</p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="bg-surface p-7 rounded-2xl border border-border/50 h-full">
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-champagne">Öne Çıkan Özellikler</h4>
                        <ul className="space-y-4">
                          {product.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="flex items-start gap-3"
                            >
                              <div className="size-5 rounded-full bg-champagne/15 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="size-3 text-champagne" />
                              </div>
                              <span className="text-[14px] text-muted-foreground leading-snug">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─ Teknik Detay ─ */}
              {activeTab === 'teknik' && (
                <motion.div key="teknik" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Yükseklik', value: product.technicalSpecs.height, desc: 'Maksimum montaj yüksekliği' },
                      { label: 'Genişlik', value: product.technicalSpecs.widthRange, desc: 'Kullanılabilir genişlik aralığı' },
                      { label: 'Cam Kalınlıkları', value: '4mm / 6mm (Önerilen)', desc: '6mm kabin sallanma yapmaz, daha sağlamdır.' },
                      { label: 'Montaj', value: product.technicalSpecs.installation, desc: 'Kurulum yöntemi' }
                    ].map((spec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-surface p-6 rounded-2xl border border-border/50 text-center"
                      >
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-champagne mb-3">{spec.label}</p>
                        <p className="text-lg font-semibold mb-2">{spec.value}</p>
                        <p className="text-xs text-muted-foreground">{spec.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Uyumluluk Matrisi */}
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Glass Types */}
                    <div className="bg-surface p-7 rounded-2xl border border-border/50">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider">Uyumlu Cam Tipleri</h4>
                        {hasVariants && glassAttrKey && (
                          <span className="text-[10px] font-medium uppercase tracking-wider text-champagne/70">Bu modele özel</span>
                        )}
                      </div>
                      <div className="space-y-3">
                        {compatibleGlassList.map(g => {
                          const selectedGlassVal = Object.entries(selectedAttributes).find(([k]) => k.toLowerCase().includes('cam'))?.[1]
                          const isMatched = selectedGlassVal ? g.name.toLowerCase() === selectedGlassVal.toLowerCase() || selectedGlassVal.toLowerCase().includes(g.name.toLowerCase()) || g.name.toLowerCase().includes(selectedGlassVal.toLowerCase()) : false
                          const isAnyGlassSelected = !!selectedGlassVal

                          return (
                            <div
                              key={g.id}
                              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${isMatched
                                ? 'bg-champagne/10 border-champagne text-champagne shadow-[0_0_15px_rgba(201,168,106,0.1)] font-semibold'
                                : isAnyGlassSelected
                                  ? 'opacity-40 border-transparent text-muted-foreground'
                                  : 'border-border/40 text-foreground'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`size-8 rounded-lg border border-border/30 ${g.colorClass}`} />
                                <span className="text-sm">{g.name}</span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {g.isKumlama && (
                                  <button
                                    type="button"
                                    onClick={() => setShowSandblastedModal(true)}
                                    className="text-[11px] font-semibold text-champagne hover:text-champagne/80 underline underline-offset-2 transition-colors cursor-pointer"
                                  >
                                    Desenleri Gör
                                  </button>
                                )}
                                {isMatched && <Check className="size-4 text-champagne" />}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Profiles */}
                    <div className="bg-surface p-7 rounded-2xl border border-border/50">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider">Uyumlu Profiller</h4>
                        {hasVariants && profileAttrKey && (
                          <span className="text-[10px] font-medium uppercase tracking-wider text-champagne/70">Bu modele özel</span>
                        )}
                      </div>
                      <div className="space-y-3">
                        {compatibleProfileList.map(p => {
                          const selectedProfileVal = Object.entries(selectedAttributes).find(([k]) => k.toLowerCase().includes('profil') || k.toLowerCase().includes('renk'))?.[1]
                          const isMatched = selectedProfileVal ? p.name.toLowerCase() === selectedProfileVal.toLowerCase() || selectedProfileVal.toLowerCase().includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(selectedProfileVal.toLowerCase()) : false
                          const isAnyProfileSelected = !!selectedProfileVal

                          return (
                            <div
                              key={p.id}
                              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${isMatched
                                ? 'bg-champagne/10 border-champagne text-champagne shadow-[0_0_15px_rgba(201,168,106,0.1)] font-semibold'
                                : isAnyProfileSelected
                                  ? 'opacity-40 border-transparent text-muted-foreground'
                                  : 'border-border/40 text-foreground'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg border border-border/30 shadow-sm" style={{ backgroundColor: p.hex }} />
                                <span className="text-sm">{p.name}</span>
                              </div>
                              {isMatched && <Check className="size-4 text-champagne shrink-0" />}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─ S.S.S ─ */}
              {activeTab === 'sss' && (
                <motion.div key="sss" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }} className="max-w-3xl mx-auto">
                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="bg-surface border border-border/50 rounded-2xl overflow-hidden"
                      >
                        <button
                          onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left group"
                        >
                          <span className="font-medium text-[15px] group-hover:text-champagne transition-colors pr-4">{faq.q}</span>
                          <motion.div animate={{ rotate: faqOpen === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                            <ChevronDown className={`size-5 shrink-0 transition-colors ${faqOpen === i ? 'text-champagne' : 'text-muted-foreground'}`} />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {faqOpen === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                              <div className="px-6 pb-5">
                                <div className="h-px bg-border/50 mb-4" />
                                <p className="text-muted-foreground text-[14px] leading-relaxed">{faq.a}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════════════
          REVIEWS & REAL INSTALLATIONS
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="py-20 lg:py-28">
        <div className="container mx-auto px-6 max-w-[1440px]">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-champagne" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-champagne uppercase">Müşteri Deneyimleri</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-2">Gerçek Banyo Kurulumları</h2>
              <p className="text-muted-foreground text-[15px]">Müşterilerimizin fotoğraflı paylaşımları ve değerlendirmeleri.</p>
            </div>

            <div className="flex items-center gap-5">
              {/* Aggregate Score */}
              <div className="flex items-center gap-2 bg-surface px-5 py-3 rounded-2xl border border-border/50">
                <Star className="size-5 fill-champagne text-champagne" />
                <span className="text-xl font-semibold">{averageRating}</span>
                <span className="text-sm text-muted-foreground">/ 5</span>
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-6 py-3.5 bg-foreground text-background rounded-xl font-medium text-sm hover:bg-foreground/90 transition-colors"
              >
                Deneyimini Paylaş
              </button>
            </div>
          </div>

          {/* Review Form */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-14">
                <form onSubmit={handleReviewSubmit} className="bg-surface border border-border/50 p-8 lg:p-10 rounded-3xl max-w-2xl">
                  <h3 className="text-xl font-semibold mb-2">Değerlendirme Yazın</h3>
                  <p className="text-sm text-muted-foreground mb-8">Hesap oluşturmanıza gerek yok — sadece adınızı girin ve deneyiminizi paylaşın.</p>

                  <div className="space-y-6">
                    {/* Star Rating */}
                    <div>
                      <label className="block text-[13px] font-medium mb-3">Puan verin</label>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star className={`size-7 transition-colors ${star <= newReview.rating ? 'fill-champagne text-champagne' : 'text-border hover:text-champagne/40'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-[13px] font-medium mb-2">Ad Soyad</label>
                      <input
                        type="text"
                        required
                        value={newReview.name}
                        onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3.5 outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all text-[15px]"
                        placeholder="Örn: Merve K."
                      />
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-[13px] font-medium mb-2">Yorumunuz</label>
                      <textarea
                        required
                        value={newReview.comment}
                        onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                        rows={4}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3.5 outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all resize-none text-[15px]"
                        placeholder="Kurulum deneyiminizi ve ürün hakkındaki düşüncelerinizi paylaşın..."
                      />
                    </div>

                    {/* Honeypot (Hidden) */}
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                      <label>Eğer insansanız bu alanı boş bırakın</label>
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={newReview.website_url}
                        onChange={e => setNewReview({ ...newReview, website_url: e.target.value })}
                      />
                    </div>

                    {/* Math Captcha */}
                    <div>
                      <label className="block text-[13px] font-medium mb-2 text-foreground">Bot Koruması: 5 + 3 kaçtır?</label>
                      <input
                        type="text"
                        required
                        value={newReview.math_answer}
                        onChange={e => setNewReview({ ...newReview, math_answer: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3.5 outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all text-[15px]"
                        placeholder="Sonucu rakamla yazın"
                      />
                    </div>

                    {/* Photo Upload */}
                    <button type="button" className="flex items-center gap-2.5 text-sm text-champagne hover:text-champagne/80 transition-colors font-medium">
                      <Camera className="size-4" /> Fotoğraf Ekle <span className="text-muted-foreground font-normal">(opsiyonel)</span>
                    </button>

                    <button disabled={isSubmitting} type="submit" className="bg-champagne text-black font-semibold px-8 py-3.5 rounded-xl hover:bg-champagne/90 transition-all hover:shadow-[0_4px_20px_rgba(201,168,106,0.3)] disabled:opacity-70 flex items-center justify-center min-w-[160px]">
                      {isSubmitting ? 'Gönderiliyor...' : 'Yorumu Gönder'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reviews Grid */}
          {isLoadingReviews ? (
            <div className="flex justify-center items-center py-10 opacity-50">
              Yorumlar yükleniyor...
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-10 opacity-60">
              <p>Henüz değerlendirme yapılmamış. İlk yorum yapan siz olun!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="group bg-surface border border-border/50 rounded-2xl overflow-hidden flex flex-col hover:border-champagne/20 transition-colors duration-300"
                >
                  {/* Review Photo */}
                  {review.images && review.images.length > 0 && (
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image src={review.images[0]} alt="Banyo kurulumu" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  )}

                  {/* Review Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-gradient-to-br from-champagne/30 to-champagne/10 flex items-center justify-center">
                          <User className="size-4 text-champagne" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{review.author_name}</p>
                          <p className="text-[11px] text-muted-foreground">{review.created_at ? new Date(review.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={`size-3 ${s <= review.rating ? 'fill-champagne text-champagne' : 'text-border'}`} />
                        ))}
                      </div>
                    </div>

                    <div className="relative flex-1">
                      <Quote className="size-5 text-champagne/20 absolute -top-1 -left-1" />
                      <p className="text-[13px] text-muted-foreground leading-relaxed pl-5">{review.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════════════
          BOTTOM CTA BANNER
      ═══════════════════════════════════════════════════════════════ */}
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

      {/* ─── Sandblasted Glass Models Modal ─── */}
      <AnimatePresence>
        {showSandblastedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSandblastedModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl mx-4 bg-[#121212]/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden max-h-[85vh] flex flex-col"
            >
              {/* Top Bar / Notch for Mobile dragging feel */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/10 rounded-full sm:hidden" />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-white">Kumlama Cam Desenleri</h3>
                  <p className="text-xs text-muted-foreground mt-1">Lüks duşakabininiz için premium kumlama modellerimiz.</p>
                </div>
                <button
                  onClick={() => setShowSandblastedModal(false)}
                  className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Models Grid */}
              <div className="overflow-y-auto pr-1 flex-1 space-y-6 scrollbar-thin">
                {sandblastedModels.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground text-sm">
                    Desenler yükleniyor...
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {sandblastedModels.map((model) => (
                      <div key={model.id} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] transition-colors hover:border-champagne/40">
                        <div className="relative aspect-[4/5] w-full overflow-hidden">
                          <Image
                            src={model.image_url}
                            alt={model.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                           fill />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <span className="text-xs font-semibold text-champagne">Desen Kodu: {model.title}</span>
                          </div>
                        </div>
                        <div className="p-3 text-center border-t border-white/5">
                          <span className="text-xs font-medium text-white/90">{model.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-center">
                <button
                  onClick={() => setShowSandblastedModal(false)}
                  className="px-6 py-2.5 rounded-full bg-champagne text-black text-xs font-semibold hover:bg-champagne/90 transition-all duration-300 cursor-pointer"
                >
                  Modelleri İnceledim
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
