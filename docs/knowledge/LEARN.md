# LEARN — Correction & Mistake Log

> Written whenever: (1) the user explicitly corrects the AI, or (2) the AI recognizes it deviated from what was asked or from best practice. Format is compact but lossless.

**Template:** `[YYYY-MM-DD] - [problem] - [solution] - [lesson]`

---

<!-- Entries below, newest first -->

[2026-11-13] - The `/api` rate limiter keyed on the leftmost `X-Forwarded-For` entry and gave 600/min to any request carrying a `payload-token` cookie without checking it, so rotating a header or sending a fake cookie bypassed it; login had no stricter tier and no account lockout - Added `clientIp()` (trusted header / rightmost hop, IPv6 /64), HS256 verification of the session cookie, a 10 per 15 min auth tier, a bounded store, and `maxLoginAttempts` on Users - Never key a security control on a header the client can set, and never let an unverified cookie raise a limit

[2026-11-13] - Syncing the new menu into the dev DB, a generic page-layout remap rewrote every block key named `items`/`categories`, which also emptied the Gift Cards FAQ and Catering menu (arrays of objects, not relationship ids) - Restored both pages from the on-disk backup taken before the sync and verified they matched exactly - When remapping relationship ids in page layouts, match on blockType + field, never on a field name alone

[2026-11-13] - Asked to remove i18n "for this branch landing-page", I first created a new branch `chore/remove-i18n` before noticing the instruction - Switched back to `feat/landing-page` and deleted the empty branch before any commit - When the user names the branch to work on, work on that branch; don't branch off by reflex

[2026-11-13] - Catering mobile hero headline wrapped to 3 lines at 412px although the design fits 2: sizing it `15vw` matched the Pencil px value, but the web font renders a little wider than Pencil's - Dropped to `min(14.5vw,62px)` and re-checked the screenshot - Don't trust a 1:1 px→vw conversion for giant display type; leave ~5% headroom and verify at the exact frame width

[2026-11-13] - Reseeding the dev DB for the landing page: a temp route deleted pages/menu/categories, then the seed failed validation, and the "backup" of the old pages was only in the HTTP response (an error page), so the old starter pages and one user edit to Home were lost; each failed run also re-uploaded every seed image - Reseeded, deleted the 66 orphaned media docs, reported the loss - Write any backup to disk BEFORE the destructive step, and dry-run a seed (or wrap it in a transaction) before deleting what it replaces

[2026-11-13] - Seed's `locale: 'id'` page-title updates failed: Payload validates every required localized block field in that locale, and they are empty until translated - Dropped page-title translations from the seed and made new landing-block text fields optional - Avoid `required: true` on localized fields in blocks; never update a block page in a second locale from a seed

[2026-11-09] - Seed wrote all English content under the `id` locale: Payload Local API writes `locale` back onto the shared `req`, so one `update({ locale: "id", req })` flipped every later call - Pinned `locale: "en"` in the seed base options; backfilled missing `en` rows in every `*_locales` table in one transaction (dry run first) - When sharing `req` across Local API calls, always pass `locale` explicitly; verify the admin list view, not just the storefront

[2026-11-09] - Deleting an admin component file that was in the generated import map crashed the whole admin (Module not found) before the map could regenerate - Removed the stale lines from importMap.js by hand - Remove the config reference and let `next dev` regenerate the map BEFORE deleting the component file

[2026-11-09] - Restyled the sidebar when the user meant the top bar (app header); the user had to correct it - Reverted the unfinished sidebar work and redid the top bar - In Payload, "navbar" is ambiguous: sidebar = `.nav`, top bar = `.app-header`; confirm with a screenshot before redesigning

[2026-11-08] - Admin dashboard broke ("CollectionCards not found in importMap") because a hand-written empty `admin/importMap.ts` shadowed Payload's generated `importMap.js` - Deleted the .ts stub, import `./importMap.js` explicitly, ESLint-ignore the generated file and scope custom TS rules to `*.ts(x)` - Never hand-write or rename Payload's import map; the generated .js file is the source of truth

[2026-11-08] - Multi-line find/replace via `node -e` against CRLF files silently missed anchors (once truncating `src/lib/seo.ts`), and bash double-quoted scripts mangled template literals - Restored from git and redid with the Edit tool - On this Windows repo use the Edit/Write tools for any multi-line or backtick-containing change; never script edits that rely on `\n` anchors

[2026-11-08] - `buildMetadata()`/sitemap omitted the `/en` prefix although routing is `localePrefix: always`, and middleware locale-redirected `/sitemap.xml`, `/robots.txt`, `/llms.txt` - Added `localizedUrl()` (always prefixed) and excluded SEO files from the middleware matcher - Canonicals must point at the final URL, never at a redirect

[2026-06-09] - Template used root `proxy.ts` (Next.js 16 rename of middleware.ts), which has confirmed production-mode bugs (#85711), Windows 11 `next start` failure (#85243), and Cloudflare/pageExtensions breakage (#86122, #86303) — reverted to `src/middleware.ts` with `export function middleware` — never use root `proxy.ts` in this template; always use `src/middleware.ts`; the `src/proxy/` modules folder is fine to keep

[2026-06-09] - i18n routing used `localePrefix: 'as-needed'` so the default locale had no URL prefix — `/about` served English without redirecting to `/en/about`, violating the "all routes must have a locale prefix" requirement; also `PostHogProvider` used `usePathname`/`useSearchParams` from `next/navigation` breaking the non-negotiable; blueprint docs documented the wrong localePrefix and still showed a deprecated `middleware.ts` example - Fixed `localePrefix` to `'always'`, fixed PostHog to use `@/i18n/navigation` + `useLocale`, and rewrote the blueprint sections - `localePrefix` must be `'always'`; never import from `next/navigation` even in analytics/provider files; blueprint must document `proxy.ts` not `middleware.ts`

[2026-06-06] - Pushed commits to `master` without first checking the repo's default branch (`main`), creating diverged histories - Merged `master` → `main` with `--allow-unrelated-histories`, pushed to `origin/main` - Always check the default branch before the first push; never assume it is `master`

[2026-11-13] - Documented `npx payload` / `payload run` as unusable here (undici `Illegal constructor`) and worked around it with temp routes and an HTTP seed endpoint - The real cause was `package.json` lacking `"type": "module"` (Payload's CLI expects ESM); adding it made the CLI and `payload run` work, build and tests unaffected - Before recording a tool as broken, check project config (module type, tsconfig) against the tool's official template
[2026-11-13] - Production media records were named "photo-1.webp" (seeded from a machine whose ./media already had the photos, so Payload de-duplicated the name), while Blob only got "photo.webp" — every image 500'd - seed uploads now pass `overwriteExistingFiles: true`; production records renamed back - before pushing files to storage, list the filenames the target DB actually references (`/api/media`) instead of assuming the seed's names.

[2026-11-13] - Claimed the Vercel Blob adapter needs no migration (checked only the optional `prefix` field); `@payloadcms/plugin-cloud-storage` always adds `_objectKey` when enabled, so the deploy with the token 500'd every page reading `media` - added migration `blob_storage_fields` + `alwaysInsertFields: true`, ran it on Neon immediately - after adding any Payload plugin, run `payload migrate:create` with the plugin ENABLED and see if it produces a diff before saying no migration is needed
