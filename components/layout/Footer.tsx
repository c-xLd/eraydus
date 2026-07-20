import Link from 'next/link'
import { ArrowUpRight, Mail, Phone, MapPin, ShieldCheck, Wrench } from 'lucide-react'
import { NewsletterForm } from './NewsletterForm'

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white font-sans">
      {/* Newsletter Band */}
      <div className="border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-[1440px] py-10 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
          <div>
            <h3 className="text-xl lg:text-2xl font-light tracking-wide mb-2">Banyo Mimarisine Dair İlham Alın</h3>
            <p className="text-white/75 text-sm">Yeni koleksiyonlar, özel üretim PVD kaplamalar ve mimari çözümlerimizden haberdar olun.</p>
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
                <span className="text-[9px] font-medium tracking-[0.25em] text-white/70 uppercase">Architectural Shower Systems</span>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm font-light">
              Özel ölçü mimari cam çözümleri, kararmaz PVD profiller ve nano-kaplama teknolojileri ile banyonuza zamansız bir zarafet katıyoruz.
            </p>
            <div className="space-y-3 text-sm text-white/80 pt-2 font-light">
              <a href="tel:+905551234567" className="flex items-center gap-3 hover:text-white transition-colors w-fit group">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Phone className="size-4 text-white" />
                </div>
                <span>+90 555 123 4567</span>
              </a>
              <a href="mailto:info@eraydus.net" className="flex items-center gap-3 hover:text-white transition-colors w-fit group">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Mail className="size-4 text-white" />
                </div>
                <span>info@eraydus.net</span>
              </a>
              <div className="flex items-center gap-3 w-fit text-white/80">
                <div className="p-2 rounded-lg bg-white/10">
                  <MapPin className="size-4 text-white" />
                </div>
                <span>Ostim OSB, 100. Yıl Bulvarı, Yenimahalle / Ankara</span>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-4">
            {/* Keşfet */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 text-white/75">Keşfet</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/koleksiyonlar" className="text-white/80 hover:text-white transition-colors">Tüm Koleksiyonlar</Link></li>
                <li>
                  <Link href="/tasarla" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <span>3D Konfigüratör</span>
                    <ArrowUpRight className="size-3 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </li>
                <li><Link href="/kumlama-modelleri" className="text-white/80 hover:text-white transition-colors">Kumlama Modelleri</Link></li>
                <li><Link href="/projeler" className="text-white/80 hover:text-white transition-colors">Mimari Projeler</Link></li>
              </ul>
            </div>

            {/* Popüler Modeller */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 text-white/75">Kategoriler</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/koleksiyonlar?tip=surgulu" className="text-white/80 hover:text-white transition-colors">Sürgülü Sistemler</Link></li>
                <li><Link href="/koleksiyonlar?tip=menteseli" className="text-white/80 hover:text-white transition-colors">Menteşeli Kabinler</Link></li>
                <li><Link href="/koleksiyonlar?renk=siyah" className="text-white/80 hover:text-white transition-colors">Mat Siyah Profil</Link></li>
                <li><Link href="/koleksiyonlar?renk=altin" className="text-white/80 hover:text-white transition-colors">Gold & Rose PVD</Link></li>
                <li><Link href="/koleksiyonlar?cam=6mm" className="text-white/80 hover:text-white transition-colors">6mm - 8mm Temperli Cam</Link></li>
              </ul>
            </div>

            {/* Profesyoneller & B2B */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 text-white/75">Kurumsal & B2B</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/hakkimizda" className="text-white/80 hover:text-white transition-colors">Hakkımızda</Link></li>
                <li><Link href="/bayi-basvurusu" className="text-white/80 hover:text-white transition-colors">Bayi Başvurusu</Link></li>
                <li><Link href="/projeler" className="text-white/80 hover:text-white transition-colors">Otel & Proje Teklifleri</Link></li>
                <li><Link href="/blog" className="text-white/80 hover:text-white transition-colors">Mimari Blog & Rehber</Link></li>
              </ul>
            </div>

            {/* Destek & Yardım */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 text-white/75">Destek & Müşteri</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/iletisim" className="text-white/80 hover:text-white transition-colors">İletişim & Showroom</Link></li>
                <li><Link href="/garanti-sartlari" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5"><ShieldCheck className="size-3.5 opacity-80" /> Garanti Şartları</Link></li>
                <li><Link href="/montaj-kilavuzu" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5"><Wrench className="size-3.5 opacity-80" /> Montaj Kılavuzu</Link></li>
                <li><Link href="/sss" className="text-white/80 hover:text-white transition-colors">Sıkça Sorulan Sorular</Link></li>
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

