import { Metadata } from 'next'
import BayiClient from './BayiClient'

export const metadata: Metadata = {
  title: 'Bayi Başvurusu | Erayduş',
  description: 'Erayduş ailesine katılın, avantajlı bayi fırsatlarından yararlanın.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/bayi-basvurusu`,
  }
}

export default function BayiPage() {
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Bayi Başvurusu | Erayduş",
    "description": "Erayduş bayilik başvurusu formu.",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/bayi-basvurusu`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <BayiClient />
    </>
  )
}
