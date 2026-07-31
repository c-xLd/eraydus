'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { 
  UploadCloud, 
  Search, 
  Grid, 
  List as ListIcon, 
  Copy, 
  Check, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  Image as ImageIcon,
  FileImage,
  X,
  Info
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { getMediaFiles, uploadMediaFiles, deleteMediaFile, uploadFromUrl, type MediaItem } from './actions'
import { cn } from '@/lib/utils'
import imageCompression from 'browser-image-compression'
import { motion, AnimatePresence } from 'framer-motion'

interface MediaLibraryClientProps {
  initialItems: MediaItem[]
}

export function MediaLibraryClient({ initialItems }: MediaLibraryClientProps) {
  const [items, setItems] = useState<MediaItem[]>(initialItems)
  const [selectedBucket, setSelectedBucket] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [isUploading, setIsUploading] = useState(false)
  const [showUploadPanel, setShowUploadPanel] = useState(false)
  const [uploadBucket, setUploadBucket] = useState<string>('uploads')
  const [uploadUrl, setUploadUrl] = useState('')
  const [isUrlUploading, setIsUrlUploading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }))
  }

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesBucket = selectedBucket === 'all' || item.bucket === selectedBucket
    const matchesQuery = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesBucket && matchesQuery
  })

  // Format bytes helper
  const formatBytes = (bytes: number, decimals = 1) => {
    if (!bytes || bytes === 0) return 'Bilinmiyor'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  // Refresh items
  const handleRefresh = () => {
    startTransition(async () => {
      const res = await getMediaFiles(selectedBucket)
      if (res.success && res.data) {
        setItems(res.data)
        toast.success('Ortam kütüphanesi güncellendi.')
      } else {
        toast.error('Güncelleme sırasında hata oluştu.')
      }
    })
  }

  // File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let files: FileList | null = null
    if ('files' in e.target && e.target.files) {
      files = e.target.files
    } else if ('dataTransfer' in e && e.dataTransfer.files) {
      files = e.dataTransfer.files
    }

    if (!files || files.length === 0) return

    setIsUploading(true)
    const formData = new FormData()

    try {
      toast.info('Görseller optimize ediliyor (Antigravity Smush)...')

      const options = {
        maxSizeMB: 1, // Maksimum dosya boyutu (1MB altı)
        maxWidthOrHeight: 1920, // Maksimum çözünürlük (Full HD)
        useWebWorker: true, // Tarayıcıyı dondurmamak için arka plan iş parçacığı
        fileType: 'image/webp', // WebP formatına zorla (CDN ve hız için)
        initialQuality: 0.8 // %80 Kalite ile sıkıştır
      }

      let optimizedCount = 0

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        if (!file.type.startsWith('image/')) continue

        try {
          // Resmi tarayıcıda sıkıştır ve WebP'ye çevir
          const compressedFile = await imageCompression(file, options)
          
          // Orijinal ismini koruyarak uzantıyı .webp yap
          const rawName = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name
          const newName = `${rawName}.webp`
          
          // Yeni WebP dosyasını oluştur ve FormData'ya ekle
          const finalFile = new File([compressedFile], newName, { type: 'image/webp' })
          formData.append('files', finalFile)
          optimizedCount++
        } catch (compressionErr) {
          console.error("Sıkıştırma hatası:", compressionErr)
          // Hata durumunda orijinal dosyayı yükle (fallback)
          formData.append('files', file)
        }
      }

      if (optimizedCount > 0) {
        toast.success(`${optimizedCount} görsel başarıyla sıkıştırıldı ve WebP formatına dönüştürüldü!`)
      }

      const res = await uploadMediaFiles(formData, uploadBucket)
      if (res.success && res.data) {
        setItems((prev) => [...res.data!, ...prev])
        toast.success(`${res.data.length} adet optimize görsel ortama eklendi.`)
        setShowUploadPanel(false)
      } else {
        toast.error(res.error || 'Görsel yüklenemedi.')
      }
    } catch (err) {
      toast.error('Görsel yükleme sırasında hata oluştu.')
    } finally {
      setIsUploading(false)
    }
  }

  // URL Upload Handler
  const handleUrlUpload = async () => {
    if (!uploadUrl || !uploadUrl.startsWith('http')) {
      toast.error('Lütfen geçerli bir bağlantı (URL) girin.')
      return
    }

    setIsUrlUploading(true)
    try {
      toast.info('Görsel bağlantıdan çekiliyor...')
      const res = await uploadFromUrl(uploadUrl, uploadBucket)
      
      if (res.success && res.data) {
        setItems((prev) => [res.data!, ...prev])
        toast.success('Görsel başarıyla bağlantıdan yüklendi.')
        setUploadUrl('')
        setShowUploadPanel(false)
      } else {
        toast.error(res.error || 'Bağlantıdan yükleme başarısız.')
      }
    } catch (err) {
      toast.error('Bağlantıdan yükleme sırasında hata oluştu.')
    } finally {
      setIsUrlUploading(false)
    }
  }

  // Copy Public URL Handler
  const handleCopyUrl = (url: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    toast.success('Doğrudan görsel adresi panoya kopyalandı!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Delete Media Handler
  const handleDeleteItem = async (item: MediaItem) => {
    startTransition(async () => {
      const res = await deleteMediaFile(item.bucket, item.path)
      if (res.success) {
        setItems((prev) => prev.filter((i) => i.id !== item.id))
        if (selectedItem?.id === item.id) setSelectedItem(null)
        toast.success('Görsel ortam kütüphanesinden silindi.')
      } else {
        toast.error(res.error || 'Silme işlemi başarısız.')
      }
    })
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090b]">
            Ortam Kütüphanesi
          </h1>
          <p className="text-sm text-black/50 font-medium">
            Tüm görselleri merkezi olarak yönetin, yükleyin ve optimize edin.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            onClick={() => setShowUploadPanel(!showUploadPanel)}
            className={cn(
              "rounded-full text-sm font-semibold px-6 h-11 gap-2 shadow-lg transition-all active:scale-95 border",
              showUploadPanel 
                ? "bg-white text-black border-black/10 hover:bg-black/5" 
                : "bg-black text-white hover:bg-black/90 hover:shadow-black/20 border-transparent"
            )}
          >
            {showUploadPanel ? <X className="w-4 h-4" /> : <UploadCloud className="w-4 h-4" />}
            <span>{showUploadPanel ? 'Vazgeç' : 'Yeni Görsel Ekle'}</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isPending}
            className="rounded-full h-11 w-11 border-black/10 shadow-sm hover:shadow-md bg-white transition-all active:scale-95"
            title="Yenile"
          >
            <RefreshCw className={cn("w-4 h-4", isPending && "animate-spin")} />
          </Button>
        </div>
      </div>

      {/* Upload Drag & Drop Panel (Animated) */}
      <AnimatePresence>
        {showUploadPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                handleFileUpload(e)
              }}
              className="relative rounded-[2rem] border border-dashed border-black/20 bg-gradient-to-b from-black/[0.02] to-black/[0.05] p-12 text-center transition-all hover:border-[#C9A86A]/50 hover:bg-[#C9A86A]/5 group shadow-inner"
            >
              <div className="max-w-md mx-auto space-y-6">
                <div className="relative size-20 mx-auto">
                  <div className="absolute inset-0 bg-[#C9A86A]/20 rounded-full blur-xl group-hover:bg-[#C9A86A]/40 transition-colors" />
                  <div className="relative size-full rounded-2xl bg-white border border-black/5 shadow-xl flex items-center justify-center text-[#C9A86A] group-hover:scale-110 transition-transform duration-500">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-black tracking-tight">
                    Görselleri buraya sürükleyip bırakın
                  </h3>
                  <p className="text-sm text-black/50 font-medium">
                    veya bilgisayarınızdan toplu dosya seçmek için aşağıdaki butona tıklayın.<br/>(Yüklenen dosyalar otomatik olarak Antigravity formatına - WEBP - çevrilir).
                  </p>
                </div>

                <div className="pt-2 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-black/10 shadow-sm">
                    <span className="text-xs font-bold text-black/50 uppercase tracking-widest">HEDEF KOVA:</span>
                    <Select value={uploadBucket} onValueChange={(val) => val && setUploadBucket(val)}>
                      <SelectTrigger className="w-[160px] h-8 text-xs font-bold rounded-xl bg-white border-black/10 shadow-sm focus:ring-0">
                        <SelectValue placeholder="Kova Seçin" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl shadow-xl border-black/10 font-medium text-xs">
                        <SelectItem value="products">Ürünler (products)</SelectItem>
                        <SelectItem value="projects">Projeler (projects)</SelectItem>
                        <SelectItem value="uploads">Yüklemeler (uploads)</SelectItem>
                        <SelectItem value="kumlama-models">Kumlama</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-white text-black border border-black/10 font-bold text-sm shadow-md hover:shadow-xl hover:border-black/20 active:scale-95 transition-all">
                    <FileImage className="w-4 h-4 text-[#C9A86A]" />
                    <span>Dosya Seç</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="pt-2 w-full flex flex-col gap-2 relative">
                  <div className="flex items-center justify-center gap-3 mb-1 opacity-60">
                    <div className="h-px w-10 bg-black/20" />
                    <span className="text-[9px] font-bold text-black uppercase tracking-widest">veya bağlantıdan</span>
                    <div className="h-px w-10 bg-black/20" />
                  </div>
                  <div className="flex gap-2 w-full max-w-sm mx-auto">
                    <Input 
                      placeholder="https://ornek.com/resim.jpg" 
                      value={uploadUrl}
                      onChange={(e) => setUploadUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleUrlUpload()}
                      className="flex-1 h-11 text-xs rounded-xl border-black/10 shadow-inner bg-white/50 focus-visible:ring-[#C9A86A]/30 focus-visible:border-[#C9A86A]"
                    />
                    <Button 
                      onClick={handleUrlUpload}
                      disabled={!uploadUrl || isUrlUploading}
                      className="h-11 rounded-xl px-5 text-xs font-bold bg-black text-white hover:bg-black/80 transition-all shadow-md active:scale-95"
                    >
                      {isUrlUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Çek'}
                    </Button>
                  </div>
                </div>

                {isUploading && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="pt-4 flex items-center justify-center gap-2 text-sm font-bold text-[#C9A86A]"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Görseller optimize ediliyor ve yükleniyor...</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter and Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 sm:p-2.5 rounded-[1.25rem] bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-black/5 ring-1 ring-black/5 sticky top-24 z-30">
        <div className="flex flex-1 items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Görsel adıyla ara..."
              className="pl-11 h-11 text-sm rounded-xl bg-black/[0.02] border-transparent hover:bg-black/[0.04] focus-visible:bg-white focus-visible:border-black/10 focus-visible:ring-4 focus-visible:ring-black/5 transition-all shadow-inner"
            />
          </div>

          {/* Bucket Select */}
          <Select value={selectedBucket} onValueChange={(val) => val && setSelectedBucket(val)}>
            <SelectTrigger className="w-[180px] h-11 text-sm rounded-xl bg-transparent border-none hover:bg-black/[0.03] focus:ring-0 focus:ring-offset-0 font-medium">
              <div className="flex items-center gap-2 text-black/70">
                <SelectValue placeholder="Tüm Kovalar" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-2xl shadow-2xl border-white/20 bg-white/90 backdrop-blur-xl">
              <SelectItem value="all" className="rounded-xl">Tüm Kovalar</SelectItem>
              <SelectItem value="products" className="rounded-xl">Ürünler (products)</SelectItem>
              <SelectItem value="projects" className="rounded-xl">Projeler (projects)</SelectItem>
              <SelectItem value="uploads" className="rounded-xl">Yüklemeler (uploads)</SelectItem>
              <SelectItem value="kumlama-models" className="rounded-xl">Kumlama</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 px-2 sm:px-0">
          <span className="text-xs text-black/40 font-bold uppercase tracking-widest hidden md:block">
            {filteredItems.length} ÖğE
          </span>

          {/* Grid / List View Mode Toggle (Apple Style Segmented Control) */}
          <div className="flex items-center bg-black/5 rounded-xl p-1 relative">
            <motion.div
              layoutId="view-mode-indicator"
              className="absolute bg-white rounded-lg shadow-sm border border-black/5"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              style={{
                width: 'calc(50% - 4px)',
                height: 'calc(100% - 8px)',
                left: viewMode === 'grid' ? '4px' : 'calc(50%)',
              }}
            />
            <button
              onClick={() => setViewMode('grid')}
              className={cn("relative z-10 h-8 w-10 flex items-center justify-center rounded-lg transition-colors text-black/50 hover:text-black", viewMode === 'grid' && "text-black")}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn("relative z-10 h-8 w-10 flex items-center justify-center rounded-lg transition-colors text-black/50 hover:text-black", viewMode === 'list' && "text-black")}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid / List Content */}
      {filteredItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="rounded-[2rem] border border-dashed border-black/15 bg-black/[0.01] p-16 text-center space-y-4"
        >
          <div className="size-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto rotate-3">
            <ImageIcon className="w-10 h-10 text-black/20" />
          </div>
          <h3 className="text-xl font-bold text-black tracking-tight">Görsel Bulunamadı</h3>
          <p className="text-sm text-black/50 max-w-md mx-auto font-medium">
            Bu kovada henüz bir görsel yok veya aramanızla eşleşen sonuç bulunamadı. Yeni bir görsel eklemek için yukarıdaki butonu kullanın.
          </p>
        </motion.div>
      ) : viewMode === 'grid' ? (
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const ext = item.name.split('.').pop()?.toUpperCase() || 'IMG'
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative aspect-square rounded-[1.5rem] overflow-hidden bg-white border border-black/5 hover:border-black/10 shadow-sm hover:shadow-2xl transition-all cursor-pointer select-none ring-1 ring-black/5"
                >
                  <Image
                    src={item.publicUrl}
                    alt={item.name}
                    fill
                    sizes="250px"
                    className={cn("object-cover object-center transition-transform duration-700 group-hover:scale-110", failedImages[item.id] && "opacity-0")}
                    onError={() => handleImageError(item.id)}
                  />
                  
                  {failedImages[item.id] && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/[0.02] text-black/40">
                      <FileImage className="w-8 h-8 mb-2 opacity-50" />
                      <span className="text-[10px] font-bold px-2 text-center">BULUNAMADI</span>
                    </div>
                  )}

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1">
                    <span className="text-[9px] font-mono font-bold tracking-widest px-2 py-1 rounded-lg bg-white/90 text-black shadow-sm backdrop-blur-md uppercase">
                      {ext}
                    </span>
                  </div>

                  {/* Bottom Overlay Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={(e) => handleCopyUrl(item.publicUrl, item.id, e)}
                        title="Doğrudan Adresi Kopyala"
                        className="p-2 rounded-xl bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md transition-all shadow-lg active:scale-95"
                      >
                        {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="space-y-1 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs font-bold truncate leading-tight drop-shadow-md">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-white/80 font-mono font-medium drop-shadow-md">
                        <span>{formatBytes(item.size)}</span>
                        <span className="capitalize">{item.bucket}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* WordPress-Style Enhanced List View */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto rounded-[1.5rem] border border-black/10 bg-white overflow-hidden shadow-xl shadow-black/5"
        >
          {/* List Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-black/[0.02] border-b border-black/5 text-[10px] font-mono font-bold uppercase tracking-widest text-black/40">
            <div className="col-span-5">Görsel & Detay</div>
            <div className="col-span-2">Kova (Bucket)</div>
            <div className="col-span-2">Boyut</div>
            <div className="col-span-3 text-right">İşlemler</div>
          </div>

          <div className="divide-y divide-black/5">
            {filteredItems.map((item) => {
              const ext = item.name.split('.').pop()?.toUpperCase() || 'IMG'
              const formattedDate = new Date(item.created_at).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-4 p-4 sm:p-5 hover:bg-black/[0.02] transition-colors cursor-pointer"
                >
                  {/* Image & File Info (col-span-5) */}
                  <div className="col-span-5 flex items-center gap-4 min-w-0 w-full">
                    <div className="relative size-16 sm:size-20 rounded-[1rem] overflow-hidden bg-black/5 shrink-0 border border-black/10 shadow-sm group-hover:shadow-md transition-all">
                      <Image
                        src={item.publicUrl}
                        alt={item.name}
                        fill
                        sizes="100px"
                        className={cn("object-cover group-hover:scale-110 transition-transform duration-500", failedImages[item.id] && "opacity-0")}
                        onError={() => handleImageError(item.id)}
                      />
                      {failedImages[item.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 text-black/30">
                          <FileImage className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <h4 className="text-sm font-bold text-black group-hover:text-[#C9A86A] transition-colors truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-black/50 font-mono">
                        <span className="font-bold px-2 py-0.5 rounded-md bg-black/5 text-black/80">
                          {ext}
                        </span>
                        <span>•</span>
                        <span className="font-medium">{formattedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bucket Badge (col-span-2) */}
                  <div className="col-span-2 hidden md:flex items-center">
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-lg bg-[#C9A86A]/10 text-[#C9A86A] capitalize">
                      {item.bucket}
                    </span>
                  </div>

                  {/* File Size (col-span-2) */}
                  <div className="col-span-2 hidden md:flex items-center">
                    <span className="text-xs font-mono font-bold text-black/50">
                      {formatBytes(item.size)}
                    </span>
                  </div>

                  {/* Quick Action Buttons (col-span-3) */}
                  <div className="col-span-3 flex items-center justify-between md:justify-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-black/5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedItem(item)
                      }}
                      className="h-9 text-xs font-bold rounded-xl border-black/10 hover:bg-black/5 gap-1.5 shadow-sm"
                    >
                      <Info className="w-4 h-4 text-[#C9A86A]" />
                      <span>İncele</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleCopyUrl(item.publicUrl, item.id, e)}
                      className="h-9 text-xs font-bold rounded-xl border-black/10 hover:bg-black hover:text-white hover:border-black transition-all gap-1.5 shadow-sm"
                      title="URL Kopyala"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-600">Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Kopyala</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* WordPress Style Attachment Details Drawer */}
      <Sheet open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <SheetContent className="w-full sm:!max-w-[800px] md:!max-w-[1000px] p-0 overflow-hidden flex flex-col bg-[#F9F9FB] border-l border-black/10 shadow-2xl">
            <SheetHeader className="p-6 border-b border-black/[0.04] shrink-0 bg-white/70 backdrop-blur-xl z-20 relative shadow-sm">
              <SheetTitle className="text-xl font-bold text-black flex items-center gap-3">
                <div className="size-8 rounded-full bg-[#C9A86A]/10 flex items-center justify-center">
                  <Info className="w-4 h-4 text-[#C9A86A]" />
                </div>
                <span className="tracking-tight">Görsel Detayları</span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedItem.id}
                  initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col md:flex-row h-full min-h-full"
                >
                  {/* Left/Top Image Preview (Studio Vibe) */}
                  <div className="md:w-[55%] p-8 flex flex-col items-center justify-center relative min-h-[400px] md:min-h-full border-b md:border-b-0 md:border-r border-black/5 bg-[#09090b] overflow-hidden group">
                    {/* Background Radial Light */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,106,0.15)_0%,transparent_70%)] opacity-50" />
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                      className="relative w-full h-72 sm:h-96 md:h-[500px] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/10 bg-black/40 backdrop-blur-sm z-10"
                    >
                      <Image
                        src={selectedItem.publicUrl}
                        alt={selectedItem.name}
                        fill
                        className={cn("object-contain drop-shadow-2xl transition-transform duration-1000 group-hover:scale-110", failedImages[selectedItem.id] && "opacity-0")}
                        onError={() => handleImageError(selectedItem.id)}
                      />
                      {failedImages[selectedItem.id] && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 p-6 text-center">
                          <FileImage className="w-12 h-12 mb-3" />
                          <span className="text-sm font-medium">Görsel kaynağı bulunamadı.</span>
                        </div>
                      )}
                    </motion.div>
                    
                    <motion.a
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      href={selectedItem.publicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 z-10 inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-all hover:gap-3 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/20 backdrop-blur-md shadow-lg"
                    >
                      <span>Tam Çözünürlükte Aç</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>
                  </div>

                  {/* Right/Bottom Sidebar Metadata */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="md:w-[45%] p-8 lg:p-10 space-y-8 text-black flex flex-col bg-white"
                  >
                    {/* Metadata Grid */}
                    <div className="space-y-6">
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-1.5">
                        <span className="inline-block px-2 py-1 rounded bg-black/5 text-black/60 font-mono text-[9px] uppercase font-bold tracking-widest">
                          DOSYA ADI
                        </span>
                        <p className="font-bold text-black break-all text-sm leading-relaxed">{selectedItem.name}</p>
                      </motion.div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="space-y-1.5">
                          <span className="inline-block px-2 py-1 rounded bg-black/5 text-black/60 font-mono text-[9px] uppercase font-bold tracking-widest">
                            BOYUT
                          </span>
                          <p className="font-semibold text-sm">{formatBytes(selectedItem.size)}</p>
                        </motion.div>
                        
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-1.5">
                          <span className="inline-block px-2 py-1 rounded bg-black/5 text-black/60 font-mono text-[9px] uppercase font-bold tracking-widest">
                            MIME TİPİ
                          </span>
                          <p className="font-semibold text-sm">{selectedItem.mime_type}</p>
                        </motion.div>
                      </div>
                      
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="space-y-1.5">
                        <span className="inline-block px-2 py-1 rounded bg-[#C9A86A]/10 text-[#C9A86A] font-mono text-[9px] uppercase font-bold tracking-widest">
                          DEPOLAMA KOVASI
                        </span>
                        <p className="font-semibold text-sm capitalize">{selectedItem.bucket}</p>
                      </motion.div>
                    </div>

                    <div className="h-px w-full bg-black/5" />

                    {/* Inputs Section */}
                    <div className="space-y-6">
                      {/* Direct Public URL */}
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-2">
                        <label className="text-[10px] font-mono uppercase font-bold tracking-widest text-black/40 pl-1">
                          DOĞRUDAN ADRES (URL)
                        </label>
                        <div className="flex flex-col gap-2 relative">
                          <Input
                            readOnly
                            value={selectedItem.publicUrl}
                            className="h-11 text-xs font-mono bg-black/[0.02] border-black/10 focus-visible:ring-black/5 text-black/60 truncate rounded-xl shadow-inner pr-28"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleCopyUrl(selectedItem.publicUrl, selectedItem.id)}
                            className="absolute right-1 top-1 h-9 rounded-lg bg-black text-white hover:bg-black/80 text-xs font-bold gap-1.5 transition-all shadow-md active:scale-95"
                          >
                            {copiedId === selectedItem.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === selectedItem.id ? 'Kopyalandı' : 'Kopyala'}</span>
                          </Button>
                        </div>
                      </motion.div>

                      {/* Alt Text SEO input */}
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="space-y-2">
                        <label className="text-[10px] font-mono uppercase font-bold tracking-widest text-black/40 pl-1">
                          SEO METNİ (ALT TEXT)
                        </label>
                        <Input
                          placeholder="Örn: Erayduş Siyah Profil Duşakabin"
                          defaultValue={selectedItem.name.replace(/[-_]/g, ' ').split('.')[0]}
                          className="h-11 text-xs rounded-xl border-black/10 bg-white shadow-sm focus-visible:ring-[#C9A86A]/30 focus-visible:border-[#C9A86A]"
                        />
                        <p className="text-[10px] text-black/40 font-medium pl-1">
                          Google görsel aramaları ve erişilebilirlik (ekran okuyucular) için önerilir.
                        </p>
                      </motion.div>
                    </div>

                    <div className="flex-1 min-h-[40px]" />

                    {/* Danger Zone: Delete Action */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="pt-6 border-t border-black/5">
                      {copiedId === 'delete-confirm' ? (
                        <div className="flex flex-col gap-3 p-4 bg-red-50/50 rounded-2xl border border-red-100 shadow-inner">
                          <span className="text-xs text-red-600 font-bold text-center">Bu görsel tamamen silinecek. Emin misiniz?</span>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setCopiedId(null)
                                handleDeleteItem(selectedItem)
                              }}
                              className="flex-1 h-10 rounded-xl text-xs shadow-md font-bold bg-red-600 hover:bg-red-700 hover:shadow-lg active:scale-95 transition-all"
                            >
                              Evet, Kalıcı Sil
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCopiedId(null)}
                              className="flex-1 h-10 rounded-xl text-xs bg-white font-bold text-black hover:bg-black/5 active:scale-95 transition-all"
                            >
                              Vazgeç
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCopiedId('delete-confirm')}
                          className="h-11 rounded-xl text-xs font-bold gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 w-full transition-colors group"
                        >
                          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                          <span>Görseli Sil</span>
                        </Button>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  )
}
