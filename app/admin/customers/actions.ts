"use server"

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function createCustomer(data: any) {
  const supabase = await createClient()

  const { data: newCustomer, error } = await supabase
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
  const supabase = await createClient()

  const { data: updatedCustomer, error } = await supabase
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
  const supabase = await createClient()

  const { error } = await supabase
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
