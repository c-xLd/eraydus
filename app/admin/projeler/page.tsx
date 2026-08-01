import { createClient } from '@/lib/server'
import AdminProjectsClient, { Project } from './client'

export const metadata = {
  title: 'Proje Yönetimi | Erayduş Admin',
}

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('id, title, location, category, description, main_image_url, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
  }

  const projects =
    data?.map((project) => ({
      id: project.id,
      name: project.title,
      location: project.location ?? '',
      category: project.category ?? '',
      description: project.description ?? '',
      image_url: project.main_image_url ?? '',
      created_at: project.created_at,
    })) || []

  return <AdminProjectsClient initialProjects={projects} />
}
