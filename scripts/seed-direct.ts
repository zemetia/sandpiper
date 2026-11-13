// `npm run seed:direct` — seeds an empty site straight into the database, no running app needed.
// Use it for production (Vercel + Neon): set DATABASE_URI (it wins over DATABASE_URL in .env),
// BLOB_READ_WRITE_TOKEN (Vercel Blob) and SEED_ADMIN_* to the production values, then run it from your machine.
// Production mode stops the dev schema push (which would mark the DB) and runs pending migrations.
Object.assign(process.env, { NODE_ENV: 'production' });

import { createLocalReq, getPayload } from 'payload';

import config from '../src/payload.config';
import { seed } from '../src/cms/seed';

const payload = await getPayload({ config });
const exit = async (code: number) => {
  await payload.db.destroy?.();
  process.exit(code);
};

const { totalDocs } = await payload.count({ collection: 'pages', overrideAccess: true });
if (totalDocs > 0) {
  console.error('Content already exists — seeding only runs on an empty site.');
  await exit(1);
}

if (!process.env['BLOB_READ_WRITE_TOKEN']) {
  console.warn('BLOB_READ_WRITE_TOKEN is not set — photos go to ./media, which Vercel cannot serve.');
}

try {
  await seed(payload, await createLocalReq({}, payload));
  console.log('Seeded.');
  await exit(0);
} catch (error) {
  console.error('Seeding failed:', error);
  await exit(1);
}
