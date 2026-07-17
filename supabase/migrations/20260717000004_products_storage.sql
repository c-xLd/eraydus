-- Ürün görselleri için Supabase Storage bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'products',
  'products',
  true,
  10485760, -- 10MB limit
  '{image/png,image/jpeg,image/webp,image/gif}'
)
on conflict (id) do nothing;

-- Public read access
create policy "Allow public read from products"
  on storage.objects for select
  using ( bucket_id = 'products' );

-- Upload (admin or authenticated)
create policy "Allow upload to products"
  on storage.objects for insert
  with check ( bucket_id = 'products' );

create policy "Allow update to products"
  on storage.objects for update
  using ( bucket_id = 'products' );

create policy "Allow delete from products"
  on storage.objects for delete
  using ( bucket_id = 'products' );
