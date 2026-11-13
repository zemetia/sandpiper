import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { CmsPage, cmsMetadata } from '@/components/cms/CmsPage';

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return cmsMetadata(slug.join('/'));
}

/** Every other CMS page — `/menu`, `/catering`, nested `/about/team`, … */
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const path = slug.join('/');
  if (path === 'home') redirect('/');
  return <CmsPage slug={path} />;
}
