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
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Fetch products whose image URLs still contain '/seo-images/'
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

    // Filter products having '/seo-images/' in their images
    const pendingProducts = products.filter(p => {
      const rawImages: string[] = Array.isArray(p.images) ? p.images : [];
      return rawImages.some(img => img.includes('/storage/v1/object/public/products/seo-images/'));
    }).slice(0, limit);

    if (pendingProducts.length === 0) {
      // Also clean up old seo-images/ folder if empty or remaining
      return NextResponse.json({
        success: true,
        message: 'Tüm görseller doğrudan [product-slug]/ klasörlerine taşındı! "seo-images/" takısı kaldırıldı.',
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

        if (imageUrl.includes('/storage/v1/object/public/products/seo-images/')) {
          try {
            // Extract filename from old URL
            const urlObj = new URL(imageUrl);
            const filename = urlObj.pathname.split('/').pop() || `${productSlug}-eraydus-${i + 1}.jpg`;
            const newStoragePath = `${productSlug}/${filename}`;

            // Download image
            const response = await fetch(imageUrl);
            if (!response.ok) {
              newImages.push(imageUrl);
              continue;
            }

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const contentType = response.headers.get('content-type') || 'image/jpeg';

            // Upload directly to [productSlug]/[filename]
            const { error: uploadErr } = await supabase.storage
              .from('products')
              .upload(newStoragePath, buffer, {
                contentType,
                upsert: true
              });

            if (uploadErr) {
              console.error(`Taşıma hatası (${newStoragePath}):`, uploadErr.message);
              errors.push(`Görsel taşınamadı: ${uploadErr.message}`);
              newImages.push(imageUrl);
              continue;
            }

            // Get Public URL
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
            console.error(`Görsel kopyalama hatası (${imageUrl}):`, err.message);
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
