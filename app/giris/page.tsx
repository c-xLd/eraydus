import type { Metadata } from 'next'
import GirisClient from './components/GirisClient'

export const metadata: Metadata = {
  title: 'Sisteme Giriş | Erayduş',
  description: 'Erayduş yönetim paneline giriş yapın.',
}

export default function GirisPage() {
  return <GirisClient />
}
