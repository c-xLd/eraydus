-- Genel amaçlı yüklemeler (anasayfa görselleri vb.) için Supabase Storage bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'uploads',
  'uploads',
  true,
  10485760, -- 10MB limit
  '{image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml}'
)
on conflict (id) do nothing;

-- NOT: Public bucket'ta okuma için storage.objects üzerinde SELECT policy GEREKMEZ.
-- Görseller /storage/v1/object/public/... üzerinden RLS'e bakılmadan servis edilir.
-- Geniş bir SELECT policy, anon istemcilerin .list() ile tüm dosyaları görmesine
-- yol açar (Security Advisor uyarısı) — bu yüzden eklenmiyor.

-- Upload (admin or authenticated)
create policy "Allow upload to uploads"
  on storage.objects for insert
  with check ( bucket_id = 'uploads' );

create policy "Allow update to uploads"
  on storage.objects for update
  using ( bucket_id = 'uploads' );

create policy "Allow delete from uploads"
  on storage.objects for delete
  using ( bucket_id = 'uploads' );
