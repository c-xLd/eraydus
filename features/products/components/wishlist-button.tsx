'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface WishlistButtonProps {
  productId: string;
  variant?: 'default' | 'icon';
  className?: string;
}

export function WishlistButton({ productId, variant = 'icon', className }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('eraydus-wishlist');
    if (stored) {
      try {
        const list = JSON.parse(stored);
        setIsInWishlist(list.includes(productId));
      } catch (e) {}
    }
  }, [productId]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    
    let newList: string[] = [];
    const stored = localStorage.getItem('eraydus-wishlist');
    
    if (stored) {
      try {
        newList = JSON.parse(stored);
      } catch (e) {}
    }

    if (isInWishlist) {
      newList = newList.filter((id) => id !== productId);
    } else {
      newList.push(productId);
    }

    localStorage.setItem('eraydus-wishlist', JSON.stringify(newList));
    setIsInWishlist(!isInWishlist);
  };

  if (!mounted) return null;

  if (variant === 'default') {
    return (
      <Button 
        variant="outline" 
        onClick={toggleWishlist}
        className={cn("gap-2", isInWishlist ? "border-destructive text-destructive" : "", className)}
      >
        <motion.div whileTap={{ scale: 0.8 }} animate={{ scale: isInWishlist ? [1, 1.2, 1] : 1 }}>
          <Heart className={cn("h-5 w-5", isInWishlist ? "fill-current" : "")} />
        </motion.div>
        {isInWishlist ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={toggleWishlist}
      className={cn("rounded-full bg-white/90 backdrop-blur hover:bg-white relative z-30", className)}
    >
      <motion.div whileTap={{ scale: 0.8 }} animate={{ scale: isInWishlist ? [1, 1.3, 1] : 1 }}>
        <Heart className={cn("h-5 w-5", isInWishlist ? "fill-destructive text-destructive" : "text-foreground")} />
      </motion.div>
      <span className="sr-only">Favorilere Ekle</span>
    </Button>
  );
}
