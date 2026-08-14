'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronDown,
  Star,
  ShieldCheck,
  Check,
  Droplets,
  Wind,
  Zap,
  Maximize2,
  Sparkles,
  Fingerprint,
  Phone,
  ArrowUpRight,
  MapPin,
  Calendar,
  Clock,
  X,
  ChevronLeft,
  ThumbsUp,
  Camera,
  HelpCircle,
  MessageCircle
} from 'lucide-react'
import { submitProductReview } from '@/features/products/actions/reviews'
import type { ProductWithOptions } from '@/features/products/types/product'
import { getGlassImageUrl, getProfileImageUrl } from '@/features/products/utils/option-images'

interface ProductLuxuryDetailViewProps {
  product: ProductWithOptions
  category: { id: string; name: string; slug: string }
  initialReviews: Array<{
    id: string
    author_name: string
    rating: number
    content: string
    created_at: string
    is_approved?: boolean
  }>
}

// Glass Options matching exactly the /urunler showcase
const DEFAULT_GLASS_OPTIONS = [
  { id: 'seffaf', name: 'Şeffaf Extra Clear', desc: 'Maksimum ışık geçirgenliği ve ferahlık.', price: 0 },
  { id: 'fume', name: 'Füme (Siyah) Cam', desc: 'Keskin hatlar, mahremiyet ve lüks görünüm.', price: 1800 },
  { id: 'bronz', name: 'Bronz Cam', desc: 'Sıcak tonlar ve zarif yansıma.', price: 2100 },
  { id: 'aynali', name: 'Aynalı Cam', desc: 'Genişlik hissi ve tam mahremiyet.', price: 3400 },
  { id: 'kumlama', name: 'Kumlama (Buzlu)', desc: 'Özel desenler ve modern doku.', price: 2800 },
  { id: 'buz-mat', name: 'Buz Mat Cam', desc: 'Pürüzsüz mat yüzey ve tam gizlilik.', price: 1900 },
]

const DEFAULT_PROFILE_OPTIONS = [
  { id: 'siyah', name: 'Mat Siyah', desc: 'Elektrostatik fırın boyalı mat kaplama' },
  { id: 'firca-parlak', name: 'Parlak Krom', desc: 'Ayna parlaklığında paslanmaz yüzey' },
  { id: 'gold', name: 'Fırçalanmış Altın', desc: 'Solmayan titanyum altın kaplama' },
  { id: 'beyaz', name: 'Mat Beyaz', desc: 'Minimalist beyaz profil' },
]

// Kumlama Glass specific patterns
const KUMLAMA_MODELS = [
  { id: 'k1', name: 'Çizgi Desen' },
  { id: 'k2', name: 'Kare Desen' },
  { id: 'k3', name: 'Dalga Desen' },
  { id: 'k4', name: 'Mozaik Desen' },
  { id: 'k5', name: 'Puslu Desen' },
]

const SPRING_ULTRA = "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
const SPRING_FAST = "transition-all duration-200 ease-out"
const HOVER_LIFT = "hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
const ACTIVE_PRESS = "active:scale-[0.96] active:translate-y-0 active:shadow-sm"

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onClick: () => void
}

