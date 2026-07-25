import { NextResponse } from 'next/server';
import { createClient } from '@/lib/server';

function slugify(text: string): string {
  if (!text) return 'urun';
  const trMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u', 'Ü': 'u'
  };
  return text
    .toString()
    .replace(/[çÇğĞıIİöÖşŞüÜ]/g, (match) => trMap[match] || match)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, slug, images');

    if (error || !products) {
      return NextResponse.json({ error: error?.message || 'Ürünler çekilemedi' }, { status: 500 });
    }

    let fixedCount = 0;

    for (const product of products) {
      const rawImages: string[] = Array.isArray(product.images) ? product.images : [];
      const productSlug = product.slug || slugify(product.name);
      let needsFix = false;
      const validImages: string[] = [];

      for (let i = 0; i < rawImages.length; i++) {
        const url = rawImages[i];
        if (!url || !url.startsWith('http')) continue;

        try {
          const res = await fetch(url, { method: 'HEAD' });
          if (res.ok) {
            validImages.push(url);
            continue;
          }
        } catch (e) {}

        // URL returned 400 or failed, try finding image in current slug or subfolders
        needsFix = true;
        
        // List files in current product slug folder
        const { data: files } = await supabase.storage
          .from('products')
          .list(productSlug, { limit: 10 });

        if (files && files.length > 0) {
          const validFile = files.find(f => f.name.includes('.')) || files[0];
          const { data: pubData } = supabase.storage
            .from('products')
            .getPublicUrl(`${productSlug}/${validFile.name}`);
          if (pubData?.publicUrl) {
            validImages.push(pubData.publicUrl);
            continue;
          }
        }

        // Try eraydus- prefix folder fallback
        const oldSlug = `eraydus-${productSlug}`;
        const { data: oldFiles } = await supabase.storage
          .from('products')
          .list(oldSlug, { limit: 10 });

        if (oldFiles && oldFiles.length > 0) {
          const validFile = oldFiles.find(f => f.name.includes('.')) || oldFiles[0];
          const { data: pubData } = supabase.storage
            .from('products')
            .getPublicUrl(`${oldSlug}/${validFile.name}`);
          if (pubData?.publicUrl) {
            validImages.push(pubData.publicUrl);
            continue;
          }
        }

        // High quality fallback image
        validImages.push('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80');
      }

      if (validImages.length === 0) {
        validImages.push('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80');
        needsFix = true;
      }

      if (needsFix) {
        await supabase
          .from('products')
          .update({ images: validImages, updated_at: new Date().toISOString() })
          .eq('id', product.id);
        fixedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `${fixedCount} ürünün kırık (400) görsel bağlantıları otomatik tamir edildi!`,
      fixedCount
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Sunucu hatası' }, { status: 500 });
  }
}
