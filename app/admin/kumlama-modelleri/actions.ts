'use server'

import { createClient } from '@/lib/server'
import type { Database } from '@/lib/database.types'
import { revalidatePath } from 'next/cache'

const STORAGE_BUCKET = 'kumlama-models'
type SandblastedModelUpdate = Database['public']['Tables']['sandblasted_models']['Update']
type SandblastedModelRow = Database['public']['Tables']['sandblasted_models']['Row']

function getStoragePath(publicUrl: string): string | null {
  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`
  const markerIndex = publicUrl.indexOf(marker)

  if (markerIndex === -1) return null

  const encodedPath = publicUrl.slice(markerIndex + marker.length).split('?')[0]
  if (!encodedPath) return null

  try {
    return decodeURIComponent(encodedPath)
  } catch {
    return encodedPath
  }
}

export async function createModelAction(data: { title: string, imageUrl: string }) {
  const supabase = await createClient()

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
  const insertedModel = inserted as SandblastedModelRow
  return { success: true, data: { ...insertedModel, title: insertedModel.title } }
}

export async function updateModelAction(id: string, data: { title: string, imageUrl?: string, isActive?: boolean }) {
  const supabase = await createClient()

  const { data: currentModel, error: currentModelError } = await supabase
    .from('sandblasted_models')
    .select('image_url')
    .eq('id', id)
    .single()

  if (currentModelError) {
    return { success: false, error: currentModelError.message }
  }

  const updates: SandblastedModelUpdate = { title: data.title }
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

  let warning: string | undefined
  let previousImageRemoved = false
  const previousImageUrl = currentModel?.image_url as string | null | undefined

  if (data.imageUrl && previousImageUrl && data.imageUrl !== previousImageUrl) {
    const previousPath = getStoragePath(previousImageUrl)

    if (previousPath) {
      const { count, error: referenceError } = await supabase
        .from('sandblasted_models')
        .select('id', { count: 'exact', head: true })
        .eq('image_url', previousImageUrl)
        .neq('id', id)

      if (referenceError) {
        warning = 'Model güncellendi ancak eski görselin kullanım durumu kontrol edilemedi.'
      } else if ((count ?? 0) === 0) {
        const { error: storageError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .remove([previousPath])

        if (storageError) {
          warning = `Model güncellendi ancak eski görsel silinemedi: ${storageError.message}`
        } else {
          previousImageRemoved = true
        }
      }
    }
  }

  revalidatePath('/admin/kumlama-modelleri')
  revalidatePath('/tasarla')
  const updatedModel = updated as SandblastedModelRow
  return { success: true, data: { ...updatedModel, title: updatedModel.title }, warning, previousImageRemoved }
}

export async function deleteModelAction(id: string) {
  const supabase = await createClient()

  const { data: deletedModel, error } = await supabase
    .from('sandblasted_models')
    .delete()
    .eq('id', id)
    .select('id, image_url')
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  if (!deletedModel) {
    return { success: false, error: 'Silme işlemi reddedildi. Oturum süreniz dolmuş olabilir (RLS kuralı).' }
  }

  let warning: string | undefined
  let imageRemoved = false
  const deletedImageUrl = deletedModel.image_url
  const storagePath = getStoragePath(deletedImageUrl)

  if (storagePath) {
    const { count, error: referenceError } = await supabase
      .from('sandblasted_models')
      .select('id', { count: 'exact', head: true })
      .eq('image_url', deletedImageUrl)

    if (referenceError) {
      warning = 'Model silindi ancak görselin başka bir modelde kullanılıp kullanılmadığı kontrol edilemedi.'
    } else if ((count ?? 0) === 0) {
      const { error: storageError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([storagePath])

      if (storageError) {
        warning = `Model silindi ancak Storage görseli silinemedi: ${storageError.message}`
      } else {
        imageRemoved = true
      }
    }
  }

  revalidatePath('/admin/kumlama-modelleri')
  revalidatePath('/kumlama-modelleri')
  revalidatePath('/tasarla')
  return { success: true, imageRemoved, warning }
}

export async function toggleModelStatusAction(id: string, currentStatus: boolean) {
  const supabase = (await createClient()) as any

  const { error } = await (supabase as any)
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
  const supabase = await createClient()
  
  // Migration 20260727185000 defines the ordering column as order_index.
  const promises = orderedIds.map((id, index) => 
    supabase
      .from('sandblasted_models')
      .update({ order_index: index })
      .eq('id', id)
      .select('id')
      .single()
  )

  const results = await Promise.all(promises)
  const errors = results.filter(r => r.error)

  if (errors.length > 0) {
    return { success: false, error: errors[0]?.error?.message || 'Sıralama güncellenemedi.' }
  }

  revalidatePath('/admin/kumlama-modelleri')
  revalidatePath('/tasarla')
  return { success: true }
}
