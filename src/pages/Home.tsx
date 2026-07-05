import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../i18n/useTranslation';
import { HeroSection } from '../components/home/HeroSection';
import { StatementSection } from '../components/home/StatementSection';
import { CraftsmanshipSection } from '../components/home/CraftsmanshipSection';
import { ProductShowcaseSection } from '../components/home/ProductShowcaseSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { ConfiguratorPreviewSection } from '../components/home/ConfiguratorPreviewSection';
import { GlassCollectionSection } from '../components/home/GlassCollectionSection';
import { HardwareSection } from '../components/home/HardwareSection';
import { SmartPricingSection } from '../components/home/SmartPricingSection';
import { GallerySection } from '../components/home/GallerySection';
import { FinalCTASection } from '../components/home/FinalCTASection';

export default function Home() {
  const { t } = useTranslation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary-bg overflow-x-hidden">
      <Helmet>
        <title>ERAYDUŞ | Premium Shower Cabins & Digital Configurator</title>
      </Helmet>
      
      <HeroSection />
      <StatementSection />
      <CraftsmanshipSection />
      <ProductShowcaseSection />
      <FeaturesSection />
      <ConfiguratorPreviewSection />
      <GlassCollectionSection />
      <HardwareSection />
      <SmartPricingSection />
      <GallerySection />
      <FinalCTASection />
      
      {/* Footer is handled in App.tsx */}
    </div>
  );
}
