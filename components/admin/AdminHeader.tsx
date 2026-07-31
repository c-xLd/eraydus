"use client"

import { Bell, Search, User } from "lucide-react"

interface AdminHeaderProps {
  isCollapsed: boolean
  setIsCollapsed: (val: boolean) => void
}

export function AdminHeader({ isCollapsed, setIsCollapsed }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-black/5 px-6 flex items-center justify-between sticky top-0 z-40 transition-all">
      {/* Page Title / Search Area */}
      <div className="flex-1 max-w-xl relative group">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-black/30 group-focus-within:text-black/70 transition-colors"
        />
        <input
          type="text"
          placeholder="Sipariş, teklif veya ürün ara..."
          className="w-full pl-10 pr-4 py-2 bg-black/5 border border-transparent rounded-xl text-[13px] focus:outline-none focus:bg-white focus:border-black/10 focus:ring-4 focus:ring-black/5 transition-all font-medium placeholder:text-black/40 text-black shadow-sm"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-4 ml-4">
        <button
          className="relative p-2 text-black/50 hover:text-black hover:bg-black/5 rounded-full transition-all"
        >
          <Bell className="size-5" strokeWidth={2} />
          <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="hidden sm:block h-5 w-[1px] bg-black/10 mx-1"></div>

        <div className="flex items-center gap-3 bg-white border border-black/5 rounded-full p-1 pr-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="size-8 bg-black/5 rounded-full flex items-center justify-center text-black">
            <User className="size-4" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col items-start text-left hidden sm:flex justify-center">
            <span className="text-[11px] font-bold text-black tracking-tight leading-none mb-0.5">Admin</span>
            <span className="text-[9px] uppercase tracking-widest text-black/40 font-semibold leading-none">Yönetim</span>
          </div>
          <button
            onClick={() => {
              import('@/features/auth/actions/auth').then(m => m.signOut())
            }}
            className="ml-2 pl-3 border-l border-black/5 text-[10px] font-bold text-black/40 hover:text-red-500 transition-colors uppercase tracking-wider h-5 flex items-center"
          >
            ÇIKIŞ
          </button>
        </div>
      </div>
    </header>
  )
}