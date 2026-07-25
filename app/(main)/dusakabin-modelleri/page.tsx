import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, CheckCircle2, Ruler, ShieldCheck, PhoneCall, HelpCircle, ArrowRight, Star, SlidersHorizontal, MapPin } from 'lucide-react'
import { getBreadcrumbSchema, getFAQSchema, getGraphSchema, getProductSchema } from '@/lib/seo/schemas'
import { getProducts } from '@/features/products/services/products'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

export const metadata: Metadata = {
  title: '2026 Duşakabin Modelleri ve Fiyatları - Erayduş Ankara',
  description: 'Ankara lüks duşakabin modelleri ve özel üretim fiyatları. Mat siyah profil, 8mm temperli cam, mika, oval, kare ve walk-in kabin kataloğu.',
  keywords: 'duşakabin modelleri, duşakabin fiyatları ankara, siyah profilli duşakabin, mika duşakabin, oval duşakabin, 8mm temperli cam kabin, özel ölçü duşakabin',
  alternates: {
    canonical: `${SITE_URL}/dusakabin-modelleri`,
  },
  openGraph: {
    title: '2026 Duşakabin Modelleri ve Fiyatları - Erayduş Ankara',
    description: 'Banyonuza özel üretilen mat siyah, krom, gold, oval ve kare duşakabin modelleri kataloğu.',
    url: `${SITE_URL}/dusakabin-modelleri`,
    siteName: 'ERAYDUŞ',
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: '2026 Duşakabin Modelleri Kataloğu - ERAYDUŞ Ankara',
      },
    ],
  },
}

