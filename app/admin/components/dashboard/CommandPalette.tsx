'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Settings, PlusCircle, Search, FileText, ImageIcon, BarChart3, AppWindow } from 'lucide-react'

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-black/10 shadow-2xl">
        <DialogHeader className="p-4 border-b border-black/5 bg-neutral-50/50">
          <DialogTitle className="sr-only">Komut Paleti</DialogTitle>
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-black/10 shadow-sm">
            <Search className="h-5 w-5 text-neutral-400" />
            <Input 
              placeholder="Komut yazın veya arama yapın..." 
              className="border-0 focus-visible:ring-0 shadow-none text-[15px] p-0 h-auto"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </DialogHeader>
        <div className="max-h-[350px] overflow-y-auto p-3 bg-white">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-3 mt-2">Hızlı İşlemler</div>
          <button onClick={() => runCommand(() => router.push('/admin/products/new'))} className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-[14px] text-[#050505] font-medium hover:bg-neutral-100 rounded-xl transition-colors">
            <div className="bg-neutral-100 p-1.5 rounded-lg text-neutral-500"><PlusCircle className="h-4 w-4" /></div> Yeni Ürün Ekle
          </button>
          <button onClick={() => runCommand(() => router.push('/admin/blog/new'))} className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-[14px] text-[#050505] font-medium hover:bg-neutral-100 rounded-xl transition-colors">
            <div className="bg-neutral-100 p-1.5 rounded-lg text-neutral-500"><FileText className="h-4 w-4" /></div> Yeni Blog Yazısı
          </button>
          
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-3 mt-6">Navigasyon</div>
          <button onClick={() => runCommand(() => router.push('/admin'))} className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-[14px] text-[#050505] font-medium hover:bg-neutral-100 rounded-xl transition-colors">
            <div className="bg-neutral-100 p-1.5 rounded-lg text-neutral-500"><AppWindow className="h-4 w-4" /></div> Kontrol Merkezi
          </button>
          <button onClick={() => runCommand(() => router.push('/admin/analytics'))} className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-[14px] text-[#050505] font-medium hover:bg-neutral-100 rounded-xl transition-colors">
            <div className="bg-neutral-100 p-1.5 rounded-lg text-neutral-500"><BarChart3 className="h-4 w-4" /></div> Analitik
          </button>
          <button onClick={() => runCommand(() => router.push('/admin/seo'))} className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-[14px] text-[#050505] font-medium hover:bg-neutral-100 rounded-xl transition-colors">
            <div className="bg-neutral-100 p-1.5 rounded-lg text-neutral-500"><Search className="h-4 w-4" /></div> SEO & Görünürlük
          </button>
          <button onClick={() => runCommand(() => router.push('/admin/media'))} className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-[14px] text-[#050505] font-medium hover:bg-neutral-100 rounded-xl transition-colors">
            <div className="bg-neutral-100 p-1.5 rounded-lg text-neutral-500"><ImageIcon className="h-4 w-4" /></div> Medya Kütüphanesi
          </button>

          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-3 mt-6">Sistem</div>
          <button onClick={() => runCommand(() => router.push('/admin/settings'))} className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-[14px] text-[#050505] font-medium hover:bg-neutral-100 rounded-xl transition-colors">
            <div className="bg-neutral-100 p-1.5 rounded-lg text-neutral-500"><Settings className="h-4 w-4" /></div> Ayarlar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
