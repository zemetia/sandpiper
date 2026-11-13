/**
 * Absolute origin of the site. `NEXT_PUBLIC_APP_URL` wins; on Vercel it falls back to the
 * production domain Vercel sets. A value saved without a scheme (`example.vercel.app`) gets
 * `https://` — `new URL()` rejects it otherwise and every page's metadata throws.
 */
const raw =
  process.env['NEXT_PUBLIC_APP_URL'] || process.env['VERCEL_PROJECT_PRODUCTION_URL'] || '';

export const appUrl = raw
  ? (/^https?:\/\//.test(raw) ? raw : `https://${raw}`).replace(/\/+$/, '')
  : undefined;
