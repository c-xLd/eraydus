'use client'

import { useState, useEffect } from 'react'
import { updateSeoMetadata } from '@/features/seo/actions'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, Save, Loader2, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface CategorySeoDrawerProps {
  category: any
  open: boolean
  onClose: () => void
}

export default function CategorySeoDrawer({ category, open, onClose }: CategorySeoDrawerProps) {
  const meta = category?.seo_metadata || {}
  
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    keywords: '',
    canonical_url: '',
    robots_index: true,
    robots_follow: true,
  })

  useEffect(() => {
    if (category) {
      setForm({
        title: meta.title || '',
        description: meta.description || '',
        keywords: meta.keywords?.join(', ') || '',
        canonical_url: meta.canonical_url || '',
        robots_index: meta.robots_index ?? true,
        robots_follow: meta.robots_follow ?? true,
      })
    }
  }, [category])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const dataToSave = {
        title: form.title || null,
        description: form.description || null,
        keywords: form.keywords ? form.keywords.split(',').map(k => k.trim()).filter(Boolean) : null,
        canonical_url: form.canonical_url || null,
        robots_index: form.robots_index,
        robots_follow: form.robots_follow,
      }
      
      await updateSeoMetadata(category.id, 'category', dataToSave)
      toast.success('Kategori SEO güncellendi')
      onClose()
    } catch (err: any) {
      toast.error(err.message || 'Hata oluştu')
    } finally {
      setIsSaving(false)
    }
  }

  const SERPPreview = () => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
      <div className="flex items-center gap-2 mb-1">
        <Globe className="size-4 text-gray-400" />
        <span className="text-xs text-gray-700">eraydus.net › urunler › {category?.slug}</span>
      </div>
      <h3 className="text-[#1a0dab] text-xl font-medium truncate">
        {form.title || category?.name || 'Başlık Eksik'}
      </h3>
      <p className="text-[#4d5156] text-sm mt-1 line-clamp-2 leading-relaxed">
        {form.description || 'Google arama sonuçlarında görünecek açıklama (description) eksik. Tıklama oranını artırmak için lütfen doldurun.'}
      </p>
    </div>
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="font-semibold text-lg text-gray-900">{category?.name}</h2>
                <p className="text-xs text-gray-500">Kategori SEO Düzenle</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="size-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <SERPPreview />

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="title">Meta Title</Label>
                    <span className="text-xs text-gray-500">{form.title.length}/60</span>
                  </div>
                  <Input 
                    id="title" 
                    value={form.title} 
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder={`${category?.name} | Erayduş`} 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="desc">Meta Description</Label>
                    <span className="text-xs text-gray-500">{form.description.length}/160</span>
                  </div>
                  <Textarea 
                    id="desc" 
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={3} 
                    className="resize-none" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canonical">Özel Canonical URL</Label>
                  <Input 
                    id="canonical" 
                    value={form.canonical_url}
                    onChange={e => setForm(f => ({ ...f, canonical_url: e.target.value }))}
                    placeholder={`https://eraydus.net/urunler/${category?.slug}`} 
                  />
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Info className="size-3" /> Boş bırakılırsa varsayılan URL kullanılır.
                  </p>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div>
                      <Label className="text-sm font-medium">Google İndekslesin mi?</Label>
                      <p className="text-xs text-gray-500">robots: index/noindex</p>
                    </div>
                    <Switch 
                      checked={form.robots_index} 
                      onCheckedChange={v => setForm(f => ({ ...f, robots_index: v }))} 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} disabled={isSaving}>İptal</Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 min-w-24">
                {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4 mr-2" />}
                {isSaving ? 'Kaydediliyor' : 'Kaydet'}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
