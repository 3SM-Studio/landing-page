import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/shared/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const [
    footerLayoutMessages,
    headerLayoutMessages,
    aboutPageMessages,
    blogPageMessages,
    caseStudiesPageMessages,
    contactPageMessages,
    homePageMessages,
    servicesPageMessages,
    workPageMessages,
  ] = await Promise.all([
    import(`../../messages/layout/footer/${locale}.json`),
    import(`../../messages/layout/header/${locale}.json`),
    import(`../../messages/pages/about/${locale}.json`),
    import(`../../messages/pages/blog/${locale}.json`),
    import(`../../messages/pages/case-studies/${locale}.json`),
    import(`../../messages/pages/contact/${locale}.json`),
    import(`../../messages/pages/home/${locale}.json`),
    import(`../../messages/pages/services/${locale}.json`),
    import(`../../messages/pages/work/${locale}.json`),
  ]);

  return {
    locale,
    messages: {
      ...footerLayoutMessages.default,
      ...headerLayoutMessages.default,
      ...aboutPageMessages.default,
      ...blogPageMessages.default,
      ...caseStudiesPageMessages.default,
      ...contactPageMessages.default,
      ...homePageMessages.default,
      ...servicesPageMessages.default,
      ...workPageMessages.default,
    },
  };
});
