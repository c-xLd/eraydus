import { getSitePage } from '@/features/pages/services/pages'
import AboutClient from './AboutClient'
import { getBreadcrumbSchema, getGraphSchema, serializeJsonLd } from '@/lib/seo/schemas'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

export const metadata = {
  title: 'Hakkımızda & Fabrikamız | ERAYDUŞ Siteler Ankara',
  description: '1997’den beri Ankara Siteler fabrikamızda temperli emniyet camı, solmaz renkli profil ve özel ölçü lüks duşakabin üretimi gerçekleştiren ERAYDUŞ hakkında detaylı bilgi.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'}/hakkimizda`,
  },
}

export const revalidate = 3600 // 1 hour caching

export default async function AboutPage() {
  const page = await getSitePage('hakkimizda')

  // Organization and LocalBusiness are already emitted once by the root layout.
  // Repeating those entities here makes Google merge duplicate aggregate ratings.
  const aboutPageSchema = {
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/hakkimizda#webpage`,
    url: `${SITE_URL}/hakkimizda`,
    name: 'ERAYDUŞ Hakkımızda ve Fabrikamız',
    description: metadata.description,
    inLanguage: 'tr-TR',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Anasayfa', url: SITE_URL },
    { name: 'Hakkımızda', url: `${SITE_URL}/hakkimizda` },
  ])

  const graphSchema = getGraphSchema([aboutPageSchema, breadcrumbSchema])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(graphSchema) }}
      />
      <AboutClient content={page?.content} />
    </>
  )
}
