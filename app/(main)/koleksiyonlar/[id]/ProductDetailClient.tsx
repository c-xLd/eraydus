'use client'

import { useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion'
import { 
  ArrowLeft, Check, Star, ChevronDown, Camera, User, 
  Shield, Truck, Wrench, Sparkles, ArrowRight, Quote, 
  Maximize2, Layers, Droplets
} from 'lucide-react'
import { Product } from '@/lib/data/products'
import { getApprovedReviews, submitProductReview } from '@/features/products/actions/reviews'
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

/* ─── Component ─── */
interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'ozellikler' | 'teknik' | 'sss'>('ozellikler')
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null)
  const [hoveredGlass, setHoveredGlass] = useState<string | null>(null)
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})

  const [reviews, setReviews] = useState<any[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(true)
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', website_url: '', math_answer: '' })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const faqs = [
    { q: 'Teslimat süresi ne kadar?', a: 'Siparişiniz onaylandıktan sonra özel ölçü üretimimiz 7-10 iş günü sürmektedir. Montaj, ürün tesliminden sonra 1 iş günü içinde profesyonel ekibimiz tarafından tamamlanır.' },
    { q: 'Garanti koşulları nelerdir?', a: 'Tüm Erayduş ürünleri profil, mekanizma ve fitil sararmalarına karşı 10 yıl üretici garantisi altındadır. Temperli cam kırılmaları kapsam dışıdır.' },
    { q: 'Özel ölçü üretim yapıyor musunuz?', a: 'Evet, tüm ürünlerimiz banyonuzun lazer ölçümlerine göre milimetrik hassasiyetle özel üretilmektedir. Standart ölçü satışımız yoktur.' },
    { q: 'Montaj hizmeti dahil mi?', a: 'Evet, tüm siparişlerimize ücretsiz profesyonel montaj hizmeti dahildir. Uzman ekibimiz, ürünü banyonuza kusursuz bir şekilde monte eder.' },
    { q: 'Hangi cam seçenekleri mevcut?', a: 'Şeffaf, füme, bronz, buzlu (kumlama) ve oluklu (fluted) cam seçeneklerimiz mevcuttur. Tüm camlarımız 6mm-12mm kalınlıklarında, DIN EN 12150 sertifikalı temperli camdır.' }
  ]

  const guarantees = [
    { icon: Shield, title: '10 Yıl Garanti', desc: 'Üretici garantisi' },
    { icon: Truck, title: 'Ücretsiz Montaj', desc: 'Profesyonel ekip' },
    { icon: Wrench, title: 'Özel Üretim', desc: 'Milimetrik hassasiyet' },
    { icon: Sparkles, title: 'Nano Kaplama', desc: 'Kolay temizlenebilir' }
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
              className="w-full lg:w-[58%] space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden bg-surface border border-border/50 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={allImages[activeImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 58vw"
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
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-20 h-20 lg:w-24 lg:h-24 shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
                        activeImage === i
                          ? 'ring-2 ring-champagne ring-offset-2 ring-offset-background scale-[1.02]'
                          : 'opacity-60 hover:opacity-100 hover:scale-[1.02]'
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
              className="w-full lg:w-[42%]"
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
                      {[1,2,3,4,5].map(s => (
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
                      <span className="text-3xl font-semibold tracking-tight">₺{displayPrice.toLocaleString('tr-TR')}</span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {hasVariants && !selectedVariant ? 'başlangıç fiyatı' : selectedVariant ? 'seçili varyasyon' : 'başlangıç fiyatı'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[15px] text-muted-foreground leading-[1.75]">{product.description}</p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent" />

                {/* Variation Selectors */}
                {hasVariants && attributeKeys.length > 0 && (
                  <div className="space-y-5">
                    {attributeKeys.map(key => (
                      <div key={key} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[13px] font-semibold uppercase tracking-wider">{humanizeKey(key)}</h3>
                          {selectedAttributes[key] && (
                            <span className="text-xs text-champagne font-medium">{humanizeValue(selectedAttributes[key])}</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {attributeGroups[key].map(val => {
                            const isSelected = selectedAttributes[key] === val
                            return (
                              <button
                                key={val}
                                onClick={() => setSelectedAttributes(prev => ({ ...prev, [key]: val }))}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 min-h-[44px] ${
                                  isSelected
                                    ? 'bg-champagne text-black border-champagne shadow-[0_2px_12px_rgba(201,168,106,0.25)]'
                                    : 'bg-surface text-foreground border-border/60 hover:border-champagne/50'
                                }`}
                              >
                                {humanizeValue(val)}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}

                    {/* Selection hint */}
                    {!selectedVariant && (
                      <p className="text-xs text-muted-foreground">
                        Net fiyat için tüm seçenekleri belirleyin.
                      </p>
                    )}
                    {selectedVariant && selectedVariant.stockQuantity <= 0 && (
                      <p className="text-xs text-red-500 font-medium">Bu varyasyon şu anda stokta yok.</p>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent" />
                  </div>
                )}

                {/* Profile Swatches */}
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
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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
                  className={`relative flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
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
                    <div className="bg-surface p-7 rounded-2xl border border-border/50">
                      <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Uyumlu Cam Tipleri</h4>
                      <div className="space-y-3">
                        {product.compatibleGlass.map(g => (
                          <div key={g.id} className="flex items-center gap-3">
                            <div className={`size-8 rounded-lg border border-border/30 ${g.colorClass}`} />
                            <span className="text-sm">{g.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-surface p-7 rounded-2xl border border-border/50">
                      <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Uyumlu Profiller</h4>
                      <div className="space-y-3">
                        {product.compatibleProfiles.map(p => (
                          <div key={p.id} className="flex items-center gap-3">
                            <div className="size-8 rounded-lg border border-border/30" style={{ backgroundColor: p.hex }} />
                            <span className="text-sm">{p.name}</span>
                          </div>
                        ))}
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
                        {[1,2,3,4,5].map(star => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReview({...newReview, rating: star})}
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
                        onChange={e => setNewReview({...newReview, name: e.target.value})}
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
                        onChange={e => setNewReview({...newReview, comment: e.target.value})}
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
                        onChange={e => setNewReview({...newReview, website_url: e.target.value})} 
                      />
                    </div>

                    {/* Math Captcha */}
                    <div>
                      <label className="block text-[13px] font-medium mb-2 text-foreground">Bot Koruması: 5 + 3 kaçtır?</label>
                      <input
                        type="text"
                        required
                        value={newReview.math_answer}
                        onChange={e => setNewReview({...newReview, math_answer: e.target.value})}
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
                      {[1,2,3,4,5].map(s => (
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
    </div>
  )
}
