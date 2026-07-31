-- Kumlama Modelleri tablosuna yeni özellikler ekleme
alter table public.sandblasted_models
add column if not exists is_active boolean default true not null,
add column if not exists order_index integer default 0 not null;

-- Index for ordering
create index if not exists sandblasted_models_order_index_idx on public.sandblasted_models(order_index);
