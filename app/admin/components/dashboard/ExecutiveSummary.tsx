import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-react'
import type { ExecutiveSummary as SummaryType } from '@/features/dashboard/types'

function MetricCard({ 
  label, 
  value, 
  changePercent 
}: { 
  label: string, 
  value: string | number, 
  changePercent?: number 
}) {
  const isPositive = changePercent && changePercent > 0
  const isNegative = changePercent && changePercent < 0
  const isNeutral = !changePercent || changePercent === 0

  return (
    <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col justify-between">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-neutral-50 rounded-full opacity-50 group-hover:scale-110 transition-transform pointer-events-none" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">{label}</span>
        {changePercent !== undefined && (
          <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${
            isPositive ? 'bg-emerald-50 text-emerald-700' : 
            isNegative ? 'bg-rose-50 text-rose-700' : 'bg-neutral-50 text-neutral-600'
          }`}>
            {isPositive ? <ArrowUpIcon className="h-3 w-3" strokeWidth={2.5} /> : null}
            {isNegative ? <ArrowDownIcon className="h-3 w-3" strokeWidth={2.5} /> : null}
            {isNeutral ? <MinusIcon className="h-3 w-3" strokeWidth={2.5} /> : null}
            {Math.abs(changePercent).toFixed(1)}%
          </div>
        )}
      </div>

      <div className="relative z-10">
        <div className="text-[32px] lg:text-[40px] font-light tracking-tight text-[#050505] leading-none">
          {value}
        </div>
      </div>
    </div>
  )
}

export default function ExecutiveSummary({ summary }: { summary: SummaryType }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
      <MetricCard 
        label={summary.visitors.label} 
        value={summary.visitors.value} 
        changePercent={summary.visitors.changePercent} 
      />
      <MetricCard 
        label={summary.sessions.label} 
        value={summary.sessions.value} 
        changePercent={summary.sessions.changePercent} 
      />
      <MetricCard 
        label={summary.productViews.label} 
        value={summary.productViews.value} 
        changePercent={summary.productViews.changePercent} 
      />
      <MetricCard 
        label={summary.whatsappClicks.label} 
        value={summary.whatsappClicks.value} 
        changePercent={summary.whatsappClicks.changePercent} 
      />
    </div>
  )
}
