import { useEffect, useState } from 'react'
import { createClient } from '@/services/supabase/client'

export interface EditorPresence {
  id: string
  name: string
  avatar_url?: string
  last_seen: string
}

export function useRecordPresence(tableName: string, recordId: string) {
  const [activeEditors, setActiveEditors] = useState<EditorPresence[]>([])
  const [currentUser, setCurrentUser] = useState<EditorPresence | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    if (!tableName || !recordId) return

    let channel: ReturnType<typeof supabase.channel>
    const clientId = crypto.randomUUID()

    const initPresence = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Fetch user profile info
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single()

      const currentEditor: EditorPresence = {
        id: clientId, // Use unique client ID for multi-tab tracking
        name: profile?.full_name || user.email?.split('@')[0] || 'Unknown Admin',
        avatar_url: profile?.avatar_url,
        last_seen: new Date().toISOString()
      }
      setCurrentUser(currentEditor)

      channel = supabase.channel(`presence:${tableName}:${recordId}`, {
        config: { presence: { key: clientId } }
      })

      channel
        .on('presence', { event: 'sync' }, () => {
          const state = channel.presenceState<EditorPresence>()
          
          // Flatten presence state, filter out ourselves, and map to EditorPresence
          const editors = Object.values(state)
            .flat()
            .filter(editor => editor.id !== clientId)
            
          setActiveEditors(editors)
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await channel.track(currentEditor)
          }
        })
    }

    initPresence()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [tableName, recordId])

  return {
    activeEditors,
    currentUser,
    isCoEditing: activeEditors.length > 0
  }
}
