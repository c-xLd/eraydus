'use client'

import { BarChart3 } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import type { TrafficSources } from '@/features/dashboard/types'

export default function TrafficIntelligence({ data }: { data: TrafficSources }) {
  // If there's no data (0 trend points or all 0), provide a flatline fallback so it doesn't break
  const chartData = data.trend.length > 0 ? data.trend : [{ name: '1', organic: 0, direct: 0, social: 0 }]

  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-black/5">
        <div className="bg-blue-50 p-2.5 rounded-full text-blue-500">
          <BarChart3 className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h2 className="font-medium text-[#050505] tracking-tight">TRAFİK BİLEŞENLERİ</h2>
          <p className="text-[12px] text-neutral-500 font-medium">Ziyaretçi kaynak dağılımı analizi</p>
        </div>
      </div>
      
      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#050505" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#050505" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              itemStyle={{ fontSize: '13px', fontWeight: 600 }}
              labelStyle={{ fontSize: '12px', color: '#888888', marginBottom: '4px' }}
            />
            <Area type="monotone" dataKey="organic" name="Organik" stroke="#050505" strokeWidth={2} fillOpacity={1} fill="url(#colorOrganic)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        <div className="bg-white border border-black/5 p-4 rounded-xl shadow-sm">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Organik (SEO)</div>
          <div className="text-2xl font-light text-[#050505]">%{data.organic}</div>
        </div>
        <div className="bg-white border border-black/5 p-4 rounded-xl shadow-sm">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Doğrudan</div>
          <div className="text-2xl font-light text-[#050505]">%{data.direct}</div>
        </div>
        <div className="bg-white border border-black/5 p-4 rounded-xl shadow-sm">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Sosyal Medya</div>
          <div className="text-2xl font-light text-[#050505]">%{data.social}</div>
        </div>
        <div className="bg-white border border-black/5 p-4 rounded-xl shadow-sm">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Yönlendirme</div>
          <div className="text-2xl font-light text-[#050505]">%{data.referral}</div>
        </div>
      </div>
    </div>
  )
}
