-- Add missing columns to customers
ALTER TABLE public.customers
ADD COLUMN IF NOT EXISTS district text,
ADD COLUMN IF NOT EXISTS source text DEFAULT 'UNKNOWN',
ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES public.team_members(id) ON DELETE SET NULL;

-- Create customer notes table
CREATE TABLE IF NOT EXISTS public.customer_notes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  author_id uuid REFERENCES public.team_members(id) ON DELETE SET NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create customer tags table
CREATE TABLE IF NOT EXISTS public.customer_tags (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now()
);

-- Create customer tag relations table
CREATE TABLE IF NOT EXISTS public.customer_tag_relations (
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES public.customer_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (customer_id, tag_id)
);

-- Enable RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_tag_relations ENABLE ROW LEVEL SECURITY;

-- Setup RLS Policies for authenticated users
DO $$
BEGIN
    -- Customers
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'authenticated_read_customers' AND tablename = 'customers') THEN
        CREATE POLICY "authenticated_read_customers" ON public.customers FOR SELECT TO authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'authenticated_write_customers' AND tablename = 'customers') THEN
        CREATE POLICY "authenticated_write_customers" ON public.customers FOR ALL TO authenticated USING (true);
    END IF;

    -- Notes
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'authenticated_read_notes' AND tablename = 'customer_notes') THEN
        CREATE POLICY "authenticated_read_notes" ON public.customer_notes FOR SELECT TO authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'authenticated_write_notes' AND tablename = 'customer_notes') THEN
        CREATE POLICY "authenticated_write_notes" ON public.customer_notes FOR ALL TO authenticated USING (true);
    END IF;

    -- Tags
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'authenticated_read_tags' AND tablename = 'customer_tags') THEN
        CREATE POLICY "authenticated_read_tags" ON public.customer_tags FOR SELECT TO authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'authenticated_write_tags' AND tablename = 'customer_tags') THEN
        CREATE POLICY "authenticated_write_tags" ON public.customer_tags FOR ALL TO authenticated USING (true);
    END IF;

    -- Tag Relations
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'authenticated_read_tag_relations' AND tablename = 'customer_tag_relations') THEN
        CREATE POLICY "authenticated_read_tag_relations" ON public.customer_tag_relations FOR SELECT TO authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'authenticated_write_tag_relations' AND tablename = 'customer_tag_relations') THEN
        CREATE POLICY "authenticated_write_tag_relations" ON public.customer_tag_relations FOR ALL TO authenticated USING (true);
    END IF;
END $$;
