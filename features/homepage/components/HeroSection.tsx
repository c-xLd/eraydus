import Link from 'next/link'
import { HeroBackgroundParallax, HeroScrollIndicator } from './HeroBackgroundParallax'

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-black select-none">
      {/* Background (Parallax Leaf Client Component) */}
      <HeroBackgroundParallax />

      {/* Ambient Light Effects (Desktop) */}
      <div className="absolute inset-0 z-[5] pointer-events-none hidden md:block">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-champagne/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]" />
      </div>

      {/* Content - Pure Server HTML for Instant LCP Paint */}
      <div className="relative z-20 container mx-auto px-6 max-w-[1440px] flex flex-col justify-between min-h-[100dvh] pt-28 pb-8 -webkit-tap-highlight-color-transparent text-center">
        {/* Center alignment helper */}
        <div className="flex-1 flex flex-col items-center justify-center my-auto">
          {/* Badge */}
          <div className="mb-6 md:mb-8">
            <span className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse shadow-[0_0_8px_#c9a86a]" />
              Ankara İçi Ücretsiz Keşif
            </span>
          </div>

          {/* Headline - Instant LCP paint */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] xl:text-[5.5rem] font-light tracking-tight leading-[1.05] md:leading-[0.95] max-w-5xl">
            Banyonuzun Ölçüsüne Özel{' '}
            <span className="relative inline-block mt-1 md:mt-0 text-champagne font-normal">
              Duşakabin
              <span className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-champagne/0 via-champagne to-champagne/0 origin-center" />
            </span>
            <br className="hidden sm:block" />{' '}
            <span className="font-semibold block sm:inline mt-2 sm:mt-0 text-white">İmalatı ve Montajı.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/70 mt-6 md:mt-8 text-base md:text-xl max-w-2xl font-light leading-relaxed px-4 md:px-0">
            Kırılmaya dayanıklı temperli camlar, paslanmayan çelik aksamlar ve tam su sızdırmazlık garantisi ile banyonuza özel uzun ömürlü çözümler üretiyoruz.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8 md:mt-10 px-4 sm:px-0">
            <Link
              href="/tasarla"
              className="group inline-flex items-center justify-center rounded-2xl bg-champagne text-black w-full sm:w-auto px-8 md:px-10 h-14 text-sm md:text-base font-semibold hover:bg-champagne/90 transition-all duration-300 shadow-[0_4px_20px_rgba(201,168,106,0.3)] hover:shadow-[0_8px_30px_rgba(201,168,106,0.5)] hover:-translate-y-0.5"
            >
              Tasarla & Fiyat Al
              <svg className="ml-2 size-4 md:size-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/urunler"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 text-white w-full sm:w-auto px-8 md:px-10 h-14 text-sm md:text-base font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5"
            >
              Modelleri İncele
            </Link>
          </div>
        </div>

        {/* Bottom Group */}
        <div className="flex flex-col items-center gap-8 mt-12 w-full">
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 text-white/60 text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase">
            <span>2 Yıl Garanti</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
            <span>Ücretsiz Ölçü & Keşif</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
            <span>%100 Su Sızdırmazlık</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
            <span>Uzman Montaj</span>
          </div>

          {/* Scroll Indicator */}
          <HeroScrollIndicator />
        </div>
      </div>
    </section>
  )
}
