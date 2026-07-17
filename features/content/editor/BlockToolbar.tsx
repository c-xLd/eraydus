'use client'

import { Button } from '@/components/ui/button'
import { Plus, Type, Image as ImageIcon, Layout, BoxSelect, MessageSquare, List, GripHorizontal, Columns2, Columns3 } from 'lucide-react'
import { BlockType } from '../types/blocks'

interface BlockToolbarProps {
  onAddBlock: (type: BlockType) => void
}

const BLOCK_TYPES: Array<{ type: BlockType; label: string; icon: React.ReactNode }> = [
  { type: 'hero', label: 'Hero', icon: <BoxSelect className="w-4 h-4" /> },
  { type: 'text', label: 'Metin', icon: <Type className="w-4 h-4" /> },
  { type: 'image', label: 'Görsel', icon: <ImageIcon className="w-4 h-4" /> },
  { type: 'gallery', label: 'Galeri', icon: <Layout className="w-4 h-4" /> },
  { type: 'cta', label: 'CTA', icon: <Plus className="w-4 h-4" /> },
  { type: 'quote', label: 'Alıntı', icon: <MessageSquare className="w-4 h-4" /> },
  { type: 'faq', label: 'SSS', icon: <List className="w-4 h-4" /> },
  { type: 'divider', label: 'Ayırıcı', icon: <GripHorizontal className="w-4 h-4" /> },
  { type: 'two_column', label: '2 Sütun', icon: <Columns2 className="w-4 h-4" /> },
  { type: 'three_column', label: '3 Sütun', icon: <Columns3 className="w-4 h-4" /> },
]

export function BlockToolbar({ onAddBlock }: BlockToolbarProps) {
  return (
    <div className="flex flex-col p-4 bg-surface border border-border rounded-xl shadow-lg w-full max-w-sm mx-auto">
      <h3 className="text-sm font-semibold mb-4 text-foreground text-center">Blok Ekle</h3>
      <div className="grid grid-cols-2 gap-2">
        {BLOCK_TYPES.map((block) => (
          <Button
            key={block.type}
            variant="outline"
            size="sm"
            className="justify-start gap-2 h-10"
            onClick={() => onAddBlock(block.type)}
          >
            {block.icon}
            {block.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
