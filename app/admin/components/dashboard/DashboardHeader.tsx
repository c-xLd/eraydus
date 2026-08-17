'use client'

import { Clock, RefreshCcw, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DashboardHeader() {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    router.refresh()
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success('Veriler güncellendi')
    }, 800)
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-light text-gray-900 tracking-tight">İşletme Özeti</h1>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
          <Clock className="size-4" />
          <span>Son güncelleme: {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="text-gray-600 bg-white"
        >
          <RefreshCcw className={`size-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> 
          Yenile
        </Button>
        <Button size="sm" onClick={() => router.push('/admin/quotes')} className="bg-black text-white hover:bg-black/90">
          <Plus className="size-4 mr-2" /> Yeni Teklif
        </Button>
      </div>
    </div>
  )
}
