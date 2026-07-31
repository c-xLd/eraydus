"use client"

import { Bell, Search, User } from "lucide-react"

interface AdminHeaderProps {
  isCollapsed: boolean
  setIsCollapsed: (val: boolean) => void
}

export function AdminHeader({ isCollapsed, setIsCollapsed }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-grid/50 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Page Title / Search Area */}
      <div className="flex-1 max-w-2xl relative group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-blueprint-400/50 group-focus-within:text-blueprint-600 transition-colors"
        />
        <input
          type="text"
          placeholder="Sipariş, teklif veya ürün ara..."
          className="w-full pl-12 pr-6 py-2 bg-blueprint-50 border border-blueprint-50/50 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blueprint-600/50 focus:border-blueprint-600/50 bg-blueprint-50/50 transition-all font-light"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button
          className="relative p-2 text-blueprint-400/60 hover:text-white hover:bg-blueprint-600/20 rounded-md transition-all"
        >
          <Bell className="size-5" />
          <span className="absolute top-2 right-2.5 size-2 bg-sepia-600 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-5 w-[1px] bg-grid/50"></div>

        <div className="flex items-center gap-3 bg-white/50 border border-white/50 rounded-md p-1.5 pr-4 backdrop-blur-sm">
          <div className="size-9 bg-blueprint-600/20 rounded-md flex items-center justify-center text-blueprint-600 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blueprint-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <User className="size-4 relative z-10 text-blueprint-600" />
          </div>
          <div className="flex flex-col items-start text-left hidden sm:flex">
            <span className="text-xs font-semibold text-blueprint-900 leading-none mb-1">Admin</span>
            <span className="text-[8px] uppercase tracking-widest text-blueprint-600 leading-none">Yönetim</span>
          </div>
          <button
            onClick={() => {
              import('@/features/auth/actions/auth').then(m => m.signOut())
            }}
            className="ml-2 text-xs font-semibold text-blueprint-600/60 hover:text-blueprint-900 transition-colors uppercase tracking-wider"
          >
            Çıkış
          </button>
        </div>
      </div>
    </header>
  )
}