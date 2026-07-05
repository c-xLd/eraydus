import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../i18n/useTranslation';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    id: 1,
    questionTr: 'Özel ölçü üretim yapıyor musunuz?',
    questionEn: 'Do you manufacture custom sizes?',
    answerTr: 'Evet, tüm kabinlerimiz banyonuzun mimari yapısına ve ölçülerine göre özel olarak milimetrik hassasiyetle üretilmektedir. Üretime başlamadan önce profesyonel ekibimiz yerinde ölçüm yapmaktadır.',
    answerEn: 'Yes, all our cabins are custom-manufactured with millimeter precision according to your bathroom\'s architecture and dimensions. Our professional team takes on-site measurements before production.'
  },
  {
    id: 2,
    questionTr: 'Siparişten sonra teslimat süresi nedir?',
    questionEn: 'What is the delivery time after order?',
    answerTr: 'Standart konfigürasyonlar için teslimat ve montaj süremiz 14 iş günüdür. Özel cam ve profil renkleri gerektiren butik projelerde bu süre 21-28 iş gününe kadar çıkabilmektedir.',
    answerEn: 'Delivery and installation time for standard configurations is 14 business days. For boutique projects requiring custom glass and profile colors, this period can extend up to 21-28 business days.'
  },
  {
    id: 3,
    questionTr: 'Nano cam teknolojisi nedir ve ne işe yarar?',
    questionEn: 'What is nano glass technology and what does it do?',
    answerTr: 'Nano cam, yüzeyine özel bir moleküler kaplama uygulanmış camdır. Bu kaplama, suyun ve sabun artıklarının cam yüzeyine tutunmasını zorlaştırarak kireç oluşumunu engeller ve temizliği büyük ölçüde kolaylaştırır.',
    answerEn: 'Nano glass is treated with a special molecular coating on its surface. This coating makes it difficult for water and soap residue to adhere to the glass, preventing limescale buildup and making cleaning much easier.'
  },
  {
    id: 4,
    questionTr: 'Montaj hizmeti Türkiye\'nin her yerine veriliyor mu?',
    questionEn: 'Do you provide installation services everywhere in Turkey?',
    answerTr: 'Şu an için doğrudan montaj hizmetimizi İstanbul, Ankara, İzmir, Bursa ve Antalya bölgelerinde kendi profesyonel ekiplerimizle sunuyoruz. Diğer bölgeler için yetkili partnerlerimiz aracılığıyla destek sağlamaktayız.',
    answerEn: 'Currently, we provide direct installation services with our own professional teams in Istanbul, Ankara, Izmir, Bursa, and Antalya. For other regions, we provide support through our authorized partners.'
  },
  {
    id: 5,
    questionTr: 'Garanti süresi ne kadar?',
    questionEn: 'What is the warranty period?',
    answerTr: 'Tüm duşakabin sistemlerimiz, cam kırılması (kullanıcı hatası hariç), profil deformasyonu ve sızdırmazlık sorunlarına karşı 5 yıl ERAYDUŞ kapsamlı garantisi altındadır. Kullanılan donanımlar ise ömür boyu yedek parça garantisine sahiptir.',
    answerEn: 'All our shower cabin systems are covered by a 5-year comprehensive ERAYDUŞ warranty against glass breakage (excluding user error), profile deformation, and sealing issues. The hardware used comes with a lifetime spare parts guarantee.'
  }
];

export default function FAQ() {
  const { language } = useTranslation();
  const [openId, setOpenId] = useState<number | null>(1);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary-bg min-h-screen pt-32 pb-32">
      <Helmet>
        <title>{language === 'tr' ? 'SSS | ERAYDUŞ' : 'FAQ | ERAYDUŞ'}</title>
      </Helmet>
      
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6">
            {language === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-text-secondary text-lg font-light">
            {language === 'tr' 
              ? 'Sistemlerimiz, kurulum süreçleri ve satış sonrası destek hakkında bilmeniz gerekenler.' 
              : 'Everything you need to know about our systems, installation processes, and after-sales support.'}
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`border rounded-[20px] transition-colors duration-300 ${isOpen ? 'bg-white border-black/10 shadow-sm' : 'bg-transparent border-black/5 hover:border-black/10'}`}
              >
                <button
                  className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span className="font-medium text-lg pr-8">
                    {language === 'tr' ? faq.questionTr : faq.questionEn}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-black text-white' : 'bg-black/5 text-black'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-2 text-text-secondary font-light leading-relaxed">
                        {language === 'tr' ? faq.answerTr : faq.answerEn}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
        <div className="mt-20 p-10 bg-surface rounded-[32px] text-center">
          <h3 className="text-xl font-medium mb-4">
             {language === 'tr' ? 'Başka bir sorunuz mu var?' : 'Have another question?'}
          </h3>
          <p className="text-text-secondary mb-8 font-light">
             {language === 'tr' ? 'Mimari destek ekibimiz size yardımcı olmaktan memnuniyet duyar.' : 'Our architectural support team would be happy to help you.'}
          </p>
          <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors">
            {language === 'tr' ? 'İletişime Geçin' : 'Contact Us'}
          </a>
        </div>
      </div>
    </div>
  );
}
