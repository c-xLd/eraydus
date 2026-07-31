-- SADECE GELİŞTİRME (DEV) İÇİN: 
-- Kimlik doğrulaması olmadan Projeler ve Kumlama Modelleri tablolarında işlem yapabilmek için RLS kurallarını gevşetir.
-- NOT: Canlıya (Production) çıkmadan önce bu kuralların tekrar 'authenticated' olarak değiştirilmesi önerilir.

-- Projeler Tablosu RLS Güncellemesi
DROP POLICY IF EXISTS "Only authenticated users can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Only authenticated users can update projects" ON public.projects;
DROP POLICY IF EXISTS "Only authenticated users can delete projects" ON public.projects;

CREATE POLICY "Allow anon insert projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete projects" ON public.projects FOR DELETE USING (true);

-- Kumlama Modelleri Tablosu RLS Güncellemesi
DROP POLICY IF EXISTS "Only authenticated users can insert models" ON public.sandblasted_models;
DROP POLICY IF EXISTS "Only authenticated users can update models" ON public.sandblasted_models;
DROP POLICY IF EXISTS "Only authenticated users can delete models" ON public.sandblasted_models;

CREATE POLICY "Allow anon insert models" ON public.sandblasted_models FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update models" ON public.sandblasted_models FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete models" ON public.sandblasted_models FOR DELETE USING (true);
