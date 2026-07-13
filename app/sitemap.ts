import { MetadataRoute } from 'next'
import { getProducts } from '@/features/products/services/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: Alan adınızı buraya girin
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.eraydus.com'

  // Statik rotaları al
  const staticRoutes = [
    '/',
    '/hakkimizda',
    '/iletisim',
    '/koleksiyonlar',
    '/projeler',
    '/tasarla'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  // Dinamik ürün rotalarını al
  const products = await getProducts();
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/koleksiyonlar/${product.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
  
  // Koleksiyon sayfalarını (benzersiz) al
  const collectionIds = [...new Set(products.map(p => p.collectionId))];
  const collectionRoutes = collectionIds.map((collectionId) => ({
      url: `${baseUrl}/koleksiyonlar?collection=${collectionId}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
  }));


  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
