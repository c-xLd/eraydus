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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-blueprint-950/80 backdrop-blur-xl border-t border-blueprint-800/50 pb-[env(safe-area-inset-bottom)] shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 p-2 touch-manipulation transition-colors ${
                tab.active ? "text-white" : "text-blueprint-400/60 hover:text-white"
              }`}
            >
              <Icon className={`size-6 ${tab.active ? "text-white" : "text-blueprint-400/60 hover:text-white"}`}
                    strokeWidth={tab.active ? 2.5 : 2} />
              <span className={`text-[10px] font-semibold ${tab.active ? "text-white" : "text-blueprint-500/60 hover:text-white"}`}>
                {tab.name}
              </span>
            </Link>
          )
        })}

        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center w-full h-full gap-1 p-2 touch-manipulation text-blueprint-400/60 hover:text-white transition-colors"
        >
          <Menu className="size-6" strokeWidth={2} />
          <span className="text-[10px] font-semibold text-blueprint-500/60 hover:text-white">
            Daha Fazla
          </span>
        </button>
      </div>
    </div>
  )
}