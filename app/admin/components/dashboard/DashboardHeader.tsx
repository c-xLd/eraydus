'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RefreshCw } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export default function DashboardHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const currentDays = searchParams.get('days') || '30'

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  const handlePeriodChange = (value: string | null) => {
    if (!value) return;
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('days', value)
      router.push(`?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-2xl border border-black/5 shadow-sm mb-2">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#050505]">ERAYDUŞ KONTROL MERKEZİ</h1>
        <p className="text-[13px] text-neutral-500 mt-1 font-medium tracking-wide">
          Site durumu, ürün performansı, SEO ve ziyaretçi aktivitelerine genel bakış.
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleRefresh} 
          disabled={isPending}
          title="Verileri Yenile"
          className="rounded-full w-10 h-10 border-black/10 text-neutral-600 hover:text-black hover:bg-neutral-50"
        >
          <RefreshCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
        </Button>

        <Select value={currentDays} onValueChange={handlePeriodChange} disabled={isPending}>
          <SelectTrigger className="w-[150px] h-10 rounded-full border-black/10 text-sm font-medium focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Tarih aralığı" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-black/5 shadow-lg">
            <SelectItem value="1">Bugün</SelectItem>
            <SelectItem value="7">Son 7 Gün</SelectItem>
            <SelectItem value="30">Son 30 Gün</SelectItem>
            <SelectItem value="90">Son 90 Gün</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

