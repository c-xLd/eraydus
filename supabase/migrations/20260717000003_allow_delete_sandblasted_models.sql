-- sandblasted_models tablosundan veri silmek için policy (admin)
create policy "Allow delete sandblasted_models"
  on public.sandblasted_models for delete
  using ( true );
