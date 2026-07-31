CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON public.projects FOR SELECT
  USING ( true );

CREATE POLICY "Only authenticated users can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

CREATE POLICY "Only authenticated users can update projects"
  ON public.projects FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Only authenticated users can delete projects"
  ON public.projects FOR DELETE
  USING ( auth.role() = 'authenticated' );
