// `npm run media:blob` — pushes the seed photos to Vercel Blob under the exact names Payload's
// media collection stores (original + every image size), so a DB seeded with these photos
// resolves them in production. Sources come from ./media, i.e. run `npm run seed` locally first:
// the sizes there carry the seed's focal-point crops.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { put } from '@vercel/blob';

const token = process.env['BLOB_READ_WRITE_TOKEN'];
if (!token) {
  console.error('BLOB_READ_WRITE_TOKEN is not set.');
  process.exit(1);
}

const mediaDir = path.resolve('media');
const seedImages = await readdir(path.resolve('src/cms/seed/images'));
const mediaFiles = await readdir(mediaDir);
const contentTypes = { '.webp': 'image/webp', '.jpg': 'image/jpeg' };

const files = [];
for (const image of seedImages) {
  const base = path.parse(image).name;
  // "interior.webp", "interior-400x400.webp", "interior-1200x630.jpg" — not "interior-1.webp".
  const pattern = new RegExp(`^${base}(-\\d+x\\d+)?\\.(webp|jpg)$`);
  const matches = mediaFiles.filter((f) => pattern.test(f));
  if (!matches.length) console.warn(`skip ${image}: not in ./media (not used by the seed?)`);
  files.push(...matches);
}

let done = 0;
for (let i = 0; i < files.length; i += 8) {
  await Promise.all(
    files.slice(i, i + 8).map(async (file) => {
      await put(file, await readFile(path.join(mediaDir, file)), {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 365 * 24 * 60 * 60, // matches the Payload adapter's default
        contentType: contentTypes[path.extname(file)],
        token,
      });
      done += 1;
    }),
  );
  console.log(`${done}/${files.length}`);
}
console.log(`Uploaded ${done} files to Vercel Blob.`);
