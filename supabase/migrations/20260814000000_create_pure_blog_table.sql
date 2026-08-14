-- Drop old tables and dependencies
DROP TABLE IF EXISTS public.content_revisions CASCADE;
DROP TABLE IF EXISTS public.blog CASCADE;
DROP TABLE IF EXISTS public.content_calendar CASCADE;

-- Create pure blog table
CREATE TABLE public.blog (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  body text,
  featured_image text,
  status text DEFAULT 'published', -- 'draft', 'published'
  published_at timestamp with time zone DEFAULT now(),
  seo_title text,
  seo_description text,
  tags text[],
  author_id uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Indexes for performance
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_slug ON public.blog (slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON public.blog (published_at DESC) WHERE status = 'published';

-- RLS
ALTER TABLE public.blog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to published blog content"
  ON public.blog
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Allow admin to manage blog"
  ON public.blog
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role_id = 1
    )
  );
