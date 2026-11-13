import type { Metadata } from 'next';

import { CmsPage, cmsMetadata } from '@/components/cms/CmsPage';

// Rendered per request like every other CMS page — a build-time snapshot would ignore CMS edits
// (and bake a 404 when the production DB is still empty at the first deploy).
export const dynamic = 'force-dynamic';

export function generateMetadata(): Promise<Metadata> {
  return cmsMetadata('home');
}

/** Homepage — edited in the CMS as the page with slug "home". */
export default function HomePage() {
  return <CmsPage slug="home" />;
}
