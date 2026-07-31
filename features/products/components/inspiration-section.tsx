'use client'

import { motion } from 'framer-motion'

export function InspirationSection() {
  const stats = [
    { label: 'Proje', value: '2000+' },
    { label: 'Yıl Deneyim', value: '15+' },
    { label: 'Yerli Üretim', value: '%100' },
  ]

  return (
    <section className="py-12 md:py-16 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="space-y-8 sm:space-y-10"
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="w-12 h-1 bg-[#C9A86A]" />
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
                Her Detay <br className="hidden md:block" />
                Bir Sanat Eseri
              </h2>
              <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-lg font-light leading-relaxed">
                Modern mimarinin estetik çizgilerini, üstün mühendislik ile birleştiriyoruz. 
                Her bir ürünümüz, banyonuzu özel bir yaşam alanına dönüştürmek için tasarlandı.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-4xl font-medium text-[#C9A86A] mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-sm text-white/50 uppercase tracking-wider font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-white/5 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center p-8"
          >
            {/* Abstract decorative element representing architecture/precision */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A86A]/20 via-transparent to-transparent opacity-50" />
            
            <div className="relative w-full h-full border border-white/10 rounded-2xl flex flex-col justify-between p-8">
              <div className="w-full flex justify-between">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-32 h-32 md:w-48 md:h-48 border border-[#C9A86A]/30 rounded-full flex items-center justify-center rotate-45 transition-transform duration-1000 hover:rotate-90">
                  <div className="w-full h-px bg-[#C9A86A]/30" />
                  <div className="absolute h-full w-px bg-[#C9A86A]/30" />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
