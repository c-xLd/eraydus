import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SHOWCASE_PRODUCTS = [
  {
    id: 1,
    name: 'Aura Frameless',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop',
    descTr: 'Minimalist çerçevesiz tasarım, maksimum ferahlık.',
    descEn: 'Minimalist frameless design for maximum spaciousness.'
  },
  {
    id: 2,
    name: 'Nexus Sliding',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1000&auto=format&fit=crop',
    descTr: 'Kusursuz kayar kapı mekanizması, mat siyah profiller.',
    descEn: 'Flawless sliding mechanism with matte black profiles.'
  },
  {
    id: 3,
    name: 'Lumina Pivot',
    image: 'https://images.unsplash.com/photo-1620626011761-9ea0184404d5?q=80&w=1000&auto=format&fit=crop',
    descTr: 'Zarif pivot menteşeler ile mimari bir duruş.',
    descEn: 'Architectural stance with elegant pivot hinges.'
  },
  {
    id: 4,
    name: 'Zenith Walk-In',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
    descTr: 'Sınırsız bir duş deneyimi için açık tasarım.',
    descEn: 'Open design for an unbounded shower experience.'
  }
];

export function ProductShowcaseSection() {
  const { language } = useTranslation();
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-primary-bg">
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center overflow-hidden py-24">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
            {language === 'tr' ? 'Koleksiyonlar' : 'The Collections'}
          </h2>
          <p className="text-lg text-text-secondary mt-4 max-w-xl font-light">
            {language === 'tr' 
              ? 'Her bir serimiz, banyonuza mükemmel uyum sağlamak için mimari ilkeler gözetilerek tasarlanmıştır.' 
              : 'Each of our series is designed with architectural principles in mind to perfectly complement your bathroom.'}
          </p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 pb-12 w-[max-content]">
          {SHOWCASE_PRODUCTS.map((product, index) => (
            <div key={product.id} className="relative w-[300px] md:w-[450px] lg:w-[600px] h-[500px] md:h-[600px] group rounded-[32px] overflow-hidden bg-surface flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-white">
                <span className="text-sm font-medium tracking-wider uppercase opacity-80 mb-2 block">
                  0{index + 1}
                </span>
                <h3 className="text-3xl md:text-4xl font-medium mb-4">{product.name}</h3>
                <p className="text-white/70 mb-8 max-w-sm font-light">
                  {language === 'tr' ? product.descTr : product.descEn}
                </p>
                
                <Link to={`/configurator?model=${product.name.split(' ')[0].toLowerCase()}`} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                  {language === 'tr' ? 'Yapılandır' : 'Configure'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
