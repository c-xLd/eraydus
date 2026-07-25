import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/services/supabase/client'
import { NewMessageEmail } from '@/components/emails/NewMessageEmail'

const resendApiKey = process.env.RESEND_API_KEY || 're_dummy_key_for_build'
const resend = new Resend(resendApiKey)
const NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL ?? 'info@eraydus.net'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, subject, message } = body

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Eksik alanlar' }, { status: 400 })
  }

  // 1. Supabase'e kaydet
  const supabase = createClient()
  const { error: dbError } = await supabase
    .from('messages')
    .insert([{ name, email, phone, subject, message }])

  if (dbError) {
    console.error('DB error:', dbError)
    return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 })
  }

  // 2. Admin'e bildirim e-postası gönder
  const { error: emailError } = await resend.emails.send({
    from: 'Erayduş <bildirim@eraydus.net>',
    to: NOTIFY_EMAIL,
    subject: `📬 Yeni mesaj: ${name} — ${subject}`,
    react: NewMessageEmail({ name, email, phone, subject, message }),
  })

  if (emailError) {
    // E-posta başarısız olsa bile mesaj kaydedildi, hata dönme
    console.error('Email error:', emailError)
  }

  return NextResponse.json({ success: true })
}
