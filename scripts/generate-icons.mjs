import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';

const svgContent = readFileSync(join(process.cwd(), 'app', 'icon.svg'));

// icon.png (32x32) — picked up by Next.js as <link rel="icon" type="image/png">
await sharp(svgContent, { density: 600 })
  .resize(32, 32)
  .png()
  .toFile(join(process.cwd(), 'app', 'icon.png'));

// apple-icon.png (180x180) — iOS home screen
await sharp(svgContent, { density: 600 })
  .resize(180, 180)
  .png()
  .toFile(join(process.cwd(), 'app', 'apple-icon.png'));

// favicon.ico (48x48 → .ico) — fallback for legacy browsers
await sharp(svgContent, { density: 600 })
  .resize(48, 48)
  .png()
  .toFile(join(process.cwd(), 'app', 'favicon.ico'));

// icon-512.png for PWA / high-res Android
await sharp(svgContent, { density: 600 })
  .resize(512, 512)
  .png()
  .toFile(join(process.cwd(), 'public', 'icon-512.png'));

console.log('Icons generated successfully');
