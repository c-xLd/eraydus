'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Droplets, Ruler, Shield, Wind } from 'lucide-react'

interface InspirationSectionProps {
  productCount?: number
  mainImage?: string
  secondaryImage?: string
}

export function InspirationSection({
  productCount = 0,
  mainImage = 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/fume.jpeg',
}: InspirationSectionProps) {

  const features = [
    {
      icon: <Droplets className="w-5 h-5" />,
      title: 'Nano Teknolojili Camlar',
      desc: 'Su ve kireç tutmayan özel yüzey işlemi ile duşakabininiz her zaman ilk günkü gibi temiz ve parlak kalır.',
    },
    {
      icon: <Wind className="w-5 h-5" />,
      title: 'Sessiz Rulman Sistemi',
      desc: 'Geliştirilmiş amortisörlü ve teflon kaplamalı tekerlekler sayesinde pürüzsüz ve sıfır ses ile açılıp kapanma.',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: '%100 Paslanmaz Profil',
      desc: 'Banyo nemine karşı ekstra dirençli, yüksek kaliteli alüminyum ve paslanmaz çelik alaşımlı iskelet yapısı.',
    },
    {
      icon: <Ruler className="w-5 h-5" />,
      title: 'Milimetrik Özel Üretim',
      desc: 'Banyonuzun mimari yapısı ve ölçülerine birebir uyum sağlayan, tamamen kişiselleştirilebilir kesimler.',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white text-black relative overflow-hidden border-y border-black/5">
      <div className="container max-w-7xl px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left: Cinematic Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-black/5"
          >
            <Image 
              src={mainImage}
              alt="Erayduş Kalite Standartları"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs uppercase tracking-[0.2em] font-bold mb-2 opacity-80">Kalite Standartlarımız</div>
              <div className="text-2xl font-light">Üstün Donanım.</div>
            </div>
          </motion.div>

          {/* Right: Feature List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-10 md:mb-14">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4 leading-tight">
                Güzelliğin Ardındaki <br/> <span className="font-medium">Mühendislik.</span>
              </h2>
              <p className="text-black/50 text-base md:text-lg max-w-md leading-relaxed">
                Koleksiyonumuzdaki her bir ürün, kusursuz bir duş deneyimi yaşamanız için en ileri teknolojilerle donatılmıştır.
              </p>
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1.5">{feature.title}</h4>
                    <p className="text-black/60 text-sm leading-relaxed max-w-sm">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  )
}
