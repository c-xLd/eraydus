import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const { sessionId, visitorId, message } = await req.json()
    
    if (!sessionId || !message) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Verify session is in bot mode
    const { data: session } = await supabase
      .from('chat_sessions')
      .select('status')
      .eq('id', sessionId)
      .single()

    if (!session || session.status !== 'bot') {
      return NextResponse.json({ success: true, message: 'Not in bot mode' })
    }

    // Call Gemini API via fetch (REST API)
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY is not defined')
    }

    // System instruction for the bot
    const systemPrompt = `Sen Erayduş Duşakabin firmasının yapay zeka asistanısın. Kısa, samimi ve Türkçe yanıt ver.
Eğer kullanıcının sorusu çok karmaşıksa, şikayetçiyse, fiyat pazarlığı yapmak istiyorsa veya direkt bir insana bağlanmak istiyorsa, yanıtının sonuna mutlaka tam olarak "[TRANSFER]" kelimesini ekle. 
Kullanıcı duşakabin, kumlama cam, ölçü, montaj gibi genel sorular sorarsa doğrudan yanıtla.`

    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          { role: 'user', parts: [{ text: message }] }
        ]
      })
    })

    const aiData = await aiResponse.json()
    let replyText = aiData?.candidates?.[0]?.content?.parts?.[0]?.text || "Üzgünüm, şu an yanıt veremiyorum."

    let transferRequested = false
    if (replyText.includes('[TRANSFER]')) {
      transferRequested = true
      replyText = replyText.replace(/\[TRANSFER\]/g, '').trim()
      if (!replyText) {
        replyText = "Hemen sizi bir müşteri temsilcisine aktarıyorum, lütfen bekleyin."
      }
    }

    // Insert bot reply
    await supabase.from('chat_messages').insert([{
      session_id: sessionId,
      sender_type: 'admin',
      sender_id: 'bot',
      content: replyText
    }])

    if (transferRequested) {
      // Switch session to active (human) mode
      await supabase.from('chat_sessions').update({ status: 'active' }).eq('id', sessionId)
      
      // Also notify admins (optional: insert into notifications)
      const { data: admins } = await supabase.from('profiles').select('id').eq('role_id', 1)
      if (admins && admins.length > 0) {
        const notifs = admins.map(admin => ({
          recipient_id: admin.id,
          notification_type: 'system',
          title: 'Yeni Canlı Destek',
          message: 'Bir ziyaretçi müşteri temsilcisine bağlanmak istiyor.',
          action_url: '/admin/chat',
        }))
        await supabase.from('notifications').insert(notifs)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Chat bot error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
