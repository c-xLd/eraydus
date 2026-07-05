import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projeler | ERAYDUŞ',
  description: 'ERAYDUŞ imzasını taşıyan prestijli projeler ve referanslar.',
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
