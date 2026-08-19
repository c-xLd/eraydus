import { createClient } from '@/lib/server'
import TeamDashboard from './components/TeamDashboard'
import { authorize } from '@/lib/auth-utils'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Ekip Yönetimi | Erayduş Admin',
}

export default async function TeamPage() {
  const isAuthorized = await authorize('team.read')
  if (!isAuthorized) {
    redirect('/admin')
  }

  const { createAdminClient } = await import('@/services/supabase/server')
  const adminClient = createAdminClient()

  // Fetch team profiles
  const { data: profiles, error } = await adminClient
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Ekip üyeleri yüklenirken hata oluştu:', error)
  }

  // Fetch roles
  const { data: roles } = await adminClient.from('roles').select('*')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Ekip Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">Sistem yöneticileri, editörler ve satış ekibi erişim yetkileri.</p>
        </div>
      </div>

      <TeamDashboard initialProfiles={profiles || []} roles={roles || []} />
    </div>
  )
}
