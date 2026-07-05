import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { NEW_CONFIGURATOR_DATA } from '../configuratorData';
import { 
  Check, Shield, Zap, ArrowRight, Settings2, Download, Maximize2, 
  ChevronRight, Play, Star, PenTool, Layout, Layers, Box, Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../i18n/useTranslation';
import { Helmet } from 'react-helmet-async';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find(p => p.slug === slug);
  const { language } = useTranslation();
  const t = (tr: string, en: string) => language === 'tr' ? tr : en;
  
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'gallery'>('overview');
  const [selectedGlass, setSelectedGlass] = useState(NEW_CONFIGURATOR_DATA.glassTypes[0]);
  const [selectedProfile, setSelectedProfile] = useState(NEW_CONFIGURATOR_DATA.profileColors[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-medium">Product not found.</div>;
  }

  const estimatedPrice = product.price + selectedGlass.price + selectedProfile.price;

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-32">
      <Helmet>
        <title>{product.name} | ERAYDUŞ</title>
      </Helmet>

      {/* 01 Hero Showcase */}
      <section className="relative h-[100dvh] w-full flex items-end pb-24 px-6 bg-black text-white overflow-hidden pt-20 lg:pt-0">
        <div className="absolute inset-0 z-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay scale-105 animate-slow-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium uppercase tracking-widest mb-6">
                {product.category} {t('Serisi', 'Series')}
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-medium tracking-tight mb-6 leading-[0.9]">
                {product.name}
              </h1>
              <p className="text-xl sm:text-2xl text-white/80 font-light leading-relaxed max-w-2xl">
                {product.description}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 w-full md:w-auto"
            >
              <Link 
                to={`/configurator?model=${product.slug}`} 
                className="flex items-center justify-center gap-2 w-full md:w-[300px] bg-white text-black px-8 py-5 rounded-full font-medium hover-lift text-lg"
              >
                <Settings2 className="w-5 h-5" />
                {t('Yapılandır', 'Start Configurator')}
              </Link>
              <button className="flex items-center justify-center gap-2 w-full md:w-[300px] bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-full font-medium hover:bg-white/20 transition-colors text-lg">
                <Download className="w-5 h-5" />
                {t('Kataloğu İndir', 'Download Catalogue')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Action Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/10 py-4 px-6 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex gap-8 items-center">
            <h2 className="font-medium text-lg hidden md:block">{product.name}</h2>
            <div className="flex gap-6 text-sm font-medium">
              <button onClick={() => setActiveTab('overview')} className={cn("transition-colors", activeTab === 'overview' ? "text-black border-b-2 border-black pb-1" : "text-black/50 hover:text-black")}>{t('Genel Bakış', 'Overview')}</button>
              <button onClick={() => setActiveTab('specs')} className={cn("transition-colors", activeTab === 'specs' ? "text-black border-b-2 border-black pb-1" : "text-black/50 hover:text-black")}>{t('Teknik Detaylar', 'Tech Specs')}</button>
              <button onClick={() => setActiveTab('gallery')} className={cn("transition-colors", activeTab === 'gallery' ? "text-black border-b-2 border-black pb-1" : "text-black/50 hover:text-black")}>{t('Galeri', 'Gallery')}</button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <div className="text-[10px] uppercase tracking-widest text-black/50">{t('Başlangıç', 'Starting from')}</div>
              <div className="font-medium">₺{product.price.toLocaleString('tr-TR')}</div>
            </div>
            <Link to={`/configurator?model=${product.slug}`} className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover-lift">
              {t('Satın Al / Yapılandır', 'Buy / Configure')}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-24">
        
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-32">
            
            {/* 02 Product Overview & 05 Product Highlights */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <h3 className="text-4xl font-medium tracking-tight mb-8 leading-tight">
                  {t('Gereksiz her detayın ortadan kaldırıldığı, saf işlevsellik.', 'Pure functionality where every unnecessary detail is stripped away.')}
                </h3>
                <p className="text-xl text-black/60 font-light leading-relaxed mb-12">
                  {t('Erayduş tasarım felsefesinin kalbi, malzemenin dürüstlüğü ve kullanıcı deneyiminin pürüzsüzlüğüne dayanır. Modern mimarinin gereksinimlerini en üst düzeyde karşılayan bu seri, banyonuzu bir yaşam alanına dönüştürür.', 'The heart of Erayduş design philosophy lies in the honesty of materials and the smoothness of the user experience. Meeting the requirements of modern architecture at the highest level, this series transforms your bathroom into a living space.')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-[24px] shadow-sm">
                    <Maximize2 className="w-8 h-8 mb-4 opacity-70" />
                    <h4 className="font-medium text-lg mb-2">{t('Çerçevesiz Tasarım', 'Frameless Design')}</h4>
                    <p className="text-sm text-black/60">{t('Maksimum şeffaflık ile mekanın bütünlüğünü korur.', 'Preserves the integrity of the space with maximum transparency.')}</p>
                  </div>
                  <div className="bg-white p-8 rounded-[24px] shadow-sm">
                    <Layers className="w-8 h-8 mb-4 opacity-70" />
                    <h4 className="font-medium text-lg mb-2">{t('Nano Kaplama', 'Nano Coating')}</h4>
                    <p className="text-sm text-black/60">{t('Su ve kireç tutmayan özel yüzey ile kolay temizlik.', 'Easy cleaning with special water and lime repellent surface.')}</p>
                  </div>
                  <div className="bg-white p-8 rounded-[24px] shadow-sm">
                    <Shield className="w-8 h-8 mb-4 opacity-70" />
                    <h4 className="font-medium text-lg mb-2">{t('Temperli Cam', 'Tempered Glass')}</h4>
                    <p className="text-sm text-black/60">{t('8mm ve 10mm seçenekleriyle üst düzey güvenlik.', 'Top level safety with 8mm and 10mm options.')}</p>
                  </div>
                  <div className="bg-white p-8 rounded-[24px] shadow-sm">
                    <Settings2 className="w-8 h-8 mb-4 opacity-70" />
                    <h4 className="font-medium text-lg mb-2">{t('Sessiz Sistem', 'Silent System')}</h4>
                    <p className="text-sm text-black/60">{t('Özel rulman teknolojisi ile pürüzsüz ve sessiz açılış.', 'Smooth and silent opening with special bearing technology.')}</p>
                  </div>
                </div>
              </div>
              <div className="relative h-[80vh] rounded-[32px] overflow-hidden">
                <img src={product.image} className="w-full h-full object-cover" alt="Detail" />
                <div className="absolute inset-0 bg-black/5" />
              </div>
            </section>

            {/* 07 Glass & 08 Profile Options Interactive Preview */}
            <section className="bg-white p-8 lg:p-16 rounded-[40px] shadow-sm border border-black/5">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h3 className="text-3xl font-medium tracking-tight mb-4">{t('Kişiselleştirme Seçenekleri', 'Customization Options')}</h3>
                <p className="text-black/60">{t('Banyonuzun mimarisine en uygun malzeme ve renkleri seçin. Tüm seçenekler yüksek Erayduş kalite standartlarında üretilir.', 'Choose the materials and colors that best suit your bathroom architecture. All options are produced at high Erayduş quality standards.')}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-12">
                  <div>
                    <h4 className="text-xl font-medium mb-6 flex items-center gap-3"><Layout className="w-5 h-5 opacity-50"/> {t('Cam Seçenekleri', 'Glass Options')}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {NEW_CONFIGURATOR_DATA.glassTypes.map(glass => (
                        <button 
                          key={glass.id}
                          onClick={() => setSelectedGlass(glass)}
                          className={cn("p-4 rounded-2xl border text-left transition-all", selectedGlass.id === glass.id ? "border-black shadow-md" : "border-black/10 hover:border-black/30")}
                        >
                          <div className="font-medium mb-1">{t(glass.nameTr, glass.name)}</div>
                          <div className="text-xs text-black/50">{glass.price === 0 ? t('Standart', 'Standard') : `+₺${glass.price}`}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-6 flex items-center gap-3"><PenTool className="w-5 h-5 opacity-50"/> {t('Profil Renkleri', 'Profile Colors')}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {NEW_CONFIGURATOR_DATA.profileColors.map(profile => (
                        <button 
                          key={profile.id}
                          onClick={() => setSelectedProfile(profile)}
                          className={cn("p-4 rounded-2xl border flex flex-col items-center justify-center transition-all", selectedProfile.id === profile.id ? "border-black shadow-md" : "border-black/10 hover:border-black/30")}
                        >
                          <div className="w-8 h-8 rounded-full shadow-inner mb-3 border border-black/10" style={{ backgroundColor: profile.hex }}></div>
                          <div className="text-xs font-medium text-center">{t(profile.nameTr, profile.name)}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#f8f9fa] rounded-[32px] p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-sm font-medium uppercase tracking-widest text-black/40 mb-2">{t('Canlı Fiyat Tahmini', 'Live Price Estimate')}</div>
                    <div className="text-5xl font-medium tracking-tight mb-8">₺{estimatedPrice.toLocaleString('tr-TR')}</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-black/10 pb-4">
                      <span className="text-black/60">{t('Temel Fiyat', 'Base Price')}</span>
                      <span className="font-medium">₺{product.price.toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between border-b border-black/10 pb-4">
                      <span className="text-black/60">{t('Cam', 'Glass')} ({t(selectedGlass.nameTr, selectedGlass.name)})</span>
                      <span className="font-medium">+{selectedGlass.price}</span>
                    </div>
                    <div className="flex justify-between pb-4">
                      <span className="text-black/60">{t('Profil', 'Profile')} ({t(selectedProfile.nameTr, selectedProfile.name)})</span>
                      <span className="font-medium">+{selectedProfile.price}</span>
                    </div>
                    <Link to={`/configurator?model=${product.slug}`} className="w-full mt-4 py-4 bg-black text-white rounded-full font-medium flex justify-center items-center gap-2 hover-lift">
                      {t('Konfigüratörde Devam Et', 'Continue in Configurator')} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Technical Specs Tab */}
        {activeTab === 'specs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            <div className="bg-white p-8 lg:p-16 rounded-[40px] shadow-sm border border-black/5">
              <h3 className="text-3xl font-medium tracking-tight mb-12">{t('Teknik Özellikler', 'Technical Specifications')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-8">
                <div className="flex justify-between border-b border-black/10 pb-4">
                  <span className="text-black/60">{t('Model Kodu', 'Model Code')}</span>
                  <span className="font-medium uppercase">{product.slug}-2026</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-4">
                  <span className="text-black/60">{t('Seri', 'Series')}</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-4">
                  <span className="text-black/60">{t('Cam Kalınlığı', 'Glass Thickness')}</span>
                  <span className="font-medium">8mm / 10mm Tempered</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-4">
                  <span className="text-black/60">{t('Profil Materyali', 'Profile Material')}</span>
                  <span className="font-medium">Premium Aluminum 6063-T5</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-4">
                  <span className="text-black/60">{t('Yükseklik', 'Height')}</span>
                  <span className="font-medium">190cm - 220cm</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-4">
                  <span className="text-black/60">{t('Açılış Mekanizması', 'Opening Mechanism')}</span>
                  <span className="font-medium">Sliding / Pivot</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-4">
                  <span className="text-black/60">{t('Garanti', 'Warranty')}</span>
                  <span className="font-medium">10 {t('Yıl', 'Years')}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-4">
                  <span className="text-black/60">{t('Üretim Yeri', 'Origin')}</span>
                  <span className="font-medium">Türkiye (Turkey)</span>
                </div>
              </div>

              <div className="mt-16 flex gap-4">
                 <button className="flex items-center gap-3 px-6 py-4 border border-black/20 rounded-full hover:bg-black/5 transition-colors">
                  <Download className="w-5 h-5 opacity-70" />
                  <span className="font-medium">PDF Datasheet</span>
                </button>
                <button className="flex items-center gap-3 px-6 py-4 border border-black/20 rounded-full hover:bg-black/5 transition-colors">
                  <Box className="w-5 h-5 opacity-70" />
                  <span className="font-medium">CAD / BIM</span>
                </button>
              </div>
            </div>

            {/* 13 Installation Process */}
            <div>
              <h3 className="text-2xl font-medium tracking-tight mb-8">{t('Kurulum Süreci', 'Installation Process')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: '01', title: t('Ölçüm', 'Measurement'), desc: t('Uzman ekibimiz yerinde hassas ölçüm yapar.', 'Our expert team takes precise on-site measurements.') },
                  { step: '02', title: t('Üretim', 'Production'), desc: t('Siparişiniz CNC makinelerinde özel olarak üretilir.', 'Your order is custom produced on CNC machines.') },
                  { step: '03', title: t('Kalite Kontrol', 'Quality Control'), desc: t('Fabrikadan çıkmadan önce tüm testlerden geçer.', 'Passes all tests before leaving the factory.') },
                  { step: '04', title: t('Montaj', 'Installation'), desc: t('Profesyonel montaj ekibi kurulumu tamamlar.', 'Professional team completes the installation.') },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-[24px] border border-black/5">
                    <div className="text-4xl font-light text-black/20 mb-4">{item.step}</div>
                    <h4 className="font-medium text-lg mb-2">{item.title}</h4>
                    <p className="text-sm text-black/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="h-[50vh] rounded-[24px] overflow-hidden group relative">
                 <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt=""/>
                 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
               <div className="h-[50vh] rounded-[24px] overflow-hidden group relative">
                 <img src="https://images.unsplash.com/photo-1620626011761-9ea0184404d5?q=80&w=1200" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt=""/>
                 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
               <div className="md:col-span-2 h-[60vh] rounded-[24px] overflow-hidden group relative">
                 <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt=""/>
                 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition-colors">
                     <Play className="w-8 h-8 ml-1" />
                   </button>
                 </div>
               </div>
             </div>
          </motion.div>
        )}
      </div>

      {/* 20 Final CTA */}
      <section className="bg-black text-white py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight mb-8">
            {t('Kendi Tasarımınızı Yaratın.', 'Create Your Own Design.')}
          </h2>
          <p className="text-xl text-white/60 font-light mb-12">
            {t('Mükemmel banyonuzu yaratmak için ilk adımı atın. Tüm yapılandırma sürecini çevrimiçi tamamlayın.', 'Take the first step to create your perfect bathroom. Complete the entire configuration process online.')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to={`/configurator?model=${product.slug}`}
              className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-full font-medium hover-lift text-lg flex items-center justify-center gap-2"
            >
              <Settings2 className="w-5 h-5" />
              {t('Yapılandırıcıyı Başlat', 'Start Configurator')}
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 bg-[#25D366] text-white rounded-full font-medium hover-lift text-lg flex items-center justify-center gap-2">
              <Smartphone className="w-5 h-5" />
              {t('WhatsApp Danışma', 'WhatsApp Consultation')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
