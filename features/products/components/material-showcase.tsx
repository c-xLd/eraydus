'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { glassOptions, profileOptions } from '@/lib/data/products'

export function MaterialShowcase() {
  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="mb-8 md:mb-12">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-1">
            PREMİUM MATERYALLER
          </span>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">Malzeme & Renk Seçenekleri</h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl font-light">
            Tasarımınızı kişiselleştirin. Premium cam ve profil seçeneklerimizle banyonuza en uygun kombinasyonu yaratın.
          </p>
        </div>

        <div className="space-y-10 sm:space-y-14">
          {/* Glass Options */}
          <div>
            <h3 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 flex items-center">
              <span className="w-6 sm:w-8 h-px bg-border mr-3 sm:mr-4" />
              Cam Seçenekleri
            </h3>
            <div className="flex sm:grid overflow-x-auto sm:overflow-visible no-scrollbar scroll-smooth overscroll-x-contain touch-pan-x gap-4 sm:gap-6 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2 lg:grid-cols-4">
              {glassOptions.map((glass, index) => (
                <motion.div
                  key={glass.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="w-[72vw] max-w-[280px] sm:w-full sm:max-w-none shrink-0 sm:shrink"
                >
                  <Card className="overflow-hidden border-border/50 bg-muted/10 rounded-2xl shadow-xs">
                    <CardContent className="p-0">
                      <div className={cn("h-40 sm:h-48 w-full", glass.colorClass)}>
                        {/* Simulate glass reflection/texture */}
                        <div className="w-full h-full bg-gradient-to-tr from-white/10 to-transparent" />
                      </div>
                      <div className="p-4 sm:p-6">
                        <h4 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">{glass.name}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{glass.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Profile Options */}
          <div>
            <h3 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 flex items-center">
              <span className="w-6 sm:w-8 h-px bg-border mr-3 sm:mr-4" />
              Profil Renkleri
            </h3>
            <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-6 sm:gap-8 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              {profileOptions.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center group cursor-pointer shrink-0 touch-manipulation active:scale-95 transition-transform"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-sm mb-2.5 sm:mb-4 border border-border/50 relative overflow-hidden transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md" style={{ backgroundColor: profile.hex }}>
                    {/* Metallic sheen effect for metallic colors */}
                    {(profile.name.includes('Krom') || profile.name.includes('Altın') || profile.name.includes('Bronz')) && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-black/20" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-center">{profile.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
