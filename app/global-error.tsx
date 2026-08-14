'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertOctagon, RotateCcw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Critical Root Error:', error)
  }, [error])

  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col items-center justify-center bg-[#09090b] text-[#fafafa] font-sans px-6 py-20">
        <div className="text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <AlertOctagon className="size-3.5 text-red-400" />
            <span>Kritik Sistem Hatası</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-4">
            ERAYDUŞ <span className="font-semibold text-red-400">Platformu</span>
          </h1>

          <p className="text-zinc-400 text-base mb-8 leading-relaxed">
            Uygulama yüklenirken kritik bir hata meydana geldi. Lütfen sayfayı yenilemeyi deneyin.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-all cursor-pointer"
            >
              <RotateCcw className="size-4" />
              <span>Sayfayı Yenile</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-zinc-700 bg-zinc-900 text-white font-medium text-sm hover:bg-zinc-800 transition-all"
            >
              <Home className="size-4" />
              <span>Ana Sayfa</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
