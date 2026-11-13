# CMS (Payload 3)

← [Blueprint INDEX](./INDEX.md)

Payload runs inside the Next.js app: admin at `/admin`, REST at `/api/*`, GraphQL at `/api/graphql`. Postgres via `@payloadcms/db-postgres` (`DATABASE_URI`, `PAYLOAD_SECRET`). In `next dev` the schema is pushed automatically; production needs migrations. Uploads go to `/media` (git-ignored).

**All visitor-facing content lives here** — pages, menu, hours, contact, nav, footer, announcement. `src/config/site.ts` keeps only SEO/GEO/LLMs.txt brand copy; `src/config/copy.ts` keeps only fixed UI chrome strings.

## File map

| Path | Purpose |
|---|---|
| `src/payload.config.ts` | Collections, globals, localization (`en`, `id`, fallback on), SEO plugin, admin branding + components, live preview breakpoints, `/api/seed` endpoint. Imported elsewhere as `@payload-config` |
| `src/collections/` | `Pages` (`pages`), `MenuItems` (`menu-items`), `Categories` (`categories`, optional plate `image`), `Media` (`media`), `Subscribers` (`subscribers` — footer newsletter; public `POST /api/subscribers/subscribe`, idempotent, Zod-validated), `CateringRequests` (`catering-requests` — catering quote form; public `POST /api/catering-requests/submit`, Zod schema shared with the form in `src/lib/validations/catering.ts`, honeypot `website`), `ContactMessages` (`contact-messages` — contact page form; public `POST /api/contact-messages/submit`, schema in `src/lib/validations/contact.ts`, same honeypot), `Users` (`users`, roles `admin` / `editor`; first user becomes admin) |
| `src/cms/access/` | `isAdmin`, `isAdminField`, `isAuthenticated`, `anyone`, `publishedOrAuthenticated`, `isAdminOrSelf` |
| `src/cms/fields/` | `slugField()` / `formatSlug`, `link()` / `linkGroup()`, `seoTab` |
| `src/cms/blocks/` | Page-builder block configs, collected in `pageBlocks` |
| `src/cms/globals/` | `SiteSettings` (`site-settings` — brand, contact, hours, socials, announcement), `Header` (nav items with drawer icon/badge, CTA + `ctaBadge`, blue info bar, ticker, mobile-drawer contact heading + promo card), `Footer` (blurb, Explore links, column headings, copyright, note, giant `wordmark`, newsletter copy) |
| `src/cms/preview.ts` | `pagePath(slug)` (`home` → `''`) and `previewUrl(path)` → `/preview?path=<path>` |
| `src/cms/admin/` | Admin React components: `Brand` (logo/icon), `NavBrand` (sidebar header), `HeaderActions` (top-bar "View site"), `Avatar` (initials avatar), `Dashboard`, `RowLabel`s, `FieldNote`, `SeedButton`, `ViewSiteLink` |
| `src/cms/seed/` | Mirrors the live site (Philadelphia café: 7 pages, 13 categories, 103 menu items, 3 globals, first admin from `SEED_ADMIN_*` env when `users` is empty) + `images/` (webp photos uploaded to Media on seed) + `seedEndpoint` (`POST /api/seed`: signed-in user **or** `Authorization: Bearer $SEED_SECRET`; refuses with 409 if any page exists). CLI: `npm run seed` (`scripts/seed.mjs`, app must be running) or `npm run seed:direct` (`scripts/seed-direct.ts`, Local API straight into `DATABASE_URI` — the way to seed production; runs in production mode so it never dev-pushes, and applies pending migrations first). Form submissions (subscribers, contact, catering) are never seeded |
| `src/app/(payload)/` | Payload's own root layout, `admin/[[...segments]]`, `api/[...slug]`, `api/graphql` |
| `src/app/(payload)/custom.css` | Admin theme (overrides Payload's `--color-base-*` / `--color-success-*` scales) + sidebar, top bar (app header) styling and nav icons |
| `src/app/(payload)/admin/importMap.js` | **Generated** — never hand-edit or replace with a `.ts` file |
| `src/payload-types.ts` | **Generated** types — regenerate after any schema change (ESLint-ignored) |
| `src/services/cms.service.ts` | Server-only Local API reads → value objects → [SERVICES/02](./SERVICES/02-services-zod-health.md) |
| `src/services/cms.mappers.ts` | Pure doc → VO mappers (`toImage`, `toLink`, `toMenuItem`, …), unit-tested |
| `src/types/value-objects/cms.vo.ts` | `ImageVO`, `LinkVO`, `MenuItemVO`, `MenuCategoryVO`, `SiteSettingsVO`, `NavigationVO` |
| `src/components/cms/` | `CmsPage` (+ `cmsMetadata`), `RenderBlocks`, one renderer per block in `blocks/`, `CmsLink` (button), `LinkTo` (unstyled internal/external link), `CmsImage`, `RichText`, `MenuItemCard`, `SectionHeading`, `LivePreviewListener` |
| `src/components/cms/landing/` | Landing-page pieces: `primitives` (`pillVariants`/`PillLink`, `Sticker`, `Eyebrow` — CVA), client `HeroSlider`, `MenuBoardTabs`, `PlateScroller` |
| `src/app/(site)/page.tsx` | Home → `CmsPage slug="home"` (shows an empty-site state with an `/admin` link if not seeded) |
| `src/app/(site)/[...slug]/page.tsx` | All other pages, nested slugs supported; `/home` redirects to `/` |
| `src/app/preview/` | `route.ts` enables draft mode (requires CMS login via `payload.auth`); `exit/route.ts` disables it. Both validate `path` with `isSafePath` |

## Blocks

The first ten are the homepage design (admin group **Landing page**); the rest are general-purpose.

| Block config | `slug` | Renderer |
|---|---|---|
| `HomeHero` | `homeHero` | `HomeHeroBlock` + client `HeroSlider` (headline slide + up to 3 dish slides, autoplay with pause) |
| `Ribbons` | `ribbons` | `RibbonsBlock` (two crossing marquees; overlaps the blocks above/below via negative margins) |
| `MenuBoard` | `menuBoard` | `MenuBoardBlock` + client `MenuBoardTabs` (`cmsService.getMenuBoard`) |
| `PlateParade` | `plateParade` | `PlateParadeBlock` + client `PlateScroller` (drag/swipe) |
| `CoffeeOrbit` | `coffeeOrbit` | `CoffeeOrbitBlock` (drinks = picked menu items) |
| `MuralStory` | `muralStory` | `MuralStoryBlock` |
| `ReviewThread` | `reviewThread` | `ReviewThreadBlock` |
| `GramWall` | `gramWall` | `GramWallBlock` |
| `VisitHours` | `visitHours` | `VisitHoursBlock` (address/map link fall back to Site settings) |
| `SunCta` | `sunCta` | `SunCtaBlock` |
| `CateringHero` | `cateringHero` | `CateringHeroBlock` (admin group **Catering page**; photo collage + stamp, icon facts) |
| `CateringRibbon` | `cateringRibbon` | `CateringRibbonBlock` (straight ink marquee; admin label "Ink ribbon", also used on About/Contact) |
| `CateringMenu` | `cateringMenu` | `CateringMenuBlock` + client `catering/CateringMenuChips` (phone jump chips, scroll-spy); trays are plain array rows, not menu items |
| `CateringUseCases` | `cateringUseCases` | `CateringUseCasesBlock` |
| `CateringSteps` | `cateringSteps` | `CateringStepsBlock` (tilted cards on desktop, timeline on phones) |
| `CateringQuote` | `cateringQuote` | `CateringQuoteBlock` + client `catering/CateringQuoteForm` → `cateringService.requestQuote` → `POST /api/catering-requests/submit` |
| `AboutHero` | `aboutHero` | `AboutHeroBlock` (admin group **About page**; two polaroids + stamp, outlined tags) |
| `AboutBelief` | `aboutBelief` | `AboutBeliefBlock` (statement + staggered plate strip; swipe row on phones) |
| `AboutKitchen` | `aboutKitchen` | `AboutKitchenBlock` (photo collage + seal, numbered pillars) |
| `AboutGallery` | `aboutGallery` | `AboutGalleryBlock` (3 + 4 photo rows) |
| `AboutTeam` | `aboutTeam` | `AboutTeamBlock` (member cards + optional hiring card) |
| `AboutClosing` | `aboutClosing` | `AboutClosingBlock` |
| `ContactHero` | `contactHero` | `ContactHeroBlock` (admin group **Contact page**; call button from Site settings phone, hours card, polaroid, stamp) |
| `ContactForm` | `contactForm` | `ContactFormBlock` + client `contact/ContactMessageForm` → `contactService.send` → `POST /api/contact-messages/submit` |
| `ContactFind` | `contactFind` | `ContactFindBlock` (button can use the Site settings map URL) |
| `OrderHero` | `orderHero` | `OrderHeroBlock` (admin group **Order page**; centred on desktop; phones get client `order/OrderToggle`, a Pickup/Delivery switch that sets `data-order-view` on `<html>`) |
| `OrderChoices` | `orderChoices` | `OrderChoicesBlock` (both cards side by side on desktop; below `lg` only the card picked in `OrderToggle` shows, via `in-data-[order-view=…]`; pickup card → Toast link + numbered steps; delivery card → one row per app with `order/AppTile` brand tile, optional client `order/PromoCode` copy chip) |
| `MenuBrowser` | `menuBrowser` | `MenuBrowserBlock` (admin group **Menu page**; yellow header with client `menu/OpenPill` (café-time OPEN NOW / CLOSED from `opensAt`/`closesAt`), client `menu/MenuBrowser` = Pickup/Delivery switch (picks where every dish's + button links; remembered in `localStorage`), live search, desktop sticky category sidebar / phone sticky ink chip bar with scroll-spy; dishes render through `menu/MenuCard` — card on desktop, ruled row on phones; item `badge` and sold-out label) |
| `Hero` | `hero` | `HeroBlock` |
| `Content` | `content` | `ContentBlock` |
| `MediaContent` | `mediaContent` | `MediaContentBlock` |
| `MenuHighlights` | `menuHighlights` | `MenuHighlightsBlock` |
| `FullMenu` | `fullMenu` | `FullMenuBlock` |
| `Gallery` | `gallery` | `GalleryBlock` |
| `Testimonials` | `testimonials` | `TestimonialsBlock` |
| `Faq` | `faq` | `FaqBlock` (also feeds `faqSchema` JSON-LD) |
| `VisitUs` | `visitUs` | `VisitUsBlock` |
| `CallToAction` | `cta` | `CallToActionBlock` |

## Request flow

```
/menu
  src/middleware.ts → rate limit + security headers   (/en/*, /id/* → 308 unprefixed)
  (site)/[...slug]/page.tsx
    generateMetadata → cmsMetadata(slug) → buildMetadata()
    <CmsPage slug>
      cmsService.getPage()        published only, or draft when draft mode is on
      draft? → DraftBanner + LivePreviewListener
      <StructuredData> webpage · breadcrumb · business (home) · faq (if FAQ block)
      <RenderBlocks> → blocks/<Name>Block.tsx
```

Layout chrome (`AnnouncementBar`, `Header`, `Footer`) is fed by `cmsService.getSiteSettings()` + `getNavigation()` in `src/app/(site)/layout.tsx`.

## Rules

- Admin component paths are strings relative to `src/` — `'/cms/admin/Dashboard#Dashboard'`.
- Config files (`payload.config.ts`, `collections/`, `cms/` except `admin/`) use **relative imports**, not `@/`, so the Payload CLI can load them.
- `cmsService` is **not** exported from `@/services` — that barrel is used client-side. Never import `payload` or `@payload-config` in client components or middleware.
- Public reads pass `overrideAccess: false` (published only). Draft mode → `draft: true, overrideAccess: true`.
- Internal links from the CMS are site paths (`/menu`); render them with `CmsLink` / `LinkTo` (`next/link`, href cast to `Route` because `typedRoutes` is on).
- Payload `localization` (en + id) is still configured because the DB schema depends on it, but the site only reads the default `en`. Don't add `localized: true` to new fields and don't write content in `id`.
- Media URLs go through `toImage()`, which strips the `serverURL` origin Payload adds to size variants — `next/image` only accepts relative (local) URLs here.
- CMS strings in JSON-LD are safe only through `<StructuredData>` / `serializeSchema` (escapes `<`). Redirect targets from query params must pass `isSafePath`.
- Page SEO: CMS SEO tab wins; `siteConfig.pages` entry with the same path is the fallback.
- Admin sidebar: style Payload's default Nav, don't replace it. Nav icons are keyed by `#nav-<collection-slug>` / `#nav-global-<global-slug>` in `custom.css` — add a rule when adding a collection or global.
- Rich text renders through `RichText` with the `.prose-cms` class → [DESIGN_SYSTEM/02](./DESIGN_SYSTEM/02-typography-utilities.md).
- Prices are formatted with `formatPrice()` from `@/lib/format` (USD as `en-US`; IDR still supported as `id-ID`).

## Adding a block

1. Config in `src/cms/blocks/<Name>.ts` with an `interfaceName`, add to `pageBlocks`.
2. Regenerate `payload-types.ts`.
3. Renderer in `src/components/cms/blocks/<Name>Block.tsx`, add a `case` in `RenderBlocks` (the `assertNever` default fails type-check until you do).
4. Add a render case to `src/components/cms/blocks/blocks.test.tsx`.

## Adding a collection or global

1. Collection → `src/collections/<Name>.ts`; global → `src/cms/globals/<Name>.ts`. Register in `payload.config.ts`.
2. Access from `src/cms/access`; visitor copy `localized: true`; add `versions.drafts` if editors should preview before publishing.
3. Regenerate `payload-types.ts` **and create a migration** (see Database & migrations); add VO in `cms.vo.ts`, mapper in `cms.mappers.ts` (+ test), reader in `cmsService`.
4. Add a nav icon rule in `src/app/(payload)/custom.css`.
5. Extend the seed if a fresh site should have starter content.

## Editing flow

Pages and menu items have drafts + versions. Pages autosave (400 ms) and show a **Live Preview** pane (mobile/tablet/desktop); the site refreshes on each autosave via `LivePreviewListener`. **Preview** opens `/preview?path=…`, which turns on draft mode and shows a banner with an exit link. Menu item preview opens `/menu`.

## Menu cache

`cmsService.getMenu()` serves the published menu from the Next.js data cache (`unstable_cache`, tag `menu`, 1-day safety `revalidate`). Payload `afterChange`/`afterDelete` hooks on `menu-items`, `categories`, `media` and the `site-settings` global call `revalidateTag('menu', { expire: 0 })` (`src/cms/hooks/revalidateMenu.ts`), so an edit shows on the next visit. Draft mode bypasses the cache. Add `hooks: menuHooks` to any new collection the menu renders.

## Rate limiting

`/api/*` is limited to 60 req/min per IP, auth endpoints to 10 per 15 min, and a verified CMS session to 600/min; users lock after 5 failed logins → [ARCHITECTURE/04-proxy.md](./ARCHITECTURE/04-proxy.md).

## Database & migrations

Production is Vercel + Neon. `payload.config.ts` reads `DATABASE_URI`, falling back to `DATABASE_URL` / `POSTGRES_URL` (what the Neon integration sets), and turns on TLS for any non-localhost host — Neon rejects plaintext even when the URL has no `sslmode`.

`next dev` pushes schema changes on the fly; production never does. It runs `src/migrations` through `prodMigrations` on the first Payload init — in practice during `next build` (the sitemap is the one build-time DB reader), so functions start on a migrated DB. **Any schema change (field, block, collection, global, localization) needs a new migration committed with it**, or production queries hit missing columns. Use `npx payload migrate:create <name>` (see Payload CLI below), or create it from a temporary dev route and delete the route afterwards:

```ts
// src/app/api/tmp-create-migration/route.ts — delete after use
const payload = await getPayload({ config });
await payload.db.createMigration({ migrationName: '<name>', payload, forceAcceptWarning: true });
```

It diffs against the latest snapshot in `src/migrations` (not the DB). Generated files are lint/prettier-ignored; drop the unused `payload, req` params (`noUnusedParameters`). Never point `next dev` at the production DB — the dev push marks it, and `prodMigrations` then stops at an interactive "data loss" prompt, which exits the process on Vercel.

CMS pages render per request (`/` is `force-dynamic`, like `[...slug]`): a build-time snapshot would ignore CMS edits and bake a 404 while the production DB is still empty.

## Media storage

Vercel's filesystem is read-only, so `media` uploads go to Vercel Blob through `@payloadcms/storage-vercel-blob` whenever `BLOB_READ_WRITE_TOKEN` is set (Vercel sets it when a Blob store is connected to the project); without it the plugin disables itself and files stay in `./media`. Blobs are stored at the root under the Payload filename (no random suffix, empty prefix), and served through Payload (`/api/media/file/…`). The plugin adds `prefix` + `_objectKey` columns to `media` (migration `20261113_100800_blob_storage_fields`); `alwaysInsertFields: true` keeps them in every environment, so the schema doesn't change with the token. Seeding production needs the token too, or the photos land on the seeding machine's disk. `npm run media:blob` (`scripts/upload-media-to-blob.mjs`) pushes the seed photos (original + every image size from `./media`) to Blob under the same names, so a seeded DB resolves them.

`NEXT_PUBLIC_APP_URL` is read only through `src/config/app-url.ts` (`appUrl`): it adds a missing `https://` and falls back to `VERCEL_PROJECT_PRODUCTION_URL`. A scheme-less value used to crash every page's `generateMetadata` (`Invalid URL`).

## Payload CLI

`package.json` has `"type": "module"`, which the Payload CLI needs: as CommonJS, `npx payload …` died in undici (`Illegal constructor`) under tsx. `npx payload generate:importmap` / `generate:types` / `payload run <script>` work now.

← [Blueprint INDEX](./INDEX.md)
