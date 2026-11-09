import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  const [common, navigation, site] = await Promise.all([
    import(`../../messages/${locale}/common.json`),
    import(`../../messages/${locale}/navigation.json`),
    import(`../../messages/${locale}/site.json`),
  ]);

  return {
    locale,
    messages: {
      common: common.default as Record<string, string>,
      navigation: navigation.default as Record<string, string>,
      site: site.default as Record<string, unknown>,
    },
  };
});
