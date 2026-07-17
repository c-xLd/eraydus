'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAdminEdit } from './AdminEditProvider'
import { PencilLine, X, Check, Loader2, Upload, LayoutDashboard, Eye, Plus, User, LogOut, FileText, Folder, ShoppingBag, Zap, RefreshCw, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TiptapEditor } from '../editor/TiptapEditor'
import { updateInlineField } from '../actions/inline-actions'
import { uploadImageToSupabase } from '../actions/upload-actions'
import { purgeSiteCache } from '../actions/cache-actions'
import { getPageSeo, updatePageSeo, SeoData } from '../actions/seo-actions'
import { toast } from 'sonner'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/features/auth/actions/auth'

export function InlineEditToolbar() {
  const { isAdmin, isEditMode, toggleEditMode, activeEditField, setActiveEditField } = useAdminEdit()
  const [value, setValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isNewMenuOpen, setIsNewMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  
  // Extract slug from pathname (e.g. /hakkimizda -> hakkimizda, / -> anasayfa)
  const pageSlug = pathname === '/' ? 'anasayfa' : pathname.replace(/^\//, '')

  // SEO Feature State
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false)
  const [seoData, setSeoData] = useState<SeoData>({ title: '', description: '', keywords: '' })
  const [isSeoLoading, setIsSeoLoading] = useState(false)
  const [isSeoSaving, setIsSeoSaving] = useState(false)
  const [isCacheClearing, setIsCacheClearing] = useState(false)

  // Real Scores State
  const [seoScore, setSeoScore] = useState<number | null>(null)
  const [perfScore, setPerfScore] = useState<number | null>(null)

  // Performance URL - only computed on client to avoid hydration mismatch
  const [performanceUrl, setPerformanceUrl] = useState(
    'https://pagespeed.web.dev/analysis?url=https%3A%2F%2Feraydus.com.tr'
  )
  useEffect(() => {
    setPerformanceUrl(
      `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(window.location.href)}`
    )
  }, [pathname])

  // Add padding to body when admin bar is active
  useEffect(() => {
    if (isAdmin) {
      document.documentElement.style.setProperty('--admin-bar-height', '48px')
      document.body.style.paddingTop = 'var(--admin-bar-height)'
    }
    return () => {
      document.documentElement.style.removeProperty('--admin-bar-height')
      document.body.style.paddingTop = '0px'
    }
  }, [isAdmin])

  // Sync state when active field changes
  useEffect(() => {
    if (activeEditField) {
      setValue(activeEditField.value)
    }
  }, [activeEditField])

  // Calculate Real Performance Score on Mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use Navigation Timing API for a quick TTFB/Load based score
      const calcPerf = () => {
        const perfData = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        if (perfData) {
          const loadTime = perfData.loadEventEnd - perfData.startTime
          // Let's say < 500ms = 100 score, > 3000ms = 0 score
          let score = 100 - ((Math.max(0, loadTime - 500) / 2500) * 100)
          setPerfScore(Math.max(10, Math.min(100, Math.round(score))))
        }
      }
      
      if (document.readyState === 'complete') {
        calcPerf()
      } else {
        window.addEventListener('load', calcPerf)
        return () => window.removeEventListener('load', calcPerf)
      }
    }
  }, [pathname])

  // Fetch SEO Data on Mount to calculate Real SEO Score
  useEffect(() => {
    const fetchSeoForScore = async () => {
      const result = await getPageSeo(pageSlug)
      if (result.success && result.data) {
        setSeoData({
          title: result.data.title || '',
          description: result.data.description || '',
          keywords: result.data.keywords || ''
        })
        calculateSeoScore(result.data)
      } else {
        setSeoScore(0)
      }
    }
    fetchSeoForScore()
  }, [pageSlug])

  const calculateSeoScore = (data: SeoData) => {
    let score = 0
    // Title optimization (30-60 chars)
    if (data.title) {
      if (data.title.length >= 30 && data.title.length <= 60) score += 40
      else score += 20
    }
    // Description optimization (120-160 chars)
    if (data.description) {
      if (data.description.length >= 100 && data.description.length <= 160) score += 40
      else score += 20
    }
    // Keywords
    if (data.keywords && data.keywords.split(',').length >= 3) {
      score += 20
    } else if (data.keywords) {
      score += 10
    }
    setSeoScore(score)
  }

  if (!isAdmin) {
    return null
  }

  const handleSave = async () => {
    if (!activeEditField) return
    
    setIsSaving(true)
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

  const handleClearCache = async () => {
    setIsCacheClearing(true)
    const result = await purgeSiteCache()
    setIsCacheClearing(false)
    if (result.success) {
      toast.success('Tüm site önbelleği temizlendi!')
      router.refresh()
    } else {
      toast.error(result.error || 'Önbellek temizlenemedi.')
    }
  }

  const handleOpenSeo = async () => {
    setIsSeoModalOpen(true)
  }

  const handleSaveSeo = async () => {
    setIsSeoSaving(true)
    const result = await updatePageSeo(pageSlug, seoData)
    setIsSeoSaving(false)
    if (result.success) {
      toast.success('SEO verileri güncellendi!')
      calculateSeoScore(seoData) // Update score in topbar instantly
      setIsSeoModalOpen(false)
      router.refresh()
    } else {
      toast.error(result.error || 'SEO güncellenirken hata oluştu.')
    }
  }

  // Color helpers
  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-gray-400'
    if (score >= 90) return 'text-emerald-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <>
      {/* WordPress-style Global Top Bar */}
      <div className="fixed top-0 left-0 w-full h-12 bg-[#1d2327] text-[#f0f0f1] z-[100] flex items-center justify-between px-4 text-sm font-sans shadow-md">
        <div className="flex items-center h-full">
          {/* Dashboard Link */}
          <Link href="/admin" className="flex items-center gap-2 h-full px-3 hover:bg-white/10 transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            <span className="font-medium hidden lg:inline">Erayduş Yönetim</span>
          </Link>

          <div className="w-[1px] h-4 bg-white/20 mx-1 lg:mx-2" />

          {/* New Button Dropdown */}
          <div 
            className="relative h-full"
            onMouseEnter={() => setIsNewMenuOpen(true)}
            onMouseLeave={() => setIsNewMenuOpen(false)}
          >
            <button className="flex items-center gap-1.5 h-full px-3 hover:bg-white/10 transition-colors text-[#f0f0f1]">
              <Plus className="w-4 h-4" />
              <span className="font-medium hidden lg:inline">Yeni Ekle</span>
            </button>
            
            {isNewMenuOpen && (
              <div className="absolute top-12 left-0 w-48 bg-[#1d2327] shadow-xl border border-white/5 py-1 flex flex-col z-[101]">
                <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2 hover:bg-[#2c3338] hover:text-[#72aee6] transition-colors">
                  <ShoppingBag className="w-4 h-4" /> Ürün
                </Link>
                <Link href="/admin" className="flex items-center gap-2 px-4 py-2 hover:bg-[#2c3338] hover:text-[#72aee6] transition-colors">
                  <FileText className="w-4 h-4" /> Sayfa
                </Link>
                <Link href="/admin" className="flex items-center gap-2 px-4 py-2 hover:bg-[#2c3338] hover:text-[#72aee6] transition-colors">
                  <Folder className="w-4 h-4" /> Kategori
                </Link>
              </div>
            )}
          </div>

          {/* Extra Action Buttons */}
          <button 
            onClick={handleClearCache}
            disabled={isCacheClearing}
            className="flex items-center gap-1.5 h-full px-3 hover:bg-white/10 transition-colors text-[#f0f0f1] disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isCacheClearing ? 'animate-spin' : ''}`} />
            <span className="font-medium hidden xl:inline">Önbelleği Temizle</span>
          </button>

          <a 
            href={performanceUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 h-full px-3 hover:bg-white/10 transition-colors text-[#f0f0f1]"
          >
            <Zap className={`w-4 h-4 ${getScoreColor(perfScore)}`} />
            <span className="font-medium hidden xl:inline">
              Performans: {perfScore !== null ? perfScore : '...'}
            </span>
          </a>

          <button 
            onClick={handleOpenSeo}
            className="flex items-center gap-1.5 h-full px-3 hover:bg-white/10 transition-colors text-[#f0f0f1]"
          >
            <Search className={`w-4 h-4 ${getScoreColor(seoScore)}`} />
            <span className="font-medium hidden xl:inline">
              SEO: {seoScore !== null ? seoScore : '...'}
            </span>
          </button>
        </div>

        <div className="flex items-center h-full gap-1 lg:gap-2">
          {/* Current Page Indicator */}
          <div className="flex items-center gap-2 mr-2 hidden md:flex">
            <span className="opacity-60 text-xs">Sayfa:</span>
            <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-xs text-champagne/90">{pageSlug}</span>
          </div>

          {/* Edit Mode Toggle */}
          <Button 
            variant="ghost" 
            size="sm"
            className={`h-8 px-3 rounded-sm transition-all flex items-center gap-2 ${isEditMode ? 'bg-champagne text-black hover:bg-champagne/90 hover:text-black' : 'hover:bg-white/10 hover:text-[#72aee6] text-[#f0f0f1]'}`}
            onClick={toggleEditMode}
          >
            {isEditMode ? (
              <>
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Önizleme</span>
              </>
            ) : (
              <>
                <PencilLine className="w-4 h-4" />
                <span className="hidden sm:inline">Düzenle</span>
              </>
            )}
          </Button>

          <div className="w-[1px] h-4 bg-white/20 mx-1 lg:mx-2" />

          {/* Profile Dropdown */}
          <div 
            className="relative h-full"
            onMouseEnter={() => setIsProfileMenuOpen(true)}
            onMouseLeave={() => setIsProfileMenuOpen(false)}
          >
            <button className="flex items-center gap-2 h-full px-3 hover:bg-white/10 transition-colors text-[#f0f0f1]">
              <span className="font-medium hidden sm:inline">Admin</span>
              <div className="w-6 h-6 rounded-full bg-champagne/20 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-champagne" />
              </div>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute top-12 right-0 w-48 bg-[#1d2327] shadow-xl border border-white/5 py-1 flex flex-col z-[101]">
                <form action={signOut}>
                  <button type="submit" className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#2c3338] hover:text-[#72aee6] transition-colors text-left">
                    <LogOut className="w-4 h-4" /> Çıkış Yap
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Edit Modal */}
      {isSeoModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Search className={`w-4 h-4 ${getScoreColor(seoScore)}`} />
                Sayfa SEO Düzenle (Skor: {seoScore})
              </h3>
              <button onClick={() => setIsSeoModalOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex justify-between">
                  Sayfa Başlığı (Title)
                  <span className={`text-xs ${(seoData.title?.length || 0) >= 30 && (seoData.title?.length || 0) <= 60 ? 'text-emerald-500' : 'text-amber-500'}`}>{(seoData.title?.length || 0)} kar.</span>
                </label>
                <Input 
                  value={seoData.title || ''}
                  onChange={(e) => {
                    setSeoData({ ...seoData, title: e.target.value });
                  }}
                  placeholder="Örn: Hakkımızda | Erayduş" 
                />
                <p className="text-[11px] text-muted-foreground">Arama motorlarında görünen ana başlık (30-60 karakter önerilir).</p>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex justify-between">
                  Açıklama (Meta Description)
                  <span className={`text-xs ${(seoData.description?.length || 0) >= 100 && (seoData.description?.length || 0) <= 160 ? 'text-emerald-500' : 'text-amber-500'}`}>{(seoData.description?.length || 0)} kar.</span>
                </label>
                <textarea 
                  value={seoData.description || ''}
                  onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Sayfanın içeriğini anlatan kısa ve öz metin..."
                />
                <p className="text-[11px] text-muted-foreground">Arama sonuçlarında başlığın altında çıkan açıklama (100-160 karakter önerilir).</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Anahtar Kelimeler (Keywords)</label>
                <Input 
                  value={seoData.keywords}
                  onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                  placeholder="örn: duşakabin, ankara, kaliteli banyo" 
                />
                <p className="text-[11px] text-muted-foreground">Virgülle ayırarak yazın (en az 3 kelime önerilir).</p>
              </div>
            </div>

            <div className="p-4 border-t border-border flex justify-end gap-3 bg-muted/10">
              <Button variant="ghost" onClick={() => setIsSeoModalOpen(false)}>İptal</Button>
              <Button onClick={handleSaveSeo} disabled={isSeoLoading || isSeoSaving} className="bg-emerald-600 text-white hover:bg-emerald-700 px-8">
                {isSeoSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-2" /> SEO Kaydet</>}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal/Drawer for Inline Edit Content */}
      {activeEditField && (
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
      )}
    </>
  )
}
