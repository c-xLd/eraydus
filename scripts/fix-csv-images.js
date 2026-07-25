const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase bilgileri .env.local dosyasında bulunamadı!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function parseCSV(text) {
  const rows = [];
  let currentRow = [];
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

async function run() {
  console.log("Starting CSV image repair script...");
  const filePath = path.resolve(process.cwd(), 'wc-product-export-25-7-2026-1784970277201.csv');

  if (!fs.existsSync(filePath)) {
    console.error("CSV dosyası bulunamadı:", filePath);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const rows = parseCSV(fileContent);

  const headers = rows[0].map(h => h.replace(/^"/, '').replace(/"$/, '').trim());
  const idxId = headers.findIndex(h => h.includes('Kimlik') || h.includes('kimlik'));
  const idxSku = headers.findIndex(h => h.includes('SKU') || h.includes('sku') || h.includes('Stok'));
  const idxName = headers.findIndex(h => h.includes('İsim') || h.includes('isim') || h.includes('Name'));
  const idxImages = headers.findIndex(h => h.includes('Görseller') || h.includes('görseller') || h.includes('Images'));

  const csvBySku = new Map();
  const csvByName = new Map();
  const csvById = new Map();

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
    console.error("Ürünler çekilemedi:", error);
    process.exit(1);
  }

  console.log(`Veritabanında toplam ${products.length} ürün inceleniyor...`);

  let repairedCount = 0;
  let totalUploaded = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const imgs = Array.isArray(product.images) ? product.images : [];
    
    // Determine if product needs image repair
    let isBroken = imgs.length === 0 || imgs.some(u => u.includes('unsplash.com') || u.includes('/imports/'));

    if (isBroken) {
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

      if (rawCsvUrls.length === 0) {
        console.log(`[${i + 1}/${products.length}] Ürün "${product.name}" için CSV'de kaynak görsel bulunamadı.`);
        continue;
      }

      console.log(`[${i + 1}/${products.length}] Ürün "${product.name}" için ${rawCsvUrls.length} görseller indiriliyor ve re-upload ediliyor...`);

      const newPublicUrls = [];

      for (let imgIdx = 0; imgIdx < rawCsvUrls.length; imgIdx++) {
        const sourceUrl = rawCsvUrls[imgIdx];
        try {
          const res = await fetch(sourceUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
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
                totalUploaded++;
              }
            } else {
              console.error(`Storage yükleme hatası (${storagePath}):`, uploadErr.message);
            }
          } else {
            console.warn(`Resim indirilemedi (${sourceUrl}): HTTP ${res.status}`);
          }
        } catch (e) {
          console.warn(`Resim indirme istisnası (${sourceUrl}):`, e.message);
        }
      }

      if (newPublicUrls.length > 0) {
        const { error: updateErr } = await supabase
          .from('products')
          .update({ images: newPublicUrls, updated_at: new Date().toISOString() })
          .eq('id', product.id);

        if (!updateErr) {
          repairedCount++;
          console.log(`✓ Ürün "${product.name}" görsel bağlantıları güncellendi!`);
        } else {
          console.error(`Ürün "${product.name}" DB güncelleme hatası:`, updateErr.message);
        }
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`İŞLEM TAMAMLANDI!`);
  console.log(`Tamir Edilen Ürün Sayısı: ${repairedCount}`);
  console.log(`Yüklenen Toplam Görsel: ${totalUploaded}`);
  console.log(`========================================\n`);
}

run();
