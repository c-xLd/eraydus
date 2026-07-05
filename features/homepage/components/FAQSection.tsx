'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Ölçü alma işlemi nasıl gerçekleştiriliyor?',
    answer:
      'Profesyonel ölçüm ekibimiz, randevu oluşturmanızın ardından banyonuza gelerek lazer ölçüm cihazıyla milimetrik hassasiyette ölçüm yapar. Zemin eğimleri, duvar düzgünlükleri ve su tesisatı konumları dahil tüm detaylar kayıt altına alınır. Bu hizmet İstanbul genelinde ücretsizdir.',
  },
  {
    question: 'Üretim süresi ne kadar?',
    answer:
      'Sipariş onayı ve ölçüm tamamlandıktan sonra standart üretim süremiz 7-10 iş günüdür. Özel tasarım ve kaplamalar için bu süre 12-15 iş gününe uzayabilir. Acil projeler için ekspres üretim seçeneğimiz de mevcuttur.',
  },
  {
    question: 'Garanti kapsamı neleri içeriyor?',
    answer:
      'Tüm ürünlerimiz 10 yıl üretici garantisi kapsamındadır. Bu garanti; cam bütünlüğü, profil korozyonu, menteşe ve rulman mekanizmaları ile su sızdırmazlık contalarını kapsar. Garanti süresince ücretsiz servis ve yedek parça desteği sunulmaktadır.',
  },
  {
    question: 'Montaj işlemi ne kadar sürer?',
    answer:
      'Deneyimli montaj ekibimiz, standart bir duşakabin montajını 3-4 saat içinde tamamlar. Montaj sırasında banyonuzda herhangi bir hasar oluşmaması için gerekli tüm koruma önlemleri alınır. Montaj sonrası su testi yapılarak sızdırmazlık kontrol edilir.',
  },
  {
    question: 'Hangi cam seçenekleri mevcut?',
    answer:
      'Koleksiyonumuzda 8mm ve 10mm kalınlığında temperli güvenlik camları sunuyoruz. Renk seçenekleri arasında şeffaf, füme, bronz, buzlu ve mat cam bulunmaktadır. Ayrıca tüm camlarımıza opsiyonel nano kaplama uygulanabilir; bu kaplama su ve kireç tutmayı %90 oranında azaltır.',
  },
  {
    question: 'Fiyatlandırma nasıl belirleniyor?',
    answer:
      'Fiyatlarımız; seçilen model serisi, duşakabin ölçüleri, cam tipi, profil rengi ve ek aksesuar tercihlerine göre belirlenir. Online konfigüratörümüz üzerinden anlık fiyat alabilir veya ücretsiz keşif hizmetimizden yararlanabilirsiniz. Taksitli ödeme seçeneklerimiz de mevcuttur.',
  },
]

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      className="border-b border-border last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-6 py-7 md:py-8 text-left group"
      >
        <span className="text-lg md:text-xl font-medium tracking-tight group-hover:text-champagne transition-colors">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease }}
          className="flex-shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-champagne/40 transition-colors"
        >
          <Plus className="size-5 text-muted-foreground group-hover:text-champagne transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground leading-relaxed pb-8 pr-16 max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  return (
    <section className="py-32 md:py-40 bg-surface overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left — Header */}
          <div className="lg:col-span-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-champagne text-sm font-medium tracking-widest uppercase mb-6 block"
            >
              SSS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="text-4xl md:text-5xl font-light tracking-tight mb-6 leading-[1.1]"
            >
              Sıkça Sorulan{' '}
              <span className="font-semibold">Sorular</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="text-muted-foreground leading-relaxed"
            >
              Merak ettiğiniz her şeyin cevabını burada bulabilirsiniz.
              Aradığınız bilgiyi bulamadıysanız bizimle iletişime geçmekten
              çekinmeyin.
            </motion.p>
          </div>

          {/* Right — Accordion */}
          <div className="lg:col-span-8">
            <div className="border-t border-border">
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
