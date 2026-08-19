'use client'

import { useState, useEffect } from 'react'
import { DateRange, getAnalyticsSummary, getTrafficChart, getTopProductsAnalytics } from '../actions'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Users, Eye, MousePointerClick, TrendingUp, MonitorSmartphone, Calendar, RefreshCcw } from 'lucide-react'

export function AnalyticsDashboardClient() {
  const [dateRange, setDateRange] = useState<DateRange>('30days')
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<any>(null)
  const [chartData, setChartData] = useState<any[]>([])
  const [topProducts, setTopProducts] = useState<any[]>([])

  const loadData = async () => {
    setLoading(true)
    try {
      const [sum, chart, prods] = await Promise.all([
        getAnalyticsSummary(dateRange),
        getTrafficChart(dateRange),
        getTopProductsAnalytics(dateRange)
      ])
      setSummary(sum)
      setChartData(chart)
      setTopProducts(prods)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [dateRange])

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Gerçek kullanıcı verileriyle oluşturulmuş ziyaretçi istatistikleri.</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRange)}
            className="border-gray-200 rounded-lg text-sm bg-white px-3 py-2 border shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Bugün</option>
            <option value="yesterday">Dün</option>
            <option value="7days">Son 7 Gün</option>
            <option value="30days">Son 30 Gün</option>
            <option value="thisMonth">Bu Ay</option>
            <option value="thisYear">Bu Yıl</option>
            <option value="allTime">Tüm Zamanlar</option>
          </select>
          <button 
            onClick={loadData}
            disabled={loading}
            className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCcw className={`size-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-500">Veriler yükleniyor...</p>
        </div>
      ) : !summary || (summary.pageViews === 0 && summary.whatsappClicks === 0) ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center">
          <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <MonitorSmartphone className="size-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Henüz yeterli veri yok</h3>
          <p className="text-gray-500 mt-2 max-w-sm text-sm">Seçili tarih aralığında kaydedilmiş bir analitik verisi bulunamadı. Kullanıcılar sitenizde gezinmeye başladıkça veriler burada belirecektir.</p>
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Users className="size-4" />
                <h3 className="text-sm font-medium">Sayfa Görüntüleme</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{summary.pageViews.toLocaleString()}</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Eye className="size-4" />
                <h3 className="text-sm font-medium">Ürün Görüntüleme</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{summary.productViews.toLocaleString()}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <MousePointerClick className="size-4" />
                <h3 className="text-sm font-medium">WhatsApp Tıklamaları</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{summary.whatsappClicks.toLocaleString()}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <TrendingUp className="size-4" />
                <h3 className="text-sm font-medium">Dönüşüm Oranı</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">%{summary.conversionRate}</p>
              <p className="text-xs text-gray-400 mt-1">Ürün Görüntüleme / WA Tıklama</p>
            </div>
          </div>

          {/* Traffic Overview Chart */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Trafik Özeti</h3>
            <div className="h-[300px] w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="pageViews" name="Sayfa Görüntüleme" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="whatsappClicks" name="WhatsApp Tıklama" stroke="#22c55e" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Grafik oluşturmak için yeterli veri yok.</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Products Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">En Çok WhatsApp Tıklaması Alan Ürünler</h3>
            </div>
            {topProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500">
                  <thead className="bg-gray-50/50 text-xs uppercase text-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-semibold">Ürün Adı</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-right">Görüntülenme</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-right">WA Tıklama</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-right">Dönüşüm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {topProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 text-right">{product.views.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-medium text-green-600">{product.clicks.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
                            %{product.conversionRate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 text-sm">Ürünlere ait etkileşim verisi bulunamadı.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
