"use server"

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function updateQuoteStatus(quoteId: string, newStatus: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('quotes')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', quoteId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/quotes')
  revalidatePath('/admin')
  
  return { success: true }
}

export async function deleteQuote(quoteId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('quotes')
    .delete()
    .eq('id', quoteId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/quotes')
  revalidatePath('/admin')

  return { success: true }
}
