import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ArrowRight, SlidersHorizontal, Settings2, Heart, Search } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { Helmet } from 'react-helmet-async';

export default function Shop() {
  const { t, language } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { products } = useStore();
  
  const categories = ['All', 'Walk-In', 'Sliding', 'Framed', 'Corner'];
  
  const filteredProducts = products.filter(p => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-primary-bg pb-32">
      <Helmet>
        <title>Collection | ERAYDUŞ</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2500&auto=format&fit=crop" 
            alt="Collection Hero" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay scale-105 transform origin-center animate-slow-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent opacity-90" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight mb-6"
          >
            {language === 'tr' ? 'Mükemmel Duş Deneyiminizi Keşfedin.' : 'Discover Your Perfect Shower Experience.'}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/configurator" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover-lift">
              <Settings2 className="w-5 h-5" />
              {language === 'tr' ? 'Yapılandırıcıyı Başlat' : 'Start Configurator'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        
        {/* Top Bar: Search and Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto flex-1">
            <div className="relative w-full max-w-md group">
              <input 
                type="text" 
                placeholder={language === 'tr' ? 'Koleksiyonda ara...' : 'Search collection...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-transparent border-b border-black/10 focus:border-black outline-none transition-all text-lg placeholder:text-text-secondary/50 group-hover:border-black/30"
              />
              <Search className="w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary/50 group-focus-within:text-black transition-colors" />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto mt-2 sm:mt-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? 'bg-black text-white shadow-md' 
                      : 'bg-transparent text-text-secondary hover:bg-black/5 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-black/10 rounded-full text-sm font-medium hover:bg-surface transition-colors whitespace-nowrap shrink-0 shadow-sm mt-2 lg:mt-0">
            <SlidersHorizontal className="w-4 h-4" /> 
            {language === 'tr' ? 'Filtrele & Sırala' : 'Filter & Sort'}
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={product.id}
              >
                <Link to={`/shop/${product.slug}`} className="group flex flex-col gap-3 md:gap-6 cursor-pointer block">
                  <div className="relative h-[30vh] min-h-[200px] md:h-[60vh] md:min-h-[500px] rounded-[16px] md:rounded-[24px] overflow-hidden bg-surface">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Top labels */}
                    <div className="absolute top-3 left-3 md:top-6 md:left-6 flex flex-col items-start sm:flex-row gap-2 z-10">
                      <span className="bg-white/90 backdrop-blur-md px-2 py-1 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-medium uppercase tracking-wider text-black">
                        {product.category}
                      </span>
                      {i === 0 && (
                        <span className="bg-black/90 text-white backdrop-blur-md px-2 py-1 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-medium uppercase tracking-wider">
                          {language === 'tr' ? 'Yeni' : 'New'}
                        </span>
                      )}
                    </div>
                    
                    <div 
                      className="absolute top-3 right-3 md:top-6 md:right-6 w-8 h-8 md:w-12 md:h-12 bg-white/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors z-10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <Heart className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    
                    {/* Hover Overlay Action */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                       <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
                       </div>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
                    <div>
                      <h3 className="text-lg md:text-2xl font-medium mb-1 md:mb-2 group-hover:text-black/70 transition-colors leading-tight">{product.name}</h3>
                      <p className="text-xs md:text-base text-text-secondary font-light max-w-sm line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0">
                      <span className="text-[10px] md:text-xs text-text-secondary uppercase tracking-wider block mb-0.5 md:mb-1">
                        {language === 'tr' ? 'Başlangıç' : 'From'}
                      </span>
                      <span className="text-sm md:text-xl font-medium">₺{product.price.toLocaleString('tr-TR')}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <h3 className="text-2xl font-medium mb-4">
              {language === 'tr' ? 'Sonuç bulunamadı' : 'No results found'}
            </h3>
            <p className="text-text-secondary">
              {language === 'tr' ? 'Lütfen arama terimlerinizi veya filtrelerinizi değiştirin.' : 'Please adjust your search terms or filters.'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
