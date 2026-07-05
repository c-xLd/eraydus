import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../i18n/useTranslation';

export default function About() {
  const { language } = useTranslation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="bg-primary-bg overflow-x-hidden">
      <Helmet>
        <title>{language === 'tr' ? 'Hakkımızda | ERAYDUŞ' : 'About | ERAYDUŞ'}</title>
      </Helmet>

      {/* Hero */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center bg-black text-white overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop" 
            alt="Craftsmanship" 
            className="w-full h-full object-cover opacity-60 grayscale"
          />
        </motion.div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-8xl font-medium tracking-tight mb-8"
          >
            {language === 'tr' ? 'Mühendisliğin Sükuneti' : 'Engineering Tranquility'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto"
          >
            {language === 'tr' 
              ? 'Biz duşakabin üretmiyoruz. Biz mimari mekanlar tasarlıyoruz.'
              : 'We do not build shower cabins. We design architectural spaces.'}
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="prose prose-xl prose-p:text-text-secondary prose-p:font-light prose-h2:font-medium prose-h2:tracking-tight prose-h2:text-4xl max-w-none text-center"
          >
            <h2>{language === 'tr' ? 'Felsefemiz' : 'Our Philosophy'}</h2>
            <p className="mt-8">
              {language === 'tr' 
                ? 'Erayduş, banyo deneyimini bir zorunluluktan bir lükse dönüştürmek amacıyla kuruldu. Kaliteli bir duşun, güne başlarken veya günü bitirirken zihni sıfırlama gücüne sahip olduğuna inanıyoruz.'
                : 'Erayduş was founded with the mission to transform the bathroom experience from a necessity into a luxury. We believe a quality shower has the power to reset the mind at the beginning or end of the day.'}
            </p>
            <p>
              {language === 'tr' 
                ? 'Tasarım anlayışımız sadelik ve kusursuzluğa dayanır. Her bir profil, her bir menteşe ve her bir cam plaka, uzun ömürlü olması için hassas bir şekilde üretilir.'
                : 'Our design philosophy is rooted in simplicity and perfection. Every profile, every hinge, and every glass plate is precision-manufactured for longevity.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-32 px-6 bg-secondary-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop" 
              alt="Materials" 
              className="rounded-[32px] w-full h-auto object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl font-medium tracking-tight mb-8">
              {language === 'tr' ? 'Tavizsiz Kalite' : 'Uncompromising Quality'}
            </h2>
            <p className="text-lg text-text-secondary font-light mb-8">
              {language === 'tr' 
                ? 'Sadece en iyi malzemeleri kullanıyoruz. Havacılık sınıfı alüminyum, 304 paslanmaz çelik ve ultra şeffaf temperli cam. Güzellik yüzeyde başlar, ancak dayanıklılık çekirdekte bulunur.'
                : 'We use only the finest materials. Aerospace-grade aluminum, 304 stainless steel, and ultra-clear tempered glass. Beauty starts on the surface, but durability is found in the core.'}
            </p>
            
            <div className="space-y-6">
              <div className="border-l-2 border-black pl-6 py-2">
                <h4 className="font-medium text-lg mb-2">{language === 'tr' ? 'Hassas Kesim' : 'Precision Cut'}</h4>
                <p className="text-text-secondary font-light">{language === 'tr' ? 'Milimetrik hata toleransı.' : 'Millimetric error tolerance.'}</p>
              </div>
              <div className="border-l-2 border-black pl-6 py-2">
                <h4 className="font-medium text-lg mb-2">{language === 'tr' ? 'Akıllı Kaplama' : 'Smart Coating'}</h4>
                <p className="text-text-secondary font-light">{language === 'tr' ? 'Su ve leke itici nano-teknoloji.' : 'Water and stain repellent nano-technology.'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
