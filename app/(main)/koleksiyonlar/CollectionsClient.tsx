'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, SlidersHorizontal, Box, Check, X, ChevronUp } from 'lucide-react'
import { Product } from '@/lib/data/products'
import { Category } from '@/features/products/services/categories'

interface CollectionsClientProps {
  products: Product[]
  categories?: Category[]
  activeCategorySlug?: string
  title?: string
}

export function CollectionsClient({ products, categories = [], activeCategorySlug, title = 'Koleksiyonlar' }: CollectionsClientProps) {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number>(100000)
  const [sortOrder, setSortOrder] = useState<'newest' | 'price-asc' | 'price-desc'>('newest')
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({})
  const [selectedLayouts, setSelectedLayouts] = useState<string[]>([])
  const [selectedGlass, setSelectedGlass] = useState<string[]>([])
  const [onlyNew, setOnlyNew] = useState<boolean>(false)
  const [selectedThicknesses, setSelectedThicknesses] = useState<string[]>([])
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const dragControls = useDragControls()
  const bottomSheetRef = useRef<HTMLDivElement>(null)



  // Prevent background scrolling when bottom sheet is open
  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.overscrollBehavior = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.overscrollBehavior = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.overscrollBehavior = ''
    }
  }, [isMobileFiltersOpen])

  const toggleProfile = (id: string) => {
    setSelectedProfiles(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const toggleLayout = (layout: string) => {
    setSelectedLayouts(prev => 
      prev.includes(layout) ? prev.filter(x => x !== layout) : [...prev, layout]
    )
  }

  const toggleGlass = (id: string) => {
    setSelectedGlass(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const toggleThickness = (thickness: string) => {
    setSelectedThicknesses(prev => 
      prev.includes(thickness) ? prev.filter(x => x !== thickness) : [...prev, thickness]
    )
  }

  // Generate dynamic filters from products
  const availableProfiles = useMemo(() => {
    const profiles = new Map<string, { id: string; name: string; hex: string }>()
    products.forEach(p => {
      if (Array.isArray(p.compatibleProfiles)) {
        p.compatibleProfiles.forEach(profile => {
          if (profile && typeof profile === 'object' && profile.id) {
            if (!profiles.has(profile.id)) profiles.set(profile.id, profile as any)
          }
        })
      }
    })
    return Array.from(profiles.values())
  }, [products])

  const availableGlass = useMemo(() => {
    const glasses = new Map<string, { id: string; name: string }>()
    products.forEach(p => {
      if (Array.isArray(p.compatibleGlass)) {
        p.compatibleGlass.forEach(glass => {
          if (glass && typeof glass === 'object' && glass.id) {
            if (!glasses.has(glass.id)) glasses.set(glass.id, glass as any)
          }
        })
      }
    })
    return Array.from(glasses.values())
  }, [products])

  const availableLayouts = useMemo(() => {
    const layouts = new Set<string>()
    products.forEach(p => {
      if (p.layoutType && typeof p.layoutType === 'string') layouts.add(p.layoutType)
    })
    return Array.from(layouts)
  }, [products])

  const availableThicknesses = useMemo(() => {
    const thicknesses = new Set<string>()
    products.forEach(p => {
      if (p.technicalSpecs && Array.isArray(p.technicalSpecs.glassThickness)) {
        p.technicalSpecs.glassThickness.forEach(t => {
          if (t && typeof t === 'string') thicknesses.add(t)
        })
      }
    })
    return Array.from(thicknesses).sort()
  }, [products])

  const maxProductPrice = useMemo(() => {
    const max = Math.max(...products.map(p => p.price), 50000)
    return Math.ceil(max / 5000) * 5000 // Round up to nearest 5000
  }, [products])

  // Set initial price range to max
  useEffect(() => {
    setPriceRange(maxProductPrice)
  }, [maxProductPrice])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    // We no longer filter by `selectedCollections` or `selectedLayouts` because routing handles category filtering
    // BUT we still might want to filter if they are on /koleksiyonlar and pick multiple? No, the new design uses Links for categories.
    
    if (selectedProfiles.length > 0) {
      result = result.filter(p => p.compatibleProfiles?.some(profile => selectedProfiles.includes(profile.id)))
    }
    
    if (selectedLayouts.length > 0) {
      result = result.filter(p => selectedLayouts.includes(p.layoutType))
    }
    
    if (selectedGlass.length > 0) {
      result = result.filter(p => p.compatibleGlass?.some(glass => selectedGlass.includes(glass.id)))
    }
    
    if (onlyNew) {
      result = result.filter(p => p.isNew)
    }

    if (selectedThicknesses.length > 0) {
      result = result.filter(p => p.technicalSpecs?.glassThickness?.some(t => selectedThicknesses.includes(t)))
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
  }, [products, searchQuery, selectedProfiles, priceRange, sortOrder])

  const activeFiltersCount = (searchQuery ? 1 : 0) + selectedProfiles.length + selectedLayouts.length + selectedGlass.length + selectedThicknesses.length + (onlyNew ? 1 : 0) + (priceRange < maxProductPrice ? 1 : 0)

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedProfiles([])
    setSelectedLayouts([])
    setSelectedGlass([])
    setSelectedThicknesses([])
    setOnlyNew(false)
    setPriceRange(maxProductPrice)
  }

  const FilterContent = () => (
    <div className="space-y-10 pb-10">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Model ara..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-b border-border text-foreground text-sm pl-12 pr-4 py-3 outline-none focus:border-champagne transition-colors"
        />
      </div>

      {/* Sadece Yeni Modeller Toggle */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer group p-3.5 border border-border/60 rounded-2xl hover:border-champagne/40 transition-colors bg-surface/30">
          <div className={`size-5 rounded-md border flex items-center justify-center transition-colors ${onlyNew ? 'bg-champagne border-champagne text-black' : 'border-border group-hover:border-champagne/50 bg-background'}`}>
            {onlyNew && <Check className="size-3.5" />}
          </div>
          <input type="checkbox" className="hidden" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} />
          <span className="text-sm font-medium text-foreground">Yeni Modeller</span>
          <span className="ml-auto bg-champagne/10 text-champagne text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest font-bold">Yeni</span>
        </label>
      </div>

      {/* Kategoriler */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Kategoriler</h3>
        <div className="space-y-4">
          <Link href="/koleksiyonlar" className="flex items-center gap-3 cursor-pointer group">
            <div className={`size-4 rounded-full border flex items-center justify-center transition-all duration-300 ${!activeCategorySlug ? 'bg-champagne border-champagne' : 'border-border group-hover:border-champagne/50'}`}>
              <motion.div initial={false} animate={{ scale: !activeCategorySlug ? 1 : 0 }} className="size-1.5 rounded-full bg-black" />
            </div>
            <span className={`text-sm transition-colors ${!activeCategorySlug ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>Tüm Kategoriler</span>
          </Link>
          
          {categories.filter(c => !c.parent_category).map((cat) => {
            const subCategories = categories.filter(sub => sub.parent_category === cat.id)
            const isActive = activeCategorySlug === cat.slug || subCategories.some(sub => sub.slug === activeCategorySlug)
            
            return (
              <div key={cat.id} className="pt-2">
                <Link href={`/koleksiyonlar/kategori/${cat.slug}`} className="flex items-center gap-3 cursor-pointer group mb-3">
                  <div className={`size-4 rounded-full border flex items-center justify-center transition-all duration-300 ${activeCategorySlug === cat.slug ? 'bg-champagne border-champagne' : 'border-border group-hover:border-champagne/50'}`}>
                    <motion.div initial={false} animate={{ scale: activeCategorySlug === cat.slug ? 1 : 0 }} className="size-1.5 rounded-full bg-black" />
                  </div>
                  <span className={`text-sm transition-colors ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>{cat.name}</span>
                </Link>
                
                {subCategories.length > 0 && (
                  <div className="pl-4 space-y-4 border-l border-border/50 ml-2">
                    {subCategories.map((sub) => (
                      <Link href={`/koleksiyonlar/kategori/${sub.slug}`} key={sub.id} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`size-4 rounded-full border flex items-center justify-center transition-all duration-300 ${activeCategorySlug === sub.slug ? 'bg-champagne border-champagne' : 'border-border group-hover:border-champagne/50'}`}>
                          <motion.div initial={false} animate={{ scale: activeCategorySlug === sub.slug ? 1 : 0 }} className="size-1.5 rounded-full bg-black" />
                        </div>
                        <span className={`text-sm transition-colors ${activeCategorySlug === sub.slug ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Profil Rengi (Dynamic) */}
      {availableProfiles.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Profil Rengi</h3>
          <div className="flex flex-wrap gap-2">
            {availableProfiles.map((profile) => {
              const isSelected = selectedProfiles.includes(profile.id)
              return (
                <button
                  key={profile.id}
                  onClick={() => toggleProfile(profile.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-medium transition-all duration-300 ${isSelected ? 'border-champagne bg-champagne/10 text-champagne' : 'border-border bg-transparent text-muted-foreground hover:border-border/80 hover:text-foreground'}`}
                >
                  <span className="size-3 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: profile.hex || '#000' }} />
                  {profile.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Cam Seçenekleri (Dynamic) */}
      {availableGlass.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Cam Yüzey Tipi</h3>
          <div className="flex flex-wrap gap-2">
            {availableGlass.map((glass) => {
              const isSelected = selectedGlass.includes(glass.id)
              return (
                <button
                  key={glass.id}
                  onClick={() => toggleGlass(glass.id)}
                  className={`px-4 py-2 rounded-full border text-xs font-medium transition-all duration-300 ${isSelected ? 'border-champagne bg-champagne/10 text-champagne' : 'border-border bg-transparent text-muted-foreground hover:border-border/80 hover:text-foreground'}`}
                >
                  {glass.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Cam Kalınlığı (Dynamic) */}
      {availableThicknesses.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Cam Kalınlığı</h3>
          <div className="flex flex-wrap gap-2">
            {availableThicknesses.map((thickness) => {
              const isSelected = selectedThicknesses.includes(thickness)
              return (
                <button
                  key={thickness}
                  onClick={() => toggleThickness(thickness)}
                  className={`px-4 py-2 rounded-full border text-xs font-medium transition-all duration-300 ${isSelected ? 'border-champagne bg-champagne/10 text-champagne' : 'border-border bg-transparent text-muted-foreground hover:border-border/80 hover:text-foreground'}`}
                >
                  {thickness}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Yerleşim Tipi (Dynamic) */}
      {availableLayouts.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Yerleşim</h3>
          <div className="flex flex-col gap-2">
            {availableLayouts.map((layout) => {
              const isSelected = selectedLayouts.includes(layout)
              return (
                <label key={layout} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`size-4 rounded-sm border flex items-center justify-center transition-colors ${isSelected ? 'bg-champagne border-champagne text-black' : 'border-border group-hover:border-champagne/50'}`}>
                    {isSelected && <Check className="size-3" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleLayout(layout)} />
                  <span className={`text-sm transition-colors ${isSelected ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>{layout}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* Fiyat */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Maksimum Fiyat</h3>
        <div className="space-y-4">
          <input 
            type="range" 
            min="5000" 
            max={maxProductPrice} 
            step="1000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-champagne"
          />
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>₺5.000</span>
            <span className="text-champagne">₺{priceRange.toLocaleString('tr-TR')}</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="pt-28 pb-32 lg:pb-24 min-h-screen bg-background selection:bg-champagne/30 selection:text-champagne">
      <div className="container mx-auto px-6 max-w-[1600px]">
        {/* Minimal Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6">
          <h1 className="text-3xl font-light tracking-tight text-foreground">
            {title}
          </h1>
          <div className="flex items-center gap-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground hidden md:block">
              {filteredProducts.length} Sonuç
            </span>
            <div className="relative">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="appearance-none bg-transparent border-none text-foreground text-sm font-medium pr-8 py-2 outline-none cursor-pointer"
              >
                <option value="newest">En Yeniler</option>
                <option value="price-asc">Fiyata Göre Artan</option>
                <option value="price-desc">Fiyata Göre Azalan</option>
              </select>
              <ChevronUp className="absolute right-0 top-1/2 -translate-y-1/2 size-4 rotate-180 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Desktop Sidebar (Minimal) */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-32 h-fit">
            <FilterContent />
          </aside>

          {/* Main Content Grid */}
          <main className="flex-1 w-full relative min-h-[50vh]">
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs text-muted-foreground">Aktif Filtreler:</span>
                <button 
                  onClick={clearAllFilters}
                  className="text-xs font-medium text-champagne hover:text-champagne/80 transition-colors"
                >
                  Tümünü Temizle
                </button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0.01 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <p className="text-xl font-light text-muted-foreground mb-6">Seçtiğiniz özelliklere uygun bir model bulunamadı.</p>
                <button 
                  onClick={clearAllFilters}
                  className="px-6 py-3 rounded-full border border-champagne text-champagne text-sm font-medium hover:bg-champagne hover:text-black transition-all duration-300"
                >
                  Filtreleri Temizle
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-12 sm:gap-y-16">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group flex flex-col cursor-pointer animate-in fade-in zoom-in duration-500"
                  >
                    <Link href={`/koleksiyonlar/${product.slug}`} className="block relative aspect-[4/5] w-full overflow-hidden bg-surface mb-4 rounded-xl group-hover:rounded-2xl transition-all duration-500">
                      {product.image && !imageError[product.id] ? (
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          onError={() => setImageError(prev => ({ ...prev, [product.id]: true }))}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted/30 flex flex-col items-center justify-center text-muted-foreground">
                          <Box className="size-6 opacity-20 mb-2" />
                          <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-40">Görsel Yok</span>
                        </div>
                      )}
                      
                      {product.isNew && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="bg-foreground text-background text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm shadow-sm">
                            Yeni
                          </span>
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-col flex-1">
                      {/* Meta info above title */}
                      <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-1.5 line-clamp-1">
                        <span>{product.collectionName}</span>
                        <span className="opacity-50">/</span>
                        <span>{product.layoutType}</span>
                      </div>
                      
                      {/* Title and Price */}
                      <div className="flex justify-between items-start gap-3 mb-3">
                        <Link href={`/koleksiyonlar/${product.slug}`} className="group-hover:text-champagne transition-colors">
                          <h3 className="text-sm sm:text-base font-medium tracking-tight text-foreground leading-snug line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        <span className="text-sm sm:text-base font-medium tracking-tight text-foreground whitespace-nowrap mt-0.5">
                          ₺{product.price.toLocaleString('tr-TR')}
                        </span>
                      </div>

                      {/* Profiles & Actions */}
                      <div className="mt-auto pt-3 flex items-center justify-between border-t border-border/40">
                        <div className="flex items-center gap-1.5">
                          {product.compatibleProfiles.map((profile) => (
                            <span 
                              key={profile.id} 
                              className="size-2.5 sm:size-3 rounded-full border border-black/10 shadow-sm"
                              style={{ backgroundColor: profile.hex }}
                              title={profile.name}
                            />
                          ))}
                        </div>
                        
                        <a
                          href={`https://wa.me/905000000000?text=${encodeURIComponent(`Merhaba, ${product.name} modeli hakkında fiyat ve bilgi almak istiyorum.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-[#25D366] transition-colors flex items-center gap-1.5 group/wa"
                          title="WhatsApp ile Bilgi Al"
                        >
                          <span className="text-[9px] uppercase tracking-widest font-semibold opacity-0 group-hover/wa:opacity-100 transition-opacity hidden sm:block">
                            Bilgi Al
                          </span>
                          <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/80 backdrop-blur-xl border-t border-border/50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex justify-center">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="bg-foreground text-background w-full max-w-sm rounded-full py-3.5 flex items-center justify-center gap-2 font-medium shadow-2xl active:scale-95 transition-transform"
        >
          <Filter className="size-4" />
          Filtrele & Sırala
          {activeFiltersCount > 0 && (
            <span className="bg-champagne text-black text-[10px] size-5 rounded-full flex items-center justify-center ml-1">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Bottom Sheet (Framer Motion) */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0.01 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.01 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              ref={bottomSheetRef}
              drag="y"
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setIsMobileFiltersOpen(false)
                }
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl shadow-2xl lg:hidden flex flex-col max-h-[90vh]"
            >
              {/* Drag Handle */}
              <div 
                className="w-full flex justify-center p-4 cursor-grab active:cursor-grabbing shrink-0"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="w-12 h-1.5 bg-border rounded-full" />
              </div>
              
              <div className="px-6 pb-4 flex items-center justify-between shrink-0 border-b border-border/40">
                <h2 className="text-xl font-light">Filtreler</h2>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="size-8 rounded-full bg-surface flex items-center justify-center active:scale-90 transition-transform"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 overscroll-none pb-24">
                <FilterContent />
              </div>

              <div className="p-4 border-t border-border/40 bg-background shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))] flex gap-4">
                <button 
                  onClick={clearAllFilters}
                  className="px-6 py-3.5 rounded-full border border-border text-foreground font-medium w-1/3 text-sm active:bg-surface transition-colors"
                >
                  Temizle
                </button>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="bg-champagne text-black rounded-full py-3.5 font-medium flex-1 text-sm shadow-xl shadow-champagne/20 active:scale-[0.98] transition-transform"
                >
                  Sonuçları Göster ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
