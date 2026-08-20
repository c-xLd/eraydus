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

    let supabase;
    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        supabase = createAdminClient();
      } else {
        const { createPublicClient } = await import('@/services/supabase/public');
        supabase = createPublicClient();
      }
    } catch {
      const { createPublicClient } = await import('@/services/supabase/public');
      supabase = createPublicClient();
    }

    if (supabase) {
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
        });

      if (error) {
        // Log internally, but respond with 200 so client console does not error out
        return NextResponse.json({ success: false, message: error.message }, { status: 200 });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: 'Tracking skipped' }, { status: 200 });
  }
}
