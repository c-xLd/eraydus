import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

interface WhatsappButtonProps {
  productName: string;
  productSlug?: string;
  categorySlug?: string;
  variant?: 'default' | 'icon' | 'floating';
  className?: string;
}

export function WhatsappButton({ productName, productSlug, categorySlug = 'genel', variant = 'default', className }: WhatsappButtonProps) {
  const WHATSAPP_NUMBER = '905000000000'; // Placeholder
  const productUrl = productSlug ? `https://eraydus.net/urunler/${categorySlug}/${productSlug}` : '';
  const message = `Merhaba, ${productName} ürünü hakkında bilgi almak istiyorum.${productUrl ? ` ${productUrl}` : ''}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  if (variant === 'icon') {
    return (
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className={cn(buttonVariants({ size: "icon", variant: "outline" }), "rounded-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white", className)}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="sr-only">WhatsApp ile bilgi al</span>
      </a>
    );
  }

  if (variant === 'floating') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95",
          className
        )}
      >
        <MessageCircle className="h-7 w-7" />
        <span className="sr-only">WhatsApp Destek</span>
      </a>
    );
  }

  return (
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={cn(buttonVariants(), "bg-[#25D366] text-white hover:bg-[#20bd5a] flex items-center gap-2", className)}
      >
        <MessageCircle className="h-5 w-5" />
        <span>WhatsApp ile Teklif Al</span>
      </a>
  );
}
