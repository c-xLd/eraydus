CREATE TABLE IF NOT EXISTS public.product_reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name text,
  author_email text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content text NOT NULL,
  images text[],
  is_approved boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Drop policies if they already exist to prevent the 42710 error
DROP POLICY IF EXISTS "Herkes onaylı yorumları görebilir" ON public.product_reviews;
DROP POLICY IF EXISTS "Ziyaretçiler yorum yapabilir" ON public.product_reviews;

-- Recreate the policies safely
CREATE POLICY "Herkes onaylı yorumları görebilir" ON public.product_reviews
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Ziyaretçiler yorum yapabilir" ON public.product_reviews
  FOR INSERT WITH CHECK (true);