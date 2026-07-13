<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Supabase Setup & Conventions

**Documentation**: See [16_SUPABASE_DATABASE_SCHEMA.md](docs/ERAYDUS-DIGITAL-SHOWROOM/16_SUPABASE_DATABASE_SCHEMA.md) for complete schema design and architecture principles.

### Client Initialization (CRITICAL)
- **Server Components & Route Handlers**: Use `createClient()` from `lib/server.ts`
  - **WARNING**: With Fluid compute, create a NEW client instance within each function—never use global variables
  - Sessions managed via HTTP-only cookies (Next.js middleware refreshes on every request)
- **Client Components**: Use `createClient()` from `lib/client.ts` 
  - Uses `createBrowserClient` from `@supabase/ssr`
- **Legacy/Non-SSR contexts**: Use `lib/supabase.ts` (simple JS client)

### Authentication Flow
- Supabase Auth handles user identity
- Middleware (`middleware.ts`) validates & refreshes tokens automatically
- User context always available in Server Components via `auth.getUser()`
- Sessions stored in cookies—automatically cleared on logout

### Database Schema & RLS
- **Core tables**: `profiles` (FK to `auth.users`), `categories`, `collections`, `products`
- **Admin tables**: `inventory`, `quotes`, `customers`, `seo`, `content_calendar`, `notifications`, `team`, `analytics`, `reports`
- **RLS Status**: Currently only public read access for active products/collections/categories
  - Infrastructure ready for role-based CRUD policies (role IDs exist in `profiles`)
  - Add RLS policies when implementing admin features
- **All tables**: Have RLS ENABLED, `uuid` PKs with `gen_random_uuid()`, timestamps (`created_at`, `updated_at`)

### Query Patterns
```tsx
// Server: Always await
const supabase = await createClient()
const { data, error } = await supabase.from('products').select('*').eq('status', 'active')

// Client: May use `.then()` or `await` in event handlers
const client = createClient()
client.from('messages').insert([{ ... }])
```

### Migrations & Seeds
- Location: `supabase/migrations/` and `supabase/seed.sql`
- Use `ON CONFLICT ... DO UPDATE` for idempotent seeding
- Timestamp format: `20260705000000_description.sql`
- Apply via Supabase CLI: `supabase db push`

### Common Gaps (For Now)
- Realtime subscriptions not implemented (tables created, subscriptions not wired)
- Edge Functions not deployed yet
- RLS policies minimal—extend when working on admin panel
