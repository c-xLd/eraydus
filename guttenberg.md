ERAYDUŞ projesine Gutenberg benzeri block-based bir içerik yönetim sistemi ekle.

Bu sistem WordPress Gutenberg mantığında çalışmalı ancak Next.js 15 + Supabase mimarisine uygun, çok daha performanslı ve SEO odaklı olmalı.

TEKNOLOJİ
- Next.js 15 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS
- Shadcn/UI
- Tiptap editor
- Supabase PostgreSQL
- Supabase Storage

MİMARİ
İçerikleri raw HTML olarak değil, JSON block yapısı olarak Supabase JSONB alanında sakla.

Örnek tablo:
pages
- id
- slug
- title
- blocks (jsonb)
- seo (jsonb)
- status
- created_at
- updated_at

DESTEKLENEN BLOCKLAR
- hero
- text
- image
- gallery
- video
- cta
- quote
- product_showcase
- comparison_table
- faq
- spacer
- divider
- two_column
- three_column

ADMIN PANEL
Admin panelinde sürükle-bırak (drag & drop) block düzenleme sistemi oluştur.

Özellikler:
- Block ekle
- Block sil
- Block kopyala
- Block taşı
- Block düzenle
- Canlı önizleme
- Otomatik kaydet
- Taslak / Yayınla
- Versiyon geçmişi

MOBİL DENEYİMİ
Editör ve önizleme mobilde native app hissi vermeli.
- Bottom sheet kullan
- Touch-friendly butonlar
- 48px minimum tap target
- Safe area desteği
- Yatay swipe desteği

SEO (ZORUNLU)
Her sayfa için otomatik:
- generateMetadata()
- Title
- Meta description
- Open Graph
- Twitter Card
- Canonical URL
- JSON-LD structured data
- Breadcrumb schema
- FAQ schema (faq block varsa)
- Product schema (product_showcase varsa)
- Semantic heading hierarchy

PERFORMANS (ZORUNLU)
Hedefler:
- Lighthouse Desktop: 100
- Lighthouse Mobile: 95+
- Core Web Vitals: PASS
- LCP < 2s
- INP < 200ms
- CLS < 0.1

Uygulanacak optimizasyonlar:
- Server Components kullan
- Gereksiz "use client" kullanma
- next/image kullan
- AVIF/WebP üret
- Lazy loading uygula
- Dynamic import kullan
- next/font kullan
- Initial JS bundle < 200KB
- Streaming ve Suspense kullan

RENDER SİSTEMİ
BlockRenderer bileşeni oluştur ve tüm block tiplerini server-side render et.

Dosya yapısı:
features/content/
  components/
    BlockRenderer.tsx
    blocks/
      HeroBlock.tsx
      TextBlock.tsx
      ImageBlock.tsx
      GalleryBlock.tsx
      VideoBlock.tsx
      CTABlock.tsx
      QuoteBlock.tsx
      ProductShowcaseBlock.tsx
      ComparisonTableBlock.tsx
      FAQBlock.tsx
  editor/
    BlockEditor.tsx
    BlockToolbar.tsx
    BlockSidebar.tsx
  actions/
    savePage.ts
    publishPage.ts
    duplicatePage.ts
  types/
    blocks.ts
  validations/
    page.schema.ts

SUPABASE ENTEGRASYONU
- Gerçek veritabanı işlemleri kullan
- Mock data kullanma
- Autosave Supabase'e yazsın
- Yayınlama durumu saklansın
- Görseller Supabase Storage'a yüklensin

ERİŞİLEBİLİRLİK
- WCAG AA
- Klavye navigasyonu
- ARIA etiketleri
- Screen reader desteği
- Visible focus states

SON KRİTİK KURAL
Bu özellik sadece görsel editör olarak kalmamalı. Tüm blocklar gerçek verilerle çalışmalı, Supabase'e kaydedilmeli, sayfa yenilendiğinde korunmalı ve üretim ortamında kullanılabilecek seviyede tamamlanmış olmalı.