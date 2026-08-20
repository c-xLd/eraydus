'use client'

import { motion } from 'framer-motion'
import { Shield, Gem, Ruler, Wrench, Award, Zap } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const reasons = [
  {
    icon: Ruler,
    title: 'Banyonuza Özel Ölçü',
    description:
      'Standart ölçülere sıkışmadan banyonuzun girinti, eğim ve yüksekliğine %100 tam uyan özel imalat yapıyoruz.',
  },
  {
    icon: Gem,
    title: 'Kırılmaya Dayanıklı Cam',
    description:
      '6mm darbelere dayanıklı temperli güvenlik camları kullanıyor, aileniz için yüksek emniyet sağlıyoruz.',
  },
  {
    icon: Shield,
    title: 'Paslanmaz Çelik & Profil',
    description:
      'Nem ve sudan etkilenmeyen paslanmaz çelik aksam ve dayanıklı alüminyum profiller ile uzun ömürlü kullanım.',
  },
  {
    icon: Zap,
    title: 'Ücretsiz Keşif & Ölçü',
    description:
      'Ankara genelinde adresinize ücretsiz gelerek milimetrik ölçü alıyor ve banyonuza en uygun modeli belirliyoruz.',
  },
  {
    icon: Wrench,
    title: 'Uzman Ekiple Montaj',
    description:
      'Kendi bünyemizdeki deneyimli ustalarımızla banyonuzda temiz, hızlı ve sağlam şekilde kurulum gerçekleştiriyoruz.',
  },
  {
    icon: Award,
    title: '2 Yıl Tam Garanti',
    description:
      'Tüm duşakabin modellerimizde imalat ve montaj hatalarına karşı 2 yıl koşulsuz üretici garantisi sunuyoruz.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { y: 25 },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease },
  },
}

export function WhyEraydusSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-surface relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <motion.span
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, ease }}
            className="text-champagne text-xs font-semibold tracking-widest uppercase mb-3 sm:mb-4 block"
          >
            Neden Erayduş?
          </motion.span>
          <motion.h2
            initial={{ y: 25 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-foreground"
          >
            Banyonuz İçin <span className="font-semibold">Doğru Seçim</span>
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '200px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative bg-background rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-border/50 hover:border-champagne/30 hover:shadow-xl hover:shadow-champagne/5 transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-surface flex items-center justify-center mb-5 sm:mb-6 lg:mb-8 group-hover:bg-champagne/10 transition-colors duration-500">
                    <Icon className="size-5 sm:size-6 text-champagne" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-medium mb-2.5 sm:mb-3 tracking-tight text-foreground">
                    {reason.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-champagne/5 to-transparent rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
