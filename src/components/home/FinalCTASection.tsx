import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';
import { Link } from 'react-router-dom';

export function FinalCTASection() {
  const { language } = useTranslation();

  return (
    <section className="relative py-48 px-6 bg-black text-white overflow-hidden flex items-center justify-center text-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1620626011761-9ea0184404d5?q=80&w=2500&auto=format&fit=crop" 
          alt="Luxury Bathroom" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight mb-12"
        >
          {language === 'tr' 
            ? 'Mükemmel Duşakabininizi Tasarlamaya Hazır mısınız?' 
            : 'Ready to Design Your Perfect Shower Cabin?'}
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link to="/configurator" className="bg-white text-black px-10 py-5 rounded-full font-medium hover-lift">
            {language === 'tr' ? 'Yapılandırıcıyı Başlat' : 'Start Configurator'}
          </Link>
          <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-medium hover-lift hover:bg-white/20 transition-colors">
            {language === 'tr' ? 'WhatsApp ile İletişime Geç' : 'Contact via WhatsApp'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
