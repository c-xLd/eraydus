import type { Metadata } from 'next'
import TasarlaClient from './components/TasarlaClient'

export const metadata: Metadata = {
  title: 'Duşakabin Tasarla | Erayduş',
  description: 'Kendi duşakabininizi Erayduş konfigüratörü ile tasarlayın ve anında fiyat alın.',
}

export default function TasarlaPage() {
  return <TasarlaClient />
}
