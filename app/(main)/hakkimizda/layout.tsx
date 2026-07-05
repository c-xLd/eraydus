import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda | ERAYDUŞ',
  description: 'ERAYDUŞ markasının hikayesi, vizyonu ve üretim kalitesi.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
