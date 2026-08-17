DO $$
BEGIN
  -- Check if publication exists, if not we can't alter it, but Supabase creates it by default.
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE messages;
    EXCEPTION WHEN OTHERS THEN
      -- Table might already be in publication, ignore
    END;
    
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
    EXCEPTION WHEN OTHERS THEN
      -- Ignore
    END;
  END IF;
END;
$$;
