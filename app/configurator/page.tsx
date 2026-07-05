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
      className={`relative text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden group ${
        selected 
          ? 'border-foreground bg-foreground/[0.03] shadow-sm' 
          : 'border-transparent bg-surface hover:bg-surface-elevated hover:shadow-sm'
      } ${className}`}
    >
      {children}
      {selected && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-foreground flex items-center justify-center"
        >
          <Check className="size-3.5 text-background" />
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

  const stepVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
  }

  // Dynamic preview overlay based on glass selection
  const glassOverlay = () => {
    switch (state.glassType) {
      case 'smoke': return 'bg-neutral-900/40'
      case 'bronze': return 'bg-amber-900/30'
      case 'frosted': return 'bg-white/50 backdrop-blur-sm'
      case 'fluted': return 'bg-white/20 backdrop-blur-[1px]'
      case 'nano': return 'bg-sky-200/10'
      default: return 'bg-transparent'
    }
  }

  const profileBorderColor = () => {
    const p = profileColors.find(c => c.id === state.profileColor)
    return p ? p.hex : '#E5E5E5'
  }

  return (
    <div className="flex flex-col lg:flex-row h-[100dvh] bg-background overflow-hidden">
      
      {/* ── STEP NAVIGATOR (left rail) ── */}
      <div className="hidden lg:flex flex-col w-16 h-full bg-surface border-r border-border items-center py-6 gap-1 overflow-y-auto scrollbar-hide flex-shrink-0">
        <Link
          href="/"
          title="Ana Sayfaya Dön"
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-all duration-200 relative group mb-4"
        >
          <X className="size-5" />
          <div className="absolute left-full ml-3 px-2.5 py-1 bg-foreground text-background text-[11px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
            Kapat
          </div>
        </Link>

        {STEPS.map((step) => {
          const Icon = step.icon
          const isActive = state.currentStep === step.num
          const isDone = completed.includes(step.num)
          return (
            <button
              key={step.num}
              onClick={() => state.setStep(step.num)}
              title={step.label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 relative group ${
                isActive
                  ? 'bg-foreground text-background shadow-md'
                  : isDone
                    ? 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {isDone && !isActive ? (
                <Check className="size-3.5" />
              ) : (
                <Icon className="size-4" />
              )}
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2.5 py-1 bg-foreground text-background text-[11px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                {step.label}
              </div>
            </button>
          )
        })}
      </div>

      {/* ── MOBILE TOP BAR ── */}
      <div className="lg:hidden flex items-center gap-2 px-4 pt-4 pb-3 bg-background border-b border-border overflow-x-auto scrollbar-hide flex-shrink-0">
        <Link
          href="/"
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-600 mr-2"
        >
          <X className="size-4" />
        </Link>
        {STEPS.map((step) => {
          const isActive = state.currentStep === step.num
          const isDone = completed.includes(step.num)
          return (
            <button
              key={step.num}
              onClick={() => state.setStep(step.num)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-foreground text-background'
                  : isDone
                    ? 'bg-foreground/10 text-foreground'
                    : 'text-muted-foreground'
              }`}
            >
              {step.num}
            </button>
          )
        })}
      </div>

      {/* ── CONFIGURATION PANEL ── */}
      <div className="w-full lg:w-[380px] xl:w-[420px] h-full flex flex-col bg-background border-r border-border flex-shrink-0 z-10">
        {/* Step Header */}
        <div className="px-6 pt-4 lg:pt-8 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-semibold text-champagne tracking-widest uppercase">Adım {state.currentStep}</span>
            <span className="text-xs text-muted-foreground">/ 14</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {STEPS[state.currentStep - 1].label}
          </h1>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-hide">
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
                      <p className="text-xs text-muted-foreground mt-0.5">{l.desc}</p>
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
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{c.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.desc}</p>
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
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
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
                        <span className="text-xs text-muted-foreground">{dim.unit}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={dim.min}
                      max={dim.max}
                      value={dim.value}
                      onChange={(e) => state.updateField(dim.field, parseInt(e.target.value))}
                      className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-foreground [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>{dim.min} {dim.unit}</span>
                      <span>{dim.max} {dim.unit}</span>
                    </div>
                  </div>
                ))}
                <div className="p-4 bg-champagne/10 border border-champagne/20 rounded-xl flex gap-3 text-sm text-foreground/70">
                  <Info className="size-4 flex-shrink-0 text-champagne mt-0.5" />
                  <p className="text-xs leading-relaxed">Kesin ölçüler profesyonel keşif ekibimiz tarafından alınacaktır. Buradaki değerler tahmini fiyat hesaplaması içindir.</p>
                </div>
              </motion.div>
            )}

            {/* Step 5: Glass Type */}
            {state.currentStep === 5 && (
              <motion.div key="s5" {...stepVariants} className="grid grid-cols-2 gap-3">
                {glassTypes.map(g => (
                  <OptionCard key={g.id} selected={state.glassType === g.id} onClick={() => state.updateField('glassType', g.id)} className="p-4">
                    <div className={`w-full h-12 rounded-lg mb-3 border border-black/5 ${g.color}`} />
                    <p className="font-semibold text-sm">{g.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{g.desc}</p>
                  </OptionCard>
                ))}
              </motion.div>
            )}

            {/* Step 6: Glass Thickness */}
            {state.currentStep === 6 && (
              <motion.div key="s6" {...stepVariants} className="flex flex-col gap-3">
                {[
                  { id: '6mm', name: '6mm Standart', desc: 'Ekonomik çözüm, temel koruma', weight: 'Hafif' },
                  { id: '8mm', name: '8mm Premium', desc: 'Üstün dayanıklılık ve kalınlık hissi', weight: 'Orta' },
                  { id: '10mm', name: '10mm Ultra', desc: 'En yüksek dayanım ve lüks his', weight: 'Ağır' },
                ].map(t => (
                  <OptionCard key={t.id} selected={state.glassThickness === t.id} onClick={() => state.updateField('glassThickness', t.id)} className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-base">{t.name}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{t.desc}</p>
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full uppercase">{t.weight}</span>
                    </div>
                  </OptionCard>
                ))}
              </motion.div>
            )}

            {/* Step 7: Profile Color */}
            {state.currentStep === 7 && (
              <motion.div key="s7" {...stepVariants} className="grid grid-cols-2 gap-3">
                {profileColors.map(p => (
                  <OptionCard key={p.id} selected={state.profileColor === p.id} onClick={() => state.updateField('profileColor', p.id)} className="p-4 flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full border-2 border-black/10 shadow-inner flex-shrink-0" 
                      style={{ backgroundColor: p.hex }} 
                    />
                    <span className="font-medium text-sm">{p.name}</span>
                  </OptionCard>
                ))}
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
                    <p className="text-sm text-muted-foreground mt-0.5">{d.desc}</p>
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
                    {h.desc && <p className="text-sm text-muted-foreground mt-0.5">{h.desc}</p>}
                  </OptionCard>
                ))}
              </motion.div>
            )}

            {/* Step 11: Accessories */}
            {state.currentStep === 11 && (
              <motion.div key="s11" {...stepVariants} className="flex flex-col gap-3">
                <p className="text-xs text-muted-foreground mb-2">Birden fazla seçebilirsiniz.</p>
                {accessories.map(a => (
                  <OptionCard key={a.id} selected={state.accessories.includes(a.id)} onClick={() => state.toggleAccessory(a.id)} className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{a.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
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
                        <p className="text-xs text-muted-foreground mt-0.5">{i.desc}</p>
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
                        <p className="text-xs text-muted-foreground mt-0.5">{w.desc}</p>
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
                  <h3 className="font-semibold text-base mb-2">Tasarımınız Hazır 🎉</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Tüm seçimlerinizi gözden geçirin. Herhangi bir adıma tıklayarak değişiklik yapabilirsiniz.
                  </p>
                </div>
                
                <div className="space-y-3">
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
                      className="flex justify-between items-center w-full py-3 px-4 rounded-xl hover:bg-muted/50 transition-colors text-sm group"
                    >
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-medium group-hover:text-champagne transition-colors">{row.value || '-'}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-background flex-shrink-0">
          <button
            onClick={state.prevStep}
            disabled={state.currentStep === 1}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="size-4" /> Geri
          </button>
          <button
            onClick={state.nextStep}
            disabled={state.currentStep === 14}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-medium bg-foreground text-background hover:bg-foreground/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            İleri <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* ── PREVIEW AREA ── */}
      <div className="flex-1 h-full relative flex items-center justify-center bg-surface overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <motion.div
          key={`${state.layout}-${state.collection}-${state.glassType}-${state.profileColor}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[85%] max-w-xl aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
          style={{ borderColor: profileBorderColor(), borderWidth: '4px', borderStyle: 'solid' }}
        >
          <img
            src={
              state.layout === 'corner' 
                ? "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
                : state.layout === 'walk-in'
                  ? "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop"
                  : "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800&auto=format&fit=crop"
            }
            alt="Önizleme"
            className="w-full h-full object-cover"
          />
          {/* Glass overlay */}
          <div className={`absolute inset-0 transition-all duration-700 ${glassOverlay()}`} />
          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white font-semibold text-lg">
              {state.collection ? collections.find(c => c.id === state.collection)?.name + ' Serisi' : 'Tasarımınız'}
            </p>
            <p className="text-white/60 text-sm">
              {[
                profileColors.find(p => p.id === state.profileColor)?.name,
                glassTypes.find(g => g.id === state.glassType)?.name,
                state.glassThickness
              ].filter(Boolean).join(' · ') || 'Seçimleriniz burada görünecek'}
            </p>
          </div>
        </motion.div>

        {/* Toolbar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 dark:bg-black/60 backdrop-blur-xl rounded-full px-2 py-1.5 shadow-lg border border-black/5">
          {[
            { icon: RotateCcw, label: 'Sıfırla' },
            { icon: Share2, label: 'Paylaş' },
            { icon: Download, label: 'PDF' },
          ].map(tool => (
            <button key={tool.label} title={tool.label} className="p-2.5 rounded-full hover:bg-black/5 text-foreground/50 hover:text-foreground transition-colors">
              <tool.icon className="size-4" />
            </button>
          ))}
        </div>
      </div>

      {/* ── PRICE PANEL (right) ── */}
      <div className="hidden xl:flex flex-col w-72 h-full border-l border-border bg-background flex-shrink-0">
        <div className="p-6 pt-8 flex-1 overflow-y-auto scrollbar-hide">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-6">Fiyat Detayı</h2>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taban Fiyat</span>
              <span className="font-medium">
                {state.collection === 'edge' ? '₺8.500' : state.collection === 'pure' ? '₺12.000' : state.collection === 'luxury' ? '₺16.500' : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ölçü Farkı</span>
              <span className="font-medium">+₺{Math.round((state.width / 100) * (state.height / 100) * 2800).toLocaleString('tr-TR')}</span>
            </div>
            {state.glassType && state.glassType !== 'clear' && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cam Seçimi</span>
                <span className="font-medium text-champagne">+₺{glassTypes.find(g => g.id === state.glassType) ? (['smoke','bronze','fluted','frosted','nano'].includes(state.glassType) ? (state.glassType === 'fluted' ? '2.000' : state.glassType === 'bronze' ? '1.500' : state.glassType === 'smoke' ? '1.200' : '800') : '0') : '0'}</span>
              </div>
            )}
            {state.accessories.length > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Aksesuarlar ({state.accessories.length})</span>
                <span className="font-medium text-champagne">
                  +₺{state.accessories.reduce((sum, a) => sum + (accessories.find(x => x.id === a)?.price || 0), 0).toLocaleString('tr-TR')}
                </span>
              </div>
            )}
          </div>

          <div className="my-6 h-[1px] bg-border" />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>Tahmini Teslimat: <strong className="text-foreground">{state.getDeliveryEstimate()}</strong></span>
          </div>
        </div>

        {/* Bottom Price + CTA */}
        <div className="p-6 bg-[#0A0A0A] text-white rounded-t-3xl">
          <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1">Toplam Tahmini</p>
          <div className="flex items-end gap-1.5 mb-6">
            <span className="text-3xl font-light tracking-tight">
              <AnimatedPrice value={price} />
            </span>
            <span className="text-white/40 text-xs pb-1">+ KDV</span>
          </div>

          <a href={generateWhatsAppMessage()} target="_blank" rel="noreferrer" className="block w-full">
            <button className="w-full flex items-center justify-center gap-2 bg-champagne hover:bg-champagne/90 text-black font-semibold rounded-2xl h-13 text-sm transition-colors shadow-lg shadow-champagne/20">
              <MessageCircle className="size-4" />
              WhatsApp ile Teklif Al
            </button>
          </a>
          <p className="text-center text-white/30 text-[10px] mt-3">Fiyatlar tahmini olup keşif sonrası netleşir.</p>
        </div>
      </div>

      {/* ── MOBILE STICKY BOTTOM BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-3 flex items-center justify-between z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Tahmini</p>
          <p className="text-xl font-semibold tracking-tight"><AnimatedPrice value={price} /></p>
        </div>
        <a href={generateWhatsAppMessage()} target="_blank" rel="noreferrer">
          <button className="flex items-center gap-2 bg-champagne text-black px-6 py-3 rounded-full text-sm font-semibold shadow-md">
            <MessageCircle className="size-4" />
            Teklif Al
          </button>
        </a>
      </div>

    </div>
  )
}
