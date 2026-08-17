-- Drop dangerous anon/public write policies
DROP POLICY IF EXISTS "Allow insert on product_attributes" ON public.product_attributes;
DROP POLICY IF EXISTS "Allow update on product_attributes" ON public.product_attributes;
DROP POLICY IF EXISTS "Allow delete on product_attributes" ON public.product_attributes;

DROP POLICY IF EXISTS "Allow insert on product_attribute_terms" ON public.product_attribute_terms;
DROP POLICY IF EXISTS "Allow update on product_attribute_terms" ON public.product_attribute_terms;
DROP POLICY IF EXISTS "Allow delete on product_attribute_terms" ON public.product_attribute_terms;

DROP POLICY IF EXISTS "Allow insert on product_attribute_values" ON public.product_attribute_values;
DROP POLICY IF EXISTS "Allow update on product_attribute_values" ON public.product_attribute_values;
DROP POLICY IF EXISTS "Allow delete on product_attribute_values" ON public.product_attribute_values;

DROP POLICY IF EXISTS "Allow insert on products" ON public.products;
DROP POLICY IF EXISTS "Allow update on products" ON public.products;
DROP POLICY IF EXISTS "Allow delete on products" ON public.products;

DROP POLICY IF EXISTS "Allow insert on product_variants" ON public.product_variants;
DROP POLICY IF EXISTS "Allow update on product_variants" ON public.product_variants;
DROP POLICY IF EXISTS "Allow delete on product_variants" ON public.product_variants;

DROP POLICY IF EXISTS "Allow insert on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow update on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow delete on categories" ON public.categories;

DROP POLICY IF EXISTS "Allow anon insert projects" ON public.projects;
DROP POLICY IF EXISTS "Allow anon update projects" ON public.projects;
DROP POLICY IF EXISTS "Allow anon delete projects" ON public.projects;

DROP POLICY IF EXISTS "Allow anon insert models" ON public.sandblasted_models;
DROP POLICY IF EXISTS "Allow anon update models" ON public.sandblasted_models;
DROP POLICY IF EXISTS "Allow anon delete models" ON public.sandblasted_models;

-- Replace them with secure authenticated policies
-- Note: In our current architecture, admin operations go through server actions that use createClient (which uses the authenticated session)
-- Or createAdminClient() which bypasses RLS entirely.
-- To be safe, we allow authenticated users to perform these actions if they are logged in, 
-- and we enforce authorization at the application layer (server actions) using RBAC.

CREATE POLICY "Allow authenticated insert on products" ON public.products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on products" ON public.products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on products" ON public.products FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on categories" ON public.categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on categories" ON public.categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on categories" ON public.categories FOR DELETE TO authenticated USING (true);

-- etc...
