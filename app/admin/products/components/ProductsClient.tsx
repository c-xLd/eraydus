"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Search, Plus, Edit, Trash2, Eye, Package, TrendingUp, AlertCircle, Upload, Copy, ChevronLeft, ChevronRight, Download, Check, X, Pencil, Sparkles, Settings2, Columns, LayoutList, Clock, CalendarDays } from "lucide-react"
import { deleteProduct, duplicateProduct, bulkDeleteProducts, updateProductStatus, updateProductPrice, generateMetaDescription, updateProductSEO, updateProductBasicInfo } from "../actions"
import { toast } from "sonner"
import { ProductsNav } from "./ProductsNav"
import { CSVImportModal } from "./CSVImportModal"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const router = useRouter()
  
  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterSeo, setFilterSeo] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [products, setProducts] = useState(initialProducts)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [aiLoadingId, setAiLoadingId] = useState<string | null>(null)
  
  // Drawer & View State
  const [viewingProductId, setViewingProductId] = useState<string | null>(null)
  const [density, setDensity] = useState<'compact' | 'normal' | 'relaxed'>('normal')
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set())
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false)

  // Bulk Actions State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isBulkDeleting, setIsBulkDeleting] = useState(false)
  
  // Quick Edit States
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null)
  const [editBasePrice, setEditBasePrice] = useState<number>(0)
  const [editSalePrice, setEditSalePrice] = useState<number | ''>('')
  
  const [editingBasicId, setEditingBasicId] = useState<string | null>(null)
  const [editName, setEditName] = useState<string>('')
  const [editSku, setEditSku] = useState<string>('')
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 15

  // Extract unique categories for filter
  const categories = useMemo(() => {
    const cats = new Map<string, { id: string, name: string }>()
    initialProducts.forEach(p => {
      if (p.category && p.category.id) {
        cats.set(p.category.id, { id: p.category.id, name: p.category.name || p.category.slug })
      }
    })
    return Array.from(cats.values())
  }, [initialProducts])

  // Calculate SEO Score
  const calculateSeoScore = (product: any) => {
    let score = 0
    if (product.name && product.name.length > 15) score += 30
    else if (product.name) score += 10

    if (product.description && product.description.length > 50) score += 40
    else if (product.description) score += 15

    if (product.images && product.images.length > 0) score += 30

    return score
  }

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.category_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || (filterStatus === 'in-stock' ? p.status === 'active' : p.status !== 'active')
      const matchesCategory = filterCategory === 'all' || p.category_id === filterCategory
      
      const seoScore = calculateSeoScore(p)
      let matchesSeo = true
      if (filterSeo === 'poor') matchesSeo = seoScore < 50
      else if (filterSeo === 'good') matchesSeo = seoScore >= 50 && seoScore < 80
      else if (filterSeo === 'excellent') matchesSeo = seoScore >= 80

      return matchesSearch && matchesStatus && matchesCategory && matchesSeo
    }).sort((a, b) => {
      if (sortBy === 'price-low') return (a.base_price || 0) - (b.base_price || 0)
      if (sortBy === 'price-high') return (b.base_price || 0) - (a.base_price || 0)
      if (sortBy === 'seo-high') return calculateSeoScore(b) - calculateSeoScore(a)
      return (a.name || '').localeCompare(b.name || '')
    })
  }, [products, searchQuery, filterStatus, filterCategory, filterSeo, sortBy])

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Handlers
  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu ürünü silmek istediğinize emin misiniz? Geri alınamaz.")) return

    setLoadingId(id)
    const result = await deleteProduct(id)
    setLoadingId(null)

    if (result.success) {
      toast.success("Ürün başarıyla silindi.")
      setProducts(prev => prev.filter(p => p.id !== id))
      setSelectedIds(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
      if (viewingProductId === id) setViewingProductId(null)
    } else {
      toast.error("Ürün silinirken bir hata oluştu: " + result.error)
    }
  }

  const handleDuplicate = async (id: string) => {
    setLoadingId(id)
    const result = await duplicateProduct(id)
    setLoadingId(null)
    
    if (result.success) {
      toast.success("Ürün başarıyla kopyalandı.")
      router.refresh()
    } else {
      toast.error("Ürün kopyalanırken hata oluştu: " + result.error)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id)
    const result = await updateProductStatus(id, newStatus)
    setLoadingId(null)

    if (result.success) {
      toast.success("Ürün durumu güncellendi.")
      setProducts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p))
    } else {
      toast.error("Durum güncellenirken hata oluştu: " + result.error)
    }
  }

  const handleSavePrice = async (id: string) => {
    setLoadingId(id)
    const sale = editSalePrice === '' ? null : Number(editSalePrice)
    const result = await updateProductPrice(id, Number(editBasePrice), sale)
    setLoadingId(null)

    if (result.success) {
      toast.success("Ürün fiyatı güncellendi.")
      setProducts(prev => prev.map(p => p.id === id ? { ...p, base_price: Number(editBasePrice), sale_price: sale } : p))
      setEditingPriceId(null)
    } else {
      toast.error("Fiyat güncellenirken hata oluştu: " + result.error)
    }
  }

  const handleSaveBasicInfo = async (id: string) => {
    if (!editName.trim()) {
      toast.error("Ürün adı boş olamaz.")
      return
    }
    
    setLoadingId(id)
    const result = await updateProductBasicInfo(id, editName, editSku || null)
    setLoadingId(null)

    if (result.success) {
      toast.success("Ürün bilgileri güncellendi.")
      setProducts(prev => prev.map(p => p.id === id ? { ...p, name: editName, sku: editSku } : p))
      setEditingBasicId(null)
    } else {
      toast.error("Bilgiler güncellenirken hata oluştu: " + result.error)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (!window.confirm(`Seçili ${selectedIds.size} ürünü silmek istediğinize emin misiniz?`)) return
    
    setIsBulkDeleting(true)
    const result = await bulkDeleteProducts(Array.from(selectedIds))
    setIsBulkDeleting(false)

    if (result.success) {
      toast.success(`${selectedIds.size} ürün başarıyla silindi.`)
      setProducts(prev => prev.filter(p => !selectedIds.has(p.id)))
      setSelectedIds(new Set())
    } else {
      toast.error("Toplu silme işleminde hata oluştu: " + result.error)
    }
  }

  const handleAISeo = async (product: any) => {
    setAiLoadingId(product.id)
    const result = await generateMetaDescription({ productDescription: product.name + " " + (product.short_description || "") })
    
    if ('content' in result && result.content) {
      const updateRes = await updateProductSEO(product.id, result.content)
      if (updateRes.success) {
        toast.success("Yapay zeka SEO optimizasyonu tamamlandı.")
        setProducts(prev => prev.map(p => p.id === product.id ? { ...p, description: result.content as string } : p))
      } else {
        toast.error("SEO güncellenirken hata oluştu.")
      }
    } else {
      toast.error("Yapay zeka yanıt veremedi veya hata oluştu.")
    }
    setAiLoadingId(null)
  }

  // Keyboard Shortcuts (Antigravity UX)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Input veya textarea içindeyken kısayolları yoksay
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      // C: Yeni ürün
      if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        router.push('/admin/products/new')
      }

      // Esc: Drawer kapat veya inline edit çık
      if (e.key === 'Escape') {
        setViewingProductId(null)
        setEditingPriceId(null)
        setEditingBasicId(null)
        setIsViewMenuOpen(false)
      }

      // Cmd/Ctrl + A: Tümünü seç
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault()
        if (selectedIds.size === paginatedProducts.length) {
          setSelectedIds(new Set())
        } else {
          setSelectedIds(new Set(paginatedProducts.map(p => p.id)))
        }
      }

      // Delete/Backspace: Toplu silme
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.size > 0 && !isBulkDeleting) {
        e.preventDefault()
        handleBulkDelete()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router, selectedIds, paginatedProducts, isBulkDeleting])

  const handleExportCSV = () => {
    if (filteredProducts.length === 0) {
      toast.info("Dışa aktarılacak ürün bulunamadı.")
      return
    }

    const headers = ['Kimlik', 'Stok kodu (SKU)', 'İsim', 'Durum', 'Kategori', 'Normal fiyat', 'İndirimli satış fiyatı', 'SEO Skoru']
    const rows = filteredProducts.map(p => [
      p.id,
      p.sku || '',
      `"${(p.name || '').replace(/"/g, '""')}"`,
      p.status,
      `"${(p.category?.name || 'Kategorisiz').replace(/"/g, '""')}"`,
      p.base_price || 0,
      p.sale_price || '',
      calculateSeoScore(p)
    ])

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `eraydus_urunler_${new Date().toISOString().slice(0,10)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleColumn = (col: string) => {
    setHiddenColumns(prev => {
      const next = new Set(prev)
      if (next.has(col)) next.delete(col)
      else next.add(col)
      return next
    })
  }

  const viewingProduct = products.find(p => p.id === viewingProductId)

  return (
    <div className="space-y-6">
      <ProductsNav />

      {/* CSV Import Modal */}
      <CSVImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={() => {
          router.refresh()
        }}
      />

      {/* Drawer */}
      <AnimatePresence>
        {viewingProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setViewingProductId(null)}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                <h2 className="text-lg font-semibold text-gray-900">Hızlı Bakış</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">ESC</span>
                  <button onClick={() => setViewingProductId(null)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                    <X className="size-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Image */}
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative shadow-inner">
                  {viewingProduct.images && viewingProduct.images.length > 0 ? (
                    <img src={viewingProduct.images[0]} alt={viewingProduct.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                      <LayoutList className="size-8 opacity-20" />
                      <span className="text-sm font-medium">Görsel Yok</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">{viewingProduct.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {viewingProduct.sku || 'SKU Yok'}
                    </span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600 font-medium">{viewingProduct.category?.name || 'Kategorisiz'}</span>
                  </div>
                </div>

                {/* Quick Edits */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100/60 shadow-sm">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Durum</span>
                    <select
                      value={viewingProduct.status || 'draft'}
                      onChange={(e) => handleStatusChange(viewingProduct.id, e.target.value)}
                      className="w-full text-sm font-semibold text-gray-900 bg-transparent outline-none cursor-pointer"
                    >
                      <option value="active">Yayında</option>
                      <option value="draft">Taslak</option>
                    </select>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100/60 shadow-sm">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Fiyat (Normal)</span>
                    <span className="text-sm font-bold text-gray-900">₺{viewingProduct.base_price?.toLocaleString('tr-TR')}</span>
                  </div>
                </div>

                {/* SEO */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">SEO Durumu</span>
                    <button 
                      onClick={() => handleAISeo(viewingProduct)}
                      disabled={aiLoadingId === viewingProduct.id}
                      className="text-xs flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded-md transition-colors"
                    >
                      {aiLoadingId === viewingProduct.id ? (
                        <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-blue-600/30 border-t-blue-600"></span>
                      ) : (
                        <Sparkles className="size-3.5" />
                      )}
                      Yapay Zeka ile İyileştir
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {viewingProduct.description || 'Açıklama bulunmuyor. Yapay zeka ile otomatik açıklama ve SEO metni üretebilirsiniz.'}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Aktivite Geçmişi</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="mt-0.5"><Clock className="size-4 text-gray-400" /></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Son Güncelleme</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {viewingProduct.updated_at ? new Date(viewingProduct.updated_at).toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }) : 'Bilinmiyor'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-0.5"><CalendarDays className="size-4 text-gray-400" /></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Oluşturulma Tarihi</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {viewingProduct.created_at ? new Date(viewingProduct.created_at).toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }) : 'Bilinmiyor'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 bg-white flex gap-3 sticky bottom-0 z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                <Link href={`/admin/products/new?id=${viewingProduct.id}`} className="flex-1 bg-black text-white text-center py-3 rounded-xl text-sm font-bold hover:bg-black/90 transition-colors shadow-md">
                  Tam Düzenle
                </Link>
                <Link href={`/urunler/${viewingProduct.category?.slug || 'genel'}/${viewingProduct.slug}`} target="_blank" className="flex-1 bg-white border border-gray-200 text-gray-700 text-center py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
                  Sitede Gör
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Ürün Yönetimi</h1>
            <span className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
              <span className="border border-gray-300 rounded px-1">C</span> Yeni
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Tüm ürünlerinizi yönetin, düzenleyin ve performanslarını takip edin.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setIsViewMenuOpen(!isViewMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-gray-900"
            >
              <Settings2 className="size-4" />
              Görünüm
            </button>
            {isViewMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-30 p-2">
                <div className="mb-2">
                  <p className="text-[10px] font-bold text-gray-400 px-3 py-1.5 uppercase tracking-wider">Yoğunluk</p>
                  <button onClick={() => setDensity('compact')} className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-colors ${density === 'compact' ? 'bg-gray-100 font-bold' : 'hover:bg-gray-50 font-medium'}`}>Sıkışık</button>
                  <button onClick={() => setDensity('normal')} className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-colors ${density === 'normal' ? 'bg-gray-100 font-bold' : 'hover:bg-gray-50 font-medium'}`}>Normal</button>
                  <button onClick={() => setDensity('relaxed')} className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-colors ${density === 'relaxed' ? 'bg-gray-100 font-bold' : 'hover:bg-gray-50 font-medium'}`}>Geniş</button>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 px-3 py-1.5 uppercase tracking-wider">Sütunlar</p>
                  <button onClick={() => toggleColumn('seo')} className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                    SEO Skoru {hiddenColumns.has('seo') ? '' : <Check className="size-4 text-black" />}
                  </button>
                  <button onClick={() => toggleColumn('price')} className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                    Fiyat {hiddenColumns.has('price') ? '' : <Check className="size-4 text-black" />}
                  </button>
                  <button onClick={() => toggleColumn('status')} className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                    Durum {hiddenColumns.has('status') ? '' : <Check className="size-4 text-black" />}
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-gray-900"
          >
            <Download className="size-4" />
            Dışa Aktar
          </button>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-gray-900"
          >
            <Upload className="size-4" />
            İçe Aktar
          </button>
          <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-black/90 transition-all shadow-md hover:shadow-lg active:scale-95">
            <Plus className="size-4" />
            Yeni Ürün
          </Link>
        </div>
      </div>

      {/* Filters & Bulk Actions */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        {selectedIds.size > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-black p-3.5 rounded-2xl border border-black shadow-xl"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center bg-white/20 text-white font-bold size-6 rounded-full text-xs">
                {selectedIds.size}
              </span>
              <span className="text-sm font-medium text-white">ürün seçildi</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-white/50 hidden sm:block">Silmek için <kbd className="px-1.5 py-0.5 bg-white/10 rounded">DEL</kbd> tuşunu kullanabilirsiniz</span>
              <button
                onClick={handleBulkDelete}
                disabled={isBulkDeleting}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                {isBulkDeleting ? 'Siliniyor...' : 'Seçilenleri Sil'}
              </button>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-xl text-xs font-bold transition-colors"
              >
                İptal
              </button>
            </div>
          </motion.div>
        ) : null}

        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px] relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-black transition-colors" />
            <input
              type="text"
              placeholder="Ürün adı, SKU veya kategori ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black font-medium transition-all"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 font-medium bg-white transition-all hover:border-gray-300"
          >
            <option value="all">Tüm Kategoriler</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 font-medium bg-white transition-all hover:border-gray-300"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="in-stock">Yayında</option>
            <option value="out-of-stock">Taslak</option>
          </select>
          <select
            value={filterSeo}
            onChange={(e) => setFilterSeo(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 font-medium bg-white transition-all hover:border-gray-300"
          >
            <option value="all">SEO Skoru</option>
            <option value="excellent">Mükemmel (80-100)</option>
            <option value="good">İyi (50-79)</option>
            <option value="poor">Geliştirilmeli (0-49)</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 font-medium bg-white transition-all hover:border-gray-300"
          >
            <option value="name">Ada Göre</option>
            <option value="price-low">Fiyat (Artan)</option>
            <option value="price-high">Fiyat (Azalan)</option>
            <option value="seo-high">SEO (Yüksek)</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className={`px-6 text-xs font-bold text-gray-400 uppercase tracking-wider ${density === 'compact' ? 'py-3' : density === 'relaxed' ? 'py-5' : 'py-4'} w-12`}>
                  <input
                    type="checkbox"
                    checked={paginatedProducts.length > 0 && selectedIds.size === paginatedProducts.length}
                    onChange={() => {
                      if (selectedIds.size === paginatedProducts.length) setSelectedIds(new Set())
                      else setSelectedIds(new Set(paginatedProducts.map(p => p.id)))
                    }}
                    className="rounded border-gray-300 text-black focus:ring-black transition-all"
                  />
                </th>
                <th className={`px-6 text-xs font-bold text-gray-400 uppercase tracking-wider ${density === 'compact' ? 'py-3' : density === 'relaxed' ? 'py-5' : 'py-4'}`}>Ürün</th>
                
                {!hiddenColumns.has('seo') && (
                  <th className={`px-6 text-xs font-bold text-gray-400 uppercase tracking-wider ${density === 'compact' ? 'py-3' : density === 'relaxed' ? 'py-5' : 'py-4'}`}>SEO</th>
                )}
                
                {!hiddenColumns.has('price') && (
                  <th className={`px-6 text-xs font-bold text-gray-400 uppercase tracking-wider ${density === 'compact' ? 'py-3' : density === 'relaxed' ? 'py-5' : 'py-4'}`}>Fiyat</th>
                )}
                
                {!hiddenColumns.has('status') && (
                  <th className={`px-6 text-xs font-bold text-gray-400 uppercase tracking-wider ${density === 'compact' ? 'py-3' : density === 'relaxed' ? 'py-5' : 'py-4'}`}>Durum</th>
                )}
                
                <th className={`px-6 text-center text-xs font-bold text-gray-400 uppercase tracking-wider ${density === 'compact' ? 'py-3' : density === 'relaxed' ? 'py-5' : 'py-4'}`}></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="inline-flex flex-col items-center">
                      <div className="p-4 rounded-full bg-gray-50 mb-4 ring-1 ring-gray-100">
                        <Search className="size-6 text-gray-400" />
                      </div>
                      <p className="text-gray-900 font-bold text-lg">Sonuç Bulunamadı</p>
                      <p className="text-gray-500 text-sm mt-1">Farklı bir arama yapmayı deneyin.</p>
                    </div>
                  </td>
                </tr>
              ) : paginatedProducts.map((product) => {
                const imageUrl = Array.isArray(product.images) && product.images.length > 0 
                  ? product.images[0] 
                  : 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=200&auto=format&fit=crop'
                
                const isUpdating = loadingId === product.id
                const isSelected = selectedIds.has(product.id)
                const seoScore = calculateSeoScore(product)
                
                const isEditingPrice = editingPriceId === product.id
                const isEditingBasic = editingBasicId === product.id
                
                const cellPadding = density === 'compact' ? 'py-2' : density === 'relaxed' ? 'py-6' : 'py-4'

                return (
                <tr 
                  key={product.id} 
                  onClick={() => {
                    // Eğer input açık değilse drawer'ı aç
                    if (!isEditingBasic && !isEditingPrice) setViewingProductId(product.id)
                  }}
                  className={`group cursor-pointer hover:bg-gray-50/80 transition-all ${isUpdating ? 'opacity-50' : ''} ${isSelected ? 'bg-blue-50/30 hover:bg-blue-50/50' : ''}`}
                >
                  <td className={`px-6 ${cellPadding}`} onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => toggleSelect(product.id, e as any)}
                      className="rounded border-gray-300 text-black focus:ring-black transition-all"
                    />
                  </td>
                  <td className={`px-6 ${cellPadding}`}>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/60 shadow-sm relative group-hover:shadow-md transition-all">
                        <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1" onClick={e => e.stopPropagation()}>
                        {isEditingBasic ? (
                          <div className="flex flex-col gap-1.5 w-full max-w-sm bg-white p-3 rounded-xl border border-gray-200 shadow-xl absolute z-10 -ml-3 -mt-6">
                            <input 
                              type="text" 
                              className="w-full px-2 py-1 text-sm font-semibold border rounded-lg focus:outline-none focus:border-black"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              placeholder="Ürün Adı"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveBasicInfo(product.id)
                                if (e.key === 'Escape') setEditingBasicId(null)
                              }}
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-10 font-medium">SKU</span>
                              <input 
                                type="text" 
                                className="w-full px-2 py-1 text-xs border rounded-lg focus:outline-none focus:border-black font-mono text-gray-600"
                                value={editSku}
                                onChange={(e) => setEditSku(e.target.value)}
                                placeholder="SKU Yok"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveBasicInfo(product.id)
                                  if (e.key === 'Escape') setEditingBasicId(null)
                                }}
                              />
                            </div>
                            <div className="flex gap-1 mt-1 justify-end">
                              <span className="text-[10px] text-gray-400 mr-auto self-center">Kaydetmek için Enter</span>
                              <button onClick={() => setEditingBasicId(null)} className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors text-xs font-bold">İptal</button>
                              <button onClick={() => handleSaveBasicInfo(product.id)} className="px-3 py-1.5 rounded-lg bg-black hover:bg-black/80 text-white transition-colors text-xs font-bold">Kaydet</button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group/edit">
                            <div>
                              <p className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{product.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5 font-medium">{product.category?.name || 'Kategorisiz'} • <span className="text-gray-400 font-mono">{product.sku || 'SKU Yok'}</span></p>
                            </div>
                            <button 
                              onClick={() => {
                                setEditName(product.name || '')
                                setEditSku(product.sku || '')
                                setEditingBasicId(product.id)
                              }} 
                              className="opacity-0 group-hover/edit:opacity-100 p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition-all ml-1"
                              title="İsmi/SKU'yu Düzenle"
                            >
                              <Pencil className="size-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {!hiddenColumns.has('seo') && (
                    <td className={`px-6 ${cellPadding}`} onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-3 group/seo">
                        <div className="w-full bg-gray-100 rounded-full h-1.5 max-w-[60px] overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${seoScore >= 80 ? 'bg-emerald-500' : seoScore >= 50 ? 'bg-amber-400' : 'bg-red-500'}`}
                            style={{ width: `${seoScore}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold ${seoScore >= 80 ? 'text-emerald-700' : seoScore >= 50 ? 'text-amber-700' : 'text-red-700'}`}>
                          {seoScore}
                        </span>
                        {seoScore < 80 && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAISeo(product); }}
                            className="opacity-0 group-hover/seo:opacity-100 p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-all"
                            title="Yapay Zeka ile İyileştir"
                          >
                            {aiLoadingId === product.id ? <span className="animate-spin size-3.5 border-2 border-current border-t-transparent rounded-full" /> : <Sparkles className="size-3.5" />}
                          </button>
                        )}
                      </div>
                    </td>
                  )}

                  {!hiddenColumns.has('price') && (
                    <td className={`px-6 ${cellPadding} font-medium text-gray-900`} onClick={e => e.stopPropagation()}>
                      {isEditingPrice ? (
                        <div className="flex flex-col gap-1.5 w-[160px] bg-white p-3 rounded-xl border border-gray-200 shadow-xl absolute z-10 -ml-3 -mt-6">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-12 font-bold">Fiyat</span>
                            <input 
                              type="number" 
                              className="w-full px-2 py-1 text-sm border rounded-lg focus:outline-none focus:border-black font-semibold"
                              value={editBasePrice}
                              onChange={(e) => setEditBasePrice(Number(e.target.value))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSavePrice(product.id)
                                if (e.key === 'Escape') setEditingPriceId(null)
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-red-500 w-12 font-bold">İndirim</span>
                            <input 
                              type="number" 
                              className="w-full px-2 py-1 text-sm border rounded-lg text-red-600 focus:outline-none focus:border-red-500 font-semibold"
                              value={editSalePrice}
                              onChange={(e) => setEditSalePrice(e.target.value === '' ? '' : Number(e.target.value))}
                              placeholder="Yok"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSavePrice(product.id)
                                if (e.key === 'Escape') setEditingPriceId(null)
                              }}
                            />
                          </div>
                          <div className="flex gap-1 mt-1 justify-end">
                            <button onClick={() => setEditingPriceId(null)} className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors text-xs font-bold">İptal</button>
                            <button onClick={() => handleSavePrice(product.id)} className="px-3 py-1.5 rounded-lg bg-black hover:bg-black/80 text-white transition-colors text-xs font-bold">Kaydet</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group/price">
                          {product.sale_price ? (
                            <div className="flex flex-col">
                              <span className="text-gray-400 line-through text-xs decoration-gray-300 font-medium">₺{product.base_price?.toLocaleString('tr-TR')}</span>
                              <span className="text-red-600 font-bold">₺{product.sale_price?.toLocaleString('tr-TR')}</span>
                            </div>
                          ) : (
                            <span className="font-bold text-sm">₺{product.base_price?.toLocaleString('tr-TR')}</span>
                          )}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditBasePrice(product.base_price || 0)
                              setEditSalePrice(product.sale_price || '')
                              setEditingPriceId(product.id)
                            }} 
                            className="opacity-0 group-hover/price:opacity-100 p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition-all ml-1"
                            title="Fiyatı Düzenle"
                          >
                            <Pencil className="size-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  )}

                  {!hiddenColumns.has('status') && (
                    <td className={`px-6 ${cellPadding}`} onClick={e => e.stopPropagation()}>
                      <select
                        value={product.status || 'draft'}
                        onChange={(e) => handleStatusChange(product.id, e.target.value)}
                        disabled={isUpdating || isEditingPrice || isEditingBasic}
                        className={`text-xs font-bold px-3.5 py-1.5 rounded-full border outline-none appearance-none cursor-pointer pr-8 bg-no-repeat bg-[right_0.7rem_center] bg-[length:10px_10px] shadow-sm transition-all ${
                          product.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50 hover:bg-emerald-100/50 hover:border-emerald-300' 
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")` }}
                      >
                        <option value="active">Yayında</option>
                        <option value="draft">Taslak</option>
                      </select>
                    </td>
                  )}

                  <td className={`px-6 ${cellPadding}`} onClick={e => e.stopPropagation()}>
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/urunler/${product.category?.slug || 'genel'}/${product.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Sitede Gör">
                        <Eye className="size-4" />
                      </Link>
                      <Link href={`/admin/products/new?id=${product.id}`} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all" title="Düzenle">
                        <Edit className="size-4" />
                      </Link>
                      <button disabled={isUpdating} onClick={() => handleDuplicate(product.id)} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" title="Kopyala">
                        <Copy className="size-4" />
                      </button>
                      <button disabled={isUpdating} onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Sil">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">
              Toplam <span className="text-gray-900 font-bold">{filteredProducts.length}</span> üründen <span className="text-gray-900 font-bold">{(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredProducts.length)}</span> arası
            </span>
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-sm font-bold text-gray-900 min-w-[3rem] text-center">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
