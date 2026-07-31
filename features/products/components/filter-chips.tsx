'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface FilterChipsProps {
  filters: { key: string; label: string; value: string }[]
  onRemove: (key: string) => void
  onClearAll: () => void
}

export function FilterChips({ filters, onRemove, onClearAll }: FilterChipsProps) {
  if (filters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <AnimatePresence>
        {filters.map((filter) => (
          <motion.div
            key={filter.key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-background/50 backdrop-blur-sm text-sm"
          >
            <span className="text-muted-foreground">{filter.label}:</span>
            <span className="font-medium">{filter.value}</span>
            <button
              onClick={() => onRemove(filter.key)}
              className="ml-1 p-0.5 rounded-full hover:bg-muted transition-colors min-w-[24px] min-h-[24px] flex items-center justify-center"
              aria-label={`${filter.label} filtresini kaldır`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-sm h-8 px-3 ml-2 rounded-full min-h-[48px] md:min-h-[32px]"
      >
        Tümünü Temizle
      </Button>
    </div>
  )
}
