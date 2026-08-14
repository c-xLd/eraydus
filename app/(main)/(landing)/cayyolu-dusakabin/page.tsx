import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MapPin,
  PhoneCall,
  Star,
  ShieldCheck,
  ArrowRight,
  Ruler,
  Sparkles,
  MessageCircle,
  Phone,
  HelpCircle,
  Droplets
} from 'lucide-react'
import { getBreadcrumbSchema, getLocalBusinessSchema, getFAQSchema, getGraphSchema } from '@/lib/seo/schemas'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

export const metadata: Metadata = {
  title: 'Çayyolu & İncek Duşakabin İmalat & Montajı | Lüks Villa Kabinleri - ERAYDUŞ',
  description:
    'Çayyolu, İncek, Angora Evleri, Konutkent, Beysukent ve Alacaatlı villalarına özel ölçü 6mm temperli cam duşakabin modelleri. Ücretsiz yerinde keşif, 2 yıl resmi garanti.',
  keywords:
    'çayyolu duşakabin, incek duşakabin firması, angora evleri duşakabin montajı, konutkent duşakabin, beysukent duşakabin modelleri, alacaatlı duşakabin, mutlukent duşakabin, ankara villa duşakabin, özel ölçü banyo kabini, çayyolu cam duşakabin',
  alternates: {
    canonical: `${SITE_URL}/cayyolu-dusakabin`,
  },
  openGraph: {
    title: 'Çayyolu & İncek Duşakabin İmalatı & Montajı | ERAYDUŞ',
    description:
      'Çayyolu, İncek ve Angora bölgelerine özel lüks banyo kabinleri ve milimetrik imalat güvencesi.',
    url: `${SITE_URL}/cayyolu-dusakabin`,
    siteName: 'ERAYDUŞ Ankara',
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: 'Çayyolu & İncek Duşakabin' }],
  },
}

const cayyoluFaqs = [
  {
    question: 'Çayyolu, İncek ve Angora Evleri için adreste ölçü alma ücretli mi?',
    answer:
      'Hayır. Çayyolu, İncek, Beysukent, Angora Evleri, Konutkent, Alacaatlı ve civarındaki tüm villa ve konut projelerinde yerinde ölçüm ve teknik keşif hizmetimiz tamamen ücretsizdir.',
  },
  {
    question: 'Villa ve geniş ebeveyn banyoları için tavana kadar özel ölçü cam yapıyor musunuz?',
    answer:
      'Evet. Fabrikamızda standart yüksekliklerin (190-200 cm) yanı sıra tavana kadar uzanan masif tek cam duşakabin modelleri ve geniş açıklıklı sürgülü kabinler milimetrik olarak imal edilmektedir.',
  },
  {
    question: 'Siyah ve Gold profiller banyoda leke tutar mı, soyulma yapar mı?',
    answer:
      'Hayır. Profillerimiz fırınlanmış elektrostatik toz boya ve solmaz özel kaplama teknolojisiyle üretilmektedir. Çayyolu ve İncek bölgesindeki kireçli sulara ve banyo nemine karşı 2 yıl resmi garantimiz altındadır.',
  },
  {
    question: 'Sipariş sonrasında teslimat ve montaj kaç gün sürer?',
    answer:
      'Ölçü onayının ardından 6mm temperli cam kesimi ve profil hazırlığı 3-5 iş günü içinde tamamlanır. Kendi uzman montaj kadromuz randevu saatinizde gelerek 1-2 saatte temiz kurulum sağlar.',
  },
  {
    question: 'Garanti kapsamı ve satış sonrası destek nasıl işliyor?',
    answer:
      'Tüm ürünlerimiz 2 Yıl Resmi Üretici Garantisi kapsamındadır. İmalat, montaj veya su sızdırmazlık problemleri ücretsiz giderilir. İlerleyen yıllarda orijinal yedek parça ve servis desteğimiz kesintisiz devam eder.',
  },
]

