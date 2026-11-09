import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LIMIT = 60;
// The Payload admin fires dozens of /api calls per screen. The cookie is unverified here,
// so it only raises the ceiling — it never removes the limit.
const CMS_SESSION_LIMIT = 600;
const WINDOW_MS = 60_000; // 1 minute

// Edge-safe in-memory sliding window rate limiter
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipMap = new Map<string, RateLimitRecord>();

export async function applyRateLimit(request: NextRequest): Promise<NextResponse | null> {
  if (!request.nextUrl.pathname.startsWith('/api')) return null;

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'anonymous';
  const hasSession = request.cookies.has('payload-token');
  const limit = hasSession ? CMS_SESSION_LIMIT : LIMIT;
  const key = hasSession ? `cms:${ip}` : ip;

  const now = Date.now();
  const record = ipMap.get(key);

  if (!record || now > record.resetAt) {
    ipMap.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }

  record.count += 1;

  if (record.count > limit) {
    const retryAfter = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(limit),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.floor(record.resetAt / 1000)),
      },
    });
  }

  return null;
}
