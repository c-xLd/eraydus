'use client'

import * as React from 'react'
import { Slider } from '@/components/ui/slider'

interface PriceRangeSliderProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}

export function PriceRangeSlider({ min, max, value, onChange }: PriceRangeSliderProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <Slider
        min={min}
        max={max}
        step={100}
        value={value}
        onValueChange={(val: number[]) => {
          if (val.length === 2) {
            onChange([val[0], val[1]])
          }
        }}
        className="w-full"
      />
      <div className="flex items-center justify-between text-sm font-medium">
        <div className="bg-muted px-3 py-1.5 rounded-md min-w-[4rem] text-center">
          {formatPrice(value[0])}
        </div>
        <div className="text-muted-foreground">-</div>
        <div className="bg-muted px-3 py-1.5 rounded-md min-w-[4rem] text-center">
          {formatPrice(value[1])}
        </div>
      </div>
    </div>
  )
}
