const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'app', '(main)', 'koleksiyonlar');
const categorySlugPath = path.join(basePath, '[category_slug]');

function rmDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file, index) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        rmDir(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

try {
  rmDir(categorySlugPath);
  console.log('Successfully deleted the conflicting [category_slug] directory!');
} catch (err) {
  console.error('Error deleting directory:', err);
}
