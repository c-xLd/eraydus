"use client"

import { useState } from "react"
import { AdminSidebar } from "./AdminSidebar"
import { AdminHeader } from "./AdminHeader"
import { AdminBottomNav } from "./AdminBottomNav"
import { AdminMobileMenuSheet } from "./AdminMobileMenuSheet"

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-paper text-text flex">
      {/* Sidebar - Sadece Desktop'ta görünür */}
      <div className="hidden md:block">
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out md:ml-64 ${isCollapsed ? 'md:!ml-16' : ''}`}>
        {/* Header - Sadece Desktop'ta Hamburger gösterimi olacak, mobilde de durabilir ama Hamburger gizlenmeli */}
        <div className="hidden md:block">
          <AdminHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>

        {/* Mobilde native bir top bar (Logo veya sayfa adı için) */}
        <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-grid/50 sticky top-0 z-40">
          <span className="font-bold text-xl tracking-tight text-blueprint-900 font-mono">
            ERAYDUŞ
          </span>
          <div className="size-8 bg-blueprint-600/20 rounded-full flex items-center justify-center text-blueprint-600 text-xs font-bold">
            A
          </div>
        </div>

        {/* Mobilde Bottom Nav için alttan boşluk bırak (pb-24) */}
        <main className="flex-1 p-4 sm:p-8 pb-28 md:pb-8">
          {children}
        </main>
      </div>

      {/* Sadece Mobilde görünen Bottom Nav ve Menü */}
      <AdminBottomNav onOpenMenu={() => setIsMobileMenuOpen(true)} />
      <AdminMobileMenuSheet isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  )
}