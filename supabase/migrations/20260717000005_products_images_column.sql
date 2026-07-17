-- Add images column to products table for storing product image URLs array
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS images jsonb;

-- Create index for faster queries on images (optional)
CREATE INDEX IF NOT EXISTS idx_products_images ON public.products USING gin (images);