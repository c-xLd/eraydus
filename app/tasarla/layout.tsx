import { Metadata } from 'next'
import { pagesSeoData } from '@/lib/data/seo'

export async function generateMetadata(): Promise<Metadata> {
  const seoData = pagesSeoData.find(p => p.id === 'tasarla')

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

export default function TasarlaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
