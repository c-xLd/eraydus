import { getSitePage } from '@/features/pages/services/pages'
import AboutClient from './AboutClient'
import { getOrganizationSchema, getLocalBusinessSchema, getGraphSchema } from '@/lib/seo/schemas'

export const metadata = {
  title: 'Hakkımızda & Fabrikamız | ERAYDUŞ Ostim OSB Ankara',
  description: '1997’den beri Ankara Ostim OSB fabrikamızda CNC temperli cam, PVD kararmaz profil ve özel ölçü lüks duşakabin üretimi gerçekleştiren ERAYDUŞ hakkında detaylı bilgi.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'}/hakkimizda`,
  },
}

export const revalidate = 3600 // 1 hour caching

export default async function AboutPage() {
  const page = await getSitePage('hakkimizda')

  const orgSchema = getOrganizationSchema()
  const localSchema = getLocalBusinessSchema()

  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Erayduş markası ne zaman ve nerede kuruldu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Erayduş, 1997 yılından beri Ankara Ostim Organize Sanayi Bölgesi’ndeki kendi fabrikasında yerli ve milli üretimiyle sektör lideridir."
        }
      },
      {
        "@type": "Question",
        "name": "Üretim tesisiniz ve kapasiteniz nedir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ankara Ostim OSB'de bulunan 5.000m² kapalı alan tesisimizde CNC cam rodajlama, temperleme fırınları ve elektrostatik boya hatlarımız ile yıllık 50.000+ kabin imalat kapasitesine sahibiz."
        }
      },
      {
        "@type": "Question",
        "name": "Kişiye ve projeye özel ölçü tasarım yapıyor musunuz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, uzman mimar ve teknik kadromuzla banyonuzun ölçülerine özel milimetrik üretim ve ücretsiz 3D tasarım danışmanlığı sunuyoruz."
        }
      }
    ]
  };

  const graphSchema = getGraphSchema([orgSchema, localSchema, faqSchema])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />
      <AboutClient content={page?.content} />
    </>
  )
}
