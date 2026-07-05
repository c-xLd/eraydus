'use client'

import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, CheckCircle, Tag, Ruler, Settings } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

interface ProjectDetail {
  id: number
  name: string
  location: string
  category: string
  description: string
  longDescription: string
  image: string
  gallery: string[]
  specs: {
    collection: string
    glass: string
    profile: string
    installationType: string
  }
  architectQuote: {
    quote: string
    author: string
    title: string
  }
}

const projectsData: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    name: 'The Bosphorus Palace Hotel',
    location: 'İstanbul, Beşiktaş',
    category: 'Otel',
    description: 'Tarihi dokuyla bütünleşen çerçevesiz PURE serisi cam kabinler.',
    longDescription: 'Bosphorus Palace Hotel’in tüm premium süit odaları için tasarlanan PURE serisi çerçevesiz duşakabin çözümleri, tarihi dokuyu bozmadan banyolara modern ve şeffaf bir zarafet katıyor. Boğaz manzaralı geniş banyolarda gün ışığının engellenmeden yayılmasını sağlayan optiwhite camlar tercih edilmiştir.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      collection: 'PURE Serisi (Profilsiz)',
      glass: '10mm Optiwhite Ultra Şeffaf, Nano Kaplamalı',
      profile: 'Donanım: Parlak Krom, Özel Tasarım Pirinç Menteşeler',
      installationType: 'Gömme Zemin Üzeri Montaj'
    },
    architectQuote: {
      quote: 'Erayduş’un çerçevesiz cam sistemleri, otelimizin tarihi dokusuyla mükemmel bir tezat oluşturarak modern konforu en şık biçimde sunmamızı sağladı.',
      author: 'Kerem Öztürk',
      title: 'Baş Mimar, Öztürk Mimarlık'
    }
  },
  2: {
    id: 2,
    name: 'Alaçatı Beyaz Rezidans',
    location: 'İzmir, Çeşme',
    category: 'Rezidans',
    description: 'Ege’nin ferahlığını yansıtan mat beyaz ve fırçalı altın detaylar.',
    longDescription: 'Alaçatı’nın karakteristik beyaz taş mimarisine uyum sağlaması amacıyla tasarlanan bu projede, EDGE serimizin fırçalı altın profil kaplamaları kullanılmıştır. Banyolarda ferahlığı maksimuma çıkarmak için nano kaplamalı kireç tutmayan şeffaf camlar kullanılmıştır.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      collection: 'EDGE Serisi (İnce Profil)',
      glass: '8mm Şeffaf Temperli Cam',
      profile: 'Mat Beyaz ve Fırçalı Altın Alüminyum',
      installationType: 'Duş Teknesi Üzeri Montaj'
    },
    architectQuote: {
      quote: 'Ege konseptini tamamlayan ince profilli altın aksanlar banyolara sıcak bir lüks hissiyatı kattı. Mühendislik detayları kusursuzdu.',
      author: 'Melis Şen',
      title: 'İç Mimar, Ege Design Studio'
    }
  },
  3: {
    id: 3,
    name: 'Bodrum Kıyı Villa',
    location: 'Muğla, Bodrum',
    category: 'Villa',
    description: 'Doğal taş banyolarda mat antrasit profil ve füme cam uyumu.',
    longDescription: 'Denize sıfır konumda yer alan lüks villada, doğal taş kaplamalı banyo tasarımlarını desteklemek adına füme temperli camlar ve mat antrasit profiller entegre edildi. İç mekandaki spa havası, geniş duş alanları ile desteklendi.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      collection: 'LUXURY Serisi',
      glass: '8mm Füme Renkli Temperli Cam',
      profile: 'Mat Antrasit (Gunmetal) Eloksallı Profil',
      installationType: 'Doğal Mermer Zemin Üzeri Menteşeli Pivot Kapı'
    },
    architectQuote: {
      quote: 'Taş ve mermer gibi kaba malzemeleri Erayduş’un ince metal detayları ve füme camıyla yumuşattık. Sonuç son derece dramatik ve lüks oldu.',
      author: 'Selim Arslan',
      title: 'Kurucu Mimar, Arslan Arch'
    }
  },
  4: {
    id: 4,
    name: 'Zorlu Center Premium Spa',
    location: 'İstanbul, Beşiktaş',
    category: 'Ticari',
    description: 'Nano kaplamalı buhar odası kapıları ve geniş cam bölmeler.',
    longDescription: 'İstanbul’un kalbindeki Zorlu Center’ın özel spa alanı için yüksek neme ve sıcaklığa dayanıklı menteşe donanımları geliştirildi. Buhar odası ve şok duş alanları için su lekesi barındırmayan nano cam teknolojisi uygulandı.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      collection: 'Özel Ticari Seri',
      glass: '10mm Yüksek Isıya Dayanıklı Şeffaf Cam',
      profile: '316 Kalite Paslanmaz Çelik Donanım',
      installationType: 'Özel Sızdırmazlık Contalı Buhar Kabini'
    },
    architectQuote: {
      quote: 'Sirkülasyonun yoğun olduğu bu spa alanında sızdırmazlık ve dayanıklılık kritikti. Erayduş bu beklentimizi fazlasıyla karşıladı.',
      author: 'Can Yılmaz',
      title: 'Proje Müdürü, Zorlu Proje Ofisi'
    }
  },
  5: {
    id: 5,
    name: 'Cappadocia Cave Suites',
    location: 'Nevşehir, Göreme',
    category: 'Otel',
    description: 'Mağara konseptine özel üretilen pivot kapılı duş kabinleri.',
    longDescription: 'Kapadokya’nın doğal kaya mağara odalarına standart duşakabinlerin monte edilmesi imkansızdı. Erayduş mühendisleri her odaya özel şablonlar çıkararak, kaya duvarların kıvrımlarına tam oturan özel pivot kapılı ve fırçalı altın menteşeli sistemler tasarladı.',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      collection: 'PURE Serisi (Özel Kesim)',
      glass: '8mm Şeffaf Temperli Cam (Kaya Yapısına Uygun Kesimli)',
      profile: 'Pirinç Üzeri Fırçalı Altın Kaplama Donanım',
      installationType: 'Mağara Duvarına Özel Ankrajlı Pivot Sistem'
    },
    architectQuote: {
      quote: 'Kaya yüzeylere montaj yapmak çok zorlu bir süreçti. Erayduş mühendislik ekibinin çıkardığı şablonlar sayesinde montaj sıfır hata ile tamamlandı.',
      author: 'Ayşe Karaca',
      title: 'Tarihi Restorasyon Uzmanı & Mimar'
    }
  },
  6: {
    id: 6,
    name: 'Nişantaşı Terrace Rezidans',
    location: 'İstanbul, Şişli',
    category: 'Rezidans',
    description: 'Fluted çizgili camlarla retro-modern banyo tasarımı.',
    longDescription: 'Lüks rezidans dairelerinde gizliliği estetik bir dokuyla sağlamak amacıyla dikey çizgili Fluted (oluklu) camlar kullanıldı. Mat siyah profiller ile birleştiğinde ortaya göz alıcı bir retro-modern atmosfer çıktı.',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      collection: 'EDGE Serisi',
      glass: '8mm Fluted Dikey Dokulu Cam',
      profile: 'Mat Siyah Elektrostatik Boyalı Profil',
      installationType: 'Zemin Drenaj Üzeri Sürgülü Kabin'
    },
    architectQuote: {
      quote: 'Fluted cam, ışığı çok güzel kırarak derinlikli bir banyo tasarımı yapmamıza olanak tanıdı. Siyah profillerle kontrastı harika oldu.',
      author: 'Emir Arıkan',
      title: 'İç Mimarlık Direktörü, Arıkan Studio'
    }
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  
  const project = projectsData[id]

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <h2 className="text-2xl font-light mb-4">Proje bulunamadı</h2>
        <Link href="/projects" className="text-champagne font-medium flex items-center gap-2">
          <ArrowLeft className="size-4" /> Projelere Geri Dön
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Back Header */}
      <div className="pt-28 md:pt-36 pb-8 border-b border-border bg-background sticky top-0 z-40">
        <div className="container mx-auto px-6 max-w-[1440px] flex items-center justify-between">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft className="size-4" /> Projelere Dön
          </Link>
          <span className="text-xs bg-muted text-foreground uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full">
            {project.category}
          </span>
        </div>
      </div>

      {/* Cinematic Main Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Title & Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
                <MapPin className="size-4 text-champagne" />
                <span className="text-sm font-light">{project.location}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-8">
                {project.name}
              </h1>
              <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
                {project.longDescription}
              </p>

              {/* Technical Specifications */}
              <div className="border border-border rounded-2xl p-6 bg-surface/50 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Settings className="size-4 text-champagne animate-spin-slow" />
                  Mühendislik Detayları
                </h3>
                <div className="h-[1px] bg-border" />
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-2 shrink-0">
                      <Tag className="size-3.5" /> Koleksiyon
                    </span>
                    <span className="text-sm font-medium text-right">{project.specs.collection}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-2 shrink-0">
                      <Ruler className="size-3.5" /> Cam Seçimi
                    </span>
                    <span className="text-sm font-medium text-right">{project.specs.glass}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-2 shrink-0">
                      <CheckCircle className="size-3.5" /> Profil / Donanım
                    </span>
                    <span className="text-sm font-medium text-right">{project.specs.profile}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-2 shrink-0">
                      <MapPin className="size-3.5" /> Montaj Biçimi
                    </span>
                    <span className="text-sm font-medium text-right">{project.specs.installationType}</span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-10 border-l-2 border-champagne pl-6 py-2 italic text-muted-foreground text-base">
                "{project.architectQuote.quote}"
                <div className="mt-3 not-italic text-xs font-semibold text-foreground uppercase tracking-wider">
                  {project.architectQuote.author} — <span className="text-muted-foreground font-normal">{project.architectQuote.title}</span>
                </div>
              </div>
            </div>

            {/* Giant Cinematic Image and Gallery */}
            <div className="lg:col-span-7 space-y-8">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {project.gallery.map((img, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-surface">
                    <img 
                      src={img} 
                      alt={`${project.name} Galeri ${index + 1}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to configurator */}
      <section className="py-20 bg-surface border-t border-border mt-auto">
        <div className="container mx-auto px-6 max-w-[1440px] text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-6">Bu Projedeki Konsepti Banyonuza Taşıyın</h2>
          <Link 
            href={`/configurator?collection=${project.specs.collection.toLowerCase().includes('pure') ? 'pure' : project.specs.collection.toLowerCase().includes('edge') ? 'edge' : 'luxury'}`} 
            className="inline-flex items-center justify-center bg-foreground text-background font-semibold px-8 h-14 rounded-full hover:bg-foreground/90 transition-colors shadow-lg"
          >
            Konfigüratörü Başlat
          </Link>
        </div>
      </section>
    </div>
  )
}
