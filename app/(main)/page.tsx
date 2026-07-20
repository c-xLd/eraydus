import dynamic from 'next/dynamic'
import { HeroSection } from '@/features/homepage/components/HeroSection'
import { ProductShowcase } from '@/features/homepage/components/ProductShowcase'
import { Metadata } from 'next'
import { pagesSeoData } from '@/lib/data/seo'
import { getHomepageFaqs, getTestimonials, getFeaturedCategories } from '@/features/homepage/services/homepage'

// Below-the-fold components dynamically imported for ultra-low TBT and instant initial load
const StatementSection = dynamic(() => import('@/features/homepage/components/StatementSection').then(mod => mod.StatementSection))
const CraftsmanshipSection = dynamic(() => import('@/features/homepage/components/CraftsmanshipSection').then(mod => mod.CraftsmanshipSection))
const WhyEraydusSection = dynamic(() => import('@/features/homepage/components/WhyEraydusSection').then(mod => mod.WhyEraydusSection))
const ConfiguratorPreview = dynamic(() => import('@/features/homepage/components/ConfiguratorPreview').then(mod => mod.ConfiguratorPreview))
const TestimonialsSection = dynamic(() => import('@/features/homepage/components/TestimonialsSection').then(mod => mod.TestimonialsSection))
const FAQSection = dynamic(() => import('@/features/homepage/components/FAQSection').then(mod => mod.FAQSection))
const FinalCTASection = dynamic(() => import('@/features/homepage/components/FinalCTASection').then(mod => mod.FinalCTASection))

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

  // Fallback to static if no faqs found
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
      <ProductShowcase categories={categories} />
      <StatementSection />
      <CraftsmanshipSection />
      <WhyEraydusSection />
      <ConfiguratorPreview />
      <TestimonialsSection testimonials={safeTestimonials} />
      <FAQSection faqs={safeFaqs} />
      <FinalCTASection />
    </div>
  )
}

