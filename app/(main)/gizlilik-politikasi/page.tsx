import { Metadata } from 'next'
import { Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'Erayduş kişisel verilerinizin güvenliğine ve gizliliğine saygı duyar. Gizlilik politikamızı buradan inceleyebilirsiniz.'
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
            Yasal Bilgilendirme
          </p>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">Gizlilik <span className="font-semibold">Politikası</span></h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-surface/50 w-max px-4 py-2 rounded-full border border-border/50">
            <Lock className="w-4 h-4 text-champagne" />
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
              Erayduş olarak, kişisel verilerinizin gizliliği ve güvenliği konusunda son derece hassasız. Müşterilerimizin mahremiyetine saygı duyuyor ve en üst standartlarda koruma sağlıyoruz.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">01 //</span>
                  Giriş
                </h2>
                <p>
                  Erayduş ("Şirket", "biz", "bize" veya "bizim") olarak, gizliliğinize saygı duyuyor ve web sitemizi ("eraydus.com.tr") 
                  kullanırken sağladığınız kişisel bilgileri korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, hakkınızda ne tür bilgiler 
                  topladığımızı, bu bilgileri nasıl kullandığımızı ve koruduğumuzu açıklamaktadır.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">02 //</span>
                  Topladığımız Bilgiler
                </h2>
                <p>Sizden aşağıdaki bilgi türlerini toplayabiliriz:</p>
                <ul>
                  <li><strong className="text-foreground">Kişisel Tanımlayıcı Bilgiler:</strong> Ad, soyad, e-posta adresi, telefon numarası ve posta adresi (İletişim formu veya sipariş oluşturulduğunda).</li>
                  <li><strong className="text-foreground">Cihaz ve Kullanım Verileri:</strong> IP adresiniz, tarayıcı türünüz, işletim sisteminiz ve sitemizdeki gezinme davranışlarınız (Çerezler vasıtasıyla).</li>
                </ul>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">03 //</span>
                  Bilgilerin Kullanımı
                </h2>
                <p>Topladığımız bilgileri şu amaçlarla kullanırız:</p>
                <ul>
                  <li>Duşakabin tasarım ve sipariş taleplerinizi karşılamak.</li>
                  <li>Müşteri hizmetleri sunmak ve sorularınıza yanıt vermek.</li>
                  <li>Sitemizin performansını artırmak ve kullanıcı deneyimini iyileştirmek.</li>
                  <li>Yasal yükümlülüklerimizi yerine getirmek.</li>
                </ul>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">04 //</span>
                  Bilgi Paylaşımı
                </h2>
                <p>
                  Kişisel bilgilerinizi asla üçüncü taraflara satmıyoruz. Yalnızca kargo/montaj süreçleri için iş ortaklarımızla veya 
                  yasal mercilerden gelen yasal talepler doğrultusunda gerekli kurumlarla veri paylaşımı yapmaktayız.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">05 //</span>
                  İletişim
                </h2>
                <p>
                  Gizlilik Politikamız veya verilerinizle ilgili her türlü soru ve talebiniz için bizimle iletişime geçebilirsiniz:
                </p>
                <p className="mt-4 not-prose text-base leading-relaxed text-muted-foreground bg-background p-6 rounded-2xl border border-border/50">
                  <strong className="text-foreground font-semibold block mb-2">Erayduş Genel Merkez</strong>
                  Ankara, Türkiye<br />
                  <span className="inline-flex items-center gap-2 mt-2"><strong className="text-foreground">E-posta:</strong> <a href="mailto:info@eraydus.com.tr" className="text-champagne hover:underline">info@eraydus.com.tr</a></span><br />
                  <span className="inline-flex items-center gap-2"><strong className="text-foreground">Telefon:</strong> <a href="tel:+905551234567" className="text-champagne hover:underline">+90 555 123 4567</a></span>
                </p>
              </section>
            </div>
            
          </div>
        </article>
      </div>
    </div>
  )
}
