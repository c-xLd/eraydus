"use server"

import { createAdminClient } from '@/services/supabase/server'
import { revalidatePath } from 'next/cache'
import { authorize } from '@/lib/auth-utils'

// Helper to log audit activity
async function logAudit(supabase: any, action: string, target_user_id?: string, metadata: any = {}) {
  // We need current user id
  const { data: { user }, error } = await supabase.auth.getUser()
  if (!error && user) {
    await supabase.from('audit_logs').insert({
      actor_id: user.id,
      action,
      target_user_id,
      metadata
    })
  }
}

// Check if user is SUPER_ADMIN
async function checkIsSuperAdmin(supabase: any, userId: string) {
  const { data } = await supabase.from('profiles').select('role').eq('auth_user_id', userId).single()
  return data?.role === 'SUPER_ADMIN'
}

// Count SUPER_ADMINs
async function countSuperAdmins(supabase: any) {
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'SUPER_ADMIN')
    .eq('status', 'active')
  return count || 0
}

export async function inviteTeamMember(formData: FormData) {
  if (!(await authorize('team.invite'))) return { success: false, error: 'Yetkiniz yok.' }

  const email = formData.get('email') as string
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const role = formData.get('role') as string

  if (!email || !firstName || !role) {
    return { success: false, error: 'Tüm alanları doldurun' }
  }

  const supabase = createAdminClient()
  
  // Create user invitation
  const { data: authData, error: authError } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: { first_name: firstName, last_name: lastName }
  })

  if (authError) {
    return { success: false, error: authError.message }
  }

  const userId = authData.user.id

  // Determine role_id based on string role
  const roleMap: Record<string, number> = {
    'SUPER_ADMIN': 1, 'ADMIN': 2, 'EDITOR': 3, 'SALES': 4, 'SEO_MANAGER': 5, 'WAREHOUSE': 6
  }
  const role_id = roleMap[role] || 3

  // Upsert profile
  const { error: profileError } = await supabase.from('profiles').upsert({
    id: userId,
    auth_user_id: userId,
    email: email,
    first_name: firstName,
    last_name: lastName,
    role: role,
    role_id: role_id,
    status: 'invited'
  }, { onConflict: 'id' })

  if (profileError) {
    return { success: false, error: profileError.message }
  }

  await logAudit(supabase, 'TEAM_MEMBER_INVITED', userId, { role, email })

  revalidatePath('/admin/team')
  return { success: true }
}

export async function updateTeamMember(userId: string, updates: { role?: string, status?: string }) {
  if (!(await authorize('team.update'))) return { success: false, error: 'Yetkiniz yok.' }

  const supabase = createAdminClient()
  
  // Protect SUPER_ADMIN
  if (updates.role && updates.role !== 'SUPER_ADMIN' || updates.status === 'suspended') {
    const isSuperAdmin = await checkIsSuperAdmin(supabase, userId)
    if (isSuperAdmin) {
      const superAdminsCount = await countSuperAdmins(supabase)
      if (superAdminsCount <= 1) {
        return { success: false, error: 'Son SUPER_ADMIN hesabı devre dışı bırakılamaz veya yetkisi düşürülemez.' }
      }
    }
  }

  const roleMap: Record<string, number> = {
    'SUPER_ADMIN': 1, 'ADMIN': 2, 'EDITOR': 3, 'SALES': 4, 'SEO_MANAGER': 5, 'WAREHOUSE': 6
  }
  
  const updatePayload: any = { ...updates }
  if (updates.role) {
    updatePayload.role_id = roleMap[updates.role] || 3
  }

  const { error } = await supabase
    .from('profiles')
    .update(updatePayload)
    .eq('auth_user_id', userId)

  if (error) return { success: false, error: error.message }

  await logAudit(supabase, 'TEAM_MEMBER_UPDATED', userId, updates)
  revalidatePath('/admin/team')
  return { success: true }
}

export async function deleteTeamMember(userId: string) {
  if (!(await authorize('team.delete'))) return { success: false, error: 'Yetkiniz yok.' }

  const supabase = createAdminClient()
  
  const isSuperAdmin = await checkIsSuperAdmin(supabase, userId)
  if (isSuperAdmin) {
    const superAdminsCount = await countSuperAdmins(supabase)
    if (superAdminsCount <= 1) {
      return { success: false, error: 'Son SUPER_ADMIN hesabı silinemez.' }
    }
  }

  // Delete from auth.users
  const { error: authError } = await supabase.auth.admin.deleteUser(userId)
  if (authError) return { success: false, error: authError.message }

  // Profile deletes automatically on cascade if foreign key is set up, but let's delete to be sure
  await supabase.from('profiles').delete().eq('auth_user_id', userId)

  await logAudit(supabase, 'TEAM_MEMBER_DELETED', userId)
  revalidatePath('/admin/team')
  return { success: true }
}
