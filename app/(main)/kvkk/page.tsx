import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında Erayduş aydınlatma metnini buradan okuyabilirsiniz.'
}

export default function KVKKPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">KVKK Aydınlatma Metni</h1>
        <p className="text-muted-foreground mb-12">Son Güncelleme: 1 Temmuz 2026</p>

        <div className="prose prose-lg prose-invert max-w-none text-muted-foreground space-y-8">
          <section>
            <p>
              Erayduş olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, veri sorumlusu sıfatıyla 
              kişisel verilerinizi hangi amaçlarla işlediğimiz, kimlere ve hangi amaçlarla aktarabileceğimiz, 
              toplama yöntemimiz ve hukuki sebepleri hakkında sizi aydınlatmak isteriz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. İşlenen Kişisel Verileriniz</h2>
            <p>Web sitemiz üzerinden bizimle paylaştığınız:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Kimlik ve İletişim Verileriniz:</strong> Adınız, soyadınız, telefon numaranız, e-posta adresiniz.</li>
              <li><strong>İşlem Güvenliği Verileriniz:</strong> IP adresiniz ve site içi gezinme log bilgileriniz.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. İşleme Amaçları ve Hukuki Sebepler</h2>
            <p>
              Kişisel verileriniz, &quot;Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla&quot; ve
              &quot;Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması&quot; hukuki sebeplerine dayanarak;
              ürün/hizmet satış süreçlerinin yürütülmesi, müşteri taleplerinin karşılanması ve yasal yükümlülüklerimizin 
              yerine getirilmesi amacıyla işlenmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Kişisel Verilerin Aktarılması</h2>
            <p>
              İşlenen kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda, kargo/lojistik iş ortaklarımıza, 
              yetkili kamu kurum ve kuruluşlarına yasal sınırlar çerçevesinde aktarılabilmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. İlgili Kişi Olarak Haklarınız</h2>
            <p>
              KVKK’nın 11. maddesi uyarınca, kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, 
              işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, verilerinizin silinmesini veya yok edilmesini talep etme 
              haklarına sahipsiniz. Başvurularınızı <strong>info@eraydus.com.tr</strong> adresine iletebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
