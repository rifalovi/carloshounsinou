import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const cwd = process.cwd();
const photoPath = join(cwd, 'public', 'images', 'carlos-hero-1200.jpg');

if (!existsSync(photoPath)) {
  console.error('Photo source introuvable :', photoPath);
  process.exit(1);
}

// Left column: crop portrait to 480x630
const photoBuffer = await sharp(photoPath)
  .resize(480, 630, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 90 })
  .toBuffer();

// Right column SVG text layer (1200x630, photo sits at x=0)
const svgText = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">

  <!-- Cream background (right side only) -->
  <rect x="480" y="0" width="720" height="630" fill="#F5EFE6"/>

  <!-- Subtle separator line -->
  <rect x="478" y="0" width="3" height="630" fill="#B45309" opacity="0.3"/>

  <g transform="translate(560, 0)">

    <!-- CH logo -->
    <rect x="0" y="58" width="40" height="40" fill="#0A1628"/>
    <text x="20" y="83" font-family="Georgia, serif"
          font-size="17" font-weight="700" fill="#F5EFE6"
          text-anchor="middle">CH</text>
    <rect x="28" y="86" width="12" height="12" fill="#B45309"/>

    <!-- Pill label -->
    <text x="0" y="152" font-family="'Courier New', Courier, monospace"
          font-size="13" fill="#475569" letter-spacing="1">
      Pilotage · Construction · 13 ans
    </text>

    <!-- H1 line 1 -->
    <text x="0" y="226" font-family="Georgia, 'Times New Roman', serif"
          font-size="48" font-weight="500" fill="#0A1628">Piloter des</text>
    <text x="0" y="278" font-family="Georgia, 'Times New Roman', serif"
          font-size="48" font-style="italic" font-weight="500" fill="#B45309">programmes.</text>

    <!-- H1 line 2 -->
    <text x="0" y="346" font-family="Georgia, 'Times New Roman', serif"
          font-size="48" font-weight="500" fill="#0A1628">Bâtir des</text>
    <text x="0" y="398" font-family="Georgia, 'Times New Roman', serif"
          font-size="48" font-style="italic" font-weight="500" fill="#B45309">systèmes</text>
    <text x="310" y="398" font-family="Georgia, 'Times New Roman', serif"
          font-size="48" font-weight="500" fill="#0A1628"> durables.</text>

    <!-- Copper rule + signature -->
    <rect x="0" y="440" width="48" height="2" fill="#B45309" opacity="0.7"/>
    <text x="64" y="453" font-family="'Courier New', Courier, monospace"
          font-size="13" font-weight="600" fill="#0A1628" letter-spacing="3">
      STRATÈGE QUI SAIT BÂTIR
    </text>

    <!-- URL bottom-right -->
    <text x="580" y="575" font-family="'Courier New', Courier, monospace"
          font-size="13" fill="#475569" text-anchor="end" letter-spacing="1">
      carloshounsinou.com
    </text>

  </g>
</svg>`;

const textBuffer = Buffer.from(svgText);

const outputPath = join(cwd, 'public', 'og-image.jpg');

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: { r: 245, g: 239, b: 230 },
  },
})
  .composite([
    { input: photoBuffer, left: 0, top: 0 },
    { input: textBuffer, left: 0, top: 0 },
  ])
  .jpeg({ quality: 92 })
  .toFile(outputPath);

const { size } = await sharp(outputPath).metadata();
console.log('OG image generated:', outputPath);
console.log('Size:', Math.round(size / 1024), 'KB — dimensions: 1200x630');
