import fs from 'fs';

try {
  const content = fs.readFileSync('.env.local', 'utf8');
  console.log('--- .env.local ---');
  console.log(content);
} catch (e) {
  console.error(e);
}
