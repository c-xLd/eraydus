-- Product Details Extension
-- Extends products table with detailed specifications and media

-- Add new columns to products table
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS long_description text,
  ADD COLUMN IF NOT EXISTS layout_type text,
  ADD COLUMN IF NOT EXISTS cabin_shape text,
  ADD COLUMN IF NOT EXISTS main_image_url text,
  ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS technical_specs jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS compatible_glass jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS compatible_profiles jsonb DEFAULT '[]'::jsonb;

-- Product Gallery Table
CREATE TABLE IF NOT EXISTS public.product_gallery (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Product Variants Table
CREATE TABLE IF NOT EXISTS public.product_variants (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  price numeric(10, 2) NOT NULL,
  sale_price numeric(10, 2),
  stock_quantity integer DEFAULT 0,
  attributes jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Glass Options Master Table
CREATE TABLE IF NOT EXISTS public.glass_options (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  color_class text,
  sort_order integer DEFAULT 0,
  status text DEFAULT 'active'
);

-- Profile Options Master Table
CREATE TABLE IF NOT EXISTS public.profile_options (
  id text PRIMARY KEY,
  name text NOT NULL,
  hex_color text NOT NULL,
  sort_order integer DEFAULT 0,
  status text DEFAULT 'active'
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_product_gallery_product_id ON public.product_gallery(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON public.product_variants(sku);

-- RLS Policies
ALTER TABLE public.product_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glass_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_options ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to product_gallery" ON public.product_gallery;
CREATE POLICY "Allow public read access to product_gallery"
  ON public.product_gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to product_variants" ON public.product_variants;
CREATE POLICY "Allow public read access to product_variants"
  ON public.product_variants FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Allow public read access to glass_options" ON public.glass_options;
CREATE POLICY "Allow public read access to glass_options"
  ON public.glass_options FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Allow public read access to profile_options" ON public.profile_options;
CREATE POLICY "Allow public read access to profile_options"
  ON public.profile_options FOR SELECT USING (status = 'active');

-- Seed glass options
INSERT INTO public.glass_options (id, name, description, color_class, sort_order) VALUES
  ('seffaf', 'Şeffaf Extra Clear', 'Maksimum ışık geçirgenliği', 'bg-white/20 backdrop-blur-sm', 1),
  ('fume', 'Füme (Siyah) Cam', 'Gizlilik ve lüks görünüm', 'bg-black/60 backdrop-blur-md', 2),
  ('bronz', 'Bronz Cam', 'Sıcak tonlar ve zarif yansıma', 'bg-amber-900/40 backdrop-blur-md', 3),
  ('aynali', 'Aynalı Cam', 'Genişlik hissi ve tam mahremiyet', 'bg-slate-300/60 backdrop-blur-lg', 4),
  ('kumlama', 'Kumlama (Buzlu) Cam', 'Özel desenler ve modern doku', 'bg-white/40 backdrop-blur-xl', 5),
  ('buz-mat', 'Buz Mat Cam', 'Pürüzsüz mat yüzey ve tam gizlilik', 'bg-white/60 backdrop-blur-2xl', 6)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  color_class = EXCLUDED.color_class,
  sort_order = EXCLUDED.sort_order;

-- Seed profile options
INSERT INTO public.profile_options (id, name, hex_color, sort_order) VALUES
  ('siyah', 'Mat Siyah', '#1A1A1A', 1),
  ('firca-parlak', 'Parlak Krom', '#E8E9EB', 2),
  ('gold', 'Fırçalanmış Altın', '#D4AF37', 3),
  ('beyaz', 'Mat Beyaz', '#F9FAFB', 4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  hex_color = EXCLUDED.hex_color,
  sort_order = EXCLUDED.sort_order;
