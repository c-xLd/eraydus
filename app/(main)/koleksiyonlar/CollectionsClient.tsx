'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, SlidersHorizontal, Box, Check } from 'lucide-react'
import { Product } from '@/lib/data/products'

interface CollectionsClientProps {
  products: Product[]
}

export function CollectionsClient({ products }: CollectionsClientProps) {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  
  // URL parametresinden 'kategori' varsa onu başlangıç durumu olarak al
  const initialCategory = searchParams.get('kategori')
  const [selectedLayouts, setSelectedLayouts] = useState<string[]>(initialCategory ? [initialCategory] : [])
  
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number>(30000)
  const [sortOrder, setSortOrder] = useState<'newest' | 'price-asc' | 'price-desc'>('newest')

  // URL parametresi değiştiğinde (örneğin Header'dan tıklandığında) state'i güncelle
  useEffect(() => {
    const category = searchParams.get('kategori')
    if (category) {
      setSelectedLayouts(prev => prev.includes(category) ? prev : [...prev, category])
    }
  }, [searchParams])

  const toggleCollection = (id: string) => {
    setSelectedCollections(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const toggleLayout = (layout: string) => {
    setSelectedLayouts(prev => 
      prev.includes(layout) ? prev.filter(x => x !== layout) : [...prev, layout]
    )
  }

  const toggleProfile = (id: string) => {
    setSelectedProfiles(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    if (selectedCollections.length > 0) {
      result = result.filter(p => selectedCollections.includes(p.collectionId))
    }
    if (selectedLayouts.length > 0) {
      result = result.filter(p => selectedLayouts.includes(p.layoutType))
    }
    if (selectedProfiles.length > 0) {
      result = result.filter(p => p.compatibleProfiles.some(profile => selectedProfiles.includes(profile.id)))
    }
    result = result.filter(p => p.price <= priceRange)

    switch (sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
      default:
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
        break
    }

    return result
  }, [products, searchQuery, selectedCollections, selectedLayouts, selectedProfiles, priceRange, sortOrder])

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-[1440px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Koleksiyonlar</h1>
            <p className="text-muted-foreground">Kusursuz duşakabin tasarımınızı bulun ve özelleştirin.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{filteredProducts.length} Ürün Listeleniyor (Toplam: {products.length})</span>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-surface border border-border text-foreground text-sm rounded-xl px-4 py-3 outline-none focus:border-champagne"
            >
              <option value="newest">En Yeniler</option>
              <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
              <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4 space-y-8 lg:sticky lg:top-32 h-fit">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Model ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-border text-foreground rounded-xl pl-12 pr-4 py-3 outline-none focus:border-champagne transition-colors"
              />
            </div>

            {/* Kategoriler */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Box className="size-4 text-champagne" /> Kategoriler
              </h3>
              <div className="space-y-3">
                {[
                  'Askılı Sistem',
                  'Kare Cam Duşakabin',
                  'Katlanır Duşakabin',
                  'Livorno Serisi',
                  'Mika Duşakabin',
                  'Ön Cephe Duşakabin',
                  'Oval Cam Duşakabin',
                ].map((cat) => (
                  <label key={cat} onClick={() => toggleLayout(cat)} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`size-5 rounded border flex items-center justify-center transition-colors ${selectedLayouts.includes(cat) ? 'bg-champagne border-champagne' : 'border-border group-hover:border-champagne/50'}`}>
                      {selectedLayouts.includes(cat) && <Check className="size-3 text-black" />}
                    </div>
                    <span className="text-foreground/80 group-hover:text-foreground">{cat}</span>
                  </label>
                ))}
                
                {/* Pivot Duşakabin (With Subcategories) */}
                <div className="pt-2 pb-1">
                  <span className="text-foreground font-medium flex items-center gap-2 mb-2">Pivot Duşakabin</span>
                  <div className="pl-6 space-y-3 border-l-2 border-border/50 ml-2">
                    {['Boy Menteşe', 'Nokta Menteşe'].map((sub) => (
                      <label key={sub} onClick={() => toggleLayout(sub)} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`size-5 rounded border flex items-center justify-center transition-colors ${selectedLayouts.includes(sub) ? 'bg-champagne border-champagne' : 'border-border group-hover:border-champagne/50'}`}>
                          {selectedLayouts.includes(sub) && <Check className="size-3 text-black" />}
                        </div>
                        <span className="text-foreground/80 group-hover:text-foreground text-sm">{sub}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Banyo Dolabı Filter */}
                <label onClick={() => toggleLayout('Banyo Dolabı')} className="flex items-center gap-3 cursor-pointer group mt-2 pt-2 border-t border-border/50">
                  <div className={`size-5 rounded border flex items-center justify-center transition-colors ${selectedLayouts.includes('Banyo Dolabı') ? 'bg-champagne border-champagne' : 'border-border group-hover:border-champagne/50'}`}>
                    {selectedLayouts.includes('Banyo Dolabı') && <Check className="size-3 text-black" />}
                  </div>
                  <span className="text-foreground/80 group-hover:text-foreground">Banyo Dolabı</span>
                </label>
              </div>
            </div>

            {/* Collections */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="size-4 text-champagne" /> Koleksiyon
              </h3>
              <div className="space-y-3">
                {['edge', 'pure', 'luxury'].map((id) => (
                  <label key={id} onClick={() => toggleCollection(id)} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`size-5 rounded border flex items-center justify-center transition-colors ${selectedCollections.includes(id) ? 'bg-champagne border-champagne' : 'border-border group-hover:border-champagne/50'}`}>
                      {selectedCollections.includes(id) && <Check className="size-3 text-black" />}
                    </div>
                    <span className="text-foreground/80 group-hover:text-foreground capitalize">{id} Serisi</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Box className="size-4 text-champagne" /> Yerleşim Tipi
              </h3>
              <div className="space-y-3">
                {['Köşe', 'Walk-in', 'Sürgülü', 'İki Duvar Arası'].map((layout) => (
                  <label key={layout} onClick={() => toggleLayout(layout)} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`size-5 rounded border flex items-center justify-center transition-colors ${selectedLayouts.includes(layout) ? 'bg-champagne border-champagne' : 'border-border group-hover:border-champagne/50'}`}>
                      {selectedLayouts.includes(layout) && <Check className="size-3 text-black" />}
                    </div>
                    <span className="text-foreground/80 group-hover:text-foreground">{layout}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Profil Rengi */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Box className="size-4 text-champagne" /> Profil Rengi
              </h3>
              <div className="space-y-3">
                {['black', 'chrome', 'gold', 'white'].map((profileId) => {
                  const names: Record<string, string> = { black: 'Siyah', chrome: 'Krom', gold: 'Altın', white: 'Beyaz' }
                  return (
                  <label key={profileId} onClick={() => toggleProfile(profileId)} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`size-5 rounded border flex items-center justify-center transition-colors ${selectedProfiles.includes(profileId) ? 'bg-champagne border-champagne' : 'border-border group-hover:border-champagne/50'}`}>
                      {selectedProfiles.includes(profileId) && <Check className="size-3 text-black" />}
                    </div>
                    <span className="text-foreground/80 group-hover:text-foreground">{names[profileId]}</span>
                  </label>
                )})}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <SlidersHorizontal className="size-4 text-champagne" /> Maksimum Fiyat
              </h3>
              <div className="space-y-4">
                <input 
                  type="range" 
                  min="5000" 
                  max="30000" 
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-champagne"
                />
                <div className="flex justify-between text-sm font-medium text-champagne">
                  <span>₺5.000</span>
                  <span>₺{priceRange.toLocaleString('tr-TR')}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="w-full lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-surface border border-border rounded-3xl">
                <p className="text-xl text-muted-foreground">Seçtiğiniz filtrelere uygun ürün bulunamadı.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCollections([])
                    setSelectedLayouts([])
                    setPriceRange(30000)
                  }}
                  className="mt-4 text-champagne font-medium hover:underline"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Active Filters Bar */}
                {(selectedCollections.length > 0 || selectedLayouts.length > 0 || selectedProfiles.length > 0 || searchQuery || priceRange < 30000) && (
                  <div className="flex flex-wrap items-center gap-2 bg-surface/50 border border-border/60 p-4 rounded-2xl backdrop-blur-sm">
                    <span className="text-xs text-muted-foreground mr-1">Aktif Filtreler:</span>
                    {searchQuery && (
                      <span className="bg-champagne/10 border border-champagne/20 text-champagne text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        Arama: "{searchQuery}"
                        <button onClick={() => setSearchQuery('')} className="hover:text-foreground font-semibold">×</button>
                      </span>
                    )}
                    {selectedCollections.map(id => (
                      <span key={id} className="bg-champagne/10 border border-champagne/20 text-champagne text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 capitalize">
                        {id} Serisi
                        <button onClick={() => toggleCollection(id)} className="hover:text-foreground font-semibold">×</button>
                      </span>
                    ))}
                    {selectedLayouts.map(layout => (
                      <span key={layout} className="bg-champagne/10 border border-champagne/20 text-champagne text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        {layout}
                        <button onClick={() => toggleLayout(layout)} className="hover:text-foreground font-semibold">×</button>
                      </span>
                    ))}
                    {selectedProfiles.map(id => {
                      const names: Record<string, string> = { black: 'Siyah', chrome: 'Krom', gold: 'Altın', white: 'Beyaz' }
                      return (
                      <span key={id} className="bg-champagne/10 border border-champagne/20 text-champagne text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        {names[id] || id} Profil
                        <button onClick={() => toggleProfile(id)} className="hover:text-foreground font-semibold">×</button>
                      </span>
                    )})}
                    {priceRange < 30000 && (
                      <span className="bg-champagne/10 border border-champagne/20 text-champagne text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        Maks: ₺{priceRange.toLocaleString('tr-TR')}
                        <button onClick={() => setPriceRange(30000)} className="hover:text-foreground font-semibold">×</button>
                      </span>
                    )}
                    <button 
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCollections([])
                        setSelectedLayouts([])
                        setSelectedProfiles([])
                        setPriceRange(30000)
                      }}
                      className="text-xs text-champagne hover:underline ml-auto"
                    >
                      Tümünü Temizle
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={product.id}
                        className="group relative flex flex-col bg-surface rounded-2xl overflow-hidden border border-border hover:border-champagne/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      >
                        {/* Whole Card Click Link */}
                        <Link 
                          href={`/koleksiyonlar/${product.slug}`} 
                          className="absolute inset-0 z-10" 
                          aria-label={product.name}
                        />

                        <div className="relative aspect-[4/5] overflow-hidden bg-muted z-0">
                          <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill
                            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                          />
                          {product.isNew && (
                            <div className="absolute top-3 right-3 z-20">
                              <span className="bg-champagne text-black text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                                Yeni
                              </span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3 z-20">
                            <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10">
                              {product.collectionName}
                            </span>
                          </div>

                          {/* Premium Hover Action Bar (Glassmorphic - Tasarla Only) */}
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/95 via-black/30 to-transparent pt-12 transform translate-y-0 opacity-100 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300 flex z-20">
                            <Link 
                              href={`/configurator?model=${product.id}`}
                              className="w-full py-2.5 rounded-xl bg-champagne text-black text-[10px] md:text-xs font-semibold hover:bg-champagne/90 hover:shadow-[0_0_15px_rgba(201,168,106,0.5)] transition-all text-center relative z-30"
                            >
                              Tasarla (Konfigüre Et)
                            </Link>
                          </div>
                        </div>

                        <div className="p-3 md:p-4 flex flex-col flex-1 z-0">
                          <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-xs md:text-sm font-semibold tracking-tight">{product.name}</h3>
                            <span className="text-[11px] md:text-xs font-semibold text-champagne">
                              ₺{product.price.toLocaleString('tr-TR')}
                            </span>
                          </div>

                          {/* Technical Specs Inline */}
                          <div className="text-[10px] md:text-xs text-muted-foreground/80 mb-2 flex flex-wrap items-center gap-1 font-normal">
                            <span>{product.technicalSpecs.glassThickness.join('/')} Cam</span>
                            <span className="text-muted-foreground/40">•</span>
                            <span>{product.technicalSpecs.height}</span>
                            <span className="text-muted-foreground/40">•</span>
                            <span className="truncate">{product.layoutType}</span>
                          </div>

                          {/* Profiles Preview Dots */}
                          <div className="flex items-center gap-1.5 border-t border-border/40 pt-2 mt-auto">
                            <span className="text-[9px] text-muted-foreground/60">Profil Seçenekleri:</span>
                            <div className="flex -space-x-1">
                              {product.compatibleProfiles.map((profile) => (
                                <span 
                                  key={profile.id} 
                                  className="size-3 rounded-full border border-surface shadow-sm block flex-shrink-0"
                                  style={{ backgroundColor: profile.hex }}
                                  title={profile.name}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
