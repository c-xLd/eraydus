import Link from 'next/link'
import { Mail, Phone, MapPin, ShieldCheck, Wrench } from 'lucide-react'
import { NewsletterForm } from './NewsletterForm'
import { getGeneralSettings } from '@/lib/data/settings'

export async function Footer() {
  const settings = await getGeneralSettings()
  const cleanNumber = settings.whatsappNumber.replace(/[^0-9+]/g, '')
  const formattedPhone = settings.whatsappNumber
  const contactEmail = settings.contactEmail
  return (
    <footer className="bg-[#0A0A0A] text-white font-sans">
      {/* Newsletter Band */}
      <div className="border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-[1440px] py-10 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
          <div>
            <h3 className="text-xl lg:text-2xl font-light tracking-wide mb-2">Banyo mekânınızı fark yaratan detaylarla şekillendirin</h3>
            <p className="text-white/75 text-sm">Özel duşakabin tasarımları ve çözümlerimizden ilk haberdar olan siz olun.</p>
          </div>
          <div className="w-full lg:w-auto">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 max-w-[1440px] py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white to-white/80 flex items-center justify-center shadow-lg">
                <span className="text-xs font-black tracking-tighter text-black">E</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider">ERAYDUŞ</span>
                <span className="text-[9px] font-medium tracking-[0.25em] text-white/70 uppercase">Ankara Duşakabin Sistemleri</span>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm font-light">
              Ankara Siteler merkezli duşakabin firması olarak 6mm temperli emniyet camı ve paslanmaz alüminyum profil sistemleri ile özel ölçü duşakabin imalatı ve ücretsiz montaj hizmeti sunuyoruz.
            </p>
            <div className="space-y-3 text-sm text-white/80 pt-2 font-light">
              <a href="tel:+903123507939" className="flex items-center gap-3 hover:text-white transition-colors w-fit group">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Phone className="size-4 text-white" />
                </div>
                <span>(0312) 350 79 39</span>
              </a>
              <a href={`tel:${cleanNumber}`} className="flex items-center gap-3 hover:text-white transition-colors w-fit group">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Phone className="size-4 text-white" />
                </div>
                <span>{formattedPhone}</span>
              </a>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 hover:text-white transition-colors w-fit group">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Mail className="size-4 text-white" />
                </div>
                <span>{contactEmail}</span>
              </a>
              <div className="flex items-center gap-3 w-fit text-white/80">
                <div className="p-2 rounded-lg bg-white/10">
                  <MapPin className="size-4 text-white" />
                </div>
                <span>Malazgirt Caddesi No:121/1B, Siteler / Ankara</span>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-4">
            {/* Kategoriler */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 text-white/75">Kategoriler</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/urunler" className="text-white/80 hover:text-white transition-colors font-medium">Tüm Ürünler</Link></li>
                <li><Link href="/tasarla" className="text-white/80 hover:text-white transition-colors flex items-center gap-2"><Wrench className="size-3.5 opacity-80" /> Kendin Tasarla</Link></li>
                <li><Link href="/kumlama-modelleri" className="text-white/80 hover:text-white transition-colors">Kumlama Modelleri</Link></li>
                <li><Link href="/jakuzi-tekneler" className="text-white/80 hover:text-white transition-colors">Jakuzi ve Tekneler</Link></li>
                <li><Link href="/urunler/banyo-dolabi" className="text-white/80 hover:text-white transition-colors">Banyo Dolapları</Link></li>
              </ul>
            </div>

            {/* Kurumsal */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 text-white/75">Kurumsal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/hakkimizda" className="text-white/80 hover:text-white transition-colors">Hakkımızda</Link></li>
                <li><Link href="/bayi-basvurusu" className="text-white/80 hover:text-white transition-colors">Bayi Başvurusu</Link></li>
                <li><Link href="/projeler" className="text-white/80 hover:text-white transition-colors">Referans Projeler</Link></li>
                <li><Link href="/blog" className="text-white/80 hover:text-white transition-colors">Blog & Rehber</Link></li>
                <li><Link href="/banyo-trendleri-2026" className="text-white/80 hover:text-white transition-colors">2026 Banyo Trendleri</Link></li>
              </ul>
            </div>

            {/* Destek & Müşteri */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 text-white/75">Destek</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/sss" className="text-white/80 hover:text-white transition-colors">Sıkça Sorulan Sorular</Link></li>
                <li><Link href="/iletisim" className="text-white/80 hover:text-white transition-colors">İletişim & Showroom</Link></li>
                <li><Link href="/garanti-sartlari" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5"><ShieldCheck className="size-3.5 opacity-80" /> Garanti Şartları</Link></li>
                <li><Link href="/montaj-kilavuzu" className="text-white/80 hover:text-white transition-colors">Montaj Kılavuzu</Link></li>
              </ul>
            </div>

            {/* Hizmet Bölgeleri (SEO) */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 text-white/75">Hizmet Bölgeleri</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/ankara-cankaya-dusakabin" className="text-white/80 hover:text-white transition-colors">Çankaya Duşakabin</Link></li>
                <li><Link href="/cayyolu-dusakabin" className="text-white/80 hover:text-white transition-colors">Çayyolu Duşakabin</Link></li>
                <li><Link href="/batikent-dusakabin" className="text-white/80 hover:text-white transition-colors">Batıkent & Yenimahalle</Link></li>
                <li><Link href="/kecioren-dusakabin" className="text-white/80 hover:text-white transition-colors">Keçiören Duşakabin</Link></li>
                <li><Link href="/iletisim" className="text-champagne hover:text-white transition-colors font-medium">Tüm Ankara Geneli</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-[1440px] py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/70 font-light">
          <p className="order-2 md:order-1">© {new Date().getFullYear()} ERAYDUŞ Lüks Duşakabin Sistemleri. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap items-center gap-6 order-1 md:order-2 w-full md:w-auto border-b border-white/[0.06] md:border-none pb-4 md:pb-0">
            <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="/kvkk" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</Link>
            <Link href="/cerez-politikasi" className="hover:text-white transition-colors">Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
