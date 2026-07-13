import { Metadata } from 'next'
import { JakuziClient } from './JakuziClient'
import { globalSeoData } from '@/lib/data/seo'

export const metadata: Metadata = {
  title: 'Jakuzi ve Küvet Modelleri | Lüks Banyo Deneyimi',
  description: 'Ankara jakuzi modelleri, lüks hidromasajlı küvetler, akrilik tekneler. Banyonuzda spaya dönüşen rahatlatıcı ve şık tasarımlar, güncel jakuzi fiyatları.',
  keywords: 'jakuzi, jakuzi modelleri, ankara jakuzi, hidromasajlı küvet, banyo küveti, akrilik tekne',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eraydus.com.tr'}/jakuzi-tekneler`,
  }
}

export default function JakuziPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Jakuzi modellerinizde masaj sistemi (jet) bulunuyor mu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, tüm lüks jakuzi modellerimiz hava ve su jetleriyle donatılmış hidromasaj sistemlerine sahiptir."
        }
      },
      {
        "@type": "Question",
        "name": "Akrilik tekneler sararma yapar mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kesinlikle hayır. Tüm küvet ve teknelerimiz 1. sınıf antibakteriyel dökme akrilik malzemeden üretilir. Sararma ve solmalara karşı 10 yıl garantilidir."
        }
      },
      {
        "@type": "Question",
        "name": "Ankara dışına montaj hizmetiniz var mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Şu an için jakuzi ve tekne montaj hizmetimiz ağırlıklı olarak Ankara ve ilçeleriyle sınırlıdır. Ancak toplu projelerde tüm Türkiye'ye hizmet veriyoruz."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <JakuziClient />
    </>
  )
}
