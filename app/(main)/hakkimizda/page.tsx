import { getSitePage } from '@/features/pages/services/pages'
import AboutClient from './AboutClient'

export const metadata = {
  title: 'Hakkımızda | Erayduş',
  description: 'Erayduş markasının kuruluş hikayesi, değerleri ve üretim süreçleri.',
}

export const revalidate = 3600 // 1 hour caching

export default async function AboutPage() {
  const page = await getSitePage('hakkimizda')

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Erayduş markası ne zaman kuruldu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Erayduş, banyo sistemleri sektöründe 15 yılı aşkın süredir yenilikçi ve kaliteli çözümler üretmektedir."
        }
      },
      {
        "@type": "Question",
        "name": "Üretim tesisiniz nerede bulunuyor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Üretimimiz Ankara'daki 5.000m²'lik modern kapalı tesisimizde, en son teknoloji makinelerle yapılmaktadır."
        }
      },
      {
        "@type": "Question",
        "name": "Kişiye özel tasarım hizmetiniz var mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, uzman iç mimar ekibimizle banyonuzun ölçülerine ve tarzına özel ücretsiz 3D tasarım hizmeti sunuyoruz."
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
      <AboutClient content={page?.content} />
    </>
  )
}
