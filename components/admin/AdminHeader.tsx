"use client"

import { Bell, Search, User, Menu, Settings, LogOut, ChevronDown } from "lucide-react"
import { NotificationBell } from "./NotificationBell"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface AdminHeaderProps {
  isCollapsed: boolean
  setIsCollapsed: (val: boolean) => void
}

export function AdminHeader({ isCollapsed, setIsCollapsed }: AdminHeaderProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/admin/products?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSignOut = () => {
    import('@/features/auth/actions/auth').then(m => m.signOut())
  }

  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-black/5 px-6 flex items-center justify-between sticky top-0 z-40 transition-all">
      {/* Page Title / Search Area */}
      <div className="flex-1 max-w-xl relative group flex items-center gap-4">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 -ml-2 rounded-lg hover:bg-black/5 text-black/60 transition-colors"
        >
          <Menu className="size-5" />
        </button>
        <div className="relative w-full">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-black/30 group-focus-within:text-black/70 transition-colors"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Ürünlerde ara... (Enter'a basın)"
            className="w-full pl-10 pr-4 py-2 bg-black/5 border border-transparent rounded-xl text-[13px] focus:outline-none focus:bg-white focus:border-black/10 focus:ring-4 focus:ring-black/5 transition-all font-medium placeholder:text-black/40 text-black shadow-sm"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-4 ml-4">
        <NotificationBell />

        <div className="hidden sm:block h-5 w-[1px] bg-black/10 mx-1"></div>

        <div className="relative" ref={profileRef}>
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 sm:gap-3 bg-white border border-black/5 rounded-full p-1 pr-3 sm:pr-4 shadow-sm hover:shadow-md transition-all cursor-pointer select-none"
          >
            <div className="size-8 bg-black/5 rounded-full flex items-center justify-center text-black">
              <User className="size-4" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col items-start text-left hidden sm:flex justify-center">
              <span className="text-[11px] font-bold text-black tracking-tight leading-none mb-0.5">Admin</span>
              <span className="text-[9px] uppercase tracking-widest text-black/40 font-semibold leading-none">Yönetim</span>
            </div>
            <ChevronDown className={`size-3 text-black/40 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-black/5 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-black/5 mb-1 sm:hidden">
                <span className="block text-xs font-bold text-black">Admin</span>
                <span className="block text-[10px] text-black/50">Yönetim</span>
              </div>
              
              <Link 
                href="/admin/settings"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-black/5 hover:text-black transition-colors"
              >
                <Settings className="size-4" />
                Ayarlar
              </Link>
              
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left"
              >
                <LogOut className="size-4" />
                Çıkış Yap
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}