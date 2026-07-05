import Link from 'next/link'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-surface-dark text-white pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white mb-6 block">
              ERAYDUŞ
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
              Mimarinin zarafetini banyolarınıza taşıyan, özel üretim lüks duşakabin sistemleri.
            </p>
            <div className="flex items-center gap-4 text-white/60">
              <span className="text-sm font-medium">Bizi Takip Edin</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white/40">Keşfet</h4>
            <ul className="space-y-4">
              <li><Link href="/collections" className="text-white/80 hover:text-white transition-colors">Koleksiyonlar</Link></li>
              <li><Link href="/configurator" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">Konfigüratör <ArrowRight className="size-3" /></Link></li>
              <li><Link href="/projects" className="text-white/80 hover:text-white transition-colors">Mimari Projeler</Link></li>
              <li><Link href="/about" className="text-white/80 hover:text-white transition-colors">Üretim & Kalite</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white/40">Destek</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-white/80 hover:text-white transition-colors">İletişim</Link></li>
              <li><Link href="/warranty" className="text-white/80 hover:text-white transition-colors">Garanti Şartları</Link></li>
              <li><Link href="/installation" className="text-white/80 hover:text-white transition-colors">Montaj Kılavuzu</Link></li>
              <li><Link href="/faq" className="text-white/80 hover:text-white transition-colors">Sıkça Sorulan Sorular</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white/40">Mimarlar İçin</h4>
            <ul className="space-y-4">
              <li><Link href="/architect" className="text-white/80 hover:text-white transition-colors">Mimar Portalı</Link></li>
              <li><Link href="/cad-files" className="text-white/80 hover:text-white transition-colors">CAD & 3D Dosyaları</Link></li>
              <li><Link href="/catalogs" className="text-white/80 hover:text-white transition-colors">Teknik Kataloglar</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} ERAYDUŞ. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="/kvkk" className="hover:text-white transition-colors">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
