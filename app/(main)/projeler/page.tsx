import type { Metadata } from 'next'
import { ProjelerClient } from './ProjelerClient'

export const metadata: Metadata = {
  title: 'Projeler',
  description: "Türkiye'nin ve dünyanın önde gelen konut, otel ve ticari projelerinde ERAYDUŞ kalitesi tercih ediliyor.",
  alternates: {
    canonical: 'https://www.eraydus.net/projeler',
  }
}

export default function ProjectsPage() {
  return <ProjelerClient />
}
