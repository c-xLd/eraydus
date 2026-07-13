-- Admin Features Schema Extension for Eraydus
-- Includes: Inventory, Quotes, Customers, SEO, Content Calendar, Notifications, Reports, Team Management, Analytics

-- 1. INVENTORY & PRODUCT MANAGEMENT
-- Product Variants Table
CREATE TABLE IF NOT EXISTS public.product_variants (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  price numeric(10, 2),
  stock_quantity integer DEFAULT 0,
  low_stock_alert integer DEFAULT 10,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Product Inventory Table
CREATE TABLE IF NOT EXISTS public.product_inventory (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  warehouse_location text,
  current_stock integer DEFAULT 0,
  reserved_stock integer DEFAULT 0,
  available_stock integer DEFAULT 0,
  last_restocked timestamp with time zone,
  reorder_point integer DEFAULT 20,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Stock Movement History
CREATE TABLE IF NOT EXISTS public.stock_movements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  movement_type text NOT NULL, -- 'in', 'out', 'adjustment', 'return'
  quantity integer NOT NULL,
  reference_id uuid,
  reference_type text, -- 'quote', 'order', 'manual'
  notes text,
  created_by uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT now()
);

-- 2. QUOTE MANAGEMENT
CREATE TABLE IF NOT EXISTS public.quotes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text,
  customer_phone text,
  customer_id uuid REFERENCES public.profiles(id),
  source text NOT NULL, -- 'configurator', 'whatsapp', 'contact_form', 'direct'
  status text DEFAULT 'pending', -- 'pending', 'sent', 'viewed', 'accepted', 'rejected', 'expired'
  total_amount numeric(12, 2),
  validity_days integer DEFAULT 30,
  valid_until timestamp with time zone,
  notes text,
  internal_notes text,
  assigned_to uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.quote_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id uuid NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id),
  product_variant_id uuid REFERENCES public.product_variants(id),
  quantity integer NOT NULL DEFAULT 1,
  unit_price numeric(10, 2) NOT NULL,
  total_price numeric(12, 2),
  customization_details jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. CUSTOMER MANAGEMENT
CREATE TABLE IF NOT EXISTS public.customers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  phone text,
  first_name text,
  last_name text,
  company_name text,
  address text,
  city text,
  postal_code text,
  country text DEFAULT 'Türkiye',
  customer_type text DEFAULT 'individual', -- 'individual', 'business'
  status text DEFAULT 'active',
  total_quotes integer DEFAULT 0,
  total_spent numeric(12, 2) DEFAULT 0,
  last_contacted timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.customer_contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  contact_type text NOT NULL, -- 'email', 'phone', 'whatsapp', 'in_person'
  subject text,
  message text,
  response text,
  contact_status text DEFAULT 'pending', -- 'pending', 'responded', 'resolved'
  contacted_by uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT now(),
  resolved_at timestamp with time zone
);

-- Customer Segmentation
CREATE TABLE IF NOT EXISTS public.customer_segments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  segment_name text NOT NULL, -- 'vip', 'repeat', 'new', 'inactive', 'high_value'
  created_at timestamp with time zone DEFAULT now()
);

-- 4. SEO & ANALYTICS
CREATE TABLE IF NOT EXISTS public.seo_metadata (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page_type text NOT NULL, -- 'product', 'collection', 'page', 'blog'
  page_id uuid,
  page_slug text,
  title text NOT NULL,
  description text,
  keywords text,
  og_image text,
  og_title text,
  og_description text,
  robots_index boolean DEFAULT true,
  robots_follow boolean DEFAULT true,
  canonical_url text,
  status text DEFAULT 'published',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.page_analytics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug text NOT NULL,
  page_title text,
  views_total integer DEFAULT 0,
  views_unique integer DEFAULT 0,
  bounce_rate numeric(5, 2),
  avg_time_on_page numeric(8, 2),
  conversion_rate numeric(5, 2),
  traffic_source text, -- 'organic', 'direct', 'referral', 'paid', 'social'
  date date NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Keyword Tracking
CREATE TABLE IF NOT EXISTS public.keyword_rankings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword text NOT NULL,
  target_page_slug text,
  current_rank integer,
  previous_rank integer,
  search_volume integer,
  search_intent text, -- 'informational', 'navigational', 'transactional'
  tracked_date date NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- 5. CONTENT CALENDAR
CREATE TABLE IF NOT EXISTS public.content_calendar (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text,
  content_type text NOT NULL, -- 'blog', 'page', 'social', 'email'
  description text,
  body text,
  language text DEFAULT 'tr', -- 'tr', 'en'
  status text DEFAULT 'draft', -- 'draft', 'scheduled', 'published', 'archived'
  featured_image text,
  author_id uuid REFERENCES public.profiles(id),
  scheduled_for timestamp with time zone,
  published_at timestamp with time zone,
  seo_title text,
  seo_description text,
  seo_keywords text,
  tags text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Content Revisions
CREATE TABLE IF NOT EXISTS public.content_revisions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id uuid NOT NULL REFERENCES public.content_calendar(id) ON DELETE CASCADE,
  version integer,
  body text,
  changed_by uuid REFERENCES public.profiles(id),
  change_summary text,
  created_at timestamp with time zone DEFAULT now()
);

-- 6. NOTIFICATIONS & ALERTS
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notification_type text NOT NULL, -- 'quote_received', 'low_stock', 'new_contact', 'system'
  title text NOT NULL,
  message text,
  reference_id uuid,
  reference_type text,
  is_read boolean DEFAULT false,
  action_url text,
  created_at timestamp with time zone DEFAULT now(),
  read_at timestamp with time zone
);

