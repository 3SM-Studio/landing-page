import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const [
    heroMessages,
    servicesMessages,
    studioMessages,
    portfolioMessages,
    processMessages,
    contactMessages,
    contactPageMessages,
    footerMessages,
    headerMessages,
  ] = await Promise.all([
    import(`../messages/homepage/hero/${locale}.json`),
    import(`../messages/homepage/services/${locale}.json`),
    import(`../messages/homepage/studio/${locale}.json`),
    import(`../messages/homepage/portfolio/${locale}.json`),
    import(`../messages/homepage/process/${locale}.json`),
    import(`../messages/homepage/contact/${locale}.json`),
    import(`../messages/contact/${locale}.json`),
    import(`../messages/footer/${locale}.json`),
    import(`../messages/header/${locale}.json`),
  ]);

  return {
    locale,
    messages: {
      ...heroMessages.default,
      ...servicesMessages.default,
      ...studioMessages.default,
      ...portfolioMessages.default,
      ...processMessages.default,
      ...contactMessages.default,
      ...contactPageMessages.default,
      ...footerMessages.default,
      ...headerMessages.default,
    },
  };
});
