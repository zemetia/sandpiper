# Structure — 01: App Directories

← [STRUCTURE.md](../STRUCTURE.md) | [Blueprint INDEX](../INDEX.md) | [02 — Modules →](./02-modules.md)

---

## Root

| Path | Type | Purpose |
|---|---|---|
| [src/](../../../src/) | dir | All application source |
| [docs/blueprint/](../../../docs/blueprint/) | dir | AI reference docs (this dir) |
| [public/](../../../public/) | dir | Static assets (`sandpiper-mark.svg` favicon/admin icon, `og.png`) |
| `media/` | dir | Payload upload storage — git-ignored, created at runtime |
| [.env.example](../../../.env.example) | file | Env var template → copy to `.env.local` |
| [components.json](../../../components.json) | file | shadcn/ui CLI config → [COMPONENTS.md](../COMPONENTS.md) |
| [next.config.ts](../../../next.config.ts) | file | `withSentryConfig(withPayload(config))` |
| [AGENTS.md](../../../AGENTS.md) | file | Agent entry point for non-Claude agents |
| [sentry.client.config.ts](../../../sentry.client.config.ts) | file | Sentry browser init |
| [sentry.server.config.ts](../../../sentry.server.config.ts) | file | Sentry Node.js init |
| [sentry.edge.config.ts](../../../sentry.edge.config.ts) | file | Sentry Edge runtime init |
| [tsconfig.json](../../../tsconfig.json) | file | strict + extra flags; aliases `@/*` and `@payload-config` → [BEST_PRACTICE.md](../BEST_PRACTICE.md) |
| [vitest.config.ts](../../../vitest.config.ts) | file | Vitest + jsdom + `@/` alias |
| [vitest.setup.ts](../../../vitest.setup.ts) | file | `@testing-library/jest-dom` matchers |
| [eslint.config.mjs](../../../eslint.config.mjs) | file | Flat config, 0-warning policy; ignores generated `importMap.js` + `payload-types.ts`; custom rules scoped to `*.ts(x)` |
| [package.json](../../../package.json) | file | Scripts + dependencies |

---

## src/

| Path | Type | Purpose |
|---|---|---|
| [src/app/](../../../src/app/) | dir | App Router pages + API routes |
| [src/components/](../../../src/components/) | dir | All React components → [COMPONENTS.md](../COMPONENTS.md) |
| [src/hooks/](../../../src/hooks/) | dir | Client-side hooks |
| [src/instrumentation.ts](../../../src/instrumentation.ts) | file | Next.js instrumentation — Sentry server/edge init |
| [src/middleware.ts](../../../src/middleware.ts) | file | Request intercept: rate limit + security headers + legacy `/en` · `/id` redirect → [ARCHITECTURE/04-proxy.md](../ARCHITECTURE/04-proxy.md) |
| [src/proxy/](../../../src/proxy/) | dir | Middleware modules (rate limit, security headers) |
| [src/config/](../../../src/config/) | dir | `site.ts` — SEO/GEO/LLMs.txt brand copy |
| [src/payload.config.ts](../../../src/payload.config.ts) | file | Payload CMS config → [CMS.md](../CMS.md) |
| [src/payload-types.ts](../../../src/payload-types.ts) | file | **Generated** Payload types — never hand-edit |
| [src/collections/](../../../src/collections/) | dir | Payload collections → [CMS.md](../CMS.md) |
| [src/cms/](../../../src/cms/) | dir | Payload access, fields, blocks, globals, admin components, seed → [CMS.md](../CMS.md) |
| [src/lib/](../../../src/lib/) | dir | Framework-agnostic utilities |
| [src/providers/](../../../src/providers/) | dir | React context providers |
| [src/services/](../../../src/services/) | dir | ApiClient + domain services → [SERVICES.md](../SERVICES.md) |
| [src/stores/](../../../src/stores/) | dir | Zustand global state → [STATE.md](../STATE.md) |
| [src/types/](../../../src/types/) | dir | Shared TypeScript types |

---

## src/app/

