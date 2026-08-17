import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell"
import { SessionTimeout } from "@/components/admin/SessionTimeout"
import { RealtimeNotifications } from "@/components/admin/RealtimeNotifications"
import { Toaster } from 'sonner'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SessionTimeout timeoutMinutes={30} />
      <RealtimeNotifications />
      <AdminLayoutShell>
        {children}
      </AdminLayoutShell>
      <Toaster position="top-right" richColors />
    </>
  )
}
