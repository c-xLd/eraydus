CREATE TABLE IF NOT EXISTS public.seo_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site_title text NOT NULL DEFAULT 'Erayduş',
  default_meta_description text,
  canonical_base_url text,
  default_og_image text,
  language text DEFAULT 'tr',
  locale text DEFAULT 'tr_TR',
  robots_txt_content text,
  product_title_template text DEFAULT '{productName} | Erayduş',
  product_desc_template text DEFAULT '{productName} model duşakabin özellikleri ve ölçü seçenekleri.',
  category_title_template text DEFAULT '{categoryName} | Duşakabin Modelleri | Erayduş',
  category_desc_template text DEFAULT '{categoryName} kategorisindeki duşakabinleri inceleyin.',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Insert a single default row if empty
INSERT INTO public.seo_settings (site_title) 
SELECT 'Erayduş' 
WHERE NOT EXISTS (SELECT 1 FROM public.seo_settings);

CREATE TABLE IF NOT EXISTS public.seo_redirects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  old_url text NOT NULL UNIQUE,
  new_url text NOT NULL,
  status_code integer DEFAULT 301,
  hit_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.seo_404_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  url text NOT NULL,
  referrer text,
  hit_count integer DEFAULT 1,
  last_seen timestamp with time zone DEFAULT now(),
  resolved boolean DEFAULT false
);

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_404_logs ENABLE ROW LEVEL SECURITY;
