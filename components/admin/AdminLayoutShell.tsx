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
        <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-black/5 sticky top-0 z-40">
          <span className="font-bold text-[15px] tracking-wide text-black font-sans">
            ERAYDUŞ
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                import('@/features/auth/actions/auth').then(m => m.signOut())
              }}
              className="text-xs font-semibold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100"
            >
              ÇIKIŞ
            </button>
            <div className="size-8 bg-black/5 rounded-full flex items-center justify-center text-black text-xs font-bold border border-black/5">
              A
            </div>
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