import { createClient } from '@/lib/server'
import ProjectsClient from './ProjectsClient'
import { Project } from './ProjectsClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Referans Projeler | Erayduş',
  description: 'Erayduş imzası taşıyan otel, rezidans, villa ve ticari referans projelerimiz.',
}

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
  }

  return <ProjectsClient projects={(projects as Project[]) || []} />
}
