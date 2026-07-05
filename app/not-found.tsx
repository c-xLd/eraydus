import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-[120px] font-light tracking-tighter text-muted-foreground/20 leading-none mb-6">404</h1>
        <h2 className="text-3xl font-semibold tracking-tight mb-4">Sayfa Bulunamadı</h2>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Aradığınız sayfa taşınmış, silinmiş veya geçici olarak ulaşılamıyor olabilir. 
          Lütfen bağlantıyı kontrol edin veya ana sayfaya dönün.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
}
