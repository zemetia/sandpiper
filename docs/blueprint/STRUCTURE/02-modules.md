# Structure — 02: Module Directories

← [01 — App directories](./01-app-dirs.md) | [STRUCTURE.md](../STRUCTURE.md) | [Blueprint INDEX](../INDEX.md)

---

## src/proxy/

| Path | Export | Purpose |
|---|---|---|
| [`src/proxy/rate-limit.ts`](../../../src/proxy/rate-limit.ts) | `applyRateLimit` | In-memory fixed-window limiter for `/api/*` (60/min; 600/min with a `payload-token` cookie); returns `Promise<429 response \| null>` |
| [`src/proxy/security-headers.ts`](../../../src/proxy/security-headers.ts) | `applySecurityHeaders` | Attaches security headers to every `NextResponse` |

No barrel — these are consumed only by `src/middleware.ts`.

---

## src/hooks/

| Path | Signature | Notes |
|---|---|---|
| [src/hooks/useBreakpoint.ts](../../../src/hooks/useBreakpoint.ts) | `useBreakpoint(): Breakpoint` | `useSyncExternalStore`, no setState-in-effect |
| [src/hooks/useBreakpoint.ts](../../../src/hooks/useBreakpoint.ts) | `useIsMobile(): boolean` | Same file |
| [src/hooks/useLocalStorage.ts](../../../src/hooks/useLocalStorage.ts) | `useLocalStorage<T>(key, initial): [T, (v:T)=>void]` | SSR-safe |
| [src/hooks/useToast.ts](../../../src/hooks/useToast.ts) | `useToast(): ToastAPI` | Thin sonner wrapper |
| [src/hooks/index.ts](../../../src/hooks/index.ts) | barrel | re-exports hooks + `{ toast } from 'sonner'` |

### useToast API

```ts
import { useToast, toast } from '@/hooks';

const t = useToast();
t.success(msg, opts?)    t.error(msg, opts?)    t.warning(msg, opts?)
t.info(msg, opts?)       t.loading(msg, opts?)  t.promise(p, labels)
t.dismiss(id?)           t.custom(jsx, opts?)

toast.error('msg');      // direct sonner fn — outside components
```

---

## src/config/

| Path | Export | Purpose |
|---|---|---|
| [src/config/site.ts](../../../src/config/site.ts) | `siteConfig`, `SiteConfig`, `PageConfig` | Brand copy for SEO, GEO, sitemap, LLMs.txt only — visitor-facing content lives in the CMS → [SEO_GEO_LLM.md](../SEO_GEO_LLM.md) |
| [src/config/copy.ts](../../../src/config/copy.ts) | `copy` | Fixed UI strings (aria labels, form labels, fallbacks) — the site is single-locale, no i18n |

---

## src/lib/

| Path | Export | Signature |
|---|---|---|
| [src/lib/cn.ts](../../../src/lib/cn.ts) | `cn` | `cn(...inputs: ClassValue[]): string` — `twMerge(clsx(...))` |
| [src/lib/cookies.ts](../../../src/lib/cookies.ts) | `getCookie` / `setCookie` / `deleteCookie` / `getAllCookies` / `parseCookieHeader` | Cookie helpers |
| [src/lib/sentry.ts](../../../src/lib/sentry.ts) | `captureError` / `captureMessage` | Sentry wrappers |
| [src/lib/seo.ts](../../../src/lib/seo.ts) | `buildMetadata`, `absoluteUrl` | Full `Metadata` for every public page; `absoluteUrl(path)` = absolute, always-prefixed URL → [SEO_GEO_LLM.md](../SEO_GEO_LLM.md) |
| [src/lib/structured-data.ts](../../../src/lib/structured-data.ts) | `organizationSchema`, `webPageSchema`, `localBusinessSchema`, `faqSchema`, `breadcrumbSchema`, `articleSchema`, `serializeSchema` | JSON-LD schema builders + serializer → [SEO_GEO_LLM.md](../SEO_GEO_LLM.md) |
| [src/lib/utils.ts](../../../src/lib/utils.ts) | `formatDate` / `truncate` / `slugify` / `assertNever` | General utilities |
| [src/lib/format.ts](../../../src/lib/format.ts) | `formatPrice` | `formatPrice(value)` — always USD, `en-US` (`$4.50`, whole dollars as `$11`) |
| [src/lib/safe-path.ts](../../../src/lib/safe-path.ts) | `isSafePath` | Same-origin path check for redirects — rejects `//host` and `/\host` |
| [src/lib/validations/common.ts](../../../src/lib/validations/common.ts) | `emailSchema`, `passwordSchema`, `nameSchema`, `urlSchema`, `uuidSchema`, `paginationSchema` | Zod primitives |
| [src/lib/validations/index.ts](../../../src/lib/validations/index.ts) | barrel | re-exports all from `common.ts` |

---

## src/providers/

