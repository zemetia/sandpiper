const SITE_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000';

/** Public path for a page slug — "home" maps to the locale root. */
export const pagePath = (slug: string | null | undefined): string =>
  !slug || slug === 'home' ? '' : `/${slug}`;

/**
 * Absolute URL that enables Next.js draft mode and redirects to the page.
 * Used by both the "Preview" button and the Live Preview iframe.
 */
export const previewUrl = (path: string, locale: string | undefined): string =>
  `${SITE_URL}/preview?path=${encodeURIComponent(`/${locale ?? 'en'}${path}`)}`;
