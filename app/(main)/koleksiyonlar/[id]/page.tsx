import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check, Ruler, Info, Box } from "lucide-react"
import { getProductById } from "@/features/products/services/products"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const id = (await params).id
  const product = await getProductById(id)
  if (!product) return { title: 'Bulunamadı' }
  return { title: `${product.name} | Erayduş` }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const product = await getProductById(id)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-[1440px]">
        {/* Back Link */}
        <Link 
          href="/koleksiyonlar" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Koleksiyonlara Dön
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Gallery Sticky */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-muted relative border border-border">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6">
                <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                  {product.collectionName}
                </span>
              </div>
            </div>
            {product.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-6">
                {product.gallery.map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Content & Specs */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">{product.name}</h1>
            <p className="text-2xl font-medium text-champagne mb-8">₺{product.price ? product.price.toLocaleString('tr-TR') : '0'}'den başlayan fiyatlarla</p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {product.longDescription}
            </p>

            <Link 
              href={`/configurator?model=${product.id}`}
              className="flex items-center justify-center gap-3 w-full py-5 rounded-xl bg-champagne text-black font-semibold hover:bg-champagne/90 transition-all shadow-[0_0_20px_rgba(201,168,106,0.2)] hover:shadow-[0_0_30px_rgba(201,168,106,0.4)] mb-16 hover:scale-[1.02]"
            >
              <Box className="size-5" />
              Bu Modeli Konfigüre Et
            </Link>

            <div className="space-y-16">
              {/* Technical Specs */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Ruler className="size-5 text-champagne" />
                  Teknik Özellikler
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Cam Kalınlığı</span>
                    <span className="font-semibold">{product.technicalSpecs.glassThickness.join(', ')}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Standart Yükseklik</span>
                    <span className="font-semibold">{product.technicalSpecs.height}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Genişlik Aralığı</span>
                    <span className="font-semibold">{product.technicalSpecs.widthRange}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Montaj Tipi</span>
                    <span className="font-semibold">{product.technicalSpecs.installation}</span>
                  </div>
                </div>
              </div>

              {/* Compatible Glass Options */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Info className="size-5 text-champagne" />
                  Uyumlu Cam Seçenekleri
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.compatibleGlass.map((glass) => (
                    <div key={glass.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-champagne/30 transition-colors bg-surface">
                      <div className={`size-12 rounded-lg border border-border/50 shadow-inner overflow-hidden relative`}>
                        {/* Background for transparency demo */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=200&auto=format&fit=crop')] bg-cover opacity-50" />
                        <div className={`absolute inset-0 ${glass.colorClass}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{glass.name}</p>
                        <p className="text-xs text-muted-foreground">{glass.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatible Profile Options */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Info className="size-5 text-champagne" />
                  Uyumlu Profil Renkleri
                </h3>
                <div className="flex flex-wrap gap-4">
                  {product.compatibleProfiles.map((profile) => (
                    <div key={profile.id} className="group relative">
                      <div 
                        className="size-12 rounded-full border border-border shadow-md transition-transform group-hover:scale-110"
                        style={{ backgroundColor: profile.hex }}
                      />
                      <div className="absolute top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white text-[10px] px-2 py-1 rounded z-10 pointer-events-none">
                        {profile.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="p-8 rounded-2xl bg-surface border border-border">
                <h3 className="text-xl font-semibold mb-6">Öne Çıkan Özellikler</h3>
                <ul className="space-y-4">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/80">
                      <Check className="size-5 text-champagne flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
