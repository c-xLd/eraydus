import { createClient } from '@/lib/server'
import TeamClient from './components/TeamClient'

export const metadata = {
  title: 'Takım Yönetimi | Erayduş Admin',
}

export default async function TeamPage() {
  const supabase = await createClient()

  const { data: members, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching team members:', error)
  }

  return (
    <TeamClient initialMembers={members || []} />
  )
}
