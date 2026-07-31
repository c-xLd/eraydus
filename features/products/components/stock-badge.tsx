import { cn } from '@/lib/utils';

interface StockBadgeProps {
  stockQuantity?: number;
  stockStatus?: string;
  className?: string;
}

export function StockBadge({ stockQuantity = 0, stockStatus, className }: StockBadgeProps) {
  let label = 'Tükendi';
  let colorClass = 'bg-red-500';
  let bgClass = 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400';

  if (stockStatus === 'in_stock' || stockQuantity >= 5) {
    label = 'Stokta';
    colorClass = 'bg-green-500';
    bgClass = 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400';
  } else if (stockQuantity > 0 && stockQuantity < 5) {
    label = 'Sınırlı Stok';
    colorClass = 'bg-orange-500';
    bgClass = 'bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400';
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", bgClass, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", colorClass)} />
      {label}
    </div>
  );
}
