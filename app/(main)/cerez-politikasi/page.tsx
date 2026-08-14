import { Metadata } from 'next'
import { FileText, Cookie, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Çerez Politikası | ERAYDUŞ Ankara',
  description: 'T.C. KVKK mevzuatına uygun ERAYDUŞ web sitesi çerez politikası, çerez türleri ve çerez tercihleri bilgilendirmesi.'
}

export default function CookiePolicyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
            KVKK Mevzuatı Uyumlu Bilgilendirme
          </p>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">Çerez <span className="font-semibold">Politikası</span></h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-surface/50 w-max px-4 py-2 rounded-full border border-border/50">
            <FileText className="w-4 h-4 text-champagne" />
            <span>Son Güncelleme: 10 Ağustos 2026</span>
          </div>
        </header>

        {/* Content Document */}
        <article className="relative rounded-3xl bg-surface border border-border/50 p-8 md:p-12 shadow-sm">
          {/* Grid background */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden opacity-[0.03]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>

          <div className="relative z-10 prose prose-lg prose-invert max-w-none prose-headings:font-light prose-headings:tracking-tight prose-a:text-champagne hover:prose-a:text-champagne/80 prose-li:text-muted-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:font-medium prose-strong:text-foreground">
            
            <p className="lead text-xl text-foreground/80 mb-10">
              Bu Çerez Politikası; ERAYDUŞ Lüks Duşakabin Sistemleri ("ERAYDUŞ") tarafından eraydus.net web sitemizin ziyaretçilerine, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve Kişisel Verileri Koruma Kurulu'nun Çerez Uygulamaları Hakkında Rehber ilkelerine uygun olarak sunulmaktadır.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">01 //</span>
                  Çerez (Cookie) Nedir?
                </h2>
                <p>
                  Çerezler, bir internet sitesini ziyaret ettiğinizde bilgisayarınız, akıllı telefonunuz veya tabletiniz gibi cihazlarınıza kaydedilen küçük metin dosyalarıdır. Çerezler sayesinde web sitemiz tercihlerinizi hatırlar, oturumunuzu güvenli tutar ve sitemizdeki 3D Konfigüratör gibi etkileşimli araçların sorunsuz çalışmasını sağlar.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">02 //</span>
                  Kullanılan Çerez Türleri ve Kullanım Amaçları
                </h2>
                <p>Sitemizde KVKK standartlarına uygun olarak aşağıdaki çerez türleri kullanılmaktadır:</p>
                <ul>
                  <li><strong className="text-foreground">Zorunlu Çerezler:</strong> Sitemizin temel işlevlerini (güvenli oturum açma, form gönderimi, SSL şifreleme) gerçekleştirebilmesi için hukuken zorunlu çerezlerdir. Devre dışı bırakılamazlar.</li>
                  <li><strong className="text-foreground">İşlevsellik ve Tercih Çerezleri:</strong> 3D Konfigüratör üzerinde seçtiğiniz duşakabin modeli, profil rengi, cam kalınlığı ve ölçü seçimlerinizi hatırlayarak size hızlı fiyat teklifi sunmamıza yarar.</li>
                  <li><strong className="text-foreground">Performans ve Analitik Çerezleri:</strong> Sitemizin ziyaretçi trafiğini, en çok incelenen sayfaları ve yüklenme hızlarını anonim olarak analiz ederek sitemizi sürekli iyileştirmemizi sağlar (Örn: Google Analytics).</li>
                </ul>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">03 //</span>
                  Çerezlerin Yönetimi ve Engellenmesi
                </h2>
                <p>
                  Dilediğiniz zaman internet tarayıcınızın (Chrome, Safari, Firefox, Edge) ayarlarını değiştirerek çerezleri reddedebilir veya engelleyebilirsiniz. Ancak zorunlu veya işlevsellik çerezlerini silmeniz durumunda sitemizdeki bazı interaktif araçlar (örneğin Konfigüratör) tam verimle çalışmayabilir.
                </p>
                
                <div className="mt-6 p-6 rounded-2xl bg-background border border-border/50 not-prose space-y-2 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-champagne" />
                    Popüler Tarayıcılarda Çerez Ayarları:
                  </p>
                  <p>&bull; <strong>Google Chrome:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler</p>
                  <p>&bull; <strong>Safari:</strong> Tercihler &gt; Gizlilik &gt; Çerezleri Engelle</p>
                  <p>&bull; <strong>Mozilla Firefox:</strong> Seçenekler &gt; Gizlilik ve Güvenlik &gt; Çerezler</p>
                  <p>&bull; <strong>Microsoft Edge:</strong> Ayarlar &gt; Site İzinleri &gt; Çerezler</p>
                </div>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">04 //</span>
                  İletişim ve Veri Sahibi Hakları
                </h2>
                <p>
                  Çerez Politikamız veya KVKK kapsamındaki haklarınız ile ilgili sorularınızı aşağıdaki kanallardan Veri Sorumlumuza iletebilirsiniz:
                </p>
                
                <div className="mt-6 not-prose text-base leading-relaxed text-muted-foreground bg-background p-6 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-2 font-semibold text-foreground mb-2">
                    <ShieldCheck className="w-5 h-5 text-champagne" />
                    ERAYDUŞ Ankara Duşakabin Sistemleri
                  </div>
                  <p>Malazgirt Caddesi No:121/1B, Siteler / Altındağ / Ankara</p>
                  <p className="mt-2"><strong className="text-foreground">E-Posta:</strong> <a href="mailto:info@eraydus.net" className="text-champagne hover:underline">info@eraydus.net</a></p>
                  <p><strong className="text-foreground">Telefon:</strong> (0312) 350 79 39 &bull; 0554 883 00 71</p>
                </div>
              </section>
            </div>
            
          </div>
        </article>
      </div>
    </div>
  )
}
