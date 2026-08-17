'use server'

import { createAdminClient } from '@/services/supabase/server'
import { revalidatePath } from 'next/cache'
import { customerSchema, customerNoteSchema } from './schema'

export async function createCustomer(formData: FormData) {
  const supabase = createAdminClient()
  
  const rawData = {
    customer_type: formData.get('customer_type'),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    company_name: formData.get('company_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    city: formData.get('city'),
    district: formData.get('district'),
    address: formData.get('address'),
    source: formData.get('source'),
    status: formData.get('status'),
  }

  const parsed = customerSchema.safeParse(rawData)
  if (!parsed.success) {
    return { error: 'Geçersiz form verisi. Lütfen alanları kontrol edin.' }
  }

  // Duplicate Check by Email
  const { data: existing } = await supabase
    .from('customers')
    .select('id')
    .eq('email', parsed.data.email)
    .single()
    
  if (existing) {
    return { error: 'Bu email adresiyle kayıtlı bir müşteri zaten mevcut.' }
  }

  const { data, error } = await supabase
    .from('customers')
    .insert([{ ...parsed.data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()
    .single()

  if (error) {
    return { error: 'Müşteri kaydedilirken bir hata oluştu: ' + error.message }
  }

  // Audit Log
  await supabase.from('audit_logs').insert([{
    action: 'CUSTOMER_CREATED',
    entity_type: 'customers',
    entity_id: data.id,
    details: { email: data.email }
  }])

  revalidatePath('/admin/customers')
  return { success: true, data }
}

export async function updateCustomer(id: string, formData: FormData) {
  const supabase = createAdminClient()
  
  const rawData = {
    customer_type: formData.get('customer_type'),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    company_name: formData.get('company_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    city: formData.get('city'),
    district: formData.get('district'),
    address: formData.get('address'),
    source: formData.get('source'),
    status: formData.get('status'),
  }

  const parsed = customerSchema.safeParse(rawData)
  if (!parsed.success) {
    return { error: 'Geçersiz form verisi.' }
  }

  const { data, error } = await supabase
    .from('customers')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: 'Güncelleme başarısız: ' + error.message }
  }
  
  // Audit Log
  await supabase.from('audit_logs').insert([{
    action: 'CUSTOMER_UPDATED',
    entity_type: 'customers',
    entity_id: data.id,
    details: { email: data.email }
  }])

  revalidatePath('/admin/customers')
  return { success: true, data }
}

export async function deleteCustomer(id: string) {
  const supabase = createAdminClient()
  
  // We perform a physical delete here since there's ON DELETE CASCADE, 
  // but archiving is better. Since this is an example, we'll do delete for simplicity.
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: 'Silme işlemi başarısız: ' + error.message }
  }

  await supabase.from('audit_logs').insert([{
    action: 'CUSTOMER_DELETED',
    entity_type: 'customers',
    entity_id: id,
    details: {}
  }])

  revalidatePath('/admin/customers')
  return { success: true }
}

export async function addCustomerNote(customerId: string, content: string) {
  const supabase = createAdminClient()
  
  // Fetch the current user session to set author_id
  const { data: { session } } = await supabase.auth.getSession()
  
  const { data, error } = await supabase
    .from('customer_notes')
    .insert([{
      customer_id: customerId,
      content,
      author_id: session?.user?.id || null
    }])
    .select()
    .single()
    
  if (error) {
    return { error: 'Not eklenemedi: ' + error.message }
  }
  
  revalidatePath('/admin/customers')
  return { success: true, data }
}
