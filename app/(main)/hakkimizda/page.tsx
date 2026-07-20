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

  const graphSchema = getGraphSchema([orgSchema, localSchema])

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
