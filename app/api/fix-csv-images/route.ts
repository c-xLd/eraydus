import { NextResponse } from 'next/server';
import { createClient } from '@/lib/server';
import fs from 'fs';
import path from 'path';

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell.trim());
      if (currentRow.length > 0 && currentRow.some(c => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some(c => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const filePath = path.resolve(process.cwd(), 'wc-product-export-25-7-2026-1784970277201.csv');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'CSV dosyası bulunamadı.' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const rows = parseCSV(fileContent);

    const headers = rows[0].map(h => h.replace(/^"/, '').replace(/"$/, '').trim());
    const idxId = headers.findIndex(h => h.includes('Kimlik') || h.includes('kimlik'));
    const idxSku = headers.findIndex(h => h.includes('SKU') || h.includes('sku') || h.includes('Stok'));
    const idxName = headers.findIndex(h => h.includes('İsim') || h.includes('isim') || h.includes('Name'));
    const idxImages = headers.findIndex(h => h.includes('Görseller') || h.includes('görseller') || h.includes('Images'));

    const csvBySku = new Map<string, string>();
    const csvByName = new Map<string, string>();
    const csvById = new Map<string, string>();

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const id = (row[idxId] || '').trim();
      const sku = (row[idxSku] || '').trim();
      const name = (row[idxName] || '').trim();
      const imagesStr = (row[idxImages] || '').trim();

      if (imagesStr) {
        if (sku) csvBySku.set(sku.toLowerCase(), imagesStr);
        if (id) csvById.set(id.toLowerCase(), imagesStr);
        if (name) csvByName.set(name.toLowerCase(), imagesStr);
      }
    }

    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, sku, slug, images');

    if (error || !products) {
      return NextResponse.json({ error: error?.message || 'Ürünler alınamadı' }, { status: 500 });
    }

    // Filter products whose images do NOT point to their own products/[slug]/ folder
    const brokenProducts = products.filter(p => {
      const imgs: string[] = Array.isArray(p.images) ? p.images : [];
      if (imgs.length === 0) return true;
      return imgs.some(u => u.includes('unsplash.com') || u.includes('/imports/') || !u.includes(`/${p.slug}/`));
    });

    if (brokenProducts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Tüm ürün görselleri kendi klasörlerinde yer alıyor ve eski görseller temizlendi!',
        remainingCount: 0
      });
    }

    const batch = brokenProducts.slice(0, limit);
    let repairedCount = 0;
    let oldFilesCleanedCount = 0;

    for (const product of batch) {
      const oldImgs: string[] = Array.isArray(product.images) ? product.images : [];
      const newPublicUrls: string[] = [];
      const oldStoragePathsToRemove: string[] = [];

      // Step 1: Rapid Storage Copy for images already in Supabase Storage
      for (let idx = 0; idx < oldImgs.length; idx++) {
        const oldUrl = oldImgs[idx];
        if (oldUrl.includes('.supabase.co/storage/v1/object/public/products/')) {
          const relativePath = oldUrl.split('/products/')[1];
          if (relativePath && !relativePath.startsWith(`${product.slug}/`)) {
            const ext = relativePath.endsWith('.png') ? 'png' : relativePath.endsWith('.webp') ? 'webp' : 'jpg';
            const newStoragePath = `${product.slug}/${product.slug}-eraydus-${idx + 1}.${ext}`;

            const { error: copyErr } = await supabase.storage
              .from('products')
              .copy(relativePath, newStoragePath);

            if (!copyErr || copyErr.message?.includes('already exists')) {
              const { data: pubData } = supabase.storage
                .from('products')
                .getPublicUrl(newStoragePath);

              if (pubData?.publicUrl) {
                newPublicUrls.push(pubData.publicUrl);
                oldStoragePathsToRemove.push(relativePath);
              }
            }
          } else if (relativePath && relativePath.startsWith(`${product.slug}/`)) {
            newPublicUrls.push(oldUrl);
          }
        }
      }

      // Step 2: If no image found in storage, download from CSV
      if (newPublicUrls.length === 0) {
        const skuLower = (product.sku || '').toLowerCase();
        const nameLower = (product.name || '').toLowerCase();
        let csvImagesStr = csvBySku.get(skuLower) || csvByName.get(nameLower);

        if (!csvImagesStr) {
          for (const [cId, cImgs] of csvById.entries()) {
            if (skuLower.includes(cId)) {
              csvImagesStr = cImgs;
              break;
            }
          }
        }

        const rawCsvUrls = csvImagesStr
          ? csvImagesStr.split(',').map(u => u.trim()).filter(u => u.startsWith('http'))
          : [];

        for (let imgIdx = 0; imgIdx < rawCsvUrls.length; imgIdx++) {
          const sourceUrl = rawCsvUrls[imgIdx];
          try {
            const res = await fetch(sourceUrl, {
              headers: { 'User-Agent': 'Mozilla/5.0' },
              signal: AbortSignal.timeout(3000)
            });

            if (res.ok) {
              const arrayBuffer = await res.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              let ext = 'jpg';
              const cleanUrl = sourceUrl.split('?')[0];
              if (cleanUrl.endsWith('.png')) ext = 'png';
              else if (cleanUrl.endsWith('.webp')) ext = 'webp';

              const storagePath = `${product.slug}/${product.slug}-eraydus-${imgIdx + 1}.${ext}`;

              const { error: uploadErr } = await supabase.storage
                .from('products')
                .upload(storagePath, buffer, {
                  contentType: res.headers.get('content-type') || `image/${ext === 'jpg' ? 'jpeg' : ext}`,
                  upsert: true
                });

              if (!uploadErr) {
                const { data: pubData } = supabase.storage
                  .from('products')
                  .getPublicUrl(storagePath);

                if (pubData?.publicUrl) {
                  newPublicUrls.push(pubData.publicUrl);
                }
              }
            }
          } catch (e) {}
        }
      }

      // Step 3: Remove old storage paths
      if (oldStoragePathsToRemove.length > 0) {
        const { data: removedFiles } = await supabase.storage
          .from('products')
          .remove(oldStoragePathsToRemove);

        if (removedFiles) {
          oldFilesCleanedCount += removedFiles.length;
        }
      }

      // Step 4: Fallback placeholder if empty
      if (newPublicUrls.length === 0) {
        newPublicUrls.push('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80');
      }

      await supabase
        .from('products')
        .update({ images: newPublicUrls, updated_at: new Date().toISOString() })
        .eq('id', product.id);

      repairedCount++;
    }

    return NextResponse.json({
      success: true,
      batchSize: batch.length,
      remainingCount: brokenProducts.length - batch.length,
      repairedCount,
      oldFilesCleanedCount
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Sunucu hatası' }, { status: 500 });
  }
}
