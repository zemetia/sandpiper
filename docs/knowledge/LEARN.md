# LEARN — Correction & Mistake Log

> Written whenever: (1) the user explicitly corrects the AI, or (2) the AI recognizes it deviated from what was asked or from best practice. Format is compact but lossless.

**Template:** `[YYYY-MM-DD] - [problem] - [solution] - [lesson]`

---

<!-- Entries below, newest first -->

[2026-11-09] - Seed wrote all English content under the `id` locale: Payload Local API writes `locale` back onto the shared `req`, so one `update({ locale: "id", req })` flipped every later call - Pinned `locale: "en"` in the seed base options; backfilled missing `en` rows in every `*_locales` table in one transaction (dry run first) - When sharing `req` across Local API calls, always pass `locale` explicitly; verify the admin list view, not just the storefront

[2026-11-09] - Deleting an admin component file that was in the generated import map crashed the whole admin (Module not found) before the map could regenerate - Removed the stale lines from importMap.js by hand - Remove the config reference and let `next dev` regenerate the map BEFORE deleting the component file

[2026-11-09] - Restyled the sidebar when the user meant the top bar (app header); the user had to correct it - Reverted the unfinished sidebar work and redid the top bar - In Payload, "navbar" is ambiguous: sidebar = `.nav`, top bar = `.app-header`; confirm with a screenshot before redesigning

[2026-11-08] - Admin dashboard broke ("CollectionCards not found in importMap") because a hand-written empty `admin/importMap.ts` shadowed Payload's generated `importMap.js` - Deleted the .ts stub, import `./importMap.js` explicitly, ESLint-ignore the generated file and scope custom TS rules to `*.ts(x)` - Never hand-write or rename Payload's import map; the generated .js file is the source of truth

[2026-11-08] - Multi-line find/replace via `node -e` against CRLF files silently missed anchors (once truncating `src/lib/seo.ts`), and bash double-quoted scripts mangled template literals - Restored from git and redid with the Edit tool - On this Windows repo use the Edit/Write tools for any multi-line or backtick-containing change; never script edits that rely on `\n` anchors

[2026-11-08] - `buildMetadata()`/sitemap omitted the `/en` prefix although routing is `localePrefix: always`, and middleware locale-redirected `/sitemap.xml`, `/robots.txt`, `/llms.txt` - Added `localizedUrl()` (always prefixed) and excluded SEO files from the middleware matcher - Canonicals must point at the final URL, never at a redirect

[2026-06-09] - Template used root `proxy.ts` (Next.js 16 rename of middleware.ts), which has confirmed production-mode bugs (#85711), Windows 11 `next start` failure (#85243), and Cloudflare/pageExtensions breakage (#86122, #86303) — reverted to `src/middleware.ts` with `export function middleware` — never use root `proxy.ts` in this template; always use `src/middleware.ts`; the `src/proxy/` modules folder is fine to keep

[2026-06-09] - i18n routing used `localePrefix: 'as-needed'` so the default locale had no URL prefix — `/about` served English without redirecting to `/en/about`, violating the "all routes must have a locale prefix" requirement; also `PostHogProvider` used `usePathname`/`useSearchParams` from `next/navigation` breaking the non-negotiable; blueprint docs documented the wrong localePrefix and still showed a deprecated `middleware.ts` example - Fixed `localePrefix` to `'always'`, fixed PostHog to use `@/i18n/navigation` + `useLocale`, and rewrote the blueprint sections - `localePrefix` must be `'always'`; never import from `next/navigation` even in analytics/provider files; blueprint must document `proxy.ts` not `middleware.ts`

[2026-06-06] - Pushed commits to `master` without first checking the repo's default branch (`main`), creating diverged histories - Merged `master` → `main` with `--allow-unrelated-histories`, pushed to `origin/main` - Always check the default branch before the first push; never assume it is `master`
