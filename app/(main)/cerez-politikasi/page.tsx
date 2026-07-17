import { Metadata } from 'next'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Çerez Politikası',
  description: 'Erayduş web sitesi çerez politikası ve çerez kullanım amaçları.'
}

export default function CookiePolicyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
            Yasal Bilgilendirme
          </p>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">Çerez <span className="font-semibold">Politikası</span></h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-surface/50 w-max px-4 py-2 rounded-full border border-border/50">
            <FileText className="w-4 h-4 text-champagne" />
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
              Bu politika, eraydus.com.tr ziyaretçilerinin sitemizi daha verimli kullanabilmesi ve deneyimlerinin iyileştirilmesi amacıyla kullanılan çerezlerin türleri ve kullanım şekilleri hakkında bilgi vermeyi amaçlamaktadır.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">01 //</span>
                  Çerez Nedir?
                </h2>
                <p>
                  Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza 
                  (bilgisayar, akıllı telefon, tablet vb.) kaydedilen küçük metin dosyalarıdır. Çerezler, sitenin 
                  sizi hatırlamasını ve sitemizi daha verimli kullanmanızı sağlar.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">02 //</span>
                  Hangi Çerezleri Kullanıyoruz?
                </h2>
                <p>Sitemizde aşağıdaki çerez türlerini kullanmaktayız:</p>
                <ul>
                  <li><strong className="text-foreground">Zorunlu Çerezler:</strong> Sitenin düzgün çalışması ve temel güvenlik özellikleri için gereklidir (Örn: Oturum açma, form gönderimi).</li>
                  <li><strong className="text-foreground">Performans ve Analiz Çerezleri:</strong> Sitemizi nasıl kullandığınızı analiz ederek (Örn: Google Analytics), sayfaların yüklenme hızını ve kullanıcı deneyimini optimize etmemize yardımcı olur.</li>
                  <li><strong className="text-foreground">İşlevsellik Çerezleri:</strong> Dil tercihi gibi site üzerindeki seçimlerinizi hatırlayarak daha kişiselleştirilmiş bir deneyim sunar.</li>
                </ul>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">03 //</span>
                  Çerezleri Nasıl Kontrol Edebilirsiniz?
                </h2>
                <p>
                  Tarayıcınızın ayarlarını değiştirerek çerezleri reddedebilir veya cihazınıza bir çerez gönderildiğinde 
                  uyarı alabilirsiniz. Ancak çerezleri devre dışı bırakmanız durumunda, sitemizdeki bazı özelliklerin 
                  (örneğin Konfigüratör) düzgün çalışmayabileceğini lütfen unutmayın.
                </p>
                <p className="mt-4">
                  Çerezlerin yönetimi hakkında daha fazla bilgi almak için tarayıcınızın "Yardım" menüsünü inceleyebilirsiniz.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">04 //</span>
                  Bize Ulaşın
                </h2>
                <p>
                  Çerez Politikamız ile ilgili sorularınız için bizimle her zaman <a href="mailto:info@eraydus.com.tr">info@eraydus.com.tr</a> 
                  adresi üzerinden iletişime geçebilirsiniz.
                </p>
              </section>
            </div>
            
          </div>
        </article>
      </div>
    </div>
  )
}
