-- Allow anonymous users to insert product reviews
DROP POLICY IF EXISTS "Allow anon inserts for product_reviews" ON public.product_reviews;

CREATE POLICY "Allow anon inserts for product_reviews"
  ON public.product_reviews
  FOR INSERT
  TO public
  WITH CHECK (true);
