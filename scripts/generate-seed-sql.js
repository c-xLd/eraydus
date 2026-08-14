const fs = require('fs');
const path = require('path');

const tsFilePath = path.join(process.cwd(), 'lib/data/fallback-blogs.ts');
const tsContent = fs.readFileSync(tsFilePath, 'utf8');

const arrayMatch = tsContent.match(/export const fallbackBlogPosts: BlogPost\[\] = (\[[\s\S]*\])/);
if (!arrayMatch) {
  console.error("Could not extract the blog posts array.");
  process.exit(1);
}

const posts = eval(`(${arrayMatch[1]})`);
console.log(`Found ${posts.length} posts. Generating SQL...`);

const sqlStatements = [];

for (const post of posts) {
  const esc = (s) => (s || '').replace(/'/g, "''");
  const tagsArray = post.tags ? `ARRAY[${post.tags.map(t => `'${esc(t)}'`).join(',')}]` : 'NULL';

  sqlStatements.push(`
INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  '${esc(post.title)}',
  '${esc(post.slug)}',
  '${esc(post.description)}',
  '${esc(post.body)}',
  '${esc(post.featured_image)}',
  '${post.published_at || new Date().toISOString()}',
  '${esc(post.seo_title)}',
  '${esc(post.seo_description)}',
  ${tagsArray},
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();`);
}

const fullSql = sqlStatements.join('\n');
const sqlPath = path.join(process.cwd(), 'scripts', 'seed-blogs.sql');
fs.writeFileSync(sqlPath, fullSql);
console.log(`SQL file written (${sqlStatements.length} statements)`);
