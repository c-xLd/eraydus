import { Metadata } from 'next'
import { pagesSeoData } from '@/lib/data/seo'
import ShopClient from './ShopClient'

export async function generateMetadata(): Promise<Metadata> {
  const seoData = pagesSeoData.find(p => p.id === 'magaza')
  
  if (!seoData) return {}

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    robots: {
      index: seoData.isIndexable,
      follow: seoData.isIndexable,
    }
  }
}

export default function ShopPage() {
  return <ShopClient />
}
