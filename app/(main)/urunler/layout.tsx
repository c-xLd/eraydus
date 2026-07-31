import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Duşakabin Modelleri ve Fiyatları',
  description: 'Erayduş lüks duşakabin koleksiyonu. Sürgülü, menteşeli, köşe ve özel ölçü duşakabin modelleri. Ücretsiz keşif ve profesyonel montaj.',
  keywords: 'duşakabin, duşakabin modelleri, duşakabin fiyatları, lüks duşakabin, ankara duşakabin',
  openGraph: {
    title: 'Duşakabin Modelleri ve Fiyatları | Erayduş',
    description: 'Erayduş lüks duşakabin koleksiyonu. Milimetrik hassasiyetle özel üretim.',
    url: 'https://eraydus.net/urunler',
  },
  alternates: { canonical: 'https://eraydus.net/urunler' },
}

export default function UrunlerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
