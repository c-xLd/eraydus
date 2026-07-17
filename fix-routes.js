const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'app', '(main)', 'koleksiyonlar');
const categorySlugPath = path.join(basePath, '[category_slug]');
const categorySlugPage = path.join(categorySlugPath, 'page.tsx');
const categorySlugProduct = path.join(categorySlugPath, '[product_slug]');
const idPath = path.join(basePath, '[id]');
const idProduct = path.join(idPath, '[product_slug]');

try {
  // 1. Delete redundant [category_slug]/page.tsx
  if (fs.existsSync(categorySlugPage)) {
    fs.unlinkSync(categorySlugPage);
    console.log('Deleted redundant [category_slug]/page.tsx');
  }

  // 2. Move [category_slug]/[product_slug] to [id]/[product_slug]
  if (fs.existsSync(categorySlugProduct)) {
    if (!fs.existsSync(idPath)) {
      fs.mkdirSync(idPath, { recursive: true });
    }
    fs.renameSync(categorySlugProduct, idProduct);
    console.log('Moved [product_slug] directory to [id]/[product_slug]');
  }

  // 3. Remove [category_slug] directory if it's empty
  if (fs.existsSync(categorySlugPath)) {
    const files = fs.readdirSync(categorySlugPath);
    if (files.length === 0) {
      fs.rmdirSync(categorySlugPath);
      console.log('Removed empty [category_slug] directory');
    } else {
      console.log(`Directory [category_slug] is not empty: ${files.join(', ')}`);
    }
  }

  console.log('Route fixing complete! Next.js dev server should automatically recover.');
} catch (error) {
  console.error('Error fixing routes:', error);
}
