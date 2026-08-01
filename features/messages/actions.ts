'use server'

import { createClient } from '@/lib/server'

export async function getMessages() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  return { data: data ?? [], error }
}

export async function markAsRead(id: string) {
  const supabase = await createClient()
  // Cast supabase to any to bypass strict typechecking of Database types if it has mismatched tables/types
  const { error } = await (supabase as any)
    .from('messages')
    .update({ is_read: true })
    .eq('id', id)

  return { success: !error, error: error?.message }
}

export async function deleteMessage(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)

  return { success: !error, error: error?.message }
}
