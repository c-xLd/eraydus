import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // TODO: Alan adınızı buraya girin
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.eraydus.net'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Admin paneli gibi özel alanları engelle
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
