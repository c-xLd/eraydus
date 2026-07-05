'use client'

import { useConfiguratorStore } from '@/features/configurator/store/useConfiguratorStore'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, ChevronRight, ChevronLeft, Check, Info } from 'lucide-react'
import { useState } from 'react'

// Dummy Data mapped to specification
const layouts = [
  { id: 'wall-to-wall', name: 'İki Duvar Arası', img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=400&auto=format&fit=crop' },
  { id: 'corner', name: 'Köşe', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop' },
  { id: 'walk-in', name: 'Walk-In', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=400&auto=format&fit=crop' }
]

const collections = [
  { id: 'edge', name: 'EDGE Serisi', price: 'Minimal ve modern profil tasarımı' },
  { id: 'pure', name: 'PURE Serisi', price: 'Tamamen profilsiz, şeffaf görünüm' },
  { id: 'luxury', name: 'LUXURY Serisi', price: 'Lüks donanım ve premium hissiyat' }
]

const models = [
  { id: 'm1', name: 'Standard Sürgülü', desc: 'Klasik sürgülü sistem' },
  { id: 'm2', name: 'Soft-Close Sürgülü', desc: 'Sessiz kapanan sürgülü sistem' },
  { id: 'm3', name: 'Menteşeli Kapı', desc: 'Dışa veya içe açılır sistem' }
]

const glassTypes = [
  { id: 'clear', name: 'Şeffaf', desc: 'Tam saydamlık ve ferahlık' },
  { id: 'smoke', name: 'Füme', desc: 'Gizlilik ve premium koyu görünüm' },
  { id: 'bronze', name: 'Bronz', desc: 'Sıcak tonlar ve lüks ambiyans' },
  { id: 'fluted', name: 'Fluted', desc: 'Dokulu ve mimari görünüm' }
]

const profileColors = [
  { id: 'black', name: 'Mat Siyah', hex: '#111111' },
  { id: 'chrome', name: 'Parlak Krom', hex: '#E8E9EB' },
  { id: 'gold', name: 'Fırçalı Altın', hex: '#C9A86A' },
  { id: 'white', name: 'Mat Beyaz', hex: '#F8F8F6' }
]

export default function ConfiguratorPage() {
  const state = useConfiguratorStore()
  
  const generateWhatsAppMessage = () => {
    const phone = "+905550000000" 
    const message = `Merhaba, Erayduş web sitesinden bir tasarım oluşturdum ve fiyat teklifi almak istiyorum.
    
*Tasarım Detayları:*
- Yerleşim: ${state.layout || '-'}
- Koleksiyon: ${state.collection || '-'}
- Model: ${state.model || '-'}
- Ölçüler: G:${state.width}cm Y:${state.height}cm
- Cam: ${state.glassType || '-'} (${state.glassThickness || '8mm'})
- Profil: ${state.profileColor || '-'}
- Kapı/Açılım: ${state.doorSystem || '-'} / ${state.openingDirection || '-'}
- Aksesuarlar: ${state.accessories.length > 0 ? state.accessories.join(', ') : 'Yok'}
- Kurulum: ${state.installation || '-'}
- Garanti: ${state.warranty || '-'}
- Tahmini Fiyat: ₺${state.calculatePrice().toLocaleString('tr-TR')}

Yardımcı olabilir misiniz?`
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  const toggleAccessory = (id: string) => {
    if (state.accessories.includes(id)) {
      state.updateField('accessories', state.accessories.filter(a => a !== id))
    } else {
      state.updateField('accessories', [...state.accessories, id])
    }
  }

  // Animation variants
  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <div className="flex flex-col lg:flex-row h-[100dvh] pt-[72px] lg:pt-[88px] bg-surface pb-0 overflow-hidden">
      
      {/* LEFT PANEL - CONFIGURATION STEPS (30%) */}
      <div className="w-full lg:w-[30%] h-full flex flex-col border-r border-border bg-background shadow-xl z-20">
        <div className="p-6 border-b border-border flex-shrink-0">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Adım {state.currentStep} / 14</p>
            <div className="flex gap-1">
              {[...Array(14)].map((_, i) => (
                <div key={i} className={`h-1 w-2 rounded-full ${i + 1 <= state.currentStep ? 'bg-primary' : 'bg-muted'}`} />
              ))}
            </div>
          </div>
          <h1 className="text-2xl font-light">
            {state.currentStep === 1 && 'Yerleşim Biçimi'}
            {state.currentStep === 2 && 'Koleksiyon'}
            {state.currentStep === 3 && 'Sistem Modeli'}
            {state.currentStep === 4 && 'Ölçülendirme'}
            {state.currentStep === 5 && 'Cam Tipi'}
            {state.currentStep === 6 && 'Cam Kalınlığı'}
            {state.currentStep === 7 && 'Profil Rengi'}
            {state.currentStep === 8 && 'Kapı Sistemi'}
            {state.currentStep === 9 && 'Açılım Yönü'}
            {state.currentStep === 10 && 'Kulp Seçimi'}
            {state.currentStep === 11 && 'Aksesuarlar'}
            {state.currentStep === 12 && 'Kurulum'}
            {state.currentStep === 13 && 'Garanti Paketleri'}
            {state.currentStep === 14 && 'Tasarım Özeti'}
          </h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Layout */}
            {state.currentStep === 1 && (
              <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="grid grid-cols-2 gap-4">
                {layouts.map(l => (
                  <button key={l.id} onClick={() => state.updateField('layout', l.id)}
                    className={`relative flex flex-col text-left overflow-hidden rounded-2xl border transition-all duration-300 ${state.layout === l.id ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/50'}`}>
                    <div className="aspect-[4/3] w-full bg-muted">
                      <img src={l.img} alt={l.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 bg-card">
                      <p className="font-medium text-sm">{l.name}</p>
                    </div>
                    {state.layout === l.id && <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1"><Check className="size-3" /></div>}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 2: Collection */}
            {state.currentStep === 2 && (
              <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-4">
                {collections.map(c => (
                  <button key={c.id} onClick={() => state.updateField('collection', c.id)}
                    className={`flex flex-col p-5 rounded-2xl border transition-all duration-300 ${state.collection === c.id ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}>
                    <div className="flex justify-between w-full mb-2">
                      <p className="font-medium text-lg">{c.name}</p>
                      {state.collection === c.id && <Check className="size-5 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground text-left">{c.price}</p>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 3: Model */}
            {state.currentStep === 3 && (
              <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-4">
                {models.map(m => (
                  <button key={m.id} onClick={() => state.updateField('model', m.id)}
                    className={`flex flex-col p-5 rounded-2xl border transition-all duration-300 ${state.model === m.id ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}>
                    <div className="flex justify-between w-full mb-2">
                      <p className="font-medium text-lg">{m.name}</p>
                      {state.model === m.id && <Check className="size-5 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground text-left">{m.desc}</p>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 4: Dimensions */}
            {state.currentStep === 4 && (
              <motion.div key="step4" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground">Genişlik (cm)</label>
                    <span className="text-lg font-light text-primary">{state.width} cm</span>
                  </div>
                  <input type="range" min="80" max="250" value={state.width} onChange={(e) => state.updateField('width', parseInt(e.target.value))} className="w-full accent-primary" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground">Yükseklik (cm)</label>
                    <span className="text-lg font-light text-primary">{state.height} cm</span>
                  </div>
                  <input type="range" min="190" max="240" step="5" value={state.height} onChange={(e) => state.updateField('height', parseInt(e.target.value))} className="w-full accent-primary" />
                </div>
                <div className="p-4 bg-muted/50 rounded-xl flex gap-3 text-sm text-muted-foreground">
                  <Info className="size-5 flex-shrink-0 text-primary" />
                  <p>Ölçüler yaklaşık maliyet hesaplamak içindir. Kesin ölçüler profesyonel keşif ekibimiz tarafından alınacaktır.</p>
                </div>
              </motion.div>
            )}

            {/* Step 5: Glass Type */}
            {state.currentStep === 5 && (
              <motion.div key="step5" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="grid grid-cols-2 gap-4">
                {glassTypes.map(g => (
                  <button key={g.id} onClick={() => state.updateField('glassType', g.id)}
                    className={`relative p-5 rounded-2xl border transition-all duration-300 text-left ${state.glassType === g.id ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}>
                    <p className="font-medium mb-1">{g.name}</p>
                    <p className="text-xs text-muted-foreground">{g.desc}</p>
                    {state.glassType === g.id && <div className="absolute top-3 right-3"><Check className="size-4 text-primary" /></div>}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 6: Glass Thickness */}
            {state.currentStep === 6 && (
              <motion.div key="step6" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-4">
                {['6mm Standart', '8mm Premium', '10mm Ultra Premium'].map(t => (
                  <button key={t} onClick={() => state.updateField('glassThickness', t)}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${state.glassThickness === t ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}>
                    <span className="font-medium">{t}</span>
                    {state.glassThickness === t && <Check className="size-5 text-primary" />}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 7: Profile Color */}
            {state.currentStep === 7 && (
              <motion.div key="step7" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="grid grid-cols-2 gap-4">
                {profileColors.map(p => (
                  <button key={p.id} onClick={() => state.updateField('profileColor', p.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${state.profileColor === p.id ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}>
                    <div className="w-8 h-8 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: p.hex }} />
                    <span className="font-medium text-sm">{p.name}</span>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 8-10 Grouped similarly to simplify */}
            {(state.currentStep === 8 || state.currentStep === 9 || state.currentStep === 10) && (
              <motion.div key={`step${state.currentStep}`} variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-4">
                {state.currentStep === 8 && ['Sürgülü', 'Pivot (Menteşeli)', 'Walk-in (Kapısız)'].map(d => (
                  <button key={d} onClick={() => state.updateField('doorSystem', d)} className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${state.doorSystem === d ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}>
                    <span className="font-medium">{d}</span>{state.doorSystem === d && <Check className="size-5 text-primary" />}
                  </button>
                ))}
                {state.currentStep === 9 && ['Sağdan Açılır', 'Soldan Açılır', 'Çift Yönlü', 'Sabit (Açılmaz)'].map(o => (
                  <button key={o} onClick={() => state.updateField('openingDirection', o)} className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${state.openingDirection === o ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}>
                    <span className="font-medium">{o}</span>{state.openingDirection === o && <Check className="size-5 text-primary" />}
                  </button>
                ))}
                {state.currentStep === 10 && ['Minimal Kulp', 'Modern Kulp', 'Kare Kulp', 'Gizli (Profil İçi)'].map(h => (
                  <button key={h} onClick={() => state.updateField('handleSelection', h)} className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${state.handleSelection === h ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}>
                    <span className="font-medium">{h}</span>{state.handleSelection === h && <Check className="size-5 text-primary" />}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 11: Accessories */}
            {state.currentStep === 11 && (
              <motion.div key="step11" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-4">
                {[
                  { id: 'nano', name: 'Nano Leke Tutmaz Kaplama', price: '₺750' },
                  { id: 'towel', name: 'Havlu Askısı', price: '₺450' },
                  { id: 'shelf', name: 'Cam Raf Entegre', price: '₺600' }
                ].map(a => (
                  <button key={a.id} onClick={() => toggleAccessory(a.id)}
                    className={`flex flex-col p-5 rounded-2xl border transition-all duration-300 ${state.accessories.includes(a.id) ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}>
                    <div className="flex justify-between w-full mb-2">
                      <span className="font-medium">{a.name}</span>
                      {state.accessories.includes(a.id) && <Check className="size-5 text-primary" />}
                    </div>
                    <span className="text-sm text-muted-foreground text-left">+{a.price}</span>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 12: Installation */}
            {state.currentStep === 12 && (
              <motion.div key="step12" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-4">
                {['Sadece Teslimat', 'Profesyonel Kurulum', 'Premium Kurulum (Hızlı)'].map(i => (
                  <button key={i} onClick={() => state.updateField('installation', i)} className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${state.installation === i ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}>
                    <span className="font-medium">{i}</span>{state.installation === i && <Check className="size-5 text-primary" />}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 13: Warranty */}
            {state.currentStep === 13 && (
              <motion.div key="step13" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-4">
                {['2 Yıl Standart Garanti', '5 Yıl Uzatılmış Garanti', '10 Yıl Premium Garanti'].map(w => (
                  <button key={w} onClick={() => state.updateField('warranty', w)} className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${state.warranty === w ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}>
                    <span className="font-medium">{w}</span>{state.warranty === w && <Check className="size-5 text-primary" />}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 14: Review */}
            {state.currentStep === 14 && (
              <motion.div key="step14" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-4">
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl space-y-4">
                  <h3 className="font-semibold text-lg text-primary mb-4">Tasarımınız Hazır</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Mimari kalitede, tamamen size özel olarak tasarlanan duşakabininiz üretime hazır. WhatsApp üzerinden bizimle iletişime geçerek anında sipariş oluşturabilir veya sorularınızı sorabilirsiniz.
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-border flex items-center justify-between bg-card flex-shrink-0">
          <Button variant="outline" onClick={state.prevStep} disabled={state.currentStep === 1}>
            <ChevronLeft className="size-4 mr-2" /> Geri
          </Button>
          <Button onClick={state.nextStep} disabled={state.currentStep === 14}>
            İleri <ChevronRight className="size-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* CENTER - 3D VISUALIZATION (45%) */}
      <div className="w-full lg:w-[45%] h-[40vh] lg:h-full relative flex items-center justify-center bg-surface-elevated overflow-hidden z-0 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-background to-transparent pointer-events-none" />
        <motion.div 
          key={`${state.layout}-${state.glassType}-${state.profileColor}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-[90%] max-w-lg aspect-[3/4] bg-white shadow-2xl rounded-3xl overflow-hidden border border-black/5"
        >
          {/* Dynamic Image logic */}
          <img 
            src={
              state.glassType === 'smoke' ? "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" :
              "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800&auto=format&fit=crop"
            } 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
            <div className="text-white">
              <p className="font-light text-xl mb-1">
                {state.collection ? collections.find(c=>c.id===state.collection)?.name : 'Tasarım Bekleniyor'}
              </p>
              <p className="text-sm opacity-80 font-light">
                {state.profileColor && profileColors.find(p=>p.id===state.profileColor)?.name} 
                {state.glassType && ` • ${glassTypes.find(g=>g.id===state.glassType)?.name} Cam`}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL - SUMMARY & PRICE (25%) */}
      <div className="w-full lg:w-[25%] h-full border-l border-border bg-background flex flex-col z-20 shadow-xl lg:overflow-hidden">
        <div className="p-8 flex-1 overflow-y-auto scrollbar-hide">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">Sipariş Özeti</h2>
          
          <div className="space-y-6 text-sm">
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
            <div className="flex justify-between items-center border-b border-border pb-4">
              <span className="text-muted-foreground">Cam</span>
              <span className="font-medium text-right">{glassTypes.find(g=>g.id===state.glassType)?.name || '-'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-4">
              <span className="text-muted-foreground">Profil Rengi</span>
              <span className="font-medium text-right">{profileColors.find(p=>p.id===state.profileColor)?.name || '-'}</span>
            </div>
          </div>
        </div>

        <div className="p-8 bg-surface-dark text-white rounded-t-[32px] mt-auto relative z-30">
          <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">Tahmini Tutar</p>
          <div className="flex items-end gap-2 mb-8">
            <span className="text-4xl font-light tracking-tight">₺{state.calculatePrice().toLocaleString('tr-TR')}</span>
            <span className="text-white/60 text-sm pb-1">+ KDV</span>
          </div>

          <a href={generateWhatsAppMessage()} target="_blank" rel="noreferrer" className="w-full block">
            <Button size="lg" className="w-full bg-champagne hover:bg-champagne/90 text-black font-semibold rounded-2xl shadow-lg shadow-champagne/20 h-14">
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
