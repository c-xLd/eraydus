'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, TrendingUp, Package, Search, Filter, 
  MoreVertical, CheckCircle2, Clock, XCircle 
} from 'lucide-react'

// Dummy Data
const recentLeads = [
  { id: 'LD-1029', name: 'Ahmet Yılmaz', type: 'Fiyat Teklifi', status: 'pending', date: '2 Saat Önce', amount: '₺16.500' },
  { id: 'LD-1028', name: 'Zeynep Kaya', type: 'Mimar Portalı', status: 'approved', date: '5 Saat Önce', amount: '-' },
  { id: 'LD-1027', name: 'Caner Şahin', type: 'Genel Bilgi', status: 'rejected', date: '1 Gün Önce', amount: '-' },
  { id: 'LD-1026', name: 'Elite Otel Projesi', type: 'Toplu Proje', status: 'pending', date: '1 Gün Önce', amount: '₺185.000' },
  { id: 'LD-1025', name: 'Buse Demir', type: 'Fiyat Teklifi', status: 'approved', date: '2 Gün Önce', amount: '₺12.000' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Erayduş İşletim Sistemi'ne Hoş Geldiniz.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
            Rapor İndir
          </button>
          <button className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors">
            Yeni Talepler
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Toplam Talep</p>
              <h3 className="text-3xl font-bold mt-2">1,248</h3>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="size-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 font-medium">
            <TrendingUp className="size-4 mr-1" />
            <span>+12.5%</span>
            <span className="text-muted-foreground ml-2 font-normal">geçen aya göre</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Bekleyen Teklifler</p>
              <h3 className="text-3xl font-bold mt-2">42</h3>
            </div>
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Clock className="size-5 text-amber-500" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 font-medium">
            <TrendingUp className="size-4 mr-1" />
            <span>+5.2%</span>
            <span className="text-muted-foreground ml-2 font-normal">geçen haftaya göre</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Dönüşüm Oranı</p>
              <h3 className="text-3xl font-bold mt-2">%24.8</h3>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Package className="size-5 text-emerald-500" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 font-medium">
            <TrendingUp className="size-4 mr-1" />
            <span>+2.1%</span>
            <span className="text-muted-foreground ml-2 font-normal">geçen aya göre</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'overview' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          Son Talepler
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'analytics' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          Analitik
        </button>
      </div>

      {/* Leads Table */}
      {activeTab === 'overview' && (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
            <div className="relative w-64">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="İsim, ID veya Tür ara..." 
                className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-border bg-background rounded-lg hover:bg-muted transition-colors">
              <Filter className="size-4" />
              Filtrele
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-semibold">Talep ID</th>
                  <th className="px-6 py-4 font-semibold">Müşteri</th>
                  <th className="px-6 py-4 font-semibold">Tür</th>
                  <th className="px-6 py-4 font-semibold">Durum</th>
                  <th className="px-6 py-4 font-semibold">Tarih</th>
                  <th className="px-6 py-4 font-semibold text-right">Tutar</th>
                  <th className="px-6 py-4 font-semibold text-right">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={lead.id} 
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{lead.id}</td>
                    <td className="px-6 py-4 font-medium text-foreground">{lead.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{lead.type}</td>
                    <td className="px-6 py-4">
                      {lead.status === 'pending' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-600 border border-amber-500/20"><Clock className="size-3" /> Bekliyor</span>}
                      {lead.status === 'approved' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"><CheckCircle2 className="size-3" /> Onaylandı</span>}
                      {lead.status === 'rejected' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-500/10 text-rose-600 border border-rose-500/20"><XCircle className="size-3" /> İptal</span>}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{lead.date}</td>
                    <td className="px-6 py-4 font-medium text-right">{lead.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
                        <MoreVertical className="size-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <span>Toplam 142 kayıttan 1-5 arası gösteriliyor</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50">Önceki</button>
              <button className="px-3 py-1 border border-border rounded bg-muted text-foreground font-medium">1</button>
              <button className="px-3 py-1 border border-border rounded hover:bg-muted">2</button>
              <button className="px-3 py-1 border border-border rounded hover:bg-muted">Sonraki</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
          <TrendingUp className="size-12 mx-auto mb-4 opacity-20" />
          <h3 className="text-lg font-medium text-foreground mb-2">Analitik Verileri Yükleniyor</h3>
          <p className="max-w-md mx-auto">Grafik bileşenleri Supabase veritabanı entegrasyonu tamamlandıktan sonra burada görüntülenecektir.</p>
        </div>
      )}
    </div>
  )
}
