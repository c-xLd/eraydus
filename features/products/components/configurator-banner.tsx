import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function ConfiguratorBanner() {
  return (
    <section className="py-10 md:py-16">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0a] text-white p-6 md:p-10 lg:p-12">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#C9A86A]/20 via-[#0a0a0a] to-[#0a0a0a]" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Duşakabininizi <br className="hidden sm:block" /> Tasarlayın
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-md">
              2D konfigüratör ile banyonuza en uygun ölçü, cam ve profil seçeneklerini belirleyerek hayalinizdeki duşakabini oluşturun.
            </p>
            
            <Link href="/tasarla" className="inline-flex items-center justify-center rounded-full bg-[#C9A86A] text-white hover:bg-[#C9A86A]/90 h-14 px-8 text-lg font-medium transition-colors group">
              Konfigüratörü Başlat
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Decorative grid lines */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-1/2 h-full hidden md:block">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
