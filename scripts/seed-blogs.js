const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  try {
    console.log("Reading fallback-blogs.ts...");
    const tsFilePath = path.join(process.cwd(), 'lib/data/fallback-blogs.ts');
    let tsContent = fs.readFileSync(tsFilePath, 'utf8');

    const arrayMatch = tsContent.match(/export const (?:fallbackBlogPosts|fallbackBlogPosts2): BlogPost\[\] = (\[[\s\S]*\]);?/);
    if (!arrayMatch) throw new Error("Could not extract the blog posts array from the file.");

    const posts = eval(`(${arrayMatch[1]})`);
    console.log(`Found ${posts.length} posts to upsert.`);

    // Get existing posts to map slug -> id
    const { data: existing, error: fetchErr } = await supabase.from('blog').select('id, slug');
    if (fetchErr) throw fetchErr;

    const slugToId = {};
    existing.forEach(row => slugToId[row.slug] = row.id);

    const mappedPosts = posts.map(post => {
      const payload = { ...post, status: 'published', published_at: post.published_at || new Date().toISOString() };
      // Map to UUID if exists, otherwise delete ID so supabase generates one
      if (slugToId[post.slug]) {
        payload.id = slugToId[post.slug];
      } else {
        delete payload.id;
      }
      return payload;
    });

    const { data, error } = await supabase.from('blog').upsert(mappedPosts, { onConflict: 'id' });

    if (error) {
      console.error("Supabase Error:", error);
    } else {
      console.log("Successfully seeded blog posts to database!");
    }
  } catch (error) {
    console.error("Seed failed:", error);
  }
}

seed();
