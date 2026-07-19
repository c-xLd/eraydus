import { Metadata } from 'next'
import IletisimClient from './IletisimClient'

export const metadata: Metadata = {
  title: 'İletişim | Erayduş',
  description: 'Bizimle iletişime geçin, banyonuz için en iyi çözümleri birlikte tasarlayalım.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/iletisim`,
  }
}

export default function IletisimPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Erayduş İletişim",
    "description": "Erayduş iletişim bilgileri ve formu.",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/iletisim`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Erayduş",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+90 (216) 540 00 00",
        "contactType": "customer service"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <IletisimClient />
    </>
  )
}
