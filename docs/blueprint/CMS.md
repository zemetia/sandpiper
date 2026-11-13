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
| `src/cms/seed/` | Starter content (Philadelphia café: landing page, 6 pages, 6 categories, 28 menu items) + `images/` (webp photos uploaded to Media on seed) + `seedEndpoint` (`POST /api/seed`, signed-in only, refuses with 409 if any page exists) |
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
3. Regenerate `payload-types.ts`; add VO in `cms.vo.ts`, mapper in `cms.mappers.ts` (+ test), reader in `cmsService`.
4. Add a nav icon rule in `src/app/(payload)/custom.css`.
5. Extend the seed if a fresh site should have starter content.

## Editing flow

Pages and menu items have drafts + versions. Pages autosave (400 ms) and show a **Live Preview** pane (mobile/tablet/desktop); the site refreshes on each autosave via `LivePreviewListener`. **Preview** opens `/preview?path=…`, which turns on draft mode and shows a banner with an exit link. Menu item preview opens `/menu`.

## Rate limiting

`/api/*` is limited to 60 req/min per IP; with a `payload-token` cookie the ceiling rises to 600 (the admin is chatty). The cookie is not verified in middleware → [ARCHITECTURE/04-proxy.md](./ARCHITECTURE/04-proxy.md).

## Known issue

`npx payload generate:types` / `generate:importmap` crash locally (undici `Illegal constructor` under tsx on Node 22.18). The import map regenerates in `next dev`; for types, call `generateTypes(config)` from `payload/node` in a temporary dev route and delete the route afterwards.

← [Blueprint INDEX](./INDEX.md)
