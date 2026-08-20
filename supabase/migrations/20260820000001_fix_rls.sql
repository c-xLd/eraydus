-- Phase 5: RLS Hardening and Policies
-- Ensure that tables properly restrict access from anon/authenticated users
-- and only allow service_role or specific RBAC roles.

-- 1. Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- (SUPER_ADMIN and ADMIN access is handled via service_role in API)

-- 2. Products
-- Anyone can read active products (published)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active products" ON public.products;
CREATE POLICY "Public can read active products" 
ON public.products FOR SELECT 
USING (status = 'active');

-- Allow reading drafts if authenticated (We will handle strict RBAC via Server Actions using Service Role)
-- But just in case, let's allow authenticated to select everything for Admin UI
DROP POLICY IF EXISTS "Authenticated can read all products" ON public.products;
CREATE POLICY "Authenticated can read all products" 
ON public.products FOR SELECT 
TO authenticated 
USING (true);

-- NO INSERT/UPDATE/DELETE policies for public or authenticated. 
-- Mutations MUST go through Server Actions (using service_role + RBAC check).
DROP POLICY IF EXISTS "Authenticated can insert products" ON public.products;
DROP POLICY IF EXISTS "Authenticated can update products" ON public.products;
DROP POLICY IF EXISTS "Authenticated can delete products" ON public.products;

-- 3. Categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read categories" ON public.categories;
CREATE POLICY "Public can read categories" 
ON public.categories FOR SELECT 
USING (true);

-- No mutations for public/authenticated
DROP POLICY IF EXISTS "Authenticated can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Authenticated can update categories" ON public.categories;
DROP POLICY IF EXISTS "Authenticated can delete categories" ON public.categories;

-- 4. Audit Logs and Security Events
-- Deny ALL access to anon and authenticated. Access strictly via service_role + RBAC.
DROP POLICY IF EXISTS "Block all access to audit_logs" ON public.audit_logs;
CREATE POLICY "Block all access to audit_logs" ON public.audit_logs FOR ALL USING (false);

DROP POLICY IF EXISTS "Block all access to security_events" ON public.security_events;
CREATE POLICY "Block all access to security_events" ON public.security_events FOR ALL USING (false);
