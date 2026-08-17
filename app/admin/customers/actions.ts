"use server"

import { createClient as createLocalClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/services/supabase/server'

async function getAdminSupabase() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createAdminClient()
  }
  return await createLocalClient()
}

export async function createCustomer(data: any) {
  const supabase = await getAdminSupabase()

  const { data: newCustomer, error } = await (supabase as any)
    .from('customers')
    .insert([
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        customer_type: data.customer_type || 'individual',
        status: data.status || 'active',
      }
    ])
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/customers')
  revalidatePath('/admin')
  
  return { success: true, customer: newCustomer }
}

export async function updateCustomer(id: string, data: any) {
  const supabase = await getAdminSupabase()

  const { data: updatedCustomer, error } = await (supabase as any)
    .from('customers')
    .update({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      customer_type: data.customer_type,
      status: data.status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/customers')
  revalidatePath('/admin')
  
  return { success: true, customer: updatedCustomer }
}

export async function deleteCustomer(id: string) {
  const supabase = await getAdminSupabase()

  const { error } = await (supabase as any)
    .from('customers')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/customers')
  revalidatePath('/admin')

  return { success: true }
}
