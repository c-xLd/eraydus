import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';

const IMAGES = [
  "https://images.unsplash.com/photo-1620626011761-9ea0184404d5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop"
];

export function GallerySection() {
  const { language } = useTranslation();

  return (
    <section className="py-32 px-6 bg-secondary-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            {language === 'tr' ? 'Mimari İlham' : 'Architectural Inspiration'}
          </h2>
        </div>

        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {IMAGES.map((src, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="relative group rounded-[24px] overflow-hidden break-inside-avoid"
            >
              <img src={src} alt="Gallery" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white font-medium border border-white/30 px-6 py-2 rounded-full backdrop-blur-md">
                  {language === 'tr' ? 'Projeyi İncele' : 'View Project'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
