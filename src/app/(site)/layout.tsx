import type { Metadata } from 'next';
import { Archivo, Bricolage_Grotesque, Caveat, Poppins } from 'next/font/google';

import { copy } from '@/config/copy';
import { siteConfig } from '@/config/site';
import { cmsService } from '@/services/cms.service';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/Sonner';
import { PostHogProvider, QueryProvider } from '@/providers';

import '../globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  // Optical size makes the giant display type tighter, as in the design file.
  axes: ['opsz'],
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['700', '800'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '700'],
});

export function generateMetadata(): Metadata {
  return {
    title: { template: siteConfig.seo.titleTemplate, default: siteConfig.seo.defaultTitle },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/sandpiper-mark.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
    },
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, nav] = await Promise.all([
    cmsService.getSiteSettings(),
    cmsService.getNavigation(),
  ]);

  return (
    <html
      lang="en-US"
      className={`${poppins.variable} ${bricolage.variable} ${archivo.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body>
        <QueryProvider>
          <PostHogProvider>
            <a
              href="#main"
              className="bg-primary text-primary-foreground sr-only z-[70] rounded-md px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
            >
              {copy.skipToContent}
            </a>
            {settings.announcement && <AnnouncementBar {...settings.announcement} />}
            <Header
              siteName={settings.siteName}
              nav={nav.header}
              settings={settings}
              labels={{
                openMenu: copy.openMenu,
                closeMenu: copy.closeMenu,
                menu: copy.mainMenu,
                home: copy.home,
                call: copy.call,
                map: copy.map,
                instagram: copy.instagram,
                ticker: copy.ticker,
              }}
            />
            <main id="main">{children}</main>
            <Footer
              settings={settings}
              footer={nav.footer}
              labels={{
                explore: copy.explore,
                visit: copy.visit,
                instagram: copy.instagram,
                map: copy.map,
                call: copy.call,
                newsletter: copy.newsletter,
              }}
            />
          </PostHogProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
