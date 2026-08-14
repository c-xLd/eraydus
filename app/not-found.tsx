import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { 
  Home, 
  Sparkles, 
  Layers, 
  Compass, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Search, 
  SlidersHorizontal 
} from 'lucide-react'

export default function NotFound() {
  const quickLinks = [
    {
      title: '3D Özel Ölçü Tasarla',
      desc: 'Banyonuzun ölçülerine göre modelinizi tasarlayın ve anında fiyat hesaplayın.',
      href: '/tasarla',
      icon: SlidersHorizontal,
      badge: 'Popüler Araç',
    },
    {
      title: 'Duşakabin Koleksiyonları',
      desc: 'Tek cam paneller, siyah profilli kabinler ve soft-close sürgülü seriler.',
      href: '/urunler',
      icon: Layers,
      badge: 'Katalog',
    },
    {
      title: 'Banyo Dolapları',
      desc: 'Suya ve neme dayanıklı lake & ahşap premium banyo mobilyaları.',
      href: '/urunler/banyo-dolabi',
      icon: Compass,
      badge: 'Mobilya',
    },
    {
      title: 'Ücretsiz Keşif & İletişim',
      desc: 'Ankara geneli adresinize uzman keşif ekibimiz gelsin, net ölçü alsın.',
      href: '/iletisim',
      icon: Phone,
      badge: 'Siteler Showroom',
    },
  ]

  const popularTags = [
    { label: 'Tek Cam Duşakabin', href: '/urunler' },
    { label: 'Siyah Profilli Kabin', href: '/urunler' },
    { label: 'Soft-Close Sürgülü', href: '/urunler' },
    { label: 'Kumlama Desenleri', href: '/kumlama-modelleri' },
    { label: 'Çankaya Duşakabin', href: '/ankara-cankaya-dusakabin' },
    { label: 'Çayyolu Duşakabin', href: '/cayyolu-dusakabin' },
    { label: 'Montaj Kılavuzu', href: '/montaj-kilavuzu' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-champagne/20">
      <Header />

      <main className="flex-1 relative overflow-hidden flex flex-col justify-center pt-32 pb-20">
        {/* Ambient Luxury Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-champagne/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="container mx-auto px-6 max-w-5xl">
          {/* Top Hero Section */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm">
              <Sparkles className="size-3.5" />
              <span>404 • Sayfa Bulunamadı</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground mb-4">
              Aradığınız Sayfaya <span className="font-semibold text-champagne">Ulaşılamadı</span>
            </h1>

            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-8">
              Bağlantı adresi değişmiş, silinmiş veya geçici olarak kullanım dışı olabilir. 
              Aşağıdaki hızlı yönlendirmeleri kullanarak aradığınız duşakabin ve banyo çözümlerine kolayca ulaşabilirsiniz.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-all shadow-md active:scale-95"
              >
                <Home className="size-4" />
                <span>Ana Sayfaya Dön</span>
              </Link>
              <Link
                href="/tasarla"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-champagne/40 bg-champagne/10 text-champagne font-medium text-sm hover:bg-champagne/20 transition-all active:scale-95"
              >
                <SlidersHorizontal className="size-4" />
                <span>Özel Ölçü Tasarla</span>
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-border bg-card text-foreground font-medium text-sm hover:bg-muted transition-all active:scale-95"
              >
                <Phone className="size-4" />
                <span>Bize Ulaşın</span>
              </Link>
            </div>
          </div>

          {/* Quick Recovery Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {quickLinks.map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative p-6 rounded-2xl border border-border/70 bg-card/60 hover:bg-card hover:border-champagne/40 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="size-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-champagne transition-colors mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center text-xs font-medium text-champagne gap-1 group-hover:translate-x-1 transition-transform">
                    <span>İncele</span>
                    <ArrowRight className="size-3" />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Popular Search Terms */}
          <div className="p-6 rounded-2xl border border-border/50 bg-muted/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Search className="size-4 text-champagne" />
              <span>Popüler Aramalar:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {popularTags.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="text-xs px-3 py-1.5 rounded-full bg-background border border-border/60 text-muted-foreground hover:text-foreground hover:border-champagne/40 transition-colors"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Direct Support Notice */}
          <div className="mt-10 text-center text-xs text-muted-foreground">
            Sorunuz veya teknik bir talebiniz mi var?{' '}
            <a 
              href="https://wa.me/905548830071" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-champagne hover:underline inline-flex items-center gap-1 font-medium"
            >
              <MessageCircle className="size-3.5" />
              WhatsApp Destek Hattımız (0554 883 00 71)
            </a>{' '}
            üzerinden 7/24 bize yazabilirsiniz.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

