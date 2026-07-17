"use server"

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function deleteTeamMember(id: string) {
  const supabase = await createClient()

  // Note: in a real application, you might also need to delete the user from auth.users using the admin API
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/team')
  return { success: true }
}

export async function updateTeamMemberStatus(id: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('profiles')
    .update({ status: status })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/team')
  return { success: true }
}
