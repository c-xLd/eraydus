-- Create analytics_events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name text NOT NULL, -- page_view, product_view, whatsapp_click, etc.
  session_id text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  page_url text,
  page_title text,
  referrer text,
  device_type text, -- mobile, tablet, desktop
  created_at timestamp with time zone DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies (only service_role can read/write directly, clients use API)
CREATE POLICY "Enable read for service role only" ON public.analytics_events
  FOR SELECT
  USING (true); -- We will enforce auth in our API/Server Components anyway, but let's be strict:

DROP POLICY IF EXISTS "Enable read for service role only" ON public.analytics_events;

CREATE POLICY "Service role full access" ON public.analytics_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable Realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics_events;

-- Create indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON public.analytics_events(event_name);
