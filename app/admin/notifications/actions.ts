"use server"

import { createAdminClient } from '@/services/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markNotificationAsRead(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true, status: 'READ', read_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/notifications')
  return { success: true }
}

export async function markNotificationAsUnread(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: false, status: 'UNREAD', read_at: null })
    .eq('id', id)

  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/notifications')
  return { success: true }
}

export async function deleteNotification(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('notifications').delete().eq('id', id)
  
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/notifications')
  return { success: true }
}

export async function markAllAsRead() {
  const supabase = createAdminClient()
  const { error, data } = await supabase
    .from('notifications')
    .update({ is_read: true, status: 'READ', read_at: new Date().toISOString() })
    .eq('is_read', false)
    .select()

  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/notifications')
  return { success: true, count: data.length }
}

export async function bulkDeleteNotifications(ids: string[]) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('notifications').delete().in('id', ids)
  
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/notifications')
  return { success: true, count: ids.length }
}

export async function bulkMarkAsRead(ids: string[]) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true, status: 'READ', read_at: new Date().toISOString() })
    .in('id', ids)

  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/notifications')
  return { success: true, count: ids.length }
}

export async function bulkMarkAsUnread(ids: string[]) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: false, status: 'UNREAD', read_at: null })
    .in('id', ids)

  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/notifications')
  return { success: true, count: ids.length }
}

export async function createNotification(payload: any) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('notifications').insert(payload)
  if (error) return { success: false, error: error.message }
  return { success: true }
}
