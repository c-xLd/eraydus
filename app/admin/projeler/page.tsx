import type { Metadata } from 'next'
import { ProjelerAdminClient } from './ProjelerAdminClient'

export const metadata: Metadata = {
  title: 'Projeler Yönetimi',
  description: 'Erayduş yönetim paneli projeler sekmesi.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function AdminProjectsPage() {
  return <ProjelerAdminClient />
}
