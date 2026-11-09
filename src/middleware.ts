import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { routing } from './i18n/routing';
import { applyRateLimit } from './proxy/rate-limit';
import { applySecurityHeaders } from './proxy/security-headers';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Rate limit — returns 429 early for /api/* if threshold exceeded
  const rateLimited = await applyRateLimit(request);
  if (rateLimited) return rateLimited;

  const { pathname } = request.nextUrl;

  // Admin, API and draft-preview routes — skip intl routing, only security headers
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/preview')
  ) {
    return applySecurityHeaders(NextResponse.next());
  }

  // Page routes — intl locale routing + security headers
  return applySecurityHeaders(intlMiddleware(request));
}

export const config = {
  matcher: [
    // All routes except static assets — /api is included so rate limiting applies
    // SEO files (sitemap/robots/llms.txt) are excluded so they are not locale-redirected.
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};
