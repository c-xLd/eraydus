'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Layers, Box, MessageCircle, ChevronRight, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { AnimatedSchematic } from './AnimatedSchematic'

interface Model {
  id: string
  title: string
  image_url: string
}

interface TasarlaClientProps {
  sandblastedModels: Model[]
}

const LAYOUTS = [
  { id: 'wall-to-wall', label: 'İki Duvar Arası', icon: Box },
  { id: 'corner', label: 'Köşe Kabin', icon: LayoutGridIcon },
  { id: 'walk-in', label: 'Tek Cam Duşakabin', icon: Layers },
]

const DOOR_SYSTEMS = {
  'wall-to-wall': [
    { id: '1-sabit-1-kayar', label: '1 Sabit 1 Kayar' },
    { id: '2-sabit-2-kayar', label: '2 Sabit 2 Kayar (Geniş)' },
    { id: 'katlanir', label: 'Katlanır Kapı (Dar Alan)' }
  ],
  'corner': [
    { id: '2-sabit-2-kayar', label: 'Kare/Dikdörtgen (2S 2K)' }
  ],
  'walk-in': [
    { id: 'sabit-panel', label: 'Tek Sabit Panel' }
  ]
}

const PROFILES = [
  { id: 'chrome', label: 'Krom', color: 'bg-zinc-300' },
  { id: 'black', label: 'Siyah', color: 'bg-zinc-950' },
  { id: 'gold', label: 'Gold', color: 'bg-yellow-500' },
  { id: 'white', label: 'Beyaz', color: 'bg-white' },
]

const GLASS_TYPES = [
  { id: 'clear', label: 'Şeffaf' },
  { id: 'smoke', label: 'Füme' },
  { id: 'bronze', label: 'Bronz' },
  { id: 'frosted', label: 'Kumlama' },
]

const BASES = [
  { id: 'floor', label: 'Yerden (Sıfır Zemin)' },
  { id: 'tray', label: 'Duş Teknesi' },
  { id: 'jacuzzi', label: 'Jakuzi Üstü' }
]

const HANDLES = [
  { id: 'standard', label: 'Standart (Dik)' },
  { id: 'nokta', label: 'Nokta Kulp' },
  { id: 'kare', label: 'Kare Kulp' },
  { id: 'havlu', label: 'Havlu Askılı' }
]

const DELIVERIES = [
  { id: 'montaj', label: 'Ücretsiz Montaj (5-7 Gün)' },
  { id: 'kargo', label: 'Kargo / Elden Teslim' }
]

function LayoutGridIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <path d="M3 14h7v7H3z" />
    </svg>
  )
}

