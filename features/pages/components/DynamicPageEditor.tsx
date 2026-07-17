'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Link from 'next/link'
import { savePageContent } from '@/features/content/actions/page-actions'
import { BlockEditor } from '../../content/editor/BlockEditor'
import { SitePageBlock } from '../../content/types/blocks'

interface DynamicPageEditorProps {
  pageSlug: string
  pageTitle: string
  initialBlocks: SitePageBlock[]
  initialContent?: any
}

export function DynamicPageEditor({ pageSlug, pageTitle, initialBlocks, initialContent }: DynamicPageEditorProps) {
  const router = useRouter()
  
  const [blocks, setBlocks] = useState<SitePageBlock[]>(() => {
    if (initialBlocks && initialBlocks.length > 0) return initialBlocks
    
    // Fallback: Convert old JSON content to block format
    const converted: SitePageBlock[] = []
    if (initialContent && typeof initialContent === 'object') {
      Object.entries(initialContent).forEach(([key, value]: [string, any]) => {
        if (key === 'hero') {
          converted.push({ id: crypto.randomUUID(), type: 'hero', data: value })
        } else if (value.image && value.title_normal) {
          // Approximate block based on shape
          converted.push({ id: crypto.randomUUID(), type: 'two_column', data: value })
        } else {
          // Default fallback
          converted.push({ id: crypto.randomUUID(), type: 'text', data: { content: JSON.stringify(value) } })
        }
      })
    }
    return converted
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    const result = await savePageContent(pageSlug, { blocks })
    setIsSaving(false)
    
    if (result.success) {
      toast.success('Sayfa başarıyla güncellendi.')
      router.refresh()
    } else {
      toast.error('Güncelleme sırasında bir hata oluştu.')
    }
  }

  return (
    <div className="max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/pages"
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{pageTitle}</h1>
            <p className="text-sm text-muted-foreground">/{pageSlug}</p>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-foreground text-background hover:bg-foreground/90"
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              Kaydediliyor...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Değişiklikleri Kaydet
            </span>
          )}
        </Button>
      </div>

      {/* Editor */}
      <BlockEditor initialBlocks={blocks} onChange={setBlocks} />
    </div>
  )
}
