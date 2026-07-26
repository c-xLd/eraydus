import type { Metadata } from 'next'
import { ReportsClient } from './ReportsClient'

export const metadata: Metadata = {
  title: 'Raporlar ve Analiz',
  description: 'Erayduş yönetim paneli raporlar ve analizler.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function ReportsPage() {
  return <ReportsClient />
}
