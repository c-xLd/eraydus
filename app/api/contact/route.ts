import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic'

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xzxutzjzjdyjheivdxdl.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_g0itJI2YsAytCSuPGT18xw_Rl-VxHbY';
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Ad, E-posta ve Mesaj alanları zorunludur.' }, { status: 400 });
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          name,
          email,
          phone,
          subject: subject || 'Genel',
          message,
          is_read: false,
        }
      ]);

    if (error) {
      console.error('Supabase Error:', error.message);
      return NextResponse.json({ success: false, message: 'Kayıt başarısız.' }, { status: 500 });
    }

    // Try to create a notification for admins
    try {
      const { data: admins } = await supabase.from('profiles').select('id').eq('role_id', 1);
      if (admins && admins.length > 0) {
        const notifInserts = admins.map(admin => ({
          recipient_id: admin.id,
          notification_type: 'new_contact',
          title: 'Yeni İletişim Mesajı',
          message: `${name} adlı kullanıcıdan yeni bir mesaj var. Konu: ${subject || 'Genel'}`,
          action_url: '/admin/messages',
          is_read: false
        }));
        await supabase.from('notifications').insert(notifInserts);
      }
    } catch (notifErr) {
      // Ignore notification errors to not block the main response
      console.warn('Notification could not be created:', notifErr);
    }

    return NextResponse.json({ success: true, message: 'Contact submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in POST /api/contact:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit contact' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: true, message: 'Contact API is running' }, { status: 200 });
}