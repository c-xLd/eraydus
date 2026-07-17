-- Admin RLS for product_reviews (authenticated users can manage all reviews)

DROP POLICY IF EXISTS "Allow authenticated full access on product_reviews" ON public.product_reviews;

CREATE POLICY "Allow authenticated full access on product_reviews"
  ON public.product_reviews
  FOR ALL
  USING (auth.role() = 'authenticated');
