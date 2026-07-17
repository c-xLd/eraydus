'use server'

import { createClient } from '@/services/supabase/server'
import { v4 as uuidv4 } from 'uuid'

export async function uploadImageToSupabase(formData: FormData) {
  try {
    const file = formData.get('file') as File
    if (!file) throw new Error('Dosya bulunamadı')

    const supabase = await createClient()

    // Create a unique file name to avoid collisions
    const fileExtension = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExtension}`
    const filePath = `inline-uploads/${fileName}`

    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Storage upload error:', error)
      throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { success: false, error: 'Görsel yüklenemedi.' }
  }
}
