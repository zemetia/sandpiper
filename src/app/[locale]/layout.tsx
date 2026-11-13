import type { Metadata } from 'next';
import { Archivo, Bricolage_Grotesque, Caveat, Poppins } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateMetadata(): Metadata {
  return {
    title: { template: siteConfig.seo.titleTemplate, default: siteConfig.seo.defaultTitle },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    icons: { icon: '/sandpiper-mark.svg' },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const [messages, t, settings, nav] = await Promise.all([
    getMessages(),
    getTranslations('site'),
    cmsService.getSiteSettings(locale as Locale),
    cmsService.getNavigation(locale as Locale),
  ]);

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${bricolage.variable} ${archivo.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <PostHogProvider>
              <a
                href="#main"
                className="bg-primary text-primary-foreground sr-only z-[70] rounded-md px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
              >
                {t('skipToContent')}
              </a>
              {settings.announcement && <AnnouncementBar {...settings.announcement} />}
              <Header
                siteName={settings.siteName}
                nav={nav.header}
                settings={settings}
                labels={{
                  openMenu: t('openMenu'),
                  closeMenu: t('closeMenu'),
                  menu: t('mainMenu'),
                  home: t('home'),
                  call: t('call'),
                  map: t('map'),
                  instagram: t('instagram'),
                  ticker: t('ticker'),
                }}
              />
              <main id="main">{children}</main>
              <Footer
                settings={settings}
                footer={nav.footer}
                labels={{
                  explore: t('explore'),
                  visit: t('visit'),
                  instagram: t('instagram'),
                  map: t('map'),
                  call: t('call'),
                  newsletter: {
                    email: t('newsletter.email'),
                    thanks: t('newsletter.thanks'),
                    invalid: t('newsletter.invalid'),
                    error: t('newsletter.error'),
                  },
                }}
              />
            </PostHogProvider>
          </QueryProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
