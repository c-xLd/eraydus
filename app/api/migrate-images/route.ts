import { NextResponse } from 'next/server';
import { createClient } from '@/lib/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Fetch products that still have external images (containing eraydus.net or not containing supabase.co)
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, sku, images')
      .not('images', 'is', null)
      .limit(100);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!products || products.length === 0) {
      return NextResponse.json({ success: true, message: 'İşlenecek ürün kalmadı.', remainingCount: 0 });
    }

    // Filter products that have at least one external image (not in supabase storage)
    const pendingProducts = products.filter(p => {
      const rawImages: string[] = Array.isArray(p.images) ? p.images : [];
      return rawImages.some(img => img.startsWith('http') && !img.includes('.supabase.co/storage/'));
    }).slice(0, limit);

    if (pendingProducts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Tüm görseller zaten Supabase Storage alanında barındırılıyor!',
        remainingCount: 0
      });
    }

    let updatedProductsCount = 0;
    let totalImagesUploaded = 0;
    const errors: string[] = [];

    for (const product of pendingProducts) {
      const rawImages: string[] = Array.isArray(product.images) ? product.images : [];
      let hasChanges = false;
      const newImages: string[] = [];

      for (let i = 0; i < rawImages.length; i++) {
        const imageUrl = rawImages[i];

        if (imageUrl.includes('.supabase.co/storage/')) {
          newImages.push(imageUrl);
          continue;
        }

        if (imageUrl.startsWith('http')) {
          try {
            const response = await fetch(imageUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
              }
            });

            if (!response.ok) {
              console.warn(`Görsel indirilemedi (${response.status}): ${imageUrl}`);
              newImages.push(imageUrl);
              continue;
            }

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const contentType = response.headers.get('content-type') || 'image/jpeg';

            const urlObj = new URL(imageUrl);
            let filename = urlObj.pathname.split('/').pop() || `img_${Date.now()}_${i}.jpg`;
            filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
            const storagePath = `imports/${product.sku || product.id}/${filename}`;

            const { error: uploadErr } = await supabase.storage
              .from('products')
              .upload(storagePath, buffer, {
                contentType,
                upsert: true
              });

            if (uploadErr) {
              console.error(`Storage yükleme hatası (${filename}):`, uploadErr.message);
              errors.push(`Görsel yüklenemedi: ${uploadErr.message}`);
              newImages.push(imageUrl);
              continue;
            }

            const { data: publicUrlData } = supabase.storage
              .from('products')
              .getPublicUrl(storagePath);

            if (publicUrlData?.publicUrl) {
              newImages.push(publicUrlData.publicUrl);
              hasChanges = true;
              totalImagesUploaded++;
            } else {
              newImages.push(imageUrl);
            }
          } catch (err: any) {
            console.error(`Görsel hatası (${imageUrl}):`, err.message);
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
      totalImagesUploaded,
      errors: errors.slice(0, 5)
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Sunucu hatası' }, { status: 500 });
  }
}
