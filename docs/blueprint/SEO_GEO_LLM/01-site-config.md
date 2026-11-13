# SEO/GEO/LLM — 01: Site Config

← [SEO_GEO_LLM.md](../SEO_GEO_LLM.md) | [Blueprint INDEX](../INDEX.md) | [02 — SEO →](./02-seo.md)

---

## File: `src/config/site.ts`

This is the **company brain** for SEO/GEO/LLMs.txt — brand identity, fallback metadata and the core page registry. Read it before generating any SEO content.

> **Scope (Sandpiper):** visitor-facing content — pages, menu, hours, address, nav, footer — lives in Payload (see [CMS.md](../CMS.md)). `site.ts` keeps only brand copy used by metadata, JSON-LD and `/llms.txt`. Don't duplicate CMS facts here.

---

## Purpose of Each Section

### Core identity
```ts
name: 'Sandpiper',
tagline: 'Specialty coffee and all-day kitchen by the shore.',
description: 'Two-sentence pitch: what, for whom, and how it differs.',
url: process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://sandpiper.cafe',
```
- `name` → Organization schema, OG `site_name`, LLMs.txt heading
- `tagline` → LLMs.txt blockquote, og:title fallback
- `description` → fallback meta description for every page
- `url` → canonical base, sitemap, structured data

### Company details
```ts
company: {
  legalName, foundedYear, industry,
  targetAudience,   // who the product serves
  problemSolved,    // the pain point — specific and factual
  solution,         // how the product solves it
  keyBenefits,      // 3-5 bullet-point benefits (feeds LLMs.txt + GEO copy)
  contactEmail,
  socialLinks,      // used in Organization schema sameAs array
}
```
These fields drive the Organization JSON-LD schema and the LLMs.txt "About" sections. **Write them as a marketing strategist**: specific numbers, concrete outcomes, no vague adjectives.

### SEO settings
```ts
seo: {
  titleTemplate: '%s · Sandpiper',    // Next.js title template (home uses an absolute title)
  defaultTitle: 'Sandpiper — ...',    // used when no page title is given
  twitterHandle?: '@handle',          // optional
  locale: 'en_US',                    // OG locale default
}
```

### Pages registry
```ts
pages: {
  home: {
    path: '/',
    title: '...',        // what goes in <title> and OG title
    description: '...',  // what goes in meta description AND llms.txt
    changeFreq: 'weekly',
    priority: 1.0,
  },
  menu: { ... },
  about: { ... },
}
```

These are the **core pages** (home, menu, about). Their `title`/`description` are the fallback SEO copy for the CMS page with the same path and the list shown in `/llms.txt`. Any other page published in the CMS is added to the sitemap automatically and takes its SEO from the CMS SEO tab — no entry needed. The `description` must answer "what does a visitor gain from this page?" in one specific sentence.

---

## Adding a New Page — Required Steps

**CMS page (default):** create it in `/admin` → Pages and fill the SEO tab. Metadata, JSON-LD and sitemap are handled by `CmsPage`. Add a `siteConfig.pages` entry only if it is a core page that should appear in `/llms.txt`.

**Hand-coded page:**

1. Add an entry to `siteConfig.pages` in `src/config/site.ts`
2. Write `title` and `description` from the visitor's intent, not from what the page contains
3. Call `buildMetadata()` in the page's `generateMetadata()` — see [02 — SEO](./02-seo.md)
4. Render `<StructuredData id="webpage" schema={webPageSchema(...)} />` — see [03 — GEO](./03-geo.md)

---

## Writing Good Descriptions

| Bad | Good |
|---|---|
| "About page for Sandpiper" | "How Sandpiper sources and roasts its coffee, what the kitchen cooks, answers to common questions, and our opening hours and address." |
| "Our menu" | "The full Sandpiper menu with prices: espresso and pour-over coffee, teas, all-day breakfast, Indonesian mains and house-baked pastry. Vegan and gluten-free options marked." |

Rules:
- Include the primary keyword in the first 11 words
- State a concrete benefit (time saved, problem solved, outcome gained)
- 140–160 characters for Google; first 120 chars matter most for AI snippets
- No "welcome to", no "this page contains", no filler phrases

---

← [SEO_GEO_LLM.md](../SEO_GEO_LLM.md) | → [02 — SEO](./02-seo.md)
