import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../i18n/useTranslation';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Projects() {
  const { language } = useTranslation();
  const { projects } = useStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary-bg min-h-screen">
      <Helmet>
        <title>{language === 'tr' ? 'Projeler | ERAYDUŞ' : 'Projects | ERAYDUŞ'}</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2500&auto=format&fit=crop" 
            alt="Projects Hero" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay scale-105"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight mb-6"
          >
            {language === 'tr' ? 'Mimari Referanslar' : 'Architectural References'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-white/70 font-light max-w-2xl mx-auto"
          >
            {language === 'tr' 
              ? 'Tasarım vizyonumuzu yansıtan, ilham verici banyo dönüşümleri ve lüks mimari işbirlikleri.'
              : 'Inspiring bathroom transformations and luxury architectural collaborations that reflect our design vision.'}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 py-24">
        <div className="space-y-32">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 lg:gap-24 items-center`}
            >
              <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4] rounded-[24px] overflow-hidden bg-surface relative group cursor-pointer">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 text-sm font-medium uppercase tracking-widest text-text-secondary mb-6">
                  <span>{project.category}</span>
                  <span className="w-1 h-1 rounded-full bg-black/20" />
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 leading-tight">
                  {project.title}
                </h2>
                <p className="text-lg text-text-secondary font-light leading-relaxed mb-10 max-w-xl">
                  {project.description}
                </p>
                <Link to="#" className="inline-flex items-center gap-3 text-sm font-medium group hover-lift">
                  <span className="border-b border-black pb-1 group-hover:border-transparent transition-colors">
                    {language === 'tr' ? 'Projeyi İncele' : 'View Project'}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
