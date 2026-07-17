'use client'

import { motion } from 'framer-motion'
import { Shield, Gem, Ruler, Wrench, Award, Zap } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const reasons = [
  {
    icon: Shield,
    title: 'Hassas Üretim',
    description:
      'CNC teknolojisi ve lazer kesim ile milimetrik hassasiyette, kusursuz ürünler üretiyoruz.',
  },
  {
    icon: Gem,
    title: 'Premium Cam',
    description:
      '8mm temperli güvenlik camı, nano kaplama seçeneği ile yıllarca ilk günkü parlaklığını korur.',
  },
  {
    icon: Ruler,
    title: 'Özel Ölçü',
    description:
      'Her banyo farklıdır. Ölçülerinize özel üretim ile mükemmel uyum sağlıyoruz.',
  },
  {
    icon: Wrench,
    title: 'Profesyonel Montaj',
    description:
      'Uzman montaj ekibimiz, duşakabininizi titizlikle yerine monte eder ve test eder.',
  },
  {
    icon: Award,
    title: '10 Yıl Garanti',
    description:
      'Ürünlerimize olan güvenimizin kanıtı: 10 yıl üretici garantisi sunuyoruz.',
  },
  {
    icon: Zap,
    title: 'Hızlı Üretim',
    description:
      'Sipariş onayından sonra 7-10 iş günü içinde üretim ve teslimat gerçekleştiriyoruz.',
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
  hidden: { opacity: 0.01, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
}

export function WhyEraydusSection() {
  return (
    <section className="py-32 md:py-40 bg-surface ">
      <div className="container mx-auto px-6 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0.01, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, ease }}
            className="text-champagne text-sm font-medium tracking-widest uppercase mb-6 block"
          >
            Neden Erayduş?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight"
          >
            Farkımız, <span className="font-semibold">Detaylarda</span>
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative bg-background rounded-3xl p-10 border border-border/50 hover:border-champagne/30 hover:shadow-xl hover:shadow-champagne/5 transition-all duration-500"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center mb-8 group-hover:bg-champagne/10 transition-colors duration-500">
                  <Icon className="size-6 text-champagne" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-medium mb-3 tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>

                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-champagne/5 to-transparent rounded-tr-3xl rounded-bl-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
