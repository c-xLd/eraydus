import type { Metadata } from 'next'
import { getBreadcrumbSchema, getFAQSchema, getGraphSchema } from '@/lib/seo/schemas'
import { getProducts } from '@/features/products/services/products'
import { DusakabinModelleriClient } from './client'

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
      <DusakabinModelleriClient products={products} faqs={faqs} />
    </>
  )
}
