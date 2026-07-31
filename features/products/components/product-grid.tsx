'use client';

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/data/products';
import { ProductCard } from './product-card';
import { PackageX } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
  columns?: 2 | 3 | 4;
  className?: string;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  }
};

export function ProductGrid({ products, viewMode = 'grid', columns = 3, className }: ProductGridProps) {
  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageX className="mb-4 h-16 w-16 text-muted-foreground/30" />
        <h3 className="text-xl font-medium text-foreground">Sonuç Bulunamadı</h3>
        <p className="mt-2 text-muted-foreground">Bu kriterlere uygun ürün bulunamadı.</p>
      </div>
    );
  }

  const gridCols = {
    2: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(
        "grid gap-3.5 sm:gap-6 md:gap-8",
        viewMode === 'grid' ? gridCols[columns] : "grid-cols-1",
        className
      )}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} viewMode={viewMode} />
        </motion.div>
      ))}
    </motion.div>
  );
}
