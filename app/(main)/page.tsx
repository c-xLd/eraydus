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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ölçü alma işlemi nasıl gerçekleştiriliyor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Profesyonel ölçüm ekibimiz, randevu oluşturmanızın ardından banyonuza gelerek lazer ölçüm cihazıyla milimetrik hassasiyette ölçüm yapar."
        }
      },
      {
        "@type": "Question",
        "name": "Üretim süresi ne kadar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sipariş onayı ve ölçüm tamamlandıktan sonra standart üretim süremiz 7-10 iş günüdür. Özel tasarım ve kaplamalar için bu süre 12-15 iş gününe uzayabilir."
        }
      },
      {
        "@type": "Question",
        "name": "Garanti kapsamı neleri içeriyor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tüm ürünlerimiz 10 yıl üretici garantisi kapsamındadır. Bu garanti; cam bütünlüğü, profil korozyonu, menteşe ve rulman mekanizmaları ile su sızdırmazlık contalarını kapsar."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
