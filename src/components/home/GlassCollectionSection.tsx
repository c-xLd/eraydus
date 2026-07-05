import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';

const GLASS_TYPES = [
  { id: 'clear', nameTr: 'Şeffaf', nameEn: 'Clear', color: 'bg-white/10', overlay: 'bg-white/0 backdrop-blur-none' },
  { id: 'smoke', nameTr: 'Füme', nameEn: 'Smoke', color: 'bg-black/60', overlay: 'bg-black/40 backdrop-blur-[2px]' },
  { id: 'bronze', nameTr: 'Bronz', nameEn: 'Bronze', color: 'bg-[#8B7355]', overlay: 'bg-[#8B7355]/30 backdrop-blur-[2px]' },
  { id: 'fluted', nameTr: 'Çizgili', nameEn: 'Fluted', color: 'bg-white/40', overlay: 'bg-white/20 backdrop-blur-sm bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=")]' },
  { id: 'matte', nameTr: 'Mat', nameEn: 'Matte', color: 'bg-white/80', overlay: 'bg-white/60 backdrop-blur-md' },
];

export function GlassCollectionSection() {
  const { language } = useTranslation();
  const [activeGlass, setActiveGlass] = useState(GLASS_TYPES[0]);

  return (
    <section className="py-32 px-6 bg-primary-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            {language === 'tr' ? 'Cam Koleksiyonu' : 'Glass Collection'}
          </h2>
          <p className="text-lg text-text-secondary font-light max-w-2xl mx-auto">
            {language === 'tr' 
              ? 'Işığı, mahremiyeti ve mimari estetiği şekillendiren premium cam seçeneklerimiz.' 
              : 'Our premium glass selections that shape light, privacy, and architectural aesthetics.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 flex flex-col gap-4">
            {GLASS_TYPES.map((glass) => (
              <button
                key={glass.id}
                onClick={() => setActiveGlass(glass)}
                className={`group flex items-center justify-between p-6 rounded-[24px] border transition-all duration-300 ${
                  activeGlass.id === glass.id 
                    ? 'border-black bg-black text-white' 
                    : 'border-divider hover:border-black/30 bg-transparent text-text-primary'
                }`}
              >
                <span className="text-lg font-medium">
                  {language === 'tr' ? glass.nameTr : glass.nameEn}
                </span>
                <div className={`w-8 h-8 rounded-full border ${glass.color} ${activeGlass.id === glass.id ? 'border-white/20' : 'border-black/10'}`} />
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 relative h-[600px] rounded-[32px] overflow-hidden bg-surface">
            {/* Background Image representing the bathroom */}
            <img 
              src="https://images.unsplash.com/photo-1620626011761-9ea0184404d5?q=80&w=2000&auto=format&fit=crop" 
              alt="Bathroom" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Glass Overlay Simulation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGlass.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className={`absolute inset-0 right-1/3 ${activeGlass.overlay} border-r border-white/20 shadow-2xl`}
              >
                {/* Simulated Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-50" />
              </motion.div>
            </AnimatePresence>
            
            {/* Floating label */}
            <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium shadow-lg">
              {language === 'tr' ? activeGlass.nameTr : activeGlass.nameEn} Cam
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
