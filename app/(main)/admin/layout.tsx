import { LayoutDashboard, Package, Users, Settings, LogOut, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-surface overflow-hidden text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="text-xl font-bold tracking-tight">ERAYDUŞ OS</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 bg-primary/5 text-primary rounded-md font-medium text-sm">
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-md font-medium text-sm transition-colors">
            <Package className="size-4" />
            Ürünler & Koleksiyonlar
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-md font-medium text-sm transition-colors">
            <Users className="size-4" />
            Talepler (Leads)
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-md font-medium text-sm transition-colors">
            <Settings className="size-4" />
            Sistem Ayarları
          </Link>
        </nav>
        
        <div className="p-4 border-t border-border space-y-2">
          <Link href="/" className="flex items-center gap-2 w-full justify-start text-muted-foreground border border-border px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">
            <Home className="size-4" /> Siteye Dön
          </Link>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="size-4 mr-2" /> Çıkış Yap
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border bg-background flex items-center px-8 justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">Yönetim Paneli</h2>
          <div className="flex items-center gap-4">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">AD</div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
