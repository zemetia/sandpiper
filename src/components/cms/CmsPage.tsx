import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { pagePath } from '@/cms/preview';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/i18n/routing';
import { buildMetadata, localizedUrl } from '@/lib/seo';
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  webPageSchema,
} from '@/lib/structured-data';
import type { Page } from '@/payload-types';
import { toImage } from '@/services/cms.mappers';
import { cmsService } from '@/services/cms.service';
import { StructuredData } from '@/components/shared/StructuredData';

import { LivePreviewListener } from './LivePreviewListener';
import { RenderBlocks } from './RenderBlocks';

const pathFor = (slug: string) => pagePath(slug) || '/';

/** Static copy from siteConfig wins as fallback for core pages; the CMS SEO tab overrides it. */
function describe(page: Page | null, slug: string) {
  const fallback = Object.values(siteConfig.pages).find((p) => p.path === pathFor(slug));
  return {
    title: page?.meta?.title || fallback?.title || page?.title || siteConfig.seo.defaultTitle,
    description: page?.meta?.description || fallback?.description || siteConfig.description,
  };
}

export async function cmsMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const page = await cmsService.getPage(slug, locale);
  if (!page && slug !== 'home') return { title: 'Not found', robots: { index: false } };

  const { title, description } = describe(page, slug);
  const ogImage = toImage(page?.meta?.image, 'og')?.url;
  const metadata = buildMetadata({
    title,
    description,
    path: pathFor(slug),
    locale,
    ...(ogImage ? { ogImage } : {}),
  });
  // The homepage title already carries the brand — skip the "%s · Sandpiper" template.
  return slug === 'home' ? { ...metadata, title: { absolute: title } } : metadata;
}

async function EmptyHome() {
  const t = await getTranslations('site');
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
        Sandpiper
      </p>
      <h1 className="font-display text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
        {t('emptyTitle')}
      </h1>
      <p className="text-foreground-muted mt-4 max-w-xl text-lg">{t('emptyBody')}</p>
      {/* The admin is a separate root layout — this must be a full page load, not client navigation. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href="/admin"
        className="bg-primary text-primary-foreground hover:bg-primary-hover mt-8 inline-flex h-11 items-center rounded-full px-6 font-medium"
      >
        {t('emptyCta')}
      </a>
    </section>
  );
}

async function DraftBanner({ path }: { path: string }) {
  const t = await getTranslations('site');
  return (
    <div className="bg-warning text-warning-foreground sticky top-0 z-[60] flex items-center justify-center gap-3 px-4 py-2 text-sm font-medium">
      {t('previewMode')}
      <a
        href={`/preview/exit?path=${encodeURIComponent(path)}`}
        className="underline underline-offset-2"
      >
        {t('exitPreview')}
      </a>
    </div>
  );
}

export async function CmsPage({ slug, locale }: { slug: string; locale: Locale }) {
  const [page, draft] = await Promise.all([cmsService.getPage(slug, locale), cmsService.isDraft()]);

  if (!page) {
    if (slug === 'home') return <EmptyHome />;
    notFound();
  }

  const path = pathFor(slug);
  const url = localizedUrl(path, locale);
  const { title, description } = describe(page, slug);
  const faqs = (page.layout ?? []).flatMap((b) => (b.blockType === 'faq' ? (b.items ?? []) : []));

  let business = null;
  if (slug === 'home') {
    const s = await cmsService.getSiteSettings(locale);
    business = localBusinessSchema({
      name: s.siteName,
      description: s.tagline ?? siteConfig.description,
      url: localizedUrl('/', locale),
      menuUrl: localizedUrl('/menu', locale),
      telephone: s.phone,
      email: s.email,
      address: s.address,
      mapUrl: s.mapUrl,
      hours: s.hours,
      sameAs: s.socials.map((x) => x.url),
    });
  }

  return (
    <>
      {draft && (
        <>
          <DraftBanner path={`/${locale}${path === '/' ? '' : path}`} />
          <LivePreviewListener />
        </>
      )}
      <StructuredData
        id="webpage"
        schema={webPageSchema({
          name: title,
          description,
          url,
          locale,
          dateModified: page.updatedAt,
          ...(page.publishedAt ? { datePublished: page.publishedAt } : {}),
        })}
      />
      {slug !== 'home' && (
        <StructuredData
          id="breadcrumb"
          schema={breadcrumbSchema([
            { name: siteConfig.name, url: localizedUrl('/', locale) },
            { name: page.title, url },
          ])}
        />
      )}
      {business && <StructuredData id="business" schema={business} />}
      {faqs.length > 0 && <StructuredData id="faq" schema={faqSchema(faqs)} />}
      <RenderBlocks blocks={page.layout} locale={locale} />
    </>
  );
}
