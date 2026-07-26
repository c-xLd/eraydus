import type { Metadata } from 'next'
import { BayiBasvurusuClient } from './BayiBasvurusuClient'

export const metadata: Metadata = {
  title: 'Bayi Başvurusu',
  description: 'Erayduş bayilik ağına katılın.',
}

export default function DealerApplicationPage() {
  return <BayiBasvurusuClient />
}
