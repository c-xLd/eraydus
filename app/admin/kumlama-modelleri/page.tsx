import type { Metadata } from 'next'
import { KumlamaAdminClient } from './KumlamaAdminClient'

export const metadata: Metadata = {
  title: 'Kumlama Modelleri Yönetimi',
  description: 'Erayduş yönetim paneli kumlama modelleri sekmesi.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function AdminKumlamaPage() {
  return <KumlamaAdminClient />
}
