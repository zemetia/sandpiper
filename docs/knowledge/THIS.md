# THIS — Project & Developer Knowledge

> Living document. Updated by AI whenever a new insight, pattern, or preference is discovered about this project or developer. Do not delete entries — mark outdated ones with `~~strikethrough~~`.

---

## Developer Profile

- Builds with Next.js 16, TypeScript (strict), Tailwind v4 — expects production-grade quality
- Cares deeply about architecture cleanliness and separation of concerns
- Wants concise AI responses — no fluff, no over-explanation
- Prefers dark design systems with strong token discipline

---

## Project Identity

- Template repo — the patterns here become the standard for all derived projects
- Blueprint docs in `docs/blueprint/` are the single source of truth; AI must read them before planning
- Knowledge docs in `docs/knowledge/` capture learned behavior that is *not* in the code

---

## Do's

- Always read relevant blueprint section before planning any change
- Use `@/i18n/navigation` for all routing — never `next/navigation`
- Keep components Server Components by default; add `'use client'` only when required
- Use design tokens exclusively for color — no raw hex/oklch/Tailwind palette utilities
- Every public page needs `buildMetadata()` + `<StructuredData>` — check `SEO_GEO_LLM.md`
- Follow the four-file rule for UI components: impl, stories, test, barrel
- Write compact, high-signal code — no unnecessary comments or abstractions
- Run `npm run lint` (must exit 0) before declaring any task done

---

## Don'ts

- Don't use `useState` for server data — TanStack Query only
- Don't call `fetch` or `apiClient` directly in components — always go through services
- Don't add root `proxy.ts` — use `src/middleware.ts` (export `middleware`) + `src/proxy/` modules instead
- Don't write raw hex colors, oklch values, or Tailwind color utilities in components
- Don't add error handling for impossible cases — only validate at system boundaries
- Don't create README or documentation files unless explicitly asked
- Don't use emojis unless the user explicitly requests them
- Don't summarize what was just done — the user can read the diff

---

## Insights

<!-- Add dated insights here as they are discovered -->
<!-- Format: `[YYYY-MM-DD] insight` -->

- [2026-06-06] Developer explicitly designed a two-tier learning system: THIS.md for general knowledge, LEARN.md for corrections — treat both as first-class project docs

- [2026-11-08] Payload CMS 3.0 routes (/admin and /api) must bypass next-intl middleware to prevent /en/admin locale redirects. ~~Using importMap.ts preserves strict TypeScript typing and passes ESLint with 0 warnings.~~ (wrong — see LEARN.md)
- [2026-11-08] Sandpiper is a café site. All visitor-facing content (pages, menu, hours, nav, footer) lives in Payload; `src/config/site.ts` keeps only SEO/GEO/LLMs.txt brand copy. Pages render through `src/app/[locale]/[...slug]` + `CmsPage`; homepage = page slug `home`.
- [2026-11-08] Payload code layout: collections in `src/collections/`, everything else in `src/cms/` (access, fields, blocks, globals, admin components, seed). Admin component paths are baseDir-relative strings like `/cms/admin/Dashboard#Dashboard`; config files use relative imports (not `@/`) so the Payload CLI can load them.
- [2026-11-08] Server reads go through `cmsService` (`src/services/cms.service.ts`, Local API). It is deliberately NOT in the `@/services` barrel — that barrel is imported by client code and would bundle Payload. Public reads use `overrideAccess: false` so drafts never leak; draft mode flips it.
- [2026-11-08] `npx payload <cmd>` crashes on this machine (undici `Illegal constructor` under tsx, Node 22.18). Import map + DB schema regenerate automatically in `next dev`; for `payload-types.ts` call `generateTypes(config)` from `payload/node` inside a throwaway dev route, then delete it.
- [2026-11-08] Prices: IDR formatted with the `<locale>-ID` Intl locale, so both en and id show `Rp 38.000` (Indonesian grouping) — intentional.
- [2026-11-08] Developer wants Payload's headless-ecommerce patterns applied: menu items are modelled as products (variants, compare-at price, availability, featured, gallery, SEO tab). Full `@payloadcms/plugin-ecommerce` (carts/orders/Stripe) is the natural next step if online ordering is wanted.
- [2026-11-08] Delegating to agy (Gemini Flash) on this repo underperformed: run 1 tried a shell command, was denied (only `write_file` granted) and exited "SUCCESS" with zero files; run 2 (told "no commands") hit the 5-min print timeout after 2 of ~12 files. Small test/story batches here are cheaper done directly; if delegating, verify with `git status -uall` (plain `git status` collapses untracked dirs) and keep each batch to ~2–3 files.
- [2026-11-08] Blueprint resynced with the Payload/café build (STRUCTURE, ARCHITECTURE, I18N, SEO, DESIGN_SYSTEM, SERVICES, COMPONENTS, CMS). Follow-up cleanup: removed unused `next-limitr` + `messages/*/home.json`; `/llms.txt` now lists default-locale prefixed URLs via `localizedUrl()`.
- [2026-11-08] Admin sidebar is styled, not replaced: keep Payload's default Nav and add `beforeNavLinks` (`NavBrand`) + CSS in `custom.css`. Nav link icons are keyed by Payload's stable ids (`#nav-<collection-slug>`, `#nav-global-<global-slug>`) via a `--sp-icon` mask — add a rule there when adding a collection/global. Active link = `.nav__link:has(.nav__link-indicator)`.
- [2026-11-13] Design source of truth is the Pencil file `D:/Project/.design/Sandpiper/sandpiper.pen` (frames "Sandpiper — Landing Page (Home)", "(Android)", "Nav Drawer (Android)", "Landing Page — Sections Plan"). Read it via the pencil MCP; export frames to PNG with `Export(...)` to inspect — `TakeScreenshot` is too small for detail. Pen rotation is counter-clockwise: CSS `rotate` = −pen rotation.
- [2026-11-13] Sandpiper's real identity (per the design) is a Philadelphia corner café at 1640 South St: USD prices, Lavazza, open 7–4. The earlier "Indonesian shoreline café" starter copy is gone from seed + `site.ts`.
- [2026-11-13] Landing sections are positioned on the 1440 artboard with `min(<px/14.4>vw, <px>px)` values so desktop scales down to 1024 and caps above 1440; below `lg` each section reflows to the Android layout. Keep that pattern when adding sections.
- [2026-11-13] Visual check without Pencil's browser (it timed out): drive headless Chrome over CDP (`Emulation.setDeviceMetricsOverride` for real 412px mobile — `--window-size` has a ~500px minimum on Windows; iframes are blocked by our X-Frame-Options). Scroll the page before capturing or lazy images stay blank.

