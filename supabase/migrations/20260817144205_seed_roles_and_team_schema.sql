-- Seed Roles
INSERT INTO roles (id, name, description, permissions) VALUES
(1, 'SUPER_ADMIN', 'Tam erişim', '["*"]'::jsonb),
(2, 'ADMIN', 'Yönetici erişimi', '["products.*", "orders.*", "content.*", "analytics.*", "media.*", "notifications.*"]'::jsonb),
(3, 'EDITOR', 'İçerik düzenleyici', '["content.*", "blog.*", "media.*", "seo.*"]'::jsonb),
(4, 'SALES', 'Satış temsilcisi', '["quotes.*", "customers.*", "orders.*"]'::jsonb),
(5, 'SEO_MANAGER', 'SEO Yöneticisi', '["seo.*"]'::jsonb),
(6, 'WAREHOUSE', 'Depo Görevlisi', '["inventory.*", "products.read"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, permissions = EXCLUDED.permissions;

-- Let's make sure profiles table has what we need
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'EDITOR';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role_id integer REFERENCES roles(id) DEFAULT 3;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_suspended boolean DEFAULT false;

-- Add triggers or policies if needed to protect SUPER_ADMIN?
-- We can enforce it in Postgres but easier in Server Actions.

-- Create an audit_logs table to record team activity
CREATE TABLE IF NOT EXISTS audit_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id uuid REFERENCES auth.users(id),
    action text NOT NULL,
    target_user_id uuid REFERENCES auth.users(id),
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now()
);

-- Realtime for profiles and audit_logs
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE audit_logs;
