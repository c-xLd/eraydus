import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';

export function SmartPricingSection() {
  const { language } = useTranslation();
  const [width, setWidth] = useState(120);
  const [height, setHeight] = useState(200);
  
  // Fake price calculation
  const basePrice = 8500;
  const sizeMultiplier = ((width * height) / (120 * 200));
  const estimatedPrice = Math.round(basePrice * sizeMultiplier);

  return (
    <section className="py-32 px-6 bg-primary-bg">
      <div className="max-w-5xl mx-auto bg-surface rounded-[32px] p-8 md:p-16 relative overflow-hidden">
        {/* Background decorative */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-black/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              {language === 'tr' ? 'Akıllı Fiyatlandırma' : 'Smart Pricing'}
            </h2>
            <p className="text-text-secondary font-light mb-12">
              {language === 'tr' 
                ? 'Ölçülerinizi girin ve projeniz için anında tahmini bir bütçe oluşturun. Sürpriz ek ücretler yok.' 
                : 'Enter your measurements and instantly generate an estimated budget for your project. No hidden fees.'}
            </p>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">{language === 'tr' ? 'Genişlik' : 'Width'}</label>
                  <span className="text-sm text-text-secondary">{width} cm</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="200" 
                  value={width} 
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full h-1 bg-divider rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">{language === 'tr' ? 'Yükseklik' : 'Height'}</label>
                  <span className="text-sm text-text-secondary">{height} cm</span>
                </div>
                <input 
                  type="range" 
                  min="180" 
                  max="220" 
                  value={height} 
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-1 bg-divider rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] flex flex-col justify-center items-center text-center">
            <span className="text-sm text-text-secondary font-medium uppercase tracking-wider mb-4">
              {language === 'tr' ? 'Tahmini Tutar' : 'Estimated Total'}
            </span>
            <motion.div 
              key={estimatedPrice}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-2"
            >
              ₺{estimatedPrice.toLocaleString('tr-TR')}
            </motion.div>
            <span className="text-sm text-text-secondary">
              {language === 'tr' ? 'Montaj dahil başlangıç fiyatı' : 'Starting price including installation'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
