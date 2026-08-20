'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAdminEdit } from './AdminEditProvider'
import { PencilLine, X, Check, Loader2, Upload } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateInlineField } from '../actions/inline-actions'
import { uploadImageToSupabase } from '../actions/upload-actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const TiptapEditor = dynamic(
  () => import('../editor/TiptapEditor').then((mod) => mod.TiptapEditor),
  { ssr: false, loading: () => <div className="p-4 text-xs text-muted-foreground">Editör yükleniyor...</div> }
)

export function InlineEditToolbar() {
  const { isAdmin, activeEditField, setActiveEditField } = useAdminEdit()
  const [value, setValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Sync state when active field changes
  useEffect(() => {
    if (activeEditField) {
      setValue(activeEditField.value)
    }
  }, [activeEditField])

  if (!isAdmin) {
    return null
  }

  const handleSave = async () => {
    if (!activeEditField) return
    
    setIsSaving(true)
    const pathname = window.location.pathname
    const pageSlug = pathname === '/' ? 'anasayfa' : pathname.replace(/^\//, '')
    
    const result = await updateInlineField(pageSlug, activeEditField.path, value)
    setIsSaving(false)

    if (result.success) {
      toast.success('Başarıyla güncellendi!')
      setActiveEditField(null)
      router.refresh()
    } else {
      toast.error('Güncellenirken hata oluştu.')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadImageToSupabase(formData)
    setIsUploading(false)

    if (result.success && result.url) {
      setValue(result.url)
      toast.success('Görsel başarıyla yüklendi!')
    } else {
      toast.error(result.error || 'Yükleme başarısız oldu.')
    }
  }

  if (!activeEditField) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
            <PencilLine className="w-4 h-4 text-champagne" />
            İçeriği Düzenle
          </h3>
          <button onClick={() => setActiveEditField(null)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded inline-block">
              Alan: {activeEditField.path}
            </p>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              TİP: {activeEditField.type}
            </span>
          </div>
          
          {activeEditField.type === 'image' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input 
                  value={value} 
                  onChange={(e) => setValue(e.target.value)} 
                  placeholder="Görsel URL'si (veya yandaki butondan yükleyin)"
                  className="flex-1"
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="whitespace-nowrap"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                  {isUploading ? 'Yükleniyor...' : 'Yeni Yükle'}
                </Button>
              </div>
              {value && (
                <div className="mt-4 border border-border rounded-xl overflow-hidden bg-muted/20 relative aspect-[16/9] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={value} alt="Önizleme" className="max-w-full max-h-[300px] object-contain" />
                </div>
              )}
            </div>
          ) : activeEditField.type === 'text' ? (
            <Input 
              value={value} 
              onChange={(e) => setValue(e.target.value)} 
              className="w-full text-lg py-6"
              autoFocus
            />
          ) : (
            <div className="border border-border rounded-xl overflow-hidden bg-background">
              <TiptapEditor 
                content={value} 
                onChange={setValue} 
              />
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border flex justify-end gap-3 bg-muted/10">
          <Button variant="ghost" onClick={() => setActiveEditField(null)}>İptal</Button>
          <Button onClick={handleSave} disabled={isSaving || isUploading} className="bg-foreground text-background hover:bg-foreground/90 px-8">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-2" /> Kaydet</>}
          </Button>
        </div>
      </div>
    </div>
  )
}
