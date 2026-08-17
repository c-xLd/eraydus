import { createClient } from './server'
import { createAdminClient } from '@/services/supabase/server'

export type Permission = 
  | 'products.read' | 'products.create' | 'products.update' | 'products.delete'
  | 'quotes.read' | 'quotes.update'
  | 'analytics.read'
  | 'seo.read' | 'seo.update'
  | 'team.read' | 'team.invite' | 'team.update' | 'team.delete' | 'team.manage'
  | 'settings.read' | 'settings.update'
  | 'notifications.read' | 'notifications.manage'
  | 'audit.read'
  | '*'

export async function authorize(requiredPermission: Permission): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return false
  
  const adminClient = createAdminClient()

  // Get user profile using admin client to bypass RLS policies that might hide the profile
  const { data: profile } = await adminClient
    .from('profiles')
    .select('role_id, role, status')
    .eq('auth_user_id', user.id)
    .single()
    
  if (!profile || profile.status !== 'active') return false
  
  // SUPER_ADMIN has full access
  if (profile.role === 'SUPER_ADMIN') return true
  
  // Fetch permissions separately to avoid PostgREST cache join errors
  const { data: roleData } = await adminClient
    .from('roles')
    .select('permissions')
    .eq('id', profile.role_id)
    .single()
    
  // Check permissions array
  const perms = (roleData as any)?.permissions || []
  if (perms.includes('*')) return true
  
  // Check exact permission or wildcard (e.g. products.*)
  const [resource, action] = requiredPermission.split('.')
  if (perms.includes(`${resource}.*`)) return true
  
  return perms.includes(requiredPermission)
}
