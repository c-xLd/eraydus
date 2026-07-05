import { Card } from '@/components/ui/card'
import { ArrowUpRight, TrendingUp, Users, Package } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Sistem istatistikleri ve son aktiviteler.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-background shadow-sm border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Toplam Talep</h3>
            <div className="p-2 bg-primary/10 rounded-md">
              <Users className="size-4 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-semibold">1,248</p>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="size-3" /> +12% geçen aya göre
          </p>
        </Card>

        <Card className="p-6 bg-background shadow-sm border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Aktif Ürünler</h3>
            <div className="p-2 bg-primary/10 rounded-md">
              <Package className="size-4 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-semibold">42</p>
          <p className="text-sm text-muted-foreground mt-2">
            3 yeni koleksiyon
          </p>
        </Card>

        <Card className="p-6 bg-background shadow-sm border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Konfigüratör Kullanımı</h3>
            <div className="p-2 bg-primary/10 rounded-md">
              <ArrowUpRight className="size-4 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-semibold">8,592</p>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="size-3" /> +24% geçen aya göre
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="p-6 bg-background shadow-sm border-border h-[400px]">
          <h3 className="text-lg font-medium mb-4">Son Talepler</h3>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground border-2 border-dashed border-border rounded-xl">
            Henüz veri yok
          </div>
        </Card>
        <Card className="p-6 bg-background shadow-sm border-border h-[400px]">
          <h3 className="text-lg font-medium mb-4">Popüler Modeller</h3>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground border-2 border-dashed border-border rounded-xl">
            Henüz veri yok
          </div>
        </Card>
      </div>
    </div>
  )
}
