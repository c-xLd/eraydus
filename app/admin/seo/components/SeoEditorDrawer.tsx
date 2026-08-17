'use client'

import { useState, useEffect } from 'react'
import type { ProductSeoInfo } from '@/features/seo/types'
import { updateSeoMetadata } from '@/features/seo/actions'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, Save, Loader2, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface SeoEditorDrawerProps {
  product: ProductSeoInfo
  open: boolean
  onClose: () => void
}

export default function SeoEditorDrawer({ product, open, onClose }: SeoEditorDrawerProps) {
  const seo = product.seo_metadata
  
  const [title, setTitle] = useState(seo?.title || '')
  const [description, setDescription] = useState(seo?.description || '')
  const [canonical, setCanonical] = useState(seo?.canonical_url || '')
  const [isIndex, setIsIndex] = useState(seo ? seo.robots_index : true)
  const [isFollow, setIsFollow] = useState(seo ? seo.robots_follow : true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update state when product changes
  useEffect(() => {
    setTitle(product.seo_metadata?.title || '')
    setDescription(product.seo_metadata?.description || '')
    setCanonical(product.seo_metadata?.canonical_url || '')
    setIsIndex(product.seo_metadata ? product.seo_metadata.robots_index : true)
    setIsFollow(product.seo_metadata ? product.seo_metadata.robots_follow : true)
  }, [product])

  const handleSave = async () => {
    if (!isIndex && !confirm('Bu sayfa indekslenmeyecek (NOINDEX). Google arama sonuçlarından düşebilir. Emin misiniz?')) {
      return
    }

    setIsSubmitting(true)
    
    try {
      await updateSeoMetadata(product.id, 'product', {
        title,
        description,
        canonical_url: canonical,
        robots_index: isIndex,
        robots_follow: isFollow
      })
      toast.success('SEO ayarları kaydedildi')
      onClose()
    } catch (err: any) {
      toast.error(err.message || 'Bir hata oluştu')
    } finally {
      setIsSubmitting(false)
    }
  }

  const generatedUrl = `https://www.eraydus.net/urunler/${product.categories?.[0]?.slug || 'kategori'}/${product.slug}`
  const displayTitle = title || `${product.name} | Erayduş`
  const displayDesc = description || 'Lütfen arama motorlarında görünecek bir açıklama yazın.'

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-2xl border-l flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b bg-gray-50/50">
              <div>
                <h2 className="text-xl font-medium">SEO Düzenleyici</h2>
                <p className="text-sm text-gray-500 mt-1">{product.name}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Google Search Preview Simulation */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="size-4" /> Google Önizleme
                </h3>
                <div className="p-4 bg-white border rounded-xl shadow-sm space-y-1">
                  <div className="flex items-center gap-2 text-sm text-[#202124]">
                    <div className="size-6 bg-gray-100 rounded-full flex items-center justify-center text-xs">E</div>
                    <div>
                      <span className="block leading-tight">Erayduş</span>
                      <span className="block text-xs text-[#4d5156]">{generatedUrl}</span>
                    </div>
                  </div>
                  <h4 className="text-[20px] text-[#1a0dab] font-medium leading-tight hover:underline cursor-pointer pt-1 truncate">
                    {displayTitle}
                  </h4>
                  <p className="text-sm text-[#4d5156] leading-snug line-clamp-2">
                    {displayDesc}
                  </p>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Info className="size-3" /> Bu bir simülasyondur, Google sonuçları farklı gösterebilir.
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <Label>SEO Title</Label>
                    <span className={`text-xs ${title.length > 60 ? 'text-red-500' : 'text-gray-500'}`}>
                      {title.length} / 60
                    </span>
                  </div>
                  <Input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder={`${product.name} | Erayduş`} 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <Label>Meta Description</Label>
                    <span className={`text-xs ${description.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                      {description.length} / 160
                    </span>
                  </div>
                  <Textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    rows={3} 
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Canonical URL</Label>
                  <Input 
                    value={canonical} 
                    onChange={e => setCanonical(e.target.value)} 
                    placeholder={generatedUrl} 
                  />
                  <p className="text-xs text-gray-500">Boş bırakılırsa varsayılan URL kullanılır.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl space-y-4 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">İndekslensin mi? (Index)</Label>
                      <p className="text-sm text-gray-500">Google bu sayfayı arama sonuçlarında göstersin.</p>
                    </div>
                    <Switch checked={isIndex} onCheckedChange={setIsIndex} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Linkler Takip Edilsin mi? (Follow)</Label>
                      <p className="text-sm text-gray-500">Google sayfadaki bağlantıları tarasın.</p>
                    </div>
                    <Switch checked={isFollow} onCheckedChange={setIsFollow} />
                  </div>
                  {(!isIndex) && (
                    <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg border border-red-200">
                      <strong>Uyarı:</strong> Bu sayfa arama motorlarında çıkmayacak! (NOINDEX)
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50/50 flex gap-3">
              <Button onClick={onClose} variant="outline" className="flex-1">
                İptal
              </Button>
              <Button onClick={handleSave} disabled={isSubmitting} className="flex-1 bg-black text-white hover:bg-black/90">
                {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <><Save className="size-4 mr-2" /> Kaydet</>}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
