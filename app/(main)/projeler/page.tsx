import { Metadata } from 'next'
import ProjelerClient from './ProjelerClient'

export const metadata: Metadata = {
  title: 'Projeler',
  description: 'Erayduş projelerini inceleyin.',
  alternates: {
    canonical: '/projeler'
  }
}

export default function Page() {
  return <ProjelerClient />
}
