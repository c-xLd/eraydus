import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Çerez Politikası',
  description: 'Erayduş web sitesi çerez politikası ve çerez kullanım amaçları.'
}

export default function CookiePolicyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">Çerez Politikası</h1>
        <p className="text-muted-foreground mb-12">Son Güncelleme: 1 Temmuz 2026</p>

        <div className="prose prose-lg prose-invert max-w-none text-muted-foreground space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Çerez Nedir?</h2>
            <p>
              Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza 
              (bilgisayar, akıllı telefon, tablet vb.) kaydedilen küçük metin dosyalarıdır. Çerezler, sitenin 
              sizi hatırlamasını ve sitemizi daha verimli kullanmanızı sağlar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Hangi Çerezleri Kullanıyoruz?</h2>
            <p>Sitemizde aşağıdaki çerez türlerini kullanmaktayız:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması ve temel güvenlik özellikleri için gereklidir (Örn: Oturum açma, form gönderimi).</li>
              <li><strong>Performans ve Analiz Çerezleri:</strong> Sitemizi nasıl kullandığınızı analiz ederek (Örn: Google Analytics), sayfaların yüklenme hızını ve kullanıcı deneyimini optimize etmemize yardımcı olur.</li>
              <li><strong>İşlevsellik Çerezleri:</strong> Dil tercihi gibi site üzerindeki seçimlerinizi hatırlayarak daha kişiselleştirilmiş bir deneyim sunar.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
            <p>
              Tarayıcınızın ayarlarını değiştirerek çerezleri reddedebilir veya cihazınıza bir çerez gönderildiğinde 
              uyarı alabilirsiniz. Ancak çerezleri devre dışı bırakmanız durumunda, sitemizdeki bazı özelliklerin 
              (örneğin Konfigüratör) düzgün çalışmayabileceğini lütfen unutmayın.
            </p>
            <p className="mt-4">
              Çerezlerin yönetimi hakkında daha fazla bilgi almak için tarayıcınızın "Yardım" menüsünü inceleyebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Bize Ulaşın</h2>
            <p>
              Çerez Politikamız ile ilgili sorularınız için bizimle her zaman <strong>info@eraydus.com.tr</strong> 
              adresi üzerinden iletişime geçebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
