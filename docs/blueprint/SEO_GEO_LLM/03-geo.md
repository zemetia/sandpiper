# SEO/GEO/LLM — 03: GEO (Generative Engine Optimization)

← [02 — SEO](./02-seo.md) | [SEO_GEO_LLM.md](../SEO_GEO_LLM.md) | [04 — LLMs.txt →](./04-llms-txt.md)

---

## What GEO Is

GEO is the practice of making content **citable and indexable by AI search engines** — Google AI Overviews, Perplexity, ChatGPT Browse, and Bing Copilot.

Where traditional SEO wins clicks, GEO wins **citations in AI-generated answers**. Both matter. GEO content is: specific, factual, structured with clear headings, and answers questions directly.

---

## File: `src/lib/structured-data.ts`

Exports schema builders and a `serializeSchema()` serializer. Render them with the `<StructuredData>` component from `@/components/shared` — never hand-write the `<script>`. `serializeSchema` escapes `<` as `\u003c`, so CMS-authored strings containing `</script>` cannot break out.

| Export | Schema type | Use on |
|---|---|---|
| `organizationSchema()` | `Organization` | Root layout or home page — once per site |
| `webPageSchema(opts)` | `WebPage` | Every public page (`inLanguage` defaults to `en`) |
| `localBusinessSchema(opts)` | `CafeOrCoffeeShop` | Home page — built from CMS `SiteSettings` (address, hours, phone, socials, menu URL) |
| `faqSchema(faqs)` | `FAQPage` | Any page with a FAQ section |
| `breadcrumbSchema(items)` | `BreadcrumbList` | All pages except home |
| `articleSchema(opts)` | `Article` | Blog posts, changelog, docs |
| `serializeSchema(schema)` | — | Escaped JSON string — used internally by `<StructuredData>` |

---

## Using Structured Data in Pages

**CMS pages need nothing extra** — `CmsPage` renders `webpage`, `breadcrumb` (non-home), `business` (home, `localBusinessSchema` from `SiteSettings`) and `faq` (when the page has an FAQ block).

For a hand-coded page, use `<StructuredData>`:

```tsx
// src/app/(site)/<path>/page.tsx
import { StructuredData } from '@/components/shared';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/seo';
import { breadcrumbSchema, webPageSchema } from '@/lib/structured-data';

export default function Page() {
  const page = siteConfig.pages['about'];
  const url = absoluteUrl('/about');
  return (
    <>
      <StructuredData
        id="webpage"
        schema={webPageSchema({ name: page?.title ?? '', description: page?.description ?? '', url })}
      />
      <StructuredData
        id="breadcrumb"
        schema={breadcrumbSchema([
          { name: siteConfig.name, url: absoluteUrl('/') },
          { name: 'About', url },
        ])}
      />
      {/* page content */}
    </>
  );
}
```

`id` becomes `ld-<id>` on the `<script>`; keep it unique per page.

---

## FAQ Schema

Drives "People also ask" rich results and AI answer boxes. On CMS pages, adding an **FAQ block** is enough — `CmsPage` collects its items into `faqSchema()`. Hand-coded:

```tsx
<StructuredData id="faq" schema={faqSchema([{ question: '…', answer: '…' }])} />
```

---

## GEO Content Strategy

Structured data alone is not enough. The **content itself** must be GEO-optimized:

### 1. Answer the question directly in the first sentence
AI overviews pull the most direct answer. Lead with the answer, then explain.

```
❌ "In this guide, we will explore what a Next.js template is and why you might want one."
✅ "A Next.js template is a pre-configured codebase with decisions about TypeScript, state, i18n, and design already made — so teams start with features instead of boilerplate."
```

### 2. Use specific numbers and facts
AI systems prefer citable specifics over vague claims.

```
❌ "saves a lot of time"
✅ "eliminates ~40 hours of setup per project"
```

### 3. Structured headings hierarchy
Use H2 for major sections, H3 for sub-topics. AI parsers treat headings as topic signals.

### 4. FAQ sections on key pages
Every product/feature page benefits from a FAQ section. Include real questions from `targetAudience`.

### 5. Entity clarity
Mention the product name, company name, and core use case in the first 100 words of body copy. This trains entity recognition.

### 6. Cite authoritative sources when relevant
AI search engines trust pages that link to primary sources (MDN, official docs, research papers).

---

## Speakable / Voice (optional)

For content meant to answer spoken queries, add `speakable` to the WebPage schema:

```ts
// extend webPageSchema output manually if needed:
{
  ...webPageSchema(opts),
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.summary', '.faq-answer'],
  },
}
```

---

← [02 — SEO](./02-seo.md) | → [04 — LLMs.txt](./04-llms-txt.md)
