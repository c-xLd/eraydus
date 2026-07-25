import { NextResponse } from 'next/server';
import { createClient } from '@/lib/server';

function generateSKU(productName: string, categoryName: string, index: number): string {
  const name = productName.toUpperCase().trim();
  const cat = (categoryName || '').toUpperCase();

  let prefix = 'DK';
  if (cat.includes('DOLAB') || name.includes('DOLAB') || name.includes('ORJIN') || name.includes('RUSTICA') || name.includes('DOLCE') || name.includes('EFES')) {
    prefix = 'BD';
  } else if (cat.includes('KATLANIR') || name.includes('KATLANIR') || name.includes('LIVORNO')) {
    prefix = 'KD';
  } else if (cat.includes('MENTEŞE') || cat.includes('PIVOT') || name.includes('MENTEŞE') || name.includes('NM-') || name.includes('BM-')) {
    prefix = 'PD';
  } else if (cat.includes('ASKILI') || cat.includes('SÜRGÜLÜ') || name.includes('PASLANMAZ') || name.includes('PS-')) {
    prefix = 'SD';
  }

  const trMap: Record<string, string> = { 'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'I': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U' };
  const cleanName = name.replace(/[ÇĞİIÖŞÜ]/g, (m) => trMap[m] || m);

  // Extract model codes like L-018, NM-013, PS-012, BM-007, 65, 01
  const codeMatch = cleanName.match(/([A-Z]{1,3}[-–\s]*\d{2,4}|\b\d{2,3}\b)/i);
  let codeSnippet = '';
  if (codeMatch) {
    codeSnippet = codeMatch[0].replace(/[\s–]/g, '-').toUpperCase();
  }

  let words = cleanName
    .replace(/^ERAYDUS\s+/i, '')
    .replace(/DUSAKABIN|BANYO|DOLABI|TAKIMI|SERISI|SERIES|MODELLERI/g, '')
    .replace(/[^A-Z0-9\s-]/g, '')
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0);

  let coreName = words[0] || 'MODEL';

  let skuCandidate = `${prefix}-${coreName}`;
  if (codeSnippet && !skuCandidate.includes(codeSnippet)) {
    skuCandidate += `-${codeSnippet}`;
  }

  let finalSku = skuCandidate.replace(/[^A-Z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');

  if (!finalSku || finalSku.length < 4) {
    finalSku = `${prefix}-MODEL-${index + 100}`;
  }

  return finalSku;
}

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, sku, category:categories(name)');

    if (error || !products) {
      return NextResponse.json({ error: error?.message || 'Ürünler alınamadı' }, { status: 500 });
    }

    const skuMap = new Map<string, number>();
    let updatedCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const categoryName = (product as any).category?.name || '';
      let baseSku = generateSKU(product.name, categoryName, i);

      // Handle duplicate SKUs by appending sequence numbers (-02, -03)
      const count = (skuMap.get(baseSku) || 0) + 1;
      skuMap.set(baseSku, count);

      const uniqueSku = count > 1 ? `${baseSku}-${String(count).padStart(2, '0')}` : baseSku;

      const { error: updateErr } = await supabase
        .from('products')
        .update({ sku: uniqueSku, updated_at: new Date().toISOString() })
        .eq('id', product.id);

      if (updateErr) {
        errors.push(`Ürün "${product.name}" SKU güncellenemedi: ${updateErr.message}`);
      } else {
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `${updatedCount} ürünün SKU stok kodları kurumsal formatta başarıyla güncellendi!`,
      updatedCount,
      errors: errors.slice(0, 5)
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Sunucu hatası' }, { status: 500 });
  }
}