export default async function DusakabinModelleriHubPage() {
  const products = await getProducts()

  const faqs = [
    {
      question: '2026 yılında en çok tercih edilen duşakabin modelleri hangileridir?',
      answer: '2026 banyo mimarisinde en çok tercih edilen modeller mat siyah elektrostatik fırın boyalı profilli 8mm temperli cam duşakabinler, zemine sıfır eşiksiz Walk-in cam paneller ve soft-close yavaşlatıcı frenli lüks sürgülü sistemlerdir.'
    },
    {
      question: 'Küçük banyolar için en uygun duşakabin modeli hangisidir?',
      answer: 'Küçük ve dar banyolarda alan tasarrufu sağlamak için köşe L-tipi kare kabinler veya içeri katlanır akordeon kapılı 8mm şeffaf camlı modeller önerilir. Şeffaf cam banyoyu görsel olarak 2 kat daha geniş gösterir.'
    },
    {
      question: 'Mika duşakabin ile temperli cam duşakabin arasındaki fark nedir?',
      answer: 'Mika (polistren) duşakabinler darbelere esnek, hafif ve ekonomik çözümler sunar. Temperli emniyet camları ise 8mm ve 10mm kalınlığında kırılmaya karşı 5 kat dayanıklı, ısıya dirençli, Nano kireç tutmaz kaplamalı ve lüks görünüm sağlayan camlardır.'
    },
    {
      question: 'Ankara içi özel ölçü duşakabin montaj süresi ne kadardır?',
      answer: 'Ankara merkez ilçelerinde (Çankaya, Çayyolu, İncek, Keçiören, Batıkent, Yenimahalle vb.) uzman ekibimiz 24 saat içinde ücretsiz keşif ve lazer metre ölçümü yapmaktadır. İmalat ve montaj süreci 3 ila 5 iş günü içerisinde tamamlanır.'
    },
    {
      question: 'Siyah profilli duşakabinlerde renk kararması veya boya dökülmesi olur mu?',
      answer: 'ERAYDUŞ siyah profilleri fırınlanmış elektrostatik toz boya veya PVD titanyum kaplama ile üretildiği için nemden, kireçli sudan ve banyo temizlik maddelerinden etkilenmez. 10 yıl boya ve paslanmazlık garantisi altındadır.'
    }
  ]

  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Duşakabin Modelleri', url: '/dusakabin-modelleri' },
  ]

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs)
  const faqSchema = getFAQSchema(faqs)
  const graphSchema = getGraphSchema([breadcrumbSchema, faqSchema])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <div className="bg-background min-h-screen">
        {/* HERO HEADER */}
        <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 border-b border-border/40 overflow-hidden bg-gradient-to-b from-champagne/5 via-background to-background">
          <div className="container mx-auto max-w-[1440px] px-6">
            <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">Duşakabin Modelleri</span>
            </nav>

            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 text-champagne text-xs font-semibold uppercase tracking-wider mb-6 border border-champagne/20">
                <Sparkles className="w-3.5 h-3.5" />
                2026 Resmi Model Katalogu
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground leading-[1.1]">
                2026 Duşakabin <span className="font-semibold text-champagne">Modelleri ve Fiyatları</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl font-light text-muted-foreground leading-relaxed max-w-3xl">
                Ankara&apos;nın en geniş duşakabin kataloğu: Mat siyah profilli, 8mm temperli emniyet camlı, mika, oval, kare ve zemine sıfır Walk-in modellerimizi doğrudan üreticiden en uygun fiyat garantisiyle keşfedin.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/tasarla"
                  className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-medium text-sm rounded-lg hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl"
                >
                  <Ruler className="w-4 h-4 mr-2.5" />
                  Özel Ölçü Tasarla & Fiyat Al
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center px-8 py-4 bg-muted text-foreground font-medium text-sm rounded-lg hover:bg-muted/80 transition-colors border border-border"
                >
                  <PhoneCall className="w-4 h-4 mr-2.5 text-champagne" />
                  Ankara Ücretsiz Keşif Talebi
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* VISUAL MODEL CATALOG GRID (IMAGE SEO OPTIMIZED) */}
        <section className="py-16 md:py-24 container mx-auto max-w-[1440px] px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-champagne">Görsel Katalog & Modeller</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground mt-2">
                Tüm Duşakabin <span className="font-semibold">Çeşitleri</span>
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mt-4 md:mt-0">
              Banyonuzun mimarisine tam uyum sağlayan özel üretim modellerimizi inceleyin. Tüm camlarımız Şişecam garantilidir.
            </p>
          </div>

          {/* MODEL CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Siyah Profilli Duşakabin */}
            <div className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-champagne/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
              <div className="relative aspect-[4/3] bg-muted/40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop"
                  alt="siyah profilli duşakabin modeli 8mm temperli cam ankara erayduş"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/80 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                  Mat Siyah Profil
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-champagne transition-colors">
                    Siyah Profilli Duşakabin Modelleri
                  </h3>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Mat siyah elektrostatik fırın boyalı 1.8mm alüminyum profiller, 8mm Şişecam temperli cam ve kireç tutmaz Nano-Shield kaplama ile banyonuzda endüstriyel lüks şıklık.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">8.500 ₺&apos;den Başlayan</span>
                  <Link href="/koleksiyonlar" className="inline-flex items-center text-xs font-medium text-champagne hover:underline">
                    Modelleri İncele <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Pure Walk-in Eşiksiz */}
            <div className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-champagne/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
              <div className="relative aspect-[4/3] bg-muted/40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop"
                  alt="walkin esiksiz zemin dusakabin paneli 10mm cam tasarimi"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-champagne text-foreground backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Walk-in Eşiksiz
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-champagne transition-colors">
                    Walk-in Eşiksiz Duş Cam Panelleri
                  </h3>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Kapısız, zemine sıfır ve çerçevesiz mimari cam paneller. 10mm masif temperli cam ve 304 paslanmaz çelik gergi kolları ile kesintisiz ferahlık.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">12.000 ₺&apos;den Başlayan</span>
                  <Link href="/koleksiyonlar" className="inline-flex items-center text-xs font-medium text-champagne hover:underline">
                    Modelleri İncele <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: Luxury Soft-Close Sürgülü */}
            <div className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-champagne/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
              <div className="relative aspect-[4/3] bg-muted/40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1200&auto=format&fit=crop"
                  alt="luxury surgulu dusakabin frenli soft close tekerlek sistemi"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-foreground text-background backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                  Soft-Close Sürgülü
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-champagne transition-colors">
                    Lüks Frenli Sürgülü Duşakabinler
                  </h3>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Sıvı amortisörlü soft-close fren teknolojisi ile sessiz ve darbesiz kapanan ağır cam paneller. Çift bilyalı çelik rulman tekerlek garantisi.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">16.500 ₺&apos;den Başlayan</span>
                  <Link href="/koleksiyonlar" className="inline-flex items-center text-xs font-medium text-champagne hover:underline">
                    Modelleri İncele <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 4: Gold & Bronz Serisi */}
            <div className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-champagne/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
              <div className="relative aspect-[4/3] bg-muted/40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop"
                  alt="gold altin renkli pvd kaplama dusakabin modeli ankara"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-amber-500 text-black backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Gold & Bronz PVD
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-champagne transition-colors">
                    Altın (Gold) & Bronz Profil Modelleri
                  </h3>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    PVD titanyum buharlaştırma teknolojisiyle kaplanmış, kararmaz ve çizilmez gold duşakabin profilleri. Rezidans projeleri için özel estetik.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">18.000 ₺&apos;den Başlayan</span>
                  <Link href="/koleksiyonlar" className="inline-flex items-center text-xs font-medium text-champagne hover:underline">
                    Modelleri İncele <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 5: Kare ve Oval Köşe Kabinler */}
            <div className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-champagne/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
              <div className="relative aspect-[4/3] bg-muted/40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1200&auto=format&fit=crop"
                  alt="kare ve oval kose dusakabin modelleri alan tasarruflu"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                  Kare & Oval Köşe
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-champagne transition-colors">
                    Kare & Oval Köşe Duşakabinler
                  </h3>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Küçük ve orta banyolarda alanı en verimli kullanan köşe kabin sistemleri. 80x80, 90x90, 100x100 cm milimetrik özel ölçü imkanı.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">8.200 ₺&apos;den Başlayan</span>
                  <Link href="/koleksiyonlar" className="inline-flex items-center text-xs font-medium text-champagne hover:underline">
                    Modelleri İncele <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 6: Mika ve Ekonomik Kabinler */}
            <div className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-champagne/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
              <div className="relative aspect-[4/3] bg-muted/40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop"
                  alt="mika polistren dusakabin cami hafif ekonomik model"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                  Mika & Ekonomik
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-champagne transition-colors">
                    Mika (Polistren) Duşakabin Modelleri
                  </h3>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Kırılmaya karşı tam dayanıklı polistren camlı, hafif alüminyum gövdeli ve ekonomik fiyatlı uzun ömürlü banyo kabinleri.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">5.900 ₺&apos;den Başlayan</span>
                  <Link href="/koleksiyonlar" className="inline-flex items-center text-xs font-medium text-champagne hover:underline">
                    Modelleri İncele <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH INTENT CONTENT BLOCKS (DEEP TEXT & SEO) */}
        <section className="py-16 bg-muted/20 border-y border-border/40">
          <div className="container mx-auto max-w-[1100px] px-6">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-champagne">Rehber & Uzman Tavsiyesi</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground mt-2">
                Banyonuz İçin <span className="font-semibold">En Doğru Modeli Seçin</span>
              </h2>
            </div>

            <div className="space-y-12 prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <div className="p-8 rounded-2xl border border-border/60 bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">1. Kare ve Köşe Duşakabin Modellerinin Avantajları</h3>
                <p className="text-base">
                  Banyo alanlarında en popüler yerleşim biçimi köşe kullanımıdır. Kare duşakabinler, iki duvar birleşim noktasına oturarak banyonun tam ortasında geniş hareket alanı bırakır. Özellikle 90x90 cm ve 100x100 cm ölçülerindeki kare modeller, duş sırasında dirseklerin camlara çarpmasını engeller. Dış dikme profillerindeki ayarlı adaptörler sayesinde duvarlardaki terazi kaçıklığı ve şakül bozuklukları montaj esnasında tolare edilir.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-border/60 bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">2. Siyah Profilli ve Gold Lüks Cam Kabinler</h3>
                <p className="text-base">
                  Geleneksel parlak krom kabinlerin yerini alan mat siyah ve gold (altın) serisi duşakabinler, modern banyo mimarisinin ana odak noktası haline gelmiştir. ERAYDUŞ bünyesinde üretilen siyah profiller, 200 derece fırınlanan elektrostatik toz boya ile kaplandığı için banyodaki buharlı ortamdan, kireçli sudan ve temizlik sprey kimyasallarından etkilenmez. Gold serisinde ise PVD titanyum teknolojisi ile renk dayanıklılığı üst seviyeye çıkarılmıştır.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-border/60 bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">3. Mika Cam ve Temperli Cam Karşılaştırması</h3>
                <p className="text-base">
                  Duşakabin satın alırken en çok kararsız kalınan konulardan biri cam türüdür. Mika (polistren) kabinler esnek yapıları ve hafiflikleri sayesinde kırılma riski barındırmaz ve ekonomik bütçeler için idealdir. 8mm Şişecam temperli emniyet camları ise darbelere karşı 5 kat dayanıklı olmalarının yanı sıra pürüzsüz yüzeyleri sayesinde leke tutmaz ve şeffaflığıyla banyoya ferahlık katar.
                </p>
              </div>
            </div>

            {/* ANKARA REGIONAL QUICK LINKS */}
            <div className="mt-12 p-8 rounded-2xl border border-champagne/30 bg-champagne/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-champagne flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Ankara İçi Ücretsiz Keşif Servisi
                </span>
                <h4 className="text-xl font-semibold text-foreground mt-1">Ankara İlçelerine Özel Montaj Hizmeti</h4>
                <p className="text-xs text-muted-foreground mt-1">Çankaya, Çayyolu, İncek, Keçiören, Batıkent ve Yenimahalle için aynı hafta teslimat.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/ankara-cankaya-dusakabin" className="px-4 py-2 bg-background border border-border text-xs font-semibold rounded-lg hover:border-champagne transition-colors">
                  Çankaya Duşakabin →
                </Link>
                <Link href="/cayyolu-dusakabin" className="px-4 py-2 bg-background border border-border text-xs font-semibold rounded-lg hover:border-champagne transition-colors">
                  Çayyolu & İncek Duşakabin →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION (GOOGLE SSS SCHEMA ENTIRELY COMPLIANT) */}
        <section className="py-16 md:py-24 container mx-auto max-w-[1000px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-champagne mb-3">
              <HelpCircle className="w-4 h-4" />
              Sıkça Sorulan Sorular
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Duşakabin Hakkında Merak Edilenler</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-border/60 rounded-xl bg-card p-6 cursor-pointer transition-all duration-200 [&[open]]:border-champagne/50"
              >
                <summary className="flex items-center justify-between font-medium text-base md:text-lg text-foreground list-none">
                  <span>{faq.question}</span>
                  <span className="ml-4 transition-transform duration-200 group-open:rotate-180 text-champagne">
                    ↓
                  </span>
                </summary>
                <p className="mt-4 text-xs md:text-sm leading-relaxed text-muted-foreground pt-4 border-t border-border/40">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="py-20 bg-foreground text-background">
          <div className="container mx-auto max-w-[1440px] px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-3xl mx-auto">
              Hayalinizdeki <span className="font-semibold">duşakabin modelini</span> milimetrik üretiyoruz.
            </h2>
            <p className="mt-4 text-background/80 max-w-xl mx-auto text-sm md:text-base font-light">
              Ankara içi ücretsiz adresinize gelerek lazer metre ile net ölçü alıyoruz.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/tasarla"
                className="inline-flex items-center justify-center px-8 py-4 bg-champagne text-foreground font-semibold text-sm rounded-lg hover:bg-champagne/90 transition-all shadow-lg"
              >
                Özel Ölçü Hesabı Yap
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
