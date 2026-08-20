import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Maximize2,
  MessageCircle,
  MoveHorizontal,
  Ruler,
  ShieldCheck,
} from 'lucide-react'

import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_E164, WHATSAPP_DIGITS } from '@/lib/data/contact'
import { PROGRAMMATIC_MATRIX } from '@/lib/seo/matrix'
import { getBreadcrumbSchema, getFAQSchema, getGraphSchema, serializeJsonLd } from '@/lib/seo/schemas'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'
const SIZE_SLUGS = ['80x80', '90x90'] as const

type SizeSlug = (typeof SIZE_SLUGS)[number]

interface SizePageDetails {
  image: string
  imageAlt: string
  eyebrow: string
  intro: string
  area: string
  idealFor: string
  recommendedDoor: string
  recommendation: string
  fitChecks: string[]
  options: Array<{ title: string; description: string; recommended?: boolean }>
  faqs: Array<{ question: string; answer: string }>
}

const SIZE_DETAILS: Record<SizeSlug, SizePageDetails> = {
  '80x80': {
    image: '/images/eray_chrome.jpg',
    imageAlt: 'Krom profilli kompakt 80x80 duşakabin örneği',
    eyebrow: 'Kompakt banyolar için alan kazandıran çözüm',
    intro:
      '80x80 duşakabin; küçük banyolarda duş alanını kontrollü biçimde ayırırken dolaşım alanını korumak isteyenler için güçlü bir seçenektir. Kapı açılımı için ekstra alan istemeyen köşe girişli sürgülü ve katlanır sistemler bu ölçüde öne çıkar.',
    area: '0,64 m²',
    idealFor: 'Kompakt banyo ve ebeveyn banyosu',
    recommendedDoor: 'Köşe girişli sürgülü veya katlanır',
    recommendation:
      'Net 80x80 cm alanlarda kapının banyo içine taşmaması önemlidir. Duvar gönyesi, batarya çıkıntısı ve lavabo mesafesi yerinde ölçülerek giriş açıklığı buna göre belirlenmelidir.',
    fitChecks: [
      'Lavabo ve klozet ile kapı açılımı arasındaki mesafe',
      'Duvarların dikliği ve zeminin su giderine eğimi',
      'Duş teknesinin dıştan dışa gerçek ölçüsü',
      'Batarya ve havlupan gibi sabit çıkıntıların konumu',
    ],
    options: [
      {
        title: 'Köşe girişli sürgülü',
        description: 'İki kanadın köşede açılması sayesinde küçük hacimde dengeli bir giriş açıklığı sağlar.',
        recommended: true,
      },
      {
        title: 'Katlanır kapılı',
        description: 'Kanatlar kendi üzerine toplandığı için kapı salınım alanını minimumda tutar.',
      },
      {
        title: 'Oval sürgülü',
        description: 'Kavisli ön yüz, dar geçiş alanlarında keskin köşeleri azaltan yumuşak bir plan sunar.',
      },
    ],
    faqs: [
      {
        question: '80x80 duşakabin kullanımı rahat mıdır?',
        answer:
          'Doğru kapı mekanizması seçildiğinde 80x80 cm ölçü günlük kullanım için işlevsel olabilir. Kullanıcının hareket ihtiyacı ve giriş açıklığı yerinde değerlendirilmelidir.',
      },
      {
        question: '80x80 duşakabin için hangi kapı sistemi daha uygundur?',
        answer:
          'Küçük banyolarda dışarı doğru açılım istemeyen köşe girişli sürgülü veya katlanır kapı sistemleri genellikle daha verimli kullanım sağlar.',
      },
      {
        question: '80x80 duşakabin tekne üzerine monte edilir mi?',
        answer:
          'Evet. Uyumlu bir 80x80 duş teknesi üzerine ya da su yalıtımı ve eğimi doğru hazırlanmış seramik zemine montaj yapılabilir.',
      },
      {
        question: 'Duş teknesi 80x80 ise kabin ölçüsü de tam 80x80 olur mu?',
        answer:
          'Her zaman değil. Teknenin montaj payı, duvar kaçıklığı ve profil bindirmesi net kabin ölçüsünü etkileyebilir. Üretimden önce yerinde ölçü alınması gerekir.',
      },
    ],
  },
  '90x90': {
    image: '/images/eray_black.jpg',
    imageAlt: 'Mat siyah profilli ferah 90x90 duşakabin örneği',
    eyebrow: 'Konfor ve alan kullanımının dengeli ölçüsü',
    intro:
      '90x90 duşakabin, rahat hareket alanı ile banyo yerleşimi arasında dengeli bir çözüm sunar. Kare, oval, sürgülü ve menteşeli sistem seçeneklerinin çoğuyla uyumlu olması sayesinde hem modern hem klasik banyolarda esnek biçimde planlanabilir.',
    area: '0,81 m²',
    idealFor: 'Standart ve geniş aile banyosu',
    recommendedDoor: 'Sürgülü, menteşeli veya pivot',
    recommendation:
      '90x90 cm alan daha fazla kapı seçeneğine izin verir; ancak menteşeli veya pivot kapılarda dış açılım mesafesi mutlaka kontrol edilmelidir. Sıfır zemin uygulamalarında gider eğimi ve profil oturum çizgisi birlikte planlanmalıdır.',
    fitChecks: [
      'Menteşeli kapı için güvenli dış açılım mesafesi',
      'Duş başlığı ve bataryanın kapıya göre konumu',
      'Seramik derzleri ile profil montaj hattının uyumu',
      'Sıfır zemin uygulamasında gider ve su eğimi',
    ],
    options: [
      {
        title: 'Kare sürgülü',
        description: 'Kapı kanatları ray üzerinde hareket eder; banyo içine veya dışına taşmadan pratik geçiş sağlar.',
        recommended: true,
      },
      {
        title: 'Menteşeli veya pivot',
        description: 'Yeterli dış açılım alanı bulunan banyolarda geniş ve doğrudan bir giriş hissi oluşturur.',
      },
      {
        title: 'Oval sürgülü',
        description: 'Kavisli formu ve köşe yerleşimiyle yumuşak hatlı, dengeli bir duş alanı meydana getirir.',
      },
    ],
    faqs: [
      {
        question: '90x90 duşakabine tekne gerekli midir?',
        answer:
          'Hayır. Duşakabin uygun su yalıtımı ve eğim hazırlanmış seramik zemine, mermer eşik üzerine veya uyumlu bir duş teknesine monte edilebilir.',
      },
      {
        question: '90x90 duşakabin kaç metrekare alan kaplar?',
        answer:
          '90x90 cm taban ölçüsü yaklaşık 0,81 m² duş alanına karşılık gelir. Profil ve montaj toleransları nedeniyle uygulama ölçüsü yerinde doğrulanmalıdır.',
      },
      {
        question: '90x90 ölçüde sürgülü mü menteşeli mi tercih edilmeli?',
        answer:
          'Banyo içinde kapı açılım alanı sınırlıysa sürgülü; geniş bir geçiş ve sade mekanizma isteniyorsa, yeterli açılım mesafesi şartıyla menteşeli veya pivot sistem tercih edilebilir.',
      },
      {
        question: '90x90 duşakabin özel ölçü üretilebilir mi?',
        answer:
          'Evet. Duvar ve zemin toleranslarına göre 90x90 nominal ölçü korunarak cam ve profiller yerinde alınan net ölçülere göre hazırlanabilir.',
      },
    ],
  },
}

