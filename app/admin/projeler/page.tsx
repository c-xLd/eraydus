import { createClient } from '@/lib/server'
import AdminProjectsClient from './client'

export const metadata = {
  title: 'Proje Yönetimi | Erayduş Admin',
}

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
  }

  const projects = data || []

  return <AdminProjectsClient initialProjects={projects} />
}
