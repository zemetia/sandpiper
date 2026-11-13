import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { applyRateLimit } from './proxy/rate-limit';
import { applySecurityHeaders } from './proxy/security-headers';

// URLs from the old locale-prefixed routing (`/en/menu`, `/id`) — redirect to the unprefixed page.
const LEGACY_LOCALE = /^\/(?:en|id)(?=\/|$)/;

export async function middleware(request: NextRequest) {
  // Rate limit — returns 429 early for /api/* if threshold exceeded
  const rateLimited = await applyRateLimit(request);
  if (rateLimited) return rateLimited;

  const { pathname } = request.nextUrl;
  if (LEGACY_LOCALE.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(LEGACY_LOCALE, '') || '/';
    return applySecurityHeaders(NextResponse.redirect(url, 308));
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    // All routes except static assets and SEO files — /api is included so rate limiting applies
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};
