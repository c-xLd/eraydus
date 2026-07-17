"use client"

import { Bell, Search, User } from "lucide-react"

interface AdminHeaderProps {
  isCollapsed: boolean
  setIsCollapsed: (val: boolean) => void
}

export function AdminHeader({ isCollapsed, setIsCollapsed }: AdminHeaderProps) {
  return (
    <header className="h-20 bg-[#F9F9F9] px-10 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl bg-opacity-80">
      {/* Page Title / Search Area */}
      <div className="flex-1 max-w-xl relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 group-focus-within:text-champagne transition-colors" />
        <input 
          type="text" 
          placeholder="Sipariş, teklif veya ürün ara..." 
          className="w-full pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-champagne/30 focus:border-champagne/30 shadow-sm shadow-gray-100/50 transition-all font-light"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button className="relative p-2.5 text-gray-400 hover:text-black hover:bg-white rounded-xl border border-transparent hover:border-gray-100 hover:shadow-sm transition-all">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border-2 border-[#F9F9F9]"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200"></div>
        
        <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-1.5 pr-5 shadow-sm shadow-gray-100/50">
          <div className="size-9 bg-[#0A0A0A] rounded-xl flex items-center justify-center text-champagne relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-champagne/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <User className="size-4 relative z-10" />
          </div>
          <div className="flex flex-col items-start text-left hidden sm:flex">
            <span className="text-sm font-semibold text-gray-900 leading-none mb-1">Admin</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 leading-none">Yönetim</span>
          </div>
          <button 
            onClick={() => {
              import('@/features/auth/actions/auth').then(m => m.signOut())
            }}
            className="ml-4 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider"
          >
            Çıkış
          </button>
        </div>
      </div>
    </header>
  )
}
