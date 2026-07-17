import Link from 'next/link'
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react'
import { NewsletterForm } from './NewsletterForm'

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Newsletter Band */}
      <div className="border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-[1440px] py-10 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
          <div>
            <h3 className="text-xl lg:text-2xl font-light mb-2">İlham Almak İçin Abone Olun</h3>
            <p className="text-white/40 text-sm">Yeni koleksiyonlar, mimari ilham ve özel teklifler.</p>
          </div>
          <div className="w-full lg:w-auto">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 max-w-[1440px] py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-xs font-black tracking-tighter text-black">E</span>
              </div>
              <span className="text-xl font-bold tracking-tight">ERAYDUŞ</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm">
              Mimarinin zarafetini banyolarınıza taşıyan, özel üretim lüks duşakabin sistemleri. Her detay sizin için tasarlanır.
            </p>
            <div className="flex flex-col gap-4 text-sm text-white/50">
              <a href="tel:+905550000000" className="flex items-center gap-3 hover:text-white transition-colors w-fit">
                <Phone className="size-4" /> +90 555 000 00 00
              </a>
              <a href="mailto:info@eraydus.com" className="flex items-center gap-3 hover:text-white transition-colors w-fit">
                <Mail className="size-4" /> info@eraydus.com
              </a>
              <span className="flex items-center gap-3 w-fit">
                <MapPin className="size-4" /> İstanbul, Türkiye
              </span>
            </div>
          </div>

          {/* Links Grid - 2 columns on mobile, 4 on desktop */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-4">
            {/* Keşfet */}
            <div>
              <h4 className="text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.15em] mb-4 lg:mb-6 text-white/30">Keşfet</h4>
              <ul className="space-y-3 lg:space-y-3.5">
                <li><Link href="/koleksiyonlar" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Koleksiyonlar</Link></li>
                <li>
                  <Link href="/tasarla" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5 py-1 lg:py-0">
                    Konfigüratör <ArrowUpRight className="size-3" />
                  </Link>
                </li>
                <li><Link href="/projeler" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Mimari Projeler</Link></li>
                <li><Link href="/hakkimizda" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Üretim & Kalite</Link></li>
              </ul>
            </div>

            {/* Destek */}
            <div>
              <h4 className="text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.15em] mb-4 lg:mb-6 text-white/30">Destek</h4>
              <ul className="space-y-3 lg:space-y-3.5">
                <li><Link href="/iletisim" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">İletişim</Link></li>
                <li><Link href="/hakkimizda" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Garanti Şartları</Link></li>
                <li><Link href="/iletisim" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Montaj Kılavuzu</Link></li>
                <li><Link href="/hakkimizda" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">SSS</Link></li>
              </ul>
            </div>

            {/* Profesyoneller */}
            <div>
              <h4 className="text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.15em] mb-4 lg:mb-6 text-white/30">Profesyoneller</h4>
              <ul className="space-y-3 lg:space-y-3.5">
                <li><Link href="/iletisim" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Mimar Portalı</Link></li>
                <li><Link href="/iletisim" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">CAD Dosyaları</Link></li>
                <li><Link href="/iletisim" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Teknik Kataloglar</Link></li>
                <li><Link href="/iletisim" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Bayi Başvurusu</Link></li>
              </ul>
            </div>

            {/* Kurumsal */}
            <div>
              <h4 className="text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.15em] mb-4 lg:mb-6 text-white/30">Kurumsal</h4>
              <ul className="space-y-3 lg:space-y-3.5">
                <li><Link href="/hakkimizda" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Hakkımızda</Link></li>
                <li><Link href="/blog" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Blog</Link></li>
                <li><Link href="/iletisim" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Kariyer</Link></li>
                <li><Link href="/iletisim" className="text-[13px] lg:text-sm text-white/60 hover:text-white transition-colors block py-1 lg:py-0">Basın</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-[1440px] py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] lg:text-[12px] text-white/30">
          <p className="order-2 md:order-1">© {new Date().getFullYear()} ERAYDUŞ. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 order-1 md:order-2 w-full md:w-auto border-b border-white/[0.06] md:border-none pb-4 md:pb-0">
            <Link href="/gizlilik-politikasi" className="hover:text-white/60 transition-colors py-1">Gizlilik Politikası</Link>
            <Link href="/kvkk" className="hover:text-white/60 transition-colors py-1">KVKK</Link>
            <Link href="/cerez-politikasi" className="hover:text-white/60 transition-colors py-1">Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
