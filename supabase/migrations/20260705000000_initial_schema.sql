-- Initial Schema Setup for Eraydus Digital Experience Platform

-- Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  auth_user_id uuid,
  first_name text,
  last_name text,
  email text,
  phone text,
  avatar text,
  role_id integer,
  status text DEFAULT 'active',
  last_login timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_category uuid REFERENCES public.categories(id),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  sort_order integer DEFAULT 0,
  status text DEFAULT 'active'
);

-- Collections Table
CREATE TABLE IF NOT EXISTS public.collections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  sku text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  short_description text,
  description text,
  collection_id uuid REFERENCES public.collections(id),
  category_id uuid REFERENCES public.categories(id),
  base_price numeric(10, 2),
  starting_price numeric(10, 2),
  status text DEFAULT 'active',
  featured boolean DEFAULT false,
  new_product boolean DEFAULT false,
  best_seller boolean DEFAULT false,
  meta_title text,
  meta_description text,
  canonical_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone
);

-- RLS Policies Setup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products, collections, categories
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (status = 'active');
CREATE POLICY "Allow public read access to collections" ON public.collections FOR SELECT USING (status = 'active');
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (status = 'active');
