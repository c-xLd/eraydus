import { Metadata } from 'next'
import { LiveChatAdminClient } from './LiveChatAdminClient'

export const metadata: Metadata = {
  title: 'Canlı Destek Merkezi | Erayduş Admin',
}

export default function AdminChatPage() {
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Canlı Destek Merkezi</h1>
        <p className="text-muted-foreground text-sm">
          Sitenizdeki müşterilerle anlık mesajlaşın.
        </p>
      </div>
      
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <LiveChatAdminClient />
      </div>
    </div>
  )
}
