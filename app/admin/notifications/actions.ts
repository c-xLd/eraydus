"use server"

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function markNotificationAsRead(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/notifications')
  return { success: true }
}

export async function deleteNotification(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/notifications')
  return { success: true }
}
