"use client"

import { Bell, Search, User } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Sipariş, teklif veya ürün ara..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="size-5" />
          <span className="absolute top-1.5 right-1.5 size-2 bg-champagne rounded-full border border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
        
        <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-3 rounded-full border border-transparent hover:border-gray-200 transition-all">
          <div className="size-8 bg-black rounded-full flex items-center justify-center text-white">
            <User className="size-4" />
          </div>
          <div className="flex flex-col items-start text-left hidden sm:flex">
            <span className="text-sm font-medium text-black leading-none mb-1">Admin</span>
            <span className="text-[10px] text-gray-500 leading-none">Yönetici</span>
          </div>
        </button>
      </div>
    </header>
  )
}
