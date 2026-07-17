'use server'

import { createClient } from '@/services/supabase/server'
import { revalidatePath } from 'next/cache'

// Helper to set a nested value in an object based on a dot-separated path
function setNestedValue(obj: any, path: string, value: any): any {
  const keys = path.split('.')
  const result = { ...obj }
  let current = result
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    current[key] = { ...current[key] }
    current = current[key]
  }
  
  current[keys[keys.length - 1]] = value
  return result
}

export async function updateInlineField(slug: string, fieldPath: string, newValue: string) {
  try {
    const supabase = await createClient()
    
    // 1. Get current page
    const { data: page, error: fetchError } = await supabase
      .from('site_pages')
      .select('content')
      .eq('slug', slug)
      .single()
      
    if (fetchError || !page) throw fetchError || new Error('Page not found')

    // 2. Update the specific path in the JSON content
    // e.g. path: "hero.title_normal"
    const newContent = setNestedValue(page.content, fieldPath, newValue)

    // 3. Save back
    const { error: updateError } = await supabase
      .from('site_pages')
      .update({ content: newContent })
      .eq('slug', slug)

    if (updateError) throw updateError

    // 4. Revalidate
    revalidatePath(`/${slug}`)
    if (slug === 'hakkimizda') revalidatePath('/hakkimizda')
    if (slug === 'jakuzi-tekneler') revalidatePath('/jakuzi-tekneler')

    return { success: true }
  } catch (error) {
    console.error('Error updating inline field:', error)
    return { success: false, error: 'Güncelleme başarısız.' }
  }
}
