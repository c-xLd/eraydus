import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';
import { Link } from 'react-router-dom';
import { Settings2 } from 'lucide-react';

export function ConfiguratorPreviewSection() {
  const { language } = useTranslation();
  
  return (
    <section className="py-32 px-6 bg-dark-bg text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">
              {language === 'tr' ? 'Vizyonunuz, Piksel Mükemmelliğinde.' : 'Your vision, pixel perfect.'}
            </h2>
            <p className="text-lg text-white/70 font-light mb-12 max-w-lg">
              {language === 'tr' 
                ? 'Banyonuz için mükemmel duşakabini tasarlamak için gelişmiş dijital yapılandırıcımızı kullanın. Gerçek zamanlı fiyatlandırma, sürpriz yok.'
                : 'Use our advanced digital configurator to build the perfect shower cabin for your bathroom. Real-time pricing, no surprises.'}
            </p>
            
            <Link to="/configurator" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover-lift">
              <Settings2 className="w-5 h-5" />
              {language === 'tr' ? 'Kendiniz Tasarlayın' : 'Design Yours'}
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Mockup of configurator UI */}
            <div className="glass-panel-dark rounded-[32px] p-6 md:p-8 aspect-square flex flex-col relative overflow-hidden">
              {/* Fake 3D view area */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#121212] to-[#2a2a2a] -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1000&auto=format&fit=crop" 
                alt="3D Preview" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
              />
              
              <div className="flex-1" />
              
              {/* Fake UI panels */}
              <div className="relative z-20 space-y-4">
                <div className="bg-black/50 backdrop-blur-md rounded-[20px] p-4 border border-white/10 flex justify-between items-center">
                  <span className="text-sm text-white/70">{language === 'tr' ? 'Cam Rengi' : 'Glass Color'}</span>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/90 ring-2 ring-white/20" />
                    <div className="w-6 h-6 rounded-full bg-black/60 border border-white/20" />
                    <div className="w-6 h-6 rounded-full bg-[#8B7355] border border-white/20" />
                  </div>
                </div>
                
                <div className="bg-black/50 backdrop-blur-md rounded-[20px] p-4 border border-white/10 flex justify-between items-center">
                  <span className="text-sm font-medium">{language === 'tr' ? 'Tahmini Tutar' : 'Estimated Total'}</span>
                  <span className="text-xl font-medium tracking-tight">₺12,500</span>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 md:-right-12 top-20 bg-white text-black px-6 py-3 rounded-full shadow-2xl font-medium text-sm hidden sm:block"
            >
              {language === 'tr' ? 'Gerçek Zamanlı 3D' : 'Real-time 3D'}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
