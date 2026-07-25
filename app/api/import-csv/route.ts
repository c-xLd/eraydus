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

function slugify(text: string): string {
  if (!text) return '';
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
    const filePath = path.resolve(process.cwd(), 'wc-product-export-25-7-2026-1784970277201.csv');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: `CSV dosyası bulunamadı: ${filePath}` }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const rows = parseCSV(fileContent);

    if (rows.length < 2) {
      return NextResponse.json({ error: 'CSV dosyasında yeterli ürün verisi yok.' }, { status: 400 });
    }

    const headers = rows[0].map(h => h.replace(/^"/, '').replace(/"$/, '').trim());
    const getIndex = (name: string) => headers.findIndex(h => h.toLowerCase() === name.toLowerCase());

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

    // Fetch existing categories
    const { data: existingCategories } = await supabase.from('categories').select('*');
    const categoryMap = new Map<string, string>();
    if (existingCategories) {
      existingCategories.forEach(c => categoryMap.set(c.name.toLowerCase(), c.id));
    }

    const productRows = rows.slice(1);
    let importedCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

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

      // Category handling
      const categoryString = row[idxCategories] || 'Genel';
      const mainCategoryName = categoryString.split('>')[0].split(',')[0].trim();
      let categoryId = categoryMap.get(mainCategoryName.toLowerCase());

      if (!categoryId && mainCategoryName) {
        const catSlug = slugify(mainCategoryName);
        const { data: newCat } = await supabase
          .from('categories')
          .insert([{ name: mainCategoryName, slug: catSlug, status: 'active' }])
          .select()
          .single();

        if (newCat) {
          categoryId = newCat.id;
          categoryMap.set(mainCategoryName.toLowerCase(), newCat.id);
        }
      }

      // Prices
      const regPriceStr = (row[idxRegularPrice] || '').replace(',', '.');
      const salePriceStr = (row[idxSalePrice] || '').replace(',', '.');

      const regularPrice = regPriceStr ? parseFloat(regPriceStr) : null;
      const salePrice = salePriceStr ? parseFloat(salePriceStr) : null;
      const basePrice = salePrice || regularPrice || 0;
      const startingPrice = regularPrice && salePrice ? regularPrice : basePrice;

      // Images
      const rawImages = row[idxImages] || '';
      const imagesArray = rawImages
        ? rawImages.split(',').map(u => u.trim()).filter(u => u.startsWith('http'))
        : [];

      const isPublished = row[idxPublished] === '1' || row[idxPublished] === 'true';
      const isFeatured = row[idxFeatured] === '1' || row[idxFeatured] === 'true';

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

      const { error: upsertErr } = await supabase
        .from('products')
        .upsert(productPayload, { onConflict: 'sku' });

      if (upsertErr) {
        const { error: slugUpsertErr } = await supabase
          .from('products')
          .upsert(productPayload, { onConflict: 'slug' });

        if (slugUpsertErr) {
          errors.push(`Ürün "${name}" aktarılamadı: ${upsertErr.message}`);
          skippedCount++;
        } else {
          importedCount++;
        }
      } else {
        importedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `İçe aktarma tamamlandı.`,
      importedCount,
      skippedCount,
      errors: errors.slice(0, 10)
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Sunucu hatası' }, { status: 500 });
  }
}