| Path | Type | Purpose |
|---|---|---|
| [src/app/globals.css](../../../src/app/globals.css) | file | Tailwind v4 `@theme {}` tokens + base → [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) |
| [src/app/layout.tsx](../../../src/app/layout.tsx) | file | Root layout — minimal HTML shell only |
| [src/app/(site)/layout.tsx](../../../src/app/(site)/layout.tsx) | file | Site root layout (`<html lang="en-US">`): fonts (Outfit, Fraunces, JetBrains Mono), providers, skip link, `AnnouncementBar` / `Header` / `Footer` fed from CMS globals, `<Toaster />` |
| [src/app/(site)/page.tsx](../../../src/app/(site)/page.tsx) | file | Home — renders CMS page slug `home` via `CmsPage` |
| [src/app/(site)/[...slug]/page.tsx](../../../src/app/(site)/%5B...slug%5D/page.tsx) | file | Every other CMS page (`/en/menu`, `/id/about`, nested slugs); slug `home` redirects to `/` |
| [src/app/(payload)/](../../../src/app/%28payload%29/) | dir | Payload admin (`/admin`), REST (`/api/[...slug]`), GraphQL, own root layout + `custom.css` → [CMS.md](../CMS.md) |
| [src/app/preview/route.ts](../../../src/app/preview/route.ts) | file | Enables draft mode (CMS login required), redirects to `?path=` |
| [src/app/preview/exit/route.ts](../../../src/app/preview/exit/route.ts) | file | Disables draft mode |
| [src/app/api/health/route.ts](../../../src/app/api/health/route.ts) | file | Health check endpoint — Edge runtime |
| [src/app/sitemap.ts](../../../src/app/sitemap.ts) | file | `/sitemap.xml` — `siteConfig.pages` + every published CMS page |
| [src/app/robots.ts](../../../src/app/robots.ts) | file | Auto-generated `/robots.txt` |
| [src/app/llms.txt/route.ts](../../../src/app/llms.txt/route.ts) | file | `/llms.txt` — LLM guidance file, generated from `siteConfig` |

### Provider tree in src/app/(site)/layout.tsx

```tsx
<html lang="en-US">
<PostHogProvider>          // src/providers/PostHogProvider.tsx
  <a href="#main" />       // skip link
  <AnnouncementBar />      // only when SiteSettings.announcement is set
  <Header />               // CMS Header global
  <main id="main">{children}</main>
  <Footer />               // CMS Footer global + SiteSettings
</PostHogProvider>
<Toaster />                // src/components/ui/Sonner/Sonner.tsx — ONE mount only
</html>
```

---

## src/components/

| Path | Type | Purpose |
|---|---|---|
| [src/components/ui/](../../../src/components/ui/) | dir | Primitive building blocks — no domain logic |
| [src/components/ui/Badge/](../../../src/components/ui/Badge/) | dir | Badge component |
| [src/components/ui/Button/](../../../src/components/ui/Button/) | dir | Button with CVA variants |
| [src/components/ui/Card/](../../../src/components/ui/Card/) | dir | Card + sub-components |
| [src/components/ui/Input/](../../../src/components/ui/Input/) | dir | Input with label/error/addon |
| [src/components/ui/Sonner/](../../../src/components/ui/Sonner/) | dir | `<Toaster />` Sonner wrapper |
| [src/components/ui/Typography/](../../../src/components/ui/Typography/) | dir | Typed heading/text variants |
| [src/components/ui/index.ts](../../../src/components/ui/index.ts) | file | Barrel — re-exports all ui components |
| [src/components/shared/](../../../src/components/shared/) | dir | Cross-feature reusable |
| [src/components/shared/StructuredData/](../../../src/components/shared/StructuredData/) | dir | `<StructuredData id schema>` — JSON-LD `<script>` |
| [src/components/shared/index.ts](../../../src/components/shared/index.ts) | file | Barrel |
| [src/components/layout/](../../../src/components/layout/) | dir | Page scaffolding |
| [src/components/layout/AnnouncementBar/](../../../src/components/layout/AnnouncementBar/) | dir | Top banner from `SiteSettings.announcement` |
| [src/components/layout/Header/](../../../src/components/layout/Header/) | dir | Site header (RSC) + `HeaderNav` (client: mobile menu, active link) |
| [src/components/layout/Footer/](../../../src/components/layout/Footer/) | dir | Site footer |
| [src/components/layout/PageWrapper/](../../../src/components/layout/PageWrapper/) | dir | Page layout wrapper |
| [src/components/layout/index.ts](../../../src/components/layout/index.ts) | file | Barrel |
| [src/components/cms/](../../../src/components/cms/) | dir | CMS renderers: `CmsPage`, `RenderBlocks`, `blocks/<Name>Block.tsx`, `CmsLink`, `CmsImage`, `RichText`, `MenuItemCard`, `SectionHeading`, `LivePreviewListener` — no barrel → [CMS.md](../CMS.md) |

### Four-file rule

```
ComponentName/
├── ComponentName.tsx          # Implementation — only file with logic
├── ComponentName.stories.tsx  # Storybook — satisfies Meta<typeof Component>
├── ComponentName.test.tsx     # Vitest + RTL — behavior tests
└── index.ts                   # Barrel only — no logic ever
```

shadcn-generated components are the exception — flat file at `src/components/ui/<name>.tsx`.

`src/components/cms/` is also exempt: flat files, one renderer per block, covered by a shared `blocks/blocks.test.tsx` instead of per-file stories/tests.

---

← [STRUCTURE.md](../STRUCTURE.md) | → [02 — Modules](./02-modules.md)
