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

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const filePath = path.resolve(process.cwd(), 'wc-product-export-25-7-2026-1784970277201.csv');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'CSV dosyası bulunamadı.' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const rows = parseCSV(fileContent);

    if (rows.length < 2) {
      return NextResponse.json({ error: 'Geçersiz CSV içeriği.' }, { status: 400 });
    }

    const headers = rows[0].map(h => h.replace(/^"/, '').replace(/"$/, '').trim());
    const idxId = headers.findIndex(h => h.includes('Kimlik') || h.includes('kimlik'));
    const idxSku = headers.findIndex(h => h.includes('SKU') || h.includes('sku') || h.includes('Stok'));
    const idxName = headers.findIndex(h => h.includes('İsim') || h.includes('isim') || h.includes('Name') || h.includes('name'));

    if (idxName === -1) {
      return NextResponse.json({ error: 'CSV içerisinde "İsim" sütunu bulunamadı.', headers }, { status: 400 });
    }

    const productRows = rows.slice(1);
    let updatedCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < productRows.length; i++) {
      const row = productRows[i];
      const originalName = (row[idxName] || '').trim();
      if (!originalName) continue;

      const rawSku = (row[idxSku] || '').trim();
      const rawId = (row[idxId] || '').trim();
      const sku = rawSku || `eray-${rawId || i + 1}`;
      const newSlug = slugify(originalName) || `urun-${rawId || i + 1}`;

      const updatePayload = {
        name: originalName,
        slug: newSlug,
        meta_title: `${originalName} | Erayduş`,
        updated_at: new Date().toISOString()
      };

      const { error: updateErr } = await supabase
        .from('products')
        .update(updatePayload)
        .eq('sku', sku);

      if (updateErr) {
        await supabase
          .from('products')
          .update(updatePayload)
          .eq('sku', `eray-${rawId}`);
      }
      updatedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `${updatedCount} ürün adları CSV dosyasındaki ilk orijinal haline döndürüldü!`,
      updatedCount,
      errors
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Sunucu hatası' }, { status: 500 });
  }
}
