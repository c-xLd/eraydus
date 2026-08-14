'use client'

import * as React from 'react'
import { Filter, ChevronRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { PriceRangeSlider } from './price-range-slider'
import type { Category } from '@/features/products/services/categories'
import Link from 'next/link'

export interface ProductFiltersProps {
  categories: Category[]
  activeFilters: Record<string, string[]>
  onFilterChange: (key: string, values: string[]) => void
  onClearAll?: () => void
  options: {
    profiles: { id: string; name: string; hex?: string }[]
    glasses: { id: string; name: string }[]
    layouts: { id: string; name: string; count: number }[]
    thicknesses: string[]
    newProductCount: number
  }
  priceRange: { min: number; max: number }
  onPriceRangeChange?: (range: { min: number; max: number }) => void
  currentCategoryId?: string
}

export function ProductFilters({
  categories,
  activeFilters,
  onFilterChange,
  onClearAll,
  options: filterOptions,
  priceRange,
  onPriceRangeChange,
  currentCategoryId
}: ProductFiltersProps) {
  
  const handleCheckboxChange = (key: string, value: string, checked: boolean) => {
    const current = activeFilters[key] || []
    if (checked) {
      onFilterChange(key, [...current, value])
    } else {
      onFilterChange(key, current.filter(v => v !== value))
    }
  }

  const getActiveCount = (key: string) => activeFilters[key]?.length || 0;

  const renderTriggerContent = (label: string, count: number) => (
    <div className="flex items-center gap-2">
      <span className="tracking-tight">{label}</span>
      {count > 0 && (
        <span className="flex items-center justify-center bg-black text-white text-[10px] font-bold min-w-[16px] h-4 px-1 rounded-full animate-in zoom-in duration-200">
          {count}
        </span>
      )}
    </div>
  )

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-sm font-bold uppercase tracking-widest text-black/40">Filtreler</h3>
      </div>

      <Accordion multiple defaultValue={['categories', 'price', 'profiles', 'glass', 'layouts']} className="w-full space-y-4">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <AccordionItem value="categories" className="border-none">
            <AccordionTrigger className="text-base font-semibold hover:no-underline py-2 data-[state=open]:text-black text-black/70 transition-colors">
              Kategoriler
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 pb-4 space-y-1 relative">
                {(() => {
                  const mainCats = categories.filter(c => !c.parent_category)
                  const getSubCats = (parentId: string) => categories.filter(c => c.parent_category === parentId)

                  return mainCats.map((mainCat) => {
                    const subCats = getSubCats(mainCat.id)
                    const isMainCatActive = currentCategoryId === mainCat.id

                    return (
                      <div key={mainCat.id} className="flex flex-col relative z-0">
                        <Link 
                          href={`/urunler/${mainCat.slug}`} 
                          className={cn(
                            "group relative flex items-center justify-between w-full min-h-[48px] px-3 rounded-xl transition-colors duration-200 select-none",
                            isMainCatActive ? "" : "hover:bg-black/[0.02]"
                          )}
                        >
                          {isMainCatActive && (
                            <motion.div
                              layoutId="activeCategoryBg"
                              className="absolute inset-0 bg-black/[0.04] rounded-xl -z-10"
                              initial={false}
                              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                            />
                          )}
                          <span className={cn(
                            "relative z-10 text-sm tracking-wide transition-colors duration-200",
                            isMainCatActive ? "font-semibold text-black" : "font-medium text-black/60 group-hover:text-black"
                          )}>
                            {mainCat.name}
                          </span>
                          
                          {/* Minimal Indicator */}
                          <ChevronRight className={cn(
                            "relative z-10 w-4 h-4 transition-all duration-300",
                            isMainCatActive ? "text-black rotate-90" : "text-black/20 group-hover:text-black/50 group-hover:translate-x-0.5"
                          )} />
                        </Link>

                        {subCats.length > 0 && (
                          <div className="flex flex-col mt-1 ml-4 pl-3 border-l border-black/[0.06] space-y-0.5">
                            {subCats.map((subCat) => {
                              const isSubCatActive = currentCategoryId === subCat.id
                              return (
                                <Link 
                                  key={subCat.id}
                                  href={`/urunler/${subCat.slug}`} 
                                  className={cn(
                                    "group relative flex items-center w-full min-h-[48px] px-3 rounded-lg transition-colors duration-200 select-none",
                                    isSubCatActive ? "" : "hover:bg-black/[0.02]"
                                  )}
                                >
                                  {isSubCatActive && (
                                    <motion.div
                                      layoutId="activeCategoryBg"
                                      className="absolute inset-0 bg-black/[0.04] rounded-lg -z-10"
                                      initial={false}
                                      transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                                    />
                                  )}
                                  <span className={cn(
                                    "relative z-10 text-[13px] tracking-wide transition-colors duration-200",
                                    isSubCatActive ? "font-semibold text-black" : "font-medium text-black/50 group-hover:text-black"
                                  )}>
                                    {subCat.name}
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })
                })()}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Price Range */}
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="text-base font-semibold hover:no-underline py-2 data-[state=open]:text-black text-black/70 transition-colors">
            {renderTriggerContent("Fiyat Aralığı", (activeFilters['minPrice'] || activeFilters['maxPrice']) ? 1 : 0)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-6 px-2">
              <PriceRangeSlider
                min={priceRange.min}
                max={priceRange.max}
                value={[
                  Number(activeFilters['minPrice']?.[0]) || priceRange.min,
                  Number(activeFilters['maxPrice']?.[0]) || priceRange.max
                ]}
                onChange={(val) => {
                  onFilterChange('minPrice', [val[0].toString()])
                  onFilterChange('maxPrice', [val[1].toString()])
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* New Products Only Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-black/[0.02] border border-black/[0.04] hover:bg-black/[0.04] transition-colors mb-6 group cursor-pointer" onClick={() => {
          const isChecked = (activeFilters['isNew'] || []).includes('true');
          onFilterChange('isNew', !isChecked ? ['true'] : []);
        }}>
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="new-products" className="text-sm font-semibold cursor-pointer text-black group-hover:text-black transition-colors">
              Yeni Ürünler
            </Label>
            <span className="text-[10px] uppercase tracking-wider text-black/40 font-bold">{filterOptions.newProductCount} MODEL</span>
          </div>
          <Switch
            id="new-products"
            checked={(activeFilters['isNew'] || []).includes('true')}
            onCheckedChange={(checked) => {
              onFilterChange('isNew', checked ? ['true'] : [])
            }}
            onClick={(e) => e.stopPropagation()}
            className="data-[state=checked]:bg-black"
          />
        </div>

        {/* Profile Colors */}
        {filterOptions.profiles.length > 0 && (
          <AccordionItem value="profiles" className="border-none">
            <AccordionTrigger className="text-base font-semibold hover:no-underline py-2 data-[state=open]:text-black text-black/70 transition-colors">
              {renderTriggerContent("Profil Rengi", getActiveCount('profile'))}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-6 gap-3 pt-4 pb-2">
                {filterOptions.profiles.map((profile) => {
                  const isSelected = (activeFilters['profile'] || []).includes(profile.id)
                  return (
                    <button
                      key={profile.id}
                      title={profile.name}
                      onClick={() => handleCheckboxChange('profile', profile.id, !isSelected)}
                      className="flex flex-col items-center gap-1.5 group"
                      aria-label={`${profile.name} rengi seç`}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full border-[1.5px] transition-all duration-300 relative flex items-center justify-center",
                          isSelected ? "border-black scale-110 shadow-md" : "border-black/10 hover:border-black/40 hover:scale-105 shadow-2xs"
                        )}
                        style={{ backgroundColor: profile.hex }}
                      >
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm mix-blend-difference animate-in zoom-in duration-200" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Glass Types */}
        {filterOptions.glasses.length > 0 && (
          <AccordionItem value="glass" className="border-none">
            <AccordionTrigger className="text-base font-semibold hover:no-underline py-2 data-[state=open]:text-black text-black/70 transition-colors">
              {renderTriggerContent("Cam Tipi", getActiveCount('glass'))}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2 pb-2">
                {filterOptions.glasses.map((glass) => (
                  <div key={glass.id} className="flex items-center space-x-3 group">
                    <Checkbox
                      id={`glass-${glass.id}`}
                      checked={(activeFilters['glass'] || []).includes(glass.id)}
                      onCheckedChange={(checked) => handleCheckboxChange('glass', glass.id, checked as boolean)}
                      className="border-black/20 data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                    <Label htmlFor={`glass-${glass.id}`} className="flex-1 cursor-pointer font-medium text-sm text-black/70 group-hover:text-black transition-colors">
                      {glass.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Layouts */}
        {filterOptions.layouts.length > 0 && (
          <AccordionItem value="layouts" className="border-none">
            <AccordionTrigger className="text-base font-semibold hover:no-underline py-2 data-[state=open]:text-black text-black/70 transition-colors">
              {renderTriggerContent("Yerleşim Tipi", getActiveCount('layout'))}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2 pb-2">
                {filterOptions.layouts.map(({ id: layout, count }) => (
                  <div key={layout} className="flex items-center space-x-3 group">
                    <Checkbox
                      id={`layout-${layout}`}
                      checked={(activeFilters['layout'] || []).includes(layout)}
                      onCheckedChange={(checked) => handleCheckboxChange('layout', layout, checked as boolean)}
                      className="border-black/20 data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                    <Label htmlFor={`layout-${layout}`} className="flex-1 flex items-center justify-between cursor-pointer font-medium text-sm text-black/70 group-hover:text-black transition-colors">
                      <span>{layout}</span>
                      <span className="text-[10px] font-bold text-black/40 bg-black/5 px-2 py-0.5 rounded-full">{count}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Glass Thicknesses */}
        {filterOptions.thicknesses.length > 0 && (
          <AccordionItem value="thickness" className="border-none">
            <AccordionTrigger className="text-base font-semibold hover:no-underline py-2 data-[state=open]:text-black text-black/70 transition-colors">
              {renderTriggerContent("Cam Kalınlığı", getActiveCount('thickness'))}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 pt-2 pb-2">
                {filterOptions.thicknesses.map((thickness) => {
                  const isSelected = (activeFilters['thickness'] || []).includes(thickness)
                  return (
                    <button
                      key={thickness}
                      onClick={() => handleCheckboxChange('thickness', thickness, !isSelected)}
                      className={cn(
                        "px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                        isSelected ? "bg-black text-white border-black shadow-md" : "bg-white text-black/70 border-black/10 hover:border-black/30 hover:text-black shadow-2xs"
                      )}
                    >
                      {thickness}
                    </button>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      {Object.values(activeFilters).some(arr => arr.length > 0) && (
        <Button
          variant="ghost"
          className="w-full h-12 rounded-2xl text-xs font-bold uppercase tracking-widest text-red-600/80 hover:text-red-600 hover:bg-red-50 transition-colors mt-6 border border-transparent hover:border-red-100"
          onClick={onClearAll}
        >
          Seçimleri Temizle
        </Button>
      )}
    </div>
  )

  return <FilterContent />
}
