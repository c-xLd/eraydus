import type { Metadata } from 'next'
import { IletisimClient } from './IletisimClient'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Bizimle iletişime geçin.',
}

export default function ContactPage() {
  return <IletisimClient />
}
