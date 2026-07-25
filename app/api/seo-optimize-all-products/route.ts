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

function generateSEOTitle(rawName: string, categoryName: string): { titleName: string; metaTitle: string } {
  let name = rawName.trim();
  name = name.replace(/^Erayduş\s+/i, '').trim();

  const catLower = (categoryName || '').toLowerCase();

  if (catLower.includes('dolab') || name.toLowerCase().includes('dolab')) {
    if (!name.toLowerCase().includes('banyo')) {
      name = `${name} Banyo Dolabı Takımı`;
    }
  } else if (catLower.includes('katlanır') || name.toLowerCase().includes('katlanır')) {
    if (!name.toLowerCase().includes('duşakabin')) {
      name = `${name} Katlanır Cam Duşakabin`;
    }
  } else if (catLower.includes('menteşe') || catLower.includes('pivot') || name.toLowerCase().includes('menteşe')) {
    if (!name.toLowerCase().includes('duşakabin')) {
      name = `${name} Pivot Cam Duşakabin`;
    }
  } else if (catLower.includes('askılı') || name.toLowerCase().includes('paslanmaz')) {
    if (!name.toLowerCase().includes('duşakabin')) {
      name = `${name} Paslanmaz Askılı Cam Duşakabin`;
    }
  } else if (!name.toLowerCase().includes('duşakabin')) {
    name = `${name} Cam Duşakabin`;
  }

  name = name.replace(/[-–\s]+0(\d)/, ' Series 0$1').trim();

  const fullTitleName = `Erayduş ${name}`;

  return {
    titleName: fullTitleName,
    metaTitle: `${fullTitleName} | Ankara Özel Ölçü`
  };
}

function generateSEODescription(name: string): { description: string; shortDesc: string } {
  const shortDesc = `${name}. 8mm Şişecam temperli cam, Nano-Shield kireç önleyici kaplama ve Ankara özel ölçü ücretsiz keşif imkanıyla banyonuzu yenileyin.`;

  const description = `${name}, modern banyo mimarisinde estetik ile yüksek mukavemeti bir araya getiren özel tasarım mimari çözümlerimizdendir. Banyonuzun mimari yapısına milimetrik uyum sağlayan tasarımıyla mekan içerisinde maksimum kullanım ferahlığı ve görsel derinlik kazandırır.

### Mimari Malzeme Standartları & Dayanıklılık
Tasarımda kullanılan 8 mm Şişecam üretimi yüksek mukavemetli temperli güvenlik camları, ısı farklarına ve mekanik darbelere karşı standart camlara kıyasla 5 kat daha dayanıklıdır. Cam yüzeyine entegre edilen özel Nano-Shield hidrofobik kaplama teknolojisi sayesinde su damlacıkları ve kireç tortuları cam yüzeyine tutunamayarak zahmetsiz temizlik imkanı sunar. Gövde profilleri elektrostatik fırınlanmış korozyona dayanıklı alüminyum/paslanmaz çelik aksamlardan üretilmiştir.

### Ankara İçi Ücretsiz Keşif & İmalat Garantisi
Ankara geneli (Çankaya, Ümitköy, Çayyolu, Yenimahalle, İncek) banyonuzun tam ölçülerine özel yerinde ücretsiz keşif ve milimetrik imalat yapılmaktadır. Uzman montaj ekibimiz tarafından 2 yıl sızdırmazlık ve malzeme garantisi ile kurulum gerçekleştirilmektedir.`;

  return { description, shortDesc };
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '30', 10);

    const { data: products, error } = await supabase
      .from('products')
      .select('*, category:categories(name)')
      .limit(100);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!products || products.length === 0) {
      return NextResponse.json({ success: true, message: 'İşlenecek ürün bulunamadı.', remainingCount: 0 });
    }

    // Filter products whose name does NOT start with Erayduş
    const pendingProducts = products.filter(p => !p.name.startsWith('Erayduş ')).slice(0, limit);

    if (pendingProducts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Tüm ürün başlıkları tekrar "Erayduş" takılı eski haline getirildi!',
        remainingCount: 0
      });
    }

    let updatedCount = 0;
    const errors: string[] = [];

    for (const product of pendingProducts) {
      const categoryName = product.category?.name || 'Duşakabin';
      const rawName = product.name || 'Duşakabin';

      const { titleName, metaTitle } = generateSEOTitle(rawName, categoryName);
      const newSlug = slugify(titleName);

      const { description, shortDesc } = generateSEODescription(titleName);
      const metaDescription = `${titleName}. 8mm Şişecam temperli cam, Nano-Shield kaplama ve Ankara özel ölçü imalatı. Fiyatlar ve detaylar için inceleyin.`;

      const updatePayload = {
        name: titleName,
        slug: newSlug,
        description: description,
        short_description: shortDesc,
        meta_title: metaTitle,
        meta_description: metaDescription,
        updated_at: new Date().toISOString()
      };

      const { error: updateErr } = await supabase
        .from('products')
        .update(updatePayload)
        .eq('id', product.id);

      if (updateErr) {
        errors.push(`Ürün "${titleName}" güncellenemedi: ${updateErr.message}`);
      } else {
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      batchSize: pendingProducts.length,
      updatedCount,
      errors
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Sunucu hatası' }, { status: 500 });
  }
}
