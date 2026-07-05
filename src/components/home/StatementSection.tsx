import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';

export function StatementSection() {
  const { language } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="min-h-[80vh] flex items-center justify-center bg-primary-bg px-6 py-32 overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight leading-[1.1] text-text-primary">
          {language === 'tr' ? (
            <>
              Her Banyo<br/>
              Sıradan Bir Duşakabini<br/>
              <span className="text-text-secondary">Hak Etmez.</span>
            </>
          ) : (
            <>
              Not Every Bathroom<br/>
              Deserves<br/>
              <span className="text-text-secondary">An Ordinary Shower Cabin.</span>
            </>
          )}
        </h2>
      </motion.div>
    </section>
  );
}
