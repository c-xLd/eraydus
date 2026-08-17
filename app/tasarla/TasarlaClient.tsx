'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Layers, Box, MessageCircle, ChevronRight, ChevronLeft, RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { AnimatedSchematic } from './AnimatedSchematic'
import { cn } from '@/lib/utils'

interface Model {
  id: string
  title: string
  image_url: string
}

import { useSettings } from '@/components/providers/SettingsProvider'

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
  { id: 'mirrored', label: 'Aynalı' },
]

const BASES = [
  { id: 'floor-profile', label: 'Yerden (Altında Profil)' },
  { id: 'tray', label: 'Duş Teknesi' },
  { id: 'tub', label: 'Küvet Üstü' },
  { id: 'jacuzzi', label: 'Jakuzi Üstü' }
]

const TEKNE_MODELS = [
  { id: 't-oval', name: 'Oval Duş Teknesi', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597482175-oval-dus-teknesi.webp', type: 'corner-sym' },
  { id: 't-oval-oturmali', name: 'Oval Oturmalı Duş Teknesi', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597482452-oval-oturmali-dus-teknesi.webp', type: 'corner-sym' },
  { id: 't-asimetrik', name: 'Asimetrik Oval Duş Teknesi', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597480708-asimetrik-oval-dus-teknesi.webp', type: 'corner-asym' },
  { id: 't-asimetrik-oturmali', name: 'Asimetrik Oval Oturmalı Duş Teknesi', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597481092-asimetrik-oval-oturmali-dus-teknesi.webp', type: 'corner-asym' },
  { id: 't-dikdortgen', name: 'Dikdörtgen Duş Teknesi', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597481667-dikdortgen-dus-teknesi.webp', type: 'flat' }
]

const KUVET_MODELS = [
  { id: 'k-oval', name: 'Oval Küvet', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1786718440153-oval-kuvet.webp', type: 'corner-sym' },
  { id: 'k-asimetrik', name: 'Asimetrik Oval Küvet', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1786718439933-oval-asimetrik-kuvet.webp', type: 'corner-asym' },
  { id: 'k-dikdortgen', name: 'Dikdörtgen Küvet', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1786718437681-dikd-rtgen-kuvet.webp', type: 'flat' },
  { id: 'k-dikdortgen-oturmali', name: 'Dikdörtgen Oturmalı Küvet', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1786718437923-dikd-rtgen-oturmali-kuvet.webp', type: 'flat' }
]

const JAKUZI_MODELS = [
  { id: 'j-lumina', name: 'Lumina', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1786717846272-jakuzi-1.webp' },
  { id: 'j-aero', name: 'Aero', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1786717846546-jakuzi-2.webp' },
  { id: 'j-oasis', name: 'Oasis', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1786717846972-jakuzi-3.webp' },
  { id: 'j-prestige', name: 'Prestige', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1786717847272-jakuzi-4.webp' },
  { id: 'j-zen', name: 'Zen', src: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1786717847509-jakuzi-5.webp' }
]
const HANDLES = [
  { id: 'nokta', label: 'Standart Nokta Kulp' },
  { id: 'plastik-dik', label: 'Plastik Dik Kulp' },
  { id: 'metal-dik', label: 'Metal Dik Kulp' }
]

const DELIVERIES = [
  { id: 'montaj', label: 'Ücretsiz Montaj (3-5 İş Günü)' },
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
  const { whatsappNumber, enableOnlineQuotes, showPrices } = useSettings()
  // STATE
  const [layout, setLayout] = useState('wall-to-wall')
  const [widthX, setWidthX] = useState<number>(120)
  const [depthY, setDepthY] = useState<number>(90)
  const [doorSystem, setDoorSystem] = useState('2-sabit-2-kayar')
  const [glass, setGlass] = useState('clear')
  const [patternId, setPatternId] = useState<string | null>(sandblastedModels.length > 0 ? sandblastedModels[0].id : null)
  const [profile, setProfile] = useState('chrome')
  const [base, setBase] = useState('floor-profile')
  const [baseModelId, setBaseModelId] = useState<string | null>(null)
  const [handle, setHandle] = useState('nokta')
  const [delivery, setDelivery] = useState('montaj')
  const [notes, setNotes] = useState('')

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const selectedPattern = sandblastedModels.find(m => m.id === patternId)

  const getAvailableBaseModels = () => {
    if (base === 'tray') {
      if (layout === 'wall-to-wall' || layout === 'walk-in') {
        return TEKNE_MODELS.filter(m => m.type === 'flat')
      } else {
        if (widthX === depthY) {
          return TEKNE_MODELS.filter(m => m.type === 'corner-sym' || m.type === 'flat')
        } else {
          return TEKNE_MODELS.filter(m => m.type === 'corner-asym' || m.type === 'flat')
        }
      }
    } else if (base === 'tub') {
      if (layout === 'wall-to-wall' || layout === 'walk-in') {
        return KUVET_MODELS.filter(m => m.type === 'flat')
      } else {
        if (widthX === depthY) {
          return KUVET_MODELS.filter(m => m.type === 'corner-sym' || m.type === 'flat')
        } else {
          return KUVET_MODELS.filter(m => m.type === 'corner-asym' || m.type === 'flat')
        }
      }
    } else if (base === 'jacuzzi') {
      return JAKUZI_MODELS
    }
    return []
  }

  const availableBaseModels = getAvailableBaseModels()

  useEffect(() => {
    if (availableBaseModels.length > 0) {
      if (!baseModelId || !availableBaseModels.find(m => m.id === baseModelId)) {
        setBaseModelId(availableBaseModels[0].id)
      }
    } else {
      setBaseModelId(null)
    }
  }, [base, layout, widthX, depthY, availableBaseModels, baseModelId])

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

    const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '')
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`
  }

  const resetDesign = () => {
    if (!confirm('Tasarımı sıfırlamak istediğinize emin misiniz?')) return;
    
    // Reset all state to initial values
    setLayout('wall-to-wall')
    setWidthX(120)
    setDepthY(90)
    setDoorSystem('2-sabit-2-kayar')
    setGlass('clear')
    setPatternId(sandblastedModels.length > 0 ? sandblastedModels[0].id : null)
    setProfile('chrome')
    setBase('floor-profile')
    setBaseModelId(null)
    setHandle('nokta')
    setDelivery('montaj')
    setNotes('')
    setCurrentStepIndex(0)
    setDirection(-1)
    toast.success('Tasarım sıfırlandı.')
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-[100dvh] bg-[#0A0A0A] text-white overflow-hidden selection:bg-champagne/20">
      <h1 className="sr-only">Özel Ölçü Duşakabin Tasarım Aracı ve Fiyat Hesaplama</h1>
      <h2 className="sr-only">Kendi özel ölçü duşakabininizi (kare, oval, iki duvar arası) tasarlayın, cam tipini ve profil rengini seçip anında online fiyat hesaplayın.</h2>

      <div className="relative w-full md:flex-1 shrink-0 bg-gradient-to-br from-[#0F0F0F] to-[#050505] h-[65dvh] md:h-full flex items-center justify-center p-2 md:p-6">
        <Link
          href="/"
          className="absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-2 text-xs md:text-sm text-white/50 hover:text-white transition-colors bg-black/20 md:bg-transparent px-3 py-1.5 md:p-0 rounded-full backdrop-blur-md md:backdrop-blur-none"
        >
          <ArrowLeft className="w-4 h-4" /> Ana Sayfa
        </Link>

        {currentStepIndex > 0 && (
          <button
            onClick={resetDesign}
            className="md:hidden absolute top-4 right-4 z-50 flex items-center gap-1.5 text-xs text-white/50 hover:text-champagne transition-colors bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5 hover:border-champagne/30"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> <span>Sıfırla</span>
          </button>
        )}

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

      <div className="w-full flex-1 md:flex-none md:w-[clamp(320px,30vw,480px)] shrink-0 bg-[#111111] md:border-l border-white/5 md:h-full flex flex-col relative z-20 rounded-t-[24px] md:rounded-none -mt-6 md:mt-0 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] md:shadow-none overflow-hidden">
        
        <div className="w-full flex justify-center pt-2 pb-1 md:hidden absolute top-0 left-0 z-30">
          <div className="w-10 h-1 bg-white/15 rounded-full" />
        </div>

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

                        if (layout !== 'corner') {
                          let valid = true
                          if (newW < 100 && doorSystem === '2-sabit-2-kayar') valid = false
                          if (newW > 100 && (doorSystem === '1-sabit-1-kayar' || doorSystem === 'katlanir')) valid = false

                          if (!valid) {
                            if (newW < 100) setDoorSystem('1-sabit-1-kayar')
                            if (newW > 100) setDoorSystem('2-sabit-2-kayar')
                          }
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

              {currentStep.id === 'base' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-light text-white">Zemin tipini seçin</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
                    {BASES.map(b => (
                      <button
                        key={b.id}
                        onClick={() => setBase(b.id)}
                        className={`relative p-4 rounded-xl border text-sm font-medium transition-all text-left ${base === b.id
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

                  {/* Zemin Modeli Seçimi */}
                  {availableBaseModels.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 pt-6 border-t border-white/10"
                    >
                      <h4 className="text-sm font-medium text-white/70">Ölçünüze Uygun Model Seçimi</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {availableBaseModels.map(model => (
                          <button
                            key={model.id}
                            onClick={() => setBaseModelId(model.id)}
                            className={cn(
                              "relative flex flex-col items-center gap-2 rounded-xl border p-2 transition-all",
                              baseModelId === model.id 
                                ? "border-eraydus-gold bg-eraydus-gold/10" 
                                : "border-white/10 hover:border-white/30 hover:bg-white/5"
                            )}
                          >
                            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black/40">
                              <Image src={model.src} alt={model.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                            </div>
                            <span className={cn(
                              "text-xs font-medium text-center",
                              baseModelId === model.id ? "text-eraydus-gold" : "text-white/70"
                            )}>
                              {model.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
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
              className="flex-1 flex items-center justify-center gap-2 bg-champagne text-black px-4 py-2.5 md:px-6 md:py-3.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-[0_0_30px_rgba(201,168,106,0.2)] cursor-pointer"
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

          {/* Reset Button (Desktop Only) */}
          {currentStepIndex > 0 && (
            <button
              onClick={resetDesign}
              title="Tasarımı Sıfırla"
              className="hidden md:flex items-center justify-center size-12 shrink-0 rounded-full border border-white/10 transition-colors hover:bg-white/10 text-white/50 hover:text-white"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          )}
        </div>

      </div>

    </div>
  )
}
