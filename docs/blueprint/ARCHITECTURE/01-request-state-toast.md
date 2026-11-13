# Architecture — 01: Request, Providers, State, Toast

← [ARCHITECTURE.md](../ARCHITECTURE.md) | [Blueprint INDEX](../INDEX.md) | [02 — ApiClient, Sentry, PostHog →](./02-apiclient-sentry-posthog.md) | [04 — Proxy →](./04-proxy.md)

---

## Request Lifecycle

```
Browser Request
    │
    ▼
src/middleware.ts  (never root proxy.ts — see 04)
    ├── applyRateLimit     → 429 if /api/* exceeds 60 req/min per IP (600 with CMS session)
    ├── /en/*, /id/*       → 308 to the unprefixed path (legacy locale URLs)
    └── everything else    → applySecurityHeaders → page / Payload / Route Handler
    │
    ▼
src/app/(site)/layout.tsx  ← RSC
    ├── loads Outfit + Fraunces + JetBrains Mono via next/font
    ├── UI chrome strings from src/config/copy.ts
    ├── cmsService.getSiteSettings() + getNavigation()  ← Payload Local API
    └── renders provider tree:
        <html lang="en-US">
          <PostHogProvider>
            skip link · <AnnouncementBar> · <Header>
            <main id="main">{children}</main>   ← pages (RSC by default)
            <Footer>
          </PostHogProvider>
          <Toaster />          ← Sonner portal, ONE instance only
        </html>
    │
    ▼
src/app/(site)/page.tsx | [...slug]/page.tsx  ← Server Components
    └── <CmsPage slug>
            cmsService.getPage()   (published, or draft when draft mode is on)
            JSON-LD + <RenderBlocks> → one renderer per block

/admin, /api/*  → src/app/(payload)/  (separate root layout, Payload owns it) → CMS.md
```

---

## Provider Tree

| Provider | File | Purpose |
|---|---|---|
| `PostHogProvider` | [src/providers/PostHogProvider.tsx](../../../src/providers/PostHogProvider.tsx) | posthog-js init + pageview tracking |
| `<Suspense>` | inside PostHogProvider | Required: `useSearchParams` triggers Suspense |
| `PostHogPageView` | [src/providers/PostHogProvider.tsx](../../../src/providers/PostHogProvider.tsx) | captures `$pageview` on route change |
| `<Toaster />` | [src/components/ui/Sonner/Sonner.tsx](../../../src/components/ui/Sonner/Sonner.tsx) | Sonner portal outside PostHog |

`<Toaster />` placement: outside `PostHogProvider` — toasts are global, need no analytics context.

---

## No i18n

Sandpiper is a single-locale (en-US) site: no `[locale]` segment, no translation files. Use `next/link` and `next/navigation` directly; fixed UI strings (aria labels, form labels, fallbacks) live in [src/config/copy.ts](../../../src/config/copy.ts). Payload still has its `localization` config (DB schema), and all reads use its default locale `en`.

---

## State (Zustand v5)

```
src/stores/app.store.ts
    create<AppState & AppActions>()(
      devtools(               → Redux DevTools, name: 'AppStore'
        persist(              → persists { theme } only (partialize)
          ...,
          {
            name: 'app',                         → cookie key: zst_app
            storage: createCookieStorage()
          }
        )
      )
    )
        └── createCookieStorage
                └── src/lib/cookies.ts  (getCookie / setCookie)
```

Cookie key format: `zst_<store-name>`. Theme is SSR-readable via `cookies()` from `next/headers`.

---

## Toast System (Sonner v2)

```
src/components/ui/Sonner/Sonner.tsx
    <Toaster>  props: theme="dark", richColors, position="bottom-right"
    toastOptions.classNames: design-system tokens with ! suffix for Tailwind v4 important
        │
        mounted in src/app/(site)/layout.tsx — ONE mount

src/hooks/useToast.ts
    useToast() → { toast, success, error, warning, info, loading, promise, dismiss, custom }
    re-exported from src/hooks/index.ts as useToast + { toast }

sonner direct fn:
    import { toast } from '@/hooks'   // outside component tree (interceptors, etc.)
```

---

← [ARCHITECTURE.md](../ARCHITECTURE.md) | → [02 — ApiClient, Sentry, PostHog](./02-apiclient-sentry-posthog.md)
