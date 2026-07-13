CREATE UNIQUE INDEX IF NOT EXISTS idx_content_calendar_blog_slug
  ON public.content_calendar (slug)
  WHERE content_type = 'blog' AND slug IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_content_calendar_public_blog
  ON public.content_calendar (published_at DESC)
  WHERE content_type = 'blog' AND status = 'published';

CREATE POLICY "Allow public read access to published blog content"
  ON public.content_calendar
  FOR SELECT
  USING (content_type = 'blog' AND status = 'published' AND (published_at IS NULL OR published_at <= now()));
