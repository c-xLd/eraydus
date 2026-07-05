'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Search, Filter, SlidersHorizontal, Box, Check } from 'lucide-react'
import { Product } from '@/lib/data/products'

interface CollectionsClientProps {
  products: Product[]
}

export function CollectionsClient({ products }: CollectionsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [selectedLayouts, setSelectedLayouts] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number>(30000)
  const [sortOrder, setSortOrder] = useState<'newest' | 'price-asc' | 'price-desc'>('newest')

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
  }, [products, searchQuery, selectedCollections, selectedLayouts, priceRange, sortOrder])

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
            <span className="text-sm text-muted-foreground">{filteredProducts.length} Ürün Listeleniyor</span>
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
                {(selectedCollections.length > 0 || selectedLayouts.length > 0 || searchQuery || priceRange < 30000) && (
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
                        className="group flex flex-col bg-surface rounded-2xl overflow-hidden border border-border hover:border-champagne/30 transition-colors shadow-sm hover:shadow-xl"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                          />
                          {product.isNew && (
                            <div className="absolute top-3 right-3">
                              <span className="bg-champagne text-black text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                                Yeni
                              </span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10">
                              {product.collectionName}
                            </span>
                          </div>
                        </div>

                        <div className="p-3 md:p-4 flex flex-col flex-1">
                          <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-xs md:text-sm font-semibold tracking-tight">{product.name}</h3>
                            <span className="text-[11px] md:text-xs font-semibold text-champagne">
                              ₺{product.price.toLocaleString('tr-TR')}
                            </span>
                          </div>

                          {/* Technical Specs Inline */}
                          <div className="text-[10px] md:text-xs text-muted-foreground/80 mb-3 flex flex-wrap items-center gap-1 font-normal">
                            <span>{product.technicalSpecs.glassThickness.join('/')} Cam</span>
                            <span className="text-muted-foreground/40">•</span>
                            <span>{product.technicalSpecs.height}</span>
                            <span className="text-muted-foreground/40">•</span>
                            <span className="truncate">{product.layoutType}</span>
                          </div>

                          <div className="mt-auto grid grid-cols-2 gap-1.5">
                            <Link 
                              href={`/collections/${product.id}`}
                              className="flex items-center justify-center py-1.5 rounded-lg border border-border text-[9px] md:text-xs font-medium hover:bg-muted transition-colors text-center"
                            >
                              İncele
                            </Link>
                            <Link 
                              href={`/configurator?model=${product.id}`}
                              className="flex items-center justify-center py-1.5 rounded-lg bg-foreground text-background text-[9px] md:text-xs font-medium hover:bg-foreground/90 transition-colors group-hover:bg-champagne group-hover:text-black group-hover:shadow-[0_0_15px_rgba(201,168,106,0.3)] text-center"
                            >
                              Tasarla
                            </Link>
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
