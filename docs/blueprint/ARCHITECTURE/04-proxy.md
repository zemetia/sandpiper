# Architecture — 04: Middleware (Proxy Layer)

← [03 — Zod, shadcn, build](./03-zod-shadcn-build.md) | [ARCHITECTURE.md](../ARCHITECTURE.md) | [Blueprint INDEX](../INDEX.md)

---

## Overview

`src/middleware.ts` is the Next.js server-side intercept layer that runs **before** any route is rendered. It sits at the network boundary in front of the app — handling rate limiting, security headers, and i18n locale routing.

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
    │       /api/* only — 60 req/min per IP (600 with payload-token cookie)
    │       → 429 Too Many Requests (early return)        if exceeded
    │       → null                                        if ok
    │
    ├── /admin, /api/*, /preview
    │       applySecurityHeaders(NextResponse.next())   ← no locale routing
    │       → Payload admin / REST / GraphQL, Route Handlers, draft-mode toggle
    │
    └── page routes
            intlMiddleware(request)   ← createMiddleware(routing) from next-intl
                reads Accept-Language, sets locale cookie,
                redirects /path → /en/path (localePrefix: 'always')
            applySecurityHeaders(intlResponse)
            → continue to src/app/[locale]/layout.tsx
```

---

## File Map

| File | Purpose |
|---|---|
| [`src/middleware.ts`](../../../src/middleware.ts) | Root entry — composes all intercept logic, exports `config.matcher` |
| [`src/proxy/rate-limit.ts`](../../../src/proxy/rate-limit.ts) | In-memory rate limiter for `/api/*` routes |
| [`src/proxy/security-headers.ts`](../../../src/proxy/security-headers.ts) | Attaches security headers to every response |

---

## Modules

### Rate Limiter (`src/proxy/rate-limit.ts`)

```
applyRateLimit(request: NextRequest): Promise<NextResponse | null>
```

Self-contained, Edge-safe in-memory limiter (a `Map` keyed by IP). It replaced the earlier `next-limitr` adapter; the package is still in `package.json` but unused.

| Detail | Value |
|---|---|
| Algorithm | Fixed window per key (`count` + `resetAt`) |
| Default limit | 60 requests / 60 s per IP |
| CMS session limit | 600 requests / 60 s when a `payload-token` cookie is present (key `cms:<ip>`) — the admin fires dozens of `/api` calls per screen. The cookie is **not verified** here, so it only raises the ceiling, never removes it |
| Key | `x-forwarded-for[0]` → `x-real-ip` → `'anonymous'` |
| Applies to | `/api/*` only (includes Payload REST/GraphQL) |
| Response | `429` with `Retry-After`, `X-RateLimit-*` headers |
| Storage | Per-instance memory — replace with a shared KV (Redis/Upstash) for multi-instance |

To change the limit, edit the constants at the top of `rate-limit.ts`:

```ts
const LIMIT = 60;               // anonymous requests per window
const CMS_SESSION_LIMIT = 600;  // with payload-token cookie
const WINDOW_MS = 60_000;       // window duration in ms
```

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

Static assets (`_next/static`, `_next/image`, `favicon.ico`, images) are excluded. `sitemap.xml`, `robots.txt` and `llms.txt` are excluded so next-intl never locale-redirects them. `/api` routes are **included** so rate limiting applies.

## CMS Route Bypass

`/admin`, `/api` and `/preview` skip `intlMiddleware` — otherwise next-intl redirects `/admin` to `/en/admin` and Payload 404s. Any new non-localized top-level route (webhooks, feeds) must be added to this check:

```ts
if (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.startsWith('/preview')) {
  return applySecurityHeaders(NextResponse.next());
}
```

---

## Adding New Middleware Logic

1. Create `src/proxy/<concern>.ts`
2. Export a pure function: `apply<Concern>(request: NextRequest): Promise<NextResponse | null>` (async early-exit) or `apply<Concern>(response: NextResponse): NextResponse` (sync response mutation)
3. Call it in `src/middleware.ts` — before `intlMiddleware` if it may short-circuit (return early), after if it only mutates headers

```ts
// src/middleware.ts — example adding auth guard
import { applyAuthGuard } from './proxy/auth-guard';

export async function middleware(request: NextRequest) {
  const rateLimited = await applyRateLimit(request);
  if (rateLimited) return rateLimited;

  const authBlocked = await applyAuthGuard(request);  // ← new early-exit handler
  if (authBlocked) return authBlocked;

  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.startsWith('/preview')) {
    return applySecurityHeaders(NextResponse.next());
  }

  return applySecurityHeaders(intlMiddleware(request));
}
```

---

## Constraints

| # | Rule |
|---|---|
| 1 | Never import React, components, or `'use client'` modules in middleware/proxy files |
| 2 | Never call `apiClient` or `fetch` for slow data — middleware must be fast |
| 3 | Rate limiter is in-memory — not suitable for multi-instance without KV replacement |
| 4 | Auth logic in middleware is a first-line filter only — always re-verify inside Server Functions |
| 5 | Use `src/middleware.ts` — never root `proxy.ts` (known production/Windows bugs in Next.js 16) |
| 6 | Never import Payload (`payload`, `@payload-config`) in middleware — verify CMS sessions in Route Handlers via `payload.auth()` |

---

← [03 — Zod, shadcn, build](./03-zod-shadcn-build.md) | [ARCHITECTURE.md](../ARCHITECTURE.md) | [Blueprint INDEX](../INDEX.md)
