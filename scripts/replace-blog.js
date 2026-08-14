const fs = require('fs');
let content = fs.readFileSync('lib/data/blog.ts', 'utf8');
content = content.replace(/export const fallbackBlogPosts: BlogPost\[\] = \[[\s\S]*?\]\n/, 'import { fallbackBlogPosts } from "./fallback-blogs"\n');
fs.writeFileSync('lib/data/blog.ts', content);
console.log('Successfully replaced fallbackBlogPosts.');
