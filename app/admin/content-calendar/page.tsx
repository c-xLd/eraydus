import { createClient } from '@/lib/server'
import ContentClient from './components/ContentClient'

export const metadata = {
  title: 'İçerik Takvimi | Erayduş Admin',
}

export default async function ContentCalendarPage() {
  const supabase = await createClient()

  const { data: content, error } = await supabase
    .from('content_calendar')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching content calendar:', error)
  }

  return (
    <ContentClient initialContent={content || []} />
  )
}
