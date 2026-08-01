'use server'

import { createClient } from '@/lib/server'
import type { Database } from '@/lib/database.types'

export type Message = {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  created_at: string
  is_read: boolean
}

export async function getMessages(): Promise<{ data: Message[]; error: any }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  const rows = (data as Database['public']['Tables']['messages']['Row'][] | null) ?? []
  const normalized = rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    subject: row.subject ?? '',
    message: row.message ?? '',
    created_at: row.created_at,
    is_read: row.is_read ?? false,
  }))

  return { data: normalized, error }
}

export async function markAsRead(id: string) {
  const supabase = await createClient()
  const { error } = await (supabase.from('messages') as any)
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
