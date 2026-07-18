import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'Erayduş kişisel verilerinizin güvenliğine ve gizliliğine saygı duyar. Gizlilik politikamızı buradan inceleyebilirsiniz.'
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">Gizlilik Politikası</h1>
        <p className="text-muted-foreground mb-12">Son Güncelleme: 1 Temmuz 2026</p>

        <div className="prose prose-lg prose-invert max-w-none text-muted-foreground space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Giriş</h2>
            <p>
              Erayduş (&quot;Şirket&quot;, &quot;biz&quot;, &quot;bize&quot; veya &quot;bizim&quot;) olarak, gizliliğinize saygı duyuyor ve web sitemizi (&quot;eraydus.com.tr&quot;)
              kullanırken sağladığınız kişisel bilgileri korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, hakkınızda ne tür bilgiler 
              topladığımızı, bu bilgileri nasıl kullandığımızı ve koruduğumuzu açıklamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Topladığımız Bilgiler</h2>
            <p>Sizden aşağıdaki bilgi türlerini toplayabiliriz:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Kişisel Tanımlayıcı Bilgiler:</strong> Ad, soyad, e-posta adresi, telefon numarası ve posta adresi (İletişim formu veya sipariş oluşturulduğunda).</li>
              <li><strong>Cihaz ve Kullanım Verileri:</strong> IP adresiniz, tarayıcı türünüz, işletim sisteminiz ve sitemizdeki gezinme davranışlarınız (Çerezler vasıtasıyla).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Bilgilerin Kullanımı</h2>
            <p>Topladığımız bilgileri şu amaçlarla kullanırız:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Duşakabin tasarım ve sipariş taleplerinizi karşılamak.</li>
              <li>Müşteri hizmetleri sunmak ve sorularınıza yanıt vermek.</li>
              <li>Sitemizin performansını artırmak ve kullanıcı deneyimini iyileştirmek.</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Bilgi Paylaşımı</h2>
            <p>
              Kişisel bilgilerinizi asla üçüncü taraflara satmıyoruz. Yalnızca kargo/montaj süreçleri için iş ortaklarımızla veya 
              yasal mercilerden gelen yasal talepler doğrultusunda gerekli kurumlarla veri paylaşımı yapmaktayız.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. İletişim</h2>
            <p>
              Gizlilik Politikamız veya verilerinizle ilgili her türlü soru ve talebiniz için bizimle iletişime geçebilirsiniz:
            </p>
            <p className="mt-4">
              <strong>Erayduş</strong><br />
              Ankara, Türkiye<br />
              E-posta: info@eraydus.com.tr<br />
              Telefon: +90 555 123 4567
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
