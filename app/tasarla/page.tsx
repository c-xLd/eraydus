import { createClient } from '@/services/supabase/server'
import { TasarlaClient } from './TasarlaClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Özel Ölçü Duşakabin Tasarla ve Fiyat Al | Erayduş',
  description: 'Türkiye\'nin en gelişmiş 2D duşakabin tasarım aracı. Kendi özel ölçü duşakabininizi (kare, oval, iki duvar arası) tasarlayın, cam tipini ve profil rengini seçip anında online fiyat hesaplayın.',
  keywords: 'özel ölçü duşakabin tasarla, duşakabin fiyat hesaplama, ankara duşakabin, özel üretim duşakabin, kumlama cam duşakabin, online duşakabin siparişi',
  alternates: {
    canonical: 'https://eraydus.net/tasarla',
  },
  openGraph: {
    title: 'Özel Ölçü Duşakabin Tasarla ve Fiyat Al | Erayduş',
    description: 'Kendi özel ölçü duşakabininizi tasarlayın, cam tipini ve profil rengini seçip anında online fiyat teklifi alın.',
    url: 'https://eraydus.net/tasarla',
    siteName: 'Erayduş',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Özel Ölçü Duşakabin Tasarla ve Fiyat Al | Erayduş',
    description: 'Kendi özel ölçü duşakabininizi tasarlayın, anında fiyat hesaplayın.',
  },
}

export const revalidate = 3600 // 1 hour ISR caching

interface SandblastedModelRow {
  id: string | number
  title: string | null
  name: string | null
  image_url: string | null
}

import { redirect } from 'next/navigation'
import { getGeneralSettings } from '@/lib/data/settings'

