"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function ProductsNav() {
  const pathname = usePathname()

  const navItems = [
    { label: "Tüm Ürünler", href: "/admin/products" },
    { label: "Kategoriler", href: "/admin/products/categories" },
    { label: "Nitelikler", href: "/admin/products/attributes" },
  ]

  return (
    <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              isActive ? "text-black" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-black rounded-t-full" />
            )}
          </Link>
        )
      })}
    </div>
  )
}
