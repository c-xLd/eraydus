import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../i18n/useTranslation';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Blog() {
  const { language } = useTranslation();
  const { blogPosts } = useStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-primary-bg pb-32 pt-[80px]">
      <Helmet>
        <title>{language === 'tr' ? 'Blog | ERAYDUŞ' : 'Blog | ERAYDUŞ'}</title>
      </Helmet>
      
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-medium tracking-tight mb-6">
              {language === 'tr' ? 'Okuma Odası' : 'Reading Room'}
            </h1>
            <p className="text-text-secondary text-lg">
              {language === 'tr' 
                ? 'Mimari trendler, kurulum rehberleri and banyo tasarımı üzerine derinlemesine incelemeler.'
                : 'Deep dives into architectural trends, installation guides, and bathroom design.'}
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder={language === 'tr' ? 'Makalelerde ara...' : 'Search articles...'}
              className="w-full pl-12 pr-4 py-3 bg-white border border-black/10 rounded-full focus:border-black outline-none transition-colors"
            />
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16">
          {blogPosts.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Link to={`/blog/${article.slug}`} className="block">
                <div className="aspect-[4/3] rounded-[24px] overflow-hidden mb-8 bg-surface relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="flex gap-4 items-center text-sm mb-4">
                  <span className="font-medium text-black uppercase tracking-wider bg-black/5 px-3 py-1 rounded-full">
                    {language === 'tr' ? article.categoryTr : article.category}
                  </span>
                  <span className="text-text-secondary">{article.date}</span>
                </div>
                
                <h2 className="text-2xl font-medium tracking-tight leading-snug mb-4 group-hover:opacity-70 transition-opacity">
                  {language === 'tr' ? article.titleTr : article.title}
                </h2>
                <p className="text-text-secondary font-light line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
                  {language === 'tr' ? 'Devamını Oku' : 'Read More'}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
