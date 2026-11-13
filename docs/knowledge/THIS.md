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
- ~~Use `@/i18n/navigation` for all routing — never `next/navigation`~~ (i18n removed 2026-11-13 — use `next/link` + `next/navigation`)
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

- [2026-11-08] ~~Payload CMS 3.0 routes (/admin and /api) must bypass next-intl middleware to prevent /en/admin locale redirects.~~ (next-intl removed) ~~Using importMap.ts preserves strict TypeScript typing and passes ESLint with 0 warnings.~~ (wrong — see LEARN.md)
- [2026-11-08] Sandpiper is a café site. All visitor-facing content (pages, menu, hours, nav, footer) lives in Payload; `src/config/site.ts` keeps only SEO/GEO/LLMs.txt brand copy. Pages render through `src/app/[locale]/[...slug]` + `CmsPage`; homepage = page slug `home`.
- [2026-11-08] Payload code layout: collections in `src/collections/`, everything else in `src/cms/` (access, fields, blocks, globals, admin components, seed). Admin component paths are baseDir-relative strings like `/cms/admin/Dashboard#Dashboard`; config files use relative imports (not `@/`) so the Payload CLI can load them.
- [2026-11-08] Server reads go through `cmsService` (`src/services/cms.service.ts`, Local API). It is deliberately NOT in the `@/services` barrel — that barrel is imported by client code and would bundle Payload. Public reads use `overrideAccess: false` so drafts never leak; draft mode flips it.
- [2026-11-08] `npx payload <cmd>` crashes on this machine (undici `Illegal constructor` under tsx, Node 22.18). Import map + DB schema regenerate automatically in `next dev`; for `payload-types.ts` call `generateTypes(config)` from `payload/node` inside a throwaway dev route, then delete it.
- [2026-11-08] ~~Prices: IDR formatted with the `<locale>-ID` Intl locale, so both en and id show `Rp 38.000` (Indonesian grouping) — intentional.~~ (now USD `en-US`; IDR `id-ID`)
- [2026-11-08] Developer wants Payload's headless-ecommerce patterns applied: menu items are modelled as products (variants, compare-at price, availability, featured, gallery, SEO tab). Full `@payloadcms/plugin-ecommerce` (carts/orders/Stripe) is the natural next step if online ordering is wanted.
- [2026-11-08] Delegating to agy (Gemini Flash) on this repo underperformed: run 1 tried a shell command, was denied (only `write_file` granted) and exited "SUCCESS" with zero files; run 2 (told "no commands") hit the 5-min print timeout after 2 of ~12 files. Small test/story batches here are cheaper done directly; if delegating, verify with `git status -uall` (plain `git status` collapses untracked dirs) and keep each batch to ~2–3 files.
- [2026-11-08] Blueprint resynced with the Payload/café build (STRUCTURE, ARCHITECTURE, I18N, SEO, DESIGN_SYSTEM, SERVICES, COMPONENTS, CMS). Follow-up cleanup: removed unused `next-limitr` + `messages/*/home.json`; `/llms.txt` now lists default-locale prefixed URLs via `localizedUrl()`.
- [2026-11-08] Admin sidebar is styled, not replaced: keep Payload's default Nav and add `beforeNavLinks` (`NavBrand`) + CSS in `custom.css`. Nav link icons are keyed by Payload's stable ids (`#nav-<collection-slug>`, `#nav-global-<global-slug>`) via a `--sp-icon` mask — add a rule there when adding a collection/global. Active link = `.nav__link:has(.nav__link-indicator)`.
- [2026-11-13] Design source of truth is the Pencil file `D:/Project/.design/Sandpiper/sandpiper.pen` (frames "Sandpiper — Landing Page (Home)", "(Android)", "Nav Drawer (Android)", "Landing Page — Sections Plan"). Read it via the pencil MCP; export frames to PNG with `Export(...)` to inspect — `TakeScreenshot` is too small for detail. Pen rotation is counter-clockwise: CSS `rotate` = −pen rotation.
- [2026-11-13] Sandpiper's real identity (per the design) is a Philadelphia corner café at 1640 South St: USD prices, Lavazza, open 7–4. The earlier "Indonesian shoreline café" starter copy is gone from seed + `site.ts`.
- [2026-11-13] Landing sections are positioned on the 1440 artboard with `min(<px/14.4>vw, <px>px)` values so desktop scales down to 1024 and caps above 1440; below `lg` each section reflows to the Android layout. Keep that pattern when adding sections.
- [2026-11-13] Visual check without Pencil's browser (it timed out): drive headless Chrome over CDP (`Emulation.setDeviceMetricsOverride` for real 412px mobile — `--window-size` has a ~500px minimum on Windows; iframes are blocked by our X-Frame-Options). Scroll the page before capturing or lazy images stay blank.

