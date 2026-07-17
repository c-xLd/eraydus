-- Migration: WooCommerce-Style Products System

-- 1. Extend products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS product_type text DEFAULT 'simple' CHECK (product_type IN ('simple', 'variable')),
ADD COLUMN IF NOT EXISTS sale_price numeric(10, 2),
ADD COLUMN IF NOT EXISTS manage_stock boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS stock_quantity integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS stock_status text DEFAULT 'instock' CHECK (stock_status IN ('instock', 'outofstock', 'onbackorder'));

-- 2. Create Attributes Table (Global Attributes like Color, Size, Glass Type)
CREATE TABLE IF NOT EXISTS public.product_attributes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL, -- e.g. "Profil Rengi"
  slug text UNIQUE NOT NULL, -- e.g. "profil-rengi"
  type text DEFAULT 'select', -- 'select', 'color', 'button'
  is_visible boolean DEFAULT true,
  is_variation boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 3. Create Attribute Terms (e.g. Siyah, Altın, 90x90, Şeffaf)
CREATE TABLE IF NOT EXISTS public.product_attribute_terms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  attribute_id uuid NOT NULL REFERENCES public.product_attributes(id) ON DELETE CASCADE,
  name text NOT NULL, -- e.g. "Mat Siyah"
  slug text NOT NULL, -- e.g. "mat-siyah"
  description text,
  color_code text, -- if type is color, e.g. "#000000"
  image_url text, -- for visual attributes
  sort_order integer DEFAULT 0,
  UNIQUE(attribute_id, slug)
);

-- 4. Product Attribute Values (Mapping products to attributes & terms)
-- A product might have "Color: Black, White" and "Size: 90x90, 100x100"
CREATE TABLE IF NOT EXISTS public.product_attribute_values (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  attribute_id uuid NOT NULL REFERENCES public.product_attributes(id) ON DELETE CASCADE,
  term_id uuid NOT NULL REFERENCES public.product_attribute_terms(id) ON DELETE CASCADE,
  is_variation boolean DEFAULT true, -- If true, this term is used for generating variations
  UNIQUE(product_id, attribute_id, term_id)
);

-- 5. Extend product_variants table
ALTER TABLE public.product_variants
ADD COLUMN IF NOT EXISTS sale_price numeric(10, 2),
ADD COLUMN IF NOT EXISTS manage_stock boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS stock_status text DEFAULT 'instock' CHECK (stock_status IN ('instock', 'outofstock', 'onbackorder')),
ADD COLUMN IF NOT EXISTS attributes jsonb, -- e.g. {"profil-rengi": "mat-siyah", "olcu": "90x90"}
ADD COLUMN IF NOT EXISTS image_url text;

-- RLS Policies for new tables
ALTER TABLE public.product_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_attribute_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_attribute_values ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to product_attributes" ON public.product_attributes FOR SELECT USING (true);
CREATE POLICY "Allow public read access to product_attribute_terms" ON public.product_attribute_terms FOR SELECT USING (true);
CREATE POLICY "Allow public read access to product_attribute_values" ON public.product_attribute_values FOR SELECT USING (true);
