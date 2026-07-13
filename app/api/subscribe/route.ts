import { NextResponse } from 'next/server'
import { createClient } from '@/lib/server'
import { Resend } from 'resend'
import { WelcomeEmail } from '@/components/emails/WelcomeEmail'

// Fallback to avoid breaking if API key isn't set yet
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      )
    }

    // 1. Save to Supabase
    const supabase = await createClient()
    const { error: dbError } = await supabase
      .from('subscribers')
      .insert([{ email }])

    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json(
          { error: 'Bu e-posta adresi zaten kayıtlı.' },
          { status: 400 }
        )
      }
      console.error('Supabase Error:', dbError)
      return NextResponse.json(
        { error: 'Kayıt sırasında bir hata oluştu.' },
        { status: 500 }
      )
    }

    // 2. Send Welcome Email via Resend
    if (resend) {
      const { error: emailError } = await resend.emails.send({
        from: 'Erayduş <info@eraydus.com>',
        to: email,
        subject: 'Erayduş Dünyasına Hoş Geldiniz! 🥂',
        react: WelcomeEmail({ email }),
      })

      if (emailError) {
        console.error('Resend Error:', emailError)
        // We still return success to user because they are subscribed
      }
    } else {
      console.log('RESEND_API_KEY is not set. Skipped sending email to:', email)
    }

    return NextResponse.json(
      { message: 'Abonelik başarılı' },
      { status: 200 }
    )
  } catch (err: any) {
    console.error('Subscribe Error:', err)
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu.' },
      { status: 500 }
    )
  }
}
