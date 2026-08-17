import { createAdminClient } from '@/services/supabase/server'
import CustomersClient from './components/CustomersClient'

export const metadata = {
  title: 'Müşteri Yönetimi | Erayduş Admin',
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = createAdminClient()
  const params = await searchParams

  const page = typeof params.page === 'string' ? parseInt(params.page) : 1
  const limit = typeof params.limit === 'string' ? parseInt(params.limit) : 20
  const search = typeof params.search === 'string' ? params.search : ''
  const status = typeof params.status === 'string' ? params.status : 'all'
  const source = typeof params.source === 'string' ? params.source : 'all'
  const type = typeof params.type === 'string' ? params.type : 'all'

  let query = supabase.from('customers').select('*', { count: 'exact' })

  // Text search across multiple fields
  if (search) {
    query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,company_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
  }

  // Exact filters
  if (status !== 'all') {
    query = query.eq('status', status)
  }
  if (source !== 'all') {
    query = query.eq('source', source)
  }
  if (type !== 'all') {
    query = query.eq('customer_type', type)
  }

  // Pagination
  const from = (page - 1) * limit
  const to = from + limit - 1

  query = query.order('created_at', { ascending: false }).range(from, to)

  const { data: customers, count, error } = await query

  if (error) {
    console.error('Error fetching customers:', error)
  }



  return (
    <CustomersClient 
      customers={customers || []} 
      totalCount={count || 0}
      currentPage={page}
      limit={limit}
    />
  )
}
