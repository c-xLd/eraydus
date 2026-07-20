import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { PROGRAMMATIC_MATRIX, getProgrammaticConfig } from '@/lib/seo/matrix';
import { getBreadcrumbSchema, getFAQSchema, getGraphSchema } from '@/lib/seo/schemas';
import { ShieldCheck, Sparkles, Ruler, CheckCircle2, ArrowRight, PhoneCall, HelpCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net';

export async function generateStaticParams() {
  return Object.keys(PROGRAMMATIC_MATRIX).map((key) => ({
    slug: [key],
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const config = getProgrammaticConfig(resolvedParams.slug);

  if (!config) {
    return {
      title: 'Duşakabin Sistemleri | ERAYDUŞ',
      description: 'Lüks ve modern duşakabin çözümleri.',
    };
  }

  const canonicalUrl = `${SITE_URL}/dusakabin/${resolvedParams.slug.join('/')}`;

  return {
    title: config.title,
    description: config.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.title,
      description: config.metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: 'ERAYDUŞ',
      images: [
        {
          url: `${SITE_URL}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.metaDescription,
    },
  };
}

async function getProductsForFilter(tags: string[]) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const { data: products } = await supabase
      .from('products')
      .select('id, name, slug, price, images, description, categories(name, slug)')
      .eq('status', 'active')
      .limit(12);

    return products || [];
  } catch (error) {
    console.error('Supabase fetch error:', error);
    return [];
  }
}

export default async function ProgrammaticSEOPage({ params }: PageProps) {
  const resolvedParams = await params;
  const config = getProgrammaticConfig(resolvedParams.slug);

  if (!config) {
    notFound();
  }

  const products = await getProductsForFilter(config.filterTags);

  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Duşakabinler', url: '/koleksiyonlar' },
    { name: config.h1, url: `/dusakabin/${resolvedParams.slug.join('/')}` },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFAQSchema(config.faqs);
  const graphSchema = getGraphSchema([breadcrumbSchema, faqSchema]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <div className="bg-background min-h-screen">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-border/40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-champagne/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
            {/* BREADCRUMB */}
            <nav className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              {breadcrumbs.map((b, i) => (
                <span key={b.url} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  <Link href={b.url} className="hover:text-foreground transition-colors">
                    {b.name}
                  </Link>
                </span>
              ))}
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 text-champagne text-xs font-semibold uppercase tracking-wider mb-6 border border-champagne/20">
                <Sparkles className="w-3.5 h-3.5" />
                {config.badge}
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground leading-[1.1]">
                {config.h1.split(' ')[0]} <span className="font-semibold">{config.h1.split(' ').slice(1).join(' ')}</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
                {config.subtitle}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/tasarla"
                  className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-medium text-sm rounded-lg hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl"
                >
                  <Ruler className="w-4 h-4 mr-2.5" />
                  Özel Ölçü Tasarla & Fiyat Al
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center px-8 py-4 bg-muted text-foreground font-medium text-sm rounded-lg hover:bg-muted/80 transition-colors border border-border"
                >
                  <PhoneCall className="w-4 h-4 mr-2.5 text-champagne" />
                  Keşif Talebi İste
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT GRID SECTION */}
        <section className="py-16 md:py-24 container mx-auto max-w-[1440px] px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-light tracking-tight">
                Öne Çıkan <span className="font-semibold">Modeller</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                {config.h1} kriterlerine uygun özel üretim modellerimiz
              </p>
            </div>
            <Link
              href="/koleksiyonlar"
              className="inline-flex items-center text-sm font-medium text-champagne hover:underline mt-4 md:mt-0"
            >
              Tüm Koleksiyonları İncele
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const categoryData = Array.isArray(product.categories) ? product.categories[0] : product.categories;
                const categoryName = categoryData?.name || 'Duşakabin';
                const categorySlug = categoryData?.slug || 'genel';

                return (
                  <div
                    key={product.id}
                    className="group relative rounded-xl border border-border/60 bg-card/50 overflow-hidden hover:border-champagne/40 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted/30">
                      <Image
                        src={product.images && product.images[0] ? product.images[0] : '/images/og-default.jpg'}
                        alt={`${product.name} - ${config.h1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase">
                        {categoryName}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-medium tracking-tight text-foreground group-hover:text-champagne transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {product.description || '8mm temperli güvenli cam, paslanmaz alüminyum profil ve Nano kaplama.'}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">Başlangıç Fiyatı</span>
                          <span className="text-lg font-semibold text-foreground">
                            {product.price ? `${product.price.toLocaleString('tr-TR')} ₺` : 'Fiyat Alınız'}
                          </span>
                        </div>
                        <Link
                          href={`/koleksiyonlar/${categorySlug}/${product.slug}`}
                          className="inline-flex items-center text-xs font-medium bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90 transition-colors"
                        >
                          İncele
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">Bu kategoride özel üretim seçeneklerimiz hazırlık aşamasındadır.</p>
              <Link
                href="/tasarla"
                className="mt-4 inline-flex items-center text-sm font-medium text-champagne underline"
              >
                Hemen Özel Ölçü İle Fiyat Teklifi Alın
              </Link>
            </div>
          )}
        </section>

        {/* DEEP CONTENT BLOCK (SEO ARTICLE) */}
        <section className="py-16 bg-muted/20 border-y border-border/40">
          <div className="container mx-auto max-w-[1000px] px-6">
            <div className="flex items-center gap-3 mb-6 text-champagne">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs font-semibold uppercase tracking-widest">ERAYDUŞ Uzmanlık & Kalite Standardı</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6">
              {config.contentTitle}
            </h2>

            <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p className="text-base md:text-lg">{config.contentBody}</p>
            </div>

            {/* TRUST BADGES */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border/40">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-champagne mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">10 Yıl Profil Garantisi</h4>
                  <p className="text-xs text-muted-foreground mt-1">Elektrostatik ve PVD kaplama profillerde paslanmazlık güvencesi.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-champagne mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">8 mm Şişecam Temperli Cam</h4>
                  <p className="text-xs text-muted-foreground mt-1">Darbe dayanımlı, Rodajlı emniyet camı standartları.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-champagne mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Ücretsiz Keşif & Montaj</h4>
                  <p className="text-xs text-muted-foreground mt-1">Ankara içi uzman teknisyen ekibiyle aynı hafta teslimat.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        {config.faqs && config.faqs.length > 0 && (
          <section className="py-16 md:py-24 container mx-auto max-w-[1000px] px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-champagne mb-3">
                <HelpCircle className="w-4 h-4" />
                Merak Edilenler
              </span>
              <h2 className="text-3xl font-light tracking-tight">Sıkça Sorulan Sorular</h2>
            </div>

            <div className="space-y-4">
              {config.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group border border-border/60 rounded-xl bg-card p-6 cursor-pointer transition-all duration-200 [&[open]]:border-champagne/50"
                >
                  <summary className="flex items-center justify-between font-medium text-lg text-foreground list-none">
                    <span>{faq.question}</span>
                    <span className="ml-4 transition-transform duration-200 group-open:rotate-180 text-champagne">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground pt-4 border-t border-border/40">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* BOTTOM CTA BANNER */}
        <section className="py-20 bg-foreground text-background">
          <div className="container mx-auto max-w-[1440px] px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-3xl mx-auto">
              Banyonuz için <span className="font-semibold">özel ölçü hayalinizdeki kabini</span> birlikte tasarlayalım.
            </h2>
            <p className="mt-4 text-background/80 max-w-xl mx-auto text-sm md:text-base font-light">
              Ölçülerinizi girin, profil ve cam kombinasyonunuzu seçin, anında net fiyat teklifinizi alın.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/tasarla"
                className="inline-flex items-center justify-center px-8 py-4 bg-champagne text-foreground font-semibold text-sm rounded-lg hover:bg-champagne/90 transition-all shadow-lg"
              >
                Konfigüratörü Başlat
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
