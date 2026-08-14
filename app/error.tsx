'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw, Home, MessageCircle } from 'lucide-react'

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App Runtime Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 py-20 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-widest uppercase mb-6">
          <AlertTriangle className="size-3.5 text-red-400" />
          <span>500 • Beklenmeyen Hata</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-4">
          Bir Şeyler Ters <span className="font-semibold text-red-400">Gitti</span>
        </h1>

        <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-8">
          İşleminiz gerçekleştirilirken teknik bir aksaklık oluştu. Sayfayı yenileyebilir veya doğrudan ana sayfaya dönebilirsiniz.
        </p>

        {error.digest && (
          <p className="text-[11px] font-mono text-muted-foreground/60 bg-muted/30 px-3 py-1.5 rounded-md inline-block mb-8">
            Hata Kodu: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <RotateCcw className="size-4" />
            <span>Tekrar Dene</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-border bg-card text-foreground font-medium text-sm hover:bg-muted transition-all active:scale-95"
          >
            <Home className="size-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <a
            href="https://wa.me/905548830071"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium text-sm hover:bg-emerald-500/20 transition-all active:scale-95"
          >
            <MessageCircle className="size-4" />
            <span>Canlı Destek</span>
          </a>
        </div>
      </div>
    </div>
  )
}
