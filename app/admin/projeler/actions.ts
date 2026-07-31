'use server'

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function createProjectAction(data: { 
  name: string, 
  location: string, 
  category: string, 
  description: string, 
  imageUrl: string 
}) {
  const supabase = await createClient()

  const { data: inserted, error } = await supabase
    .from('projects')
    .insert([
      { 
        name: data.name, 
        location: data.location,
        category: data.category,
        description: data.description,
        image_url: data.imageUrl
      }
    ])
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/projeler')
  revalidatePath('/projeler')
  return { success: true, data: inserted }
}

export async function updateProjectAction(id: string, data: { 
  name: string, 
  location: string, 
  category: string, 
  description: string, 
  imageUrl?: string 
}) {
  const supabase = await createClient()

  const updates: any = { 
    name: data.name,
    location: data.location,
    category: data.category,
    description: data.description,
    updated_at: new Date().toISOString()
  }
  if (data.imageUrl) updates.image_url = data.imageUrl

  const { data: updated, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/projeler')
  revalidatePath('/projeler')
  return { success: true, data: updated }
}

export async function deleteProjectAction(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .select()

  if (error) {
    return { success: false, error: error.message }
  }
  
  if (!data || data.length === 0) {
    return { success: false, error: 'Silme işlemi reddedildi. Oturum süreniz dolmuş olabilir (RLS kuralı).' }
  }

  revalidatePath('/admin/projeler')
  revalidatePath('/projeler')
  return { success: true }
}
