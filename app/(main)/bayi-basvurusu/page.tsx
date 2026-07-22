import { Metadata } from 'next'
import DealerApplicationClient from './DealerApplicationClient'

export const metadata: Metadata = {
  title: 'Bayi Başvurusu',
  description: 'Erayduş Bayisi Olun ve avantajlardan yararlanın.',
  alternates: {
    canonical: '/bayi-basvurusu'
  }
}

export default function Page() {
  return <DealerApplicationClient />
}
