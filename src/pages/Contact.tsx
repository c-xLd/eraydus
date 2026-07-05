import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../i18n/useTranslation';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Contact() {
  const { language } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary-bg min-h-screen pt-32 pb-32">
      <Helmet>
        <title>{language === 'tr' ? 'İletişim | ERAYDUŞ' : 'Contact | ERAYDUŞ'}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight mb-8"
          >
            {language === 'tr' ? 'Mimari Danışmanlık' : 'Architectural Consultation'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-text-secondary font-light"
          >
            {language === 'tr' 
              ? 'Projeniz için uzman ekibimizle iletişime geçin. Size özel çözümler üretmek için buradayız.'
              : 'Connect with our expert team for your project. We are here to create custom solutions for you.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-surface p-12 rounded-[32px]"
          >
            <h2 className="text-2xl font-medium mb-8">
              {language === 'tr' ? 'Bize Ulaşın' : 'Get in Touch'}
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{language === 'tr' ? 'Adınız' : 'Your Name'}</label>
                  <input type="text" className="w-full bg-white border border-divider rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{language === 'tr' ? 'Soyadınız' : 'Last Name'}</label>
                  <input type="text" className="w-full bg-white border border-divider rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">{language === 'tr' ? 'E-posta' : 'Email Address'}</label>
                <input type="email" className="w-full bg-white border border-divider rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{language === 'tr' ? 'Proje Detayları' : 'Project Details'}</label>
                <textarea rows={4} className="w-full bg-white border border-divider rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors"></textarea>
              </div>

              <button className="w-full bg-black text-white rounded-full py-4 font-medium hover:bg-black/90 transition-colors flex items-center justify-center gap-2">
                {language === 'tr' ? 'Mesaj Gönder' : 'Send Message'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-text-secondary mb-6">
                {language === 'tr' ? 'Concierge Servisi' : 'Concierge Service'}
              </h3>
              <div className="flex items-center gap-4 text-lg">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:+905555555555" className="font-medium hover:text-text-secondary transition-colors">+90 (555) 555 55 55</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-text-secondary mb-6">
                {language === 'tr' ? 'Elektronik Posta' : 'Electronic Mail'}
              </h3>
              <div className="flex items-center gap-4 text-lg">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:hello@eraydus.com" className="font-medium hover:text-text-secondary transition-colors">hello@eraydus.com</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-text-secondary mb-6">
                {language === 'tr' ? 'Showroom' : 'Showroom'}
              </h3>
              <div className="flex items-start gap-4 text-lg">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="font-medium leading-relaxed">
                  Mimari Tasarım Merkezi<br />
                  Levent, Büyükdere Cd. No:1<br />
                  Beşiktaş, İstanbul
                </p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-divider">
              <a href="https://wa.me/905555555555" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#25D366] font-medium hover:underline">
                {language === 'tr' ? 'WhatsApp üzerinden hızlı iletişim' : 'Fast communication via WhatsApp'} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
