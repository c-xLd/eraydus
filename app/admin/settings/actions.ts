"use server"

import { createClient as createLocalClient } from "@/lib/server"
import { revalidatePath } from "next/cache"
import { createAdminClient } from '@/services/supabase/server'

async function getAdminSupabase() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createAdminClient()
  }
  return await createLocalClient()
}

export async function getSiteSettings() {
  try {
    const supabase = await getAdminSupabase()
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'general_settings')
      .maybeSingle()

    if (error) {
      console.error('Error fetching site settings:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data?.value || null }
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}

export async function updateSiteSettings(settings: Record<string, unknown>) {
  try {
    const supabase = await getAdminSupabase()
    
    // Check if exists
    const { data: existing } = await supabase
      .from('site_settings')
      .select('key')
      .eq('key', 'general_settings')
      .maybeSingle()

    let error;

    if (existing) {
      const { error: updateError } = await supabase
        .from('site_settings')
        .update({ value: settings as any })
        .eq('key', 'general_settings')
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('site_settings')
        .insert({ key: 'general_settings', value: settings as any })
      error = insertError;
    }

    if (error) {
      console.error('Error updating site settings:', error)
      return { success: false, error: error.message }
    }

    // Revalidate paths to update frontend
    revalidatePath('/', 'layout')
    
    return { success: true }
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}
