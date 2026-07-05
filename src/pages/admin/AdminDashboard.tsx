import React from 'react';
import { 
  TrendingUp, Users, ShoppingBag, FileText, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const STATS = [
  { label: "Today's Quote Requests", value: '24', trend: '+12%', isPositive: true },
  { label: 'Active Configurations', value: '1,432', trend: '+5.4%', isPositive: true },
  { label: 'Monthly Revenue Est.', value: '₺845K', trend: '+18%', isPositive: true },
  { label: 'Avg. Response Time', value: '14m', trend: '-2m', isPositive: true },
];

const RECENT_QUOTES = [
  { id: 'Q-2026-0841', name: 'Ahmet Yılmaz', model: 'Aura Premium', price: '₺42,500', status: 'New', time: '10 min ago' },
  { id: 'Q-2026-0840', name: 'Zeynep Kaya', model: 'Lumina Minimal', price: '₺38,000', status: 'Contacted', time: '45 min ago' },
  { id: 'Q-2026-0839', name: 'Can Özkan', model: 'Aura Premium', price: '₺51,200', status: 'Quoted', time: '2 hours ago' },
  { id: 'Q-2026-0838', name: 'Elif Demir', model: 'Nova Frameless', price: '₺29,800', status: 'Approved', time: '4 hours ago' },
  { id: 'Q-2026-0837', name: 'Burak Şahin', model: 'Aura Premium', price: '₺45,000', status: 'New', time: '5 hours ago' },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-[1440px] mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium tracking-tight mb-1">Overview</h1>
          <p className="text-black/60">Welcome back. Here is what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-black/10 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/80 transition-colors">
            New Quote
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm">
            <div className="text-black/60 text-sm font-medium mb-4">{stat.label}</div>
            <div className="flex items-end justify-between">
              <div className="text-4xl font-medium tracking-tight">{stat.value}</div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Quotes */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-black/5 flex items-center justify-between">
            <h2 className="text-lg font-medium">Recent Quote Requests</h2>
            <button className="text-sm font-medium text-black/60 hover:text-black transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/5 text-black/60 font-medium">
                <tr>
                  <th className="px-6 py-4 rounded-tl-lg">Quote ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Model</th>
                  <th className="px-6 py-4">Est. Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 rounded-tr-lg text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {RECENT_QUOTES.map((quote, i) => (
                  <tr key={i} className="hover:bg-black/5 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-medium text-black/80">{quote.id}</td>
                    <td className="px-6 py-4 font-medium">{quote.name}</td>
                    <td className="px-6 py-4 text-black/60">{quote.model}</td>
                    <td className="px-6 py-4 font-medium">{quote.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        quote.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        quote.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                        quote.status === 'Quoted' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-black/50 text-right">{quote.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Configurations */}
        <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6">
          <h2 className="text-lg font-medium mb-6">Popular Today</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Aura Premium</span>
                <span className="text-black/60">45%</span>
              </div>
              <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Transparent Glass</span>
                <span className="text-black/60">62%</span>
              </div>
              <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Chrome Profile</span>
                <span className="text-black/60">38%</span>
              </div>
              <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-black/5">
             <button className="w-full py-3 bg-black/5 rounded-xl text-sm font-medium hover:bg-black/10 transition-colors">
               View Full Analytics
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
