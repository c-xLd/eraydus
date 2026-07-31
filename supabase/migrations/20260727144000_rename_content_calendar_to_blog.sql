-- Rename the table
ALTER TABLE IF EXISTS public.content_calendar RENAME TO blog;

-- Rename indexes
ALTER INDEX IF EXISTS idx_content_calendar_blog_slug RENAME TO idx_blog_slug;
ALTER INDEX IF EXISTS idx_content_calendar_public_blog RENAME TO idx_blog_published;
