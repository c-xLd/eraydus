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
      question: 'Ankara içinde ücretsiz ölçü ve keşif hizmetiniz var mı?',
      answer: 'Evet. Ankara genelinde (Çankaya, Çayyolu, Keçiören, Yenimahalle, Etimesgut, Batıkent ve tüm ilçelerde) adresinize gelerek banyonuzun net ölçüsünü tamamen ücretsiz alıyoruz.',
      sort_order: 1
    },
    {
      id: '2',
      question: 'Hangi cam kalınlığı ve modellerini kullanıyorsunuz?',
      answer: 'Tüm duşakabinlerimizde darbelere karşı 5 kat dayanıklı 6mm temperli emniyet camı kullanıyoruz.',
      sort_order: 2
    },
    {
      id: '3',
      question: 'Siparişim ne kadar sürede üretilir ve montajı nasıl yapılır?',
      answer: 'Ölçü onayının ardından Siteler / Ankara imalatımızda 3-5 iş günü içerisinde duşakabininiz hazırlanır. Kendi uzman montaj ekibimiz adresinize gelerek 1-2 saat içinde temiz, güvenli ve garantili montajı tamamlar.',
      sort_order: 3
    },
    {
      id: '4',
      question: 'Duşakabinde banyoya su sızdırma problemi yaşar mıyım?',
      answer: 'Kesinlikle hayır. Güçlü mıknatıslı fitiller, su tutucu alt eşik profilleri ve antibakteriyel banyo silikonu uygulamamız ile su sızdırmazlık garantisi veriyoruz.',
      sort_order: 4
    },
    {
      id: '5',
      question: 'Garanti süreniz ne kadar ve neleri kapsıyor?',
      answer: 'Tüm duşakabin sistemlerimiz 2 Yıl Resmi Üretici Garantisi altındadır. İmalat, montaj, profil veya sızdırmazlık kaynaklı sorunlar ücretsiz giderilir. İlerleyen dönemlerde olası kaza durumlarında fabrikamızdan uygun fiyatla birebir orijinal yedek parça temin edilir.',
      sort_order: 5
    },
    {
      id: '6',
      question: 'Banyom standart ölçüde değil veya eğimli, özel üretim yapıyor musunuz?',
      answer: 'Evet. Duşakabinlerimizin tamamı fabrikasyon hazır paket değil, banyonuzun ölçüsüne, tavan yüksekliğine ve varsa kolon/kiriş detaylarına göre özel olarak imal edilir.',
      sort_order: 6
    }
  ];

  const safeTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      role: 'Çankaya, Ankara',
      quote: 'Banyomuzun ölçüsü standart dışıydı. Ücretsiz keşfe gelip yerinde ölçü aldılar, 4 gün içinde tam oturan harika bir duşakabin monte ettiler. İşçilik ve malzeme çok kaliteli.',
      rating: 5,
      image_url: ''
    },
    {
      id: '2',
      name: 'Merve Öztürk',
      role: 'Çayyolu, Ankara',
      quote: 'Siyah profilli ve füme camlı duşakabin sipariş ettik. Banyonun havası tamamen değişti. Cam kalitesi ve silikon işçiliği tertemiz. Erayduş ekibine sonsuz teşekkürler.',
      rating: 5,
      image_url: ''
    },
    {
      id: '3',
      name: 'Serkan Kaya',
      role: 'Keçiören, Ankara',
      quote: 'Eski duşakabinimizin su sızdırmasından bıkmıştık. Erayduş imalatı yeni kabinde 1 damla bile su dışarı çıkmıyor. Montaj ekibi de çok bilgili ve saygılıydı.',
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
      <div className="cv-auto">
        <StatementSection />
      </div>
      <div className="cv-auto">
        <CraftsmanshipSection />
      </div>
      <div className="cv-auto">
        <WhyEraydusSection />
      </div>
      <div className="cv-auto">
        <ConfiguratorPreview />
      </div>
      <div className="cv-auto">
        <TestimonialsSection testimonials={safeTestimonials} />
      </div>
      <div className="cv-auto">
        <FAQSection faqs={safeFaqs} />
      </div>
      <div className="cv-auto">
        <FinalCTASection />
      </div>
    </div>
  )
}

