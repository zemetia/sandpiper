// `npm run seed` — seeds an empty site through the running app's POST /api/seed.
// Start the app first (`npm run dev`). Needs SEED_SECRET; set SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD
// to also create the first admin when the users table is empty.
const base = process.env.SEED_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const secret = process.env.SEED_SECRET;

if (!secret) {
  console.error('SEED_SECRET is not set (see .env.example).');
  process.exit(1);
}

const res = await fetch(new URL('/api/seed', base), {
  method: 'POST',
  headers: { Authorization: `Bearer ${secret}` },
}).catch((error) => {
  console.error(
    `Could not reach ${base} — is the app running?`,
    error.cause?.code ?? error.message,
  );
  process.exit(1);
});

const body = await res.json().catch(() => ({}));
if (!res.ok) {
  console.error(`Seed failed (${res.status}): ${body.error ?? res.statusText}`);
  process.exit(1);
}
console.log(`Seeded ${base}`);
