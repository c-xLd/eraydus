import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';

const HARDWARE = [
  { id: 'black', nameTr: 'Mat Siyah', nameEn: 'Matte Black', hex: '#1a1a1a', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop' },
  { id: 'chrome', nameTr: 'Krom', nameEn: 'Chrome', hex: '#e8e9eb', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1200&auto=format&fit=crop' },
  { id: 'gold', nameTr: 'Altın', nameEn: 'Gold', hex: '#D4AF37', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop' },
];

export function HardwareSection() {
  const { language } = useTranslation();
  const [activeHardware, setActiveHardware] = useState(HARDWARE[0]);

  return (
    <section className="py-32 px-6 bg-secondary-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              {language === 'tr' ? 'Premium Donanım' : 'Premium Hardware'}
            </h2>
            <p className="text-lg text-text-secondary font-light mb-12">
              {language === 'tr' 
                ? 'Paslanmaz çelik ve havacılık sınıfı alüminyum. Her bir menteşe ve kulp, ömür boyu kusursuz çalışması için test edilmiştir.' 
                : 'Stainless steel and aerospace-grade aluminum. Every hinge and handle is tested for a lifetime of flawless operation.'}
            </p>
            
            <div className="flex gap-4">
              {HARDWARE.map((hw) => (
                <button
                  key={hw.id}
                  onClick={() => setActiveHardware(hw)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all ${
                    activeHardware.id === hw.id ? 'bg-white shadow-lg' : 'hover:bg-white/50'
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-full border border-black/10 shadow-inner" 
                    style={{ backgroundColor: hw.hex }}
                  />
                  <span className="text-sm font-medium">
                    {language === 'tr' ? hw.nameTr : hw.nameEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-[500px] md:h-[700px] rounded-[32px] overflow-hidden bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHardware.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img 
                  src={activeHardware.img} 
                  alt={activeHardware.nameEn} 
                  className="w-full h-full object-cover filter brightness-90"
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
