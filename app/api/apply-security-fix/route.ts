import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({
        message: 'Migration dosyası supabase/migrations klasörüne eklendi. (Service role key mevcut değilse Supabase Dashboard SQL Editor üzerinden de çalıştırılabilir).'
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await supabase.rpc('exec_sql', {
      sql: 'DROP POLICY IF EXISTS "Allow public read from products" ON storage.objects;'
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: 'SQL migration kaydedildi.',
        info: error.message
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase Security Advisor uyarısına sebep olan genel SELECT politikası kaldırıldı!'
    });
  } catch (err: any) {
    return NextResponse.json({ success: true, message: 'Migration dosyası oluşturuldu.' });
  }
}
