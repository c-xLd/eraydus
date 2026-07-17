"use client"

import { useState } from 'react'
import { Plus, Edit, Trash2, Shield, Clock, User } from 'lucide-react'
import { deleteTeamMember, updateTeamMemberStatus } from '../actions'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"

const defaultRoles = [
  { name: 'Admin', permissions: 'Tüm erişim', color: 'bg-red-100 text-red-700' },
  { name: 'Editor', permissions: 'İçerik yönetimi, Teklif', color: 'bg-blue-100 text-blue-700' },
  { name: 'Müşteri Temsilcisi', permissions: 'Teklifler, Müşteriler', color: 'bg-green-100 text-green-700' },
  { name: 'Analist', permissions: 'Raporlar ve İstatistikler', color: 'bg-purple-100 text-purple-700' },
  { name: 'Moderatör', permissions: 'İçerik denetimi', color: 'bg-yellow-100 text-yellow-700' },
]

export default function TeamClient({ initialMembers, roles = defaultRoles }: { initialMembers: any[], roles?: any[] }) {
  const [teamMembers, setTeamMembers] = useState(initialMembers)
  const [activeTab, setActiveTab] = useState('members')
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu üyeyi silmek istediğinize emin misiniz?")) return

    setLoadingId(id)
    const result = await deleteTeamMember(id)
    setLoadingId(null)

    if (result.success) {
      toast.success("Takım üyesi silindi.")
      setTeamMembers(prev => prev.filter(m => m.id !== id))
    } else {
      toast.error("Silme hatası: " + result.error)
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    
    setLoadingId(id)
    const result = await updateTeamMemberStatus(id, newStatus)
    setLoadingId(null)

    if (result.success) {
      toast.success("Durum güncellendi.")
      setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m))
    } else {
      toast.error("Hata: " + result.error)
    }
  }

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
      </div>

      {/* Tab Content */}
      {activeTab === 'members' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Toplam Üye', value: teamMembers.length, color: 'text-blue-600' },
              { title: 'Aktif Üyeler', value: teamMembers.filter(m => m.status === 'active').length, color: 'text-green-600' },
              { title: 'Pasif Üyeler', value: teamMembers.filter(m => m.status === 'inactive').length, color: 'text-purple-600' },
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
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Katılma Tarihi</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Son Aktivite</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teamMembers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Üye bulunamadı.</td>
                    </tr>
                  ) : teamMembers.map((member) => {
                    const isUpdating = loadingId === member.id
                    return (
                    <tr key={member.id} className={`hover:bg-gray-50 transition-colors ${isUpdating ? 'opacity-50' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {member.first_name ? member.first_name.charAt(0) : 'U'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.first_name} {member.last_name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(member.created_at).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="size-3" />
                          {member.last_login ? new Date(member.last_login).toLocaleString('tr-TR') : 'Hiç giriş yapmadı'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          disabled={isUpdating}
                          onClick={() => handleToggleStatus(member.id, member.status)}
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          member.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                          {member.status === 'active' ? 'Aktif' : 'Pasif'}
                        </button>
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button disabled={isUpdating} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Düzenle">
                          <Edit className="size-4" />
                        </button>
                        <button disabled={isUpdating} onClick={() => handleDelete(member.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  )})}
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
                  <div className={`p-3 rounded-lg ${role.color?.split(' ')[0] || 'bg-gray-100'}`}>
                    <Shield className={`size-5 ${role.color?.split(' ')[1] || 'text-gray-700'}`} />
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
    </div>
  )
}