const AccordionItem = ({ title, children, isOpen, onClick }: AccordionItemProps) => (
  <div className="border-b border-black/5 last:border-b-0">
    <button
      type="button"
      onClick={onClick}
      className="w-full py-6 lg:py-8 flex justify-between items-center text-left group focus:outline-none"
    >
      <span className={`text-[18px] lg:text-[21px] font-medium transition-colors ${isOpen ? 'text-[#050505]' : 'text-neutral-600 group-hover:text-[#050505]'}`}>
        {title}
      </span>
      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-white border border-black/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-180 bg-[#050505] text-white border-transparent shadow-lg' : 'group-hover:scale-110'}`}>
        <ChevronDown className="w-5 h-5" />
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
      <div className="text-[15px] lg:text-[16px] text-neutral-500 leading-relaxed lg:w-4/5">
        {children}
      </div>
    </div>
  </div>
)

export function ProductLuxuryDetailView({ product, category, initialReviews }: ProductLuxuryDetailViewProps) {
  // Gallery images from real product data (main_image_url, images array, gallery relations)
  const images = useMemo(() => {
    const list: string[] = []

    if (product.main_image_url && typeof product.main_image_url === 'string') {
      list.push(product.main_image_url)
    }

    const rawImages = (product as unknown as { images?: string[] }).images
    if (Array.isArray(rawImages) && rawImages.length > 0) {
      rawImages.forEach(img => {
        const url = String(img).trim()
        if (url && !list.includes(url)) {
          list.push(url)
        }
      })
    }

    if (list.length === 0) {
      list.push("https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/products/katlanir-dusakabin-05/katlanir-dusakabin-05-eraydus-1.jpg")
      list.push("https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/products/katlanir-dusakabin-05/katlanir-dusakabin-05-eraydus-2.jpg")
      list.push("https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/products/katlanir-dusakabin-05/katlanir-dusakabin-05-eraydus-3.jpg")
    }

    return list
  }, [product])

  // Variants / Sizes - Only set if variants exist from Admin / DB
  const sizeOptions = useMemo(() => {
    if (product.variants && product.variants.length > 0) {
      return product.variants.map(v => ({
        id: v.id,
        label: v.name,
        price: v.sale_price ?? v.price,
        desc: v.sku ? `Kod: ${v.sku}` : 'Montaj ölçüsü'
      }))
    }
    return []
  }, [product])

  const hasSizeVariants = sizeOptions.length > 0

  // Glass Options with real images (Strictly matching Material Showcase)
  const glassOptions = useMemo(() => {
    return DEFAULT_GLASS_OPTIONS.map(g => ({
      id: g.id,
      name: g.name,
      desc: g.desc,
      imageUrl: getGlassImageUrl(g.id, g.name),
      price: g.price
    }))
  }, [])

  // Profile Color Options with real images (Strictly matching Material Showcase)
  const profileOptions = useMemo(() => {
    return DEFAULT_PROFILE_OPTIONS.map(p => ({
      id: p.id,
      name: p.name,
      desc: p.desc,
      imageUrl: getProfileImageUrl(p.id, p.name),
      price: 0
    }))
  }, [])

  // State Management
  const [selectedSize, setSelectedSize] = useState(hasSizeVariants ? sizeOptions[0] : null)
  const [selectedGlass, setSelectedGlass] = useState(glassOptions[0])
  const [selectedKumlamaModel, setSelectedKumlamaModel] = useState(KUMLAMA_MODELS[0])
  const [selectedProfile, setSelectedProfile] = useState(profileOptions[0])
  const [activeImage, setActiveImage] = useState(0)
  const [showBottomStickyBar, setShowBottomStickyBar] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)

  // Reviews state
  const [reviewsList, setReviewsList] = useState(initialReviews)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewHoverRating, setReviewHoverRating] = useState(0)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [, setReviewSuccessMsg] = useState(false)
  const [reviewErrorMsg, setReviewErrorMsg] = useState('')

  // Lightbox Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Scroll listener: Appears ONLY when reaching Müşteri Görüşleri section and before footer begins
  useEffect(() => {
    setIsLoaded(true)
    const handleScroll = () => {
      const el = document.getElementById('musteri-gorusleri')
      const totalHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      if (!el) {
        setShowBottomStickyBar(scrollY > 1100 && scrollY < totalHeight - windowHeight - 400)
        return
      }

      const rect = el.getBoundingClientRect()
      const reachedMusteriGorusleri = rect.top <= windowHeight - 100
      const beforeFooter = scrollY < totalHeight - windowHeight - 400

      setShowBottomStickyBar(reachedMusteriGorusleri && beforeFooter)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Gallery Navigation Handlers
  const handleNextGallery = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setActiveImage((prev) => (prev + 1) % images.length)
  }

  const handlePrevGallery = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Dynamic Price Calculation
  const totalPrice = useMemo(() => {
    let base = product.sale_price ?? product.base_price ?? product.starting_price ?? 14500
    if (selectedSize && selectedSize.price) {
      base = selectedSize.price
    }
    if (selectedGlass && selectedGlass.price) {
      base += selectedGlass.price
    }
    if (selectedProfile && selectedProfile.price) {
      base += selectedProfile.price
    }
    return base
  }, [product, selectedSize, selectedGlass, selectedProfile])

  // Keyboard Navigation for Gallery (Main View & Lightbox Modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events if user is typing in form inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      if (isModalOpen) {
        if (e.key === 'Escape') setIsModalOpen(false)
        if (e.key === 'ArrowRight') setModalImageIndex((prev) => (prev + 1) % images.length)
        if (e.key === 'ArrowLeft') setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      } else if (!isReviewModalOpen) {
        if (e.key === 'ArrowRight') setActiveImage((prev) => (prev + 1) % images.length)
        if (e.key === 'ArrowLeft') setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, isReviewModalOpen, images.length])

  // Instant Image Preloading Optimization (Antigravity UX Performance)
  useEffect(() => {
    if (images.length <= 1) return
    const nextIdx = (activeImage + 1) % images.length
    const prevIdx = activeImage === 0 ? images.length - 1 : activeImage - 1

    const imgNext = new Image()
    imgNext.src = images[nextIdx]
    const imgPrev = new Image()
    imgPrev.src = images[prevIdx]
  }, [activeImage, images])

  // Copy Image Link Handler
  const handleCopyImageLink = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const currentImg = images[activeImage] || images[0]
    navigator.clipboard.writeText(currentImg).then(() => {
      setToastMessage("Yüksek çözünürlüklü ürün görsel bağlantısı kopyalandı.")
      setTimeout(() => setToastMessage(null), 3000)
    }).catch(() => {
      setToastMessage("Görsel bağlantısı kopyalanamadı.")
      setTimeout(() => setToastMessage(null), 3000)
    })
  }

  // WhatsApp Action Handler
  const handleWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    setToastMessage("Sipariş ve keşif detaylarınız WhatsApp'a aktarılıyor...")
    setTimeout(() => setToastMessage(null), 3500)

    const text = `Merhaba ERAYDUŞ,\n\n*Özel Sipariş & Keşif Talebi:*\nÜrün: ${product.name}\nKoleksiyon: ${category.name}\nÖlçü: ${selectedSize?.label || 'Özel Ölçü'}\nCam: ${selectedGlass?.name || '6mm Temperli Cam'}\nProfil Rengi: ${selectedProfile?.name || 'Mat Siyah'}\nHesaplanan Tutar: ₺${totalPrice.toLocaleString('tr-TR')}\n\nDetayları görüşmek ve Ankara içi keşif randevusu oluşturmak istiyorum.`

    const url = `https://wa.me/905548830071?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleNextModalImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setModalImageIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevModalImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Handle Review Submit
  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmittingReview(true)
    setReviewErrorMsg('')

    const formData = new FormData(e.currentTarget)
    formData.append('rating', reviewRating.toString())
    formData.append('product_id', product.id)

    const mathAnswer = formData.get('math_answer')?.toString()
    if (mathAnswer !== '8') {
      setReviewErrorMsg('Lütfen doğrulama işlemini doğru yanıtlayın (3 + 5 = 8).')
      setIsSubmittingReview(false)
      return
    }

    try {
      const res = await submitProductReview(formData)
      if (res.success) {
        setReviewSuccessMsg(true)
        setIsReviewModalOpen(false)
        setToastMessage("Değerlendirmeniz alındı, onaylandıktan sonra yayınlanacaktır.")
        setTimeout(() => setToastMessage(null), 4000)
      } else {
        setReviewErrorMsg(res.error || 'Değerlendirme iletilemedi.')
      }
    } catch {
      setReviewErrorMsg('Bir hata oluştu, lütfen tekrar deneyin.')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  // Real Reviews aggregations from Supabase (Zero mock data per AGENTS.md)
  const totalReviewsCount = reviewsList.length
  const avgRatingScore = totalReviewsCount > 0
    ? (reviewsList.reduce((a, b) => a + b.rating, 0) / totalReviewsCount).toFixed(1)
    : '5.0'

  const ratingDistribution = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviewsList.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5
      counts[star] = (counts[star] || 0) + 1
    })
    return counts
  }, [reviewsList])

  const getStarPercentage = (star: 5 | 4 | 3 | 2 | 1) => {
    if (totalReviewsCount === 0) return 0
    return Math.round((ratingDistribution[star] / totalReviewsCount) * 100)
  }

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#050505] font-sans selection:bg-[#050505] selection:text-white pb-32 lg:pb-0 relative">
      {/* NOISE TEXTURE */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* SİSTEM BİLDİRİMİ (TOAST) */}
      <div
        className={`fixed top-24 left-1/2 -translate-x-1/2 z-[150] transition-all duration-500 pointer-events-none ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="bg-[#050505] text-white px-6 py-3 rounded-full text-[14px] font-medium shadow-2xl flex items-center gap-3">
          <Check className="w-4 h-4 text-[#25D366]" />
          <span>{toastMessage}</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 pt-24 sm:pt-28 lg:pt-32 pointer-events-auto">
        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          className={`text-[12px] text-neutral-500 mb-6 lg:mb-8 font-medium tracking-wide transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#050505] transition-colors">
                Anasayfa
              </Link>
            </li>
            <li className="text-neutral-300">/</li>
            <li>
              <Link href="/urunler" className="hover:text-[#050505] transition-colors">
                Koleksiyonlar
              </Link>
            </li>
            <li className="text-neutral-300">/</li>
            <li>
              <Link href={`/urunler/${category?.slug || 'dusakabin'}`} className="hover:text-[#050505] transition-colors">
                {category?.name || 'Duşakabin Modelleri'}
              </Link>
            </li>
            <li className="text-neutral-300">/</li>
            <li className="text-[#050505] font-semibold truncate max-w-[240px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          {/* SOL: STICKY GALERİ (7 Col) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 lg:self-start z-10">
            <div className={images.length > 1 ? "lg:grid lg:grid-cols-[96px_minmax(0,1fr)] lg:gap-4 xl:gap-6" : "w-full"}>
              {images.length > 1 && (
                <div className={`hidden lg:flex lg:flex-col gap-3 content-start transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      className={`group/thumb relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 ${SPRING_FAST} ${
                        activeImage === idx
                          ? 'ring-2 ring-offset-2 ring-[#050505] scale-[1.02] shadow-lg'
                          : 'opacity-60 hover:opacity-100 hover:scale-[1.01]'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Detay ${idx + 1}`}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/thumb:scale-110"
                      />
                    </button>
                  ))}
                </div>
              )}
              <div
                className={`relative w-full aspect-[3/4] sm:aspect-[3/4] lg:aspect-[3/4] xl:aspect-[3/4] lg:max-h-[calc(100vh-140px)] rounded-[32px] overflow-hidden bg-neutral-900 group transition-all duration-500 select-none ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)]`}
              >
                {/* TIKLANABİLİR BÜYÜTME ALANI (Sadece Görsel Katmanı) */}
                <div
                  className="w-full h-full cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(true)
                    setModalImageIndex(activeImage)
                  }}
                >
                  {/* MOBİL İÇİN DOKUNMATİK KAYDIRILABİLİR (SWIPE) GALERİ */}
                  <div
                    className="relative z-10 w-full h-full flex overflow-x-auto snap-x snap-mandatory lg:hidden [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onScroll={(e) => {
                      const target = e.currentTarget as HTMLDivElement
                      const scrollLeft = target.scrollLeft
                      const width = target.clientWidth
                      const newIdx = Math.round(scrollLeft / width)
                      if (newIdx !== activeImage) {
                        setActiveImage(newIdx)
                      }
                    }}
                  >
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${product.name} Görseli ${idx + 1}`}
                        className="w-full h-full object-cover object-center flex-shrink-0 snap-center pointer-events-none"
                      />
                    ))}
                  </div>

                  {/* MASAÜSTÜ ANA GÖRSEL */}
                  <div className="hidden lg:block relative z-10 w-full h-full overflow-hidden">
                    <img
                      src={images[activeImage] || images[0]}
                      alt={`${product.name} Görünümü`}
                      className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="absolute inset-0 z-20 ring-1 ring-inset ring-black/10 rounded-[32px] pointer-events-none" />

                  {/* SOL ÜST: GÖRSEL SAYACI */}
                  <div className="absolute top-6 left-6 z-30">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/20 text-white px-3.5 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-2 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="font-mono">{String(activeImage + 1).padStart(2, '0')}</span>
                      <span className="opacity-40">/</span>
                      <span className="opacity-60 font-mono">{String(images.length).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* SAĞ ÜST: TAM EKRAN BÜYÜTME BUTONU */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsModalOpen(true)
                      setModalImageIndex(activeImage)
                    }}
                    className={`absolute top-6 right-6 z-30 bg-black/40 hover:bg-black/70 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-full text-[12px] font-medium flex items-center gap-2 shadow-lg ${ACTIVE_PRESS} ${SPRING_FAST}`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Büyüt</span>
                  </button>
                </div>

                {/* MASAÜSTÜ BAĞIMSIZ SAĞ VE SOL OK BUTONLARI (z-50) */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                      }}
                      aria-label="Önceki Görsel"
                      className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white text-[#050505] items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.3)] opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setActiveImage((prev) => (prev + 1) % images.length)
                      }}
                      aria-label="Sonraki Görsel"
                      className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white text-[#050505] items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.3)] opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                    </button>
                  </>
                )}

              {/* MOBİL NOKTA GÖSTERGELERİ */}
              <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full pointer-events-none">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeImage === idx ? 'bg-white w-5' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

          {/* SAĞ: KONFİGÜRATÖR (5 Col) */}
          <div className="lg:col-span-5 pb-12 relative z-20">
            <header
              className={`mb-8 lg:mb-10 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] text-black/40 uppercase block mb-2">
                ERAYDUŞ ÖZEL KOLEKSİYON · {category.name}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-black mb-3">
                {product.name}
              </h1>
              <p className="text-black/60 text-base font-light leading-relaxed">
                {product.short_description || 'Görsel engelleri ortadan kaldıran pürüzsüz tasarım. Banyonuzu ferah bir yaşam alanına dönüştürün.'}
              </p>
            </header>

            {/* Dinamik Fiyat Göstergesi */}
            <div className="hidden lg:block mb-10">
              <div className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase mb-2">
                Tutar + KDV
              </div>
              <div className="flex items-baseline gap-3 pb-6 border-b border-black/5 relative">
                <span className="text-4xl lg:text-5xl font-medium tracking-tight text-black">
                  ₺{totalPrice.toLocaleString('tr-TR')}
                </span>
                <span className="text-xs text-black/50 font-light">Kurulum & Montaj Desteği</span>
                <div className="absolute right-0 bottom-6 opacity-20 pointer-events-none">
                  <Fingerprint className="w-12 h-12" strokeWidth={1} />
                </div>
              </div>
            </div>

            {/* ADIM 1: KABİN ÖLÇÜSÜ (Yalnızca Admin Varyasyonu Eklenmişse Gösterilir) */}
            {hasSizeVariants && (
              <section className="mb-10 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-black" />
                    <h3 className="text-lg md:text-xl font-medium text-black tracking-tight">
                      1. Kabin Ölçüsü
                    </h3>
                  </div>
                  <span className="text-xs text-black/50 font-light">
                    Hassas Ölçü
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {sizeOptions.map((s) => {
                    const isSelected = selectedSize?.id === s.id
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`relative p-4 text-left rounded-2xl border ${SPRING_FAST} ${HOVER_LIFT} ${ACTIVE_PRESS} focus:outline-none ${
                          isSelected
                            ? 'border-[#050505] bg-white ring-1 ring-inset ring-[#050505] shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
                            : 'border-transparent bg-white/70 hover:bg-white shadow-sm'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[15px] lg:text-[16px] font-medium ${isSelected ? 'text-[#050505]' : 'text-neutral-700'}`}>
                            {s.label}
                          </span>
                          {isSelected && (
                            <span className="bg-[#050505] text-white p-1 rounded-full">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <span className="text-[12px] text-neutral-500 block">{s.desc}</span>
                        {s.price && s.price > 0 ? (
                          <span className="text-[12px] font-semibold text-neutral-400 mt-2 block">
                            ₺{s.price.toLocaleString('tr-TR')}
                          </span>
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </section>
            )}

            {/* ADIM 2: CAM SEÇENEĞİ - /urunler sayfasıyla birebir aynı stil */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-black" />
                  <h3 className="text-lg md:text-xl font-medium text-black tracking-tight">
                    {hasSizeVariants ? '2.' : '1.'} Cam Seçeneği
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {glassOptions.map((g) => {
                  const isSelected = selectedGlass?.id === g.id
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGlass(g)}
                      className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 active:scale-[0.98] focus:outline-none ${
                        isSelected
                          ? 'border-[#050505] ring-2 ring-[#050505] shadow-[0_10px_25px_rgba(0,0,0,0.1)] scale-[1.02]'
                          : 'border-black/10 bg-neutral-50 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-200">
                        <img
                          src={g.imageUrl}
                          alt={g.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                        {/* Seçili Rozeti (Sağ Üst) */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white text-[#050505] flex items-center justify-center shadow-lg">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        {/* Başlık (Görselin içinde sol alt) */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                          <h4 className="text-white font-semibold text-[11px] leading-tight line-clamp-2">
                            {g.name}
                          </h4>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* KUMLAMA CAM MODELLERİ (Eğer Kumlama seçildiyse göster) */}
            <AnimatePresence>
              {selectedGlass?.id === 'kumlama' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-10 overflow-hidden"
                >
                  <div className="p-4 sm:p-5 rounded-[24px] bg-neutral-50 border border-black/5">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-black" />
                      <h4 className="text-[14px] font-semibold text-black">
                        Kumlama (Buzlu) Cam Modeli Seçin
                      </h4>
                    </div>
                    
                    {/* Yatay Slider */}
                    <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {KUMLAMA_MODELS.map((model) => {
                        const isSelectedModel = selectedKumlamaModel?.id === model.id;
                        return (
                          <button
                            key={model.id}
                            type="button"
                            onClick={() => setSelectedKumlamaModel(model)}
                            className={`snap-start shrink-0 group relative flex flex-col w-[110px] rounded-[16px] overflow-hidden border transition-all duration-300 active:scale-95 ${
                              isSelectedModel
                                ? 'border-[#050505] ring-2 ring-[#050505] shadow-[0_10px_20px_rgba(0,0,0,0.1)] scale-105 z-10'
                                : 'border-black/10 bg-white hover:border-black/30 hover:shadow-md'
                            }`}
                          >
                            <div className="relative w-full aspect-[4/5] bg-neutral-200">
                              <img 
                                src={`https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/kumlamali.jpeg`}
                                alt={model.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                              {isSelectedModel && (
                                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white text-[#050505] flex items-center justify-center shadow-md">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              )}
                            </div>
                            <div className={`p-2 text-center border-t transition-colors ${isSelectedModel ? 'bg-[#050505] text-white border-transparent' : 'bg-white border-black/5 text-black'}`}>
                              <span className="text-[11px] font-semibold leading-tight block">{model.name}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ADIM 3: PROFİL RENKLERİ - BÜYÜK KARE GÖRSELLER */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-black" />
                  <h3 className="text-lg md:text-xl font-medium text-black tracking-tight">
                    {hasSizeVariants ? '3.' : '2.'} Profil Renkleri
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                {profileOptions.map((p) => {
                  const isSelected = selectedProfile?.id === p.id
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProfile(p)}
                      className={`group relative flex flex-col p-1.5 rounded-[20px] border text-center transition-all duration-300 active:scale-[0.98] focus:outline-none ${
                        isSelected
                          ? 'border-[#050505] bg-white ring-2 ring-[#050505] shadow-[0_8px_20px_rgba(0,0,0,0.1)] scale-[1.02]'
                          : 'border-black/10 bg-neutral-50 hover:bg-white shadow-sm hover:shadow-md'
                      }`}
                    >
                      {/* Büyük Net Profil Görseli */}
                      <div className="relative w-full aspect-square rounded-[14px] overflow-hidden bg-neutral-200 border border-black/10 shadow-inner">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#050505] text-white flex items-center justify-center shadow-lg">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="p-1.5 pt-2">
                        <h4 className={`text-[11px] sm:text-[12px] font-semibold leading-tight line-clamp-2 ${
                          isSelected ? 'text-[#050505]' : 'text-neutral-800'
                        }`}>
                          {p.name}
                        </h4>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* BENTO GRID (Güven Rozetleri) */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-black/5 flex flex-col gap-2">
                <ShieldCheck className="w-5 h-5 text-[#050505]" strokeWidth={1.5} />
                <div>
                  <div className="text-[13px] font-semibold text-[#050505]">2 Yıl Tam Garanti</div>
                  <div className="text-[12px] text-neutral-500">Profillerde renk atmaz</div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-black/5 flex flex-col gap-2">
                <Droplets className="w-5 h-5 text-[#050505]" strokeWidth={1.5} />
                <div>
                  <div className="text-[13px] font-semibold text-[#050505]">6mm Şişecam Temperli</div>
                  <div className="text-[12px] text-neutral-500">5 kat darbe direnci</div>
                </div>
              </div>
            </div>

            {/* WHATSAPP SİPARİŞ & GÖRÜŞME BUTONU (SABİT / NON-STICKY) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 pb-2 border-t border-black/5">
              <button
                type="button"
                onClick={handleWhatsApp}
                className={`flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-2xl text-[16px] font-semibold flex items-center justify-center gap-3 ${SPRING_FAST} shadow-[0_10px_25px_rgba(37,211,102,0.25)] ${ACTIVE_PRESS}`}
              >
                <MessageCircle className="w-5 h-5 fill-current text-white" />
                <span>WhatsApp ile Proje Görüş & Sipariş Ver</span>
              </button>
              <a
                href="tel:+905548830071"
                className={`w-full sm:w-[70px] h-[56px] flex items-center justify-center bg-white border border-black/10 shadow-sm rounded-2xl hover:bg-neutral-50 transition-colors ${ACTIVE_PRESS}`}
                title="Hemen Arayın"
              >
                <Phone className="w-5 h-5 text-[#050505]" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* TEKNİK DETAYLAR & FABRİKA ÖZELLİKLERİ (Admin & DB Verileriyle Dinamik) */}
      <section className="py-20 lg:py-28 bg-[#F5F5F3] border-t border-black/5 relative z-10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Sol Başlık */}
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-white rounded-full text-[11px] font-bold uppercase tracking-wider text-neutral-600 border border-black/5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Ürün Özellikleri & Standartlar
              </div>
              <h2 className="text-[32px] lg:text-[48px] font-light tracking-tight text-[#050505] leading-tight mb-4">
                Teknik Detaylar & Özellikler
              </h2>
              <p className="text-[16px] lg:text-[18px] text-neutral-500 font-light leading-relaxed">
                {product.name} modelimize ait fabrika üretim standartları, malzeme kalitesi ve teknik özellikler.
              </p>
            </div>

            {/* Sağ Izgara & Detay Kartları */}
            <div className="lg:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Cam Standardı</div>
                <div className="text-[17px] font-semibold text-[#050505]">
                  {Array.isArray(product.technical_specs?.glass_thickness)
                    ? product.technical_specs.glass_thickness.join(', ')
                    : (product.technical_specs?.glass_thickness || '6mm Temperli Şişecam Güvenlik Camı')}
                </div>
              </div>

              <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Profil & Kaplama</div>
                <div className="text-[17px] font-semibold text-[#050505]">
                  Paslanmaz & Solmaz Alüminyum Gövde
                </div>
              </div>

              <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Yükseklik Seçeneği</div>
                <div className="text-[17px] font-semibold text-[#050505]">
                  {product.technical_specs?.height || 'Standart (190cm) veya Özel Tavana Kadar'}
                </div>
              </div>

              <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Montaj / Ölçü Tipi</div>
                <div className="text-[17px] font-semibold text-[#050505]">
                  {product.technical_specs?.installation || 'Milimetrik Özel İmalat / Keşifli'}
                </div>
              </div>

              <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm sm:col-span-2">
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Öne Çıkan Standartlar</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(product.features && product.features.length > 0
                    ? product.features
                    : ['2 Yıl Üretici Garantisi', 'Profesyonel Kurulum & Montaj Desteği', '%100 Su Sızdırmaz Mıknatıslı Fitil', 'Sessiz ve Yağ Gibi Kayan Kapılar']
                  ).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[14px] font-medium text-neutral-800">
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MİMARİ İNCELEMELER & YORUMLAR (Dark Mode Editorial) */}
      <section id="musteri-gorusleri" className="bg-[#050505] text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-white/30" />
            <h2 className="text-[13px] uppercase tracking-[0.3em] font-medium text-white/50">
              Müşteri Görüşleri & Değerlendirmeler
            </h2>
          </div>

          {/* Değerlendirme Özeti */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 items-start lg:items-center">
            <div>
              <div className="text-[64px] font-light leading-none mb-2 text-white">
                {avgRatingScore}
              </div>
              <div className="flex gap-1 text-[#D4AF37] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(Number(avgRatingScore)) ? 'fill-current' : 'fill-transparent text-white/20'
                    }`}
                  />
                ))}
              </div>
              <div className="text-[14px] text-white/50 tracking-wide font-medium">
                {totalReviewsCount > 0
                  ? `${totalReviewsCount} Doğrulanmış Değerlendirme`
                  : 'Henüz Değerlendirme Yok'}
              </div>
            </div>

            <div className="flex-1 w-full max-w-md space-y-3">
              {([5, 4, 3, 2, 1] as const).map((star) => {
                const pct = getStarPercentage(star)
                return (
                  <div key={star} className="flex items-center gap-4">
                    <div className="text-[13px] text-white/70 w-3 font-mono">{star}</div>
                    <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-[#D4AF37] rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-[12px] text-white/40 w-12 text-right font-mono">
                      %{pct}
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className={`bg-white text-[#050505] px-8 py-4 min-h-[48px] rounded-full text-[14px] font-medium flex items-center justify-center gap-2 ${ACTIVE_PRESS} ${SPRING_ULTRA} hover:bg-neutral-200 lg:ml-auto w-full lg:w-auto shadow-[0_10px_30px_rgba(255,255,255,0.15)]`}
            >
              <Camera className="w-4 h-4" />
              Değerlendirme Yaz
            </button>
          </div>

          {/* Gerçek Supabase Yorum Kartları veya Zarif Empty State */}
          {reviewsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {reviewsList.map((review) => (
                <div
                  key={review.id}
                  className="flex flex-col bg-white/5 p-8 rounded-[32px] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1 text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-transparent opacity-30'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[12px] text-white/40 font-mono">
                      {new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(review.created_at))}
                    </span>
                  </div>

                  <p className="text-[16px] lg:text-[18px] font-light leading-relaxed text-white/90 mb-6 flex-1">
                    &ldquo;{review.content}&rdquo;
                  </p>

                  <div className="flex items-end justify-between mt-auto pt-6 border-t border-white/10">
                    <div>
                      <div className="text-[14px] font-semibold tracking-wide flex items-center gap-2">
                        {review.author_name}
                        <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" />
                        </div>
                      </div>
                      <div className="text-[13px] text-white/50">Doğrulanmış Müşteri</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 sm:p-14 text-center max-w-2xl mx-auto flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-[#D4AF37]">
                <Star className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-[22px] sm:text-[26px] font-light text-white mb-3">
                İlk Değerlendirmeyi Siz Yapın
              </h3>
              <p className="text-[15px] sm:text-[16px] text-white/60 font-light leading-relaxed mb-8 max-w-lg">
                {product.name} modelimizi banyonuzda kullandıysanız, deneyimlerinizi paylaşarak showroom ziyaretçilerimize rehberlik edin.
              </p>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className={`bg-white text-[#050505] px-8 py-4 min-h-[48px] rounded-full text-[14px] font-medium flex items-center justify-center gap-2.5 ${ACTIVE_PRESS} ${SPRING_FAST} hover:bg-neutral-200 shadow-xl`}
              >
                <Camera className="w-4 h-4" />
                Değerlendirmenizi Ekleyin
              </button>
            </div>
          )}
        </div>
      </section>

      {/* MÜHENDİSLİK DETAYLARI (Sitedeki Gerçek Standartlar) */}
      <section className="py-24 lg:py-32 max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-[32px] lg:text-[48px] font-light tracking-tight text-[#050505] mb-6">
            Görünmeyen Mühendislik
          </h2>
          <p className="text-[18px] lg:text-[22px] text-neutral-500 font-light max-w-2xl mx-auto">
            Her bir detay, banyonuzda kusursuz bir sessizlik ve pürüzsüz bir deneyim yaratmak için tasarlandı.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            {
              icon: <Wind />,
              title: "Sessiz ve Yağ Gibi Kayan Kapılar",
              desc: "Zamanla takılma ve ses yapmayan özel kapı tekerlekleri sayesinde her gün sessiz ve pürüzsüz kullanım."
            },
            {
              icon: <ShieldCheck />,
              title: "Paslanmaz ve Solmaz Metal Çerçeve",
              desc: "Banyonun neminden, suyundan ve buharından etkilenmeyen, rengi atmayan sağlam profil gövdesi."
            },
            {
              icon: <Zap />,
              title: "Darbeye Dayanıklı Güvenli Cam",
              desc: "Normal camlara göre 5 kat daha sağlam Şişecam temperli camlar. Olası darbelere karşı ekstra emniyetli."
            },
            {
              icon: <Droplets />,
              title: "Dışarıya Su Kaçırmayan Tam Yalıtım",
              desc: "Kapılar kapandığında birbirine kenetlenen mıknatıslar ve su bariyeri ile banyonuzun zemini daima kuru kalır."
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-[32px] p-8 border border-black/5 hover:border-black/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ${SPRING_ULTRA} group`}
            >
              <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#050505] group-hover:text-white transition-all duration-500">
                {React.cloneElement(feature.icon, { className: "w-6 h-6", strokeWidth: 1.5 })}
              </div>
              <h4 className="text-[18px] font-semibold text-[#050505] mb-3">{feature.title}</h4>
              <p className="text-[15px] text-neutral-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SIKÇA SORULAN SORULAR (Sitedeki Gerçek SSS Verileri) */}
      <section className="py-24 lg:py-32 max-w-[1000px] mx-auto px-4 md:px-8 border-t border-black/5">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-neutral-100 rounded-full text-[12px] font-semibold tracking-wide text-neutral-600">
            <HelpCircle className="w-3.5 h-3.5" />
            Aklınıza Takılanlar
          </div>
          <h2 className="text-[32px] lg:text-[48px] font-light tracking-tight text-[#050505]">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-[16px] lg:text-[18px] text-neutral-500 font-light mt-3">
            Erayduş duşakabin ürünleri, sipariş, teslimat, montaj ve garanti süreçleri hakkında merak edilenler.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-black/5 bg-white p-6 sm:p-10 rounded-[32px] border border-black/5 shadow-sm">
          {[
            {
              question: "Duşakabinleriniz özel ölçüye göre üretiliyor mu?",
              answer: "Evet. Tüm duşakabin sistemlerimiz banyonuzun ölçülerine göre özel olarak üretilir. Standart ölçülerin dışında, milimetrik hassasiyetle projenize uygun çözümler sunuyoruz."
            },
            {
              question: "Hangi cam türlerini kullanıyorsunuz?",
              answer: "Şeffaf, füme (siyah), bronz ve buzlu (kumlama) cam seçeneklerimiz mevcuttur. Tüm camlarımız temperli güvenlik camıdır ve nano yüzey kaplama ile su lekesine karşı korunur."
            },
            {
              question: "Üretim ve teslimat süresi ne kadar?",
              answer: "Özel üretim duşakabinlerimizin imalatı 3-5 iş günü içerisindedir (özel tasarım ve istisnai kabin modellerinde bu süre değişiklik gösterebilir). Ürün imalatı tamamlandığında montaj randevusu için sizinle iletişime geçilir."
            },
            {
              question: "Montaj hizmeti veriyor musunuz?",
              answer: "Evet, uzman teknik ekibimiz profesyonel kurulum ve montaj desteği sunmaktadır. Randevul teslimat ile ürününüz adresinizde titizlikle monte edilir."
            },
            {
              question: "Ürünleriniz garantili mi ve garanti kapsamı neleri içerir?",
              answer: "Tüm ürünlerimiz 2 Yıl Üretici Garantisi altındadır. İmalat ve malzeme kaynaklı (bizden kaynaklı) tüm arızalar garanti kapsamında ücretsiz giderilir. Sert çarpma veya hatalı kullanım sonucu oluşan (kullanıcı kaynaklı) kırılma ve yıpranmalarda ise makul ücret karşılığı parça değişimi yapılır. Ağır kimyasal temizliği ve yetkisiz müdahaleler garanti kapsamı dışındadır."
            },
            {
              question: "Yedek parça temin ediyor musunuz?",
              answer: "Evet. Üretim ve imalat kaynaklı sorunlarda garanti kapsamında ücretsiz parça değişimi yapıyoruz. Kullanıcı hatası veya kaza sonucu oluşan durumlarda ise makul bir ücret karşılığında orijinal yedek parça temini ve servis desteği sağlıyoruz."
            }
          ].map((item, idx) => (
            <AccordionItem
              key={idx}
              title={item.question}
              isOpen={activeAccordion === idx}
              onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
            >
              {item.answer}
            </AccordionItem>
          ))}
        </div>
      </section>

      {/* FİZİKSEL DENEYİM (Showroom) */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="bg-neutral-50 rounded-[40px] p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
            {/* Arkaplan Deseni */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
              <Fingerprint className="w-full h-full object-cover transform scale-150 translate-x-1/4 -translate-y-1/4" strokeWidth={0.5} />
            </div>

            <div className="lg:w-1/2 relative z-10">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-white rounded-full text-[12px] font-semibold tracking-wide text-neutral-600 shadow-sm border border-black/5">
                <MapPin className="w-3.5 h-3.5" />
                Fiziksel Deneyim & Showroom
              </div>
              <h2 className="text-[36px] lg:text-[56px] font-light tracking-tight text-[#050505] mb-6 leading-tight">
                Mükemmelliğe <br />Dokunun
              </h2>
              <p className="text-[18px] text-neutral-500 font-light mb-10 max-w-md leading-relaxed">
                {product.name} ve tüm Erayduş koleksiyonlarını yakından incelemek için Ankara Showroomumuzu ziyaret edin.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5">
                    <MapPin className="w-4 h-4 text-[#050505]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#050505] mb-1">Erayduş Ankara Showroom</div>
                    <div className="text-[13px] text-neutral-500">Malazgirt Caddesi No:121/1B, Siteler / Ankara</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5">
                    <Clock className="w-4 h-4 text-[#050505]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#050505] mb-1">Çalışma Saatleri</div>
                    <div className="text-[13px] text-neutral-500">Pzt - Cmt: 09:00 - 18:00 (Pazar Kapalı)</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className={`bg-[#050505] text-white px-8 py-4 rounded-full text-[15px] font-medium flex items-center justify-center gap-2 ${ACTIVE_PRESS} ${SPRING_FAST} hover:bg-neutral-800`}
                >
                  <Calendar className="w-4 h-4" />
                  Randevu Oluştur
                </button>
                <a
                  href="https://www.google.com/maps?cid=4589464454099566581"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-white text-[#050505] border border-black/10 px-8 py-4 rounded-full text-[15px] font-medium flex items-center justify-center gap-2 ${ACTIVE_PRESS} ${SPRING_FAST} hover:bg-neutral-50`}
                >
                  Yol Tarifi Al
                </a>
              </div>
            </div>

            <div className="lg:w-1/2 w-full relative z-10">
              <div className="w-full aspect-square md:aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl relative group bg-neutral-900">
                <img
                  src={images[images.length > 2 ? 2 : 0]}
                  alt={`${product.name} Showroom Sergileme`}
                  className={`w-full h-full object-cover ${SPRING_ULTRA} group-hover:scale-105`}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[32px] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING BOTTOM STICKY BAR (HERO BİTİNCE ÇIKAN VE FOOTER ÖNCESİ BİTEN BAR) */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[94%] max-w-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showBottomStickyBar
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
            : 'translate-y-28 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-3xl border border-black/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.18)] p-2.5 sm:p-3 rounded-[32px] sm:rounded-full flex items-center justify-between gap-3 sm:gap-6">
          {/* Sol: Ürün Küçük Görseli ve Seçim Bilgisi */}
          <div
            className="flex items-center gap-3 pl-2 sm:pl-3 cursor-pointer min-w-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl sm:rounded-full overflow-hidden bg-neutral-100 border border-black/10 flex-shrink-0 relative shadow-inner">
              <img
                src={images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="min-w-0 pr-1">
              <div className="font-medium text-[14px] sm:text-[16px] text-[#050505] tracking-tight truncate flex items-center gap-1.5">
                <span>{product.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse hidden sm:inline-block" />
              </div>
              <div className="text-[11px] sm:text-[12px] text-neutral-500 truncate">
                {selectedSize?.label ? `${selectedSize.label} · ` : ''}{selectedGlass?.name} · {selectedProfile?.name}
              </div>
            </div>
          </div>

          {/* Sağ: Fiyat ve Sipariş Butonu */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="text-right pr-1 sm:pr-2">
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Tutar
              </div>
              <div className="text-[17px] sm:text-[20px] font-semibold tracking-tight text-[#050505] leading-tight">
                ₺{totalPrice.toLocaleString('tr-TR')}
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className={`bg-[#050505] text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl sm:rounded-full text-[13px] sm:text-[14px] font-medium flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-[#1f1f1f] ${ACTIVE_PRESS} ${SPRING_FAST}`}
            >
              <span>Siparişi Tamamla</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* YORUM YAZMA ALANI (Masaüstü Lüks Modal + Mobilde Sürüklenebilir Bottom Sheet) */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-[200] flex flex-col justify-end md:justify-center md:items-center bg-black/80 backdrop-blur-md p-0 md:p-4">
            {/* Arka Plan Tıklama / Kapatma */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setIsReviewModalOpen(false)}
            />

            {/* MASAÜSTÜ & MOBİL KAPSAYICI */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 400) {
                  setIsReviewModalOpen(false)
                }
              }}
              className="relative z-10 w-full md:max-w-lg bg-[#121212] border-t md:border border-white/10 text-white rounded-t-[36px] md:rounded-[36px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Mobilde Sürükleme Çubuğu (Drag Handle) */}
              <div className="md:hidden w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />

              {/* Kapat Butonu (Min 48x48px Touch Target) */}
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                aria-label="Kapat"
                className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 pr-10">
                <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase mb-1 block">
                  Doğrulanmış Deneyim
                </span>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-white">
                  {product.name}
                </h3>
                <p className="text-[13px] text-white/50 font-light mt-1">
                  Deneyiminizi ve ürün kalitesine dair düşüncelerinizi paylaşın.
                </p>
              </div>

              {reviewErrorMsg && (
                <div className="p-3.5 mb-5 bg-red-500/10 border border-red-500/20 text-red-300 rounded-2xl text-[13px] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {reviewErrorMsg}
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-[12px] font-medium tracking-wide text-white/70 mb-2 block">
                    Puanınız
                  </label>
                  <div className="flex gap-1" onMouseLeave={() => setReviewHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        onMouseEnter={() => setReviewHoverRating(star)}
                        className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors focus:outline-none"
                        aria-label={`${star} Yıldız`}
                      >
                        <Star
                          className={`w-7 h-7 transition-all ${
                            (reviewHoverRating || reviewRating) >= star
                              ? 'fill-[#D4AF37] text-[#D4AF37] scale-110'
                              : 'text-white/20'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-medium tracking-wide text-white/70 mb-1.5 block">
                      Adınız Soyadınız *
                    </label>
                    <input
                      name="author_name"
                      required
                      className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 px-4 text-[16px] text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="Örn. Ahmet Yılmaz"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium tracking-wide text-white/70 mb-1.5 block">
                      E-posta Adresiniz
                    </label>
                    <input
                      name="author_email"
                      type="email"
                      className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 px-4 text-[16px] text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="Gizli kalacaktır"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-medium tracking-wide text-white/70 mb-1.5 block">
                    Görüşleriniz *
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={4}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-[16px] text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none leading-relaxed"
                    placeholder="Tasarım, montaj, cam kalitesi ve rulman sessizliği hakkındaki izlenimleriniz..."
                  />
                </div>

                <input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                  <span className="text-[13px] text-white/70">
                    Güvenlik Sorusu: <strong className="text-white">3 + 5 = ?</strong>
                  </span>
                  <input
                    name="math_answer"
                    required
                    className="w-24 h-11 rounded-xl bg-white/10 border border-white/20 text-center text-[16px] font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="Sonuç"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className={`w-full min-h-[52px] rounded-2xl bg-white text-[#050505] font-semibold text-[15px] hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl ${ACTIVE_PRESS}`}
                >
                  {isSubmittingReview ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Kaydediliyor...</span>
                    </>
                  ) : (
                    'Değerlendirmeyi Gönder'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOTOĞRAF BÜYÜTME (ZOOM LIGHTBOX) MODALI */}
      <div
        className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-500 ${
          isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          onClick={() => setIsModalOpen(false)}
        />

        {/* Kontroller */}
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all z-[210]"
        >
          <X className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={() => setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md transition-all z-[210]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={() => setModalImageIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md transition-all z-[210]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Resim */}
        <div className="relative z-[205] w-full max-w-6xl px-4 lg:px-20 max-h-[100vh] flex flex-col items-center justify-center pointer-events-none">
          <img
            src={images[modalImageIndex] || images[0]}
            alt="Büyük Görsel"
            className={`max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl transition-transform duration-500 pointer-events-auto ${
              isModalOpen ? 'scale-100' : 'scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          />

          <div className="mt-6 text-white/50 text-[13px] tracking-widest uppercase font-medium">
            {modalImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  )
}
