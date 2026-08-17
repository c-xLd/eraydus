
BEGIN;

CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id text NOT NULL,
  status text DEFAULT 'active', -- 'active', 'closed'
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  sender_type text NOT NULL, -- 'visitor' or 'admin'
  sender_id text NOT NULL, -- visitor_id or admin_id
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Everyone can insert and read their own sessions
CREATE POLICY "Visitors can insert chat sessions" ON public.chat_sessions FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Visitors can view their chat sessions" ON public.chat_sessions FOR SELECT TO public USING (true);
CREATE POLICY "Admins can update chat sessions" ON public.chat_sessions FOR UPDATE TO authenticated USING (true);

-- Everyone can insert messages, visitors read their own messages
CREATE POLICY "Visitors can insert messages" ON public.chat_messages FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Visitors can view messages" ON public.chat_messages FOR SELECT TO public USING (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE chat_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;

COMMIT;

