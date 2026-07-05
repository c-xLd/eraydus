import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim | ERAYDUŞ',
  description: 'Lüks duşakabin tasarımınız için bizimle iletişime geçin.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
