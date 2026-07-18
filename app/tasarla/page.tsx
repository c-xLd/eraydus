'use client'

import { useConfiguratorStore } from '@/features/configurator/store/useConfiguratorStore'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, ChevronRight, ChevronLeft, Check, Info,
  LayoutGrid, Palette, Box, Ruler, GlassWater, Layers, PaintBucket,
  DoorOpen, ArrowLeftRight, Grip, Sparkles, Truck, Shield, FileCheck,
  RotateCcw, Share2, Download, Clock, Home, X
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/services/supabase/client'

// ─── DATA ─────────────────────────────────────────────────────────
const STEPS = [
  { num: 1, label: 'Yerleşim', icon: LayoutGrid },
  { num: 2, label: 'Koleksiyon', icon: Palette },
  { num: 3, label: 'Model', icon: Box },
  { num: 4, label: 'Ölçüler', icon: Ruler },
  { num: 5, label: 'Cam Tipi', icon: GlassWater },
  { num: 6, label: 'Cam Kalınlığı', icon: Layers },
  { num: 7, label: 'Profil Rengi', icon: PaintBucket },
  { num: 8, label: 'Kapı Sistemi', icon: DoorOpen },
  { num: 9, label: 'Açılım', icon: ArrowLeftRight },
  { num: 10, label: 'Kulp', icon: Grip },
  { num: 11, label: 'Aksesuar', icon: Sparkles },
  { num: 12, label: 'Kurulum', icon: Truck },
  { num: 13, label: 'Garanti', icon: Shield },
  { num: 14, label: 'Özet', icon: FileCheck },
]

