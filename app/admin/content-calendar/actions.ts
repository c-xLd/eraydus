"use server"

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function createContent(data: {
  title: string
  content_type: string
  language: string
  status: string
  scheduled_for: string | null
}) {
  try {
    const supabase = await createClient()
    const { data: content, error } = await supabase
      .from('content_calendar')
      .insert({
        ...data,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/content-calendar')
    return { success: true, content }
  } catch (error: any) {
    return { success: false, error: error?.message || 'Bir hata oluştu' }
  }
}

export async function updateContent(id: string, data: {
  title: string
  content_type: string
  language: string
  status: string
  scheduled_for: string | null
}) {
  try {
    const supabase = await createClient()
    const { data: content, error } = await supabase
      .from('content_calendar')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/content-calendar')
    return { success: true, content }
  } catch (error: any) {
    return { success: false, error: error?.message || 'Bir hata oluştu' }
  }
}

export async function deleteContent(id: string) {
  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('content_calendar')
      .delete()
      .eq('id', id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/content-calendar')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error?.message || 'Bir hata oluştu' }
  }
}
