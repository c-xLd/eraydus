"use server"

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function createContent(data: any) {
  const supabase = await createClient()

  const { data: newContent, error } = await supabase
    .from('content_calendar')
    .insert([
      {
        title: data.title,
        content_type: data.content_type || 'blog',
        status: data.status || 'draft',
        language: data.language || 'tr',
        scheduled_for: data.scheduled_for || null,
        author_id: data.author_id || null,
      }
    ])
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/content-calendar')
  revalidatePath('/admin')
  
  return { success: true, content: newContent }
}

export async function updateContent(id: string, data: any) {
  const supabase = await createClient()

  const { data: updatedContent, error } = await supabase
    .from('content_calendar')
    .update({
      title: data.title,
      content_type: data.content_type,
      status: data.status,
      language: data.language,
      scheduled_for: data.scheduled_for || null,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/content-calendar')
  revalidatePath('/admin')
  
  return { success: true, content: updatedContent }
}

export async function deleteContent(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('content_calendar')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/content-calendar')
  revalidatePath('/admin')

  return { success: true }
}
