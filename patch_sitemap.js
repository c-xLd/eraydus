const fs = require('fs');

const path = 'app/sitemap.ts';
let code = fs.readFileSync(path, 'utf8');
code = code.replace(
  /const supabase = createClient\(supabaseUrl, supabaseAnonKey\)/,
  `const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder')`
);
fs.writeFileSync(path, code);
