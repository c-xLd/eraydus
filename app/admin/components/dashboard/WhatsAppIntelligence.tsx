import { MessageCircle, TrendingUp, Users, MousePointerClick } from 'lucide-react'
import type { WhatsAppIntelligence as WhatsAppType } from '@/features/dashboard/types'

export default function WhatsAppIntelligence({ data }: { data: WhatsAppType }) {
  const conversionRate = data.clicks > 0 
    ? data.productConversion.toFixed(1)
    : 0

  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-black/5">
        <div className="bg-[#25D366]/10 p-2.5 rounded-full text-[#25D366]">
          <MessageCircle className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h2 className="font-medium text-[#050505] tracking-tight">WHATSAPP ZEKA MERKEZİ</h2>
          <p className="text-[12px] text-neutral-500 font-medium">Müşteri yönlendirme ve dönüşüm metrikleri</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-50 p-5 rounded-xl border border-black/5">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <MousePointerClick className="h-3.5 w-3.5" /> Toplam Yönlendirme
          </div>
          <div className="text-3xl font-light text-[#050505]">{data.clicks}</div>
        </div>
        <div className="bg-[#25D366]/5 p-5 rounded-xl border border-[#25D366]/20">
          <div className="text-[11px] font-bold text-[#25D366] uppercase tracking-wider mb-2 flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5" /> Dönüşüm Oranı
          </div>
          <div className="text-3xl font-light text-[#050505]">%{conversionRate}</div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-black/5 space-y-3 text-[13px]">
        <div className="flex justify-between items-center">
          <span className="text-neutral-500">En Çok Dönüşen Ürün:</span>
          <span className="font-semibold text-[#050505]">{data.topProduct || 'Veri Yok'}</span>
        </div>
      </div>
    </div>
  )
}
