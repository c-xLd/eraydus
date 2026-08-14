import { Metadata } from 'next'
import { Lock, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | ERAYDUŞ Ankara',
  description: 'T.C. Kanunları ve 6698 sayılı KVKK uyarınca Erayduş müşteri gizliliği, veri güvenliği ve kişisel veri koruma politikası.'
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
            T.C. Yasal Mevzuat Uyumlu Yasal Metin
          </p>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">Gizlilik <span className="font-semibold">Politikası</span></h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-surface/50 w-max px-4 py-2 rounded-full border border-border/50">
            <Lock className="w-4 h-4 text-champagne" />
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
              ERAYDUŞ Lüks Duşakabin Sistemleri ("ERAYDUŞ") olarak, müşterilerimizin ve eraydus.net web sitemizi ziyaret eden kullanıcılarımızın gizliliğine, kişisel verilerinin korunmasına ve T.C. Anayasası ile yürürlükteki yasalara tam uyuma azami önem veriyoruz.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">01 //</span>
                  Veri Sorumlusu ve Amacı
                </h2>
                <p>
                  İşbu Gizlilik Politikası; 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK"), 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi Hakkında Kanun hükümleri uyarınca hazırlanmıştır.
                </p>
                <p className="mt-4">
                  Veri Sorumlusu sıfatıyla ERAYDUŞ; ücretsiz keşif, imalat, montaj, sipariş teslimatı ve satış sonrası garanti hizmetlerini sunarken işlediği kişisel verilerin gizliliğini ve güvenliğini en yüksek teknik tedbirlerle korumaktadır.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">02 //</span>
                  Toplanan Kişisel Veriler ve Yöntemi
                </h2>
                <p>Sizlerin izni veya kanuni zorunluluklar çerçevesinde aşağıdaki veriler toplanmaktadır:</p>
                <ul>
                  <li><strong className="text-foreground">Kimlik ve İletişim Bilgileri:</strong> Ad, soyad, telefon numarası, e-posta adresi, teslimat ve montaj adresi (Ücretsiz keşif talebi, sipariş ve iletişim formlarında).</li>
                  <li><strong className="text-foreground">Müşteri İşlem Bilgileri:</strong> Sipariş verilen duşakabin modeli, özel ölçü ve cam tercihleri, fatura bilgileri.</li>
                  <li><strong className="text-foreground">İşlem Güvenliği ve Trafik Bilgileri:</strong> 5651 sayılı kanun gereğince IP adresiniz, ziyaret tarih/saat logları ve sistem tercihleri.</li>
                </ul>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">03 //</span>
                  Kişisel Verilerin Kullanım Amaçları
                </h2>
                <p>Toplanan kişisel verileriniz yalnız yasal çerçevede ve aşağıdaki amaçlarla işlenmektedir:</p>
                <ul>
                  <li>Ankara genelinde adresinize özel ücretsiz keşif, imalat ve montaj süreçlerinin yürütülmesi,</li>
                  <li>Satış sonrası 2 yıl resmi garanti şartlarının ve teknik servis hizmetlerinin sağlanması,</li>
                  <li>Fatura ve muhasebe kayıtlarının T.C. Veri Usul Kanunu uyarınca düzenlenmesi,</li>
                  <li>Yetkili kamu kurum ve kuruluşlarından gelen resmi taleplerin karşılanması.</li>
                </ul>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">04 //</span>
                  Kişisel Verilerin Aktarımı ve Güvenliği
                </h2>
                <p>
                  Kişisel verileriniz kesinlikle üçüncü şahıslara satılmaz, kiralanmaz veya ticari amaçla devredilmez. Verileriniz yalnızca:
                </p>
                <ul>
                  <li>Sipariş teslimatı ve montaj hizmetini fiilen gerçekleştiren öz kadrolu montaj ekiplerimiz ve yetkili lojistik partnerlerimizle,</li>
                  <li>Yasal zorunluluk halinde mahkemeler ve yetkili idari mercilerle mevzuat sınırları dahilinde paylaşılmaktadır.</li>
                </ul>
                <p className="mt-4">
                  Sitemiz eraydus.net 256-bit SSL (Secure Sockets Layer) şifreleme sertifikasına sahip olup, sunucu ve veritabanı seviyesinde en üst düzey siber güvenlik standartları uygulanmaktadır.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">05 //</span>
                  Veri Sorumlusuna Başvuru ve İletişim
                </h2>
                <p>
                  6698 sayılı KVKK’nın 11. maddesi uyarınca veri sahibi olarak haklarınızı kullanmak veya verilerinizle ilgili bilgi almak için aşağıdaki kanallardan bize ulaşabilirsiniz:
                </p>
                
                <div className="mt-6 not-prose text-base leading-relaxed text-muted-foreground bg-background p-6 md:p-8 rounded-2xl border border-border/50 shadow-inner">
                  <div className="flex items-center gap-3 text-foreground font-semibold text-lg mb-4">
                    <ShieldCheck className="w-5 h-5 text-champagne" />
                    ERAYDUŞ Ankara Duşakabin Sistemleri
                  </div>
                  <p className="mb-2"><strong className="text-foreground">Adres:</strong> Malazgirt Caddesi No:121/1B, Siteler / Altındağ / Ankara</p>
                  <p className="mb-2"><strong className="text-foreground">Telefon:</strong> (0312) 350 79 39 &bull; 0554 883 00 71</p>
                  <p className="mb-2"><strong className="text-foreground">E-Posta:</strong> <a href="mailto:info@eraydus.net" className="text-champagne hover:underline">info@eraydus.net</a></p>
                  <p className="text-xs text-muted-foreground/80 mt-4 pt-4 border-t border-border/40">
                    Başvurularınız T.C. KVKK mevzuatına uygun olarak en geç 30 (otuz) gün içerisinde ücretsiz olarak sonuçlandırılacaktır.
                  </p>
                </div>
              </section>
            </div>
            
          </div>
        </article>
      </div>
    </div>
  )
}
