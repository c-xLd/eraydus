import { createClient } from '@/lib/server'
import QuotesClient from './components/QuotesClient'

export const metadata = {
  title: 'Teklif Workflow | Erayduş Admin',
}

export default async function QuotesPage() {
  const supabase = await createClient()

  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching quotes:', error)
  }

  return (
    <QuotesClient initialQuotes={quotes || []} />
  )
}
