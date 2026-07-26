import type { Metadata } from 'next'
import { GirisClient } from './GirisClient'

export const metadata: Metadata = {
  title: 'Yönetim Girişi',
  description: 'Erayduş dijital mağaza yönetim paneli girişi.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function LoginPage() {
  return <GirisClient />
}
