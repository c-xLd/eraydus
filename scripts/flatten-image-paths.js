const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Hata: SUPABASE_URL veya SUPABASE_KEY bulunamadı.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function slugify(text) {
  if (!text) return 'eraydus-urun';
  const trMap = {
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

async function flattenImagePaths() {
  console.log('--- Görselleri [product-slug]/ Kök Klasörlerine Taşıma Başlatıldı ---');

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, sku, slug, images')
    .not('images', 'is', null);

  if (error) {
    console.error('Ürünler çekilirken hata:', error);
    process.exit(1);
  }

  console.log(`Veritabanında ${products.length} ürün inceleniyor...`);

  let updatedProductsCount = 0;
  let totalImagesMoved = 0;

  for (let pIdx = 0; pIdx < products.length; pIdx++) {
    const product = products[pIdx];
    const rawImages = Array.isArray(product.images) ? product.images : [];
    if (rawImages.length === 0) continue;

    const productSlug = product.slug || slugify(product.name);
    const newImages = [];
    let hasChanges = false;

    for (let i = 0; i < rawImages.length; i++) {
      const imageUrl = rawImages[i];

      // If image is in seo-images/ or imports/, flatten to [productSlug]/[filename]
      if (imageUrl.includes('/seo-images/') || imageUrl.includes('/imports/')) {
        try {
          const urlObj = new URL(imageUrl);
          const parts = urlObj.pathname.split('/');
          let filename = parts[parts.length - 1];
          if (!filename || !filename.includes('.')) {
            filename = `${productSlug}-eraydus-${i + 1}.jpg`;
          }

          const newStoragePath = `${productSlug}/${filename}`;

          // Download image buffer
          const response = await fetch(imageUrl);
          if (!response.ok) {
            console.warn(`Görsel indirilemedi (${response.status}): ${imageUrl}`);
            newImages.push(imageUrl);
            continue;
          }

          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const contentType = response.headers.get('content-type') || 'image/jpeg';

          // Upload directly to [productSlug]/[filename] in products bucket
          const { error: uploadErr } = await supabase.storage
            .from('products')
            .upload(newStoragePath, buffer, {
              contentType,
              upsert: true
            });

          if (uploadErr) {
            console.error(`Storage yükleme hatası (${newStoragePath}):`, uploadErr.message);
            newImages.push(imageUrl);
            continue;
          }

          const { data: publicUrlData } = supabase.storage
            .from('products')
            .getPublicUrl(newStoragePath);

          if (publicUrlData && publicUrlData.publicUrl) {
            newImages.push(publicUrlData.publicUrl);
            hasChanges = true;
            totalImagesMoved++;
          } else {
            newImages.push(imageUrl);
          }
        } catch (err) {
          console.error(`İşlem hatası (${imageUrl}):`, err.message);
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
        console.log(`[${updatedProductsCount}/${products.length}] Ürün taşındı: ${product.name} -> ${productSlug}/`);
      } else {
        console.error(`Ürün güncellenemedi (${product.name}):`, updateErr.message);
      }
    }
  }

  console.log('\n=========================================');
  console.log(`✅ Görsel Yolları Düzleştirildi!`);
  console.log(`Güncellenen Ürün Sayısı: ${updatedProductsCount}`);
  console.log(`Taşınan Görsel Sayısı: ${totalImagesMoved}`);
  console.log('=========================================\n');
}

flattenImagePaths().catch(err => {
  console.error('Kritik Hata:', err);
  process.exit(1);
});
