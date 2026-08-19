import { createClient } from '@/lib/server'
import { createAdminClient } from '@/services/supabase/server'
import { authorize } from '@/lib/auth-utils'
import { redirect } from 'next/navigation'
import SecurityDashboard from './components/SecurityDashboard'
import { Lock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Güvenlik Kontrol Merkezi | Erayduş Admin',
}

export default async function SecurityPage() {
  // Use team.manage or a new security.read permission. Let's use wildcard or team.manage.
  const isAuthorized = await authorize('team.manage') || await authorize('*')
  if (!isAuthorized) {
    redirect('/admin')
  }

  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/admin/login')
  }

  // Fetch factors (MFA)
  const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors()
  
  const { createAdminClient } = await import('@/services/supabase/server')
  const adminClient = createAdminClient()

  // We can fetch audit_logs for the user
  const { data: recentLogs } = await adminClient
    .from('audit_logs')
    .select('*')
    .eq('actor_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const isRateLimitingEnabled = !!process.env.UPSTASH_REDIS_REST_URL

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Güvenlik Merkezi</h1>
          <p className="text-sm text-gray-500 mt-1">Oturumlar, MFA (İki Adımlı Doğrulama) ve denetim kayıtları.</p>
        </div>
      </div>

      <SecurityDashboard 
        user={user} 
        factors={factors?.all || []} 
        recentLogs={recentLogs || []} 
        isRateLimitingEnabled={isRateLimitingEnabled}
      />
    </div>
  )
}
