import type { Metadata } from 'next';

import { CmsPage, cmsMetadata } from '@/components/cms/CmsPage';

export function generateMetadata(): Promise<Metadata> {
  return cmsMetadata('home');
}

/** Homepage — edited in the CMS as the page with slug "home". */
export default function HomePage() {
  return <CmsPage slug="home" />;
}
