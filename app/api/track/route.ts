import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/services/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ success: false, error: 'Invalid or empty JSON body' }, { status: 400 });
    }
    const { 
      event_name, // e.g. 'page_view', 'product_view', 'whatsapp_click'
      session_id, 
      page_url, 
      page_title, 
      referrer,
      device_type,
      user_id,
      product_id,
      category_id,
      metadata 
    } = body

    if (!event_name || !session_id) {
      return NextResponse.json({ success: false, error: 'event_name and session_id required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_name,
        session_id,
        page_url,
        page_title,
        referrer,
        device_type,
        user_id: user_id || null,
        product_id: product_id || null,
        category_id: category_id || null,
        metadata: metadata || {}
      })

    if (error) {
      console.error('Analytics Insert Error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Tracking Error:', error)
    return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 })
  }
}
