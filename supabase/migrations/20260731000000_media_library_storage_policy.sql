-- Allow anyone (public/anon & authenticated) to list files in these specific buckets
CREATE POLICY "Media library select policy"
ON storage.objects FOR SELECT
USING ( bucket_id IN ('products', 'projects', 'uploads', 'kumlama-models') );
