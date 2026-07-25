const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Hata: SUPABASE_URL veya SUPABASE_KEY .env.local içerisinde bulunamadı.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Robust CSV parser capable of handling multiline quoted cells
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
        i++; // skip escaped quote
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

function slugify(text) {
  if (!text) return '';
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

async function importWooCommerceCSV(filePath) {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  
  if (!fs.existsSync(absolutePath)) {
    console.error(`Hata: Dosya bulunamadı: ${absolutePath}`);
    process.exit(1);
  }

  console.log(`CSV Okunuyor: ${absolutePath}`);
  const fileContent = fs.readFileSync(absolutePath, 'utf8');
  const rows = parseCSV(fileContent);

  if (rows.length < 2) {
    console.error('Hata: CSV dosyasında yeterli veri bulunamadı.');
    process.exit(1);
  }

  const headers = rows[0].map(h => h.replace(/^"/, '').replace(/"$/, '').trim());
  console.log(`CSV Başlıkları (${headers.length} sütun):`, headers.slice(0, 10).join(', ') + '...');

  // Map header indexes
  const getIndex = (name) => headers.findIndex(h => h.toLowerCase() === name.toLowerCase());

  const idxId = getIndex('Kimlik');
  const idxSku = getIndex('Stok kodu (SKU)');
  const idxName = getIndex('İsim');
  const idxPublished = getIndex('Yayımlanmış');
  const idxFeatured = getIndex('Öne çıkan?');
  const idxShortDesc = getIndex('Kısa açıklama');
  const idxDesc = getIndex('Açıklama');
  const idxRegularPrice = getIndex('Normal fiyat');
  const idxSalePrice = getIndex('İndirimli satış fiyatı');
  const idxCategories = getIndex('Kategoriler');
  const idxImages = getIndex('Görseller');

  console.log(`Bulunan sütun indeksleri: İsim=${idxName}, SKU=${idxSku}, Fiyat=${idxRegularPrice}, Kategoriler=${idxCategories}`);

  // Fetch or create categories cache
  const { data: existingCategories, error: catError } = await supabase.from('categories').select('*');
  if (catError) {
    console.error('Kategoriler çekilirken hata oluştu:', catError);
  }

  const categoryMap = new Map();
  if (existingCategories) {
    existingCategories.forEach(c => categoryMap.set(c.name.toLowerCase(), c.id));
  }

  const productRows = rows.slice(1);
  console.log(`İşlenecek Toplam Satır Sayısı: ${productRows.length}`);

  let importedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < productRows.length; i++) {
    const row = productRows[i];
    const name = row[idxName] || '';
    if (!name) {
      skippedCount++;
      continue;
    }

    const rawSku = row[idxSku] || '';
    const rawId = row[idxId] || '';
    const sku = rawSku ? rawSku.trim() : `eray-${rawId || i + 1}`;
    const slug = slugify(name) || `urun-${rawId || i + 1}`;
    
    // Process Category
    const categoryString = row[idxCategories] || 'Genel';
    const mainCategoryName = categoryString.split('>')[0].split(',')[0].trim();
    let categoryId = categoryMap.get(mainCategoryName.toLowerCase());

    if (!categoryId && mainCategoryName) {
      const catSlug = slugify(mainCategoryName);
      const { data: newCat, error: createCatErr } = await supabase
        .from('categories')
        .insert([{ name: mainCategoryName, slug: catSlug, status: 'active' }])
        .select()
        .single();

      if (newCat) {
        categoryId = newCat.id;
        categoryMap.set(mainCategoryName.toLowerCase(), categoryId);
        console.log(`Yeni kategori oluşturuldu: ${mainCategoryName} (${categoryId})`);
      } else if (createCatErr) {
        console.warn(`Kategori oluşturulamadı: ${mainCategoryName}`, createCatErr.message);
      }
    }

    // Process Prices
    const regPriceStr = (row[idxRegularPrice] || '').replace(',', '.');
    const salePriceStr = (row[idxSalePrice] || '').replace(',', '.');

    const regularPrice = regPriceStr ? parseFloat(regPriceStr) : null;
    const salePrice = salePriceStr ? parseFloat(salePriceStr) : null;
    const basePrice = salePrice || regularPrice || 0;
    const startingPrice = regularPrice && salePrice ? regularPrice : basePrice;

    // Process Images
    const rawImages = row[idxImages] || '';
    const imagesArray = rawImages
      ? rawImages.split(',').map(u => u.trim()).filter(u => u.startsWith('http'))
      : [];

    const isPublished = row[idxPublished] === '1' || row[idxPublished] === 1;
    const isFeatured = row[idxFeatured] === '1' || row[idxFeatured] === 1;

    const productPayload = {
      sku,
      slug,
      name,
      short_description: row[idxShortDesc] || null,
      description: row[idxDesc] || null,
      category_id: categoryId || null,
      base_price: basePrice,
      starting_price: startingPrice,
      sale_price: salePrice,
      status: isPublished ? 'active' : 'draft',
      featured: isFeatured,
      images: imagesArray.length > 0 ? imagesArray : null,
      updated_at: new Date().toISOString()
    };

    // Upsert by SKU
    const { data: upserted, error: upsertErr } = await supabase
      .from('products')
      .upsert(productPayload, { onConflict: 'sku' })
      .select('id, name, sku');

    if (upsertErr) {
      // Try fallback by slug if SKU conflict has issue
      const { error: slugUpsertErr } = await supabase
        .from('products')
        .upsert(productPayload, { onConflict: 'slug' });
      
      if (slugUpsertErr) {
        console.error(`[HATA] Ürün aktarılamadı "${name}":`, upsertErr.message);
        skippedCount++;
      } else {
        importedCount++;
      }
    } else {
      importedCount++;
    }
  }

  console.log('\n=========================================');
  console.log(`✅ İçe Aktarma Tamamlandı!`);
  console.log(`Başarıyla Aktarılan/Güncellenen Ürün: ${importedCount}`);
  console.log(`Atlanan/Hatalı Ürün Sayısı: ${skippedCount}`);
  console.log('=========================================\n');
}

const targetFile = process.argv[2] || 'wc-product-export-25-7-2026-1784970277201.csv';
importWooCommerceCSV(targetFile).catch(err => {
  console.error('Kritik Hata:', err);
  process.exit(1);
});
