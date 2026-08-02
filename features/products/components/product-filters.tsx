'use client'

import * as React from 'react'
import { Filter } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { PriceRangeSlider } from './price-range-slider'
import type { Category } from '@/features/products/services/categories'

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

  // ⚡ PERFORMANCE OPTIMIZATION (Bolt):
  // Directly inline and render the JSX structure. Previously, a nested functional component `FilterContent`
  // was defined inside the render path and rendered as `<FilterContent />`. This React anti-pattern caused
  // the entire DOM subtree under the filters to completely unmount and remount on every state change (e.g.,
  // selecting a checkbox, dragging the price slider), resulting in severe input focus loss, layout thrashing,
  // and redundant calculations. Direct rendering guarantees persistent focus, preserved accordion state,
  // and instant UI updates.
  return (
    <div className="space-y-6">
      <Accordion multiple defaultValue={['categories', 'price', 'profiles', 'glass', 'layouts']} className="w-full">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <AccordionItem value="categories">
            <AccordionTrigger className="text-base font-medium">Kategoriler</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {(() => {
                  const mainCats = categories.filter(c => !c.parent_category)
                  const getSubCats = (parentId: string) => categories.filter(c => c.parent_category === parentId)

                  return mainCats.map((mainCat) => {
                    const subCats = getSubCats(mainCat.id)
                    return (
                      <div key={mainCat.id} className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`cat-${mainCat.id}`}
                            checked={(activeFilters['category'] || []).includes(mainCat.slug)}
                            onCheckedChange={(checked) => handleCheckboxChange('category', mainCat.slug, checked as boolean)}
                          />
                          <Label htmlFor={`cat-${mainCat.id}`} className="flex-1 cursor-pointer font-medium leading-relaxed text-sm">
                            {mainCat.name}
                          </Label>
                        </div>

                        {subCats.length > 0 && (
                          <div className="pl-5 space-y-2 border-l-2 border-champagne/30 ml-2 pt-1">
                            {subCats.map((subCat) => (
                              <div key={subCat.id} className="flex items-center space-x-3">
                                <Checkbox
                                  id={`cat-${subCat.id}`}
                                  checked={(activeFilters['category'] || []).includes(subCat.slug)}
                                  onCheckedChange={(checked) => handleCheckboxChange('category', subCat.slug, checked as boolean)}
                                />
                                <Label htmlFor={`cat-${subCat.id}`} className="flex-1 cursor-pointer font-normal text-xs text-muted-foreground hover:text-foreground">
                                  {subCat.name}
                                </Label>
                              </div>
                            ))}
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
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Fiyat Aralığı</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 px-1">
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
        <div className="flex items-center justify-between py-4 border-b">
          <Label htmlFor="new-products" className="text-base font-medium cursor-pointer">
            Sadece Yeni Ürünler ({filterOptions.newProductCount})
          </Label>
          <Switch
            id="new-products"
            checked={(activeFilters['isNew'] || []).includes('true')}
            onCheckedChange={(checked) => {
              onFilterChange('isNew', checked ? ['true'] : [])
            }}
          />
        </div>

        {/* Profile Colors */}
        {filterOptions.profiles.length > 0 && (
          <AccordionItem value="profiles">
            <AccordionTrigger className="text-base font-medium">Profil Rengi</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-5 gap-3 pt-2">
                {filterOptions.profiles.map((profile) => {
                  const isSelected = (activeFilters['profile'] || []).includes(profile.id)
                  return (
                    <button
                      key={profile.id}
                      onClick={() => handleCheckboxChange('profile', profile.id, !isSelected)}
                      className="flex flex-col items-center gap-2 group min-w-[48px] min-h-[48px]"
                      aria-label={`${profile.name} rengi seç`}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all duration-200",
                          isSelected ? "border-primary scale-110" : "border-transparent ring-1 ring-border group-hover:scale-105"
                        )}
                        style={{ backgroundColor: profile.hex }}
                      />
                    </button>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Glass Types */}
        {filterOptions.glasses.length > 0 && (
          <AccordionItem value="glass">
            <AccordionTrigger className="text-base font-medium">Cam Tipi</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {filterOptions.glasses.map((glass) => (
                  <div key={glass.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`glass-${glass.id}`}
                      checked={(activeFilters['glass'] || []).includes(glass.id)}
                      onCheckedChange={(checked) => handleCheckboxChange('glass', glass.id, checked as boolean)}
                    />
                    <Label htmlFor={`glass-${glass.id}`} className="flex-1 cursor-pointer font-normal text-sm">
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
          <AccordionItem value="layouts">
            <AccordionTrigger className="text-base font-medium">Yerleşim Tipi</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {filterOptions.layouts.map(({ id: layout, count }) => (
                  <div key={layout} className="flex items-center space-x-3">
                    <Checkbox
                      id={`layout-${layout}`}
                      checked={(activeFilters['layout'] || []).includes(layout)}
                      onCheckedChange={(checked) => handleCheckboxChange('layout', layout, checked as boolean)}
                    />
                    <Label htmlFor={`layout-${layout}`} className="flex-1 flex items-center justify-between cursor-pointer font-normal text-sm">
                      <span>{layout}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{count}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Glass Thicknesses */}
        {filterOptions.thicknesses.length > 0 && (
          <AccordionItem value="thickness">
            <AccordionTrigger className="text-base font-medium">Cam Kalınlığı</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 pt-2">
                {filterOptions.thicknesses.map((thickness) => {
                  const isSelected = (activeFilters['thickness'] || []).includes(thickness)
                  return (
                    <button
                      key={thickness}
                      onClick={() => handleCheckboxChange('thickness', thickness, !isSelected)}
                      className={cn(
                        "px-4 py-2 rounded-md border text-sm font-medium transition-colors min-h-[48px]",
                        isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted"
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

      <Button
        variant="outline"
        className="w-full min-h-[48px]"
        onClick={onClearAll}
      >
        Filtreleri Temizle
      </Button>
    </div>
  )
}
