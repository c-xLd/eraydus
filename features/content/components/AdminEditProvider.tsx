'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AdminEditContextType {
  isAdmin: boolean
  isEditMode: boolean
  toggleEditMode: () => void
  activeEditField: { path: string; value: string; type: 'text' | 'richtext' | 'image' } | null
  setActiveEditField: (field: { path: string; value: string; type: 'text' | 'richtext' | 'image' } | null) => void
}

const AdminEditContext = createContext<AdminEditContextType | undefined>(undefined)

import { createClient } from '@/services/supabase/client'

export function AdminEditProvider({ children, isAdmin: initialIsAdmin = false }: { children: ReactNode; isAdmin?: boolean }) {
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin)
  const [isEditMode, setIsEditMode] = useState(false)
  const [activeEditField, setActiveEditField] = useState<AdminEditContextType['activeEditField']>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setIsAdmin(true)
      }
    }
    checkAuth()
  }, [])

  const toggleEditMode = () => setIsEditMode(prev => !prev)

  return (
    <AdminEditContext.Provider value={{ isAdmin, isEditMode, toggleEditMode, activeEditField, setActiveEditField }}>
      {children}
    </AdminEditContext.Provider>
  )
}

export function useAdminEdit() {
  const context = useContext(AdminEditContext)
  if (context === undefined) {
    return { isAdmin: false, isEditMode: false, toggleEditMode: () => {}, activeEditField: null, setActiveEditField: () => {} }
  }
  return context
}
