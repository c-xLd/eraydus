import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell"
import { Toaster } from 'sonner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminLayoutShell>
        {children}
      </AdminLayoutShell>
      <Toaster position="top-right" richColors />
    </>
  )
}
