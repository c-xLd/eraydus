import { NextResponse } from 'next/server'
import { createClient } from '@/services/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Geçersiz e-posta adresi.' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('subscribers')
      .insert({ email })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ success: true, message: 'Zaten abonesiniz.' }, { status: 200 })
      }
      console.error('Supabase insert error:', error)
      return NextResponse.json({ success: false, message: 'Abonelik kaydedilemedi. Lütfen tekrar deneyin.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Bültene başarıyla kaydoldunuz.', data }, { status: 200 })
  } catch (error) {
    console.error('Error in POST /api/subscribe:', error)
    return NextResponse.json({ success: false, message: 'Geçersiz istek.' }, { status: 400 })
  }
}

// Optional: handle other HTTP methods
export async function GET() {
  return NextResponse.json({ success: true, message: 'Subscribe API is running' }, { status: 200 });
}