'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, Loader2, Link as LinkIcon } from 'lucide-react'
import { createClient } from '@/services/supabase/client'

interface FeaturedImageUploadProps {
  value: string
  onChange: (url: string) => void
}

const BUCKET = 'blog-images'

export default function FeaturedImageUpload({ value, onChange }: FeaturedImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState(value)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFile = useCallback(async (file: File) => {
    setError(null)

    if (!file.type.startsWith('image/')) {
      setError('Lütfen geçerli bir görsel dosyası seçin (JPEG, PNG, WebP, vb.)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Dosya boyutu 5 MB\'dan küçük olmalıdır')
      return
    }

    setIsUploading(true)
    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop() ?? 'jpg'
      const path = `covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: false, contentType: file.type })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
      onChange(data.publicUrl)
    } catch (err: any) {
      setError(err?.message ?? 'Görsel yüklenirken bir hata oluştu')
    } finally {
      setIsUploading(false)
    }
  }, [onChange])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  const handleRemove = () => {
    onChange('')
    setUrlInput('')
    setError(null)
  }

  const handleUrlApply = () => {
    const trimmed = urlInput.trim()
    if (!trimmed) return
    onChange(trimmed)
    setError(null)
  }

  return (
    <div className="space-y-3">
      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setTab('upload')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            tab === 'upload' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-1.5"><Upload className="size-3.5" /> Dosya Yükle</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('url')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            tab === 'url' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-1.5"><LinkIcon className="size-3.5" /> URL ile</span>
        </button>
      </div>

      {/* Upload zone */}
      {tab === 'upload' && !value && (
        <div
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all select-none ${
            isDragging
              ? 'border-amber-400 bg-amber-50 scale-[1.01]'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }`}
        >
          {isUploading ? (
            <Loader2 className="size-6 text-gray-400 animate-spin" />
          ) : (
            <>
              <div className="p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                <ImageIcon className="size-5 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Görseli sürükle bırak veya <span className="text-amber-600 underline">seç</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">JPEG, PNG, WebP — maks. 5 MB</p>
              </div>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileInput}
            disabled={isUploading}
          />
        </div>
      )}

      {/* URL input */}
      {tab === 'url' && !value && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleUrlApply())}
            placeholder="https://örnek.com/görsel.jpg"
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="button"
            onClick={handleUrlApply}
            disabled={!urlInput.trim()}
            className="px-4 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40"
          >
            Uygula
          </button>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="size-20 shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-white">
            <img src={value} alt="Kapak görseli önizlemesi" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-xs font-semibold text-gray-700 mb-1">Kapak Görseli</p>
            <p className="text-xs text-gray-400 truncate font-mono">{value}</p>
            {/* Replace options */}
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => { onChange(''); setUrlInput(''); setTab('upload') }}
                className="text-xs font-medium text-gray-500 hover:text-amber-600 transition-colors flex items-center gap-1"
              >
                <Upload className="size-3" /> Değiştir
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 p-1 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            title="Görseli kaldır"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 font-medium flex items-center gap-1">
          <X className="size-3.5" /> {error}
        </p>
      )}
    </div>
  )
}
