# SEO/GEO/LLM — 02: SEO

← [01 — Site Config](./01-site-config.md) | [SEO_GEO_LLM.md](../SEO_GEO_LLM.md) | [03 — GEO →](./03-geo.md)

---

## Files

| File | Purpose |
|---|---|
| [`src/lib/seo.ts`](../../../src/lib/seo.ts) | `buildMetadata()` — call in every page's `generateMetadata()`; `absoluteUrl(path)` — absolute prefixed URL |
| [`src/components/cms/CmsPage.tsx`](../../../src/components/cms/CmsPage.tsx) | `cmsMetadata(slug)` — `buildMetadata()` for CMS pages (SEO tab → `siteConfig.pages` fallback) |
| [`src/app/sitemap.ts`](../../../src/app/sitemap.ts) | `/sitemap.xml` from `siteConfig.pages` + published CMS pages |
| [`src/app/robots.ts`](../../../src/app/robots.ts) | Auto-generates `/robots.txt` |

---

## buildMetadata() — Required in Every Public Page

Every public page must export `generateMetadata`. Use `buildMetadata()` — never hand-write `Metadata` objects. CMS routes call `cmsMetadata(slug)`, which wraps it; the example below is for a hand-coded page.

```ts
// src/app/(site)/<path>/page.tsx
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export function generateMetadata(): Metadata {
  const page = siteConfig.pages['about'];
  return buildMetadata({
    title: page?.title,
    description: page?.description,
    path: '/about',
  });
}
```

### What buildMetadata() produces

| Field | Source |
|---|---|
| `title` | `title` arg → `siteConfig.seo.titleTemplate` |
| `description` | `description` arg → `siteConfig.description` |
| `metadataBase` | `siteConfig.url` |
| `alternates.canonical` | `absoluteUrl(path)` — unprefixed, single locale |
| `openGraph.*` | title, description, image, locale, type, siteName |
| `twitter.*` | card `summary_large_image`, title, description, image, creator |
| `robots` | `index:true, follow:true` (or noindex if `noIndex:true`) |

### noIndex pages

Auth pages, dashboards, and any non-public route:
```ts
return buildMetadata({ title: 'Login', path: '/login', noIndex: true });
```

---

## Single locale

No hreflang: the site is English (en-US) only. Old `/en/*` and `/id/*` URLs 308-redirect to the unprefixed path in `src/middleware.ts`.

---

## OG Image

1. Place the image at `public/og.png` (1200×630 px)
2. Update `siteConfig.ogImage` if the path differs
3. For per-page OG images, generate with Next.js `ImageResponse`:
   - CMS pages: set the image in the page's SEO tab instead (used as `ogImage` by `cmsMetadata`)
   - Hand-coded pages: create `src/app/(site)/<path>/opengraph-image.tsx`
   - Return `<ImageResponse>` — see [Next.js docs on OG images](https://nextjs.org/docs/app/api-reference/file-conventions/opengraph-image)

---

← [01 — Site Config](./01-site-config.md) | → [03 — GEO](./03-geo.md)
