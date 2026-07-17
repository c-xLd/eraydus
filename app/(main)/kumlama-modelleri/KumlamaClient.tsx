'use client'

import { useState } from 'react'
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Kumlama Cam Modelleri</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Mahremiyet ve estetiği bir araya getiren özel kumlama desenlerimizle duşakabininize kişisel bir dokunuş katın. İncelemek için görsellere tıklayabilirsiniz.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {initialModels.map((model) => (
            <div
              key={model.id}
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
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / Zoom Modal */}
      {selectedModel && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 md:p-10 animate-in fade-in duration-200"
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

          <div
            className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col bg-surface animate-in zoom-in-95 slide-in-from-bottom-2 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 min-h-0 bg-black/5 relative flex items-center justify-center p-8">
              <img
                src={selectedModel.image_url}
                alt={selectedModel.title}
                className="max-w-full max-h-full object-contain drop-shadow-xl"
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
          </div>
        </div>
      )}
    </div>
  )
}