-- Alert Rules
CREATE TABLE IF NOT EXISTS public.alert_rules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_name text NOT NULL,
  rule_type text NOT NULL, -- 'stock', 'quote', 'customer', 'sales'
  trigger_condition jsonb NOT NULL,
  recipients uuid[] DEFAULT ARRAY[]::uuid[],
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 7. REPORTS & KPIs
CREATE TABLE IF NOT EXISTS public.reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  report_name text NOT NULL,
  report_type text NOT NULL, -- 'sales', 'analytics', 'inventory', 'customer', 'custom'
  description text,
  date_range_from date,
  date_range_to date,
  data jsonb,
  generated_by uuid REFERENCES public.profiles(id),
  generated_at timestamp with time zone DEFAULT now(),
  exported_format text, -- 'pdf', 'csv', 'excel'
  exported_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.kpi_metrics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name text NOT NULL,
  metric_value numeric(12, 2),
  target_value numeric(12, 2),
  achievement_percentage numeric(5, 2),
  metric_date date NOT NULL,
  period text, -- 'daily', 'weekly', 'monthly', 'yearly'
  category text, -- 'sales', 'conversion', 'engagement', 'customer'
  created_at timestamp with time zone DEFAULT now()
);

-- 8. TEAM MANAGEMENT
CREATE TABLE IF NOT EXISTS public.roles (
  id integer PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text,
  permissions jsonb,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role_id integer REFERENCES public.roles(id),
  department text,
  position text,
  manager_id uuid REFERENCES public.team_members(id),
  is_active boolean DEFAULT true,
  joined_date date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Activity Audit Log
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id),
  action_type text NOT NULL, -- 'create', 'update', 'delete', 'view', 'export'
  resource_type text NOT NULL, -- 'product', 'quote', 'customer', 'content'
  resource_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

-- 9. REAL-TIME ANALYTICS
CREATE TABLE IF NOT EXISTS public.visitor_tracking (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text NOT NULL,
  page_slug text,
  page_title text,
  referrer text,
  user_agent text,
  ip_address text,
  device_type text, -- 'mobile', 'tablet', 'desktop'
  browser text,
  country text,
  city text,
  duration_seconds integer,
  timestamp_enter timestamp with time zone,
  timestamp_exit timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Conversion Tracking
CREATE TABLE IF NOT EXISTS public.conversions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text,
  conversion_type text NOT NULL, -- 'quote_request', 'contact_form', 'demo_request'
  quote_id uuid REFERENCES public.quotes(id),
  conversion_value numeric(10, 2),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamp with time zone DEFAULT now()
);

-- INDEXING for Performance
CREATE INDEX idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX idx_product_inventory_product_id ON public.product_inventory(product_id);
CREATE INDEX idx_stock_movements_product_id ON public.stock_movements(product_id);
CREATE INDEX idx_quotes_status ON public.quotes(status);
CREATE INDEX idx_quotes_customer_id ON public.quotes(customer_id);
CREATE INDEX idx_quote_items_quote_id ON public.quote_items(quote_id);
CREATE INDEX idx_customers_email ON public.customers(email);
CREATE INDEX idx_customer_contacts_customer_id ON public.customer_contacts(customer_id);
CREATE INDEX idx_page_analytics_slug ON public.page_analytics(page_slug);
CREATE INDEX idx_page_analytics_date ON public.page_analytics(date);
CREATE INDEX idx_keyword_rankings_keyword ON public.keyword_rankings(keyword);
CREATE INDEX idx_content_calendar_status ON public.content_calendar(status);
CREATE INDEX idx_content_calendar_language ON public.content_calendar(language);
CREATE INDEX idx_notifications_recipient ON public.notifications(recipient_id);
CREATE INDEX idx_notifications_read ON public.notifications(is_read);
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at);
CREATE INDEX idx_visitor_tracking_session ON public.visitor_tracking(session_id);
CREATE INDEX idx_conversions_session ON public.conversions(session_id);

-- RLS POLICIES
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keyword_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpi_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversions ENABLE ROW LEVEL SECURITY;
