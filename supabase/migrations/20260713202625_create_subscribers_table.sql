create table public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  status text not null default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.subscribers enable row level security;

-- Only authenticated users (admins) can view subscribers
create policy "Allow authenticated users to read subscribers"
  on public.subscribers for select
  using ( auth.role() = 'authenticated' );

-- Anyone can subscribe
create policy "Allow anyone to insert subscribers"
  on public.subscribers for insert
  with check ( true );
