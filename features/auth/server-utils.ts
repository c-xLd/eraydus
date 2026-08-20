import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// This creates a dedicated server client for route handlers & server actions
export async function createActionClient() {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch (error) {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  })
}

export async function requireAuth() {
  const supabase = await createActionClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('UNAUTHORIZED')
  }

  // Double check AAL for MFA requirement if they have it enrolled
  const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  const currentLevel = aalData?.currentLevel
  const nextLevel = aalData?.nextLevel
  if (nextLevel === 'aal2' && currentLevel === 'aal1') {
    throw new Error('MFA_REQUIRED')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role_id, is_suspended')
    .eq('id', user.id)
    .single()

  if (profileError || !profile || profile.is_suspended) {
    throw new Error('FORBIDDEN')
  }

  // Load role permissions
  const { data: role } = await supabase
    .from('roles')
    .select('name, permissions')
    .eq('id', profile.role_id)
    .single()

  return {
    user,
    profile,
    role,
    supabase
  }
}

export async function checkPermission(requiredPermission: string) {
  const { user, profile, role, supabase } = await requireAuth()
  
  if (!role || !role.permissions) {
    throw new Error('FORBIDDEN')
  }

  // SUPER_ADMIN check
  if (role.name === 'SUPER_ADMIN') {
    return { user, supabase } // super admin has all access
  }

  // Basic wildcard or exact match
  const perms: string[] = role.permissions || []
  
  const hasAccess = perms.some(p => {
    if (p === '*') return true
    if (p === requiredPermission) return true
    
    // Check wildcard like "products.*"
    if (p.endsWith('.*')) {
      const base = p.replace('.*', '')
      if (requiredPermission.startsWith(base + '.')) return true
    }
    return false
  })

  if (!hasAccess) {
    throw new Error('FORBIDDEN_PERMISSION: ' + requiredPermission)
  }

  return { user, supabase }
}

export async function logSecurityEvent(
  supabase: any, 
  actor_id: string | null, 
  event_type: string, 
  severity: 'INFO'|'LOW'|'MEDIUM'|'HIGH'|'CRITICAL', 
  metadata: any = {}
) {
  // Use Service Role for logging to bypass RLS restrictions if user is unauthenticated
  const adminClient = await createServiceRoleClient()
  await adminClient.from('security_events').insert({
    actor_id,
    event_type,
    severity,
    metadata
  })
}

export async function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createServerClient(url, key, {
    cookies: {
      getAll: () => [],
      setAll: () => {}
    }
  })
}
