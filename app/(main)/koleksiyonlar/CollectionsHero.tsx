'use client'

import Image from 'next/image'

export function CollectionsHero() {
  return (
    <div 
      className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black flex items-center justify-center -mt-24"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
      >
        <Image
          src="/images/placeholders/modern-bathroom.jpg"
          alt="Lüks Duşakabin Koleksiyonları"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background z-10" />
      </div>

      {/* Cinematic Typography */}
      <div 
        className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center mt-24"
      >
        <span 
          className="text-champagne text-xs md:text-sm uppercase tracking-[0.3em] font-medium mb-6 block animate-[fadeInUp_1s_0.2s_both]"
        >
          Erayduş Premium
        </span>
        
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tighter mb-8 animate-[fadeInUp_1.2s_0.4s_both]"
        >
          Kusursuzluğu <br className="hidden md:block" /> Keşfedin.
        </h1>
        
        <p 
          className="text-lg md:text-xl text-white/70 font-light max-w-2xl animate-[fadeInUp_1s_0.6s_both]"
        >
          Mimari estetik ve üstün mühendisliğin birleştiği, banyonuza özel tasarlanmış lüks duşakabin koleksiyonları.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 animate-[fadeIn_1s_1.5s_both]"
      >
        <span className="text-white/50 text-[10px] uppercase tracking-widest">Koleksiyonlar</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-1/2 bg-champagne animate-[scrollLine_1.5s_linear_infinite]"
          />
        </div>
      </div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scrollLine {
          from { transform: translateY(-100%); }
          to { transform: translateY(200%); }
        }
      `}</style>
    </div>
  )
}
