-- Migration: Security Schema & Audit Logging Extensions
-- Purpose: Expanding the existing audit_logs to support generic targets, and creating security_events.

-- 1. Modify audit_logs
ALTER TABLE public.audit_logs 
ADD COLUMN IF NOT EXISTS target_type text,
ADD COLUMN IF NOT EXISTS target_id text;

-- (Optional) If we want to rename target_user_id to something more generic, we won't, 
-- but we can just use target_id as text (can hold UUIDs or slugs) and target_type.

-- 2. Create security_events table
CREATE TABLE IF NOT EXISTS public.security_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL, -- Who caused this
    event_type text NOT NULL, -- e.g. LOGIN_FAILED, MFA_DISABLED, UNAUTHORIZED_ADMIN_ACCESS
    severity text DEFAULT 'INFO', -- INFO, LOW, MEDIUM, HIGH, CRITICAL
    ip_address text,
    user_agent text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS for both
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Only SUPER_ADMIN or ADMIN can read audit_logs & security_events
-- We will enforce this via application code (Server Actions) but let's add basic RLS block.
-- By default, if RLS is enabled without policies, NO ONE (except service_role) can access it via anon/authenticated.
-- This is secure by default! We only access these via Service Role key in Server Actions.
