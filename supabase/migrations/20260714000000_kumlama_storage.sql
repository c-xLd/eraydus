-- Kumlama model görselleri için Supabase Storage bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'kumlama-models',
  'kumlama-models',
  true,
  '10MiB',
  '{image/png,image/jpeg,image/webp,image/gif}'
)
on conflict (id) do nothing;

-- Herkese açık okuma (site vitrininde gösterim için)
create policy "Public can read kumlama model images"
  on storage.objects for select
  using ( bucket_id = 'kumlama-models' );

-- Yükleme (admin anon istemcisi ile)
create policy "Allow upload to kumlama-models"
  on storage.objects for insert
  with check ( bucket_id = 'kumlama-models' );

create policy "Allow update to kumlama-models"
  on storage.objects for update
  using ( bucket_id = 'kumlama-models' );

create policy "Allow delete from kumlama-models"
  on storage.objects for delete
  using ( bucket_id = 'kumlama-models' );

-- sandblasted_models tablosuna kayıt ekleme (admin)
create policy "Allow insert sandblasted_models"
  on public.sandblasted_models for insert
  with check ( true );
