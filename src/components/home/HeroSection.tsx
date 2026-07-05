import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const { t, language } = useTranslation();

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black flex flex-col justify-center items-center">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1620626011761-9ea0184404d5?q=80&w=2500&auto=format&fit=crop" 
          alt="Luxury Bathroom" 
          className="w-full h-full object-cover opacity-80 scale-105 transform origin-center animate-slow-pan"
        />
      </div>

      <div className="relative z-20 container mx-auto px-6 text-center text-white flex flex-col items-center mt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-sans tracking-tight font-medium mb-6 max-w-5xl"
        >
          {language === 'tr' ? (
            <>
              Hayalinizdeki Duşakabin.<br/>
              Size Özel Üretilir.
            </>
          ) : (
            <>
              Luxury.<br/>
              Crafted Around Your Space.
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/80 max-w-2xl font-light mb-12"
        >
          {language === 'tr' 
            ? 'Hassas mühendislik ve zamansız estetikle banyonuz için özel olarak tasarlanmış premium duşakabinler.' 
            : 'Premium custom shower cabins designed specifically for your bathroom with precision engineering and timeless aesthetics.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link to="/configurator" className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover-lift">
            {language === 'tr' ? 'Tasarlamaya Başla' : 'Start Designing'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/shop" className="group flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-medium hover-lift hover:bg-white/20 transition-colors">
            {language === 'tr' ? 'Koleksiyonu Keşfet' : 'Explore Collection'}
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 text-sm tracking-[0.2em] uppercase font-medium"
      >
        <span>{language === 'tr' ? 'KEŞFETMEK İÇİN KAYDIRIN' : 'SCROLL TO DISCOVER'}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
