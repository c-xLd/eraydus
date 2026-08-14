import { Metadata } from 'next'
import { ContactClient } from './ContactClient'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

export const metadata: Metadata = {
  title: 'İletişim & Showroom | Erayduş Ankara',
  description: 'Ankara Siteler duşakabin üretici firmamız ile iletişime geçin. Ücretsiz ölçü, keşif ve özel imalat fiyat teklifleri için bizi arayın.',
  alternates: {
    canonical: `${baseUrl}/iletisim`,
  },
  openGraph: {
    title: 'İletişim & Showroom | Erayduş Ankara',
    description: 'Ankara Siteler duşakabin üretici firmamız ile iletişime geçin. Ücretsiz ölçü, keşif ve özel imalat fiyat teklifleri.',
    url: `${baseUrl}/iletisim`,
    type: 'website',
  },
}

export default function ContactPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ERAYDUŞ Lüks Duşakabin Sistemleri',
    image: `${baseUrl}/images/og-default.svg`,
    '@id': `${baseUrl}/#localbusiness`,
    url: baseUrl,
    telephone: '+903123507939',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Malazgirt Caddesi No:121/1B, Siteler',
      addressLocality: 'Altındağ',
      addressRegion: 'Ankara',
      postalCode: '06160',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.957,
      longitude: 32.898,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'İletişim', item: `${baseUrl}/iletisim` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient />
    </>
  )
}
