-- Add missing columns for production notification center if they do not exist
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS priority text DEFAULT 'NORMAL';
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS status text DEFAULT 'UNREAD';
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS entity_type text;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS entity_id uuid;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- Ensure Realtime is enabled for notifications table
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
