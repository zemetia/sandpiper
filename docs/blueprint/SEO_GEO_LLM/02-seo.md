# SEO/GEO/LLM — 02: SEO

← [01 — Site Config](./01-site-config.md) | [SEO_GEO_LLM.md](../SEO_GEO_LLM.md) | [03 — GEO →](./03-geo.md)

---

## Files

| File | Purpose |
|---|---|
| [`src/lib/seo.ts`](../../../src/lib/seo.ts) | `buildMetadata()` — call in every page's `generateMetadata()`; `localizedUrl(path, locale)` — absolute prefixed URL |
| [`src/components/cms/CmsPage.tsx`](../../../src/components/cms/CmsPage.tsx) | `cmsMetadata(slug, locale)` — `buildMetadata()` for CMS pages (SEO tab → `siteConfig.pages` fallback) |
| [`src/app/sitemap.ts`](../../../src/app/sitemap.ts) | `/sitemap.xml` from `siteConfig.pages` + published CMS pages |
| [`src/app/robots.ts`](../../../src/app/robots.ts) | Auto-generates `/robots.txt` |

---

## buildMetadata() — Required in Every Public Page

Every public page must export `generateMetadata`. Use `buildMetadata()` — never hand-write `Metadata` objects. CMS routes call `cmsMetadata(slug, locale)`, which wraps it; the example below is for a hand-coded page.

```ts
// src/app/[locale]/<path>/page.tsx
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = siteConfig.pages['about'];
  return buildMetadata({
    title: page?.title,
    description: page?.description,
    path: '/about',
    locale,
  });
}
```

### What buildMetadata() produces

| Field | Source |
|---|---|
| `title` | `title` arg → `siteConfig.seo.titleTemplate` |
| `description` | `description` arg → `siteConfig.description` |
| `metadataBase` | `siteConfig.url` |
| `alternates.canonical` | `localizedUrl(path, locale)` — always locale-prefixed |
| `alternates.languages` | hreflang for every `routing.locales` entry + `x-default` (→ default locale URL) |
| `openGraph.*` | title, description, image, locale, type, siteName |
| `twitter.*` | card `summary_large_image`, title, description, image, creator |
| `robots` | `index:true, follow:true` (or noindex if `noIndex:true`) |

### noIndex pages

Auth pages, dashboards, and any non-public route:
```ts
return buildMetadata({ title: 'Login', path: '/login', locale, noIndex: true });
```

---

## i18n + hreflang

`buildMetadata()` automatically generates `alternates.languages` for every locale in `routing.locales`. No manual hreflang work needed.

Output for `/about` (locale `en`) with `localePrefix: 'always'`:
```html
<link rel="canonical" href="https://sandpiper.cafe/en/about" />
<link rel="alternate" hreflang="en" href="https://sandpiper.cafe/en/about" />
<link rel="alternate" hreflang="id" href="https://sandpiper.cafe/id/about" />
<link rel="alternate" hreflang="x-default" href="https://sandpiper.cafe/en/about" />
```

Canonicals must point at the final URL — never at an unprefixed path that redirects. Always build URLs with `localizedUrl()`.

---

## Sitemap

`src/app/sitemap.ts` is data-driven — **do not hard-code URLs in it**.

Entries = `siteConfig.pages` (with their `priority`/`changeFreq`) + every published CMS page (`cmsService.getPageSlugs()`, `weekly`, `0.7`, `lastModified = updatedAt`), skipping CMS paths already in `siteConfig`. One URL per `page × locale`. If the DB is unreachable (e.g. at build) it falls back to `siteConfig.pages` only. Served at `/sitemap.xml`; the middleware matcher excludes `sitemap.xml`, `robots.txt` and `llms.txt` so they are never locale-redirected.

Priority guide:
| Page type | `priority` |
|---|---|
| Home | `1.0` |
| Core product/feature | `0.9` |
| Secondary (about, pricing) | `0.8` |
| Blog post | `0.6` |
| Archive/list | `0.5` |

---

## robots.txt

Auto-generated at `/robots.txt` by `src/app/robots.ts`. Default allows all bots, disallows `/api/` and `/_next/`. Points to `/sitemap.xml`.

To block a specific bot (e.g. during a private beta):
```ts
// src/app/robots.ts
rules: [
  { userAgent: 'Googlebot', allow: '/' },
  { userAgent: '*', disallow: '/' },   // block all others during beta
],
```

---

## OG Image

1. Place the image at `public/og.png` (1200×630 px)
2. Update `siteConfig.ogImage` if the path differs
3. For per-page OG images, generate with Next.js `ImageResponse`:
   - CMS pages: set the image in the page's SEO tab instead (used as `ogImage` by `cmsMetadata`)
   - Hand-coded pages: create `src/app/[locale]/<path>/opengraph-image.tsx`
   - Return `<ImageResponse>` — see [Next.js docs on OG images](https://nextjs.org/docs/app/api-reference/file-conventions/opengraph-image)

---

← [01 — Site Config](./01-site-config.md) | → [03 — GEO](./03-geo.md)
