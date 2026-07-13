'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, Info } from 'lucide-react'

type Model = {
  id: string
  title: string
  image_url: string
}

export function KumlamaClient({ initialModels }: { initialModels: Model[] }) {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-[1440px] mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Kumlama Cam Modelleri</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Mahremiyet ve estetiği bir araya getiren özel kumlama desenlerimizle duşakabininize kişisel bir dokunuş katın. İncelemek için görsellere tıklayabilirsiniz.
          </p>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {initialModels.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-surface border border-border/50 flex flex-col"
              onClick={() => setSelectedModel(model)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={model.image_url} 
                  alt={model.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="size-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <ZoomIn className="size-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold text-foreground">{model.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setSelectedModel(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedModel(null)
              }}
            >
              <X className="size-6" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col bg-surface"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 min-h-0 bg-black/5 relative">
                <img 
                  src={selectedModel.image_url} 
                  alt={selectedModel.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8 bg-surface border-t border-border flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedModel.title}</h3>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Info className="size-4" /> Standart ve özel ölçü camlara uygulanabilir.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
