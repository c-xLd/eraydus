'use client'

import { Activity, ShoppingCart, Plug } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function IntegrationStatus() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Analytics Placeholder */}
      <div className="p-8 border rounded-3xl bg-gray-50/50 flex flex-col items-center justify-center text-center">
        <div className="size-12 bg-white rounded-2xl shadow-sm border flex items-center justify-center mb-4 text-gray-400">
          <Activity className="size-6" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Web Analytics</h3>
        <p className="text-sm text-gray-500 mt-2 max-w-sm">Ziyaretçi trafiği, sayfa görüntülemeleri ve dönüşüm oranları için entegrasyon gerekli.</p>
        <Button variant="outline" className="mt-6 bg-white">
          <Plug className="size-4 mr-2" /> Google Analytics Bağla
        </Button>
      </div>

      {/* Orders Placeholder */}
      <div className="p-8 border rounded-3xl bg-gray-50/50 flex flex-col items-center justify-center text-center">
        <div className="size-12 bg-white rounded-2xl shadow-sm border flex items-center justify-center mb-4 text-gray-400">
          <ShoppingCart className="size-6" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">E-Ticaret & Siparişler</h3>
        <p className="text-sm text-gray-500 mt-2 max-w-sm">Gelir ve sipariş analitiğini görmek için online ödeme altyapısı kurulu olmalıdır.</p>
        <Button variant="outline" className="mt-6 bg-white" disabled>
          Yakında
        </Button>
      </div>
    </div>
  )
}
