"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Users, Menu } from "lucide-react"

interface AdminBottomNavProps {
  onOpenMenu: () => void;
}

export function AdminBottomNav({ onOpenMenu }: AdminBottomNavProps) {
  const pathname = usePathname()

  const tabs = [
    {
      name: "Özet",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin"
    },
    {
      name: "Ürünler",
      href: "/admin/products",
      icon: Package,
      active: pathname.startsWith("/admin/products")
    },
    {
      name: "Müşteriler",
      href: "/admin/customers",
      icon: Users,
      active: pathname.startsWith("/admin/customers")
    }
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 pb-[env(safe-area-inset-bottom)] shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 p-2 touch-manipulation transition-colors ${
                tab.active ? "text-black" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className={`size-6 ${tab.active ? "fill-black/10" : ""}`} strokeWidth={tab.active ? 2.5 : 2} />
              <span className={`text-[10px] font-semibold ${tab.active ? "text-black" : "text-gray-500"}`}>
                {tab.name}
              </span>
            </Link>
          )
        })}
        
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center w-full h-full gap-1 p-2 touch-manipulation text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Menu className="size-6" strokeWidth={2} />
          <span className="text-[10px] font-semibold text-gray-500">
            Daha Fazla
          </span>
        </button>
      </div>
    </div>
  )
}
