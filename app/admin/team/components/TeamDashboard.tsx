"use client"

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/client'
import { Search, UserPlus, Shield, Mail, Calendar, LogIn, MoreVertical, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'
import { inviteTeamMember, updateTeamMember, deleteTeamMember } from '../actions'

type Profile = {
  id: string
  auth_user_id: string
  first_name: string
  last_name: string
  email: string
  role: string
  status: string
  created_at: string
  last_login?: string
}

export default function TeamDashboard({ initialProfiles, roles }: { initialProfiles: Profile[], roles: any[] }) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('ALL')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<Profile | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel('team_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setProfiles(prev => [payload.new as Profile, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setProfiles(prev => prev.map(p => p.id === payload.new.id ? payload.new as Profile : p))
        } else if (payload.eventType === 'DELETE') {
          setProfiles(prev => prev.filter(p => p.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const filteredProfiles = useMemo(() => {
    let result = profiles

    if (filterRole !== 'ALL') result = result.filter(p => p.role === filterRole)
    if (filterStatus !== 'ALL') result = result.filter(p => p.status === filterStatus)
    
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p => 
        (p.first_name && p.first_name.toLowerCase().includes(q)) || 
        (p.last_name && p.last_name.toLowerCase().includes(q)) || 
        (p.email && p.email.toLowerCase().includes(q))
      )
    }

    return result
  }, [profiles, search, filterRole, filterStatus])

  const stats = useMemo(() => {
    return {
      total: profiles.length,
      active: profiles.filter(p => p.status === 'active').length,
      invited: profiles.filter(p => p.status === 'invited').length,
      suspended: profiles.filter(p => p.status === 'suspended').length,
    }
  }, [profiles])

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Toplam Üye</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Aktif</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.active}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Davet Bekleyen</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.invited}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Askıya Alınmış</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.suspended}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="İsim veya e-posta ara..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
            >
              <option value="ALL">Tüm Roller</option>
              <option value="SUPER_ADMIN">Sistem Yöneticisi</option>
              <option value="ADMIN">Yönetici</option>
              <option value="EDITOR">Editör</option>
              <option value="SALES">Satış</option>
            </select>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
            >
              <option value="ALL">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="invited">Davetli</option>
              <option value="suspended">Askıya Alınmış</option>
            </select>
          </div>

          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            <UserPlus className="size-4" />
            Davet Et
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-gray-100 text-gray-500 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Kullanıcı</th>
                <th className="px-6 py-4">İletişim</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4">Son Giriş</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {filteredProfiles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Eşleşen kullanıcı bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredProfiles.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                          {user.first_name?.[0] || ''}{user.last_name?.[0] || ''}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.first_name} {user.last_name}</p>
                          <p className="text-xs text-gray-500">Katılım: {new Date(user.created_at).toLocaleDateString('tr-TR')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                        user.role === 'SUPER_ADMIN' ? 'bg-red-50 text-red-700 border-red-100' : 
                        user.role === 'ADMIN' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                        'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 ${
                        user.status === 'active' ? 'text-green-600' :
                        user.status === 'invited' ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        <span className="relative flex size-2">
                          {user.status === 'active' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                          <span className={`relative inline-flex rounded-full size-2 ${user.status === 'active' ? 'bg-green-500' : user.status === 'invited' ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                        </span>
                        {user.status === 'active' ? 'Aktif' : user.status === 'invited' ? 'Davetli' : 'Askıda'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {user.last_login ? new Date(user.last_login).toLocaleString('tr-TR') : 'Henüz giriş yapmadı'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setEditingUser(user)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg"
                      >
                        Düzenle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Ekip Üyesi Davet Et</h3>
              <button onClick={() => setIsInviteModalOpen(false)} className="text-gray-400 hover:text-black">&times;</button>
            </div>
            <form action={async (formData) => {
              const res = await inviteTeamMember(formData)
              if (res.success) {
                toast.success('Davetiye e-postası gönderildi.')
                setIsInviteModalOpen(false)
              } else {
                toast.error('Hata oluştu', { description: res.error })
              }
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ad</label>
                  <input type="text" name="first_name" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Soyad</label>
                  <input type="text" name="last_name" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">E-posta Adresi</label>
                <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Rol</label>
                <select name="role" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option value="EDITOR">Editör</option>
                  <option value="SALES">Satış</option>
                  <option value="ADMIN">Yönetici</option>
                  <option value="SUPER_ADMIN">Sistem Yöneticisi</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsInviteModalOpen(false)} className="flex-1 py-2 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded-lg">İptal</button>
                <button type="submit" className="flex-1 py-2 text-sm font-medium bg-black text-white hover:bg-gray-900 rounded-lg">Davet Gönder</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Üye Düzenle</h3>
              <button onClick={() => setEditingUser(null)} className="text-gray-400 hover:text-black">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Rol</label>
                <select 
                  value={editingUser.role}
                  onChange={async (e) => {
                    const newRole = e.target.value
                    const res = await updateTeamMember(editingUser.auth_user_id, { role: newRole })
                    if (res.success) {
                      toast.success('Rol güncellendi')
                      setEditingUser({...editingUser, role: newRole})
                    } else toast.error('Hata', { description: res.error })
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="EDITOR">Editör</option>
                  <option value="SALES">Satış</option>
                  <option value="ADMIN">Yönetici</option>
                  <option value="SUPER_ADMIN">Sistem Yöneticisi</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Durum</label>
                <select 
                  value={editingUser.status}
                  onChange={async (e) => {
                    const newStatus = e.target.value
                    const res = await updateTeamMember(editingUser.auth_user_id, { status: newStatus })
                    if (res.success) {
                      toast.success('Durum güncellendi')
                      setEditingUser({...editingUser, status: newStatus})
                    } else toast.error('Hata', { description: res.error })
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="active">Aktif</option>
                  <option value="suspended">Askıya Al</option>
                </select>
              </div>
              
              <div className="pt-6 mt-6 border-t border-red-50">
                <button 
                  onClick={async () => {
                    if(confirm(`${editingUser.first_name} adlı kullanıcıyı sistemden tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)){
                      const res = await deleteTeamMember(editingUser.auth_user_id)
                      if (res.success) {
                        toast.success('Kullanıcı silindi')
                        setEditingUser(null)
                      } else toast.error('Hata', { description: res.error })
                    }
                  }}
                  className="w-full py-2 text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 rounded-lg flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="size-4" />
                  Kullanıcıyı Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