function isSizeSlug(value: string): value is SizeSlug {
  return SIZE_SLUGS.includes(value as SizeSlug)
}

export const dynamicParams = false

export function generateStaticParams() {
  return SIZE_SLUGS.map((size) => ({ size }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ size: string }>
}): Promise<Metadata> {
  const { size } = await params
  if (!isSizeSlug(size)) return {}

  const config = PROGRAMMATIC_MATRIX[size]
  const canonical = `${SITE_URL}/dusakabin/${size}`

  return {
    title: config.title,
    description: config.metaDescription,
    keywords: [
      `${size} duşakabin`,
      `${size} duşakabin modelleri`,
      `${size} duşakabin fiyatları`,
      `${size} cam duşakabin`,
      `${size} kare duşakabin`,
      `${size} duş teknesi kabini`,
    ],
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title: config.title,
      description: config.metaDescription,
      siteName: 'ERAYDUŞ',
      images: [{
        url: `${SITE_URL}${SIZE_DETAILS[size].image}`,
        width: 1200,
        height: 1200,
        alt: SIZE_DETAILS[size].imageAlt,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.metaDescription,
      images: [`${SITE_URL}${SIZE_DETAILS[size].image}`],
    },
  }
}

export default async function ShowerSizePage({
  params,
}: {
  params: Promise<{ size: string }>
}) {
  const { size } = await params
  if (!isSizeSlug(size)) notFound()

  const config = PROGRAMMATIC_MATRIX[size]
  const details = SIZE_DETAILS[size]
  const relatedSize: SizeSlug = size === '80x80' ? '90x90' : '80x80'
  const pageUrl = `${SITE_URL}/dusakabin/${size}`
  const whatsappMessage = encodeURIComponent(
    `Merhaba, ${size} duşakabin için ölçü değerlendirmesi ve fiyat teklifi almak istiyorum.`,
  )

  const collectionSchema = {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: config.h1,
    description: config.metaDescription,
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: `${size} cm duşakabin`,
      description: details.intro,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      contentUrl: `${SITE_URL}${details.image}`,
      caption: details.imageAlt,
    },
  }
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Duşakabin Modelleri', url: '/urunler' },
    { name: `${size} Duşakabin`, url: `/dusakabin/${size}` },
  ])
  const faqSchema = getFAQSchema(details.faqs)
  const graphSchema = getGraphSchema([collectionSchema, breadcrumbSchema, faqSchema])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(graphSchema) }}
      />

      <article className="min-h-screen bg-background pb-24 pt-28 text-foreground md:pt-36">
        <nav aria-label="Ekmek kırıntısı" className="container mx-auto mb-8 max-w-[1200px] px-5 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <li><Link href="/" className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Ana Sayfa</Link></li>
            <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
            <li><Link href="/urunler" className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Duşakabin Modelleri</Link></li>
            <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
            <li aria-current="page" className="font-medium text-foreground">{size} Duşakabin</li>
          </ol>
        </nav>

        <header className="container mx-auto grid max-w-[1200px] items-center gap-10 px-5 pb-16 md:px-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pb-24">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-champagne/25 bg-champagne/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-champagne">
              <Ruler className="size-3.5" aria-hidden="true" />
              {config.badge}
            </span>
            <p className="mb-3 text-sm font-medium text-muted-foreground">{details.eyebrow}</p>
            <h1 className="text-balance text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
              <span className="font-semibold text-champagne">{size}</span> Duşakabin Modelleri
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {details.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${WHATSAPP_DIGITS}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 active:scale-[.98]"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                {size} için fiyat teklifi al
              </a>
              <Link
                href="/tasarla"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:border-champagne/50 hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Ölçünü tasarla <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-border/60 bg-muted">
            <Image
              src={details.image}
              alt={details.imageAlt}
              fill
              priority
              quality={85}
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-black/70 p-3 text-white backdrop-blur-md">
              <div className="rounded-xl bg-white/10 p-3">
                <span className="block text-[11px] text-white/60">Taban alanı</span>
                <strong className="mt-1 block text-lg">{details.area}</strong>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <span className="block text-[11px] text-white/60">Üretim</span>
                <strong className="mt-1 block text-sm">Yerinde ölçüye göre</strong>
              </div>
            </div>
          </div>
        </header>

        <section aria-labelledby="size-summary" className="border-y border-border/50 bg-muted/25">
          <div className="container mx-auto grid max-w-[1200px] gap-px px-5 py-12 sm:grid-cols-3 md:px-6">
            {[
              { icon: Maximize2, label: 'Kullanım alanı', value: details.idealFor },
              { icon: MoveHorizontal, label: 'Önerilen kapı', value: details.recommendedDoor },
              { icon: ShieldCheck, label: 'Cam seçeneği', value: 'Temperli emniyet camı' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="border-b border-border/50 py-5 last:border-0 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0">
                <Icon className="mb-4 size-5 text-champagne" aria-hidden="true" />
                <span className="block text-xs text-muted-foreground">{label}</span>
                <strong className="mt-1 block text-sm font-semibold">{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto max-w-[1200px] px-5 py-20 md:px-6 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[.2em] text-champagne">Kapı ve plan seçenekleri</span>
              <h2 id="size-summary" className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
                {size} alanda doğru sistemi seçin
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">{details.recommendation}</p>
            </div>
            <div className="grid gap-4">
              {details.options.map((option) => (
                <div key={option.title} className="rounded-2xl border border-border/60 bg-card p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold">{option.title}</h3>
                    {option.recommended && <span className="shrink-0 rounded-full bg-champagne/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-champagne">Önerilen</span>}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0A0A0A] py-20 text-white lg:py-28">
          <div className="container mx-auto grid max-w-[1200px] gap-12 px-5 md:px-6 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[.2em] text-champagne">Ölçü kontrol listesi</span>
              <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">Siparişten önce dört noktayı doğrulayın</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 md:text-base">
                Duvarlar her zaman tam dik olmayabilir. Nominal {size} ölçüsünü doğrudan siparişe çevirmek yerine montaj yüzeylerini birlikte kontrol etmek daha sağlıklı sonuç verir.
              </p>
            </div>
            <ul className="grid gap-3" aria-label={`${size} duşakabin ölçü kontrol listesi`}>
              {details.fitChecks.map((item) => (
                <li key={item} className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 text-sm text-white/85">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-champagne/15 text-champagne"><Check className="size-4" aria-hidden="true" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container mx-auto max-w-[1000px] px-5 py-20 md:px-6 lg:py-28">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[.2em] text-champagne">Sık sorulan sorular</span>
            <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">{size} duşakabin hakkında</h2>
          </div>
          <div className="space-y-3">
            {details.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-border/60 bg-card p-5 open:border-champagne/40 md:p-6">
                <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-5 font-semibold marker:hidden">
                  {faq.question}
                  <span aria-hidden="true" className="text-xl font-light text-champagne transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 border-t border-border/50 pt-4 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <aside className="container mx-auto max-w-[1200px] px-5 md:px-6" aria-label="İlgili ölçü ve iletişim">
          <div className="grid overflow-hidden rounded-[2rem] border border-border/60 bg-card lg:grid-cols-[.75fr_1.25fr]">
            <Link href={`/dusakabin/${relatedSize}`} className="group flex min-h-56 flex-col justify-between border-b border-border/60 p-7 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring lg:border-b-0 lg:border-r md:p-10">
              <span className="text-xs font-semibold uppercase tracking-[.2em] text-muted-foreground">Alternatif ölçü</span>
              <div>
                <strong className="text-3xl font-light"><span className="font-semibold text-champagne">{relatedSize}</span> duşakabini incele</strong>
                <span className="mt-3 flex items-center gap-2 text-sm font-semibold">Ölçü rehberine git <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </div>
            </Link>
            <div className="flex min-h-56 flex-col justify-between bg-foreground p-7 text-background md:p-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[.2em] text-champagne">Karar vermeden önce ölçelim</span>
                <h2 className="mt-4 max-w-xl text-3xl font-light tracking-tight md:text-4xl">Banyonuz için net ölçü ve sistem önerisi alın</h2>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={`https://wa.me/${WHATSAPP_DIGITS}?text=${whatsappMessage}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  <MessageCircle className="size-5" aria-hidden="true" /> WhatsApp
                </a>
                <a href={`tel:${BUSINESS_PHONE_E164}`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-background/20 px-5 text-sm font-semibold hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background">
                  {BUSINESS_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </aside>
      </article>
    </>
  )
}
