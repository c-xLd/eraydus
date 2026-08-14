import Link from "next/link"
import { Layers, SlidersHorizontal, ArrowLeft, Sparkles } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-champagne/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-semibold tracking-widest uppercase mb-6">
        <Sparkles className="size-3.5" />
        <span>Kategori Bulunamadı</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-4 text-foreground">
        Aradığınız Kategori <span className="font-semibold text-champagne">Mevcut Değil</span>
      </h1>

      <p className="text-muted-foreground mb-10 text-base md:text-lg max-w-md font-light leading-relaxed">
        Bu ürün kategorisi taşınmış, güncellenmiş veya yayından kaldırılmış olabilir.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link 
          href="/urunler" 
          className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-all shadow-md active:scale-95"
        >
          <Layers className="size-4" />
          <span>Tüm Koleksiyonlar</span>
        </Link>
        <Link 
          href="/tasarla" 
          className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-champagne/40 bg-champagne/10 text-champagne font-medium text-sm hover:bg-champagne/20 transition-all active:scale-95"
        >
          <SlidersHorizontal className="size-4" />
          <span>Özel Ölçü Tasarla</span>
        </Link>
      </div>
    </div>
  )
}