const popularModels = [
  {
    title: 'Tek Cam Duşakabinler',
    desc: 'Eşiksiz, doğrudan seramik üzerine oturan ferah ve minimalist villa banyosu tasarımı.',
    tag: 'Villa Favorisi',
    link: '/urunler',
  },
  {
    title: 'Soft-Close Sürgülü Seri',
    desc: 'Geniş banyolar için frenli sessiz ray mekanizması ve masif 6mm temperli camlar.',
    tag: 'Lüks Konfor',
    link: '/urunler',
  },
  {
    title: 'Fırçalanmış Gold & Bronz Seri',
    desc: 'Banyo armatürlerinizle tam uyumlu, solmaz özel renk kaplamalı zarif profiller.',
    tag: 'Mimari Tasarım',
    link: '/urunler',
  },
  {
    title: 'Mat Siyah Köşe Kabinler',
    desc: 'Maksimum alan verimliliği, 100% sızdırmazlık sağlayan mıknatıslı fitil sistemi.',
    tag: 'Modern Çizgiler',
    link: '/urunler',
  },
]

const cayyoluDistricts = [
  'Çayyolu 1. & 2. Kısım',
  'İncek Villaları & Rezidansları',
  'Angora Evleri',
  'Beysukent',
  'Konutkent 1 & 2',
  'Alacaatlı',
  'Mutlukent',
  'Yaşamkent',
  'Bağlıca',
  'Türkkonut',
  'Dodurga',
  'Beytepe',
  'Bilkent Çevresi',
  'Ahlatlıbel',
  'Kızılcaşar',
  'Tuluntaş',
]

