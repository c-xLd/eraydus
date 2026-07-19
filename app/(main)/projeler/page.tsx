import { Metadata } from 'next'
import ProjelerClient from './ProjelerClient'

export const metadata: Metadata = {
  title: 'Projeler | Erayduş',
  description: 'Erayduş ile hayata geçirdiğimiz prestijli banyo ve duşakabin projelerini inceleyin.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/projeler`,
  }
}

export default function ProjelerPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Erayduş Projeleri",
    "description": "Erayduş markasına ait otel, rezidans, villa ve ticari projeler.",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/projeler`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <ProjelerClient />
    </>
  )
}
