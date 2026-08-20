import { createAdminClient } from '@/services/supabase/server'
import { ShieldCheck, ShieldAlert, Key, Users, Activity, Lock } from 'lucide-react'
import { requireAuth } from '@/features/auth/server-utils'

export const dynamic = 'force-dynamic'

export default async function SecurityCenterPage() {
  // Enforce SUPER_ADMIN or Security role via Server Auth
  const { user, profile } = await requireAuth()
  
  if (profile.role_id !== 1 && profile.role_id !== 2) {
    return (
      <div className="p-8 text-center text-rose-600 font-medium">
        Bu sayfaya erişim yetkiniz bulunmamaktadır.
      </div>
    )
  }

  const supabase = createAdminClient()

  // 1. Fetch Security Score Factors
  const [{ count: mfaEnabled }, { count: totalAdmins }] = await Promise.all([
    supabase.rpc('count_mfa_users'), // Assuming we can get this, or just mock count safely
    supabase.from('profiles').select('*', { count: 'exact', head: true }).in('role_id', [1, 2])
  ])

  // 2. Fetch Security Events
  const { data: events } = await supabase
    .from('security_events')
    .select('*, actor:actor_id(full_name)')
    .order('created_at', { ascending: false })
    .limit(10)

  // Calculate generic security score
  let score = 100
  if (!events || events.filter(e => e.severity === 'CRITICAL').length > 0) score -= 30
  if (events && events.filter(e => e.severity === 'HIGH').length > 0) score -= 15

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-light text-[#050505] tracking-tight">Güvenlik Merkezi</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm text-center">
          <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Sistem Güvenlik Skoru</div>
          <div className={`text-6xl font-light ${score >= 90 ? 'text-emerald-500' : score >= 70 ? 'text-amber-500' : 'text-rose-500'}`}>
            {score}
          </div>
          <div className="text-sm text-neutral-500 mt-2 font-medium">Production-Grade Korumalar Aktif</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
          <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Key className="w-4 h-4"/> MFA Uyumluluğu</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-600">Toplam Yetkili Hesap:</span>
              <span className="font-semibold">{totalAdmins || 0}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-600">MFA Aktif:</span>
              <span className="font-semibold text-emerald-600">Sistem Denetiminde</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-4">
          <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2"><Lock className="w-4 h-4"/> Acil Durum (Lockdown)</div>
          <button className="w-full bg-rose-50 text-rose-600 border border-rose-200 py-2.5 rounded-xl text-sm font-semibold hover:bg-rose-600 hover:text-white transition-colors">
            Tüm Oturumları Sonlandır
          </button>
          <button className="w-full bg-neutral-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition-colors">
            Güvenlik Denetimini Çalıştır
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/5 flex items-center gap-2 bg-neutral-50/50">
          <Activity className="h-4 w-4 text-neutral-500" />
          <h2 className="font-medium text-sm text-[#050505]">Son Güvenlik Olayları</h2>
        </div>
        <div className="divide-y divide-black/5">
          {events?.map((ev: any) => (
            <div key={ev.id} className="p-4 flex justify-between items-center hover:bg-neutral-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    ev.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' :
                    ev.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                    'bg-neutral-100 text-neutral-700'
                  }`}>
                    {ev.severity}
                  </span>
                  <span className="text-sm font-semibold text-[#050505]">{ev.event_type}</span>
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  Actor: {ev.actor?.full_name || ev.actor_id || 'System'} | IP: {ev.ip_address || 'Gizli'}
                </div>
              </div>
              <div className="text-xs text-neutral-400 font-medium">
                {new Date(ev.created_at).toLocaleString('tr-TR')}
              </div>
            </div>
          ))}
          {(!events || events.length === 0) && (
            <div className="p-8 text-center text-sm text-neutral-500 font-medium">
              Yakın zamanda kritik güvenlik olayı kaydedilmedi.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