- [2026-11-13] Gift Cards page (`gift-cards`) = blocks `giftCardHero` / `giftCardSteps` / `giftCardPanels` / `giftCardFaq` (admin group **Gift cards**), renderers `src/components/cms/blocks/GiftCard*Block.tsx` + helpers in `src/components/cms/gift-cards/`, seed layout in `src/cms/seed/giftCards.ts`. Cards are sold/redeemed on Toast, so all CTAs are external Toast links (no payment flow); the amount chips only re-print the illustrated card (client `GiftCardStage`).
- [2026-11-13] Pencil `ctx.bounds` of a rotated node is its axis-aligned bounding box; raw `x/y/width/height` from `Get(id,{depth:0})` are the unrotated box, with rotation about the TOP-LEFT corner — use those with CSS `origin-top-left` + `rotate(-penRotation)`.
- [2026-11-13] To get generated Payload types without clobbering a concurrently edited `payload-types.ts`: temp route calls `generateTypes({...config, typescript: {...config.typescript, outputFile: <scratch>}})`, then `diff -u` + `patch` only the additions. A plain `generateTypes(await config)` right after editing `blocks/index.ts` returned the stale config once — importing `pageBlocks` in the route forced the fresh one.
- [2026-11-13] Catering page (`catering`) = blocks `cateringHero` / `cateringRibbon` / `cateringMenu` / `cateringUseCases` / `cateringSteps` / `cateringQuote` (admin group **Catering page**), renderers `src/components/cms/blocks/Catering*Block.tsx` + helpers in `src/components/cms/catering/`, seed layout `src/cms/seed/catering.ts`. Hero CTAs are `#menu` / `#quote` anchors — they work because `RenderBlocks` turns a block's `blockName` into its wrapper id, so the seed names those blocks "Menu" and "Quote".
- [2026-11-13] Quote requests are stored in the `catering-requests` collection (no email notification yet). Date-only form values are saved as `<date>T12:00:00Z` — a bare `2026-12-01` is parsed as local midnight and lands on the previous day in UTC.
- [2026-11-13] Page-specific CSS utilities in `globals.css` are prefixed per page (`gc-*` gift cards, `ct-*` catering) so concurrent page work can't collide. Scroll reveals use `animation-timeline: view()` inside `@supports` so browsers without it just show the content.
- [2026-11-13] i18n removed on `feat/landing-page`: Sandpiper only serves Philadelphia, so the developer doesn't want translations. Routes live in `src/app/(site)/` (no `[locale]`), fixed UI strings in `src/config/copy.ts`, links via `next/link` with `href as Route` (typedRoutes is on). Old `/en/*` and `/id/*` URLs 308-redirect in `src/middleware.ts`. Payload `localization` (en + id) is deliberately kept: dropping it changes the DB schema (`*_locales` tables) and would lose content without a migration.
- [2026-11-13] About (`about`) and Contact (`contact`) pages = blocks `about*` (group **About page**) and `contact*` (group **Contact page**), renderers `src/components/cms/blocks/{About,Contact}*Block.tsx`, shared helpers in `src/components/cms/story/primitives.tsx` (icons, `Stamp`, `AccentLines`), seed layouts `src/cms/seed/{about,contact}.ts`. Headlines are one textarea: each line is a line, `*line*` = accent colour (`headingLines`). Contact had no Pencil frame, so it was designed first as "Sandpiper — Contact Page" in the same language as About, then built.
- [2026-11-13] About team cards ship with placeholder names and no portraits (the Pencil file uses Unsplash stand-ins); real staff photos/names must come from the café — don't seed stock people as staff.
- [2026-11-13] Vitest 4 here fails a test when a mocked service's mutation rejects, even though React Query handles it and the UI shows the error (a bare `useMutation` repro passes). Not worth fighting; the catering/contact forms don't unit-test the failure path.
- [2026-11-13] Favicon = the brand badge (blue wordmark on the sunny circle, same as `<Logo variant="badge">`): `public/sandpiper-mark.svg` + `favicon.ico` (16/32/48) + `apple-touch-icon.png` (180, flattened on sunny), wired in `(site)/layout.tsx` and `payload.config.ts` `admin.meta.icons`. Regenerate from `Logo/paths.ts` with sharp if the logo changes; hex = token oklch converted (`#fedb41`, `#142dbe`). The admin in-app `Brand.tsx` mark is still the old starter bird.
- [2026-11-13] Menu data mirrors Toast (toasttab.com/local/order/sandpiper-1640-south-street): 13 categories / 103 items in `src/cms/seed/content.ts`, photos in `src/cms/seed/images/<item-slug>.webp`. Toast is behind Cloudflare (curl 403); headless Chrome loads it and the whole menu is SSR'd in `window.__OO_STATE__` (Menu → groups → items with `prices`, `description`, `imageUrls.xxl`). Image URLs are signed, so the `resize:fit:` segment can't be changed — download as-is and resize with `sharp`. Toast modifiers (sizes, milk, add-ons) are not in that state, so items carry base prices only, no variants.
- [2026-11-13] Order page (`order`, Pencil "Sandpiper — Order Now" + "(Android)") = blocks `orderHero` / `orderChoices` (group **Order page**), helpers in `src/components/cms/order/`, seed `src/cms/seed/order.ts`. Pickup = Toast online ordering (`toasttab.com/local/order/sandpiper-1640-south-street`); delivery = DoorDash / Uber Eats (promo code `eats-hn17lnqm`) / Grubhub store links. Every "Order now / Order online" CTA (header, drawer promo, footer, home, about) now points at `/order`, not `/menu`. Partner tile colours are tokens `--color-doordash|ubereats|grubhub`. On phones only one card shows: the hero switch sets `data-order-view` on `<html>` (the cards live in another block) and the cards use `max-lg:in-data-[order-view=delivery]:…`.