export default async function TasarlaPage() {
  const settings = await getGeneralSettings()
  if (!settings.enableOnlineQuotes) {
    redirect('/')
  }

  const supabase = await createClient()

  let modelsData: SandblastedModelRow[] = []
  try {
    const { data } = await supabase
      .from('sandblasted_models')
      .select('*')
    if (data && data.length > 0) {
      modelsData = data as SandblastedModelRow[]
    }
  } catch (err) {
    console.error('Error fetching sandblasted_models for tasarla:', err)
  }

  const mappedPatterns = modelsData.filter((model) => Boolean(model.image_url)).map((m) => ({
    id: String(m.id),
    title: m.title || m.name || 'Kumlama Deseni',
    image_url: m.image_url as string,
  }))

  // Structured Data for WebApplication
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Erayduş Özel Ölçü Duşakabin Tasarım ve Fiyat Hesaplama Aracı",
    "url": "https://eraydus.net/tasarla",
    "description": "Türkiye'nin en gelişmiş 2D duşakabin tasarım aracı. İki duvar arası, köşe veya tek cam duşakabin modellerini özel ölçülerinize göre tasarlayarak cam ve profil özelliklerini belirleyin.",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "TRY",
      "price": "0",
      "availability": "https://schema.org/InStock",
      "description": "Tasarım aracı ücretsizdir. Tasarım sonucunda ücretsiz özel fiyat teklifi alabilirsiniz."
    },
    "featureList": [
      "Özel ölçü duşakabin hesaplama",
      "Gerçek zamanlı 2D tasarım",
      "Kumlama desen seçimi",
      "Cam ve profil renk seçimi",
      "Zemin ve kulp konfigürasyonları"
    ],
    "provider": {
      "@type": "Organization",
      "name": "Erayduş",
      "url": "https://eraydus.net"
    }
  }

  // FAQ Schema for Rich Snippets
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Özel ölçü duşakabin siparişi nasıl verilir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Erayduş Tasarla aracı üzerinden banyonuzun tipini (iki duvar arası, kare, oval), genişlik ve yükseklik ölçülerini girerek, cam ve profil renklerini seçebilir ve anında online fiyat alarak siparişinizi oluşturabilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Duşakabin fiyatları nasıl hesaplanır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Duşakabin fiyatları; seçilen modelin ölçülerine, kullanılan cam tipine (şeffaf, füme, bronz, kumlama), profil rengine ve özel donanımlara (kulp, zemin tipi) göre otomatik olarak hesaplanmaktadır."
        }
      },
      {
        "@type": "Question",
        "name": "Kumlama cam duşakabin nedir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kumlama cam, standart şeffaf cam yüzeyine özel desenlerin işlendiği, banyoda mahremiyet sağlayan ve leke tutmayan estetik bir cam çeşididir. Erayduş tasarım aracında 15'ten fazla kumlama deseni arasından seçim yapabilirsiniz."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      
      {/* Visualizer takes exactly 100dvh */}
      <TasarlaClient sandblastedModels={mappedPatterns} />

      {/* Semantic SEO Content Below Fold */}
      <article className="w-full bg-white text-[#333] pt-24 pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <header className="mb-16 text-center max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 tracking-tight">Kusursuz Banyo Deneyimi İçin<br/>Özel Ölçü Duşakabin Tasarımı</h2>
             <p className="text-[16px] leading-relaxed text-[#666]">
               Banyonuzun alanına ve ölçülerine tam uyum sağlayan lüks duşakabin modellerini, Türkiye'nin en gelişmiş online 2D tasarım aracıyla kendiniz oluşturun. İstediğiniz ölçüleri milimetrik olarak belirleyin, tarzınıza uygun cam ve profil seçenekleriyle hayalinizdeki duşakabini tasarlayın.
             </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
             <section className="flex flex-col gap-4">
                <div className="size-12 rounded-full bg-[#f8f8f8] flex items-center justify-center text-black mb-2">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 className="text-xl font-bold text-black">Anında Fiyat Hesaplama</h3>
                <p className="text-[15px] text-[#666] leading-relaxed">
                  Tasarım süreciniz boyunca yaptığınız her değişiklik (cam tipi, profil rengi, ölçüler) fiyata anında yansır. Sürpriz maliyetler olmadan şeffaf bir şekilde alışverişinizi tamamlayabilirsiniz.
                </p>
             </section>
             
             <section className="flex flex-col gap-4">
                <div className="size-12 rounded-full bg-[#f8f8f8] flex items-center justify-center text-black mb-2">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                <h3 className="text-xl font-bold text-black">Özel Üretim Kalitesi</h3>
                <p className="text-[15px] text-[#666] leading-relaxed">
                  Girdiğiniz ölçülere göre tamamen size özel (custom-made) üretilen duşakabinler, temperli şişecam ve yüksek kalite alüminyum/paslanmaz çelik profiller ile uzun yıllar güvenli kullanım sunar.
                </p>
             </section>
             
             <section className="flex flex-col gap-4">
                <div className="size-12 rounded-full bg-[#f8f8f8] flex items-center justify-center text-black mb-2">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <h3 className="text-xl font-bold text-black">Kumlama ve Cam Seçenekleri</h3>
                <p className="text-[15px] text-[#666] leading-relaxed">
                  Şeffaf, füme ve bronz cam seçeneklerinin yanı sıra, onlarca farklı kumlama (kısmi buzlu) desen arasından banyonuzun karakterine en uygun olanı seçerek eşsiz bir atmosfer yaratabilirsiniz.
                </p>
             </section>
          </div>
          
          <section className="mt-20 border-t border-[#eee] pt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-black mb-8 text-center">Sıkça Sorulan Sorular</h2>
            <div className="flex flex-col gap-6">
              <div className="bg-[#f9f9f9] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-black mb-2">Özel ölçü duşakabin siparişi nasıl verilir?</h3>
                <p className="text-[15px] text-[#666]">Erayduş Tasarla aracı üzerinden banyonuzun tipini (iki duvar arası, kare, oval), genişlik ve yükseklik ölçülerini girerek, cam ve profil renklerini seçebilir ve anında online fiyat alarak siparişinizi oluşturabilirsiniz.</p>
              </div>
              <div className="bg-[#f9f9f9] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-black mb-2">Duşakabin fiyatları nasıl hesaplanır?</h3>
                <p className="text-[15px] text-[#666]">Duşakabin fiyatları; seçilen modelin ölçülerine, kullanılan cam tipine (şeffaf, füme, bronz, kumlama), profil rengine ve özel donanımlara (kulp, zemin tipi) göre otomatik olarak hesaplanmaktadır.</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
