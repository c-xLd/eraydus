import { Metadata } from 'next'
import IletisimClient from './IletisimClient'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Erayduş ile iletişime geçin.',
  alternates: {
    canonical: '/iletisim'
  }
}

export default function Page() {
  return <IletisimClient />
}
