import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { CmsPage, cmsMetadata } from '@/components/cms/CmsPage';

type Props = { params: Promise<{ locale: Locale; slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  return cmsMetadata(slug.join('/'), locale);
}

/** Every other CMS page — `/en/menu`, `/id/about`, nested `/en/about/team`, … */
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const path = slug.join('/');
  if (path === 'home') redirect({ href: '/', locale });
  return <CmsPage slug={path} locale={locale} />;
}
