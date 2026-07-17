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
import { getHomepageFaqs, getTestimonials, getFeaturedCategories } from '@/features/homepage/services/homepage'

// Instant TTFB: statically prerender and refresh via ISR (data is all public).
export const revalidate = 3600

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

export default async function Home() {
  const [faqs, testimonials, categories] = await Promise.all([
    getHomepageFaqs(),
    getTestimonials(),
    getFeaturedCategories()
  ])

  // Fallback to static if no faqs found (before migration runs)
  const safeFaqs = faqs.length > 0 ? faqs : [
    {
      id: '1',
      question: 'Ölçü alma işlemi nasıl gerçekleştiriliyor?',
      answer: 'Profesyonel ölçüm ekibimiz, randevu oluşturmanızın ardından banyonuza gelerek lazer ölçüm cihazıyla milimetrik hassasiyette ölçüm yapar.',
      sort_order: 1
    }
  ];

  const safeTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      name: 'Elif Karaca',
      role: 'İç Mimar',
      quote: 'Projelerimde yıllardır Erayduş ile çalışıyorum...',
      rating: 5,
      image_url: ''
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": safeFaqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <StatementSection />
      <CraftsmanshipSection />
      <ProductShowcase categories={categories} />
      <WhyEraydusSection />
      <ConfiguratorPreview />
      <GlassCollectionSection />
      <TestimonialsSection testimonials={safeTestimonials} />
      <FAQSection faqs={safeFaqs} />
      <FinalCTASection />
    </div>
  )
}
