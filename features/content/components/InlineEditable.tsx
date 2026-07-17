'use client'

import React, { ReactNode } from 'react'
import { useAdminEdit } from './AdminEditProvider'
import { Pencil } from 'lucide-react'

interface InlineEditableProps {
  children: ReactNode
  path: string // e.g. "hero.title_normal"
  value: string
  type?: 'text' | 'richtext' | 'image'
  className?: string
}

export function InlineEditable({ children, path, value, type = 'text', className = '' }: InlineEditableProps) {
  const { isAdmin, isEditMode, setActiveEditField } = useAdminEdit()

  if (!isAdmin || !isEditMode) {
    return <>{children}</>
  }

  return (
    <div 
      className={`relative group inline-block cursor-pointer outline outline-1 outline-transparent hover:outline-champagne/50 hover:bg-champagne/5 transition-all rounded-sm ${className}`}
      onDoubleClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        setActiveEditField({ path, value, type })
      }}
    >
      {children}
      <div className="absolute -top-3 -right-3 bg-champagne text-background rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md">
        <Pencil className="w-3 h-3" />
      </div>
    </div>
  )
}
