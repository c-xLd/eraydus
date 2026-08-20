-- Replace known template phone numbers without overwriting legitimate custom settings.
UPDATE public.site_settings
SET
  value = jsonb_set(value, '{contact,phone}', to_jsonb('+90 312 350 79 39'::text), true),
  updated_at = now()
WHERE key = 'global_seo'
  AND COALESCE(value #>> '{contact,phone}', '') IN (
    '',
    '+90 555 123 4567',
    '+905551234567',
    '905551234567'
  );

UPDATE public.site_settings
SET
  value = jsonb_set(value, '{whatsappNumber}', to_jsonb('+905548830071'::text), true),
  updated_at = now()
WHERE key = 'general_settings'
  AND COALESCE(value #>> '{whatsappNumber}', '') IN (
    '',
    '+90 555 123 4567',
    '+905551234567',
    '905551234567',
    '+905550000000',
    '905550000000',
    '+905000000000',
    '905000000000'
  );
