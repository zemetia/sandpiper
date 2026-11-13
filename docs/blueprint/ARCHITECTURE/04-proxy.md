# Architecture — 04: Middleware (Proxy Layer)

← [03 — Zod, shadcn, build](./03-zod-shadcn-build.md) | [ARCHITECTURE.md](../ARCHITECTURE.md) | [Blueprint INDEX](../INDEX.md)

---

## Overview

`src/middleware.ts` is the Next.js server-side intercept layer that runs **before** any route is rendered. It sits at the network boundary in front of the app — handling rate limiting, security headers, and the legacy `/en` · `/id` redirect.

**Runtime:** Node.js (stable). Exports a named `middleware` function.

> **Why `src/middleware.ts` not `proxy.ts`** — Next.js 16 introduced `proxy.ts` as a rename of `middleware.ts`, but it has confirmed production-mode bugs (does not execute in `next start`), Windows 11 failures, and Cloudflare breakage. `middleware.ts` is the stable, reliable choice. See GitHub issues [#85711](https://github.com/vercel/next.js/issues/85711), [#85243](https://github.com/vercel/next.js/issues/85243), [#86122](https://github.com/vercel/next.js/issues/86122).

> **Last-resort rule** — Use middleware only when no other API achieves the goal. Authentication checks **must also** be performed inside Server Functions / Route Handlers — middleware alone is not a sufficient auth boundary (see [Next.js Data Security guide](https://nextjs.org/docs/app/guides/data-security#authentication-and-authorization)).

---

## Request Flow

```
Browser Request
    │
    ▼
src/middleware.ts  (Node.js — runs before route rendering)
    │
    ├── applyRateLimit(request)
    │       /api/* only — auth endpoints 10 / 15 min per IP, anonymous 60/min per IP,
    │       verified CMS session 600/min per user
    │       → 429 Too Many Requests (early return)        if exceeded
    │       → null                                        if ok
    │
    ├── /en/*, /id/*  (legacy locale-prefixed URLs)
    │       308 → same path without the prefix
    │
    └── everything else
            applySecurityHeaders(NextResponse.next())
            → src/app/(site)/ pages, Payload admin / REST / GraphQL, Route Handlers, /preview
```

---

## File Map

| File | Purpose |
|---|---|
| [`src/middleware.ts`](../../../src/middleware.ts) | Root entry — composes all intercept logic, exports `config.matcher` |
| [`src/proxy/rate-limit.ts`](../../../src/proxy/rate-limit.ts) | In-memory rate limiter for `/api/*` routes |
| [`src/proxy/client-ip.ts`](../../../src/proxy/client-ip.ts) | Spoof-resistant client IP (trusted header / proxy hops, IPv6 /64) |
| [`src/proxy/cms-session.ts`](../../../src/proxy/cms-session.ts) | Verifies the `payload-token` JWT (HS256, WebCrypto) without importing Payload |
| [`src/proxy/security-headers.ts`](../../../src/proxy/security-headers.ts) | Attaches security headers to every response |

---

## Modules

### Rate Limiter (`src/proxy/rate-limit.ts`)

```
applyRateLimit(request: NextRequest): Promise<NextResponse | null>
```

Self-contained in-memory limiter (a bounded `Map`, max 20k keys). No external dependency.

| Tier | Limit | Key | Applies to |
|---|---|---|---|
| Auth | 10 / 15 min | `auth:<ip>` | non-GET `/api/users/{login,forgot-password,reset-password,unlock,first-register,verify/*}` and anonymous `POST /api/graphql` (GraphQL can `loginUser`) |
| CMS session | 600 / 60 s | `user:<id>` | `/api/*` with a `payload-token` whose HS256 signature + `exp` verify — a forged cookie gets the anonymous tier |
| Anonymous | 60 / 60 s | `ip:<ip>` | every other `/api/*` request |

An auth request must pass both the auth tier and its API tier. Algorithm: fixed window (`count` + `resetAt`). Response: `429` JSON `{ errors: [{ message }] }` (Payload's admin shows it) with `Retry-After` + `X-RateLimit-*`.

**Client IP (`client-ip.ts`).** Next.js keeps a client-sent `X-Forwarded-For` verbatim (it only fills it from the socket when missing), so its leftmost entry is attacker-controlled and is never used.

| Env | Meaning |
|---|---|
| `TRUSTED_IP_HEADER` | A header the edge **overwrites** on every request — `cf-connecting-ip` (Cloudflare), `x-vercel-forwarded-for` (Vercel), `x-real-ip` (nginx `proxy_set_header X-Real-IP $remote_addr`). When set, nothing else is read |
| `TRUSTED_PROXY_HOPS` | Default `1`. Number of proxies that append to `X-Forwarded-For`; the client is that many entries from the right |

IPv6 is bucketed by `/64`; unparsable values share the `unknown` bucket. With no proxy in front (local `next dev`), the socket IP is lost as soon as a caller sends `X-Forwarded-For`, so the per-IP limit is best-effort there — production must run behind a proxy configured as above.

**Per-account lockout.** `Users` sets `auth.maxLoginAttempts: 5` + `lockTime: 15 min`. Payload stores it on the user row, so it caps brute force on an account no matter which IP or header the attempts use. Trade-off: someone who knows an admin's email can keep that account locked; the per-IP auth tier slows that down. An admin can unlock a user from the admin panel.

To change limits, edit `AUTH`, `API` and `CMS_SESSION` at the top of `rate-limit.ts`.

For multi-instance deployments, swap the `ipMap` reads/writes for an Edge-compatible KV client (e.g. `@upstash/ratelimit`), keeping the `applyRateLimit` signature.

### Security Headers (`src/proxy/security-headers.ts`)

```
applySecurityHeaders(response: NextResponse): NextResponse
```

| Header | Value |
|---|---|
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `X-XSS-Protection` | `1; mode=block` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` (production only) |

---

## Matcher

```ts
// src/middleware.ts
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};
```

Static assets (`_next/static`, `_next/image`, `favicon.ico`, images) are excluded. `sitemap.xml`, `robots.txt` and `llms.txt` are excluded — they need no headers or rate limiting. `/api` routes are **included** so rate limiting applies.

## Legacy Locale Redirect

The site used to be served under `/en/*` and `/id/*`. `LEGACY_LOCALE` in `src/middleware.ts` 308-redirects those to the unprefixed path so old links and bookmarks keep working.

---

## Adding New Middleware Logic

1. Create `src/proxy/<concern>.ts`
2. Export a pure function: `apply<Concern>(request: NextRequest): Promise<NextResponse | null>` (async early-exit) or `apply<Concern>(response: NextResponse): NextResponse` (sync response mutation)
3. Call it in `src/middleware.ts` — early-exit handlers go before the final `NextResponse.next()`, header mutations wrap it

```ts
// src/middleware.ts — example adding auth guard
import { applyAuthGuard } from './proxy/auth-guard';

export async function middleware(request: NextRequest) {
  const rateLimited = await applyRateLimit(request);
  if (rateLimited) return rateLimited;

  const authBlocked = await applyAuthGuard(request);  // ← new early-exit handler
  if (authBlocked) return authBlocked;

  return applySecurityHeaders(NextResponse.next());
}
```

---

## Constraints

| # | Rule |
|---|---|
| 1 | Never import React, components, or `'use client'` modules in middleware/proxy files |
| 2 | Never call `apiClient` or `fetch` for slow data — middleware must be fast |
| 3 | Rate limiter is in-memory — not suitable for multi-instance without KV replacement. Never key it on the leftmost `X-Forwarded-For` entry — use `clientIp()` |
| 4 | Auth logic in middleware is a first-line filter only — always re-verify inside Server Functions |
| 5 | Use `src/middleware.ts` — never root `proxy.ts` (known production/Windows bugs in Next.js 16) |
| 6 | Never import Payload (`payload`, `@payload-config`) in middleware — verify CMS sessions in Route Handlers via `payload.auth()` |

---

← [03 — Zod, shadcn, build](./03-zod-shadcn-build.md) | [ARCHITECTURE.md](../ARCHITECTURE.md) | [Blueprint INDEX](../INDEX.md)
