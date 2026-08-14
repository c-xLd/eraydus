'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { getGlassImageUrl, getProfileImageUrl } from '@/features/products/utils/option-images'

const GLASS_LIST = [
  { id: 'seffaf', name: 'Şeffaf Extra Clear', desc: 'Maksimum ışık geçirgenliği' },
  { id: 'fume', name: 'Füme (Siyah) Cam', desc: 'Gizlilik ve lüks görünüm' },
  { id: 'bronz', name: 'Bronz Cam', desc: 'Sıcak tonlar ve zarif yansıma' },
  { id: 'aynali', name: 'Aynalı Cam', desc: 'Genişlik hissi ve mahremiyet' },
  { id: 'kumlama', name: 'Kumlama (Buzlu)', desc: 'Özel desenler ve modern doku' },
  { id: 'buz-mat', name: 'Buz Mat Cam', desc: 'Pürüzsüz mat yüzey ve gizlilik' },
]

const PROFILE_LIST = [
  { id: 'siyah', name: 'Mat Siyah', hex: '#1A1A1A' },
  { id: 'firca-parlak', name: 'Parlak Krom', hex: '#E8E9EB' },
  { id: 'gold', name: 'Fırçalanmış Altın', hex: '#D4AF37' },
  { id: 'beyaz', name: 'Mat Beyaz', hex: '#F9FAFB' },
]

export function MaterialShowcase() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-black/5 overflow-hidden">
      <div className="container max-w-6xl px-4 mx-auto">
        {/* Section Header */}
        <div className="mb-10 md:mb-14 text-left">
          <span className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase block mb-2">
            ERAYDUŞ MİMARİ STANDARTLAR
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-3">
            Malzeme & Renk Seçenekleri
          </h2>
          <p className="text-black/60 text-base max-w-2xl font-light">
            6mm temperli camlar ve elektrostatik fırınlanmış dayanıklı alüminyum profil renklerimizle banyonuza özel kombinasyonu oluşturun.
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {/* Glass Options */}
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-px bg-black" />
              <h3 className="text-lg md:text-xl font-medium text-black tracking-tight">
                Cam Seçenekleri
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {GLASS_LIST.map((glass, index) => {
                const imageUrl = getGlassImageUrl(glass.id, glass.name)

                return (
                  <motion.div
                    key={glass.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className="group relative flex flex-col rounded-2xl overflow-hidden border border-black/10 bg-neutral-50 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-200">
                      <Image
                        src={imageUrl}
                        alt={glass.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <h4 className="text-white font-semibold text-xs leading-tight">
                          {glass.name}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Profile Options */}
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-px bg-black" />
              <h3 className="text-lg md:text-xl font-medium text-black tracking-tight">
                Profil Renkleri
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PROFILE_LIST.map((profile, index) => {
                const imageUrl = getProfileImageUrl(profile.id, profile.name)

                return (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className="group relative flex items-center gap-4 p-4 rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-black/15 shadow-inner">
                      <Image
                        src={imageUrl}
                        alt={profile.name}
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-500 group-hover:scale-115"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-black leading-snug">
                        {profile.name}
                      </h4>
                      <p className="text-[11px] text-black/50 font-light">
                        Paslanmaz & Elektrostatik
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
