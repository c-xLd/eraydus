'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButton({ url, title, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={handleShare}
        className="rounded-full"
        title="Paylaş"
      >
        <Share2 className="h-5 w-5" />
        <span className="sr-only">Ürünü Paylaş</span>
      </Button>
      {copied && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md">
          Kopyalandı!
        </span>
      )}
    </div>
  );
}
