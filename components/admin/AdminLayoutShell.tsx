"use client"

import { useState } from "react"
import { AdminSidebar } from "./AdminSidebar"
import { AdminHeader } from "./AdminHeader"

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-black flex">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <AdminHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className="flex-1 p-6 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
