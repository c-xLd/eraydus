import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

import { AdminEditProvider } from '@/features/content/components/AdminEditProvider'
import { InlineEditToolbar } from '@/features/content/components/InlineEditToolbar'

// No server-side auth check here: admin status is resolved client-side inside
// AdminEditProvider (supabase.auth.getUser in a useEffect). Keeping cookies()
// out of the shared layout lets public pages render statically / via ISR,
// which is critical for TTFB and the Real Experience Score.
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminEditProvider>
      <Header />
      {/* Self-hides for non-admins via context (returns null when !isAdmin) */}
      <InlineEditToolbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </AdminEditProvider>
  )
}
