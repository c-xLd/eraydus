-- Migration: Add RLS policies for WooCommerce tables to allow inserts and updates from the Admin panel

-- Policies for product_attributes
CREATE POLICY "Allow insert on product_attributes" ON public.product_attributes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on product_attributes" ON public.product_attributes FOR UPDATE USING (true);
CREATE POLICY "Allow delete on product_attributes" ON public.product_attributes FOR DELETE USING (true);

-- Policies for product_attribute_terms
CREATE POLICY "Allow insert on product_attribute_terms" ON public.product_attribute_terms FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on product_attribute_terms" ON public.product_attribute_terms FOR UPDATE USING (true);
CREATE POLICY "Allow delete on product_attribute_terms" ON public.product_attribute_terms FOR DELETE USING (true);

-- Policies for product_attribute_values
CREATE POLICY "Allow insert on product_attribute_values" ON public.product_attribute_values FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on product_attribute_values" ON public.product_attribute_values FOR UPDATE USING (true);
CREATE POLICY "Allow delete on product_attribute_values" ON public.product_attribute_values FOR DELETE USING (true);

-- Also fix products and product_variants if they don't have policies (just in case ProductEditorClient fails)
CREATE POLICY "Allow insert on products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow delete on products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Allow insert on product_variants" ON public.product_variants FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on product_variants" ON public.product_variants FOR UPDATE USING (true);
CREATE POLICY "Allow delete on product_variants" ON public.product_variants FOR DELETE USING (true);

-- Categories
CREATE POLICY "Allow insert on categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on categories" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Allow delete on categories" ON public.categories FOR DELETE USING (true);
