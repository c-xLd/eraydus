"use client"

import { useState } from 'react'
import { Plus, Edit, Trash2, Shield, Clock, User } from 'lucide-react'

// Mock data
const mockTeamMembers = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@eraydus.com', role: 'Admin', department: 'Yönetim', joinDate: '2024-01-15', lastActive: 'Şimdi', status: 'active' },
  { id: 2, name: 'Fatma Kılıç', email: 'fatma@eraydus.com', role: 'Editor', department: 'İçerik', joinDate: '2024-02-20', lastActive: '10 dakika önce', status: 'active' },
  { id: 3, name: 'Mehmet Akyüz', email: 'mehmet@eraydus.com', role: 'Müşteri Temsilcisi', department: 'Satış', joinDate: '2024-03-10', lastActive: '2 saat önce', status: 'active' },
  { id: 4, name: 'Zeynep Çelik', email: 'zeynep@eraydus.com', role: 'Analist', department: 'Veri Analizi', joinDate: '2024-04-05', lastActive: 'Dün', status: 'active' },
  { id: 5, name: 'Ali Demir', email: 'ali@eraydus.com', role: 'Moderatör', department: 'Destek', joinDate: '2024-05-12', lastActive: '3 gün önce', status: 'inactive' },
]

const roles = [
  { name: 'Admin', permissions: 'Tüm erişim', color: 'bg-red-100 text-red-700' },
  { name: 'Editor', permissions: 'İçerik yönetimi, Teklif', color: 'bg-blue-100 text-blue-700' },
  { name: 'Müşteri Temsilcisi', permissions: 'Teklifler, Müşteriler', color: 'bg-green-100 text-green-700' },
  { name: 'Analist', permissions: 'Raporlar ve İstatistikler', color: 'bg-purple-100 text-purple-700' },
  { name: 'Moderatör', permissions: 'İçerik denetimi', color: 'bg-yellow-100 text-yellow-700' },
]

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers)
  const [activeTab, setActiveTab] = useState('members')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Takım Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">Takım üyelerini yönetin, rolleri belirleyin ve izinleri kontrol edin.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="size-4" />
          Takım Üyesi Ekle
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-8">
        <button
          onClick={() => setActiveTab('members')}
          className={`pb-4 font-medium transition-colors ${activeTab === 'members' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Takım Üyeleri
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`pb-4 font-medium transition-colors ${activeTab === 'roles' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Roller ve İzinler
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`pb-4 font-medium transition-colors ${activeTab === 'logs' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Aktivite Günlüğü
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'members' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Toplam Üye', value: teamMembers.length, color: 'text-blue-600' },
              { title: 'Aktif Üyeler', value: teamMembers.filter(m => m.status === 'active').length, color: 'text-green-600' },
              { title: 'Bu Ay Eklenen', value: '2', color: 'text-purple-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Team Members Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ad / E-posta</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rol</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Departman</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Katılma Tarihi</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Son Aktivite</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{member.role}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{member.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{member.joinDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="size-3" />
                          {member.lastActive}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {member.status === 'active' ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Düzenle">
                          <Edit className="size-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 gap-4">
          {roles.map((role, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${role.color.split(' ')[0]}`}>
                    <Shield className={`size-5 ${role.color.split(' ')[1]}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{role.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{role.permissions}</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Düzenle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Son Aktiviteler</h3>
          <div className="space-y-4">
            {[
              { action: 'Ahmet Yılmaz ürün güncellemesi yaptı', user: 'Ahmet Y.', time: '5 dakika önce', type: 'update' },
              { action: 'Fatma Kılıç yeni içerik yayınladı', user: 'Fatma K.', time: '1 saat önce', type: 'create' },
              { action: 'Mehmet Akyüz teklif durumu değiştirdi', user: 'Mehmet A.', time: '2 saat önce', type: 'update' },
              { action: 'Zeynep Çelik rapor oluşturdu', user: 'Zeynep Ç.', time: '3 saat önce', type: 'create' },
              { action: 'Ali Demir oturumundan çıktı', user: 'Ali D.', time: '5 saat önce', type: 'logout' },
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {log.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{log.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
