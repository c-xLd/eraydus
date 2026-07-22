import { Metadata } from 'next'
import ConfiguratorPage from './TasarlaClient'

export const metadata: Metadata = {
  title: 'Tasarla',
  description: 'Erayduş tasarla sayfası ile kendi duşakabin tasarımınızı oluşturun.',
  alternates: {
    canonical: '/tasarla'
  }
}

export default function Page() {
  return <ConfiguratorPage />
}
