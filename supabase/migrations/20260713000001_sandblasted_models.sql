-- Kumlama Cam Modelleri (Sandblasted Glass Models)
create table public.sandblasted_models (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.sandblasted_models enable row level security;

-- Policies
create policy "Public can view active sandblasted_models." on public.sandblasted_models
  for select using (true);

-- Insert dummy data
insert into public.sandblasted_models (title, image_url) values 
  ('Çizgili Modern Desen', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=600&auto=format&fit=crop'),
  ('Dalgalı Klasik', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop'),
  ('Buzlu Geometrik', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop'),
  ('Minimalist Mat', 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=600&auto=format&fit=crop');
