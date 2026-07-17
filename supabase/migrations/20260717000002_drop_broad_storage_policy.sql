-- Supabase Security Advisor uyarısını düzeltmek için:
-- Public bucket'larda storage.objects tablosuna genel bir SELECT policy tanımlanması, 
-- dışarıdan herkesin (anon) dosya listesini (.list()) çekmesine olanak tanır.
-- Dosyalara dışarıdan erişmek için public bucket olması yeterlidir, SELECT policy gerekmez.

drop policy if exists "Public can read kumlama model images" on storage.objects;