| Path | Export | Purpose |
|---|---|---|
| [src/providers/PostHogProvider.tsx](../../../src/providers/PostHogProvider.tsx) | `PostHogProvider` | posthog-js init + `$pageview` tracking |
| [src/providers/QueryProvider.tsx](../../../src/providers/QueryProvider.tsx) | `QueryProvider` | TanStack Query client — not mounted yet; wrap the tree when the first client query lands |
| [src/providers/index.tsx](../../../src/providers/index.tsx) | barrel | `PostHogProvider`, `QueryProvider` |

---

## src/services/

| Path | Export | Purpose |
|---|---|---|
| [src/services/types.ts](../../../src/services/types.ts) | `ApiError`, `RequestConfig`, interceptor types | All shared service types |
| [src/services/client.ts](../../../src/services/client.ts) | `apiClient` | Singleton `ApiClientInstance` |
| [src/services/health.service.ts](../../../src/services/health.service.ts) | `healthService` | Example domain service |
| [src/services/example.service.ts](../../../src/services/example.service.ts) | `ExampleService` | DTO → VO reference service |
| [src/services/index.ts](../../../src/services/index.ts) | barrel | `apiClient`, `ApiError`, external-API services (client-safe) |
| [src/services/cms.service.ts](../../../src/services/cms.service.ts) | `cmsService` | **Server-only** Payload Local API reads — import directly, never via the barrel → [CMS.md](../CMS.md) |
| [src/services/cms.mappers.ts](../../../src/services/cms.mappers.ts) | `toImage`, `toLink`, `toLinks`, `toMenuItem`, `populated` | Pure Payload doc → VO mappers (unit-tested) |

---

## src/stores/

| Path | Export | Purpose |
|---|---|---|
| [src/stores/app.store.ts](../../../src/stores/app.store.ts) | `useAppStore` | Global UI: `theme`, `sidebarOpen` |
| [src/stores/middleware/cookie-storage.ts](../../../src/stores/middleware/cookie-storage.ts) | `createCookieStorage` | Zustand persist adapter via `document.cookie` |
| [src/stores/index.ts](../../../src/stores/index.ts) | barrel | `useAppStore`, `createCookieStorage` |

---

## src/types/

| Path | Export |
|---|---|
| [src/types/common.ts](../../../src/types/common.ts) | `Nullable<T>`, `Maybe<T>`, `Prettify<T>`, `PaginatedResponse<T>`, `ApiResponse<T>` |
| [src/types/index.ts](../../../src/types/index.ts) | barrel — re-exports `common.ts` only |

### src/types/dtos/

Raw API response shapes. Field names mirror the server JSON exactly (snake_case, ISO date strings, no derived data). Consumed only by services — never by pages or components.

| Path | Export |
|---|---|
| [src/types/dtos/admin.dto.ts](../../../src/types/dtos/admin.dto.ts) | `AdminDTO`, `AdminListDTO` |
| [src/types/dtos/index.ts](../../../src/types/dtos/index.ts) | barrel |

### src/types/value-objects/

Client-ready, display-optimized shapes. Produced by services after transforming DTOs — camelCase keys, formatted strings, derived booleans, no nullables. Consumed by services and pages/components.

| Path | Export |
|---|---|
| [src/types/value-objects/admin.vo.ts](../../../src/types/value-objects/admin.vo.ts) | `AdminVO`, `AdminListVO` |
| [src/types/value-objects/cms.vo.ts](../../../src/types/value-objects/cms.vo.ts) | `ImageVO`, `LinkVO`, `MenuTag`, `MenuItemVO`, `MenuCategoryVO`, `SiteSettingsVO`, `NavigationVO` |
| [src/types/value-objects/index.ts](../../../src/types/value-objects/index.ts) | barrel |

See [ARCHITECTURE/05-dto-vo.md](../ARCHITECTURE/05-dto-vo.md) for the full data-flow and transformation pattern.

Payload has no DTO layer: the generated types in `src/payload-types.ts` play that role and `cms.mappers.ts` turns them into VOs.

---

## Environment Variables

Reference: [.env.example](../../../.env.example)

| Variable | Required | Runtime | Consumer |
|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Yes | client+server | Metadata base URL |
| `NEXT_PUBLIC_API_URL` | Yes | client+server | `src/services/client.ts` `baseUrl` |
| `DATABASE_URI` | Yes | server | Payload Postgres adapter |
| `PAYLOAD_SECRET` | Yes | server | Payload auth/JWT signing — ≥32 chars, unique per environment |
| `NEXT_PUBLIC_SENTRY_DSN` | Prod | client+server | Sentry configs |
| `SENTRY_ORG` | Prod/CI | build | `next.config.ts` `withSentryConfig` |
| `SENTRY_PROJECT` | Prod/CI | build | `next.config.ts` `withSentryConfig` |
| `SENTRY_AUTH_TOKEN` | CI | build | Source map upload |
| `NEXT_PUBLIC_POSTHOG_KEY` | Prod | client | `src/providers/PostHogProvider.tsx` |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | client | Defaults to `https://us.i.posthog.com` |

Missing `NEXT_PUBLIC_SENTRY_DSN` and `NEXT_PUBLIC_POSTHOG_KEY` → integrations are silent no-ops.

---

← [01 — App directories](./01-app-dirs.md) | [STRUCTURE.md](../STRUCTURE.md)
