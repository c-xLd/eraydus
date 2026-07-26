import type { Metadata } from 'next'
import { TasarlaClient } from './TasarlaClient'

export const metadata: Metadata = {
  title: 'Kendi Duşakabinini Tasarla',
  description: 'Duşakabin konfigüratörü ile hayalinizdeki lüks duşakabini tasarlayın, ölçülerinizi girin ve anında fiyat alın.',
  alternates: {
    canonical: 'https://www.eraydus.net/tasarla',
  }
}

export default function DesignPage() {
  return <TasarlaClient />
}
