ALTER TABLE public.seo_settings
ADD COLUMN IF NOT EXISTS schema_settings jsonb DEFAULT '{
  "organization_name": "Erayduş",
  "organization_logo": "",
  "contact_phone": "",
  "contact_email": "",
  "social_facebook": "",
  "social_instagram": "",
  "social_twitter": "",
  "enable_product_schema": true,
  "enable_breadcrumb_schema": true
}'::jsonb;
