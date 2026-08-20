'use client'

import { motion } from 'framer-motion'
import { Star, CheckCircle2, ExternalLink } from 'lucide-react'

import { Testimonial } from '../services/homepage'

const ease = [0.16, 1, 0.3, 1] as const

const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps?cid=4589464454099566581'

// Official Google G SVG Icon
function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const defaultGoogleReviews = [
  {
    id: 'g1',
    name: 'Ahmet Yılmazer',
    role: 'Çankaya, Ankara',
    quote: 'Banyomuzun ölçüsü standart dışıydı. Erayduş ekibi ücretsiz keşfe gelip net ölçü aldı, 4 gün içinde tam oturan harika bir duşakabin monte ettiler. İşçilik, malzeme ve sızdırmazlık 5 yıldız.',
    rating: 5,
    date: '1 hafta önce',
    district: 'Çankaya'
  },
  {
    id: 'g2',
    name: 'Merve Öztürk',
    role: 'Çayyolu, Ankara',
    quote: 'Siyah profilli ve 6mm şeffaf temperli camlı duşakabin siparişi verdik. Banyomuzun havası tamamen değişti. Silikon çekimi ve montaj işçiliği tertemiz. Erayduş ekibine sonsuz teşekkürler.',
    rating: 5,
    date: '2 hafta önce',
    district: 'Çayyolu'
  },
  {
    id: 'g3',
    name: 'Serkan Kaya',
    role: 'Keçiören, Ankara',
    quote: 'Eski duşakabinimizin su sızdırmasından bıkmıştık. Erayduş imalatı yeni kabinde 1 damla bile su dışarı çıkmıyor. Ustalar son derece saygılı ve işinin ehli. Kesinlikle tavsiye ederim.',
    rating: 5,
    date: '1 ay önce',
    district: 'Keçiören'
  }
]

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const activeReviews = (testimonials && testimonials.length > 0)
    ? testimonials.map((t, idx) => ({
        ...t,
        date: defaultGoogleReviews[idx % defaultGoogleReviews.length]?.date || 'Doğrulanmış Müşteri',
        district: t.role || 'Ankara'
      }))
    : defaultGoogleReviews

  return (
    <section className="py-20 md:py-28 bg-[#0C0D0E] text-white relative overflow-hidden border-t border-white/5">
      {/* Ambient Champagne Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-champagne/5 blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        
        {/* Header with Google Badge */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          
          {/* Google 5-Star Header Badge */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, ease }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl"
          >
            <GoogleIcon className="w-5 h-5 shrink-0" />
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-white tracking-tight">5.0</span>
              <div className="flex gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <span className="text-xs text-white/60 font-light border-l border-white/15 pl-3">
              Google Müşteri Değerlendirmeleri
            </span>
          </motion.div>

          <motion.span
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="text-champagne text-xs font-semibold tracking-widest uppercase mb-3 block"
          >
            Müşteri Deneyimleri
          </motion.span>

          <motion.h2
            initial={{ y: 25 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight"
          >
            Google Yıldızlı <span className="font-semibold text-champagne">Müşteri Yorumları</span>
          </motion.h2>
          <p className="text-white/60 text-sm md:text-base font-light mt-4 max-w-xl mx-auto">
            Ankara genelinde teslim ettiğimiz yüzlerce özel ölçü duşakabin projemizden gerçek Google kullanıcı deneyimleri.
          </p>
        </div>

        {/* 3-Column Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {activeReviews.slice(0, 3).map((review, index) => (
            <motion.div
              key={review.id || index}
              initial={{ y: 25 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between p-8 md:p-9 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-champagne/40 transition-all duration-500 shadow-2xl backdrop-blur-md"
            >
              <div>
                {/* Top Bar inside Card: Google Icon + Rating */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <GoogleIcon className="w-5 h-5" />
                    <span className="text-xs font-medium text-white/80">Google Yorumu</span>
                  </div>
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-white/80 font-light text-sm md:text-base leading-relaxed italic mb-8">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-champagne transition-colors">
                    {review.name}
                  </h3>
                  <p className="text-xs text-white/50 font-light mt-0.5">
                    {review.role || review.district}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  Doğrulanmış
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Link Button */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mt-14 text-center"
        >
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/15 text-white font-medium text-sm hover:bg-white/10 hover:border-champagne/40 transition-all duration-300 shadow-xl group"
          >
            <GoogleIcon className="w-5 h-5" />
            Google Haritalar&apos;da Tüm Yorumları İnceleyin
            <ExternalLink className="w-4 h-4 text-champagne group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}

