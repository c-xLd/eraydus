import { Metadata } from 'next'
import { getMessages } from '@/features/messages/actions'
import { MessagesClient } from './components/MessagesClient'

export const metadata: Metadata = {
  title: 'Mesajlar | Erayduş Admin',
  description: 'İletişim formu mesajları',
}

export default async function AdminMessagesPage() {
  const { data: messages } = await getMessages()

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mesajlar</h1>
        <p className="text-muted-foreground mt-2">İletişim formundan gelen müşteri mesajlarını yönetin.</p>
      </div>
      <MessagesClient initialMessages={messages} />
    </div>
  )
}
