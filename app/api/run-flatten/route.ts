import { NextResponse } from 'next/server';
import { createClient } from '@/lib/server';

function slugify(text: string): string {
  if (!text) return 'eraydus-urun';
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

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '15', 10);

    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, sku, slug, images')
      .not('images', 'is', null)
      .limit(100);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!products || products.length === 0) {
      return NextResponse.json({ success: true, message: 'İşlenecek ürün bulunamadı.', remainingCount: 0 });
    }

    const pendingProducts = products.filter(p => {
      const rawImages: string[] = Array.isArray(p.images) ? p.images : [];
      return rawImages.some(img => img.includes('/seo-images/') || img.includes('/imports/'));
    }).slice(0, limit);

    if (pendingProducts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Tüm görseller doğrudan [product-slug]/ klasörlerinde barındırılıyor!',
        remainingCount: 0
      });
    }

    let updatedProductsCount = 0;
    let totalImagesMoved = 0;
    const errors: string[] = [];

    for (const product of pendingProducts) {
      const rawImages: string[] = Array.isArray(product.images) ? product.images : [];
      if (rawImages.length === 0) continue;

      const productSlug = product.slug || slugify(product.name);
      const newImages: string[] = [];
      let hasChanges = false;

      for (let i = 0; i < rawImages.length; i++) {
        const imageUrl = rawImages[i];

        if (imageUrl.includes('/seo-images/') || imageUrl.includes('/imports/')) {
          try {
            const urlObj = new URL(imageUrl);
            const parts = urlObj.pathname.split('/');
            let filename = parts[parts.length - 1];
            if (!filename || !filename.includes('.')) {
              filename = `${productSlug}-eraydus-${i + 1}.jpg`;
            }

            const newStoragePath = `${productSlug}/${filename}`;

            const response = await fetch(imageUrl);
            if (!response.ok) {
              newImages.push(imageUrl);
              continue;
            }

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const contentType = response.headers.get('content-type') || 'image/jpeg';

            const { error: uploadErr } = await supabase.storage
              .from('products')
              .upload(newStoragePath, buffer, {
                contentType,
                upsert: true
              });

            if (uploadErr) {
              errors.push(`Görsel yükleme hatası (${newStoragePath}): ${uploadErr.message}`);
              newImages.push(imageUrl);
              continue;
            }

            const { data: publicUrlData } = supabase.storage
              .from('products')
              .getPublicUrl(newStoragePath);

            if (publicUrlData?.publicUrl) {
              newImages.push(publicUrlData.publicUrl);
              hasChanges = true;
              totalImagesMoved++;
            } else {
              newImages.push(imageUrl);
            }
          } catch (err: any) {
            errors.push(`Hata (${imageUrl}): ${err.message}`);
            newImages.push(imageUrl);
          }
        } else {
          newImages.push(imageUrl);
        }
      }

      if (hasChanges) {
        const { error: updateErr } = await supabase
          .from('products')
          .update({ images: newImages, updated_at: new Date().toISOString() })
          .eq('id', product.id);

        if (!updateErr) {
          updatedProductsCount++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      batchSize: pendingProducts.length,
      updatedProductsCount,
      totalImagesMoved,
      errors: errors.slice(0, 5)
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Sunucu hatası' }, { status: 500 });
  }
}
