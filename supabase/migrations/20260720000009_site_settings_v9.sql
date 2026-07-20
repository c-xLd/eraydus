-- Site Settings Schema for Dynamic SEO and App Configuration

CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT now(),
  updated_by uuid REFERENCES public.profiles(id)
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to site settings (needed for SSR/SEO)
CREATE POLICY "Allow public read access to site_settings" ON public.site_settings
  FOR SELECT USING (true);

-- Allow authenticated admins/users to update
CREATE POLICY "Allow authenticated update to site_settings" ON public.site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert to site_settings" ON public.site_settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert default global SEO data as a starting point
INSERT INTO public.site_settings (key, value)
VALUES (
  'global_seo',
  '{
    "siteName": "Erayduş - Ankara Lüks Duşakabin Sistemleri",
    "titleSeparator": "|",
    "defaultDescription": "Ankara merkezli Erayduş, Çankaya, Yenimahalle, Çayyolu ve İncek bölgelerine özel ölçü, modern, lüks duşakabin ve banyo dolabı çözümleri sunar.",
    "defaultOgImage": "/images/og-default.svg",
    "twitterHandle": "@eraydus",
    "contact": {
      "phone": "+90 555 123 4567",
      "email": "info@eraydus.net",
      "address": {
        "streetAddress": "Ostim OSB, 100. Yıl Bulvarı",
        "addressLocality": "Yenimahalle",
        "addressRegion": "Ankara",
        "postalCode": "06374",
        "addressCountry": "TR"
      }
    },
    "geo": {
      "region": "TR-06",
      "placename": "Ankara",
      "position": "39.9334;32.8597"
    },
    "localBusiness": {
      "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-19:00",
      "priceRange": "₺₺",
      "areaServed": [
        "Ankara",
        "Çankaya",
        "Yenimahalle",
        "Çayyolu",
        "İncek",
        "Ümitköy",
        "Keçiören",
        "Etimesgut"
      ]
    },
    "aiSeo": {
      "brandGuidelines": "Erayduş, lüks ve premium segmentte yer alan modern bir duşakabin markasıdır.",
      "targetAudience": "Mimarlar, iç mimarlar ve lüks yaşam alanları arayan son kullanıcılar."
    }
  }'::jsonb
) ON CONFLICT (key) DO NOTHING;
