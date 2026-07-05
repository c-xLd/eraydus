'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

const collections = [
  {
    id: 'edge',
    name: 'EDGE Serisi',
    subtitle: 'Minimalist Zarafet',
    description: 'Ultra ince profiller ve net geometrik çizgilerle tanımlanan, modern mimarinin en saf ifadesi.',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop',
    features: ['12mm Ultra İnce Profil', 'Mat Siyah & Altın Seçenekleri', 'Gizli Menteşe Sistemi', 'Nano Kaplama Cam'],
    price: '₺8.500',
  },
  {
    id: 'pure',
    name: 'PURE Serisi',
    subtitle: 'Çerçevesiz Mükemmellik',
    description: 'Tamamen çerçevesiz cam panellerle banyonuzda maksimum şeffaflık ve mimari bütünlük sağlar.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    features: ['%100 Çerçevesiz Tasarım', '10mm Temperli Cam', 'Özel Paslanmaz Donanım', 'Kolay Temizlik'],
    price: '₺12.000',
  },
  {
    id: 'luxury',
    name: 'LUXURY Serisi',
    subtitle: 'Premium Donanım',
    description: 'En üst düzey malzemeler, özel renkler ve lüks donanımlarla tasarlanan imza koleksiyonumuz.',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop',
    features: ['Soft-Close Kapanma', 'Özel Titanyum Renkler', 'Akıllı Kulp Sistemleri', 'Akustik İzolasyon'],
    price: '₺16.500',
  }
]

export default function CollectionsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      {/* Hero */}
      <div className="container mx-auto px-6 max-w-[1440px] mb-24 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-champagne text-sm font-medium tracking-[0.2em] uppercase block mb-6"
        >
          Koleksiyonlar
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-light tracking-tight mb-8"
        >
          Mimarinin <span className="font-semibold">Şeffaf Hali</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Her banyonun karakterine uygun, hassas mühendislikle tasarlanmış üç farklı premium duşakabin serisini keşfedin.
        </motion.p>
      </div>

      {/* Collections List */}
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="space-y-32">
          {collections.map((collection, index) => (
            <motion.div 
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col gap-12 lg:gap-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group">
                  <img 
                    src={collection.image} 
                    alt={collection.name} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <span className="text-champagne font-medium tracking-wider text-sm mb-4">{collection.subtitle}</span>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">{collection.name}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
                  {collection.description}
                </p>

                <div className="space-y-4 mb-12">
                  {collection.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-surface-dark flex items-center justify-center flex-shrink-0">
                        <Check className="size-3.5 text-white" />
                      </div>
                      <span className="text-foreground font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-auto">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Başlangıç</span>
                    <span className="text-3xl font-light">{collection.price}</span>
                  </div>
                  <div className="h-12 w-[1px] bg-border hidden sm:block" />
                  <Link 
                    href={`/configurator?collection=${collection.id}`} 
                    className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 h-14 text-sm font-semibold hover:bg-foreground/90 transition-all shadow-xl shadow-black/5"
                  >
                    Bu Seriyi Tasarla
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
