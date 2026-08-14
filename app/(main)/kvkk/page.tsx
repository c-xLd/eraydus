import { Metadata } from 'next'
import { Shield, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | ERAYDUŞ Ankara',
  description: '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında ERAYDUŞ Veri Sorumlusu Aydınlatma Metni.'
}

export default function KVKKPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
            6698 Sayılı Kanun Uyarınca Yasal Bilgilendirme
          </p>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">KVKK <span className="font-semibold">Aydınlatma Metni</span></h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-surface/50 w-max px-4 py-2 rounded-full border border-border/50">
            <Shield className="w-4 h-4 text-champagne" />
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
              ERAYDUŞ Lüks Duşakabin Sistemleri ("ERAYDUŞ") olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") m. 10 çerçevesinde; veri sorumlusu sıfatımızla, kişisel verilerinizin toplanma şekilleri, işlenme amaçları, hukuki sebepleri ve haklarınız hususunda sizleri bilgilendiriyoruz.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">01 //</span>
                  Veri Sorumlusunun Kimliği
                </h2>
                <p>
                  KVKK uyarınca Veri Sorumlusu; Malazgirt Caddesi No:121/1B, Siteler / Altındağ / Ankara adresinde faaliyet gösteren <strong>ERAYDUŞ Ankara Duşakabin Sistemleri</strong>'dir.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">02 //</span>
                  İşlenen Kişisel Veriler ve İşleme Amaçları
                </h2>
                <p>Web sitemiz, iletişim formlarımız ve keşif talepleriniz vasıtasıyla toplanan kişisel verileriniz:</p>
                <ul>
                  <li><strong className="text-foreground">Kimlik Bilgileri:</strong> Adınız, soyadınız.</li>
                  <li><strong className="text-foreground">İletişim ve Adres Bilgileri:</strong> Telefon numaranız, e-posta adresiniz, montaj ve teslimat adresiniz.</li>
                  <li><strong className="text-foreground">Müşteri İşlem Bilgileri:</strong> Seçilen duşakabin modeli, ölçü, profil rengi ve fatura detayları.</li>
                  <li><strong className="text-foreground">İşlem Güvenliği Bilgileri:</strong> IP adresiniz ve 5651 sayılı kanun gereği tutulan erişim logları.</li>
                </ul>
                <p className="mt-4">
                  Bu veriler; ücretsiz yerinde ölçüm alınması, özel ölçü üretim ve montaj süreçlerinin ifası, 2 yıl resmi garanti koşullarının takibi, faturalandırma ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">03 //</span>
                  Kişisel Verilerin İşlenmesinin Hukuki Sebepleri
                </h2>
                <p>Kişisel verileriniz, KVKK m. 5/2 uyarınca aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:</p>
                <ul>
                  <li><strong>a) Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması:</strong> Sipariş ve montaj hizmetinin yerine getirilmesi.</li>
                  <li><strong>b) Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi:</strong> Vergi Usul Kanunu uyarınca fatura düzenlenmesi ve 5651 sayılı kanun log yükümlülükleri.</li>
                  <li><strong>c) İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaatleri:</strong> Müşteri memnuniyetinin ve hizmet kalitesinin artırılması.</li>
                </ul>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">04 //</span>
                  Kişisel Verilerin Aktarılması
                </h2>
                <p>
                  Kişisel verileriniz, KVKK’nın 8. ve 9. maddelerine uygun olarak, yalnızca yukarıda sayılan amaçların gerçekleştirilmesi için montaj saha ekiplerimize, lojistik partnerlerimize ve yasal bir zorunluluk halinde yetkili kamu kurum ve kuruluşlarına aktarılmaktadır.
                </p>
              </section>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12" />

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-4">
                  <span className="text-sm font-mono text-champagne">05 //</span>
                  İlgili Kişinin (Veri Sahibinin) Hakları (KVKK m. 11)
                </h2>
                <p>KVKK'nın 11. maddesi uyarınca herkes ERAYDUŞ'a başvurarak kendisiyle ilgili;</p>
                <ul>
                  <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
                  <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
                  <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                  <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                  <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
                  <li>KVKK m. 7 uyarınca kişisel verilerin silinmesini veya yok edilmesini isteme.</li>
                </ul>
                
                <div className="mt-8 not-prose text-base leading-relaxed text-muted-foreground bg-background p-6 md:p-8 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-3 text-foreground font-semibold text-lg mb-4">
                    <ShieldCheck className="w-5 h-5 text-champagne" />
                    KVKK Başvuru Kanalları
                  </div>
                  <p className="mb-2">Taleplerinizi yazılı olarak veya veri sorumlusuna başvuru usulüne uygun şekilde iletebilirsiniz:</p>
                  <p className="mb-2"><strong className="text-foreground">Yazılı Adres:</strong> Malazgirt Caddesi No:121/1B, Siteler / Altındağ / Ankara</p>
                  <p className="mb-2"><strong className="text-foreground">E-Posta:</strong> <a href="mailto:info@eraydus.net" className="text-champagne hover:underline">info@eraydus.net</a></p>
                  <p className="mb-2"><strong className="text-foreground">Telefon:</strong> (0312) 350 79 39 &bull; 0554 883 00 71</p>
                </div>
              </section>
            </div>
            
          </div>
        </article>
      </div>
    </div>
  )
}
