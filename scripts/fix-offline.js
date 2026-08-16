import fs from 'fs';
import path from 'path';

const distIndexPath = path.resolve('dist/index.html');
const destDir = 'D:/Web THCS Đồng Tân';
const destIndexPath = path.join(destDir, 'index.html');
const destDistIndexPath = path.join(destDir, 'dist/index.html');

try {
  let content = fs.readFileSync(distIndexPath, 'utf8');
  
  // Remove type="module" and crossorigin attributes to allow native execution over file:// protocol in Chrome/Edge
  content = content.replaceAll('type="module" crossorigin', '');
  content = content.replaceAll('type="module"', '');
  content = content.replaceAll('crossorigin', '');

  fs.writeFileSync(distIndexPath, content, 'utf8');
  console.log('✅ Fixed dist/index.html module attributes');

  if (fs.existsSync(destDir)) {
    fs.writeFileSync(destIndexPath, content, 'utf8');
    if (fs.existsSync(path.join(destDir, 'dist'))) {
      fs.writeFileSync(destDistIndexPath, content, 'utf8');
    }
    console.log(`✅ Successfully updated ${destIndexPath} for instant file:// offline access!`);
  }
} catch (err) {
  console.error('Lỗi khi fix file index.html:', err);
}
