import Link from 'next/link'
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Newsletter Band */}
      <div className="border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-[1440px] py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-light mb-2">İlham Almak İçin Abone Olun</h3>
            <p className="text-white/40 text-sm">Yeni koleksiyonlar, mimari ilham ve özel teklifler.</p>
          </div>
          <div className="flex w-full lg:w-auto gap-3">
            <input 
              type="email" 
              placeholder="E-posta adresiniz"
              className="flex-1 lg:w-80 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-champagne/50 focus:ring-1 focus:ring-champagne/20 transition-all"
            />
            <button className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors shrink-0">
              Abone Ol
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 max-w-[1440px] py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-xs font-black tracking-tighter text-black">E</span>
              </div>
              <span className="text-xl font-bold tracking-tight">ERAYDUŞ</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
              Mimarinin zarafetini banyolarınıza taşıyan, özel üretim lüks duşakabin sistemleri. Her detay sizin için tasarlanır.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/50">
              <a href="tel:+905550000000" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="size-3.5" /> +90 555 000 00 00
              </a>
              <a href="mailto:info@eraydus.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="size-3.5" /> info@eraydus.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="size-3.5" /> İstanbul, Türkiye
              </span>
            </div>
          </div>

          {/* Keşfet */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-6 text-white/30">Keşfet</h4>
            <ul className="space-y-3.5">
              <li><Link href="/koleksiyonlar" className="text-sm text-white/60 hover:text-white transition-colors">Koleksiyonlar</Link></li>
              <li>
                <Link href="/tasarla" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
                  Konfigüratör <ArrowUpRight className="size-3" />
                </Link>
              </li>
              <li><Link href="/projeler" className="text-sm text-white/60 hover:text-white transition-colors">Mimari Projeler</Link></li>
              <li><Link href="/hakkimizda" className="text-sm text-white/60 hover:text-white transition-colors">Üretim & Kalite</Link></li>
            </ul>
          </div>

          {/* Destek */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-6 text-white/30">Destek</h4>
            <ul className="space-y-3.5">
              <li><Link href="/iletisim" className="text-sm text-white/60 hover:text-white transition-colors">İletişim</Link></li>
              <li><Link href="/warranty" className="text-sm text-white/60 hover:text-white transition-colors">Garanti Şartları</Link></li>
              <li><Link href="/installation" className="text-sm text-white/60 hover:text-white transition-colors">Montaj Kılavuzu</Link></li>
              <li><Link href="/faq" className="text-sm text-white/60 hover:text-white transition-colors">SSS</Link></li>
            </ul>
          </div>

          {/* Profesyoneller */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-6 text-white/30">Profesyoneller</h4>
            <ul className="space-y-3.5">
              <li><Link href="/architect" className="text-sm text-white/60 hover:text-white transition-colors">Mimar Portalı</Link></li>
              <li><Link href="/cad-files" className="text-sm text-white/60 hover:text-white transition-colors">CAD Dosyaları</Link></li>
              <li><Link href="/catalogs" className="text-sm text-white/60 hover:text-white transition-colors">Teknik Kataloglar</Link></li>
              <li><Link href="/dealer" className="text-sm text-white/60 hover:text-white transition-colors">Bayi Başvurusu</Link></li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-6 text-white/30">Kurumsal</h4>
            <ul className="space-y-3.5">
              <li><Link href="/hakkimizda" className="text-sm text-white/60 hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-sm text-white/60 hover:text-white transition-colors">Kariyer</Link></li>
              <li><Link href="/media" className="text-sm text-white/60 hover:text-white transition-colors">Basın</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-[1440px] py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/30">
          <p>© {new Date().getFullYear()} ERAYDUŞ. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white/60 transition-colors">Gizlilik Politikası</Link>
            <Link href="/kvkk" className="hover:text-white/60 transition-colors">KVKK</Link>
            <Link href="/cookies" className="hover:text-white/60 transition-colors">Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
