-- Migration: Add SELECT policy for product_variants

CREATE POLICY "Allow public read access to product_variants" 
ON public.product_variants 
FOR SELECT 
USING (true);
