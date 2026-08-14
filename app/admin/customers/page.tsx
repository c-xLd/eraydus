import { createClient } from '@/lib/server'
import CustomersClient from './components/CustomersClient'

export const metadata = {
  title: 'Müşteri Yönetimi | Erayduş Admin',
}

export default async function CustomersPage() {
  let supabase: any
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createAdminClient } = await import('@/services/supabase/server')
      supabase = createAdminClient()
    } else {
      supabase = await createClient()
    }
  } catch {
    supabase = await createClient()
  }

  const { data: customers, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching customers:', error)
  }

  return (
    <CustomersClient initialCustomers={customers || []} />
  )
}
