-- Add new JSONB column for Page-level FAQ data
ALTER TABLE public.seo_metadata 
ADD COLUMN IF NOT EXISTS faq_data jsonb DEFAULT '[]'::jsonb;
