import { createClient } from '@/lib/server'
import AdminProjectsClient, { Project } from './client'

export const metadata = {
  title: 'Proje Yönetimi | Erayduş Admin',
}

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('id, name, location, category, description, image_url, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
  }

  const projects =
    data?.map((project) => ({
      id: project.id,
      name: project.name,
      location: project.location ?? '',
      category: project.category ?? '',
      description: project.description ?? '',
      image_url: project.image_url ?? '',
      created_at: project.created_at,
    })) || []

  return <AdminProjectsClient initialProjects={projects} />
}
