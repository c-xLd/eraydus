'use server'

import { createAdminClient } from '@/services/supabase/server'

export async function deleteChatSessionAction(sessionId: string) {
  try {
    const supabase = createAdminClient()

    // Delete messages first due to foreign key constraints
    const { error: msgError } = await supabase
      .from('chat_messages')
      .delete()
      .eq('session_id', sessionId)
      
    if (msgError) {
      console.error('Error deleting chat messages:', msgError)
      return { success: false, error: msgError.message }
    }

    const { error: sessionError } = await supabase
      .from('chat_sessions')
      .delete()
      .eq('id', sessionId)

    if (sessionError) {
      console.error('Error deleting chat session:', sessionError)
      return { success: false, error: sessionError.message }
    }

    return { success: true }
  } catch (err: any) {
    console.error('Action error:', err)
    return { success: false, error: err.message || 'An unknown error occurred.' }
  }
}

import { callAI } from '@/lib/ai'

export async function generateChatSmartReplyAction(params: {
  customerName?: string
  lastMessages: { sender_type: string; content: string }[]
  modelOverride?: string
}): Promise<{ success: boolean; reply?: string; error?: string }> {
  try {
    const historyText = params.lastMessages
      .map(m => `${m.sender_type === 'admin' ? 'Temsilci' : 'Müşteri'}: ${m.content}`)
      .join('\n')

    const systemPrompt = `Sen ERAYDUŞ lüks duşakabin markasının kibar, uzman ve çözüm odaklı canlı destek temsilcisisin.
GÖREV: Müşterinin son mesajına karşılık samimi, profesyonel, güven veren ve doğrudan konuya odaklanan tek bir yanıt hazırla.
KURALLAR:
- Klişe ve robotik yapay zeka kalıpları kullanma.
- Müşterinin ölçü, fiyat, montaj veya ürün sorusuna profesyonelce yaklaş.
- 1-3 cümle ile net ve akıcı ol.`

    const userPrompt = `Sohbet Geçmişi:\n${historyText}\n\nMüşteriye verilecek en uygun yanıtı yaz:`

    const res = await callAI(
      systemPrompt,
      userPrompt,
      params.modelOverride || 'gemma4:31b',
      200,
      0.6,
      'live_chat_reply'
    )

    if ('error' in res && res.error) {
      return { success: false, error: res.error }
    }

    return { success: true, reply: res.content?.trim() }
  } catch (e: any) {
    return { success: false, error: e.message || 'Yanıt üretilemedi' }
  }
}

