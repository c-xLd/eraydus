import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, PhoneCall, Star, ArrowRight, ShieldCheck } from 'lucide-react'
import { getBreadcrumbSchema, getLocalBusinessSchema, getGraphSchema } from '@/lib/seo/schemas'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

export const metadata: Metadata = {
  title: 'Çayyolu & İncek Duşakabin İmalatı - Erayduş Ankara',
  description: 'Ankara Çayyolu, İncek, Angora Evleri ve Konutkent villa ve rezidansları için özel tasarım 8mm/10mm duşakabin modelleri. Ücretsiz adrese keşif ve montaj.',
  keywords: 'çayyolu duşakabin, incek duşakabin firması, angora evleri duşakabin montajı, konutkent duşakabin tamiri, beysukent duşakabin modelleri',
  alternates: {
    canonical: `${SITE_URL}/cayyolu-dusakabin`,
  },
  openGraph: {
    title: 'Çayyolu & İncek Duşakabin İmalatı | ERAYDUŞ',
    description: 'Çayyolu ve İncek bölgelerine özel lüks banyo kabinleri ve milimetrik imalat.',
    url: `${SITE_URL}/cayyolu-dusakabin`,
    siteName: 'ERAYDUŞ',
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630 }],
  },
}

export default function CayyoluDusakabinPage() {
  const localGeoData = {
    phone: '+90 312 000 00 00',
    email: 'cayyolu@eraydus.net',
    address: {
      streetAddress: 'Çayyolu Mahallesi, 2432. Cadde No: 88',
      addressLocality: 'Çayyolu',
      addressRegion: 'Ankara',
      postalCode: '06810',
      addressCountry: 'TR'
    },
    geo: {
      position: '39.8892;32.6738'
    }
  }

  const localBusinessSchema = getLocalBusinessSchema(localGeoData)
  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Duşakabin Modelleri', url: '/dusakabin-modelleri' },
    { name: 'Çayyolu & İncek Duşakabin', url: '/cayyolu-dusakabin' },
  ]
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs)
  const graphSchema = getGraphSchema([localBusinessSchema, breadcrumbSchema])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <div className="bg-background min-h-screen pt-32 pb-24">
        {/* HERO SECTION */}
        <section className="container mx-auto max-w-[1200px] px-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-champagne font-bold mb-4">
            <MapPin className="w-4 h-4" />
            Çayyolu & İncek Lüks Kabin Projeleri
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[1.15]">
            Çayyolu & İncek <span className="font-semibold text-champagne">Özel Ölçü Duşakabin İmalatı</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light max-w-3xl leading-relaxed">
            Çayyolu, İncek, Beysukent, Angora Evleri ve Alacaatlı bölgelerindeki villa ve lüks konut banyoları için 10mm emniyet camlı, PVD gold/siyah profilli duş sistemleri.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-semibold text-sm rounded-lg hover:bg-foreground/90 transition-all shadow-lg"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              Çayyolu Ücretsiz Keşif Talebi
            </Link>
            <Link
              href="/dusakabin-modelleri"
              className="inline-flex items-center justify-center px-8 py-4 bg-muted text-foreground font-medium text-sm rounded-lg hover:bg-muted/80 transition-colors border border-border"
            >
              Tüm Modelleri İncele
            </Link>
          </div>
        </section>

        {/* PROJELER & TESTIMONIALS */}
        <section className="py-16 container mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-border/60 bg-card">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                &ldquo;Angora Evleri&apos;ndeki villamız için tavan boyu sürgülü sistem yaptırdık. İşçilik kalitesi ve sızdırmazlık 10 numara.&rdquo;
              </p>
              <span className="text-xs font-bold text-foreground block mt-4">— Deniz A. / Angora Evleri, Çayyolu</span>
            </div>

            <div className="p-8 rounded-2xl border border-border/60 bg-card">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                &ldquo;İncek konut projemiz için 14 adet özel cam kabin siparişi verdik. Zamanında teslimat ve kusursuz montaj yapıldı.&rdquo;
              </p>
              <span className="text-xs font-bold text-foreground block mt-4">— Mimar Hakan T. / İncek</span>
            </div>

            <div className="p-8 rounded-2xl border border-border/60 bg-card">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                &ldquo;Konutkent&apos;teki ebeveyn banyomuza mat siyah Walk-in cam panel takıldı. Nano kaplama sayesinde kireç lekesi kalmıyor.&rdquo;
              </p>
              <span className="text-xs font-bold text-foreground block mt-4">— Ayşe G. / Konutkent</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