export default function CayyoluDusakabinPage() {
  const localGeoData = {
    phone: '+90 312 350 79 39',
    email: 'info@eraydus.net',
    address: {
      streetAddress: 'Malazgirt Caddesi No:121/1B, Siteler',
      addressLocality: 'Altındağ',
      addressRegion: 'Ankara',
      postalCode: '06160',
      addressCountry: 'TR',
    },
    geo: {
      position: '39.9570;32.8980',
    },
    localBusiness: {
      openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:00-19:00',
      priceRange: '₺₺',
      areaServed: [
        'Çayyolu',
        'İncek',
        'Angora Evleri',
        'Beysukent',
        'Konutkent',
        'Alacaatlı',
        'Mutlukent',
        'Bağlıca',
      ],
    },
  }

  const localBusinessSchema = getLocalBusinessSchema(localGeoData)
  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Koleksiyonlar', url: '/urunler' },
    { name: 'Çayyolu & İncek Duşakabin', url: '/cayyolu-dusakabin' },
  ]
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs)
  const faqSchema = getFAQSchema(cayyoluFaqs)
  const graphSchema = getGraphSchema([localBusinessSchema, breadcrumbSchema, faqSchema])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground">
        
        {/* BREADCRUMB */}
        <div className="container mx-auto max-w-[1200px] px-6 mb-8">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-champagne transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/urunler" className="hover:text-champagne transition-colors">Koleksiyonlar</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Çayyolu & İncek Duşakabin</span>
          </nav>
        </div>

        {/* HERO SECTION */}
        <section className="container mx-auto max-w-[1200px] px-6 pb-16 border-b border-border/40">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-champagne/10 text-champagne text-xs font-semibold uppercase tracking-wider mb-6 border border-champagne/20">
            <MapPin className="w-3.5 h-3.5" />
            Çayyolu & İncek Villa & Rezidans Bölge Servisi
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground leading-[1.1]">
            Çayyolu & İncek <span className="font-semibold text-champagne">Özel Ölçü Duşakabin İmalatı</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light max-w-3xl leading-relaxed">
            Çayyolu, İncek, Angora Evleri, Beysukent ve Alacaatlı villalarına özel <strong>6mm Şişecam temperli emniyet camı</strong>, solmayan mat siyah ve fırçalanmış gold profilli lüks duş sistemleri. Adreste ücretsiz keşif ve 2 yıl imalatçı garantisi.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/905548830071?text=Merhaba,%20Çayyolu/İncek%20bölgesindeki%20evim%20için%20özel%20ölçü%20duşakabin%20keşif%20ve%20fiyatı%20almak%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold text-sm rounded-xl hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp ile Çayyolu Keşfi İste
            </a>

            <a
              href="tel:+903123507939"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-foreground text-background font-semibold text-sm rounded-xl hover:bg-foreground/90 transition-all shadow-md"
            >
              <Phone className="w-4 h-4 text-champagne" />
              (0312) 350 79 39
            </a>

            <Link
              href="/tasarla"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-muted text-foreground font-medium text-sm rounded-xl hover:bg-muted/80 transition-colors border border-border"
            >
              <Ruler className="w-4 h-4 text-champagne" />
              3D Konfigüratör ile Fiyat Al
            </Link>
          </div>
        </section>

        {/* 4 CORE VALUE PILLARS */}
        <section className="py-16 container mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <Ruler className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">Ücretsiz Yerinde Keşif</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Çayyolu ve İncek&apos;teki adresinize gelerek banyonuzun net ölçülerini hassas şekilde alıyoruz.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">6mm Temperli Cam</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Şişecam lisanslı, kırılmaya karşı 5 kat dayanıklı emniyet camları ile banyonuzda maksimum güvenlik ve ferahlık.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">%100 Su Sızdırmazlık</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Özel suluk profilleri, güçlü mıknatıslı fitiller ve nötr antibakteriyel silikon ile kuru banyo garantisi.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">2 Yıl İmalatçı Garantisi</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Siteler fabrikamızın resmi garantisi ile imalat, montaj ve paslanmaz aksamlar 2 yıl güvence altında.
              </p>
            </div>
          </div>
        </section>

        {/* POPULAR MODELS SHOWCASE */}
        <section className="py-16 bg-muted/20 border-y border-border/40">
          <div className="container mx-auto max-w-[1200px] px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-semibold text-champagne uppercase tracking-widest block mb-2">
                  Villa & Rezidans Projeleri İçin
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                  Öne Çıkan <span className="font-semibold">Lüks Kabin Koleksiyonumuz</span>
                </h2>
              </div>
              <Link
                href="/urunler"
                className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-champagne hover:underline"
              >
                Tüm Koleksiyonu İnceleyin <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularModels.map((model, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-border/60 bg-card flex flex-col justify-between hover:border-champagne/40 transition-all hover:shadow-lg"
                >
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-champagne/10 text-champagne text-[11px] font-semibold mb-4">
                      {model.tag}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{model.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">{model.desc}</p>
                  </div>
                  <Link
                    href={model.link}
                    className="inline-flex items-center justify-between text-xs font-semibold text-foreground group-hover:text-champagne pt-4 border-t border-border/40"
                  >
                    <span>Modelleri Gör</span>
                    <ArrowRight className="w-3.5 h-3.5 text-champagne" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STEP-BY-STEP PROCESS */}
        <section className="py-20 container mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne block mb-2">
              Profesyonel İmalat Süreci
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              3 Adımda <span className="font-semibold">Banyonuza Özel Çözüm</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-border/60 bg-surface/50 relative">
              <span className="text-4xl font-mono font-bold text-champagne/30 block mb-4">01</span>
              <h3 className="text-xl font-semibold mb-2">Adreste Ücretsiz Keşif</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Çayyolu veya İncek&apos;teki adresinize gelerek duvar dikliğini ve zemin meyilini yerinde ölçüyor, banyonuza en uygun model ve cam tipini seçiyoruz.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-border/60 bg-surface/50 relative">
              <span className="text-4xl font-mono font-bold text-champagne/30 block mb-4">02</span>
              <h3 className="text-xl font-semibold mb-2">Fabrika İmalatı (3-5 Gün)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Siteler tesisimizde 6mm temperli camlar, elektrostatik boyalı profiller ve paslanmaz aksamlar banyonuzun ölçüsüne özel milimetrik üretilir.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-border/60 bg-surface/50 relative">
              <span className="text-4xl font-mono font-bold text-champagne/30 block mb-4">03</span>
              <h3 className="text-xl font-semibold mb-2">Kusursuz Montaj & Garanti</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Kendi tecrübeli montaj kadromuz kabininizi monte eder, su sızdırmazlık testini gerçekleştirir ve 2 yıllık garanti belgenizi teslim eder.
              </p>
            </div>
          </div>
        </section>

        {/* VERIFIED GOOGLE 5-STAR REVIEWS FROM ÇAYYOLU & İNCEK */}
        <section className="py-16 bg-muted/20 border-y border-border/40">
          <div className="container mx-auto max-w-[1200px] px-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground">5.0 / 5.0 Google Değerlendirmeleri</span>
            </div>
            
            <h2 className="text-3xl font-light tracking-tight mb-10">
              Çayyolu & İncek <span className="font-semibold">Müşteri Yorumları</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-border/60 bg-card shadow-sm">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  &ldquo;Angora Evleri&apos;ndeki villamız için tavan boyu sürgülü sistem yaptırdık. Cam kalınlığı ve sızdırmazlık 10 numara. Montaj ekibi son derece kibar ve işinin ehliydi.&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">Deniz A.</span>
                  <span className="text-muted-foreground">Angora Evleri, Çayyolu</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border/60 bg-card shadow-sm">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  &ldquo;İncek konut projemizdeki villamıza füme camlı ve mat siyah profilli duşakabin takıldı. Banyonun havasını tamamen lüks bir otele çevirdi. Fabrikadan direkt aldığımız için fiyatı da çok makuldü.&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">Hakan T.</span>
                  <span className="text-muted-foreground">İncek Villaları</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border/60 bg-card shadow-sm">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  &ldquo;Konutkent&apos;teki ebeveyn banyomuza gold profilli tek cam duşakabin yaptırdık. Kireç tutmayan temperli cam yapısıyla son derece kullanışlı, su dışarı hiç taşmıyor.&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">Ayşe G.</span>
                  <span className="text-muted-foreground">Konutkent</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOCAL DISTRICT NETWORK */}
        <section className="py-16 container mx-auto max-w-[1200px] px-6">
          <div className="p-8 md:p-12 rounded-3xl border border-border/60 bg-surface/40 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
              Hizmet Verdiğimiz <span className="font-semibold">Çayyolu & İncek Bölgeleri</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl font-light mb-8">
              Aşağıdaki tüm bölgelere aynı gün ücretsiz keşif servisimizle ulaşıyor, yerinde keşif ve numune profil tanıtımı yapıyoruz:
            </p>

            <div className="flex flex-wrap gap-2.5">
              {cayyoluDistricts.map((district, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-background border border-border/60 text-xs font-medium text-foreground hover:border-champagne/50 hover:text-champagne transition-colors cursor-default"
                >
                  ✓ {district} Duşakabin
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="py-16 container mx-auto max-w-[1000px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-champagne mb-2">
              <HelpCircle className="w-4 h-4" />
              Merak Edilenler
            </span>
            <h2 className="text-3xl font-light tracking-tight text-foreground">
              Çayyolu & İncek Duşakabin <span className="font-semibold">Sıkça Sorulan Sorular</span>
            </h2>
          </div>

          <div className="space-y-4">
            {cayyoluFaqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-border/60 rounded-2xl bg-card p-6 cursor-pointer transition-all duration-200 [&[open]]:border-champagne/50 shadow-sm"
              >
                <summary className="flex items-center justify-between font-medium text-base md:text-lg text-foreground list-none">
                  <span>{faq.question}</span>
                  <span className="ml-4 transition-transform duration-200 group-open:rotate-180 text-champagne">
                    ↓
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground pt-4 border-t border-border/40 font-light">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* BOTTOM HIGH CONVERSION CTA */}
        <section className="container mx-auto max-w-[1200px] px-6 mt-8">
          <div className="p-8 md:p-14 rounded-3xl bg-foreground text-background text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block text-xs uppercase tracking-widest text-champagne font-bold mb-3">
                Çayyolu & İncek Ücretsiz Keşif Fırsatı
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">
                Villanız için <span className="font-semibold text-champagne">Özel Ölçü Teklifi Alın</span>
              </h2>
              <p className="text-background/80 text-sm md:text-base font-light mb-8 leading-relaxed">
                Çayyolu veya İncek&apos;teki eviniz için yerinde keşif randevusu oluşturun. 3-5 günde Siteler fabrikamızdan doğrudan montaj ayrıcalığını yaşayın.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://wa.me/905548830071?text=Merhaba,%20Çayyolu/İncek'teki%20banyom%20için%20ücretsiz%20keşif%20randevusu%20oluşturmak%20istiyorum."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] transition-all shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp ile Hemen Randevu Al
                </a>
                <a
                  href="tel:+903123507939"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-champagne text-foreground font-semibold text-sm hover:bg-champagne/90 transition-all shadow-lg"
                >
                  <PhoneCall className="w-4 h-4" />
                  (0312) 350 79 39 Ara
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
