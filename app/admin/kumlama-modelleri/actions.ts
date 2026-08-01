'use server'

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function createModelAction(data: { title: string, imageUrl: string }) {
  const supabase = (await createClient()) as any

  const { data: inserted, error } = await supabase
    .from('sandblasted_models')
    .insert([
      { 
        title: data.title, 
        image_url: data.imageUrl,
        // is_active and order_index are handled by default if schema has them
      }
    ])
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/kumlama-modelleri')
  revalidatePath('/tasarla')
  return { success: true, data: inserted }
}

export async function updateModelAction(id: string, data: { title: string, imageUrl?: string, isActive?: boolean }) {
  const supabase = (await createClient()) as any

  const updates: any = { title: data.title }
  if (data.imageUrl) updates.image_url = data.imageUrl
  if (data.isActive !== undefined) updates.is_active = data.isActive

  const { data: updated, error } = await supabase
    .from('sandblasted_models')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/kumlama-modelleri')
  revalidatePath('/tasarla')
  return { success: true, data: updated }
}

export async function deleteModelAction(id: string) {
  const supabase = (await createClient()) as any

  const { data, error } = await supabase
    .from('sandblasted_models')
    .delete()
    .eq('id', id)
    .select()

  if (error) {
    return { success: false, error: error.message }
  }

  if (!data || data.length === 0) {
    return { success: false, error: 'Silme işlemi reddedildi. Oturum süreniz dolmuş olabilir (RLS kuralı).' }
  }

  revalidatePath('/admin/kumlama-modelleri')
  revalidatePath('/tasarla')
  return { success: true }
}

export async function toggleModelStatusAction(id: string, currentStatus: boolean) {
  const supabase = (await createClient()) as any

  const { error } = await supabase
    .from('sandblasted_models')
    .update({ is_active: !currentStatus })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/kumlama-modelleri')
  revalidatePath('/tasarla')
  return { success: true }
}

export async function updateOrderAction(orderedIds: string[]) {
  const supabase = (await createClient()) as any
  
  // Update each item's sort_order
  const promises = orderedIds.map((id, index) => 
    supabase
      .from('sandblasted_models')
      .update({ sort_order: index })
      .eq('id', id)
  )

  const results = await Promise.all(promises)
  const errors = results.filter(r => r.error)

  if (errors.length > 0) {
    return { success: false, error: 'Sıralama güncellenirken bazı hatalar oluştu.' }
  }

  revalidatePath('/admin/kumlama-modelleri')
  revalidatePath('/tasarla')
  return { success: true }
}
