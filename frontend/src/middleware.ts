import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['az', 'ru', 'tr', 'en'],
  defaultLocale: 'az',
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};