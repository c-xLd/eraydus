-- Contact form messages table
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text not null,
  message     text not null,
  created_at  timestamptz not null default now(),
  is_read     boolean not null default false
);

-- Only authenticated admins can read/update; anyone can insert (public contact form)
alter table public.messages enable row level security;

drop policy if exists "Anyone can submit a message" on public.messages;
create policy "Anyone can submit a message"
  on public.messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read messages" on public.messages;
create policy "Admins can read messages"
  on public.messages for select
  to authenticated
  using (true);

drop policy if exists "Admins can update messages" on public.messages;
create policy "Admins can update messages"
  on public.messages for update
  to authenticated
  using (true);
