import { HeroSection } from '@/features/homepage/components/HeroSection'
import { StatementSection } from '@/features/homepage/components/StatementSection'
import { CraftsmanshipSection } from '@/features/homepage/components/CraftsmanshipSection'
import { ProductShowcase } from '@/features/homepage/components/ProductShowcase'
import { WhyEraydusSection } from '@/features/homepage/components/WhyEraydusSection'
import { ConfiguratorPreview } from '@/features/homepage/components/ConfiguratorPreview'
import { GlassCollectionSection } from '@/features/homepage/components/GlassCollectionSection'
import { TestimonialsSection } from '@/features/homepage/components/TestimonialsSection'
import { FAQSection } from '@/features/homepage/components/FAQSection'
import { FinalCTASection } from '@/features/homepage/components/FinalCTASection'
import { Metadata } from 'next'
import { pagesSeoData } from '@/lib/data/seo'

export async function generateMetadata(): Promise<Metadata> {
  const seoData = pagesSeoData.find(p => p.id === 'home')
  
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
export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <StatementSection />
      <CraftsmanshipSection />
      <ProductShowcase />
      <WhyEraydusSection />
      <ConfiguratorPreview />
      <GlassCollectionSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  )
}