const layouts = [
  { id: 'wall-to-wall', name: 'İki Duvar Arası', desc: 'Duvardan duvara montaj', img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=400&auto=format&fit=crop' },
  { id: 'corner', name: 'Köşe Montaj', desc: 'İki duvarın birleştiği köşe', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop' },
  { id: 'walk-in', name: 'Walk-In', desc: 'Açık geçişli, kapısız tasarım', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=400&auto=format&fit=crop' },
  { id: 'sliding', name: 'Sürgülü Niş', desc: 'Niş içine sürgülü sistem', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=400&auto=format&fit=crop' },
]

const collections = [
  { id: 'edge', name: 'EDGE', sub: 'Minimal Profil', price: '₺8.500\'den', desc: 'Ultra ince profiller ve net geometrik çizgiler.' },
  { id: 'pure', name: 'PURE', sub: 'Çerçevesiz', price: '₺12.000\'den', desc: 'Tamamen profilsiz, maksimum şeffaflık.' },
  { id: 'luxury', name: 'LUXURY', sub: 'Premium', price: '₺16.500\'den', desc: 'Lüks donanım ve en üst düzey hissiyat.' },
]

const models = [
  { id: 'sliding', name: 'Sürgülü Sistem', desc: 'Sessiz ray üzerinde süzülen cam paneller.' },
  { id: 'softclose', name: 'Soft-Close Sürgülü', desc: 'Yavaş kapanan premium sürgü mekanizması.' },
  { id: 'hinged', name: 'Menteşeli Kapı', desc: 'Klasik dışa veya içe açılır cam kapı.' },
  { id: 'pivot', name: 'Pivot Kapı', desc: 'Merkez eksenli, 360° dönebilen kapı.' },
]

const glassTypes = [
  { id: 'clear', name: 'Şeffaf', desc: 'Tam saydamlık', color: 'bg-white/80' },
  { id: 'smoke', name: 'Füme', desc: 'Koyu zarif görünüm', color: 'bg-neutral-600/60' },
  { id: 'bronze', name: 'Bronz', desc: 'Sıcak lüks tonlar', color: 'bg-amber-700/40' },
  { id: 'fluted', name: 'Fluted', desc: 'Dikey çizgili doku', color: 'bg-white/60' },
  { id: 'frosted', name: 'Buzlu Mat', desc: 'Gizlilik odaklı', color: 'bg-gray-300/70' },
  { id: 'nano', name: 'Nano Kaplı', desc: 'Leke tutmaz yüzey', color: 'bg-sky-100/50' },
]

const profileColors = [
  { id: 'black', name: 'Mat Siyah', hex: '#1A1A1A' },
  { id: 'chrome', name: 'Parlak Krom', hex: '#D4D4D8' },
  { id: 'gold', name: 'Fırçalı Altın', hex: '#C9A86A' },
  { id: 'white', name: 'Mat Beyaz', hex: '#F5F5F4' },
  { id: 'gunmetal', name: 'Antrasit', hex: '#52525B' },
  { id: 'nickel', name: 'Fırçalı Nikel', hex: '#A1A1AA' },
]

const accessories = [
  { id: 'nano', name: 'Nano Kaplama', price: 750, desc: 'Leke tutmaz cam yüzeyi' },
  { id: 'towel', name: 'Havlu Askısı', price: 450, desc: 'Profil entegre havluluk' },
  { id: 'shelf', name: 'Cam Raf', price: 600, desc: 'Temperli cam banyo rafı' },
  { id: 'led', name: 'LED Aydınlatma', price: 1200, desc: 'Profil içi ambiyans ışığı' },
  { id: 'softclose', name: 'Soft-Close', price: 900, desc: 'Sessiz kapanma mekanizması' },
  { id: 'magnetic', name: 'Manyetik Conta', price: 350, desc: 'Premium sızdırmazlık' },
]

// ─── ANIMATED PRICE DISPLAY ──────────────────────────────────────
function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)
  
  useEffect(() => {
    const start = prev.current
    const end = value
    const duration = 600
    const startTime = performance.now()
    
    const animate = (time: number) => {
      const elapsed = time - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + (end - start) * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }
    
    requestAnimationFrame(animate)
    prev.current = value
  }, [value])
  
  return <span>₺{display.toLocaleString('tr-TR')}</span>
}

// ─── OPTION CARD ─────────────────────────────────────────────────
function OptionCard({ 
  selected, onClick, children, className = '' 
}: { 
  selected: boolean; onClick: () => void; children: React.ReactNode; className?: string 
}) {
  return (
    <button
      onClick={onClick}
      className={`relative text-left rounded-2xl border transition-all duration-300 overflow-hidden group ${
        selected 
          ? 'border-champagne bg-champagne/10 shadow-[0_0_20px_rgba(201,168,106,0.15)] text-white' 
          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/80'
      } ${className}`}
    >
      {children}
      {selected && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="absolute top-3 right-3 w-5 h-5 rounded-full bg-champagne flex items-center justify-center"
        >
          <Check className="size-3 text-black" />
        </motion.div>
      )}
    </button>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export default function ConfiguratorPage() {
  const state = useConfiguratorStore()
  const completed = state.getCompletedSteps()
  const price = state.calculatePrice()
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false)

  useEffect(() => {
    state.fetchBaseProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeProduct = state.baseProducts.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (p: any) => p.category === state.layout && p.series === state.collection
  )

  const generateWhatsAppMessage = () => {
    const phone = "+905550000000"
    const lines = [
      `Merhaba, Erayduş Konfigüratör'de bir tasarım oluşturdum.`,
      ``,
      `📐 *Tasarım Detayları:*`,
      `• Yerleşim: ${layouts.find(l => l.id === state.layout)?.name || '-'}`,
      `• Koleksiyon: ${collections.find(c => c.id === state.collection)?.name || '-'}`,
      `• Model: ${models.find(m => m.id === state.model)?.name || '-'}`,
      `• Ölçüler: ${state.width}×${state.height} cm`,
      `• Cam: ${glassTypes.find(g => g.id === state.glassType)?.name || '-'} (${state.glassThickness || '-'})`,
      `• Profil: ${profileColors.find(p => p.id === state.profileColor)?.name || '-'}`,
      `• Kapı: ${state.doorSystem || '-'}`,
      `• Aksesuarlar: ${state.accessories.length > 0 ? state.accessories.map(a => accessories.find(x => x.id === a)?.name).join(', ') : 'Yok'}`,
      `• Kurulum: ${state.installation || '-'}`,
      `• Garanti: ${state.warranty || '-'}`,
      ``,
      `💰 Tahmini: ₺${price.toLocaleString('tr-TR')} + KDV`,
      `🚚 Teslimat: ${state.getDeliveryEstimate()}`,
      ``,
      `Detaylı fiyat teklifi alabilir miyim?`
    ].join('\n')
    return `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`
  }

  const handleQuoteSubmission = async () => {
    try {
      setIsSubmittingQuote(true)
      const whatsappUrl = generateWhatsAppMessage()
      window.open(whatsappUrl, '_blank')
      
      // Save to database
      const supabase = createClient()
      await supabase.from('quotes').insert({
        customer_name: 'Konfigüratör Kullanıcısı',
        phone: '+905550000000',
        email: null,
        configuration_data: state,
        estimated_price: price,
        status: 'new',
        source: 'configurator'
      })
    } catch (error) {
      console.error('Teklif gönderilirken hata:', error)
    } finally {
      setIsSubmittingQuote(false)
    }
  }

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  }

  const glassOverlay = () => {
    switch (state.glassType) {
      case 'smoke': return 'bg-black/60'
      case 'bronze': return 'bg-amber-950/50'
      case 'frosted': return 'bg-white/30 backdrop-blur-md'
      case 'fluted': return 'bg-white/10 backdrop-blur-[2px]'
      case 'nano': return 'bg-sky-500/10'
      default: return 'bg-black/20'
    }
  }

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden flex flex-col lg:flex-row text-white font-sans">
      
      {/* ── FULL SCREEN PREVIEW AREA (Background) ── */}
      <div className="absolute inset-0 z-0">
        <motion.div
          key={`${state.layout}-${state.collection}-${state.glassType}-${state.profileColor}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src={
              state.layout === 'corner' 
                ? "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
                : state.layout === 'walk-in'
                  ? "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop"
                  : "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop"
            }
            alt="Önizleme"
            className="w-full h-full object-cover object-center"
          />
          {/* Glass overlay */}
          <div className={`absolute inset-0 transition-all duration-1000 ${glassOverlay()}`} />
        </motion.div>
      </div>

      {/* ── GRADIENT OVERLAYS FOR READABILITY ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-black/90 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 z-0 pointer-events-none lg:hidden" />

      {/* ── LEFT PANEL (Configurator Floating Card) ── */}
      <div className="relative z-10 w-full lg:w-[460px] h-full lg:p-6 flex flex-col pointer-events-none flex-shrink-0">
        <div className="bg-black/40 backdrop-blur-2xl lg:border border-white/10 lg:rounded-[2rem] h-full flex flex-col pointer-events-auto overflow-hidden shadow-2xl">
          
          {/* Header & Close */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-champagne tracking-[0.2em] uppercase mb-1">
                Adım {state.currentStep} / 14
              </span>
              <h1 className="text-xl font-semibold tracking-tight text-white">
                {STEPS[state.currentStep - 1].label}
              </h1>
            </div>
            <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors">
              <X className="size-5" />
            </Link>
          </div>

          {/* Steps Nav */}
          <div className="px-6 pt-4 pb-2 overflow-x-auto scrollbar-hide flex items-center gap-2 flex-shrink-0">
            {STEPS.map((step) => {
              const isActive = state.currentStep === step.num
              const isDone = completed.includes(step.num)
              return (
                <button
                  key={step.num}
                  onClick={() => state.setStep(step.num)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all border ${
                    isActive
                      ? 'bg-white text-black border-white'
                      : isDone
                        ? 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                        : 'bg-transparent text-white/40 border-transparent hover:text-white/80'
                  }`}
                >
                  {step.num}. {step.label}
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
            <AnimatePresence mode="wait">

              {/* Step 1: Layout */}
              {state.currentStep === 1 && (
                <motion.div key="s1" {...stepVariants} className="grid grid-cols-2 gap-3">
                  {layouts.map(l => (
                    <OptionCard key={l.id} selected={state.layout === l.id} onClick={() => state.updateField('layout', l.id)}>
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img src={l.img} alt={l.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm">{l.name}</p>
                        <p className="text-xs text-white/50 mt-0.5">{l.desc}</p>
                      </div>
                    </OptionCard>
                  ))}
                </motion.div>
              )}

              {/* Step 2: Collection */}
              {state.currentStep === 2 && (
                <motion.div key="s2" {...stepVariants} className="flex flex-col gap-3">
                  {collections.map(c => (
                    <OptionCard key={c.id} selected={state.collection === c.id} onClick={() => state.updateField('collection', c.id)} className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xl font-bold tracking-tight">{c.name}</p>
                          <p className="text-xs text-champagne font-medium">{c.sub}</p>
                        </div>
                        <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded-full">{c.price}</span>
                      </div>
                      <p className="text-sm text-white/50">{c.desc}</p>
                    </OptionCard>
                  ))}
                </motion.div>
              )}

              {/* Step 3: Model */}
              {state.currentStep === 3 && (
                <motion.div key="s3" {...stepVariants} className="flex flex-col gap-3">
                  {models.map(m => (
                    <OptionCard key={m.id} selected={state.model === m.id} onClick={() => state.updateField('model', m.id)} className="p-5">
                      <p className="font-semibold text-base mb-1">{m.name}</p>
                      <p className="text-sm text-white/50">{m.desc}</p>
                    </OptionCard>
                  ))}
                </motion.div>
              )}

              {/* Step 4: Dimensions */}
              {state.currentStep === 4 && (
                <motion.div key="s4" {...stepVariants} className="space-y-8">
                  {[
                    { label: 'Genişlik', field: 'width', min: 70, max: 250, unit: 'cm', value: state.width },
                    { label: 'Yükseklik', field: 'height', min: 180, max: 240, unit: 'cm', value: state.height },
                  ].map(dim => (
                    <div key={dim.field} className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <label className="text-sm font-medium">{dim.label}</label>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-light tabular-nums">{dim.value}</span>
                          <span className="text-xs text-white/50">{dim.unit}</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={dim.min}
                        max={dim.max}
                        value={dim.value}
                        onChange={(e) => state.updateField(dim.field, parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-white [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md"
                      />
                      <div className="flex justify-between text-[10px] text-white/50">
                        <span>{dim.min} {dim.unit}</span>
                        <span>{dim.max} {dim.unit}</span>
                      </div>
                    </div>
                  ))}
                  <div className="p-4 bg-champagne/10 border border-champagne/20 rounded-xl flex gap-3 text-sm text-white/70">
                    <Info className="size-4 flex-shrink-0 text-champagne mt-0.5" />
                    <p className="text-xs leading-relaxed">Kesin ölçüler profesyonel keşif ekibimiz tarafından alınacaktır. Buradaki değerler tahmini fiyat hesaplaması içindir.</p>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Glass Type */}
              {state.currentStep === 5 && (
                <motion.div key="s5" {...stepVariants} className="grid grid-cols-2 gap-3">
                  {glassTypes.map(g => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const isAvailable = ((activeProduct as any)?.features)?.availableGlasses?.includes(g.id) ?? true // Eğer ürün yoksa hepsi açık (fallback)
                    return (
                    <OptionCard 
                      key={g.id} 
                      selected={state.glassType === g.id} 
                      onClick={() => isAvailable && state.updateField('glassType', g.id)} 
                      className={`p-4 ${!isAvailable ? 'opacity-30 cursor-not-allowed grayscale' : ''}`}
                    >
                      <div className={`w-full h-12 rounded-lg mb-3 border border-white/10 ${g.color}`} />
                      <p className="font-semibold text-sm">{g.name}</p>
                      <p className="text-xs text-white/50 mt-0.5">{isAvailable ? g.desc : 'Bu modelle uyumsuz'}</p>
                    </OptionCard>
                  )})}
                </motion.div>
              )}

              {/* Step 6: Glass Thickness */}
              {state.currentStep === 6 && (
                <motion.div key="s6" {...stepVariants} className="flex flex-col gap-3">
                  {[
                    { id: '4mm', name: '4mm Standart', desc: 'Ekonomik çözüm, temel koruma', weight: 'Hafif' },
                    { id: '6mm', name: '6mm Premium (Önerilen)', desc: 'Kabin sallanma yapmaz, daha sağlıklı ve sağlamdır.', weight: 'Orta' },
                  ].map(t => (
                    <OptionCard key={t.id} selected={state.glassThickness === t.id} onClick={() => state.updateField('glassThickness', t.id)} className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-base">{t.name}</p>
                          <p className="text-sm text-white/50 mt-0.5">{t.desc}</p>
                        </div>
                        <span className="text-[10px] font-medium text-white/70 bg-white/10 px-2 py-1 rounded-full uppercase">{t.weight}</span>
                      </div>
                    </OptionCard>
                  ))}
                </motion.div>
              )}

              {/* Step 7: Profile Color */}
              {state.currentStep === 7 && (
                <motion.div key="s7" {...stepVariants} className="grid grid-cols-2 gap-3">
                  {profileColors.map(p => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const isAvailable = ((activeProduct as any)?.features)?.availableProfiles?.includes(p.id) ?? true
                    return (
                    <OptionCard 
                      key={p.id} 
                      selected={state.profileColor === p.id} 
                      onClick={() => isAvailable && state.updateField('profileColor', p.id)} 
                      className={`p-4 flex items-center gap-3 ${!isAvailable ? 'opacity-30 cursor-not-allowed grayscale' : ''}`}
                    >
                      <div 
                        className="w-10 h-10 rounded-full border-2 border-white/10 shadow-inner flex-shrink-0" 
                        style={{ backgroundColor: p.hex }} 
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{p.name}</span>
                        {!isAvailable && <span className="text-[10px] text-white/50">Uyumsuz</span>}
                      </div>
                    </OptionCard>
                  )})}
                </motion.div>
              )}

              {/* Steps 8, 9, 10: Door, Direction, Handle */}
              {[8, 9, 10].includes(state.currentStep) && (
                <motion.div key={`s${state.currentStep}`} {...stepVariants} className="flex flex-col gap-3">
                  {state.currentStep === 8 && [
                    { id: 'sliding', name: 'Sürgülü', desc: 'Ray üzerinde süzülen cam panel' },
                    { id: 'pivot', name: 'Pivot (Menteşeli)', desc: 'Merkez eksenli açılır kapı' },
                    { id: 'walkin', name: 'Walk-in (Kapısız)', desc: 'Açık geçişli modern tasarım' },
                    { id: 'folding', name: 'Katlanır', desc: 'Dar alanlar için katlanır panel' },
                  ].map(d => (
                    <OptionCard key={d.id} selected={state.doorSystem === d.id} onClick={() => state.updateField('doorSystem', d.id)} className="p-5">
                      <p className="font-semibold">{d.name}</p>
                      <p className="text-sm text-white/50 mt-0.5">{d.desc}</p>
                    </OptionCard>
                  ))}
                  {state.currentStep === 9 && [
                    { id: 'right', name: 'Sağdan Açılır' },
                    { id: 'left', name: 'Soldan Açılır' },
                    { id: 'double', name: 'Çift Yönlü' },
                    { id: 'fixed', name: 'Sabit (Açılmaz)' },
                  ].map(o => (
                    <OptionCard key={o.id} selected={state.openingDirection === o.id} onClick={() => state.updateField('openingDirection', o.id)} className="p-5">
                      <p className="font-semibold">{o.name}</p>
                    </OptionCard>
                  ))}
                  {state.currentStep === 10 && [
                    { id: 'minimal', name: 'Minimal', desc: 'İnce ve göze batmayan' },
                    { id: 'modern', name: 'Modern', desc: 'Ergonomik dikdörtgen profil' },
                    { id: 'square', name: 'Kare', desc: 'Geometrik keskin hatlar' },
                    { id: 'hidden', name: 'Gizli', desc: 'Profil içine entegre' },
                  ].map(h => (
                    <OptionCard key={h.id} selected={state.handleSelection === h.id} onClick={() => state.updateField('handleSelection', h.id)} className="p-5">
                      <p className="font-semibold">{h.name}</p>
                      {h.desc && <p className="text-sm text-white/50 mt-0.5">{h.desc}</p>}
                    </OptionCard>
                  ))}
                </motion.div>
              )}

              {/* Step 11: Accessories */}
              {state.currentStep === 11 && (
                <motion.div key="s11" {...stepVariants} className="flex flex-col gap-3">
                  <p className="text-xs text-white/50 mb-2">Birden fazla seçebilirsiniz.</p>
                  {accessories.map(a => (
                    <OptionCard key={a.id} selected={state.accessories.includes(a.id)} onClick={() => state.toggleAccessory(a.id)} className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{a.name}</p>
                          <p className="text-xs text-white/50 mt-0.5">{a.desc}</p>
                        </div>
                        <span className="text-xs font-medium text-champagne">+₺{a.price.toLocaleString('tr-TR')}</span>
                      </div>
                    </OptionCard>
                  ))}
                </motion.div>
              )}

              {/* Step 12: Installation */}
              {state.currentStep === 12 && (
                <motion.div key="s12" {...stepVariants} className="flex flex-col gap-3">
                  {[
                    { id: 'delivery', name: 'Sadece Teslimat', desc: 'Kendi ekibiniz kurar', price: 'Ücretsiz' },
                    { id: 'professional', name: 'Profesyonel Kurulum', desc: 'Erayduş uzman ekibi', price: '+₺2.500' },
                    { id: 'premium', name: 'Premium Ekspres', desc: 'Öncelikli üretim + hızlı kurulum', price: '+₺4.500' },
                  ].map(i => (
                    <OptionCard key={i.id} selected={state.installation === i.id} onClick={() => state.updateField('installation', i.id)} className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{i.name}</p>
                          <p className="text-xs text-white/50 mt-0.5">{i.desc}</p>
                        </div>
                        <span className="text-xs font-medium text-champagne">{i.price}</span>
                      </div>
                    </OptionCard>
                  ))}
                </motion.div>
              )}

              {/* Step 13: Warranty */}
              {state.currentStep === 13 && (
                <motion.div key="s13" {...stepVariants} className="flex flex-col gap-3">
                  {[
                    { id: '2year', name: '2 Yıl Standart', desc: 'Üretim hatalarına karşı temel güvence', price: 'Dahil' },
                    { id: '5year', name: '5 Yıl Uzatılmış', desc: 'Cam, profil ve mekanik parçalar dahil', price: '+₺1.500' },
                    { id: '10year', name: '10 Yıl Premium', desc: 'Tam koruma + yıllık bakım servisi', price: '+₺3.500' },
                  ].map(w => (
                    <OptionCard key={w.id} selected={state.warranty === w.id} onClick={() => state.updateField('warranty', w.id)} className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{w.name}</p>
                          <p className="text-xs text-white/50 mt-0.5">{w.desc}</p>
                        </div>
                        <span className="text-xs font-medium text-champagne">{w.price}</span>
                      </div>
                    </OptionCard>
                  ))}
                </motion.div>
              )}

              {/* Step 14: Review */}
              {state.currentStep === 14 && (
                <motion.div key="s14" {...stepVariants} className="space-y-4">
                  <div className="p-5 bg-champagne/10 border border-champagne/20 rounded-2xl">
                    <h3 className="font-semibold text-base mb-2 text-champagne">Tasarımınız Hazır 🎉</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Tüm seçimlerinizi gözden geçirin. Herhangi bir adıma tıklayarak değişiklik yapabilirsiniz.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { step: 1, label: 'Yerleşim', value: layouts.find(l => l.id === state.layout)?.name },
                      { step: 2, label: 'Koleksiyon', value: collections.find(c => c.id === state.collection)?.name },
                      { step: 3, label: 'Model', value: models.find(m => m.id === state.model)?.name },
                      { step: 4, label: 'Ölçüler', value: `${state.width}×${state.height} cm` },
                      { step: 5, label: 'Cam', value: glassTypes.find(g => g.id === state.glassType)?.name },
                      { step: 6, label: 'Kalınlık', value: state.glassThickness },
                      { step: 7, label: 'Profil', value: profileColors.find(p => p.id === state.profileColor)?.name },
                      { step: 8, label: 'Kapı', value: state.doorSystem },
                      { step: 9, label: 'Açılım', value: state.openingDirection },
                      { step: 10, label: 'Kulp', value: state.handleSelection },
                      { step: 11, label: 'Aksesuarlar', value: state.accessories.length > 0 ? `${state.accessories.length} adet` : 'Yok' },
                      { step: 12, label: 'Kurulum', value: state.installation },
                      { step: 13, label: 'Garanti', value: state.warranty },
                    ].map(row => (
                      <button 
                        key={row.step} 
                        onClick={() => state.setStep(row.step)}
                        className="flex justify-between items-center w-full py-3 px-4 rounded-xl hover:bg-white/5 transition-colors text-sm group border border-transparent hover:border-white/10"
                      >
                        <span className="text-white/50">{row.label}</span>
                        <span className="font-medium group-hover:text-champagne transition-colors">{row.value || '-'}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="px-6 py-5 border-t border-white/10 flex items-center justify-between flex-shrink-0">
            <button
              onClick={state.prevStep}
              disabled={state.currentStep === 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="size-4" /> Geri
            </button>
            <button
              onClick={state.nextStep}
              disabled={state.currentStep === 14}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold bg-white text-black hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              İleri <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (Price Details - Floating) ── */}
      <div className="hidden xl:flex relative z-10 w-[380px] ml-auto h-full p-6 flex-col pointer-events-none">
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] h-full flex flex-col pointer-events-auto overflow-hidden shadow-2xl">
          
          <div className="p-6 pt-8 flex-1 overflow-y-auto scrollbar-hide">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-champagne mb-6">Fiyat Detayı</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Taban Fiyat</span>
                <span className="font-medium">
                  {state.collection === 'edge' ? '₺8.500' : state.collection === 'pure' ? '₺12.000' : state.collection === 'luxury' ? '₺16.500' : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Ölçü Farkı</span>
                <span className="font-medium text-white/90">+₺{Math.round((state.width / 100) * (state.height / 100) * 2800).toLocaleString('tr-TR')}</span>
              </div>
              {state.glassType && state.glassType !== 'clear' && (
                <div className="flex justify-between">
                  <span className="text-white/60">Cam Seçimi</span>
                  <span className="font-medium text-champagne">+₺{glassTypes.find(g => g.id === state.glassType) ? (['smoke','bronze','fluted','frosted','nano'].includes(state.glassType) ? (state.glassType === 'fluted' ? '2.000' : state.glassType === 'bronze' ? '1.500' : state.glassType === 'smoke' ? '1.200' : '800') : '0') : '0'}</span>
                </div>
              )}
              {state.accessories.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-white/60">Aksesuarlar ({state.accessories.length})</span>
                  <span className="font-medium text-champagne">
                    +₺{state.accessories.reduce((sum, a) => sum + (accessories.find(x => x.id === a)?.price || 0), 0).toLocaleString('tr-TR')}
                  </span>
                </div>
              )}
            </div>

            <div className="my-6 h-[1px] bg-white/10" />

            <div className="flex items-center gap-3 text-sm text-white/60 bg-white/5 p-4 rounded-xl border border-white/10">
              <Clock className="size-5 text-champagne" />
              <span>Tahmini Teslimat: <strong className="text-white font-medium block">{state.getDeliveryEstimate()}</strong></span>
            </div>
          </div>

          {/* Bottom Price + CTA */}
          <div className="p-6 bg-white/5 border-t border-white/10">
            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">Toplam Tahmini</p>
            <div className="flex items-end gap-1.5 mb-6">
              <span className="text-4xl font-light tracking-tight text-white">
                <AnimatedPrice value={price} />
              </span>
              <span className="text-white/40 text-xs pb-1.5">+ KDV</span>
            </div>

            <button onClick={handleQuoteSubmission} disabled={isSubmittingQuote} className="block w-full">
              <div className="w-full flex items-center justify-center gap-2 bg-champagne hover:bg-champagne/90 text-black font-semibold rounded-xl h-14 text-sm transition-all shadow-[0_0_20px_rgba(201,168,106,0.3)] hover:shadow-[0_0_30px_rgba(201,168,106,0.5)] hover:scale-[1.02] disabled:opacity-50">
                <MessageCircle className="size-4" />
                {isSubmittingQuote ? 'Aktarılıyor...' : 'WhatsApp ile Teklif Al'}
              </div>
            </button>
            <p className="text-center text-white/30 text-[10px] mt-4">Fiyatlar tahmini olup keşif sonrası netleşir.</p>
          </div>
        </div>
      </div>

      {/* ── MOBILE STICKY BOTTOM BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-3xl border-t border-white/10 px-6 py-4 flex items-center justify-between z-50">
        <div>
          <p className="text-[10px] text-white/50 font-semibold uppercase tracking-wider mb-0.5">Tahmini Tutar</p>
          <p className="text-2xl font-semibold tracking-tight text-white"><AnimatedPrice value={price} /></p>
        </div>
        <button onClick={handleQuoteSubmission} disabled={isSubmittingQuote} className="flex items-center gap-2 bg-champagne text-black px-6 py-3.5 rounded-full text-sm font-semibold shadow-[0_0_20px_rgba(201,168,106,0.3)] disabled:opacity-50">
          <MessageCircle className="size-4" />
          {isSubmittingQuote ? '...' : 'Teklif Al'}
        </button>
      </div>

    </div>
  )
}
