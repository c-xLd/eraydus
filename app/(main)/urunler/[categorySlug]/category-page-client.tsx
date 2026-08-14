"use client"

import { useState, useMemo } from "react"
import { ProductGrid } from "@/features/products/components/product-grid"
import { ProductFilters } from "@/features/products/components/product-filters"
import { FilterChips } from "@/features/products/components/filter-chips"
import { SortDropdown } from "@/features/products/components/sort-dropdown"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/data/products"
import type { Category } from "@/features/products/services/categories"

interface CategoryPageClientProps {
  products: Product[]
  category: Category
  categories: Category[]
}

export function CategoryPageClient({ products, category, categories }: CategoryPageClientProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 100000 })
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid")
  
  const filterOptions = useMemo(() => {
    const profiles = new Map()
    const glasses = new Map()
    const layouts = new Map()
    const thicknesses = new Set<string>()
    let newProductCount = 0

    products.forEach((p) => {
      p.compatibleProfiles?.forEach(profile => { 
        if (profile?.id) profiles.set(profile.id, profile) 
      })
      p.compatibleGlass?.forEach(glass => { 
        if (glass?.id) glasses.set(glass.id, glass) 
      })
      if (p.layoutType) {
        layouts.set(p.layoutType, (layouts.get(p.layoutType) || 0) + 1)
      }
      p.technicalSpecs?.glassThickness?.forEach(t => { 
        if (t) thicknesses.add(t) 
      })
      if (p.isNew) newProductCount++
    })
    
    return {
      profiles: Array.from(profiles.values()),
      glasses: Array.from(glasses.values()),
      layouts: Array.from(layouts.entries()).map(([id, count]) => ({ id, name: id, count })),
      thicknesses: Array.from(thicknesses).sort(),
      newProductCount
    }
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Filters
    if (activeFilters.profile?.length) {
      result = result.filter(p => p.compatibleProfiles?.some(cp => activeFilters.profile.includes(cp.id)))
    }
    if (activeFilters.glass?.length) {
      result = result.filter(p => p.compatibleGlass?.some(cg => activeFilters.glass.includes(cg.id)))
    }
    if (activeFilters.layout?.length) {
      result = result.filter(p => p.layoutType && activeFilters.layout.includes(p.layoutType))
    }
    if (activeFilters.thickness?.length) {
      result = result.filter(p => p.technicalSpecs?.glassThickness?.some(t => activeFilters.thickness.includes(t)))
    }
    if (activeFilters.isNew?.includes("true")) {
      result = result.filter(p => p.isNew)
    }

    // Price
    const minP = activeFilters.minPrice?.length ? Number(activeFilters.minPrice[0]) : priceRange.min;
    const maxP = activeFilters.maxPrice?.length ? Number(activeFilters.maxPrice[0]) : priceRange.max;
    result = result.filter(p => p.price >= minP && p.price <= maxP)

    // Sort
    switch (sortBy) {
      case "price-asc": 
        result.sort((a, b) => a.price - b.price); 
        break;
      case "price-desc": 
        result.sort((a, b) => b.price - a.price); 
        break;
      case "name-asc": 
        result.sort((a, b) => a.name.localeCompare(b.name)); 
        break;
      case "name-desc": 
        result.sort((a, b) => b.name.localeCompare(a.name)); 
        break;
      case "newest": 
      default:
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1)); 
        break;
    }

    return result
  }, [products, activeFilters, priceRange, sortBy])

  const handleFilterChange = (key: string, values: string[]) => {
    setActiveFilters(prev => ({ ...prev, [key]: values }))
  }

  const activeFilterCount = useMemo(() => {
    return Object.values(activeFilters).reduce((acc, curr) => acc + curr.length, 0)
  }, [activeFilters])

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 pb-28 lg:pb-16">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-28 self-start h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-10">
          <ProductFilters 
            options={filterOptions}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            categories={categories}
            currentCategoryId={category.id}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 mb-6 sm:mb-8 pb-4 border-b border-black/5">
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <span className="text-xs sm:text-sm text-black/60 font-semibold uppercase tracking-wider whitespace-nowrap">
                {filteredAndSortedProducts.length} MİMARİ ÇÖZÜM
              </span>

              {/* Mobile Filter Button (Sleek Inline Pill) */}
              <Sheet>
                <SheetTrigger
                  render={
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="lg:hidden flex items-center gap-2 rounded-full border-black/15 bg-white text-black font-semibold text-xs h-9 px-4 shadow-2xs hover:bg-black hover:text-white transition-all active:scale-95 touch-manipulation"
                    >
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                      <span>Filtrele</span>
                      {activeFilterCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center">
                          {activeFilterCount}
                        </span>
                      )}
                    </Button>
                  }
                />
                <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 flex flex-col overflow-hidden border-t border-black/10">
                  {/* Drag Handle & Header */}
                  <div className="px-6 pt-5 pb-3 border-b border-black/5 shrink-0">
                    <div className="w-12 h-1 bg-black/15 rounded-full mx-auto mb-3" />
                    <SheetHeader className="flex flex-row items-center justify-between space-y-0 p-0">
                      <SheetTitle className="text-lg font-semibold text-black">Filtreler</SheetTitle>
                      {activeFilterCount > 0 && (
                        <button 
                          onClick={() => setActiveFilters({})}
                          className="text-xs font-bold uppercase tracking-wider text-black/50 hover:text-black"
                        >
                          Temizle ({activeFilterCount})
                        </button>
                      )}
                    </SheetHeader>
                  </div>

                  {/* Scrollable Filters Content Body */}
                  <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 overscroll-contain touch-pan-y">
                    <ProductFilters 
                      options={filterOptions}
                      activeFilters={activeFilters}
                      onFilterChange={handleFilterChange}
                      priceRange={priceRange}
                      onPriceRangeChange={setPriceRange}
                      categories={categories}
                      currentCategoryId={category.id}
                    />
                  </div>

                  {/* Fixed Bottom Apply Button */}
                  <div className="p-4 border-t border-black/5 bg-white shrink-0">
                    <SheetClose render={
                      <Button className="w-full h-12 rounded-full bg-black text-white font-semibold text-sm shadow-md hover:bg-black/90 active:scale-[0.98] touch-manipulation">
                        Sonuçları Göster ({filteredAndSortedProducts.length})
                      </Button>
                    } />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-2 sm:gap-3">
              <SortDropdown value={sortBy} onChange={setSortBy} className="w-[140px] sm:w-[200px] text-xs h-9 rounded-full bg-white border-black/15" />
              
              <div className="flex items-center bg-black/5 rounded-full p-1 border border-black/5">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-7 w-7 rounded-full transition-all", viewMode === 'grid' && "bg-white shadow-2xs text-black")}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-7 w-7 rounded-full transition-all", viewMode === 'list' && "bg-white shadow-2xs text-black")}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chips */}
          <FilterChips 
            filters={Object.entries(activeFilters).flatMap(([key, values]) => 
              values.map(val => {
                let label = key
                let displayValue = val

                if (key === 'profile') {
                   label = 'Profil'
                   displayValue = filterOptions.profiles.find((p: any) => p.id === val)?.name || val
                } else if (key === 'glass') {
                   label = 'Cam'
                   displayValue = filterOptions.glasses.find((g: any) => g.id === val)?.name || val
                } else if (key === 'layout') {
                   label = 'Yerleşim'
                   displayValue = val
                } else if (key === 'thickness') {
                   label = 'Cam Kalınlığı'
                   displayValue = val
                } else if (key === 'isNew') {
                   label = 'Yeni'
                   displayValue = 'Yeni Ürünler'
                }

                return {
                  key: `${key}::${val}`,
                  label,
                  value: displayValue
                }
              })
            )}
            onRemove={(compositeKey) => {
              const [catKey, val] = compositeKey.split('::')
              setActiveFilters(prev => ({
                ...prev,
                [catKey]: prev[catKey].filter(v => v !== val)
              }))
            }}
            onClearAll={() => {
              setActiveFilters({})
              setPriceRange({ min: 0, max: 100000 })
            }}
          />

          {/* Grid */}
          <ProductGrid 
            products={filteredAndSortedProducts}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  )
}
