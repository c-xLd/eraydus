import Image from 'next/image'
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export interface SandblastedModel {
  id: string
  title: string
  image_url: string
}

interface SandblastedModelsModalProps {
  isOpen: boolean
  onClose: () => void
  models: SandblastedModel[]
}

export default function SandblastedModelsModal({ isOpen, onClose, models }: SandblastedModelsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer pointer-events-auto"
          />

          {/* Modal Content - Draggable Bottom Sheet on Mobile, Dialog on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: "100%", scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: "100%", scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose()
              }
            }}
            className="relative w-full max-w-xl mx-0 sm:mx-4 bg-[#121212]/95 sm:border sm:border-white/10 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_-10px_50px_rgba(0,0,0,0.5)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden h-[85vh] sm:h-auto sm:max-h-[85vh] flex flex-col pointer-events-auto touch-none overscroll-contain"
          >
            {/* Top Bar / Notch for Mobile dragging feel */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full sm:hidden" />

            <div className="flex justify-between items-start mb-6 mt-4 sm:mt-0">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white">Kumlama Cam Desenleri</h3>
                <p className="text-xs text-muted-foreground mt-1">Lüks duşakabininiz için premium kumlama modellerimiz.</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer hidden sm:block"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Models Grid */}
            <div className="overflow-y-auto pr-1 flex-1 space-y-6 scrollbar-thin overscroll-contain">
              {models.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  Desenler yükleniyor...
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {models.map((model) => (
                    <div key={model.id} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] transition-colors hover:border-champagne/40">
                      <div className="relative aspect-[4/5] w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={model.image_url}
                          alt={model.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-xs font-semibold text-champagne">Desen Kodu: {model.title}</span>
                        </div>
                      </div>
                      <div className="p-3 text-center border-t border-white/5">
                        <span className="text-xs font-medium text-white/90">{model.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-center shrink-0">
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-xl bg-champagne text-black text-sm font-semibold hover:bg-champagne/90 transition-all duration-300 cursor-pointer w-full sm:w-auto shadow-[0_4px_20px_rgba(201,168,106,0.2)]"
              >
                Modelleri İnceledim
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
