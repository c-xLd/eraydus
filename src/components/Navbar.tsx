import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Settings2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../i18n/useTranslation';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useTranslation();
  const setLanguage = useStore((state) => state.setLanguage);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, language]);

  const navLinks = [
    { name: language === 'tr' ? 'Koleksiyon' : 'Collection', path: '/shop' },
    { name: language === 'tr' ? 'Yapılandırıcı' : 'Configurator', path: '/configurator' },
    { name: language === 'tr' ? 'Projeler' : 'Projects', path: '/projects' },
    { name: language === 'tr' ? 'Galeri' : 'Gallery', path: '/gallery' },
    { name: language === 'tr' ? 'Hakkımızda' : 'About', path: '/about' },
    { name: language === 'tr' ? 'İletişim' : 'Contact', path: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  const isLightText = !isScrolled && (location.pathname === '/' || location.pathname === '/shop' || location.pathname.includes('/shop/'));

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled 
            ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm text-black' 
            : `py-8 bg-transparent ${isLightText ? 'text-white' : 'text-black'}`
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col group">
            <span className="font-medium text-2xl tracking-tight leading-none">ERAYDUŞ</span>
            <span className="text-[9px] tracking-[0.2em] uppercase font-light mt-1 opacity-70">
              Architectural Glass
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:opacity-100',
                  location.pathname === link.path 
                    ? 'opacity-100' 
                    : (isScrolled ? 'text-black/60 hover:text-black' : 'opacity-70')
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
            >
              <Globe className="w-4 h-4" />
              {language === 'tr' ? 'EN' : 'TR'}
            </button>
            <Link
              to="/configurator"
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center gap-2 hover-lift",
                isScrolled || !isLightText
                  ? "bg-black text-white hover:bg-black/80" 
                  : "bg-white text-black hover:bg-white/90"
              )}
            >
              <Settings2 className="w-4 h-4" />
              {language === 'tr' ? 'Tasarla' : 'Design'}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium opacity-70"
            >
              {language === 'tr' ? 'EN' : 'TR'}
            </button>
            <button
              className="p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-32 px-6 md:hidden overflow-y-auto text-black"
          >
            <div className="flex flex-col gap-8 text-2xl font-medium tracking-tight">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'transition-colors',
                    location.pathname === link.path ? 'text-black' : 'text-black/50'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-8 mt-4 border-t border-divider">
                <Link
                  to="/configurator"
                  className="bg-black text-white px-6 py-5 rounded-full text-center text-lg font-medium flex items-center justify-center gap-2"
                >
                  <Settings2 className="w-5 h-5" />
                  {language === 'tr' ? 'Kendinize Göre Tasarlayın' : 'Design Yours'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
