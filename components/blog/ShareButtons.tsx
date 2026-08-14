'use client'

import { Link2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    toast.success('Bağlantı panoya kopyalandı!')
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground uppercase tracking-widest mr-2">Paylaş:</span>
      
      {/* WhatsApp */}
      <a 
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors"
        title="WhatsApp'ta Paylaş"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0zm0 0a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
      </a>

      {/* X / Twitter */}
      <a 
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:bg-black hover:text-white hover:border-black transition-colors"
        title="X'te Paylaş"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a 
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"
        title="LinkedIn'de Paylaş"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      </a>

      {/* Copy Link */}
      <button 
        onClick={handleCopy}
        className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:bg-champagne hover:text-black hover:border-champagne transition-colors cursor-pointer"
        title="Bağlantıyı Kopyala"
      >
        <Link2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

