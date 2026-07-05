'use client'

import { useConfiguratorStore } from '@/features/configurator/store/useConfiguratorStore'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, ChevronRight, ChevronLeft, Check } from 'lucide-react'

// Dummy Data
const layouts = [
  { id: 'wall-to-wall', name: 'İki Duvar Arası', img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=400&auto=format&fit=crop' },
  { id: 'corner', name: 'Köşe', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop' },
  { id: 'walk-in', name: 'Walk-In', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=400&auto=format&fit=crop' }
]

const collections = [
  { id: 'edge', name: 'EDGE Serisi', price: '₺5.000\'den başlayan' },
  { id: 'pure', name: 'PURE Serisi', price: '₺8.000\'den başlayan' },
  { id: 'luxury', name: 'LUXURY Serisi', price: '₺12.000\'den başlayan' }
]

export default function ConfiguratorPage() {
  const state = useConfiguratorStore()
  
  const generateWhatsAppMessage = () => {
    const phone = "+905550000000" // Replace with Eraydus phone
    const message = `Merhaba, Erayduş web sitesinden bir tasarım oluşturdum ve fiyat teklifi almak istiyorum.
    
*Tasarım Detayları:*
- Yerleşim: ${state.layout || 'Seçilmedi'}
- Koleksiyon: ${state.collection || 'Seçilmedi'}
- Ölçüler: ${state.width}cm x ${state.height}cm
- Tahmini Fiyat: ₺${state.calculatePrice().toLocaleString('tr-TR')}

Yardımcı olabilir misiniz?`
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen pt-24 bg-surface pb-12 lg:pb-0 overflow-hidden">
      
      {/* LEFT PANEL - CONFIGURATION STEPS (30%) */}
      <div className="w-full lg:w-[30%] h-full flex flex-col border-r border-border bg-background shadow-xl z-20">
        <div className="p-6 border-b border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Adım {state.currentStep} / 14</p>
          <h1 className="text-2xl font-light">
            {state.currentStep === 1 && 'Yerleşim Biçimi'}
            {state.currentStep === 2 && 'Koleksiyon Seçimi'}
            {state.currentStep > 2 && 'Detaylandırma'}
          </h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <AnimatePresence mode="wait">
            {/* Step 1: Layout */}
            {state.currentStep === 1 && (
              <motion.div key="step1" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="grid grid-cols-2 gap-4">
                {layouts.map(l => (
                  <button 
                    key={l.id} 
                    onClick={() => state.updateField('layout', l.id)}
                    className={`relative flex flex-col text-left overflow-hidden rounded-2xl border transition-all duration-300 ${state.layout === l.id ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/50'}`}
                  >
                    <div className="aspect-[4/3] w-full bg-muted">
                      <img src={l.img} alt={l.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 bg-card">
                      <p className="font-medium text-sm">{l.name}</p>
                    </div>
                    {state.layout === l.id && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-md">
                        <Check className="size-3" />
                      </div>
                    )}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 2: Collection */}
            {state.currentStep === 2 && (
              <motion.div key="step2" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="flex flex-col gap-4">
                {collections.map(c => (
                  <button 
                    key={c.id} 
                    onClick={() => state.updateField('collection', c.id)}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${state.collection === c.id ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}
                  >
                    <div className="text-left">
                      <p className="font-medium text-lg">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.price}</p>
                    </div>
                    {state.collection === c.id && <Check className="size-5 text-primary" />}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Placeholder for other steps */}
            {state.currentStep > 2 && (
              <motion.div key="step3" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <p>Bu adım geliştirme aşamasındadır.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-border flex items-center justify-between bg-card">
          <Button variant="outline" onClick={state.prevStep} disabled={state.currentStep === 1}>
            <ChevronLeft className="size-4 mr-2" /> Geri
          </Button>
          <Button onClick={state.nextStep}>
            İleri <ChevronRight className="size-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* CENTER - 3D VISUALIZATION (45%) */}
      <div className="w-full lg:w-[45%] h-[50vh] lg:h-full relative flex items-center justify-center bg-surface-elevated overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-background to-transparent pointer-events-none" />
        <motion.div 
          key={`${state.layout}-${state.collection}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-lg aspect-[3/4] bg-white shadow-2xl rounded-3xl overflow-hidden border border-black/5"
        >
          {/* Placeholder for 3D Viewer */}
          <img 
            src={state.layout === 'corner' ? "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" : "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800"} 
            alt="3D Preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <p className="text-white font-light text-xl">Canlı Önizleme: {state.collection ? collections.find(c=>c.id===state.collection)?.name : 'Model Bekleniyor'}</p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL - SUMMARY & PRICE (25%) */}
      <div className="w-full lg:w-[25%] h-full border-l border-border bg-background flex flex-col z-20 shadow-xl">
        <div className="p-8 flex-1 overflow-y-auto">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">Sipariş Özeti</h2>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <span className="text-muted-foreground">Yerleşim</span>
              <span className="font-medium text-right">{layouts.find(l=>l.id===state.layout)?.name || '-'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-4">
              <span className="text-muted-foreground">Koleksiyon</span>
              <span className="font-medium text-right">{collections.find(c=>c.id===state.collection)?.name || '-'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-4">
              <span className="text-muted-foreground">Ölçüler</span>
              <span className="font-medium text-right">{state.width}x{state.height} cm</span>
            </div>
          </div>
        </div>

        <div className="p-8 bg-surface-dark text-white rounded-t-[32px] mt-auto relative">
          <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">Tahmini Tutar</p>
          <div className="flex items-end gap-2 mb-8">
            <span className="text-4xl font-light tracking-tight">₺{state.calculatePrice().toLocaleString('tr-TR')}</span>
            <span className="text-white/60 text-sm pb-1">+ KDV</span>
          </div>

          <a href={generateWhatsAppMessage()} target="_blank" rel="noreferrer" className="w-full">
            <Button size="lg" className="w-full bg-champagne hover:bg-champagne/90 text-black font-semibold rounded-2xl shadow-lg shadow-champagne/20">
              <MessageCircle className="size-5 mr-2" />
              WhatsApp ile Teklif Al
            </Button>
          </a>
          <p className="text-center text-white/40 text-xs mt-4">Fiyatlar tahmini olup, keşif sonrası netleşecektir.</p>
        </div>
      </div>

    </div>
  )
}
