-- Supabase Security Advisor uyarısını düzeltmek için:
-- "uploads" public bucket'ında storage.objects üzerindeki geniş SELECT policy,
-- dışarıdan herkesin (anon) .list() ile tüm dosya listesini çekmesine olanak tanır.
-- Public bucket'ta dosyalar zaten public URL üzerinden erişilebilir; SELECT policy gereksizdir.

drop policy if exists "Allow public read from uploads" on storage.objects;
