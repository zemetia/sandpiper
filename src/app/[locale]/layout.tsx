import type { Metadata } from 'next';
import { Fraunces, JetBrains_Mono, Outfit } from 'next/font/google';
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
import { PostHogProvider } from '@/providers';

import '../globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
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
      className={`${outfit.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
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
              items={nav.header.items}
              cta={nav.header.cta}
              labels={{ openMenu: t('openMenu'), closeMenu: t('closeMenu') }}
            />
            <main id="main">{children}</main>
            <Footer
              settings={settings}
              blurb={nav.footer.blurb}
              items={nav.footer.items}
              labels={{
                hours: t('hours'),
                address: t('address'),
                follow: t('follow'),
                rights: t('rights'),
              }}
            />
          </PostHogProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
