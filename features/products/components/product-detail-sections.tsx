'use client';

import { motion } from 'framer-motion';
import { ProductWithOptions } from '@/features/products/types/product';
import { cn } from '@/lib/utils';

interface ProductDetailSectionsProps {
  product: ProductWithOptions;
}

const SPEC_LABELS: Record<string, string> = {
  glass_thickness: 'Cam Kalınlığı',
  height: 'Yükseklik',
  width_range: 'Genişlik Aralığı',
  installation: 'Kurulum',
};

export function ProductDetailSections({ product }: ProductDetailSectionsProps) {
  const hasDescription = !!product.description || !!product.long_description;
  
  const technicalSpecsKeys = product.technical_specs 
    ? Object.keys(product.technical_specs).filter(key => {
        const val = product.technical_specs[key as keyof typeof product.technical_specs];
        return val && (Array.isArray(val) ? val.length > 0 : val !== '');
      })
    : [];
  
  const hasSpecs = technicalSpecsKeys.length > 0 || !!product.sku;
  const hasFeatures = product.features && product.features.length > 0;

  if (!hasDescription && !hasSpecs && !hasFeatures) {
    return null;
  }

  return (
    <div className="w-full py-16 md:py-24 space-y-24 md:space-y-32">
      {hasDescription && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-4 md:px-8"
        >
          <h2 className="text-2xl md:text-3xl font-light tracking-wide text-neutral-900 mb-8 md:mb-12">
            Detaylı Açıklama
          </h2>
          <div className="space-y-6 text-neutral-600 leading-relaxed font-light text-lg">
            {product.description && (
              <div className="whitespace-pre-line">{product.description}</div>
            )}
            {product.long_description && (
              <div className="whitespace-pre-line mt-8">{product.long_description}</div>
            )}
          </div>
        </motion.section>
      )}

      {hasDescription && (hasSpecs || hasFeatures) && (
        <div className="max-w-5xl mx-auto px-4 md:px-8 border-t border-neutral-200/60" />
      )}

      {hasSpecs && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-4 md:px-8"
        >
          <h2 className="text-2xl md:text-3xl font-light tracking-wide text-neutral-900 mb-8 md:mb-12">
            Teknik Özellikler
          </h2>
          <div className="divide-y divide-neutral-200/60 border-t border-neutral-200/60">
            {product.sku && (
              <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-neutral-500 font-light w-1/3">SKU</span>
                <span className="text-neutral-900 text-right sm:w-2/3">{product.sku}</span>
              </div>
            )}
            {technicalSpecsKeys.map((key) => {
              const label = SPEC_LABELS[key] || key;
              const value = product.technical_specs[key as keyof typeof product.technical_specs];
              const displayValue = Array.isArray(value) ? value.join(', ') : value;
              
              return (
                <div key={key} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-neutral-500 font-light w-1/3">{label}</span>
                  <span className="text-neutral-900 text-right sm:w-2/3">{displayValue}</span>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {hasSpecs && hasFeatures && (
        <div className="max-w-5xl mx-auto px-4 md:px-8 border-t border-neutral-200/60" />
      )}

      {hasFeatures && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-4 md:px-8"
        >
          <h2 className="text-2xl md:text-3xl font-light tracking-wide text-neutral-900 mb-8 md:mb-12">
            Özellikler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 md:gap-y-8">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] shrink-0 mt-2.5" />
                <span className="text-neutral-600 font-light leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
