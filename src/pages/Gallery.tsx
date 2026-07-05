import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../i18n/useTranslation';
import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';

const IMAGES = [
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585058177051-64d50bb54ec1?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604709177225-055f99402ea3?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop'
];

export default function Gallery() {
  const { language } = useTranslation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary-bg min-h-screen pt-32 pb-32">
      <Helmet>
        <title>{language === 'tr' ? 'Galeri | ERAYDUŞ' : 'Gallery | ERAYDUŞ'}</title>
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="mb-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight mb-6">
            {language === 'tr' ? 'İlham Galerisi' : 'Inspiration Gallery'}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light">
            {language === 'tr' 
              ? 'Tasarım detaylarını, cam teknolojilerini ve premium donanımları keşfedin.' 
              : 'Discover design details, glass technologies, and premium hardware.'}
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="relative group rounded-[24px] overflow-hidden break-inside-avoid bg-surface"
            >
              <img 
                src={img} 
                alt={`Gallery ${i}`} 
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5 text-black" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
