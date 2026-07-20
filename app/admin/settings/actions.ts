"use server"

import { createClient } from "@/lib/server"
import { revalidatePath } from "next/cache"

export async function getSiteSettings() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'global_seo')
      .single()

    if (error) {
      console.error('Error fetching site settings:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data.value }
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}

export async function updateSiteSettings(settings: Record<string, unknown>) {
  try {
    const supabase = await createClient()
    
    // Check if exists
    const { data: existing } = await supabase
      .from('site_settings')
      .select('key')
      .eq('key', 'global_seo')
      .single()

    let error;

    if (existing) {
      const { error: updateError } = await supabase
        .from('site_settings')
        .update({ value: settings })
        .eq('key', 'global_seo')
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('site_settings')
        .insert({ key: 'global_seo', value: settings })
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
