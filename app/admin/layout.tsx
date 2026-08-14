import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell"
import { SessionTimeout } from "@/components/admin/SessionTimeout"
import { Toaster } from 'sonner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SessionTimeout timeoutMinutes={30} />
      <AdminLayoutShell>
        {children}
      </AdminLayoutShell>
      <Toaster position="top-right" richColors />
    </>
  )
}