export function TasarlaClient({ sandblastedModels }: TasarlaClientProps) {
  // STATE
  const [layout, setLayout] = useState('wall-to-wall')
  const [widthX, setWidthX] = useState(120)
  const [depthY, setDepthY] = useState(90)
  const [doorSystem, setDoorSystem] = useState('1-sabit-1-kayar')
  const [glass, setGlass] = useState('clear')
  const [patternId, setPatternId] = useState<string | null>(sandblastedModels.length > 0 ? sandblastedModels[0].id : null)
  const [profile, setProfile] = useState('chrome')
  const [base, setBase] = useState('floor')
  const [handle, setHandle] = useState('standard')
  const [delivery, setDelivery] = useState('montaj')
  const [notes, setNotes] = useState('')

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const selectedPattern = sandblastedModels.find(m => m.id === patternId)

  // Handlers
  const handleLayoutChange = (l: string) => {
    setLayout(l)
    setDoorSystem(DOOR_SYSTEMS[l as keyof typeof DOOR_SYSTEMS][0].id)
  }

  const handleGlassChange = (g: string) => {
    setGlass(g)
    if (g === 'frosted' && !patternId && sandblastedModels.length > 0) {
      setPatternId(sandblastedModels[0].id)
    }
  }

  // Steps Definition
  const steps = [
    { id: 'layout', title: 'Yerleşim' },
    { id: 'dimensions', title: 'Ölçüler' },
    { id: 'model', title: 'Kapı Modeli' },
    { id: 'glass', title: 'Cam Tipi' },
    ...(glass === 'frosted' ? [{ id: 'pattern', title: 'Kumlama Deseni' }] : []),
    { id: 'profile', title: 'Profil Rengi' },
    { id: 'base', title: 'Zemin Seçimi' },
    ...(layout !== 'walk-in' ? [{ id: 'handle', title: 'Kulp Tipi' }] : []),
    { id: 'delivery', title: 'Teslimat' },
    { id: 'summary', title: 'Özet & Notlar' }
  ]

  const currentStep = steps[currentStepIndex]
  const isLastStep = currentStepIndex === steps.length - 1

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setDirection(1)
      setCurrentStepIndex(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setDirection(-1)
      setCurrentStepIndex(prev => prev - 1)
    }
  }

  // Generate WhatsApp Message
  const getWhatsappUrl = () => {
    const layoutLabel = LAYOUTS.find(l => l.id === layout)?.label
    const modelLabel = DOOR_SYSTEMS[layout as keyof typeof DOOR_SYSTEMS].find(d => d.id === doorSystem)?.label
    const glassLabel = GLASS_TYPES.find(g => g.id === glass)?.label
    const profileLabel = PROFILES.find(p => p.id === profile)?.label
    const baseLabel = BASES.find(b => b.id === base)?.label
    const handleLabel = HANDLES.find(h => h.id === handle)?.label
    const deliveryLabel = DELIVERIES.find(d => d.id === delivery)?.label

    let text = `Merhaba, Erayduş Tasarım Aracı üzerinden oluşturduğum duşakabin modeli için fiyat almak istiyorum.\n\n`
    text += `📐 *Yerleşim:* ${layoutLabel}\n`
    text += `📏 *Ölçüler:* ${widthX} cm ${layout === 'corner' ? `x ${depthY} cm` : ''}\n`
    text += `🚪 *Kapı Modeli:* ${modelLabel}\n`
    text += `🛁 *Zemin Tipi:* ${baseLabel}\n`
    text += `✨ *Cam Tipi:* ${glassLabel}\n`
    if (glass === 'frosted' && selectedPattern) {
      text += `🖼 *Kumlama Deseni:* ${selectedPattern.title}\n`
    }
    text += `🎨 *Profil Rengi:* ${profileLabel}\n`
    if (layout !== 'walk-in') {
      text += `📍 *Kulp Tipi:* ${handleLabel}\n`
    }
    text += `🚚 *Teslimat:* ${deliveryLabel}\n`

    if (notes.trim()) {
      text += `\n📝 *Ek Notlar:* ${notes.trim()}\n`
    }

    return `https://wa.me/905548830071?text=${encodeURIComponent(text)}`
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-[100dvh] bg-[#0A0A0A] text-white overflow-hidden selection:bg-champagne/20">
      {/* ── SEO & Accessibility Headers ── */}
      <h1 className="sr-only">Özel Ölçü Duşakabin Tasarım Aracı ve Fiyat Hesaplama</h1>
      <h2 className="sr-only">Kendi özel ölçü duşakabininizi (kare, oval, iki duvar arası) tasarlayın, cam tipini ve profil rengini seçip anında online fiyat hesaplayın.</h2>

      {/* ── Left Area: 2D Animated Schematic (Visualizer) ── */}
      <div className="relative w-full md:flex-1 shrink-0 bg-gradient-to-br from-[#0F0F0F] to-[#050505] h-[65dvh] md:h-full flex items-center justify-center p-2 md:p-6">
        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-2 text-xs md:text-sm text-white/50 hover:text-white transition-colors bg-black/20 md:bg-transparent px-3 py-1.5 md:p-0 rounded-full backdrop-blur-md md:backdrop-blur-none"
        >
          <ArrowLeft className="w-4 h-4" /> Ana Sayfa
        </Link>

        {/* Decorative Grid */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] bg-champagne/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full h-full flex items-center justify-center p-0 md:p-2">
          <AnimatedSchematic
            layout={layout}
            widthX={widthX}
            depthY={depthY}
            doorSystem={doorSystem}
            glassType={glass}
            profileColor={profile}
            patternUrl={glass === 'frosted' ? selectedPattern?.image_url || null : null}
            baseType={base}
            handleType={handle}
          />
        </div>
      </div>

      {/* ── Right Area: Multi-Step Controls ── */}
      <div className="w-full flex-1 md:flex-none md:w-[360px] lg:w-[400px] shrink-0 bg-[#111111] md:border-l border-white/5 md:h-full flex flex-col relative z-20 rounded-t-[24px] md:rounded-none -mt-6 md:mt-0 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] md:shadow-none overflow-hidden">
        
        {/* Mobile Drag Handle (Visual only) */}
        <div className="w-full flex justify-center pt-2 pb-1 md:hidden absolute top-0 left-0 z-30">
          <div className="w-10 h-1 bg-white/15 rounded-full" />
        </div>

        {/* Header / Progress Indicator */}
        <div className="pt-6 px-4 pb-3 md:p-6 md:pb-5 border-b border-white/5 shrink-0 relative">
          <div className="hidden md:block">
            <span className="text-champagne text-[10px] font-semibold uppercase tracking-[0.3em]">Erayduş Konfigüratör</span>
            <div className="text-2xl font-light tracking-tight mt-1">
              <span className="font-semibold">Tasarım</span> Aracı
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-1 md:mt-5">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex-1 flex flex-col gap-2">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${idx <= currentStepIndex ? 'bg-champagne' : 'bg-white/10'
                    }`}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 md:mt-3 text-[10px] md:text-[11px] uppercase tracking-widest text-white/50 font-medium">
            Adım {currentStepIndex + 1} / {steps.length}: <span className="text-champagne">{currentStep.title}</span>
          </div>
        </div>

        {/* Step Content Area */}
        <div className="relative flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar p-4 md:p-8">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentStep.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full"
            >
              {/* STEP 1: LAYOUT */}
              {currentStep.id === 'layout' && (
                <div className="space-y-5">
                  <h3 className="text-lg font-light text-white">Yerleşim tipini seçin</h3>
                  <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {LAYOUTS.map(l => (
                      <button
                        key={l.id}
                        onClick={() => handleLayoutChange(l.id)}
                        className={`shrink-0 w-[140px] md:w-auto snap-center flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all ${layout === l.id
                            ? 'bg-champagne/10 border-champagne/50 text-champagne'
                            : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                          }`}
                      >
                        <l.icon className="w-8 h-8" strokeWidth={1.5} />
                        <span className="text-xs font-medium text-center">{l.label}</span>
                        {layout === l.id && (
                          <div className="absolute top-3 right-3">
                            <Check className="w-4 h-4 text-champagne" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: DIMENSIONS */}
              {currentStep.id === 'dimensions' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-lg font-light text-white">Ölçüleri Belirleyin</h3>

                  <div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-white/70">Kabin Genişliği (X)</span>
                      <span className="text-champagne font-bold">{widthX} cm</span>
                    </div>
                    <input
                      type="range"
                      min="60" max="250" step="5"
                      value={widthX}
                      onChange={(e) => {
                        const newW = Number(e.target.value)
                        setWidthX(newW)

                        // Auto-correct door system based on physical limits
                        let valid = true
                        if (newW < 100 && doorSystem === '2-sabit-2-kayar') valid = false
                        if (newW > 100 && (doorSystem === '1-sabit-1-kayar' || doorSystem === 'katlanir')) valid = false

                        if (!valid) {
                          if (newW < 100) setDoorSystem('1-sabit-1-kayar')
                          if (newW > 100) setDoorSystem('2-sabit-2-kayar')
                        }
                      }}
                      className="w-full accent-champagne h-1.5 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-champagne [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-white/30 mt-2">
                      <span>60 cm</span>
                      <span>250 cm</span>
                    </div>
                  </div>

                  {layout === 'corner' && (
                    <div>
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-white/70">Kabin Derinliği (Y)</span>
                        <span className="text-champagne font-bold">{depthY} cm</span>
                      </div>
                      <input
                        type="range"
                        min="60" max="250" step="5"
                        value={depthY}
                        onChange={(e) => setDepthY(Number(e.target.value))}
                        className="w-full accent-champagne h-1.5 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-champagne [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-white/30 mt-2">
                        <span>60 cm</span>
                        <span>250 cm</span>
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-white/50 leading-relaxed">
                    Ölçüleriniz milimetrik olmak zorunda değil. Sipariş onayı sonrası ekiplerimiz ücretsiz röleve (ölçü alım) işlemi için adresinize gelecektir.
                  </div>
                </div>
              )}

              {/* STEP 3: MODEL */}
              {currentStep.id === 'model' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-lg font-light text-white">Kapı Modelini Seçin</h3>

                  <div className="flex overflow-x-auto md:grid md:grid-cols-1 gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {DOOR_SYSTEMS[layout as keyof typeof DOOR_SYSTEMS].filter(d => {
                      if (widthX < 100 && d.id === '2-sabit-2-kayar') return false
                      if (widthX > 100 && (d.id === '1-sabit-1-kayar' || d.id === 'katlanir')) return false
                      return true
                    }).map(d => (
                      <button
                        key={d.id}
                        onClick={() => setDoorSystem(d.id)}
                        className={`shrink-0 w-[220px] md:w-auto snap-center relative p-5 rounded-2xl border text-sm font-medium transition-all text-left whitespace-normal ${doorSystem === d.id
                            ? 'bg-champagne/10 border-champagne/50 text-champagne'
                            : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                          }`}
                      >
                        {d.label}
                        {doorSystem === d.id && (
                          <div className="absolute top-1/2 -translate-y-1/2 right-4">
                            <Check className="w-5 h-5 text-champagne" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-champagne/70 bg-champagne/5 p-4 rounded-xl border border-champagne/10 leading-relaxed">
                    {widthX < 100
                      ? `Not: ${widthX} cm gibi dar alanlar için en verimli sistem "1 Sabit 1 Kayar" veya "Katlanır" kapılardır.`
                      : widthX > 100
                        ? `Not: ${widthX} cm gibi geniş alanlar için en konforlu sistem "2 Sabit 2 Kayar" kapılardır.`
                        : `Not: 100 cm genişlik için tüm sistemleri tercih edebilirsiniz.`
                    }
                  </div>
                </div>
              )}

              {/* STEP 4: GLASS */}
              {currentStep.id === 'glass' && (
                <div className="space-y-5">
                  <h3 className="text-lg font-light text-white">Cam tipini seçin</h3>
                  <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {GLASS_TYPES.map(g => (
                      <button
                        key={g.id}
                        onClick={() => handleGlassChange(g.id)}
                        className={`shrink-0 w-[140px] md:w-auto snap-center relative p-5 rounded-2xl border text-sm font-medium transition-all ${glass === g.id
                            ? 'bg-champagne/10 border-champagne/50 text-champagne'
                            : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                          }`}
                      >
                        {g.label}
                        {glass === g.id && (
                          <div className="absolute top-3 right-3">
                            <Check className="w-4 h-4 text-champagne" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: PATTERN (Conditional) */}
              {currentStep.id === 'pattern' && (
                <div className="space-y-5">
                  <h3 className="text-lg font-light text-white">Kumlama desenini seçin</h3>
                  {sandblastedModels.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-white/50 text-center">
                      Model bulunamadı.
                    </div>
                  ) : (
                    <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {sandblastedModels.map(pattern => (
                        <button
                          key={pattern.id}
                          onClick={() => setPatternId(pattern.id)}
                          className={`shrink-0 w-[120px] md:w-auto snap-center relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${patternId === pattern.id ? 'border-champagne' : 'border-transparent hover:border-white/20'
                            }`}
                        >
                          <Image src={pattern.image_url} alt={pattern.title} fill className="object-cover" sizes="150px" />
                          {patternId === pattern.id && (
                            <div className="absolute inset-0 bg-champagne/20 flex items-center justify-center">
                              <Check className="w-6 h-6 text-white drop-shadow-md" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 6: PROFILE */}
              {currentStep.id === 'profile' && (
                <div className="space-y-5">
                  <h3 className="text-lg font-light text-white">Profil rengini seçin</h3>
                  <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {PROFILES.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setProfile(p.id)}
                        className={`shrink-0 w-[140px] md:w-auto snap-center relative flex items-center gap-3 p-4 rounded-2xl border transition-all ${profile === p.id
                            ? 'bg-champagne/10 border-champagne/50 text-champagne'
                            : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-full border border-white/10 ${p.color} shadow-inner shrink-0`} />
                        <span className="text-sm font-medium">{p.label}</span>
                        {profile === p.id && (
                          <div className="absolute top-4 right-4">
                            <Check className="w-4 h-4 text-champagne" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 7: BASE */}
              {currentStep.id === 'base' && (
                <div className="space-y-5">
                  <h3 className="text-lg font-light text-white">Zemin tipini seçin</h3>
                  <div className="flex overflow-x-auto md:grid md:grid-cols-1 gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {BASES.map(b => (
                      <button
                        key={b.id}
                        onClick={() => setBase(b.id)}
                        className={`shrink-0 w-[200px] md:w-auto snap-center relative p-5 rounded-2xl border text-sm font-medium transition-all text-left whitespace-normal ${base === b.id
                            ? 'bg-champagne/10 border-champagne/50 text-champagne'
                            : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                          }`}
                      >
                        {b.label}
                        {base === b.id && (
                          <div className="absolute top-1/2 -translate-y-1/2 right-4">
                            <Check className="w-5 h-5 text-champagne" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 8: HANDLE */}
              {currentStep.id === 'handle' && (
                <div className="space-y-5">
                  <h3 className="text-lg font-light text-white">Kulp tipini seçin</h3>
                  <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {HANDLES.map(h => (
                      <button
                        key={h.id}
                        onClick={() => setHandle(h.id)}
                        className={`shrink-0 w-[140px] md:w-auto snap-center relative p-5 rounded-2xl border text-sm font-medium transition-all ${handle === h.id
                            ? 'bg-champagne/10 border-champagne/50 text-champagne'
                            : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                          }`}
                      >
                        {h.label}
                        {handle === h.id && (
                          <div className="absolute top-3 right-3">
                            <Check className="w-4 h-4 text-champagne" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 9: DELIVERY */}
              {currentStep.id === 'delivery' && (
                <div className="space-y-5">
                  <h3 className="text-lg font-light text-white">Teslimat Yöntemi</h3>
                  <div className="flex overflow-x-auto md:grid md:grid-cols-1 gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {DELIVERIES.map(d => (
                      <button
                        key={d.id}
                        onClick={() => setDelivery(d.id)}
                        className={`shrink-0 w-[240px] md:w-auto snap-center relative p-5 rounded-2xl border text-sm font-medium transition-all text-left whitespace-normal ${delivery === d.id
                            ? 'bg-champagne/10 border-champagne/50 text-champagne'
                            : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                          }`}
                      >
                        {d.label}
                        {delivery === d.id && (
                          <div className="absolute top-1/2 -translate-y-1/2 right-4">
                            <Check className="w-5 h-5 text-champagne" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 10: SUMMARY */}
              {currentStep.id === 'summary' && (
                <div className="space-y-5">
                  <h3 className="text-lg font-light text-white">Konfigürasyon Özetiniz</h3>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-white/50 text-xs">Yerleşim</span>
                      <span className="text-white text-sm font-medium">{LAYOUTS.find(l => l.id === layout)?.label}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-white/50 text-xs">Ölçü</span>
                      <span className="text-white text-sm font-medium">{widthX} {layout === 'corner' ? `x ${depthY}` : ''} cm</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-white/50 text-xs">Zemin & Kapı</span>
                      <span className="text-white text-sm font-medium">{BASES.find(b => b.id === base)?.label} - {DOOR_SYSTEMS[layout as keyof typeof DOOR_SYSTEMS].find(d => d.id === doorSystem)?.label}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-white/50 text-xs">Cam & Kumlama</span>
                      <span className="text-white text-sm font-medium">{GLASS_TYPES.find(g => g.id === glass)?.label} {glass === 'frosted' && selectedPattern ? `(${selectedPattern.title})` : ''}</span>
                    </div>
                    <div className="flex justify-between items-center pb-1">
                      <span className="text-white/50 text-xs">Profil & Kulp</span>
                      <span className="text-white text-sm font-medium">{PROFILES.find(p => p.id === profile)?.label} - {layout !== 'walk-in' ? HANDLES.find(h => h.id === handle)?.label : '-'}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-white/50 uppercase tracking-widest">Ek Notlar (Opsiyonel)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Özel bir isteğiniz veya eklemek istediğiniz not varsa buraya yazabilirsiniz..."
                      className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-champagne resize-none transition-colors"
                    />
                  </div>

                  <p className="text-xs text-white/40 leading-relaxed text-center pb-8">
                    Girdiğiniz özellikler doğrudan satış ekibimize iletilir. Size en uygun fiyat teklifiyle hızlıca dönüş yapacağız.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 md:p-8 border-t border-white/5 shrink-0 flex items-center justify-between gap-3">
          <button
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className={`flex items-center justify-center size-10 md:size-12 shrink-0 rounded-full border border-white/10 transition-colors ${currentStepIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-white'
              }`}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {isLastStep ? (
            <a
              href={getWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => toast.success('Tasarım detaylarınız WhatsApp sipariş hattımıza aktarılıyor...')}
              className="w-full flex items-center justify-center gap-2 bg-champagne text-black px-4 py-2.5 md:px-6 md:py-3.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-[0_0_30px_rgba(201,168,106,0.2)] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              Siparişi İlet
            </a>
          ) : (
            <button
              onClick={nextStep}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-black px-4 py-2.5 md:px-6 md:py-3.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-champagne hover:text-black transition-colors"
            >
              Devam Et
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}
        </div>

      </div>

    </div>
  )
}
