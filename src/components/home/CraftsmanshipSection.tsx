import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CraftsmanshipSection() {
  const { language } = useTranslation();

  return (
    <section className="py-32 px-6 bg-secondary-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left: Large photography */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[600px] md:h-[800px] rounded-[32px] overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000&auto=format&fit=crop" 
              alt="Craftsmanship" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* Right: Story */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-text-secondary mb-6">
              {language === 'tr' ? 'Mühendislik Harikası' : 'Engineering Excellence'}
            </h2>
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
              {language === 'tr' 
                ? 'Hassasiyetle Üretildi. Uzun Süre Dayanacak Şekilde Tasarlandı.' 
                : 'Crafted with Precision. Built to Last.'}
            </h3>
            
            <div className="space-y-6 text-lg text-text-secondary font-light">
              <p>
                {language === 'tr'
                  ? 'Üretim sürecimiz, milimetrik hassasiyetle kesilmiş ve banyonuza özel olarak şekillendirilmiş en kaliteli havacılık sınıfı alüminyum ve temperli cam ile başlar.'
                  : 'Our manufacturing process begins with the finest aerospace-grade aluminum and tempered glass, cut to millimeter precision and contoured specifically for your bathroom.'}
              </p>
              <p>
                {language === 'tr'
                  ? 'Görünmez mıknatıslı fitiller, el yapımı detaylar ve suyu iten nano-kaplama gibi inovatif mühendislik çözümleri ile duşakabin deneyimini yeniden tanımlıyoruz.'
                  : 'We redefine the shower experience with innovative engineering solutions like invisible magnetic seals, hand-finished details, and water-repellent nano-coatings.'}
              </p>
            </div>

            <div className="mt-12">
              <Link to="/about" className="group inline-flex items-center gap-2 text-text-primary font-medium border-b border-black pb-1 hover:text-text-secondary hover:border-text-secondary transition-colors">
                {language === 'tr' ? 'Kalitemizi Keşfedin' : 'Discover Quality'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
