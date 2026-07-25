import { NextResponse } from 'next/server';
import { createClient } from '@/lib/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // List top-level items inside 'imports/' in products bucket
    const { data: folders, error: listErr } = await supabase.storage
      .from('products')
      .list('imports', { limit: 1000 });

    if (listErr) {
      return NextResponse.json({ error: listErr.message }, { status: 500 });
    }

    if (!folders || folders.length === 0) {
      return NextResponse.json({ success: true, message: 'Temizlenecek eski "imports/" klasörü veya dosyası bulunamadı.', deletedCount: 0 });
    }

    const filesToDelete: string[] = [];

    for (const item of folders) {
      if (item.id) {
        // Direct file in imports/
        filesToDelete.push(`imports/${item.name}`);
      } else {
        // Subfolder inside imports/ (e.g. imports/[sku]/)
        const { data: subFiles } = await supabase.storage
          .from('products')
          .list(`imports/${item.name}`, { limit: 1000 });

        if (subFiles && subFiles.length > 0) {
          subFiles.forEach(sf => {
            filesToDelete.push(`imports/${item.name}/${sf.name}`);
          });
        }
      }
    }

    if (filesToDelete.length === 0) {
      return NextResponse.json({ success: true, message: 'Silinecek eski dosya bulunamadı.', deletedCount: 0 });
    }

    // Delete in batches of 100
    let totalDeleted = 0;
    const errors: string[] = [];

    for (let i = 0; i < filesToDelete.length; i += 100) {
      const batch = filesToDelete.slice(i, i + 100);
      const { data: removeData, error: removeErr } = await supabase.storage
        .from('products')
        .remove(batch);

      if (removeErr) {
        errors.push(`Silme hatası: ${removeErr.message}`);
      } else if (removeData) {
        totalDeleted += removeData.length;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Eski "imports/" klasöründeki ${totalDeleted} dosya Supabase Storage'dan temizlendi!`,
      deletedCount: totalDeleted,
      errors
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Sunucu hatası' }, { status: 500 });
  }
}
