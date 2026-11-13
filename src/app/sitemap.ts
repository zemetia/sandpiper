import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/seo';
import { cmsService } from '@/services/cms.service';

/**
 * Sitemap = static pages from siteConfig.pages + every published CMS page.
 * CMS pages that share a path with siteConfig are skipped.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const known = new Set<string>();

  for (const page of Object.values(siteConfig.pages)) {
    known.add(page.path);
    entries.push({
      url: absoluteUrl(page.path),
      lastModified: new Date(),
      changeFrequency: page.changeFreq,
      priority: page.priority,
    });
  }

  // The DB may be unreachable at build time — fall back to static pages only.
  const cmsPages = await cmsService.getPageSlugs().catch(() => []);
  for (const { slug, updatedAt } of cmsPages) {
    const path = slug === 'home' ? '/' : `/${slug}`;
    if (known.has(path)) continue;
    entries.push({
      url: absoluteUrl(path),
      lastModified: new Date(updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return entries;
}
