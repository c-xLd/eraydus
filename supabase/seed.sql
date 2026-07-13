-- Seed Collections
INSERT INTO public.collections (id, slug, name, description, status)
VALUES 
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'edge', 'EDGE Serisi', 'Ultra ince profillerle minimalist tasarım.', 'active'),
  ('b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'pure', 'PURE Serisi', 'Tamamen çerçevesiz, kapısız ve eşiksiz.', 'active'),
  ('c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'luxury', 'LUXURY Serisi', 'Soft-close teknolojisine sahip sürgülü sistemler.', 'active')
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- Seed Categories
INSERT INTO public.categories (id, slug, name, sort_order, status)
VALUES 
  ('d4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'dusakabin', 'Duşakabin', 1, 'active')
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

-- Seed Products
INSERT INTO public.products (
  sku, slug, name, short_description, description, 
  collection_id, category_id, base_price, starting_price, 
  status, featured, new_product, best_seller
) VALUES 
  (
    'EDGE-CRN', 'edge-corner', 'Edge Köşe Kabin', 
    'Ultra ince profillerle tasarlanmış, banyonun köşesine mükemmel uyum sağlayan minimalist çözüm.',
    'Edge Köşe Kabin, 12mm ultra ince alüminyum profilleri ve net geometrik hatlarıyla modern banyoların vazgeçilmezi. Köşe yerleşimi sayesinde alan tasarrufu sağlarken, camın şeffaflığıyla mekânı olduğundan daha geniş gösterir. Özel gizli menteşe sistemi, dışarıdan hiçbir vida veya bağlantı elemanı görünmeyecek şekilde tasarlanmıştır.',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'd4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 
    8500.00, 8500.00, 'active', true, false, false
  ),
  (
    'PURE-WLK', 'pure-walkin', 'Pure Walk-in', 
    'Tamamen çerçevesiz, kapısız ve eşiksiz. Maksimum şeffaflık ve özgürlük hissi için tasarlandı.',
    'Pure Walk-in, duş deneyimini tamamen açık ve özgür kılan bir mimari harikadır. Yerde eşik olmaması ve kapı kullanılmaması sayesinde banyoyla bütünleşir. 10mm veya 12mm kalınlığındaki temperli camlar, sadece zeminden ve duvardan gizli kanallarla sabitlenerek havada süzülüyor hissi yaratır.',
    'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'd4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 
    12000.00, 12000.00, 'active', true, false, false
  ),
  (
    'LUX-SLD', 'luxury-sliding', 'Luxury Sürgülü', 
    'Soft-close teknolojisine sahip, üst düzey akustik izolasyon sunan imza niteliğindeki sürgülü sistem.',
    'Luxury Sürgülü, endüstriyel rulman teknolojisini lüks tasarımla buluşturuyor. Üst ray üzerinde sessizce ve zahmetsizce kayan ağır cam paneller, özel amortisör (soft-close) sistemi sayesinde yavaşça kapanır. Dar alanlarda maksimum giriş genişliği sağlarken akustik fitilleriyle suyu ve sesi içeride tutar.',
    'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'd4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 
    16500.00, 16500.00, 'active', true, false, false
  ),
  (
    'EDGE-PVT', 'edge-pivot', 'Edge Pivot (İki Duvar Arası)', 
    'İki duvar arası niş alanlar için tasarlanmış, merkez eksenli açılan minimalist pivot kapı.',
    'Banyonuzdaki niş alanları mükemmel şekilde değerlendirin. Edge Pivot, dış çerçeve olmaksızın, zemine ve tavana gizlenmiş pivot menteşeler üzerinde döner. Geniş açılım açısı sayesinde engelsiz bir giriş sunar. Manyetik kapanma mekanizması su sızıntısını sıfıra indirir.',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'd4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 
    9200.00, 9200.00, 'active', true, false, false
  )
ON CONFLICT (sku) DO UPDATE 
SET 
  name = EXCLUDED.name, 
  short_description = EXCLUDED.short_description, 
  description = EXCLUDED.description, 
  base_price = EXCLUDED.base_price, 
  starting_price = EXCLUDED.starting_price;

-- Public blog posts shown on /blog after the admin features schema is applied.
INSERT INTO public.content_calendar (
  title, slug, content_type, description, body, language, status,
  featured_image, published_at, seo_title, seo_description, tags
) VALUES
  (
    'Duşakabin Seçerken Dikkat Edilmesi Gerekenler',
    'dusakabin-secerken-dikkat-edilmesi-gerekenler',
    'blog',
    'Banyonuz için doğru duşakabini seçerken ölçü, cam kalınlığı ve kullanım alışkanlıklarını birlikte değerlendirin.',
    E'Doğru duşakabin, banyonun hem konforunu hem de mekânsal algısını belirler. İlk adım, net ölçüleri ve kapının açılım alanını değerlendirmektir.\n\nCam kalınlığı, profil yapısı ve menteşe kalitesi uzun ömürlü bir kullanım için önemlidir. Günlük temizlik alışkanlığınıza uygun cam koruma seçenekleri de karar sürecini kolaylaştırır.\n\nERAYDUŞ uzmanları, banyonuzun ölçülerine ve yaşam tarzınıza göre en uygun sistemi belirlemenize yardımcı olur.',
    'tr', 'published',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
    '2026-07-01T09:00:00+03:00',
    'Duşakabin Seçim Rehberi | ERAYDUŞ',
    'Duşakabin seçerken ölçü, cam ve kullanım detaylarını keşfedin.',
    ARRAY['duşakabin', 'banyo tasarımı', 'rehber']
  ),
  (
    'Küçük Banyolar İçin Ferah Tasarım Önerileri',
    'kucuk-banyolar-icin-ferah-tasarim-onerileri',
    'blog',
    'Şeffaf cam yüzeyler, doğru aydınlatma ve yalın detaylarla küçük banyolarda daha geniş bir his yaratın.',
    E'Küçük banyolarda tasarımın ana hedefi, gereksiz görsel sınırları azaltmaktır. Çerçevesiz cam yüzeyler alanın kesintisiz algılanmasına yardımcı olur.\n\nAçık tonlar, katmanlı aydınlatma ve duvar içine yerleşen depolama çözümleri günlük kullanımda büyük fark yaratır.\n\nWalk-in duş sistemleri, eşiksiz geçişleri sayesinde hem çağdaş hem de ferah bir görünüm sunar.',
    'tr', 'published',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
    '2026-06-24T09:00:00+03:00',
    'Küçük Banyo Tasarımı | ERAYDUŞ',
    'Küçük banyoları ferah ve işlevsel kılan tasarım önerileri.',
    ARRAY['küçük banyo', 'walk-in', 'dekorasyon']
  )
ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL DO UPDATE
SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  updated_at = now();
