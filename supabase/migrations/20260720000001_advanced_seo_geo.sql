-- Add new JSONB column for advanced GEO / Local Business settings
ALTER TABLE public.seo_metadata 
ADD COLUMN IF NOT EXISTS geo_data jsonb DEFAULT '{}'::jsonb;
