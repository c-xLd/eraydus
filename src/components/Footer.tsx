import { Link } from 'react-router-dom';
import { Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export default function Footer() {
  const { language } = useTranslation();

  return (
    <footer className="bg-black text-white pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5">
            <Link to="/" className="flex flex-col group mb-8">
              <span className="font-medium text-3xl tracking-tight leading-none text-white">ERAYDUŞ</span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-light mt-1 text-white/50">
                Architectural Glass
              </span>
            </Link>
            <p className="text-white/60 max-w-sm mb-12 font-light text-lg">
              {language === 'tr' 
                ? 'Modern banyolar için mimari sınıf cam sistemleri ve duşakabin çözümleri.' 
                : 'Architectural grade glass systems and shower cabin solutions for modern bathrooms.'}
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-medium text-sm tracking-wider uppercase text-white/50 mb-8">
              {language === 'tr' ? 'Keşfet' : 'Explore'}
            </h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="hover:text-white/70 transition-colors font-medium">{language === 'tr' ? 'Koleksiyon' : 'Collection'}</Link></li>
              <li><Link to="/configurator" className="hover:text-white/70 transition-colors font-medium">{language === 'tr' ? 'Yapılandırıcı' : 'Configurator'}</Link></li>
              <li><Link to="/projects" className="hover:text-white/70 transition-colors font-medium">{language === 'tr' ? 'Projeler' : 'Projects'}</Link></li>
              <li><Link to="/gallery" className="hover:text-white/70 transition-colors font-medium">{language === 'tr' ? 'Galeri' : 'Gallery'}</Link></li>
              <li><Link to="/about" className="hover:text-white/70 transition-colors font-medium">{language === 'tr' ? 'Hakkımızda' : 'About Us'}</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-medium text-sm tracking-wider uppercase text-white/50 mb-8">
              {language === 'tr' ? 'Müşteri İlişkileri' : 'Client Relations'}
            </h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="hover:text-white/70 transition-colors font-medium">{language === 'tr' ? 'İletişim' : 'Contact'}</Link></li>
              <li><a href="#" className="hover:text-white/70 transition-colors font-medium">{language === 'tr' ? 'Garanti Kapsamı' : 'Warranty'}</a></li>
              <li><a href="#" className="hover:text-white/70 transition-colors font-medium">{language === 'tr' ? 'Kurulum Kılavuzu' : 'Installation Guide'}</a></li>
              <li><Link to="/faq" className="hover:text-white/70 transition-colors font-medium">SSS / FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Erayduş Architectural Glass. {language === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-white transition-colors">{language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}</Link>
            <Link to="#" className="hover:text-white transition-colors">{language === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service'}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
