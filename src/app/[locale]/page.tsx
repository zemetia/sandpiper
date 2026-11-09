import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { CmsPage, cmsMetadata } from '@/components/cms/CmsPage';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return cmsMetadata('home', locale);
}

/** Homepage — edited in the CMS as the page with slug "home". */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CmsPage slug="home" locale={locale} />;
}
