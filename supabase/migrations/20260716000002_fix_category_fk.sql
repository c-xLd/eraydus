-- Migration: Fix Category Foreign Key Constraints

-- Allow deleting a category without breaking products (sets product's category to NULL instead)
ALTER TABLE public.products
DROP CONSTRAINT IF EXISTS products_category_id_fkey,
ADD CONSTRAINT products_category_id_fkey
  FOREIGN KEY (category_id)
  REFERENCES public.categories(id)
  ON DELETE SET NULL;

-- Allow deleting a parent category without breaking child categories (sets parent_category to NULL instead)
ALTER TABLE public.categories
DROP CONSTRAINT IF EXISTS categories_parent_category_fkey,
ADD CONSTRAINT categories_parent_category_fkey
  FOREIGN KEY (parent_category)
  REFERENCES public.categories(id)
  ON DELETE SET NULL;
