-- Supabase Security Advisor Uyarısı Düzeltmesi:
-- "Clients can list all files in this bucket"
-- "products" public bucket'ında storage.objects üzerindeki genel SELECT politikası,
-- dışarıdan herkese (anon) .list() yöntemiyle tüm dosya ve dizin listesini çekme izni verir.
-- Public bucket içerisindeki görseller public URL üzerinden doğrudan okunabilir; bu nedenle SELECT politikası gereksizdir ve güvenlik uyarısına sebep olur.

DROP POLICY IF EXISTS "Allow public read from products" ON storage.objects;
