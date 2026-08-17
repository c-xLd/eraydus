"use client"

import { createContext, useContext, ReactNode } from "react"

export interface GeneralSettings {
  maintenanceMode: boolean
  contactEmail: string
  whatsappNumber: string
  showPrices: boolean
  enableOnlineQuotes: boolean
  orderNotificationEmail: string
  autoReplyMessage?: string
}

const SettingsContext = createContext<GeneralSettings | null>(null)

export function SettingsProvider({ 
  children, 
  settings 
}: { 
  children: ReactNode, 
  settings: GeneralSettings 
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    // Return safe defaults if used outside provider (or fallback)
    return {
      maintenanceMode: false,
      contactEmail: 'info@eraydus.net',
      whatsappNumber: '+905548830071',
      showPrices: true,
      enableOnlineQuotes: true,
      orderNotificationEmail: 'info@eraydus.net',
    }
  }
  return context
}
