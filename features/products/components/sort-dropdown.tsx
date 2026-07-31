'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface SortDropdownProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'En Yeni' },
  { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe' },
  { value: 'name-asc', label: "A'dan Z'ye" },
  { value: 'name-desc', label: "Z'den A'ya" },
]

export function SortDropdown({ value, onChange, className }: SortDropdownProps) {
  const selectedOption = SORT_OPTIONS.find((option) => option.value === value)

  return (
    <Select value={value} onValueChange={(val) => val && onChange(val)}>
      <SelectTrigger className={cn("w-[240px] bg-background/50 backdrop-blur-sm border-border/50", className)}>
        <SelectValue placeholder="Sırala">
          {selectedOption ? selectedOption.label : 'Sırala'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
