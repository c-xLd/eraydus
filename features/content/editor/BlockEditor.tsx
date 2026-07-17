'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { v4 as uuidv4 } from 'uuid'
import { BaseBlock, BlockType, SitePageBlock } from '../types/blocks'
import { BlockToolbar } from './BlockToolbar'
import { GripVertical, Trash2, Copy, Settings, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TiptapEditor } from './TiptapEditor'

interface BlockEditorProps {
  initialBlocks: SitePageBlock[]
  onChange: (blocks: SitePageBlock[]) => void
}

export function BlockEditor({ initialBlocks, onChange }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<SitePageBlock[]>(initialBlocks || [])

  // To prevent hydration mismatch with drag and drop
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBlocks(items)
    onChange(items)
  }

  const addBlock = (type: BlockType) => {
    const newBlock: SitePageBlock = {
      id: uuidv4(),
      type,
      data: {}
    }
    const newBlocks = [...blocks, newBlock]
    setBlocks(newBlocks)
    onChange(newBlocks)
  }

  const updateBlock = (id: string, newData: any) => {
    const newBlocks = blocks.map(b => b.id === id ? { ...b, data: { ...b.data, ...newData } } : b)
    setBlocks(newBlocks)
    onChange(newBlocks)
  }

  const removeBlock = (id: string) => {
    const newBlocks = blocks.filter(b => b.id !== id)
    setBlocks(newBlocks)
    onChange(newBlocks)
  }

  const duplicateBlock = (block: SitePageBlock, index: number) => {
    const newBlocks = [...blocks]
    newBlocks.splice(index + 1, 0, { ...block, id: uuidv4() })
    setBlocks(newBlocks)
    onChange(newBlocks)
  }

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === blocks.length - 1) return

    const newBlocks = [...blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const temp = newBlocks[index]
    newBlocks[index] = newBlocks[targetIndex]
    newBlocks[targetIndex] = temp

    setBlocks(newBlocks)
    onChange(newBlocks)
  }

  if (!isMounted) return null

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto w-full">
      {/* Editor Area */}
      <div className="flex-1 space-y-6">
        {blocks.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-xl text-muted-foreground">
            Henüz hiç block eklenmedi. Sağ menüden bir block seçin.
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="blocks-list">
              {(provided: any) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {blocks.map((block, index) => (
                    <Draggable key={block.id} draggableId={block.id} index={index}>
                      {(provided: any, snapshot: any) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`bg-surface border border-border rounded-xl shadow-sm transition-all overflow-hidden ${snapshot.isDragging ? 'ring-2 ring-primary shadow-xl scale-[1.02]' : ''}`}
                        >
                          {/* Block Header Toolbar */}
                          <div className="flex items-center justify-between p-3 bg-muted/20 border-b border-border">
                            <div className="flex items-center gap-3">
                              <div {...provided.dragHandleProps} className="cursor-grab hover:bg-muted p-1 rounded text-muted-foreground">
                                <GripVertical className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-semibold capitalize bg-primary/10 text-primary px-2 py-1 rounded-md">
                                {block.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => moveBlock(index, 'up')} disabled={index === 0}>
                                <ChevronUp className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1}>
                                <ChevronDown className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => duplicateBlock(block, index)}>
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeBlock(block.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Block Content Editor */}
                          <div className="p-4 space-y-4">
                            {block.type === 'text' && (
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Metin İçeriği</label>
                                <TiptapEditor
                                  content={block.data?.content || ''}
                                  onChange={(content) => updateBlock(block.id, { content })}
                                />
                              </div>
                            )}

                            {block.type === 'hero' && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Üst Başlık (Normal)</label>
                                  <Input 
                                    value={block.data?.title_normal || ''} 
                                    onChange={(e) => updateBlock(block.id, { title_normal: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Alt Başlık (Kalın)</label>
                                  <Input 
                                    value={block.data?.title_bold || ''} 
                                    onChange={(e) => updateBlock(block.id, { title_bold: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Açıklama</label>
                                  <TiptapEditor
                                    content={block.data?.description || ''}
                                    onChange={(content) => updateBlock(block.id, { description: content })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Görsel URL</label>
                                  <Input 
                                    value={block.data?.image || block.data?.image_url || ''} 
                                    onChange={(e) => updateBlock(block.id, { image_url: e.target.value })}
                                    placeholder="https://..."
                                  />
                                </div>
                              </div>
                            )}

                            {block.type === 'two_column' && (
                              <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">İki sütunlu içerik. (Gelişmiş düzenleyici daha sonra eklenecektir)</p>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">JSON Verisi</label>
                                  <textarea 
                                    className="w-full min-h-[150px] p-2 rounded-md border border-input bg-background text-sm font-mono"
                                    value={JSON.stringify(block.data, null, 2)}
                                    onChange={(e) => {
                                      try {
                                        updateBlock(block.id, JSON.parse(e.target.value))
                                      } catch (err) {
                                        // ignore parse errors while typing
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            )}

                            {!['text', 'hero', 'two_column'].includes(block.type) && (
                              <div className="space-y-2">
                                <label className="text-sm font-medium">JSON Verisi (Gelişmiş)</label>
                                <textarea 
                                  className="w-full min-h-[150px] p-2 rounded-md border border-input bg-background text-sm font-mono"
                                  value={JSON.stringify(block.data, null, 2)}
                                  onChange={(e) => {
                                    try {
                                      updateBlock(block.id, JSON.parse(e.target.value))
                                    } catch (err) {
                                      // ignore parse errors while typing
                                    }
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>

      {/* Sidebar Toolbar */}
      <div className="w-full md:w-72 shrink-0">
        <div className="sticky top-24">
          <BlockToolbar onAddBlock={addBlock} />
        </div>
      </div>
    </div>
  )
}
