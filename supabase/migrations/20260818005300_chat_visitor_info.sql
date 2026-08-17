
BEGIN;
ALTER TABLE public.chat_sessions ADD COLUMN IF NOT EXISTS visitor_name text;
ALTER TABLE public.chat_sessions ADD COLUMN IF NOT EXISTS visitor_phone text;
COMMIT;

