'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface GlassType {
  id: string
  name: string
  description: string
  overlay: string
  opacity: number
}

const glassTypes: GlassType[] = [
  {
    id: 'seffaf',
    name: 'Şeffaf',
    description: 'Kristal berraklığında, mekâna ferahlık katan klasik tercih.',
    overlay: 'bg-transparent',
    opacity: 0,
  },
  {
    id: 'fume',
    name: 'Füme',
    description: 'Sofistike koyu ton, mahremiyeti zarafetle buluşturur.',
    overlay: 'bg-gray-900',
    opacity: 0.45,
  },
  {
    id: 'bronz',
    name: 'Bronz',
    description: 'Sıcak tonlarıyla banyonuza lüks bir atmosfer katar.',
    overlay: 'bg-amber-800',
    opacity: 0.35,
  },
  {
    id: 'buzlu',
    name: 'Buzlu',
    description: 'Işık geçirgenliğini korurken tam mahremiyet sağlar.',
    overlay: 'bg-white',
    opacity: 0.55,
  },
  {
    id: 'mat',
    name: 'Mat',
    description: 'Pürüzsüz yüzeyi ile modern ve minimal bir görünüm sunar.',
    overlay: 'bg-gray-300',
    opacity: 0.5,
  },
  {
    id: 'nano',
    name: 'Nano',
    description: 'Nano kaplama teknolojisi ile su ve kireç tutmayan yüzey.',
    overlay: 'bg-sky-200',
    opacity: 0.15,
  },
]

export function GlassCollectionSection() {
  const [selected, setSelected] = useState(glassTypes[0])

  return (
    <section className="py-32 md:py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="text-champagne text-sm font-medium tracking-widest uppercase mb-6 block"
          >
            Malzeme Seçimi
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight"
          >
            Cam <span className="font-semibold">Koleksiyonu</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start"
        >
          {/* Preview — 3 columns */}
          <div className="lg:col-span-3 relative aspect-[4/3] rounded-3xl overflow-hidden bg-surface">
            <img
              src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop"
              alt="Duşakabin cam önizlemesi"
              className="w-full h-full object-cover"
            />
            {/* Glass overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: selected.opacity }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease }}
                className={`absolute inset-0 ${selected.overlay}`}
              />
            </AnimatePresence>

            {/* Label */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <p className="text-white text-2xl font-light mb-1">
                    {selected.name} Cam
                  </p>
                  <p className="text-white/70 text-sm">
                    {selected.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Selector — 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase mb-4">
              Cam Tipini Seçin
            </p>
            {glassTypes.map((glass) => (
              <button
                key={glass.id}
                onClick={() => setSelected(glass)}
                className={`group relative w-full text-left rounded-2xl p-6 border transition-all duration-300 ${
                  selected.id === glass.id
                    ? 'bg-foreground text-background border-foreground shadow-lg'
                    : 'bg-background border-border hover:border-champagne/40 hover:bg-surface'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-lg font-medium mb-1 ${
                        selected.id === glass.id
                          ? 'text-background'
                          : 'text-foreground'
                      }`}
                    >
                      {glass.name}
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${
                        selected.id === glass.id
                          ? 'text-background/70'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {glass.description}
                    </p>
                  </div>
                  {/* Selection indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ml-4 flex items-center justify-center transition-all duration-300 ${
                      selected.id === glass.id
                        ? 'border-champagne bg-champagne'
                        : 'border-border'
                    }`}
                  >
                    {selected.id === glass.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-foreground"
                      />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
