const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '..', 'app', '(main)', 'kategori');

if (fs.existsSync(dirPath)) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  console.log('Deleted: ' + dirPath);
} else {
  console.log('Not found: ' + dirPath);
}
