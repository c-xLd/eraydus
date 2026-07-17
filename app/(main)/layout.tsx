import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

import { createClient } from '@/services/supabase/server'
import { AdminEditProvider } from '@/features/content/components/AdminEditProvider'
import { InlineEditToolbar } from '@/features/content/components/InlineEditToolbar'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const isAdmin = !!data?.user

  return (
    <AdminEditProvider isAdmin={isAdmin}>
      <Header />
      {isAdmin && <InlineEditToolbar />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </AdminEditProvider>
  )
}
