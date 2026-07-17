'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/services/supabase/server'

export async function purgeSiteCache() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { success: false, error: 'Yetkisiz erişim.' }
  }

  try {
    // Revalidate the entire site
    revalidatePath('/', 'layout')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
