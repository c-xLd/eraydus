'use client'

import { useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion'
import { 
  ArrowLeft, Check, Star, ChevronDown, Camera, 
  Shield, Truck, Wrench, Sparkles, ArrowRight, Quote, 
  Droplets, Maximize2, Palette, Box
} from 'lucide-react'
import { Product } from '@/lib/data/products'

/* ─── Animation Variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

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

// Banyo Dolabı Spesifik Seçenekleri (Mock Veri)
const woodFinishes = [
  { id: 'natural-oak', name: 'Doğal Meşe', colorClass: 'bg-[#D2B48C]', priceMod: 0 },
  { id: 'walnut', name: 'Amerikan Ceviz', colorClass: 'bg-[#5C4033]', priceMod: 1500 },
  { id: 'matte-white', name: 'Mat Beyaz Lake', colorClass: 'bg-[#F9F9F9]', priceMod: 1000 },
  { id: 'matte-black', name: 'Antrasit Lake', colorClass: 'bg-[#2A2A2A]', priceMod: 1200 },
]

const mirrorOptions = [
  { id: 'flat', name: 'Düz Ayna', desc: 'Minimalist çerçevesiz', priceMod: 0 },
  { id: 'led', name: 'LED Aydınlatmalı Ayna', desc: 'Dokunmatik sensörlü', priceMod: 2500 },
  { id: 'cabinet', name: 'Dolaplı Ayna', desc: 'Ekstra depolama', priceMod: 4000 },
]

const sinkOptions = [
  { id: 'ceramic', name: 'Seramik Lavabo', desc: 'Klasik, parlak yüzey', priceMod: 0 },
  { id: 'corian', name: 'Corian / Akrilik Lavabo', desc: 'Yekpare, pürüzsüz', priceMod: 3500 },
]

interface VanityDetailClientProps {
  product: Product
}

export function VanityDetailClient({ product }: VanityDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'ozellikler' | 'teknik' | 'sss'>('ozellikler')
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  // Seçim State'leri
  const [selectedFinish, setSelectedFinish] = useState(woodFinishes[0])
  const [selectedMirror, setSelectedMirror] = useState(mirrorOptions[0])
  const [selectedSink, setSelectedSink] = useState(sinkOptions[0])
  
  // Genişlik Seçimi (üründen dinamik olarak parse et)
  const widthOptions = useMemo(() => {
    if (!product.technicalSpecs.widthRange) return ['80cm']
    return product.technicalSpecs.widthRange.split(' / ').map(s => s.trim())
  }, [product])
  
  const [selectedWidth, setSelectedWidth] = useState(widthOptions[0])

  // Genişliğe göre fiyat farkı hesaplama
  const widthPriceMod = useMemo(() => {
    const baseIndex = widthOptions.indexOf(widthOptions[0])
    const currentIndex = widthOptions.indexOf(selectedWidth)
    // Her genişlik boyutu atlayışında ortalama 2000 TL fark
    return (currentIndex - baseIndex) * 2000
  }, [selectedWidth, widthOptions])

  // Dinamik Fiyat
  const currentPrice = product.price + selectedFinish.priceMod + selectedMirror.priceMod + selectedSink.priceMod + widthPriceMod

  const allImages = [product.image, ...product.gallery]

  const faqs = [
    { q: 'Ürün montaja hazır olarak mı geliyor?', a: 'Banyo dolaplarımız demonte değil, kalite kontrolden geçmiş şekilde modüller halinde (alt modül, lavabo, ayna modülü) gelir. Montajı çok daha hızlı ve güvenlidir.' },
    { q: 'Dolaplar suya dayanıklı mı?', a: 'Evet. Ürünlerimizde neme ve suya ekstra dayanıklı 1. sınıf MDF ve suya dayanıklı poliüretan tutkallar kullanılmaktadır.' },
    { q: 'Garantisi kaç yıl?', a: 'Ahşap aksam ve mekanizmalar (soft-close raylar) 5 yıl Erayduş garantisi altındadır.' },
    { q: 'Özel ölçü çalışıyor musunuz?', a: 'Mevcut standart genişliklerimiz dışında, banyonuzun net ölçüsüne göre mimari ekibimiz özel ölçü tasarımı da yapabilmektedir.' }
  ]

  const featuresList = [
    { icon: Shield, title: '5 Yıl Garanti', desc: 'Mekanizma & Gövde' },
    { icon: Droplets, title: 'Suya Dayanıklı', desc: '1. Sınıf MDF / Lake' },
    { icon: Sparkles, title: 'Soft-Close', desc: 'Yavaşlatıcılı Çekmeceler' },
    { icon: Truck, title: 'Montaj Seçeneği', desc: 'Ankara İçi Kurulum' }
  ]

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-foreground">

      {/* ─── BREADCRUMB ─── */}
      <div className="pt-28 pb-6">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <Link href="/koleksiyonlar" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-champagne transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Koleksiyonlara Dön</span>
          </Link>
          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Anasayfa</Link>
            <span>/</span>
            <Link href="/koleksiyonlar" className="hover:text-foreground transition-colors">Koleksiyonlar</Link>
            <span>/</span>
            <span className="text-foreground">Banyo Dolapları</span>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ─── HERO BÖLÜMÜ ─── */}
      <section className="container mx-auto px-6 max-w-[1440px] pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Sol: Görseller */}
          <div className="space-y-6 lg:sticky lg:top-32">
            <motion.div 
              className="relative aspect-[4/5] bg-surface rounded-2xl overflow-hidden group border border-border/50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={allImages[activeImage] || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {product.isNew && (
                <div className="absolute top-6 left-6 bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Yeni Seri
                </div>
              )}
            </motion.div>

            {/* Küçük Görseller */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-champagne' : 'border-transparent hover:border-champagne/50'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sağ: Bilgiler & Konfigüratör */}
          <motion.div 
            className="flex flex-col h-full py-4 lg:py-10"
            variants={fadeUp} initial="hidden" animate="visible"
          >
            <div className="mb-2">
              <span className="text-champagne font-medium tracking-wider text-sm uppercase">{product.collectionName}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4 text-[#1A1A1A]">
              {product.name}
            </h1>
            <p className="text-[#555] text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-end gap-4 mb-10 pb-10 border-b border-border/60">
              <span className="text-4xl font-light text-[#1A1A1A]">₺{currentPrice.toLocaleString('tr-TR')}</span>
              <span className="text-[#888] mb-1.5">/ başlangıç fıyatı</span>
            </div>

            {/* ─── KONFİGÜRATÖR ─── */}
            <div className="space-y-10">
              
              {/* Genişlik */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2 text-[#1A1A1A]">
                    <Maximize2 className="w-4 h-4 text-champagne" /> Modül Genişliği
                  </h3>
                  <span className="text-sm text-[#888]">{selectedWidth}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {widthOptions.map((width) => (
                    <button
                      key={width}
                      onClick={() => setSelectedWidth(width)}
                      className={`px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
                        selectedWidth === width 
                          ? 'border-champagne bg-champagne/10 text-champagne' 
                          : 'border-border/60 text-[#555] hover:border-champagne/50 hover:bg-white'
                      }`}
                    >
                      {width}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ahşap / Renk Kaplama */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2 text-[#1A1A1A]">
                    <Palette className="w-4 h-4 text-champagne" /> Gövde Rengi
                  </h3>
                  <span className="text-sm text-[#888]">{selectedFinish.name}</span>
                </div>
                <div className="flex gap-4">
                  {woodFinishes.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      className="group relative flex flex-col items-center gap-2"
                    >
                      <div className={`w-12 h-12 rounded-full border-2 p-1 transition-all ${selectedFinish.id === finish.id ? 'border-champagne scale-110' : 'border-transparent'}`}>
                        <div className={`w-full h-full rounded-full ${finish.colorClass} shadow-inner border border-black/10`} />
                      </div>
                      {selectedFinish.id === finish.id && (
                        <div className="absolute -top-2 -right-2 bg-champagne text-white p-0.5 rounded-full z-10">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lavabo Tipi */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2 text-[#1A1A1A]">
                    <Box className="w-4 h-4 text-champagne" /> Lavabo Tipi
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {sinkOptions.map((sink) => (
                    <button
                      key={sink.id}
                      onClick={() => setSelectedSink(sink)}
                      className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                        selectedSink.id === sink.id 
                          ? 'border-champagne bg-white shadow-sm' 
                          : 'border-border/60 bg-transparent hover:border-champagne/50 hover:bg-white/50'
                      }`}
                    >
                      {selectedSink.id === sink.id && (
                        <div className="absolute top-0 right-0 w-12 h-12 bg-champagne/10 flex justify-end items-start p-2 rounded-bl-3xl">
                          <Check className="w-4 h-4 text-champagne" />
                        </div>
                      )}
                      <div className="font-medium text-sm text-[#1A1A1A] mb-1">{sink.name}</div>
                      <div className="text-xs text-[#888]">{sink.desc}</div>
                      {sink.priceMod > 0 && (
                        <div className="text-xs text-champagne mt-2 font-medium">+₺{sink.priceMod.toLocaleString('tr-TR')}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ayna Seçeneği */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2 text-[#1A1A1A]">
                    <Sparkles className="w-4 h-4 text-champagne" /> Ayna Modülü
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {mirrorOptions.map((mirror) => (
                    <button
                      key={mirror.id}
                      onClick={() => setSelectedMirror(mirror)}
                      className={`p-4 rounded-xl border text-left transition-all relative ${
                        selectedMirror.id === mirror.id 
                          ? 'border-champagne bg-white shadow-sm' 
                          : 'border-border/60 bg-transparent hover:border-champagne/50 hover:bg-white/50'
                      }`}
                    >
                      <div className="font-medium text-sm text-[#1A1A1A] mb-1 pr-6">{mirror.name}</div>
                      <div className="text-xs text-[#888]">{mirror.desc}</div>
                      {mirror.priceMod > 0 && (
                        <div className="text-xs text-champagne mt-2 font-medium">+₺{mirror.priceMod.toLocaleString('tr-TR')}</div>
                      )}
                      {selectedMirror.id === mirror.id && (
                        <Check className="w-4 h-4 text-champagne absolute top-4 right-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* CTA Butonları */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-[#1A1A1A] text-white h-14 rounded-full font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-black transition-colors">
                Hemen Sipariş Ver <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex-1 border border-[#1A1A1A] text-[#1A1A1A] h-14 rounded-full font-medium tracking-wide hover:bg-black/5 transition-colors">
                Whatsapp&apos;tan Ulaş
              </button>
            </div>

            {/* Güvenceler */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border/60">
              {featuresList.map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-semibold text-[#1A1A1A]">{feature.title}</div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* ─── ALT DETAY SEKMELERİ ─── */}
      <section className="border-y border-border/50 bg-white">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="flex overflow-x-auto hide-scrollbar border-b border-border/50">
            {[
              { id: 'ozellikler', label: 'Tasarım Detayları' },
              { id: 'teknik', label: 'Teknik Özellikler' },
              { id: 'sss', label: 'Sıkça Sorulan Sorular' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'ozellikler' | 'teknik' | 'sss')}
                className={`py-6 px-8 whitespace-nowrap text-sm font-medium uppercase tracking-wider relative transition-colors ${
                  activeTab === tab.id ? 'text-champagne' : 'text-[#888] hover:text-[#1A1A1A]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="vanityTabIndicator" className="absolute bottom-0 left-0 w-full h-0.5 bg-champagne" />
                )}
              </button>
            ))}
          </div>

          <div className="py-16 max-w-4xl">
            <AnimatePresence mode="wait">
              {activeTab === 'ozellikler' && (
                <motion.div key="oz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                  <h3 className="text-2xl font-light text-[#1A1A1A]">Mimarinin Banyo ile Buluşması</h3>
                  <p className="text-[#555] leading-relaxed text-lg">{product.longDescription}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-8 mt-12">
                    <div className="bg-[#FDFCFB] p-8 rounded-2xl border border-border/50">
                      <h4 className="font-semibold text-lg mb-4 text-[#1A1A1A]">Gövde Özellikleri</h4>
                      <ul className="space-y-3">
                        {product.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-[#555]">
                            <Check className="w-5 h-5 text-champagne shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'teknik' && (
                <motion.div key="tech" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                  <h3 className="text-2xl font-light text-[#1A1A1A]">Teknik Ölçüler</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 border border-border/50 rounded-xl bg-white">
                      <div className="text-sm text-[#888] mb-1 uppercase tracking-wider">Alt Modül Yüksekliği</div>
                      <div className="text-xl font-medium text-[#1A1A1A]">{product.technicalSpecs.height}</div>
                    </div>
                    <div className="p-6 border border-border/50 rounded-xl bg-white">
                      <div className="text-sm text-[#888] mb-1 uppercase tracking-wider">Mevcut Genişlikler</div>
                      <div className="text-xl font-medium text-[#1A1A1A]">{product.technicalSpecs.widthRange}</div>
                    </div>
                    <div className="p-6 border border-border/50 rounded-xl bg-white sm:col-span-2">
                      <div className="text-sm text-[#888] mb-1 uppercase tracking-wider">Montaj Şekli</div>
                      <div className="text-xl font-medium text-[#1A1A1A]">{product.technicalSpecs.installation}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'sss' && (
                <motion.div key="sss" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-border/50 rounded-2xl overflow-hidden bg-white">
                      <button
                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="font-medium text-[#1A1A1A]">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-[#888] transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {faqOpen === i && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="p-6 pt-0 text-[#555] leading-relaxed border-t border-border/50 mt-2">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  )
}
