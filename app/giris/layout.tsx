import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Giriş',
  // Never index the admin login surface.
  robots: { index: false, follow: false, nocache: true },
}

export default function GirisLayout({ children }: { children: React.ReactNode }) {
  return children
}
