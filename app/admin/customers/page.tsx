import { createClient } from '@/lib/server'
import CustomersClient from './components/CustomersClient'

export const metadata = {
  title: 'Müşteri Yönetimi | Erayduş Admin',
}

export default async function CustomersPage() {
  const supabase = await createClient()

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
