import { Metadata } from 'next'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında Erayduş aydınlatma metnini buradan okuyabilirsiniz.'
}

export default function KVKKPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
            Yasal Bilgilendirme
          </p>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">KVKK <span className="font-semibold">Aydınlatma Metni</span></h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-surface/50 w-max px-4 py-2 rounded-full border border-border/50">
            <Shield className="w-4 h-4 text-champagne" />
            <span>Son Güncelleme: 1 Temmuz 2026</span>
          </div>
        </header>

        {/* Content Document */}
        <article className="relative rounded-3xl bg-surface border border-border/50 p-8 md:p-12">
          {/* Subtle grid lines for architectural feel */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden opacity-[0.03]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>

          <div className="relative z-10 prose prose-lg prose-invert max-w-none prose-headings:font-light prose-headings:tracking-tight prose-a:text-champagne hover:prose-a:text-champagne/80 prose-li:text-muted-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:font-medium prose-strong:text-foreground">
            
            <p className="lead text-xl text-foreground/80 mb-10">
              Erayduş olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, veri sorumlusu sıfatıyla 
              kişisel verilerinizi hangi amaçlarla işlediğimiz, kimlere ve hangi amaçlarla aktarabileceğimiz, 
              toplama yöntemimiz ve hukuki sebepleri hakkında sizi aydınlatmak isteriz.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">01 //</span>
                  İşlenen Kişisel Verileriniz
                </h2>
                <p>Web sitemiz üzerinden bizimle paylaştığınız:</p>
                <ul>
                  <li><strong className="text-foreground">Kimlik ve İletişim Verileriniz:</strong> Adınız, soyadınız, telefon numaranız, e-posta adresiniz.</li>
                  <li><strong className="text-foreground">İşlem Güvenliği Verileriniz:</strong> IP adresiniz ve site içi gezinme log bilgileriniz.</li>
                </ul>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">02 //</span>
                  İşleme Amaçları ve Hukuki Sebepler
                </h2>
                <p>
                  Kişisel verileriniz, "Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla" ve 
                  "Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması" hukuki sebeplerine dayanarak; 
                  ürün/hizmet satış süreçlerinin yürütülmesi, müşteri taleplerinin karşılanması ve yasal yükümlülüklerimizin 
                  yerine getirilmesi amacıyla işlenmektedir.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">03 //</span>
                  Kişisel Verilerin Aktarılması
                </h2>
                <p>
                  İşlenen kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda, kargo/lojistik iş ortaklarımıza, 
                  yetkili kamu kurum ve kuruluşlarına yasal sınırlar çerçevesinde aktarılabilmektedir.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">04 //</span>
                  İlgili Kişi Olarak Haklarınız
                </h2>
                <p>
                  KVKK’nın 11. maddesi uyarınca, kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, 
                  işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, verilerinizin silinmesini veya yok edilmesini talep etme 
                  haklarına sahipsiniz. Başvurularınızı <strong>info@eraydus.com.tr</strong> adresine iletebilirsiniz.
                </p>
              </section>
            </div>
            
          </div>
        </article>
      </div>
    </div>
  )
}
