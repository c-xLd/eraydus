-- Add new columns for global SEO settings
ALTER TABLE public.seo_metadata 
ADD COLUMN IF NOT EXISTS twitter_handle text,
ADD COLUMN IF NOT EXISTS title_separator text DEFAULT '|',
ADD COLUMN IF NOT EXISTS faq_schema_enabled boolean DEFAULT false;
