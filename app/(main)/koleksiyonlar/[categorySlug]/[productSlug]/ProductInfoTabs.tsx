'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Sparkles, Layers, Droplets, Maximize2, Wrench, Check, ChevronDown
} from 'lucide-react'
import { Product } from '@/lib/data/products'

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

interface ProductInfoTabsProps {
  product: Product
  hasVariants: boolean
  glassAttrKey?: string
  profileAttrKey?: string
  compatibleGlassList: any[]
  compatibleProfileList: any[]
  selectedAttributes: Record<string, string>
  onShowSandblastedModal: () => void
}

const faqs = [
  { q: 'Teslimat süresi ne kadar?', a: 'Siparişiniz onaylandıktan sonra özel ölçü üretimimiz 5-7 iş günü sürmektedir. Montaj, ürün tesliminden sonra 1 iş günü içinde profesyonel ekibimiz tarafından tamamlanır.' },
  { q: 'Garanti koşulları nelerdir?', a: 'Tüm Erayduş ürünleri profil, mekanizma ve fitil sararmalarına karşı 2 yıl üretici garantisi altındadır. Temperli cam kırılmaları kapsam dışıdır.' },
  { q: 'Özel ölçü üretim yapıyor musunuz?', a: 'Evet, tüm ürünlerimiz banyonuzun lazer ve metre ölçümlerine göre hassasiyetle özel üretilmektedir. Standart ölçü satışımız yoktur.' },
  { q: 'Montaj hizmeti dahil mi?', a: 'Evet, tüm siparişlerimize ücretsiz profesyonel montaj hizmeti dahildir. Uzman ekibimiz, ürünü banyonuza kusursuz bir şekilde monte eder.' },
  { q: 'Hangi cam seçenekleri mevcut?', a: 'Şeffaf, füme, bronz, buzlu (kumlama) cam seçeneklerimiz mevcuttur. Tüm camlarımız 4mm-6mm kalınlıklarında, DIN EN 12150 sertifikalı temperli camdır.' }
]

export default function ProductInfoTabs({
  product,
  hasVariants,
  glassAttrKey,
  profileAttrKey,
  compatibleGlassList,
  compatibleProfileList,
  selectedAttributes,
  onShowSandblastedModal
}: ProductInfoTabsProps) {
  const [activeTab, setActiveTab] = useState<'ozellikler' | 'teknik' | 'sss'>('ozellikler')
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  return (
    <AnimatedSection className="bg-background-secondary py-20 lg:py-28">
      <div className="container mx-auto px-6 max-w-[1200px]">

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-surface rounded-2xl p-1.5 border border-border/50 overflow-x-auto max-w-full scrollbar-hide">
            {[
              { id: 'ozellikler', label: 'Özellikler', icon: Sparkles },
              { id: 'teknik', label: 'Teknik Detay', icon: Layers },
              { id: 'sss', label: 'S.S.S', icon: Droplets }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`relative flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${activeTab === tab.id
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
                    <div className="grid grid-cols-3 gap-4 sm:gap-6">
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
                                  onClick={onShowSandblastedModal}
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
                        className="w-full px-6 py-5 flex items-center justify-between text-left group cursor-pointer"
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
  )
}
