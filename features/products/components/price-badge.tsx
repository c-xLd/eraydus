import { cn } from '@/lib/utils';

interface PriceBadgeProps {
  price: number;
  comparePrice?: number | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceBadge({ price, comparePrice, size = 'md', className }: PriceBadgeProps) {
  const formatPrice = (p: number) => 
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(p);

  if (price === 0) {
    return (
      <div className={cn("font-medium text-muted-foreground", size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-lg', className)}>
        Fiyat Sorunuz
      </div>
    );
  }

  const sizeClasses = {
    sm: { current: 'text-sm font-semibold', original: 'text-xs', badge: 'text-[10px] px-1.5' },
    md: { current: 'text-lg font-semibold', original: 'text-sm', badge: 'text-xs px-2' },
    lg: { current: 'text-2xl font-bold', original: 'text-lg', badge: 'text-sm px-2.5' }
  };

  const hasDiscount = comparePrice && comparePrice > price;
  const discountPercent = hasDiscount ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {hasDiscount && (
        <span className={cn("text-muted-foreground line-through", sizeClasses[size].original)}>
          {formatPrice(comparePrice)}
        </span>
      )}
      <span className={cn("text-foreground", sizeClasses[size].current)}>
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <span className={cn("rounded-md bg-destructive/10 text-destructive font-medium", sizeClasses[size].badge, "py-0.5")}>
          -{discountPercent}%
        </span>
      )}
    </div>
  );
}
