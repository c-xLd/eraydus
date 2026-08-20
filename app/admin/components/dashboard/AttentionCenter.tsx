import { AlertCircle, ArrowRight } from 'lucide-react'
import type { AttentionItem } from '@/features/dashboard/types'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

function PriorityDot({ impact }: { impact: AttentionItem['impact'] }) {
  switch (impact) {
    case 'critical': return <div className="h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
    case 'high': return <div className="h-2 w-2 rounded-full bg-orange-500" />
    case 'medium': return <div className="h-2 w-2 rounded-full bg-amber-400" />
    case 'low': return <div className="h-2 w-2 rounded-full bg-blue-400" />
  }
}

export default function AttentionCenter({ items }: { items: AttentionItem[] }) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-12 text-center h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="h-8 w-8 text-emerald-500" />
        </div>
        <h2 className="text-xl font-light text-[#050505]">TÜM SİSTEMLER DÜZENLİ</h2>
        <p className="text-[13px] text-neutral-500 mt-2 font-medium">İlgilenmeniz gereken kritik bir sorun bulunmuyor.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-black/5 bg-rose-50/30 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-rose-100 p-2 rounded-full text-rose-600">
            <AlertCircle className="h-5 w-5" />
          </div>
          <h2 className="font-medium text-[#050505] tracking-tight">DİKKAT MERKEZİ</h2>
        </div>
        <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {items.length} SORUN
        </span>
      </div>
      <div className="flex-1 overflow-auto max-h-[500px]">
        {items.map((item, idx) => (
          <div key={item.id} className={`p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${idx !== items.length - 1 ? 'border-b border-black/5' : ''} hover:bg-neutral-50/50 transition-colors`}>
            <div className="flex items-start gap-4">
              <div className="mt-1.5"><PriorityDot impact={item.impact} /></div>
              <div>
                <h3 className="font-semibold text-[#050505] text-[15px]">{item.title}</h3>
                <p className="text-[13px] text-neutral-500 mt-1 leading-relaxed">{item.description}</p>
                <div className="mt-3 text-[10px] font-bold text-neutral-400 bg-neutral-100 inline-flex px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Öncelik Puanı: {item.priorityScore}/100
                </div>
              </div>
            </div>
            <Link href={item.link} className="shrink-0 w-full sm:w-auto bg-white border border-black/10 text-neutral-700 hover:bg-neutral-50 hover:text-black text-[13px] font-semibold px-4 py-2.5 rounded-xl inline-flex items-center justify-center transition-colors shadow-sm">
              İncele <ArrowRight className="h-3.5 w-3.5 ml-2" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
