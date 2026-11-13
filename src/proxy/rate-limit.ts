import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { clientIp } from './client-ip';
import { verifyCmsSession } from './cms-session';

const MINUTE = 60_000;

// Tiers, checked in order. A request must pass every tier that applies to it.
const AUTH = { limit: 10, windowMs: 15 * MINUTE }; // login, password reset, unlock, first user
const API = { limit: 60, windowMs: MINUTE }; // anonymous /api
// The admin fires dozens of /api calls per screen. Only a valid signed session gets this,
// keyed by user id, so neither a fake cookie nor a spoofed IP raises the ceiling.
const CMS_SESSION = { limit: 600, windowMs: MINUTE };

// Payload's auth endpoints for the `users` collection. Brute force is also capped per account
// by `auth.maxLoginAttempts` on the collection, which no header can get around.
const AUTH_PATH =
  /^\/api\/users\/(?:login|forgot-password|reset-password|unlock|first-register|verify\/)/;
// GraphQL can log in too (`loginUser`) and nothing on the site uses it anonymously.
const GRAPHQL_PATH = /^\/api\/graphql\/?$/;

// Bounded so a flood of unique keys can't exhaust memory.
const MAX_KEYS = 20_000;

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitRecord>();

function evict(now: number) {
  for (const [key, record] of store) if (now > record.resetAt) store.delete(key);
  // Still full of live keys: drop the oldest (Map keeps insertion order).
  for (const key of store.keys()) {
    if (store.size < MAX_KEYS) break;
    store.delete(key);
  }
}

function hit(key: string, tier: { limit: number; windowMs: number }, now: number) {
  let record = store.get(key);
  if (!record || now > record.resetAt) {
    if (!record && store.size >= MAX_KEYS) evict(now);
    record = { count: 0, resetAt: now + tier.windowMs };
    store.set(key, record);
  }
  record.count += 1;
  return record.count > tier.limit ? { limit: tier.limit, resetAt: record.resetAt } : null;
}

function tooManyRequests(limit: number, resetAt: number, now: number) {
  const retryAfter = Math.max(1, Math.ceil((resetAt - now) / 1000));
  const minutes = Math.ceil(retryAfter / 60);
  // Payload's admin forms show `errors[0].message`.
  return NextResponse.json(
    {
      errors: [
        {
          message: `Too many requests. Try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
        },
      ],
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(limit),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.floor(resetAt / 1000)),
      },
    },
  );
}

export async function applyRateLimit(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith('/api')) return null;

  const now = Date.now();
  const ip = clientIp(request.headers);
  const userId = await verifyCmsSession(request.cookies.get('payload-token')?.value);

  const isAuth =
    request.method !== 'GET' &&
    (AUTH_PATH.test(pathname) || (!userId && GRAPHQL_PATH.test(pathname)));
  const exceeded =
    (isAuth ? hit(`auth:${ip}`, AUTH, now) : null) ??
    (userId ? hit(`user:${userId}`, CMS_SESSION, now) : hit(`ip:${ip}`, API, now));

  return exceeded ? tooManyRequests(exceeded.limit, exceeded.resetAt, now) : null;
}

/** Test hook — clears every counter. */
export function resetRateLimits() {
  store.clear();
}
