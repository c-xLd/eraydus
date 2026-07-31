'use client';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function RatingStars({ 
  rating, 
  count, 
  size = 'md', 
  showCount = true,
  interactive = false,
  onChange,
  className 
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-6 w-6'
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const currentRating = hoverRating ?? rating;

  return (
    <div className={cn("flex items-center gap-2", className)} onMouseLeave={() => interactive && setHoverRating(null)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : 'button'}
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            className={cn(
              "p-0.5",
              interactive ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default"
            )}
          >
            <Star 
              className={cn(
                sizeClasses[size], 
                star <= currentRating ? "fill-[#C9A86A] text-[#C9A86A]" : "fill-transparent text-muted-foreground"
              )} 
            />
          </button>
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className={cn("text-muted-foreground", textClasses[size])}>
          ({count} değerlendirme)
        </span>
      )}
    </div>
  );
}
