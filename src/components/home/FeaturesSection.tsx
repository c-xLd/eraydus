import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';
import { Check, Settings, Shield, Maximize, Clock, PenTool } from 'lucide-react';

const FEATURES = [
  {
    icon: Settings,
    titleTr: 'Hassas Üretim',
    titleEn: 'Precision Manufacturing',
    descTr: 'Her profil ve menteşe, havacılık standartlarında toleranslarla üretilir.',
    descEn: 'Every profile and hinge is manufactured to aerospace standard tolerances.'
  },
  {
    icon: Shield,
    titleTr: 'Premium Cam',
    titleEn: 'Premium Glass',
    descTr: 'Güvenlik için temperlenmiş ve lekelere karşı nano-kaplama uygulanmış ultra şeffaf cam.',
    descEn: 'Ultra-clear glass, tempered for safety and nano-coated against stains.'
  },
  {
    icon: Maximize,
    titleTr: 'Özel Ölçüler',
    titleEn: 'Custom Measurements',
    descTr: 'Milimetrik doğrulukla sadece sizin banyonuz için özel olarak kesilir.',
    descEn: 'Cut specifically for your bathroom with millimeter accuracy.'
  },
  {
    icon: PenTool,
    titleTr: 'Profesyonel Montaj',
    titleEn: 'Professional Installation',
    descTr: 'Sertifikalı uzmanlarımız tarafından kusursuz ve temiz kurulum.',
    descEn: 'Flawless and clean installation by our certified experts.'
  },
  {
    icon: Check,
    titleTr: '10 Yıl Garanti',
    titleEn: '10 Year Warranty',
    descTr: 'Üretim hatalarına ve donanım arızalarına karşı tam kapsamlı koruma.',
    descEn: 'Comprehensive protection against manufacturing defects and hardware failures.'
  },
  {
    icon: Clock,
    titleTr: 'Hızlı Üretim',
    titleEn: 'Fast Production',
    descTr: 'Siparişten kuruluma sadece haftalar süren optimize edilmiş süreç.',
    descEn: 'Optimized process taking only weeks from order to installation.'
  }
];

export function FeaturesSection() {
  const { language } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 bg-secondary-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            {language === 'tr' ? 'Neden Erayduş?' : 'Why ERAYDUŞ?'}
          </h2>
          <p className="text-lg text-text-secondary font-light max-w-2xl mx-auto">
            {language === 'tr'
              ? 'Tavizsiz kalite, modern tasarım ve kusursuz mühendislik.'
              : 'Uncompromising quality, modern design, and flawless engineering.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group bg-primary-bg rounded-[24px] p-8 cursor-pointer transition-all duration-500 border border-divider hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-medium mb-4">
                    {language === 'tr' ? feature.titleTr : feature.titleEn}
                  </h3>
                  
                  <div className="overflow-hidden">
                    <motion.p
                      initial={false}
                      animate={{ height: isHovered ? 'auto' : '48px', opacity: isHovered ? 1 : 0.6 }}
                      className="text-text-secondary font-light"
                    >
                      {language === 'tr' ? feature.descTr : feature.descEn}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
