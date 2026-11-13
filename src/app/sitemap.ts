import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import { localizedUrl } from '@/lib/seo';
import { cmsService } from '@/services/cms.service';

/**
 * Sitemap = static pages from siteConfig.pages + every published CMS page,
 * one URL per locale. CMS pages that share a path with siteConfig are skipped.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const known = new Set<string>();

  for (const page of Object.values(siteConfig.pages)) {
    known.add(page.path);
    for (const locale of routing.locales) {
      entries.push({
        url: localizedUrl(page.path, locale),
        lastModified: new Date(),
        changeFrequency: page.changeFreq,
        priority: page.priority,
      });
    }
  }

  // The DB may be unreachable at build time — fall back to static pages only.
  const cmsPages = await cmsService.getPageSlugs().catch(() => []);
  for (const { slug, updatedAt } of cmsPages) {
    const path = slug === 'home' ? '/' : `/${slug}`;
    if (known.has(path)) continue;
    for (const locale of routing.locales) {
      entries.push({
        url: localizedUrl(path, locale),
        lastModified: new Date(updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
